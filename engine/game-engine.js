/**
 * Event System 2.0 - Main Game Engine
 *
 * Wires together all components: state, deck, conditions, effects
 *
 * v2.1 additions:
 * - Time-gate filtering in initial deck
 * - Narrative variations based on state
 * - onceOnly event handling on draw
 * - Pass full event object to deck operations
 *
 * v2.2 additions:
 * - Exclusive groups: drawing one event removes mutually exclusive siblings
 * - Entity dependencies: events requiring an entity are auto-removed when entity dies/exits
 * - forceAddAtStart: events can declare they must be in initial deck
 */

import { createInitialState, addHistoryEntry, advanceTime, getDefaultStatBounds } from './game-state.js';
import { isEventEligible, evaluateCondition } from './condition-eval.js';
import { drawEvent, processChoiceDeckOperations, removeFromDeck } from './deck-manager.js';
import { applyEffects, applyAutoCounters } from './effect-applier.js';

class GameEngineV2 {
    /**
     * @param {Object[]} allEvents - All available events
     * @param {Object} [initialState] - Initial state overrides
     * @param {Object} [registry] - v2.2: Compiled storyline registry (for exclusive groups, entity deps)
     */
    constructor(allEvents, initialState = {}, registry = null) {
        this.allEvents = allEvents;
        this.eventMap = new Map(allEvents.map(e => [e.id, e]));
        // v2.2: Store registry for exclusive groups and entity dependencies
        this.registry = registry;

        // Create initial state
        const initialDeck = initialState.deck || this.getInitialDeck();
        this.state = createInitialState(initialState.stats, initialDeck);

        // Merge any additional state properties
        Object.assign(this.state, initialState);

        this.statBounds = getDefaultStatBounds();
        this.currentEvent = null;
        this.isGameOver = false;
    }

    /**
     * Gets initial deck (events with no conditions or basic conditions)
     * @returns {string[]}
     */
    getInitialDeck() {
        const eligible = this.allEvents.filter(event => {
            // Exclude triggered-only events (weight <= 0)
            if (event.weight !== undefined && event.weight <= 0) return false;

            // v2.1: Exclude events outside initial time gate (Year 1, Q1)
            if (event.timeGate) {
                const { minYear, maxYear, minQuarter, maxQuarter, minTurn, maxTurn } = event.timeGate;
                // Check if Year 1, Q1 is within the time gate
                if (minYear !== undefined && 1 < minYear) return false;
                if (maxYear !== undefined && 1 > maxYear) return false;
                if (minQuarter !== undefined && minYear === 1 && 1 < minQuarter) return false;
                if (maxQuarter !== undefined && maxYear === 1 && 1 > maxQuarter) return false;
                if (minTurn !== undefined && 0 < minTurn) return false;
                if (maxTurn !== undefined && 0 > maxTurn) return false;
            }

            // Include events with no conditions or only basic stat conditions
            if (!event.conditions) return true;
            const cond = event.conditions;
            // Exclude events that require flags, counters, complex logic, or v2.1 features
            return !cond.flags && !cond.counters && !cond.all && !cond.any && !cond.not
                && !cond.year && !cond.quarter && !cond.turn && !cond.relationships
                && !cond.relationship && !cond.characterState && !cond.storylineActive;
        });

        const deck = [];

        // Always include quiet_quarter if available (pacing event)
        const quiet = eligible.find(e => e.id === 'quiet_quarter');
        if (quiet) {
            deck.push(quiet.id);
        }

        // v2.2: Force-include events with forceAddAtStart property
        this.allEvents.forEach(event => {
            if (event.forceAddAtStart && !deck.includes(event.id)) {
                deck.push(event.id);
            }
        });

        // Legacy: Force-include early-game agenda events (these set up major storylines)
        // TODO: Migrate these to use forceAddAtStart property instead
        const earlyGameEvents = [
            'dacha_summit',
            'first_big_move', 
            'inaugural_address',
            'aluminum_king_introduction'
        ];
        for (const eventId of earlyGameEvents) {
            const earlyEvent = eligible.find(e => e.id === eventId);
            if (earlyEvent && !deck.includes(eventId)) {
                deck.push(eventId);
            }
        }

        // Pool for remaining selection (exclude already added)
        let pool = eligible.filter(e => !deck.includes(e.id));
        const targetSize = 7; // Reduced from 12 to ensure Rarity works (pool is small)

        // Weighted random selection without replacement
        while (deck.length < targetSize && pool.length > 0) {
            // Calculate weights based on rarity
            const weights = pool.map(e => {
                const rarity = e.rarity || 'common';
                if (rarity === 'common') return 10;
                if (rarity === 'rare') return 2;
                return 1; // epic/legendary
            });

            const totalWeight = weights.reduce((a, b) => a + b, 0);
            let random = Math.random() * totalWeight;

            let selectedIndex = -1;
            for (let i = 0; i < pool.length; i++) {
                random -= weights[i];
                if (random <= 0) {
                    selectedIndex = i;
                    break;
                }
            }

            // Fallback for floating point errors
            if (selectedIndex === -1) selectedIndex = pool.length - 1;

            deck.push(pool[selectedIndex].id);
            pool.splice(selectedIndex, 1);
        }

        return deck;
    }

