export const SUCCESSION_EVENTS = [
        {
            id: "oligarch_yacht_seized",
            title: "The Yacht Incident",
            description: "Your close ally, the Aluminum King, has had his $600M superyacht seized in Italy. He is demanding you compensate him from the state budget.",
            weight: 8,
            storyline: "oligarch-rivalry",
            rarity: "rare",
            choices: [
                {
                    text: "Compensate him fully",
                    effects: {
                        treasury: -50, // Expensive
                        elite: 10, // Buying loyalty
                        anger: 5 // People are hungry
                    },
                    addToPool: ["oligarch_greed_spiral"]
                },
                {
                    text: "Tell him to be a patriot",
                    effects: {
                        elite: -15, // Dangerous move
                        treasury: 0
                    },
                    addToPool: ["oligarch_plotting"]
                }
            ]
        },
        {
            id: "health_scare_rumors",
            title: "Trembling Hands",
            description: "A video of you gripping a table during a meeting has gone viral. Rumors of your ill health are spreading among the elite. The sharks are circling.",
            weight: 6,
            storyline: "succession-crisis",
            rarity: "epic",
            choices: [
                {
                    text: "Stage a judo match",
                    effects: {
                        elite: 5, // Show strength
                        anger: -2
                    },
                    addToPool: ["body_double_auditions"]
                },
                {
                    text: "Purge the 'disloyal' gossipers",
                    effects: {
                        elite: -10, // Fear
                        personalWealth: 5 // Seize their assets
                    },
                    addToPool: ["paranoia_increases"]
                }
            ]
        },
        {
            id: "oligarch_greed_spiral",
            title: "The Compensation Spiral",
            description: "Word has spread that you compensated the Aluminum King. Now every oligarch with seized assets is demanding the same treatment.",
            weight: 0,
            storyline: "oligarch-rivalry",
            rarity: "common",
            choices: [
                {
                    text: "Pay them all",
                    effects: {
                        treasury: -100,
                        elite: 10,
                        anger: 15
                    },
                    removeFromPool: ["oligarch_greed_spiral"]
                },
                {
                    text: "Refuse",
                    effects: {
                        elite: -10,
                        anger: 5
                    },
                    removeFromPool: ["oligarch_greed_spiral"]
                }
            ]
        },
        {
            id: "oligarch_plotting",
            title: "The Plot Thickens",
            description: "The Aluminum King's anger has spread. Other oligarchs are quietly discussing your removal. The sharks are circling.",
            weight: 0,
            storyline: "oligarch-rivalry",
            rarity: "epic",
            choices: [
                {
                    text: "Preemptively purge",
                    effects: {
                        elite: -15,
                        personalWealth: 20,
                        treasury: 10
                    },
                    removeFromPool: ["oligarch_plotting"]
                },
                {
                    text: "Try to buy loyalty",
                    effects: {
                        treasury: -50,
                        elite: 5
                    },
                    removeFromPool: ["oligarch_plotting"]
                }
            ]
        },
        {
            id: "body_double_auditions",
            title: "The Lookalike Search",
            description: "You've ordered your security services to find body doubles who can stand in for you at public events. The auditions are... interesting.",
            weight: 0,
            storyline: "succession-crisis",
            rarity: "rare",
            choices: [
                {
                    text: "Use them frequently",
                    effects: {
                        elite: -5,
                        anger: 5
                    },
                    removeFromPool: ["body_double_auditions"]
                },
                {
                    text: "Use them sparingly",
                    effects: {
                        elite: 2,
                        treasury: -10
                    },
                    removeFromPool: ["body_double_auditions"]
                }
            ]
        },
        {
            id: "paranoia_increases",
            title: "The Purge Begins",
            description: "Your paranoia has reached new heights. You're purging anyone who might have gossiped about your health. Fear spreads through the elite.",
            weight: 0,
            storyline: "succession-crisis",
            rarity: "epic",
            choices: [
                {
                    text: "Continue the purge",
                    effects: {
                        elite: -15,
                        personalWealth: 10,
                        anger: 10
                    },
                    removeFromPool: ["paranoia_increases"]
                },
                {
                    text: "Stop the purge",
                    effects: {
                        elite: 5,
                        anger: -5
                    },
                    removeFromPool: ["paranoia_increases"]
                }
            ]
        }
];

