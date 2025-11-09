// The Oligarch's Gambit - Main Game Engine

class OligarchGame {
    constructor() {
        this.state = {
            personalWealth: 10, // In billions
            treasury: 1000, // In billions
            elite: 50, // Percentage
            anger: 20, // Percentage
            year: 1,
            quarter: 1,
            legacy: [],
            triggeredEvents: new Set(),
            completedEvents: new Set(),
            eventWeightModifiers: {},
            activeEventPool: [], // Events currently in the active pool
            decisionCounts: {}, // Track recurring decision choices
            activeStorylines: [], // Currently active storylines
            completedStorylines: [] // Finished storylines
        };

        // Maximum values for wealth metrics (for display bars)
        this.maxPersonalWealth = 200; // 200 billion
        this.maxTreasury = 2000; // 2000 billion

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
        this.initializeEventPool();
        this.updateUI();
        this.nextTurn();
    }

    restartGame() {
        this.state = {
            personalWealth: 10, // In billions
            treasury: 1000, // In billions
            elite: 50, // Percentage
            anger: 20, // Percentage
            year: 1,
            quarter: 1,
            legacy: [],
            triggeredEvents: new Set(),
            completedEvents: new Set(),
            eventWeightModifiers: {},
            activeEventPool: [],
            decisionCounts: {},
            activeStorylines: [],
            completedStorylines: []
        };

        this.isGameOver = false;
        this.gameoverScreen.classList.remove('active');
        this.gameScreen.classList.add('active');
        this.initializeEventPool();
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
        const value = this.state[metricName];

        // Calculate bar width and display text based on metric type
        let barWidth, displayText;

        if (metricName === 'personalWealth') {
            barWidth = Math.max(0, Math.min(100, (value / this.maxPersonalWealth) * 100));
            displayText = `$${Math.round(value)}B`;
        } else if (metricName === 'treasury') {
            barWidth = Math.max(0, Math.min(100, (value / this.maxTreasury) * 100));
            displayText = `$${Math.round(value)}B`;
        } else {
            // Elite and anger are percentages
            barWidth = Math.max(0, Math.min(100, value));
            displayText = `${Math.round(value)}%`;
        }

        barElement.style.width = `${barWidth}%`;
        valueElement.textContent = displayText;

        // Add warning colors for critical levels
        if (metricName === 'treasury' || metricName === 'elite') {
            if ((metricName === 'treasury' && value <= 100) ||
                (metricName === 'elite' && value <= 10)) {
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
            // Add negative styling for negative weights
            if (legacy.weight && legacy.weight < 0) {
                badge.style.backgroundColor = 'rgba(231, 76, 60, 0.3)';
                badge.style.borderColor = '#e74c3c';
            }
            badge.innerHTML = `<span>${legacy.icon}</span><span>${legacy.name}</span>`;

            // Make badge clickable with explanation
            const weight = legacy.weight || 5;
            const explanation = legacy.explanation || `${legacy.name}`;
            badge.title = `${explanation} (${weight > 0 ? '+' : ''}${weight}% on Oligarch Score)`;
            badge.style.cursor = 'pointer';

            // Add click handler for modal/tooltip
            badge.addEventListener('click', () => {
                alert(`${legacy.icon} ${legacy.name}\n\n${explanation}\n\nEffect on Oligarch Score: ${weight > 0 ? '+' : ''}${weight}%`);
            });

            this.legacyContainer.appendChild(badge);
        });
    }

    initializeEventPool() {
        // Start with basic recurring events and some storyline initiators
        const initialPool = EVENTS.filter(event => {
            // Include basic events (no storyline tag) or storyline initiators
            return !event.conditions ||
                   ((!event.conditions.hasTriggered || event.conditions.hasTriggered.length === 0) &&
                    !event.conditions.personalWealth &&
                    !event.conditions.year);
        }).map(e => e.id);

        // Take first ~25 events as starting pool
        this.state.activeEventPool = initialPool.slice(0, 25);
    }

    addToEventPool(eventIds) {
        if (!Array.isArray(eventIds)) {
            eventIds = [eventIds];
        }

        eventIds.forEach(eventId => {
            // Check if it's a storyline pattern like "*storyline:name"
            if (eventId.startsWith('*storyline:')) {
                const storylineName = eventId.substring(11);
                const storylineEvents = EVENTS
                    .filter(e => e.storyline === storylineName)
                    .map(e => e.id);
                storylineEvents.forEach(id => {
                    if (!this.state.activeEventPool.includes(id)) {
                        this.state.activeEventPool.push(id);
                    }
                });
            } else {
                // Regular event ID
                if (!this.state.activeEventPool.includes(eventId)) {
                    this.state.activeEventPool.push(eventId);
                }
            }
        });
    }

    removeFromEventPool(eventIds) {
        if (!Array.isArray(eventIds)) {
            eventIds = [eventIds];
        }

        eventIds.forEach(eventId => {
            // Check if it's a storyline pattern
            if (eventId.startsWith('*storyline:')) {
                const storylineName = eventId.substring(11);
                this.state.activeEventPool = this.state.activeEventPool.filter(id => {
                    const event = EVENTS.find(e => e.id === id);
                    return !event || event.storyline !== storylineName;
                });
            } else {
                // Regular event ID
                this.state.activeEventPool = this.state.activeEventPool.filter(id => id !== eventId);
            }
        });
    }

