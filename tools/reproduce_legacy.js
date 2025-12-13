
import { GameEngineV2 } from '../engine/game-engine.js';
import { SUCCESSION_EVENTS } from '../events/events_succession_power.js';

// Setup Mock Event with Legacy
const mockEvent = {
    id: "test_legacy_event",
    title: "Test Event",
    description: "Testing legacy awards",
    choices: [
        {
            text: "Get Legacy",
            effects: {
                legacy: { icon: "🏆", name: "Test Legend", weight: 10 }
            }
        }
    ]
};

const allEvents = [...SUCCESSION_EVENTS, mockEvent];

console.log("Initializing Game Engine...");
const engine = new GameEngineV2(allEvents, {
    deck: ["test_legacy_event"] // Force our test event
});

console.log("Drawing Event...");
const event = engine.drawNextEvent();
console.log("Event drawn:", event.id);

if (event.id !== "test_legacy_event") {
    console.error("Failed to draw test event!");
    process.exit(1);
}

console.log("Making Choice...");
const result = engine.makeChoice(0);
console.log("Choice result legacy:", JSON.stringify(result.legacy, null, 2));

const state = engine.getState();
console.log("Game History Length:", state.history.length);

const lastHistory = state.history[state.history.length - 1];
console.log("Last History Entry Legacy:", JSON.stringify(lastHistory.legacy, null, 2));

if (lastHistory.legacy && lastHistory.legacy.name === "Test Legend") {
    console.log("SUCCESS: Legacy award found in history!");
} else {
    console.error("FAILURE: Legacy award NOT found in history!");
    process.exit(1);
}
