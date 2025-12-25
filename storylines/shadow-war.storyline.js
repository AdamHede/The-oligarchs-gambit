/**
 * Shadow War Storyline
 *
 * Theme: Covert operations, assassinations, and cyber warfare.
 * The player can engage in shadow operations but risks international exposure
 * and escalation to open conflict.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "shadow-war",
    name: "Shadow War",
    description: "Covert operations and espionage that can spiral out of control",
    theme: {
        borderColor: "#1a1a2e",
        accentColor: "#16213e"
    },

    // Multiple entry points for this storyline
    tree: [
        // Entry Point 1: The Defector
        event("shadow_war_defector_silence", {
            title: "The Loud Critic",
            description: "A former lieutenant has defected to the West and is writing a book. His insights into your finances could be... damaging. The GRU suggests a special operation to silence him.",
            weight: 10,
            rarity: "common",
            meta: { depth: 1, impact: 3, sentiment: "negative" },

            choices: [
                choice("Authorize the 'accident'", {
                    effects: { treasury: -5, elite: 5 },
                    legacy: {
                        icon: "☂️",
                        name: "The Silencer",
                        weight: 5,
                        explanation: "The traitor was eliminated. A message sent to all who would betray the motherland."
                    },

                    unlocks: [
                        event("assassination_attempt_botched", {
                            title: "The Amateur Hit",
                            description: "Your agents in London made a mess. They used a highly traceable nerve agent and were caught on CCTV. The victim is alive, and the world is furious.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 2, impact: 3, sentiment: "negative" },

                            choices: [
                                choice("Deny everything vehemently", {
                                    effects: { anger: 5 },
                                    legacy: {
                                        icon: "🕵️‍♂️",
                                        name: "The Bumbling Assassin",
                                        weight: -5,
                                        explanation: "Your assassination attempt failed spectacularly. An international embarrassment."
                                    },
                                    unlocks: [eventRef("shadow_war_ultimatum")]
                                }),
                                choice("Make a joke of it", {
                                    effects: { anger: -2, elite: 2 },
                                    unlocks: [eventRef("shadow_war_ultimatum")]
                                })
                            ]
                        }),

                        eventRef("shadow_war_ultimatum")
                    ]
                }),

                choice("Let him publish", {
                    effects: { elite: -5, anger: 5 }
                    // No chain - story ends here
                })
            ]
        }),

        // Entry Point 2: Cyber Attack
        event("cyber_attack_grid", {
            title: "Winter is Coming",
            description: "Your cyber-warfare unit proposes a massive attack on a rival nation's power grid during a cold snap. It would cause chaos and send a strong message.",
            weight: 5,
            rarity: "rare",
            meta: { depth: 1, impact: 3, sentiment: "negative" },

            choices: [
                choice("Execute the attack", {
                    effects: { treasury: -10, elite: 5 },

                    unlocks: [
                        event("election_interference_exposure", {
                            title: "The Troll Farm Leak",
                            description: "A whistleblower has leaked thousands of documents proving your government funded interference in Western elections. Sanctions are being prepared.",
                            weight: 0,
                            rarity: "common",
                            meta: { depth: 2, impact: 2, sentiment: "positive" },

                            choices: [
                                choice("Blame the CIA", {
                                    effects: { anger: -5, elite: 2 }
                                }),
                                choice("Admit 'patriotic hackers'", {
                                    effects: { elite: 5 }
                                })
                            ]
                        }),

                        eventRef("shadow_war_ultimatum")
                    ]
                }),

                choice("Too risky", {
                    effects: { elite: -2 }
                })
            ]
        }),

        // Entry Point 3: Mercenaries in Africa
        event("mercenaries_africa", {
            title: "Gold for Guns",
            description: "A strapped African dictatorship needs help crushing rebels. They offer gold mining rights in exchange for your 'private military contractors'.",
            weight: 5,
            rarity: "common",
            meta: { depth: 1, impact: 2, sentiment: "positive" },

            choices: [
                choice("Deploy the musicians", {
                    effects: { treasury: 20, elite: 5 },
                    unlocks: [eventRef("assassination_attempt_botched")]
                }),

                choice("Focus on domestic issues", {
                    effects: { treasury: -5 }
                })
            ]
        }),

        // The Ultimatum - Major escalation point
        event("shadow_war_ultimatum", {
            title: "The Red Line",
            description: "Western leaders have had enough. They present irrefutable proof of your operations and threaten total economic isolation effectively an act of war.",
            weight: 0,
            rarity: "rare",
            meta: { depth: 2, impact: 5, sentiment: "negative" },

            choices: [
                choice("Back down and burn agents", {
                    effects: { elite: -15, anger: -5 },
                    legacy: {
                        icon: "🐀",
                        name: "The Betrayer",
                        weight: -15,
                        explanation: "You surrendered a loyal agent to save yourself. Loyalty means nothing to you."
                    },
                    terminates: ["assassination_attempt_botched", "cyber_attack_grid"]
                }),

                choice("Escalate to open conflict", {
                    effects: { elite: 10, anger: 15, treasury: -80 },
                    // This bridges to the war storyline
                    unlocks: [eventRef("war_special_operation_proposal")]
                })
            ]
        })
    ]
});
