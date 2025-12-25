/**
 * The Oligarch's Gambit - Main Game Controller
 *
 * Uses StorylineEngine with tree-based storylines
 */

import { StorylineEngine } from './engine/storyline-engine.js';
import { GameUI } from './ui-adapter.js?v=2.0.5';
import { DebugGraph } from './debug-graph.js';
import { allStorylines } from './storylines/index.js';

class OligarchGame {
    constructor() {
        // Create engine with tree-based storylines
        this.engine = new StorylineEngine(allStorylines);

        // Get compiled events for UI and debug
        this.allEvents = this.engine.allEvents;

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
        // Create new engine instance with storylines
        this.engine = new StorylineEngine(allStorylines);
        this.allEvents = this.engine.allEvents;
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
