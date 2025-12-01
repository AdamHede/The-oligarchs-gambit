#!/usr/bin/env node

/**
 * Balance Analyzer v1.0.0
 * 
 * Analyzes event effects, choice quality, and overall game balance.
 * Outputs timestamped reports to reports/ directory.
 */

import { loadAllEvents } from './validate.js';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const VERSION = '1.0.0';

// Effect scale reference from WRITING_GUIDE (for comparison, not enforcement)
const EFFECT_SCALES = {
    personalWealth: {
        tiny: { min: 1, max: 2 },
        small: { min: 3, max: 5 },
        medium: { min: 6, max: 10 },
        large: { min: 11, max: 20 },
        extreme: { min: 20, max: 50 }
    },
    treasury: {
        tiny: { min: 10, max: 30 },
        small: { min: 40, max: 80 },
        medium: { min: 90, max: 150 },
        large: { min: 160, max: 250 },
        extreme: { min: 260, max: 400 }
    },
    elite: {
        tiny: { min: 2, max: 5 },
        small: { min: 6, max: 10 },
        medium: { min: 11, max: 15 },
        large: { min: 16, max: 25 }
    },
    anger: {
        tiny: { min: 2, max: 5 },
        small: { min: 6, max: 10 },
        medium: { min: 11, max: 20 },
        large: { min: 21, max: 35 }
    }
};

/**
 * Normalize event effects to new format (handles both old and new formats)
 */
