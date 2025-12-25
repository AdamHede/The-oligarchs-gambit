/**
 * The Special Operation - War Storyline [L]
 * 
 * Size: ~30 events, Depth 5-6
 * Triggered by: Inaugural Address → "Restore empire to glory"
 * 
 * The invasion storyline. Hubris, quagmire, impossible choices.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

const specialOperationStoryline = defineStoryline({
    id: 'special-operation',
    name: 'The Special Operation',
    description: 'War, hubris, and the cost of empire',
    theme: {
        borderColor: '#8B0000',  // Dark red
        accentColor: '#FF4444'   // Bright red
    },
    
    tree: [
        // ================================================================
        // ENTRY POINT: The War Proposal
        // ================================================================
        event("war_proposal", {
            title: "The General's Proposal",
            description: "General Konstantin Volkov spreads maps across your desk. His intelligence chief stands behind him, nodding. 'The territory is ethnically ours. Their military is a joke. NATO won't intervene - they need our gas.' He taps the map confidently. '72 hours, maximum. Maybe 48.' Your Finance Minister is silent.",
            weight: 0,  // Triggered only, not random
            storylines: ['special-operation'],
            
            choices: [
                choice("Approve the full operation. Launch in three days.", {
                    effects: {
                        stats: {
                            elite: 12,      // Generals ecstatic
                            anger: -15,     // Nationalist fervor
                            treasury: -100  // Immediate war costs
                        },
                        flags: {
                            "war_approved": true,
                            "full_invasion": true
                        },
                        legacy: {
                            icon: "⚔️",
                            name: "Warmonger",
                            weight: -15
                        }
                    },
                    // Parallel consequences - all will happen
                    unlocks: [
                        eventRef("sanctions_warning"),
                        eventRef("conscription_begins"),
                        eventRef("nationalism_surge")
                    ],
                    // Exclusive outcome - only one happens
                    unlocksExclusive: [
                        event("lightning_victory", {
                            title: "The 72-Hour Victory",
                            description: "Against all odds, it worked. Their government fled. Resistance collapsed. Your tanks roll into the capital unopposed. General Konstantin looks as shocked as anyone. The Western ambassadors protest loudly while doing nothing. You've created facts on the ground.",
                            weight: 1,  // Rare outcome
                            requires: ["general_konstantin"],
                            storylines: ['special-operation'],
                            
                            choices: [
                                choice("Victory parade in Red Square. Declare mission accomplished.", {
                                    effects: {
                                        stats: {
                                            personalWealth: 10,  // Quick war profiteering
                                            treasury: -80,       // Parade and occupation costs
                                            elite: 15,
                                            anger: -20           // Nationalist triumph
                                        },
                                        legacy: {
                                            icon: "🏆",
                                            name: "Conqueror",
                                            weight: -12
                                        }
                                    },
                                    unlocks: [
                                        eventRef("victory_parade_aftermath")
                                    ]
                                }),
                                
                                choice("Annex quietly. No triumphalism. Consolidate.", {
                                    effects: {
                                        stats: {
                                            personalWealth: 8,
                                            treasury: -60,
                                            elite: 10,
                                            anger: -10
                                        }
                                    }
                                })
                            ]
                        }),
                        
                        event("resistance_stiffens", {
                            title: "The 72-Hour Lie",
                            description: "It's been a week. The bridges didn't fall. The government didn't flee. Their conscripts are fighting harder than intelligence predicted. General Konstantin revises his timeline: 'Six weeks. Two months maximum.' Your casualties are mounting. Western weapons are flowing in.",
                            weight: 9,  // Common outcome
                            requires: ["general_konstantin"],
                            storylines: ['special-operation'],
                            
                            choices: [
                                choice("Commit more troops. We've come too far to fail.", {
                                    effects: {
                                        stats: {
                                            treasury: -120,
                                            elite: -8,
                                            anger: 8
                                        },
                                        flags: {
                                            "war_escalated": true
                                        }
                                    },
                                    unlocks: [
                                        eventRef("war_goes_badly"),
                                        eventRef("equipment_failures")
                                    ]
                                }),
                                
                                choice("Hold current positions. Declare a 'pause for negotiations.'", {
                                    effects: {
                                        stats: {
                                            treasury: -80,
                                            elite: -10,  // Seen as weakness
                                            anger: 5
                                        }
                                    },
                                    unlocks: [
                                        eventRef("stalemate_begins")
                                    ]
                                }),
                                
                                choice("Blame intelligence failures. Fire someone.", {
                                    effects: {
                                        stats: {
                                            elite: -5,
                                            anger: -3  // Scapegoat temporarily works
                                        }
                                    },
                                    unlocks: [
                                        eventRef("war_goes_badly")
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                
                choice("Approve a limited border operation only. Seize the contested zones.", {
                    effects: {
                        stats: {
                            elite: 6,
                            anger: -8,
                            treasury: -40
                        },
                        flags: {
                            "war_approved": true,
                            "limited_operation": true
                        },
                        legacy: {
                            icon: "⚔️",
                            name: "Border Adjuster",
                            weight: -8
                        }
                    },
                    unlocks: [
                        eventRef("border_skirmish")
                    ]
                }),
                
                choice("Not yet. Build military strength first.", {
                    effects: {
                        stats: {
                            elite: 3,
                            treasury: -60,
                            anger: 5  // Disappointed nationalists
                        },
                        flags: {
                            "war_delayed": true
                        }
                    },
                    unlocks: [
                        eventRef("military_buildup")
                    ]
                }),
                
                choice("This is madness. We're not ready for war.", {
                    effects: {
                        stats: {
                            elite: -15,  // Generals furious
                            anger: 8     // Nationalists angry
                        },
                        flags: {
                            "war_rejected": true
                        }
                    },
                    unlocks: [
                        eventRef("generals_insulted")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // PARALLEL CONSEQUENCES (Always happen if full invasion)
        // ================================================================
        event("sanctions_warning", {
            title: "The Western Ultimatum",
            description: "The American ambassador requests an urgent meeting. She's polite but cold: 'If your forces cross the border, we will impose unprecedented sanctions. Your oligarchs' assets will be frozen. Energy exports will be targeted. This is your final warning.' Your Foreign Minister notes that she didn't say they'd intervene militarily.",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("They're bluffing. They need our gas more than we need them.", {
                    effects: {
                        stats: {
                            elite: 5,  // Oligarchs believe you
                            anger: -5  // Nationalist defiance
                        },
                        flags: {
                            "ignored_sanctions_warning": true
                        }
                    },
                    unlocks: [
                        eventRef("sanctions_hit")
                    ]
                }),
                
                choice("Prepare the economy. Move assets to friendly jurisdictions.", {
                    effects: {
                        stats: {
                            personalWealth: 5,  // You protect your money
                            treasury: -30,      // Capital flight
                            elite: 8            // Oligarchs appreciate the heads-up
                        }
                    },
                    unlocks: [
                        eventRef("sanctions_hit")
                    ]
                })
            ]
        }),
        
        event("conscription_begins", {
            title: "The Draft Notices",
            description: "Mobilization letters go out to 200,000 young men. Social media fills with farewell videos, airport lines, tearful goodbyes. Some regions report men fleeing to borders. Your Prosecutor General asks: should we criminalize draft evasion? The middle class, previously apolitical, is suddenly very interested in politics.",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Full enforcement. Fleeing is treason. 10 years prison.", {
                    effects: {
                        stats: {
                            elite: 8,   // Hardliners approve
                            anger: 15   // Families terrified
                        },
                        flags: {
                            "harsh_draft_enforcement": true
                        }
                    },
                    unlocks: [
                        eventRef("draft_evasion_crackdown")
                    ]
                }),
                
                choice("Elite exemptions. Key industries, government families spared.", {
                    effects: {
                        stats: {
                            personalWealth: 3,  // Bribes flow in
                            elite: 12,          // They protect their sons
                            anger: 20           // Everyone else furious
                        },
                        flags: {
                            "elite_draft_exemptions": true
                        }
                    },
                    unlocks: [
                        eventRef("class_resentment_grows")
                    ]
                }),
                
                choice("Volunteer bonuses. Pay them to enlist. 1 million rubles each.", {
                    effects: {
                        stats: {
                            treasury: -200,  // Extremely expensive
                            elite: -5,       // Oligarchs angry at cost
                            anger: -8        // Poor families take the money
                        }
                    }
                })
            ]
        }),
        
        event("nationalism_surge", {
            title: "Rally Around the Flag",
            description: "It's working - the propaganda, that is. Your approval rating spikes to 87%. Pro-war concerts fill stadiums. Children draw pictures of tanks in school. The state TV anchors are ecstatic, their ratings through the roof. Marina Volkov, your chief propagandist, presents a plan: 'We can monetize this. Patriotic merchandise, war bonds, themed restaurants.'",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Monetize the patriotism. War bonds, merch, TV specials.", {
                    effects: {
                        stats: {
                            personalWealth: 8,  // Your cut of the grift
                            treasury: 100,      // War bonds bring money in
                            elite: 5,
                            anger: -10
                        },
                        legacy: {
                            icon: "💰",
                            name: "War Profiteer",
                            weight: -12
                        }
                    }
                }),
                
                choice("Keep it organic. No crass commercialization.", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: -12  // Genuine patriotic support
                        }
                    }
                }),
                
                choice("Use this moment. Crack down on remaining opposition.", {
                    effects: {
                        stats: {
                            elite: 10,
                            anger: -5
                        },
                        flags: {
                            "wartime_crackdown": true
                        }
                    }
                })
            ]
        }),
        
        // ================================================================
        // MAIN WAR PATH (When resistance stiffens)
        // ================================================================
        event("war_goes_badly", {
            title: "The General's New Timeline",
            description: "General Konstantin sits across from you, visibly aged in three months. The 72-hour operation is now entering week 14. 'We underestimated their NATO training,' he says carefully. 'We need 50,000 more troops and six more months.' Your Finance Minister coughs: 'That's another 80 billion we don't have.'",
            weight: 8,
            requires: ["general_konstantin"],
            storylines: ['special-operation'],
            
            choices: [
                choice("Give him what he asks. We cannot fail.", {
                    effects: {
                        stats: {
                            treasury: -80,
                            elite: -8,
                            anger: 5
                        }
                    },
                    unlocks: [
                        eventRef("casualties_mount"),
                        eventRef("equipment_failures")
                    ]
                }),
                
                choice("The problem is corruption. Arrest the Defense Minister.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -3
                        },
                        characterStates: {
                            "defense_minister_petrov": "arrested"
                        },
                        legacy: {
                            icon: "🎯",
                            name: "Scapegoater",
                            weight: -5
                        }
                    },
                    unlocks: [
                        eventRef("petrov_show_trial")
                    ]
                }),
                
                choice("Launch a propaganda offensive. Redefine 'victory.'", {
                    effects: {
                        stats: {
                            treasury: -20,
                            elite: 5,
                            anger: -8
                        },
                        flags: {
                            "propaganda_victory": true
                        }
                    },
                    unlocks: [
                        eventRef("stalemate_deepens")
                    ]
                })
            ]
        }),
        
        event("casualties_mount", {
            title: "The Body Bags",
            description: "Morgues in military hospitals are full. Body bags arrive in unmarked vans at 3 AM. Official casualties: 1,847. Leaked estimate: 18,000. Mothers are appearing at military bases demanding answers. One video goes viral before being scrubbed: 'Where is Conscript #284192? Where is my son?'",
            weight: 8,
            storylines: ['special-operation'],
            
            choices: [
                choice("Suppress all casualty information. Criminalize leaks.", {
                    effects: {
                        stats: {
                            elite: 5,
                            anger: 12  // Families know you're lying
                        },
                        flags: {
                            "casualty_blackout": true
                        }
                    },
                    unlocks: [
                        eventRef("mothers_protest")
                    ]
                }),
                
                choice("Acknowledge losses. Pay 5 million rubles per family.", {
                    effects: {
                        stats: {
                            treasury: -90,
                            elite: -8,
                            anger: -5
                        }
                    }
                }),
                
                choice("Claim they're Western fakes. Crisis actors.", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: 8  // Only the brainwashed believe it
                        }
                    },
                    unlocks: [
                        eventRef("mothers_protest")
                    ]
                })
            ]
        }),
        
        event("mothers_protest", {
            title: "The Mothers at the Gate",
            description: "Two hundred mothers have gathered outside the Defense Ministry. They're holding photos of their sons. One carries a sign: 'Where is he?' Your FSB Director is on the phone: 'Do we disperse them? Western cameras are here.' They're not chanting or violent. They're just... standing there. Waiting.",
            weight: 8,
            storylines: ['special-operation'],
            conditions: {
                flags: {
                    "casualty_blackout": true
                }
            },
            
            choices: [
                choice("Arrest them all. Charge them with treason.", {
                    effects: {
                        stats: {
                            elite: 8,
                            anger: 25  // This will not be forgiven
                        },
                        legacy: {
                            icon: "💀",
                            name: "Child Killer",
                            weight: -18
                        }
                    }
                }),
                
                choice("Negotiate. Let them file paperwork. Stall.", {
                    effects: {
                        stats: {
                            elite: -3,
                            anger: -5
                        }
                    }
                }),
                
                choice("Ignore them. They'll leave eventually.", {
                    effects: {
                        stats: {
                            anger: 8
                        }
                    },
                    unlocks: [
                        eventRef("mothers_movement_grows")
                    ]
                })
            ]
        }),
        
        event("equipment_failures", {
            title: "The Procurement Scandal",
            description: "A leaked recording: Defense contractors sold you 1960s tank upgrades at 2020 prices. The encrypted radios don't work. The body armor fails ballistic tests. General Konstantin is livid: 'How can I fight a war with this garbage?' Your Defense Minister, looking nervous: 'The contractors were all pre-approved...'",
            weight: 7,
            requires: ["general_konstantin"],
            storylines: ['special-operation'],
            
            choices: [
                choice("Emergency procurement. 150 billion. No questions asked.", {
                    effects: {
                        stats: {
                            personalWealth: 12,  // Your usual cut
                            treasury: -150,
                            elite: 5
                        }
                    }
                }),
                
                choice("Arrest the contractors. Seize their assets.", {
                    effects: {
                        stats: {
                            personalWealth: 8,  // You take their assets
                            elite: -10,         // They know anyone could be next
                            anger: -5           // Public likes it
                        }
                    }
                }),
                
                choice("It's the Defense Minister's fault. Arrest him.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -5
                        },
                        characterStates: {
                            "defense_minister_petrov": "arrested"
                        }
                    },
                    unlocks: [
                        eventRef("petrov_show_trial")
                    ]
                })
            ]
        }),
        
        event("stalemate_deepens", {
            title: "Month Six",
            description: "The front hasn't moved in eight weeks. Both sides are dug in. Your economy is hemorrhaging. Their economy is propped up by the West. General Konstantin: 'We're killing their army faster than NATO can replace it.' Your Finance Minister: 'We'll be bankrupt in a year.' Something has to give.",
            weight: 8,
            storylines: ['special-operation'],
            
            choices: [
                choice("Total war. Mobilize everyone. War economy.", {
                    effects: {
                        stats: {
                            treasury: -200,
                            elite: -12,
                            anger: 15
                        },
                        flags: {
                            "total_war": true
                        },
                        legacy: {
                            icon: "💀",
                            name: "Total Warrior",
                            weight: -20
                        }
                    },
                    unlocks: [
                        eventRef("mobilization_decree")
                    ]
                }),
                
                choice("Frozen conflict. Ceasefire talks. De facto borders.", {
                    effects: {
                        stats: {
                            elite: -8,  // Hawks furious
                            anger: -10  // People want it to end
                        },
                        flags: {
                            "frozen_conflict": true
                        }
                    },
                    unlocks: [
                        eventRef("ceasefire_negotiation")
                    ]
                }),
                
                choice("Strategic withdrawal. Call it a 'goodwill gesture.'", {
                    effects: {
                        stats: {
                            elite: -20,  // Everyone knows you lost
                            anger: -15   // But the war is over
                        },
                        legacy: {
                            icon: "🏳️",
                            name: "Defeated",
                            weight: -15
                        }
                    },
                    unlocks: [
                        eventRef("humiliating_retreat")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ESCALATION PATH
        // ================================================================
        event("mobilization_decree", {
            title: "Total Mobilization",
            description: "You appear on television at 3 AM. All men ages 18-50 are called up. The economy is now a war economy. Victory or death. Your generals stand behind you, grim-faced. Your oligarchs are not in the room - they're already booking flights out.",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Enforce with maximum brutality. Deserters shot.", {
                    effects: {
                        stats: {
                            elite: 5,
                            anger: 30,
                            treasury: -150
                        }
                    },
                    unlocks: [
                        eventRef("draft_riots")
                    ]
                }),
                
                choice("Elite exemptions. Critical industries exempt. Your allies' sons safe.", {
                    effects: {
                        stats: {
                            personalWealth: 8,  // Bribes
                            elite: 10,
                            anger: 35,  // Class warfare
                            treasury: -120
                        }
                    },
                    unlocks: [
                        eventRef("class_warfare")
                    ]
                })
            ]
        }),
        
        event("draft_riots", {
            title: "The Border Stampede",
            description: "Every border crossing is jammed. Men are hiding in forests, fleeing to neighboring countries, burning their draft notices. In one city, protesters burned down the conscription office. This is beyond anger. This is panic.",
            weight: 8,
            storylines: ['special-operation'],
            
            choices: [
                choice("Close all borders. Military checkpoints. Shoot on sight.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 40,
                            treasury: -50
                        },
                        legacy: {
                            icon: "💀",
                            name: "The Butcher",
                            weight: -25
                        }
                    }
                }),
                
                choice("Let them go. Focus on the willing.", {
                    effects: {
                        stats: {
                            elite: -15,  // You look weak
                            anger: 15,   // Less pressure
                            treasury: -80
                        }
                    }
                })
            ]
        }),
        
        event("nuclear_threats", {
            title: "The Nuclear Option",
            description: "You're on television again. You're talking about your nuclear arsenal. How it's the largest in the world. How you will use 'all means necessary' to defend the motherland. The Western capitals are in crisis meetings. Even General Konstantin looks nervous. Were you bluffing? Are you sure?",
            weight: 0,
            storylines: ['special-operation'],
            conditions: {
                flags: {
                    "total_war": true
                }
            },
            
            choices: [
                choice("Order a tactical nuclear test. Show you're serious.", {
                    effects: {
                        stats: {
                            elite: -20,
                            anger: 20,
                            treasury: -100
                        },
                        legacy: {
                            icon: "☢️",
                            name: "Nuclear Madman",
                            weight: -30
                        }
                    }
                }),
                
                choice("Clarify: only if invaded. Walk it back slightly.", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: -5
                        }
                    }
                }),
                
                choice("Say nothing. Let them wonder.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 8
                        }
                    }
                })
            ]
        }),
        
        // ================================================================
        // FROZEN CONFLICT PATH
        // ================================================================
        event("ceasefire_negotiation", {
            title: "The Secret Talks",
            description: "Neutral mediators arrange a meeting. Their delegation, your delegation, closed doors. The proposal: current lines become de facto borders. Both sides claim victory. Thousands died for a border adjustment and a permanent frozen conflict. Do you sign?",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Sign. Declare victory. The 'special goals' are achieved.", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: -15,
                            treasury: -50
                        },
                        flags: {
                            "ceasefire_signed": true
                        },
                        legacy: {
                            icon: "📜",
                            name: "Stalemate Artist",
                            weight: -8
                        }
                    }
                }),
                
                choice("Reject. Demand complete victory or nothing.", {
                    effects: {
                        stats: {
                            elite: 5,
                            anger: 10,
                            treasury: -100
                        }
                    },
                    unlocks: [
                        eventRef("stalemate_deepens")  // Loop back
                    ]
                })
            ]
        }),
        
        // ================================================================
        // RETREAT PATH
        // ================================================================
        event("humiliating_retreat", {
            title: "The Goodwill Gesture",
            description: "You announce a 'strategic regrouping' and 'goodwill gesture toward peace.' The TV anchors try to spin it. No one is fooled. Your forces are withdrawing in chaos. Equipment abandoned. Collaborators fleeing or facing revenge. Every news outlet in the world is using the word: defeat.",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Blame NATO. They escalated. We chose peace.", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: -10,
                            treasury: -50
                        },
                        flags: {
                            "blamed_nato": true
                        }
                    }
                }),
                
                choice("Blame the generals. They failed you.", {
                    effects: {
                        stats: {
                            elite: -20,  // Military turns against you
                            anger: -8
                        },
                        characterStates: {
                            "general_konstantin": "arrested"
                        }
                    }
                }),
                
                choice("Say nothing. Go silent for a month.", {
                    effects: {
                        stats: {
                            elite: -12,
                            anger: -5
                        },
                        legacy: {
                            icon: "🏳️",
                            name: "The Defeated",
                            weight: -18
                        }
                    }
                })
            ]
        }),
        
        // ================================================================
        // SMALLER PATH: LIMITED OPERATION
        // ================================================================
        event("border_skirmish", {
            title: "The Limited Operation",
            description: "Your forces seize the two contested provinces. Minimal resistance. A few firefights, some shelling. It's over in 72 hours - not the big war, but the limited goals you set. Western protests are muted. Some sanctions threatened but not imposed. You got away with it?",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Consolidate and stop. Declare success.", {
                    effects: {
                        stats: {
                            personalWealth: 5,
                            elite: 10,
                            anger: -12,
                            treasury: -40
                        },
                        legacy: {
                            icon: "🎯",
                            name: "Border Rewriter",
                            weight: -6
                        }
                    }
                }),
                
                choice("The hawks want more. Push deeper while we have momentum.", {
                    effects: {
                        stats: {
                            elite: 8,
                            anger: -5,
                            treasury: -60
                        },
                        flags: {
                            "skirmish_escalated": true
                        }
                    },
                    unlocks: [
                        eventRef("resistance_stiffens")  // Rejoins main path
                    ]
                })
            ]
        }),
        
        // ================================================================
        // DELAY PATH: MILITARY BUILDUP
        // ================================================================
        event("military_buildup", {
            title: "The Rearmament Campaign",
            description: "You've delayed the war to build military strength first. Defense spending triples. New missiles, new tanks, new training programs. The generals are happy. The nationalists are getting impatient. 'When do we act?' they ask. Your Finance Minister shows you the bills.",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Another year of buildup. We must be ready.", {
                    effects: {
                        stats: {
                            treasury: -120,
                            elite: 5,
                            anger: 10  // Impatient nationalists
                        }
                    }
                }),
                
                choice("We're ready now. Launch the operation.", {
                    effects: {
                        stats: {
                            elite: 12,
                            anger: -10
                        }
                    },
                    unlocks: [
                        eventRef("war_proposal")  // Loop back to start
                    ]
                })
            ]
        }),
        
        // ================================================================
        // REJECTION PATH: GENERALS INSULTED
        // ================================================================
        event("generals_insulted", {
            title: "The Silent Treatment",
            description: "General Konstantin leaves your office stone-faced. Word spreads: you rejected the war plan. The generals are meeting without you. The nationalist TV hosts are questioning your 'will to act.' Your Security Chief warns: 'The military is upset. Very upset.'",
            weight: 0,
            requires: ["general_konstantin"],
            storylines: ['special-operation'],
            
            choices: [
                choice("Purge the military leadership. Arrest Konstantin.", {
                    effects: {
                        stats: {
                            elite: -20,
                            anger: 5
                        },
                        characterStates: {
                            "general_konstantin": "arrested"
                        },
                        legacy: {
                            icon: "⚡",
                            name: "General Purger",
                            weight: -8
                        }
                    }
                }),
                
                choice("Reconcile. Give them other enemies to focus on.", {
                    effects: {
                        stats: {
                            elite: -5,
                            treasury: -40  // Increase their budget
                        }
                    }
                })
            ]
        }),
        
        // ================================================================
        // SUPPORTING EVENTS
        // ================================================================
        event("sanctions_hit", {
            title: "The Asset Freeze",
            description: "They weren't bluffing. Your oligarchs' yachts are impounded in Monaco. London properties frozen. Swiss accounts seized. Your Foreign Minister reports: 'About $400 billion in assets, frozen or sanctioned.' The oligarchs are in your office, furious. 'You said they were bluffing!'",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Seize their domestic assets. If you can't have it, neither can they.", {
                    effects: {
                        stats: {
                            personalWealth: 15,
                            elite: -25,
                            treasury: 100
                        }
                    }
                }),
                
                choice("Compensate them from state reserves.", {
                    effects: {
                        stats: {
                            treasury: -400,
                            elite: 8
                        }
                    }
                }),
                
                choice("Blame them. 'You should have been more careful.'", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: -5  // Public likes seeing oligarchs suffer
                        }
                    }
                })
            ]
        }),
        
        event("petrov_show_trial", {
            title: "The Defense Minister's Trial",
            description: "Defense Minister Petrov stands in a courtroom cage, looking tired. The charges: corruption, embezzlement, treason. The evidence is partially real. The trial is broadcast on state TV. Everyone understands: this is a scapegoat. The question is whether it works.",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Life sentence. Seize all his assets.", {
                    effects: {
                        stats: {
                            personalWealth: 6,
                            elite: -8,
                            anger: -8  // Public satisfied with punishment
                        },
                        legacy: {
                            icon: "⚖️",
                            name: "Scapegoat Judge",
                            weight: -6
                        }
                    }
                }),
                
                choice("15 years, but comfortable prison. Send a message.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -5
                        }
                    }
                })
            ]
        }),
        
        event("victory_parade_aftermath", {
            title: "After the Parade",
            description: "The tanks have rolled through Red Square. The speeches are done. General Konstantin pulls you aside: 'Now we need to hold it. That's the hard part. Insurgency, partisans, endless occupation. And we haven't even talked about reconstruction costs.'",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Brutal occupation. Crush any resistance immediately.", {
                    effects: {
                        stats: {
                            treasury: -100,
                            elite: 5,
                            anger: -5
                        },
                        legacy: {
                            icon: "💀",
                            name: "Occupation Lord",
                            weight: -15
                        }
                    }
                }),
                
                choice("Hearts and minds. Reconstruction, investment, legitimacy.", {
                    effects: {
                        stats: {
                            treasury: -200,
                            elite: -10,
                            anger: -10
                        }
                    }
                })
            ]
        }),
        
        event("mothers_movement_grows", {
            title: "The Mothers' Network",
            description: "Ignoring them didn't work. The mothers have organized. Secret networks, encrypted chats, protests spreading to other cities. They're not revolutionaries - just mothers demanding answers. But that might be more dangerous. Your FSB Director: 'We can't arrest them all.'",
            weight: 8,
            storylines: ['special-operation'],
            
            choices: [
                choice("Infiltrate and disrupt. Classic COINTELPRO tactics.", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: 12,
                            treasury: -20
                        }
                    }
                }),
                
                choice("Offer them answers. Limited information, controlled setting.", {
                    effects: {
                        stats: {
                            anger: -8,
                            elite: -3
                        }
                    }
                })
            ]
        }),
        
        event("draft_evasion_crackdown", {
            title: "The Manhunt",
            description: "You've declared draft evasion treason. Police raid apartments at dawn. Young men are pulled from basements, attics, forest camps. The prisons are filling. Your Prosecutor General reports: '47,000 arrested so far.' International human rights groups are screaming.",
            weight: 7,
            storylines: ['special-operation'],
            conditions: {
                flags: {
                    "harsh_draft_enforcement": true
                }
            },
            
            choices: [
                choice("Continue. Fear will bring compliance.", {
                    effects: {
                        stats: {
                            elite: 5,
                            anger: 30,
                            treasury: -40
                        }
                    }
                }),
                
                choice("Offer amnesty. One week to report voluntarily.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -10
                        }
                    }
                })
            ]
        }),
        
        event("class_resentment_grows", {
            title: "The Oligarchs' Sons",
            description: "A journalist - before being arrested - published a list. The names of oligarchs' sons: in Dubai, in London, in Paris. Not one called up. Meanwhile, villagers' sons come home in zinc coffins. The photos are viral despite the censors. This might be a problem.",
            weight: 8,
            storylines: ['special-operation'],
            conditions: {
                flags: {
                    "elite_draft_exemptions": true
                }
            },
            
            choices: [
                choice("Call up some oligarchs' sons. Symbolic equality.", {
                    effects: {
                        stats: {
                            elite: -15,  // Oligarchs furious
                            anger: -10   // Public satisfied
                        }
                    }
                }),
                
                choice("Suppress the story. Arrest the journalist. Memory hole it.", {
                    effects: {
                        stats: {
                            elite: 8,
                            anger: 20  // Everyone knows the truth
                        }
                    }
                }),
                
                choice("Distract. Launch a new propaganda campaign about Western plots.", {
                    effects: {
                        stats: {
                            treasury: -30,
                            elite: 5,
                            anger: -5  // Partially works
                        }
                    }
                })
            ]
        }),
        
        event("stalemate_begins", {
            title: "The Pause That Never Ends",
            description: "You declared a 'humanitarian pause for negotiations.' Both sides are holding positions. Sporadic shelling. Snipers. No progress, no retreat. This could last years. Your Finance Minister: 'We're spending 50 billion a quarter just to maintain this stalemate.'",
            weight: 7,
            storylines: ['special-operation'],
            
            choices: [
                choice("Accept the long game. Frozen conflict it is.", {
                    effects: {
                        stats: {
                            treasury: -150,
                            elite: -10,
                            anger: -5
                        },
                        flags: {
                            "frozen_conflict_permanent": true
                        }
                    }
                }),
                
                choice("One more push. Break the stalemate.", {
                    effects: {
                        stats: {
                            treasury: -100,
                            elite: 5
                        }
                    },
                    unlocks: [
                        eventRef("war_goes_badly")  // Back to escalation
                    ]
                })
            ]
        }),
        
        event("class_warfare", {
            title: "The Rich Man's War, Poor Man's Fight",
            description: "Graffiti appears overnight in every city: 'Rich men make war, poor men die.' Your elite exemptions are public knowledge. Provincial governors report unrest. This isn't nationalism anymore. This is class consciousness. That's more dangerous.",
            weight: 0,
            storylines: ['special-operation'],
            
            choices: [
                choice("Cancel exemptions. Everyone fights equally.", {
                    effects: {
                        stats: {
                            elite: -20,  // Oligarchs revolt
                            anger: -15   // Public appeased
                        }
                    }
                }),
                
                choice("Double down. Elite sons in 'advisory roles' only.", {
                    effects: {
                        stats: {
                            elite: 10,
                            anger: 35  // Revolutionary anger
                        }
                    }
                }),
                
                choice("Propaganda blitz. 'We all sacrifice together.'", {
                    effects: {
                        stats: {
                            treasury: -40,
                            anger: -8  // Barely works
                        }
                    }
                })
            ]
        })
    ]
});

export default specialOperationStoryline;

