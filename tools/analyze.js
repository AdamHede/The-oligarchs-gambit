#!/usr/bin/env node

/**
 * Event Analyzer
 * 
 * Analyzes events for statistics, branching, and potential issues
 */

const { loadAllEvents } = require('./validate');

/**
 * Builds event relationship graph
 */
function buildEventGraph(events) {
    const graph = {};
    const allEventIds = new Set(events.map(e => e.id));

    // Initialize nodes
    events.forEach(event => {
        graph[event.id] = {
            event,
            triggeredBy: [],
            triggers: [],
            removes: []
        };
    });

    // Build relationships
    events.forEach(event => {
        const node = graph[event.id];

        if (event.choices) {
            event.choices.forEach((choice, idx) => {
                // Add relationships
                if (choice.add) {
                    choice.add.forEach(eventId => {
                        if (allEventIds.has(eventId)) {
                            node.triggers.push(eventId);
                            graph[eventId].triggeredBy.push({
                                from: event.id,
                                choice: idx,
                                choiceText: choice.text
                            });
                        }
                    });
                }

                // Remove relationships
                if (choice.remove) {
                    choice.remove.forEach(eventId => {
                        if (allEventIds.has(eventId)) {
                            node.removes.push(eventId);
                        }
                    });
                }
            });
        }
    });

    return graph;
}

/**
 * Generates statistics
 */
function generateStatistics(events, graph) {
    const stats = {
        total: events.length,
        byType: {
            recurring: 0,
            onceOnly: 0,
            conditional: 0,
            entryPoint: 0
        },
        branching: {
            deadEnds: 0,
            branches: 0,
            majorBranches: 0
        },
        storylines: {},
        tags: {}
    };

    // Count by type
    events.forEach(event => {
        if (event.recurring) {
            stats.byType.recurring++;
        } else {
            stats.byType.onceOnly++;
        }

        if (event.conditions && Object.keys(event.conditions).length > 0) {
            stats.byType.conditional++;
        } else {
            stats.byType.entryPoint++;
        }

        // Storylines
        if (event.storylines) {
            event.storylines.forEach(sl => {
                stats.storylines[sl] = (stats.storylines[sl] || 0) + 1;
            });
        }

        // Tags
        if (event.tags) {
            event.tags.forEach(tag => {
                stats.tags[tag] = (stats.tags[tag] || 0) + 1;
            });
        }
    });

    // Branching analysis
    events.forEach(event => {
        const node = graph[event.id];
        const uniqueTriggers = [...new Set(node.triggers)];

        if (uniqueTriggers.length === 0) {
            stats.branching.deadEnds++;
        } else {
            stats.branching.branches++;
            if (uniqueTriggers.length >= 3) {
                stats.branching.majorBranches++;
            }
        }
    });

    return stats;
}

/**
 * Finds orphaned events
 */
function findOrphanedEvents(events, graph) {
    const eventsAddedByChoices = new Set();
    
    events.forEach(event => {
        if (event.choices) {
            event.choices.forEach(choice => {
                if (choice.add) {
                    choice.add.forEach(id => eventsAddedByChoices.add(id));
                }
            });
        }
    });

    return events.filter(event => {
        const hasConditions = event.conditions && Object.keys(event.conditions).length > 0;
        const isAddedByChoice = eventsAddedByChoices.has(event.id);
        const isEntryPoint = !hasConditions;

        return hasConditions && !isAddedByChoice && !isEntryPoint;
    });
}

/**
 * Main analysis function
 */
function main() {
    console.log('╔════════════════════════════════════════╗');
    console.log('║          Event Analyzer                ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('📂 Loading events...\n');
    const events = loadAllEvents();
    console.log(`   Loaded ${events.length} events\n`);

    if (events.length === 0) {
        console.log('⚠️  No events found. Add events to events/index.js\n');
        process.exit(0);
    }

    console.log('🔗 Building event graph...\n');
    const graph = buildEventGraph(events);

    console.log('📊 Generating statistics...\n');
    const stats = generateStatistics(events, graph);

    // Display statistics
    console.log('═══════════════════════════════════════════');
    console.log('📈 STATISTICS\n');
    console.log(`   Total Events: ${stats.total}`);
    console.log(`   Recurring: ${stats.byType.recurring}`);
    console.log(`   Once-Only: ${stats.byType.onceOnly}`);
    console.log(`   Conditional: ${stats.byType.conditional}`);
    console.log(`   Entry Points: ${stats.byType.entryPoint}\n`);

    console.log('🌿 BRANCHING ANALYSIS\n');
    console.log(`   Dead Ends: ${stats.branching.deadEnds} (${((stats.branching.deadEnds / stats.total) * 100).toFixed(1)}%)`);
    console.log(`   Branching Events: ${stats.branching.branches} (${((stats.branching.branches / stats.total) * 100).toFixed(1)}%)`);
    console.log(`   Major Branches (3+): ${stats.branching.majorBranches}\n`);

    if (Object.keys(stats.storylines).length > 0) {
        console.log('📚 STORYLINES\n');
        Object.entries(stats.storylines)
            .sort((a, b) => b[1] - a[1])
            .forEach(([sl, count]) => {
                console.log(`   ${sl}: ${count} events`);
            });
        console.log('');
    }

    if (Object.keys(stats.tags).length > 0) {
        console.log('🏷️  TAGS\n');
        Object.entries(stats.tags)
            .sort((a, b) => b[1] - a[1])
            .forEach(([tag, count]) => {
                console.log(`   ${tag}: ${count} events`);
            });
        console.log('');
    }

    // Check for orphaned events
    const orphaned = findOrphanedEvents(events, graph);
    if (orphaned.length > 0) {
        console.log('🔴 ORPHANED EVENTS\n');
        orphaned.forEach(event => {
            console.log(`   • ${event.id}: "${event.title}"`);
        });
        console.log('');
    }

    console.log('═══════════════════════════════════════════\n');
}

if (require.main === module) {
    main();
}

module.exports = { buildEventGraph, generateStatistics, findOrphanedEvents };
