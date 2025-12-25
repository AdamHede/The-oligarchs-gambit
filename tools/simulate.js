#!/usr/bin/env node

/**
 * Monte Carlo Simulator v1.0.0
 * 
 * Simulates thousands of games with different strategies to analyze
 * game balance, average length, death causes, and critical events.
 */

import { loadAllEvents } from './validate.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const VERSION = '1.0.0';

// Game constants
const INITIAL_STATS = {
    personalWealth: 10,
    treasury: 1000,
    elite: 90,
    anger: 10
};

const STAT_BOUNDS = {
    personalWealth: { min: 0, max: 200 },
    treasury: { min: 0, max: 2000 },
    elite: { min: 0, max: 100 },
    anger: { min: 0, max: 100 }
};

/**
 * Normalize effects to new format
 */
function normalizeEffects(effects) {
    if (!effects) return { stats: {} };
    if (effects.stats) return effects;

    const stats = {};
    const statKeys = ['personalWealth', 'treasury', 'elite', 'anger'];

    for (const [key, value] of Object.entries(effects)) {
        if (statKeys.includes(key) && typeof value === 'number') {
            stats[key] = value;
        }
    }

    return { stats, legacy: effects.legacy };
}

/**
 * Normalize choice deck operations
 */
function normalizeChoice(choice) {
    return {
        ...choice,
        add: choice.add || choice.addToPool || [],
        remove: choice.remove || choice.removeFromPool || []
    };
}

/**
 * Clamp value to bounds
 */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


/**
 * Calculate histogram data
 */
function calculateHistogram(data, binSize = 10) {
    const min = Math.floor(Math.min(...data) / binSize) * binSize;
    const max = Math.ceil(Math.max(...data) / binSize) * binSize;

    const bins = {};
    for (let i = min; i < max; i += binSize) {
        bins[`${i}-${i + binSize - 1}`] = 0;
    }

    data.forEach(val => {
        const binStart = Math.floor(val / binSize) * binSize;
        const key = `${binStart}-${binStart + binSize - 1}`;
        // Handle max value falling into next bin if it's exactly on boundary or simple expansion
        if (bins[key] !== undefined) {
            bins[key]++;
        } else {
            // Should not happen with proper range setup, but safety fallback
            bins[key] = 1;
        }
    });

    return bins;
}

/**
 * Draw ASCII Histogram
 */
function drawAsciiHistogram(histogram, totalCount) {
    const maxWidth = 40;
    const lines = [];

    // Sort keys numerically
    const sortedKeys = Object.keys(histogram).sort((a, b) => {
        return parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]);
    });

    let maxCount = 0;
    for (const key of sortedKeys) {
        maxCount = Math.max(maxCount, histogram[key]);
    }

    sortedKeys.forEach(key => {
        const count = histogram[key];
        const percentage = (count / totalCount * 100).toFixed(1);
        const barLength = Math.round((count / maxCount) * maxWidth);
        const bar = '█'.repeat(barLength);

        // Format: "  0-9   | ██████ (15.0%)"
        const label = key.padStart(7);
        lines.push(`      ${label} | ${bar} ${count} (${percentage}%)`);
    });

    return lines.join('\n');
}

/**
 * Simple game state for simulation
 */
class SimulatedGame {
    constructor(allEvents) {
        this.allEvents = allEvents;
        this.eventMap = new Map(allEvents.map(e => [e.id, e]));
        this.reset();
    }

    reset() {
        this.stats = { ...INITIAL_STATS };
        this.deck = this.getInitialDeck();
        this.turn = 0;
        this.year = 1;
        this.quarter = 1;
        this.history = [];
        this.isGameOver = false;
        this.gameOverReason = null;
        this.terminatedEvents = new Set(); // v2.1: Track onceOnly events that have been drawn
    }

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

        // Force-include early-game agenda events (these set up major storylines)
        const earlyGameEvents = [
            'dacha_summit',
            'first_big_move',
            'inaugural_address',
            'aluminum_king_introduction'
        ];
        for (const eventId of earlyGameEvents) {
            // v2.2: Look in allEvents, not eligible (to allow weight: 0 events to be force-included)
            const earlyEvent = this.allEvents.find(e => e.id === eventId);
            if (earlyEvent && !deck.includes(eventId)) {
                deck.push(eventId);
            }
        }

        // Pool for remaining selection (exclude already added)
        let pool = eligible.filter(e => !deck.includes(e.id));
        const targetSize = 7;

