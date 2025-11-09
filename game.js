// The Oligarch's Gambit - Main Game Engine

class OligarchGame {
    constructor() {
        this.state = {
            personalWealth: 50,
            treasury: 50,
            elite: 50,
            anger: 20,
            year: 1,
            quarter: 1,
            legacy: [],
            triggeredEvents: new Set(),
            completedEvents: new Set(),
            eventWeightModifiers: {}
        };

        this.currentEvent = null;
        this.isGameOver = false;

        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        // Screens
        this.titleScreen = document.getElementById('title-screen');
        this.gameScreen = document.getElementById('game-screen');
        this.gameoverScreen = document.getElementById('gameover-screen');

        // UI Elements
        this.currentPeriod = document.getElementById('current-period');
        this.personalWealthBar = document.getElementById('personal-wealth-bar');
        this.personalWealthValue = document.getElementById('personal-wealth-value');
        this.treasuryBar = document.getElementById('treasury-bar');
        this.treasuryValue = document.getElementById('treasury-value');
        this.eliteBar = document.getElementById('elite-bar');
        this.eliteValue = document.getElementById('elite-value');
        this.angerBar = document.getElementById('anger-bar');
        this.angerValue = document.getElementById('anger-value');

        // Event Card
        this.eventTitle = document.getElementById('event-title');
        this.eventDescription = document.getElementById('event-description');
        this.choicesContainer = document.getElementById('choices-container');

        // Legacy
        this.legacyContainer = document.getElementById('legacy-container');

        // Game Over
        this.gameoverReason = document.getElementById('gameover-reason');
        this.finalStats = document.getElementById('final-stats');
        this.finalLegacy = document.getElementById('final-legacy');
    }

    attachEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
    }

    startGame() {
        this.titleScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        this.updateUI();
        this.nextTurn();
    }

    restartGame() {
        this.state = {
            personalWealth: 50,
            treasury: 50,
            elite: 50,
            anger: 20,
            year: 1,
            quarter: 1,
            legacy: [],
            triggeredEvents: new Set(),
            completedEvents: new Set(),
            eventWeightModifiers: {}
        };

        this.isGameOver = false;
        this.gameoverScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        this.updateUI();
        this.nextTurn();
    }

    updateUI() {
        // Update period
        this.currentPeriod.textContent = `Quarter ${this.state.quarter}, Year ${this.state.year}`;

        // Update metrics
        this.updateMetric('personalWealth', this.personalWealthBar, this.personalWealthValue);
        this.updateMetric('treasury', this.treasuryBar, this.treasuryValue);
        this.updateMetric('elite', this.eliteBar, this.eliteValue);
        this.updateMetric('anger', this.angerBar, this.angerValue);

        // Update legacy
        this.updateLegacy();
    }

    updateMetric(metricName, barElement, valueElement) {
        const value = Math.max(0, Math.min(100, this.state[metricName]));
        barElement.style.width = `${value}%`;
        valueElement.textContent = `${Math.round(value)}%`;

        // Add warning colors for critical levels
        if (metricName === 'treasury' || metricName === 'elite') {
            if (value <= 10) {
                barElement.style.filter = 'brightness(0.6) saturate(2)';
            } else {
                barElement.style.filter = 'brightness(1) saturate(1)';
            }
        }

        if (metricName === 'anger') {
            if (value >= 90) {
                barElement.style.filter = 'brightness(1.3) saturate(1.5)';
            } else {
                barElement.style.filter = 'brightness(1) saturate(1)';
            }
        }
    }

    updateLegacy() {
        this.legacyContainer.innerHTML = '';
        this.state.legacy.forEach(legacy => {
            const badge = document.createElement('div');
            badge.className = 'legacy-badge';
            badge.innerHTML = `<span>${legacy.icon}</span><span>${legacy.name}</span>`;
            badge.title = legacy.name;
            this.legacyContainer.appendChild(badge);
        });
    }

    nextTurn() {
        // Check game over conditions
        if (this.checkGameOver()) {
            return;
        }

        // Select and display next event
        const event = this.selectEvent();
        if (event) {
            this.displayEvent(event);
        } else {
            // Fallback generic event if no events are available
            this.displayFallbackEvent();
        }

        // Advance time
        this.state.quarter++;
        if (this.state.quarter > 4) {
            this.state.quarter = 1;
            this.state.year++;
        }
    }

    selectEvent() {
        // Get all eligible events
        const eligibleEvents = EVENTS.filter(event => {
            // Skip if already completed and onceOnly
            if (event.onceOnly && this.state.completedEvents.has(event.id)) {
                return false;
            }

            // Check conditions
            if (event.conditions) {
                // Check metric conditions
                if (event.conditions.personalWealth !== undefined &&
                    this.state.personalWealth < event.conditions.personalWealth) {
                    return false;
                }
                if (event.conditions.treasury !== undefined &&
                    this.state.treasury < event.conditions.treasury) {
                    return false;
                }
                if (event.conditions.elite !== undefined &&
                    this.state.elite < event.conditions.elite) {
                    return false;
                }
                if (event.conditions.anger !== undefined &&
                    this.state.anger < event.conditions.anger) {
                    return false;
                }
                if (event.conditions.year !== undefined &&
                    this.state.year < event.conditions.year) {
                    return false;
                }

                // Check if required events have been triggered
                if (event.conditions.hasTriggered) {
                    const hasAll = event.conditions.hasTriggered.some(eventId =>
                        this.state.triggeredEvents.has(eventId)
                    );
                    if (!hasAll) {
                        return false;
                    }
                }
            }

            return true;
        });

        if (eligibleEvents.length === 0) {
            return null;
        }

        // Calculate weights with modifiers
        const weightedEvents = eligibleEvents.map(event => {
            let weight = event.weight || 1;
            if (this.state.eventWeightModifiers[event.id]) {
                weight *= this.state.eventWeightModifiers[event.id];
            }
            return { event, weight };
        });

        // Select random event based on weights
        const totalWeight = weightedEvents.reduce((sum, item) => sum + item.weight, 0);
        let random = Math.random() * totalWeight;

        for (const item of weightedEvents) {
            random -= item.weight;
            if (random <= 0) {
                return item.event;
            }
        }

        return weightedEvents[0].event;
    }

    displayEvent(event) {
        this.currentEvent = event;
        this.eventTitle.textContent = event.title;
        this.eventDescription.textContent = event.description;

        // Clear and populate choices
        this.choicesContainer.innerHTML = '';
        event.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';
            button.textContent = choice.text;
            button.addEventListener('click', () => this.makeChoice(choice, event.id));
            this.choicesContainer.appendChild(button);
        });
    }

    displayFallbackEvent() {
        // Generic event when no specific events match
        this.currentEvent = null;
        this.eventTitle.textContent = "A Quiet Quarter";
        this.eventDescription.textContent = "Nothing particularly dramatic happens this quarter. Your administration continues its usual... operations.";

        this.choicesContainer.innerHTML = '';
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = "Continue business as usual";
        button.addEventListener('click', () => {
            this.applyEffects({ personalWealth: 5, treasury: -5, elite: 0, anger: 5 });
            this.updateUI();
            this.nextTurn();
        });
        this.choicesContainer.appendChild(button);
    }

    makeChoice(choice, eventId) {
        // Apply effects
        this.applyEffects(choice.effects);

        // Add legacy if present
        if (choice.legacy) {
            this.state.legacy.push(choice.legacy);
        }

        // Trigger new events
        if (choice.eventTriggers) {
            choice.eventTriggers.forEach(triggerId => {
                this.state.triggeredEvents.add(triggerId);
            });
        }

        // Mark event as completed
        this.state.completedEvents.add(eventId);

        // Update UI
        this.updateUI();

        // Small delay before next turn for better UX
        setTimeout(() => {
            this.nextTurn();
        }, 500);
    }

    applyEffects(effects) {
        if (effects.personalWealth) {
            this.state.personalWealth += effects.personalWealth;
        }
        if (effects.treasury) {
            this.state.treasury += effects.treasury;
        }
        if (effects.elite) {
            this.state.elite += effects.elite;
        }
        if (effects.anger) {
            this.state.anger += effects.anger;
        }

        // Clamp values
        this.state.personalWealth = Math.max(0, Math.min(100, this.state.personalWealth));
        this.state.treasury = Math.max(0, Math.min(100, this.state.treasury));
        this.state.elite = Math.max(0, Math.min(100, this.state.elite));
        this.state.anger = Math.max(0, Math.min(100, this.state.anger));
    }

    checkGameOver() {
        let gameOverReason = null;

        if (this.state.elite <= 0) {
            gameOverReason = "🗡️ The Elite Have Turned Against You\n\nYour fellow oligarchs and generals have lost all confidence. A palace coup is inevitable. You flee to a non-extradition country with whatever wealth you could grab.";
        } else if (this.state.anger >= 100) {
            gameOverReason = "🔥 Revolution!\n\nThe people have had enough. Millions flood the streets. The military refuses to fire. Your regime crumbles as you desperately search for a helicopter.";
        } else if (this.state.treasury <= 0) {
            gameOverReason = "💸 State Bankruptcy\n\nThe treasury is empty. Government employees aren't paid. Services collapse. The elite abandon you. The state implodes as rival factions fight over the scraps.";
        }

        if (gameOverReason) {
            this.gameOver(gameOverReason);
            return true;
        }

        return false;
    }

    gameOver(reason) {
        this.isGameOver = true;
        this.gameScreen.classList.remove('active');
        this.gameoverScreen.classList.add('active');

        this.gameoverReason.textContent = reason;

        // Display final stats
        this.finalStats.innerHTML = `
            <h3 style="color: #d4af37; margin-bottom: 15px;">Final Statistics</h3>
            <div class="stat-line">
                <span>💰 Personal Wealth:</span>
                <span style="color: #d4af37; font-weight: bold;">${Math.round(this.state.personalWealth)}%</span>
            </div>
            <div class="stat-line">
                <span>🏛️ State Treasury:</span>
                <span style="color: #3498db; font-weight: bold;">${Math.round(this.state.treasury)}%</span>
            </div>
            <div class="stat-line">
                <span>👔 Elite Approval:</span>
                <span style="color: #9b59b6; font-weight: bold;">${Math.round(this.state.elite)}%</span>
            </div>
            <div class="stat-line">
                <span>😤 Public Anger:</span>
                <span style="color: #e74c3c; font-weight: bold;">${Math.round(this.state.anger)}%</span>
            </div>
            <div class="stat-line">
                <span>📅 Time in Power:</span>
                <span style="color: #e8e8e8; font-weight: bold;">${this.state.year} years, ${this.state.quarter - 1} quarters</span>
            </div>
        `;

        // Display legacy achievements
        if (this.state.legacy.length > 0) {
            const legacyHTML = this.state.legacy.map(legacy =>
                `<div class="legacy-badge" style="margin: 5px;">${legacy.icon} ${legacy.name}</div>`
            ).join('');
            this.finalLegacy.innerHTML = `
                <h3 style="color: #d4af37; margin-bottom: 15px;">Your Legacy</h3>
                <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                    ${legacyHTML}
                </div>
            `;
        } else {
            this.finalLegacy.innerHTML = `
                <h3 style="color: #d4af37; margin-bottom: 15px;">Your Legacy</h3>
                <p style="color: #b8b8b8; font-style: italic;">You left no particular mark on history...</p>
            `;
        }

        // Calculate and display score
        const score = Math.round(this.state.personalWealth *
                                 (this.state.year + this.state.quarter / 4) *
                                 (1 + this.state.legacy.length * 0.2));

        const scoreElement = document.createElement('div');
        scoreElement.style.cssText = 'margin-top: 20px; padding: 20px; background: rgba(212, 175, 55, 0.2); border-radius: 8px;';
        scoreElement.innerHTML = `
            <h3 style="color: #d4af37;">Oligarch Score: ${score}</h3>
            <p style="color: #b8b8b8; margin-top: 10px; font-size: 0.9em;">
                (Wealth × Time × Legacy Multiplier)
            </p>
        `;
        this.finalStats.appendChild(scoreElement);
    }
}

// Initialize game when DOM is loaded
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new OligarchGame();
});
