
import { loadAllEvents } from './validate.js';
import { buildEventGraph } from './analyze.js';

function calculateDepths() {
    const events = loadAllEvents();
    const graph = buildEventGraph(events);
    const depths = {};
    const queue = [];

    // Initialize entry points (events with no triggers or weight > 0)
    events.forEach(event => {
        // If event is in the initial deck (weight > 0 and no complex conditions), depth is 1
        // Or if it's truly an entry point (no incoming triggers)
        const node = graph[event.id];
        if (node.triggeredBy.length === 0) {
            depths[event.id] = 1;
            queue.push(event.id);
        }
    });

    // BFS
    while (queue.length > 0) {
        const currentId = queue.shift();
        const currentDepth = depths[currentId];
        const node = graph[currentId];

        node.triggers.forEach(targetId => {
            if (!depths[targetId] || depths[targetId] > currentDepth + 1) {
                depths[targetId] = currentDepth + 1;
                queue.push(targetId);
            }
        });
    }

    // Handle unreachable events (maybe give them depth ?)
    events.forEach(event => {
        if (!depths[event.id]) {
            depths[event.id] = 99; // Arbitrary high number for disconnected events
        }
    });

    console.log(JSON.stringify(depths, null, 2));
}

calculateDepths();