        // Weighted random selection
        while (deck.length < targetSize && pool.length > 0) {
            const weights = pool.map(e => {
                const rarity = e.rarity || 'common';
                if (rarity === 'common') return 10;
                if (rarity === 'rare') return 2;
                return 1;
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

            if (selectedIndex === -1) selectedIndex = pool.length - 1;

            deck.push(pool[selectedIndex].id);
            pool.splice(selectedIndex, 1);
        }

        return deck;
    }

    /**
     * v2.1: Check if event is within its time gate
     */
    isWithinTimeGate(event) {
        const timeGate = event.timeGate;
        if (!timeGate) return true;

        const year = this.year;
        const quarter = this.quarter;

        // Check year bounds
        if (timeGate.minYear !== undefined && year < timeGate.minYear) return false;
        if (timeGate.maxYear !== undefined && year > timeGate.maxYear) return false;

        // Check quarter bounds (within valid year range)
        if (timeGate.minQuarter !== undefined) {
            if (timeGate.minYear !== undefined && year === timeGate.minYear) {
                if (quarter < timeGate.minQuarter) return false;
            }
        }
        if (timeGate.maxQuarter !== undefined) {
            if (timeGate.maxYear !== undefined && year === timeGate.maxYear) {
                if (quarter > timeGate.maxQuarter) return false;
            }
        }

        return true;
    }

    /**
     * v2.1: Check if event is eligible (time gate + not terminated)
     */
    isEventEligible(event) {
        if (!event) return false;
        if (this.terminatedEvents.has(event.id)) return false;
        if (!this.isWithinTimeGate(event)) return false;
        return true;
    }

    drawEvent() {
        if (this.deck.length === 0) return null;

        // Weight-based selection with v2.1 eligibility filtering
        const eligibleEvents = this.deck
            .map(id => this.eventMap.get(id))
            .filter(e => this.isEventEligible(e));

        if (eligibleEvents.length === 0) return null;

        const totalWeight = eligibleEvents.reduce((sum, e) => sum + (e.weight || 1), 0);
        let random = Math.random() * totalWeight;

        for (const event of eligibleEvents) {
            random -= (event.weight || 1);
            if (random <= 0) {
                // v2.1: Handle onceOnly events - mark as terminated
                if (event.onceOnly === true) {
                    this.terminatedEvents.add(event.id);
                    this.deck = this.deck.filter(id => id !== event.id);
                }
                return event;
            }
        }

        const selectedEvent = eligibleEvents[0];
        // v2.1: Handle onceOnly for fallback selection
        if (selectedEvent && selectedEvent.onceOnly === true) {
            this.terminatedEvents.add(selectedEvent.id);
            this.deck = this.deck.filter(id => id !== selectedEvent.id);
        }
        return selectedEvent;
    }

    applyChoice(event, choiceIndex) {
        const choice = normalizeChoice(event.choices[choiceIndex]);
        const effects = normalizeEffects(choice.effects);

        // Apply stat changes
        for (const [stat, delta] of Object.entries(effects.stats || {})) {
            if (this.stats[stat] !== undefined) {
                const bounds = STAT_BOUNDS[stat];
                this.stats[stat] = clamp(this.stats[stat] + delta, bounds.min, bounds.max);
            }
        }

        // Update deck
        // Remove self (non-recurring events)
        if (!event.recurring) {
            this.deck = this.deck.filter(id => id !== event.id);
        }

        // Add new events
        choice.add.forEach(id => {
            if (this.eventMap.has(id) && !this.deck.includes(id)) {
                this.deck.push(id);
            }
        });

        // Remove events
        choice.remove.forEach(id => {
            this.deck = this.deck.filter(eid => eid !== id);
        });

        // Record history
        const deckSizeAfter = this.deck.length;
        this.history.push({
            turn: this.turn,
            eventId: event.id,
            choiceIndex,
            statsAfter: { ...this.stats },
            deckSizeAfter
        });

        this.turn++;
        
        // v2.1: Advance time (each turn = 1 quarter)
        this.quarter++;
        if (this.quarter > 4) {
            this.quarter = 1;
            this.year++;
        }
    }

    checkGameOver() {
        if (this.stats.elite <= 0) {
            this.isGameOver = true;
            this.gameOverReason = 'elite_revolt';
            return true;
        }
        if (this.stats.anger >= 100) {
            this.isGameOver = true;
            this.gameOverReason = 'revolution';
            return true;
        }
        if (this.stats.treasury <= 0) {
            this.isGameOver = true;
            this.gameOverReason = 'bankruptcy';
            return true;
        }
        return false;
    }
}

/**
 * Strategy: Choose randomly
 */
function strategyRandom(event, stats) {
    return Math.floor(Math.random() * event.choices.length);
}

/**
 * Strategy: Maximize personal wealth
 */
function strategyGreedy(event, stats) {
    let bestIndex = 0;
    let bestWealth = -Infinity;

    event.choices.forEach((choice, idx) => {
        const effects = normalizeEffects(choice.effects).stats || {};
        const wealth = effects.personalWealth || 0;
        if (wealth > bestWealth) {
            bestWealth = wealth;
            bestIndex = idx;
        }
    });

    return bestIndex;
}

/**
 * Strategy: Prioritize survival (avoid death conditions)
 */
function strategyConservative(event, stats) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    event.choices.forEach((choice, idx) => {
        const effects = normalizeEffects(choice.effects).stats || {};

        // Score based on how safe the choice is
        let score = 0;

        // Heavily weight avoiding death conditions
        if (stats.elite < 30) score += (effects.elite || 0) * 3;
        else score += (effects.elite || 0);

        if (stats.anger > 70) score -= (effects.anger || 0) * 3;
        else score -= (effects.anger || 0);

        // v2.2: Treasury is critical for survival (bankruptcy is #1 killer)
        if (stats.treasury < 200) score += (effects.treasury || 0) * 2; // Increased weight significantly
        else score += (effects.treasury || 0) / 10;

        if (score > bestScore) {
            bestScore = score;
            bestIndex = idx;
        }
    });

