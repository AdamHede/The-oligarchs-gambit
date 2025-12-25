/**
 * Popular Uprising Storyline
 *
 * Theme: Mass protests, opposition movements, and the response to dissent.
 * The player must balance repression with the risk of martyrdom.
 */

import { defineStoryline, event, choice, eventRef } from '../engine/storyline-dsl.js';

export default defineStoryline({
    id: "popular-uprising",
    name: "Popular Uprising",
    description: "Mass movements threaten your grip on power",
    theme: {
        borderColor: "#8B0000",
        accentColor: "#FF4500"
    },

    tree: event("navalny_style_investigation", {
        title: "The Golden Toilet Brush",
        description: "A popular opposition blogger has released a drone video of your secret palace. It features an aqua-disco, a hookah lounge, and a $700 toilet brush. It has 100 million views.",
        weight: 8,
        rarity: "legendary",
        meta: { depth: 1, impact: 4, sentiment: "negative" },

        choices: [
            choice("Claim it belongs to your friend", {
                effects: { elite: 5, anger: 5 },

                unlocks: [
                    event("palace_denial_memes", {
                        title: "Internet Memes",
                        description: "The internet has turned your palace denial into a viral meme. Every social media platform is flooded with jokes about your 'friend's' golden toilet brush.",
                        weight: 0,
                        rarity: "common",
                        meta: { depth: 2, impact: 2, sentiment: "positive" },

                        choices: [
                            choice("Ignore the memes", {
                                effects: { anger: 5, elite: -2 }
                            }),
                            choice("Try to suppress them", {
                                effects: { anger: 10, elite: -5 }
                            })
                        ]
                    })
                ]
            }),

            choice("Arrest the blogger", {
                effects: { anger: 15, elite: 5 },

                unlocks: [
                    event("mass_protests_blogger", {
                        title: "Snow Revolution",
                        description: "Thousands are in the streets demanding your resignation. They are throwing snowballs at the riot police.",
                        weight: 0,
                        rarity: "epic",
                        meta: { depth: 2, impact: 5, sentiment: "negative" },

                        choices: [
                            choice("Crack down hard", {
                                effects: { anger: 8, elite: -5, personalWealth: 8 },

                                unlocks: [
                                    event("bloody_sunday_scenario", {
                                        title: "The Crackdown",
                                        description: "Your security forces have used excessive force against the protesters. Images of violence are spreading globally, sparking international condemnation.",
                                        weight: 0,
                                        rarity: "epic",
                                        meta: { depth: 3, impact: 5, sentiment: "negative" },

                                        choices: [
                                            choice("Double down and crush them", {
                                                effects: { anger: -15, elite: -15, treasury: -75, personalWealth: 10 },
                                                legacy: { icon: "💀", name: "The Butcher", weight: 20 },
                                                unlocks: [eventRef("sanctions_human_rights")]
                                            }),
                                            choice("Back down", {
                                                effects: { elite: -20, anger: -5 }
                                            })
                                        ]
                                    })
                                ]
                            }),

                            choice("Wait it out", {
                                effects: { elite: -10, anger: -5 },

                                unlocks: [
                                    event("emboldened_opposition", {
                                        title: "Opposition Grows Stronger",
                                        description: "Your hesitation to crack down has been interpreted as weakness. The opposition is organizing more effectively and demanding more.",
                                        weight: 0,
                                        rarity: "common",
                                        meta: { depth: 3, impact: 3, sentiment: "negative" },

                                        choices: [
                                            choice("Bribe their leaders", {
                                                effects: { treasury: -20, elite: -2, anger: -2 }
                                            }),
                                            choice("Let them march", {
                                                effects: { anger: 10, elite: -5 },
                                                unlocks: [eventRef("mass_protests_blogger")]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),

                    event("sanctions_human_rights", {
                        title: "Human Rights Sanctions",
                        description: "Western nations have imposed personal sanctions on you and your inner circle. Your foreign assets are frozen, and travel bans are in place.",
                        weight: 0,
                        rarity: "rare",
                        meta: { depth: 2, impact: 3, sentiment: "negative" },

                        choices: [
                            choice("Defy the sanctions", {
                                effects: { elite: 5, treasury: -10, anger: 8, personalWealth: 5 }
                            }),
                            choice("Try to negotiate", {
                                effects: { elite: -5, personalWealth: -5, treasury: 20 }
                            })
                        ]
                    })
                ]
            })
        ]
    })
});
