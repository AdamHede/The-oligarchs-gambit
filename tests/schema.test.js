/**
 * Schema Validation Tests
 */

const { test } = require('node:test');
const assert = require('node:assert');
const { validateEvent, validateAllEvents } = require('../events/schema');

test('Valid event - minimal', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: [
            { text: "Choice 1" }
        ]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.errors.length, 0);
});

test('Valid event - full featured', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        recurring: false,
        weight: 5,
        tags: ["test"],
        storylines: ["test-storyline"],
        conditions: {
            stats: { treasury: { gte: 100 } }
        },
        choices: [
            {
                text: "Choice 1",
                effects: {
                    stats: { treasury: -50 }
                },
                add: ["other_event"],
                remove: []
            }
        ]
    };
    
    const allEventIds = new Set(["test_event", "other_event"]);
    const result = validateEvent(event, allEventIds);
    
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.errors.length, 0);
});

test('Invalid event - missing id', () => {
    const event = {
        title: "Test Event",
        description: "Test description",
        choices: [{ text: "Choice 1" }]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('id')));
});

test('Invalid event - missing title', () => {
    const event = {
        id: "test_event",
        description: "Test description",
        choices: [{ text: "Choice 1" }]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('title')));
});

test('Invalid event - missing description', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        choices: [{ text: "Choice 1" }]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('description')));
});

test('Invalid event - no choices', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: []
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('choice')));
});

test('Invalid event - too many choices', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: [
            { text: "Choice 1" },
            { text: "Choice 2" },
            { text: "Choice 3" },
            { text: "Choice 4" },
            { text: "Choice 5" }
        ]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('4 choices')));
});

test('Invalid event - choice missing text', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: [
            { text: "Choice 1" },
            {} // Missing text
        ]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('choice') && e.includes('text')));
});

test('Invalid event - invalid weight', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        weight: -5, // Invalid: negative
        choices: [{ text: "Choice 1" }]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('weight')));
});

test('Invalid event - invalid storylines (not array)', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        storylines: "not-an-array",
        choices: [{ text: "Choice 1" }]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('storylines')));
});

test('Invalid event - invalid tags (not array)', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        tags: "not-an-array",
        choices: [{ text: "Choice 1" }]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('tags')));
});

test('Invalid event - broken reference in add', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: [
            {
                text: "Choice 1",
                add: ["nonexistent_event"]
            }
        ]
    };
    
    const allEventIds = new Set(["test_event"]); // nonexistent_event not included
    const result = validateEvent(event, allEventIds);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('nonexistent_event') && e.includes('add')));
});

test('Invalid event - broken reference in remove', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: [
            {
                text: "Choice 1",
                remove: ["nonexistent_event"]
            }
        ]
    };
    
    const allEventIds = new Set(["test_event"]);
    const result = validateEvent(event, allEventIds);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('nonexistent_event') && e.includes('remove')));
});

test('Invalid event - add not an array', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: [
            {
                text: "Choice 1",
                add: "not-an-array"
            }
        ]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('add') && e.includes('array')));
});

test('Invalid event - remove not an array', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: [
            {
                text: "Choice 1",
                remove: "not-an-array"
            }
        ]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('remove') && e.includes('array')));
});

test('Validate all events - duplicate IDs', () => {
    const events = [
        {
            id: "duplicate",
            title: "Event 1",
            description: "Description",
            choices: [{ text: "Choice" }]
        },
        {
            id: "duplicate",
            title: "Event 2",
            description: "Description",
            choices: [{ text: "Choice" }]
        }
    ];
    
    const result = validateAllEvents(events);
    
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors.some(e => e.includes('Duplicate event ID')));
});

test('Validate all events - valid events', () => {
    const events = [
        {
            id: "event_1",
            title: "Event 1",
            description: "Description",
            choices: [{ text: "Choice" }]
        },
        {
            id: "event_2",
            title: "Event 2",
            description: "Description",
            choices: [{ text: "Choice" }]
        }
    ];
    
    const result = validateAllEvents(events);
    
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.errors.length, 0);
});

test('Validate all events - warnings for orphaned events', () => {
    const events = [
        {
            id: "entry_event",
            title: "Entry",
            description: "Description",
            conditions: {},
            choices: [{ text: "Choice" }]
        },
        {
            id: "orphaned_event",
            title: "Orphaned",
            description: "Description",
            conditions: {
                flags: { "some_flag": true }
            },
            choices: [{ text: "Choice" }]
        }
    ];
    
    const result = validateAllEvents(events);
    
    assert.strictEqual(result.valid, true);
    assert.ok(result.warnings.length > 0);
    assert.ok(result.warnings.some(w => w.includes('orphaned')));
});

test('Valid event - 4 choices (maximum)', () => {
    const event = {
        id: "test_event",
        title: "Test Event",
        description: "Test description",
        choices: [
            { text: "Choice 1" },
            { text: "Choice 2" },
            { text: "Choice 3" },
            { text: "Choice 4" }
        ]
    };
    
    const result = validateEvent(event);
    
    assert.strictEqual(result.valid, true);
});

