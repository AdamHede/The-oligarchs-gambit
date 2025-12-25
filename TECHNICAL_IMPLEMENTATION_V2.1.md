# Technical Implementation Plan - v2.1 Early Game Agency Systems

## Overview

This document specifies the purely technical changes required to support the Early Game Agency features. All changes maintain backward compatibility with existing events.

**Target Files:**
- `engine/game-state.js` - Add relationship tracking
- `engine/condition-eval.js` - Add time-gated and relationship conditions
- `engine/effect-applier.js` - Add dynamic weight modifiers, relationship changes
- `engine/deck-manager.js` - Add dynamic weight calculation
- `engine/game-engine.js` - Integrate new systems
- `events/schema.js` - Extend schema definitions

---

## 1. Schema Extensions

### File: `events/schema.js`

Add new JSDoc type definitions:

```javascript
/**
 * @typedef {Object} TimeGate
 * @property {number} [minYear] - Only appears >= this year
 * @property {number} [maxYear] - Only appears <= this year
 * @property {number} [minQuarter] - Only appears >= this quarter (1-4)
 * @property {number} [maxQuarter] - Only appears <= this quarter (1-4)
 * @property {number} [minTurn] - Only appears >= this turn number
 * @property {number} [maxTurn] - Only appears <= this turn number
 */

/**
 * @typedef {Object} WeightModifier
 * @property {ConditionExpression} conditions - Conditions for this modifier to apply
 * @property {number} multiplier - Weight multiplier (e.g., 1.5 = +50%, 0.5 = -50%)
 * @property {number} [bonus] - Flat bonus to weight (applied after multiplier)
 */

/**
 * @typedef {Object} NarrativeVariation
 * @property {ConditionExpression} conditions - When this variation applies
 * @property {string} [title] - Alternative title text
 * @property {string} [description] - Alternative description text
 */

/**
 * Extended Event schema for v2.1
 * @typedef {Object} EventV21
 * @extends Event
 * @property {TimeGate} [timeGate] - Temporal restrictions on event appearance
 * @property {boolean} [onceOnly] - If true, removes self from deck after first draw
 * @property {WeightModifier[]} [weightModifiers] - Dynamic weight adjustments
 * @property {NarrativeVariation[]} [narrativeVariations] - Conditional text variations
 * @property {string} [characterId] - ID of recurring character this event features
 * @property {string} [rarity] - Rarity tier: common, rare, epic, legendary
 */
```

### Extended ChoiceEffects

```javascript
/**
 * @typedef {Object} ChoiceEffectsV21
 * @extends ChoiceEffects
 * @property {Object<string, number>} [relationships] - Relationship changes (character_id: delta)
 * @property {Object<string, {storyline: string, multiplier: number, bonus: number}>} [modifyStorylineWeights] - Dynamic storyline weight changes
 * @property {string[]} [terminates] - Event IDs to permanently block (stronger than remove)
 */
```

### Extended Conditions

```javascript
/**
 * @typedef {Object} ConditionsV21
 * @extends Conditions
 * @property {Object} [year] - Year comparison (supports gte, lte, eq, between)
 * @property {Object} [quarter] - Quarter comparison (1-4)
 * @property {Object} [turn] - Absolute turn number comparison
 * @property {Object<string, StatComparison>} [relationships] - Character relationship checks
 * @property {string} [storylineActive] - Check if storyline has events in deck
 * @property {string} [characterState] - Check character state (alive, arrested, exiled, dead)
 */
```

---

## 2. Game State Extensions

### File: `engine/game-state.js`

Add relationship tracking and terminated events to game state:

