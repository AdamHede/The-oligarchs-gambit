/**
 * Game State Tests
 */

const { test } = require('node:test');
const assert = require('node:assert');
const { createInitialState, addHistoryEntry, advanceTime, getDefaultStatBounds } = require('../engine/game-state');

test('Create initial state - default values', () => {
    const state = createInitialState();
    
    assert.strictEqual(state.stats.personalWealth, 10);
    assert.strictEqual(state.stats.treasury, 1000);
    assert.strictEqual(state.stats.elite, 90);
    assert.strictEqual(state.stats.anger, 10);
    assert.strictEqual(state.year, 1);
    assert.strictEqual(state.quarter, 1);
    assert.deepStrictEqual(state.deck, []);
    assert.deepStrictEqual(state.counters, {});
    assert.deepStrictEqual(state.flags, {});
    assert.deepStrictEqual(state.history, []);
});

test('Create initial state - custom stats', () => {
    const state = createInitialState({
        personalWealth: 50,
        treasury: 2000,
        elite: 50,
        anger: 50
    });
    
    assert.strictEqual(state.stats.personalWealth, 50);
    assert.strictEqual(state.stats.treasury, 2000);
    assert.strictEqual(state.stats.elite, 50);
    assert.strictEqual(state.stats.anger, 50);
});

test('Create initial state - custom deck', () => {
    const deck = ["event_a", "event_b"];
    const state = createInitialState({}, deck);
    
    assert.deepStrictEqual(state.deck, ["event_a", "event_b"]);
});

test('Create initial state - deck is copied', () => {
    const deck = ["event_a"];
    const state = createInitialState({}, deck);
    
    deck.push("event_b");
    
    assert.deepStrictEqual(state.deck, ["event_a"]); // Should not be affected
});

test('Advance time - quarter increment', () => {
    const state = createInitialState();
    
    advanceTime(state);
    assert.strictEqual(state.quarter, 2);
    assert.strictEqual(state.year, 1);
    
    advanceTime(state);
    assert.strictEqual(state.quarter, 3);
    assert.strictEqual(state.year, 1);
    
    advanceTime(state);
    assert.strictEqual(state.quarter, 4);
    assert.strictEqual(state.year, 1);
});

test('Advance time - year rollover', () => {
    const state = createInitialState();
    state.quarter = 4;
    state.year = 1;
    
    advanceTime(state);
    
    assert.strictEqual(state.quarter, 1);
    assert.strictEqual(state.year, 2);
});

test('Advance time - multiple year rollovers', () => {
    const state = createInitialState();
    state.quarter = 4;
    state.year = 1;
    
    advanceTime(state); // Q4 Y1 -> Q1 Y2
    advanceTime(state); // Q1 Y2 -> Q2 Y2
    advanceTime(state); // Q2 Y2 -> Q3 Y2
    advanceTime(state); // Q3 Y2 -> Q4 Y2
    advanceTime(state); // Q4 Y2 -> Q1 Y3
    
    assert.strictEqual(state.quarter, 1);
    assert.strictEqual(state.year, 3);
});

test('Add history entry', () => {
    const state = createInitialState();
    
    addHistoryEntry(state, {
        event: "test_event",
        choice: 0
    });
    
    assert.strictEqual(state.history.length, 1);
    assert.strictEqual(state.history[0].turn, 1);
    assert.strictEqual(state.history[0].year, 1);
    assert.strictEqual(state.history[0].quarter, 1);
    assert.strictEqual(state.history[0].event, "test_event");
    assert.strictEqual(state.history[0].choice, 0);
});

test('Add history entry - multiple entries', () => {
    const state = createInitialState();
    
    addHistoryEntry(state, { event: "event_a" });
    addHistoryEntry(state, { event: "event_b" });
    addHistoryEntry(state, { event: "event_c" });
    
    assert.strictEqual(state.history.length, 3);
    assert.strictEqual(state.history[0].turn, 1);
    assert.strictEqual(state.history[1].turn, 2);
    assert.strictEqual(state.history[2].turn, 3);
});

test('Add history entry - includes time', () => {
    const state = createInitialState();
    state.year = 2;
    state.quarter = 3;
    
    addHistoryEntry(state, { event: "test_event" });
    
    assert.strictEqual(state.history[0].year, 2);
    assert.strictEqual(state.history[0].quarter, 3);
});

test('Add history entry - custom fields', () => {
    const state = createInitialState();
    
    addHistoryEntry(state, {
        event: "test_event",
        choice: 1,
        customField: "custom_value"
    });
    
    assert.strictEqual(state.history[0].customField, "custom_value");
});

test('Get default stat bounds', () => {
    const bounds = getDefaultStatBounds();
    
    assert.deepStrictEqual(bounds.personalWealth, { min: 0, max: 200 });
    assert.deepStrictEqual(bounds.treasury, { min: 0, max: 2000 });
    assert.deepStrictEqual(bounds.elite, { min: 0, max: 100 });
    assert.deepStrictEqual(bounds.anger, { min: 0, max: 100 });
});

test('State isolation - stats object', () => {
    const state1 = createInitialState();
    const state2 = createInitialState();
    
    state1.stats.treasury = 2000;
    
    assert.strictEqual(state2.stats.treasury, 1000); // Should not be affected
});

test('State isolation - deck array', () => {
    const state1 = createInitialState({}, ["event_a"]);
    const state2 = createInitialState({}, ["event_b"]);
    
    state1.deck.push("event_c");
    
    assert.deepStrictEqual(state2.deck, ["event_b"]); // Should not be affected
});

