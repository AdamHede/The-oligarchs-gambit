/**
 * Game Engine - Integration Tests
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { GameEngineV2 as GameEngine } from '../engine/game-engine.js';

// Test events
const TEST_EVENTS = [
    {
        id: "test_event_1",
        title: "Test Event 1",
        description: "First test event",
        recurring: false,
        weight: 1,
        conditions: {},
        choices: [
            {
                text: "Choice 1",
                effects: {
                    stats: { treasury: -100, anger: 10 }
                },
                add: ["test_event_2"],
                remove: []
            }
        ]
    },
    {
        id: "test_event_2",
        title: "Test Event 2",
        description: "Second test event",
        recurring: false,
        weight: 1,
        conditions: {
            flags: { "event_1_completed": true }
        },
        choices: [
            {
                text: "Choice 1",
                effects: {
                    stats: { treasury: -50 }
                },
                add: [],
                remove: []
            }
        ]
    },
    {
        id: "test_event_recurring",
        title: "Recurring Event",
        description: "This event recurs",
        recurring: true,
        weight: 1,
        conditions: {},
        choices: [
            {
                text: "Do something",
                effects: {
                    stats: { treasury: -10 }
                },
                add: [],
                removeSelf: false
            }
        ]
    },
    {
        id: "test_event_conditional",
        title: "Conditional Event",
        description: "Requires treasury >= 500",
        recurring: false,
        weight: 1,
        conditions: {
            stats: { treasury: { gte: 500 } }
        },
        choices: [
            {
                text: "Choice",
                effects: {},
                add: [],
                remove: []
            }
        ]
    }
];

test('Create engine with events', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    assert.strictEqual(engine.allEvents.length, TEST_EVENTS.length);
    assert.ok(engine.state.deck.length > 0);
});

test('Draw event from deck', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const event = engine.drawNextEvent();
    
    assert.ok(event);
    assert.ok(event.id);
    assert.ok(event.title);
    assert.ok(event.choices);
    assert.strictEqual(engine.currentEvent, event);
});

test('Make choice - apply effects', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    // Force specific event into deck
    engine.state.deck = ["test_event_1"];
    const event = engine.drawNextEvent();
    const initialTreasury = engine.state.stats.treasury;
    const initialAnger = engine.state.stats.anger;
    
    const result = engine.makeChoice(0);
    
    // test_event_1 choice 0 has: treasury: -100, anger: 10
    assert.strictEqual(engine.state.stats.treasury, initialTreasury - 100);
    assert.strictEqual(engine.state.stats.anger, initialAnger + 10);
    assert.ok(result.deckSize >= 0);
});

test('Make choice - deck operations', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const initialDeckSize = engine.state.deck.length;
    const event = engine.drawNextEvent();
    
    if (event.id === "test_event_1") {
        const result = engine.makeChoice(0);
        // Should add test_event_2 to deck
        assert.ok(result.deckSize >= initialDeckSize);
        assert.ok(engine.state.deck.includes("test_event_2"));
    }
});

test('Make choice - remove self for non-recurring', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const event = engine.drawNextEvent();
    const eventId = event.id;
    const wasInDeck = engine.state.deck.includes(eventId);
    
    engine.makeChoice(0);
    
    if (!event.recurring && wasInDeck) {
        assert.ok(!engine.state.deck.includes(eventId));
    }
});

test('Make choice - keep self for recurring', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    // Force recurring event into deck
    engine.state.deck = ["test_event_recurring"];
    const event = engine.drawNextEvent();
    
    assert.strictEqual(event.id, "test_event_recurring");
    
    engine.makeChoice(0);
    
    // Recurring event should stay in deck
    assert.ok(engine.state.deck.includes("test_event_recurring"));
});

test('Make choice - advance time', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const initialQuarter = engine.state.quarter;
    const initialYear = engine.state.year;
    
    const event = engine.drawNextEvent();
    engine.makeChoice(0);
    
    assert.strictEqual(engine.state.quarter, initialQuarter + 1);
    assert.strictEqual(engine.state.year, initialQuarter === 4 ? initialYear + 1 : initialYear);
});

test('Make choice - add history entry', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const initialHistoryLength = engine.state.history.length;
    const event = engine.drawNextEvent();
    
    engine.makeChoice(0);
    
    assert.strictEqual(engine.state.history.length, initialHistoryLength + 1);
    assert.strictEqual(engine.state.history[engine.state.history.length - 1].event, event.id);
    assert.strictEqual(engine.state.history[engine.state.history.length - 1].choice, 0);
});

test('Make choice - auto-counters', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const event = engine.drawNextEvent();
    const eventId = event.id;
    
    engine.makeChoice(0);
    
    assert.strictEqual(engine.state.counters[`event:${eventId}`], 1);
    assert.strictEqual(engine.state.counters[`choice:${eventId}_0`], 1);
});

test('Game over - elite <= 0', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 0, anger: 10 }
    });
    
    const gameOver = engine.checkGameOver();
    
    assert.ok(gameOver);
    assert.ok(gameOver.reason.includes("Elite"));
});

test('Game over - anger >= 100', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 100 }
    });
    
    const gameOver = engine.checkGameOver();
    
    assert.ok(gameOver);
    assert.ok(gameOver.reason.includes("Revolution"));
});

test('Game over - treasury <= 0', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 0, elite: 90, anger: 10 }
    });
    
    const gameOver = engine.checkGameOver();
    
    assert.ok(gameOver);
    assert.ok(gameOver.reason.includes("Bankruptcy"));
});

test('Game over - no game over', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 500, elite: 50, anger: 50 }
    });
    
    const gameOver = engine.checkGameOver();
    
    assert.strictEqual(gameOver, null);
});

test('Get state - returns copy', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const state1 = engine.getState();
    state1.stats.treasury = 9999;
    
    const state2 = engine.getState();
    assert.notStrictEqual(state2.stats.treasury, 9999);
});

test('Get eligible events', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const eligible = engine.getEligibleEvents();
    
    assert.ok(Array.isArray(eligible));
    assert.ok(eligible.length > 0);
});

test('Multi-turn simulation - no crashes', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    let turns = 0;
    const maxTurns = 10;
    
    while (turns < maxTurns) {
        const gameOver = engine.checkGameOver();
        if (gameOver) break;
        
        const event = engine.drawNextEvent();
        if (!event) break;
        
        const choiceIndex = 0; // Always pick first choice
        engine.makeChoice(choiceIndex);
        
        turns++;
    }
    
    assert.ok(turns > 0);
    assert.ok(engine.state.history.length === turns);
});

test('Multi-turn simulation - state consistency', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    for (let i = 0; i < 5; i++) {
        const gameOver = engine.checkGameOver();
        if (gameOver) break;
        
        const event = engine.drawNextEvent();
        if (!event) break;
        
        engine.makeChoice(0);
        
        // Verify state bounds
        assert.ok(engine.state.stats.treasury >= 0);
        assert.ok(engine.state.stats.anger >= 0 && engine.state.stats.anger <= 100);
        assert.ok(engine.state.stats.elite >= 0 && engine.state.stats.elite <= 100);
        assert.ok(engine.state.quarter >= 1 && engine.state.quarter <= 4);
        assert.ok(engine.state.year >= 1);
    }
});

test('Error handling - invalid choice index', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    const event = engine.drawNextEvent();
    
    assert.throws(() => {
        engine.makeChoice(999); // Invalid choice index
    }, /Invalid choice index/);
});

test('Error handling - no current event', () => {
    const engine = new GameEngine(TEST_EVENTS, {
        stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 }
    });
    
    assert.throws(() => {
        engine.makeChoice(0);
    }, /No current event/);
});

