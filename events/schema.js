/**
 * Event System 2.0 - Schema Definitions and Validation
 * 
 * Provides JSDoc types and runtime validation for events
 */

/**
 * @typedef {Object} StatComparison
 * @property {number} [eq] - Equal to
 * @property {number} [neq] - Not equal to
 * @property {number} [gt] - Greater than
 * @property {number} [gte] - Greater than or equal
 * @property {number} [lt] - Less than
 * @property {number} [lte] - Less than or equal
 * @property {[number, number]} [between] - Between [min, max] inclusive
 */

/**
 * @typedef {Object} ConditionExpression
 * @property {string} [stat] - Stat name to check
 * @property {string} [flag] - Flag name to check
 * @property {string} [counter] - Counter name to check
 * @property {StatComparison} [stat] - Stat comparison (if stat property present)
 * @property {boolean} [flag] - Flag value (if flag property present)
 * @property {StatComparison} [counter] - Counter comparison (if counter property present)
 * @property {ConditionExpression[]} [all] - All conditions must be true (AND)
 * @property {ConditionExpression[]} [any] - Any condition must be true (OR)
 * @property {ConditionExpression} [not] - Negate condition
 */

/**
 * @typedef {Object} Conditions
 * @property {Object<string, StatComparison>} [stats] - Stat conditions (implicit AND)
 * @property {Object<string, boolean>} [flags] - Flag conditions (implicit AND)
 * @property {Object<string, StatComparison>} [counters] - Counter conditions (implicit AND)
 * @property {ConditionExpression[]} [all] - Complex AND logic
 * @property {ConditionExpression[]} [any] - Complex OR logic
 * @property {ConditionExpression} [not] - Complex NOT logic
 */

/**
 * @typedef {Object} ChoiceEffects
 * @property {Object<string, number>} [stats] - Stat changes (clamped to bounds)
 * @property {Object<string, number>} [counters] - Counter increments/decrements
 * @property {Object<string, boolean>} [flags] - Flag toggles
 * @property {Object} [legacy] - Legacy achievement (preserved from v1)
 * @property {string} [legacy.icon] - Legacy icon emoji
 * @property {string} [legacy.name] - Legacy name
 * @property {number} [legacy.weight] - Legacy weight modifier
 */

/**
 * @typedef {Object} Choice
 * @property {string} text - Choice text displayed to player
 * @property {ChoiceEffects} [effects] - Effects of choosing this option
 * @property {string[]} [add] - Event IDs to add to deck
 * @property {string[]} [remove] - Event IDs to remove from deck
 * @property {boolean} [removeSelf] - Remove this event from deck (default: true for non-recurring)
 * @property {boolean} [addSelf] - Keep/re-add this event to deck (for recurring events)
 */

/**
 * @typedef {Object} Event
 * @property {string} id - Unique event identifier
 * @property {string} title - Event title
 * @property {string} description - Event description text
 * @property {boolean} [recurring=false] - If true, event stays in deck after being drawn
 * @property {number} [weight=1] - Draw probability weight
 * @property {string[]} [tags=[]] - Tags for categorization
 * @property {string[]} [storylines=[]] - Storyline IDs this event belongs to
 * @property {Conditions} [conditions] - Conditions for event to be playable
 * @property {Choice[]} choices - Array of choices (1-4 typically)
 */

/**
 * @typedef {Object} GameState
 * @property {Object<string, number>} stats - Core stats (bounded numeric values)
 * @property {Object<string, number>} counters - Counters (unbounded numeric values)
 * @property {Object<string, boolean>} flags - Flags (boolean state)
 * @property {string[]} deck - Event IDs currently in the active deck
 * @property {Array<Object>} history - Game history for debugging/analytics
 */

/**
 * Validates an event object against the schema
 * @param {Event} event - Event to validate
 * @param {Set<string>} allEventIds - Set of all valid event IDs (for reference validation)
 * @returns {{valid: boolean, errors: string[]}}
 */
