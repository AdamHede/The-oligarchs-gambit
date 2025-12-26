/**
 * Economic Vision Storyline - v1.0
 *
 * A nested/convergent storyline where three economic paths diverge from
 * "The Five-Year Plan" and converge toward a shared "Economic Reckoning."
 *
 * Three Branches:
 * 1. Silicon Steppe - Digital modernization (Natasha Sergeyeva)
 * 2. Pipeline State - Energy dominance (Grigory Gazov)
 * 3. Fortress Economy - Autarky/self-sufficiency (Viktor Narodny)
 *
 * All paths converge to shared crisis events that play out differently
 * based on which path was chosen and what decisions were made.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "economic-vision",
    name: "The Economic Vision",
    description: "Three competing visions for the Federation's economic future, all leading to a reckoning",

    tree: [
        // ═══════════════════════════════════════════════════════════════
        // BRANCH 1: THE SILICON STEPPE
        // ═══════════════════════════════════════════════════════════════
        //
        // Digital modernization path led by Natasha Sergeyeva
        // Theme: Can you modernize an autocracy without losing control?
        // Arc: Hope → Compromise → Corruption
        // ═══════════════════════════════════════════════════════════════

        // --- ACT 1: THE PROMISE (Depth 1-2) ---

        event("silicon_tech_hub", {
            title: "The Special Economic Zone",
            description: "Natasha Sergeyeva presents the plan: a gleaming tech campus outside the capital. Tax breaks, fiber optic infrastructure, imported coffee machines. 'We'll attract the world's best engineers,' she says. 'Or at least stop ours from leaving.' The Finance Minister calculates costs on a napkin.",
            
            weight: 15,
            rarity: "rare",
            onceOnly: true,
            characterId: "natasha_sergeyeva",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 1, impact: 4, sentiment: "positive" },

            choices: [
                choice("Full funding. Make it the envy of the world.", {
                    effects: {
                        treasury: -80,
                        elite: 5,
                        flags: { "tech_hub_lavish": true }
                    },
                    legacy: {
                        icon: "🏗️",
                        name: "The Dreamer",
                        weight: -3,
                        explanation: "You built a tech paradise with taxpayer money."
                    },
                    unlocks: [
                        eventRef("silicon_talent_recruitment")
                    ]
                }),
                choice("Modest start. Prove the concept first.", {
                    effects: {
                        treasury: -30,
                        elite: 3
                    },
                    unlocks: [
                        eventRef("silicon_talent_recruitment")
                    ]
                }),
                choice("Partner with foreign companies. Share the cost.", {
                    effects: {
                        treasury: -20,
                        elite: -3,
                        flags: { "foreign_tech_partners": true }
                    },
                    unlocks: [
                        eventRef("silicon_talent_recruitment"),
                        eventRef("silicon_foreign_investment")
                    ]
                }),
                choice("Pair it with security monitoring infrastructure.", {
                    effects: {
                        treasury: -50,
                        elite: 8,
                        flags: { "tech_surveillance_built_in": true }
                    },
                    unlocks: [
                        eventRef("silicon_talent_recruitment"),
                        eventRef("silicon_surveillance_deal")
                    ]
                })
            ]
        }),

        event("silicon_talent_recruitment", {
            title: "The Talent War",
            description: "To build Silicon Steppe, you need engineers. They're all in California, Berlin, or London. Natasha proposes aggressive recruitment: salaries, apartments, and promises they won't be drafted. The oligarchs are offended by the salary numbers.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            characterId: "natasha_sergeyeva",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 2, impact: 3, sentiment: "neutral" },

            choices: [
                choice("Pay whatever it takes. Knowledge is priceless.", {
                    effects: {
                        treasury: -40,
                        elite: -8,
                        flags: { "tech_salaries_high": true }
                    },
                    unlocks: [
                        eventRef("silicon_first_success")
                    ]
                }),
                choice("Make them offers with... additional incentives.", {
                    effects: {
                        personalWealth: -5,
                        elite: 3,
                        flags: { "tech_kompromat_recruitment": true }
                    },
                    unlocks: [
                        eventRef("silicon_first_success")
                    ]
                }),
                choice("Focus on returning expats. Appeal to patriotism.", {
                    effects: {
                        treasury: -15,
                        anger: -5
                    },
                    unlocks: [
                        eventRef("silicon_first_success")
                    ]
                }),
                choice("Build training programs domestically. Slower but ours.", {
                    effects: {
                        treasury: -25,
                        flags: { "domestic_tech_training": true }
                    },
                    unlocks: [
                        eventRef("silicon_first_success")
                    ]
                })
            ]
        }),

        event("silicon_first_success", {
            title: "The App Store Hit",
            description: "A startup from Silicon Steppe creates a messaging app that goes viral. 50 million downloads in three months. Western media runs profiles of 'The Russian Zuckerberg.' Natasha is vindicated. The FSB wants access to the user data.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "natasha_sergeyeva",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 2, impact: 4, sentiment: "positive" },

            choices: [
                choice("Congratulations. Now give us backdoor access.", {
                    effects: {
                        elite: 5,
                        flags: { "tech_backdoor_required": true }
                    },
                    unlocks: [
                        eventRef("silicon_brain_drain")
                    ]
                }),
                choice("Let them operate freely. Success needs freedom.", {
                    effects: {
                        anger: -5,
                        elite: -5,
                        flags: { "tech_freedom_allowed": true }
                    },
                    unlocks: [
                        eventRef("silicon_tech_oligarch_rise")
                    ]
                }),
                choice("Take a government stake in the company. 'Investment.'", {
                    effects: {
                        treasury: -20,
                        personalWealth: 10
                    },
                    unlocks: [
                        eventRef("silicon_brain_drain")
                    ]
                }),
                choice("Encourage them to relocate abroad. Better optics.", {
                    effects: {
                        elite: -5,
                        flags: { "encouraged_tech_exodus": true }
                    }
                })
            ]
        }),

        // --- ACT 2: THE COMPROMISE (Depth 2-3) ---

        event("silicon_brain_drain", {
            title: "The Departure Lounge",
            description: "Despite the investment, engineers are still leaving. Exit interviews reveal the problem: it's not the money. It's the 'other things.' The surveillance. The uncertainty. The military conscription notices. Natasha looks tired.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "natasha_sergeyeva",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 3, impact: 3, sentiment: "negative" },

            choices: [
                choice("Restrict exit visas for tech workers.", {
                    effects: {
                        anger: 10,
                        elite: 5,
                        flags: { "tech_exit_restricted": true }
                    },
                    unlocks: [
                        eventRef("silicon_surveillance_deal")
                    ]
                }),
                choice("Double the incentives. Golden handcuffs.", {
                    effects: {
                        treasury: -60,
                        flags: { "tech_golden_handcuffs": true }
                    },
                    unlocks: [
                        eventRef("silicon_surveillance_deal")
                    ]
                }),
                choice("Create 'strategic importance' exemptions from conscription.", {
                    effects: {
                        elite: -10,
                        anger: -5
                    },
                    unlocks: [
                        eventRef("silicon_tech_oligarch_rise")
                    ]
                }),
                choice("Let them go. We'll train replacements.", {
                    effects: {
                        flags: { "accepted_brain_drain": true }
                    },
                    unlocks: [
                        eventRef("silicon_surveillance_deal")
                    ]
                })
            ]
        }),

        event("silicon_surveillance_deal", {
            title: "The Dual-Use Dilemma",
            description: "The FSB presents a proposal: they want Silicon Steppe companies to develop surveillance technology for export. Facial recognition, social media monitoring, the works. 'Democratic countries won't do this,' the Director says. 'We can corner the market.'",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 3, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Approve it. Technology is neutral.", {
                    effects: {
                        treasury: 100,
                        elite: 8,
                        flags: { "surveillance_tech_exports": true }
                    },
                    legacy: {
                        icon: "👁️",
                        name: "The Exporter",
                        weight: -10,
                        explanation: "You sold surveillance tools to the world's dictators."
                    },
                    unlocks: [
                        eventRef("silicon_hack_blowback")
                    ]
                }),
                choice("Only for domestic use. We're not arms dealers.", {
                    effects: {
                        elite: 5,
                        flags: { "domestic_surveillance_only": true }
                    },
                    unlocks: [
                        eventRef("silicon_tech_oligarch_rise")
                    ]
                }),
                choice("Reject it. This will destroy our international reputation.", {
                    effects: {
                        elite: -12
                    },
                    unlocks: [
                        eventRef("silicon_foreign_investment")
                    ]
                }),
                choice("Let Natasha decide. It's her project.", {
                    effects: {
                        elite: -5,
                        flags: { "natasha_surveillance_choice": true }
                    },
                    unlocks: [
                        eventRef("silicon_natasha_disillusion")
                    ]
                })
            ]
        }),

        event("silicon_tech_oligarch_rise", {
            title: "The New Money",
            description: "Alexei Petrov, founder of that messaging app, is now worth $8 billion. He's buying football teams and funding opposition podcasts. He says things like 'innovation' and 'disruption.' The old oligarchs are threatened. So are you.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "alexei_petrov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Invite him to the dacha. Make sure he understands the rules.", {
                    effects: {
                        elite: 5,
                        relationships: { alexei_petrov: -10 }
                    },
                    unlocks: [
                        eventRef("silicon_foreign_investment")
                    ]
                }),
                choice("Leave him alone. New money, new rules.", {
                    effects: {
                        elite: -15,
                        flags: { "tech_oligarch_independent": true }
                    },
                    unlocks: [
                        eventRef("silicon_hack_blowback")
                    ]
                }),
                choice("Tax investigation. Remind him who built the roads.", {
                    effects: {
                        treasury: 30,
                        elite: 5,
                        relationships: { alexei_petrov: -30 }
                    },
                    unlocks: [
                        eventRef("silicon_natasha_disillusion")
                    ]
                }),
                choice("Encourage him to enter politics. Co-opt, don't confront.", {
                    effects: {
                        flags: { "tech_oligarch_political": true }
                    },
                    unlocks: [
                        eventRef("silicon_foreign_investment")
                    ]
                })
            ]
        }),

        // --- ACT 3: THE CORRUPTION (Depth 3-4) ---

        event("silicon_foreign_investment", {
            title: "The Strings Attached",
            description: "Western venture capital is interested in Silicon Steppe. Billions available. But they want things: rule of law, independent courts, press freedom. 'Standard investor protections,' they say. The FSB Director calls it 'Western interference.'",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 4, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Accept the investment. Fake the reforms.", {
                    effects: {
                        treasury: 150,
                        flags: { "fake_tech_reforms": true }
                    },
                    unlocks: [
                        eventRef("silicon_hack_blowback")
                    ]
                }),
                choice("Accept with genuine reforms. Limited, but real.", {
                    effects: {
                        treasury: 100,
                        elite: -15,
                        anger: -8
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Reject Western money. Pivot to Chinese investment.", {
                    effects: {
                        treasury: 80,
                        flags: { "chinese_tech_investment": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Tell them the money is welcome, the conditions are not.", {
                    effects: {
                        treasury: 50
                    },
                    unlocks: [
                        eventRef("silicon_natasha_disillusion")
                    ]
                })
            ]
        }),

        event("silicon_hack_blowback", {
            title: "The Attribution",
            description: "Silicon Steppe has been quietly doing state hacking operations. Very quietly. Until a Western cybersecurity firm publishes a detailed attribution report naming your tech companies. Screenshots. Code samples. Everything.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Complete denial. They fabricated the evidence.", {
                    effects: {
                        flags: { "denied_hacking": true }
                    },
                    unlocks: [
                        eventRef("silicon_natasha_disillusion")
                    ]
                }),
                choice("Blame rogue elements. Fire some people publicly.", {
                    effects: {
                        elite: -5,
                        treasury: -20
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Admit nothing, retaliate with sanctions on their tech.", {
                    effects: {
                        treasury: -50
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Shut down the operations. This was a mistake.", {
                    effects: {
                        elite: -15,
                        flags: { "ended_cyber_ops": true }
                    },
                    unlocks: [
                        eventRef("silicon_natasha_disillusion")
                    ]
                })
            ]
        }),

        event("silicon_natasha_disillusion", {
            title: "The Resignation Letter",
            description: "Natasha Sergeyeva's resignation letter leaks. It's devastating: compromise after compromise, surveillance built into everything, innovation strangled by paranoia. 'I came to build the future,' she writes. 'I helped build a prettier prison.'",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            characterId: "natasha_sergeyeva",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "silicon_steppe_active"
            },

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("Let her go. Replace her with someone more... aligned.", {
                    effects: {
                        elite: 5,
                        flags: { "natasha_departed": true },
                        characterStates: { natasha_sergeyeva: "resigned" }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Arrest her before she talks more.", {
                    effects: {
                        elite: -10,
                        anger: 10,
                        flags: { "natasha_arrested": true },
                        characterStates: { natasha_sergeyeva: "arrested" }
                    },
                    legacy: {
                        icon: "🔒",
                        name: "The Silencer",
                        weight: -8,
                        explanation: "You arrested your own reformer. The message was clear."
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Convince her to stay. Give her real authority.", {
                    effects: {
                        elite: -8,
                        flags: { "natasha_empowered": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("The letter is fabricated. Western intelligence operation.", {
                    effects: {
                        elite: 3,
                        anger: 5,
                        flags: { "denied_natasha_letter": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // BRANCH 2: THE PIPELINE STATE
        // ═══════════════════════════════════════════════════════════════
        //
        // Energy dominance path led by Grigory Gazov
        // Theme: Resource curse and the weaponization of energy
        // Arc: Power → Pressure → Decline
        // ═══════════════════════════════════════════════════════════════

        // --- ACT 1: THE EMPIRE (Depth 1-2) ---

        event("pipeline_new_route", {
            title: "The Northern Route",
            description: "Grigory Gazov presents the crown jewel: a new pipeline bypassing troublesome transit countries. $45 billion. Ten years to complete. 'We'll supply Europe directly,' he says. 'They'll depend on us completely.' The Finance Minister looks pale.",
            
            weight: 15,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 1, impact: 5, sentiment: "positive" },

            choices: [
                choice("Approve it. Energy is power.", {
                    effects: {
                        treasury: -150,
                        elite: 15,
                        flags: { "northern_pipeline_approved": true }
                    },
                    legacy: {
                        icon: "🔧",
                        name: "The Pipeline Tsar",
                        weight: -5,
                        explanation: "You bet billions on a tube under the ocean."
                    },
                    unlocks: [
                        eventRef("pipeline_european_leverage")
                    ]
                }),
                choice("Too expensive. Scale it down.", {
                    effects: {
                        treasury: -80,
                        elite: 5
                    },
                    unlocks: [
                        eventRef("pipeline_european_leverage")
                    ]
                }),
                choice("Only if European partners co-invest.", {
                    effects: {
                        treasury: -60,
                        flags: { "european_pipeline_partners": true }
                    },
                    unlocks: [
                        eventRef("pipeline_price_war")
                    ]
                }),
                choice("Delay until oil prices stabilize.", {
                    effects: {
                        elite: -5
                    },
                    unlocks: [
                        eventRef("pipeline_price_war")
                    ]
                })
            ]
        }),

        event("pipeline_european_leverage", {
            title: "The Cold Winter",
            description: "It's February. Gas reserves in Europe are low. Gazov suggests a 'maintenance shutdown' of existing pipelines. Prices would triple. European politicians would panic. 'Just leverage,' he shrugs. 'This is how the game is played.'",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 2, impact: 5, sentiment: "neutral" },

            choices: [
                choice("Do it. Let them freeze a little.", {
                    effects: {
                        treasury: 200,
                        elite: 10,
                        flags: { "weaponized_gas": true }
                    },
                    legacy: {
                        icon: "❄️",
                        name: "The Gas Warrior",
                        weight: -10,
                        explanation: "You used winter as a weapon."
                    },
                    unlocks: [
                        eventRef("pipeline_sanctions_bite")
                    ]
                }),
                choice("Too aggressive. Reduce flows modestly.", {
                    effects: {
                        treasury: 80
                    },
                    unlocks: [
                        eventRef("pipeline_price_war")
                    ]
                }),
                choice("No. This will bring sanctions.", {
                    effects: {
                        elite: -10
                    },
                    unlocks: [
                        eventRef("pipeline_price_war")
                    ]
                }),
                choice("Threaten it publicly. Don't actually do it.", {
                    effects: {
                        treasury: 40,
                        flags: { "gas_bluff": true }
                    },
                    unlocks: [
                        eventRef("pipeline_price_war")
                    ]
                })
            ]
        }),

        event("pipeline_price_war", {
            title: "The OPEC Confrontation",
            description: "The Saudis are flooding the market. Oil prices are crashing. Your budget depends on $70 barrels. They're at $40 and falling. Gazov wants to increase production to maintain revenue. The Finance Minister says that's insane.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 2, impact: 4, sentiment: "negative" },

            choices: [
                choice("Match their production. We can outlast them.", {
                    effects: {
                        treasury: -80,
                        flags: { "oil_price_war": true }
                    },
                    unlocks: [
                        eventRef("pipeline_sanctions_bite")
                    ]
                }),
                choice("Negotiate production cuts with OPEC.", {
                    effects: {
                        elite: -5
                    },
                    unlocks: [
                        eventRef("pipeline_environmental_disaster")
                    ]
                }),
                choice("Diversify revenue. Emergency tax increases.", {
                    effects: {
                        treasury: 40,
                        anger: 15
                    },
                    unlocks: [
                        eventRef("pipeline_environmental_disaster")
                    ]
                }),
                choice("Raid the sovereign wealth fund. This will pass.", {
                    effects: {
                        treasury: 100,
                        flags: { "raided_wealth_fund": true }
                    },
                    unlocks: [
                        eventRef("pipeline_asian_pivot")
                    ]
                })
            ]
        }),

        // --- ACT 2: THE PRESSURE (Depth 2-3) ---

        event("pipeline_sanctions_bite", {
            title: "The Technology Ban",
            description: "Western sanctions hit the oil sector. No more imported drilling technology. No more deep-water expertise. No more Arctic exploration equipment. Gazov is furious. 'We can build our own,' he insists. You're not sure he's right.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Steal the technology. Industrial espionage.", {
                    effects: {
                        treasury: -30,
                        flags: { "oil_tech_espionage": true }
                    },
                    unlocks: [
                        eventRef("pipeline_environmental_disaster")
                    ]
                }),
                choice("Partner with China for equipment.", {
                    effects: {
                        treasury: -50,
                        flags: { "chinese_oil_partnership": true }
                    },
                    unlocks: [
                        eventRef("pipeline_asian_pivot")
                    ]
                }),
                choice("Invest in domestic alternatives. It will take years.", {
                    effects: {
                        treasury: -80,
                        flags: { "domestic_oil_tech": true }
                    },
                    unlocks: [
                        eventRef("pipeline_green_transition")
                    ]
                }),
                choice("Abandon the advanced projects. Stick to easy oil.", {
                    effects: {
                        elite: -15,
                        treasury: 30
                    },
                    unlocks: [
                        eventRef("pipeline_green_transition")
                    ]
                })
            ]
        }),

        event("pipeline_environmental_disaster", {
            title: "The Black Sea Spill",
            description: "A pipeline ruptures. Thousands of tons of crude in the Black Sea. Resort beaches covered in tar. International media arrives. Environmental groups are screaming. Gazov calls it 'a minor incident.'",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Massive cleanup. Spare no expense.", {
                    effects: {
                        treasury: -100,
                        anger: -10
                    },
                    unlocks: [
                        eventRef("pipeline_asian_pivot")
                    ]
                }),
                choice("Standard response. These things happen.", {
                    effects: {
                        treasury: -30,
                        anger: 15
                    },
                    unlocks: [
                        eventRef("pipeline_green_transition")
                    ]
                }),
                choice("Blame sabotage. Western terrorists.", {
                    effects: {
                        flags: { "spill_blamed_on_west": true }
                    },
                    unlocks: [
                        eventRef("pipeline_asian_pivot")
                    ]
                }),
                choice("Cover it up. Control the media, restrict access.", {
                    effects: {
                        treasury: -20,
                        anger: 8,
                        flags: { "covered_up_spill": true }
                    },
                    unlocks: [
                        eventRef("pipeline_green_transition")
                    ]
                })
            ]
        }),

        event("pipeline_asian_pivot", {
            title: "The Eastern Alternative",
            description: "Europe is reducing gas imports. The green transition is real. Gazov proposes a massive pivot: new pipelines to China. They'll buy everything Europe won't. 'We just need to accept their price,' he admits quietly.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 3, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Build the eastern pipelines. China is the future.", {
                    effects: {
                        treasury: -120,
                        flags: { "china_gas_pivot": true }
                    },
                    unlocks: [
                        eventRef("pipeline_stranded_assets")
                    ]
                }),
                choice("Negotiate hard. We're not desperate.", {
                    effects: {
                        treasury: -80,
                        flags: { "china_negotiations_tough": true }
                    },
                    unlocks: [
                        eventRef("pipeline_green_transition")
                    ]
                }),
                choice("Diversify to both. Don't depend on anyone.", {
                    effects: {
                        treasury: -180
                    },
                    unlocks: [
                        eventRef("pipeline_green_transition")
                    ]
                }),
                choice("Reduce production. Wait for Europe to come back.", {
                    effects: {
                        elite: -20,
                        flags: { "gas_production_cut": true }
                    },
                    unlocks: [
                        eventRef("pipeline_stranded_assets")
                    ]
                })
            ]
        }),

        // --- ACT 3: THE DECLINE (Depth 3-4) ---

        event("pipeline_green_transition", {
            title: "The World Moves On",
            description: "Germany announces its last coal plant closure. The EU sets 2040 carbon neutrality. Electric vehicle sales are exploding. Gazov's confident projections from five years ago look like fantasy. The pipeline you built might be a stranded asset.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("They're bluffing. Fossil fuels will return.", {
                    effects: {
                        flags: { "denied_green_transition": true }
                    },
                    unlocks: [
                        eventRef("pipeline_gazov_desperation")
                    ]
                }),
                choice("Invest in Federation solar and wind. Pivot.", {
                    effects: {
                        treasury: -100,
                        flags: { "renewable_pivot": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Sell everything now while it still has value.", {
                    effects: {
                        personalWealth: 50,
                        treasury: 200,
                        elite: -20
                    },
                    legacy: {
                        icon: "💸",
                        name: "The Liquidator",
                        weight: -8,
                        explanation: "You sold the Federation's future before it collapsed."
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Blame the West for 'green colonialism.'", {
                    effects: {
                        anger: -5,
                        flags: { "anti_green_propaganda": true }
                    },
                    unlocks: [
                        eventRef("pipeline_gazov_desperation")
                    ]
                })
            ]
        }),

        event("pipeline_gazov_desperation", {
            title: "The Old Man's Gamble",
            description: "Gazov proposes something dangerous: secretly funding environmental protests in Europe to slow their transition. NGOs, politicians, the works. 'We've done this before,' he says. 'Information operations. Nobody will know.'",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Do it. Buy us time.", {
                    effects: {
                        treasury: -40,
                        flags: { "funded_anti_green_ops": true }
                    },
                    unlocks: [
                        eventRef("pipeline_stranded_assets")
                    ]
                }),
                choice("Too risky. If exposed, it's catastrophic.", {
                    effects: {
                        elite: -5
                    },
                    unlocks: [
                        eventRef("pipeline_stranded_assets")
                    ]
                }),
                choice("Let's focus on our own economy, not theirs.", {
                    effects: {},
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("You've lost perspective, Grigory. You're done.", {
                    effects: {
                        elite: -15,
                        flags: { "gazov_fired": true },
                        characterStates: { grigory_gazov: "dismissed" }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                })
            ]
        }),

        event("pipeline_stranded_assets", {
            title: "The $45 Billion Question",
            description: "The northern pipeline is complete. It cost more than projected. And now... Europe doesn't want the gas. The pipeline runs at 20% capacity. Bond payments are due. Gazov has no answers.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            characterId: "grigory_gazov",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "pipeline_state_active"
            },

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("Force European purchases. Threaten something.", {
                    effects: {
                        flags: { "gas_threats_escalate": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Sell capacity to China at a loss.", {
                    effects: {
                        treasury: -80
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Default on the pipeline bonds. Let investors suffer.", {
                    effects: {
                        elite: -25,
                        flags: { "pipeline_default": true }
                    },
                    legacy: {
                        icon: "📉",
                        name: "The Defaulter",
                        weight: -15,
                        explanation: "You bankrupted the nation's flagship project."
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Nationalize the losses. Taxpayers pay.", {
                    effects: {
                        treasury: -200,
                        anger: 20
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // BRANCH 3: THE FORTRESS ECONOMY
        // ═══════════════════════════════════════════════════════════════
        //
        // Autarky path led by Viktor Narodny
        // Theme: Can you wall off from globalization?
        // Arc: Ideology → Shortage → Reality
        // ═══════════════════════════════════════════════════════════════

        // --- ACT 1: THE DECREE (Depth 1-2) ---

        event("fortress_import_ban", {
            title: "The Self-Sufficiency Decree",
            description: "Viktor Narodny presents the vision: ban Western imports, build domestic alternatives, achieve true independence. 'We did this before,' he says, gesturing at Soviet-era industrial photos. 'We can do it again.' The oligarchs look nauseated.",
            
            weight: 15,
            rarity: "rare",
            onceOnly: true,
            characterId: "viktor_narodny",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 1, impact: 5, sentiment: "neutral" },

            choices: [
                choice("Full ban. Immediate implementation.", {
                    effects: {
                        treasury: -30,
                        elite: -20,
                        anger: -10,
                        flags: { "full_import_ban": true }
                    },
                    legacy: {
                        icon: "🚫",
                        name: "The Isolator",
                        weight: -8,
                        explanation: "You cut the Federation off from the world economy."
                    },
                    unlocks: [
                        eventRef("fortress_factory_campaign")
                    ]
                }),
                choice("Gradual phase-out. Five-year transition.", {
                    effects: {
                        treasury: -15,
                        elite: -10,
                        flags: { "gradual_import_ban": true }
                    },
                    unlocks: [
                        eventRef("fortress_factory_campaign")
                    ]
                }),
                choice("Strategic sectors only. Medicine and tech exempt.", {
                    effects: {
                        treasury: -10,
                        elite: -5,
                        flags: { "strategic_import_ban": true }
                    },
                    unlocks: [
                        eventRef("fortress_cheese_problem")
                    ]
                }),
                choice("Announce it loudly, enforce it loosely.", {
                    effects: {
                        flags: { "import_ban_theater": true }
                    },
                    unlocks: [
                        eventRef("fortress_cheese_problem")
                    ]
                })
            ]
        }),

        event("fortress_factory_campaign", {
            title: "The Industrial Revival",
            description: "To replace imports, you need factories. Viktor wants a massive state investment: tractors, appliances, electronics. 'Quality will come later,' he says. 'First, we need volume.' The Central Banker calculates the cost at $200 billion over ten years.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            characterId: "viktor_narodny",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 2, impact: 4, sentiment: "neutral" },

            choices: [
                choice("Build them. National pride is worth any cost.", {
                    effects: {
                        treasury: -100,
                        anger: -5,
                        flags: { "factory_campaign_launched": true }
                    },
                    unlocks: [
                        eventRef("fortress_cheese_problem")
                    ]
                }),
                choice("Focus on essentials. Food and medicine production.", {
                    effects: {
                        treasury: -50
                    },
                    unlocks: [
                        eventRef("fortress_medicine_crisis")
                    ]
                }),
                choice("Private sector can do this. Offer incentives.", {
                    effects: {
                        treasury: -30,
                        elite: 5
                    },
                    unlocks: [
                        eventRef("fortress_cheese_problem")
                    ]
                }),
                choice("Import Chinese factories. Faster that way.", {
                    effects: {
                        treasury: -60,
                        flags: { "chinese_factory_imports": true }
                    },
                    unlocks: [
                        eventRef("fortress_quality_collapse")
                    ]
                })
            ]
        }),

        event("fortress_cheese_problem", {
            title: "The Parmesan Crisis",
            description: "It's been six months since the import ban. The new Federation cheese factories are... operational. The cheese is... edible. Technically. The elite are furious. French restaurants in Moscow are serving 'Motherland Camembert.' Nobody is fooled.",
            
            weight: 12,
            rarity: "rare",
            onceOnly: true,
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 2, impact: 3, sentiment: "negative" },

            choices: [
                choice("This is the price of independence. They'll adapt.", {
                    effects: {
                        elite: -15
                    },
                    unlocks: [
                        eventRef("fortress_medicine_crisis")
                    ]
                }),
                choice("Allow 'cultural exceptions' for luxury goods.", {
                    effects: {
                        elite: 8,
                        anger: 5,
                        flags: { "luxury_exceptions": true }
                    },
                    unlocks: [
                        eventRef("fortress_black_market")
                    ]
                }),
                choice("Import cheese through Belarus. Quietly.", {
                    effects: {
                        treasury: -10,
                        flags: { "belarus_cheese_route": true }
                    },
                    unlocks: [
                        eventRef("fortress_black_market")
                    ]
                }),
                choice("Launch propaganda campaign. 'Our cheese is patriotic.'", {
                    effects: {
                        treasury: -20,
                        anger: -3
                    },
                    unlocks: [
                        eventRef("fortress_medicine_crisis")
                    ]
                })
            ]
        }),

        // --- ACT 2: THE SHORTAGE (Depth 2-3) ---

        event("fortress_medicine_crisis", {
            title: "The Pharmacy Lines",
            description: "The import ban included pharmaceutical ingredients. Domestic production is months behind. Cancer patients can't get chemotherapy. Diabetics ration insulin. Lines form outside pharmacies. Viktor insists it's temporary.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "viktor_narodny",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Emergency exemption for medicines. Lives first.", {
                    effects: {
                        treasury: -40,
                        flags: { "medicine_exemption": true }
                    },
                    unlocks: [
                        eventRef("fortress_black_market")
                    ]
                }),
                choice("Accelerate domestic production. Deploy resources.", {
                    effects: {
                        treasury: -80,
                        flags: { "emergency_pharma_production": true }
                    },
                    unlocks: [
                        eventRef("fortress_ideological_purity")
                    ]
                }),
                choice("Let the market solve it. Prices will attract producers.", {
                    effects: {
                        anger: 20
                    },
                    unlocks: [
                        eventRef("fortress_black_market")
                    ]
                }),
                choice("Blame Western sanctions for the shortage.", {
                    effects: {
                        anger: 5,
                        flags: { "blamed_west_for_shortage": true }
                    },
                    unlocks: [
                        eventRef("fortress_ideological_purity")
                    ]
                })
            ]
        }),

        event("fortress_black_market", {
            title: "The Shadow Economy",
            description: "Nature abhors a vacuum. Smuggling networks emerge overnight. Banned Western goods flow through Kazakhstan, Belarus, Turkey. Your customs officials are getting rich. The black market might now be 15% of GDP.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 3, impact: 4, sentiment: "negative" },

            choices: [
                choice("Crack down hard. Arrests, seizures, examples.", {
                    effects: {
                        treasury: -30,
                        anger: 10,
                        flags: { "black_market_crackdown": true }
                    },
                    unlocks: [
                        eventRef("fortress_ideological_purity")
                    ]
                }),
                choice("Tax it instead. Legalize some gray imports.", {
                    effects: {
                        treasury: 50,
                        flags: { "gray_import_scheme": true }
                    },
                    unlocks: [
                        eventRef("fortress_quality_collapse")
                    ]
                }),
                choice("Ignore it. The pressure valve prevents explosion.", {
                    effects: {
                        flags: { "tolerated_black_market": true }
                    },
                    unlocks: [
                        eventRef("fortress_quality_collapse")
                    ]
                }),
                choice("Infiltrate the networks. Use them for intelligence.", {
                    effects: {
                        flags: { "controlled_smuggling": true }
                    },
                    unlocks: [
                        eventRef("fortress_ideological_purity")
                    ]
                })
            ]
        }),

        event("fortress_ideological_purity", {
            title: "The Cosmopolitan Question",
            description: "Viktor wants to go further. 'Some of our elite have... foreign attachments,' he says. Bank accounts abroad. Children in London schools. Vacation homes in Monaco. 'How can we build a fortress when our leaders have one foot outside?'",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            characterId: "viktor_narodny",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 3, impact: 4, sentiment: "neutral" },

            choices: [
                choice("You're right. Mandatory repatriation of assets.", {
                    effects: {
                        elite: -30,
                        treasury: 100,
                        flags: { "forced_repatriation": true }
                    },
                    legacy: {
                        icon: "🔐",
                        name: "The Confiscator",
                        weight: -12,
                        explanation: "You seized your elite's foreign assets. They won't forget."
                    },
                    unlocks: [
                        eventRef("fortress_quality_collapse")
                    ]
                }),
                choice("Focus on government officials only. Private wealth is private.", {
                    effects: {
                        elite: -10
                    },
                    unlocks: [
                        eventRef("fortress_brain_drain")
                    ]
                }),
                choice("This is dangerous territory, Viktor.", {
                    effects: {},
                    unlocks: [
                        eventRef("fortress_quality_collapse")
                    ]
                }),
                choice("Start with voluntary declarations. Then decide.", {
                    effects: {
                        flags: { "asset_declaration_program": true }
                    },
                    unlocks: [
                        eventRef("fortress_brain_drain")
                    ]
                })
            ]
        }),

        // --- ACT 3: THE REALITY (Depth 3-4) ---

        event("fortress_quality_collapse", {
            title: "The Tractor Problem",
            description: "The new Federation tractors are rolling off the line. They look impressive. Unfortunately, they break down after 200 hours. Farmers are furious. The spring planting season is at risk. Someone imported Chinese parts anyway, and they don't fit.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 4, impact: 4, sentiment: "negative" },

            choices: [
                choice("Fix it. Whatever it costs.", {
                    effects: {
                        treasury: -60
                    },
                    unlocks: [
                        eventRef("fortress_viktor_doubts")
                    ]
                }),
                choice("Blame saboteurs and wreckers. Classic approach.", {
                    effects: {
                        flags: { "blamed_saboteurs": true }
                    },
                    unlocks: [
                        eventRef("fortress_viktor_doubts")
                    ]
                }),
                choice("Allow temporary tractor imports. Farming is critical.", {
                    effects: {
                        flags: { "tractor_exception": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Lower the quality standards. 200 hours is acceptable.", {
                    effects: {
                        anger: 10,
                        flags: { "lowered_standards": true }
                    },
                    unlocks: [
                        eventRef("fortress_viktor_doubts")
                    ]
                })
            ]
        }),

        event("fortress_brain_drain", {
            title: "The Empty Universities",
            description: "The smartest people are leaving. Not to Silicon Valley this time—anywhere. Georgia, Kazakhstan, even Mongolia. Viktor blames 'lack of patriotism.' The rector of Moscow State reports: physics department down 40%.",
            
            weight: 10,
            rarity: "rare",
            onceOnly: true,
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 4, impact: 3, sentiment: "negative" },

            choices: [
                choice("Restrict emigration. Exit visas required.", {
                    effects: {
                        anger: 15,
                        flags: { "exit_restrictions": true }
                    },
                    unlocks: [
                        eventRef("fortress_viktor_doubts")
                    ]
                }),
                choice("Raise salaries. Match international offers.", {
                    effects: {
                        treasury: -50
                    },
                    unlocks: [
                        eventRef("fortress_viktor_doubts")
                    ]
                }),
                choice("Let them go. Patriotic citizens will remain.", {
                    effects: {
                        flags: { "fortress_accepted_brain_drain": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Recruit internationally. Offer refuge to foreign scientists.", {
                    effects: {
                        treasury: -30
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                })
            ]
        }),

        event("fortress_viktor_doubts", {
            title: "The Old Believer's Crisis",
            description: "Viktor comes to you privately. He looks shaken. 'I believed... I still believe... but the numbers...' The factories are failing. The shelves are thin. The people are angry. 'Perhaps we moved too fast,' he admits.",
            
            weight: 8,
            rarity: "rare",
            onceOnly: true,
            characterId: "viktor_narodny",
            storylines: ['economic-vision'],
            
            conditions: {
                flag: "fortress_economy_active"
            },

            meta: { depth: 4, impact: 5, sentiment: "negative" },

            choices: [
                choice("Stay the course. History will vindicate us.", {
                    effects: {
                        flags: { "doubled_down_autarky": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("Gradual liberalization. Keep the rhetoric, change the policy.", {
                    effects: {
                        flags: { "quiet_liberalization": true }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("You failed, Viktor. Time for new leadership.", {
                    effects: {
                        elite: -10,
                        flags: { "viktor_dismissed": true },
                        characterStates: { viktor_narodny: "dismissed" }
                    },
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                }),
                choice("We need a new approach entirely.", {
                    effects: {},
                    unlocks: [
                        eventRef("economic_reckoning_arrives")
                    ]
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // THE ECONOMIC RECKONING (Shared Convergence)
        // ═══════════════════════════════════════════════════════════════
        //
        // All three paths lead here. The specific trigger varies,
        // but the structure is the same: your economic model is tested.
        // ═══════════════════════════════════════════════════════════════

        event("economic_reckoning_arrives", {
            title: "The Moment of Truth",
            description: "The reports are on your desk. Every chart points down. The Central Banker hasn't slept in days. Your chosen economic path—whether tech, energy, or autarky—has hit a wall. The reckoning you hoped would never come is here.",
            
            weight: 0,  // Only triggered by unlocks
            rarity: "legendary",
            onceOnly: true,
            storylines: ['economic-vision'],

            // Narrative variations based on path
            narrativeVariations: [
                {
                    conditions: { flag: "silicon_steppe_active" },
                    description: "The global tech bubble has burst. Valuations collapsed 70%. Your tech companies are worthless on paper. The engineers you recruited want their salaries in dollars. The surveillance tech you exported is in a human rights scandal. Natasha—if she's still around—has no answers."
                },
                {
                    conditions: { flag: "pipeline_state_active" },
                    description: "Oil hit $30 and stayed there. Electric vehicles crossed the tipping point. European gas demand is permanently down 40%. Your pipeline is a $45 billion concrete sculpture. Gazov has a stress-induced heart condition. The sovereign wealth fund is empty."
                },
                {
                    conditions: { flag: "fortress_economy_active" },
                    description: "Inflation hit 40%. The shops are stocked with domestic goods nobody wants. The black market controls essential medicines. Your factories produce at 60% capacity—when they run at all. Viktor's hair has gone white. The opposition is quoting your old speeches back at you."
                }
            ],

            meta: { depth: 5, impact: 5, sentiment: "negative" },

            choices: [
                choice("Double down. We just need more time.", {
                    effects: {
                        flags: { "reckoning_doubled_down": true }
                    },
                    unlocks: [
                        eventRef("reckoning_elite_revolt")
                    ]
                }),
                choice("Pivot. Adopt a different approach entirely.", {
                    effects: {
                        elite: -10,
                        flags: { "reckoning_pivoted": true }
                    },
                    unlocks: [
                        eventRef("reckoning_foreign_pressure")
                    ]
                }),
                choice("Find a scapegoat. Someone must pay.", {
                    effects: {
                        elite: 5,
                        anger: 5,
                        flags: { "reckoning_scapegoat": true }
                    },
                    unlocks: [
                        eventRef("reckoning_elite_revolt")
                    ]
                }),
                choice("Accept reality. Begin fundamental reform.", {
                    effects: {
                        elite: -15,
                        anger: -10,
                        flags: { "reckoning_reform": true }
                    },
                    unlocks: [
                        eventRef("reckoning_bread_riots")
                    ]
                })
            ]
        }),

        event("reckoning_elite_revolt", {
            title: "The Dacha Confrontation",
            description: "Your inner circle demands a meeting. They're not asking nicely. The oligarchs lost billions. The generals want their equipment budgets. The technocrats are tired of explaining the inexplicable. Someone breaks a wine glass. The conversation becomes tense.",
            
            weight: 0,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['economic-vision'],

            meta: { depth: 5, impact: 5, sentiment: "negative" },

            choices: [
                choice("Remind them who made them.", {
                    effects: {
                        elite: -20,
                        flags: { "confronted_elite": true }
                    },
                    unlocks: [
                        eventRef("reckoning_bread_riots")
                    ]
                }),
                choice("Listen. Really listen.", {
                    effects: {
                        elite: -5,
                        flags: { "listened_to_elite": true }
                    },
                    unlocks: [
                        eventRef("reckoning_final_choice")
                    ]
                }),
                choice("Concessions. Give them something real.", {
                    effects: {
                        treasury: -100,
                        personalWealth: -20,
                        elite: 10
                    },
                    unlocks: [
                        eventRef("reckoning_final_choice")
                    ]
                }),
                choice("Find the ringleader. Make an example.", {
                    effects: {
                        elite: -15,
                        flags: { "purged_elite_dissident": true }
                    },
                    legacy: {
                        icon: "⚔️",
                        name: "The Survivor",
                        weight: -10,
                        explanation: "When your allies turned, you struck first."
                    },
                    unlocks: [
                        eventRef("reckoning_bread_riots")
                    ]
                })
            ]
        }),

        event("reckoning_foreign_pressure", {
            title: "The Creditors Call",
            description: "China wants repayment on those infrastructure loans. The IMF is making noises. Bond markets are closed to you. The ruble is in free fall. Foreign leaders who used to take your calls are suddenly 'in meetings.'",
            
            weight: 0,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['economic-vision'],

            meta: { depth: 5, impact: 5, sentiment: "negative" },

            choices: [
                choice("Default on everything. Consequences be damned.", {
                    effects: {
                        flags: { "sovereign_default": true }
                    },
                    legacy: {
                        icon: "💥",
                        name: "The Defaulter",
                        weight: -15,
                        explanation: "You told the world's creditors to go to hell."
                    },
                    unlocks: [
                        eventRef("reckoning_bread_riots")
                    ]
                }),
                choice("Negotiate. Accept some conditions.", {
                    effects: {
                        treasury: 100,
                        elite: -10
                    },
                    unlocks: [
                        eventRef("reckoning_final_choice")
                    ]
                }),
                choice("Pivot east completely. China's terms, whatever they are.", {
                    effects: {
                        flags: { "chinese_dependency": true }
                    },
                    unlocks: [
                        eventRef("reckoning_final_choice")
                    ]
                }),
                choice("Emergency asset sales. The crown jewels.", {
                    effects: {
                        treasury: 200,
                        flags: { "sold_state_assets": true }
                    },
                    unlocks: [
                        eventRef("reckoning_bread_riots")
                    ]
                })
            ]
        }),

        event("reckoning_bread_riots", {
            title: "The Streets Explode",
            description: "Spontaneous protests erupt in ten cities simultaneously. Not organized opposition—just angry people. Bread lines. Unemployment. Inflation. They're chanting economic slogans, not political ones. For now.",
            
            weight: 0,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['economic-vision'],

            meta: { depth: 5, impact: 5, sentiment: "negative" },

            choices: [
                choice("Disperse them. Water cannons if necessary.", {
                    effects: {
                        anger: 20,
                        flags: { "suppressed_bread_riots": true }
                    },
                    legacy: {
                        icon: "🔫",
                        name: "The Suppressor",
                        weight: -12,
                        explanation: "You met hungry people with water cannons."
                    },
                    unlocks: [
                        eventRef("reckoning_final_choice")
                    ]
                }),
                choice("Emergency subsidies. Buy peace.", {
                    effects: {
                        treasury: -80,
                        anger: -10
                    },
                    unlocks: [
                        eventRef("reckoning_final_choice")
                    ]
                }),
                choice("Address them personally. Historic speech.", {
                    effects: {
                        anger: -5,
                        flags: { "addressed_crowds": true }
                    },
                    unlocks: [
                        eventRef("reckoning_final_choice")
                    ]
                }),
                choice("Blame foreign interference. Arrest 'organizers.'", {
                    effects: {
                        anger: 10,
                        flags: { "blamed_foreign_agitators": true }
                    },
                    unlocks: [
                        eventRef("reckoning_final_choice")
                    ]
                })
            ]
        }),

        event("reckoning_final_choice", {
            title: "The Decision",
            description: "It's late. You're alone in your office. The reports are on your desk. Every option has costs. Every path forward is painful. You came to power to make the Federation great. Instead... this. The next decision will define whatever comes after.",
            
            weight: 0,
            rarity: "legendary",
            onceOnly: true,
            storylines: ['economic-vision'],

            meta: { depth: 6, impact: 5, sentiment: "negative" },

            choices: [
                choice("Purge and persist. Arrest the failures, seize assets.", {
                    effects: {
                        elite: -25,
                        treasury: 150,
                        anger: 15,
                        flags: { "economic_purge": true }
                    },
                    legacy: {
                        icon: "🗡️",
                        name: "The Economic Tyrant",
                        weight: -20,
                        explanation: "When the economy failed, you turned to force."
                    }
                }),
                choice("Reform and risk. Liberalize, privatize, open markets.", {
                    effects: {
                        treasury: 50,
                        elite: -20,
                        anger: -15,
                        flags: { "economic_reform": true }
                    },
                    legacy: {
                        icon: "🔓",
                        name: "The Reformer",
                        weight: 5,
                        explanation: "In crisis, you chose openness over control."
                    }
                }),
                choice("Pivot and pretend. Adopt new rhetoric, change nothing.", {
                    effects: {
                        elite: 5,
                        flags: { "economic_theater": true }
                    },
                    legacy: {
                        icon: "🎭",
                        name: "The Performer",
                        weight: -5,
                        explanation: "You changed the words. The reality stayed the same."
                    }
                }),
                choice("Admit and abdicate. The economy is broken. Maybe you are too.", {
                    effects: {
                        elite: -30,
                        anger: -20,
                        flags: { "economic_failure_admitted": true }
                    },
                    legacy: {
                        icon: "🏳️",
                        name: "The Honest Failure",
                        weight: 10,
                        explanation: "In the end, you told the truth. It wasn't enough."
                    }
                })
            ]
        })
    ]
});

