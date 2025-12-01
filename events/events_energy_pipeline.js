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
        }
];

