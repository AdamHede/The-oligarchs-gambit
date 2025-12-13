/**
 * The Oligarch's Gambit - Main Game Controller
 * 
 * Uses V2 Engine and UI Adapter
 */

import { GameEngineV2 } from './engine/game-engine.js';
import { GameUI } from './ui-adapter.js?v=2.0.5';
import { DebugGraph } from './debug-graph.js';
import ALL_EVENTS from './events/index.js';

class OligarchGame {
    constructor() {
        // Convert old event format to new format if needed
        this.allEvents = this.convertEvents(ALL_EVENTS);

        // Create engine instance
        this.engine = new GameEngineV2(this.allEvents);

        // Create UI adapter
        this.ui = new GameUI(this.engine, this.allEvents);

        // Initialize debug graph (will be created when container is available)
        this.debugGraph = null;

        // Screens
        this.titleScreen = document.getElementById('title-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.gameoverScreen = document.getElementById('gameover-screen');

        this.attachEventListeners();

        // Initialize graph after a short delay to ensure DOM is ready
        setTimeout(() => {
            this.initGraph();
        }, 100);
    }

    initGraph() {
        try {
            this.debugGraph = new DebugGraph('debug-graph', this.engine, this.allEvents);
            this.ui.setDebugGraph(this.debugGraph);

            // Attach graph control buttons
            const fitBtn = document.getElementById('graph-fit');
            const centerBtn = document.getElementById('graph-center-active');

            if (fitBtn) {
                fitBtn.addEventListener('click', () => {
                    if (this.debugGraph) this.debugGraph.fitView();
                });
            }

            if (centerBtn) {
                centerBtn.addEventListener('click', () => {
                    if (this.debugGraph) this.debugGraph.centerOnActive();
                });
            }
        } catch (error) {
            console.warn('Could not initialize debug graph:', error);
        }
    }

    /**
     * Converts old event format to new v2 format
     * Old format: effects: { personalWealth: 5, treasury: -10 }
     * New format: effects: { stats: { personalWealth: 5, treasury: -10 } }
     */
    convertEvents(events) {
        return events.map(event => {
            const converted = { ...event };

            // Convert choices
            if (converted.choices) {
                converted.choices = converted.choices.map(choice => {
                    const newChoice = { ...choice };

                    // Convert effects format
                    if (newChoice.effects) {
                        // Check if it's already in new format
                        if (newChoice.effects.stats || newChoice.effects.counters || newChoice.effects.flags) {
                            // Already new format
                            return newChoice;
                        }

                        // Old format - convert to new format
                        const stats = {};
                        const counters = {};
                        const flags = {};
                        let legacy = null;

                        for (const [key, value] of Object.entries(newChoice.effects)) {
                            if (key === 'legacy') {
                                legacy = value;
                            } else if (typeof value === 'boolean') {
                                flags[key] = value;
                            } else if (typeof value === 'number') {
                                // Check if it's a stat or counter
                                if (['personalWealth', 'treasury', 'elite', 'anger'].includes(key)) {
                                    stats[key] = value;
                                } else {
                                    counters[key] = value;
                                }
                            }
                        }

                        newChoice.effects = {};
                        if (Object.keys(stats).length > 0) newChoice.effects.stats = stats;
                        if (Object.keys(counters).length > 0) newChoice.effects.counters = counters;
                        if (Object.keys(flags).length > 0) newChoice.effects.flags = flags;
                        if (legacy) newChoice.effects.legacy = legacy;
                    }

                    // Handle legacy as sibling (new format variation)
                    if (newChoice.legacy) {
                        if (!newChoice.effects) newChoice.effects = {};
                        newChoice.effects.legacy = newChoice.legacy;
                        delete newChoice.legacy;
                    }

                    // Convert addToPool/removeFromPool to add/remove
                    if (newChoice.addToPool) {
                        newChoice.add = newChoice.addToPool;
                        delete newChoice.addToPool;
                    }
                    if (newChoice.removeFromPool) {
                        newChoice.remove = newChoice.removeFromPool;
                        delete newChoice.removeFromPool;
                    }

                    return newChoice;
                });
            }

            // Convert storyline (singular) to storylines (array)
            if (converted.storyline && !converted.storylines) {
                converted.storylines = [converted.storyline];
                delete converted.storyline;
            }

            // Convert conditions format if needed
            if (converted.conditions) {
                // Old format might have hasTriggered, personalWealth, etc. directly
                // New format uses stats, flags, counters objects
                const newConditions = {};

                if (converted.conditions.hasTriggered) {
                    // Convert hasTriggered to flags or counters
                    // For now, we'll skip this complex conversion
                    // Events with hasTriggered will need manual conversion
                }

                if (converted.conditions.personalWealth !== undefined ||
                    converted.conditions.treasury !== undefined ||
                    converted.conditions.elite !== undefined ||
                    converted.conditions.anger !== undefined) {
                    newConditions.stats = {};
                    if (converted.conditions.personalWealth !== undefined) {
                        newConditions.stats.personalWealth = { gte: converted.conditions.personalWealth };
                    }
                    if (converted.conditions.treasury !== undefined) {
                        newConditions.stats.treasury = { gte: converted.conditions.treasury };
                    }
                    if (converted.conditions.elite !== undefined) {
                        newConditions.stats.elite = { gte: converted.conditions.elite };
                    }
                    if (converted.conditions.anger !== undefined) {
                        newConditions.stats.anger = { gte: converted.conditions.anger };
                    }
                }

                if (converted.conditions.year !== undefined) {
                    if (!newConditions.stats) newConditions.stats = {};
                    // Year is not a stat in v2, we'll need to handle this differently
                    // For now, skip year conditions
                }

                if (Object.keys(newConditions).length > 0) {
                    converted.conditions = newConditions;
                } else if (Object.keys(converted.conditions).length === 0) {
                    // Empty conditions = no conditions
                    delete converted.conditions;
                }
            }

            return converted;
        });
    }

    attachEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
    }

    startGame() {
        this.titleScreen.classList.remove('active');
        this.gameScreen.classList.add('active');

        // Draw initial event
        const event = this.engine.drawNextEvent();
        if (event) {
            this.ui.displayEvent(event);
        } else {
            this.ui.displayFallbackEvent();
        }

        this.ui.updateDisplay();
    }

    restartGame() {
        // Create new engine instance
        this.engine = new GameEngineV2(this.allEvents);
        this.ui = new GameUI(this.engine, this.allEvents);
        this.ui.setDebugGraph(this.debugGraph);

        this.isGameOver = false;
        this.gameoverScreen.classList.remove('active');
        this.gameScreen.classList.add('active');

        // Reset graph completed events
        if (this.debugGraph) {
            this.debugGraph.completedEventIds.clear();
        }

        // Draw initial event
        const event = this.engine.drawNextEvent();
        if (event) {
            this.ui.displayEvent(event);
        } else {
            this.ui.displayFallbackEvent();
        }

        this.ui.updateDisplay();

        // Update graph
        if (this.debugGraph) {
            this.debugGraph.update();
        }
    }
}

// Initialize game when DOM is loaded
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new OligarchGame();
});
