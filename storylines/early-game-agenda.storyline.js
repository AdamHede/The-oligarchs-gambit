/**
 * Early Game Agenda Storyline - v2.2
 *
 * These events give the player early agency to set the direction of their rule.
 * All events appear in Year 1 and are designed to shape the mid-game experience.
 *
 * Core Events:
 * 1. The Dacha Summit - Choose strategic faction alignment (interconnected storylines)
 * 2. The First Big Move - Launch a major initiative
 * 3. The Inaugural Address - Set ideological framing (separate storylines)
 * 4. The Five-Year Plan - Choose economic direction (nested/convergent storylines)
 * 5. The Aluminum King - Introduce recurring character Dmitri
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "early-game-agenda",
    name: "Early Game Agenda",
    description: "Agenda-setting events that appear in the first year of rule",

    tree: [
        // ═══════════════════════════════════════════════════════════════
        // THE DACHA SUMMIT - Three Branching Storylines
        // ═══════════════════════════════════════════════════════════════
        //
        // The meeting with the elite who helped you seize power.
        // Each choice opens a distinct storyline that can interconnect:
        // 1. Golden Circle - Oligarch wealth management
        // 2. Succession - Planning for the dynasty
        // 3. Loyalty Apparatus - Paranoia and purges
        // ═══════════════════════════════════════════════════════════════

        event("dacha_summit", {
            title: "The Dacha Summit",
            description: "Your inner circle gathers at the presidential dacha. The fireplace crackles. Vodka flows. These are the men who made you—the oligarchs, the generals, the fixers. They helped you seize power. Now they want to know: what's in it for them? The conversation tonight will set the tone for your entire reign.",

            forceAddAtStart: true,      // Always in starting deck
            timeGate: { maxYear: 1 },   // Disappears after Year 1
            weight: 100,                // High weight to ensure it triggers in Year 1
            rarity: "rare",
            onceOnly: true,

            meta: { depth: 1, impact: 5, sentiment: "neutral" },

            choices: [
                // ============================================================
                // CHOICE 1: THE GOLDEN CIRCLE
                // Opens: Oligarch wealth management storyline
                // ============================================================
                choice("'Gentlemen, let's make ourselves obscenely rich.'", {
                    effects: {
                        elite: 12,
                        personalWealth: 8,
                        treasury: -30,
                        flags: {
                            "dacha_chose_wealth": true,
                            "golden_circle_active": true
                        },
                        modifyStorylineWeights: {
                            "golden-circle": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "💰",
                        name: "The Profiteer",
                        weight: -3,
                        explanation: "You promised your friends riches beyond imagination. Now you must deliver."
                    },
                    unlocks: [
                        eventRef("golden_circle_first_deal")
                    ]
                }),

                // ============================================================
                // CHOICE 2: THE SUCCESSION QUESTION
                // Opens: Dynasty and heir storyline
                // ============================================================
                choice("'We must think of legacy. Who continues our work?'", {
                    effects: {
                        elite: 5,
                        anger: -5,
                        flags: {
                            "dacha_chose_succession": true,
                            "succession_active": true
                        },
                        modifyStorylineWeights: {
                            "succession": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "👑",
                        name: "The Dynast",
                        weight: 0,
                        explanation: "You spoke of legacy and succession. The question of 'who comes after' will haunt your reign."
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                }),

                // ============================================================
                // CHOICE 3: THE LOYALTY APPARATUS
                // Opens: Paranoia and purge storyline
                // ============================================================
                choice("'Before we divide the spoils—who here can I truly trust?'", {
                    effects: {
                        elite: -8,
                        anger: -3,
                        treasury: -20,
                        flags: {
                            "dacha_chose_loyalty": true,
                            "loyalty_apparatus_active": true
                        },
                        modifyStorylineWeights: {
                            "loyalty-apparatus": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "🔍",
                        name: "The Paranoid",
                        weight: -5,
                        explanation: "You began your reign with suspicion. Trust is a commodity you cannot afford."
                    },
                    unlocks: [
                        eventRef("loyalty_the_dossiers")
                    ]
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
            rarity: "rare",

            // v2.1: Appears Year 1, Q1-Q4 (available from start, narrative says "six months")
            timeGate: {
                minYear: 1,
                maxYear: 1,
                minQuarter: 1,
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
                        eventRef("war_proposal")
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
                                }),
                                choice("Pause construction indefinitely", {
                                    effects: {
                                        treasury: 0,
                                        anger: 10,
                                        elite: -8
                                    },
                                    keepInDeck: true
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
                    },
                    unlocks: [
                        eventRef("patriarch_audience")
                    ]
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
                    },
                    unlocks: [
                        eventRef("dissident_returns")
                    ]
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

            // v2.1: Appears Year 1, Q1-Q4 (available from start)
            timeGate: {
                minYear: 1,
                maxYear: 1,
                minQuarter: 1,
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
                                        name: "The Cartel Boss",
                                        weight: 20,
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
        }),

        // ═══════════════════════════════════════════════════════════════
        // THE FIVE-YEAR PLAN - Economic Direction (Nested/Convergent)
        // ═══════════════════════════════════════════════════════════════
        //
        // Choose the Federation's economic future. Unlike other early events:
        // - Dacha: Three storylines that INTERCONNECT (crossover events)
        // - Inaugural: Three storylines that are SEPARATE (no crossover)
        // - THIS: Three branches that CONVERGE to shared resolution
        //
        // Three paths:
        // 1. Silicon Steppe - Digital modernization
        // 2. Pipeline State - Energy dominance
        // 3. Fortress Economy - Autarky/self-sufficiency
        // ═══════════════════════════════════════════════════════════════

        event("five_year_plan", {
            title: "The Five-Year Plan",
            description: "Your economic advisors gather in the Kremlin's walnut-paneled conference room. Oil prices are volatile. The ruble is weak. The technocrats argue over PowerPoint slides while the oligarchs check their Swiss watches. The Central Banker looks like she hasn't slept in three days. Three competing visions emerge for the Federation's economic future.",

            forceAddAtStart: true,      // Always in starting deck
            timeGate: { maxYear: 1 },   // Disappears after Year 1
            weight: 100,                // High weight to ensure it triggers in Year 1
            rarity: "rare",
            onceOnly: true,
            // storylines: ['early-game-agenda', 'economic-vision'], // Removed to prevent conflict

            meta: { depth: 1, impact: 5, sentiment: "neutral" },

            choices: [
                // ============================================================
                // CHOICE 1: THE SILICON STEPPE
                // Opens: Digital modernization storyline
                // ============================================================
                choice("'The future is digital. We will become the world's tech hub.'", {
                    effects: {
                        treasury: -50,
                        elite: 8,
                        flags: {
                            "economic_path": "silicon",
                            "silicon_steppe_active": true
                        },
                        modifyStorylineWeights: {
                            "economic-vision": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "💻",
                        name: "The Modernizer",
                        weight: 0,
                        explanation: "You bet the Federation's future on technology. Innovation or illusion?"
                    },
                    unlocks: [
                        eventRef("silicon_tech_hub")
                    ]
                }),

                // ============================================================
                // CHOICE 2: THE PIPELINE STATE
                // Opens: Energy dominance storyline
                // ============================================================
                choice("'Our strength lies beneath our feet. Gas and oil will fuel our empire.'", {
                    effects: {
                        treasury: 30,
                        elite: 12,
                        flags: {
                            "economic_path": "pipeline",
                            "pipeline_state_active": true
                        },
                        modifyStorylineWeights: {
                            "economic-vision": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "🛢️",
                        name: "The Petro-Tsar",
                        weight: -3,
                        explanation: "You doubled down on hydrocarbons. The world either needs your gas or it doesn't."
                    },
                    unlocks: [
                        eventRef("pipeline_new_route")
                    ]
                }),

                // ============================================================
                // CHOICE 3: THE FORTRESS ECONOMY
                // Opens: Autarky/self-sufficiency storyline
                // ============================================================
                choice("'We need no one. Import substitution - build it ourselves.'", {
                    effects: {
                        treasury: -20,
                        elite: -5,
                        anger: -8,
                        flags: {
                            "economic_path": "fortress",
                            "fortress_economy_active": true
                        },
                        modifyStorylineWeights: {
                            "economic-vision": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "🏰",
                        name: "The Isolationist",
                        weight: -5,
                        explanation: "You chose self-sufficiency over integration. The shelves will tell the story."
                    },
                    unlocks: [
                        eventRef("fortress_import_ban")
                    ]
                }),

                // ============================================================
                // CHOICE 4: LAISSEZ-FAIRE (Non-commitment)
                // Reduces control, leads to drift
                // ============================================================
                choice("'This is above my pay grade. Let the market decide.'", {
                    effects: {
                        treasury: 20,
                        elite: -10,
                        flags: {
                            "economic_path": "laissez_faire"
                        }
                    },
                    legacy: {
                        icon: "🎲",
                        name: "The Delegator",
                        weight: 0,
                        explanation: "You left the economy to others. Control slipped away with it."
                    }
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // THE GLOBAL STAGE - International Relations (Reactive/Adversarial)
        // ═══════════════════════════════════════════════════════════════
        //
        // Your first major international appearance. Choose your
        // geopolitical alignment - but each choice creates both allies
        // AND adversaries. All three paths remain active in different roles:
        // 1. Western Gambit - Euro-Atlantic integration
        // 2. Eastern Embrace - Chinese partnership
        // 3. Third Way - Non-aligned coalition
        // ═══════════════════════════════════════════════════════════════

        event("global_stage_summit", {
            title: "The Global Stage",
            description: "The World Economic Forum in Davos. Your first invitation since taking power. You fly in on the presidential jet—Western media notes it cost $80 million. The American Ambassador requests 'frank discussions.' The Chinese delegation is warmly friendly. Representatives from India, Turkey, and the Gulf circle like sharks. Back home, the ruble fell 4% today. Everyone has an offer. Everyone wants something.",

            forceAddAtStart: true,      // Always in starting deck
            timeGate: { maxYear: 1 },   // Disappears after Year 1
            weight: 100,                // High weight to ensure it triggers in Year 1
            rarity: "rare",
            onceOnly: true,
            // storylines: ['early-game-agenda', 'global-stage'],

            meta: { depth: 1, impact: 5, sentiment: "neutral" },

            choices: [
                // ============================================================
                // CHOICE 1: THE WESTERN GAMBIT
                // Opens: Euro-Atlantic integration path
                // West = ALLY, East = ADVERSARY, Third Way = OPPORTUNIST
                // ============================================================
                choice("'We seek partnership with the civilized world.'", {
                    effects: {
                        treasury: 50,
                        elite: -10,
                        flags: {
                            "global_alignment": "western",
                            "western_accord_ally": true,
                            "eastern_embrace_adversary": true,
                            "third_way_opportunist": true,
                            "global_stage_active": true
                        },
                        modifyStorylineWeights: {
                            "global-stage": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "🇪🇺",
                        name: "The Westernizer",
                        weight: 0,
                        explanation: "You reached toward Europe. They reached back with conditions."
                    },
                    unlocks: [
                        eventRef("western_accord_first_offer"),
                        eventRef("eastern_quiet_undermining")
                    ]
                }),

                // ============================================================
                // CHOICE 2: THE EASTERN EMBRACE
                // Opens: Chinese partnership path
                // East = ALLY, West = ADVERSARY, Third Way = OPPORTUNIST
                // ============================================================
                choice("'Our future lies with our Eastern friends.'", {
                    effects: {
                        treasury: 30,
                        elite: 5,
                        flags: {
                            "global_alignment": "eastern",
                            "eastern_embrace_ally": true,
                            "western_accord_adversary": true,
                            "third_way_opportunist": true,
                            "global_stage_active": true
                        },
                        modifyStorylineWeights: {
                            "global-stage": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "🐉",
                        name: "The Eastern Pivot",
                        weight: -3,
                        explanation: "You turned away from Europe toward a rising power."
                    },
                    unlocks: [
                        eventRef("eastern_embrace_first_offer"),
                        eventRef("western_sanctions_escalate")
                    ]
                }),

                // ============================================================
                // CHOICE 3: THE THIRD WAY
                // Opens: Non-aligned coalition path
                // Third Way = ALLY, West = OPPORTUNIST, East = OPPORTUNIST
                // ============================================================
                choice("'We will build a new order with new partners.'", {
                    effects: {
                        treasury: 20,
                        elite: 8,
                        anger: -5,
                        flags: {
                            "global_alignment": "third_way",
                            "third_way_ally": true,
                            "western_accord_opportunist": true,
                            "eastern_embrace_opportunist": true,
                            "global_stage_active": true
                        },
                        modifyStorylineWeights: {
                            "global-stage": { multiplier: 2.0, bonus: 10 }
                        }
                    },
                    legacy: {
                        icon: "🌍",
                        name: "The Non-Aligned",
                        weight: 0,
                        explanation: "You rejected both superpowers. Now prove you don't need them."
                    },
                    unlocks: [
                        eventRef("third_way_first_offer")
                    ]
                }),

                // ============================================================
                // CHOICE 4: MULTI-VECTOR DIPLOMACY
                // All three paths = OPPORTUNIST (chaotic)
                // ============================================================
                choice("'Let them all court us. We answer to no one.'", {
                    effects: {
                        elite: 3,
                        flags: {
                            "global_alignment": "multi_vector",
                            "western_accord_opportunist": true,
                            "eastern_embrace_opportunist": true,
                            "third_way_opportunist": true,
                            "global_stage_active": true
                        },
                        modifyStorylineWeights: {
                            "global-stage": { multiplier: 1.5, bonus: 5 }
                        }
                    },
                    legacy: {
                        icon: "🎭",
                        name: "The Multi-Vector",
                        weight: -5,
                        explanation: "You played all sides. They noticed."
                    },
                    unlocks: [
                        eventRef("multi_vector_chaos")
                    ]
                })
            ]
        })
    ]
});
