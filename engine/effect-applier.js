/**
 * Event System 2.0 - Effect Applier
 * 
 * Applies choice effects to game state (stats, counters, flags)
 */

/**
 * Clamps a value to bounds
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number}
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

/**
 * Applies stat changes with bounds
 * @param {Object} state - Game state
 * @param {Object<string, number>} statChanges - Stat changes to apply
 * @param {Object<string, {min: number, max: number}>} statBounds - Bounds for each stat
 */
function applyStatChanges(state, statChanges, statBounds = {}) {
    if (!statChanges || typeof statChanges !== 'object') {
        return;
    }

    Object.entries(statChanges).forEach(([statName, change]) => {
        if (typeof change !== 'number') {
            return;
        }

        const currentValue = state.stats[statName] || 0;
        const newValue = currentValue + change;

        // Apply bounds if specified
        const bounds = statBounds[statName];
        if (bounds) {
            state.stats[statName] = clamp(newValue, bounds.min, bounds.max);
        } else {
            state.stats[statName] = newValue;
        }
    });
}

/**
 * Applies counter changes
 * @param {Object} state - Game state
 * @param {Object<string, number>} counterChanges - Counter changes to apply
 */
function applyCounterChanges(state, counterChanges) {
    if (!counterChanges || typeof counterChanges !== 'object') {
        return;
    }

    Object.entries(counterChanges).forEach(([counterName, change]) => {
        if (typeof change !== 'number') {
            return;
        }

        const currentValue = state.counters[counterName] || 0;
        state.counters[counterName] = currentValue + change;
    });
}

/**
 * Applies flag changes
 * @param {Object} state - Game state
 * @param {Object<string, boolean>} flagChanges - Flag changes to apply
 */
function applyFlagChanges(state, flagChanges) {
    if (!flagChanges || typeof flagChanges !== 'object') {
        return;
    }

    Object.entries(flagChanges).forEach(([flagName, value]) => {
        if (typeof value !== 'boolean') {
            return;
        }

        state.flags[flagName] = value;
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

    // Return legacy object if present
    return effects.legacy || null;
}

/**
 * Auto-increments counters for event draw and choice selection
 * @param {Object} state - Game state
 * @param {string} eventId - Event ID that was drawn
 * @param {number} choiceIndex - Index of choice selected
 */
function applyAutoCounters(state, eventId, choiceIndex) {
    // Increment event draw counter
    const eventCounterKey = `event:${eventId}`;
    state.counters[eventCounterKey] = (state.counters[eventCounterKey] || 0) + 1;

    // Increment choice counter
    const choiceCounterKey = `choice:${eventId}_${choiceIndex}`;
    state.counters[choiceCounterKey] = (state.counters[choiceCounterKey] || 0) + 1;
}

export {
    applyEffects,
    applyAutoCounters,
    applyStatChanges,
    applyCounterChanges,
    applyFlagChanges
};

