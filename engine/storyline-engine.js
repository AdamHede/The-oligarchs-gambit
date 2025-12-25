/**
 * Storyline Engine - Enhanced game engine with event tracking
 *
 * This engine wraps GameEngineV2 and adds:
 * - Full event status tracking (passed, available, reachable, blocked)
 * - Storyline progress tracking
 * - Integration with the new tree-based storyline format
 */

import { GameEngineV2 } from './game-engine.js';
import { compileStorylines, getEventsArray } from './storyline-dsl.js';
import { EventTracker, EventStatus, getEventStatusHelper } from './event-tracker.js';

/**
 * StorylineEngine - Main game engine with full event tracking
 */
export class StorylineEngine extends GameEngineV2 {
    /**
     * @param {Object[]} storylines - Array of storyline definitions (from defineStoryline)
     * @param {Object[]} legacyEvents - Optional legacy format events to include
     * @param {Object} initialState - Initial state overrides
     */
    constructor(storylines, legacyEvents = [], initialState = {}) {
        // Compile storylines into registry
        const registry = compileStorylines(storylines);

        // Get flat event array for base engine compatibility
        const storylineEvents = getEventsArray(registry);

        // Merge with any legacy events
        const allEvents = [...storylineEvents, ...legacyEvents];

        // Initialize base engine
        super(allEvents, initialState);

        // Store registry for tracking
        this.registry = registry;
        this.storylines = storylines;

        // Create event tracker
        this.tracker = new EventTracker(registry);

        // Cache for performance
        this._statusCache = null;
        this._statusCacheTurn = -1;
    }

    /**
     * Gets current event status (with caching)
     * @returns {Object} Status with passed, available, reachable, blocked sets
     */
    getEventStatus() {
        const currentTurn = this.state.history.length;

        // Invalidate cache if state has changed
        if (this._statusCacheTurn !== currentTurn) {
            this._statusCache = this.tracker.getStatus(this.state);
            this._statusCacheTurn = currentTurn;
        }

        return this._statusCache;
    }

    /**
     * Gets helper object for querying event status
     * Use this in card rendering, UI, etc.
     * @returns {Object} Helper with convenient query methods
     */
    getStatusHelper() {
        return getEventStatusHelper(this.tracker, this.state);
    }

    /**
     * Checks if an event has occurred
     * @param {string} eventId
     * @returns {boolean}
     */
    hasEventOccurred(eventId) {
        return this.tracker.hasEventOccurred(eventId, this.state);
    }

    /**
     * Checks if a specific choice was made
     * @param {string} eventId
     * @param {number} choiceIndex
     * @returns {boolean}
     */
    wasChoiceMade(eventId, choiceIndex) {
        return this.tracker.wasChoiceMade(eventId, choiceIndex, this.state);
    }

    /**
     * Gets the status of a single event
     * @param {string} eventId
     * @returns {string} One of EventStatus values
     */
    getStatusOf(eventId) {
        const status = this.getEventStatus();
        return this.tracker.getEventStatus(eventId, status);
    }

    /**
     * Checks if an event is permanently blocked
     * @param {string} eventId
     * @returns {boolean}
     */
    isEventBlocked(eventId) {
        return this.getStatusOf(eventId) === EventStatus.BLOCKED;
    }

    /**
     * Checks if an event is still reachable
     * @param {string} eventId
     * @returns {boolean}
     */
    isEventReachable(eventId) {
        return this.getStatusOf(eventId) === EventStatus.REACHABLE;
    }

    /**
     * Checks if an event is currently available (in deck)
     * @param {string} eventId
     * @returns {boolean}
     */
    isEventAvailable(eventId) {
        return this.getStatusOf(eventId) === EventStatus.AVAILABLE;
    }

    /**
     * Gets progress for a specific storyline
     * @param {string} storylineId
     * @returns {Object|null} Progress summary
     */
    getStorylineProgress(storylineId) {
        return this.tracker.getStorylineProgress(storylineId, this.state);
    }

    /**
     * Gets progress for all storylines
     * @returns {Object} Map of storylineId -> progress
     */
    getAllStorylineProgress() {
        const progress = {};
        for (const storylineId of Object.keys(this.registry.storylines)) {
            progress[storylineId] = this.getStorylineProgress(storylineId);
        }
        return progress;
    }

    /**
     * Gets all events that would be blocked if a choice is made
     * Useful for showing consequences to player
     * @param {string} eventId - Current event
     * @param {number} choiceIndex - Choice being considered
     * @returns {string[]} Array of event IDs that would be blocked
     */
    getChoiceConsequences(eventId, choiceIndex) {
        const treeInfo = this.registry.globalTree[eventId];
        if (!treeInfo) return { unlocks: [], terminates: [] };

        return {
            unlocks: treeInfo.children[choiceIndex] || [],
            terminates: treeInfo.terminates[choiceIndex] || []
        };
    }

    /**
     * Gets what events this event can lead to (direct children)
     * @param {string} eventId
     * @returns {Object} Map of choiceIndex -> child event IDs
     */
    getEventChildren(eventId) {
        const treeInfo = this.registry.globalTree[eventId];
        return treeInfo?.children || {};
    }

    /**
     * Gets all descendants of an event (full subtree)
     * @param {string} eventId
     * @returns {Set<string>}
     */
    getEventDescendants(eventId) {
        return this.tracker.getEventDescendants(eventId);
    }

    /**
     * Gets all ancestors of an event (what can lead to it)
     * @param {string} eventId
     * @returns {Set<string>}
     */
    getEventAncestors(eventId) {
        return this.tracker.getEventAncestors(eventId);
    }

    /**
     * Enhanced makeChoice that invalidates cache
     * @param {number} choiceIndex
     * @returns {Object}
     */
    makeChoice(choiceIndex) {
        // Invalidate status cache
        this._statusCache = null;
        this._statusCacheTurn = -1;

        return super.makeChoice(choiceIndex);
    }

    /**
     * Gets a debug summary of current event states
     * @returns {Object}
     */
    getDebugSummary() {
        const status = this.getEventStatus();
        return {
            total: Object.keys(this.registry.events).length,
            passed: status.passed.size,
            available: status.available.size,
            reachable: status.reachable.size,
            blocked: status.blocked.size,
            storylines: this.getAllStorylineProgress()
        };
    }
}

/**
 * Creates a StorylineEngine from storyline modules
 * @param {Object[]} storylines - Array of storyline definitions
 * @param {Object[]} legacyEvents - Optional legacy events
 * @param {Object} initialState - Initial state
 * @returns {StorylineEngine}
 */
export function createStorylineEngine(storylines, legacyEvents = [], initialState = {}) {
    return new StorylineEngine(storylines, legacyEvents, initialState);
}

// Re-export EventStatus for convenience
export { EventStatus };