function validateEvent(event, allEventIds = new Set()) {
    const errors = [];

    // Required fields
    if (!event.id || typeof event.id !== 'string') {
        errors.push('Event must have a string "id" field');
    }

    if (!event.title || typeof event.title !== 'string') {
        errors.push(`Event "${event.id || 'unknown'}" must have a string "title" field`);
    }

    if (!event.description || typeof event.description !== 'string') {
        errors.push(`Event "${event.id || 'unknown'}" must have a string "description" field`);
    }

    if (!Array.isArray(event.choices) || event.choices.length === 0) {
        errors.push(`Event "${event.id || 'unknown'}" must have at least one choice`);
    }

    if (event.choices && event.choices.length > 4) {
        errors.push(`Event "${event.id || 'unknown'}" has more than 4 choices (max is 4)`);
    }

    // Validate choices
    if (event.choices) {
        event.choices.forEach((choice, idx) => {
            if (!choice.text || typeof choice.text !== 'string') {
                errors.push(`Event "${event.id || 'unknown'}" choice ${idx} must have a string "text" field`);
            }

            // Validate references in add/remove
            if (choice.add) {
                if (!Array.isArray(choice.add)) {
                    errors.push(`Event "${event.id || 'unknown'}" choice ${idx} "add" must be an array`);
                } else {
                    choice.add.forEach(eventId => {
                        if (allEventIds.size > 0 && !allEventIds.has(eventId)) {
                            errors.push(`Event "${event.id || 'unknown'}" choice ${idx} references unknown event "${eventId}" in "add"`);
                        }
                    });
                }
            }

            if (choice.remove) {
                if (!Array.isArray(choice.remove)) {
                    errors.push(`Event "${event.id || 'unknown'}" choice ${idx} "remove" must be an array`);
                } else {
                    choice.remove.forEach(eventId => {
                        if (allEventIds.size > 0 && !allEventIds.has(eventId)) {
                            errors.push(`Event "${event.id || 'unknown'}" choice ${idx} references unknown event "${eventId}" in "remove"`);
                        }
                    });
                }
            }
        });
    }

    // Validate optional fields
    if (event.weight !== undefined && (typeof event.weight !== 'number' || event.weight < 0)) {
        errors.push(`Event "${event.id || 'unknown'}" weight must be a non-negative number`);
    }

    if (event.storylines !== undefined && !Array.isArray(event.storylines)) {
        errors.push(`Event "${event.id || 'unknown'}" storylines must be an array`);
    }

    if (event.tags !== undefined && !Array.isArray(event.tags)) {
        errors.push(`Event "${event.id || 'unknown'}" tags must be an array`);
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Validates all events in a collection
 * @param {Event[]} events - Array of events to validate
 * @returns {{valid: boolean, errors: string[], warnings: string[]}}
 */
function validateAllEvents(events) {
    const allEventIds = new Set(events.map(e => e.id));
    const errors = [];
    const warnings = [];

    // Check for duplicate IDs
    const idCounts = {};
    events.forEach(event => {
        idCounts[event.id] = (idCounts[event.id] || 0) + 1;
    });
    Object.entries(idCounts).forEach(([id, count]) => {
        if (count > 1) {
            errors.push(`Duplicate event ID: "${id}" appears ${count} times`);
        }
    });

    // Validate each event
    events.forEach(event => {
        const result = validateEvent(event, allEventIds);
        if (!result.valid) {
            errors.push(...result.errors);
        }
    });

    // Check for orphaned events (events that require conditions but are never added)
    const eventsAddedByChoices = new Set();
    events.forEach(event => {
        if (event.choices) {
            event.choices.forEach(choice => {
                if (choice.add) {
                    choice.add.forEach(id => eventsAddedByChoices.add(id));
                }
            });
        }
    });

    events.forEach(event => {
        const hasConditions = event.conditions && Object.keys(event.conditions).length > 0;
        const isInInitialDeck = !hasConditions; // Simplified check
        const isAddedByChoice = eventsAddedByChoices.has(event.id);

        if (hasConditions && !isAddedByChoice && !isInInitialDeck) {
            warnings.push(`Event "${event.id}" may be orphaned (has conditions but is never added to deck)`);
        }
    });

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

export {
    validateEvent,
    validateAllEvents
};

