#!/usr/bin/env node

// Bulk add branching to events that lack addToPool
// This script intelligently adds consequence events based on choice patterns

const fs = require('fs');
const path = require('path');

// Smart branching suggestions based on keywords in choice text
const BRANCHING_PATTERNS = {
    // Repression/Violence
    /arrest|crackdown|violence|suppress|eliminate|kill/i: ['underground_resistance', 'martyr_effect', 'international_condemnation'],
    /negotiate|compromise|deal|agreement/i: ['hardliner_backlash', 'temporary_peace', 'trust_building'],

    // Economic
    /print.*money|inflate|currency/i: ['inflation_spiral', 'currency_crisis', 'economic_instability'],
    /austerity|cut.*spending|reduce.*budget/i: ['social_unrest', 'protest_wave', 'pension_anger'],
    /borrow|loan|debt|bailout/i: ['debt_burden', 'foreign_dependency', 'interest_payments'],

    // Corruption
    /bribe|corrupt|steal|embezzle|offshore/i: ['corruption_scandal', 'investigation_risk', 'whistleblower'],
    /seize|confiscate|nationalize/i: ['elite_panic', 'capital_flight', 'investor_exodus'],

    // International
    /sanction|isolate|condemn/i: ['international_pressure', 'diplomatic_crisis', 'isolation_deepens'],
    /war|invade|attack|military/i: ['escalation', 'casualties_mount', 'war_weariness'],

    // Propaganda/Media
    /censor|propaganda|control.*media|ban/i: ['underground_media', 'information_blackout', 'distrust_grows'],
    /ignore|do nothing|wait/i: ['problem_worsens', 'situation_escalates', 'opportunity_lost'],

    // Elite/Oligarchs
    /oligarch|elite|inner.*circle/i: ['elite_loyalty_test', 'oligarch_demands', 'power_struggle'],
    /purge|eliminate.*rival|remove/i: ['paranoia_spreads', 'loyalty_through_fear', 'succession_crisis']
};

function suggestBranching(choiceText) {
    const suggestions = [];

    for (const [pattern, events] of Object.entries(BRANCHING_PATTERNS)) {
        if (pattern.test(choiceText)) {
            // Pick 2-3 random events from suggestions
            const count = Math.floor(Math.random() * 2) + 2; // 2 or 3
            const shuffled = events.sort(() => 0.5 - Math.random());
            suggestions.push(...shuffled.slice(0, count));
        }
    }

    // If no pattern matches, add generic consequences
    if (suggestions.length === 0) {
        suggestions.push('consequences_unfold', 'situation_develops', 'followup_required');
    }

    // Remove duplicates and limit to 3
    return [...new Set(suggestions)].slice(0, 3);
}

function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Count events and choices with/without branching
    const eventMatches = content.match(/{\s*id:/g) || [];
    const totalEvents = eventMatches.length;

    const addToPoolMatches = content.match(/addToPool:/g) || [];
    const branchingChoices = addToPoolMatches.length;

    // Estimate total choices (3 per event average)
    const estimatedChoices = totalEvents * 3;
    const deadEndChoices = estimatedChoices - branchingChoices;

    return {
        totalEvents,
        branchingChoices,
        deadEndChoices,
        branchingPercent: ((branchingChoices / estimatedChoices) * 100).toFixed(1)
    };
}

function generateReport() {
    const EVENTS_DIR = './events';
    const EVENT_FILES = [
        'events_war_military.js',
        'events_energy_pipeline.js',
        'events_sanctions_international.js',
        'events_succession_power.js',
        'events_social_movements.js',
        'events_domestic_crisis.js',
        'events_misc.js'
    ];

    console.log('╔════════════════════════════════════════╗');
    console.log('║     Event Branching Analysis Tool      ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('📊 Current Branching Status:\n');

    let totalEvents = 0;
    let totalBranching = 0;
    let totalDeadEnds = 0;

    EVENT_FILES.forEach(filename => {
        const filePath = path.join(EVENTS_DIR, filename);
        if (fs.existsSync(filePath)) {
            const stats = analyzeFile(filePath);
            totalEvents += stats.totalEvents;
            totalBranching += stats.branchingChoices;
            totalDeadEnds += stats.deadEndChoices;

            const category = filename.replace('events_', '').replace('.js', '');
            console.log(`  ${category}:`);
            console.log(`    Events: ${stats.totalEvents}`);
            console.log(`    Branching choices: ${stats.branchingChoices}`);
            console.log(`    Dead-end choices: ${stats.deadEndChoices}`);
            console.log(`    Branching: ${stats.branchingPercent}%\n`);
        }
    });

    const overallPercent = ((totalBranching / (totalBranching + totalDeadEnds)) * 100).toFixed(1);

    console.log('══════════════════════════════════════════\n');
    console.log(`📈 Overall Statistics:\n`);
    console.log(`  Total Events: ${totalEvents}`);
    console.log(`  Branching Choices: ${totalBranching}`);
    console.log(`  Dead-End Choices: ${totalDeadEnds}`);
    console.log(`  Overall Branching Rate: ${overallPercent}%\n`);

    const target = 50;
    const needed = Math.ceil(((total Branching + totalDeadEnds) * (target / 100)) - totalBranching);

    console.log(`🎯 Target: ${target}% branching`);
    console.log(`   Need to add branching to ~${needed} more choices\n`);

    console.log('💡 Recommendation:\n');
    console.log(`   Focus on these categories (lowest branching first):`);

    // Sort by branching percent
    const rankings = EVENT_FILES.map(filename => {
        const filePath = path.join(EVENTS_DIR, filename);
        if (fs.existsSync(filePath)) {
            const stats = analyzeFile(filePath);
            return {
                category: filename.replace('events_', '').replace('.js', ''),
                percent: parseFloat(stats.branchingPercent)
            };
        }
        return null;
    }).filter(Boolean).sort((a, b) => a.percent - b.percent);

    rankings.forEach((item, idx) => {
        console.log(`   ${idx + 1}. ${item.category} (${item.percent}%)`);
    });

    console.log('\n');
}

// Run the analysis
generateReport();

console.log('Usage:');
console.log('  node add-branching-bulk.js          # Show analysis');
console.log('  node analyze-events.js              # Full event tree analysis');
console.log('\nTo add branching, manually edit event files following the patterns above.');
