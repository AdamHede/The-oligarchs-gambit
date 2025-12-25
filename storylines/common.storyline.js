/**
 * Common Events Storyline
 *
 * These are standalone events that don't belong to a specific storyline arc.
 * They can be referenced from other storylines using eventRef().
 *
 * Categories:
 * - Background: Low-stakes recurring events that add flavor
 * - Pacing: Events that fill quiet moments
 * - Crossover: Events that can trigger from multiple storylines
 */

import { defineStoryline, event, choice } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "common",
    name: "Common Events",
    description: "Standalone events that add flavor and variety",

    // Multiple entry points - these are all independent events
    tree: [
        // ═══════════════════════════════════════════════════════════════
        // BACKGROUND EVENTS - Low stakes, add flavor
        // ═══════════════════════════════════════════════════════════════

        event("tax_haven_crackdown", {
            title: "Offshore Crackdown",
            description: "European regulators are tightening control on offshore accounts. Your assets in Cyprus are under scrutiny.",
            weight: 3,
            rarity: "common",
            meta: { depth: 1, impact: 2, sentiment: "negative" },

            choices: [
                choice("Move funds to Dubai", {
                    effects: { personalWealth: -5 }
                }),
                choice("Repatriate funds (Tax Amnesty)", {
                    effects: {
                        personalWealth: -10,
                        treasury: 5,
                        elite: -2,
                        anger: -2
                    }
                })
            ]
        }),

        event("brain_drain", {
            title: "The Exodus",
            description: "Young IT specialists and engineers are leaving the country in droves, citing lack of improving prospects.",
            weight: 2,
            rarity: "common",
            meta: { depth: 1, impact: 3, sentiment: "negative" },

            choices: [
                choice("Increase IT sector subsidies", {
                    effects: { treasury: -25, anger: -2, elite: 2 }
                }),
                choice("Close the borders for 'specialists'", {
                    effects: { anger: 10, elite: -5, personalWealth: 3 }
                }),
                choice("Institute strict 'Exit Visa' requirements", {
                    effects: { treasury: -5, elite: -10, anger: 15 }
                })
            ]
        }),

        event("university_protests", {
            title: "Student Unrest",
            description: "Students at the capital's top university are protesting against curriculum changes and lack of freedom.",
            weight: 3,
            rarity: "common",
            meta: { depth: 1, impact: 2, sentiment: "negative" },

            choices: [
                choice("Ignore them", {
                    effects: { anger: 2 }
                }),
                choice("Expel the ringleaders", {
                    effects: { anger: 5, elite: 1, personalWealth: 2 }
                }),
                choice("Meet with student leaders", {
                    effects: { anger: -2, elite: -2 }
                })
            ]
        }),

        event("arms_deal_opportunity", {
            title: "The African Market",
            description: "A regime in Central Africa wants to buy our older military hardware. They pay in gold and diamonds.",
            weight: 3,
            rarity: "common",
            meta: { depth: 1, impact: 3, sentiment: "neutral" },

            choices: [
                choice("Authorize the sale", {
                    effects: { treasury: 20, personalWealth: 12, elite: 5, anger: 15 }
                }),
                choice("Decline (International image)", {
                    effects: { elite: -5 }
                })
            ]
        }),

        event("infrastructure_project", {
            title: "The New Highway",
            description: "The Ministry of Transport proposes a new highway connecting the capital to the Urals. A massive project.",
            weight: 3,
            rarity: "common",
            meta: { depth: 1, impact: 4, sentiment: "positive" },

            choices: [
                choice("Approve (Rotenberg gets the contract)", {
                    effects: { treasury: -100, elite: 10, anger: 5, personalWealth: 8 },
                    legacy: { icon: "🛣️", name: "The Road Builder", weight: 5 }
                }),
                choice("Delay for budget reasons", {
                    effects: { elite: -5, anger: 2 }
                })
            ]
        }),

        event("official_residence", {
            title: "Renovations",
            description: "Your official residence by the Black Sea requires 'modernization'. Specifically, a new underground hockey rink.",
            weight: 5,
            rarity: "rare",
            meta: { depth: 1, impact: 1, sentiment: "positive" },

            choices: [
                choice("Spare no expense", {
                    effects: { treasury: -35, elite: 2, anger: 5 },
                    legacy: {
                        icon: "🏒",
                        name: "The Hockey Player",
                        weight: 0,
                        explanation: "Your hockey prowess is legendary. Your political skills, less so."
                    }
                }),
                choice("Modest repairs only", {
                    effects: { treasury: -2, elite: -2, anger: -1 }
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // PACING EVENTS - Fill quiet moments
        // ═══════════════════════════════════════════════════════════════

        event("quiet_quarter", {
            title: "A Quiet Quarter",
            description: "For once, nothing seems to be on fire. Your ministers are nervous—surely this calm cannot last.",
            weight: 1,
            recurring: false, // Non-recurring by default - choices can addSelf if needed
            rarity: "common",
            meta: { depth: 1, impact: 1, sentiment: "neutral" },

            choices: [
                choice("Enjoy the peace while it lasts", {
                    effects: { anger: -2, elite: 1 },
                    addSelf: true // Occasionally reappear
                }),
                choice("Something must be wrong. Investigate.", {
                    effects: { elite: -1, anger: 1 },
                    addSelf: true // Occasionally reappear
                })
            ]
        }),

        event("state_media_puff_piece", {
            title: "The Interview",
            description: "State television wants to air a flattering documentary about your life. Fishing trips, judo, the works.",
            weight: 4,
            rarity: "common",
            meta: { depth: 1, impact: 1, sentiment: "positive" },

            choices: [
                choice("Authorize the documentary", {
                    effects: { anger: -3, elite: 2, personalWealth: 1 }
                }),
                choice("Too busy with affairs of state", {
                    effects: { elite: -1 }
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // CORRUPTION & SCANDAL
        // ═══════════════════════════════════════════════════════════════

        event("corruption_investigation_leak", {
            title: "The Leaked Investigation",
            description: "A Navalny-style investigation has surfaced online, documenting a minister's lavish lifestyle. The video is going viral.",
            weight: 3,
            rarity: "rare",
            meta: { depth: 2, impact: 4, sentiment: "negative" },

            choices: [
                choice("Sacrifice the minister to public outrage", {
                    effects: { elite: -8, anger: -10, treasury: 5 }
                }),
                choice("Block all discussion of the video", {
                    effects: { anger: 12, elite: 5 }
                }),
                choice("Claim it's a Western fabrication", {
                    effects: { anger: 5, elite: 3 }
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // INTERNATIONAL RELATIONS
        // ═══════════════════════════════════════════════════════════════

        event("diplomatic_incident_minor", {
            title: "Embassy Spat",
            description: "A minor diplomatic incident: one of our diplomats was expelled for 'activities incompatible with diplomatic status'. Classic spy stuff.",
            weight: 2,
            rarity: "common",
            meta: { depth: 1, impact: 1, sentiment: "negative" },

            choices: [
                choice("Expel their diplomat in return", {
                    effects: { elite: 2, anger: -1 }
                }),
                choice("Let it slide", {
                    effects: { elite: -2, anger: 1 }
                })
            ]
        }),

        // ═══════════════════════════════════════════════════════════════
        // CELEBRATIONS & PERSONAL
        // ═══════════════════════════════════════════════════════════════

        event("birthday_celebration", {
            title: "Your Birthday",
            description: "It is your 70th birthday. The elite are gathering to pay homage and offer gifts.",
            weight: 3,
            rarity: "rare",
            meta: { depth: 1, impact: 2, sentiment: "positive" },

            choices: [
                choice("Accept the lavish gifts", {
                    effects: { personalWealth: 5, elite: 5, anger: 2 }
                }),
                choice("Ask for donations to the army", {
                    effects: { treasury: 5, anger: -2, elite: -2 }
                })
            ]
        })
    ]
});
