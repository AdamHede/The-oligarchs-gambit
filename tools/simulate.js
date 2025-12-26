#!/usr/bin/env node

/**
 * Monte Carlo Simulator v2.0.0
 * 
 * Simulates thousands of games with different strategies to analyze
 * game balance, average length, death causes, and critical events.
 * 
 * v2.0: Now uses actual StorylineEngine for accurate simulation of:
 * - Relationships and character states
 * - Entity dependencies (requires)
 * - Exclusive event groups (unlocksExclusive)
 * - Dynamic storyline weight modifiers
 * - Time gates and onceOnly events
 */

import { StorylineEngine } from '../engine/storyline-engine.js';
import { allStorylines } from '../storylines/index.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const VERSION = '2.0.0';

// Game constants (for strategy evaluation - must match engine defaults)
const STAT_BOUNDS = {
    personalWealth: { min: 0, max: 200 },
    treasury: { min: 0, max: 2000 },
    elite: { min: 0, max: 100 },
    anger: { min: 0, max: 100 }
};

/**
 * Normalize effects to extract stats (for strategy evaluation)
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
 * Calculate histogram data
 */
function calculateHistogram(data, binSize = 10) {
    if (data.length === 0) return {};
    
    const min = Math.floor(Math.min(...data) / binSize) * binSize;
    const max = Math.ceil(Math.max(...data) / binSize) * binSize;

    const bins = {};
    for (let i = min; i < max; i += binSize) {
        bins[`${i}-${i + binSize - 1}`] = 0;
    }

    data.forEach(val => {
        const binStart = Math.floor(val / binSize) * binSize;
        const key = `${binStart}-${binStart + binSize - 1}`;
        if (bins[key] !== undefined) {
            bins[key]++;
        } else {
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
        const barLength = maxCount > 0 ? Math.round((count / maxCount) * maxWidth) : 0;
        const bar = '█'.repeat(barLength);

        const label = key.padStart(7);
        lines.push(`      ${label} | ${bar} ${count} (${percentage}%)`);
    });

    return lines.join('\n');
}

/**
 * Simulator wrapper around StorylineEngine
 * Provides reset() and access methods needed for Monte Carlo simulation
 */
class SimulatorEngine {
    constructor() {
        this.engine = null;
        this.history = [];
        this.isGameOver = false;
        this.gameOverReason = null;
        this.reset();
    }

    reset() {
        // Create fresh engine instance with all storylines
        this.engine = new StorylineEngine(allStorylines);
        this.history = [];
        this.isGameOver = false;
        this.gameOverReason = null;
    }

    get stats() {
        return this.engine.state.stats;
    }

    get deck() {
        return this.engine.state.deck;
    }

    get turn() {
        return this.engine.state.turn;
    }

    get year() {
        return this.engine.state.year;
    }

    get quarter() {
        return this.engine.state.quarter;
    }

    get relationships() {
        return this.engine.state.relationships;
    }

    get characterStates() {
        return this.engine.state.characterStates;
    }

    drawEvent() {
        return this.engine.drawNextEvent();
    }

    applyChoice(event, choiceIndex) {
        const deckSizeBefore = this.deck.length;
        
        try {
            this.engine.makeChoice(choiceIndex);
        } catch (error) {
            console.error(`Error making choice: ${error.message}`);
            return;
        }

        const deckSizeAfter = this.deck.length;

        // Record history for analysis
        this.history.push({
            turn: this.turn - 1, // makeChoice already advanced turn
            eventId: event.id,
            choiceIndex,
            statsAfter: { ...this.stats },
            deckSizeAfter,
            relationshipsAfter: { ...this.relationships },
            characterStatesAfter: { ...this.characterStates }
        });
    }

    checkGameOver() {
        const gameOver = this.engine.checkGameOver();
        if (gameOver) {
            this.isGameOver = true;
            // Map game over reason to our categories
            if (gameOver.reason.includes('Elite')) {
                this.gameOverReason = 'elite_revolt';
            } else if (gameOver.reason.includes('Revolution')) {
                this.gameOverReason = 'revolution';
            } else if (gameOver.reason.includes('Bankruptcy')) {
                this.gameOverReason = 'bankruptcy';
            } else {
                this.gameOverReason = 'unknown';
            }
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

        let score = 0;

        // Heavily weight avoiding death conditions
        if (stats.elite < 30) score += (effects.elite || 0) * 3;
        else score += (effects.elite || 0);

        if (stats.anger > 70) score -= (effects.anger || 0) * 3;
        else score -= (effects.anger || 0);

        // Treasury is critical for survival (bankruptcy is #1 killer)
        if (stats.treasury < 200) score += (effects.treasury || 0) * 2;
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
            // Deck empty or invalid event - try to continue
            if (game.deck.length === 0) {
                // Engine should auto-add quiet_quarter, but if not, break
                break;
            }
            continue;
        }

        const choiceIndex = strategy(event, game.stats);
        game.applyChoice(event, choiceIndex);
        game.checkGameOver();
    }

    // Collect unique events for analysis
    const uniqueEvents = [...new Set(game.history.map(h => h.eventId))];

    // Collect relationship data from final state
    const finalRelationships = { ...game.relationships };
    const finalCharacterStates = { ...game.characterStates };

    return {
        turns: game.turn,
        finalStats: { ...game.stats },
        gameOverReason: game.gameOverReason || 'max_turns',
        history: game.history,
        finalWealth: game.stats.personalWealth,
        uniqueEvents,
        finalRelationships,
        finalCharacterStates
    };
}

/**
 * Run Monte Carlo simulation
 */
function runMonteCarloSimulation(numGames = 1000, strategyName = 'random') {
    const game = new SimulatorEngine();
    const strategy = STRATEGIES[strategyName] || strategyRandom;

    const results = {
        games: [],
        deathCauses: { elite_revolt: 0, revolution: 0, bankruptcy: 0, max_turns: 0, unknown: 0 },
        turnDistribution: [],
        wealthDistribution: [],
        eventFrequency: {},
        eventPresence: {},
        eventDeathProximity: {},
        scores: [],
        deckSizeByTurn: {
            sums: [],
            counts: []
        },
        // v2.0: Track relationship and character state outcomes
        relationshipOutcomes: {},
        characterStateOutcomes: {}
    };

    for (let i = 0; i < numGames; i++) {
        const result = runSimulation(game, strategy);

        results.games.push({
            turns: result.turns,
            finalWealth: result.finalWealth,
            gameOverReason: result.gameOverReason
        });

        results.deathCauses[result.gameOverReason] = 
            (results.deathCauses[result.gameOverReason] || 0) + 1;
        results.turnDistribution.push(result.turns);
        results.wealthDistribution.push(result.finalWealth);

        // Approximate Oligarch Score = Wealth * Years (Turns / 4)
        const score = result.finalWealth * (result.turns / 4);
        results.scores.push(score);

        // Track event frequency
        result.history.forEach(h => {
            results.eventFrequency[h.eventId] = (results.eventFrequency[h.eventId] || 0) + 1;
        });

        // Track deck size by turn
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

        // v2.0: Track final relationship values
        for (const [charId, value] of Object.entries(result.finalRelationships)) {
            if (!results.relationshipOutcomes[charId]) {
                results.relationshipOutcomes[charId] = [];
            }
            results.relationshipOutcomes[charId].push(value);
        }

        // v2.0: Track character state outcomes
        for (const [charId, state] of Object.entries(result.finalCharacterStates)) {
            if (!results.characterStateOutcomes[charId]) {
                results.characterStateOutcomes[charId] = {};
            }
            results.characterStateOutcomes[charId][state] = 
                (results.characterStateOutcomes[charId][state] || 0) + 1;
        }
    }

    // Calculate statistics
    const turns = results.turnDistribution;
    const wealth = results.wealthDistribution;

    if (turns.length === 0) {
        console.error('No turns recorded - check if events are loading correctly');
        return results;
    }

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

    // Top killer events
    results.topKillerEvents = Object.entries(results.eventDeathProximity)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([id, count]) => ({ id, count, percentage: (count / numGames * 100).toFixed(1) + '%' }));

    // Most frequent events
    results.mostFrequentEvents = Object.entries(results.eventFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([id, count]) => ({ id, count, avgPerGame: (count / numGames).toFixed(2) }));

    // v2.0: Relationship statistics
    results.relationshipStats = {};
    for (const [charId, values] of Object.entries(results.relationshipOutcomes)) {
        if (values.length > 0) {
            const sorted = [...values].sort((a, b) => a - b);
            results.relationshipStats[charId] = {
                count: values.length,
                mean: values.reduce((a, b) => a + b, 0) / values.length,
                median: sorted[Math.floor(sorted.length / 2)],
                min: Math.min(...values),
                max: Math.max(...values)
            };
        }
    }

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

    console.log('📂 Loading storylines...\n');
    console.log(`   Loaded ${allStorylines.length} storylines\n`);

    // Quick check: create engine to count events
    const testEngine = new StorylineEngine(allStorylines);
    console.log(`   Compiled ${testEngine.allEvents.length} events\n`);

    if (testEngine.allEvents.length === 0) {
        console.log('⚠️  No events found.\n');
        process.exit(0);
    }

    console.log(`🎲 Running ${numGames} simulations per strategy...\n`);

    const allResults = {};

    for (const strategyName of Object.keys(STRATEGIES)) {
        console.log(`   Running ${strategyName} strategy...`);
        const results = runMonteCarloSimulation(numGames, strategyName);
        allResults[strategyName] = results;

        const stats = results.statistics;
        if (!stats) {
            console.log('      No statistics generated - check for errors');
            continue;
        }
        
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
        if (!stats) continue;
        
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
        for (const killer of results.topKillerEvents || []) {
            aggregateKillers[killer.id] = (aggregateKillers[killer.id] || 0) + killer.count;
        }
    }

    const topKillers = Object.entries(aggregateKillers)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const testEvents = testEngine.allEvents;
    topKillers.forEach(([id, count], idx) => {
        const event = testEvents.find(e => e.id === id);
        const title = event ? event.title : id;
        console.log(`   ${idx + 1}. ${id}`);
        console.log(`      "${title}" - appeared ${count} times near death`);
    });

    console.log('\n═══════════════════════════════════════════');
    console.log('📈 GAME LENGTH ANALYSIS\n');

    const randomStats = allResults.random?.statistics;
    if (randomStats) {
        console.log(`   Baseline (random strategy):`);
        console.log(`      10th percentile: ${randomStats.turns.p10} turns`);
        console.log(`      Median: ${randomStats.turns.median} turns`);
        console.log(`      90th percentile: ${randomStats.turns.p90} turns`);
        console.log(`      Mean: ${randomStats.turns.mean.toFixed(1)} turns`);

        const quartersToYears = (q) => `${Math.floor(q / 4)} years ${q % 4} quarters`;
        console.log(`\n   In game time (median): ${quartersToYears(randomStats.turns.median)}`);
    }

    // v2.0: Display relationship and character state analysis
    console.log('\n═══════════════════════════════════════════');
    console.log('👥 CHARACTER ANALYSIS (Random Strategy)\n');

    const randomResults = allResults.random;
    if (randomResults) {
        // Relationship stats
        const relStats = randomResults.relationshipStats || {};
        if (Object.keys(relStats).length > 0) {
            console.log('   Relationship Outcomes:');
            for (const [charId, stats] of Object.entries(relStats)) {
                console.log(`      ${charId}: avg ${stats.mean.toFixed(0)}, range ${stats.min}-${stats.max} (n=${stats.count})`);
            }
            console.log('');
        }

        // Character state outcomes
        const charStates = randomResults.characterStateOutcomes || {};
        if (Object.keys(charStates).length > 0) {
            console.log('   Character State Outcomes:');
            for (const [charId, states] of Object.entries(charStates)) {
                const total = Object.values(states).reduce((a, b) => a + b, 0);
                const stateStr = Object.entries(states)
                    .map(([state, count]) => `${state}: ${(count/total*100).toFixed(0)}%`)
                    .join(', ');
                console.log(`      ${charId}: ${stateStr}`);
            }
            console.log('');
        }
    }

    console.log('\n═══════════════════════════════════════════');
    console.log('📊 EVENT FREQUENCY ANALYSIS (Random Strategy)\n');

    const presence = randomResults?.eventPresence || {};
    const frequency = randomResults?.eventFrequency || {};

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
    const eventIds = testEvents.map(e => e.id);

    // Add any events that happened but weren't in the initial list
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

    // Catch-all for anything missed
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

    // Build full report (with Set conversion for JSON)
    const report = {
        version: VERSION,
        timestamp: new Date().toISOString(),
        configuration: {
            gamesPerStrategy: numGames,
            strategies: Object.keys(STRATEGIES),
            eventCount: testEvents.length,
            storylineCount: allStorylines.length
        },
        results: allResults,
        aggregateKillerEvents: topKillers.map(([id, count]) => {
            const event = testEvents.find(e => e.id === id);
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

export { runMonteCarloSimulation, SimulatorEngine, STRATEGIES };
