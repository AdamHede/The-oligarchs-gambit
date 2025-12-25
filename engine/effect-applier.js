/**
 * Event System 2.0 - Effect Applier
 *
 * Applies choice effects to game state (stats, counters, flags)
 *
 * v2.1 additions:
 * - Relationship changes
 * - Character state changes
 * - Storyline weight modifications
 * - Event terminations
 */

import {
    changeRelationship,
    setCharacterState,
    modifyStorylineWeight,
    terminateEvent
} from './game-state.js';

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

// =============================================================================
// v2.1 Effect Functions
// =============================================================================

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

// Known stat keys for backward compatibility with flat effects format
const STAT_KEYS = new Set(['personalWealth', 'treasury', 'elite', 'anger']);

/**
 * Applies all effects from a choice
 * Supports both legacy flat format: { personalWealth: 5, treasury: -10 }
 * And v2.1 nested format: { stats: { personalWealth: 5 }, flags: { ... } }
 *
 * @param {Object} state - Game state
 * @param {Object} effects - Effects object from choice
 * @param {Object} statBounds - Optional bounds for stats
 * @returns {Object} - Legacy object if present, null otherwise
 */
function applyEffects(state, effects, statBounds = {}) {
    if (!effects || typeof effects !== 'object') {
        return null;
    }

    // Backward compatibility: Handle both flat and nested stat formats
    // If effects.stats exists, use it (v2.1 format)
    // Otherwise, extract stat keys from flat effects (legacy format)
    if (effects.stats) {
        applyStatChanges(state, effects.stats, statBounds);
    } else {
        // Legacy flat format: check for stat keys at top level
        const flatStats = {};
        let hasStats = false;
        for (const key of STAT_KEYS) {
            if (typeof effects[key] === 'number') {
                flatStats[key] = effects[key];
                hasStats = true;
            }
        }
        if (hasStats) {
            applyStatChanges(state, flatStats, statBounds);
        }
    }

    // Apply counter changes
    if (effects.counters) {
        applyCounterChanges(state, effects.counters);
    }

    // Apply flag changes
    if (effects.flags) {
        applyFlagChanges(state, effects.flags);
    }

    // v2.1: Apply relationship changes
    if (effects.relationships) {
        applyRelationshipChanges(state, effects.relationships);
    }

    // v2.1: Apply character state changes
    if (effects.characterStates) {
        applyCharacterStateChanges(state, effects.characterStates);
    }

    // v2.1: Apply storyline weight modifications
    if (effects.modifyStorylineWeights) {
        applyStorylineWeightModifications(state, effects.modifyStorylineWeights);
    }

    // v2.1: Apply event terminations
    if (effects.terminates) {
        applyTerminations(state, effects.terminates);
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
    applyFlagChanges,
    // v2.1 exports
    applyRelationshipChanges,
    applyCharacterStateChanges,
    applyStorylineWeightModifications,
    applyTerminations
};

