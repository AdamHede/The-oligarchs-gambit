/**
 * Engine Entry Point
 *
 * Single entry point for all engine modules
 */

// Core game engine (legacy format support)
export { GameEngineV2 } from './game-engine.js';
export { createInitialState, addHistoryEntry, advanceTime, getDefaultStatBounds } from './game-state.js';
export { evaluateCondition, evaluateComparison, isEventEligible } from './condition-eval.js';
export { addToDeck, removeFromDeck, drawEvent, processChoiceDeckOperations } from './deck-manager.js';
export { applyEffects, applyAutoCounters, applyStatChanges, applyCounterChanges, applyFlagChanges } from './effect-applier.js';

// New storyline system
export { defineStoryline, event, choice, eventRef, compileStorylines, getEventsArray } from './storyline-dsl.js';
export { EventTracker, EventStatus, createEventTracker, getEventStatusHelper } from './event-tracker.js';
export { StorylineEngine, createStorylineEngine } from './storyline-engine.js';

// Global event status access (for use throughout the game)
export { events, eventConditions, initEventStatus, clearEventStatus } from './event-status.js';

