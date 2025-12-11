export const BASIC_RECURRING_EVENTS = [
    {
        id: "tax_haven_crackdown",
        title: "Offshore Crackdown",
        description: "European regulators are tightening control on offshore accounts. Your assets in Cyprus are under scrutiny.",
        weight: 10,
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
                    personalWealth: -5, // Transaction costs
                    treasury: 0,
                    elite: 0,
                    anger: 0
                },
                addToPool: ["tax_haven_crackdown"]
            },
            {
                text: "Repatriate funds (Tax Amnesty)",
                effects: {
                    personalWealth: -10, // Taxes
                    treasury: 5,
                    elite: -2, // "Going legitimate?"
                    anger: -2 // "Patriotic act"
                },
                removeFromPool: ["tax_haven_crackdown"]
            }
        ]
    },
    {
        id: "brain_drain",
        title: "The Exodus",
        description: "Young IT specialists and engineers are leaving the country in droves, citing lack of improving prospects.",
        weight: 10,
        storyline: null,
        rarity: "common",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Increase IT sector subsidies",
                effects: {
                    treasury: -15,
                    anger: -2,
                    elite: 2 // Tech oligarchs happy
                },
                addToPool: ["brain_drain"]
            },
            {
                text: "Close the borders for 'specialists'",
                effects: {
                    anger: 10,
                    elite: -5, // Business suffers
                    treasury: 0
                },
                addToPool: ["brain_drain"]
            },
            {
                text: "Institute strict 'Exit Visa' requirements",
                effects: {
                    treasury: -5, // Bureaucracy costs
                    elite: -10, // They hate being trapped
                    anger: 15, // People are furious
                    personalWealth: 0
                }
                // Effectively solves the brain drain by force
            }
        ]
    },
    {
        id: "university_protests",
        title: "Student Unrest",
        description: "Students at the capital's top university are protesting against curriculum changes and lack of freedom.",
        weight: 8,
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
                    anger: 2,
                    elite: 0
                }
            },
            {
                text: "Expel the ringleaders",
                effects: {
                    anger: 5,
                    elite: 1 // "Strong hand"
                },
                addToPool: ["university_protests"]
            },
            {
                text: "Meet with student leaders",
                effects: {
                    anger: -2,
                    elite: -2 // "Weakness"
                }
            }
        ]
    },
    {
        id: "arms_deal_opportunity",
        title: "The African Market",
        description: "A regime in Central Africa wants to buy our older military hardware. They pay in gold and diamonds.",
        weight: 6,
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
                    personalWealth: 5, // Commission
                    elite: 5, // Defense lobby happy
                    anger: 0
                },
                addToPool: ["arms_deal_opportunity"]
            },
            {
                text: "Decline (International image)",
                effects: {
                    treasury: 0,
                    elite: -5,
                    anger: 0
                }
            }
        ]
    },
    {
        id: "infrastructure_project",
        title: "The New Highway",
        description: "The Ministry of Transport proposes a new highway connecting the capital to the Urals. A massive project.",
        weight: 8,
        storyline: null,
        rarity: "common",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Approve (Rotenberg gets the contract)",
                effects: {
                    treasury: -40,
                    elite: 10,
                    anger: -5
                },
                addToPool: ["infrastructure_project"]
            },
            {
                text: "Delay for budget reasons",
                effects: {
                    treasury: 0,
                    elite: -5,
                    anger: 2
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
                text: "Spare no expense",
                effects: {
                    treasury: -10, // State budget pays
                    personalWealth: 0,
                    elite: 2,
                    anger: 5 // Anti-corruption investigation fodder
                }
            },
            {
                text: "Modest repairs only",
                effects: {
                    treasury: -2,
                    elite: -2, // "Are you poor?"
                    anger: -1
                }
            }
        ]
    }
];
