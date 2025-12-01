/**
 * Effect Applier Tests
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { applyEffects, applyAutoCounters } from '../engine/effect-applier.js';

test('Stat changes - positive', () => {
    const state = {
        stats: { treasury: 500, anger: 30 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 },
        anger: { min: 0, max: 100 }
    };

    applyEffects(state, {
        stats: { treasury: 100, anger: 20 }
    }, statBounds);

    assert.strictEqual(state.stats.treasury, 600);
    assert.strictEqual(state.stats.anger, 50);
});

test('Stat changes - negative', () => {
    const state = {
        stats: { treasury: 500, anger: 30 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 },
        anger: { min: 0, max: 100 }
    };

    applyEffects(state, {
        stats: { treasury: -100, anger: -10 }
    }, statBounds);

    assert.strictEqual(state.stats.treasury, 400);
    assert.strictEqual(state.stats.anger, 20);
});

test('Stat changes - bounds clamping (max)', () => {
    const state = {
        stats: { anger: 95 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        anger: { min: 0, max: 100 }
    };

    applyEffects(state, {
        stats: { anger: 20 }
    }, statBounds);

    assert.strictEqual(state.stats.anger, 100);
});

test('Stat changes - bounds clamping (min)', () => {
    const state = {
        stats: { treasury: 50 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 }
    };

    applyEffects(state, {
        stats: { treasury: -100 }
    }, statBounds);

    assert.strictEqual(state.stats.treasury, 0);
});

test('Stat changes - multiple stats', () => {
    const state = {
        stats: { treasury: 500, anger: 30, elite: 80 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 },
        anger: { min: 0, max: 100 },
        elite: { min: 0, max: 100 }
    };

    applyEffects(state, {
        stats: { treasury: -100, anger: 20, elite: -10 }
    }, statBounds);

    assert.strictEqual(state.stats.treasury, 400);
    assert.strictEqual(state.stats.anger, 50);
    assert.strictEqual(state.stats.elite, 70);
});

test('Stat changes - missing stat in state', () => {
    const state = {
        stats: { treasury: 500 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 },
        anger: { min: 0, max: 100 }
    };

    applyEffects(state, {
        stats: { anger: 20 }
    }, statBounds);

    assert.strictEqual(state.stats.anger, 20);
});

test('Counter operations - increment', () => {
    const state = {
        stats: {},
        counters: { "custom:test": 5 },
        flags: {}
    };

    applyEffects(state, {
        counters: { "custom:test": 3 }
    });

    assert.strictEqual(state.counters["custom:test"], 8);
});

test('Counter operations - decrement', () => {
    const state = {
        stats: {},
        counters: { "custom:test": 5 },
        flags: {}
    };

    applyEffects(state, {
        counters: { "custom:test": -2 }
    });

    assert.strictEqual(state.counters["custom:test"], 3);
});

test('Counter operations - missing counter', () => {
    const state = {
        stats: {},
        counters: {},
        flags: {}
    };

    applyEffects(state, {
        counters: { "custom:new": 5 }
    });

    assert.strictEqual(state.counters["custom:new"], 5);
});

test('Counter operations - multiple counters', () => {
    const state = {
        stats: {},
        counters: { "counter:a": 1, "counter:b": 2 },
        flags: {}
    };

    applyEffects(state, {
        counters: { "counter:a": 3, "counter:b": -1, "counter:c": 5 }
    });

    assert.strictEqual(state.counters["counter:a"], 4);
    assert.strictEqual(state.counters["counter:b"], 1);
    assert.strictEqual(state.counters["counter:c"], 5);
});

test('Flag operations - set true', () => {
    const state = {
        stats: {},
        counters: {},
        flags: {}
    };

    applyEffects(state, {
        flags: { "test_flag": true }
    });

    assert.strictEqual(state.flags["test_flag"], true);
});

test('Flag operations - set false', () => {
    const state = {
        stats: {},
        counters: {},
        flags: { "test_flag": true }
    };

    applyEffects(state, {
        flags: { "test_flag": false }
    });

    assert.strictEqual(state.flags["test_flag"], false);
});

test('Flag operations - multiple flags', () => {
    const state = {
        stats: {},
        counters: {},
        flags: { "flag1": false, "flag2": true }
    };

    applyEffects(state, {
        flags: { "flag1": true, "flag2": false, "flag3": true }
    });

    assert.strictEqual(state.flags["flag1"], true);
    assert.strictEqual(state.flags["flag2"], false);
    assert.strictEqual(state.flags["flag3"], true);
});

test('Combined effects - stats, counters, flags', () => {
    const state = {
        stats: { treasury: 500 },
        counters: { "custom:test": 1 },
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 }
    };

    applyEffects(state, {
        stats: { treasury: -100 },
        counters: { "custom:test": 2 },
        flags: { "test_flag": true }
    }, statBounds);

    assert.strictEqual(state.stats.treasury, 400);
    assert.strictEqual(state.counters["custom:test"], 3);
    assert.strictEqual(state.flags["test_flag"], true);
});

test('Auto-counters - event draw', () => {
    const state = {
        stats: {},
        counters: {},
        flags: {}
    };

    applyAutoCounters(state, "test_event", 0);
    assert.strictEqual(state.counters["event:test_event"], 1);

    applyAutoCounters(state, "test_event", 0);
    assert.strictEqual(state.counters["event:test_event"], 2);
});

test('Auto-counters - choice selection', () => {
    const state = {
        stats: {},
        counters: {},
        flags: {}
    };

    applyAutoCounters(state, "test_event", 0);
    assert.strictEqual(state.counters["choice:test_event_0"], 1);

    applyAutoCounters(state, "test_event", 1);
    assert.strictEqual(state.counters["choice:test_event_1"], 1);
    assert.strictEqual(state.counters["choice:test_event_0"], 1);
});

test('Auto-counters - both event and choice', () => {
    const state = {
        stats: {},
        counters: {},
        flags: {}
    };

    applyAutoCounters(state, "test_event", 2);

    assert.strictEqual(state.counters["event:test_event"], 1);
    assert.strictEqual(state.counters["choice:test_event_2"], 1);
});

test('Empty effects', () => {
    const state = {
        stats: { treasury: 500 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 }
    };

    const result = applyEffects(state, {}, statBounds);
    assert.strictEqual(result, null);
    assert.strictEqual(state.stats.treasury, 500);
});

test('Null/undefined effects', () => {
    const state = {
        stats: { treasury: 500 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 }
    };

    assert.strictEqual(applyEffects(state, null, statBounds), null);
    assert.strictEqual(applyEffects(state, undefined, statBounds), null);
    assert.strictEqual(state.stats.treasury, 500);
});

test('Legacy achievement returned', () => {
    const state = {
        stats: {},
        counters: {},
        flags: {}
    };

    const legacy = {
        icon: "⚔️",
        name: "Warmonger",
        weight: -10
    };

    const result = applyEffects(state, {
        legacy
    });

    assert.deepStrictEqual(result, legacy);
});

test('Extreme values - large positive', () => {
    const state = {
        stats: { treasury: 500 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 }
    };

    applyEffects(state, {
        stats: { treasury: 10000 }
    }, statBounds);

    assert.strictEqual(state.stats.treasury, 2000); // Clamped
});

test('Extreme values - large negative', () => {
    const state = {
        stats: { treasury: 500 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 }
    };

    applyEffects(state, {
        stats: { treasury: -10000 }
    }, statBounds);

    assert.strictEqual(state.stats.treasury, 0); // Clamped
});

test('Invalid effect types ignored', () => {
    const state = {
        stats: { treasury: 500 },
        counters: {},
        flags: {}
    };
    const statBounds = {
        treasury: { min: 0, max: 2000 }
    };

    applyEffects(state, {
        stats: { treasury: "invalid" },
        counters: { "test": "invalid" },
        flags: { "test": "invalid" }
    }, statBounds);

    assert.strictEqual(state.stats.treasury, 500); // Unchanged
});