```javascript
/**
 * Creates initial game state
 * @param {Object} [initialStats] - Initial stat values
 * @param {string[]} [initialDeck] - Initial deck event IDs
 * @returns {Object} - Initial game state
 */
function createInitialState(initialStats = {}, initialDeck = []) {
    return {
        stats: {
            personalWealth: initialStats.personalWealth || 10,
            treasury: initialStats.treasury || 1000,
            elite: initialStats.elite || 90,
            anger: initialStats.anger || 10,
            ...initialStats
        },
        counters: {},
        flags: {},
        relationships: {},        // NEW: Character relationship tracking (0-100)
        characterStates: {},      // NEW: Character states (alive, arrested, exiled, dead)
        storylineWeights: {},     // NEW: Dynamic storyline weight modifiers
        terminatedEvents: new Set(), // NEW: Permanently blocked event IDs
        deck: [...initialDeck],
        history: [],
        year: 1,
        quarter: 1,
        turn: 0               // NEW: Absolute turn counter
    };
}

/**
 * Advances time (quarter/year/turn)
 * @param {Object} state - Game state
 */
function advanceTime(state) {
    state.turn = (state.turn || 0) + 1;  // NEW
    state.quarter++;
    if (state.quarter > 4) {
        state.quarter = 1;
        state.year++;
    }
}

/**
 * Sets a character's relationship value
 * @param {Object} state - Game state
 * @param {string} characterId - Character identifier
 * @param {number} value - Relationship value (0-100)
 */
function setRelationship(state, characterId, value) {
    if (!state.relationships) {
        state.relationships = {};
    }
    state.relationships[characterId] = Math.max(0, Math.min(100, value));
}

/**
 * Changes a character's relationship value
 * @param {Object} state - Game state
 * @param {string} characterId - Character identifier
 * @param {number} delta - Change amount
 */
function changeRelationship(state, characterId, delta) {
    const current = state.relationships?.[characterId] || 50; // Default neutral
    setRelationship(state, characterId, current + delta);
}

/**
 * Gets a character's relationship value
 * @param {Object} state - Game state
 * @param {string} characterId - Character identifier
 * @returns {number} - Relationship value (0-100, default 50)
 */
function getRelationship(state, characterId) {
    return state.relationships?.[characterId] || 50;
}

/**
 * Sets a character's state
 * @param {Object} state - Game state
 * @param {string} characterId - Character identifier
 * @param {string} characterState - State: alive, arrested, exiled, dead
 */
function setCharacterState(state, characterId, characterState) {
    if (!state.characterStates) {
        state.characterStates = {};
    }
    state.characterStates[characterId] = characterState;
}

/**
 * Gets a character's state
 * @param {Object} state - Game state
 * @param {string} characterId - Character identifier
 * @returns {string} - Character state (default: "alive")
 */
function getCharacterState(state, characterId) {
    return state.characterStates?.[characterId] || 'alive';
}

/**
 * Modifies a storyline's weight
 * @param {Object} state - Game state
 * @param {string} storyline - Storyline identifier
 * @param {number} multiplier - Weight multiplier
 * @param {number} bonus - Flat bonus
 */
function modifyStorylineWeight(state, storyline, multiplier = 1.0, bonus = 0) {
    if (!state.storylineWeights) {
        state.storylineWeights = {};
    }
    if (!state.storylineWeights[storyline]) {
        state.storylineWeights[storyline] = { multiplier: 1.0, bonus: 0 };
    }

    // Compound multipliers, add bonuses
    state.storylineWeights[storyline].multiplier *= multiplier;
    state.storylineWeights[storyline].bonus += bonus;
}

/**
 * Gets effective weight for a storyline
 * @param {Object} state - Game state
 * @param {string} storyline - Storyline identifier
 * @param {number} baseWeight - Base weight of event
 * @returns {number} - Modified weight
 */
function getEffectiveStorylineWeight(state, storyline, baseWeight) {
    const modifier = state.storylineWeights?.[storyline];
    if (!modifier) return baseWeight;

    return (baseWeight * modifier.multiplier) + modifier.bonus;
}

/**
 * Terminates an event permanently
 * @param {Object} state - Game state
 * @param {string} eventId - Event ID to terminate
 */
function terminateEvent(state, eventId) {
    if (!state.terminatedEvents) {
        state.terminatedEvents = new Set();
    }
    state.terminatedEvents.add(eventId);
}

/**
 * Checks if an event is terminated
 * @param {Object} state - Game state
 * @param {string} eventId - Event ID to check
 * @returns {boolean}
 */
function isEventTerminated(state, eventId) {
    return state.terminatedEvents?.has(eventId) || false;
}

export {
    createInitialState,
    addHistoryEntry,
    advanceTime,
    getDefaultStatBounds,
    // NEW exports
    setRelationship,
    changeRelationship,
    getRelationship,
    setCharacterState,
    getCharacterState,
    modifyStorylineWeight,
    getEffectiveStorylineWeight,
    terminateEvent,
    isEventTerminated
};
```

---

## 3. Condition Evaluator Extensions

### File: `engine/condition-eval.js`

Add new condition types to `evaluateCondition()`:

