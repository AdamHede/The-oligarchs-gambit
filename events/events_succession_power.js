export const SUCCESSION_EVENTS = [
    {
        id: "oligarch_yacht_seized",
        title: "The Yacht Incident",
        description: "Your close ally, the Aluminum King, has had his $600M superyacht seized in Italy. He is demanding you compensate him from the state budget.",
        weight: 8,
        storyline: "oligarch-rivalry",
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Compensate him fully",
                effects: {
                    treasury: -70,
                    elite: 10,
                    anger: 3 // Reduced from 8 - this is the balanced choice
                },
                addToPool: ["oligarch_greed_spiral"]
            },
            {
                text: "Tell him to be a patriot",
                effects: {
                    elite: -15,
                    treasury: 0,
                    personalWealth: 10, // Greedy bait
                    anger: 8 // High - greedy penalty
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
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "negative"
        },
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
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Pay them all",
                effects: {
                    treasury: -150, // Increased from -100 (depth 2 = 1.5x)
                    elite: 10,
                    anger: 15 // Increased from 10
                },
                removeFromPool: ["oligarch_greed_spiral"]
            },
            {
                text: "Refuse",
                effects: {
                    elite: -5,
                    anger: 0
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
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Preemptively purge",
                effects: {
                    elite: -20, // Increased from -15
                    personalWealth: 20,
                    treasury: 10,
                    anger: 10 // Added - purges create fear and resentment
                },
                removeFromPool: ["oligarch_plotting"]
            },
            {
                text: "Try to buy loyalty",
                effects: {
                    treasury: -70, // Increased from -50 (depth 2 = 1.4x)
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
        meta: {
            depth: 2,
            impact: 2,
            sentiment: "negative"
        },
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
        meta: {
            depth: 2,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Continue the purge",
                effects: {
                    elite: -15, // Increased from -10
                    personalWealth: 20, // Seized assets
                    anger: 12 // Increased from 5 - fear and resentment spread
                },
                removeFromPool: ["paranoia_increases"]
            },
            {
                text: "Stop the purge",
                effects: {
                    elite: 5,
                    anger: -5
                },
                addToPool: ["oligarch_plotting"], // Mercy is weakness
                removeFromPool: ["paranoia_increases"]
            }
        ]
    },
    {
        id: "oligarch_defection",
        title: "The Banker Flees",
        description: "Your former personal banker has fled to London. He is threatening to release documents about your offshore accounts unless you guarantee his safety.",
        weight: 6,
        storyline: "oligarch-rivalry",
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Send the agents",
                effects: {
                    elite: -10, // Everyone is scared
                    anger: -2, // Traitors punished
                    treasury: -10
                },
                addToPool: ["sanctions_human_rights"] // Getting caught
            },
            {
                text: "Let him go",
                effects: {
                    elite: -5, // Weakness
                    anger: 5 // Corruption exposed
                }
            }
        ]
    },
    {
        id: "palace_intrigue",
        title: "War of the Towers",
        description: "The 'Siloviki' (security services) and the 'Liberals' (economic bloc) are openly fighting for control over the budget. You must choose a side.",
        weight: 6,
        storyline: "succession-crisis",
        rarity: "common",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "neutral"
        },
        choices: [
            {
                text: "Back the Siloviki",
                effects: {
                    elite: -5, // Liberals unhappy
                    anger: 5, // More repression
                    treasury: -20 // Security budget increase
                },
                addToPool: ["paranoia_increases"]
            },
            {
                text: "Back the Liberals",
                effects: {
                    elite: -5, // Siloviki unhappy
                    treasury: 10, // Better economic management
                    anger: -2
                },
                addToPool: ["generals_plotting_coup"]
            }
        ]
    }
];
