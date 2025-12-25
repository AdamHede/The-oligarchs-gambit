/**
 * Storylines Index - Schema & Template
 *
 * This file shows the structure for registering storylines.
 * When creating new storylines, follow this pattern.
 */

// ==============================================================================
// STEP 1: Import your storyline files
// ==============================================================================
// import myStoryline from './my-storyline.storyline.js';
// import anotherStoryline from './another-storyline.storyline.js';

// ==============================================================================
// STEP 2: Export individual storylines (optional, for selective imports)
// ==============================================================================
// export {
//     myStoryline,
//     anotherStoryline
// };

// ==============================================================================
// STEP 3: Export array of all storylines (required for game initialization)
// ==============================================================================
// export const allStorylines = [
//     myStoryline,
//     anotherStoryline
// ];

// ==============================================================================
// STEP 4: Define metadata for UI theming and behavior
// ==============================================================================
// export const storylineMetadata = {
//     'my-storyline': {
//         name: 'Display Name',
//         description: 'Short tagline for this storyline',
//         entryWeight: 10,  // Higher = more likely to appear early (0 = triggered only)
//         theme: {
//             borderColor: '#RRGGBB',  // Card border color
//             accentColor: '#RRGGBB'   // Card accent/highlight color
//         }
//     }
// };

// ==============================================================================
// STORYLINE FILE STRUCTURE (.storyline.js)
// ==============================================================================
// Each storyline file should export an array of events like this:
//
// export default [
//     {
//         id: "unique_event_id",
//         title: "Event Title (2-6 words, punchy)",
//         description: "2-4 sentences. Setup, complication, stakes, vivid detail.",
//         storylines: ["my-storyline"],
//         weight: 5,           // Draw probability (higher = more common)
//         recurring: false,    // true = stays in deck after drawn
//         tags: ["political", "crisis"],
//         
//         // Optional: Advanced features (see TECHNICAL_IMPLEMENTATION_V2.1.md)
//         // timeGate: { minYear: 1, maxYear: 3 },
//         // onceOnly: true,
//         // weightModifiers: [{ conditions: {...}, multiplier: 1.5 }],
//         
//         conditions: {
//             // When can this event appear?
//             stats: { treasury: { gte: 200 }, anger: { lt: 50 } },
//             flags: { "war_started": true },
//             counters: { "choice:punish": { gte: 2 } }
//         },
//         
//         choices: [
//             {
//                 text: "Active voice choice text (6-15 words)",
//                 effects: {
//                     stats: { personalWealth: 10, treasury: -50, elite: 5, anger: -10 },
//                     flags: { "flag_name": true },
//                     counters: { "custom:something": 1 },
//                     // relationships: { "character_id": 10 },  // v2.1
//                     legacy: {
//                         icon: "⚔️",
//                         name: "Warmonger",
//                         weight: -10  // Positive = good, Negative = bad
//                     }
//                 },
//                 add: ["event_id_to_add"],        // Events to add to deck
//                 remove: ["event_id_to_remove"],  // Events to remove from deck
//                 removeSelf: true                 // Remove this event from deck
//             }
//         ]
//     }
// ];

// ==============================================================================
// TEMPORARY: Empty exports while rebuilding
// ==============================================================================
export const allStorylines = [];
export const storylineMetadata = {};
export default allStorylines;