```javascript
/**
 * Evaluates a condition expression against game state
 * @param {Object} condition - Condition expression to evaluate
 * @param {Object} state - Game state (stats, counters, flags, year, quarter, turn, relationships)
 * @returns {boolean}
 */
function evaluateCondition(condition, state) {
    if (!condition || typeof condition !== 'object') {
        return true; // No condition = always true
    }

    // Empty conditions object = always true
    if (Object.keys(condition).length === 0) {
        return true;
    }

    // Handle complex logic operators
    if (condition.all !== undefined) {
        if (!Array.isArray(condition.all)) return false;
        return condition.all.every(expr => evaluateCondition(expr, state));
    }

    if (condition.any !== undefined) {
        if (!Array.isArray(condition.any)) return false;
        return condition.any.some(expr => evaluateCondition(expr, state));
    }

    if (condition.not !== undefined) {
        return !evaluateCondition(condition.not, state);
    }

    // Handle stat checks
    if (condition.stat !== undefined) {
        const statName = condition.stat;
        const statValue = state.stats?.[statName];
        if (statValue === undefined) return false;
        return evaluateComparison(statValue, condition);
    }

    // Handle flag checks
    if (condition.flag !== undefined) {
        const flagName = condition.flag;
        if (typeof flagName !== 'string') return false;
        const flagValue = state.flags?.[flagName];
        return flagValue === true;
    }

    // Handle counter checks
    if (condition.counter !== undefined) {
        const counterName = condition.counter;
        const counterValue = state.counters?.[counterName] || 0;
        return evaluateComparison(counterValue, condition);
    }

    // NEW: Handle year checks
    if (condition.year !== undefined) {
        const yearValue = state.year || 1;
        return evaluateComparison(yearValue, condition);
    }

    // NEW: Handle quarter checks
    if (condition.quarter !== undefined) {
        const quarterValue = state.quarter || 1;
        return evaluateComparison(quarterValue, condition);
    }

    // NEW: Handle turn checks
    if (condition.turn !== undefined) {
        const turnValue = state.turn || 0;
        return evaluateComparison(turnValue, condition);
    }

    // NEW: Handle relationship checks
    if (condition.relationship !== undefined) {
        const relationshipId = condition.relationship;
        const relationshipValue = state.relationships?.[relationshipId] || 50; // Default neutral
        return evaluateComparison(relationshipValue, condition);
    }

    // NEW: Handle character state checks
    if (condition.characterState !== undefined) {
        const { character, state: expectedState } = condition.characterState;
        if (!character || !expectedState) return false;
        const actualState = state.characterStates?.[character] || 'alive';
        return actualState === expectedState;
    }

    // NEW: Handle storyline active checks
    if (condition.storylineActive !== undefined) {
        const storyline = condition.storylineActive;
        if (typeof storyline !== 'string') return false;
        // Check if any events with this storyline are in deck
        // This requires access to event data - we'll handle in isEventEligible
        return true; // Placeholder - implemented in wrapper function
    }

    // Handle direct stat/flags/counters objects (implicit AND)
    if (condition.stats) {
        return Object.entries(condition.stats).every(([statName, comparison]) => {
            const statValue = state.stats?.[statName];
            if (statValue === undefined) return false;
            return evaluateComparison(statValue, comparison);
        });
    }

    if (condition.flags) {
        return Object.entries(condition.flags).every(([flagName, expectedValue]) => {
            const flagValue = state.flags?.[flagName];
            if (expectedValue === false && flagValue === undefined) {
                return true;
            }
            return flagValue === expectedValue;
        });
    }

    if (condition.counters) {
        return Object.entries(condition.counters).every(([counterName, comparison]) => {
            const counterValue = state.counters?.[counterName] || 0;
            return evaluateComparison(counterValue, comparison);
        });
    }

    // NEW: Handle relationships object
    if (condition.relationships) {
        return Object.entries(condition.relationships).every(([characterId, comparison]) => {
            const relationshipValue = state.relationships?.[characterId] || 50;
            return evaluateComparison(relationshipValue, comparison);
        });
    }

    // Unknown condition format
    return false;
}

/**
 * Checks if an event's time gate allows it to appear
 * @param {Object} event - Event object with optional timeGate
 * @param {Object} state - Game state
 * @returns {boolean}
 */
function isWithinTimeGate(event, state) {
    const timeGate = event.timeGate;
    if (!timeGate) return true;

    const year = state.year || 1;
    const quarter = state.quarter || 1;
    const turn = state.turn || 0;

    // Check year bounds
    if (timeGate.minYear !== undefined && year < timeGate.minYear) return false;
    if (timeGate.maxYear !== undefined && year > timeGate.maxYear) return false;

    // Check quarter bounds (only if in valid year range)
    if (timeGate.minQuarter !== undefined) {
        if (year === timeGate.minYear && quarter < timeGate.minQuarter) return false;
    }
    if (timeGate.maxQuarter !== undefined) {
        if (year === timeGate.maxYear && quarter > timeGate.maxQuarter) return false;
    }

    // Check absolute turn bounds
    if (timeGate.minTurn !== undefined && turn < timeGate.minTurn) return false;
    if (timeGate.maxTurn !== undefined && turn > timeGate.maxTurn) return false;

    return true;
}

/**
 * Checks if an event's conditions are met and it's within time gate
 * @param {Object} event - Event object with conditions and timeGate
 * @param {Object} state - Game state
 * @param {Object[]} [allEvents] - All events (for storylineActive checks)
 * @returns {boolean}
 */
function isEventEligible(event, state, allEvents = []) {
    // Check if event is terminated
    if (state.terminatedEvents?.has(event.id)) {
        return false;
    }

    // Check time gate
    if (!isWithinTimeGate(event, state)) {
        return false;
    }

    // Check conditions
    if (!event.conditions) {
        return true;
    }

    // Special handling for storylineActive condition
    let conditions = event.conditions;
    if (conditions.storylineActive) {
        const storyline = conditions.storylineActive;
        const hasStorylineEvents = state.deck.some(eventId => {
            const deckEvent = allEvents.find(e => e.id === eventId);
            return deckEvent && deckEvent.storylines?.includes(storyline);
        });
        if (!hasStorylineEvents) return false;
    }

    return evaluateCondition(conditions, state);
}

export {
    evaluateCondition,
    evaluateComparison,
    isEventEligible,
    isWithinTimeGate  // NEW export
};
```