    return bestIndex;
}

/**
 * Strategy: Balance all stats
 */
function strategyBalanced(event, stats) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    event.choices.forEach((choice, idx) => {
        const effects = normalizeEffects(choice.effects).stats || {};

        // Score: try to keep all stats in safe zones
        let score = 0;

        // Personal wealth is good
        score += (effects.personalWealth || 0) * 2;

        // Treasury: aim for middle
        score += (effects.treasury || 0) / 30;

        // Elite: aim for 50+
        score += (effects.elite || 0);

        // Anger: lower is better
        score -= (effects.anger || 0) * 1.5;

        if (score > bestScore) {
            bestScore = score;
            bestIndex = idx;
        }
    });

    return bestIndex;
}

const STRATEGIES = {
    random: strategyRandom,
    greedy: strategyGreedy,
    conservative: strategyConservative,
    balanced: strategyBalanced
};

/**
 * Run a single simulation
 */
function runSimulation(game, strategy) {
    game.reset();
    const maxTurns = 200; // Safety limit

    while (!game.isGameOver && game.turn < maxTurns) {
        const event = game.drawEvent();

        if (!event || !event.choices || event.choices.length === 0) {
            // Deck empty or invalid event
            // Fallback: If deck is empty, add quiet_quarter
            if (game.deck.length === 0) {
                game.deck.push('quiet_quarter');
                continue;
            }
            break;
        }

        const choiceIndex = strategy(event, game.stats);
        game.applyChoice(event, choiceIndex);
        game.checkGameOver();
    }

    return {
        turns: game.turn,
        finalStats: { ...game.stats },
        gameOverReason: game.gameOverReason || 'max_turns',
        history: game.history,
        finalWealth: game.stats.personalWealth,
        uniqueEvents: [...new Set(game.history.map(h => h.eventId))]
    };
}

/**
 * Run Monte Carlo simulation
 */
