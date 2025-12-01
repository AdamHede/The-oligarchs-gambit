/**
 * Graph Builder Tests
 * 
 * Tests the graph visualization data builder
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { buildGraphData } from '../graph-builder.js';

test('Build graph data - generates nodes for all events', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [{ text: "Choice 1" }]
        },
        {
            id: "event_b",
            title: "Event B",
            description: "Description B",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    
    assert.strictEqual(graphData.nodes.length, 2);
    assert.strictEqual(graphData.nodes[0].data.id, "event_a");
    assert.strictEqual(graphData.nodes[1].data.id, "event_b");
});

test('Build graph data - node structure is correct', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            storylines: ["war-invasion"],
            recurring: true,
            weight: 5,
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    const node = graphData.nodes[0];
    
    assert.strictEqual(node.data.id, "event_a");
    assert.strictEqual(node.data.label, "Event A");
    assert.strictEqual(node.data.fullTitle, "Event A");
    assert.deepStrictEqual(node.data.storylines, ["war-invasion"]);
    assert.strictEqual(node.data.recurring, true);
    assert.strictEqual(node.data.weight, 5);
});

test('Build graph data - long titles are truncated', () => {
    const events = [
        {
            id: "event_a",
            title: "This is a very long event title that should be truncated",
            description: "Description",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    
    assert.ok(graphData.nodes[0].data.label.length <= 30);
    assert.strictEqual(graphData.nodes[0].data.fullTitle, "This is a very long event title that should be truncated");
});

test('Build graph data - creates edges from add references', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [
                {
                    text: "Choice 1",
                    add: ["event_b", "event_c"]
                }
            ]
        },
        {
            id: "event_b",
            title: "Event B",
            description: "Description B",
            choices: [{ text: "Choice 1" }]
        },
        {
            id: "event_c",
            title: "Event C",
            description: "Description C",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    
    assert.ok(graphData.edges.length >= 2);
    const edgeToB = graphData.edges.find(e => e.data.target === "event_b");
    const edgeToC = graphData.edges.find(e => e.data.target === "event_c");
    
    assert.ok(edgeToB);
    assert.strictEqual(edgeToB.data.source, "event_a");
    assert.strictEqual(edgeToB.data.choiceIndex, 0);
    
    assert.ok(edgeToC);
    assert.strictEqual(edgeToC.data.source, "event_a");
});

test('Build graph data - creates edges from addToPool references', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [
                {
                    text: "Choice 1",
                    addToPool: ["event_b"]
                }
            ]
        },
        {
            id: "event_b",
            title: "Event B",
            description: "Description B",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    
    const edge = graphData.edges.find(e => e.data.target === "event_b");
    assert.ok(edge);
    assert.strictEqual(edge.data.source, "event_a");
});

test('Build graph data - filters out edges to non-existent events', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [
                {
                    text: "Choice 1",
                    add: ["event_b", "nonexistent_event"]
                }
            ]
        },
        {
            id: "event_b",
            title: "Event B",
            description: "Description B",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    
    // Should only have edge to event_b, not to nonexistent_event
    const validEdge = graphData.edges.find(e => e.data.target === "event_b");
    const invalidEdge = graphData.edges.find(e => e.data.target === "nonexistent_event");
    
    assert.ok(validEdge);
    assert.ok(!invalidEdge);
});

test('Build graph data - edge structure is correct', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [
                {
                    text: "Choice 1",
                    add: ["event_b"]
                }
            ]
        },
        {
            id: "event_b",
            title: "Event B",
            description: "Description B",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    const edge = graphData.edges[0];
    
    assert.ok(edge.data.id.startsWith("edge-"));
    assert.strictEqual(edge.data.source, "event_a");
    assert.strictEqual(edge.data.target, "event_b");
    assert.strictEqual(edge.data.choiceIndex, 0);
    assert.strictEqual(edge.data.choiceText, "Choice 1");
});

test('Build graph data - prevents duplicate edges', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [
                {
                    text: "Choice 1",
                    add: ["event_b"]
                },
                {
                    text: "Choice 2",
                    add: ["event_b"] // Same target
                }
            ]
        },
        {
            id: "event_b",
            title: "Event B",
            description: "Description B",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    
    // Should only have one edge to event_b (first one wins)
    const edgesToB = graphData.edges.filter(e => e.data.target === "event_b");
    assert.strictEqual(edgesToB.length, 1);
});

test('Build graph data - handles events with no choices', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A"
            // No choices
        }
    ];
    
    const graphData = buildGraphData(events);
    
    assert.strictEqual(graphData.nodes.length, 1);
    assert.strictEqual(graphData.edges.length, 0);
});

test('Build graph data - handles empty events array', () => {
    const graphData = buildGraphData([]);
    
    assert.strictEqual(graphData.nodes.length, 0);
    assert.strictEqual(graphData.edges.length, 0);
});

test('Build graph data - default values for optional fields', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [{ text: "Choice 1" }]
            // No storylines, recurring, or weight
        }
    ];
    
    const graphData = buildGraphData(events);
    const node = graphData.nodes[0];
    
    assert.deepStrictEqual(node.data.storylines, []);
    assert.strictEqual(node.data.recurring, false);
    assert.strictEqual(node.data.weight, 1);
});

test('Build graph data - multiple edges from same choice', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [
                {
                    text: "Choice 1",
                    add: ["event_b", "event_c", "event_d"]
                }
            ]
        },
        {
            id: "event_b",
            title: "Event B",
            description: "Description B",
            choices: [{ text: "Choice 1" }]
        },
        {
            id: "event_c",
            title: "Event C",
            description: "Description C",
            choices: [{ text: "Choice 1" }]
        },
        {
            id: "event_d",
            title: "Event D",
            description: "Description D",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    
    // Should have 3 edges (one to each target)
    const edgesFromA = graphData.edges.filter(e => e.data.source === "event_a");
    assert.strictEqual(edgesFromA.length, 3);
});

test('Build graph data - filters invalid edges but keeps valid ones', () => {
    const events = [
        {
            id: "event_a",
            title: "Event A",
            description: "Description A",
            choices: [
                {
                    text: "Choice 1",
                    add: ["event_b", "invalid_1", "event_c", "invalid_2"]
                }
            ]
        },
        {
            id: "event_b",
            title: "Event B",
            description: "Description B",
            choices: [{ text: "Choice 1" }]
        },
        {
            id: "event_c",
            title: "Event C",
            description: "Description C",
            choices: [{ text: "Choice 1" }]
        }
    ];
    
    const graphData = buildGraphData(events);
    
    // Should have 2 edges (to event_b and event_c)
    const edgesFromA = graphData.edges.filter(e => e.data.source === "event_a");
    assert.strictEqual(edgesFromA.length, 2);
    
    assert.ok(edgesFromA.some(e => e.data.target === "event_b"));
    assert.ok(edgesFromA.some(e => e.data.target === "event_c"));
    assert.ok(!edgesFromA.some(e => e.data.target === "invalid_1"));
    assert.ok(!edgesFromA.some(e => e.data.target === "invalid_2"));
});