---

## 4. Effect Applier Extensions

### File: `engine/effect-applier.js`

Add relationship changes and storyline weight modification:

```javascript
import {
    changeRelationship,
    setCharacterState,
    modifyStorylineWeight,
    terminateEvent
} from './game-state.js';

/**
 * Applies relationship changes
 * @param {Object} state - Game state
 * @param {Object<string, number>} relationshipChanges - Character relationship changes
 */
function applyRelationshipChanges(state, relationshipChanges) {
    if (!relationshipChanges || typeof relationshipChanges !== 'object') {
        return;
    }

    Object.entries(relationshipChanges).forEach(([characterId, change]) => {
        if (typeof change !== 'number') return;
        changeRelationship(state, characterId, change);
    });
}

/**
 * Applies character state changes
 * @param {Object} state - Game state
 * @param {Object<string, string>} characterStateChanges - Character state changes
 */
function applyCharacterStateChanges(state, characterStateChanges) {
    if (!characterStateChanges || typeof characterStateChanges !== 'object') {
        return;
    }

    Object.entries(characterStateChanges).forEach(([characterId, newState]) => {
        if (typeof newState !== 'string') return;
        setCharacterState(state, characterId, newState);
    });
}

/**
 * Applies storyline weight modifications
 * @param {Object} state - Game state
 * @param {Object} weightModifications - Storyline weight changes
 */
function applyStorylineWeightModifications(state, weightModifications) {
    if (!weightModifications || typeof weightModifications !== 'object') {
        return;
    }

    Object.entries(weightModifications).forEach(([storyline, modification]) => {
        const multiplier = modification.multiplier || 1.0;
        const bonus = modification.bonus || 0;
        modifyStorylineWeight(state, storyline, multiplier, bonus);
    });
}

/**
 * Applies event terminations
 * @param {Object} state - Game state
 * @param {string[]} eventIdsToTerminate - Event IDs to permanently block
 */
function applyTerminations(state, eventIdsToTerminate) {
    if (!Array.isArray(eventIdsToTerminate)) {
        return;
    }

    eventIdsToTerminate.forEach(eventId => {
        terminateEvent(state, eventId);
    });
}

/**
 * Applies all effects from a choice
 * @param {Object} state - Game state
 * @param {Object} effects - Effects object from choice
 * @param {Object} statBounds - Optional bounds for stats
 * @returns {Object} - Legacy object if present, null otherwise
 */
function applyEffects(state, effects, statBounds = {}) {
    if (!effects || typeof effects !== 'object') {
        return null;
    }

    // Apply stat changes
    if (effects.stats) {
        applyStatChanges(state, effects.stats, statBounds);
    }

    // Apply counter changes
    if (effects.counters) {
        applyCounterChanges(state, effects.counters);
    }

    // Apply flag changes
    if (effects.flags) {
        applyFlagChanges(state, effects.flags);
    }

    // NEW: Apply relationship changes
    if (effects.relationships) {
        applyRelationshipChanges(state, effects.relationships);
    }

    // NEW: Apply character state changes
    if (effects.characterStates) {
        applyCharacterStateChanges(state, effects.characterStates);
    }

    // NEW: Apply storyline weight modifications
    if (effects.modifyStorylineWeights) {
        applyStorylineWeightModifications(state, effects.modifyStorylineWeights);
    }

    // NEW: Apply event terminations
    if (effects.terminates) {
        applyTerminations(state, effects.terminates);
    }

    // Return legacy object if present
    return effects.legacy || null;
}

export {
    applyEffects,
    applyAutoCounters,
    applyStatChanges,
    applyCounterChanges,
    applyFlagChanges,
    // NEW exports
    applyRelationshipChanges,
    applyCharacterStateChanges,
    applyStorylineWeightModifications,
    applyTerminations
};
```

---

## 5. Deck Manager Extensions

### File: `engine/deck-manager.js`

Add dynamic weight calculation and onceOnly event handling:

