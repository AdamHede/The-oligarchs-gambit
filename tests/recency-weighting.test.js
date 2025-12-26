import { test } from 'node:test';
import assert from 'node:assert';
import { GameEngineV2 as GameEngine } from '../engine/game-engine.js';
import { calculateEffectiveWeight } from '../engine/deck-manager.js';

// Test events with storylines
const TEST_EVENTS = [
    {
        id: "event_A_1",
        title: "Event A 1",
        recurring: true,
        storylines: ["storyline_A"],
        weight: 10,
        choices: [{ text: "Choice", effects: {} }]
    },
    {
        id: "event_B_1",
        title: "Event B 1",
        recurring: true,
        storylines: ["storyline_B"],
        weight: 10,
        choices: [{ text: "Choice", effects: {} }]
    },
    {
        id: "event_AB_1",
        title: "Event AB 1",
        recurring: true,
        storylines: ["storyline_A", "storyline_B"],
        weight: 10,
        choices: [{ text: "Choice", effects: {} }]
    }
];

test('Storyline recency penalty', () => {
    const engine = new GameEngine(TEST_EVENTS, { deck: ["event_A_1", "event_B_1"] });
    
    // Initial state: turn 0
    // Play Event A
    engine.state.deck = ["event_A_1"];
    engine.drawNextEvent();
    engine.makeChoice(0);
    
    // Now turn is 1. storyline_A last seen at turn 0 (initial turn).
    // Wait, let's verify turn logic.
    // createInitialState -> turn 0.
    // drawNextEvent -> turn 0.
    // makeChoice -> updates lastSeen = 0.
    // advanceTime -> turn 1.
    
    const lastSeenA = engine.state.storylineLastSeen["storyline_A"];
    const currentTurn = engine.state.turn;
    const delta = currentTurn - lastSeenA;
    
    assert.strictEqual(lastSeenA, 0, "Last seen should be 0");
    assert.strictEqual(currentTurn, 1, "Current turn should be 1");
    assert.strictEqual(delta, 1, "Delta should be 1 immediately after turn");
    
    // Calculate weight for Event A (should be penalized)
    const eventA = TEST_EVENTS.find(e => e.id === "event_A_1");
    const weightA = calculateEffectiveWeight(eventA, engine.state);
    
    // Delta 1 -> 0.1 multiplier. Base 10 -> 1.0.
    assert.strictEqual(weightA, 1, "Weight should be 1 (0.1 multiplier)");
    
    // Calculate weight for Event B (should be neutral 1.0)
    // Storyline B has never been seen. Multiplier should be neutral?
    // In code: if (state.storylineLastSeen[storyline] !== undefined)
    // So if undefined, loop doesn't run? 
    // No, wait.
    /*
        const storylineMultipliers = event.storylines.map(storyline => {
            const effectiveWeight = getEffectiveStorylineWeight(...);
            let recencyMult = 1.0;
            if (state.storylineLastSeen && state.storylineLastSeen[storyline] !== undefined) {
                 ...
            }
            return (effectiveWeight * recencyMult) / baseWeight;
        });
    */
    // If undefined, recencyMult is 1.0. Correct.
    
    const eventB = TEST_EVENTS.find(e => e.id === "event_B_1");
    const weightB = calculateEffectiveWeight(eventB, engine.state);
    
    assert.strictEqual(weightB, 10, "Weight should be 10 (neutral)");
});

test('Storyline recency recovery', () => {
    const engine = new GameEngine(TEST_EVENTS);
    engine.state.storylineLastSeen = { "storyline_A": 1 };
    engine.state.turn = 6; // Delta = 5
    
    const eventA = TEST_EVENTS.find(e => e.id === "event_A_1");
    const weightA = calculateEffectiveWeight(eventA, engine.state);
    
    // Delta 5 -> 1.0 multiplier
    assert.strictEqual(weightA, 10, "Weight should return to normal at delta 5");
});

test('Storyline neglect boost', () => {
    const engine = new GameEngine(TEST_EVENTS);
    engine.state.storylineLastSeen = { "storyline_A": 1 };
    engine.state.turn = 11; // Delta = 10
    
    const eventA = TEST_EVENTS.find(e => e.id === "event_A_1");
    const weightA = calculateEffectiveWeight(eventA, engine.state);
    
    // Delta 10 -> 1.0 + (5 * 0.2) = 2.0 multiplier
    assert.strictEqual(weightA, 20, "Weight should be boosted at delta 10");
});

test('Multi-storyline interaction', () => {
    const engine = new GameEngine(TEST_EVENTS);
    
    // A just seen (penalized), B neglected (boosted)
    engine.state.storylineLastSeen = { 
        "storyline_A": 10,
        "storyline_B": 1
    };
    engine.state.turn = 11;
    
    // A delta = 1 -> 0.1x
    // B delta = 10 -> 2.0x
    
    const eventAB = TEST_EVENTS.find(e => e.id === "event_AB_1");
    const weightAB = calculateEffectiveWeight(eventAB, engine.state);
    
    // Should take Max(0.1, 2.0) = 2.0 -> 20 weight
    assert.strictEqual(weightAB, 20, "Should use max multiplier for multi-storyline event");
});

