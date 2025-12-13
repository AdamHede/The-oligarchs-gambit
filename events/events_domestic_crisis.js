export const DOMESTIC_EVENTS = [
    {
        id: "inflation_crisis",
        title: "The Price of Eggs",
        description: "Inflation has hit 20%. The price of eggs has tripled. Grandmothers are fighting in supermarkets.",
        weight: 8,
        storyline: "domestic-crisis",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Price controls",
                effects: {
                    treasury: -35,
                    anger: -10,  // 2x from -5
                    elite: -6    // 2x from -3
                },
                add: ["shortages_black_market", "pension_crisis"]
            },
            {
                text: "Blame foreign saboteurs—the distraction lets you skim the emergency fund",
                effects: {
                    anger: 10,   // 2x from 5
                    elite: 0,
                    personalWealth: 3  // Added - distraction lets you skim
                },
                add: ["tv_propaganda_blame"]
            }
        ]
    },
    {
        id: "infrastructure_collapse",
        title: "Heating Pipe Burst",
        description: "In -30C weather, the central heating pipes in a major city have burst. 50,000 people are freezing.",
        weight: 6,
        storyline: "domestic-crisis",
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Fly there and yell at the Governor",
                effects: {
                    anger: -10,  // 2x from -5
                    elite: -10,  // 2x from -5
                    treasury: -30
                },
                add: ["infrastructure_decay"],
                legacy: { icon: "📢", name: "The Micro-Manager", weight: 2, explanation: "You personally managed the price of eggs. Such attention to detail!" }
            },
            {
                text: "Ignore it",
                effects: {
                    anger: 30,   // 2x from 15
                    elite: 0
                }
            }
        ]
    },
    {
        id: "shortages_black_market",
        title: "The Black Market Boom",
        description: "Price controls have created shortages. A thriving black market has emerged, selling everything at triple the official price. Your cousin runs the largest network. He pays tribute.",
        weight: 0,
        storyline: "domestic-crisis",
        rarity: "common",
        meta: {
            depth: 3,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Crack down on the black market",
                effects: {
                    anger: 20,   // 2x from 10
                    elite: -6,   // 2x from -3
                    treasury: -10
                },
                remove: ["shortages_black_market"]
            },
            {
                text: "Turn a blind eye",
                effects: {
                    anger: -6,   // 2x from -3
                    treasury: -15,
                    personalWealth: 8  // Increased from 5
                },
                remove: ["shortages_black_market"]
            }
        ]
    },
    {
        id: "pension_crisis",
        title: "The Pension Fund is Empty",
        description: "Decades of mismanagement and recent emergency spending have drained the pension fund. The elderly are starting to gather in city squares.",
        weight: 0,
        storyline: "domestic-crisis",
        rarity: "common",
        meta: {
            depth: 3,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Print money to pay them",
                effects: {
                    treasury: -50,
                    anger: -10,  // 2x from -5
                    elite: -6    // 2x from -3
                },
                legacy: { icon: "💸", name: "The Money Printer", weight: 0, explanation: "You printed money to solve your problems. Hyperinflation will be your legacy." }
            },
            {
                text: "Raise retirement age—your daughter's firm handles the 'restructuring consultancy'",
                effects: {
                    anger: 20,   // 2x from 10
                    treasury: 30,
                    elite: 10,   // 2x from 5
                    personalWealth: 12  // Increased from 8
                },
                legacy: { icon: "📉", name: "The Iron Accountant", weight: 5, explanation: "You accepted the pain of austerity. The budget will thank you." }
            }
        ]
    },
    {
        id: "infrastructure_decay",
        title: "Rust and Ruin",
        description: "The heating pipe burst was just a symptom. Bridges are crumbling, dams are leaking, and the power grid is failing across the country.",
        weight: 0,
        storyline: "domestic-crisis",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Massive modernization program",
                effects: {
                    treasury: -150,
                    elite: 20,   // 2x from 10
                    anger: -10   // 2x from -5
                },
                remove: ["infrastructure_decay"],
                legacy: { icon: "🏗️", name: "The Builder", weight: 10, explanation: "You invested in infrastructure for the people. A rare moment of generosity." }
            },
            {
                text: "Patch it up cheaply—your friends win contracts at 5x actual cost",
                effects: {
                    treasury: -20,
                    anger: 10,   // 2x from 5
                    personalWealth: 8  // Increased from 5
                },
                add: ["infrastructure_decay"]
            }
        ]
    },
    {
        id: "tv_propaganda_blame",
        title: "The Blame Game",
        description: "State TV is running 24/7 coverage blaming foreign saboteurs for the inflation. The narrative is taking hold.",
        weight: 0,
        storyline: "domestic-crisis",
        rarity: "common",
        meta: {
            depth: 3,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Amplify the blame—your family's ad agency handles the media buys",
                effects: {
                    anger: -10,  // 2x from -5
                    elite: 4,    // 2x from 2
                    personalWealth: 3  // Added - propaganda budget skimming
                },
                remove: ["tv_propaganda_blame"]
            },
            {
                text: "Focus on solutions",
                effects: {
                    anger: -6,   // 2x from -3
                    treasury: -15
                },
                remove: ["tv_propaganda_blame"]
            }
        ]
    }
];
