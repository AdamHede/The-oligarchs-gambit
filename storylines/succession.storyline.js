/**
 * The Succession Question - Dynasty and Heir Storyline
 * 
 * Size: ~25 events, Depth 5-6
 * Triggered by: Dacha Summit → "We must think of legacy. Who continues our work?"
 * 
 * The paranoid game of choosing and grooming an heir. The tension between
 * competence and loyalty, between necessity and threat.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

const successionStoryline = defineStoryline({
    id: 'succession',
    name: 'The Succession Question',
    description: 'Dynasty, heirs, and the impossible question of who comes after',
    theme: {
        borderColor: '#4B0082',  // Indigo
        accentColor: '#9932CC'   // Dark Orchid
    },
    
    tree: [
        // ================================================================
        // ACT 1: THE CANDIDATES (Depth 1-2)
        // ================================================================
        
        event("succession_the_candidates", {
            title: "The Question of Succession",
            description: "You've raised the forbidden topic. Your inner circle falls silent - no one wants to contemplate a world without you. But you insist. Eventually, three names emerge from the uncomfortable discussion. Your son Dmitri Jr. Your loyal chief of staff Andrei Volkov. And Maxim Orlov, an oligarch with resources but no political baggage.",
            weight: 0,  // Triggered only
            storylines: ['succession'],
            
            choices: [
                choice("'My son will inherit. Blood is thicker than politics.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -8
                        },
                        flags: {
                            "heir_type_son": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_son_introduction")
                    ]
                }),
                
                choice("'Andrei has served me loyally. He understands the system.'", {
                    effects: {
                        stats: {
                            elite: 8
                        },
                        flags: {
                            "heir_type_protege": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_protege_introduction")
                    ]
                }),
                
                choice("'Perhaps an outsider. Someone with resources but no faction.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            treasury: 30
                        },
                        flags: {
                            "heir_type_oligarch": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_oligarch_introduction")
                    ]
                }),
                
                choice("'I will rule forever. This discussion is premature.'", {
                    effects: {
                        stats: {
                            elite: -3,
                            anger: -3
                        },
                        flags: {
                            "succession_delayed": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_forced_return")
                    ]
                })
            ]
        }),
        
        event("succession_son_introduction", {
            title: "Father and Son",
            description: "Your son Dmitri Jr. has been summoned to the Kremlin. He's 32, educated in Switzerland, and has spent most of his life avoiding politics - preferring nightclubs in Monaco to cabinet meetings. He looks terrified. 'Father, I don't know if I'm ready for this.' Neither do you, honestly.",
            weight: 0,
            storylines: ['succession'],
            characterId: "dmitri_jr",
            conditions: {
                flag: "heir_type_son"
            },
            
            choices: [
                choice("'You will learn. I will teach you everything.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "son_encouraged": true
                        },
                        relationships: { dmitri_jr: 20 }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                }),
                
                choice("'Readiness doesn't matter. Destiny does. You are my blood.'", {
                    effects: {
                        stats: {
                            anger: -5
                        },
                        flags: {
                            "son_pressured": true
                        },
                        relationships: { dmitri_jr: 5 }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                }),
                
                choice("'Perhaps you're right. We should consider alternatives.'", {
                    effects: {
                        stats: {
                            elite: -3
                        },
                        flags: {
                            "son_rejected": true
                        },
                        relationships: { dmitri_jr: -25 }
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                })
            ]
        }),
        
        event("succession_protege_introduction", {
            title: "The Loyal Lieutenant",
            description: "Andrei Volkov receives the news with characteristic composure. He's served you for fifteen years. Survived three purges. He knows where the bodies are buried - literally, in some cases. 'I am honored,' he says, bowing slightly. 'I will not disappoint you.' But you notice something in his eyes. Calculation. Ambition. Perhaps that's what you need.",
            weight: 0,
            storylines: ['succession'],
            characterId: "andrei",
            conditions: {
                flag: "heir_type_protege"
            },
            
            choices: [
                choice("'I know you won't. You're practically my son.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "andrei_trusted": true
                        },
                        relationships: { andrei: 25 }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                }),
                
                choice("'See that you don't. I will be watching closely.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "andrei_warned": true
                        },
                        relationships: { andrei: 5 }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                }),
                
                choice("'This is conditional. You must prove yourself first.'", {
                    effects: {
                        flags: {
                            "andrei_conditional": true
                        },
                        relationships: { andrei: 10 }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                })
            ]
        }),
        
        event("succession_oligarch_introduction", {
            title: "The Money Man",
            description: "Maxim Orlov - steel baron, media owner, and one of the richest men in the Federation - learns he's being considered for succession. He's surprised. Then intrigued. Wealthy men rarely refuse power. 'An interesting proposition,' he says, adjusting his Patek Philippe. 'What would you need from me?'",
            weight: 0,
            storylines: ['succession'],
            characterId: "maxim",
            conditions: {
                flag: "heir_type_oligarch"
            },
            
            choices: [
                choice("'Loyalty above all. Your money is secondary.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "maxim_loyalty_demanded": true
                        },
                        relationships: { maxim: 10 }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                }),
                
                choice("'Your resources. This transition won't be cheap.'", {
                    effects: {
                        stats: {
                            treasury: 80,
                            elite: 3
                        },
                        flags: {
                            "maxim_financial_partnership": true
                        },
                        relationships: { maxim: 15 }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                }),
                
                choice("'Your discretion. No one can know until I say.'", {
                    effects: {
                        stats: {
                            elite: 8
                        },
                        flags: {
                            "maxim_secret_heir": true
                        },
                        relationships: { maxim: 5 }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                })
            ]
        }),
        
        // Entry point for crossover from Golden Circle
        event("succession_oligarch_heir", {
            title: "The Elevated Oligarch",
            description: "The oligarch you've chosen to elevate arrives at the Kremlin, equal parts nervous and excited. He's used to buying influence. Now he's being given power directly. 'I won't pretend to understand politics,' he admits. 'But I understand power. And loyalty.' Whether he means it remains to be seen.",
            weight: 0,
            storylines: ['succession'],
            conditions: {
                flag: "oligarch_became_heir"
            },
            
            choices: [
                choice("'You'll learn politics. I'll teach you what matters.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "oligarch_heir_trained": true,
                            "heir_type_oligarch": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                }),
                
                choice("'Just remember: you serve me now, not your board.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "oligarch_heir_subordinated": true,
                            "heir_type_oligarch": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                })
            ]
        }),
        
        event("succession_forced_return", {
            title: "The Question Returns",
            description: "You delayed the succession question. But time moves forward. A health scare - minor, supposedly - has the elite whispering again. Your intelligence chief reports that three generals have been meeting privately. 'Contingency planning,' they call it. The question you avoided has found you.",
            weight: 5,
            storylines: ['succession'],
            conditions: {
                flag: "succession_delayed"
            },
            
            choices: [
                choice("Fine. Summon the candidates again.", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "succession_delayed": false
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                }),
                
                choice("Arrest the generals. I'll decide when I decide.", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: 5
                        },
                        flags: {
                            "succession_generals_arrested": true
                        }
                    },
                    legacy: {
                        icon: "👊",
                        name: "The Stubborn",
                        weight: -5,
                        explanation: "You refused to plan for succession and punished those who did."
                    }
                })
            ]
        }),
        
        // ================================================================
        // ACT 2: THE TESTING (Depth 2-3)
        // ================================================================
        
        event("succession_first_test", {
            title: "The Governor's Crisis",
            description: "A regional governor is causing problems. He's skimming too much, ignoring orders, and building his own little fiefdom in the East. A perfect test for your chosen heir. You summon them. 'Go to Krasnoyarsk. Resolve the situation.' How they handle this will tell you everything.",
            weight: 0,
            storylines: ['succession'],
            
            choices: [
                choice("'Handle it however you see fit. Full authority.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "heir_full_authority": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_test_result")
                    ]
                }),
                
                choice("'I expect the governor to be replaced. Be thorough.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "heir_specific_orders": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_test_result")
                    ]
                }),
                
                choice("'Don't kill him. Just... remind him who's in charge.'", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: -3
                        },
                        flags: {
                            "heir_restrained_orders": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_test_result")
                    ]
                }),
                
                choice("'Actually, I'll handle this myself. Watch and learn.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "heir_sidelined": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_sidelined")
                    ]
                })
            ]
        }),
        
        event("succession_test_result", {
            title: "The Report",
            description: "Your heir returns from Krasnoyarsk. The governor has been... dealt with. But the method varies depending on who you sent and what orders you gave.",
            weight: 0,
            storylines: ['succession'],
            
            narrativeVariations: [
                {
                    conditions: { flag: "heir_type_son" },
                    description: "Your son returns from Krasnoyarsk. He looks pale. 'The governor... agreed to retire,' he says carefully. 'There were some complications.' The complications, you learn later, involved the governor fleeing to Montenegro with $40 million in state funds."
                },
                {
                    conditions: { flag: "heir_type_protege" },
                    description: "Andrei returns from Krasnoyarsk. He's calm, precise. 'The governor has been replaced. His successor is grateful and compliant. The previous administration's corruption has been... documented.' He hands you a file thick with compromising material."
                },
                {
                    conditions: { flag: "heir_type_oligarch" },
                    description: "Maxim returns from Krasnoyarsk. He's cheerful. 'The governor and I came to an arrangement. He retires with dignity. His replacement owes me several favors. It cost us about $20 million in... consulting fees. But cheaper than a war.'"
                }
            ],
            
            choices: [
                choice("'Well done. You're learning.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "heir_praised": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_public_introduction")
                    ]
                }),
                
                choice("'This wasn't what I asked for. We need to talk.'", {
                    effects: {
                        stats: {
                            elite: -3
                        },
                        flags: {
                            "heir_criticized": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_private_lesson")
                    ]
                }),
                
                choice("'Let's discuss what went wrong. Learn from this.'", {
                    effects: {
                        flags: {
                            "heir_taught": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_private_lesson")
                    ]
                })
            ]
        }),
        
        event("succession_heir_sidelined", {
            title: "The Watching Heir",
            description: "You handled the governor yourself. Your heir watched from the sidelines - learning, perhaps, but also feeling diminished. They hide it well, but your intelligence chief reports... concerns. 'They're questioning whether you actually intend to step aside.'",
            weight: 0,
            storylines: ['succession'],
            
            choices: [
                choice("'Give them another chance. A real one this time.'", {
                    effects: {
                        flags: {
                            "heir_sidelined": false
                        }
                    },
                    unlocks: [
                        eventRef("succession_first_test")
                    ]
                }),
                
                choice("'They should understand patience. Power isn't given freely.'", {
                    effects: {
                        stats: {
                            elite: -3
                        },
                        flags: {
                            "heir_relationship_strained": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_public_introduction")
                    ]
                }),
                
                choice("'Perhaps they're not the right choice after all.'", {
                    effects: {
                        stats: {
                            elite: -8
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                })
            ]
        }),
        
        event("succession_private_lesson", {
            title: "Behind Closed Doors",
            description: "You and your heir meet privately. The Krasnoyarsk situation revealed gaps - in their understanding, their methods, perhaps their judgment. This is a teaching moment. Or a warning moment. Your choice.",
            weight: 0,
            storylines: ['succession'],
            
            choices: [
                choice("'Let me explain how this really works...'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "heir_mentored": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_public_introduction")
                    ]
                }),
                
                choice("'Disappoint me again and there will be consequences.'", {
                    effects: {
                        flags: {
                            "heir_threatened": true,
                            "heir_relationship_strained": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_public_introduction")
                    ]
                }),
                
                choice("'I'm having second thoughts about this arrangement.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "heir_status_uncertain": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_allies")
                    ]
                })
            ]
        }),
        
        event("succession_public_introduction", {
            title: "The Announcement",
            description: "It's time to formally introduce your heir to the public. State television is prepared. The speech is written. Your heir stands beside you, trying to look confident. But announcements have consequences - your enemies will know who to target, your allies will know whose favor to seek.",
            weight: 5,
            storylines: ['succession'],
            
            choices: [
                choice("Full announcement. 'He is my chosen successor.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            anger: -5
                        },
                        flags: {
                            "heir_publicly_announced": true
                        }
                    },
                    legacy: {
                        icon: "📣",
                        name: "The Anointer",
                        weight: 0,
                        explanation: "You publicly named your successor."
                    },
                    unlocks: [
                        eventRef("succession_heir_allies")
                    ]
                }),
                
                choice("Subtle introduction. 'A rising star in our leadership.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "heir_soft_introduced": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_allies")
                    ]
                }),
                
                choice("Not yet. Keep them guessing.", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "heir_still_secret": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_allies")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 3: THE SHADOW GROWS (Depth 3-4)
        // ================================================================
        
        event("succession_heir_allies", {
            title: "The Heir's Friends",
            description: "Your intelligence service reports something concerning: your heir is cultivating their own network. Loyal generals. Friendly oligarchs. Media supporters who mention them favorably. They're building a power base. Normal succession behavior? Or something more... premature?",
            weight: 5,
            storylines: ['succession'],
            
            choices: [
                choice("'Good. They need allies to rule effectively.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "heir_network_approved": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_impatience")
                    ]
                }),
                
                choice("'Monitor them closely. Trust but verify.'", {
                    effects: {
                        stats: {
                            treasury: -10
                        },
                        flags: {
                            "heir_monitored": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_impatience")
                    ]
                }),
                
                choice("'Cut them off. Isolate them from other power centers.'", {
                    effects: {
                        stats: {
                            elite: -10
                        },
                        flags: {
                            "heir_isolated": true,
                            "heir_relationship_strained": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_impatience")
                    ]
                }),
                
                choice("'Confront them directly. What are they planning?'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "heir_confronted_about_network": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_confrontation")
                    ]
                })
            ]
        }),
        
        event("succession_heir_impatience", {
            title: "The Whispers",
            description: "Rumors reach you through multiple channels: your heir has been overheard saying things. 'The old man should step aside.' 'How much longer must we wait?' 'He's losing his touch.' Perhaps it was taken out of context. Perhaps they're being framed. Perhaps not.",
            weight: 4,
            storylines: ['succession'],
            
            choices: [
                choice("Ignore it. Rumors are inevitable in this game.", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "heir_rumors_ignored": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_golden_circle_crossover")
                    ]
                }),
                
                choice("Summon them. Demand explanation.", {
                    effects: {
                        stats: {
                            elite: -3
                        },
                        flags: {
                            "heir_summoned_for_rumors": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_confrontation")
                    ]
                }),
                
                choice("Reduce their public role. Cool things down.", {
                    effects: {
                        stats: {
                            elite: -8
                        },
                        flags: {
                            "heir_role_reduced": true,
                            "heir_relationship_strained": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_golden_circle_crossover")
                    ]
                }),
                
                choice("This changes everything. Begin full surveillance.", {
                    effects: {
                        stats: {
                            treasury: -20
                        },
                        flags: {
                            "heir_under_surveillance": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_loyalty_crossover")
                    ]
                })
            ]
        }),
        
        event("succession_confrontation", {
            title: "The Reckoning",
            description: "You summon your heir to a private meeting. Just the two of you. No advisors, no witnesses. They enter the room knowing something is wrong. The question is: how wrong?",
            weight: 0,
            storylines: ['succession'],
            
            choices: [
                choice("'I've heard disturbing things. Explain yourself.'", {
                    effects: {
                        flags: {
                            "confrontation_accusatory": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_response")
                    ]
                }),
                
                choice("'Let's speak honestly. Are you ready for power?'", {
                    effects: {
                        flags: {
                            "confrontation_direct": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_response")
                    ]
                }),
                
                choice("'Someone is trying to drive us apart. Who benefits?'", {
                    effects: {
                        flags: {
                            "confrontation_paranoid": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_external_enemy")
                    ]
                })
            ]
        }),
        
        event("succession_heir_response", {
            title: "The Answer",
            description: "Your heir's response will determine everything. They could deny, explain, apologize, or... not.",
            weight: 0,
            storylines: ['succession'],
            
            narrativeVariations: [
                {
                    conditions: { flag: "heir_relationship_strained" },
                    description: "Your heir doesn't flinch. 'Yes, I said those things. Because they're true. You're holding on too long. The elite are restless. The people are tired. If you truly want a succession, then succeed.' Their defiance is almost admirable."
                },
                {
                    conditions: { flag: "heir_praised" },
                    description: "Your heir looks genuinely hurt. 'Taken out of context,' they insist. 'I was frustrated with others who doubt you, not with you. I would never—' They seem sincere. But everyone seems sincere, until they don't."
                }
            ],
            
            choices: [
                choice("'I believe you. This matter is closed.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "heir_forgiven": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_assassination_attempt")
                    ]
                }),
                
                choice("'I don't believe you. But I'll give you one more chance.'", {
                    effects: {
                        flags: {
                            "heir_probation": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_assassination_attempt")
                    ]
                }),
                
                choice("'This ends your candidacy. You're finished.'", {
                    effects: {
                        stats: {
                            elite: -10
                        },
                        flags: {
                            "heir_rejected": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_golden_circle_crossover")
                    ]
                }),
                
                choice("'Guards. Arrest them.'", {
                    effects: {
                        stats: {
                            elite: -20,
                            anger: 5
                        },
                        flags: {
                            "heir_arrested": true
                        }
                    },
                    legacy: {
                        icon: "⛓️",
                        name: "The Heir Jailer",
                        weight: -10,
                        explanation: "You arrested your own chosen successor."
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                })
            ]
        }),
        
        event("succession_external_enemy", {
            title: "The Third Party",
            description: "You and your heir realize someone has been manipulating you both. Planting rumors. Creating division. But who? The list of suspects is long: jealous oligarchs, rival factions, foreign intelligence, perhaps even your own security services.",
            weight: 0,
            storylines: ['succession'],
            
            choices: [
                choice("'We find them together. Show them we're united.'", {
                    effects: {
                        stats: {
                            elite: 8
                        },
                        flags: {
                            "heir_alliance_strengthened": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_loyal_heir")
                    ]
                }),
                
                choice("'I'll handle this. You stay out of sight.'", {
                    effects: {
                        stats: {
                            elite: 3
                        }
                    },
                    unlocks: [
                        eventRef("succession_assassination_attempt")
                    ]
                }),
                
                choice("'Perhaps you orchestrated this division yourself.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "heir_relationship_strained": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_response")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // CROSSOVER EVENTS
        // ================================================================
        
        event("succession_golden_circle_crossover", {
            title: "The Disappointing Heir",
            description: "Your chosen heir has failed you. Too weak, too corrupt, too ambitious - the reason hardly matters now. Perhaps they'd be better as just another oligarch: rich but powerless. You could demote them, give them a golden parachute, and start the search over. Money instead of power.",
            weight: 3,
            storylines: ['succession', 'golden-circle'],
            conditions: {
                allOf: [
                    { flag: "succession_active", equals: true },
                    { flag: "heir_demoted_to_oligarch", equals: false }
                ]
            },
            
            choices: [
                choice("'Demote them. They can be wealthy, not powerful.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            treasury: -50
                        },
                        flags: {
                            "heir_demoted_to_oligarch": true
                        }
                    },
                    legacy: {
                        icon: "💰",
                        name: "The Demoter",
                        weight: -3,
                        explanation: "You bought off your failed heir with wealth."
                    },
                    unlocks: [
                        eventRef("golden_circle_new_oligarch"),
                        eventRef("succession_the_candidates")
                    ]
                }),
                
                choice("'Give them another chance. People can change.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "heir_second_chance": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_assassination_attempt")
                    ]
                }),
                
                choice("'Remove them entirely. No half-measures.'", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: 5
                        },
                        flags: {
                            "heir_eliminated": true
                        }
                    },
                    legacy: {
                        icon: "💀",
                        name: "The Heir Killer",
                        weight: -15,
                        explanation: "You eliminated your own successor."
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                })
            ]
        }),
        
        event("succession_loyalty_crossover", {
            title: "The Heir's Shadow Network",
            description: "Full surveillance of your heir has revealed more than rumors. They've been building a parallel power structure: loyal generals, intelligence contacts, their own surveillance apparatus. Either they're protecting themselves... or preparing something.",
            weight: 0,
            storylines: ['succession', 'loyalty-apparatus'],
            conditions: {
                flag: "heir_under_surveillance"
            },
            
            choices: [
                choice("'Dismantle their network. They don't need their own spies.'", {
                    effects: {
                        stats: {
                            elite: -15
                        },
                        flags: {
                            "purge_cleared_succession": true,
                            "heir_network_destroyed": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_heir_investigation")
                    ]
                }),
                
                choice("'Let them keep their network. They'll need it eventually.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "heir_network_tolerated": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_loyal_heir")
                    ]
                }),
                
                choice("'This is unacceptable. Arrest them and their co-conspirators.'", {
                    effects: {
                        stats: {
                            elite: -25,
                            anger: 10
                        },
                        flags: {
                            "heir_conspiracy_purged": true
                        }
                    },
                    legacy: {
                        icon: "🔥",
                        name: "The Dynasty Destroyer",
                        weight: -12,
                        explanation: "You purged your heir's entire network."
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                })
            ]
        }),
        
        // Entry point from Loyalty Apparatus crossover
        event("succession_network_purged", {
            title: "The Isolated Heir",
            description: "Your heir's network has been dismantled. Their allies arrested, their contacts neutralized. They sit alone now, stripped of everything but the title of successor. They look at you with something between fear and hatred. 'Was this necessary?' they ask quietly.",
            weight: 0,
            storylines: ['succession'],
            conditions: {
                flag: "purge_cleared_succession"
            },
            
            choices: [
                choice("'Necessary for both of us. Now we rebuild. Together.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "heir_relationship_rebuilding": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_moment")
                    ]
                }),
                
                choice("'You should have trusted me, not built your own empire.'", {
                    effects: {
                        flags: {
                            "heir_relationship_strained": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_coup")
                    ]
                }),
                
                choice("'Perhaps you're not suitable after all.'", {
                    effects: {
                        stats: {
                            elite: -10
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 4: THE CRISIS (Depth 4-5)
        // ================================================================
        
        event("succession_assassination_attempt", {
            title: "The Bullet",
            description: "Someone tried to kill your heir. A sniper during a public appearance - the bullet missed by inches. Your heir is safe, shaken, defiant. 'I won't hide,' they insist. But who ordered this? Your enemies? Their enemies? A false flag? The investigation begins.",
            weight: 4,
            storylines: ['succession'],
            
            choices: [
                choice("'Find who did this. Spare no expense or mercy.'", {
                    effects: {
                        stats: {
                            treasury: -50,
                            elite: 5
                        },
                        flags: {
                            "assassination_investigated": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_investigation_result")
                    ]
                }),
                
                choice("'Investigate quietly. Trust no one with this.'", {
                    effects: {
                        stats: {
                            treasury: -20
                        },
                        flags: {
                            "assassination_secret_investigation": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_investigation_result")
                    ]
                }),
                
                choice("'Double their security. Show the world we stand together.'", {
                    effects: {
                        stats: {
                            treasury: -30,
                            elite: 8
                        },
                        flags: {
                            "heir_protection_increased": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_loyal_heir")
                    ]
                }),
                
                choice("'Curious timing. Investigate THEM too.'", {
                    effects: {
                        stats: {
                            treasury: -30
                        },
                        flags: {
                            "heir_suspected_false_flag": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_investigation_result")
                    ]
                })
            ]
        }),
        
        event("succession_investigation_result", {
            title: "The Findings",
            description: "The investigation is complete. The trail leads to... an unexpected place.",
            weight: 0,
            storylines: ['succession'],
            
            narrativeVariations: [
                {
                    conditions: { flag: "heir_relationship_strained" },
                    description: "The investigation points to a faction within your own government - people who fear your heir's rise. But there are also troubling signs that your heir knew the attempt was coming. Did they let it happen for sympathy?"
                },
                {
                    conditions: { flag: "heir_forgiven" },
                    description: "The trail leads to foreign intelligence services - they want to destabilize your succession, create chaos. Your heir was a genuine target. This changes the equation: you need each other now more than ever."
                }
            ],
            
            choices: [
                choice("'Purge the conspirators. All of them.'", {
                    effects: {
                        stats: {
                            elite: -20,
                            anger: 5
                        },
                        flags: {
                            "assassination_purge": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_moment")
                    ]
                }),
                
                choice("'Use this information carefully. Leverage, not vengeance.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "assassination_leverage": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_moment")
                    ]
                }),
                
                choice("'I'm not convinced of this conclusion. Keep investigating.'", {
                    effects: {
                        stats: {
                            treasury: -20
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_coup")
                    ]
                })
            ]
        }),
        
        event("succession_heir_coup", {
            title: "The Move",
            description: "Your intelligence chief wakes you at 3 AM. Your heir is mobilizing. Loyal generals are taking positions around the capital. Communications are being jammed. It's happening. They're moving against you.",
            weight: 3,
            storylines: ['succession'],
            conditions: {
                flag: "heir_relationship_strained"
            },
            
            choices: [
                choice("'Arrest them immediately. Crush this before it spreads.'", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: 15,
                            treasury: -20
                        },
                        flags: {
                            "heir_coup_crushed": true
                        }
                    },
                    legacy: {
                        icon: "⚔️",
                        name: "The Coup Survivor",
                        weight: -5,
                        explanation: "Your own heir tried to overthrow you. You stopped them."
                    },
                    unlocks: [
                        eventRef("succession_after_coup")
                    ]
                }),
                
                choice("'Negotiate. Perhaps we can share power.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            treasury: -10
                        },
                        flags: {
                            "heir_coup_negotiated": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_power_sharing")
                    ]
                }),
                
                choice("'Flee to the emergency bunker. Fight back from there.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 5
                        },
                        flags: {
                            "fled_to_bunker": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_bunker_standoff")
                    ]
                }),
                
                choice("'Accept it. Step down gracefully while I still can.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            anger: -10,
                            personalWealth: 10
                        },
                        flags: {
                            "voluntary_abdication": true
                        }
                    },
                    legacy: {
                        icon: "🕊️",
                        name: "The Graceful Exit",
                        weight: 10,
                        explanation: "You knew when to step aside."
                    },
                    unlocks: [
                        eventRef("succession_the_aftermath")
                    ]
                })
            ]
        }),
        
        event("succession_loyal_heir", {
            title: "The Faithful Servant",
            description: "Your heir comes to you privately, looking troubled. 'People are trying to turn me against you,' they say. 'Offering me deals. Promising support if I move early.' They hand you a list of names - people who approached them, tried to accelerate the succession. They could have used this. They didn't.",
            weight: 3,
            storylines: ['succession'],
            conditions: {
                anyOf: [
                    { flag: "heir_alliance_strengthened" },
                    { flag: "heir_network_tolerated" },
                    { flag: "heir_praised" }
                ]
            },
            
            choices: [
                choice("'I knew I chose well. We face this together.'", {
                    effects: {
                        stats: {
                            elite: 10
                        },
                        flags: {
                            "heir_loyalty_confirmed": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_moment")
                    ]
                }),
                
                choice("'Interesting. What would you do about these people?'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "heir_given_authority_to_purge": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_moment")
                    ]
                }),
                
                choice("'Trust no one. Not even yourself. Not even me.'", {
                    effects: {
                        flags: {
                            "paranoia_warning": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_moment")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 5: THE TRANSITION (Depth 5-6)
        // ================================================================
        
        event("succession_after_coup", {
            title: "The Morning After",
            description: "The coup is over. Your heir is in custody, along with dozens of co-conspirators. The streets are quiet - too quiet. The elite are terrified. What comes next will define your final years.",
            weight: 0,
            storylines: ['succession'],
            
            choices: [
                choice("'Execute the ringleaders. Mercy invites repetition.'", {
                    effects: {
                        stats: {
                            elite: -20,
                            anger: 10
                        }
                    },
                    legacy: {
                        icon: "💀",
                        name: "The Executioner",
                        weight: -20,
                        explanation: "You executed your own heir for treason."
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                }),
                
                choice("'Prison. Long sentences. Let them think about what they did.'", {
                    effects: {
                        stats: {
                            elite: -10
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                }),
                
                choice("'Exile. I don't want their blood on my hands.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -5
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_candidates")
                    ]
                })
            ]
        }),
        
        event("succession_power_sharing", {
            title: "The Arrangement",
            description: "You and your heir have negotiated a power-sharing arrangement. You remain the formal leader, but they control day-to-day governance. It's uncomfortable. It's unstable. But it beats civil war - for now.",
            weight: 0,
            storylines: ['succession'],
            
            choices: [
                choice("'This can work. We serve the nation together.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "power_sharing_optimistic": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_aftermath")
                    ]
                }),
                
                choice("'This is temporary. I'm just waiting for the right moment.'", {
                    effects: {
                        flags: {
                            "power_sharing_waiting": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_the_aftermath")
                    ]
                }),
                
                choice("'I've made a mistake. I need to reassert control.'", {
                    effects: {
                        stats: {
                            elite: -15
                        }
                    },
                    unlocks: [
                        eventRef("succession_heir_coup")
                    ]
                })
            ]
        }),
        
        event("succession_bunker_standoff", {
            title: "The Bunker",
            description: "You're in the presidential bunker, surrounded by your remaining loyalists. Your heir controls the capital above. Communications are sporadic. This could last hours or weeks. Either the coup consolidates or the tide turns.",
            weight: 0,
            storylines: ['succession'],
            
            choices: [
                choice("'Rally the regions. The military will choose me.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "bunker_military_rally": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_after_coup")
                    ]
                }),
                
                choice("'Negotiate from strength. They can't hold the center.'", {
                    effects: {
                        flags: {
                            "bunker_negotiation": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_power_sharing")
                    ]
                }),
                
                choice("'Escape abroad. Live to fight another day.'", {
                    effects: {
                        stats: {
                            personalWealth: -30
                        },
                        flags: {
                            "leader_exiled": true
                        }
                    },
                    legacy: {
                        icon: "🚪",
                        name: "The Exile",
                        weight: -15,
                        explanation: "Your heir drove you from power."
                    },
                    unlocks: [
                        eventRef("succession_the_aftermath")
                    ]
                })
            ]
        }),
        
        event("succession_the_moment", {
            title: "The End Approaches",
            description: "The moment has come. Your health is failing, or your enemies are closing in, or perhaps you've simply had enough. The succession you've been planning must now happen. Your heir stands ready - as ready as anyone can be.",
            weight: 3,
            storylines: ['succession'],
            
            choices: [
                choice("'A formal transition. Dignity above all.'", {
                    effects: {
                        stats: {
                            elite: 10,
                            anger: -5
                        },
                        flags: {
                            "succession_dignified": true
                        }
                    },
                    legacy: {
                        icon: "🎭",
                        name: "The Statesman",
                        weight: 10,
                        explanation: "You managed the succession with grace."
                    },
                    unlocks: [
                        eventRef("succession_the_aftermath")
                    ]
                }),
                
                choice("'Fake my death. Rule from the shadows.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "shadow_ruler": true
                        }
                    },
                    legacy: {
                        icon: "👻",
                        name: "The Shadow",
                        weight: -5,
                        explanation: "You never truly let go of power."
                    },
                    unlocks: [
                        eventRef("succession_the_aftermath")
                    ]
                }),
                
                choice("'Take them all with me. No successor.'", {
                    effects: {
                        stats: {
                            elite: -30,
                            anger: 20
                        },
                        flags: {
                            "succession_scorched_earth": true
                        }
                    },
                    legacy: {
                        icon: "🔥",
                        name: "The Destroyer",
                        weight: -25,
                        explanation: "If you couldn't rule, no one would."
                    }
                }),
                
                choice("'One more fight. I'm not done yet.'", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: 5
                        },
                        flags: {
                            "succession_delayed_final": true
                        }
                    }
                })
            ]
        }),
        
        event("succession_the_aftermath", {
            title: "The New Order",
            description: "Your heir takes power. What happens next depends on everything that came before - every choice, every lesson, every betrayal.",
            weight: 0,
            storylines: ['succession'],
            
            narrativeVariations: [
                {
                    conditions: { flag: "heir_loyalty_confirmed" },
                    description: "Your heir takes power smoothly. They honor your legacy, maintain your systems, protect your family. The transition is peaceful. Perhaps you chose well after all."
                },
                {
                    conditions: { flag: "heir_relationship_strained" },
                    description: "Your heir takes power and immediately begins erasing you. Your portraits come down. Your policies reverse. Your name becomes synonymous with 'the old regime.' They're building something new on the ruins of everything you built."
                },
                {
                    conditions: { flag: "leader_exiled" },
                    description: "From your villa in Dubai, you watch your heir consolidate power. They're doing well, you have to admit. Better than you expected. You count your offshore millions and wonder if you'll ever go home."
                }
            ],
            
            choices: [
                choice("'It was all worth it.'", {
                    effects: {
                        stats: {
                            personalWealth: 5
                        }
                    },
                    legacy: {
                        icon: "👑",
                        name: "The Dynasty Founder",
                        weight: 5,
                        explanation: "You built something that outlasted you."
                    }
                }),
                
                choice("'I should have done things differently.'", {
                    effects: {
                        stats: {
                            anger: -5
                        }
                    },
                    legacy: {
                        icon: "🤔",
                        name: "The Reflective",
                        weight: 0,
                        explanation: "In the end, you wondered if it was worth it."
                    }
                }),
                
                choice("'History will judge me kindly.'", {
                    effects: {},
                    legacy: {
                        icon: "📜",
                        name: "The Confident",
                        weight: -5,
                        explanation: "You never doubted yourself, even at the end."
                    }
                })
            ]
        })
    ]
});

export default successionStoryline;

