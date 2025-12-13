export const ENERGY_EVENTS = [
    {
        id: "energy_price_spike",
        title: "Winter is Coming",
        description: "Global energy prices have spiked. Europe is desperate for gas. You have your hand on the valve. Gazprom's 'special trading subsidiary'—your offshore shell company—takes a 2% cut on every transaction.",
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
                    treasury: -50,
                    elite: 20,   // 2x from 10
                    anger: 10    // 2x from 5
                },
                add: ["europe_freezes_propaganda", "budget_deficit_energy", "counter_sanctions_energy"],
                legacy: { icon: "❄️", name: "The Coldmaker", weight: -5, explanation: "You cut off gas supplies to freeze Europe. They won't forget." }
            },
            {
                text: "Sell at maximum price",
                effects: {
                    treasury: 100,
                    personalWealth: 15,  // Increased from 10
                    elite: 6,    // 2x from 3
                    anger: 30    // 2x from 15
                },
                add: ["oligarch_bonus_payout", "inflation_crisis"]
            }
        ]
    },
    {
        id: "pipeline_sabotage",
        title: "Pipeline Mystery",
        description: "One of your major undersea pipelines has exploded. No one knows who did it, but everyone is pointing fingers. The insurance payout is generous—routed through your personal reinsurance scheme.",
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
                    anger: -10,  // 2x from -5
                    elite: 4,    // 2x from 2
                    personalWealth: 5  // Added - insurance fraud
                },
                add: ["shadow_war_escalation"]
            },
            {
                text: "Quietly repair it",
                effects: {
                    treasury: -40,
                    personalWealth: -4  // 2x from -2
                }
            }
        ]
    },
    {
        id: "europe_freezes_propaganda",
        title: "Winter of Discontent",
        description: "Europe is freezing without your gas. State media is broadcasting images of cold Europeans while your people stay warm. Your daughter's production company handles the 'documentary' contracts.",
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
                    elite: 6,    // 2x from 3
                    anger: -6,   // 2x from -3
                    personalWealth: 3  // Added - media budget skimming
                },
                add: ["counter_sanctions_energy"],
                remove: ["europe_freezes_propaganda"]
            },
            {
                text: "Focus on domestic issues",
                effects: {
                    anger: -4    // 2x from -2
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
                text: "Raise domestic prices—your trading desk profits from the volatility",
                effects: {
                    treasury: 20,
                    anger: 20,   // 2x from 10
                    personalWealth: 6  // 2x from 3
                },
                remove: ["budget_deficit_energy"]
            },
            {
                text: "Cut other spending",
                effects: {
                    treasury: 10,
                    elite: -10   // 2x from -5
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
        image: "assets/images/events/oligarch_bonus_payout.png",
        choices: [
            {
                text: "Pay them handsomely",
                effects: {
                    elite: 20,   // 2x from 10
                    treasury: -70,
                    personalWealth: -5,
                    anger: 10    // 2x from 5
                },
                remove: ["oligarch_bonus_payout"]
            },
            {
                text: "Keep more for yourself",
                effects: {
                    personalWealth: 30,  // Increased from 20
                    elite: -16,  // 2x from -8
                    treasury: -10,
                    anger: 16    // 2x from 8
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
                    treasury: -30,
                    elite: 4,    // 2x from 2
                    anger: 10    // 2x from 5
                },
                add: ["budget_deficit_energy"],
                remove: ["counter_sanctions_energy"]
            },
            {
                text: "Sell through intermediaries",
                effects: {
                    treasury: -10,
                    elite: -4,   // 2x from -2
                    personalWealth: 5  // Added - middleman fees
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
                    elite: 10,   // 2x from 5
                    treasury: -20,
                    anger: 10    // 2x from 5
                },
                remove: ["shadow_war_escalation"]
            },
            {
                text: "De-escalate",
                effects: {
                    elite: -6,   // 2x from -3
                    treasury: -10
                },
                remove: ["shadow_war_escalation"]
            }
        ]
    }
];