```javascript
import { getEffectiveStorylineWeight } from './game-state.js';

/**
 * Calculates effective weight for an event based on state
 * @param {Object} event - Event object
 * @param {Object} state - Game state
 * @returns {number} - Effective weight
 */
function calculateEffectiveWeight(event, state) {
    let baseWeight = event.weight || 1;

    // Apply storyline weight modifiers
    if (event.storylines && event.storylines.length > 0) {
        // Use highest storyline weight if event belongs to multiple
        const storylineMultipliers = event.storylines.map(storyline => {
            return getEffectiveStorylineWeight(state, storyline, baseWeight) / baseWeight;
        });
        const maxMultiplier = Math.max(...storylineMultipliers, 1.0);
        baseWeight *= maxMultiplier;
    }

    // Apply event-specific weight modifiers
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
 * @returns {Object|null} - Selected event or null if none available
 */
function drawEvent(allEvents, deck, isEligibleFn, state) {
    // Filter to events in deck
    const deckEvents = deck
        .map(id => allEvents.find(e => e.id === id))
        .filter(e => e !== undefined);

    if (deckEvents.length === 0) {
        // Fallback: If deck is empty, add quiet_quarter to keep game going
        if (state.deck.length === 0) {
            state.deck.push('quiet_quarter');
            return drawEvent(allEvents, state.deck, isEligibleFn, state);
        }
        return null;
    }

    // Filter by eligibility
    const eligibleEvents = deckEvents.filter(event => {
        if (!event) return false;
        return isEligibleFn(event, state, allEvents);
    });

    if (eligibleEvents.length === 0) {
        return null;
    }

    // Calculate dynamic weights (NEW)
    const weightedEvents = eligibleEvents.map(event => {
        const weight = calculateEffectiveWeight(event, state);
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
 * @param {Object} event - Full event object (for onceOnly check)
 * @param {string[]} currentDeck - Current deck state
 * @returns {string[]} - New deck state
 */
function processChoiceDeckOperations(choice, eventId, event, currentDeck) {
    let newDeck = [...currentDeck];

    // Add events
    if (choice.add) {
        newDeck = addToDeck(choice.add, newDeck);
    }

    // Remove events
    if (choice.remove) {
        newDeck = removeFromDeck(choice.remove, newDeck);
    }

    // NEW: Handle onceOnly events (higher priority than recurring)
    if (event.onceOnly === true) {
        newDeck = removeFromDeck([eventId], newDeck);
        return newDeck; // Skip other self-management logic
    }

    // Handle self-removal/add
    const shouldRemoveSelf = choice.removeSelf !== undefined
        ? choice.removeSelf
        : !(event.recurring || false); // Default: remove if not recurring

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
    calculateEffectiveWeight  // NEW export
};
```

---

## 6. Game Engine Integration

### File: `engine/game-engine.js`

Update to pass full event object to deck operations and integrate new systems:

```javascript
import { createInitialState, addHistoryEntry, advanceTime, getDefaultStatBounds } from './game-state.js';
import { isEventEligible } from './condition-eval.js';
import { drawEvent, processChoiceDeckOperations } from './deck-manager.js';
import { applyEffects, applyAutoCounters } from './effect-applier.js';

class GameEngineV2 {
    /**
     * @param {Object[]} allEvents - All available events
     * @param {Object} [initialState] - Initial state overrides
     */
    constructor(allEvents, initialState = {}) {
        this.allEvents = allEvents;
        this.eventMap = new Map(allEvents.map(e => [e.id, e]));

        // Create initial state
        const initialDeck = initialState.deck || this.getInitialDeck();
        this.state = createInitialState(initialState.stats, initialDeck);

        // Merge any additional state properties
        Object.assign(this.state, initialState);

        this.statBounds = getDefaultStatBounds();
        this.currentEvent = null;
        this.isGameOver = false;
    }

    /**
     * Gets initial deck (events with no conditions or basic conditions)
     * @returns {string[]}
     */
    getInitialDeck() {
        const eligible = this.allEvents.filter(event => {
            // Exclude triggered-only events (weight <= 0)
            if (event.weight !== undefined && event.weight <= 0) return false;

            // NEW: Exclude events outside initial time gate
            if (event.timeGate) {
                const { minYear = 1, maxYear = 999, minQuarter = 1, maxQuarter = 4 } = event.timeGate;
                if (1 < minYear || 1 > maxYear) return false;
                if (1 < minQuarter || 1 > maxQuarter) return false;
            }

            // Include events with no conditions or only basic stat conditions
            if (!event.conditions) return true;
            const cond = event.conditions;
            // Exclude events that require flags, counters, or complex logic
            return !cond.flags && !cond.counters && !cond.all && !cond.any && !cond.not
                && !cond.year && !cond.quarter && !cond.turn && !cond.relationships;
        });

        const deck = [];

        // Always include quiet_quarter if available (pacing event)
        const quiet = eligible.find(e => e.id === 'quiet_quarter');
        if (quiet) {
            deck.push(quiet.id);
        }

        // Pool for remaining selection (exclude already added)
        let pool = eligible.filter(e => !deck.includes(e.id));
        const targetSize = 7;

        // Weighted random selection without replacement
        while (deck.length < targetSize && pool.length > 0) {
            // Calculate weights based on rarity
            const weights = pool.map(e => {
                const rarity = e.rarity || 'common';
                if (rarity === 'common') return 10;
                if (rarity === 'rare') return 2;
                return 1; // epic/legendary
            });

            const totalWeight = weights.reduce((a, b) => a + b, 0);
            let random = Math.random() * totalWeight;

            let selectedIndex = -1;
            for (let i = 0; i < pool.length; i++) {
                random -= weights[i];
                if (random <= 0) {
                    selectedIndex = i;
                    break;
                }
            }

            if (selectedIndex === -1) selectedIndex = pool.length - 1;

            deck.push(pool[selectedIndex].id);
            pool.splice(selectedIndex, 1);
        }

        return deck;
    }

    /**
     * Draws the next event from the deck
     * @returns {Object|null} - Event or null if none available
     */
    drawNextEvent() {
        const event = drawEvent(
            this.allEvents,
            this.state.deck,
            isEventEligible,
            this.state
        );

        this.currentEvent = event;

        // NEW: Apply onceOnly removal immediately on draw (before choice)
        if (event && event.onceOnly === true) {
            // Remove from deck immediately
            this.state.deck = this.state.deck.filter(id => id !== event.id);
        }

        return event;
    }

    /**
     * Gets the appropriate description for an event based on narrative variations
     * @param {Object} event - Event object
     * @returns {Object} - {title, description}
     */
    getNarrativeForEvent(event) {
        if (!event.narrativeVariations || event.narrativeVariations.length === 0) {
            return {
                title: event.title,
                description: event.description
            };
        }

        // Find first matching variation
        for (const variation of event.narrativeVariations) {
            if (evaluateCondition(variation.conditions, this.state)) {
                return {
                    title: variation.title || event.title,
                    description: variation.description || event.description
                };
            }
        }

        // No variation matched, return default
        return {
            title: event.title,
            description: event.description
        };
    }

    /**
     * Makes a choice for the current event
     * @param {number} choiceIndex - Index of choice selected
     * @returns {Object} - Result object with effects applied
     */
    makeChoice(choiceIndex) {
        if (!this.currentEvent) {
            throw new Error('No current event');
        }

        const event = this.currentEvent;
        const choice = event.choices[choiceIndex];

        if (!choice) {
            throw new Error(`Invalid choice index: ${choiceIndex}`);
        }

        // Apply effects
        const legacy = applyEffects(this.state, choice.effects, this.statBounds);

        // Apply auto-counters
        applyAutoCounters(this.state, event.id, choiceIndex);

        // Process deck operations (UPDATED: pass full event object)
        this.state.deck = processChoiceDeckOperations(
            choice,
            event.id,
            event,  // NEW: pass full event for onceOnly check
            this.state.deck
        );

        // Add history entry
        addHistoryEntry(this.state, {
            event: event.id,
            eventTitle: event.title,
            choice: choiceIndex,
            choiceText: choice.text,
            effects: choice.effects || {},
            legacy: legacy || null
        });

        // Advance time
        advanceTime(this.state);

        // Check game over conditions
        this.checkGameOver();

        return {
            event,
            choice,
            effects: choice.effects,
            legacy,
            state: this.state,
            isGameOver: this.isGameOver
        };
    }

    /**
     * Checks if game over conditions are met
     */
    checkGameOver() {
        const { stats } = this.state;

        if (stats.treasury <= 0) {
            this.isGameOver = true;
            this.gameOverReason = 'bankruptcy';
        } else if (stats.elite <= 0) {
            this.isGameOver = true;
            this.gameOverReason = 'coup';
        } else if (stats.anger >= 100) {
            this.isGameOver = true;
            this.gameOverReason = 'revolution';
        }
    }

    /**
     * Gets current game state
     * @returns {Object}
     */
    getState() {
        return this.state;
    }

    /**
     * Gets current event
     * @returns {Object|null}
     */
    getCurrentEvent() {
        return this.currentEvent;
    }
}

export default GameEngineV2;
```

