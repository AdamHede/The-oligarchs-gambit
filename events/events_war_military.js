export const WAR_EVENTS = [
        {
            id: "war_special_operation_proposal",
            title: "Special Military Operation",
            description: "Your Generals present a plan for a 'quick' 72-hour intervention in a neighboring region. They promise it will boost your approval ratings and secure vital resources. Intelligence suggests the West is too weak to react.",
            weight: 10, // High priority to start
            storyline: "war-invasion",
            rarity: "rare",
            choices: [
                {
                    text: "Authorize the operation",
                    effects: {
                        personalWealth: 5, // War chest skimming
                        treasury: -50,
                        elite: 10, // Generals are happy
                        anger: 5
                    },
                    addToPool: ["war_goes_badly", "sanctions_initial_wave", "rally_around_flag"],
                    legacy: { icon: "⚔️", name: "The Invader", weight: -10 }
                },
                {
                    text: "Reject the plan",
                    effects: {
                        elite: -10, // Generals are furious
                        treasury: 5, // Saved money
                        anger: -5
                    },
                    addToPool: ["generals_plotting_coup"],
                    legacy: { icon: "🕊️", name: "The Peacemaker", weight: 5 }
                }
            ]
        },
        {
            id: "war_goes_badly",
            title: "The 72-Hour Quagmire",
            description: "It has been three weeks. The '72-hour' operation has stalled. Logistics are a nightmare, and your tanks are running out of fuel. The Generals are blaming each other.",
            weight: 0, // Triggered only
            storyline: "war-invasion",
            rarity: "common",
            choices: [
                {
                    text: "Double down: Mobilize more troops",
                    effects: {
                        treasury: -100,
                        anger: 15, // Unpopular
                        elite: 5
                    },
                    addToPool: ["conscription_crisis", "equipment_shortages"],
                    removeFromPool: ["war_goes_badly"]
                },
                {
                    text: "Pull back and regroup",
                    effects: {
                        elite: -15, // Perceived weakness
                        anger: -5
                    },
                    addToPool: ["general_fired_scapegoat"],
                    removeFromPool: ["war_goes_badly"]
                }
            ]
        },
        {
            id: "conscription_crisis",
            title: "Partial Mobilization",
            description: "To sustain the war effort, you need more bodies. Announcing mobilization will be deeply unpopular, especially among the urban youth.",
            weight: 0,
            storyline: "war-invasion",
            rarity: "rare",
            choices: [
                {
                    text: "Mobilize the rural poor only",
                    effects: {
                        treasury: -20,
                        anger: 5, // Urban elite don't care
                        elite: 0
                    },
                    addToPool: ["rural_unrest"],
                    removeFromPool: ["conscription_crisis"]
                },
                {
                    text: "General mobilization",
                    effects: {
                        treasury: -50,
                        anger: 25, // Everyone is mad
                        elite: 5
                    },
                    addToPool: ["border_exodus_brain_drain"],
                    removeFromPool: ["conscription_crisis"]
                }
            ]
        }
];

