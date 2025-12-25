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
import { RELIGIOUS_EVENTS } from './events_religious_revival.js';
import { SHADOW_WAR_EVENTS } from './events_shadow_war.js';
import { MISC_EVENTS } from './events_misc.js';
import { BASIC_RECURRING_EVENTS } from './events_basic_recurring.js';

/**
 * All events in the game
 * Note: This file is kept for tools and tests. The main game now uses storylines.
 */
const ALL_EVENTS = [
    ...WAR_EVENTS,
    ...ENERGY_EVENTS,
    ...SANCTIONS_EVENTS,
    ...SUCCESSION_EVENTS,
    ...SOCIAL_EVENTS,
    ...DOMESTIC_EVENTS,
    ...RELIGIOUS_EVENTS,
    ...SHADOW_WAR_EVENTS,
    ...MISC_EVENTS,
    ...BASIC_RECURRING_EVENTS,
];

export default ALL_EVENTS;
