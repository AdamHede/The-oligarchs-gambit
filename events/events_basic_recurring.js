export const BASIC_RECURRING_EVENTS = [
    {
        id: "tax_haven_crackdown",
        title: "Offshore Crackdown",
        description: "European regulators are tightening control on offshore accounts. Your assets in Cyprus are under scrutiny.",
        weight: 3, // Reduced from 10
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
                }
                // Removed self-add to break loop
            },
            {
                text: "Repatriate funds (Tax Amnesty)",
                effects: {
                    personalWealth: -10, // Taxes
                    treasury: 5,
                    elite: -2, // "Going legitimate?"
                    anger: -2 // "Patriotic act"
                },
                remove: ["tax_haven_crackdown"]
            }
        ]
    },
    {
        id: "brain_drain",
        title: "The Exodus",
        description: "Young IT specialists and engineers are leaving the country in droves, citing lack of improving prospects.",
        weight: 2, // Reduced from 3 to prevent repetition
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
                    treasury: -25, // Increased from -15
                    anger: -2,
                    elite: 2 // Tech oligarchs happy
                }
                // Removed self-add to break loop
            },
            {
                text: "Close the borders for 'specialists'",
                effects: {
                    anger: 10, // Reduced from 15 - still harsh but survivable
                    elite: -5,
                    treasury: 0
                }
                // Removed self-add to break loop
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
        weight: 3, // Reduced from 8
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
                // Removed self-add loop: add: ["university_protests"]
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
        weight: 3, // Reduced from 6
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
                    personalWealth: 8, // Increased from 5 - greedy bait
                    elite: 5,
                    anger: 15 // High - greedy trap
                }
                // Removed self-add to break loop
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
        weight: 3, // Reduced from 8
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
                    treasury: -100, // Massive national project
                    elite: 10,
                    anger: 5 // Reduced - public doesn't care as much about infrastructure graft
                },
                // Removed self-add to break loop
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
                    treasury: -35, // Increased from -10 (Luxury scale correction)
                    personalWealth: 0,
                    elite: 2,
                    anger: 5 // Anti-corruption investigation fodder
                },
                legacy: { icon: "🏒", name: "The Hockey Player", weight: 0 }
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
