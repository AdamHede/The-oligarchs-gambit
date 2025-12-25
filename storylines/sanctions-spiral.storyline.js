/**
 * Sanctions Spiral Storyline
 *
 * Theme: Economic isolation and the desperate scramble to survive Western sanctions.
 * The choices here often force the player to choose between economic pain and
 * increased repression/isolation.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "sanctions-spiral",
    name: "Sanctions Spiral",
    description: "Western sanctions tighten the noose on your economy",
    theme: {
        borderColor: "#1a472a",
        accentColor: "#2d5a3d"
    },

    // This storyline is typically triggered by war or shadow-war events
    // Entry point: sanctions_initial_wave (triggered from other storylines)
    tree: event("sanctions_initial_wave", {
        title: "The Economic Iron Curtain",
        description: "In response to your recent actions, Western nations have imposed sweeping sanctions. Luxury brands are leaving, and the stock market is in freefall.",
        weight: 0, // Triggered from war/shadow-war
        rarity: "common",
        meta: { depth: 4, impact: 5, sentiment: "negative" },

        choices: [
            // Path A: Seize foreign assets (escalation)
            choice("Seize foreign assets", {
                effects: {
                    personalWealth: 20,
                    treasury: 10,
                    elite: -5,
                    anger: 5
                },

                unlocks: [
                    // Import Substitution Failure
                    event("import_substitution_failure", {
                        title: "The Cheese Incident",
                        description: "Your 'Import Substitution' policy has led to local factories producing a cheese-like substance that burns when lit on fire. The public is mocking you on social media.",
                        weight: 5,
                        rarity: "common",
                        meta: { depth: 5, impact: 2, sentiment: "negative" },

                        choices: [
                            choice("Ban the criticism", {
                                effects: { anger: 5 },

                                unlocks: [
                                    event("internet_censorship_tightens", {
                                        title: "The Great Firewall Expands",
                                        description: "Your internet censorship has been expanded. Social media platforms are blocked, VPNs are being hunted down.",
                                        weight: 0,
                                        rarity: "common",
                                        meta: { depth: 6, impact: 3, sentiment: "negative" },

                                        choices: [
                                            choice("Tighten control further", {
                                                effects: { anger: 10, elite: -3 }
                                            }),
                                            choice("Ease restrictions slightly", {
                                                effects: { anger: -5, elite: 2, treasury: -30 },

                                                unlocks: [
                                                    event("foreign_influence_creeping", {
                                                        title: "Western Ideas Spread",
                                                        description: "With the internet slightly more open, 'dangerous' Western ideas about democracy and transparency are spreading among the youth.",
                                                        weight: 0,
                                                        rarity: "common",
                                                        meta: { depth: 7, impact: 2, sentiment: "negative" },

                                                        choices: [
                                                            choice("Let them talk", {
                                                                effects: { anger: -2, elite: -5 },
                                                                // Links to social movement storyline
                                                                unlocks: [eventRef("mass_protests_blogger")]
                                                            }),
                                                            choice("Clamp down again", {
                                                                effects: { anger: 10, elite: 2 }
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),

                            choice("Ignore it", {
                                effects: { elite: -2, anger: 2 },
                                legacy: {
                                    icon: "🤡",
                                    name: "The Laughing Stock",
                                    weight: -5,
                                    explanation: "Your pathetic retaliation made you a global joke."
                                }
                            })
                        ]
                    }),

                    // Tech Sector Collapse
                    event("tech_sector_collapse", {
                        title: "Brain Drain",
                        description: "Without access to western chips and software, your tech sector is dying. Thousands of IT specialists are fleeing to Georgia and Armenia.",
                        weight: 5,
                        rarity: "rare",
                        meta: { depth: 5, impact: 4, sentiment: "negative" },

                        choices: [
                            choice("Close the borders for IT workers", {
                                effects: {
                                    anger: 15,
                                    elite: -10,
                                    treasury: -10,
                                    personalWealth: 10
                                },

                                unlocks: [
                                    event("underground_railroad", {
                                        title: "The Escape Network",
                                        description: "An underground network has formed to help people flee the country. It's becoming harder to stop the brain drain.",
                                        weight: 0,
                                        rarity: "rare",
                                        meta: { depth: 6, impact: 2, sentiment: "negative" },

                                        choices: [
                                            choice("Crack down hard", {
                                                effects: { anger: 15, elite: -5 }
                                            }),
                                            choice("Turn a blind eye", {
                                                effects: { elite: -3, treasury: -10 }
                                            })
                                        ]
                                    })
                                ]
                            }),

                            choice("Offer massive tax breaks to stay", {
                                effects: { treasury: -150, elite: 5, anger: -5 },

                                unlocks: [
                                    event("loyal_tech_giant", {
                                        title: "The Homegrown Tech Champion",
                                        description: "One major tech company has stayed loyal, developing local alternatives to Western software. They're asking for more support.",
                                        weight: 0,
                                        rarity: "rare",
                                        meta: { depth: 6, impact: 3, sentiment: "positive" },

                                        choices: [
                                            choice("Invest heavily", {
                                                effects: { treasury: -40, elite: 5, anger: -3 }
                                            }),
                                            choice("Offer modest support", {
                                                effects: { treasury: -15, elite: 2 }
                                            }),
                                            choice("Reject the request", {
                                                effects: { elite: -2 }
                                            })
                                        ]
                                    }),

                                    event("subsidy_dependency", {
                                        title: "Subsidy Addiction",
                                        description: "The tech sector has become completely dependent on state subsidies. They are threatening to leave if the money stops flowing.",
                                        weight: 0,
                                        rarity: "common",
                                        meta: { depth: 6, impact: 3, sentiment: "negative" },

                                        choices: [
                                            choice("Keep paying", {
                                                effects: { treasury: -80, elite: 2 }
                                            }),
                                            choice("Cut them off", {
                                                effects: { elite: -5, anger: 5 },
                                                // Risk of collapse again
                                                unlocks: [eventRef("tech_sector_collapse")]
                                            }),
                                            choice("Restructure subsidies through your holding company", {
                                                effects: { treasury: -60, personalWealth: 12 },
                                                legacy: { icon: "🏦", name: "The Subsidy King", weight: 5 }
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),

                    // Human Rights Sanctions (also triggered elsewhere)
                    eventRef("sanctions_human_rights")
                ]
            }),

            // Path B: Negotiate secretly (de-escalation attempt)
            choice("Try to negotiate secretly", {
                effects: {
                    personalWealth: -5,
                    elite: 2,
                    treasury: -20
                },

                unlocks: [
                    event("sanctions_loophole_found", {
                        title: "Creative Accounting",
                        description: "Your financial advisors have found ways to circumvent some sanctions through shell companies and third-party intermediaries.",
                        weight: 0,
                        rarity: "rare",
                        meta: { depth: 5, impact: 3, sentiment: "positive" },

                        choices: [
                            choice("Exploit the loopholes", {
                                effects: { treasury: 30, personalWealth: 5, elite: 3 }
                            }),
                            choice("Be cautious", {
                                effects: { treasury: 10 }
                            })
                        ]
                    })
                ]
            })
        ]
    })
});
