/**
 * Domestic Crisis Storyline
 *
 * Theme: Economic collapse, infrastructure decay, and internal struggles.
 * The player must manage domestic crises while their other schemes unfold.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "domestic-crisis",
    name: "Domestic Crisis",
    description: "Economic collapse and infrastructure decay threaten stability",
    theme: {
        borderColor: "#4a3728",
        accentColor: "#6b4423"
    },

    tree: [
        // Entry Point 1: Inflation Crisis
        event("inflation_crisis", {
            title: "The Price of Eggs",
            description: "Inflation has hit 20%. The price of eggs has tripled. Grandmothers are fighting in supermarkets.",
            weight: 8,
            rarity: "common",
            meta: { depth: 2, impact: 4, sentiment: "negative" },

            choices: [
                choice("Price controls", {
                    effects: { treasury: -35, anger: -5, elite: -3 },

                    unlocks: [
                        event("shortages_black_market", {
                            title: "The Black Market Boom",
                            description: "Price controls have created shortages. A thriving black market has emerged, selling everything at triple the official price.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 3, impact: 2, sentiment: "negative" },

                            choices: [
                                choice("Crack down on the black market", {
                                    effects: { anger: 10, elite: -3, treasury: -10 }
                                }),
                                choice("Turn a blind eye", {
                                    effects: { anger: -3, treasury: -15, personalWealth: 5 }
                                })
                            ]
                        }),

                        event("pension_crisis", {
                            title: "The Pension Fund is Empty",
                            description: "Decades of mismanagement and recent emergency spending have drained the pension fund. The elderly are starting to gather in city squares.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 3, impact: 4, sentiment: "negative" },

                            choices: [
                                choice("Print money to pay them", {
                                    effects: { treasury: -50, anger: -5, elite: -3 },
                                    legacy: {
                                        icon: "💸",
                                        name: "The Money Printer",
                                        weight: 0,
                                        explanation: "You printed money to solve your problems. Hyperinflation will be your legacy."
                                    }
                                }),
                                choice("Raise retirement age", {
                                    effects: { anger: 10, treasury: 30, elite: 5, personalWealth: 8 },
                                    legacy: {
                                        icon: "📉",
                                        name: "The Iron Accountant",
                                        weight: 5,
                                        explanation: "You accepted the pain of austerity. The budget will thank you."
                                    }
                                })
                            ]
                        })
                    ]
                }),

                choice("Blame foreign saboteurs", {
                    effects: { anger: 5 },

                    unlocks: [
                        event("tv_propaganda_blame", {
                            title: "The Blame Game",
                            description: "State TV is running 24/7 coverage blaming foreign saboteurs for the inflation. The narrative is taking hold.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 3, impact: 2, sentiment: "positive" },

                            choices: [
                                choice("Amplify the blame", {
                                    effects: { anger: -5, elite: 2 }
                                }),
                                choice("Focus on solutions", {
                                    effects: { anger: -3, treasury: -15 }
                                })
                            ]
                        })
                    ]
                })
            ]
        }),

        // Entry Point 2: Infrastructure Collapse
        event("infrastructure_collapse", {
            title: "Heating Pipe Burst",
            description: "In -30C weather, the central heating pipes in a major city have burst. 50,000 people are freezing.",
            weight: 6,
            rarity: "rare",
            meta: { depth: 1, impact: 4, sentiment: "negative" },

            choices: [
                choice("Fly there and yell at the Governor", {
                    effects: { anger: -5, elite: -5, treasury: -30 },
                    legacy: {
                        icon: "📢",
                        name: "The Micro-Manager",
                        weight: 2,
                        explanation: "You personally managed the price of eggs. Such attention to detail!"
                    },

                    unlocks: [
                        event("infrastructure_decay", {
                            title: "Rust and Ruin",
                            description: "The heating pipe burst was just a symptom. Bridges are crumbling, dams are leaking, and the power grid is failing across the country.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 2, impact: 5, sentiment: "negative" },

                            choices: [
                                choice("Massive modernization program", {
                                    effects: { treasury: -150, elite: 10, anger: -5 },
                                    legacy: {
                                        icon: "🏗️",
                                        name: "The Builder",
                                        weight: 10,
                                        explanation: "You invested in infrastructure for the people. A rare moment of generosity."
                                    }
                                }),
                                choice("Patch it up cheaply", {
                                    effects: { treasury: -20, anger: 5, personalWealth: 5 },
                                    // Risk of recurring
                                    unlocks: [eventRef("infrastructure_decay")]
                                })
                            ]
                        })
                    ]
                }),

                choice("Ignore it", {
                    effects: { anger: 15 }
                })
            ]
        })
    ]
});
