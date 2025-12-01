/**
 * Condition Evaluator Tests
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { evaluateCondition, isEventEligible } from '../engine/condition-eval.js';

// Test state fixture
const createTestState = (overrides = {}) => ({
    stats: {
        treasury: 500,
        anger: 30,
        elite: 80,
        personalWealth: 10,
        ...overrides.stats
    },
    counters: {
        "choice:punish": 3,
        "event:test": 1,
        ...overrides.counters
    },
    flags: {
        "war_started": true,
        "peace_talks": false,
        ...overrides.flags
    }
});

test('Empty conditions return true', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({}, state), true);
    assert.strictEqual(evaluateCondition(null, state), true);
    assert.strictEqual(evaluateCondition(undefined, state), true);
});

test('Stat comparisons - eq', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ stats: { treasury: { eq: 500 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { eq: 100 } } }, state), false);
});

test('Stat comparisons - neq', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ stats: { treasury: { neq: 100 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { neq: 500 } } }, state), false);
});

test('Stat comparisons - gt', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ stats: { treasury: { gt: 400 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { gt: 500 } } }, state), false);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { gt: 600 } } }, state), false);
});

test('Stat comparisons - gte', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ stats: { treasury: { gte: 500 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { gte: 400 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { gte: 600 } } }, state), false);
});

test('Stat comparisons - lt', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ stats: { treasury: { lt: 600 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { lt: 500 } } }, state), false);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { lt: 400 } } }, state), false);
});

test('Stat comparisons - lte', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ stats: { treasury: { lte: 500 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { lte: 600 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { lte: 400 } } }, state), false);
});

test('Stat comparisons - between', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ stats: { treasury: { between: [400, 600] } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { between: [500, 600] } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { between: [600, 700] } } }, state), false);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { between: [300, 400] } } }, state), false);
});

test('Stat comparisons - edge cases', () => {
    const state = createTestState({ stats: { treasury: 0, anger: -5 } });
    assert.strictEqual(evaluateCondition({ stats: { treasury: { eq: 0 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { gte: 0 } } }, state), true);
    assert.strictEqual(evaluateCondition({ stats: { treasury: { lt: 0 } } }, state), false);
    assert.strictEqual(evaluateCondition({ stats: { anger: { lt: 0 } } }, state), true);
});

test('Stat comparisons - missing stat', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ stats: { missingStat: { gte: 100 } } }, state), false);
});

test('Flag checks - true', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ flags: { "war_started": true } }, state), true);
    assert.strictEqual(evaluateCondition({ flags: { "peace_talks": true } }, state), false);
});

test('Flag checks - false', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ flags: { "peace_talks": false } }, state), true);
    assert.strictEqual(evaluateCondition({ flags: { "war_started": false } }, state), false);
});

test('Flag checks - missing flag', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ flags: { "missing_flag": true } }, state), false);
    assert.strictEqual(evaluateCondition({ flags: { "missing_flag": false } }, state), true);
});

test('Counter comparisons', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ counters: { "choice:punish": { gte: 2 } } }, state), true);
    assert.strictEqual(evaluateCondition({ counters: { "choice:punish": { gte: 5 } } }, state), false);
    assert.strictEqual(evaluateCondition({ counters: { "choice:punish": { eq: 3 } } }, state), true);
});

test('Counter comparisons - missing counter', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ counters: { "missing:counter": { gte: 1 } } }, state), false);
    assert.strictEqual(evaluateCondition({ counters: { "missing:counter": { gte: 0 } } }, state), true);
});

test('AND logic - all', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({
        all: [
            { stats: { treasury: { gte: 400 } } },
            { flags: { "war_started": true } }
        ]
    }, state), true);

    assert.strictEqual(evaluateCondition({
        all: [
            { stats: { treasury: { gte: 400 } } },
            { flags: { "peace_talks": true } }
        ]
    }, state), false);
});

test('AND logic - empty array', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ all: [] }, state), true);
});

test('OR logic - any', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({
        any: [
            { stats: { treasury: { lt: 100 } } },
            { flags: { "war_started": true } }
        ]
    }, state), true);

    assert.strictEqual(evaluateCondition({
        any: [
            { stats: { treasury: { lt: 100 } } },
            { flags: { "peace_talks": true } }
        ]
    }, state), false);
});

test('OR logic - empty array', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({ any: [] }, state), false);
});

test('NOT logic', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({
        not: { flags: { "peace_talks": true } }
    }, state), true);

    assert.strictEqual(evaluateCondition({
        not: { flags: { "war_started": true } }
    }, state), false);
});

test('Complex nested conditions', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({
        all: [
            { stats: { anger: { lt: 50 } } },
            { any: [
                { counters: { "choice:punish": { gte: 3 } } },
                { flags: { "peace_talks": true } }
            ]},
            { not: { stats: { elite: { lt: 50 } } } }
        ]
    }, state), true);

    assert.strictEqual(evaluateCondition({
        all: [
            { stats: { anger: { lt: 50 } } },
            { any: [
                { counters: { "choice:punish": { gte: 5 } } },
                { flags: { "peace_talks": true } }
            ]},
            { not: { stats: { elite: { lt: 50 } } } }
        ]
    }, state), false);
});

test('Deeply nested conditions (3+ levels)', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({
        all: [
            { any: [
                { all: [
                    { stats: { treasury: { gte: 400 } } },
                    { flags: { "war_started": true } }
                ]}
            ]}
        ]
    }, state), true);
});

test('Multiple stats implicit AND', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({
        stats: {
            treasury: { gte: 400 },
            anger: { lt: 50 }
        }
    }, state), true);

    assert.strictEqual(evaluateCondition({
        stats: {
            treasury: { gte: 400 },
            anger: { lt: 20 }
        }
    }, state), false);
});

test('Multiple flags implicit AND', () => {
    const state = createTestState();
    assert.strictEqual(evaluateCondition({
        flags: {
            "war_started": true,
            "peace_talks": false
        }
    }, state), true);

    assert.strictEqual(evaluateCondition({
        flags: {
            "war_started": true,
            "peace_talks": true
        }
    }, state), false);
});

test('isEventEligible helper', () => {
    const state = createTestState();
    const event1 = { id: "test1", conditions: { stats: { treasury: { gte: 400 } } } };
    const event2 = { id: "test2", conditions: { stats: { treasury: { gte: 600 } } } };
    const event3 = { id: "test3" }; // No conditions

    assert.strictEqual(isEventEligible(event1, state), true);
    assert.strictEqual(isEventEligible(event2, state), false);
    assert.strictEqual(isEventEligible(event3, state), true);
});

test('Invalid condition format returns false', () => {
    const state = createTestState();
    // Invalid: stat name is not a string
    assert.strictEqual(evaluateCondition({ stat: 123 }, state), false);
    // Invalid: flag name is not a string
    assert.strictEqual(evaluateCondition({ flag: true }, state), false);
});

