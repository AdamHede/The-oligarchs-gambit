/**
 * Oligarch Rivalry & Succession Crisis Storyline
 *
 * Theme: Power struggles among the elite and questions about
 * the leader's health and succession. The sharks are always circling.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "succession-crisis",
    name: "Succession Crisis",
    description: "Power struggles and questions about your grip on power",
    theme: {
        borderColor: "#4a0e0e",
        accentColor: "#722f2f"
    },

    tree: [
        // Entry Point 1: The Yacht Incident (Oligarch Rivalry)
        event("oligarch_yacht_seized", {
            title: "The Yacht Incident",
            description: "Your close ally, the Aluminum King, has had his $600M superyacht seized in Italy. He is demanding you compensate him from the state budget.",
            weight: 8,
            rarity: "rare",
            image: "assets/images/events/oligarch_yacht_seized.png",
            meta: { depth: 1, impact: 3, sentiment: "negative" },

            choices: [
                choice("Compensate him fully", {
                    effects: { treasury: -25, elite: 10, anger: 3 },

                    unlocks: [
                        event("oligarch_greed_spiral", {
                            title: "The Compensation Spiral",
                            description: "Word has spread that you compensated the Aluminum King. Now every oligarch with seized assets is demanding the same treatment.",
                            weight: 0,
                            rarity: "common",
                            image: "assets/images/events/oligarch_greed_spiral.png",
                            meta: { depth: 2, impact: 5, sentiment: "negative" },

                            choices: [
                                choice("Pay them all", {
                                    effects: { treasury: -150, elite: 10, anger: 15 }
                                }),
                                choice("Refuse", {
                                    effects: { elite: -5 }
                                }),
                                choice("Pay them... from their own frozen assets abroad", {
                                    effects: { treasury: -50, elite: 5, personalWealth: 15, anger: 5 },
                                    legacy: { icon: "🎩", name: "The Middleman", weight: 10 }
                                })
                            ]
                        })
                    ]
                }),

                choice("Tell him to be a patriot", {
                    effects: { elite: -15, personalWealth: 10, anger: 8 },

                    unlocks: [
                        event("oligarch_plotting", {
                            title: "The Plot Thickens",
                            description: "The Aluminum King's anger has spread. Other oligarchs are quietly discussing your removal. The sharks are circling.",
                            weight: 0,
                            rarity: "epic",
                            meta: { depth: 2, impact: 5, sentiment: "negative" },

                            choices: [
                                choice("Preemptively purge", {
                                    effects: { elite: -20, personalWealth: 20, treasury: 10, anger: 10 },
                                    legacy: {
                                        icon: "🔪",
                                        name: "The Survivor",
                                        weight: 10,
                                        explanation: "You struck first against the plotters. Ruthless, but effective."
                                    }
                                }),
                                choice("Try to buy loyalty", {
                                    effects: { treasury: -70, elite: 5 }
                                })
                            ]
                        })
                    ]
                })
            ]
        }),

        // Entry Point 2: Health Scare Rumors
        event("health_scare_rumors", {
            title: "Trembling Hands",
            description: "A video of you gripping a table during a meeting has gone viral. Rumors of your ill health are spreading among the elite. The sharks are circling.",
            weight: 6,
            rarity: "epic",
            image: "assets/images/events/health_scare_rumors.png",
            meta: { depth: 1, impact: 4, sentiment: "negative" },

            choices: [
                choice("Stage a judo match", {
                    effects: { elite: 5, anger: -2 },

                    unlocks: [
                        event("body_double_auditions", {
                            title: "The Lookalike Search",
                            description: "You've ordered your security services to find body doubles who can stand in for you at public events. The auditions are... interesting.",
                            weight: 0,
                            rarity: "rare",
                            image: "assets/images/events/body_double_auditions.png",
                            meta: { depth: 2, impact: 2, sentiment: "negative" },

                            choices: [
                                choice("Use them frequently", {
                                    effects: { elite: -5, anger: 5 }
                                }),
                                choice("Use them sparingly", {
                                    effects: { elite: 2, treasury: -10 }
                                })
                            ]
                        })
                    ]
                }),

                choice("Purge the 'disloyal' gossipers", {
                    effects: { elite: -10, personalWealth: 5 },

                    unlocks: [
                        event("paranoia_increases", {
                            title: "The Purge Begins",
                            description: "Your paranoia has reached new heights. You're purging anyone who might have gossiped about your health. Fear spreads through the elite.",
                            weight: 0,
                            rarity: "epic",
                            image: "assets/images/events/paranoia_increases.png",
                            meta: { depth: 2, impact: 4, sentiment: "negative" },

                            choices: [
                                choice("Continue the purge", {
                                    effects: { elite: -15, personalWealth: 20, anger: 12 },
                                    legacy: {
                                        icon: "👑",
                                        name: "The Mad King",
                                        weight: 15,
                                        explanation: "Your paranoia consumed all reason. The purges will be remembered."
                                    }
                                }),
                                choice("Stop the purge", {
                                    effects: { elite: 5, anger: -5 },
                                    unlocks: [eventRef("oligarch_plotting")]
                                })
                            ]
                        })
                    ]
                })
            ]
        }),

        // Entry Point 3: The Banker Flees
        event("oligarch_defection", {
            title: "The Banker Flees",
            description: "Your former personal banker has fled to London. He is threatening to release documents about your offshore accounts unless you guarantee his safety.",
            weight: 6,
            rarity: "rare",
            meta: { depth: 1, impact: 3, sentiment: "negative" },

            choices: [
                choice("Send the agents", {
                    effects: { elite: -10, anger: -2, treasury: -10 },
                    unlocks: [eventRef("sanctions_human_rights")]
                }),
                choice("Let him go", {
                    effects: { elite: -5, anger: 5 }
                })
            ]
        }),

        // Entry Point 4: Palace Intrigue
        event("palace_intrigue", {
            title: "War of the Towers",
            description: "The 'Siloviki' (security services) and the 'Liberals' (economic bloc) are openly fighting for control over the budget. You must choose a side.",
            weight: 6,
            rarity: "common",
            image: "assets/images/events/palace_intrigue.png",
            meta: { depth: 1, impact: 3, sentiment: "neutral" },

            choices: [
                choice("Back the Siloviki", {
                    effects: { elite: -5, anger: 5, treasury: -20, personalWealth: 5 },
                    legacy: {
                        icon: "👮",
                        name: "The Strongman",
                        weight: 5,
                        explanation: "You sided with the security services. Order through strength."
                    },
                    unlocks: [eventRef("paranoia_increases")]
                }),

                choice("Back the Liberals", {
                    effects: { elite: -5, treasury: 10, anger: -2 },
                    legacy: {
                        icon: "📈",
                        name: "The Reformer",
                        weight: 2,
                        explanation: "You backed the liberals. Perhaps there's hope for reform yet."
                    },
                    unlocks: [eventRef("generals_plotting_coup")]
                })
            ]
        })
    ]
});
