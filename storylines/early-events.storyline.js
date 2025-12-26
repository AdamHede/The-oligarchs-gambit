/**
 * Early Events - The Inaugural Address
 * 
 * The first major decision. Your inaugural address to the nation.
 * This event is force-added to the starting deck and expires after Year 1.
 * 
 * Each choice opens a different major storyline.
 */

import { defineStoryline, event, choice } from '../engine/storyline-dsl.js';

const earlyEventsStoryline = defineStoryline({
    id: 'early-events',
    name: 'Early Events',
    description: 'Agenda-setting moments in Year 1',
    
    tree: [
        event("inaugural_address", {
            title: "The Inaugural Address",
            description: "You stand before the nation. Ten thousand people in the square below, millions watching on state television. The cameras are on you. Your first words as leader will define everything - what you promise, who you empower, which enemies you make. The teleprompter is ready, but the words are yours to choose.",
            
            forceAddAtStart: true,      // Always in starting deck
            timeGate: { maxYear: 1 },   // Disappears after Year 1 (turn 4)
            weight: 0,                  // Not drawn randomly
            storylines: ['early-events'],
            
            choices: [
                // ============================================================
                // CHOICE 1: RESTORE THE EMPIRE
                // Opens: The Special Operation (war storyline)
                // ============================================================
                choice("'I will restore our empire to its former glory!'", {
                    effects: {
                        stats: {
                            elite: 8,     // Generals and nationalists love it
                            anger: -10,   // Patriotic fervor
                            treasury: -30 // Immediate military spending
                        },
                        flags: {
                            "promised_military_glory": true,
                            "nationalist_base": true
                        },
                        legacy: {
                            icon: "⚔️",
                            name: "Empire Builder",
                            weight: -5  // History will judge this promise
                        }
                    },
                    unlocks: [
                        // This will unlock the first event of The Special Operation storyline
                        // The actual event will be defined in special-operation.storyline.js
                    ]
                }),
                
                // ============================================================
                // CHOICE 2: ROOT OUT TRAITORS
                // Opens: The Dissident (opposition/repression storyline)
                // ============================================================
                choice("'I will root out the traitors who have stolen from you!'", {
                    effects: {
                        stats: {
                            elite: 5,     // Security services mobilize
                            anger: -8,    // People love scapegoats
                            treasury: -20 // FSB budget increase
                        },
                        flags: {
                            "promised_purge": true,
                            "security_state": true
                        },
                        legacy: {
                            icon: "🔍",
                            name: "Purge Master",
                            weight: -8
                        }
                    },
                    unlocks: [
                        // This will unlock the first event of The Dissident storyline
                        // The actual event will be defined in dissident.storyline.js
                    ]
                }),
                
                // ============================================================
                // CHOICE 3: SACRED TRADITIONS
                // Opens: The Holy Alliance (church-state bargain storyline)
                // ============================================================
                choice("'I will return us to our sacred traditions and values!'", {
                    effects: {
                        stats: {
                            elite: 6,     // Church and conservatives pleased
                            anger: -12,   // Resonates with older voters
                            treasury: -10 // Initial church funding
                        },
                        flags: {
                            "promised_traditional_values": true,
                            "church_alliance": true
                        },
                        legacy: {
                            icon: "✝️",
                            name: "Defender of Faith",
                            weight: -4
                        }
                    },
                    unlocks: [
                        // This will unlock the first event of The Holy Alliance storyline
                        // The actual event will be defined in holy-alliance.storyline.js
                    ]
                })
            ]
        })
    ]
});

export default earlyEventsStoryline;