---

## 7. Validation Updates

### File: `events/schema.js`

Add validation for new properties:

```javascript
/**
 * Validates an event object against the v2.1 schema
 * @param {Event} event - Event to validate
 * @param {Set<string>} allEventIds - Set of all valid event IDs
 * @returns {{valid: boolean, errors: string[], warnings: string[]}}
 */
function validateEvent(event, allEventIds = new Set()) {
    const errors = [];
    const warnings = [];

    // ... existing validation ...

    // NEW: Validate timeGate
    if (event.timeGate) {
        const tg = event.timeGate;
        if (tg.minYear !== undefined && typeof tg.minYear !== 'number') {
            errors.push(`Event "${event.id}" timeGate.minYear must be a number`);
        }
        if (tg.maxYear !== undefined && typeof tg.maxYear !== 'number') {
            errors.push(`Event "${event.id}" timeGate.maxYear must be a number`);
        }
        if (tg.minQuarter !== undefined && (typeof tg.minQuarter !== 'number' || tg.minQuarter < 1 || tg.minQuarter > 4)) {
            errors.push(`Event "${event.id}" timeGate.minQuarter must be 1-4`);
        }
        if (tg.maxQuarter !== undefined && (typeof tg.maxQuarter !== 'number' || tg.maxQuarter < 1 || tg.maxQuarter > 4)) {
            errors.push(`Event "${event.id}" timeGate.maxQuarter must be 1-4`);
        }

        // Logical validation
        if (tg.minYear && tg.maxYear && tg.minYear > tg.maxYear) {
            errors.push(`Event "${event.id}" timeGate.minYear > maxYear (impossible condition)`);
        }
    }

    // NEW: Validate onceOnly
    if (event.onceOnly !== undefined && typeof event.onceOnly !== 'boolean') {
        errors.push(`Event "${event.id}" onceOnly must be a boolean`);
    }

    // NEW: Validate weightModifiers
    if (event.weightModifiers) {
        if (!Array.isArray(event.weightModifiers)) {
            errors.push(`Event "${event.id}" weightModifiers must be an array`);
        } else {
            event.weightModifiers.forEach((mod, idx) => {
                if (mod.multiplier !== undefined && typeof mod.multiplier !== 'number') {
                    errors.push(`Event "${event.id}" weightModifier ${idx} multiplier must be a number`);
                }
                if (mod.bonus !== undefined && typeof mod.bonus !== 'number') {
                    errors.push(`Event "${event.id}" weightModifier ${idx} bonus must be a number`);
                }
            });
        }
    }

    // NEW: Validate narrativeVariations
    if (event.narrativeVariations) {
        if (!Array.isArray(event.narrativeVariations)) {
            errors.push(`Event "${event.id}" narrativeVariations must be an array`);
        } else {
            event.narrativeVariations.forEach((variation, idx) => {
                if (!variation.conditions) {
                    warnings.push(`Event "${event.id}" narrativeVariation ${idx} has no conditions (will never match)`);
                }
                if (!variation.title && !variation.description) {
                    warnings.push(`Event "${event.id}" narrativeVariation ${idx} has no title or description (useless variation)`);
                }
            });
        }
    }

    // NEW: Validate characterId
    if (event.characterId !== undefined && typeof event.characterId !== 'string') {
        errors.push(`Event "${event.id}" characterId must be a string`);
    }

    // NEW: Validate choice effects
    if (event.choices) {
        event.choices.forEach((choice, idx) => {
            if (choice.effects) {
                // Validate relationships
                if (choice.effects.relationships) {
                    if (typeof choice.effects.relationships !== 'object') {
                        errors.push(`Event "${event.id}" choice ${idx} effects.relationships must be an object`);
                    }
                }

                // Validate characterStates
                if (choice.effects.characterStates) {
                    if (typeof choice.effects.characterStates !== 'object') {
                        errors.push(`Event "${event.id}" choice ${idx} effects.characterStates must be an object`);
                    } else {
                        Object.entries(choice.effects.characterStates).forEach(([char, state]) => {
                            if (!['alive', 'arrested', 'exiled', 'dead'].includes(state)) {
                                warnings.push(`Event "${event.id}" choice ${idx} sets unusual character state "${state}" for ${char}`);
                            }
                        });
                    }
                }

                // Validate modifyStorylineWeights
                if (choice.effects.modifyStorylineWeights) {
                    if (typeof choice.effects.modifyStorylineWeights !== 'object') {
                        errors.push(`Event "${event.id}" choice ${idx} effects.modifyStorylineWeights must be an object`);
                    }
                }

                // Validate terminates
                if (choice.effects.terminates) {
                    if (!Array.isArray(choice.effects.terminates)) {
                        errors.push(`Event "${event.id}" choice ${idx} effects.terminates must be an array`);
                    }
                }
            }
        });
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}
```

