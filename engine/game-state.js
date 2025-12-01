/**
 * Event System 2.0 - Game State Manager
 * 
 * Manages the overall game state structure
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
        deck: [...initialDeck],
        history: [],
        year: 1,
        quarter: 1
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
 * Advances time (quarter/year)
 * @param {Object} state - Game state
 */
function advanceTime(state) {
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

module.exports = {
    createInitialState,
    addHistoryEntry,
    advanceTime,
    getDefaultStatBounds
};

