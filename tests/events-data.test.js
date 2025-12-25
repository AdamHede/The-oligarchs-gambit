/**
 * Event Data Integrity Tests
 * 
 * Tests that all events are valid and all references point to existing events
 */

import { test } from 'node:test';
import assert from 'node:assert';
import { validateEvent, validateAllEvents } from '../events/schema.js';
import { allStorylines } from '../storylines/index.js';
import { compileStorylines, getEventsArray } from '../engine/storyline-dsl.js';

const registry = compileStorylines(allStorylines);
const ALL_EVENTS = getEventsArray(registry);

test('All events pass schema validation', () => {
    const result = validateAllEvents(ALL_EVENTS);

    assert.strictEqual(result.valid, true, `Validation failed: ${result.errors.join('; ')}`);
    assert.strictEqual(result.errors.length, 0);
});

test('All event IDs are unique', () => {
    const ids = ALL_EVENTS.map(e => e.id);
    const uniqueIds = new Set(ids);

    assert.strictEqual(ids.length, uniqueIds.size, 'Duplicate event IDs found');
});

test('All event references point to existing events', () => {
    const allEventIds = new Set(ALL_EVENTS.map(e => e.id));
    const brokenRefs = [];

    ALL_EVENTS.forEach(event => {
        if (event.choices) {
            event.choices.forEach((choice, choiceIndex) => {
                // Check add references
                const addRefs = choice.add || [];
                if (choice.addToPool) {
                    brokenRefs.push(`Event "${event.id}" choice ${choiceIndex} uses legacy "addToPool" - rename to "add"`);
                }

                addRefs.forEach(refId => {
                    if (!allEventIds.has(refId)) {
                        brokenRefs.push(`Event "${event.id}" choice ${choiceIndex} references missing event "${refId}" in add`);
                    }
                });

                // Check remove references
                const removeRefs = choice.remove || [];
                if (choice.removeFromPool) {
                    brokenRefs.push(`Event "${event.id}" choice ${choiceIndex} uses legacy "removeFromPool" - rename to "remove"`);
                }

                removeRefs.forEach(refId => {
                    if (!allEventIds.has(refId)) {
                        brokenRefs.push(`Event "${event.id}" choice ${choiceIndex} references missing event "${refId}" in remove`);
                    }
                });
            });
        }
    });

    assert.strictEqual(brokenRefs.length, 0, `Broken references found:\n${brokenRefs.join('\n')}`);
});

test('All events have required fields', () => {
    const missingFields = [];

    ALL_EVENTS.forEach(event => {
        if (!event.id) missingFields.push(`Event missing id`);
        if (!event.title) missingFields.push(`Event "${event.id || 'unknown'}" missing title`);
        if (!event.description) missingFields.push(`Event "${event.id || 'unknown'}" missing description`);
        if (!event.choices || !Array.isArray(event.choices) || event.choices.length === 0) {
            missingFields.push(`Event "${event.id || 'unknown'}" missing choices`);
        }
    });

    assert.strictEqual(missingFields.length, 0, `Missing required fields:\n${missingFields.join('\n')}`);
});

test('All choices have text field', () => {
    const missingText = [];

    ALL_EVENTS.forEach(event => {
        if (event.choices) {
            event.choices.forEach((choice, choiceIndex) => {
                if (!choice.text || typeof choice.text !== 'string') {
                    missingText.push(`Event "${event.id}" choice ${choiceIndex} missing text`);
                }
            });
        }
    });

    assert.strictEqual(missingText.length, 0, `Choices missing text:\n${missingText.join('\n')}`);
});

test('No events have weight < 0', () => {
    const invalidWeights = [];

    ALL_EVENTS.forEach(event => {
        if (event.weight !== undefined && (typeof event.weight !== 'number' || event.weight < 0)) {
            invalidWeights.push(`Event "${event.id}" has invalid weight: ${event.weight}`);
        }
    });

    assert.strictEqual(invalidWeights.length, 0, `Invalid weights:\n${invalidWeights.join('\n')}`);
});

test('All events have valid storylines array (if present)', () => {
    const invalidStorylines = [];

    ALL_EVENTS.forEach(event => {
        if (event.storylines !== undefined && !Array.isArray(event.storylines)) {
            invalidStorylines.push(`Event "${event.id}" has invalid storylines (not an array)`);
        }
        // Also check old format (storyline as string or null)
        if (event.storyline !== undefined && event.storyline !== null && typeof event.storyline !== 'string') {
            invalidStorylines.push(`Event "${event.id}" has invalid storyline (should be string, null, or array)`);
        }
    });

    assert.strictEqual(invalidStorylines.length, 0, `Invalid storylines:\n${invalidStorylines.join('\n')}`);
});

test('Event count is reasonable', () => {
    // Basic sanity check - we should have events
    assert.ok(ALL_EVENTS.length > 0, 'No events found');
    assert.ok(ALL_EVENTS.length < 1000, 'Suspiciously large number of events');
});

