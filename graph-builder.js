/**
 * Graph Builder
 * 
 * Transforms events into Cytoscape.js graph format
 */

export function buildGraphData(events) {
    const nodes = events.map(event => ({
        data: {
            id: event.id,
            label: event.title.length > 30 ? event.title.substring(0, 27) + '...' : event.title,
            fullTitle: event.title,
            storylines: event.storylines || [],
            recurring: event.recurring || false,
            weight: event.weight || 1
        }
    }));

    const edges = [];
    const edgeMap = new Map(); // Track unique edges

    events.forEach(event => {
        if (event.choices) {
            event.choices.forEach((choice, choiceIndex) => {
                const addEvents = choice.add || choice.addToPool || [];
                addEvents.forEach(targetId => {
                    // Create unique edge key
                    const edgeKey = `${event.id}->${targetId}`;
                    if (!edgeMap.has(edgeKey)) {
                        edgeMap.set(edgeKey, true);
                        edges.push({
                            data: {
                                id: `edge-${event.id}-${targetId}-${choiceIndex}`,
                                source: event.id,
                                target: targetId,
                                choiceIndex: choiceIndex,
                                choiceText: choice.text
                            }
                        });
                    }
                });
            });
        }
    });

    return { nodes, edges };
}

