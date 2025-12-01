export const ENERGY_EVENTS = [
        {
            id: "energy_price_spike",
            title: "Winter is Coming",
            description: "Global energy prices have spiked. Europe is desperate for gas. You have your hand on the valve.",
            weight: 8,
            storyline: "energy-politics",
            rarity: "rare",
            choices: [
                {
                    text: "Cut off the gas to Europe",
                    effects: {
                        treasury: -50, // Lost revenue
                        elite: 5, // "Sticking it to them"
                        anger: 5 // Domestic prices rise too?
                    },
                    addToPool: ["europe_freezes_propaganda", "budget_deficit_energy"],
                    legacy: { icon: "❄️", name: "The Coldmaker", weight: -5 }
                },
                {
                    text: "Sell at maximum price",
                    effects: {
                        treasury: 100, // Massive profit
                        personalWealth: 10, // Skim off top
                        elite: 5
                    },
                    addToPool: ["oligarch_bonus_payout"]
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
            choices: [
                {
                    text: "Blame Western spies",
                    effects: {
                        anger: -5, // Rally effect
                        elite: 2
                    },
                    addToPool: ["shadow_war_escalation"]
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
            choices: [
                {
                    text: "Amplify the propaganda",
                    effects: {
                        elite: 5,
                        anger: -3
                    },
                    removeFromPool: ["europe_freezes_propaganda"]
                },
                {
                    text: "Focus on domestic issues",
                    effects: {
                        anger: -2
                    },
                    removeFromPool: ["europe_freezes_propaganda"]
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
            choices: [
                {
                    text: "Raise domestic prices",
                    effects: {
                        treasury: 20,
                        anger: 10
                    },
                    removeFromPool: ["budget_deficit_energy"]
                },
                {
                    text: "Cut other spending",
                    effects: {
                        treasury: 10,
                        elite: -5
                    },
                    removeFromPool: ["budget_deficit_energy"]
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
            choices: [
                {
                    text: "Pay them handsomely",
                    effects: {
                        elite: 10,
                        treasury: -30,
                        personalWealth: -5
                    },
                    removeFromPool: ["oligarch_bonus_payout"]
                },
                {
                    text: "Keep more for yourself",
                    effects: {
                        personalWealth: 15,
                        elite: -5,
                        treasury: -10
                    },
                    removeFromPool: ["oligarch_bonus_payout"]
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
            choices: [
                {
                    text: "Escalate the shadow war",
                    effects: {
                        elite: 5,
                        treasury: -20,
                        anger: 5
                    },
                    removeFromPool: ["shadow_war_escalation"]
                },
                {
                    text: "De-escalate",
                    effects: {
                        elite: -3,
                        treasury: -10
                    },
                    removeFromPool: ["shadow_war_escalation"]
                }
            ]
        }
];

