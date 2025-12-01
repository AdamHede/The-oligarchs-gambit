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
        }
];

