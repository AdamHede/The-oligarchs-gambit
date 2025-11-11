#!/usr/bin/env node

// The Oligarch's Gambit - Event Analysis & Version Management Tool
// Run this script after making changes to verify event system health

const fs = require('fs');
const path = require('path');

// Configuration
const NEW_VERSION = process.argv[2] || null; // Optional: pass new version as argument
const EVENTS_DIR = './events';
const OUTPUT_MD = './EVENT_ANALYSIS.md';
const OUTPUT_JSON = './event-tree.json';

// Event categories
const EVENT_FILES = [
    'events_war_military.js',
    'events_energy_pipeline.js',
    'events_sanctions_international.js',
    'events_succession_power.js',
    'events_social_movements.js',
    'events_domestic_crisis.js',
    'events_misc.js'
];

class EventAnalyzer {
    constructor() {
        this.events = [];
        this.eventsByCategory = {};
        this.eventGraph = {}; // id -> {triggers: [], addedBy: [], removedBy: []}
        this.orphanedEvents = [];
        this.entryPoints = []; // Events with no conditions
        this.warnings = [];
    }

    // Parse a JavaScript event file
    parseEventFile(filePath, category) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');

            // Extract the array name from the file
            const arrayMatch = content.match(/const\s+(\w+)\s*=\s*\[/);
            if (!arrayMatch) {
                this.warnings.push(`Could not find event array in ${filePath}`);
                return [];
            }

            // Use eval in a controlled way to parse the events (since it's our own code)
            // This is safe because we're only parsing our own event files
            const events = eval(`
                const events = ${content.match(/\[[\s\S]*\];/)[0]}
                events;
            `);

            // Add category metadata
            events.forEach(event => {
                event._category = category;
                event._file = path.basename(filePath);
            });

            return events;
        } catch (error) {
            this.warnings.push(`Error parsing ${filePath}: ${error.message}`);
            return [];
        }
    }

    // Load all events from files
    loadEvents() {
        console.log('📂 Loading events from files...\n');

        EVENT_FILES.forEach(filename => {
            const filePath = path.join(EVENTS_DIR, filename);
            const category = filename.replace('events_', '').replace('.js', '');

            if (fs.existsSync(filePath)) {
                const events = this.parseEventFile(filePath, category);
                this.events.push(...events);
                this.eventsByCategory[category] = events;
                console.log(`  ✓ ${category}: ${events.length} events`);
            } else {
                this.warnings.push(`File not found: ${filePath}`);
            }
        });

        console.log(`\n📊 Total events loaded: ${this.events.length}\n`);
    }

    // Build event relationship graph
    buildEventGraph() {
        console.log('🔗 Building event relationship graph...\n');

        // Initialize graph nodes
        this.events.forEach(event => {
            this.eventGraph[event.id] = {
                event: event,
                triggeredBy: [], // Events that add this to pool
                triggers: [], // Events this adds to pool
                removes: [], // Events this removes from pool
                conditions: event.conditions || {},
                weight: event.weight || 1,
                onceOnly: event.onceOnly || false,
                storyline: event.storyline || null
            };
        });

        // Build relationships
        this.events.forEach(event => {
            const node = this.eventGraph[event.id];

            // Check each choice for event triggers
            if (event.choices) {
                event.choices.forEach((choice, idx) => {
                    // Legacy eventTriggers system
                    if (choice.eventTriggers) {
                        choice.eventTriggers.forEach(triggeredId => {
                            if (this.eventGraph[triggeredId]) {
                                node.triggers.push(triggeredId);
                                this.eventGraph[triggeredId].triggeredBy.push({
                                    from: event.id,
                                    choice: idx,
                                    choiceText: choice.text
                                });
                            } else {
                                this.warnings.push(`Event "${event.id}" references non-existent event "${triggeredId}" in eventTriggers`);
                            }
                        });
                    }

                    // New addToPool system
                    if (choice.addToPool) {
                        choice.addToPool.forEach(addedId => {
                            if (this.eventGraph[addedId]) {
                                node.triggers.push(addedId);
                                this.eventGraph[addedId].triggeredBy.push({
                                    from: event.id,
                                    choice: idx,
                                    choiceText: choice.text
                                });
                            } else {
                                this.warnings.push(`Event "${event.id}" references non-existent event "${addedId}" in addToPool`);
                            }
                        });
                    }

                    // removeFromPool system
                    if (choice.removeFromPool) {
                        choice.removeFromPool.forEach(removedId => {
                            if (this.eventGraph[removedId]) {
                                node.removes.push(removedId);
                            } else {
                                this.warnings.push(`Event "${event.id}" references non-existent event "${removedId}" in removeFromPool`);
                            }
                        });
                    }
                });
            }
        });

        // Find entry points (events with no conditions or only basic conditions)
        this.entryPoints = this.events.filter(event => {
            const conditions = event.conditions || {};
            const hasComplexConditions = conditions.hasTriggered && conditions.hasTriggered.length > 0;
            return !hasComplexConditions;
        });

        // Find orphaned events (events that can never be triggered)
        this.orphanedEvents = this.events.filter(event => {
            const node = this.eventGraph[event.id];
            const conditions = event.conditions || {};
            const hasHasTriggeredCondition = conditions.hasTriggered && conditions.hasTriggered.length > 0;

            // If event requires hasTriggered but nothing adds it to pool, it's orphaned
            return hasHasTriggeredCondition && node.triggeredBy.length === 0;
        });

        console.log(`  ✓ Entry points: ${this.entryPoints.length}`);
        console.log(`  ✓ Orphaned events: ${this.orphanedEvents.length}\n`);
    }

    // Generate statistics
    generateStatistics() {
        const stats = {
            total: this.events.length,
            byCategory: {},
            byStoryline: {},
            byType: {
                onceOnly: 0,
                recurring: 0,
                conditional: 0,
                entryPoint: this.entryPoints.length
            },
            branching: {
                deadEnds: 0, // Events that don't add any new events
                branches: 0, // Events that add 1+ new events
                majorBranches: 0 // Events that add 3+ new events
            },
            chains: {
                longest: 0,
                average: 0
            }
        };

        // Count by category
        Object.keys(this.eventsByCategory).forEach(category => {
            stats.byCategory[category] = this.eventsByCategory[category].length;
        });

        // Count by storyline
        this.events.forEach(event => {
            if (event.storyline) {
                stats.byStoryline[event.storyline] = (stats.byStoryline[event.storyline] || 0) + 1;
            }
        });

        // Count by type
        this.events.forEach(event => {
            if (event.onceOnly) stats.byType.onceOnly++;
            else stats.byType.recurring++;

            if (event.conditions && Object.keys(event.conditions).length > 0) {
                stats.byType.conditional++;
            }
        });

        // Count branching
        this.events.forEach(event => {
            const node = this.eventGraph[event.id];
            const triggerCount = new Set(node.triggers).size; // Use Set to avoid duplicates

            if (triggerCount === 0) {
                stats.branching.deadEnds++;
            } else if (triggerCount >= 1) {
                stats.branching.branches++;
                if (triggerCount >= 3) {
                    stats.branching.majorBranches++;
                }
            }
        });

        // Calculate chain depths
        const depths = this.events.map(event => this.calculateChainDepth(event.id));
        stats.chains.longest = Math.max(...depths);
        stats.chains.average = (depths.reduce((a, b) => a + b, 0) / depths.length).toFixed(1);

        return stats;
    }

    // Calculate the longest chain depth from an event
    calculateChainDepth(eventId, visited = new Set()) {
        if (visited.has(eventId)) return 0; // Prevent infinite loops
        visited.add(eventId);

        const node = this.eventGraph[eventId];
        if (!node || node.triggers.length === 0) return 0;

        const depths = node.triggers.map(triggeredId =>
            1 + this.calculateChainDepth(triggeredId, new Set(visited))
        );

        return Math.max(...depths);
    }

    // Generate markdown tree visualization
    generateMarkdownTree() {
        let markdown = '# Event Tree Structure\n\n';
        markdown += `*Generated: ${new Date().toLocaleString()}*\n\n`;

        const stats = this.generateStatistics();

        markdown += '## Statistics\n\n';
        markdown += `- **Total Events:** ${stats.total}\n`;
        markdown += `- **Entry Points:** ${stats.byType.entryPoint}\n`;
        markdown += `- **Once-Only Events:** ${stats.byType.onceOnly}\n`;
        markdown += `- **Recurring Events:** ${stats.byType.recurring}\n`;
        markdown += `- **Conditional Events:** ${stats.byType.conditional}\n\n`;

        markdown += '### Branching Analysis\n\n';
        markdown += `- **Dead Ends** (no new events): ${stats.branching.deadEnds} (${((stats.branching.deadEnds / stats.total) * 100).toFixed(1)}%)\n`;
        markdown += `- **Branching Events** (1+ new events): ${stats.branching.branches} (${((stats.branching.branches / stats.total) * 100).toFixed(1)}%)\n`;
        markdown += `- **Major Branches** (3+ new events): ${stats.branching.majorBranches} (${((stats.branching.majorBranches / stats.total) * 100).toFixed(1)}%)\n\n`;

        markdown += '### Chain Depth\n\n';
        markdown += `- **Longest Chain:** ${stats.chains.longest} events deep\n`;
        markdown += `- **Average Depth:** ${stats.chains.average}\n\n`;

        markdown += '### Events by Category\n\n';
        Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]).forEach(([category, count]) => {
            markdown += `- **${category}:** ${count} events\n`;
        });
        markdown += '\n';

        markdown += '### Events by Storyline\n\n';
        Object.entries(stats.byStoryline).sort((a, b) => b[1] - a[1]).forEach(([storyline, count]) => {
            markdown += `- **${storyline}:** ${count} events\n`;
        });
        markdown += '\n';

        // Warnings
        if (this.warnings.length > 0) {
            markdown += '## ⚠️ Warnings\n\n';
            this.warnings.forEach(warning => {
                markdown += `- ${warning}\n`;
            });
            markdown += '\n';
        }

        // Orphaned events
        if (this.orphanedEvents.length > 0) {
            markdown += '## 🔴 Orphaned Events\n\n';
            markdown += '*These events have `hasTriggered` conditions but are never added to the pool by any choice:*\n\n';
            this.orphanedEvents.forEach(event => {
                markdown += `- **${event.id}** (${event._category}): "${event.title}"\n`;
            });
            markdown += '\n';
        }

        // Entry points
        markdown += '## 🌟 Entry Point Events\n\n';
        markdown += '*These events can appear without requiring other events to trigger them:*\n\n';
        this.entryPoints.slice(0, 20).forEach(event => {
            markdown += `- **${event.id}** (${event._category}): "${event.title}"\n`;
        });
        if (this.entryPoints.length > 20) {
            markdown += `\n*... and ${this.entryPoints.length - 20} more*\n`;
        }
        markdown += '\n';

        // Event chains visualization
        markdown += '## 🌳 Event Tree Visualization\n\n';
        markdown += '*Showing major event chains and branches:*\n\n';

        // Find major storyline starting points
        const majorStorylines = this.events.filter(e =>
            e.onceOnly &&
            this.eventGraph[e.id].triggers.length > 0 &&
            !e.conditions?.hasTriggered
        ).slice(0, 15);

        majorStorylines.forEach(event => {
            markdown += this.generateEventSubtree(event.id, 0, new Set());
            markdown += '\n';
        });

        return markdown;
    }

    // Generate subtree for an event (recursive)
    generateEventSubtree(eventId, depth, visited, maxDepth = 4) {
        if (depth >= maxDepth || visited.has(eventId)) return '';
        visited.add(eventId);

        const node = this.eventGraph[eventId];
        if (!node) return '';

        const event = node.event;
        const indent = '  '.repeat(depth);
        const branch = depth > 0 ? '└─ ' : '▶ ';

        let line = `${indent}${branch}**${event.id}** - ${event.title}`;
        if (event.onceOnly) line += ' 🔒';
        if (event.storyline) line += ` [${event.storyline}]`;
        line += '\n';

        // Show what this event triggers
        const uniqueTriggers = [...new Set(node.triggers)];
        uniqueTriggers.slice(0, 5).forEach(triggeredId => {
            line += this.generateEventSubtree(triggeredId, depth + 1, new Set(visited), maxDepth);
        });

        if (uniqueTriggers.length > 5) {
            line += `${indent}  └─ ... and ${uniqueTriggers.length - 5} more\n`;
        }

        return line;
    }

    // Generate JSON for frontend
    generateJSON() {
        const treeData = {
            version: this.getCurrentVersion(),
            generatedAt: new Date().toISOString(),
            statistics: this.generateStatistics(),
            events: this.events.map(event => ({
                id: event.id,
                title: event.title,
                category: event._category,
                storyline: event.storyline || null,
                onceOnly: event.onceOnly || false,
                weight: event.weight || 1,
                conditions: event.conditions || {},
                triggers: [...new Set(this.eventGraph[event.id].triggers)],
                triggeredBy: this.eventGraph[event.id].triggeredBy,
                isEntryPoint: this.entryPoints.some(e => e.id === event.id),
                isOrphaned: this.orphanedEvents.some(e => e.id === event.id),
                chainDepth: this.calculateChainDepth(event.id)
            })),
            warnings: this.warnings
        };

        return treeData;
    }

    // Get current version from game.js
    getCurrentVersion() {
        try {
            const gameJs = fs.readFileSync('./game.js', 'utf-8');
            const versionMatch = gameJs.match(/const GAME_VERSION = ["']([^"']+)["']/);
            return versionMatch ? versionMatch[1] : 'unknown';
        } catch (error) {
            return 'unknown';
        }
    }

    // Update version numbers across all files
    updateVersions(newVersion) {
        console.log(`📝 Updating version to ${newVersion}...\n`);

        const filesToUpdate = [
            { path: './game.js', pattern: /const GAME_VERSION = ["']([^"']+)["']/, replacement: `const GAME_VERSION = "${newVersion}"` },
            { path: './README.md', pattern: /\*\*Version:\*\* v[\d.]+/, replacement: `**Version:** v${newVersion}` },
            { path: './events.js', pattern: /\/\/ The Oligarch's Gambit - v[\d.]+/, replacement: `// The Oligarch's Gambit - v${newVersion}` }
        ];

        // Update event category files
        EVENT_FILES.forEach(filename => {
            filesToUpdate.push({
                path: path.join(EVENTS_DIR, filename),
                pattern: /\/\/ The Oligarch's Gambit - v[\d.]+/,
                replacement: `// The Oligarch's Gambit - v${newVersion}`
            });
        });

        filesToUpdate.forEach(({ path: filePath, pattern, replacement }) => {
            try {
                if (fs.existsSync(filePath)) {
                    let content = fs.readFileSync(filePath, 'utf-8');
                    const updated = content.replace(pattern, replacement);

                    if (updated !== content) {
                        fs.writeFileSync(filePath, updated, 'utf-8');
                        console.log(`  ✓ Updated ${filePath}`);
                    }
                }
            } catch (error) {
                console.log(`  ✗ Failed to update ${filePath}: ${error.message}`);
            }
        });

        console.log('\n');
    }

    // Run full analysis
    run() {
        console.log('╔════════════════════════════════════════╗');
        console.log('║  The Oligarch\'s Gambit Event Analyzer  ║');
        console.log('╚════════════════════════════════════════╝\n');

        this.loadEvents();
        this.buildEventGraph();

        const stats = this.generateStatistics();

        console.log('📈 Statistics Summary:\n');
        console.log(`  Total Events: ${stats.total}`);
        console.log(`  Entry Points: ${stats.byType.entryPoint}`);
        console.log(`  Dead Ends: ${stats.branching.deadEnds} (${((stats.branching.deadEnds / stats.total) * 100).toFixed(1)}%)`);
        console.log(`  Branching Events: ${stats.branching.branches} (${((stats.branching.branches / stats.total) * 100).toFixed(1)}%)`);
        console.log(`  Longest Chain: ${stats.chains.longest} events\n`);

        // Generate outputs
        console.log('📄 Generating markdown report...');
        const markdown = this.generateMarkdownTree();
        fs.writeFileSync(OUTPUT_MD, markdown, 'utf-8');
        console.log(`  ✓ Saved to ${OUTPUT_MD}\n`);

        console.log('📦 Generating JSON for frontend...');
        const json = this.generateJSON();
        fs.writeFileSync(OUTPUT_JSON, JSON.stringify(json, null, 2), 'utf-8');
        console.log(`  ✓ Saved to ${OUTPUT_JSON}\n`);

        // Update versions if requested
        if (NEW_VERSION) {
            this.updateVersions(NEW_VERSION);
        }

        // Final report
        console.log('╔════════════════════════════════════════╗');
        console.log('║            Analysis Complete            ║');
        console.log('╚════════════════════════════════════════╝\n');

        if (this.warnings.length > 0) {
            console.log(`⚠️  ${this.warnings.length} warnings found (see ${OUTPUT_MD})`);
        }
        if (this.orphanedEvents.length > 0) {
            console.log(`🔴 ${this.orphanedEvents.length} orphaned events found (see ${OUTPUT_MD})`);
        }

        console.log(`\n✅ Analysis complete. Check ${OUTPUT_MD} for details.`);
        console.log(`   Frontend data available in ${OUTPUT_JSON}\n`);
    }
}

// Run the analyzer
const analyzer = new EventAnalyzer();
analyzer.run();
