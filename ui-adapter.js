/**
 * UI Adapter Layer
 * 
 * Bridges the v2 game engine to the DOM elements
 */

export class GameUI {
    constructor(engine, allEvents) {
        this.engine = engine;
        this.allEvents = allEvents;
        this.debugGraph = null;
        this.bindElements();
        this.maxPersonalWealth = 200;
        this.maxTreasury = 2000;
    }

    setDebugGraph(debugGraph) {
        this.debugGraph = debugGraph;
    }

    bindElements() {
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

        // Debug
        this.debugVersion = document.getElementById('debug-version');
        this.debugSummary = document.getElementById('debug-summary');
        this.debugTotalEvents = document.getElementById('debug-total-events');
        this.debugActiveEvents = document.getElementById('debug-active-events');
        this.debugEventsList = document.getElementById('debug-events-list');
    }

    updateDisplay() {
        const state = this.engine.getState();
        this.updatePeriod(state.year, state.quarter);
        this.updateMetrics(state.stats);
        this.updateLegacy(state);
        this.updateDebugInfo(state);

        // Update graph if available
        if (this.debugGraph) {
            this.debugGraph.update();
        }
    }

    updatePeriod(year, quarter) {
        if (this.currentPeriod) {
            this.currentPeriod.textContent = `Quarter ${quarter}, Year ${year}`;
        }
    }

    updateMetrics(stats) {
        this.updateMetric('personalWealth', stats.personalWealth, this.personalWealthBar, this.personalWealthValue, this.maxPersonalWealth, true);
        this.updateMetric('treasury', stats.treasury, this.treasuryBar, this.treasuryValue, this.maxTreasury, true);
        this.updateMetric('elite', stats.elite, this.eliteBar, this.eliteValue, 100, false);
        this.updateMetric('anger', stats.anger, this.angerBar, this.angerValue, 100, false);
    }

