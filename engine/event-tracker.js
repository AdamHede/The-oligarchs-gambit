/**
 * Event Tracker - Centralized tracking of event states
 *
 * Provides comprehensive tracking of:
 * - passed: Events that have been drawn and resolved
 * - available: Events currently in the deck (can be drawn)
 * - reachable: Events that could still be unlocked based on available events
 * - blocked: Events that can NEVER be reached (player choices blocked them)
 */

/**
 * Event status enum
 */
export const EventStatus = {
    PASSED: 'passed',           // Event was drawn and player made a choice
    AVAILABLE: 'available',     // Event is in deck, can be drawn
    REACHABLE: 'reachable',     // Event can still be unlocked through choices
    BLOCKED: 'blocked',         // Event can never be reached (paths are closed)
    UNKNOWN: 'unknown'          // Event not in any known storyline
};

/**
 * EventTracker class - manages event state tracking
 */
export class EventTracker {
    /**
     * @param {Object} registry - Compiled storyline registry
     */
    constructor(registry) {
        this.registry = registry;
        this.events = registry.events;
        this.tree = registry.globalTree;
        this.entryPoints = new Set(registry.entryPoints);

        // Build reverse lookup: child -> parents that unlock it
        this.parentMap = this.buildParentMap();

        // Build termination map: event -> choices that terminate it
        this.terminationMap = this.buildTerminationMap();
    }

    /**
     * Builds a map of eventId -> [{parentEventId, choiceIndex}]
     * Shows which parent choices unlock each event
     */
    buildParentMap() {
        const parentMap = {};

        for (const [eventId, treeInfo] of Object.entries(this.tree)) {
            if (!treeInfo.children) continue;

            for (const [choiceIndex, children] of Object.entries(treeInfo.children)) {
                children.forEach(childId => {
                    if (!parentMap[childId]) {
                        parentMap[childId] = [];
                    }
                    parentMap[childId].push({
                        parentEventId: eventId,
                        choiceIndex: parseInt(choiceIndex)
                    });
                });
            }
        }

        return parentMap;
    }

    /**
     * Builds a map of eventId -> [{terminator, choiceIndex}]
     * Shows which choices can terminate/block each event
     */
    buildTerminationMap() {
        const terminationMap = {};

        for (const [eventId, treeInfo] of Object.entries(this.tree)) {
            if (!treeInfo.terminates) continue;

            for (const [choiceIndex, terminated] of Object.entries(treeInfo.terminates)) {
                terminated.forEach(terminatedId => {
                    if (!terminationMap[terminatedId]) {
                        terminationMap[terminatedId] = [];
                    }
                    terminationMap[terminatedId].push({
                        terminatorEventId: eventId,
                        choiceIndex: parseInt(choiceIndex)
                    });
                });
            }
        }

        return terminationMap;
    }

    /**
     * Gets complete event status from game state
     * @param {Object} state - Current game state
     * @returns {Object} Status object with sets for each category
     */
    getStatus(state) {
        const passed = this.getPassedEvents(state);
        const available = this.getAvailableEvents(state);
        const blocked = this.getBlockedEvents(state, passed);
        const reachable = this.getReachableEvents(state, passed, available, blocked);

        return {
            passed,
            available,
            reachable,
            blocked,
            // Helper to quickly check any event
            getEventStatus: (eventId) => this.getEventStatus(eventId, { passed, available, reachable, blocked })
        };
    }

    /**
     * Gets the status of a single event
     * @param {string} eventId - Event to check
     * @param {Object} status - Pre-computed status (optional)
     * @returns {string} One of EventStatus values
     */
    getEventStatus(eventId, status) {
        if (status.passed.has(eventId)) return EventStatus.PASSED;
        if (status.available.has(eventId)) return EventStatus.AVAILABLE;
        if (status.blocked.has(eventId)) return EventStatus.BLOCKED;
        if (status.reachable.has(eventId)) return EventStatus.REACHABLE;
        return EventStatus.UNKNOWN;
    }

