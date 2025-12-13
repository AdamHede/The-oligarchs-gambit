export const ENERGY_EVENTS = [
    {
        id: "energy_price_spike",
        title: "Winter is Coming",
        description: "Global energy prices have spiked. Europe is desperate for gas. You have your hand on the valve.",
        weight: 8,
        storyline: "energy-politics",
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Cut off the gas to Europe",
                effects: {
                    treasury: -50, // Lost revenue
                    elite: 10, // Geopolitical power move (reduced from 15)
                    anger: 5 // Domestic prices rise too?
                },
                add: ["europe_freezes_propaganda", "budget_deficit_energy", "counter_sanctions_energy"],
                legacy: { icon: "❄️", name: "The Coldmaker", weight: -5, explanation: "You cut off gas supplies to freeze Europe. They won't forget." }
            },
            {
                text: "Sell at maximum price",
                effects: {
                    treasury: 100, // Massive profit
                    personalWealth: 10, // Skim off top
                    elite: 3,
                    anger: 15 // Increased from 8 - people pay more too, prices spike
                },
                add: ["oligarch_bonus_payout", "inflation_crisis"] // Money supply expands
            }
        ]
    },
    {
        id: "pipeline_sabotage",
        title: "Pipeline Mystery",
        description: "One of your major undersea pipelines has exploded. No one knows who did it, but everyone is pointing fingers.",
        weight: 4,
        storyline: "energy-politics",
        rarity: "epic",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Blame Western spies",
                effects: {
                    anger: -5, // Rally effect
                    elite: 2
                },
                add: ["shadow_war_escalation"]
            },
            {
                text: "Quietly repair it",
                effects: {
                    treasury: -40,
                    personalWealth: -2
                }
            }
        ]
    },
    {
        id: "europe_freezes_propaganda",
        title: "Winter of Discontent",
        description: "Europe is freezing without your gas. State media is broadcasting images of cold Europeans while your people stay warm. The propaganda value is immense.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Amplify the propaganda",
                effects: {
                    elite: 3, // Reduced from 5
                    anger: -3
                },
                add: ["counter_sanctions_energy"], // Risk
                remove: ["europe_freezes_propaganda"]
            },
            {
                text: "Focus on domestic issues",
                effects: {
                    anger: -2
                },
                remove: ["europe_freezes_propaganda"]
            }
        ]
    },
    {
        id: "budget_deficit_energy",
        title: "The Energy Budget Hole",
        description: "Cutting off gas sales has created a massive hole in your budget. The treasury is bleeding money.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Raise domestic prices",
                effects: {
                    treasury: 20,
                    anger: 10,
                    personalWealth: 3 // Price increase markup goes to your distributors
                },
                remove: ["budget_deficit_energy"]
            },
            {
                text: "Cut other spending",
                effects: {
                    treasury: 10,
                    elite: -5
                },
                remove: ["budget_deficit_energy"]
            }
        ]
    },
    {
        id: "oligarch_bonus_payout",
        title: "The Bonus Season",
        description: "The massive energy profits have triggered bonus season for your inner circle. They're expecting their cut.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Pay them handsomely",
                effects: {
                    elite: 10,
                    treasury: -70, // Increased from -50
                    personalWealth: -5,
                    anger: 5 // Added - public sees favoritism
                },
                remove: ["oligarch_bonus_payout"]
            },
            {
                text: "Keep more for yourself",
                effects: {
                    personalWealth: 20, // Fatter cut
                    elite: -8, // Increased from -5
                    treasury: -10,
                    anger: 8 // Added - word gets out
                },
                remove: ["oligarch_bonus_payout"],
                legacy: { icon: "💰", name: "The Greedy", weight: -10 }
            }
        ]
    },
    {
        id: "counter_sanctions_energy",
        title: "Energy Cap",
        description: "Western nations have agreed on a price cap for your energy exports. Revenues are plummeting despite your threats.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Stop selling to them",
                effects: {
                    treasury: -30, // Revenue loss
                    elite: 2,
                    anger: 5
                },
                add: ["budget_deficit_energy"],
                remove: ["counter_sanctions_energy"]
            },
            {
                text: "Sell through intermediaries",
                effects: {
                    treasury: -10, // Middlemen take a cut
                    elite: -2 // Look weak
                },
                remove: ["counter_sanctions_energy"]
            }
        ]
    },
    {
        id: "shadow_war_escalation",
        title: "The Shadow War Intensifies",
        description: "Attributing the pipeline sabotage to Western spies has escalated tensions. Covert operations are increasing on both sides.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "neutral"
        },
        choices: [
            {
                text: "Escalate the shadow war",
                effects: {
                    elite: 5,
                    treasury: -20,
                    anger: 5
                },
                remove: ["shadow_war_escalation"]
            },
            {
                text: "De-escalate",
                effects: {
                    elite: -3,
                    treasury: -10
                },
                remove: ["shadow_war_escalation"]
            }
        ]
    }
];
