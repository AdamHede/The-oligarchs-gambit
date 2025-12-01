/**
 * Event System 2.0 - Deck Manager
 * 
 * Manages the active event deck: adding, removing, and drawing events
 */

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

/**
 * Draws a random event from the deck based on weights
 * @param {Object[]} allEvents - All available events (indexed by ID)
 * @param {string[]} deck - Current deck state
 * @param {Function} isEligibleFn - Function to check if event is eligible (state) => boolean
 * @param {Object} state - Game state for eligibility checking
 * @returns {Object|null} - Selected event or null if none available
 */
function drawEvent(allEvents, deck, isEligibleFn, state) {
    // Filter to events in deck
    const deckEvents = deck
        .map(id => allEvents.find(e => e.id === id))
        .filter(e => e !== undefined);

    if (deckEvents.length === 0) {
        return null;
    }

    // Filter by eligibility
    const eligibleEvents = deckEvents.filter(event => {
        if (!event) return false;
        return isEligibleFn(event, state);
    });

    if (eligibleEvents.length === 0) {
        return null;
    }

    // Calculate weights
    const weightedEvents = eligibleEvents.map(event => {
        const weight = event.weight || 1;
        return { event, weight };
    });

    // Calculate total weight
    const totalWeight = weightedEvents.reduce((sum, item) => sum + item.weight, 0);

    if (totalWeight === 0) {
        // Fallback: equal probability
        const randomIndex = Math.floor(Math.random() * weightedEvents.length);
        return weightedEvents[randomIndex].event;
    }

    // Weighted random selection
    let random = Math.random() * totalWeight;
    for (const item of weightedEvents) {
        random -= item.weight;
        if (random <= 0) {
            return item.event;
        }
    }

    // Fallback (shouldn't reach here)
    return weightedEvents[0].event;
}

/**
 * Processes deck operations from a choice
 * @param {Object} choice - Choice object with add/remove/removeSelf/addSelf
 * @param {string} eventId - ID of the event this choice belongs to
 * @param {boolean} isRecurring - Whether the event is recurring
 * @param {string[]} currentDeck - Current deck state
 * @returns {string[]} - New deck state
 */
function processChoiceDeckOperations(choice, eventId, isRecurring, currentDeck) {
    let newDeck = [...currentDeck];

    // Add events
    if (choice.add) {
        newDeck = addToDeck(choice.add, newDeck);
    }

    // Remove events
    if (choice.remove) {
        newDeck = removeFromDeck(choice.remove, newDeck);
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
    processChoiceDeckOperations
};