    /**
     * Gets events that have been drawn and resolved
     */
    getPassedEvents(state) {
        const passed = new Set();

        if (state.history) {
            state.history.forEach(entry => {
                if (entry.event) {
                    passed.add(entry.event);
                }
            });
        }

        return passed;
    }

    /**
     * Gets events currently in the deck
     */
    getAvailableEvents(state) {
        return new Set(state.deck || []);
    }

    /**
     * Gets events that are permanently blocked based on player choices
     */
    getBlockedEvents(state, passed) {
        const blocked = new Set();

        // An event is blocked if:
        // 1. A choice was made that explicitly terminates it, OR
        // 2. ALL paths to unlock it have been closed

        // First, collect all explicitly terminated events
        if (state.history) {
            state.history.forEach(entry => {
                const event = this.events[entry.event];
                if (!event) return;

                const choiceIndex = entry.choice;
                const treeInfo = this.tree[entry.event];

                if (treeInfo && treeInfo.terminates && treeInfo.terminates[choiceIndex]) {
                    treeInfo.terminates[choiceIndex].forEach(terminatedId => {
                        blocked.add(terminatedId);
                    });
                }
            });
        }

        // Second, find events whose unlock paths are all closed
        // An event's path is closed if:
        // - Its parent event was passed, AND
        // - The choice that unlocks it was NOT taken
        for (const eventId of Object.keys(this.events)) {
            if (blocked.has(eventId)) continue;
            if (this.entryPoints.has(eventId)) continue; // Entry points are always potentially reachable

            const parents = this.parentMap[eventId];
            if (!parents || parents.length === 0) continue;

            // Check if ALL paths to this event are closed
            const allPathsClosed = parents.every(({ parentEventId, choiceIndex }) => {
                // Check if parent was passed
                if (!passed.has(parentEventId)) {
                    // Parent not passed yet, path still open
                    return false;
                }

                // Parent was passed, check if the unlocking choice was taken
                const historyEntry = state.history?.find(h => h.event === parentEventId);
                if (!historyEntry) return false;

                // If a different choice was taken, this path is closed
                return historyEntry.choice !== choiceIndex;
            });

            if (allPathsClosed) {
                blocked.add(eventId);
            }
        }

        return blocked;
    }

    /**
     * Gets events that could still be unlocked
     */
    getReachableEvents(state, passed, available, blocked) {
        const reachable = new Set();
        const visited = new Set();

        // Start from available events and walk the tree forward
        const queue = [...available];

        while (queue.length > 0) {
            const eventId = queue.shift();

            if (visited.has(eventId)) continue;
            visited.add(eventId);

            // Skip if blocked or already passed
            if (blocked.has(eventId)) continue;
            if (passed.has(eventId)) continue;

            // If not available, it's reachable
            if (!available.has(eventId)) {
                reachable.add(eventId);
            }

            // Add all children from all choices (since we don't know which will be picked)
            const treeInfo = this.tree[eventId];
            if (treeInfo && treeInfo.children) {
                for (const children of Object.values(treeInfo.children)) {
                    children.forEach(childId => {
                        if (!visited.has(childId) && !blocked.has(childId)) {
                            queue.push(childId);
                        }
                    });
                }
            }
        }

        return reachable;
    }

    /**
     * Gets all events that a specific event can lead to (direct + indirect)
     * @param {string} eventId - Starting event
     * @returns {Set<string>} All reachable event IDs
     */
    getEventDescendants(eventId) {
        const descendants = new Set();
        const queue = [eventId];
        const visited = new Set();

        while (queue.length > 0) {
            const current = queue.shift();
            if (visited.has(current)) continue;
            visited.add(current);

            const treeInfo = this.tree[current];
            if (treeInfo && treeInfo.children) {
                for (const children of Object.values(treeInfo.children)) {
                    children.forEach(childId => {
                        if (!visited.has(childId)) {
                            descendants.add(childId);
                            queue.push(childId);
                        }
                    });
                }
            }
        }

        return descendants;
    }

