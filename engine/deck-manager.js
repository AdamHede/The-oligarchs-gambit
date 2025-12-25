/**
 * Event System 2.0 - Deck Manager
 *
 * Manages the active event deck: adding, removing, and drawing events
 *
 * v2.1 additions:
 * - Dynamic weight calculation based on storyline weights and event-specific modifiers
 * - onceOnly event handling
 */

import { getEffectiveStorylineWeight } from './game-state.js';
import { evaluateCondition } from './condition-eval.js';

/**
 * Adds events to the deck
 * @param {string[]} eventIds - Event IDs to add
 * @param {string[]} currentDeck - Current deck state
 * @returns {string[]} - New deck state
 */
function addToDeck(eventIds, currentDeck) {
    if (!Array.isArray(eventIds)) {
        eventIds = [eventIds];
    }

    const newDeck = [...currentDeck];
    eventIds.forEach(eventId => {
        if (!newDeck.includes(eventId)) {
            newDeck.push(eventId);
        }
    });

    return newDeck;
}

/**
 * Removes events from the deck
 * @param {string[]} eventIds - Event IDs to remove
 * @param {string[]} currentDeck - Current deck state
 * @returns {string[]} - New deck state
 */
function removeFromDeck(eventIds, currentDeck) {
    if (!Array.isArray(eventIds)) {
        eventIds = [eventIds];
    }

    return currentDeck.filter(id => !eventIds.includes(id));
}

// =============================================================================
// v2.1 Dynamic Weight Calculation
// =============================================================================

/**
 * Calculates effective weight for an event based on state
 * @param {Object} event - Event object
 * @param {Object} state - Game state
 * @returns {number} - Effective weight
 */
function calculateEffectiveWeight(event, state) {
    let baseWeight = event.weight || 1;

    // v2.1: Apply storyline weight modifiers
    if (event.storylines && event.storylines.length > 0) {
        // Use highest storyline weight if event belongs to multiple
        const storylineMultipliers = event.storylines.map(storyline => {
            const effectiveWeight = getEffectiveStorylineWeight(state, storyline, baseWeight);
            return effectiveWeight / baseWeight;
        });
        const maxMultiplier = Math.max(...storylineMultipliers, 1.0);
        baseWeight *= maxMultiplier;
    }

    // v2.1: Apply event-specific weight modifiers
    if (event.weightModifiers && Array.isArray(event.weightModifiers)) {
        event.weightModifiers.forEach(modifier => {
            // Check if modifier conditions are met
            const conditionsMet = modifier.conditions
                ? evaluateCondition(modifier.conditions, state)
                : true;

            if (conditionsMet) {
                if (modifier.multiplier !== undefined) {
                    baseWeight *= modifier.multiplier;
                }
                if (modifier.bonus !== undefined) {
                    baseWeight += modifier.bonus;
                }
            }
        });
    }

    return Math.max(0, baseWeight); // Ensure non-negative
}

/**
 * Draws a random event from the deck based on weights
 * @param {Object[]} allEvents - All available events (indexed by ID)
 * @param {string[]} deck - Current deck state
 * @param {Function} isEligibleFn - Function to check if event is eligible (event, state, allEvents) => boolean
 * @param {Object} state - Game state for eligibility checking
 * @param {Object} [registry] - v2.2: Optional compiled registry with exclusiveGroups
 * @returns {Object|null} - Selected event or null if none available
 */
function drawEvent(allEvents, deck, isEligibleFn, state, registry = null) {
    // Filter to events in deck
    const deckEvents = deck
        .map(id => allEvents.find(e => e.id === id))
        .filter(e => e !== undefined);

    if (deckEvents.length === 0) {
        // Fallback: If deck is empty, add quiet_quarter to keep game going
        if (state.deck.length === 0) {
            state.deck.push('quiet_quarter');
            // Recursive call to draw the newly added event
            return drawEvent(allEvents, state.deck, isEligibleFn, state, registry);
        }
        return null;
    }

    // Filter by eligibility (v2.1: pass allEvents for storylineActive checks)
    const eligibleEvents = deckEvents.filter(event => {
        if (!event) return false;
        return isEligibleFn(event, state, allEvents);
    });

    if (eligibleEvents.length === 0) {
        return null;
    }

    // v2.1: Calculate dynamic weights
    const weightedEvents = eligibleEvents.map(event => {
        const weight = calculateEffectiveWeight(event, state);
        return { event, weight };
    });

    // Calculate total weight
    const totalWeight = weightedEvents.reduce((sum, item) => sum + item.weight, 0);

    let selectedEvent;
    if (totalWeight === 0) {
        // Fallback: equal probability
        const randomIndex = Math.floor(Math.random() * weightedEvents.length);
        selectedEvent = weightedEvents[randomIndex].event;
    } else {
        // Weighted random selection
        let random = Math.random() * totalWeight;
        for (const item of weightedEvents) {
            random -= item.weight;
            if (random <= 0) {
                selectedEvent = item.event;
                break;
            }
        }
        // Fallback (shouldn't reach here)
        if (!selectedEvent) {
            selectedEvent = weightedEvents[0].event;
        }
    }

    // v2.2: Remove exclusive siblings from deck at DRAW time
    if (selectedEvent && registry?.exclusiveGroups) {
        const siblings = registry.exclusiveGroups[selectedEvent.id];
        if (siblings && siblings.length > 0) {
            state.deck = removeFromDeck(siblings, state.deck);
            // Also mark them as terminated so they can't be re-added
            siblings.forEach(siblingId => {
                if (state.terminatedEvents) {
                    state.terminatedEvents.add(siblingId);
                }
            });
        }
    }

    return selectedEvent;
}

/**
 * Processes deck operations from a choice
 * @param {Object} choice - Choice object with add/remove/removeSelf/addSelf
 * @param {string} eventId - ID of the event this choice belongs to
 * @param {Object|boolean} eventOrIsRecurring - v2.1: Full event object, or boolean for backward compat
 * @param {string[]} currentDeck - Current deck state
 * @returns {string[]} - New deck state
 */
function processChoiceDeckOperations(choice, eventId, eventOrIsRecurring, currentDeck) {
    let newDeck = [...currentDeck];

    // Add events
    if (choice.add) {
        newDeck = addToDeck(choice.add, newDeck);
    }

    // Remove events
    if (choice.remove) {
        newDeck = removeFromDeck(choice.remove, newDeck);
    }

    // v2.1: Handle both old boolean and new object signatures
    const event = typeof eventOrIsRecurring === 'object' ? eventOrIsRecurring : null;
    const isRecurring = event ? (event.recurring || false) : eventOrIsRecurring;

    // v2.1: Handle onceOnly events (higher priority than recurring)
    if (event && event.onceOnly === true) {
        newDeck = removeFromDeck([eventId], newDeck);
        return newDeck; // Skip other self-management logic
    }

    // Handle self-removal/add
    const shouldRemoveSelf = choice.removeSelf !== undefined
        ? choice.removeSelf
        : !isRecurring; // Default: remove if not recurring

    const shouldAddSelf = choice.addSelf === true;

    if (shouldRemoveSelf && !shouldAddSelf) {
        newDeck = removeFromDeck([eventId], newDeck);
    } else if (shouldAddSelf) {
        newDeck = addToDeck([eventId], newDeck);
    }

    return newDeck;
}

export {
    addToDeck,
    removeFromDeck,
    drawEvent,
    processChoiceDeckOperations,
    calculateEffectiveWeight  // v2.1 export
};

