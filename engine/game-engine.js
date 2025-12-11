/**
 * Event System 2.0 - Main Game Engine
 * 
 * Wires together all components: state, deck, conditions, effects
 */

import { createInitialState, addHistoryEntry, advanceTime, getDefaultStatBounds } from './game-state.js';
import { isEventEligible } from './condition-eval.js';
import { drawEvent, processChoiceDeckOperations } from './deck-manager.js';
import { applyEffects, applyAutoCounters } from './effect-applier.js';

class GameEngineV2 {
    /**
     * @param {Object[]} allEvents - All available events
     * @param {Object} [initialState] - Initial state overrides
     */
    constructor(allEvents, initialState = {}) {
        this.allEvents = allEvents;
        this.eventMap = new Map(allEvents.map(e => [e.id, e]));

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

            // Include events with no conditions or only basic stat conditions
            if (!event.conditions) return true;
            const cond = event.conditions;
            // Exclude events that require flags, counters, or hasTriggered
            return !cond.flags && !cond.counters && !cond.all && !cond.any && !cond.not;
        });

        const deck = [];

        // Always include quiet_quarter if available (pacing event)
        const quiet = eligible.find(e => e.id === 'quiet_quarter');
        if (quiet) {
            deck.push(quiet.id);
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
        const event = drawEvent(
            this.allEvents,
            this.state.deck,
            isEventEligible,
            this.state
        );

        this.currentEvent = event;
        return event;
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

        // Apply effects
        const legacy = applyEffects(this.state, choice.effects, this.statBounds);

        // Apply auto-counters
        applyAutoCounters(this.state, event.id, choiceIndex);

        // Process deck operations
        this.state.deck = processChoiceDeckOperations(
            choice,
            event.id,
            event.recurring || false,
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
            history: [...this.state.history]
        };
    }

    /**
     * Gets eligible events in deck
     * @returns {Object[]}
     */
    getEligibleEvents() {
        return this.state.deck
            .map(id => this.eventMap.get(id))
            .filter(event => event && isEventEligible(event, this.state));
    }
}

export { GameEngineV2 };

