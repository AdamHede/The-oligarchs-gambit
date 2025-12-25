/**
 * Religious Revival Storyline
 *
 * Theme: The weaponization of the Orthodox Church for political ends.
 * Starts with cynical use of religion and can escalate to full theocratic madness.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "religious-revival",
    name: "Religious Revival",
    description: "The Church becomes a tool of state power",
    theme: {
        borderColor: "#614126",
        accentColor: "#8B6914"
    },

    tree: event("religious_revival_initial_blessing", {
        title: "The Patriarch's Blessing",
        description: "Your approval ratings are slipping. A public blessing from the Patriarch could shore up support among the rural base, but the urban intelligentsia will see it as a cynical ploy.",
        weight: 10,
        rarity: "common",
        meta: { depth: 1, impact: 3, sentiment: "positive" },

        choices: [
            choice("Accept the blessing with pomp", {
                effects: { anger: -5, elite: 5, treasury: -5 },
                legacy: {
                    icon: "🙏",
                    name: "The Pious",
                    weight: 5,
                    explanation: "You publicly embraced the faith. God and the Patriarch are on your side."
                },

                unlocks: [
                    // Cathedral Construction
                    event("cathedral_construction", {
                        title: "The Cathedral of War",
                        description: "The Defense Minister wants to build a massive cathedral dedicated to the armed forces. It will feature mosaics of angels with kalashnikovs and stairs made from melted down German tanks.",
                        weight: 0,
                        rarity: "rare",
                        meta: { depth: 2, impact: 3, sentiment: "positive" },

                        choices: [
                            choice("Build it. Make it grand.", {
                                effects: { treasury: -75, elite: 10, anger: 8, personalWealth: 10 },
                                legacy: {
                                    icon: "⛪",
                                    name: "The Architect of Faith",
                                    weight: 10,
                                    explanation: "You built grand churches to glorify... yourself, mostly."
                                },

                                unlocks: [
                                    event("patriarch_blessing_nukes", {
                                        title: "Holy Water on the Satan-2",
                                        description: "A surreal ceremony is proposed: The Patriarch wants to bless your new intercontinental ballistic missiles with holy water on live TV.",
                                        weight: 0,
                                        rarity: "rare",
                                        meta: { depth: 3, impact: 4, sentiment: "neutral" },

                                        choices: [
                                            choice("Proceed with the ceremony", {
                                                effects: { anger: 5, elite: 5 },

                                                unlocks: [
                                                    event("holy_war_declaration", {
                                                        title: "Deus Vult",
                                                        description: "The Church is now fully integrated into the war effort, declaring the conflict a 'Holy War' against Satanists in the West. It boosts recruitment but terrifies the educated class.",
                                                        weight: 0,
                                                        rarity: "rare",
                                                        meta: { depth: 4, impact: 5, sentiment: "negative" },

                                                        choices: [
                                                            choice("Embrace the Holy War", {
                                                                effects: { anger: 15, elite: 10, personalWealth: 8 },
                                                                legacy: {
                                                                    icon: "✝️",
                                                                    name: "The Crusader",
                                                                    weight: 10,
                                                                    explanation: "You weaponized religion for the state. The Patriarch approves."
                                                                }
                                                            }),
                                                            choice("Tone it down", {
                                                                effects: { elite: -10 }
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            choice("Too crazy, even for us", {
                                                effects: { elite: -5 }
                                            })
                                        ]
                                    })
                                ]
                            }),

                            choice("Build a hospital instead", {
                                effects: { treasury: -30, anger: -10, elite: -10 }
                            })
                        ]
                    }),

                    // Anti-LGBT Law
                    event("anti_lgbt_law_church_demand", {
                        title: "The Values Campaign",
                        description: "The Church is demanding a strict new law banning 'non-traditional relationships' to purify the nation's soul and distract from the inflation rate.",
                        weight: 0,
                        rarity: "common",
                        meta: { depth: 2, impact: 3, sentiment: "negative" },

                        choices: [
                            choice("Pass the law", {
                                effects: { anger: -5, elite: 5 },

                                unlocks: [
                                    event("church_western_backlash", {
                                        title: "The Schism",
                                        description: "Your 'Values Campaign' and war rhetoric have caused the Orthodox churches in neighboring countries to break communication with Moscow.",
                                        weight: 0,
                                        rarity: "rare",
                                        meta: { depth: 3, impact: 3, sentiment: "negative" },

                                        choices: [
                                            choice("Condemn them as heretics", {
                                                effects: { anger: 5, elite: 5 },

                                                unlocks: [
                                                    event("inquisition_cultural_purge", {
                                                        title: "The Cultural Inquisition",
                                                        description: "Zealots are now demanding a purge of all 'foreign agents' from theaters, universities, and galleries. They want to burn books.",
                                                        weight: 0,
                                                        rarity: "rare",
                                                        meta: { depth: 4, impact: 4, sentiment: "negative" },

                                                        choices: [
                                                            choice("Let them purge", {
                                                                effects: { anger: 20, elite: 5, personalWealth: 15 },
                                                                legacy: {
                                                                    icon: "🔥",
                                                                    name: "The Inquisitor",
                                                                    weight: 15,
                                                                    explanation: "You burned the heretics. Medieval, but effective."
                                                                }
                                                            }),
                                                            choice("Protect the culture", {
                                                                effects: { elite: -15 }
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            choice("Try to reconcile", {
                                                effects: { elite: -10 }
                                            })
                                        ]
                                    }),

                                    event("patriarch_scandal", {
                                        title: "The Disappearing Watch",
                                        description: "Bloggers have noticed that a photo of the Patriarch was edited to remove a $30,000 Breguet watch, but they forgot to remove the reflection on the table. It's a viral embarrassment.",
                                        weight: 0,
                                        rarity: "common",
                                        meta: { depth: 3, impact: 2, sentiment: "negative" },

                                        choices: [
                                            choice("Censor the internet", {
                                                effects: { treasury: -10, anger: 10 }
                                            }),
                                            choice("Ignore it", {
                                                effects: { elite: -5 }
                                            })
                                        ]
                                    })
                                ]
                            }),

                            choice("Shelve the proposal", {
                                effects: { elite: -5 }
                            })
                        ]
                    })
                ]
            }),

            choice("Decline, keep state secular", {
                effects: { anger: 5, elite: -5 }
                // No chain - storyline not activated
            })
        ]
    })
});