function runMonteCarloSimulation(events, numGames = 1000, strategyName = 'random') {
    const game = new SimulatedGame(events);
    const strategy = STRATEGIES[strategyName] || strategyRandom;

    const results = {
        games: [],
        deathCauses: { elite_revolt: 0, revolution: 0, bankruptcy: 0, max_turns: 0 },
        turnDistribution: [],
        wealthDistribution: [],
        eventFrequency: {},
        eventPresence: {}, // NEW: How many games an event appeared in
        eventDeathProximity: {}, // How often an event appears in last 3 turns before death
        scores: [],
        // Per-turn deck size aggregation (end-of-turn, after choice deck ops)
        deckSizeByTurn: {
            sums: [],
            counts: []
        }
    };

    for (let i = 0; i < numGames; i++) {
        const result = runSimulation(game, strategy);

        results.games.push({
            turns: result.turns,
            finalWealth: result.finalWealth,
            gameOverReason: result.gameOverReason
        });

        results.deathCauses[result.gameOverReason]++;
        results.turnDistribution.push(result.turns);
        results.wealthDistribution.push(result.finalWealth);

        // Approximate Oligarch Score = Wealth * Years (Turns / 4)
        // Ignoring legacy multiplier for Monte Carlo efficiency
        const score = result.finalWealth * (result.turns / 4);
        results.scores.push(score);

        // Track event frequency
        result.history.forEach(h => {
            results.eventFrequency[h.eventId] = (results.eventFrequency[h.eventId] || 0) + 1;
        });

        // Track average deck size per turn (0-based turn index in this simulator)
        result.history.forEach(h => {
            const t = h.turn;
            if (t === undefined || t === null) return;
            const deckSize = h.deckSizeAfter;
            if (typeof deckSize !== 'number') return;
            results.deckSizeByTurn.sums[t] = (results.deckSizeByTurn.sums[t] || 0) + deckSize;
            results.deckSizeByTurn.counts[t] = (results.deckSizeByTurn.counts[t] || 0) + 1;
        });

        // Track event presence (unique per game)
        result.uniqueEvents.forEach(eventId => {
            results.eventPresence[eventId] = (results.eventPresence[eventId] || 0) + 1;
        });

        // Track events near death
        const lastEvents = result.history.slice(-3);
        lastEvents.forEach(h => {
            results.eventDeathProximity[h.eventId] = (results.eventDeathProximity[h.eventId] || 0) + 1;
        });
    }

    // Calculate statistics
    const turns = results.turnDistribution;
    const wealth = results.wealthDistribution;

    const sortedTurns = [...turns].sort((a, b) => a - b);
    const sortedWealth = [...wealth].sort((a, b) => a - b);

    results.statistics = {
        games: numGames,
        strategy: strategyName,
        turns: {
            min: Math.min(...turns),
            max: Math.max(...turns),
            mean: turns.reduce((a, b) => a + b, 0) / turns.length,
            median: sortedTurns[Math.floor(sortedTurns.length / 2)],
            p10: sortedTurns[Math.floor(sortedTurns.length * 0.1)],
            p90: sortedTurns[Math.floor(sortedTurns.length * 0.9)]
        },
        deckSize: (() => {
            const sums = results.deckSizeByTurn.sums;
            const counts = results.deckSizeByTurn.counts;
            const perTurn = sums.map((sum, idx) => {
                const c = counts[idx] || 0;
                return c ? (sum / c) : null;
            });
            const samples = sums.reduce((acc, sum, idx) => {
                const c = counts[idx] || 0;
                return acc + (c ? c : 0);
            }, 0);
            const totalDeckSize = sums.reduce((a, b) => a + (b || 0), 0);
            const overallMean = samples ? (totalDeckSize / samples) : 0;
            return {
                // End-of-turn deck size, after applying the chosen option's add/remove ops
                // Turn numbers in output are 1-based (Turn 1 corresponds to internal index 0)
                overallMean,
                perTurn
            };
        })(),
        wealth: {
            min: Math.min(...wealth),
            max: Math.max(...wealth),
            mean: wealth.reduce((a, b) => a + b, 0) / wealth.length,
            median: sortedWealth[Math.floor(sortedWealth.length / 2)]
        },
        deathCausePercentages: {
            elite_revolt: (results.deathCauses.elite_revolt / numGames * 100).toFixed(1) + '%',
            revolution: (results.deathCauses.revolution / numGames * 100).toFixed(1) + '%',
            bankruptcy: (results.deathCauses.bankruptcy / numGames * 100).toFixed(1) + '%',
            max_turns: (results.deathCauses.max_turns / numGames * 100).toFixed(1) + '%'
        },
        histogram: calculateHistogram(turns, 10),
        score: {
            min: Math.min(...results.scores),
            max: Math.max(...results.scores),
            mean: results.scores.reduce((a, b) => a + b, 0) / results.scores.length,
            median: [...results.scores].sort((a, b) => a - b)[Math.floor(results.scores.length / 2)]
        }
    };

    // Top killer events (events frequently appearing before death)
    results.topKillerEvents = Object.entries(results.eventDeathProximity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([id, count]) => ({ id, count, percentage: (count / numGames * 100).toFixed(1) + '%' }));

    // Most frequent events
    results.mostFrequentEvents = Object.entries(results.eventFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([id, count]) => ({ id, count, avgPerGame: (count / numGames).toFixed(2) }));

    return results;
}

/**
 * Generate timestamp
 */
function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

