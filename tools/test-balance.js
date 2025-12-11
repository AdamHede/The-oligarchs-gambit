#!/usr/bin/env node

/**
 * Balance Testing Suite
 * 
 * Runs simulations and asserts against defined criteria for:
 * - Game length distribution
 * - Event frequency
 * - Strategy outcomes
 * - Orphaned events
 */

import { runMonteCarloSimulation, STRATEGIES } from './simulate.js';
import { loadAllEvents } from './validate.js';
import { buildEventGraph, findOrphanedEvents } from './analyze.js';
import { fileURLToPath } from 'url';

const CONFIG = {
    numGames: 1000,
    thresholds: {
        random: {
            avgYearsMin: 8,
            avgYearsMax: 12
        },
        greedy: {
            avgYearsMax: 4
        },
        balanced: {
            avgYearsMin: 15
        }
    }
};

const PASS = '✅ PASS';
const FAIL = '❌ FAIL';
const WARN = '⚠️  WARN';

function printResult(status, message, details = '') {
    console.log(`${status.padEnd(8)} ${message}`);
    if (details) console.log(`         ${details}`);
}

function quartersToYears(q) {
    return (q / 4).toFixed(1);
}

function checkGameLengths(results) {
    console.log('\n📏 Checking Game Lengths...');

    // Random Strategy
    const randomStats = results.random.statistics;
    const randomAvgYears = randomStats.turns.mean / 4;

    if (randomAvgYears >= CONFIG.thresholds.random.avgYearsMin &&
        randomAvgYears <= CONFIG.thresholds.random.avgYearsMax) {
        printResult(PASS, `Random Strategy Length: ${quartersToYears(randomStats.turns.mean)} years (Target: 8-12)`);
    } else {
        printResult(FAIL, `Random Strategy Length: ${quartersToYears(randomStats.turns.mean)} years (Target: 8-12)`);
    }

    // Greedy Strategy
    const greedyStats = results.greedy.statistics;
    const greedyAvgYears = greedyStats.turns.mean / 4;

    if (greedyAvgYears <= CONFIG.thresholds.greedy.avgYearsMax) {
        printResult(PASS, `Greedy Strategy Length: ${quartersToYears(greedyStats.turns.mean)} years (Target: < 4)`);
    } else {
        printResult(FAIL, `Greedy Strategy Length: ${quartersToYears(greedyStats.turns.mean)} years (Target: < 4)`);
    }

    // Balanced Strategy
    const balancedStats = results.balanced.statistics;
    const balancedAvgYears = balancedStats.turns.mean / 4;

    if (balancedAvgYears >= CONFIG.thresholds.balanced.avgYearsMin) {
        printResult(PASS, `Balanced Strategy Length: ${quartersToYears(balancedStats.turns.mean)} years (Target: 15+)`);
    } else {
        printResult(FAIL, `Balanced Strategy Length: ${quartersToYears(balancedStats.turns.mean)} years (Target: 15+)`);
    }
}

