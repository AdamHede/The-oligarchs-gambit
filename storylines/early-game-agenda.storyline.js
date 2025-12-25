/**
 * Early Game Agenda Storyline - v2.1
 *
 * These events give the player early agency to set the direction of their rule.
 * All events appear in Year 1 and are designed to shape the mid-game experience.
 *
 * Core Events:
 * 1. The Dacha Summit - Choose strategic faction alignment
 * 2. The First Big Move - Launch a major initiative
 * 3. The Inaugural Address - Set ideological framing
 * 4. The Aluminum King - Introduce recurring character Dmitri
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "early-game-agenda",
    name: "Early Game Agenda",
    description: "Agenda-setting events that appear in the first year of rule",

    tree: [
        // ═══════════════════════════════════════════════════════════════
        // THE DACHA SUMMIT - Choose Your Faction Alignment
        // ═══════════════════════════════════════════════════════════════

        event("dacha_summit", {
            title: "The Dacha Summit",
            description: "Your inner circle gathers at the presidential dacha. The fireplace crackles. Vodka flows. Each faction leader makes their pitch for your priorities. The Generals want military expansion. The Oligarchs want stability and contracts. The Patriots want spectacle and blood. The Technocrats... well, they're just trying to keep the lights on.",
            weight: 25, // Extremely high to ensure early appearance
            rarity: "legendary",

            // v2.1: Only appears in Year 1, Q1-Q3
            timeGate: {
                minYear: 1,
                maxYear: 1,
                minQuarter: 1,
                maxQuarter: 3
            },

            // v2.1: Remove after first appearance
            onceOnly: true,

            // v2.1: Increase weight if Elite is high (more urgency when stable)
            weightModifiers: [
                {
                    conditions: { stat: "elite", gte: 80 },
                    multiplier: 1.5
                }
            ],

            meta: { depth: 1, impact: 5, sentiment: "neutral" },

            choices: [
                choice("\"The future belongs to the Siloviki\"", {
                    effects: {
                        elite: 10,
                        treasury: -50,
                        personalWealth: 5,
                        flags: { aligned_military: true },
                        // v2.1: Increase war storyline weights
                        modifyStorylineWeights: {
                            "war-invasion": { multiplier: 1.5, bonus: 0 },
                            "shadow-war": { multiplier: 1.5, bonus: 0 }
                        }
                    },
                    legacy: {
                        icon: "🎖️",
                        name: "The Militarist",
                        weight: 0,
                        explanation: "You cast your lot with the security services. Steel and discipline will define your rule."
                    }
                }),
                choice("\"We serve the Oligarchs' interests\"", {
                    effects: {
                        elite: 15,
                        treasury: 50,
                        personalWealth: 10,
                        flags: { aligned_business: true },
                        // v2.1: Increase economic storylines, decrease war
                        modifyStorylineWeights: {
                            "energy-pipeline": { multiplier: 1.5, bonus: 0 },
                            "war-invasion": { multiplier: 0.7, bonus: 0 }
                        }
                    },
                    legacy: {
                        icon: "💼",
                        name: "The Oligarch's Friend",
                        weight: 0,
                        explanation: "You aligned with money and power. Wealth flows, but so do expectations."
                    }
                }),
                choice("\"We give the Patriots their glory\"", {
                    effects: {
                        anger: -10,
                        elite: 5,
                        treasury: -30,
                        flags: { aligned_patriots: true },
                        // v2.1: Increase religious/nationalist storylines
                        modifyStorylineWeights: {
                            "religious-revival": { multiplier: 1.5, bonus: 0 },
                            "popular-uprising": { multiplier: 0.7, bonus: 0 }
                        }
                    },
                    legacy: {
                        icon: "🦅",
                        name: "The Patriot",
                        weight: 0,
                        explanation: "You chose the path of nationalism and tradition. The masses cheer."
                    }
                }),
                choice("\"Play them against each other - I bow to no one\"", {
                    effects: {
                        flags: { balanced_approach: true }
                        // No storyline modifications - keeps default balance
                    },
                    legacy: {
                        icon: "♟️",
                        name: "The Balancer",
                        weight: 0,
                        explanation: "You refused to choose. All factions compete for your favor."
                    }
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // THE FIRST BIG MOVE - Proactive Crisis Creation
        // ═══════════════════════════════════════════════════════════════

        event("first_big_move", {
            title: "The First Big Move",
            description: "Six months into your consolidation of power. The Federation is stable. Perhaps too stable. Your advisors present several... opportunities. Bold action now could cement your legacy. Or hasten your fall.",
            weight: 20,
            rarity: "epic",

            // v2.1: Appears Year 1, Q2-Q4
            timeGate: {
                minYear: 1,
                maxYear: 1,
                minQuarter: 2,
                maxQuarter: 4
            },

            onceOnly: true,

            meta: { depth: 2, impact: 5, sentiment: "neutral" },

            choices: [
                choice("\"Launch 'Operation Unity' - annex those disputed territories\"", {
                    effects: {
                        elite: 15,
                        treasury: -100,
                        personalWealth: 10,
                        flags: { war_started_deliberately: true }
                    },
                    legacy: {
                        icon: "⚔️",
                        name: "The Conqueror",
                        weight: -5,
                        explanation: "You chose war when peace was possible. History will judge harshly."
                    },
                    unlocks: [
                        eventRef("war_special_operation_proposal")
                    ]
                }),
                choice("\"Nationalize key industries - take back what's ours\"", {
                    effects: {
                        treasury: 200,
                        elite: -25,
                        personalWealth: 20,
                        anger: 5,
                        flags: { nationalization_enacted: true }
                    },
                    legacy: {
                        icon: "🏭",
                        name: "The Nationalizer",
                        weight: -5,
                        explanation: "You seized private assets for the state. The oligarchs never forget."
                    },
                    unlocks: [
                        event("oligarch_exodus", {
                            title: "Capital Flight",
                            description: "Within a week of the nationalizations, three oligarchs announce 'extended vacations' to Monaco. Capital is fleeing the country at an alarming rate.",
                            weight: 0,
                            rarity: "rare",
                            onceOnly: true,
                            meta: { depth: 3, impact: 4, sentiment: "negative" },

                            choices: [
                                choice("Freeze their domestic assets", {
                                    effects: {
                                        treasury: 50,
                                        elite: -15,
                                        personalWealth: 10
                                    }
                                }),
                                choice("Let them go - we don't need traitors", {
                                    effects: {
                                        treasury: -30,
                                        elite: -5,
                                        anger: -5
                                    }
                                }),
                                choice("Negotiate their return with guarantees", {
                                    effects: {
                                        elite: 5,
                                        personalWealth: -10
                                    }
                                })
                            ]
                        })
                    ]
                }),
                choice("\"Build the Cathedral of the Motherland - 500 meters of gold\"", {
                    effects: {
                        anger: -15,
                        treasury: -150,
                        elite: 5,
                        flags: { grand_project_started: true }
                    },
                    legacy: {
                        icon: "⛪",
                        name: "The Builder",
                        weight: 5,
                        explanation: "You gave the people a monument to believe in. Faith and spectacle united."
                    },
                    unlocks: [
                        event("cathedral_progress", {
                            title: "Cathedral Progress Report",
                            description: "The Cathedral of the Motherland rises slowly. Costs are mounting. The Patriarch is pleased. Your critics call it a vanity project.",
                            weight: 5,
                            recurring: true,
                            rarity: "common",
                            meta: { depth: 2, impact: 2, sentiment: "neutral" },

                            choices: [
                                choice("Accelerate construction - spare no expense", {
                                    effects: {
                                        treasury: -50,
                                        anger: -5,
                                        elite: 3
                                    }
                                }),
                                choice("Maintain current pace", {
                                    effects: {
                                        treasury: -25,
                                        anger: -2
                                    },
                                    keepInDeck: true
                                }),
                                choice("Quietly reduce the scope", {
                                    effects: {
                                        treasury: 20,
                                        anger: 3,
                                        elite: -5
                                    }
                                })
                            ]
                        })
                    ]
                }),
                choice("\"Consolidate power quietly - patience is wisdom\"", {
                    effects: {
                        treasury: 50,
                        personalWealth: 5,
                        elite: 5,
                        flags: { cautious_leader: true }
                    },
                    legacy: {
                        icon: "🦉",
                        name: "The Patient",
                        weight: 5,
                        explanation: "You chose restraint when others demanded action. Wisdom or weakness?"
                    }
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // THE INAUGURAL ADDRESS - Ideological Framing
        // ═══════════════════════════════════════════════════════════════

        event("inaugural_address", {
            title: "The Inaugural Address",
            description: "Your speechwriter asks: what is the defining principle of your rule? This will be repeated in every speech, every decree, every monument inscription for years to come.",
            weight: 18,
            rarity: "rare",

            timeGate: {
                minYear: 1,
                maxYear: 1,
                minQuarter: 1,
                maxQuarter: 4
            },

            onceOnly: true,

            // v2.1: Different narrative based on existing alignments
            narrativeVariations: [
                {
                    conditions: { flag: "aligned_military" },
                    description: "Your speechwriter asks: what is the defining principle of your rule? The Generals expect something strong. Something that will echo in military barracks and parade grounds for years to come."
                },
                {
                    conditions: { flag: "aligned_business" },
                    description: "Your speechwriter asks: what is the defining principle of your rule? The oligarchs want stability, predictability. Something that won't spook the markets."
                }
            ],

            meta: { depth: 1, impact: 3, sentiment: "positive" },

            choices: [
                choice("\"Restoring the Great Empire's Glory\"", {
                    effects: {
                        elite: 5,
                        anger: -5,
                        flags: { ideology_empire: true },
                        modifyStorylineWeights: {
                            "war-invasion": { multiplier: 1.2, bonus: 2 }
                        }
                    },
                    legacy: {
                        icon: "👑",
                        name: "The Revanchist",
                        weight: 0,
                        explanation: "You promised to restore imperial greatness. The past became your future."
                    }
                }),
                choice("\"Traditional Values Against Western Decadence\"", {
                    effects: {
                        anger: -10,
                        elite: 3,
                        flags: { ideology_tradition: true },
                        modifyStorylineWeights: {
                            "religious-revival": { multiplier: 1.2, bonus: 2 }
                        }
                    },
                    legacy: {
                        icon: "✝️",
                        name: "The Moralist",
                        weight: 0,
                        explanation: "You positioned yourself as defender of faith and tradition."
                    }
                }),
                choice("\"Economic Sovereignty and Self-Sufficiency\"", {
                    effects: {
                        treasury: 50,
                        elite: 8,
                        flags: { ideology_economy: true },
                        modifyStorylineWeights: {
                            "energy-pipeline": { multiplier: 1.2, bonus: 2 },
                            "sanctions-spiral": { multiplier: 1.2, bonus: 0 }
                        }
                    },
                    legacy: {
                        icon: "📈",
                        name: "The Autarch",
                        weight: 0,
                        explanation: "You promised economic independence. Self-sufficiency became your doctrine."
                    }
                }),
                choice("\"Stability Above All - Peace and Order\"", {
                    effects: {
                        anger: -8,
                        treasury: 30,
                        flags: { ideology_stability: true },
                        modifyStorylineWeights: {
                            "popular-uprising": { multiplier: 1.3, bonus: 0 },
                            "war-invasion": { multiplier: 0.8, bonus: 0 }
                        }
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Stabilizer",
                        weight: 5,
                        explanation: "You promised peace and order. Breaking that promise will cost dearly."
                    }
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // THE ALUMINUM KING - Recurring Character Introduction
        // ═══════════════════════════════════════════════════════════════

        event("aluminum_king_introduction", {
            title: "The Aluminum King",
            description: "Dmitri, your old friend from university, now controls 60% of the Federation's aluminum. He visits your office with a gift: a Patek Philippe worth more than a helicopter. 'We go back a long way,' he says. 'I just want to make sure we stay... aligned.'",
            weight: 16,
            rarity: "rare",

            // v2.1: Character ID for relationship tracking
            characterId: "dmitri",

            timeGate: {
                minYear: 1,
                maxYear: 1,
                minQuarter: 2,
                maxQuarter: 4
            },

            onceOnly: true,

            meta: { depth: 2, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Embrace him as your partner - we rise together", {
                    effects: {
                        elite: 10,
                        personalWealth: 15,
                        treasury: -50,
                        flags: { dmitri_allied: true },
                        // v2.1: Set relationship high
                        relationships: { dmitri: 50 } // +50 from neutral
                    },
                    legacy: {
                        icon: "🤝",
                        name: "The Partner",
                        weight: -5,
                        explanation: "You embraced an oligarch as equal partner. Profitable, but dangerous."
                    },
                    unlocks: [
                        event("dmitri_opportunity", {
                            title: "Dmitri's Tip",
                            description: "Dmitri tips you off about a Western aluminum shortage. If you coordinate output cuts, prices soar and you both profit enormously. 'Just a little market manipulation between friends.'",
                            weight: 8,
                            rarity: "rare",
                            characterId: "dmitri",
                            conditions: {
                                relationship: "dmitri",
                                gte: 75
                            },
                            onceOnly: true,
                            meta: { depth: 3, impact: 4, sentiment: "positive" },

                            choices: [
                                choice("Coordinate the output cuts", {
                                    effects: {
                                        treasury: 150,
                                        personalWealth: 25,
                                        relationships: { dmitri: 15 }
                                    },
                                    legacy: {
                                        icon: "💎",
                                        name: "Market Maker",
                                        weight: -10,
                                        explanation: "You rigged global commodity markets for personal gain."
                                    }
                                }),
                                choice("Decline - too risky", {
                                    effects: {
                                        elite: -5,
                                        relationships: { dmitri: -10 }
                                    }
                                })
                            ]
                        })
                    ]
                }),
                choice("Keep him at arm's length - professional only", {
                    effects: {
                        elite: 5,
                        personalWealth: 5,
                        flags: { dmitri_neutral: true },
                        relationships: { dmitri: 0 } // stays at neutral
                    },
                    unlocks: [
                        event("dmitri_transaction", {
                            title: "Dmitri's Proposal",
                            description: "Dmitri proposes a state contract for aluminum. Market rate. Everything above-board. Boring, but safe. 'Just business,' he says with a shrug.",
                            weight: 5,
                            rarity: "common",
                            characterId: "dmitri",
                            meta: { depth: 2, impact: 2, sentiment: "neutral" },

                            choices: [
                                choice("Accept the contract", {
                                    effects: {
                                        treasury: -30,
                                        elite: 5
                                    }
                                }),
                                choice("Decline - we'll find other suppliers", {
                                    effects: {
                                        elite: -3,
                                        relationships: { dmitri: -5 }
                                    }
                                })
                            ]
                        })
                    ]
                }),
                choice("Subtle threat - remind him who's in charge", {
                    effects: {
                        elite: -5,
                        personalWealth: 5,
                        treasury: 25,
                        flags: { dmitri_cowed: true },
                        relationships: { dmitri: -25 } // -25 from neutral
                    },
                    unlocks: [
                        event("dmitri_resentment", {
                            title: "Dmitri's Meetings",
                            description: "Your intelligence chief reports: Dmitri is meeting with foreign investors. Quietly moving assets abroad. Legal, technically. But disloyal.",
                            weight: 6,
                            rarity: "rare",
                            characterId: "dmitri",
                            conditions: {
                                relationship: "dmitri",
                                lte: 35
                            },
                            onceOnly: true,
                            meta: { depth: 3, impact: 3, sentiment: "negative" },

                            choices: [
                                choice("Confront him directly", {
                                    effects: {
                                        elite: -10,
                                        relationships: { dmitri: -20 }
                                    },
                                    unlocks: [
                                        event("dmitri_flees", {
                                            title: "Dmitri Flees",
                                            description: "After your confrontation, Dmitri boards a private jet to London. He gives an interview to the BBC calling you 'a thug in a suit.' The West applauds him as a dissident.",
                                            weight: 0,
                                            rarity: "rare",
                                            characterId: "dmitri",
                                            onceOnly: true,
                                            meta: { depth: 4, impact: 4, sentiment: "negative" },

                                            choices: [
                                                choice("Seize his remaining assets", {
                                                    effects: {
                                                        treasury: 100,
                                                        elite: -10,
                                                        anger: 5,
                                                        characterStates: { dmitri: "exiled" }
                                                    }
                                                }),
                                                choice("Let the traitor go", {
                                                    effects: {
                                                        elite: -5,
                                                        characterStates: { dmitri: "exiled" }
                                                    }
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                choice("Let it slide - for now", {
                                    effects: {
                                        relationships: { dmitri: 5 }
                                    }
                                })
                            ]
                        })
                    ]
                }),
                choice("Refuse the gift - arrest him for 'corruption'", {
                    effects: {
                        elite: -20,
                        treasury: 100,
                        personalWealth: 30,
                        flags: { dmitri_arrested: true },
                        characterStates: { dmitri: "arrested" }
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Enforcer",
                        weight: -10,
                        explanation: "You arrested an oligarch on your first meeting. The elite are terrified."
                    },
                    unlocks: [
                        eventRef("oligarch_exodus"),
                        event("dmitri_prison_interview", {
                            title: "The Prison Interview",
                            description: "From prison, Dmitri gives a Western media interview. 'There is no law here,' he says. 'Only power.' The clip goes viral. International condemnation follows.",
                            weight: 0,
                            rarity: "rare",
                            characterId: "dmitri",
                            conditions: {
                                characterState: { character: "dmitri", state: "arrested" }
                            },
                            onceOnly: true,
                            meta: { depth: 3, impact: 4, sentiment: "negative" },

                            choices: [
                                choice("Release him quietly", {
                                    effects: {
                                        elite: 10,
                                        anger: 3,
                                        characterStates: { dmitri: "exiled" }
                                    }
                                }),
                                choice("Keep him locked up", {
                                    effects: {
                                        elite: -5,
                                        anger: -5
                                    }
                                }),
                                choice("Transfer to a harsher facility", {
                                    effects: {
                                        elite: -15,
                                        anger: 5
                                    },
                                    legacy: {
                                        icon: "🔗",
                                        name: "The Jailer",
                                        weight: -15,
                                        explanation: "You made an example of Dmitri. The world noticed."
                                    }
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    ]
});
