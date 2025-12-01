/**
 * Format Conversion Tests
 * 
 * Tests the conversion from old event format to new v2 format
 */

import { test } from 'node:test';
import assert from 'node:assert';

// Extract conversion logic for testing
function convertEvents(events) {
    return events.map(event => {
        const converted = { ...event };
        
        // Convert choices
        if (converted.choices) {
            converted.choices = converted.choices.map(choice => {
                const newChoice = { ...choice };
                
                // Convert effects format
                if (newChoice.effects) {
                    // Check if it's already in new format
                    if (newChoice.effects.stats || newChoice.effects.counters || newChoice.effects.flags) {
                        // Already new format
                        return newChoice;
                    }
                    
                    // Old format - convert to new format
                    const stats = {};
                    const counters = {};
                    const flags = {};
                    let legacy = null;
                    
                    for (const [key, value] of Object.entries(newChoice.effects)) {
                        if (key === 'legacy') {
                            legacy = value;
                        } else if (typeof value === 'boolean') {
                            flags[key] = value;
                        } else if (typeof value === 'number') {
                            // Check if it's a stat or counter
                            if (['personalWealth', 'treasury', 'elite', 'anger'].includes(key)) {
                                stats[key] = value;
                            } else {
                                counters[key] = value;
                            }
                        }
                    }
                    
                    newChoice.effects = {};
                    if (Object.keys(stats).length > 0) newChoice.effects.stats = stats;
                    if (Object.keys(counters).length > 0) newChoice.effects.counters = counters;
                    if (Object.keys(flags).length > 0) newChoice.effects.flags = flags;
                    if (legacy) newChoice.effects.legacy = legacy;
                }
                
                // Convert addToPool/removeFromPool to add/remove
                if (newChoice.addToPool) {
                    newChoice.add = newChoice.addToPool;
                    delete newChoice.addToPool;
                }
                if (newChoice.removeFromPool) {
                    newChoice.remove = newChoice.removeFromPool;
                    delete newChoice.removeFromPool;
                }
                
                return newChoice;
            });
        }
        
        // Convert storyline (singular) to storylines (array)
        if (converted.storyline && !converted.storylines) {
            converted.storylines = [converted.storyline];
            delete converted.storyline;
        }
        
        return converted;
    });
}

test('Convert addToPool to add', () => {
    const oldEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1",
                addToPool: ["event_a", "event_b"]
            }
        ]
    };
    
    const converted = convertEvents([oldEvent]);
    
    assert.ok(!converted[0].choices[0].addToPool);
    assert.deepStrictEqual(converted[0].choices[0].add, ["event_a", "event_b"]);
});

test('Convert removeFromPool to remove', () => {
    const oldEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1",
                removeFromPool: ["event_a"]
            }
        ]
    };
    
    const converted = convertEvents([oldEvent]);
    
    assert.ok(!converted[0].choices[0].removeFromPool);
    assert.deepStrictEqual(converted[0].choices[0].remove, ["event_a"]);
});

test('Convert storyline (string) to storylines (array)', () => {
    const oldEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        storyline: "war-invasion",
        choices: [{ text: "Choice 1" }]
    };
    
    const converted = convertEvents([oldEvent]);
    
    assert.ok(!converted[0].storyline);
    assert.deepStrictEqual(converted[0].storylines, ["war-invasion"]);
});

test('Convert direct stat effects to effects.stats', () => {
    const oldEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1",
                effects: {
                    personalWealth: 10,
                    treasury: -50,
                    elite: 5,
                    anger: 10
                }
            }
        ]
    };
    
    const converted = convertEvents([oldEvent]);
    
    assert.deepStrictEqual(converted[0].choices[0].effects.stats, {
        personalWealth: 10,
        treasury: -50,
        elite: 5,
        anger: 10
    });
    assert.ok(!converted[0].choices[0].effects.personalWealth);
});

test('Convert boolean effects to effects.flags', () => {
    const oldEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1",
                effects: {
                    war_started: true,
                    peace_talks: false
                }
            }
        ]
    };
    
    const converted = convertEvents([oldEvent]);
    
    assert.deepStrictEqual(converted[0].choices[0].effects.flags, {
        war_started: true,
        peace_talks: false
    });
});

test('Convert numeric non-stat effects to effects.counters', () => {
    const oldEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1",
                effects: {
                    customCounter: 5,
                    anotherCounter: -2
                }
            }
        ]
    };
    
    const converted = convertEvents([oldEvent]);
    
    assert.deepStrictEqual(converted[0].choices[0].effects.counters, {
        customCounter: 5,
        anotherCounter: -2
    });
});

test('Preserve legacy in effects', () => {
    const legacy = { icon: "⚔️", name: "Warmonger", weight: -10 };
    const oldEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1",
                effects: {
                    personalWealth: 10,
                    legacy: legacy
                }
            }
        ]
    };
    
    const converted = convertEvents([oldEvent]);
    
    assert.deepStrictEqual(converted[0].choices[0].effects.legacy, legacy);
    assert.deepStrictEqual(converted[0].choices[0].effects.stats, { personalWealth: 10 });
});

test('Already new format is not modified', () => {
    const newEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1",
                effects: {
                    stats: { treasury: 100 },
                    flags: { war_started: true }
                },
                add: ["event_a"]
            }
        ],
        storylines: ["war-invasion"]
    };
    
    const converted = convertEvents([newEvent]);
    
    // Should remain unchanged
    assert.deepStrictEqual(converted[0].choices[0].effects.stats, { treasury: 100 });
    assert.deepStrictEqual(converted[0].choices[0].effects.flags, { war_started: true });
    assert.deepStrictEqual(converted[0].choices[0].add, ["event_a"]);
    assert.deepStrictEqual(converted[0].storylines, ["war-invasion"]);
});

test('Mixed old and new format in same event', () => {
    const mixedEvent = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1 (old)",
                effects: {
                    treasury: 100
                },
                addToPool: ["event_a"]
            },
            {
                text: "Choice 2 (new)",
                effects: {
                    stats: { treasury: 50 }
                },
                add: ["event_b"]
            }
        ]
    };
    
    const converted = convertEvents([mixedEvent]);
    
    // First choice should be converted
    assert.deepStrictEqual(converted[0].choices[0].effects.stats, { treasury: 100 });
    assert.deepStrictEqual(converted[0].choices[0].add, ["event_a"]);
    assert.ok(!converted[0].choices[0].addToPool);
    
    // Second choice should remain unchanged
    assert.deepStrictEqual(converted[0].choices[1].effects.stats, { treasury: 50 });
    assert.deepStrictEqual(converted[0].choices[1].add, ["event_b"]);
});

test('Empty effects object is preserved', () => {
    const event = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1",
                effects: {}
            }
        ]
    };
    
    const converted = convertEvents([event]);
    
    assert.deepStrictEqual(converted[0].choices[0].effects, {});
});

test('No effects property is preserved', () => {
    const event = {
        id: "test_event",
        title: "Test",
        description: "Test",
        choices: [
            {
                text: "Choice 1"
            }
        ]
    };
    
    const converted = convertEvents([event]);
    
    assert.ok(!converted[0].choices[0].effects);
});