    /**
     * Gets all events that can lead to a specific event
     * @param {string} eventId - Target event
     * @returns {Set<string>} All ancestor event IDs
     */
    getEventAncestors(eventId) {
        const ancestors = new Set();
        const queue = [eventId];
        const visited = new Set();

        while (queue.length > 0) {
            const current = queue.shift();
            if (visited.has(current)) continue;
            visited.add(current);

            const parents = this.parentMap[current];
            if (parents) {
                parents.forEach(({ parentEventId }) => {
                    if (!visited.has(parentEventId)) {
                        ancestors.add(parentEventId);
                        queue.push(parentEventId);
                    }
                });
            }
        }

        return ancestors;
    }

    /**
     * Gets a summary of storyline progress
     * @param {string} storylineId - Storyline to check
     * @param {Object} state - Current game state
     * @returns {Object} Progress summary
     */
    getStorylineProgress(storylineId, state) {
        const storyline = this.registry.storylines[storylineId];
        if (!storyline) return null;

        const storylineEvents = Object.keys(storyline.events);
        const status = this.getStatus(state);

        const passed = storylineEvents.filter(id => status.passed.has(id));
        const available = storylineEvents.filter(id => status.available.has(id));
        const reachable = storylineEvents.filter(id => status.reachable.has(id));
        const blocked = storylineEvents.filter(id => status.blocked.has(id));

        return {
            storylineId,
            total: storylineEvents.length,
            passed: passed.length,
            available: available.length,
            reachable: reachable.length,
            blocked: blocked.length,
            percentComplete: Math.round((passed.length / storylineEvents.length) * 100),
            percentBlocked: Math.round((blocked.length / storylineEvents.length) * 100),
            events: { passed, available, reachable, blocked }
        };
    }

    /**
     * Checks if an event has ever occurred
     * @param {string} eventId - Event to check
     * @param {Object} state - Game state
     * @returns {boolean}
     */
    hasEventOccurred(eventId, state) {
        return state.history?.some(h => h.event === eventId) ?? false;
    }

    /**
     * Checks if a specific choice was made on an event
     * @param {string} eventId - Event to check
     * @param {number} choiceIndex - Choice index
     * @param {Object} state - Game state
     * @returns {boolean}
     */
    wasChoiceMade(eventId, choiceIndex, state) {
        return state.history?.some(h => h.event === eventId && h.choice === choiceIndex) ?? false;
    }

    /**
     * Gets the choice that was made for an event (if any)
     * @param {string} eventId - Event to check
     * @param {Object} state - Game state
     * @returns {number|null} Choice index or null
     */
    getChoiceMade(eventId, state) {
        const entry = state.history?.find(h => h.event === eventId);
        return entry ? entry.choice : null;
    }
}

/**
 * Creates an EventTracker instance
 * @param {Object} registry - Compiled storyline registry
 * @returns {EventTracker}
 */
export function createEventTracker(registry) {
    return new EventTracker(registry);
}

/**
 * Convenience function to get event status for a card game
 * This can be called from anywhere in the game to check event states
 */
export function getEventStatusHelper(tracker, state) {
    return {
        // Quick status checks
        hasPassed: (eventId) => tracker.hasEventOccurred(eventId, state),
        isAvailable: (eventId) => state.deck?.includes(eventId) ?? false,
        isBlocked: (eventId) => tracker.getStatus(state).blocked.has(eventId),
        isReachable: (eventId) => tracker.getStatus(state).reachable.has(eventId),

        // Detailed status
        getStatus: (eventId) => tracker.getStatus(state).getEventStatus(eventId),

        // Bulk queries
        getAllPassed: () => tracker.getPassedEvents(state),
        getAllAvailable: () => tracker.getAvailableEvents(state),
        getAllBlocked: () => tracker.getStatus(state).blocked,
        getAllReachable: () => tracker.getStatus(state).reachable,

        // Choice queries
        wasChoiceMade: (eventId, choiceIndex) => tracker.wasChoiceMade(eventId, choiceIndex, state),
        getChoiceMade: (eventId) => tracker.getChoiceMade(eventId, state),

        // Storyline progress
        getStorylineProgress: (storylineId) => tracker.getStorylineProgress(storylineId, state)
    };
}
