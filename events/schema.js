/**
 * Event System 2.0 - Schema Definitions and Validation
 *
 * Provides JSDoc types and runtime validation for events
 *
 * v2.1 additions:
 * - TimeGate for temporal restrictions
 * - WeightModifier for dynamic weight adjustments
 * - NarrativeVariation for conditional text
 * - Extended ChoiceEffects with relationships, characterStates, modifyStorylineWeights, terminates
 * - Extended Conditions with year, quarter, turn, relationship, characterState, storylineActive
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

// =============================================================================
// v2.1 Type Definitions
// =============================================================================

/**
 * @typedef {Object} TimeGate
 * @property {number} [minYear] - Only appears >= this year
 * @property {number} [maxYear] - Only appears <= this year
 * @property {number} [minQuarter] - Only appears >= this quarter (1-4)
 * @property {number} [maxQuarter] - Only appears <= this quarter (1-4)
 * @property {number} [minTurn] - Only appears >= this turn number
 * @property {number} [maxTurn] - Only appears <= this turn number
 */

/**
 * @typedef {Object} WeightModifier
 * @property {ConditionExpression} conditions - Conditions for this modifier to apply
 * @property {number} [multiplier] - Weight multiplier (e.g., 1.5 = +50%, 0.5 = -50%)
 * @property {number} [bonus] - Flat bonus to weight (applied after multiplier)
 */

/**
 * @typedef {Object} NarrativeVariation
 * @property {ConditionExpression} conditions - When this variation applies
 * @property {string} [title] - Alternative title text
 * @property {string} [description] - Alternative description text
 */

/**
 * @typedef {Object} ChoiceEffectsV21
 * @extends ChoiceEffects
 * @property {Object<string, number>} [relationships] - Relationship changes (character_id: delta)
 * @property {Object<string, string>} [characterStates] - Character state changes (character_id: state)
 * @property {Object<string, {multiplier?: number, bonus?: number}>} [modifyStorylineWeights] - Dynamic storyline weight changes
 * @property {string[]} [terminates] - Event IDs to permanently block
 */

/**
 * @typedef {Object} ConditionsV21
 * @extends Conditions
 * @property {number|StatComparison} [year] - Year comparison
 * @property {number|StatComparison} [quarter] - Quarter comparison (1-4)
 * @property {number|StatComparison} [turn] - Absolute turn number comparison
 * @property {string} [relationship] - Character ID for relationship check (use with gte/lte/etc)
 * @property {Object<string, StatComparison>} [relationships] - Character relationship checks
 * @property {{character: string, state: string}} [characterState] - Check character state
 * @property {string} [storylineActive] - Check if storyline has events in deck
 */

/**
 * @typedef {Object} EventV21
 * @extends Event
 * @property {TimeGate} [timeGate] - Temporal restrictions on event appearance
 * @property {boolean} [onceOnly] - If true, removes self from deck after first draw
 * @property {WeightModifier[]} [weightModifiers] - Dynamic weight adjustments
 * @property {NarrativeVariation[]} [narrativeVariations] - Conditional text variations
 * @property {string} [characterId] - ID of recurring character this event features
 * @property {string} [rarity] - Rarity tier: common, rare, epic, legendary
 */

/**
 * @typedef {Object} EventV22
 * @extends EventV21
 * @property {string[]} [requires] - Entity IDs this event depends on (auto-removed if entity dies/exits)
 * @property {boolean} [forceAddAtStart] - If true, always added to initial deck
 */

/**
 * @typedef {Object} ChoiceV22
 * @extends Choice
 * @property {Object[]} [unlocksExclusive] - Mutually exclusive outcomes (only one will occur)
 */