---

## 8. Implementation Checklist

### Phase 1: Core Systems (Foundation)

- [ ] **game-state.js**
  - [ ] Add `relationships` object to initial state
  - [ ] Add `characterStates` object to initial state
  - [ ] Add `storylineWeights` object to initial state
  - [ ] Add `terminatedEvents` Set to initial state
  - [ ] Add `turn` counter to initial state
  - [ ] Implement `setRelationship()`, `changeRelationship()`, `getRelationship()`
  - [ ] Implement `setCharacterState()`, `getCharacterState()`
  - [ ] Implement `modifyStorylineWeight()`, `getEffectiveStorylineWeight()`
  - [ ] Implement `terminateEvent()`, `isEventTerminated()`
  - [ ] Update `advanceTime()` to increment turn counter
  - [ ] Update exports

- [ ] **condition-eval.js**
  - [ ] Add `year` condition support
  - [ ] Add `quarter` condition support
  - [ ] Add `turn` condition support
  - [ ] Add `relationship` condition support
  - [ ] Add `relationships` object condition support
  - [ ] Add `characterState` condition support
  - [ ] Add `storylineActive` condition support (placeholder)
  - [ ] Implement `isWithinTimeGate()` function
  - [ ] Update `isEventEligible()` to check time gates and terminations
  - [ ] Update `isEventEligible()` signature to accept `allEvents` parameter
  - [ ] Update exports

- [ ] **effect-applier.js**
  - [ ] Import new game-state functions
  - [ ] Implement `applyRelationshipChanges()`
  - [ ] Implement `applyCharacterStateChanges()`
  - [ ] Implement `applyStorylineWeightModifications()`
  - [ ] Implement `applyTerminations()`
  - [ ] Update `applyEffects()` to call new functions
  - [ ] Update exports

- [ ] **deck-manager.js**
  - [ ] Import `evaluateCondition` for weight modifiers
  - [ ] Import `getEffectiveStorylineWeight` from game-state
  - [ ] Implement `calculateEffectiveWeight()` function
  - [ ] Update `drawEvent()` to use `calculateEffectiveWeight()`
  - [ ] Update `processChoiceDeckOperations()` signature to accept full event object
  - [ ] Add `onceOnly` handling in `processChoiceDeckOperations()`
  - [ ] Update exports

