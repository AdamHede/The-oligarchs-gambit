#!/usr/bin/env node

/**
 * Find Orphaned Events
 * 
 * Runs the simulator many times with all strategies to find events
 * that are never reached during normal play.
 */

import { loadAllEvents } from './validate.js';
import { runMonteCarloSimulation, STRATEGIES } from './simulate.js';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

function printEventsByStoryline(events) {
    if (events.length === 0) return;

    // Group by storyline for better readability
    const byStoryline = {};
    events.forEach(e => {
        const sl = e.storyline || (e.storylines && e.storylines[0]) || 'misc';
        if (!byStoryline[sl]) byStoryline[sl] = [];
        byStoryline[sl].push(e);
    });

    Object.entries(byStoryline).forEach(([sl, groupedEvents]) => {
        console.log(`   Storyline: ${sl}`);
        groupedEvents.forEach(e => {
            console.log(`      • ${e.id}: "${e.title}"`);
        });
        console.log('');
    });
}

function main() {
    console.log('╔════════════════════════════════════════╗');
    console.log('║        Orphan Event Finder             ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('📂 Loading events...\n');
    const allEvents = loadAllEvents();
    console.log(`   Loaded ${allEvents.length} events\n`);

    if (allEvents.length === 0) {
        console.log('⚠️  No events found.\n');
        process.exit(0);
    }

    const eventsReachedByStrategy = {};
    Object.keys(STRATEGIES).forEach(s => eventsReachedByStrategy[s] = new Set());

    const allReachedEvents = new Set();
    const NUM_GAMES = 2000;

    console.log(`🎲 Running simulations (${NUM_GAMES} games per strategy)...\n`);

    for (const strategyName of Object.keys(STRATEGIES)) {
        console.log(`   Running ${strategyName} strategy...`);
        const results = runMonteCarloSimulation(allEvents, NUM_GAMES, strategyName);

        Object.keys(results.eventFrequency).forEach(id => {
            eventsReachedByStrategy[strategyName].add(id);
            allReachedEvents.add(id);
        });

        console.log(`      Reached ${eventsReachedByStrategy[strategyName].size} unique events`);
    }

    console.log('\n═══════════════════════════════════════════');
    console.log('📊 RESULTS\n');

    const strictlyOrphaned = allEvents.filter(e => !allReachedEvents.has(e.id));

    console.log(`   Total Events: ${allEvents.length}`);
    console.log(`   Reached (Any Strategy): ${allReachedEvents.size}`);

    if (strictlyOrphaned.length > 0) {
        console.log(`\n🔴 STRICTLY ORPHANED (${strictlyOrphaned.length} events - never reached):\n`);
        printEventsByStoryline(strictlyOrphaned);
    } else {
        console.log('\n✅ No strictly orphaned events found! All events are reachable by at least one strategy.');
    }

    // Rational Orphans Analysis
    console.log('\n🧠 RATIONAL PLAY ANALYSIS');
    console.log('   (Events never reached by Greedy, Conservative, or Balanced strategies)');

    const rationalStrategies = ['greedy', 'conservative', 'balanced'];
    const rationalReached = new Set();

    rationalStrategies.forEach(s => {
        eventsReachedByStrategy[s].forEach(id => rationalReached.add(id));
    });

    const rationalOrphans = allEvents.filter(e => !rationalReached.has(e.id));

    console.log(`   Rational Reach: ${rationalReached.size} / ${allEvents.length} events`);
    console.log(`   Rational Orphans: ${rationalOrphans.length} events`);

    if (rationalOrphans.length > 0) {
        console.log(`\n⚠️  RATIONALLY ORPHANED (${rationalOrphans.length} events):\n`);
        printEventsByStoryline(rationalOrphans);
    }

    console.log('═══════════════════════════════════════════\n');
}

// Check if running directly
const __filename = fileURLToPath(import.meta.url);
const isMainModule = process.argv[1] && resolve(__filename) === resolve(process.argv[1]);
if (isMainModule) {
    main();
}
