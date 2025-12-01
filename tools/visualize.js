#!/usr/bin/env node

/**
 * Event Visualizer
 * 
 * Generates visual graph representation of event relationships
 */

import fs from 'fs';
import { loadAllEvents } from './validate.js';
import { buildEventGraph } from './analyze.js';
import { fileURLToPath } from 'url';
import { resolve } from 'path';

/**
 * Generates Mermaid diagram syntax
 */
function generateMermaidDiagram(events, graph) {
    let mermaid = 'graph TD\n';
    
    // Add nodes
    events.forEach(event => {
        const nodeId = event.id.replace(/[^a-zA-Z0-9]/g, '_');
        const label = event.title.length > 30 
            ? event.title.substring(0, 27) + '...'
            : event.title;
        
        const shape = event.recurring ? '([[' : '[(';
        const shapeEnd = event.recurring ? ']])' : '])';
        
        mermaid += `    ${nodeId}${shape}${label}${shapeEnd}\n`;
    });

    // Add edges
    events.forEach(event => {
        const fromId = event.id.replace(/[^a-zA-Z0-9]/g, '_');
        const node = graph[event.id];
        
        const uniqueTriggers = [...new Set(node.triggers)];
        uniqueTriggers.forEach(toId => {
            const toIdClean = toId.replace(/[^a-zA-Z0-9]/g, '_');
            mermaid += `    ${fromId} --> ${toIdClean}\n`;
        });
    });

    return mermaid;
}

/**
 * Generates HTML visualization with Mermaid
 */
function generateHTMLVisualization(events, graph, outputPath) {
    const mermaid = generateMermaidDiagram(events, graph);
    
    const html = `<!DOCTYPE html>
<html>
<head>
    <title>Event Graph - The Oligarch's Gambit</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #1a1a1a;
            color: #e0e0e0;
        }
        h1 {
            color: #d4af37;
            margin-bottom: 10px;
        }
        .stats {
            background: #2a2a2a;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .stats p {
            margin: 5px 0;
        }
        #graph {
            background: white;
            padding: 20px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>Event Graph - The Oligarch's Gambit</h1>
    <div class="stats">
        <p><strong>Total Events:</strong> ${events.length}</p>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
    </div>
    <div id="graph">
        <div class="mermaid">
${mermaid}
        </div>
    </div>
    <script>
        mermaid.initialize({ startOnLoad: true, theme: 'dark' });
    </script>
</body>
</html>`;

    fs.writeFileSync(outputPath, html, 'utf-8');
}

/**
 * Main visualization function
 */
function main() {
    const args = process.argv.slice(2);
    const outputIndex = args.indexOf('--output');
    const outputPath = outputIndex >= 0 && args[outputIndex + 1] 
        ? args[outputIndex + 1]
        : './event-graph.html';

    console.log('╔════════════════════════════════════════╗');
    console.log('║         Event Visualizer               ║');
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

    console.log('🎨 Generating visualization...\n');
    generateHTMLVisualization(events, graph, outputPath);

    console.log(`✅ Visualization saved to: ${outputPath}\n`);
    console.log('   Open in a web browser to view the graph.\n');
}

// Check if running directly (not imported)
const __filename = fileURLToPath(import.meta.url);
const isMainModule = process.argv[1] && resolve(__filename) === resolve(process.argv[1]);
if (isMainModule) {
    main();
}

export { generateMermaidDiagram, generateHTMLVisualization };
