/**
 * Event System 2.0 - Game State Manager
 *
 * Manages the overall game state structure
 *
 * v2.1 additions:
 * - Relationship tracking (0-100 scale)
 * - Character state tracking (alive, arrested, exiled, dead)
 * - Dynamic storyline weight modifiers
 * - Event termination tracking
 * - Absolute turn counter
 */

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
        relationships: {},        // v2.1: Character relationship tracking (0-100)
        characterStates: {},      // v2.1: Character states (alive, arrested, exiled, dead)
        storylineWeights: {},     // v2.1: Dynamic storyline weight modifiers
        terminatedEvents: new Set(), // v2.1: Permanently blocked event IDs
        deck: [...initialDeck],
        history: [],
        year: 1,
        quarter: 1,
        turn: 0                   // v2.1: Absolute turn counter
        // Note: exclusiveGroups and entityDependencies are stored in the registry,
        // not in game state, as they're static data compiled from storylines
    };
}

/**
 * Adds an entry to game history
 * @param {Object} state - Game state
 * @param {Object} entry - History entry
 */
function addHistoryEntry(state, entry) {
    if (!state.history) {
        state.history = [];
    }

    state.history.push({
        turn: state.history.length + 1,
        year: state.year,
        quarter: state.quarter,
        ...entry
    });
}

/**
 * Advances time (quarter/year/turn)
 * @param {Object} state - Game state
 */
function advanceTime(state) {
    state.turn = (state.turn || 0) + 1;  // v2.1: Increment absolute turn counter
    state.quarter++;
    if (state.quarter > 4) {
        state.quarter = 1;
        state.year++;
    }
}

/**
 * Gets default stat bounds
 * @returns {Object<string, {min: number, max: number}>}
 */
function getDefaultStatBounds() {
    return {
        personalWealth: { min: 0, max: 200 },
        treasury: { min: 0, max: 2000 },
        elite: { min: 0, max: 100 },
        anger: { min: 0, max: 100 }
    };
}

// =============================================================================
// v2.1 Relationship Functions
// =============================================================================

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
    const current = state.relationships?.[characterId] ?? 50; // Default neutral
    setRelationship(state, characterId, current + delta);
}

/**
 * Gets a character's relationship value
 * @param {Object} state - Game state
 * @param {string} characterId - Character identifier
 * @returns {number} - Relationship value (0-100, default 50)
 */
function getRelationship(state, characterId) {
    return state.relationships?.[characterId] ?? 50;
}

// =============================================================================
// v2.1 Character State Functions
// =============================================================================

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

// =============================================================================
// v2.1 Storyline Weight Functions
// =============================================================================

/**
 * Modifies a storyline's weight
 * @param {Object} state - Game state
 * @param {string} storyline - Storyline identifier
 * @param {number} multiplier - Weight multiplier (compounds with existing)
 * @param {number} bonus - Flat bonus (adds to existing)
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

// =============================================================================
// v2.1 Event Termination Functions
// =============================================================================

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
    // v2.1 relationship exports
    setRelationship,
    changeRelationship,
    getRelationship,
    // v2.1 character state exports
    setCharacterState,
    getCharacterState,
    // v2.1 storyline weight exports
    modifyStorylineWeight,
    getEffectiveStorylineWeight,
    // v2.1 termination exports
    terminateEvent,
    isEventTerminated
};