- [ ] **game-engine.js**
  - [ ] Update `getInitialDeck()` to filter by timeGate
  - [ ] Update `getInitialDeck()` to exclude events with new condition types
  - [ ] Update `drawNextEvent()` to handle onceOnly immediately
  - [ ] Implement `getNarrativeForEvent()` for narrative variations
  - [ ] Update `makeChoice()` to pass full event to deck operations
  - [ ] Import `evaluateCondition` for narrative variations

- [ ] **schema.js**
  - [ ] Add JSDoc type definitions for v2.1 features
  - [ ] Update `validateEvent()` with new validations
  - [ ] Add warnings for common mistakes

### Phase 2: Testing

- [ ] **Unit Tests**
  - [ ] Test relationship tracking (set, change, get)
  - [ ] Test character state tracking
  - [ ] Test storyline weight modification
  - [ ] Test event termination
  - [ ] Test time gate conditions (year, quarter, turn)
  - [ ] Test relationship conditions
  - [ ] Test dynamic weight calculation
  - [ ] Test onceOnly event removal
  - [ ] Test narrative variations

- [ ] **Integration Tests**
  - [ ] Test full game flow with new features
  - [ ] Test backward compatibility with old events
  - [ ] Test edge cases (empty relationships, missing storylines, etc.)

### Phase 3: Documentation

- [ ] Update EVENT_SYSTEM.md with new features
- [ ] Add examples of new event properties
- [ ] Document best practices for time gates
- [ ] Document relationship system
- [ ] Document dynamic weight system

---

## 9. Backward Compatibility

All changes are **backward compatible**:

- Existing events without new properties continue to work unchanged
- New state properties initialized to safe defaults
- New condition types are additive (don't break existing conditions)
- New effect types are additive (don't break existing effects)
- Weight calculation falls back to base weight if no modifiers present
- Time gate defaults to "always available" if not specified

**Migration required:** None - existing content works as-is.

---

## 10. Performance Considerations

**Potential bottlenecks:**

1. **Dynamic weight calculation** - Called every draw
   - Mitigation: Cache calculated weights per turn
   - Alternative: Pre-calculate at turn start

2. **Narrative variation evaluation** - Called for every event display
   - Mitigation: Evaluate once when event drawn, cache result
   - Alternative: Limit variations to 2-3 per event

3. **Storyline weight tracking** - O(n) storylines per event
   - Current impact: Negligible (< 10 storylines)
   - No optimization needed unless storylines >> 50

**Memory impact:**
- Relationships: ~10-20 characters × 1 number = trivial
- Character states: ~10-20 characters × 1 string = trivial
- Storyline weights: ~10 storylines × 2 numbers = trivial
- Terminated events: Set of strings, grows with game length (< 1KB)

**Overall:** Performance impact is negligible for expected game size.

---

## 11. Example Event Using New Features

```javascript
{
    id: "dacha_summit",
    title: "The Dacha Summit",
    description: "Your inner circle gathers at the presidential dacha...",

    // NEW: Time gate - only appears in Year 1, Q1-3
    timeGate: {
        minYear: 1,
        maxYear: 1,
        minQuarter: 1,
        maxQuarter: 3
    },

    // NEW: Remove after first appearance
    onceOnly: true,

    // NEW: Very high weight to ensure early appearance
    weight: 25,
    rarity: "legendary",

    // NEW: Increase weight if Elite is high (more urgency if everything stable)
    weightModifiers: [
        {
            conditions: { stat: "elite", gte: 80 },
            multiplier: 1.5
        }
    ],

    storylines: ["early-game-agenda"],

    choices: [
        {
            text: "Align with the Siloviki",
            effects: {
                stats: { elite: 10, treasury: -50, personalWealth: 5 },
                flags: { aligned_military: true },

                // NEW: Modify storyline weights
                modifyStorylineWeights: {
                    "war-invasion": { multiplier: 1.5, bonus: 0 },
                    "shadow-war": { multiplier: 1.5, bonus: 0 }
                }
            }
        },
        {
            text: "Align with the Oligarchs",
            effects: {
                stats: { elite: 15, treasury: 50, personalWealth: 10 },
                flags: { aligned_business: true },

                // NEW: Relationship tracking
                relationships: { dmitri_aluminum: 25 },

                modifyStorylineWeights: {
                    "energy-politics": { multiplier: 1.5, bonus: 0 },
                    "war-invasion": { multiplier: 0.5, bonus: 0 }
                }
            },
            add: ["dmitri_introduction"]  // Introduces Dmitri early
        }
    ]
}
```

---

## 12. Next Steps

After technical implementation is complete:

1. **Create test events** to verify all new features work
2. **Write early-game-agenda.storyline.js** with the 4 core events from design doc
3. **Playtest** extensively to ensure balance
4. **Performance profiling** to verify no bottlenecks
5. **Documentation update** for content creators

---

*This technical specification is ready for implementation. All changes are scoped, backward compatible, and performance-conscious.*
