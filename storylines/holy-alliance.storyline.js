/**
 * The Holy Alliance - Church-State Bargain Storyline [M]
 * 
 * Size: ~20 events, Depth 4
 * Triggered by: Inaugural Address → "Return to sacred traditions"
 * 
 * The Faustian bargain with the Church. Legitimacy for power, blessings for money.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

const holyAllianceStoryline = defineStoryline({
    id: 'holy-alliance',
    name: 'The Holy Alliance',
    description: 'Church-state bargain, moral crusade, cynical power',
    theme: {
        borderColor: '#8B4513',  // Saddle brown
        accentColor: '#DAA520'   // Goldenrod
    },
    
    tree: [
        // ================================================================
        // ENTRY POINT: The Patriarch's Audience
        // ================================================================
        event("patriarch_audience", {
            title: "The Patriarch's Visit",
            description: "Patriarch Kirill arrives in full regalia - gold-threaded robes, jeweled cross, entourage of bishops. He blesses your office, places an icon on your desk. 'God has chosen you to lead our people back to greatness,' he says warmly. Then his tone shifts slightly: 'And we are prepared to help. For appropriate... recognition of the Church's role.'",
            weight: 0,  // Triggered only
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Full alliance. Church and State united as in the old days.", {
                    effects: {
                        stats: {
                            elite: 10,
                            anger: -15,  // Religious conservatives thrilled
                            treasury: -50
                        },
                        flags: {
                            "church_alliance_full": true
                        },
                        legacy: {
                            icon: "✝️",
                            name: "Defender of Faith",
                            weight: -8
                        }
                    },
                    unlocks: [
                        eventRef("church_demands_begin")
                    ]
                }),
                
                choice("Photo ops only. Blessings and ceremonies, but no real power.", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: -8,
                            treasury: -10
                        },
                        flags: {
                            "church_alliance_symbolic": true
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_insulted")
                    ]
                }),
                
                choice("Play them against each other. Fund reformist bishops.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 3,
                            treasury: -30
                        },
                        flags: {
                            "church_schism_planned": true
                        }
                    },
                    unlocks: [
                        eventRef("church_schism_begins")
                    ]
                }),
                
                choice("Use them now, marginalize them later. Tactical alliance.", {
                    effects: {
                        stats: {
                            elite: 6,
                            anger: -10,
                            treasury: -20
                        },
                        flags: {
                            "church_alliance_temporary": true
                        }
                    },
                    unlocks: [
                        eventRef("temporary_alliance")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // FULL ALLIANCE PATH
        // ================================================================
        event("church_demands_begin", {
            title: "The Partnership Agreement",
            description: "Patriarch Kirill returns with his advisors. They present a document - 47 pages. 'The framework for our cooperation,' he explains. Your Chief of Staff skims it and looks pale. It covers budget allocations, legal reforms, personnel decisions, and a list of 'problematic individuals.' The Patriarch smiles: 'Just the beginning of a beautiful friendship.'",
            weight: 0,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Agree to everything. Give them what they want.", {
                    effects: {
                        stats: {
                            elite: 8,
                            anger: -10,
                            treasury: -80
                        }
                    },
                    unlocks: [
                        eventRef("church_wants_money"),
                        eventRef("church_wants_laws"),
                        eventRef("church_wants_enemies_punished")
                    ]
                }),
                
                choice("Negotiate. Some requests yes, others no.", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: -8,
                            treasury: -50
                        }
                    },
                    unlocks: [
                        eventRef("church_wants_money")
                    ]
                }),
                
                choice("This is too much. Renegotiate the whole arrangement.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: 5
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_insulted")
                    ]
                })
            ]
        }),
        
        // ----------------------------------------------------------------
        // Money Branch
        // ----------------------------------------------------------------
        event("church_wants_money", {
            title: "The Budget Request",
            description: "The Church's Finance Bishop presents the numbers. 'Religious education' budget: 80 billion. Tax exemptions for Church properties and businesses: another 30 billion annually. And then there's the special project - the Cathedral of National Salvation. He slides you the architectural renderings.",
            weight: 0,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Approve all of it. The Church is our partner.", {
                    effects: {
                        stats: {
                            treasury: -100,
                            elite: 5,
                            anger: 8  // That's a lot of money during hard times
                        }
                    },
                    unlocks: [
                        eventRef("cathedral_project")
                    ]
                }),
                
                choice("Half measures. Some budget, modest exemptions.", {
                    effects: {
                        stats: {
                            treasury: -50,
                            elite: -3,
                            anger: 3
                        }
                    },
                    unlocks: [
                        eventRef("church_disappointed_money")
                    ]
                }),
                
                choice("Refuse. We're not a piggy bank.", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: -3
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_insulted")
                    ]
                })
            ]
        }),
        
        event("cathedral_project", {
            title: "The Cathedral Proposal",
            description: "Patriarch Kirill presents architectural renderings. The Cathedral of National Salvation: 340 feet tall, gold-plated domes, Italian marble floors, underground parking for 500 luxury cars, and - he adds carefully - heated bathroom floors. Cost: $1.4 billion. 'A monument to our revival,' he says. Your Finance Minister notes that the annual education budget is $800 million.",
            weight: 0,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Build it. Spare no expense. God's glory demands it.", {
                    effects: {
                        stats: {
                            personalWealth: 8,   // Construction contracts
                            treasury: -140,
                            elite: 5,
                            anger: 15
                        },
                        flags: {
                            "built_golden_cathedral": true
                        },
                        legacy: {
                            icon: "⛪",
                            name: "Cathedral Builder",
                            weight: -10
                        }
                    },
                    unlocks: [
                        eventRef("cathedral_construction")
                    ]
                }),
                
                choice("Build it modest. $400 million. Still impressive.", {
                    effects: {
                        stats: {
                            personalWealth: 3,
                            treasury: -40,
                            elite: -3,
                            anger: 8
                        }
                    },
                    unlocks: [
                        eventRef("modest_cathedral_built")
                    ]
                }),
                
                choice("Refuse. Hospitals and schools first.", {
                    effects: {
                        stats: {
                            elite: -12,
                            anger: -5
                        },
                        flags: {
                            "denied_cathedral": true
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_insulted_deeply")
                    ]
                })
            ]
        }),
        
        event("cathedral_construction", {
            title: "The Golden Monument",
            description: "Construction begins. Italian craftsmen import marble. Gold leaf artisans work on the domes. The budget has somehow ballooned to $1.8 billion. Photos leak of the heated bathroom floors - Italian toilets costing $850,000 each. Social media erupts. The Patriarch consecrates the foundation stone as protesters are arrested nearby.",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Continue. Let them see our glory.", {
                    effects: {
                        stats: {
                            personalWealth: 5,
                            treasury: -40,  // Cost overruns
                            elite: 3,
                            anger: 12
                        }
                    }
                }),
                
                choice("Scale back. This is getting embarrassing.", {
                    effects: {
                        stats: {
                            elite: -5,  // Church angry
                            anger: -5   // Public appreciates it
                        }
                    }
                })
            ]
        }),
        
        // ----------------------------------------------------------------
        // Laws Branch
        // ----------------------------------------------------------------
        event("church_wants_laws", {
            title: "The Legislation Package",
            description: "The Patriarch's legal team presents draft laws. Blasphemy criminalized: 5 years prison for 'insulting religious feelings.' Schools must teach 'traditional values.' 'Anti-family propaganda' banned. Gay marriage illegal (it already is, but now MORE illegal). Your Attorney General: 'This is... comprehensive.'",
            weight: 0,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Pass all of it. Full religious law.", {
                    effects: {
                        stats: {
                            elite: 10,
                            anger: -12,  // Religious majority approves
                            treasury: -20
                        },
                        flags: {
                            "religious_laws_passed": true
                        }
                    },
                    unlocks: [
                        eventRef("blasphemy_law_enforced"),
                        eventRef("restrictions_expand")
                    ]
                }),
                
                choice("Water it down. Symbolic laws, minimal enforcement.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -5
                        }
                    },
                    unlocks: [
                        eventRef("church_disappointed_laws")
                    ]
                }),
                
                choice("Refuse. Separation of church and state.", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: 5
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_insulted")
                    ]
                })
            ]
        }),
        
        event("blasphemy_law_enforced", {
            title: "The First Arrests",
            description: "The blasphemy law is used immediately. A comedian arrested for a church joke. An artist detained for a painting. A blogger prosecuted for questioning the Patriarch's wealth. The Church provides lists of 'offenders.' Your courts rubber-stamp the charges. Five years each. The West protests. The Church celebrates.",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Enforce aggressively. Set examples.", {
                    effects: {
                        stats: {
                            elite: 8,
                            anger: 18,
                            treasury: -30
                        },
                        legacy: {
                            icon: "⚖️",
                            name: "Blasphemy Judge",
                            weight: -12
                        }
                    }
                }),
                
                choice("Selective enforcement. Political targets only.", {
                    effects: {
                        stats: {
                            elite: 5,
                            anger: 10
                        }
                    }
                }),
                
                choice("This is going too far. Slow it down.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: -5
                        }
                    },
                    unlocks: [
                        eventRef("church_demands_more_enforcement")
                    ]
                })
            ]
        }),
        
        event("restrictions_expand", {
            title: "The Expanding Censorship",
            description: "The Church wants more. Books banned for 'atheist propaganda.' Films censored. Darwin removed from biology textbooks. A proposed law: mandatory church attendance registration. The Minister of Education resigns in protest. The Patriarch: 'We're just beginning our moral revival.'",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Give them what they want. Theocracy it is.", {
                    effects: {
                        stats: {
                            elite: -5,  // Even oligarchs have limits
                            anger: 15,
                            treasury: -40
                        },
                        legacy: {
                            icon: "✝️",
                            name: "Theocrat",
                            weight: -16
                        }
                    }
                }),
                
                choice("This is enough. Draw the line here.", {
                    effects: {
                        stats: {
                            elite: -10,  // Church furious
                            anger: -8
                        }
                    },
                    unlocks: [
                        eventRef("church_vs_state_tension")
                    ]
                })
            ]
        }),
        
        // ----------------------------------------------------------------
        // Enemies Branch
        // ----------------------------------------------------------------
        event("church_wants_enemies_punished", {
            title: "The List of Names",
            description: "The Patriarch hands you a document. Twenty-seven names. 'Enemies of faith and tradition,' he explains. Atheist activists, liberal professors, LGBT advocates. And at the top: Oligarch Rosenfeld. 'A godless man controls 18% of our nation's aluminum. This cannot stand.' Rosenfeld is one of your biggest backers.",
            weight: 0,
            requires: ["patriarch_kirill", "oligarch_rosenfeld"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Arrest them all. Starting with Rosenfeld.", {
                    effects: {
                        stats: {
                            personalWealth: 12,  // Seize Rosenfeld's assets
                            elite: -15,           // Oligarchs terrified
                            anger: 10,
                            treasury: 80
                        },
                        characterStates: {
                            "oligarch_rosenfeld": "arrested"
                        }
                    },
                    unlocks: [
                        eventRef("rosenfeld_show_trial")
                    ]
                }),
                
                choice("Warn Rosenfeld. Give him 48 hours to flee.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: -3,
                            treasury: -50  // He takes money with him
                        },
                        characterStates: {
                            "oligarch_rosenfeld": "exiled"
                        }
                    },
                    unlocks: [
                        eventRef("rosenfeld_flees_abroad")
                    ]
                }),
                
                choice("Refuse. He's off-limits.", {
                    effects: {
                        stats: {
                            elite: -12,  // Church furious
                            anger: 3
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_insulted")
                    ]
                }),
                
                choice("Compromise. Arrest the small names, spare the oligarch.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 8
                        }
                    },
                    unlocks: [
                        eventRef("selective_persecution")
                    ]
                })
            ]
        }),
        
        event("rosenfeld_show_trial", {
            title: "The Oligarch's Trial",
            description: "Oligarch Rosenfeld stands in court. Charges: tax evasion, money laundering, 'undermining traditional values.' The evidence is partially real - every oligarch evades taxes. But the trial's tone is religious. The prosecutor quotes scripture. The Patriarch attends, blessing the proceedings. Other oligarchs watch nervously.",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Full conviction. 15 years. Seize everything.", {
                    effects: {
                        stats: {
                            personalWealth: 15,
                            elite: -20,  // Oligarchs know they're next
                            anger: -5,   // Public likes seeing oligarch punished
                            treasury: 100
                        },
                        legacy: {
                            icon: "⚖️",
                            name: "Oligarch Purger",
                            weight: -8
                        }
                    }
                }),
                
                choice("Conviction but comfortable prison. Send a message.", {
                    effects: {
                        stats: {
                            personalWealth: 8,
                            elite: -12,
                            treasury: 60
                        }
                    }
                })
            ]
        }),
        
        event("rosenfeld_flees_abroad", {
            title: "The Exile",
            description: "Rosenfeld's private jet left for Tel Aviv at 4 AM. He took what he could. His remaining domestic assets are frozen - about $10 billion worth. He's now in Israel, funding opposition media, doing interviews. 'A religious dictatorship,' he calls your regime. The Patriarch celebrates. Your other oligarchs are calculating escape plans.",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Seize everything. Make an example.", {
                    effects: {
                        stats: {
                            personalWealth: 12,
                            elite: -15,
                            treasury: 100
                        }
                    }
                }),
                
                choice("Leave some assets alone. Message to others: flee cleanly.", {
                    effects: {
                        stats: {
                            personalWealth: 5,
                            elite: -8,
                            treasury: 40
                        }
                    }
                })
            ]
        }),
        
        event("patriarch_consolidates_power", {
            title: "The Patriarch's Influence",
            description: "Six months into the alliance, Patriarch Kirill is everywhere. State TV every Sunday. Advisory role in Security Council. Regional governors consult him before decisions. He's blessing military operations, economic policies, even judicial appointments. Your Chief of Staff: 'Sir, he's becoming... very powerful. Maybe too powerful.'",
            weight: 8,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            conditions: {
                flags: {
                    "church_alliance_full": true
                }
            },
            
            choices: [
                choice("Let it continue. The alliance works.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -10
                        }
                    },
                    unlocks: [
                        eventRef("church_becoming_problem")
                    ]
                }),
                
                choice("Start limiting his influence. Subtle marginalization.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: 5
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_fights_back")
                    ]
                }),
                
                choice("Direct confrontation. Remind him who's in charge.", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: 8
                        }
                    },
                    unlocks: [
                        eventRef("church_vs_state_conflict")
                    ]
                })
            ]
        }),
        
        event("church_becoming_problem", {
            title: "Tail Wagging the Dog",
            description: "The Patriarch now demands consultation on everything. Foreign policy, military strategy, economic appointments. He vetoed your choice for Finance Minister as 'insufficiently devout.' His bishops sit on regional councils. Church militia patrol some areas. This isn't partnership anymore. What is it?",
            weight: 8,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Accept it. We're a religious state now.", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: -8,
                            treasury: -60
                        },
                        legacy: {
                            icon: "✝️",
                            name: "Patriarch's Puppet",
                            weight: -14
                        }
                    }
                }),
                
                choice("Purge him. Arrest the Patriarch, install compliant replacement.", {
                    effects: {
                        stats: {
                            elite: -12,
                            anger: 20,  // Religious backlash
                            treasury: -50
                        },
                        characterStates: {
                            "patriarch_kirill": "arrested"
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_purged")
                    ]
                }),
                
                choice("Negotiate new terms. Reset the relationship.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: -5
                        }
                    },
                    unlocks: [
                        eventRef("renegotiation_attempt")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // PHOTO OPS ONLY PATH
        // ================================================================
        event("patriarch_insulted", {
            title: "The Cold Response",
            description: "Patriarch Kirill leaves your office stone-faced. You offered blessings and photo opportunities, but no real power, no money, no influence. His spokesman releases a statement: 'The Church is disappointed by those who profess faith but show no fruits.' Your intelligence chief: 'He's meeting with people. Important people.'",
            weight: 0,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Let him sulk. What's he going to do?", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 5
                        }
                    },
                    unlocksExclusive: [
                        eventRef("public_criticism"),
                        eventRef("quiet_scheming")
                    ]
                }),
                
                choice("Negotiate. Maybe some concessions.", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: -5,
                            treasury: -30
                        }
                    },
                    unlocks: [
                        eventRef("limited_alliance")
                    ]
                }),
                
                choice("Threaten him. 'Tax audit' the Church.", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: 12
                        }
                    },
                    unlocks: [
                        eventRef("church_vs_state_conflict")
                    ]
                })
            ]
        }),
        
        event("public_criticism", {
            title: "The Patriarch's Sermon",
            description: "Sunday service, Cathedral of Christ the Savior, broadcast nationally. Patriarch Kirill's sermon: 'There are those who claim to serve God but serve only themselves. Who promise faith but deliver betrayal. Who seek the Church's blessing but mock God's will.' He doesn't name you. He doesn't have to. Everyone knows.",
            weight: 5,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Ignore it. Words are just words.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: 8
                        }
                    },
                    unlocks: [
                        eventRef("criticism_escalates")
                    ]
                }),
                
                choice("Pressure him. 'Investigations' into Church finances.", {
                    effects: {
                        stats: {
                            elite: -12,
                            anger: 15
                        }
                    },
                    unlocks: [
                        eventRef("church_vs_state_conflict")
                    ]
                }),
                
                choice("Reconcile. Offer him something.", {
                    effects: {
                        stats: {
                            elite: 3,
                            treasury: -40
                        }
                    },
                    unlocks: [
                        eventRef("limited_alliance")
                    ]
                })
            ]
        }),
        
        event("quiet_scheming", {
            title: "The Private Meetings",
            description: "Your FSB reports: Patriarch Kirill has met privately with General Staff leadership three times this month. Also: dinners with your oligarchs, conversations with regional governors. He's building something. Your Security Chief: 'He's looking for allies. This could be a problem.'",
            weight: 5,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Surveil everything. FSB on full alert.", {
                    effects: {
                        stats: {
                            elite: -10,
                            treasury: -30
                        },
                        flags: {
                            "surveilling_patriarch": true
                        }
                    }
                }),
                
                choice("Preemptive strike. Arrest him before he moves.", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: 20
                        },
                        characterStates: {
                            "patriarch_kirill": "arrested"
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_purged")
                    ]
                }),
                
                choice("Negotiate. Find out what he wants.", {
                    effects: {
                        stats: {
                            elite: -5
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_demands_renewed")
                    ]
                })
            ]
        }),
        
        event("church_vs_state_conflict", {
            title: "The Split",
            description: "Open confrontation. Sunday sermons criticizing you. State media attacking the Church. Protests and counter-protests. Regional governors choosing sides. Some military units reportedly more loyal to Church than state. This is destabilizing everything.",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Crush the Church. Full state power.", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: 25,
                            treasury: -80
                        },
                        legacy: {
                            icon: "⚡",
                            name: "Church Crusher",
                            weight: -12
                        }
                    }
                }),
                
                choice("Negotiate peace. Both sides stand down.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: -10,
                            treasury: -50
                        }
                    }
                })
            ]
        }),
        
        // ================================================================
        // SCHISM PATH
        // ================================================================
        event("church_schism_begins", {
            title: "The Reform Movement",
            description: "You've been funding reformist bishops quietly. Metropolitan Andrei emerges as their leader: 'A church of love, not power.' Younger, gentler, critical of the Patriarch's wealth and politics. The Patriarch calls it heresy. Regional churches are choosing sides. This is getting messy.",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Full support for reformers. Break the Patriarch's power.", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: 12,  // Religious chaos
                            treasury: -60
                        }
                    },
                    unlocks: [
                        eventRef("religious_civil_war")
                    ]
                }),
                
                choice("Back off. This was a mistake.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: -5
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_insulted")
                    ]
                })
            ]
        }),
        
        event("religious_civil_war", {
            title: "Two Orthodox Churches",
            description: "The schism is complete. Two Patriarchs. Two Orthodox churches. Violence at some parishes. Regional governors forced to choose. The military split. Western churches recognize the reformers. This is a disaster. Your plan to divide them has divided everything.",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Support reformers. Crush the traditionalists.", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: 20,
                            treasury: -100
                        }
                    }
                }),
                
                choice("Support traditionalists. At least they're predictable.", {
                    effects: {
                        stats: {
                            elite: -12,
                            anger: 15,
                            treasury: -80
                        }
                    }
                }),
                
                choice("Secular state. Ban both from politics.", {
                    effects: {
                        stats: {
                            elite: -20,
                            anger: 25,
                            treasury: -60
                        },
                        legacy: {
                            icon: "⚖️",
                            name: "Secular Enforcer",
                            weight: -10
                        }
                    }
                })
            ]
        }),
        
        // ================================================================
        // TEMPORARY ALLIANCE PATH
        // ================================================================
        event("temporary_alliance", {
            title: "The Useful Partnership",
            description: "For now, you give the Church some of what they want. Blessings for military operations. Sermons supporting your policies. Religious cover for repression. But you're already planning the exit. Once they've served their purpose, you'll sideline them. The question is whether they know.",
            weight: 0,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Use them aggressively while we can.", {
                    effects: {
                        stats: {
                            elite: 8,
                            anger: -10,
                            treasury: -40
                        }
                    },
                    unlocks: [
                        eventRef("church_useful_phase")
                    ]
                }),
                
                choice("Minimal use. Don't let them get too comfortable.", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: -5,
                            treasury: -20
                        }
                    }
                })
            ]
        }),
        
        event("church_useful_phase", {
            title: "The Propaganda Partnership",
            description: "The alliance is working. The Patriarch blesses your controversial policies from the pulpit. 'God's will' is convenient cover for repression. Religious nationalism boosts military recruitment. The Church's moral authority helps you. But they're expecting more. Always more.",
            weight: 0,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Keep giving. Delay the inevitable.", {
                    effects: {
                        stats: {
                            elite: 5,
                            treasury: -60
                        }
                    },
                    unlocks: [
                        eventRef("church_demands_more")
                    ]
                }),
                
                choice("Start the betrayal. Begin marginalizing them.", {
                    effects: {
                        stats: {
                            elite: -5
                        }
                    },
                    unlocks: [
                        eventRef("betrayal_begins")
                    ]
                })
            ]
        }),
        
        event("betrayal_begins", {
            title: "The Quiet Marginalization",
            description: "Subtly, you start cutting them out. Meetings they're not invited to. Budget cuts framed as 'efficiency.' Their political allies quietly reassigned. The Patriarch's secretary calls: 'His Holiness would like a meeting. Urgent.' He knows. Or suspects.",
            weight: 0,
            requires: ["patriarch_kirill"],
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Accelerate. Purge him now before he reacts.", {
                    effects: {
                        stats: {
                            elite: -12,
                            anger: 18
                        },
                        characterStates: {
                            "patriarch_kirill": "arrested"
                        }
                    },
                    unlocks: [
                        eventRef("patriarch_purged")
                    ]
                }),
                
                choice("Meet him. See what he knows.", {
                    effects: {
                        stats: {
                            elite: -5
                        }
                    },
                    unlocks: [
                        eventRef("confrontation_meeting")
                    ]
                })
            ]
        }),
        
        event("patriarch_purged", {
            title: "The Fallen Patriarch",
            description: "'Corruption investigation' into Church finances. Swiss bank accounts (real ones). Luxury properties. Embezzlement. The evidence is documented. Patriarch Kirill is arrested at his dacha. A new, younger, compliant Patriarch is installed within a week. State media explains how you saved the Church from corruption.",
            weight: 0,
            storylines: ['holy-alliance'],
            
            choices: [
                choice("Show trial. Make an example.", {
                    effects: {
                        stats: {
                            elite: -10,
                            anger: 15,
                            treasury: -40
                        }
                    }
                }),
                
                choice("Quiet retirement. 'Health reasons.' Let him vanish.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 8
                        }
                    }
                })
            ]
        })
    ]
});

export default holyAllianceStoryline;