    updateMetric(metricName, value, barElement, valueElement, maxValue, isCurrency) {
        if (!barElement || !valueElement) return;

        const barWidth = Math.max(0, Math.min(100, (value / maxValue) * 100));
        const displayText = isCurrency ? `$${Math.round(value)}B` : `${Math.round(value)}%`;

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

    updateLegacy(state) {
        if (!this.legacyContainer) return;

        this.legacyContainer.innerHTML = '';

        // Legacy is stored in history entries (from makeChoice result)
        const legacyItems = state.history
            .filter(entry => entry.legacy)
            .map(entry => entry.legacy);

        // Remove duplicates based on name
        const uniqueLegacy = [];
        const seenNames = new Set();
        legacyItems.forEach(legacy => {
            if (legacy && !seenNames.has(legacy.name)) {
                seenNames.add(legacy.name);
                uniqueLegacy.push(legacy);
            }
        });

        uniqueLegacy.forEach(legacy => {
            const badge = document.createElement('div');
            badge.className = 'legacy-badge';

            if (legacy.weight && legacy.weight < 0) {
                badge.style.backgroundColor = 'rgba(231, 76, 60, 0.3)';
                badge.style.borderColor = '#e74c3c';
            }

            badge.innerHTML = `<span>${legacy.icon}</span><span>${legacy.name}</span>`;

            const weight = legacy.weight || 5;
            const explanation = legacy.explanation || `${legacy.name}`;
            badge.title = `${explanation} (${weight > 0 ? '+' : ''}${weight}% on Oligarch Score)`;
            badge.style.cursor = 'pointer';

            badge.addEventListener('click', () => {
                alert(`${legacy.icon} ${legacy.name}\n\n${explanation}\n\nEffect on Oligarch Score: ${weight > 0 ? '+' : ''}${weight}%`);
            });

            this.legacyContainer.appendChild(badge);
        });
    }

    updateDebugInfo(state) {
        if (!this.debugVersion || !this.debugSummary || !this.debugTotalEvents || !this.debugActiveEvents) return;

        // Version info (could be moved to a config)
        this.debugVersion.textContent = '2.0.1';
        this.debugSummary.textContent = 'V2 Engine Integration';

        // Count total events
        const totalEvents = this.engine.allEvents.length;
        this.debugTotalEvents.textContent = totalEvents;

        // Count eligible events
        const eligibleEvents = this.engine.getEligibleEvents();
        this.debugActiveEvents.textContent = eligibleEvents.length;

        // Update active events list
        if (this.debugEventsList) {
            this.debugEventsList.innerHTML = '';
            const deck = state.deck;

            if (deck.length === 0) {
                this.debugEventsList.innerHTML = '<div style="color: #888; font-style: italic;">No events in deck</div>';
            } else {
                deck.forEach(eventId => {
                    const event = this.engine.allEvents.find(e => e.id === eventId);
                    if (event) {
                        const eventItem = document.createElement('div');
                        eventItem.className = 'debug-event-item';

                        const isEligible = eligibleEvents.some(e => e.id === eventId);
                        const eligibleText = isEligible ? '✓' : '✗';
                        const eligibleColor = isEligible ? '#00ff00' : '#ff6b6b';

                        eventItem.innerHTML = `
                            <span class="debug-event-id" style="color: ${eligibleColor};">${eligibleText} ${event.id}</span>
                            <span class="debug-event-title">${event.title}</span>
                        `;

                        this.debugEventsList.appendChild(eventItem);
                    }
                });
            }
        }
    }

    displayEvent(event) {
        if (!event) {
            this.displayFallbackEvent();
            return;
        }

        if (!this.eventTitle || !this.eventDescription || !this.choicesContainer) return;

        // Add storyline tag if present
        const storylines = event.storylines || (event.storyline ? [event.storyline] : []);
        if (storylines.length > 0) {
            const storylineTag = this.formatStorylineTag(storylines[0]);
            this.eventTitle.innerHTML = `${storylineTag} ${event.title}`;
        } else {
            this.eventTitle.textContent = event.title;
        }

        this.eventDescription.textContent = event.description;

        // Clear and populate choices
        this.choicesContainer.innerHTML = '';
        event.choices.forEach((choice, index) => {
            const button = document.createElement('button');
            button.className = 'choice-btn';

            // Create choice text with effects preview
            const effectsHTML = this.formatEffects(choice.effects);
            button.innerHTML = `
                <div class="choice-text">${choice.text}</div>
                ${effectsHTML}
            `;

            button.addEventListener('click', () => this.handleChoice(index));
            this.choicesContainer.appendChild(button);
        });

        // Update graph with current event
        if (this.debugGraph) {
            this.debugGraph.setCurrentEvent(event.id);
        }
    }

    formatStorylineTag(storyline) {
        const tagNames = {
            'war-invasion': '⚔️ War',
            'energy-politics': '⚡ Energy',
            'oligarch-rivalry': '👑 Intrigue',
            'sanctions-spiral': '🚫 Sanctions',
            'succession-crisis': '👑 Succession',
            'popular-uprising': '🔥 Uprising',
            'domestic-crisis': '🏛️ Crisis'
        };

        const tagName = tagNames[storyline] || storyline;
        return `<span style="display: inline-block; background: rgba(212, 175, 55, 0.3); color: #d4af37; padding: 2px 8px; border-radius: 4px; font-size: 0.75em; margin-right: 8px; font-weight: normal;">${tagName}</span>`;
    }

    formatEffects(effects) {
        if (!effects) return '';

        const effectStrings = [];
        const effectIcons = {
            personalWealth: '💰',
            treasury: '🏛️',
            elite: '👔',
            anger: '😤'
        };

        // Handle both old format (direct stat names) and new format (effects.stats)
        const stats = effects.stats || effects;

        for (const [key, value] of Object.entries(stats)) {
            if (value !== 0 && effectIcons[key]) {
                let indicator = '';
                const absValue = Math.abs(value);
                const direction = value > 0 ? '↑' : '↓';

                if (absValue <= 10) {
                    indicator = direction;
                } else if (absValue <= 20) {
                    indicator = direction + direction;
                } else {
                    indicator = direction + direction + direction;
                }

                const color = value > 0 ? '#2ecc71' : '#e74c3c';
                effectStrings.push(`<span style="color: ${color};">${effectIcons[key]} ${indicator}</span>`);
            }
        }

        return effectStrings.length > 0 ? `<div class="choice-effects">${effectStrings.join(' ')}</div>` : '';
    }

    displayFallbackEvent() {
        if (!this.eventTitle || !this.eventDescription || !this.choicesContainer) return;

        this.eventTitle.textContent = "A Quiet Quarter";
        this.eventDescription.textContent = "Nothing particularly dramatic happens this quarter. Your administration continues its usual... operations.";

        this.choicesContainer.innerHTML = '';
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = "Continue business as usual";
        button.addEventListener('click', () => {
            // This will be handled by the game loop
        });
        this.choicesContainer.appendChild(button);
    }

    handleChoice(choiceIndex) {
        try {
            const currentEvent = this.engine.currentEvent;
            const result = this.engine.makeChoice(choiceIndex);

            // Mark event as completed in graph
            if (currentEvent && this.debugGraph) {
                this.debugGraph.markCompleted(currentEvent.id);
            }

            this.updateDisplay();

            // Check for game over
            const gameOver = this.engine.checkGameOver();
            if (gameOver) {
                this.showGameOver(gameOver);
                return;
            }

            // Draw next event
            const nextEvent = this.engine.drawNextEvent();
            if (nextEvent) {
                this.displayEvent(nextEvent);
            } else {
                this.displayFallbackEvent();
            }
        } catch (error) {
            console.error('Error handling choice:', error);
            alert(`Error: ${error.message}`);
        }
    }

    showGameOver(gameOver) {
        const gameScreen = document.getElementById('game-screen');
        const gameoverScreen = document.getElementById('gameover-screen');
        const gameoverReason = document.getElementById('gameover-reason');
        const finalStats = document.getElementById('final-stats');
        const finalLegacy = document.getElementById('final-legacy');

        if (!gameScreen || !gameoverScreen || !gameoverReason || !finalStats) return;

        gameScreen.classList.remove('active');
        gameoverScreen.classList.add('active');

        gameoverReason.textContent = `${gameOver.reason}\n\n${gameOver.description}`;

        const state = this.engine.getState();
        finalStats.innerHTML = `
            <h3 style="color: #d4af37; margin-bottom: 15px;">Final Statistics</h3>
            <div class="stat-line">
                <span>💰 Personal Wealth:</span>
                <span style="color: #d4af37; font-weight: bold;">$${Math.round(state.stats.personalWealth)}B</span>
            </div>
            <div class="stat-line">
                <span>🏛️ State Treasury:</span>
                <span style="color: #3498db; font-weight: bold;">$${Math.round(state.stats.treasury)}B</span>
            </div>
            <div class="stat-line">
                <span>👔 Elite Approval:</span>
                <span style="color: #9b59b6; font-weight: bold;">${Math.round(state.stats.elite)}%</span>
            </div>
            <div class="stat-line">
                <span>😤 Public Anger:</span>
                <span style="color: #e74c3c; font-weight: bold;">${Math.round(state.stats.anger)}%</span>
            </div>
            <div class="stat-line">
                <span>📅 Time in Power:</span>
                <span style="color: #e8e8e8; font-weight: bold;">${state.year} years, ${state.quarter - 1} quarters</span>
            </div>
        `;

        // Calculate legacy score
        const legacyItems = state.history.filter(entry => entry.legacy).map(entry => entry.legacy);
        const legacyMultiplier = legacyItems.reduce((sum, legacy) => sum + (legacy.weight || 5), 0);

        if (legacyItems.length > 0 && finalLegacy) {
            const legacyHTML = legacyItems.map(legacy =>
                `<div class="legacy-badge" style="margin: 5px;">${legacy.icon} ${legacy.name}</div>`
            ).join('');
            finalLegacy.innerHTML = `
                <h3 style="color: #d4af37; margin-bottom: 15px;">Your Legacy</h3>
                <div style="display: flex; flex-wrap: wrap; justify-content: center;">
                    ${legacyHTML}
                </div>
            `;
        } else if (finalLegacy) {
            finalLegacy.innerHTML = `
                <h3 style="color: #d4af37; margin-bottom: 15px;">Your Legacy</h3>
                <p style="color: #b8b8b8; font-style: italic;">You left no particular mark on history...</p>
            `;
        }

        const score = Math.round(state.stats.personalWealth *
            (state.year + state.quarter / 4) *
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
        finalStats.appendChild(scoreElement);
    }
}

