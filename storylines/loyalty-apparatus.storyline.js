/**
 * The Loyalty Apparatus - Paranoia and Purge Storyline
 * 
 * Size: ~25 events, Depth 5-6
 * Triggered by: Dacha Summit → "Before we divide the spoils—who here can I truly trust?"
 * 
 * Building the surveillance state within your own elite. Paranoia, informants,
 * and purges. When you start seeing enemies everywhere, you might create them.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

const loyaltyApparatusStoryline = defineStoryline({
    id: 'loyalty-apparatus',
    name: 'The Loyalty Apparatus',
    description: 'Paranoia, surveillance, and the price of trust',
    theme: {
        borderColor: '#2F4F4F',  // Dark Slate Gray
        accentColor: '#778899'   // Light Slate Gray
    },
    
    tree: [
        // ================================================================
        // ACT 1: THE WATCHERS (Depth 1-2)
        // ================================================================
        
        event("loyalty_the_dossiers", {
            title: "The Director's Files",
            description: "Director Sokolov of the Security Service arrives at your dacha with a leather briefcase. His eyes are pale, unblinking. Inside the case: dossiers on every person in your inner circle. Affairs. Debts. Secret meetings. Embarrassing photos. 'Knowledge is protection,' he says. 'Would you like to know what I know?'",
            weight: 0,  // Triggered only
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            
            choices: [
                choice("'Tell me everything. Spare no details.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            treasury: -20
                        },
                        flags: {
                            "full_dossiers_reviewed": true
                        },
                        relationships: { sokolov: 15 }
                    },
                    unlocks: [
                        eventRef("loyalty_first_target")
                    ]
                }),
                
                choice("'Just the serious threats. I don't need gossip.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "selective_intelligence": true
                        },
                        relationships: { sokolov: 5 }
                    },
                    unlocks: [
                        eventRef("loyalty_first_target")
                    ]
                }),
                
                choice("'Keep your files. I trust my people.'", {
                    effects: {
                        stats: {
                            elite: 10
                        },
                        flags: {
                            "dossiers_rejected": true
                        },
                        relationships: { sokolov: -15 }
                    },
                    unlocks: [
                        eventRef("loyalty_trust_tested")
                    ]
                }),
                
                choice("'What do you have on yourself, Director?'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "sokolov_challenged": true
                        },
                        relationships: { sokolov: -10 }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_file")
                    ]
                })
            ]
        }),
        
        event("loyalty_first_target", {
            title: "The Suspicious Oligarch",
            description: "Sokolov's files reveal something troubling: one of your oligarch friends, Konstantin, has been meeting with Western diplomats. Frequently. In private. In Vienna. It could be business - he has investments there. Or it could be something else entirely.",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            
            choices: [
                choice("'Surveillance. I want to know everything he says and does.'", {
                    effects: {
                        stats: {
                            treasury: -30
                        },
                        flags: {
                            "konstantin_surveilled": true
                        },
                        relationships: { sokolov: 10 }
                    },
                    unlocks: [
                        eventRef("loyalty_surveillance_results")
                    ]
                }),
                
                choice("'Confront him directly. Gauge his reaction.'", {
                    effects: {
                        stats: {
                            elite: -8
                        },
                        flags: {
                            "konstantin_confronted": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_confrontation_result")
                    ]
                }),
                
                choice("'It's probably nothing. Leave it.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "threat_ignored": true
                        },
                        relationships: { sokolov: -10 }
                    },
                    unlocks: [
                        eventRef("loyalty_network_expansion")
                    ]
                }),
                
                choice("'Arrest him. Send a message.'", {
                    effects: {
                        stats: {
                            elite: -20,
                            treasury: 80,
                            anger: 5
                        },
                        flags: {
                            "konstantin_arrested_early": true
                        }
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Swift Judge",
                        weight: -8,
                        explanation: "You arrested an oligarch on suspicion alone."
                    },
                    unlocks: [
                        eventRef("loyalty_first_purge")
                    ]
                })
            ]
        }),
        
        event("loyalty_trust_tested", {
            title: "The Betrayal",
            description: "You rejected Sokolov's dossiers. You trusted your people. Now you're paying for it. One of your inner circle has been caught - red-handed - passing information to a Western journalist. Your trust was misplaced.",
            weight: 4,
            storylines: ['loyalty-apparatus'],
            conditions: {
                flag: "dossiers_rejected"
            },
            
            choices: [
                choice("'I was wrong. Director Sokolov, show me everything.'", {
                    effects: {
                        stats: {
                            elite: -10
                        },
                        flags: {
                            "trust_lesson_learned": true,
                            "full_dossiers_reviewed": true
                        },
                        relationships: { sokolov: 20 }
                    },
                    unlocks: [
                        eventRef("loyalty_first_purge")
                    ]
                }),
                
                choice("'This was one traitor. I won't become paranoid.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "trust_maintained": true
                        },
                        relationships: { sokolov: -5 }
                    },
                    unlocks: [
                        eventRef("loyalty_network_expansion")
                    ]
                }),
                
                choice("'Someone set me up. Investigate the investigation.'", {
                    effects: {
                        stats: {
                            treasury: -20
                        },
                        flags: {
                            "counter_investigation": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_power")
                    ]
                })
            ]
        }),
        
        event("loyalty_sokolov_file", {
            title: "The Director's Secrets",
            description: "Sokolov barely blinks at your question. 'Of course I have a file on myself,' he says. 'Would you like to see it?' He opens it. The contents are... mundane. Too mundane. Either he's the only honest man in the Federation, or there's another file somewhere.",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            
            choices: [
                choice("'Very thorough. I appreciate your transparency.'", {
                    effects: {
                        relationships: { sokolov: 5 }
                    },
                    unlocks: [
                        eventRef("loyalty_first_target")
                    ]
                }),
                
                choice("'This is sanitized. Show me the real one.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "sokolov_distrusted": true
                        },
                        relationships: { sokolov: -20 }
                    },
                    unlocks: [
                        eventRef("loyalty_parallel_investigation")
                    ]
                }),
                
                choice("'Everyone has secrets, Director. Even you.'", {
                    effects: {
                        flags: {
                            "sokolov_warned": true
                        },
                        relationships: { sokolov: -5 }
                    },
                    unlocks: [
                        eventRef("loyalty_first_target")
                    ]
                })
            ]
        }),
        
        event("loyalty_surveillance_results", {
            title: "The Tapes",
            description: "The surveillance of Konstantin has produced results. He is indeed meeting with Western officials - but not as a traitor. He's trying to negotiate his family's escape route if 'things go badly.' He's preparing for your fall. Disloyal? Yes. Treasonous? That's a matter of interpretation.",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            
            choices: [
                choice("'Preparing for my fall is treason. Arrest him.'", {
                    effects: {
                        stats: {
                            elite: -15,
                            treasury: 60
                        },
                        flags: {
                            "konstantin_arrested": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_first_purge")
                    ]
                }),
                
                choice("'Understandable, but unacceptable. Seize his passport.'", {
                    effects: {
                        stats: {
                            elite: -8
                        },
                        flags: {
                            "konstantin_trapped": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_network_expansion")
                    ]
                }),
                
                choice("'Keep watching. He might lead us to others.'", {
                    effects: {
                        stats: {
                            treasury: -15
                        },
                        flags: {
                            "extended_surveillance": true
                        },
                        relationships: { sokolov: 10 }
                    },
                    unlocks: [
                        eventRef("loyalty_network_expansion")
                    ]
                }),
                
                choice("'I can use this. Summon him. Time for a private chat.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "konstantin_leveraged": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_network_expansion")
                    ]
                })
            ]
        }),
        
        event("loyalty_confrontation_result", {
            title: "The Denial",
            description: "You confronted Konstantin about his meetings in Vienna. His reaction was... instructive. He denied nothing, admitted nothing, but his face told a story. 'Business opportunities,' he said smoothly. 'Nothing that concerns the state.' He's lying. But so is everyone, always.",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            
            choices: [
                choice("'I believe you. This matter is closed.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "konstantin_forgiven": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_network_expansion")
                    ]
                }),
                
                choice("'I don't believe you. But I'll be watching.'", {
                    effects: {
                        flags: {
                            "konstantin_watched": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_network_expansion")
                    ]
                }),
                
                choice("'You have 48 hours to explain yourself. Properly.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "konstantin_ultimatum": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_first_purge")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 2: THE PURGE BEGINS (Depth 2-3)
        // ================================================================
        
        event("loyalty_network_expansion", {
            title: "The Eyes Multiply",
            description: "Director Sokolov proposes expanding the surveillance network. More informants embedded in every ministry. Better technology - imported from China, ironically. Deeper access to financial records, communications, even private homes. 'We can see everything,' he promises. 'For a price.'",
            weight: 5,
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            
            choices: [
                choice("'Do it. Security is worth any cost.'", {
                    effects: {
                        stats: {
                            treasury: -80,
                            elite: -5
                        },
                        flags: {
                            "surveillance_maximum": true
                        },
                        relationships: { sokolov: 20 }
                    },
                    unlocks: [
                        eventRef("loyalty_first_purge")
                    ]
                }),
                
                choice("'Expand carefully. I don't want everyone paranoid.'", {
                    effects: {
                        stats: {
                            treasury: -40
                        },
                        flags: {
                            "surveillance_moderate": true
                        },
                        relationships: { sokolov: 5 }
                    },
                    unlocks: [
                        eventRef("loyalty_first_purge")
                    ]
                }),
                
                choice("'Focus on the elite only. Leave the public alone.'", {
                    effects: {
                        stats: {
                            treasury: -30,
                            anger: -5
                        },
                        flags: {
                            "surveillance_elite_only": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_first_purge")
                    ]
                }),
                
                choice("'You have enough power already, Director.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "surveillance_limited": true
                        },
                        relationships: { sokolov: -15 }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_resentment")
                    ]
                })
            ]
        }),
        
        event("loyalty_first_purge", {
            title: "The Night of Long Shadows",
            description: "The evidence is clear - or clear enough. Three members of your inner circle have been meeting secretly. At a hunting lodge outside Moscow. Planning something. Maybe just complaining. Maybe dividing the spoils of your theoretical demise. Director Sokolov awaits your order. It's 2 AM.",
            weight: 4,
            storylines: ['loyalty-apparatus'],
            
            choices: [
                choice("'Arrest them all. Tonight.'", {
                    effects: {
                        stats: {
                            elite: -25,
                            treasury: 80,
                            anger: 8
                        },
                        flags: {
                            "purge_total": true,
                            "purge_count": 3
                        },
                        relationships: { sokolov: 15 }
                    },
                    legacy: {
                        icon: "🌙",
                        name: "The Night Purger",
                        weight: 30,
                        explanation: "You arrested three of your inner circle in a single night."
                    },
                    unlocks: [
                        eventRef("loyalty_aftermath")
                    ]
                }),
                
                choice("'Just the ringleader. Scare the others.'", {
                    effects: {
                        stats: {
                            elite: -12,
                            treasury: 30
                        },
                        flags: {
                            "purge_surgical": true,
                            "purge_count": 1
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_aftermath")
                    ]
                }),
                
                choice("'Exile, not arrest. I'm not a monster.'", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: -3
                        },
                        flags: {
                            "purge_merciful": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_aftermath")
                    ]
                }),
                
                choice("'Promote one of them. Break their alliance with reward.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            treasury: -30
                        },
                        flags: {
                            "purge_divided": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_aftermath")
                    ]
                })
            ]
        }),
        
        event("loyalty_aftermath", {
            title: "The Morning After",
            description: "The purge is over - or at least this phase of it. The elite are shaken. Some are grateful it wasn't them. Others are terrified they're next. A few are already plotting revenge. The balance of power has shifted, but in which direction?",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            
            narrativeVariations: [
                {
                    conditions: { flag: "purge_total" },
                    description: "Three arrests in one night. The message is clear: no one is safe. Your remaining allies sit straighter in meetings, laugh at your jokes more eagerly. Fear is effective. But fear also breeds desperation."
                },
                {
                    conditions: { flag: "purge_merciful" },
                    description: "Exile instead of prison. Some call it weakness. Others call it wisdom. The exiled men are bitter but alive, and they're talking to Western journalists about 'the regime's true nature.'"
                }
            ],
            
            choices: [
                choice("'Good. Fear keeps them honest.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "fear_embraced": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_innocent_mistake")
                    ]
                }),
                
                choice("'Reassure the survivors. This was necessary but limited.'", {
                    effects: {
                        stats: {
                            elite: 8
                        },
                        flags: {
                            "aftermath_reassurance": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_innocent_mistake")
                    ]
                }),
                
                choice("'Perhaps I went too far. Make quiet amends.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            treasury: -30
                        },
                        flags: {
                            "aftermath_regret": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_power")
                    ]
                })
            ]
        }),
        
        event("loyalty_innocent_mistake", {
            title: "The Wrong Man",
            description: "New intelligence suggests a troubling possibility: one of the men you arrested may have been innocent. He wasn't plotting against you - he was planning a surprise birthday party for his wife. Wrong place, wrong time, wrong friends. Sokolov shrugs. 'Mistakes happen. In war, in governance.'",
            weight: 4,
            storylines: ['loyalty-apparatus'],
            
            choices: [
                choice("'Release him quietly. Compensate him generously.'", {
                    effects: {
                        stats: {
                            treasury: -50,
                            elite: 5
                        },
                        flags: {
                            "innocent_released": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_power")
                    ]
                }),
                
                choice("'Keep him locked up. Admitting error shows weakness.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 5
                        },
                        flags: {
                            "innocent_kept": true
                        }
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Unjust",
                        weight: -10,
                        explanation: "You knowingly imprisoned an innocent man."
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_power")
                    ]
                }),
                
                choice("'Find something. Everyone's guilty of something.'", {
                    effects: {
                        stats: {
                            treasury: -20
                        },
                        flags: {
                            "evidence_fabricated": true
                        },
                        relationships: { sokolov: 10 }
                    },
                    legacy: {
                        icon: "📝",
                        name: "The Fabricator",
                        weight: -15,
                        explanation: "You fabricated evidence to justify your mistakes."
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_power")
                    ]
                }),
                
                choice("'This is Sokolov's failure. Reprimand him.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "sokolov_blamed": true
                        },
                        relationships: { sokolov: -25 }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_resentment")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 3: THE MACHINE GROWS (Depth 3-4)
        // ================================================================
        
        event("loyalty_sokolov_power", {
            title: "The Director's Reach",
            description: "Director Sokolov has become indispensable. He knows everything about everyone - including, presumably, you. Your personal intelligence chief (a different service, naturally) reports something troubling: Sokolov has been building his own network within the network. Loyalists who answer to him first, you second.",
            weight: 4,
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            
            choices: [
                choice("'He's loyal. I trust him.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "sokolov_trusted": true
                        },
                        relationships: { sokolov: 15 }
                    },
                    unlocks: [
                        eventRef("loyalty_golden_circle_crossover")
                    ]
                }),
                
                choice("'Monitor him. Carefully. Through separate channels.'", {
                    effects: {
                        stats: {
                            treasury: -30
                        },
                        flags: {
                            "sokolov_monitored": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_dossier")
                    ]
                }),
                
                choice("'Reduce his authority. Divide the security services.'", {
                    effects: {
                        stats: {
                            elite: -10
                        },
                        flags: {
                            "security_services_split": true
                        },
                        relationships: { sokolov: -30 }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_confrontation")
                    ]
                }),
                
                choice("'Preemptive move. Remove him before he moves against me.'", {
                    effects: {
                        stats: {
                            elite: -15
                        },
                        flags: {
                            "sokolov_removed_preemptively": true
                        },
                        characterStates: { sokolov: "removed" }
                    },
                    legacy: {
                        icon: "🔪",
                        name: "The Paranoiac",
                        weight: -8,
                        explanation: "You removed your intelligence chief before he could betray you."
                    },
                    unlocks: [
                        eventRef("loyalty_new_director")
                    ]
                })
            ]
        }),
        
        event("loyalty_sokolov_resentment", {
            title: "The Director's Silence",
            description: "Since you blamed him - or limited his power - Sokolov has been... different. He still reports, still attends meetings, still maintains that pale-eyed stare. But the intelligence feels thinner. Less actionable. Is he holding back? Or have the threats simply diminished?",
            weight: 4,
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            conditions: {
                anyOf: [
                    { flag: "sokolov_blamed" },
                    { flag: "surveillance_limited" }
                ]
            },
            
            choices: [
                choice("'Restore his authority. I need him at full capacity.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        relationships: { sokolov: 20 }
                    },
                    unlocks: [
                        eventRef("loyalty_golden_circle_crossover")
                    ]
                }),
                
                choice("'Replace him. I need someone hungrier.'", {
                    effects: {
                        stats: {
                            elite: -8
                        },
                        flags: {
                            "sokolov_replaced": true
                        },
                        characterStates: { sokolov: "retired" }
                    },
                    unlocks: [
                        eventRef("loyalty_new_director")
                    ]
                }),
                
                choice("'Investigate him. See what he's really doing.'", {
                    effects: {
                        stats: {
                            treasury: -25
                        },
                        flags: {
                            "sokolov_investigated": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_dossier")
                    ]
                })
            ]
        }),
        
        event("loyalty_parallel_investigation", {
            title: "The Shadow File",
            description: "You ordered a parallel investigation into Director Sokolov. It took months, required foreign assets, and cost a fortune. But you have it now: the real dossier. The one Sokolov didn't want you to see.",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            
            choices: [
                choice("Open it.", {
                    effects: {
                        flags: {
                            "sokolov_real_file_opened": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_dossier")
                    ]
                }),
                
                choice("Burn it. Some things are better not knowing.", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "sokolov_file_destroyed": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_golden_circle_crossover")
                    ]
                }),
                
                choice("Keep it sealed. Insurance for later.", {
                    effects: {
                        flags: {
                            "sokolov_file_stored": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_golden_circle_crossover")
                    ]
                })
            ]
        }),
        
        event("loyalty_new_director", {
            title: "The New Watcher",
            description: "Sokolov is gone. His replacement, Director Ivanov, is younger, hungrier, and eager to prove himself. He promises loyalty, efficiency, and results. But he lacks Sokolov's experience, his network, his institutional knowledge. The transition period will be... vulnerable.",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            characterId: "ivanov",
            
            choices: [
                choice("'Build your own team. Fresh start.'", {
                    effects: {
                        stats: {
                            treasury: -50
                        },
                        flags: {
                            "new_security_team": true
                        },
                        relationships: { ivanov: 15 }
                    },
                    unlocks: [
                        eventRef("loyalty_golden_circle_crossover")
                    ]
                }),
                
                choice("'Keep Sokolov's people. Learn from them.'", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "inherited_security_team": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_golden_circle_crossover")
                    ]
                }),
                
                choice("'Purge everything. Start from zero.'", {
                    effects: {
                        stats: {
                            elite: -20,
                            treasury: -80
                        },
                        flags: {
                            "security_purge_total": true
                        }
                    },
                    legacy: {
                        icon: "🔥",
                        name: "The Institution Destroyer",
                        weight: -10,
                        explanation: "You destroyed your own security services to rebuild them."
                    },
                    unlocks: [
                        eventRef("loyalty_the_empty_room")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // CROSSOVER EVENTS
        // ================================================================
        
        event("loyalty_golden_circle_crossover", {
            title: "The Corrupt Elite",
            description: "The surveillance network has uncovered something massive: systematic corruption among your oligarch friends. Hidden accounts totaling billions. Stolen state assets. Offshore empires built on embezzled funds. You could expose them, destroy them, purge the entire class. Or you could use this information differently.",
            weight: 4,
            storylines: ['loyalty-apparatus', 'golden-circle'],
            conditions: {
                allOf: [
                    { flag: "loyalty_apparatus_active", equals: true },
                    { flag: "purge_exposed_oligarchs", equals: false }
                ]
            },
            
            choices: [
                choice("'Expose the corruption. Purge the thieves.'", {
                    effects: {
                        stats: {
                            elite: -30,
                            treasury: 150,
                            anger: -10
                        },
                        flags: {
                            "purge_exposed_oligarchs": true
                        }
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Anti-Corruption Crusader",
                        weight: 5,
                        explanation: "You turned on your own oligarchs. Convenient timing."
                    },
                    unlocks: [
                        eventRef("golden_circle_the_exposure")
                    ]
                }),
                
                choice("'Keep this information. Leverage is better than destruction.'", {
                    effects: {
                        stats: {
                            elite: 10
                        },
                        flags: {
                            "oligarch_leverage": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_succession_crossover")
                    ]
                }),
                
                choice("'Everyone steals. It's how the system works. File it away.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "corruption_accepted": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_succession_crossover")
                    ]
                })
            ]
        }),
        
        event("loyalty_succession_crossover", {
            title: "The Heir's Network",
            description: "If you have a chosen successor, the surveillance reveals something troubling: they've been cultivating their own security contacts. Generals who answer their calls. Intelligence officers who report to them. Their own little surveillance state within yours. Protection? Or preparation?",
            weight: 3,
            storylines: ['loyalty-apparatus', 'succession'],
            conditions: {
                allOf: [
                    { flag: "loyalty_apparatus_active", equals: true },
                    { flag: "succession_active", equals: true },
                    { flag: "purge_cleared_succession", equals: false }
                ]
            },
            
            choices: [
                choice("'Dismantle their network. They don't need their own spies.'", {
                    effects: {
                        stats: {
                            elite: -15
                        },
                        flags: {
                            "purge_cleared_succession": true
                        }
                    },
                    unlocks: [
                        eventRef("succession_network_purged")
                    ]
                }),
                
                choice("'Let them have their network. They'll need it eventually.'", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        flags: {
                            "heir_network_allowed": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_loyal")
                    ]
                }),
                
                choice("'Acceptable, but monitor them closely.'", {
                    effects: {
                        stats: {
                            treasury: -20
                        },
                        flags: {
                            "heir_network_monitored": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_loyal")
                    ]
                })
            ]
        }),
        
        // Entry point from Golden Circle crossover
        event("loyalty_oligarch_investigation", {
            title: "The Wealth Purge",
            description: "You've ordered a full investigation of oligarch corruption. Sokolov's team works around the clock. Arrests follow arrests. The business class is in panic. Billions are being seized. Foreign capitals are filling with refugees. You've started something that may be hard to stop.",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            conditions: {
                flag: "wealth_triggered_purge"
            },
            
            choices: [
                choice("'Keep going until the corruption is eradicated.'", {
                    effects: {
                        stats: {
                            elite: -20,
                            treasury: 100
                        },
                        flags: {
                            "purge_continued": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_the_empty_room")
                    ]
                }),
                
                choice("'Enough. We've made our point.'", {
                    effects: {
                        stats: {
                            elite: 10
                        },
                        flags: {
                            "purge_halted": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_loyal")
                    ]
                }),
                
                choice("'Now investigate the investigators.'", {
                    effects: {
                        stats: {
                            treasury: -30
                        },
                        flags: {
                            "meta_investigation": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_dossier")
                    ]
                })
            ]
        }),
        
        // Entry point from Succession crossover
        event("loyalty_heir_investigation", {
            title: "The Crown Prince's Secrets",
            description: "The investigation into your heir's network has produced troubling results. They weren't just building protection - they were building a parallel power structure. Their own generals, their own funds, their own contingency plans. For what, exactly?",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            conditions: {
                flag: "purge_cleared_succession"
            },
            
            choices: [
                choice("'This is unacceptable. Confront them.'", {
                    effects: {
                        stats: {
                            elite: -10
                        },
                        flags: {
                            "heir_confronted": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_the_empty_room")
                    ]
                }),
                
                choice("'Use this information. Control them through it.'", {
                    effects: {
                        flags: {
                            "heir_controlled_through_intel": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_loyal")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 4: WHO WATCHES THE WATCHMEN? (Depth 4-5)
        // ================================================================
        
        event("loyalty_sokolov_dossier", {
            title: "The Real File",
            description: "You've obtained Director Sokolov's actual file - the one he didn't show you. It's... interesting. Foreign contacts. Suspicious transfers. Insurance policies. Evidence of a private fortune hidden in Montenegro. Not treason, perhaps. But not innocence either.",
            weight: 3,
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            
            choices: [
                choice("'Confront him with this. Demand answers.'", {
                    effects: {
                        flags: {
                            "sokolov_confronted_with_file": true
                        },
                        relationships: { sokolov: -30 }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_confrontation")
                    ]
                }),
                
                choice("'Keep it secret. My insurance policy now.'", {
                    effects: {
                        flags: {
                            "sokolov_file_leverage": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_loyal")
                    ]
                }),
                
                choice("'He's no different from anyone else. File it away.'", {
                    effects: {
                        stats: {
                            elite: 3
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_loyal")
                    ]
                }),
                
                choice("'This is unacceptable. Move against him.'", {
                    effects: {
                        stats: {
                            elite: -10
                        },
                        flags: {
                            "sokolov_targeted": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_confrontation")
                    ]
                })
            ]
        }),
        
        event("loyalty_sokolov_confrontation", {
            title: "The Reckoning",
            description: "You summon Director Sokolov. Just the two of you. You place his file on the desk between you. His pale eyes don't waver. 'Everyone needs insurance,' he says quietly. 'Even me. Even you. The question is: do we need each other?'",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            
            choices: [
                choice("'Retire quietly. Full honors. A villa in Montenegro.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            treasury: -30
                        },
                        flags: {
                            "sokolov_golden_exit": true
                        },
                        characterStates: { sokolov: "retired" }
                    },
                    unlocks: [
                        eventRef("loyalty_new_director")
                    ]
                }),
                
                choice("'You're under arrest, Director.'", {
                    effects: {
                        stats: {
                            elite: -20
                        },
                        flags: {
                            "sokolov_arrested": true
                        },
                        characterStates: { sokolov: "arrested" }
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Spy Catcher",
                        weight: -10,
                        explanation: "You arrested your own intelligence chief."
                    },
                    unlocks: [
                        eventRef("loyalty_the_empty_room")
                    ]
                }),
                
                choice("'We understand each other. Continue your work.'", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "sokolov_mutual_understanding": true
                        },
                        relationships: { sokolov: 10 }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_loyal")
                    ]
                }),
                
                choice("'Who else knows about this? Your insurance.'", {
                    effects: {
                        flags: {
                            "sokolov_network_investigated": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_the_empty_room")
                    ]
                })
            ]
        }),
        
        event("loyalty_sokolov_loyal", {
            title: "The True Believer",
            description: "Director Sokolov comes to you with urgent news. His voice is almost... warm. 'There's a real plot this time,' he says. 'Multiple factions. Military and civilian. They're moving in 72 hours.' He hands you the evidence. 'I could have used this myself. I didn't.'",
            weight: 3,
            storylines: ['loyalty-apparatus'],
            characterId: "sokolov",
            conditions: {
                anyOf: [
                    { flag: "sokolov_trusted" },
                    { flag: "sokolov_mutual_understanding" },
                    { flag: "sokolov_file_leverage" }
                ]
            },
            
            choices: [
                choice("'We move first. Tonight.'", {
                    effects: {
                        stats: {
                            elite: -20,
                            treasury: 50
                        },
                        flags: {
                            "final_purge_launched": true
                        },
                        relationships: { sokolov: 20 }
                    },
                    unlocks: [
                        eventRef("loyalty_the_empty_room")
                    ]
                }),
                
                choice("'Are you certain? I need more evidence.'", {
                    effects: {
                        flags: {
                            "plot_verification_requested": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_the_empty_room")
                    ]
                }),
                
                choice("'This could be a trap. How do I know you're not part of it?'", {
                    effects: {
                        relationships: { sokolov: -20 }
                    },
                    unlocks: [
                        eventRef("loyalty_sokolov_confrontation")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 5: THE LONELY THRONE (Depth 5-6)
        // ================================================================
        
        event("loyalty_the_empty_room", {
            title: "The Last Man Standing",
            description: "You've won. Every enemy eliminated. Every traitor exposed. Every threat neutralized. The conference table that once held your inner circle is now... empty. Just you and the shadows. And perhaps Sokolov, if he survived your suspicions. The room feels very quiet.",
            weight: 3,
            storylines: ['loyalty-apparatus'],
            
            narrativeVariations: [
                {
                    conditions: { flag: "sokolov_arrested" },
                    description: "Even Sokolov is gone now. The last person who knew everything is in a cell. You're alone with the machine you built. It hums around you, watching everything, trusting no one. Exactly as you designed."
                },
                {
                    conditions: { flag: "sokolov_trusted" },
                    description: "Sokolov sits across from you, the only survivor of your inner circle. You've purged generals, oligarchs, ministers. He remains. Either he's the most loyal man alive, or the most patient predator. You may never know which."
                }
            ],
            
            choices: [
                choice("'Peace at last. I can finally trust the silence.'", {
                    effects: {
                        stats: {
                            anger: -10
                        }
                    },
                    legacy: {
                        icon: "🏛️",
                        name: "The Lonely Tsar",
                        weight: -15,
                        explanation: "You purged everyone and ruled alone."
                    }
                }),
                
                choice("'The work is never done. There are always more threats.'", {
                    effects: {
                        stats: {
                            treasury: -30
                        },
                        flags: {
                            "eternal_vigilance": true
                        }
                    },
                    legacy: {
                        icon: "👁️",
                        name: "The Eternal Watcher",
                        weight: -20,
                        explanation: "You could never stop looking for enemies."
                    },
                    unlocks: [
                        eventRef("loyalty_the_machine_turns")
                    ]
                }),
                
                choice("'Perhaps I went too far. The throne feels cold.'", {
                    effects: {
                        stats: {
                            elite: 10
                        },
                        flags: {
                            "isolation_regret": true
                        }
                    },
                    legacy: {
                        icon: "❄️",
                        name: "The Cold Throne",
                        weight: -10,
                        explanation: "You realized too late what paranoia cost you."
                    }
                }),
                
                choice("'Who's next? There must be someone still plotting.'", {
                    effects: {
                        stats: {
                            treasury: -20,
                            elite: -10
                        },
                        flags: {
                            "paranoia_unending": true
                        }
                    },
                    unlocks: [
                        eventRef("loyalty_the_machine_turns")
                    ]
                })
            ]
        }),
        
        event("loyalty_the_machine_turns", {
            title: "The Final Purge",
            description: "The surveillance apparatus you built - the machine that watched everyone - has identified one final threat. The most dangerous of all. The one person you never suspected. Your new intelligence chief presents the file with trembling hands. 'The evidence is clear, sir.' The file has your name on it.",
            weight: 0,
            storylines: ['loyalty-apparatus'],
            conditions: {
                anyOf: [
                    { flag: "eternal_vigilance" },
                    { flag: "paranoia_unending" }
                ]
            },
            
            choices: [
                choice("'Destroy the file. Destroy the machine.'", {
                    effects: {
                        stats: {
                            elite: 10,
                            treasury: -100
                        }
                    },
                    legacy: {
                        icon: "🔨",
                        name: "The Machine Breaker",
                        weight: 5,
                        explanation: "You destroyed the surveillance state you created."
                    }
                }),
                
                choice("'There must be some mistake. I built this system.'", {
                    effects: {
                        flags: {
                            "denial_final": true
                        }
                    },
                    legacy: {
                        icon: "🪞",
                        name: "The Self-Deceiver",
                        weight: -20,
                        explanation: "Even the mirror became your enemy."
                    }
                }),
                
                choice("'Perhaps they're right. Perhaps I am the problem.'", {
                    effects: {
                        stats: {
                            elite: 5
                        }
                    },
                    legacy: {
                        icon: "🕳️",
                        name: "The Consumed",
                        weight: -25,
                        explanation: "The paranoia you cultivated finally devoured you."
                    }
                }),
                
                choice("'Who ordered this investigation? That's the real traitor.'", {
                    effects: {
                        stats: {
                            elite: -15
                        },
                        flags: {
                            "final_investigation": true
                        }
                    },
                    legacy: {
                        icon: "🔄",
                        name: "The Infinite Loop",
                        weight: -30,
                        explanation: "You could never stop investigating. Even yourself."
                    }
                })
            ]
        }),
        
        // Crossover entry from Golden Circle
        event("golden_circle_the_exposure", {
            title: "The Great Unmasking",
            description: "The corruption files have been released. State television runs 24-hour coverage. The oligarchs' yachts, palaces, and offshore accounts parade across every screen. The public is outraged - at them, not you. You've successfully redirected years of accumulated anger.",
            weight: 0,
            storylines: ['loyalty-apparatus', 'golden-circle'],
            conditions: {
                flag: "purge_exposed_oligarchs"
            },
            
            choices: [
                choice("'Justice is served. The people see the truth.'", {
                    effects: {
                        stats: {
                            anger: -15
                        }
                    },
                    legacy: {
                        icon: "☀️",
                        name: "The Revealer",
                        weight: 5,
                        explanation: "You exposed corruption. Your own remained hidden."
                    }
                }),
                
                choice("'Seize their assets. Redistribute to the state.'", {
                    effects: {
                        stats: {
                            treasury: 200,
                            elite: -20
                        }
                    }
                }),
                
                choice("'Show mercy to those who cooperate. Fear to those who don't.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -10
                        }
                    }
                })
            ]
        })
    ]
});

export default loyaltyApparatusStoryline;

