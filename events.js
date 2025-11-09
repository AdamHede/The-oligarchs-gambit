// The Oligarch's Gambit - v1.3
// Main Events File - Combines all event categories

// This file combines events from multiple categorized files for easier organization
// See the events/ directory for individual category files:
// - events_war_military.js (29 events)
// - events_energy_pipeline.js (12 events)
// - events_sanctions_international.js (11 events)
// - events_succession_power.js (13 events)
// - events_social_movements.js (11 events)
// - events_domestic_crisis.js (11 events)
// - events_misc.js (66 events)

const EVENTS = [
    ...WAR_MILITARY_EVENTS,
    ...ENERGY_PIPELINE_EVENTS,
    ...SANCTIONS_INTERNATIONAL_EVENTS,
    ...SUCCESSION_POWER_EVENTS,
    ...SOCIAL_MOVEMENTS_EVENTS,
    ...DOMESTIC_CRISIS_EVENTS,
    ...MISC_EVENTS
];

// Legacy achievements that can be earned
const LEGACY_ACHIEVEMENTS = {
    // Defined in events above
};
