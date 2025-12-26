/**
 * Event System 2.0 - Condition Evaluator
 *
 * Evaluates complex condition expressions against game state
 *
 * v2.1 additions:
 * - Time-based conditions (year, quarter, turn)
 * - Relationship conditions
 * - Character state conditions
 * - Storyline active checks
 * - Time gate validation
 */

/**
 * Evaluates a condition expression against game state
 * @param {Object} condition - Condition expression to evaluate
 * @param {Object} state - Game state (stats, counters, flags, relationships, year, quarter, turn)
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
        // AND: all conditions must be true
        if (!Array.isArray(condition.all)) {
            return false;
        }
        return condition.all.every(expr => evaluateCondition(expr, state));
    }

    if (condition.any !== undefined) {
        // OR: any condition must be true
        if (!Array.isArray(condition.any)) {
            return false;
        }
        return condition.any.some(expr => evaluateCondition(expr, state));
    }

    if (condition.not !== undefined) {
        // NOT: negate condition
        return !evaluateCondition(condition.not, state);
    }

    // Handle stat checks
    if (condition.stat !== undefined) {
        const statName = condition.stat;
        const statValue = state.stats?.[statName];
        
        if (statValue === undefined) {
            return false; // Stat doesn't exist
        }

        return evaluateComparison(statValue, condition);
    }

    // Handle flag checks
    if (condition.flag !== undefined) {
        const flagName = condition.flag;
        if (typeof flagName !== 'string') {
            return false; // Flag name must be a string
        }
        const flagValue = state.flags?.[flagName];
        // Check if flag exists and is true
        return flagValue === true;
    }

    // Handle counter checks
    if (condition.counter !== undefined) {
        const counterName = condition.counter;
        const counterValue = state.counters?.[counterName] || 0;

        return evaluateComparison(counterValue, condition);
    }

    // v2.1: Handle year checks
    if (condition.year !== undefined) {
        const yearValue = state.year || 1;
        if (typeof condition.year === 'number') {
            return yearValue === condition.year;
        }
        return evaluateComparison(yearValue, condition.year);
    }

    // v2.1: Handle quarter checks
    if (condition.quarter !== undefined) {
        const quarterValue = state.quarter || 1;
        if (typeof condition.quarter === 'number') {
            return quarterValue === condition.quarter;
        }
        return evaluateComparison(quarterValue, condition.quarter);
    }

    // v2.1: Handle turn checks
    if (condition.turn !== undefined) {
        const turnValue = state.turn || 0;
        if (typeof condition.turn === 'number') {
            return turnValue === condition.turn;
        }
        return evaluateComparison(turnValue, condition.turn);
    }

    // v2.1: Handle relationship checks
    if (condition.relationship !== undefined) {
        const relationshipId = condition.relationship;
        const relationshipValue = state.relationships?.[relationshipId] ?? 50; // Default neutral
        return evaluateComparison(relationshipValue, condition);
    }

    // v2.1: Handle character state checks
    if (condition.characterState !== undefined) {
        const { character, state: expectedState } = condition.characterState;
        if (!character || !expectedState) return false;
        const actualState = state.characterStates?.[character] || 'alive';
        return actualState === expectedState;
    }

    // v2.1: Handle storyline active checks (requires allEvents context - checked in isEventEligible)
    if (condition.storylineActive !== undefined) {
        // This is handled specially in isEventEligible where we have access to all events
        // Here we just return true as a placeholder
        return true;
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
            // If checking for false and flag doesn't exist, that's effectively true
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

    // v2.1: Handle relationships object (implicit AND)
    if (condition.relationships) {
        return Object.entries(condition.relationships).every(([characterId, comparison]) => {
            const relationshipValue = state.relationships?.[characterId] ?? 50;
            return evaluateComparison(relationshipValue, comparison);
        });
    }

    // Unknown condition format
    return false;
}

/**
 * Evaluates a comparison against a value
 * @param {number} value - Value to compare
 * @param {Object} comparison - Comparison object with operators
 * @returns {boolean}
 */
function evaluateComparison(value, comparison) {
    if (typeof value !== 'number') {
        return false;
    }

    if (comparison.eq !== undefined) {
        return value === comparison.eq;
    }

    if (comparison.neq !== undefined) {
        return value !== comparison.neq;
    }

    if (comparison.gt !== undefined) {
        return value > comparison.gt;
    }

    if (comparison.gte !== undefined) {
        return value >= comparison.gte;
    }

    if (comparison.lt !== undefined) {
        return value < comparison.lt;
    }

    if (comparison.lte !== undefined) {
        return value <= comparison.lte;
    }

    if (comparison.between !== undefined) {
        if (!Array.isArray(comparison.between) || comparison.between.length !== 2) {
            return false;
        }
        const [min, max] = comparison.between;
        return value >= min && value <= max;
    }

    // No comparison operator found
    return false;
}

// =============================================================================
// v2.1 Time Gate Functions
// =============================================================================

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

    // Check quarter bounds (within valid year range)
    if (timeGate.minQuarter !== undefined) {
        // If we're at the minimum year, check the quarter
        if (timeGate.minYear !== undefined && year === timeGate.minYear) {
            if (quarter < timeGate.minQuarter) return false;
        }
    }
    if (timeGate.maxQuarter !== undefined) {
        // If we're at the maximum year, check the quarter
        if (timeGate.maxYear !== undefined && year === timeGate.maxYear) {
            if (quarter > timeGate.maxQuarter) return false;
        }
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
    // v2.1: Check if event is terminated
    if (state.terminatedEvents?.has(event.id)) {
        return false;
    }

    // v2.1: Check time gate
    if (!isWithinTimeGate(event, state)) {
        return false;
    }

    // Check conditions
    if (!event.conditions) {
        return true; // No conditions = always eligible
    }

    // v2.1: Special handling for storylineActive condition
    const conditions = event.conditions;
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
    isWithinTimeGate  // v2.1 export
};

