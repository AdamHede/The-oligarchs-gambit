export const SHADOW_WAR_EVENTS = [
    {
        id: "shadow_war_defector_silence",
        title: "The Loud Critic",
        description: "A former lieutenant has defected to the West and is writing a book. His insights into your finances could be... damaging. His local real estate portfolio would revert to the state—meaning you. The GRU suggests a special operation.",
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
                    elite: 10,   // 2x from 5
                    anger: 0,
                    personalWealth: 5  // Added - seized defector's local assets
                },
                add: ["assassination_attempt_botched", "shadow_war_ultimatum"],
                legacy: { icon: "☂️", name: "The Silencer", weight: 5, explanation: "The traitor was eliminated. A message sent to all who would betray the motherland." }
            },
            {
                text: "Let him publish",
                effects: {
                    elite: -10,  // 2x from -5
                    anger: 10    // 2x from 5
                }
            }
        ]
    },
    {
        id: "cyber_attack_grid",
        title: "Winter is Coming",
        description: "Your cyber-warfare unit proposes a massive attack on a rival nation's power grid during a cold snap. Certain cryptocurrency ransomware operations could run in parallel for... private benefit.",
        weight: 5,
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
                    elite: 10,   // 2x from 5
                    personalWealth: 5  // Added - cyber ransom payments
                },
                add: ["election_interference_exposure", "shadow_war_ultimatum"],
                remove: ["cyber_attack_grid"]
            },
            {
                text: "Too risky",
                effects: {
                    elite: -4    // 2x from -2
                },
                remove: ["cyber_attack_grid"]
            }
        ]
    },
    {
        id: "mercenaries_africa",
        title: "Gold for Guns",
        description: "A strapped African dictatorship needs help crushing rebels. They offer 15% of gold mining revenues in exchange for your 'private military contractors'. Your Swiss account is ready.",
        weight: 5,
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
                    treasury: 20,
                    elite: 10,   // 2x from 5
                    personalWealth: 10  // Added - gold mining kickbacks
                },
                add: ["assassination_attempt_botched"],
                remove: ["mercenaries_africa"]
            },
            {
                text: "Focus on domestic issues",
                effects: {
                    treasury: -5
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
                    anger: 10,   // 2x from 5
                    elite: 0
                },
                add: ["shadow_war_ultimatum"],
                remove: ["assassination_attempt_botched"],
                legacy: { icon: "🕵️‍♂️", name: "The Bumbling Assassin", weight: -5, explanation: "Your assassination attempt failed spectacularly. An international embarrassment." }
            },
            {
                text: "Make a joke of it—novelty perfume bottles sell well with your licensing deal",
                effects: {
                    anger: -4,   // 2x from -2
                    elite: 4,    // 2x from 2
                    personalWealth: 3  // Added - merchandise sales
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
                text: "Blame the CIA—while everyone's distracted, correct the 'troll farm' payroll",
                effects: {
                    anger: -10,  // 2x from -5
                    elite: 4,    // 2x from 2
                    personalWealth: 3  // Added - propaganda budget
                },
                remove: ["election_interference_exposure"]
            },
            {
                text: "Admit 'patriotic hackers'",
                effects: {
                    elite: 10    // 2x from 5
                },
                remove: ["election_interference_exposure"]
            }
        ]
    },
    {
        id: "shadow_war_ultimatum",
        title: "The Red Line",
        description: "Western leaders have had enough. They present irrefutable proof of your operations and threaten total economic isolation. War profiteering opportunities abound if you escalate—your friends in the defense industry are ready.",
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
                    elite: -30,  // 2x from -15
                    anger: -10   // 2x from -5
                },
                remove: ["shadow_war_ultimatum", "assassination_attempt_botched", "cyber_attack_grid"],
                legacy: { icon: "🐀", name: "The Betrayer", weight: -15, explanation: "You surrendered a loyal agent to save yourself. Loyalty means nothing to you." }
            },
            {
                text: "Escalate to open conflict",
                effects: {
                    elite: 20,   // 2x from 10
                    anger: 30,   // 2x from 15
                    treasury: -80,
                    personalWealth: 10  // Added - war profiteering
                },
                add: ["war_special_operation_proposal"],
                remove: ["shadow_war_ultimatum"]
            }
        ]
    }
];
