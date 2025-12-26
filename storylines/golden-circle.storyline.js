/**
 * The Golden Circle - Oligarch Wealth Management Storyline
 * 
 * Size: ~25 events, Depth 5-6
 * Triggered by: Dacha Summit → "Let's make ourselves obscenely rich"
 * 
 * The storyline of managing oligarch excess and greed. Yacht parties,
 * offshore accounts, and the tension between accumulating wealth and hiding it.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

const goldenCircleStoryline = defineStoryline({
    id: 'golden-circle',
    name: 'The Golden Circle',
    description: 'Oligarch wealth, excess, and the price of greed',
    theme: {
        borderColor: '#FFD700',  // Gold
        accentColor: '#DAA520'   // Goldenrod
    },
    
    tree: [
        // ================================================================
        // ACT 1: THE FEAST BEGINS (Depth 1-2)
        // ================================================================
        
        event("golden_circle_first_deal", {
            title: "The First Big Contract",
            description: "The oligarchs have assembled at Viktor Kozlov's estate. They've brought proposals - oil pipelines, defense contracts, rare earth mining. Everyone wants a piece of the state. Your job is to allocate the spoils. Viktor, the shipping magnate with a weakness for yachts, is particularly eager.",
            weight: 0,  // Triggered only
            storylines: ['golden-circle'],
            characterId: "viktor",
            
            choices: [
                choice("'Equal shares for all loyal friends.'", {
                    effects: {
                        stats: {
                            elite: 15,
                            personalWealth: 5,
                            treasury: -80
                        },
                        flags: {
                            "contracts_distributed_equally": true
                        },
                        relationships: { viktor: 10 }
                    },
                    unlocks: [
                        eventRef("golden_circle_offshore_setup")
                    ]
                }),
                
                choice("'Viktor, you've been most loyal. First pick.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            personalWealth: 8,
                            treasury: -60
                        },
                        flags: {
                            "viktor_favored": true
                        },
                        relationships: { viktor: 25 }
                    },
                    legacy: {
                        icon: "🤝",
                        name: "The Favorite-Maker",
                        weight: -3,
                        explanation: "You chose favorites early. The others noticed."
                    },
                    unlocks: [
                        eventRef("golden_circle_offshore_setup"),
                        eventRef("golden_circle_viktor_yacht")
                    ]
                }),
                
                choice("'The state takes the lion's share. You get what's left.'", {
                    effects: {
                        stats: {
                            elite: -10,
                            personalWealth: 15,
                            treasury: 50
                        },
                        flags: {
                            "personal_greed_priority": true
                        },
                        relationships: { viktor: -15 }
                    },
                    legacy: {
                        icon: "💰",
                        name: "The Greedy Tsar",
                        weight: -5,
                        explanation: "You took the biggest cut. Your friends are already resentful."
                    },
                    unlocks: [
                        eventRef("golden_circle_offshore_setup")
                    ]
                }),
                
                choice("'Competitive bidding. May the highest offer win.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            treasury: 100,
                            personalWealth: 3
                        },
                        flags: {
                            "competitive_bidding": true
                        },
                        relationships: { viktor: -5 }
                    },
                    unlocks: [
                        eventRef("golden_circle_offshore_setup")
                    ]
                })
            ]
        }),
        
        event("golden_circle_offshore_setup", {
            title: "The Cyprus Arrangement",
            description: "Your financial advisor, a Swiss banker with a handlebar mustache and no surname, explains the situation: keeping wealth inside the Federation is... risky. Seizures. Audits. 'Voluntary donations.' He proposes a network of offshore accounts. Cyprus, the Caymans, British Virgin Islands. 'Completely legal. Mostly.'",
            weight: 8,
            storylines: ['golden-circle'],
            
            choices: [
                choice("'Set it up. All of it. Discretion is everything.'", {
                    effects: {
                        stats: {
                            personalWealth: 10,
                            treasury: -20
                        },
                        flags: {
                            "offshore_accounts_extensive": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_yacht")
                    ]
                }),
                
                choice("'I want my money where I can see it.'", {
                    effects: {
                        stats: {
                            personalWealth: 5,
                            treasury: 10
                        },
                        flags: {
                            "wealth_kept_domestic": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_yacht")
                    ]
                }),
                
                choice("'Create accounts for my friends too. Bind them to me.'", {
                    effects: {
                        stats: {
                            elite: 10,
                            personalWealth: 8,
                            treasury: -40
                        },
                        flags: {
                            "offshore_network_shared": true
                        },
                        relationships: { viktor: 10 }
                    },
                    legacy: {
                        icon: "🏦",
                        name: "The Networker",
                        weight: -4,
                        explanation: "You bound your oligarchs with shared offshore secrets."
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_yacht")
                    ]
                })
            ]
        }),
        
        event("golden_circle_viktor_yacht", {
            title: "Viktor's New Toy",
            description: "Viktor has purchased a yacht. Not just any yacht - a 500-foot superyacht called 'The Motherland's Pride.' It features a submarine dock, helicopter pad, missile defense system, and reportedly, an $850,000 Italian gold toilet. He wants to throw a party in Monaco. Half your cabinet is invited. Instagram is already buzzing.",
            weight: 7,
            storylines: ['golden-circle'],
            characterId: "viktor",
            
            choices: [
                choice("Attend the party. We're among friends.", {
                    effects: {
                        stats: {
                            elite: 8,
                            anger: 10,
                            personalWealth: 3
                        },
                        flags: {
                            "attended_yacht_party": true
                        },
                        relationships: { viktor: 15 }
                    },
                    unlocks: [
                        eventRef("golden_circle_yacht_scandal")
                    ]
                }),
                
                choice("Skip it, but send congratulations and a gift.", {
                    effects: {
                        stats: {
                            elite: 3,
                            anger: 5
                        },
                        relationships: { viktor: 5 }
                    },
                    unlocks: [
                        eventRef("golden_circle_pipeline_deal")
                    ]
                }),
                
                choice("Tell Viktor to be more discreet. Cancel the party.", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: -3
                        },
                        flags: {
                            "viktor_warned": true
                        },
                        relationships: { viktor: -10 }
                    },
                    unlocks: [
                        eventRef("golden_circle_pipeline_deal")
                    ]
                }),
                
                choice("Have his yacht 'inspected' for safety violations.", {
                    effects: {
                        stats: {
                            elite: -10,
                            treasury: 30,
                            anger: -5
                        },
                        flags: {
                            "viktor_humiliated": true
                        },
                        relationships: { viktor: -25 }
                    },
                    unlocks: [
                        eventRef("golden_circle_pipeline_deal"),
                        eventRef("golden_circle_viktor_resentment")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 2: THE FEEDING FRENZY (Depth 2-3)
        // ================================================================
        
        event("golden_circle_yacht_scandal", {
            title: "The Monaco Photos",
            description: "The party was a success. Too much of a success. Photos are everywhere - oligarchs dancing with models, champagne towers, the golden toilet in high definition. An opposition blogger has calculated the cost: $4 million for one weekend. The annual pension for a factory worker is $2,400. Your PR team is having a collective meltdown.",
            weight: 0,  // Triggered
            storylines: ['golden-circle'],
            
            choices: [
                choice("'Fake news. Photoshopped propaganda.'", {
                    effects: {
                        stats: {
                            anger: 8,
                            elite: 3
                        },
                        flags: {
                            "yacht_scandal_denied": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_pipeline_deal")
                    ]
                }),
                
                choice("'Block the websites. Arrest the blogger.'", {
                    effects: {
                        stats: {
                            anger: 5,
                            elite: 5,
                            treasury: -10
                        },
                        flags: {
                            "yacht_blogger_arrested": true
                        }
                    },
                    legacy: {
                        icon: "🔒",
                        name: "The Censor",
                        weight: -5,
                        explanation: "You silenced critics of your oligarch friends."
                    },
                    unlocks: [
                        eventRef("golden_circle_pipeline_deal")
                    ]
                }),
                
                choice("'Viktor donates the yacht to... charity. Publicly.'", {
                    effects: {
                        stats: {
                            anger: -10,
                            elite: -8
                        },
                        flags: {
                            "viktor_yacht_donated": true
                        },
                        relationships: { viktor: -20 }
                    },
                    unlocks: [
                        eventRef("golden_circle_pipeline_deal")
                    ]
                })
            ]
        }),
        
        event("golden_circle_viktor_resentment", {
            title: "Viktor's Cold Shoulder",
            description: "Since the yacht inspection, Viktor has been distant. He still attends meetings, still pays his dues, but the warmth is gone. Your intelligence reports he's been talking to other oligarchs. Comparing notes. 'Just business discussions,' supposedly.",
            weight: 5,
            storylines: ['golden-circle'],
            characterId: "viktor",
            conditions: {
                flag: "viktor_humiliated"
            },
            
            choices: [
                choice("Extend an olive branch. Apologize privately.", {
                    effects: {
                        stats: {
                            elite: 5
                        },
                        relationships: { viktor: 15 }
                    }
                }),
                
                choice("Ignore it. He'll come around.", {
                    effects: {
                        relationships: { viktor: -5 }
                    }
                }),
                
                choice("Double down. Have his other assets 'audited.'", {
                    effects: {
                        stats: {
                            elite: -15,
                            treasury: 50
                        },
                        flags: {
                            "viktor_targeted": true
                        },
                        relationships: { viktor: -30 }
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_problem")
                    ]
                })
            ]
        }),
        
        event("golden_circle_pipeline_deal", {
            title: "The Northern Route",
            description: "The Northern Gas Pipeline - $40 billion of state investment. Viktor wants the construction contract. Another oligarch, Sergei the Steel Baron, wants it too. They're both offering generous 'consulting fees' directly to your Cyprus account. The state treasury would benefit from competitive bidding.",
            weight: 6,
            storylines: ['golden-circle'],
            characterId: "viktor",
            
            choices: [
                choice("'Viktor gets it. Loyalty deserves reward.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            personalWealth: 15,
                            treasury: -100
                        },
                        flags: {
                            "viktor_pipeline_contract": true
                        },
                        relationships: { viktor: 20 }
                    },
                    unlocks: [
                        eventRef("golden_circle_palace_construction")
                    ]
                }),
                
                choice("'Sergei gets it. Viktor's had enough.'", {
                    effects: {
                        stats: {
                            elite: 3,
                            personalWealth: 12,
                            treasury: -80
                        },
                        relationships: { viktor: -15 }
                    },
                    unlocks: [
                        eventRef("golden_circle_palace_construction")
                    ]
                }),
                
                choice("'Split it. Both can profit.'", {
                    effects: {
                        stats: {
                            elite: 8,
                            personalWealth: 10,
                            treasury: -90
                        },
                        relationships: { viktor: 5 }
                    },
                    unlocks: [
                        eventRef("golden_circle_palace_construction")
                    ]
                }),
                
                choice("'Open competitive bidding. Maximize state revenue.'", {
                    effects: {
                        stats: {
                            elite: -8,
                            treasury: 80,
                            personalWealth: 3
                        },
                        relationships: { viktor: -10 }
                    },
                    unlocks: [
                        eventRef("golden_circle_palace_construction")
                    ]
                })
            ]
        }),
        
        event("golden_circle_palace_construction", {
            title: "The Palace by the Sea",
            description: "Your chief of staff presents architectural plans: a palace on the Black Sea coast. 18,000 square meters. Private theatre, ice hockey rink, casino, vineyard, and a hookah lounge with a view of the sea. 'A retreat worthy of a great leader.' Estimated cost: $1.4 billion. The annual education budget is $800 million.",
            weight: 5,
            storylines: ['golden-circle'],
            
            choices: [
                choice("'Build it. I've earned this.'", {
                    effects: {
                        stats: {
                            personalWealth: -20,
                            treasury: -200,
                            anger: 8
                        },
                        flags: {
                            "palace_built_personal": true
                        }
                    },
                    legacy: {
                        icon: "🏰",
                        name: "The Sun King",
                        weight: 40,
                        explanation: "You built a palace that outshone the tsars."
                    },
                    unlocks: [
                        eventRef("golden_circle_sanctions_warning")
                    ]
                }),
                
                choice("'Scale it back. Something more... modest.'", {
                    effects: {
                        stats: {
                            personalWealth: -5,
                            treasury: -50,
                            anger: 3
                        },
                        flags: {
                            "palace_built_modest": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_sanctions_warning")
                    ]
                }),
                
                choice("'Build it, but route the funds through state infrastructure.'", {
                    effects: {
                        stats: {
                            treasury: -150,
                            anger: 5
                        },
                        flags: {
                            "palace_built_hidden": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_sanctions_warning")
                    ]
                }),
                
                choice("'Perhaps later. The timing is poor.'", {
                    effects: {
                        stats: {
                            anger: -5,
                            elite: -3
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_sanctions_warning")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 3: THE RECKONING (Depth 3-4)
        // ================================================================
        
        event("golden_circle_sanctions_warning", {
            title: "The Western Notice",
            description: "Western intelligence has noticed your oligarch friends' spending sprees. The EU is making noise about sanctions lists - asset freezes, travel bans, frozen accounts in London and Geneva. Your friends are nervous. Viktor's lawyers have already called three times today.",
            weight: 5,
            storylines: ['golden-circle'],
            
            choices: [
                choice("'Ignore them. They need our gas more than we need their banks.'", {
                    effects: {
                        stats: {
                            elite: 5,
                            treasury: -30
                        },
                        flags: {
                            "sanctions_ignored": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_panama_leak")
                    ]
                }),
                
                choice("'Quietly move assets to friendlier jurisdictions. Dubai. Singapore.'", {
                    effects: {
                        stats: {
                            personalWealth: -5,
                            elite: 8
                        },
                        flags: {
                            "assets_moved_east": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_panama_leak")
                    ]
                }),
                
                choice("'Meet with their ambassadors. Negotiate. We can be reasonable.'", {
                    effects: {
                        stats: {
                            elite: -5,
                            anger: 3
                        },
                        flags: {
                            "western_negotiation": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_panama_leak")
                    ]
                }),
                
                choice("'Let them sanction Viktor. Sacrifice him to protect the rest.'", {
                    effects: {
                        stats: {
                            elite: -3,
                            personalWealth: 5
                        },
                        flags: {
                            "viktor_sacrificed_sanctions": true
                        },
                        relationships: { viktor: -30 }
                    },
                    unlocks: [
                        eventRef("golden_circle_panama_leak"),
                        eventRef("golden_circle_viktor_problem")
                    ]
                })
            ]
        }),
        
        event("golden_circle_panama_leak", {
            title: "The Data Breach",
            description: "Disaster. An investigative journalism consortium has obtained 11.5 million documents from a Panamanian law firm. Your name appears 47 times. Viktor's appears 312 times. Shell companies, hidden assets, suspicious transactions. Publication in 48 hours. Your media advisor looks like he's about to have a stroke.",
            weight: 4,
            storylines: ['golden-circle'],
            
            choices: [
                choice("'Deny everything. Fake news. Western propaganda.'", {
                    effects: {
                        stats: {
                            anger: 10,
                            elite: 5
                        },
                        flags: {
                            "panama_denied": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_problem")
                    ]
                }),
                
                choice("'Get ahead of it. Admit to minor accounting errors.'", {
                    effects: {
                        stats: {
                            anger: 5,
                            elite: -5,
                            personalWealth: -10
                        },
                        flags: {
                            "panama_admitted": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_problem")
                    ]
                }),
                
                choice("'Block the websites. Arrest any domestic journalists who publish.'", {
                    effects: {
                        stats: {
                            anger: 8,
                            elite: 8,
                            treasury: -30
                        },
                        flags: {
                            "panama_censored": true
                        }
                    },
                    legacy: {
                        icon: "🔒",
                        name: "The Truth Blocker",
                        weight: -8,
                        explanation: "You tried to censor evidence of oligarch corruption."
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_problem")
                    ]
                }),
                
                choice("'Sacrifice Viktor. He's the real story here.'", {
                    effects: {
                        stats: {
                            anger: -5,
                            elite: -10
                        },
                        flags: {
                            "viktor_scapegoated": true
                        },
                        relationships: { viktor: -40 }
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_fall")
                    ]
                })
            ]
        }),
        
        event("golden_circle_viktor_problem", {
            title: "Viktor's Troubles",
            description: "Viktor has become a liability. His Instagram is a constant PR disaster - caviar breakfasts, champagne baths, fur coat shopping with his girlfriend (who is younger than his daughter). The opposition uses his photos in every protest. Western media calls him 'the face of kleptocracy.' Something must be done.",
            weight: 4,
            storylines: ['golden-circle'],
            characterId: "viktor",
            
            choices: [
                choice("Warn him privately. Last chance.", {
                    effects: {
                        stats: {
                            elite: 3
                        },
                        flags: {
                            "viktor_final_warning": true
                        },
                        relationships: { viktor: -5 }
                    },
                    unlocks: [
                        eventRef("golden_circle_oligarch_alliance")
                    ]
                }),
                
                choice("Distance yourself publicly, maintain ties privately.", {
                    effects: {
                        stats: {
                            anger: -5,
                            elite: -3
                        },
                        flags: {
                            "viktor_public_distance": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_oligarch_alliance")
                    ]
                }),
                
                choice("Investigate him for 'tax irregularities.'", {
                    effects: {
                        stats: {
                            elite: -10,
                            treasury: 50
                        },
                        flags: {
                            "viktor_investigated": true
                        },
                        relationships: { viktor: -25 }
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_fall")
                    ]
                }),
                
                choice("He's outlived his usefulness. Arrest him.", {
                    effects: {
                        stats: {
                            elite: -20,
                            treasury: 100,
                            anger: 5
                        },
                        flags: {
                            "viktor_arrested_immediately": true
                        },
                        characterStates: { viktor: "arrested" }
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Oligarch Slayer",
                        weight: -8,
                        explanation: "You arrested your own friend when he became inconvenient."
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_fall")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // ACT 4: THE FALL (Depth 4-5)
        // ================================================================
        
        event("golden_circle_oligarch_alliance", {
            title: "The Quiet Meeting",
            description: "Your intelligence chief reports something concerning: three oligarchs met privately in Geneva. Without you. Without your knowledge. Viktor wasn't there, but Sergei was. They're not plotting - not yet. But they're comparing notes. 'Just business discussions,' their people claim.",
            weight: 4,
            storylines: ['golden-circle'],
            
            choices: [
                choice("Ignore it. They're just talking.", {
                    effects: {
                        stats: {
                            elite: 3
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_succession_crossover")
                    ]
                }),
                
                choice("Summon them. Remind them who's in charge.", {
                    effects: {
                        stats: {
                            elite: -8,
                            anger: -3
                        },
                        flags: {
                            "oligarchs_summoned": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_succession_crossover")
                    ]
                }),
                
                choice("Bug their phones. Know everything.", {
                    effects: {
                        stats: {
                            treasury: -20
                        },
                        flags: {
                            "oligarchs_surveilled": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_loyalty_crossover")
                    ]
                }),
                
                choice("Preemptive strike. Arrest the ringleader.", {
                    effects: {
                        stats: {
                            elite: -25,
                            treasury: 80,
                            anger: 8
                        },
                        flags: {
                            "oligarch_purge_begun": true
                        }
                    },
                    legacy: {
                        icon: "⚔️",
                        name: "The First Strike",
                        weight: 25,
                        explanation: "You struck first against your own elite."
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                })
            ]
        }),
        
        event("golden_circle_viktor_fall", {
            title: "The Arrest",
            description: "Viktor Kozlov is arrested at 6 AM. Charges: tax evasion, money laundering, 'economic crimes against the state.' His yacht is seized. His accounts frozen. His twenty-three-year-old girlfriend is photographed crying outside his mansion. Western media is outraged. The other oligarchs are terrified. Is anyone safe?",
            weight: 0,  // Triggered
            storylines: ['golden-circle'],
            characterId: "viktor",
            
            choices: [
                choice("Show trial. Make an example for state television.", {
                    effects: {
                        stats: {
                            elite: -15,
                            anger: -10,
                            treasury: 50
                        },
                        flags: {
                            "viktor_show_trial": true
                        },
                        characterStates: { viktor: "imprisoned" }
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Showman of Justice",
                        weight: -12,
                        explanation: "You made a spectacle of destroying your friend."
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                }),
                
                choice("Quiet conviction. Long sentence in a comfortable prison.", {
                    effects: {
                        stats: {
                            elite: -8,
                            treasury: 30
                        },
                        characterStates: { viktor: "imprisoned" }
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                }),
                
                choice("Let him buy his way out. Take his assets, spare his freedom.", {
                    effects: {
                        stats: {
                            elite: 5,
                            treasury: 150,
                            personalWealth: 30
                        },
                        characterStates: { viktor: "broken" }
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                }),
                
                choice("Exile. He can keep some money if he never returns.", {
                    effects: {
                        stats: {
                            elite: 3,
                            treasury: 50
                        },
                        characterStates: { viktor: "exiled" }
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                })
            ]
        }),
        
        // ================================================================
        // CROSSOVER EVENTS
        // ================================================================
        
        event("golden_circle_succession_crossover", {
            title: "The Oligarch Prince",
            description: "One oligarch has become too powerful. Sergei the Steel Baron is now richer than the state treasury. He has his own security force, his own media empire, his own network of dependent politicians. The only way to control him might be to... elevate him. Your advisors suggest making him your official successor. Bind him to the system.",
            weight: 3,
            storylines: ['golden-circle', 'succession'],
            conditions: {
                allOf: [
                    { flag: "golden_circle_active", equals: true },
                    { flag: "oligarch_became_heir", equals: false }
                ]
            },
            
            choices: [
                choice("'Name him my successor. Control through elevation.'", {
                    effects: {
                        stats: {
                            elite: 10,
                            anger: 5
                        },
                        flags: {
                            "oligarch_became_heir": true
                        }
                    },
                    legacy: {
                        icon: "👑",
                        name: "The Kingmaker",
                        weight: -5,
                        explanation: "You elevated an oligarch to heir. The rich get richer."
                    },
                    unlocks: [
                        eventRef("succession_oligarch_heir")
                    ]
                }),
                
                choice("'Absolutely not. He stays in his lane.'", {
                    effects: {
                        stats: {
                            elite: -5
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                }),
                
                choice("'Destroy him instead. No one rivals me.'", {
                    effects: {
                        stats: {
                            elite: -20,
                            treasury: 100
                        },
                        flags: {
                            "sergei_destroyed": true
                        }
                    },
                    legacy: {
                        icon: "💀",
                        name: "The Leveler",
                        weight: -8,
                        explanation: "You destroyed an oligarch for being too successful."
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                })
            ]
        }),
        
        event("golden_circle_loyalty_crossover", {
            title: "The Deep Investigation",
            description: "The surveillance of your oligarch friends has revealed more than expected. Not just business dealings - but coordinated political activity. Payments to generals. Contacts with foreign intelligence. They're building something. Director Sokolov awaits your orders.",
            weight: 0,  // Triggered
            storylines: ['golden-circle', 'loyalty-apparatus'],
            conditions: {
                flag: "oligarchs_surveilled"
            },
            
            choices: [
                choice("'Full purge. Arrest everyone involved.'", {
                    effects: {
                        stats: {
                            elite: -30,
                            treasury: 150,
                            anger: 10
                        },
                        flags: {
                            "wealth_triggered_purge": true
                        }
                    },
                    legacy: {
                        icon: "🔥",
                        name: "The Great Purger",
                        weight: 30,
                        explanation: "You destroyed the oligarch class you once led."
                    },
                    unlocks: [
                        eventRef("loyalty_oligarch_investigation")
                    ]
                }),
                
                choice("'Just the ringleaders. Surgical strike.'", {
                    effects: {
                        stats: {
                            elite: -15,
                            treasury: 80
                        },
                        flags: {
                            "partial_purge": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                }),
                
                choice("'Keep watching. I want to know everything before I act.'", {
                    effects: {
                        stats: {
                            treasury: -10
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_final_accounting")
                    ]
                })
            ]
        }),
        
        // Crossover entry point from succession
        event("golden_circle_new_oligarch", {
            title: "The Demoted Prince",
            description: "Your former heir, stripped of political power, has been given a consolation prize: unlimited wealth and no responsibility. They've taken to it with enthusiasm. New yacht. New mansion. New Instagram account. They're becoming just another oligarch - rich, visible, and potentially problematic.",
            weight: 0,  // Triggered by crossover
            storylines: ['golden-circle'],
            conditions: {
                flag: "heir_demoted_to_oligarch"
            },
            
            choices: [
                choice("Good. Let them enjoy their gilded cage.", {
                    effects: {
                        stats: {
                            elite: 5,
                            anger: 3
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_viktor_yacht")
                    ]
                }),
                
                choice("Watch them carefully. They might cause trouble.", {
                    effects: {
                        stats: {
                            treasury: -10
                        },
                        flags: {
                            "former_heir_watched": true
                        }
                    },
                    unlocks: [
                        eventRef("golden_circle_oligarch_alliance")
                    ]
                }),
                
                choice("Perhaps I was too generous. Reduce their allowance.", {
                    effects: {
                        stats: {
                            elite: -5
                        },
                        flags: {
                            "former_heir_reduced": true
                        }
                    }
                })
            ]
        }),
        
        // ================================================================
        // ACT 5: ENDGAME (Depth 5-6)
        // ================================================================
        
        event("golden_circle_final_accounting", {
            title: "The Price of Everything",
            description: "Years have passed. You're rich beyond imagination - your Cyprus accounts could fund small nations. But at what cost? Viktor is gone. The economy is hollowed out. Your remaining friends are either terrified or planning. The West has frozen billions. And the people whisper about palaces and yachts while they count their kopecks.",
            weight: 3,
            storylines: ['golden-circle'],
            
            choices: [
                choice("'It was worth it. I regret nothing.'", {
                    effects: {
                        stats: {
                            personalWealth: 10,
                            anger: 5
                        }
                    },
                    legacy: {
                        icon: "💰",
                        name: "The Unrepentant",
                        weight: -15,
                        explanation: "You stole everything and smiled about it."
                    }
                }),
                
                choice("'Perhaps we went too far. Time to give something back.'", {
                    effects: {
                        stats: {
                            personalWealth: -20,
                            treasury: 50,
                            anger: -10
                        }
                    },
                    legacy: {
                        icon: "🕊️",
                        name: "The Late Philanthropist",
                        weight: 5,
                        explanation: "You gave back... some of what you stole."
                    }
                }),
                
                choice("'The game continues. There's always more to take.'", {
                    effects: {
                        stats: {
                            personalWealth: 15,
                            elite: -5,
                            anger: 8
                        }
                    },
                    legacy: {
                        icon: "♾️",
                        name: "The Insatiable",
                        weight: -20,
                        explanation: "You could never have enough."
                    }
                }),
                
                choice("'Secure the exit. It's time to take what I can and go.'", {
                    effects: {
                        stats: {
                            personalWealth: 25,
                            elite: -15,
                            treasury: -50
                        },
                        flags: {
                            "preparing_exit": true
                        }
                    },
                    legacy: {
                        icon: "🚪",
                        name: "The Exit Strategist",
                        weight: -10,
                        explanation: "You always knew when to leave."
                    }
                })
            ]
        })
    ]
});

export default goldenCircleStoryline;

