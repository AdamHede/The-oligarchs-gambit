export const MISC_EVENTS = [
    {
        id: "quiet_quarter",
        title: "A Quiet Quarter",
        description: "Nothing particularly dramatic happens this quarter. Your administration continues its usual... operations.",
        weight: 1,
        storyline: null,
        rarity: "common",
        recurring: true,  // Filler cards are recurring
        meta: {
            depth: 1,
            impact: 1,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Continue business as usual",
                effects: {
                    personalWealth: 2,  // Small passive income
                    treasury: -5,
                    elite: 0,
                    anger: 0
                },
                // Add a random different filler and reload pool
                add: [
                    "routine_inspection", "bureaucratic_shuffle",
                    // Also reload main pool
                    "tax_haven_crackdown", "brain_drain", "university_protests", "arms_deal_opportunity", "infrastructure_project",
                    "rally_around_flag", "import_substitution_failure", "palace_intrigue", "inflation_crisis",
                    "religious_revival_initial_blessing", "shadow_war_defector_silence", "mercenaries_africa",
                    "war_special_operation_proposal", "generals_plotting_coup", "energy_price_spike",
                    "tech_sector_collapse", "oligarch_yacht_seized", "oligarch_defection",
                    "infrastructure_collapse", "cyber_attack_grid", "birthday_celebration", "official_residence"
                ],
                remove: ["quiet_quarter"]  // Remove self, add different filler
            }
        ]
    },
    {
        id: "routine_inspection",
        title: "The Inspection",
        description: "A routine inspection of regional governors reveals the usual mix of petty corruption and sycophantic loyalty. Nothing surprising.",
        weight: 0,  // Only added by other fillers
        storyline: null,
        rarity: "common",
        recurring: true,
        meta: {
            depth: 1,
            impact: 1,
            sentiment: "neutral"
        },
        choices: [
            {
                text: "Accept the bribes",
                effects: {
                    personalWealth: 5,
                    elite: 2,
                    anger: 4
                },
                add: ["quiet_quarter", "bureaucratic_shuffle"],
                remove: ["routine_inspection"]
            },
            {
                text: "Demand larger bribes",
                effects: {
                    personalWealth: 10,
                    elite: -6,
                    anger: 6
                },
                add: ["quiet_quarter"],
                remove: ["routine_inspection"]
            }
        ]
    },
    {
        id: "bureaucratic_shuffle",
        title: "Cabinet Reshuffle",
        description: "It's time to shuffle some ministers around. Musical chairs keeps everyone guessing and no one powerful enough to challenge you.",
        weight: 0,
        storyline: null,
        rarity: "common",
        recurring: true,
        meta: {
            depth: 1,
            impact: 1,
            sentiment: "neutral"
        },
        choices: [
            {
                text: "Promote loyalists—they know to share their 'bonuses'",
                effects: {
                    personalWealth: 3,
                    elite: -4,
                    anger: 2
                },
                add: ["quiet_quarter", "routine_inspection"],
                remove: ["bureaucratic_shuffle"]
            },
            {
                text: "Promote competents",
                effects: {
                    personalWealth: 0,
                    elite: 4,
                    anger: -4
                },
                add: ["quiet_quarter"],
                remove: ["bureaucratic_shuffle"]
            }
        ]
    },
    {
        id: "birthday_celebration",
        title: "Your Birthday",
        description: "It is your 70th birthday. The elite are gathering to pay homage and offer gifts.",
        weight: 3,
        storyline: null,
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Accept the lavish gifts",
                effects: {
                    personalWealth: 10,  // Increased from 5
                    elite: 10,   // 2x from 5
                    anger: 4     // 2x from 2
                }
            },
            {
                text: "Ask for donations to the army",
                effects: {
                    treasury: 10,  // Increased from 5
                    anger: -4,     // 2x from -2
                    elite: -4      // 2x from -2
                }
            }
        ]
    }
];
