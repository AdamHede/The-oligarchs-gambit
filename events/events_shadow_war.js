export const SHADOW_WAR_EVENTS = [
    {
        id: "shadow_war_defector_silence",
        title: "The Loud Critic",
        description: "A former lieutenant has defected to the West and is writing a book. His insights into your finances could be... damaging. The GRU suggests a special operation to silence him.",
        weight: 10,
        storyline: "shadow-war",
        rarity: "common",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Authorize the 'accident'",
                effects: {
                    treasury: -5,
                    elite: 5, // Siloviki happy
                    anger: 0
                },
                add: ["assassination_attempt_botched", "shadow_war_ultimatum"],
                legacy: { icon: "☂️", name: "The Silencer", weight: 5, explanation: "The traitor was eliminated. A message sent to all who would betray the motherland." }
            },
            {
                text: "Let him publish",
                effects: {
                    elite: -5, // Secrets exposed
                    anger: 5 // Populace laughs
                },
                // No chain
            }
        ]
    },
    {
        id: "cyber_attack_grid",
        title: "Winter is Coming",
        description: "Your cyber-warfare unit proposes a massive attack on a rival nation's power grid during a cold snap. It would cause chaos and send a strong message.",
        weight: 5, // Increased from 0 to make accessible
        storyline: "shadow-war",
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Execute the attack",
                effects: {
                    treasury: -10,
                    elite: 5
                },
                add: ["election_interference_exposure", "shadow_war_ultimatum"],
                remove: ["cyber_attack_grid"]
            },
            {
                text: "Too risky",
                effects: {
                    elite: -2
                },
                remove: ["cyber_attack_grid"]
            }
        ]
    },
    {
        id: "mercenaries_africa",
        title: "Gold for Guns",
        description: "A strapped African dictatorship needs help crushing rebels. They offer gold mining rights in exchange for your 'private military contractors'.",
        weight: 5, // Increased from 0 to make accessible
        storyline: "shadow-war",
        rarity: "common",
        meta: {
            depth: 1,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Deploy the musicians",
                effects: {
                    treasury: 20, // Gold!
                    elite: 5 // PMC owner happy
                },
                add: ["assassination_attempt_botched"], // Risk of exposure
                remove: ["mercenaries_africa"]
            },
            {
                text: "Focus on domestic issues",
                effects: {
                    treasury: -5 // Missed opportunity
                },
                remove: ["mercenaries_africa"]
            }
        ]
    },
    {
        id: "assassination_attempt_botched",
        title: "The Amateur Hit",
        description: "Your agents in London made a mess. They used a highly traceable nerve agent and were caught on CCTV. The victim is alive, and the world is furious.",
        weight: 0,
        storyline: "shadow-war",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Deny everything vehemently",
                effects: {
                    anger: 5, // Everyone knows you're lying
                    elite: 0
                },
                add: ["shadow_war_ultimatum"],
                remove: ["assassination_attempt_botched"],
                legacy: { icon: "🕵️‍♂️", name: "The Bumbling Assassin", weight: -5, explanation: "Your assassination attempt failed spectacularly. An international embarrassment." }
            },
            {
                text: "Make a joke of it",
                effects: {
                    anger: -2, // Base loves the trolling
                    elite: 2
                },
                add: ["shadow_war_ultimatum"],
                remove: ["assassination_attempt_botched"]
            }
        ]
    },
    {
        id: "election_interference_exposure",
        title: "The Troll Farm Leak",
        description: "A whistleblower has leaked thousands of documents proving your government funded interference in Western elections. Sanctions are being prepared.",
        weight: 0,
        storyline: "shadow-war",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Blame the CIA",
                effects: {
                    anger: -5, // Propaganda works
                    elite: 2
                },
                remove: ["election_interference_exposure"]
            },
            {
                text: "Admit 'patriotic hackers'",
                effects: {
                    elite: 5
                },
                remove: ["election_interference_exposure"]
            }
        ]
    },
    {
        id: "shadow_war_ultimatum",
        title: "The Red Line",
        description: "Western leaders have had enough. They present irrefutable proof of your operations and threaten total economic isolation effectively an act of war.",
        weight: 0,
        storyline: "shadow-war",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Back down and burn agents",
                effects: {
                    elite: -15, // Betrayal of services
                    anger: -5 // War avoided
                },
                remove: ["shadow_war_ultimatum", "assassination_attempt_botched", "cyber_attack_grid"],
                legacy: { icon: "🐀", name: "The Betrayer", weight: -15, explanation: "You surrendered a loyal agent to save yourself. Loyalty means nothing to you." }
            },
            {
                text: "Escalate to open conflict",
                effects: {
                    elite: 10,
                    anger: 15, // Increased from 10
                    treasury: -80 // Increased from -50 (depth 2 = 1.6x)
                },
                add: ["war_special_operation_proposal"], // Triggers actual war storyline
                remove: ["shadow_war_ultimatum"]
            }
        ]
    }
];
