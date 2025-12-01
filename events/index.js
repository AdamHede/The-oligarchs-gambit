/**
 * Event System - Events Index
 * 
 * Combines all event files into a single export.
 * When creating new events, import them here.
 */

// Example events (for reference and testing)
const EXAMPLE_EVENTS = require('./example');

// TODO: Import actual event files as they are created
// const WAR_INVASION_EVENTS = require('./war-invasion');
// const OLIGARCH_RIVALRY_EVENTS = require('./oligarch-rivalry');
// etc.

/**
 * All events in the game
 */
const ALL_EVENTS = [
    ...EXAMPLE_EVENTS,
    // ...WAR_INVASION_EVENTS,
    // ...OLIGARCH_RIVALRY_EVENTS,
    // Add more as they are created
];

module.exports = ALL_EVENTS;