    /**
     * Draws the next event from the deck
     * @returns {Object|null} - Event or null if none available
     */
    drawNextEvent() {
        // v2.2: Pass registry for exclusive group handling
        const event = drawEvent(
            this.allEvents,
            this.state.deck,
            isEventEligible,
            this.state,
            this.registry
        );

        this.currentEvent = event;

        // v2.1: Handle onceOnly events - remove from deck immediately on draw
        if (event && event.onceOnly === true) {
            this.state.deck = this.state.deck.filter(id => id !== event.id);
        }

        return event;
    }

    /**
     * v2.1: Gets the appropriate narrative for an event based on narrative variations
     * @param {Object} event - Event object
     * @returns {Object} - {title, description}
     */
    getNarrativeForEvent(event) {
        if (!event) {
            return { title: '', description: '' };
        }

        if (!event.narrativeVariations || event.narrativeVariations.length === 0) {
            return {
                title: event.title,
                description: event.description
            };
        }

        // Find first matching variation
        for (const variation of event.narrativeVariations) {
            if (evaluateCondition(variation.conditions, this.state)) {
                return {
                    title: variation.title || event.title,
                    description: variation.description || event.description
                };
            }
        }

        // No variation matched, return default
        return {
            title: event.title,
            description: event.description
        };
    }

    /**
     * Makes a choice for the current event
     * @param {number} choiceIndex - Index of choice selected
     * @returns {Object} - Result object with effects applied
     */
    makeChoice(choiceIndex) {
        if (!this.currentEvent) {
            throw new Error('No current event');
        }

        const event = this.currentEvent;
        const choice = event.choices[choiceIndex];

        if (!choice) {
            throw new Error(`Invalid choice index: ${choiceIndex}`);
        }

        // Apply effects (v2.2: returns object with legacy and unavailableEntities)
        const effectResult = applyEffects(this.state, choice.effects, this.statBounds);
        const legacy = effectResult?.legacy || effectResult; // Handle both old and new return format

        // v2.2: Cascade invalidation for unavailable entities
        if (effectResult?.unavailableEntities && this.registry?.entityDependencies) {
            effectResult.unavailableEntities.forEach(entityId => {
                const dependentEvents = this.registry.entityDependencies[entityId];
                if (dependentEvents && dependentEvents.length > 0) {
                    // Remove dependent events from deck
                    this.state.deck = removeFromDeck(dependentEvents, this.state.deck);
                    // Mark them as terminated
                    dependentEvents.forEach(eventId => {
                        if (this.state.terminatedEvents) {
                            this.state.terminatedEvents.add(eventId);
                        }
                    });
                }
            });
        }

        // Apply auto-counters
        applyAutoCounters(this.state, event.id, choiceIndex);

        // Process deck operations (v2.1: pass full event object for onceOnly check)
        this.state.deck = processChoiceDeckOperations(
            choice,
            event.id,
            event,  // v2.1: Pass full event instead of just recurring boolean
            this.state.deck
        );

        // Add history entry
        addHistoryEntry(this.state, {
            event: event.id,
            eventTitle: event.title,
            choice: choiceIndex,
            choiceText: choice.text,
            effects: choice.effects || {},
            legacy: legacy || null
        });

        // Advance time
        advanceTime(this.state);

        return {
            legacy,
            deckSize: this.state.deck.length,
            stats: { ...this.state.stats },
            counters: { ...this.state.counters },
            flags: { ...this.state.flags }
        };
    }

    /**
     * Checks game over conditions
     * @returns {Object|null} - Game over reason or null
     */
    checkGameOver() {
        const { stats } = this.state;

        if (stats.elite <= 0) {
            return {
                reason: "🗡️ The Elite Have Turned Against You",
                description: "Your fellow oligarchs and generals have lost all confidence. A palace coup is inevitable. You flee to a non-extradition country with whatever wealth you could grab."
            };
        }

        if (stats.anger >= 100) {
            return {
                reason: "🔥 Revolution!",
                description: "The people have had enough. Millions flood the streets. The military refuses to fire. Your regime crumbles as you desperately search for a helicopter."
            };
        }

        if (stats.treasury <= 0) {
            return {
                reason: "💸 State Bankruptcy",
                description: "The treasury is empty. Government employees aren't paid. Services collapse. The elite abandon you. The state implodes as rival factions fight over the scraps."
            };
        }

        return null;
    }

    /**
     * Gets current game state (read-only copy)
     * @returns {Object}
     */
    getState() {
        return {
            stats: { ...this.state.stats },
            counters: { ...this.state.counters },
            flags: { ...this.state.flags },
            deck: [...this.state.deck],
            year: this.state.year,
            quarter: this.state.quarter,
            turn: this.state.turn,  // v2.1
            history: [...this.state.history],
            // v2.1 additions
            relationships: { ...this.state.relationships },
            characterStates: { ...this.state.characterStates },
            storylineWeights: { ...this.state.storylineWeights },
            terminatedEvents: new Set(this.state.terminatedEvents)
        };
    }

    /**
     * Gets eligible events in deck
     * @returns {Object[]}
     */
    getEligibleEvents() {
        return this.state.deck
            .map(id => this.eventMap.get(id))
            .filter(event => event && isEventEligible(event, this.state, this.allEvents));
    }
}

export { GameEngineV2 };