/**
 * @typedef {Object} GameStateV21
 * @extends GameState
 * @property {Object<string, number>} relationships - Character relationships (0-100)
 * @property {Object<string, string>} characterStates - Character states (alive, arrested, exiled, dead)
 * @property {Object<string, {multiplier: number, bonus: number}>} storylineWeights - Dynamic weight modifiers
 * @property {Set<string>} terminatedEvents - Permanently blocked event IDs
 * @property {number} turn - Absolute turn counter
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

    // v2.1: Validate timeGate
    if (event.timeGate) {
        const tg = event.timeGate;
        if (tg.minYear !== undefined && typeof tg.minYear !== 'number') {
            errors.push(`Event "${event.id}" timeGate.minYear must be a number`);
        }
        if (tg.maxYear !== undefined && typeof tg.maxYear !== 'number') {
            errors.push(`Event "${event.id}" timeGate.maxYear must be a number`);
        }
        if (tg.minQuarter !== undefined && (typeof tg.minQuarter !== 'number' || tg.minQuarter < 1 || tg.minQuarter > 4)) {
            errors.push(`Event "${event.id}" timeGate.minQuarter must be 1-4`);
        }
        if (tg.maxQuarter !== undefined && (typeof tg.maxQuarter !== 'number' || tg.maxQuarter < 1 || tg.maxQuarter > 4)) {
            errors.push(`Event "${event.id}" timeGate.maxQuarter must be 1-4`);
        }
        if (tg.minTurn !== undefined && typeof tg.minTurn !== 'number') {
            errors.push(`Event "${event.id}" timeGate.minTurn must be a number`);
        }
        if (tg.maxTurn !== undefined && typeof tg.maxTurn !== 'number') {
            errors.push(`Event "${event.id}" timeGate.maxTurn must be a number`);
        }
        // Logical validation
        if (tg.minYear && tg.maxYear && tg.minYear > tg.maxYear) {
            errors.push(`Event "${event.id}" timeGate.minYear > maxYear (impossible condition)`);
        }
        if (tg.minTurn && tg.maxTurn && tg.minTurn > tg.maxTurn) {
            errors.push(`Event "${event.id}" timeGate.minTurn > maxTurn (impossible condition)`);
        }
    }

    // v2.1: Validate onceOnly
    if (event.onceOnly !== undefined && typeof event.onceOnly !== 'boolean') {
        errors.push(`Event "${event.id}" onceOnly must be a boolean`);
    }

    // v2.1: Validate weightModifiers
    if (event.weightModifiers) {
        if (!Array.isArray(event.weightModifiers)) {
            errors.push(`Event "${event.id}" weightModifiers must be an array`);
        } else {
            event.weightModifiers.forEach((mod, idx) => {
                if (mod.multiplier !== undefined && typeof mod.multiplier !== 'number') {
                    errors.push(`Event "${event.id}" weightModifier ${idx} multiplier must be a number`);
                }
                if (mod.bonus !== undefined && typeof mod.bonus !== 'number') {
                    errors.push(`Event "${event.id}" weightModifier ${idx} bonus must be a number`);
                }
            });
        }
    }

    // v2.1: Validate narrativeVariations
    const warnings = [];
    if (event.narrativeVariations) {
        if (!Array.isArray(event.narrativeVariations)) {
            errors.push(`Event "${event.id}" narrativeVariations must be an array`);
        } else {
            event.narrativeVariations.forEach((variation, idx) => {
                if (!variation.conditions) {
                    warnings.push(`Event "${event.id}" narrativeVariation ${idx} has no conditions (will never match)`);
                }
                if (!variation.title && !variation.description) {
                    warnings.push(`Event "${event.id}" narrativeVariation ${idx} has no title or description (useless variation)`);
                }
            });
        }
    }

    // v2.1: Validate characterId
    if (event.characterId !== undefined && typeof event.characterId !== 'string') {
        errors.push(`Event "${event.id}" characterId must be a string`);
    }

    // v2.2: Validate requires (entity dependencies)
    if (event.requires !== undefined) {
        if (!Array.isArray(event.requires)) {
            errors.push(`Event "${event.id}" requires must be an array of entity IDs`);
        } else {
            event.requires.forEach((entityId, idx) => {
                if (typeof entityId !== 'string') {
                    errors.push(`Event "${event.id}" requires[${idx}] must be a string`);
                }
            });
        }
    }

    // v2.2: Validate forceAddAtStart
    if (event.forceAddAtStart !== undefined && typeof event.forceAddAtStart !== 'boolean') {
        errors.push(`Event "${event.id}" forceAddAtStart must be a boolean`);
    }

    // v2.1: Validate choice effects
    if (event.choices) {
        event.choices.forEach((choice, idx) => {
            if (choice.effects) {
                // Validate relationships
                if (choice.effects.relationships) {
                    if (typeof choice.effects.relationships !== 'object') {
                        errors.push(`Event "${event.id}" choice ${idx} effects.relationships must be an object`);
                    } else {
                        Object.entries(choice.effects.relationships).forEach(([charId, value]) => {
                            if (typeof value !== 'number') {
                                errors.push(`Event "${event.id}" choice ${idx} effects.relationships.${charId} must be a number`);
                            }
                        });
                    }
                }

                // Validate characterStates
                if (choice.effects.characterStates) {
                    if (typeof choice.effects.characterStates !== 'object') {
                        errors.push(`Event "${event.id}" choice ${idx} effects.characterStates must be an object`);
                    } else {
                        const validStates = ['alive', 'arrested', 'exiled', 'dead'];
                        Object.entries(choice.effects.characterStates).forEach(([char, state]) => {
                            if (!validStates.includes(state)) {
                                warnings.push(`Event "${event.id}" choice ${idx} sets unusual character state "${state}" for ${char}`);
                            }
                        });
                    }
                }

                // Validate modifyStorylineWeights
                if (choice.effects.modifyStorylineWeights) {
                    if (typeof choice.effects.modifyStorylineWeights !== 'object') {
                        errors.push(`Event "${event.id}" choice ${idx} effects.modifyStorylineWeights must be an object`);
                    }
                }

                // Validate terminates
                if (choice.effects.terminates) {
                    if (!Array.isArray(choice.effects.terminates)) {
                        errors.push(`Event "${event.id}" choice ${idx} effects.terminates must be an array`);
                    }
                }
            }
        });
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings  // v2.1: Include warnings in return
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

