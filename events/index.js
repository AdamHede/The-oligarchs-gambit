/**
 * Event System - Events Index
 * 
 * Combines all event files into a single export.
 * When creating new events, import them here.
 */

// Import all event files
import { WAR_EVENTS } from './events_war_military.js';
import { ENERGY_EVENTS } from './events_energy_pipeline.js';
import { SANCTIONS_EVENTS } from './events_sanctions_international.js';
import { SUCCESSION_EVENTS } from './events_succession_power.js';
import { SOCIAL_EVENTS } from './events_social_movements.js';
import { DOMESTIC_EVENTS } from './events_domestic_crisis.js';
import { MISC_EVENTS } from './events_misc.js';

// Example events (for reference and testing)
import { EXAMPLE_EVENTS } from './example.js';

/**
 * All events in the game
 */
const ALL_EVENTS = [
    ...WAR_EVENTS,
    ...ENERGY_EVENTS,
    ...SANCTIONS_EVENTS,
    ...SUCCESSION_EVENTS,
    ...SOCIAL_EVENTS,
    ...DOMESTIC_EVENTS,
    ...MISC_EVENTS,
    // ...EXAMPLE_EVENTS // Optional: exclude examples in production
];

export default ALL_EVENTS;
