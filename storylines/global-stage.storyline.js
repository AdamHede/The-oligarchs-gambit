/**
 * Global Stage Storyline - v1.0
 *
 * A reactive/adversarial storyline where your geopolitical choice determines
 * which of three paths becomes your ALLY, ADVERSARY, or OPPORTUNIST track.
 *
 * Three Branches (all active simultaneously in different roles):
 * 1. Western Gambit - Euro-Atlantic integration (Ambassador Morrison)
 * 2. Eastern Embrace - Chinese partnership (Ambassador Zhang Wei)
 * 3. Third Way - Non-aligned coalition (Mehmet Yilmaz, Prince Khalid)
 *
 * Novel Structure: Unlike other storylines, all three remain active but play
 * different roles based on your initial choice.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "global-stage",
    name: "The Global Stage",
    description: "Three geopolitical paths - your choice determines who becomes ally, adversary, or opportunist",

    tree: [
        // ═══════════════════════════════════════════════════════════════
        // BRANCH 1: THE WESTERN GAMBIT
        // ═══════════════════════════════════════════════════════════════
        //
        // Euro-Atlantic integration path led by Ambassador Morrison
        // Theme: Can you reform enough to join the club?
        // Arc: Offer → Conditions → Friction → Integration or Break
        // ═══════════════════════════════════════════════════════════════

        // --- ALLY PATH EVENTS (when West is your choice) ---

        event("western_accord_first_offer", {
            title: "The IMF Package",
            description: "Ambassador Morrison and Commissioner Braun present the offer: $40 billion credit line, debt restructuring, technology transfer agreements. The conditions are... extensive. Court reforms. Press freedom. 'Just procedural,' Morrison says. Braun looks uncomfortable. Your oligarchs are checking their London properties.",
            
            weight: 15,
            rarity: "rare",
            onceOnly: true,
            characterId: "ambassador_morrison",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "western_accord_ally"
            },

            meta: { depth: 1, impact: 5, sentiment: "positive" },

            choices: [
                choice("Accept the package and conditions. We need this.", {
                    effects: {
                        treasury: 150,
                        elite: -15,
                        flags: { "imf_package_accepted": true }
                    },
                    legacy: {
                        icon: "📋",
                        name: "The Compliant",
                        weight: 0,
                        explanation: "You accepted Western money and Western conditions."
                    },
                    unlocks: [
                        eventRef("western_reform_demands")
                    ]
                }),
                choice("Accept the money, negotiate the conditions.", {
                    effects: {
                        treasury: 80,
                        elite: -8,
                        flags: { "imf_negotiated": true }
                    },
                    unlocks: [
                        eventRef("western_reform_demands")
                    ]
                }),
                choice("The conditions are unacceptable.", {
                    effects: {
                        elite: 5,
                        flags: { "rejected_imf_conditions": true }
                    },
                    unlocks: [
                        eventRef("western_relationship_cools")
                    ]
                }),
                choice("Let us consider. We have other offers.", {
                    effects: {
                        flags: { "playing_west_east": true }
                    },
                    unlocks: [
                        eventRef("western_pressure_begins")
                    ]
                })
            ]
        }),

        event("western_reform_demands", {
            title: "The Reform Agenda",
            description: "The Western package requires 'structural reforms.' Independent judiciary. Free press. Opposition allowed to register parties. Your advisors translate: give up control. Morrison insists these are 'standard conditions.' Your oligarchs are panicking—their British lawyers are on speed dial.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            characterId: "ambassador_morrison",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "western_accord_ally"
            },

            meta: { depth: 2, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Implement genuine reforms. Limited, but real.", {
                    effects: {
                        elite: -20,
                        anger: -15,
                        flags: { "genuine_western_reforms": true }
                    },
                    unlocks: [
                        eventRef("western_relationship_improves")
                    ]
                }),
                choice("Create the appearance of reform. Paper compliance.", {
                    effects: {
                        elite: -5,
                        flags: { "fake_western_reforms": true }
                    },
                    unlocks: [
                        eventRef("western_pressure_begins")
                    ]
                }),
                choice("Refuse. We will not be colonized.", {
                    effects: {
                        elite: 10,
                        flags: { "rejected_reforms": true }
                    },
                    unlocks: [
                        eventRef("western_sanctions_begin")
                    ]
                }),
                choice("Reform the economy, not the politics.", {
                    effects: {
                        treasury: 30,
                        elite: -10
                    },
                    unlocks: [
                        eventRef("western_pressure_begins")
                    ]
                })
            ]
        }),

        event("western_relationship_improves", {
            title: "The Thaw",
            description: "Your token gestures have been noted. Braun signals that the EU might ease some restrictions. American businesses are inquiring about investment. Shell wants back in. Siemens is calling. But the hardliners at home are furious—you're showing weakness to the West.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "genuine_western_reforms"
            },

            meta: { depth: 3, impact: 4, sentiment: "positive" },

            choices: [
                choice("Continue the opening. Carefully.", {
                    effects: {
                        treasury: 50,
                        elite: -12
                    },
                    unlocks: [
                        eventRef("western_investment_wave")
                    ]
                }),
                choice("Slow down. We've given enough.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("western_pressure_resumes")
                    ]
                }),
                choice("Extract maximum concessions first.", {
                    effects: {
                        treasury: 80,
                        elite: -5
                    },
                    unlocks: [
                        eventRef("western_investment_wave")
                    ]
                })
            ]
        }),

        event("western_relationship_cools", {
            title: "The Cold Shoulder",
            description: "Morrison's calls come less frequently. Braun is 'unavailable.' The EU is 'reassessing' the relationship. Western media runs increasingly hostile stories. You're not in the club—and they're making sure you know it.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "rejected_imf_conditions"
            },

            meta: { depth: 2, impact: 3, sentiment: "negative" },

            choices: [
                choice("Reach out again. We can negotiate.", {
                    effects: {
                        elite: -5
                    },
                    unlocks: [
                        eventRef("western_back_channel")
                    ]
                }),
                choice("Fine. We have other friends.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("eastern_opportunist_approach")
                    ]
                }),
                choice("Launch a charm offensive. PR campaign.", {
                    effects: {
                        treasury: -30
                    },
                    unlocks: [
                        eventRef("western_pressure_begins")
                    ]
                })
            ]
        }),

        event("western_pressure_begins", {
            title: "The Human Rights Report",
            description: "Claire Whitfield's NGO releases its annual report. Your country is featured prominently: political prisoners, disappeared journalists, suspicious deaths. CNN runs it for three days. Morrison asks for 'clarification.' Braun looks away. Your press secretary calls it 'fabrication.'",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "claire_whitfield",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "global_stage_active"
            },

            meta: { depth: 2, impact: 4, sentiment: "negative" },

            choices: [
                choice("Deny everything. Western propaganda.", {
                    effects: {
                        anger: -5,
                        elite: 5
                    },
                    unlocks: [
                        eventRef("western_media_war")
                    ]
                }),
                choice("Release some prisoners. Token gesture.", {
                    effects: {
                        treasury: -10,
                        flags: { "prisoner_release": true }
                    },
                    unlocks: [
                        eventRef("western_relationship_improves")
                    ]
                }),
                choice("Expel the NGO. Enough interference.", {
                    effects: {
                        elite: 8
                    },
                    unlocks: [
                        eventRef("western_sanctions_begin")
                    ]
                }),
                choice("Invite them to inspect. Call their bluff.", {
                    effects: {
                        flags: { "allowed_inspection": true }
                    },
                    unlocks: [
                        eventRef("western_inspection_disaster")
                    ]
                })
            ]
        }),

        event("western_inspection_disaster", {
            title: "The Inspection Goes Wrong",
            description: "You invited Western inspectors. They found things. The report is devastating: secret prisons, torture evidence, documented disappearances. Claire Whitfield is doing a victory lap on CNN. Morrison says he's 'deeply troubled.'",
            
            weight: 0,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "allowed_inspection"
            },

            meta: { depth: 3, impact: 5, sentiment: "negative" },

            choices: [
                choice("The inspectors were biased. Expel them.", {
                    effects: {
                        elite: 5,
                        anger: 5
                    },
                    unlocks: [
                        eventRef("western_sanctions_begin")
                    ]
                }),
                choice("Blame rogue elements. Arrest some officers.", {
                    effects: {
                        elite: -10
                    },
                    unlocks: [
                        eventRef("western_pressure_resumes")
                    ]
                }),
                choice("Promise reforms. Buy time.", {
                    effects: {
                        flags: { "promised_reforms": true }
                    },
                    unlocks: [
                        eventRef("western_back_channel")
                    ]
                })
            ]
        }),

        event("western_sanctions_begin", {
            title: "The First Sanctions",
            description: "The EU announces 'targeted sanctions' against 'individuals responsible for human rights violations.' Your personal accounts in London are frozen. Your daughter can't finish her degree at Oxford. The oligarchs are next. Their yachts are suddenly very interesting to Western authorities.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "global_stage_active"
            },

            meta: { depth: 3, impact: 5, sentiment: "negative" },

            choices: [
                choice("Retaliate. Expel diplomats, seize assets.", {
                    effects: {
                        elite: 10,
                        treasury: -30
                    },
                    unlocks: [
                        eventRef("western_escalation_spiral")
                    ]
                }),
                choice("Ignore them. We have other banks.", {
                    effects: {
                        treasury: -20
                    },
                    unlocks: [
                        eventRef("western_asset_hunt")
                    ]
                }),
                choice("Negotiate through back channels.", {
                    effects: {
                        treasury: -10
                    },
                    unlocks: [
                        eventRef("western_back_channel")
                    ]
                }),
                choice("Sacrifice some oligarchs. Save the rest.", {
                    effects: {
                        elite: -15,
                        flags: { "oligarch_sacrifice": true }
                    },
                    unlocks: [
                        eventRef("western_pressure_resumes")
                    ]
                })
            ]
        }),

        event("western_investment_wave", {
            title: "The Money Arrives",
            description: "Western investment is flowing. Shell, BP, Siemens all want in. Your economy is stabilizing. But they want guarantees—contracts that can't be unilaterally changed, courts that follow law. The strings multiply with every dollar.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "western_accord_ally"
            },

            meta: { depth: 4, impact: 4, sentiment: "positive" },

            choices: [
                choice("Give them what they want. Growth is growth.", {
                    effects: {
                        treasury: 100,
                        elite: -20,
                        flags: { "western_dependent": true }
                    },
                    unlocks: [
                        eventRef("western_final_choice")
                    ]
                }),
                choice("Extract better terms. We have leverage now.", {
                    effects: {
                        treasury: 60,
                        elite: -10
                    },
                    unlocks: [
                        eventRef("western_final_choice")
                    ]
                }),
                choice("Nationalize once they've invested.", {
                    effects: {
                        treasury: 150,
                        elite: 5,
                        flags: { "nationalized_western_assets": true }
                    },
                    legacy: {
                        icon: "🔨",
                        name: "The Expropriator",
                        weight: -15,
                        explanation: "You invited Western investment, then seized it."
                    },
                    unlocks: [
                        eventRef("western_escalation_spiral")
                    ]
                })
            ]
        }),

        event("western_escalation_spiral", {
            title: "The New Cold War",
            description: "Relations are collapsing. Full sanctions, diplomatic expulsions, frozen assets, travel bans. Your oligarchs are screaming. Western companies are fleeing. Morrison calls to say he's being recalled. 'We tried,' he says. 'We really tried.'",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "global_stage_active"
            },

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("Let them go. We don't need them.", {
                    effects: {
                        treasury: -100,
                        elite: -20
                    },
                    unlocks: [
                        eventRef("global_isolation")
                    ]
                }),
                choice("One last attempt at negotiation.", {
                    effects: {
                        treasury: -30
                    },
                    unlocks: [
                        eventRef("western_back_channel")
                    ]
                }),
                choice("Retaliate asymmetrically. Cyber, energy, elections.", {
                    effects: {
                        treasury: -40,
                        flags: { "hybrid_war_west": true }
                    },
                    legacy: {
                        icon: "💻",
                        name: "The Hybrid Warrior",
                        weight: -10,
                        explanation: "When diplomacy failed, you went dark."
                    },
                    unlocks: [
                        eventRef("western_hybrid_war")
                    ]
                })
            ]
        }),

        event("western_back_channel", {
            title: "The Secret Talks",
            description: "A former European prime minister arrives quietly at your dacha. He represents 'certain interests' who want to avoid complete breakdown. A deal might be possible—sanctions relief for specific concessions. But it would have to stay secret.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "global_stage_active"
            },

            meta: { depth: 4, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Negotiate. What do they want?", {
                    effects: {
                        flags: { "secret_western_deal": true }
                    },
                    unlocks: [
                        eventRef("western_final_choice")
                    ]
                }),
                choice("No secret deals. If they want peace, do it publicly.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                }),
                choice("Use this channel to deceive them.", {
                    effects: {
                        flags: { "betrayed_back_channel": true }
                    },
                    unlocks: [
                        eventRef("western_escalation_spiral")
                    ]
                })
            ]
        }),

        event("western_final_choice", {
            title: "The Atlantic Question",
            description: "Years have passed. The Western relationship has defined your reign. Now a moment of clarity: integrate fully and accept their rules, or break permanently and accept the consequences. There is no middle ground left. Morrison is long gone. Braun sits across from you, exhausted.",
            
            weight: 8,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "western_accord_ally"
            },

            meta: { depth: 5, impact: 5, sentiment: "neutral" },

            choices: [
                choice("Full integration. We become a 'normal' country.", {
                    effects: {
                        elite: -30,
                        anger: -20,
                        treasury: 200
                    },
                    legacy: {
                        icon: "🌐",
                        name: "The Integrator",
                        weight: 10,
                        explanation: "You chose the West. Your country changed forever."
                    }
                }),
                choice("Permanent break. We chart our own course.", {
                    effects: {
                        elite: 10,
                        treasury: -100
                    },
                    legacy: {
                        icon: "✊",
                        name: "The Defiant",
                        weight: -5,
                        explanation: "You rejected Western integration. Consequences followed."
                    },
                    unlocks: [
                        eventRef("global_isolation")
                    ]
                }),
                choice("Managed tension. Neither peace nor war.", {
                    effects: {
                        treasury: 50
                    },
                    legacy: {
                        icon: "⚖️",
                        name: "The Balancer",
                        weight: 0,
                        explanation: "You found an uneasy equilibrium with the West."
                    }
                }),
                choice("Collapse the talks. Blame them.", {
                    effects: {
                        elite: 5,
                        anger: -5
                    },
                    legacy: {
                        icon: "🎭",
                        name: "The Blame-Shifter",
                        weight: -5,
                        explanation: "You blamed the West for your own choices."
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                })
            ]
        }),

        // --- ADVERSARY PATH EVENTS (when West is hostile) ---

        event("western_sanctions_escalate", {
            title: "The Full Package",
            description: "You chose differently, and the West noticed. Full sectoral sanctions. Oil technology banned. Banking restrictions. SWIFT access threatened. They're trying to crush you economically. Your Chinese friends are watching with interest.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "western_accord_adversary"
            },

            meta: { depth: 2, impact: 5, sentiment: "negative" },

            choices: [
                choice("Weather the storm. We've survived worse.", {
                    effects: {
                        treasury: -80,
                        anger: 10
                    },
                    unlocks: [
                        eventRef("inflation_crisis_deepens")
                    ]
                }),
                choice("Accelerate the Eastern pivot.", {
                    effects: {
                        flags: { "sanctions_drove_east": true }
                    },
                    unlocks: [
                        eventRef("eastern_opportunist_approach")
                    ]
                }),
                choice("Seek Third Way partners.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_opportunist_approach")
                    ]
                }),
                choice("Retaliate. Cut off gas supplies.", {
                    effects: {
                        treasury: -50,
                        elite: 10
                    },
                    unlocks: [
                        eventRef("western_escalation_spiral")
                    ]
                })
            ]
        }),

        event("western_asset_hunt", {
            title: "The Oligarch Squeeze",
            description: "Western governments are hunting oligarch assets. Yachts seized in Monaco. Mansions frozen in London. Villas in Sardinia confiscated. Your friends are panicking—their money is trapped abroad. Some blame you. Some are quietly switching sides.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "western_accord_adversary"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Promise to help them. State compensation.", {
                    effects: {
                        treasury: -100,
                        elite: 10
                    }
                }),
                choice("They should have been more careful.", {
                    effects: {
                        elite: -15
                    }
                }),
                choice("Use this to consolidate control. Loyal ones get help.", {
                    effects: {
                        elite: -5,
                        personalWealth: 20
                    }
                })
            ]
        }),

        event("western_media_war", {
            title: "The Documentary",
            description: "BBC releases a two-hour documentary about your corruption. Leaked documents, hidden camera footage, interviews with defectors. Watched by 30 million people. Your palace. Your accounts. Your mistresses. Your press secretary calls it 'lies.' Nobody believes him.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Sue them in British courts.", {
                    effects: {
                        treasury: -20
                    }
                }),
                choice("Block the internet. Control domestic narrative.", {
                    effects: {
                        anger: 10,
                        elite: 5
                    }
                }),
                choice("Release counter-documentary about Western hypocrisy.", {
                    effects: {
                        treasury: -30,
                        anger: -5
                    }
                }),
                choice("Ignore it. Our people don't watch BBC.", {
                    effects: {}
                })
            ]
        }),

        event("western_pressure_resumes", {
            title: "The Pressure Returns",
            description: "After a brief thaw, Western pressure is back. New sanctions proposals. ICC investigations. Your oligarchs' children expelled from British schools. The message is clear: there will be no normalization without real change.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Prepare for long-term confrontation.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                }),
                choice("Make genuine concessions this time.", {
                    effects: {
                        elite: -15,
                        anger: -10
                    },
                    unlocks: [
                        eventRef("western_final_choice")
                    ]
                }),
                choice("Diversify away from the West entirely.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                })
            ]
        }),

        event("western_hybrid_war", {
            title: "The Shadow War",
            description: "Your intelligence services are busy. Election interference in three Western countries. Ransomware attacks on hospitals. Disinformation flooding social media. The West knows it's you. They can't prove it publicly—yet. Plausible deniability is wearing thin.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "hybrid_war_west"
            },

            meta: { depth: 5, impact: 5, sentiment: "negative" },

            choices: [
                choice("Escalate further. Asymmetry is our advantage.", {
                    effects: {
                        treasury: -50
                    },
                    legacy: {
                        icon: "🔥",
                        name: "The Arsonist",
                        weight: -15,
                        explanation: "You set the world on fire rather than lose."
                    }
                }),
                choice("Scale back. We've made our point.", {
                    effects: {
                        flags: { "ended_hybrid_war": true }
                    }
                }),
                choice("Deny everything. Blame criminal hackers.", {
                    effects: {}
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // BRANCH 2: THE EASTERN EMBRACE
        // ═══════════════════════════════════════════════════════════════
        //
        // Chinese partnership path led by Ambassador Zhang Wei
        // Theme: Unlimited credit, unlimited strings
        // Arc: Partnership → Debt → Dependency → Vassal or Break Free
        // ═══════════════════════════════════════════════════════════════

        // --- ALLY PATH EVENTS (when China is your choice) ---

        event("eastern_embrace_first_offer", {
            title: "The Belt and Road Invitation",
            description: "Ambassador Zhang invites you to join the Belt and Road Initiative. $60 billion in infrastructure investment. High-speed rail, ports, digital networks. No political conditions. 'We don't interfere in internal affairs,' he smiles. Li Mei hands you the contract—273 pages of dense Chinese legalese.",
            
            weight: 15,
            rarity: "rare",
            onceOnly: true,
            characterId: "ambassador_zhang",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 1, impact: 5, sentiment: "positive" },

            choices: [
                choice("Sign immediately. This is our future.", {
                    effects: {
                        treasury: 100,
                        elite: 10,
                        flags: { "belt_road_full": true }
                    },
                    legacy: {
                        icon: "🛤️",
                        name: "The Belt and Road Partner",
                        weight: -3,
                        explanation: "You signed onto China's grand project."
                    },
                    unlocks: [
                        eventRef("eastern_infrastructure_boom")
                    ]
                }),
                choice("Negotiate better terms first.", {
                    effects: {
                        treasury: 60,
                        elite: 5
                    },
                    unlocks: [
                        eventRef("eastern_tough_negotiations")
                    ]
                }),
                choice("Accept some projects, not all.", {
                    effects: {
                        treasury: 40
                    },
                    unlocks: [
                        eventRef("eastern_selective_partnership")
                    ]
                }),
                choice("We need time to review the contracts.", {
                    effects: {
                        elite: -3
                    },
                    unlocks: [
                        eventRef("eastern_patience_tested")
                    ]
                })
            ]
        }),

        event("eastern_infrastructure_boom", {
            title: "The Construction Sites",
            description: "Chinese workers are everywhere. New rail lines, ports, highways appearing across your country. Your people are impressed. But you notice: the workers are Chinese. The materials are Chinese. The managers are Chinese. Where is the technology transfer? Where are the local jobs?",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "belt_road_full"
            },

            meta: { depth: 2, impact: 4, sentiment: "neutral" },

            choices: [
                choice("This is fine. Speed matters.", {
                    effects: {
                        treasury: 50,
                        flags: { "eastern_dependency_deepens": true }
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Demand local hiring requirements.", {
                    effects: {
                        treasury: 30,
                        elite: -5
                    },
                    unlocks: [
                        eventRef("eastern_friction_begins")
                    ]
                }),
                choice("Renegotiate the contracts.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_tough_negotiations")
                    ]
                })
            ]
        }),

        event("eastern_tough_negotiations", {
            title: "The Difficult Partner",
            description: "Ambassador Zhang's smile becomes fixed. You want better terms? Technology transfer? Local hiring? Li Mei produces spreadsheets showing what you owe, what you've received, what the alternatives cost. 'Partners should be reasonable,' Zhang says. It doesn't sound like a suggestion.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "ambassador_zhang",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 2, impact: 4, sentiment: "negative" },

            choices: [
                choice("Back down. Accept original terms.", {
                    effects: {
                        treasury: 80,
                        elite: -8
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Stand firm. We have leverage too.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("eastern_relationship_cools")
                    ]
                }),
                choice("Split the difference. Pragmatic deal.", {
                    effects: {
                        treasury: 50
                    },
                    unlocks: [
                        eventRef("eastern_military_offer")
                    ]
                })
            ]
        }),

        event("eastern_selective_partnership", {
            title: "The Limited Engagement",
            description: "You've accepted some Chinese projects, rejected others. Ambassador Zhang is polite but cool. Li Mei's visits become less frequent. The grand infrastructure dreams are now modest upgrades. But you've kept more control—for now.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 2, impact: 3, sentiment: "neutral" },

            choices: [
                choice("Expand the partnership. We need more.", {
                    effects: {
                        treasury: 60
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Maintain current level. Balanced approach.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_military_offer")
                    ]
                }),
                choice("Reduce dependence. Diversify partners.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("third_way_opportunist_approach")
                    ]
                })
            ]
        }),

        event("eastern_patience_tested", {
            title: "The Waiting Game",
            description: "Beijing is patient—but not infinitely. Your delays reviewing contracts have been noted. Other countries are signing deals. The Belt and Road moves forward without you. Ambassador Zhang suggests 'time-limited offers.' Li Mei stops calling entirely.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 2, impact: 3, sentiment: "negative" },

            choices: [
                choice("Sign now. We've delayed enough.", {
                    effects: {
                        treasury: 80,
                        flags: { "belt_road_full": true }
                    },
                    unlocks: [
                        eventRef("eastern_infrastructure_boom")
                    ]
                }),
                choice("Propose modified terms.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_tough_negotiations")
                    ]
                }),
                choice("Let the offer expire. We'll find other partners.", {
                    effects: {
                        elite: 3
                    },
                    unlocks: [
                        eventRef("eastern_relationship_cools")
                    ]
                })
            ]
        }),

        event("eastern_military_offer", {
            title: "The Defense Package",
            description: "General Chen presents military cooperation: advanced fighters, S-400 air defense systems, joint exercises in the Pacific. Your generals are excited—this is equipment the West would never sell you. But the terms include 'basing rights' and 'intelligence sharing protocols.'",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "general_chen",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 3, impact: 5, sentiment: "neutral" },

            choices: [
                choice("Accept fully. We need modern weapons.", {
                    effects: {
                        elite: 15,
                        flags: { "chinese_military_base": true }
                    },
                    legacy: {
                        icon: "🏴",
                        name: "The Base Provider",
                        weight: -10,
                        explanation: "Chinese military operates on your soil."
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Weapons yes, bases no.", {
                    effects: {
                        elite: 8,
                        treasury: -30
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Decline. Military independence is non-negotiable.", {
                    effects: {
                        elite: -10
                    },
                    unlocks: [
                        eventRef("eastern_relationship_cools")
                    ]
                })
            ]
        }),

        event("eastern_friction_begins", {
            title: "The Local Pushback",
            description: "Your demands for local hiring are causing problems. Chinese contractors are threatening to leave. Projects are delayed. Li Mei presents a cost analysis: your conditions add 40% to every project. 'We only ask for efficiency,' she says. Translation: do it our way.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 3, impact: 3, sentiment: "negative" },

            choices: [
                choice("Compromise. Some local content, not all.", {
                    effects: {
                        treasury: 40
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Stand firm. Jobs matter more than speed.", {
                    effects: {
                        anger: -10,
                        treasury: -30
                    },
                    unlocks: [
                        eventRef("eastern_relationship_cools")
                    ]
                }),
                choice("Give in. Efficiency is everything.", {
                    effects: {
                        treasury: 60,
                        anger: 5
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                })
            ]
        }),

        event("eastern_debt_accumulates", {
            title: "The Repayment Schedule",
            description: "Li Mei requests a meeting. The infrastructure loans are coming due. $8 billion this year. Your treasury doesn't have it. She has suggestions: asset transfers, port concessions, mining rights. 'Just restructuring,' she says. The word 'restructuring' echoes in the room.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "li_mei",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 3, impact: 5, sentiment: "negative" },

            choices: [
                choice("Accept the restructuring. We have no choice.", {
                    effects: {
                        treasury: -50,
                        flags: { "chinese_asset_transfers": true }
                    },
                    unlocks: [
                        eventRef("eastern_debt_trap_springs")
                    ]
                }),
                choice("Demand better terms. We're partners.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_negotiations_tense")
                    ]
                }),
                choice("Default. Let them deal with it.", {
                    effects: {
                        elite: -15
                    },
                    unlocks: [
                        eventRef("eastern_relationship_crisis")
                    ]
                }),
                choice("Seek Western refinancing instead.", {
                    effects: {},
                    unlocks: [
                        eventRef("western_opportunist_approach")
                    ]
                })
            ]
        }),

        event("eastern_debt_trap_springs", {
            title: "The Port Concession",
            description: "To service the debt, you've signed over operating rights to your main Black Sea port. 99-year lease. Chinese companies now control your maritime trade. The opposition calls it 'selling the country.' Western media runs 'debt trap diplomacy' stories. They're not entirely wrong.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "chinese_asset_transfers"
            },

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("It's business. The country benefits.", {
                    effects: {
                        elite: -10,
                        anger: 15
                    },
                    unlocks: [
                        eventRef("eastern_junior_partner")
                    ]
                }),
                choice("Publicly justify it. Spin the narrative.", {
                    effects: {
                        treasury: -20,
                        anger: 5
                    },
                    unlocks: [
                        eventRef("eastern_surveillance_request")
                    ]
                }),
                choice("Quietly limit the damage going forward.", {
                    effects: {
                        flags: { "resisting_chinese_control": true }
                    },
                    unlocks: [
                        eventRef("eastern_escape_attempt")
                    ]
                })
            ]
        }),

        event("eastern_negotiations_tense", {
            title: "The Hard Bargaining",
            description: "You pushed back on debt restructuring. Ambassador Zhang is no longer smiling. Li Mei's spreadsheets now include 'penalty clauses' and 'acceleration provisions.' Chinese state media runs an editorial about 'ungrateful partners.' The temperature has dropped considerably.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Apologize. Accept worse terms.", {
                    effects: {
                        treasury: -80
                    },
                    unlocks: [
                        eventRef("eastern_junior_partner")
                    ]
                }),
                choice("Hold firm. Call their bluff.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("eastern_relationship_crisis")
                    ]
                }),
                choice("Propose creative solutions. Delay tactics.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_final_choice")
                    ]
                })
            ]
        }),

        event("eastern_relationship_crisis", {
            title: "The Freeze",
            description: "Beijing has had enough. New loans suspended. Existing projects 'under review.' Your commodities exports face 'quality inspections' that take weeks. Ambassador Zhang is recalled 'for consultations.' You're learning what it means to disappoint China.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("Grovel. Send a delegation to Beijing.", {
                    effects: {
                        elite: -15
                    },
                    unlocks: [
                        eventRef("eastern_junior_partner")
                    ]
                }),
                choice("Seek alternative partners urgently.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                }),
                choice("Endure. Ride out the pressure.", {
                    effects: {
                        treasury: -100
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                })
            ]
        }),

        event("eastern_relationship_cools", {
            title: "The Distant Dragon",
            description: "Relations with China have cooled. Ambassador Zhang is polite but distant. Li Mei's infrastructure offers are smaller, with less favorable terms. You're no longer the priority partner. Not an enemy—just... less interesting.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 3, impact: 3, sentiment: "neutral" },

            choices: [
                choice("Warm relations again. Make concessions.", {
                    effects: {
                        elite: -8
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Accept the new dynamic. Less money, more freedom.", {
                    effects: {},
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                }),
                choice("Pivot elsewhere.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                })
            ]
        }),

        event("eastern_surveillance_request", {
            title: "The Data Sharing Agreement",
            description: "Ambassador Zhang raises a 'technical matter': your Chinese-built telecommunications networks have certain... capabilities. Beijing would like access to the data. For 'security cooperation.' Your FSB chief looks alarmed—sharing intelligence with China was not in the plan.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            characterId: "ambassador_zhang",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("We are partners. Of course.", {
                    effects: {
                        elite: 5,
                        flags: { "chinese_surveillance_access": true }
                    },
                    unlocks: [
                        eventRef("eastern_junior_partner")
                    ]
                }),
                choice("Domestic data stays domestic.", {
                    effects: {
                        elite: -8
                    },
                    unlocks: [
                        eventRef("eastern_negotiations_tense")
                    ]
                }),
                choice("We didn't realize the networks had these capabilities.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_escape_attempt")
                    ]
                })
            ]
        }),

        event("eastern_junior_partner", {
            title: "The Beijing Summit",
            description: "You're invited to Beijing. State dinner, honor guard, the works. But you notice: you're seated below several African leaders. Your trade minister is ignored in negotiations. Photo ops show you as supplicant. You're not a partner—you're a client state.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Accept the reality. They're stronger.", {
                    effects: {
                        elite: -15,
                        flags: { "accepted_junior_status": true }
                    },
                    unlocks: [
                        eventRef("eastern_final_choice")
                    ]
                }),
                choice("Push back publicly. Demand respect.", {
                    effects: {
                        elite: 10
                    },
                    unlocks: [
                        eventRef("eastern_relationship_crisis")
                    ]
                }),
                choice("Quietly diversify away from China.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_escape_attempt")
                    ]
                })
            ]
        }),

        event("eastern_escape_attempt", {
            title: "The Pivot Back",
            description: "You've decided China has too much leverage. Time to balance. You're reaching out to the West, the Third Way countries, anyone. But Beijing notices. Li Mei's calls become colder. Trade inspectors find 'problems' with your exports. Belt and Road projects slow down. Are you trapped?",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 5, impact: 5, sentiment: "negative" },

            choices: [
                choice("Push through. Accept the pain.", {
                    effects: {
                        treasury: -80
                    },
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                }),
                choice("Retreat. Apologize. Stay in their orbit.", {
                    effects: {
                        elite: -20,
                        flags: { "chinese_vassal": true }
                    },
                    unlocks: [
                        eventRef("eastern_final_choice")
                    ]
                }),
                choice("Play for time. Neither commit nor break.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_final_choice")
                    ]
                })
            ]
        }),

        event("eastern_final_choice", {
            title: "The Eastern Question",
            description: "Years have passed. China has become your largest creditor, trading partner, weapons supplier. They've asked for something new: a formal mutual defense treaty. This would make the relationship permanent—and visible. Ambassador Zhang sits patiently, waiting for your answer.",
            
            weight: 8,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_ally"
            },

            meta: { depth: 5, impact: 5, sentiment: "neutral" },

            choices: [
                choice("Sign the treaty. Accept junior partnership.", {
                    effects: {
                        elite: -20,
                        treasury: 100
                    },
                    legacy: {
                        icon: "🐉",
                        name: "The Dragon's Servant",
                        weight: -10,
                        explanation: "You became a formal Chinese ally. History will judge."
                    }
                }),
                choice("Refuse. Accept the consequences.", {
                    effects: {
                        treasury: -100
                    },
                    legacy: {
                        icon: "🦅",
                        name: "The Escaped",
                        weight: 5,
                        explanation: "You broke free from Chinese orbit. It cost dearly."
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                }),
                choice("Stall indefinitely. Neither sign nor refuse.", {
                    effects: {},
                    legacy: {
                        icon: "⏳",
                        name: "The Delayer",
                        weight: -3,
                        explanation: "You kept Beijing waiting. They're still waiting."
                    }
                }),
                choice("Use treaty talks to extract concessions.", {
                    effects: {
                        treasury: 50
                    },
                    legacy: {
                        icon: "🎯",
                        name: "The Negotiator",
                        weight: 0,
                        explanation: "You turned a trap into leverage."
                    }
                })
            ]
        }),

        // --- ADVERSARY PATH EVENTS (when China is hostile) ---

        event("eastern_quiet_undermining", {
            title: "The Currency Attack",
            description: "You aligned with the West, and China noticed. Your currency is under pressure—unusual selling patterns that trace back to Chinese state banks. Deniable, but effective. Your Finance Minister is panicking. The ruble is falling faster than interest rates can rise.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_adversary"
            },

            meta: { depth: 2, impact: 4, sentiment: "negative" },

            choices: [
                choice("Weather the storm. Central bank intervention.", {
                    effects: {
                        treasury: -60
                    },
                    unlocks: [
                        eventRef("inflation_crisis_deepens"),
                        eventRef("eastern_neighbor_support")
                    ]
                }),
                choice("Reach out to Beijing. Negotiate.", {
                    effects: {
                        elite: -5
                    },
                    unlocks: [
                        eventRef("eastern_opportunist_approach"),
                        eventRef("eastern_neighbor_support")
                    ]
                }),
                choice("Expose them publicly. Name and shame.", {
                    effects: {
                        anger: -5
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning"),
                        eventRef("eastern_neighbor_support")
                    ]
                })
            ]
        }),

        event("eastern_neighbor_support", {
            title: "The Border Dispute",
            description: "China is suddenly very interested in your neighbors' territorial claims. Old disputes resurface. Border incidents increase. Your neighbors are getting new weapons, new rhetoric, new confidence. Beijing isn't threatening you directly—just making sure you feel surrounded.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_adversary"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Build up border forces. Show strength.", {
                    effects: {
                        treasury: -50,
                        elite: 10
                    }
                }),
                choice("Negotiate directly with neighbors. Cut Beijing out.", {
                    effects: {}
                }),
                choice("Seek Western security guarantees.", {
                    effects: {},
                    unlocks: [
                        eventRef("western_opportunist_approach")
                    ]
                })
            ]
        }),

        // --- OPPORTUNIST PATH EVENTS (when China is playing you) ---

        event("eastern_opportunist_approach", {
            title: "The Open Door",
            description: "China isn't your ally, but they're not hostile either. Ambassador Zhang maintains contact. Small deals continue. Li Mei offers 'friendship terms' on infrastructure. They're waiting—for you to fail, for you to need them, for the right moment. Patient as always.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "eastern_embrace_opportunist"
            },

            meta: { depth: 2, impact: 3, sentiment: "neutral" },

            choices: [
                choice("Accept their offers. Limited engagement.", {
                    effects: {
                        treasury: 40
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Keep them at arm's length.", {
                    effects: {}
                }),
                choice("Use them against the West for leverage.", {
                    effects: {
                        flags: { "playing_powers_off": true }
                    },
                    unlocks: [
                        eventRef("multi_vector_chaos")
                    ]
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // BRANCH 3: THE THIRD WAY
        // ═══════════════════════════════════════════════════════════════
        //
        // Non-aligned coalition path with Turkey, India, Gulf states
        // Theme: Can you build a new order, or is this just chaos?
        // Arc: Coalition → Cracks → Chaos → New Order or Isolation
        // ═══════════════════════════════════════════════════════════════

        // --- ALLY PATH EVENTS (when Third Way is your choice) ---

        event("third_way_first_offer", {
            title: "The Alternative Summit",
            description: "Mehmet Yilmaz invites you to a summit in Istanbul. Turkey, India, Saudi Arabia, UAE, Indonesia, South Africa—countries tired of choosing between Washington and Beijing. They're building parallel institutions. New development bank, alternative payment systems, defense cooperation. 'A new world order,' he says, without irony.",
            
            weight: 15,
            rarity: "rare",
            onceOnly: true,
            characterId: "mehmet_yilmaz",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 1, impact: 5, sentiment: "positive" },

            choices: [
                choice("Join enthusiastically. This is the future.", {
                    effects: {
                        elite: 8,
                        treasury: 40,
                        flags: { "third_way_founding_member": true }
                    },
                    legacy: {
                        icon: "🌍",
                        name: "The Coalition Builder",
                        weight: 0,
                        explanation: "You helped build an alternative to the great powers."
                    },
                    unlocks: [
                        eventRef("third_way_institution_building")
                    ]
                }),
                choice("Join cautiously. Observer status first.", {
                    effects: {
                        treasury: 20
                    },
                    unlocks: [
                        eventRef("third_way_testing_waters")
                    ]
                }),
                choice("Attend but don't commit. See who else joins.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_watching_waiting")
                    ]
                }),
                choice("Decline. This is a coalition of the marginal.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("western_opportunist_approach")
                    ]
                })
            ]
        }),

        event("third_way_institution_building", {
            title: "The New Bank",
            description: "The new development bank is being structured. Where to headquarter it? Everyone wants it. You propose your capital. It would mean prestige—and scrutiny. The Saudis have more money. The Indians have more people. Yilmaz has more enthusiasm.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_founding_member"
            },

            meta: { depth: 2, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Push hard for headquarters. Bribe if needed.", {
                    effects: {
                        treasury: -30,
                        flags: { "third_way_bank_host": true }
                    },
                    unlocks: [
                        eventRef("third_way_leadership_challenge")
                    ]
                }),
                choice("Accept a subsidiary role. Less exposure.", {
                    effects: {
                        treasury: 20
                    },
                    unlocks: [
                        eventRef("third_way_currency_deal")
                    ]
                }),
                choice("Focus on getting loans, not hosting.", {
                    effects: {
                        treasury: 40
                    },
                    unlocks: [
                        eventRef("third_way_currency_deal")
                    ]
                })
            ]
        }),

        event("third_way_testing_waters", {
            title: "The Observer Status",
            description: "You've joined as an observer. Less commitment, less influence. The full members make decisions without you. Yilmaz is encouraging—'join us fully when you're ready.' Prince Khalid is less patient—'observers don't get investments.'",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 2, impact: 3, sentiment: "neutral" },

            choices: [
                choice("Upgrade to full membership.", {
                    effects: {
                        flags: { "third_way_founding_member": true }
                    },
                    unlocks: [
                        eventRef("third_way_currency_deal")
                    ]
                }),
                choice("Stay as observer. Hedge our bets.", {
                    effects: {}
                }),
                choice("Withdraw. This isn't working.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_coalition_frays")
                    ]
                })
            ]
        }),

        event("third_way_watching_waiting", {
            title: "The Sidelines",
            description: "You attended without committing. The summit continues without you. Deals are signed. Partnerships formed. You're watching from the margins. Yilmaz shrugs—'the door is always open.' Prince Khalid has stopped calling.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 2, impact: 2, sentiment: "neutral" },

            choices: [
                choice("Join now. We've seen enough.", {
                    effects: {
                        flags: { "third_way_founding_member": true }
                    },
                    unlocks: [
                        eventRef("third_way_currency_deal")
                    ]
                }),
                choice("Continue watching. No rush.", {
                    effects: {},
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                }),
                choice("Pursue bilateral deals instead.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_saudi_strings")
                    ]
                })
            ]
        }),

        event("third_way_currency_deal", {
            title: "The Ruble-Rupee Swap",
            description: "India proposes bilateral currency swaps—trade in rupees and rubles, bypassing the dollar. It would reduce sanctions vulnerability. But it also means accepting Indian rupees, which aren't exactly stable either. Minister Sharma is optimistic. Your central banker is skeptical.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "priya_sharma",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 2, impact: 4, sentiment: "positive" },

            choices: [
                choice("Sign the swap. Dollar dependence is dangerous.", {
                    effects: {
                        treasury: 20,
                        flags: { "currency_diversification": true }
                    },
                    unlocks: [
                        eventRef("third_way_payment_systems")
                    ]
                }),
                choice("Wait for better partners. Rupee is risky.", {
                    effects: {
                        elite: -3
                    },
                    unlocks: [
                        eventRef("third_way_unreliable_partners")
                    ]
                }),
                choice("Propose multilateral basket. Spread the risk.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_competing_interests")
                    ]
                })
            ]
        }),

        event("third_way_payment_systems", {
            title: "The SWIFT Alternative",
            description: "The coalition is building an alternative to SWIFT. Transactions that can't be blocked by Washington. Your banks are excited. But the system is clunky, coverage is limited, and nobody trusts anyone else's currency. Progress is slow.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "currency_diversification"
            },

            meta: { depth: 3, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Invest heavily. Make it work.", {
                    effects: {
                        treasury: -40
                    },
                    unlocks: [
                        eventRef("third_way_sanctions_evasion")
                    ]
                }),
                choice("Limited participation. Hedge our bets.", {
                    effects: {
                        treasury: -15
                    },
                    unlocks: [
                        eventRef("third_way_competing_interests")
                    ]
                }),
                choice("Focus on bilateral workarounds instead.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_saudi_strings")
                    ]
                })
            ]
        }),

        event("third_way_leadership_challenge", {
            title: "The Chair Competition",
            description: "You pushed for the bank headquarters and won—barely. Now everyone wants something. India wants the next chairmanship. Saudi Arabia wants veto power on investments. Turkey wants preferential loan terms. Leadership means managing jealousy.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_bank_host"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Satisfy everyone. Dilute your own power.", {
                    effects: {
                        elite: -10
                    },
                    unlocks: [
                        eventRef("third_way_competing_interests")
                    ]
                }),
                choice("Hold firm. You won, they lost.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("third_way_coalition_frays")
                    ]
                }),
                choice("Cut side deals. Keep everyone happy separately.", {
                    effects: {
                        treasury: -30
                    },
                    unlocks: [
                        eventRef("third_way_saudi_strings")
                    ]
                })
            ]
        }),

        event("third_way_unreliable_partners", {
            title: "The Turkish Problem",
            description: "Mehmet Yilmaz's government is in crisis. Inflation at 80%. Currency collapsing. The partnership deals you signed are now worthless. Turkey can't deliver, can't pay, can't even show up to meetings. Some coalition.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "mehmet_yilmaz",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Stand by them. Partners stick together.", {
                    effects: {
                        treasury: -30,
                        flags: { "loyal_to_turkey": true }
                    },
                    unlocks: [
                        eventRef("third_way_competing_interests")
                    ]
                }),
                choice("Distance ourselves. They're a liability.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("third_way_coalition_frays")
                    ]
                }),
                choice("Opportunistically buy Turkish assets cheap.", {
                    effects: {
                        treasury: 40,
                        personalWealth: 10
                    },
                    unlocks: [
                        eventRef("third_way_saudi_strings")
                    ]
                })
            ]
        }),

        event("third_way_competing_interests", {
            title: "The Kashmir Question",
            description: "India and Pakistan both want you to take sides on Kashmir. The Saudis are neutral. The Turks support Pakistan. Indonesia abstains. Your 'coalition' is dissolving into bilateral squabbles. Nobody agrees on anything except opposing the West.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 3, impact: 3, sentiment: "negative" },

            choices: [
                choice("Stay neutral. Frustrate everyone equally.", {
                    effects: {
                        elite: -5
                    },
                    unlocks: [
                        eventRef("third_way_coalition_collapses")
                    ]
                }),
                choice("Side with India. They're more important.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_saudi_strings")
                    ]
                }),
                choice("Side with Pakistan. Arab money follows.", {
                    effects: {
                        treasury: 30
                    },
                    unlocks: [
                        eventRef("third_way_saudi_strings")
                    ]
                }),
                choice("Propose a new regional security framework.", {
                    effects: {
                        treasury: -20
                    },
                    unlocks: [
                        eventRef("third_way_final_choice")
                    ]
                })
            ]
        }),

        event("third_way_saudi_strings", {
            title: "The Prince's Price",
            description: "Prince Khalid is willing to invest $50 billion—but he wants something specific: your support against Iran, your silence on Yemen, your public alignment with Saudi positions. His money isn't as string-free as advertised. The gold comes with chains.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "prince_khalid",
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 3, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Accept. Their money, their rules.", {
                    effects: {
                        treasury: 50,
                        flags: { "saudi_aligned": true }
                    },
                    unlocks: [
                        eventRef("third_way_sanctions_evasion")
                    ]
                }),
                choice("Negotiate. Less money, fewer strings.", {
                    effects: {
                        treasury: 25
                    },
                    unlocks: [
                        eventRef("third_way_coalition_frays")
                    ]
                }),
                choice("Decline. We won't be bought.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("third_way_funding_crisis")
                    ]
                })
            ]
        }),

        event("third_way_sanctions_evasion", {
            title: "The Workarounds",
            description: "Your Third Way network is useful for one thing: evading Western sanctions. Ships reflagged in Turkey. Payments routed through UAE. Goods relabeled in India. It's working—sort of. But it's expensive, unreliable, and everyone takes a cut.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 4, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Expand the networks. Institutionalize evasion.", {
                    effects: {
                        treasury: -20,
                        flags: { "sanctions_evasion_network": true }
                    },
                    unlocks: [
                        eventRef("third_way_final_choice")
                    ]
                }),
                choice("This is too risky. Scale back.", {
                    effects: {},
                    unlocks: [
                        eventRef("inflation_crisis_deepens")
                    ]
                }),
                choice("Use this leverage to negotiate with the West.", {
                    effects: {},
                    unlocks: [
                        eventRef("western_opportunist_approach")
                    ]
                })
            ]
        }),

        event("third_way_funding_crisis", {
            title: "The Empty Treasury",
            description: "You refused the Saudi strings, but now you have a problem: the coalition offers moral support, not hard cash. Turkey is broke. India is careful. The development bank has no money to lend. Your own reserves are dwindling.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Reconsider the Saudi offer.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_saudi_strings")
                    ]
                }),
                choice("Seek emergency IMF funding.", {
                    effects: {},
                    unlocks: [
                        eventRef("western_opportunist_approach")
                    ]
                }),
                choice("Try China again.", {
                    effects: {},
                    unlocks: [
                        eventRef("eastern_opportunist_approach")
                    ]
                }),
                choice("Endure. Austerity and self-reliance.", {
                    effects: {
                        treasury: -60,
                        anger: 15
                    },
                    unlocks: [
                        eventRef("currency_collapse_moment")
                    ]
                })
            ]
        }),

        event("third_way_coalition_frays", {
            title: "The Cracks Widen",
            description: "The coalition is fracturing. Saudi Arabia and Turkey aren't speaking. India is making deals with the US. Indonesia has lost interest. Your grand alternative to the superpowers is looking more like a debating club.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Double down. Revive the spirit.", {
                    effects: {
                        treasury: -30
                    },
                    unlocks: [
                        eventRef("third_way_final_choice")
                    ]
                }),
                choice("Accept reality. Bilateral deals only.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_playing_all_sides")
                    ]
                }),
                choice("Return to the great powers.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                })
            ]
        }),

        event("third_way_coalition_collapses", {
            title: "The Empty Summit",
            description: "The Third Way Summit in Dubai. Half the leaders don't show up. Those who come are distracted, negotiating side deals, checking their phones. The 'new world order' looks a lot like the old chaos. Yilmaz gives a defiant speech. Nobody listens.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("Give up on multilateralism. Every country for itself.", {
                    effects: {},
                    unlocks: [
                        eventRef("third_way_playing_all_sides")
                    ]
                }),
                choice("Acknowledge failure. Return to great powers.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                }),
                choice("Try one more time. Smaller coalition, higher commitment.", {
                    effects: {
                        treasury: -40
                    },
                    unlocks: [
                        eventRef("third_way_final_choice")
                    ]
                })
            ]
        }),

        event("third_way_playing_all_sides", {
            title: "The Triple Cross",
            description: "You discover your 'partners' have been negotiating with your enemies. Turkey cut a deal with NATO. Saudi Arabia is talking to Beijing about bypassing you. India is cozying up to Washington. Everyone is hedging. Everyone except you.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Confront them. Demand loyalty.", {
                    effects: {
                        elite: 5
                    },
                    unlocks: [
                        eventRef("third_way_final_choice")
                    ]
                }),
                choice("Do the same. Play all sides yourself.", {
                    effects: {
                        flags: { "everybody_for_themselves": true }
                    },
                    unlocks: [
                        eventRef("multi_vector_chaos")
                    ]
                }),
                choice("Accept reality. There is no third way.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                })
            ]
        }),

        event("third_way_final_choice", {
            title: "The Independence Question",
            description: "Years of trying to build an alternative. Some successes, many failures. You're not dependent on the West or China—but you're not exactly independent either. Just... alone. The coalition exists on paper. Real power lies elsewhere. Was it worth it?",
            
            weight: 8,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_ally"
            },

            meta: { depth: 5, impact: 5, sentiment: "neutral" },

            choices: [
                choice("It was worth it. We answer to no one.", {
                    effects: {},
                    legacy: {
                        icon: "🌍",
                        name: "The Truly Non-Aligned",
                        weight: 5,
                        explanation: "You forged your own path, for better or worse."
                    }
                }),
                choice("Time to pick a side. This isolation is killing us.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                }),
                choice("Keep trying. The future is multipolar.", {
                    effects: {},
                    legacy: {
                        icon: "⭐",
                        name: "The Visionary",
                        weight: 0,
                        explanation: "You believed in a world that doesn't exist yet."
                    }
                }),
                choice("Admit failure. At least internally.", {
                    effects: {
                        elite: -10
                    },
                    legacy: {
                        icon: "💔",
                        name: "The Honest Failure",
                        weight: -3,
                        explanation: "You tried something new. It didn't work."
                    }
                })
            ]
        }),

        // --- OPPORTUNIST PATH EVENTS (when Third Way is playing you) ---

        event("third_way_opportunist_approach", {
            title: "The Fair-Weather Friends",
            description: "The Third Way countries are friendly when it's convenient. They'll trade, they'll talk, they'll attend summits. But when you need real support—sanctions relief, military aid, diplomatic cover—they're suddenly 'studying the situation.' Minister Sharma sends regrets.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "third_way_opportunist"
            },

            meta: { depth: 2, impact: 3, sentiment: "neutral" },

            choices: [
                choice("Accept what they offer. Something is better than nothing.", {
                    effects: {
                        treasury: 20
                    }
                }),
                choice("Push for real commitment.", {
                    effects: {
                        elite: -5
                    },
                    unlocks: [
                        eventRef("third_way_unreliable_partners")
                    ]
                }),
                choice("Focus on the great powers instead.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                })
            ]
        }),

        // --- MULTI-VECTOR EVENTS ---

        event("multi_vector_chaos", {
            title: "The Hall of Mirrors",
            description: "You're playing everyone—and everyone knows it. The West is suspicious. China is waiting to pounce. Your Third Way partners are making their own deals. Every meeting is a negotiation. Every handshake hides a dagger. You're not in control. You're just surrounded.",
            
            weight: 15,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "global_alignment"
            },

            meta: { depth: 2, impact: 5, sentiment: "negative" },

            choices: [
                choice("Continue the game. We're smarter than them.", {
                    effects: {
                        flags: { "continued_multi_vector": true }
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                }),
                choice("Pick a side. End the uncertainty.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                }),
                choice("Retreat to isolation. Trust nobody.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_isolation")
                    ]
                })
            ]
        }),

        event("western_opportunist_approach", {
            title: "The Back Door Opens",
            description: "Despite publicly condemning you, Western business interests are... curious. Through intermediaries, they offer deals. Lucrative ones. They don't care about democracy—they care about oil contracts. But if you accept, you're in their pocket.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "western_accord_opportunist"
            },

            meta: { depth: 3, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Accept the deals. Money is money.", {
                    effects: {
                        treasury: 60,
                        flags: { "western_business_deals": true }
                    }
                }),
                choice("Decline. We don't need their hypocrisy.", {
                    effects: {
                        elite: 5
                    }
                }),
                choice("Use this to play them off against China.", {
                    effects: {},
                    unlocks: [
                        eventRef("multi_vector_chaos")
                    ]
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // SHARED CRISIS EVENTS
        // ═══════════════════════════════════════════════════════════════
        //
        // Events that can occur regardless of path, representing the
        // domestic economic consequences of your geopolitical choices
        // ═══════════════════════════════════════════════════════════════

        event("inflation_crisis_deepens", {
            title: "The Bread Lines Form",
            description: "Whatever your geopolitical choice, the domestic economy is suffering. Inflation at 25%. Bread prices doubled. Currency down 40%. Your foreign policy isn't filling stomachs. People are getting angry. Babushkas with empty baskets. Mothers counting kopecks.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "global_stage_active"
            },

            meta: { depth: 3, impact: 5, sentiment: "negative" },

            choices: [
                choice("Emergency price controls. Soviet style.", {
                    effects: {
                        anger: -10,
                        treasury: -50
                    }
                }),
                choice("Blame foreign enemies. Any will do.", {
                    effects: {
                        anger: 5,
                        elite: 5
                    }
                }),
                choice("Emergency central bank measures. Conventional.", {
                    effects: {
                        treasury: -30
                    }
                }),
                choice("Do nothing. This will pass.", {
                    effects: {
                        anger: 15
                    },
                    unlocks: [
                        eventRef("currency_collapse_moment")
                    ]
                })
            ]
        }),

        event("currency_collapse_moment", {
            title: "Black Monday",
            description: "The ruble falls 20% in one day. Banks are closed. ATM lines snake around blocks. Your Finance Minister is ashen. This is the moment—every foreign relationship, every trade deal, every loan is being tested. The world is watching.",
            
            weight: 10,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['global-stage'],
            
            conditions: {
                flag: "global_stage_active"
            },

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("Emergency IMF call. Beg if necessary.", {
                    effects: {
                        elite: -15
                    },
                    unlocks: [
                        eventRef("western_back_channel")
                    ]
                }),
                choice("Chinese emergency line. Pay their price.", {
                    effects: {
                        elite: -10
                    },
                    unlocks: [
                        eventRef("eastern_debt_accumulates")
                    ]
                }),
                choice("Capital controls. Close the borders.", {
                    effects: {
                        anger: 20,
                        elite: -15
                    },
                    legacy: {
                        icon: "🧱",
                        name: "The Ruble Wall",
                        weight: 15,
                        explanation: "You locked the wealth inside. The world could only watch."
                    },
                    unlocks: [
                        eventRef("global_isolation")
                    ]
                }),
                choice("Ride it out. Project confidence.", {
                    effects: {
                        treasury: -80
                    },
                    unlocks: [
                        eventRef("foreign_creditors_call")
                    ]
                })
            ]
        }),

        event("foreign_creditors_call", {
            title: "The Bills Come Due",
            description: "All your foreign creditors want their money simultaneously. Western banks, Chinese development funds, Gulf investment vehicles. Everyone is calling. Your reserves won't cover it. The Finance Minister has stopped sleeping.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("Selective default. Pick who to stiff.", {
                    effects: {
                        elite: -15
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                }),
                choice("Emergency asset sales. Whatever it takes.", {
                    effects: {
                        treasury: -100,
                        personalWealth: 30
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                }),
                choice("Moratorium. Nobody gets paid until we stabilize.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_isolation")
                    ]
                }),
                choice("Negotiate restructuring. Buy time.", {
                    effects: {
                        treasury: -20
                    },
                    unlocks: [
                        eventRef("geopolitical_reckoning")
                    ]
                })
            ]
        }),

        event("geopolitical_reckoning", {
            title: "The Price of Independence",
            description: "Your choices have consequences. The world has changed around you. You must assess: was it worth it? Who are your real friends? What have you given up? The map on your wall shows allies, enemies, and the vast gray spaces in between.",
            
            weight: 8,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['global-stage'],

            // Narrative variations based on path
            narrativeVariations: [
                {
                    conditions: { flag: "western_accord_ally" },
                    description: "Years of pursuing Western integration. Some successes, many frustrations. They never fully accepted you. But they're still talking. The alternative was worse—or was it?"
                },
                {
                    conditions: { flag: "eastern_embrace_ally" },
                    description: "Years of Chinese partnership. Infrastructure everywhere—theirs. Debt everywhere—yours. They smile at summits. You know what that smile means now."
                },
                {
                    conditions: { flag: "third_way_ally" },
                    description: "Years of building an alternative. The coalition exists—on paper. Real power lies elsewhere. But you answer to no one. That's worth something. Maybe."
                }
            ],

            meta: { depth: 5, impact: 5, sentiment: "neutral" },

            choices: [
                choice("Stay the course. We've come too far to change.", {
                    effects: {},
                    legacy: {
                        icon: "🧭",
                        name: "The Committed",
                        weight: 0,
                        explanation: "You saw your geopolitical choice through to the end."
                    }
                }),
                choice("Reassess everything. Maybe we chose wrong.", {
                    effects: {
                        elite: -10
                    },
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                }),
                choice("Double down on independence. Trust nobody.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_isolation")
                    ]
                }),
                choice("It doesn't matter anymore. Just survive.", {
                    effects: {},
                    legacy: {
                        icon: "🌊",
                        name: "The Survivor",
                        weight: -3,
                        explanation: "In the end, you just held on."
                    }
                })
            ]
        }),

        event("global_isolation", {
            title: "The Hermit Kingdom",
            description: "All doors have closed. West hostile. East disappointed. Third Way scattered. You've achieved independence through isolation. The price is growing clear. Your economy shrinks. Your friends vanish. But at least you answer to no one. Small comfort in an empty room.",
            
            weight: 8,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 5, impact: 5, sentiment: "negative" },

            choices: [
                choice("Embrace it. Self-reliance is strength.", {
                    effects: {
                        treasury: -80,
                        anger: 20
                    },
                    legacy: {
                        icon: "🏰",
                        name: "The Sovereign",
                        weight: 20,
                        explanation: "You chose isolation over compromise. A kingdom of one."
                    }
                }),
                choice("Make one last attempt to break out.", {
                    effects: {},
                    unlocks: [
                        eventRef("global_rebalancing")
                    ]
                }),
                choice("This is the end of the road.", {
                    effects: {
                        elite: -20,
                        anger: 25
                    },
                    legacy: {
                        icon: "🌑",
                        name: "The Bunker King",
                        weight: 30,
                        explanation: "You ended alone, but you never surrendered."
                    }
                })
            ]
        }),

        event("global_rebalancing", {
            title: "The New Equilibrium",
            description: "After the chaos, you're reassessing. Old alliances have failed. New opportunities emerge. The world has changed—and so have you. Time to rebuild relationships, one deal at a time. Ambassador Morrison has been replaced. Ambassador Zhang is patient. The Third Way still waits.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            storylines: ['global-stage'],

            meta: { depth: 5, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Pivot West. Accept their terms this time.", {
                    effects: {
                        elite: -15,
                        treasury: 80
                    },
                    legacy: {
                        icon: "🔄",
                        name: "The Convert",
                        weight: 0,
                        explanation: "You changed course when the old path failed."
                    }
                }),
                choice("Pivot East. Accept their terms this time.", {
                    effects: {
                        elite: -10,
                        treasury: 60
                    },
                    legacy: {
                        icon: "🔄",
                        name: "The Pragmatist",
                        weight: -3,
                        explanation: "You went where the money was."
                    }
                }),
                choice("Try the Third Way again. New partners.", {
                    effects: {
                        treasury: 30
                    },
                    legacy: {
                        icon: "🌍",
                        name: "The Persistent",
                        weight: 0,
                        explanation: "You kept believing in alternatives."
                    }
                }),
                choice("Stay balanced. Trust nobody, use everybody.", {
                    effects: {},
                    legacy: {
                        icon: "⚖️",
                        name: "The Balancer",
                        weight: 0,
                        explanation: "You found equilibrium in chaos."
                    }
                })
            ]
        })
    ]
});
