/**
 * Event System 2.0 - Condition Evaluator
 * 
 * Evaluates complex condition expressions against game state
 */

/**
 * Evaluates a condition expression against game state
 * @param {Object} condition - Condition expression to evaluate
 * @param {Object} state - Game state (stats, counters, flags)
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

/**
 * Checks if an event's conditions are met
 * @param {Object} event - Event object with conditions
 * @param {Object} state - Game state
 * @returns {boolean}
 */
function isEventEligible(event, state) {
    if (!event.conditions) {
        return true; // No conditions = always eligible
    }

    return evaluateCondition(event.conditions, state);
}

export {
    evaluateCondition,
    evaluateComparison,
    isEventEligible
};

