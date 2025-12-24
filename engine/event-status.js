/**
 * Global Event Status Access
 *
 * This module provides easy access to event status from anywhere in the game.
 * It maintains a singleton reference to the active game engine.
 *
 * Usage:
 *   import { events } from './engine/event-status.js';
 *
 *   // In your code:
 *   if (events.hasPassed('war_special_operation_proposal')) { ... }
 *   if (events.isBlocked('conscription_crisis')) { ... }
 *   const warProgress = events.storylineProgress('war-invasion');
 */

import { EventStatus } from './event-tracker.js';

// Singleton reference to active engine
let _engine = null;

/**
 * Initialize the event status system with an engine
 * Call this when creating your game engine
 * @param {StorylineEngine} engine
 */
export function initEventStatus(engine) {
    _engine = engine;
}

/**
 * Clear the engine reference (for cleanup/testing)
 */
export function clearEventStatus() {
    _engine = null;
}

/**
 * Get the current engine (throws if not initialized)
 */
function getEngine() {
    if (!_engine) {
        throw new Error('Event status not initialized. Call initEventStatus(engine) first.');
    }
    return _engine;
}

/**
 * Event status query object
 * Import this and use its methods to check event states
 */
export const events = {
    /**
     * Check if an event has been drawn and resolved
     * @param {string} eventId
     * @returns {boolean}
     */
    hasPassed(eventId) {
        return getEngine().hasEventOccurred(eventId);
    },

    /**
     * Check if an event is currently in the deck (can be drawn)
     * @param {string} eventId
     * @returns {boolean}
     */
    isAvailable(eventId) {
        return getEngine().isEventAvailable(eventId);
    },

    /**
     * Check if an event is permanently blocked (can never occur)
     * @param {string} eventId
     * @returns {boolean}
     */
    isBlocked(eventId) {
        return getEngine().isEventBlocked(eventId);
    },

    /**
     * Check if an event could still be reached through future choices
     * @param {string} eventId
     * @returns {boolean}
     */
    isReachable(eventId) {
        return getEngine().isEventReachable(eventId);
    },

    /**
     * Get the full status of an event
     * @param {string} eventId
     * @returns {string} One of: 'passed', 'available', 'reachable', 'blocked', 'unknown'
     */
    getStatus(eventId) {
        return getEngine().getStatusOf(eventId);
    },

    /**
     * Check if a specific choice was made on an event
     * @param {string} eventId
     * @param {number} choiceIndex
     * @returns {boolean}
     */
    wasChoiceMade(eventId, choiceIndex) {
        return getEngine().wasChoiceMade(eventId, choiceIndex);
    },

    /**
     * Get the choice that was made for an event (if any)
     * @param {string} eventId
     * @returns {number|null} Choice index or null
     */
    getChoiceMade(eventId) {
        const entry = getEngine().state.history?.find(h => h.event === eventId);
        return entry ? entry.choice : null;
    },

    /**
     * Get all passed events
     * @returns {Set<string>}
     */
    allPassed() {
        return getEngine().getEventStatus().passed;
    },

    /**
     * Get all available events (in deck)
     * @returns {Set<string>}
     */
    allAvailable() {
        return getEngine().getEventStatus().available;
    },

    /**
     * Get all blocked events
     * @returns {Set<string>}
     */
    allBlocked() {
        return getEngine().getEventStatus().blocked;
    },

    /**
     * Get all reachable events
     * @returns {Set<string>}
     */
    allReachable() {
        return getEngine().getEventStatus().reachable;
    },

    /**
     * Get progress for a specific storyline
     * @param {string} storylineId
     * @returns {Object} { total, passed, available, reachable, blocked, percentComplete, percentBlocked }
     */
    storylineProgress(storylineId) {
        return getEngine().getStorylineProgress(storylineId);
    },

    /**
     * Get progress for all storylines
     * @returns {Object} Map of storylineId -> progress
     */
    allStorylineProgress() {
        return getEngine().getAllStorylineProgress();
    },

    /**
     * Get what events would be unlocked/blocked by a choice
     * @param {string} eventId
     * @param {number} choiceIndex
     * @returns {Object} { unlocks: string[], terminates: string[] }
     */
    choiceConsequences(eventId, choiceIndex) {
        return getEngine().getChoiceConsequences(eventId, choiceIndex);
    },

    /**
     * Get all descendants of an event (full subtree)
     * @param {string} eventId
     * @returns {Set<string>}
     */
    descendants(eventId) {
        return getEngine().getEventDescendants(eventId);
    },

    /**
     * Get all ancestors of an event (what can lead to it)
     * @param {string} eventId
     * @returns {Set<string>}
     */
    ancestors(eventId) {
        return getEngine().getEventAncestors(eventId);
    },

    /**
     * Get a debug summary
     * @returns {Object}
     */
    debug() {
        return getEngine().getDebugSummary();
    }
};

// Re-export EventStatus enum for convenience
export { EventStatus };

/**
 * Condition helpers for use in event conditions
 * These can be used in custom condition evaluation
 */
export const eventConditions = {
    /**
     * Condition: event has passed
     */
    passed: (eventId) => events.hasPassed(eventId),

    /**
     * Condition: event is blocked
     */
    blocked: (eventId) => events.isBlocked(eventId),

    /**
     * Condition: event is available
     */
    available: (eventId) => events.isAvailable(eventId),

    /**
     * Condition: specific choice was made
     */
    chose: (eventId, choiceIndex) => events.wasChoiceMade(eventId, choiceIndex),

    /**
     * Condition: storyline progress above threshold
     */
    storylineProgress: (storylineId, minPercent) => {
        const progress = events.storylineProgress(storylineId);
        return progress && progress.percentComplete >= minPercent;
    }
};
