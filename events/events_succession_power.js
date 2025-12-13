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
                    treasury: -25,
                    elite: 20,   // 2x from 10
                    anger: 6     // 2x from 3
                },
                add: ["oligarch_greed_spiral"]
            },
            {
                text: "Tell him to be a patriot—you'll 'safeguard' his domestic assets",
                effects: {
                    elite: -30,  // 2x from -15
                    treasury: 0,
                    personalWealth: 15,  // Increased from 10
                    anger: 16    // 2x from 8
                },
                add: ["oligarch_plotting"]
            }
        ]
    },
    {
        id: "health_scare_rumors",
        title: "Trembling Hands",
        description: "A video of you gripping a table during a meeting has gone viral. Rumors of your ill health are spreading among the elite. The sharks are circling. Their sudden 'retirements' could come with asset seizures for 'tax irregularities'...",
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
                    elite: 10,   // 2x from 5
                    anger: -4    // 2x from -2
                },
                add: ["body_double_auditions"]
            },
            {
                text: "Purge the 'disloyal' gossipers",
                effects: {
                    elite: -20,  // 2x from -10
                    personalWealth: 10  // Increased from 5
                },
                add: ["paranoia_increases"]
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
                    treasury: -150,
                    elite: 20,   // 2x from 10
                    anger: 30    // 2x from 15
                },
                remove: ["oligarch_greed_spiral"]
            },
            {
                text: "Refuse",
                effects: {
                    elite: -10,  // 2x from -5
                    anger: 0
                },
                remove: ["oligarch_greed_spiral"]
            },
            {
                text: "Pay them... through your offshore trust (pocket the 'admin fee')",
                effects: {
                    treasury: -50,
                    elite: 10,   // 2x from 5
                    personalWealth: 20,  // Increased from 15
                    anger: 10    // 2x from 5
                },
                legacy: { icon: "🎩", name: "The Middleman", weight: 10 },
                remove: ["oligarch_greed_spiral"]
            }
        ]
    },
    {
        id: "oligarch_plotting",
        title: "The Plot Thickens",
        description: "The Aluminum King's anger has spread. Other oligarchs are quietly discussing your removal. The plotters' combined assets exceed $40 billion. After show trials, it could all be yours.",
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
                    elite: -40,  // 2x from -20
                    personalWealth: 30,  // Increased from 20
                    treasury: 10,
                    anger: 20    // 2x from 10
                },
                remove: ["oligarch_plotting"],
                legacy: { icon: "🔪", name: "The Survivor", weight: 10, explanation: "You struck first against the plotters. Ruthless, but effective." }
            },
            {
                text: "Try to buy loyalty",
                effects: {
                    treasury: -70,
                    elite: 10    // 2x from 5
                },
                remove: ["oligarch_plotting"]
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
                    elite: -10,  // 2x from -5
                    anger: 10    // 2x from 5
                },
                remove: ["body_double_auditions"]
            },
            {
                text: "Use them sparingly",
                effects: {
                    elite: 4,    // 2x from 2
                    treasury: -10,
                    personalWealth: 3  // Added - save on security costs
                },
                remove: ["body_double_auditions"]
            }
        ]
    },
    {
        id: "paranoia_increases",
        title: "The Purge Begins",
        description: "Your paranoia has reached new heights. You're purging anyone who might have gossiped about your health. Each purged oligarch's fortune flows directly into your Swiss accounts.",
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
                    elite: -30,  // 2x from -15
                    personalWealth: 30,  // Increased from 20
                    anger: 24    // 2x from 12
                },
                remove: ["paranoia_increases"],
                legacy: { icon: "👑", name: "The Mad King", weight: 15, explanation: "Your paranoia consumed all reason. The purges will be remembered." }
            },
            {
                text: "Stop the purge",
                effects: {
                    elite: 10,   // 2x from 5
                    anger: -10   // 2x from -5
                },
                add: ["oligarch_plotting"],
                remove: ["paranoia_increases"]
            }
        ]
    },
    {
        id: "oligarch_defection",
        title: "The Banker Flees",
        description: "Your former personal banker has fled to London. He's threatening to release documents about your offshore accounts unless you guarantee his safety. His local properties and Swiss account passwords are still accessible...",
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
                    elite: -20,  // 2x from -10
                    anger: -4,   // 2x from -2
                    treasury: -10,
                    personalWealth: 5  // Added - he knew where the bodies are buried
                },
                add: ["sanctions_human_rights"]
            },
            {
                text: "Let him go",
                effects: {
                    elite: -10,  // 2x from -5
                    anger: 10    // 2x from 5
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
                text: "Back the Siloviki—they'll expedite your 'private contracts' abroad",
                effects: {
                    elite: -10,  // 2x from -5
                    anger: 10,   // 2x from 5
                    treasury: -20,
                    personalWealth: 10  // 2x from 5
                },
                add: ["paranoia_increases"],
                legacy: { icon: "👮", name: "The Strongman", weight: 5, explanation: "You sided with the security services. Order through strength." }
            },
            {
                text: "Back the Liberals",
                effects: {
                    elite: -10,  // 2x from -5
                    treasury: 10,
                    anger: -4    // 2x from -2
                },
                add: ["generals_plotting_coup"],
                legacy: { icon: "📈", name: "The Reformer", weight: 2, explanation: "You backed the liberals. Perhaps there's hope for reform yet." }
            }
        ]
    }
];