function checkEventFrequencies(results, events) {
    console.log('\n📊 Checking Event Frequencies (Random Strategy)...');

    const presence = results.random.eventPresence;
    const frequency = results.random.eventFrequency;
    const numGames = CONFIG.numGames;
    const totalEvents = events.length;

    // 1. No events never show up (0% presence)
    const zeroPresence = events.filter(e => !presence[e.id]).map(e => e.id);
    if (zeroPresence.length === 0) {
        printResult(PASS, 'No unseen events');
    } else {
        printResult(FAIL, `${zeroPresence.length} events never appeared`, `IDs: ${zeroPresence.join(', ')}`);
    }

    // 2. Lowest allowed frequency 1% (only a few)
    const rareEvents = events.filter(e => {
        const p = presence[e.id] || 0;
        return p > 0 && (p / numGames) < 0.01;
    });
    if (rareEvents.length <= 5) {
        printResult(PASS, `Few ultra-rare events (<1%): ${rareEvents.length} events`);
    } else {
        printResult(WARN, `Too many ultra-rare events (<1%): ${rareEvents.length} events`);
    }

    // 3. Rare events (5-10%)
    const uncommonEvents = events.filter(e => {
        const p = presence[e.id] || 0;
        const pct = p / numGames;
        return pct >= 0.05 && pct <= 0.10;
    });
    printResult(PASS, `Rare events (5-10%): ${uncommonEvents.length} events`);

    // 4. Common events (30-70%)
    const commonEvents = events.filter(e => {
        const p = presence[e.id] || 0;
        const pct = p / numGames;
        return pct >= 0.30 && pct <= 0.70;
    });
    const commonPct = (commonEvents.length / totalEvents * 100).toFixed(1);

    if (commonEvents.length > totalEvents * 0.2) {
        printResult(PASS, `Healthy amount of common events (30-70%): ${commonEvents.length} (${commonPct}%)`);
    } else {
        printResult(WARN, `Low amount of common events (30-70%): ${commonEvents.length} (${commonPct}%)`);
    }

    // 5. Avg occurrences cap check (> 4 times per game)
    const repetitiveEvents = events.filter(e => {
        const f = frequency[e.id] || 0;
        return (f / numGames) > 4;
    });

    if (repetitiveEvents.length === 0) {
        printResult(PASS, 'No events appear > 4 times/game on average');
    } else {
        printResult(FAIL, `${repetitiveEvents.length} events appear too often`,
            repetitiveEvents.map(e => `${e.id} (${(frequency[e.id] / numGames).toFixed(1)}x)`).join(', '));
    }
}

function checkStrategyOutcomes(results) {
    console.log('\n🧠 Checking Strategy Outcomes...');

    // Greed should die to public (revolution) or elite anger (elite_revolt)
    const greedDeaths = results.greedy.deathCauses;
    const greedSocialDeaths = (greedDeaths.revolution || 0) + (greedDeaths.elite_revolt || 0);
    const greedTotal = CONFIG.numGames;
    const greedSocialPct = (greedSocialDeaths / greedTotal * 100);

    if (greedSocialPct > 80) {
        printResult(PASS, `Greedy mostly dies to social causes: ${greedSocialPct.toFixed(1)}%`);
    } else {
        printResult(FAIL, `Greedy should die more to social causes (curr: ${greedSocialPct.toFixed(1)}%)`);
    }

    // Conservative should die to bankruptcy
    const consDeaths = results.conservative.deathCauses;
    const consBankrupt = consDeaths.bankruptcy || 0;
    const consTotal = CONFIG.numGames;
    const consBankruptPct = (consBankrupt / consTotal * 100);

    if (consBankruptPct > 60) {
        printResult(PASS, `Conservative mostly dies to bankruptcy: ${consBankruptPct.toFixed(1)}%`);
    } else {
        printResult(FAIL, `Conservative should die more to bankruptcy (curr: ${consBankruptPct.toFixed(1)}%)`);
    }
}

function checkOrphans(events) {
    console.log('\n🕸️  Checking Orphans...');
    const graph = buildEventGraph(events);
    const orphans = findOrphanedEvents(events, graph);

    if (orphans.length === 0) {
        printResult(PASS, 'No orphan events found');
    } else {
        printResult(FAIL, `${orphans.length} orphan events found`, orphans.map(e => e.id).join(', '));
    }
}

async function main() {
    console.log('⚖️  Running Balance Tests...\n');

    const events = loadAllEvents();
    if (events.length === 0) {
        console.error('No events found!');
        process.exit(1);
    }

    // Run simulations for all strategies needed
    const strategiesToRun = ['random', 'greedy', 'balanced', 'conservative'];
    const results = {};

    console.log(`Running ${CONFIG.numGames} simulations per strategy...`);

    for (const strategy of strategiesToRun) {
        process.stdout.write(`  ${strategy}... `);
        results[strategy] = runMonteCarloSimulation(events, CONFIG.numGames, strategy);
        console.log('Done.');
    }

    // Run Checks
    checkGameLengths(results);
    checkEventFrequencies(results, events);
    checkStrategyOutcomes(results);
    checkOrphans(events);

    console.log('\nDone.');
}

// Run if executed directly
const __filename = fileURLToPath(import.meta.url);
if (process.argv[1] === __filename) {
    main();
}
