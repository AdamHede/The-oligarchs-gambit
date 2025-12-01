/**
 * Deck Manager Tests
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { addToDeck, removeFromDeck, drawEvent, processChoiceDeckOperations } from '../engine/deck-manager.js';
import { isEventEligible } from '../engine/condition-eval.js';

test('Add to deck - single event', () => {
    const deck = ["event_a", "event_b"];
    const result = addToDeck("event_c", deck);
    
    assert.deepStrictEqual(result, ["event_a", "event_b", "event_c"]);
});

test('Add to deck - multiple events', () => {
    const deck = ["event_a"];
    const result = addToDeck(["event_b", "event_c"], deck);
    
    assert.deepStrictEqual(result, ["event_a", "event_b", "event_c"]);
});

test('Add to deck - prevent duplicates', () => {
    const deck = ["event_a", "event_b"];
    const result = addToDeck(["event_b", "event_c"], deck);
    
    assert.deepStrictEqual(result, ["event_a", "event_b", "event_c"]);
});

test('Add to deck - empty deck', () => {
    const deck = [];
    const result = addToDeck(["event_a"], deck);
    
    assert.deepStrictEqual(result, ["event_a"]);
});

test('Remove from deck - single event', () => {
    const deck = ["event_a", "event_b", "event_c"];
    const result = removeFromDeck("event_b", deck);
    
    assert.deepStrictEqual(result, ["event_a", "event_c"]);
});

test('Remove from deck - multiple events', () => {
    const deck = ["event_a", "event_b", "event_c", "event_d"];
    const result = removeFromDeck(["event_b", "event_d"], deck);
    
    assert.deepStrictEqual(result, ["event_a", "event_c"]);
});

test('Remove from deck - non-existent event', () => {
    const deck = ["event_a", "event_b"];
    const result = removeFromDeck("event_c", deck);
    
    assert.deepStrictEqual(result, ["event_a", "event_b"]);
});

test('Remove from deck - empty deck', () => {
    const deck = [];
    const result = removeFromDeck("event_a", deck);
    
    assert.deepStrictEqual(result, []);
});

test('Draw event - weighted selection', () => {
    const events = [
        { id: "event_a", weight: 1 },
        { id: "event_b", weight: 2 },
        { id: "event_c", weight: 3 }
    ];
    const deck = ["event_a", "event_b", "event_c"];
    const state = { stats: {}, counters: {}, flags: {} };

    // Draw many times and verify distribution
    const counts = { "event_a": 0, "event_b": 0, "event_c": 0 };
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
        const event = drawEvent(events, deck, isEventEligible, state);
        if (event) {
            counts[event.id]++;
        }
    }

    // event_c should be drawn most often (weight 3)
    // event_b should be drawn more than event_a (weight 2 vs 1)
    assert.ok(counts["event_c"] > counts["event_b"]);
    assert.ok(counts["event_b"] > counts["event_a"]);
    assert.ok(counts["event_a"] > 0);
    assert.ok(counts["event_b"] > 0);
    assert.ok(counts["event_c"] > 0);
});

test('Draw event - equal weights', () => {
    const events = [
        { id: "event_a", weight: 1 },
        { id: "event_b", weight: 1 },
        { id: "event_c", weight: 1 }
    ];
    const deck = ["event_a", "event_b", "event_c"];
    const state = { stats: {}, counters: {}, flags: {} };

    const counts = { "event_a": 0, "event_b": 0, "event_c": 0 };
    const iterations = 300;

    for (let i = 0; i < iterations; i++) {
        const event = drawEvent(events, deck, isEventEligible, state);
        if (event) {
            counts[event.id]++;
        }
    }

    // All should be drawn roughly equally
    assert.ok(counts["event_a"] > 50);
    assert.ok(counts["event_b"] > 50);
    assert.ok(counts["event_c"] > 50);
});

test('Draw event - empty deck', () => {
    const events = [{ id: "event_a" }];
    const deck = [];
    const state = { stats: {}, counters: {}, flags: {} };

    const event = drawEvent(events, deck, isEventEligible, state);
    assert.strictEqual(event, null);
});

test('Draw event - all events ineligible', () => {
    const events = [
        { 
            id: "event_a", 
            conditions: { stats: { treasury: { gte: 1000 } } }
        }
    ];
    const deck = ["event_a"];
    const state = { stats: { treasury: 100 }, counters: {}, flags: {} };

    const event = drawEvent(events, deck, isEventEligible, state);
    assert.strictEqual(event, null);
});

test('Draw event - some events ineligible', () => {
    const events = [
        { id: "event_a", conditions: { stats: { treasury: { gte: 1000 } } } },
        { id: "event_b" } // No conditions
    ];
    const deck = ["event_a", "event_b"];
    const state = { stats: { treasury: 100 }, counters: {}, flags: {} };

    const event = drawEvent(events, deck, isEventEligible, state);
    assert.ok(event);
    assert.strictEqual(event.id, "event_b");
});

test('Draw event - events not in deck', () => {
    const events = [
        { id: "event_a" },
        { id: "event_b" },
        { id: "event_c" }
    ];
    const deck = ["event_a", "event_b"]; // event_c not in deck
    const state = { stats: {}, counters: {}, flags: {} };

    const counts = { "event_a": 0, "event_b": 0, "event_c": 0 };
    const iterations = 100;

    for (let i = 0; i < iterations; i++) {
        const event = drawEvent(events, deck, isEventEligible, state);
        if (event) {
            counts[event.id]++;
        }
    }

    assert.strictEqual(counts["event_c"], 0);
    assert.ok(counts["event_a"] > 0 || counts["event_b"] > 0);
});

test('Process choice - add events', () => {
    const deck = ["event_a"];
    const choice = { add: ["event_b", "event_c"] };
    
    const result = processChoiceDeckOperations(choice, "event_a", false, deck);
    
    assert.deepStrictEqual(result, ["event_b", "event_c"]);
});

test('Process choice - remove events', () => {
    const deck = ["event_a", "event_b", "event_c"];
    const choice = { remove: ["event_b"] };
    
    const result = processChoiceDeckOperations(choice, "event_a", false, deck);
    
    assert.deepStrictEqual(result, ["event_c"]);
});

test('Process choice - add and remove together', () => {
    const deck = ["event_a", "event_b"];
    const choice = { add: ["event_c"], remove: ["event_b"] };
    
    const result = processChoiceDeckOperations(choice, "event_a", false, deck);
    
    assert.deepStrictEqual(result, ["event_c"]);
});

test('Process choice - removeSelf (non-recurring)', () => {
    const deck = ["event_a", "event_b"];
    const choice = {};
    
    const result = processChoiceDeckOperations(choice, "event_a", false, deck);
    
    assert.deepStrictEqual(result, ["event_b"]);
});

test('Process choice - removeSelf (recurring)', () => {
    const deck = ["event_a", "event_b"];
    const choice = {};
    
    const result = processChoiceDeckOperations(choice, "event_a", true, deck);
    
    assert.deepStrictEqual(result, ["event_a", "event_b"]); // Stays in deck
});

test('Process choice - explicit removeSelf=true', () => {
    const deck = ["event_a", "event_b"];
    const choice = { removeSelf: true };
    
    const result = processChoiceDeckOperations(choice, "event_a", true, deck);
    
    assert.deepStrictEqual(result, ["event_b"]);
});

test('Process choice - explicit removeSelf=false', () => {
    const deck = ["event_a", "event_b"];
    const choice = { removeSelf: false };
    
    const result = processChoiceDeckOperations(choice, "event_a", false, deck);
    
    assert.deepStrictEqual(result, ["event_a", "event_b"]);
});

test('Process choice - addSelf', () => {
    const deck = ["event_a"];
    const choice = { addSelf: true };
    
    const result = processChoiceDeckOperations(choice, "event_a", false, deck);
    
    assert.deepStrictEqual(result, ["event_a"]);
});

test('Process choice - addSelf with removeSelf', () => {
    const deck = ["event_a"];
    const choice = { addSelf: true, removeSelf: true };
    
    // addSelf takes precedence
    const result = processChoiceDeckOperations(choice, "event_a", false, deck);
    
    assert.deepStrictEqual(result, ["event_a"]);
});

test('Process choice - complex operation', () => {
    const deck = ["event_a", "event_b", "event_c"];
    const choice = {
        add: ["event_d", "event_e"],
        remove: ["event_b"],
        removeSelf: true
    };
    
    const result = processChoiceDeckOperations(choice, "event_a", false, deck);
    
    assert.deepStrictEqual(result, ["event_c", "event_d", "event_e"]);
});

