/**
 * Energy Pipeline Storyline
 *
 * Theme: Using energy resources as a geopolitical weapon.
 * The player can profit massively but risks economic blowback.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "energy-pipeline",
    name: "Energy Politics",
    description: "Weaponizing energy resources for geopolitical gain",
    theme: {
        borderColor: "#2d4a2d",
        accentColor: "#4a7c4a"
    },

    tree: [
        // Entry Point 1: Energy Price Spike
        event("energy_price_spike", {
            title: "Winter is Coming",
            description: "Global energy prices have spiked. Europe is desperate for gas. You have your hand on the valve.",
            weight: 8,
            rarity: "rare",
            meta: { depth: 1, impact: 4, sentiment: "positive" },

            choices: [
                choice("Cut off the gas to Europe", {
                    effects: { treasury: -50, elite: 10, anger: 5 },
                    legacy: {
                        icon: "❄️",
                        name: "The Coldmaker",
                        weight: -5,
                        explanation: "You cut off gas supplies to freeze Europe. They won't forget."
                    },

                    unlocks: [
                        event("europe_freezes_propaganda", {
                            title: "Winter of Discontent",
                            description: "Europe is freezing without your gas. State media is broadcasting images of cold Europeans while your people stay warm. The propaganda value is immense.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 2, impact: 2, sentiment: "positive" },

                            choices: [
                                choice("Amplify the propaganda", {
                                    effects: { elite: 3, anger: -3 },
                                    unlocks: [eventRef("counter_sanctions_energy")]
                                }),
                                choice("Focus on domestic issues", {
                                    effects: { anger: -2 }
                                })
                            ]
                        }),

                        event("budget_deficit_energy", {
                            title: "The Energy Budget Hole",
                            description: "Cutting off gas sales has created a massive hole in your budget. The treasury is bleeding money.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 2, impact: 3, sentiment: "negative" },

                            choices: [
                                choice("Raise domestic prices", {
                                    effects: { treasury: 20, anger: 10, personalWealth: 3 }
                                }),
                                choice("Cut other spending", {
                                    effects: { treasury: 10, elite: -5 }
                                })
                            ]
                        }),

                        event("counter_sanctions_energy", {
                            title: "Energy Cap",
                            description: "Western nations have agreed on a price cap for your energy exports. Revenues are plummeting despite your threats.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 2, impact: 3, sentiment: "negative" },

                            choices: [
                                choice("Stop selling to them", {
                                    effects: { treasury: -30, elite: 2, anger: 5 },
                                    unlocks: [eventRef("budget_deficit_energy")]
                                }),
                                choice("Sell through intermediaries", {
                                    effects: { treasury: -10, elite: -2 }
                                })
                            ]
                        })
                    ]
                }),

                choice("Sell at maximum price", {
                    effects: { treasury: 100, personalWealth: 10, elite: 3, anger: 15 },

                    unlocks: [
                        event("oligarch_bonus_payout", {
                            title: "The Bonus Season",
                            description: "The massive energy profits have triggered bonus season for your inner circle. They're expecting their cut.",
                            weight: 0,
                            rarity: "rare",
                            image: "assets/images/events/oligarch_bonus_payout.png",
                            meta: { depth: 2, impact: 3, sentiment: "positive" },

                            choices: [
                                choice("Pay them handsomely", {
                                    effects: { elite: 10, treasury: -70, personalWealth: -5, anger: 5 }
                                }),
                                choice("Keep more for yourself", {
                                    effects: { personalWealth: 20, elite: -8, treasury: -10, anger: 8 },
                                    legacy: { icon: "💰", name: "The Greedy", weight: -10 }
                                })
                            ]
                        }),

                        eventRef("inflation_crisis")
                    ]
                })
            ]
        }),

        // Entry Point 2: Pipeline Sabotage
        event("pipeline_sabotage", {
            title: "Pipeline Mystery",
            description: "One of your major undersea pipelines has exploded. No one knows who did it, but everyone is pointing fingers.",
            weight: 4,
            rarity: "epic",
            meta: { depth: 1, impact: 4, sentiment: "negative" },

            choices: [
                choice("Blame Western spies", {
                    effects: { anger: -5, elite: 2 },

                    unlocks: [
                        event("shadow_war_escalation", {
                            title: "The Shadow War Intensifies",
                            description: "Attributing the pipeline sabotage to Western spies has escalated tensions. Covert operations are increasing on both sides.",
                            weight: 0,
                            rarity: "rare",
                            meta: { depth: 2, impact: 3, sentiment: "neutral" },

                            choices: [
                                choice("Escalate the shadow war", {
                                    effects: { elite: 5, treasury: -20, anger: 5 }
                                }),
                                choice("De-escalate", {
                                    effects: { elite: -3, treasury: -10 }
                                })
                            ]
                        })
                    ]
                }),

                choice("Quietly repair it", {
                    effects: { treasury: -40, personalWealth: -2 }
                })
            ]
        })
    ]
});
