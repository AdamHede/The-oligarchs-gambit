export const WAR_EVENTS = [
    {
        id: "war_special_operation_proposal",
        title: "Special Military Operation",
        description: "Your Generals present a plan for a 'quick' 72-hour intervention in a neighboring region. They promise it will boost your approval ratings and secure vital resources. Intelligence suggests the West is too weak to react.",
        weight: 10, // High priority to start
        storyline: "war-invasion",
        rarity: "rare",
        meta: {
            depth: 3,
            impact: 5,
            sentiment: "neutral"
        },
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
        meta: {
            depth: 4,
            impact: 5,
            sentiment: "negative"
        },
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
            },
            {
                text: "Declare victory and withdraw",
                effects: {
                    elite: -20, // Humiliating defeat
                    anger: -10, // Relief
                    treasury: 30 // Saved war costs
                },
                addToPool: ["frozen_conflict"],
                removeFromPool: ["war_goes_badly", "conscription_crisis", "equipment_shortages", "generals_plotting_coup", "rural_unrest", "border_exodus_brain_drain"]
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
        meta: {
            depth: 5,
            impact: 5,
            sentiment: "negative"
        },
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
    },
    {
        id: "rally_around_flag",
        title: "Patriotic Surge",
        description: "The initial operation has sparked a wave of nationalist sentiment. State media is flooded with patriotic programming.",
        weight: 3,
        storyline: "war-invasion",
        rarity: "common",
        meta: {
            depth: 4,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Capitalize on the momentum",
                effects: {
                    elite: 5,
                    anger: -5
                }
            }
        ]
    },
    {
        id: "generals_plotting_coup",
        title: "The Generals Are Restless",
        description: "Your rejection of the military operation has angered the top brass. Whispers of discontent are spreading through the officer corps.",
        weight: 5,
        storyline: "war-invasion",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Purge the disloyal",
                effects: {
                    elite: -10,
                    treasury: -20
                }
            },
            {
                text: "Offer them concessions",
                effects: {
                    treasury: -30,
                    elite: 5
                }
            }
        ]
    },
    {
        id: "equipment_shortages",
        title: "The Supply Crisis",
        description: "Your forces are running low on everything: ammunition, fuel, spare parts. The logistics chain has completely broken down.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        meta: {
            depth: 5,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Scramble to find supplies",
                effects: {
                    treasury: -50,
                    anger: 5
                },
                removeFromPool: ["equipment_shortages"]
            },
            {
                text: "Accept the shortages",
                effects: {
                    elite: -10,
                    anger: 10
                },
                removeFromPool: ["equipment_shortages"]
            }
        ]
    },
    {
        id: "general_fired_scapegoat",
        title: "A Scapegoat is Found",
        description: "You've publicly blamed a senior general for the military failures. He's been removed, but the problems remain.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        meta: {
            depth: 5,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Continue the operation",
                effects: {
                    elite: -5,
                    treasury: -30
                },
                removeFromPool: ["general_fired_scapegoat"]
            },
            {
                text: "Reassess strategy",
                effects: {
                    elite: 5,
                    anger: -5
                },
                removeFromPool: ["general_fired_scapegoat"]
            }
        ]
    },
    {
        id: "rural_unrest",
        title: "The Countryside Rises",
        description: "Rural communities are protesting the selective mobilization. They feel unfairly targeted by your policies.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        meta: {
            depth: 6,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Suppress the protests",
                effects: {
                    anger: 10,
                    elite: 2
                },
                removeFromPool: ["rural_unrest"]
            },
            {
                text: "Promise fair treatment",
                effects: {
                    anger: -5,
                    treasury: -10
                },
                removeFromPool: ["rural_unrest"]
            }
        ]
    },
    {
        id: "border_exodus_brain_drain",
        title: "The Great Exodus",
        description: "Massive numbers of educated professionals are fleeing across the borders. Universities and tech companies are emptying out.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "rare",
        meta: {
            depth: 6,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Close the borders",
                effects: {
                    anger: 15,
                    elite: -5
                },
                removeFromPool: ["border_exodus_brain_drain"]
            },
            {
                text: "Let them go",
                effects: {
                    treasury: -20,
                    elite: -10
                },
                removeFromPool: ["border_exodus_brain_drain"]
            }
        ]
    },
    {
        id: "frozen_conflict",
        title: "The Frozen Conflict",
        description: "The war is officially over, but the border region remains unstable. Skirmishes are common, but the massive drain on resources has stopped.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        meta: {
            depth: 5,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Maintain status quo",
                effects: {
                    treasury: -2, // Reduced from -5
                    elite: 0, // Removed penalty (was -1)
                    anger: 0
                },
                // Recur
                addToPool: ["frozen_conflict"]
            }
        ]
    }
];