function normalizeEffects(effects) {
    if (!effects) return { stats: {} };
    
    // Already in new format
    if (effects.stats) return effects;
    
    // Old format - convert
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
 * Classify effect magnitude
 */
function classifyMagnitude(stat, value) {
    const absValue = Math.abs(value);
    const scales = EFFECT_SCALES[stat];
    if (!scales) return 'unknown';
    
    for (const [size, range] of Object.entries(scales)) {
        if (absValue >= range.min && absValue <= range.max) {
            return size;
        }
    }
    
    if (absValue < scales.tiny?.min) return 'micro';
    return 'extreme+';
}

/**
 * Analyze all events for effect distribution
 */
function analyzeEffects(events) {
    const effectStats = {
        personalWealth: { values: [], positive: 0, negative: 0, zero: 0 },
        treasury: { values: [], positive: 0, negative: 0, zero: 0 },
        elite: { values: [], positive: 0, negative: 0, zero: 0 },
        anger: { values: [], positive: 0, negative: 0, zero: 0 }
    };
    
    const magnitudeDistribution = {
        personalWealth: {},
        treasury: {},
        elite: {},
        anger: {}
    };
    
    const eventDetails = [];
    
    events.forEach(event => {
        const eventInfo = {
            id: event.id,
            title: event.title,
            storylines: event.storylines || [event.storyline].filter(Boolean),
            choices: []
        };
        
        if (event.choices) {
            event.choices.forEach((choice, idx) => {
                const effects = normalizeEffects(choice.effects);
                const choiceInfo = {
                    index: idx,
                    text: choice.text,
                    effects: effects.stats,
                    adds: choice.add || choice.addToPool || [],
                    removes: choice.remove || choice.removeFromPool || [],
                    legacy: effects.legacy
                };
                
                for (const [stat, value] of Object.entries(effects.stats || {})) {
                    if (effectStats[stat]) {
                        effectStats[stat].values.push(value);
                        if (value > 0) effectStats[stat].positive++;
                        else if (value < 0) effectStats[stat].negative++;
                        else effectStats[stat].zero++;
                        
                        const magnitude = classifyMagnitude(stat, value);
                        magnitudeDistribution[stat][magnitude] = (magnitudeDistribution[stat][magnitude] || 0) + 1;
                    }
                }
                
                eventInfo.choices.push(choiceInfo);
            });
        }
        
        eventDetails.push(eventInfo);
    });
    
    // Calculate statistics
    const statistics = {};
    for (const [stat, data] of Object.entries(effectStats)) {
        const values = data.values;
        if (values.length === 0) {
            statistics[stat] = { count: 0 };
            continue;
        }
        
        const sum = values.reduce((a, b) => a + b, 0);
        const sorted = [...values].sort((a, b) => a - b);
        
        statistics[stat] = {
            count: values.length,
            min: Math.min(...values),
            max: Math.max(...values),
            mean: sum / values.length,
            median: sorted[Math.floor(sorted.length / 2)],
            positive: data.positive,
            negative: data.negative,
            zero: data.zero,
            netTendency: sum > 0 ? 'positive' : sum < 0 ? 'negative' : 'neutral',
            magnitudeDistribution: magnitudeDistribution[stat]
        };
    }
    
    return { statistics, eventDetails };
}

/**
 * Analyze choice dominance (is one choice clearly better?)
 */
function analyzeChoiceDominance(events) {
    const dominantChoices = [];
    const balancedEvents = [];
    
    events.forEach(event => {
        if (!event.choices || event.choices.length < 2) return;
        
        const choiceScores = event.choices.map((choice, idx) => {
            const effects = normalizeEffects(choice.effects).stats || {};
            
            // Score: positive for good stats, negative for bad
            // personalWealth and treasury: positive is good
            // elite: positive is good
            // anger: negative is good (lower anger is better)
            const score = (effects.personalWealth || 0) 
                + (effects.treasury || 0) / 50  // Normalize treasury to similar scale
                + (effects.elite || 0)
                - (effects.anger || 0);  // Subtract anger (lower is better)
            
            return { index: idx, text: choice.text, score, effects };
        });
        
        const scores = choiceScores.map(c => c.score);
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        const scoreDelta = maxScore - minScore;
        
        const best = choiceScores.find(c => c.score === maxScore);
        const worst = choiceScores.find(c => c.score === minScore);
        
        // If score delta is very large, one choice dominates
        if (scoreDelta > 15) {
            dominantChoices.push({
                eventId: event.id,
                eventTitle: event.title,
                scoreDelta,
                bestChoice: best,
                worstChoice: worst,
                allChoices: choiceScores
            });
        } else {
            balancedEvents.push({
                eventId: event.id,
                eventTitle: event.title,
                scoreDelta,
                choices: choiceScores
            });
        }
    });
    
    return {
        dominantCount: dominantChoices.length,
        balancedCount: balancedEvents.length,
        dominantChoices: dominantChoices.sort((a, b) => b.scoreDelta - a.scoreDelta),
        balancedEvents
    };
}

/**
 * Analyze storyline balance
 */
function analyzeStorylines(events) {
    const storylineStats = {};
    
    events.forEach(event => {
        const storylines = event.storylines || [event.storyline].filter(Boolean);
        if (storylines.length === 0) storylines.push('misc');
        
        storylines.forEach(sl => {
            if (!storylineStats[sl]) {
                storylineStats[sl] = {
                    eventCount: 0,
                    effects: { personalWealth: [], treasury: [], elite: [], anger: [] }
                };
            }
            
            storylineStats[sl].eventCount++;
            
            if (event.choices) {
                event.choices.forEach(choice => {
                    const effects = normalizeEffects(choice.effects).stats || {};
                    for (const [stat, value] of Object.entries(effects)) {
                        if (storylineStats[sl].effects[stat]) {
                            storylineStats[sl].effects[stat].push(value);
                        }
                    }
                });
            }
        });
    });
    
    // Calculate averages per storyline
    const storylineSummary = {};
    for (const [sl, data] of Object.entries(storylineStats)) {
        storylineSummary[sl] = {
            eventCount: data.eventCount,
            averageEffects: {}
        };
        
        for (const [stat, values] of Object.entries(data.effects)) {
            if (values.length > 0) {
                const sum = values.reduce((a, b) => a + b, 0);
                storylineSummary[sl].averageEffects[stat] = {
                    mean: sum / values.length,
                    count: values.length
                };
            }
        }
    }
    
    return storylineSummary;
}

/**
 * Find potential death spiral events
 */
function findDeathSpiralRisks(events) {
    const risks = [];
    
    events.forEach(event => {
        if (!event.choices) return;
        
        event.choices.forEach((choice, idx) => {
            const effects = normalizeEffects(choice.effects).stats || {};
            const adds = choice.add || choice.addToPool || [];
            
            // Check for severe negative effects that also add more events
            const severeNegatives = [];
            if (effects.treasury && effects.treasury <= -50) severeNegatives.push(`treasury: ${effects.treasury}`);
            if (effects.elite && effects.elite <= -10) severeNegatives.push(`elite: ${effects.elite}`);
            if (effects.anger && effects.anger >= 15) severeNegatives.push(`anger: +${effects.anger}`);
            
            if (severeNegatives.length > 0 && adds.length > 0) {
                risks.push({
                    eventId: event.id,
                    eventTitle: event.title,
                    choiceIndex: idx,
                    choiceText: choice.text,
                    severeEffects: severeNegatives,
                    addsEvents: adds
                });
            }
        });
    });
    
    return risks;
}

/**
 * Generate timestamp for filenames
 */
function getTimestamp() {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
}

/**
 * Main analysis function
 */
function main() {
    const timestamp = getTimestamp();
    
    console.log('╔════════════════════════════════════════╗');
    console.log('║      Balance Analyzer v' + VERSION + '          ║');
    console.log('╚════════════════════════════════════════╝\n');
    
    console.log('📂 Loading events...\n');
    const events = loadAllEvents();
    console.log(`   Loaded ${events.length} events\n`);
    
    if (events.length === 0) {
        console.log('⚠️  No events found.\n');
        process.exit(0);
    }
    
    // Run analyses
    console.log('📊 Analyzing effect distribution...');
    const effectAnalysis = analyzeEffects(events);
    
    console.log('⚖️  Analyzing choice dominance...');
    const dominanceAnalysis = analyzeChoiceDominance(events);
    
    console.log('📚 Analyzing storyline balance...');
    const storylineAnalysis = analyzeStorylines(events);
    
    console.log('⚠️  Finding death spiral risks...');
    const deathSpiralRisks = findDeathSpiralRisks(events);
    
    // Display results
    console.log('\n═══════════════════════════════════════════');
    console.log('📈 EFFECT STATISTICS\n');
    
    for (const [stat, data] of Object.entries(effectAnalysis.statistics)) {
        if (data.count === 0) continue;
        console.log(`   ${stat}:`);
        console.log(`      Range: ${data.min} to ${data.max}`);
        console.log(`      Mean: ${data.mean.toFixed(2)}, Median: ${data.median}`);
        console.log(`      Distribution: +${data.positive} / -${data.negative} / 0:${data.zero}`);
        console.log(`      Net tendency: ${data.netTendency}`);
        console.log('');
    }
    
    console.log('═══════════════════════════════════════════');
    console.log('⚖️  CHOICE DOMINANCE\n');
    console.log(`   Balanced events: ${dominanceAnalysis.balancedCount}`);
    console.log(`   Events with dominant choice: ${dominanceAnalysis.dominantCount}\n`);
    
    if (dominanceAnalysis.dominantChoices.length > 0) {
        console.log('   Top dominant choices:');
        dominanceAnalysis.dominantChoices.slice(0, 5).forEach(dc => {
            console.log(`      • ${dc.eventId} (delta: ${dc.scoreDelta.toFixed(1)})`);
            console.log(`        Best: "${dc.bestChoice.text.slice(0, 40)}..."`);
        });
        console.log('');
    }
    
    console.log('═══════════════════════════════════════════');
    console.log('📚 STORYLINE BALANCE\n');
    
    for (const [sl, data] of Object.entries(storylineAnalysis)) {
        console.log(`   ${sl}: ${data.eventCount} events`);
        const effects = data.averageEffects;
        const effectStr = Object.entries(effects)
            .map(([k, v]) => `${k}: ${v.mean > 0 ? '+' : ''}${v.mean.toFixed(1)}`)
            .join(', ');
        if (effectStr) console.log(`      Avg effects: ${effectStr}`);
    }
    console.log('');
    
    console.log('═══════════════════════════════════════════');
    console.log('⚠️  DEATH SPIRAL RISKS\n');
    console.log(`   Found ${deathSpiralRisks.length} risky event-choices\n`);
    
    deathSpiralRisks.slice(0, 5).forEach(risk => {
        console.log(`   • ${risk.eventId}: "${risk.choiceText.slice(0, 35)}..."`);
        console.log(`     Effects: ${risk.severeEffects.join(', ')}`);
        console.log(`     Adds: ${risk.addsEvents.join(', ')}`);
    });
    
    console.log('\n═══════════════════════════════════════════\n');
    
    // Build report object
    const report = {
        version: VERSION,
        timestamp: new Date().toISOString(),
        eventCount: events.length,
        effectStatistics: effectAnalysis.statistics,
        choiceDominance: {
            balancedCount: dominanceAnalysis.balancedCount,
            dominantCount: dominanceAnalysis.dominantCount,
            dominantChoices: dominanceAnalysis.dominantChoices
        },
        storylineBalance: storylineAnalysis,
        deathSpiralRisks,
        eventDetails: effectAnalysis.eventDetails
    };
    
    // Save report
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const reportsDir = join(__dirname, '..', 'reports');
    
    if (!existsSync(reportsDir)) {
        mkdirSync(reportsDir, { recursive: true });
    }
    
    const reportPath = join(reportsDir, `balance-${timestamp}.json`);
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Report saved: ${reportPath}\n`);
    
    return report;
}

// Run if executed directly
const __filename = fileURLToPath(import.meta.url);
const isMainModule = process.argv[1] && 
    (process.argv[1] === __filename || process.argv[1].endsWith('balance.js'));

if (isMainModule) {
    main();
}

export { analyzeEffects, analyzeChoiceDominance, analyzeStorylines, findDeathSpiralRisks };