    trackDecision(eventId, choiceIndex) {
        // Create a unique key for this decision
        const decisionKey = `${eventId}_choice_${choiceIndex}`;

        if (!this.state.decisionCounts[decisionKey]) {
            this.state.decisionCounts[decisionKey] = 0;
        }

        this.state.decisionCounts[decisionKey]++;

        // Return the count for conditional logic
        return this.state.decisionCounts[decisionKey];
    }

    checkDecisionThresholds(eventId, choiceIndex) {
        // Check if decision tracking triggers new events
        const event = EVENTS.find(e => e.id === eventId);
        if (!event || !event.choices || !event.choices[choiceIndex]) {
            return;
        }

        const choice = event.choices[choiceIndex];
        if (choice.decisionThreshold) {
            const decisionKey = `${eventId}_choice_${choiceIndex}`;
            const count = this.state.decisionCounts[decisionKey] || 0;

            if (count >= choice.decisionThreshold.count) {
                // Trigger the threshold events
                if (choice.decisionThreshold.addToPool) {
                    this.addToEventPool(choice.decisionThreshold.addToPool);
                }
                if (choice.decisionThreshold.removeFromPool) {
                    this.removeFromEventPool(choice.decisionThreshold.removeFromPool);
                }
            }
        }
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
        // Filter to events in active pool first
        const poolEvents = EVENTS.filter(event =>
            this.state.activeEventPool.includes(event.id)
        );

        // Then filter by eligibility
        const eligibleEvents = poolEvents.filter(event => {
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
            button.addEventListener('click', () => this.makeChoice(choice, event.id, index));
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
            this.applyEffects({ personalWealth: 1, treasury: -10, elite: 0, anger: 5 });
            this.updateUI();
            this.nextTurn();
        });
        this.choicesContainer.appendChild(button);
    }

    makeChoice(choice, eventId, choiceIndex) {
        // Apply effects
        this.applyEffects(choice.effects);

        // Add legacy if present
        if (choice.legacy) {
            this.state.legacy.push(choice.legacy);
        }

        // Trigger new events (legacy system)
        if (choice.eventTriggers) {
            choice.eventTriggers.forEach(triggerId => {
                this.state.triggeredEvents.add(triggerId);
            });
        }

        // Pool management - add events
        if (choice.addToPool) {
            this.addToEventPool(choice.addToPool);
        }

        // Pool management - remove events
        if (choice.removeFromPool) {
            this.removeFromEventPool(choice.removeFromPool);
        }

        // Track decision for recurring events
        const event = EVENTS.find(e => e.id === eventId);
        if (event && !event.onceOnly) {
            this.trackDecision(eventId, choiceIndex);
            this.checkDecisionThresholds(eventId, choiceIndex);
        }

        // Mark event as completed and remove from pool if onceOnly
        this.state.completedEvents.add(eventId);
        if (event && event.onceOnly) {
            this.removeFromEventPool(eventId);
        }

        // Handle storyline activation/completion
        if (event && event.storyline) {
            if (!this.state.activeStorylines.includes(event.storyline)) {
                this.state.activeStorylines.push(event.storyline);
            }

            // Check if this completes the storyline
            if (choice.completeStoryline) {
                this.state.completedStorylines.push(event.storyline);
                this.state.activeStorylines = this.state.activeStorylines.filter(
                    s => s !== event.storyline
                );
                // Remove all remaining events from this storyline
                this.removeFromEventPool(`*storyline:${event.storyline}`);
            }
        }

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

        // Clamp values to appropriate ranges
        this.state.personalWealth = Math.max(0, Math.min(this.maxPersonalWealth, this.state.personalWealth));
        this.state.treasury = Math.max(0, Math.min(this.maxTreasury, this.state.treasury));
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
                <span style="color: #d4af37; font-weight: bold;">$${Math.round(this.state.personalWealth)}B</span>
            </div>
            <div class="stat-line">
                <span>🏛️ State Treasury:</span>
                <span style="color: #3498db; font-weight: bold;">$${Math.round(this.state.treasury)}B</span>
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

        // Calculate weighted legacy score
        const legacyMultiplier = this.state.legacy.reduce((sum, legacy) => {
            return sum + (legacy.weight || 5); // Default weight of 5 if not specified
        }, 0);

        // Calculate and display score
        const score = Math.round(this.state.personalWealth *
                                 (this.state.year + this.state.quarter / 4) *
                                 (1 + legacyMultiplier / 100));

        const scoreElement = document.createElement('div');
        scoreElement.style.cssText = 'margin-top: 20px; padding: 20px; background: rgba(212, 175, 55, 0.2); border-radius: 8px;';
        scoreElement.innerHTML = `
            <h3 style="color: #d4af37;">Oligarch Score: ${score}</h3>
            <p style="color: #b8b8b8; margin-top: 10px; font-size: 0.9em;">
                (Wealth × Time × Legacy Multiplier)
            </p>
            <p style="color: #b8b8b8; margin-top: 5px; font-size: 0.85em;">
                Legacy Impact: ${legacyMultiplier > 0 ? '+' : ''}${legacyMultiplier}%
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
