/**
 * Example Events
 * 
 * This file demonstrates the event format.
 * New events should follow this structure.
 */

const EXAMPLE_EVENTS = [
    {
        id: "political_opponent_criticizes",
        title: "Political Opponent Criticizes You",
        description: "A prominent opposition figure has publicly criticized your regime in a televised speech. They're calling for reforms and transparency. The media is picking it up.",
        recurring: false,
        weight: 8,
        tags: ["political", "opposition"],
        storylines: ["oligarch-rivalry"],
        conditions: {}, // No conditions = entry point
        choices: [
            {
                text: "Imprison them",
                effects: {
                    stats: { elite: -5, anger: 10 },
                    flags: { "prisoner_exists": true }
                },
                add: ["prisoner_complains", "prisoner_escape_risk"],
                remove: []
            },
            {
                text: "Co-opt them",
                effects: {
                    stats: { personalWealth: -2, elite: 10 },
                    flags: { "opponent_coopted": true }
                },
                add: ["coopted_opponent_problems"],
                remove: []
            },
            {
                text: "Do nothing",
                effects: {
                    stats: { elite: -2, anger: 5 }
                },
                add: [],
                remove: []
            }
        ]
    },
    {
        id: "prisoner_complains",
        title: "The Prisoner Complains",
        description: "Your imprisoned opponent is complaining about their treatment. Human rights groups are taking notice. The international press is asking questions.",
        recurring: false,
        weight: 7,
        tags: ["political", "human-rights"],
        storylines: ["oligarch-rivalry"],
        conditions: {
            flags: { "prisoner_exists": true }
        },
        choices: [
            {
                text: "Punish harder",
                effects: {
                    stats: { elite: -3, anger: 15 },
                    counters: { "choice:punish_prisoner": 1 }
                },
                add: [],
                remove: []
            },
            {
                text: "Relax pressure a bit",
                effects: {
                    stats: { elite: 2, anger: -5 }
                },
                add: [],
                remove: []
            },
            {
                text: "Release the prisoner",
                effects: {
                    stats: { elite: -10, anger: -10 },
                    flags: { "prisoner_exists": false }
                },
                add: [],
                remove: ["prisoner_escape_risk"] // Remove escape event if prisoner released
            }
        ]
    },
    {
        id: "prisoner_escape_risk",
        title: "Prison Break Attempt",
        description: "Intelligence reports a potential prison break attempt. Your opponent's supporters are planning something. Security is tight, but they might succeed.",
        recurring: false,
        weight: 6,
        tags: ["political", "security"],
        storylines: ["oligarch-rivalry"],
        conditions: {
            flags: { "prisoner_exists": true }
        },
        choices: [
            {
                text: "Increase security",
                effects: {
                    stats: { treasury: -20, elite: 5 }
                },
                add: [],
                remove: []
            },
            {
                text: "Let it happen, then blame guards",
                effects: {
                    stats: { elite: -5, anger: 10 },
                    flags: { "prisoner_exists": false }
                },
                add: ["prisoner_escaped_consequences"],
                remove: []
            },
            {
                text: "Preemptively transfer to secret location",
                effects: {
                    stats: { treasury: -10, elite: 3 }
                },
                add: [],
                remove: []
            }
        ]
    },
    {
        id: "harsh_prisoner_event",
        title: "Especially Harsh Punishment",
        description: "You've punished the prisoner multiple times while public sentiment is low. This creates an especially harsh version of the event that draws international condemnation.",
        recurring: false,
        weight: 5,
        tags: ["political", "human-rights", "international"],
        storylines: ["oligarch-rivalry", "sanctions-spiral"],
        conditions: {
            all: [
                { counter: "choice:punish_prisoner", gte: 2 },
                { stat: "anger", lt: 20 }
            ]
        },
        choices: [
            {
                text: "Double down",
                effects: {
                    stats: { elite: -15, anger: 25 },
                    flags: { "international_condemnation": true }
                },
                add: ["sanctions_escalation"],
                remove: []
            },
            {
                text: "Back down",
                effects: {
                    stats: { elite: 5, anger: -10 }
                },
                add: [],
                remove: []
            }
        ]
    },
    {
        id: "economic_crisis_mild",
        title: "Economic Troubles",
        description: "The economy is showing signs of strain. Inflation is rising, and the treasury is feeling pressure.",
        recurring: true, // Can happen multiple times
        weight: 5,
        tags: ["economic"],
        storylines: [],
        conditions: {
            stats: {
                treasury: { between: [300, 500] }
            }
        },
        choices: [
            {
                text: "Print more money",
                effects: {
                    stats: { treasury: 50, anger: 10 }
                },
                add: [],
                removeSelf: false // Recurring event stays in deck
            },
            {
                text: "Raise taxes",
                effects: {
                    stats: { treasury: 100, anger: 20, elite: -5 }
                },
                add: [],
                removeSelf: false
            },
            {
                text: "Do nothing",
                effects: {
                    stats: { treasury: -20 }
                },
                add: [],
                removeSelf: false
            }
        ]
    },
    {
        id: "economic_crisis_major",
        title: "Major Economic Crisis",
        description: "The economy is in serious trouble. The treasury is dangerously low, and people are struggling.",
        recurring: false,
        weight: 6,
        tags: ["economic"],
        storylines: ["domestic-crisis"],
        conditions: {
            stats: {
                treasury: { between: [100, 300] }
            }
        },
        choices: [
            {
                text: "Emergency measures",
                effects: {
                    stats: { treasury: 150, anger: 30, elite: -10 }
                },
                add: [],
                remove: []
            },
            {
                text: "Seek foreign aid",
                effects: {
                    stats: { treasury: 200, elite: -15 },
                    flags: { "foreign_aid_received": true }
                },
                add: [],
                remove: []
            }
        ]
    },
    {
        id: "economic_crisis_catastrophic",
        title: "Catastrophic Economic Collapse",
        description: "The economy has completely collapsed. The treasury is empty. Government services have stopped. This is a crisis of unprecedented scale.",
        recurring: false,
        weight: 8,
        tags: ["economic"],
        storylines: ["domestic-crisis"],
        conditions: {
            stats: {
                treasury: { lt: 100 }
            }
        },
        choices: [
            {
                text: "Declare emergency, seize assets",
                effects: {
                    stats: { treasury: 300, elite: -20, anger: 40 },
                    flags: { "emergency_powers": true }
                },
                add: ["elite_rebellion"],
                remove: []
            },
            {
                text: "Accept defeat",
                effects: {
                    stats: { elite: -30, anger: 50 }
                },
                add: ["regime_collapse"],
                remove: []
            }
        ]
    }
];

module.exports = EXAMPLE_EVENTS;

