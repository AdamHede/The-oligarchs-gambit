export const BASIC_RECURRING_EVENTS = [
    {
        id: "tax_haven_crackdown",
        title: "Offshore Crackdown",
        description: "European regulators are tightening control on offshore accounts. Your assets in Cyprus are under scrutiny.",
        weight: 3,
        storyline: null,
        rarity: "common",
        meta: {
            depth: 1,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Move funds to Dubai",
                effects: {
                    personalWealth: -5,
                    treasury: 0,
                    elite: 0,
                    anger: 0
                }
            },
            {
                text: "Repatriate funds (Tax Amnesty)",
                effects: {
                    personalWealth: -10,
                    treasury: 5,
                    elite: -4,  // 2x from -2
                    anger: -4   // 2x from -2
                },
                remove: ["tax_haven_crackdown"]
            }
        ]
    },
    {
        id: "brain_drain",
        title: "The Exodus",
        description: "Young IT specialists and engineers are leaving the country in droves, citing lack of improving prospects.",
        weight: 2,
        storyline: null,
        rarity: "common",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Increase IT subsidies—your IT holding company gets the contracts",
                effects: {
                    treasury: -25,
                    anger: -4,   // 2x from -2
                    elite: 4,    // 2x from 2
                    personalWealth: 3  // Added wealth gain
                }
            },
            {
                text: "Close the borders for 'specialists'",
                effects: {
                    anger: 20,   // 2x from 10
                    elite: -10,  // 2x from -5
                    treasury: 0,
                    personalWealth: 5  // Increased from 3
                }
            },
            {
                text: "Institute strict 'Exit Visa' requirements",
                effects: {
                    treasury: -5,
                    elite: -20,  // 2x from -10
                    anger: 30,   // 2x from 15
                    personalWealth: 0
                }
            }
        ]
    },
    {
        id: "university_protests",
        title: "Student Unrest",
        description: "Students at the capital's top university are protesting against curriculum changes and lack of freedom.",
        weight: 3,
        storyline: null,
        rarity: "common",
        meta: {
            depth: 1,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Ignore them",
                effects: {
                    anger: 4,    // 2x from 2
                    elite: 0
                }
            },
            {
                text: "Expel the ringleaders—their parents pay 'administrative fees' to avoid prison",
                effects: {
                    anger: 10,   // 2x from 5
                    elite: 2,    // 2x from 1
                    personalWealth: 4  // 2x from 2
                }
            },
            {
                text: "Meet with student leaders",
                effects: {
                    anger: -4,   // 2x from -2
                    elite: -4    // 2x from -2
                }
            }
        ]
    },
    {
        id: "arms_deal_opportunity",
        title: "The African Market",
        description: "A regime in Central Africa wants to buy our older military hardware. They pay in gold and diamonds.",
        weight: 3,
        storyline: null,
        rarity: "common",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "neutral"
        },
        choices: [
            {
                text: "Authorize the sale",
                effects: {
                    treasury: 20,
                    personalWealth: 15,  // Increased from 12
                    elite: 10,   // 2x from 5
                    anger: 30    // 2x from 15
                }
            },
            {
                text: "Decline (International image)",
                effects: {
                    treasury: 0,
                    elite: -10,  // 2x from -5
                    anger: 0
                }
            }
        ]
    },
    {
        id: "infrastructure_project",
        title: "The New Highway",
        description: "The Ministry of Transport proposes a new highway connecting the capital to the Urals. A massive project.",
        weight: 3,
        storyline: null,
        rarity: "common",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Approve it—Rotenberg kicks back 10% to 'the foundation'",
                effects: {
                    treasury: -100,
                    elite: 20,   // 2x from 10
                    anger: 10,   // 2x from 5
                    personalWealth: 12  // Increased from 8
                },
                legacy: { icon: "🛣️", name: "The Road Builder", weight: 5 }
            },
            {
                text: "Delay for budget reasons",
                effects: {
                    treasury: 0,
                    elite: -10,  // 2x from -5
                    anger: 4     // 2x from 2
                }
            }
        ]
    },
    {
        id: "official_residence",
        title: "Renovations",
        description: "Your official residence by the Black Sea requires 'modernization'. Specifically, a new underground hockey rink.",
        weight: 5,
        storyline: null,
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 1,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Spare no expense—your Swiss contractor is very loyal",
                effects: {
                    treasury: -35,
                    personalWealth: 5,  // Added wealth gain
                    elite: 4,    // 2x from 2
                    anger: 10    // 2x from 5
                },
                legacy: { icon: "🏒", name: "The Hockey Player", weight: 0, explanation: "Your hockey prowess is legendary. Your political skills, less so." }
            },
            {
                text: "Modest repairs only",
                effects: {
                    treasury: -2,
                    elite: -4,   // 2x from -2
                    anger: -2    // 2x from -1
                }
            }
        ]
    }
];