/**
 * Main function
 */
function main() {
    const timestamp = getTimestamp();
    const args = process.argv.slice(2);
    const numGames = parseInt(args[0]) || 1000;

    console.log('╔════════════════════════════════════════╗');
    console.log('║    Monte Carlo Simulator v' + VERSION + '       ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('📂 Loading events...\n');
    const events = loadAllEvents();
    console.log(`   Loaded ${events.length} events\n`);

    if (events.length === 0) {
        console.log('⚠️  No events found.\n');
        process.exit(0);
    }

    console.log(`🎲 Running ${numGames} simulations per strategy...\n`);

    const allResults = {};

    for (const strategyName of Object.keys(STRATEGIES)) {
        console.log(`   Running ${strategyName} strategy...`);
        const results = runMonteCarloSimulation(events, numGames, strategyName);
        allResults[strategyName] = results;

        const stats = results.statistics;
        console.log(`      Avg turns: ${stats.turns.mean.toFixed(1)} (${stats.turns.min}-${stats.turns.max})`);
        console.log(`      Avg wealth: ${stats.wealth.mean.toFixed(1)}`);
        console.log(`      Avg Score: ${stats.score.mean.toFixed(0)}`);
        console.log(`      Avg deck size (end-of-turn): ${stats.deckSize.overallMean.toFixed(2)}`);
        console.log(`      Deaths: Elite ${stats.deathCausePercentages.elite_revolt}, ` +
            `Revolution ${stats.deathCausePercentages.revolution}, ` +
            `Bankrupt ${stats.deathCausePercentages.bankruptcy}`);
        console.log('\n      Game Length Distribution (Turns):');
        console.log(drawAsciiHistogram(stats.histogram, numGames));
        console.log('\n      Avg Deck Size by Turn (end-of-turn, Turn 1..):');
        const perTurn = stats.deckSize.perTurn;
        const maxToPrint = 40;
        const printed = Math.min(perTurn.length, maxToPrint);
        for (let i = 0; i < printed; i++) {
            const v = perTurn[i];
            if (v === null || v === undefined) continue;
            console.log(`         Turn ${String(i + 1).padStart(3)}: ${v.toFixed(2)}`);
        }
        if (perTurn.length > maxToPrint) {
            console.log(`         ... (see report JSON for full series up to Turn ${perTurn.length})`);
        }
        console.log('');
    }

    // Display comparison
    console.log('═══════════════════════════════════════════');
    console.log('📊 STRATEGY COMPARISON\n');

    console.log('   Strategy        | Avg Turns | Avg Wealth | Avg Score | Top Death Cause');
    console.log('   ----------------|-----------|------------|-----------|----------------');

    for (const [name, results] of Object.entries(allResults)) {
        const stats = results.statistics;
        const topDeath = Object.entries(results.deathCauses)
            .sort((a, b) => b[1] - a[1])[0][0];

        console.log(`   ${name.padEnd(15)} | ${stats.turns.mean.toFixed(1).padStart(9)} | ` +
            `${stats.wealth.mean.toFixed(1).padStart(10)} | ${stats.score.mean.toFixed(0).padStart(9)} | ${topDeath}`);
    }

    console.log('\n═══════════════════════════════════════════');
    console.log('💀 TOP KILLER EVENTS (across all strategies)\n');

    // Aggregate killer events across strategies
    const aggregateKillers = {};
    for (const results of Object.values(allResults)) {
        for (const killer of results.topKillerEvents) {
            aggregateKillers[killer.id] = (aggregateKillers[killer.id] || 0) + killer.count;
        }
    }

    const topKillers = Object.entries(aggregateKillers)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    topKillers.forEach(([id, count], idx) => {
        const event = events.find(e => e.id === id);
        const title = event ? event.title : id;
        console.log(`   ${idx + 1}. ${id}`);
        console.log(`      "${title}" - appeared ${count} times near death`);
    });

    console.log('\n═══════════════════════════════════════════');
    console.log('📈 GAME LENGTH ANALYSIS\n');

    const randomStats = allResults.random.statistics;
    console.log(`   Baseline (random strategy):`);
    console.log(`      10th percentile: ${randomStats.turns.p10} turns`);
    console.log(`      Median: ${randomStats.turns.median} turns`);
    console.log(`      90th percentile: ${randomStats.turns.p90} turns`);
    console.log(`      Mean: ${randomStats.turns.mean.toFixed(1)} turns`);

    const quartersToYears = (q) => `${Math.floor(q / 4)} years ${q % 4} quarters`;
    console.log(`\n   In game time (median): ${quartersToYears(randomStats.turns.median)}`);


    console.log('\n═══════════════════════════════════════════');
    console.log('📊 EVENT FREQUENCY ANALYSIS (Random Strategy)\n');

    const result = allResults.random; // Use random strategy as baseline
    const presence = result.eventPresence;
    const frequency = result.eventFrequency;

    const buckets = [
        { label: "More than 10 times per game", check: (p, f) => (f / numGames) > 10 },
        { label: "5 times per game", check: (p, f) => (f / numGames) >= 5 },
        { label: "2 times per game", check: (p, f) => (f / numGames) >= 2 },
        { label: "1.5 times per game", check: (p, f) => (f / numGames) >= 1.5 },
        { label: "100% of games", check: (p) => p === numGames },
        { label: "90% of games", check: (p) => p >= numGames * 0.9 },
        { label: "80% of games", check: (p) => p >= numGames * 0.8 },
        { label: "70% of games", check: (p) => p >= numGames * 0.7 },
        { label: "60% of games", check: (p) => p >= numGames * 0.6 },
        { label: "50% of games", check: (p) => p >= numGames * 0.5 },
        { label: "40% of games", check: (p) => p >= numGames * 0.4 },
        { label: "30% of games", check: (p) => p >= numGames * 0.3 },
        { label: "20% of games", check: (p) => p >= numGames * 0.2 },
        { label: "10% of games", check: (p) => p >= numGames * 0.1 },
        { label: "1% of games", check: (p) => p >= numGames * 0.01 },
        { label: "0% of games", check: (p) => !p || p === 0 }
    ];

    const processedEvents = new Set();
    const eventIds = events.map(e => e.id);

    // Add any events that happened but weren't in the initial list (shouldn't happen but safe)
    Object.keys(presence).forEach(id => {
        if (!eventIds.includes(id)) eventIds.push(id);
    });

    for (const bucket of buckets) {
        const bucketEvents = eventIds.filter(id => {
            if (processedEvents.has(id)) return false;
            const p = presence[id] || 0;
            const f = frequency[id] || 0;
            return bucket.check(p, f);
        });

        if (bucketEvents.length > 0) {
            console.log(`   ${bucket.label}:`);
            bucketEvents.sort().forEach(id => {
                const event = events.find(e => e.id === id);
                // Also show actual stats
                const p = presence[id] || 0;
                const f = frequency[id] || 0;
                const avg = (f / numGames).toFixed(2);
                const pct = ((p / numGames) * 100).toFixed(0);

                let statsStr = '';
                if (bucket.label.includes('times')) {
                    statsStr = `(avg ${avg})`;
                } else {
                    statsStr = `(${pct}%)`;
                }

                console.log(`      - ${id} ${statsStr}`);
                processedEvents.add(id);
            });
            console.log('');
        }
    }

    // Catch-all for anything missed (e.g. between 0% and 1%)
    const remaining = eventIds.filter(id => !processedEvents.has(id));
    if (remaining.length > 0) {
        console.log(`   Rare (<1% of games):`);
        remaining.sort().forEach(id => {
            const p = presence[id] || 0;
            const pct = ((p / numGames) * 100).toFixed(1);
            console.log(`      - ${id} (${pct}%)`);
        });
        console.log('');
    }


    console.log('\n═══════════════════════════════════════════\n');

    // Build full report
    const report = {
        version: VERSION,
        timestamp: new Date().toISOString(),
        configuration: {
            gamesPerStrategy: numGames,
            strategies: Object.keys(STRATEGIES),
            eventCount: events.length
        },
        results: allResults,
        aggregateKillerEvents: topKillers.map(([id, count]) => {
            const event = events.find(e => e.id === id);
            return { id, title: event?.title, count };
        })
    };

    // Save report
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const reportsDir = join(__dirname, '..', 'reports');

    if (!existsSync(reportsDir)) {
        mkdirSync(reportsDir, { recursive: true });
    }

    const reportPath = join(reportsDir, `simulate-${timestamp}.json`);
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Report saved: ${reportPath}\n`);

    return report;
}

// Run if executed directly
const __filename = fileURLToPath(import.meta.url);
const isMainModule = process.argv[1] &&
    (process.argv[1] === __filename || process.argv[1].endsWith('simulate.js'));

if (isMainModule) {
    main();
}

export { runMonteCarloSimulation, SimulatedGame, STRATEGIES };

