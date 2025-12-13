export const WAR_EVENTS = [
    {
        id: "war_special_operation_proposal",
        title: "Special Military Operation",
        description: "Your Generals present a plan for a 'quick' 72-hour intervention in a neighboring region. They promise it will boost your approval ratings and secure vital resources. The Defense Minister hints that certain 'logistics contracts' could be routed through your Cyprus holding company.",
        weight: 10,
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
                    personalWealth: 10,  // Increased from 5
                    treasury: -50,
                    elite: 20,   // 2x from 10
                    anger: 10    // 2x from 5
                },
                add: ["war_goes_badly", "sanctions_initial_wave", "rally_around_flag"],
                legacy: { icon: "⚔️", name: "The Invader", weight: -10, explanation: "You launched a full-scale invasion of a sovereign nation. History will not be kind." }
            },
            {
                text: "Reject the plan",
                effects: {
                    elite: -20,  // 2x from -10
                    treasury: 5,
                    anger: -10   // 2x from -5
                },
                add: ["generals_plotting_coup"],
                legacy: { icon: "🕊️", name: "The Peacemaker", weight: 5, explanation: "You chose diplomacy over war. A rare moment of restraint." }
            }
        ]
    },
    {
        id: "war_goes_badly",
        title: "The 72-Hour Quagmire",
        description: "It has been three weeks. The '72-hour' operation has stalled. Logistics are a nightmare, and your tanks are running out of fuel. Your brother-in-law's ammunition factory is working triple shifts at premium rates. The Generals are blaming each other.",
        weight: 0,
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
                    treasury: -150,
                    anger: 30,   // 2x from 15
                    elite: 10,   // 2x from 5
                    personalWealth: 10  // Increased from 5
                },
                add: ["conscription_crisis", "equipment_shortages"],
                remove: ["war_goes_badly"]
            },
            {
                text: "Pull back and regroup",
                effects: {
                    elite: -30,  // 2x from -15
                    anger: -10   // 2x from -5
                },
                add: ["general_fired_scapegoat"],
                remove: ["war_goes_badly"]
            },
            {
                text: "Declare victory and withdraw",
                effects: {
                    elite: -40,  // 2x from -20
                    anger: -20,  // 2x from -10
                    treasury: 30
                },
                add: ["frozen_conflict"],
                remove: ["war_goes_badly", "conscription_crisis", "equipment_shortages", "generals_plotting_coup", "rural_unrest", "border_exodus_brain_drain"],
                legacy: { icon: "🐈", name: "The Paper Tiger", weight: -10, explanation: "Your military threats proved hollow. The world saw through your bluff." }
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
                text: "Mobilize the rural poor only—your nephews are exempt",
                effects: {
                    treasury: -20,
                    anger: 10,   // 2x from 5
                    elite: 0,
                    personalWealth: 10  // Increased from 5
                },
                add: ["rural_unrest"],
                remove: ["conscription_crisis"],
                legacy: { icon: "👑", name: "The Class Divider", weight: -5 }
            },
            {
                text: "General mobilization",
                effects: {
                    treasury: -80,
                    anger: 50,   // 2x from 25
                    elite: 10,   // 2x from 5
                    personalWealth: 6  // 2x from 3
                },
                add: ["border_exodus_brain_drain"],
                remove: ["conscription_crisis"]
            }
        ]
    },
    {
        id: "rally_around_flag",
        title: "Patriotic Surge",
        description: "The initial operation has sparked a wave of nationalist sentiment. Patriotic merchandise sales are soaring—your daughter's company has the exclusive license. State media is flooded with 'Z' imagery.",
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
                    elite: 10,   // 2x from 5
                    anger: -10,  // 2x from -5
                    personalWealth: 10  // Increased from 5
                }
            }
        ]
    },
    {
        id: "generals_plotting_coup",
        title: "The Generals Are Restless",
        description: "Your rejection of the military operation has angered the top brass. Whispers of discontent are spreading through the officer corps. Their mansions and yachts could be seized under the anti-corruption statute...",
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
                    elite: -20,  // 2x from -10
                    treasury: -20,
                    personalWealth: 10  // Added - seized assets
                }
            },
            {
                text: "Offer them concessions",
                effects: {
                    treasury: -30,
                    elite: 10    // 2x from 5
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
                text: "Scramble to find supplies—award contracts to loyal friends",
                effects: {
                    treasury: -80,
                    anger: 16,   // 2x from 8
                    personalWealth: 5  // Added - supply contract kickbacks
                },
                remove: ["equipment_shortages"]
            },
            {
                text: "Accept the shortages",
                effects: {
                    elite: -20,  // 2x from -10
                    anger: 20    // 2x from 10
                },
                remove: ["equipment_shortages"]
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
                text: "Continue the operation—his vacation villa now funds the war",
                effects: {
                    elite: -10,  // 2x from -5
                    treasury: -30,
                    personalWealth: 5  // Added - general's seized villa
                },
                remove: ["general_fired_scapegoat"]
            },
            {
                text: "Reassess strategy",
                effects: {
                    elite: 10,   // 2x from 5
                    anger: -10   // 2x from -5
                },
                remove: ["general_fired_scapegoat"]
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
                    anger: 20,   // 2x from 10
                    elite: 4     // 2x from 2
                },
                remove: ["rural_unrest"]
            },
            {
                text: "Promise fair treatment",
                effects: {
                    anger: -10,  // 2x from -5
                    treasury: -10
                },
                remove: ["rural_unrest"]
            }
        ]
    },
    {
        id: "border_exodus_brain_drain",
        title: "The Great Exodus",
        description: "Massive numbers of educated professionals are fleeing across the borders. Universities and tech companies are emptying out. Exit permits now cost $50,000 each—your customs chief shares the proceeds.",
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
                    anger: 30,   // 2x from 15
                    elite: -10,  // 2x from -5
                    personalWealth: 10  // Added - exit fees
                },
                remove: ["border_exodus_brain_drain"]
            },
            {
                text: "Let them go",
                effects: {
                    treasury: -20,
                    elite: -20   // 2x from -10
                },
                remove: ["border_exodus_brain_drain"]
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
                    treasury: -8,
                    elite: -2,   // 2x from -1
                    anger: 4     // 2x from 2
                },
                add: ["frozen_conflict"]
            },
            {
                text: "Sign unpopular peace treaty",
                effects: {
                    treasury: 10,
                    elite: -20,  // 2x from -10
                    anger: -20,  // 2x from -10
                    personalWealth: 0
                },
                remove: ["frozen_conflict", "sanctions_initial_wave"],
                legacy: { icon: "🏳️", name: "The Peacemaker", weight: -5 }
            }
        ]
    }
];
