/**
 * War of Expansion Storyline
 *
 * Theme: Dark satire of imperial overreach. Hubris → catastrophe.
 *
 * This storyline uses the new tree-based event system where chains are
 * explicitly nested, making the narrative flow visible at a glance.
 */

import { defineStoryline, event, choice } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "war-invasion",
    name: "War of Expansion",
    description: "A 72-hour operation that goes horribly wrong",
    theme: {
        borderColor: "#8B0000",
        accentColor: "#DC143C"
    },

    // The event tree - nested structure shows the narrative flow
    tree: event("war_special_operation_proposal", {
        title: "Special Military Operation",
        description: "Your Generals present a plan for a 'quick' 72-hour intervention in a neighboring region. They promise it will boost your approval ratings and secure vital resources. Intelligence suggests the West is too weak to react.",
        weight: 10,
        rarity: "rare",
        image: "assets/images/events/war_special_operation_proposal.png",
        meta: { depth: 3, impact: 5, sentiment: "neutral" },

        choices: [
            // ═══════════════════════════════════════════════════════════
            // PATH A: Authorize the operation (leads to war storyline)
            // ═══════════════════════════════════════════════════════════
            choice("Authorize the operation", {
                effects: {
                    personalWealth: 5,
                    treasury: -50,
                    elite: 10,
                    anger: 5
                },
                legacy: {
                    icon: "⚔️",
                    name: "The Invader",
                    weight: -10,
                    explanation: "You launched a full-scale invasion of a sovereign nation. History will not be kind."
                },

                unlocks: [
                    // Rally Around the Flag (simple event, no children)
                    event("rally_around_flag", {
                        title: "Patriotic Surge",
                        description: "The initial operation has sparked a wave of nationalist sentiment. State media is flooded with patriotic programming.",
                        weight: 3,
                        rarity: "common",
                        meta: { depth: 4, impact: 2, sentiment: "positive" },

                        choices: [
                            choice("Capitalize on the momentum", {
                                effects: {
                                    elite: 5,
                                    anger: -5,
                                    personalWealth: 5
                                }
                            })
                        ]
                    }),

                    // War Goes Badly (major branch point)
                    event("war_goes_badly", {
                        title: "The 72-Hour Quagmire",
                        description: "It has been three weeks. The '72-hour' operation has stalled. Logistics are a nightmare, and your tanks are running out of fuel. The Generals are blaming each other.",
                        weight: 0,
                        rarity: "common",
                        image: "assets/images/events/war_goes_badly.png",
                        meta: { depth: 4, impact: 5, sentiment: "negative" },

                        choices: [
                            // Double down path
                            choice("Double down: Mobilize more troops", {
                                effects: {
                                    treasury: -150,
                                    anger: 15,
                                    elite: 5,
                                    personalWealth: 5
                                },

                                unlocks: [
                                    // Conscription Crisis
                                    event("conscription_crisis", {
                                        title: "Partial Mobilization",
                                        description: "To sustain the war effort, you need more bodies. Announcing mobilization will be deeply unpopular, especially among the urban youth.",
                                        weight: 0,
                                        rarity: "rare",
                                        image: "assets/images/events/conscription_crisis.png",
                                        meta: { depth: 5, impact: 5, sentiment: "negative" },

                                        choices: [
                                            choice("Mobilize the rural poor only", {
                                                effects: {
                                                    treasury: -20,
                                                    anger: 5,
                                                    elite: 0,
                                                    personalWealth: 5
                                                },
                                                legacy: { icon: "👑", name: "The Class Divider", weight: -5 },

                                                unlocks: [
                                                    event("rural_unrest", {
                                                        title: "The Countryside Rises",
                                                        description: "Rural communities are protesting the selective mobilization. They feel unfairly targeted by your policies.",
                                                        weight: 0,
                                                        rarity: "common",
                                                        meta: { depth: 6, impact: 3, sentiment: "negative" },

                                                        choices: [
                                                            choice("Suppress the protests", {
                                                                effects: { anger: 10, elite: 2 }
                                                            }),
                                                            choice("Promise fair treatment", {
                                                                effects: { anger: -5, treasury: -10 }
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),

                                            choice("General mobilization", {
                                                effects: {
                                                    treasury: -80,
                                                    anger: 25,
                                                    elite: 5,
                                                    personalWealth: 3
                                                },

                                                unlocks: [
                                                    event("border_exodus_brain_drain", {
                                                        title: "The Great Exodus",
                                                        description: "Massive numbers of educated professionals are fleeing across the borders. Universities and tech companies are emptying out.",
                                                        weight: 0,
                                                        rarity: "rare",
                                                        meta: { depth: 6, impact: 4, sentiment: "negative" },

                                                        choices: [
                                                            choice("Close the borders", {
                                                                effects: { anger: 15, elite: -5 }
                                                            }),
                                                            choice("Let them go", {
                                                                effects: { treasury: -20, elite: -10 }
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),

                                    // Equipment Shortages
                                    event("equipment_shortages", {
                                        title: "The Supply Crisis",
                                        description: "Your forces are running low on everything: ammunition, fuel, spare parts. The logistics chain has completely broken down.",
                                        weight: 0,
                                        rarity: "common",
                                        meta: { depth: 5, impact: 3, sentiment: "negative" },

                                        choices: [
                                            choice("Scramble to find supplies", {
                                                effects: { treasury: -80, anger: 8 }
                                            }),
                                            choice("Accept the shortages", {
                                                effects: { elite: -10, anger: 10 }
                                            })
                                        ]
                                    })
                                ]
                            }),

                            // Pull back path
                            choice("Pull back and regroup", {
                                effects: { elite: -15, anger: -5 },

                                unlocks: [
                                    event("general_fired_scapegoat", {
                                        title: "A Scapegoat is Found",
                                        description: "You've publicly blamed a senior general for the military failures. He's been removed, but the problems remain.",
                                        weight: 0,
                                        rarity: "common",
                                        meta: { depth: 5, impact: 2, sentiment: "negative" },

                                        choices: [
                                            choice("Continue the operation", {
                                                effects: { elite: -5, treasury: -30 }
                                            }),
                                            choice("Reassess strategy", {
                                                effects: { elite: 5, anger: -5 }
                                            })
                                        ]
                                    })
                                ]
                            }),

                            // Declare victory path (ends war arc)
                            choice("Declare victory and withdraw", {
                                effects: {
                                    elite: -20,
                                    anger: -10,
                                    treasury: 30
                                },
                                legacy: {
                                    icon: "🐈",
                                    name: "The Paper Tiger",
                                    weight: -10,
                                    explanation: "Your military threats proved hollow. The world saw through your bluff."
                                },
                                // These events become permanently blocked
                                terminates: [
                                    "conscription_crisis",
                                    "equipment_shortages",
                                    "rural_unrest",
                                    "border_exodus_brain_drain"
                                ],

                                unlocks: [
                                    event("frozen_conflict", {
                                        title: "The Frozen Conflict",
                                        description: "The war is officially over, but the border region remains unstable. Skirmishes are common, but the massive drain on resources has stopped.",
                                        weight: 0,
                                        recurring: true,
                                        rarity: "common",
                                        image: "assets/images/events/frozen_conflict.png",
                                        meta: { depth: 5, impact: 3, sentiment: "negative" },

                                        choices: [
                                            choice("Maintain status quo", {
                                                effects: {
                                                    treasury: -8,
                                                    elite: -1,
                                                    anger: 2
                                                },
                                                keepInDeck: true
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),

            // ═══════════════════════════════════════════════════════════
            // PATH B: Reject the plan (generals become hostile)
            // ═══════════════════════════════════════════════════════════
            choice("Reject the plan", {
                effects: {
                    elite: -10,
                    treasury: 5,
                    anger: -5
                },
                legacy: {
                    icon: "🕊️",
                    name: "The Peacemaker",
                    weight: 5,
                    explanation: "You chose diplomacy over war. A rare moment of restraint."
                },
                // War path is permanently blocked
                terminates: [
                    "war_goes_badly",
                    "rally_around_flag",
                    "conscription_crisis",
                    "equipment_shortages",
                    "rural_unrest",
                    "border_exodus_brain_drain",
                    "general_fired_scapegoat",
                    "frozen_conflict"
                ],

                unlocks: [
                    event("generals_plotting_coup", {
                        title: "The Generals Are Restless",
                        description: "Your rejection of the military operation has angered the top brass. Whispers of discontent are spreading through the officer corps.",
                        weight: 5,
                        rarity: "rare",
                        meta: { depth: 2, impact: 5, sentiment: "negative" },

                        choices: [
                            choice("Purge the disloyal", {
                                effects: { elite: -10, treasury: -20 }
                            }),
                            choice("Offer them concessions", {
                                effects: { treasury: -30, elite: 5 }
                            })
                        ]
                    })
                ]
            })
        ]
    })
});
