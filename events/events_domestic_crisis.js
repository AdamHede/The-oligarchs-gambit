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
                    treasury: -35, // Increased from -20 (depth 2 = 1.3x)
                    anger: -5,
                    elite: -3 // Increased from -2
                },
                addToPool: ["shortages_black_market", "pension_crisis"]
            },
            {
                text: "Blame foreign saboteurs",
                effects: {
                    anger: 5,
                    elite: 0
                },
                addToPool: ["tv_propaganda_blame"]
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
                    anger: -5, // "The Tsar is good"
                    elite: -5, // "The Boyars are bad"
                    treasury: -90 // Increased from -60 (emergency repairs)
                },
                addToPool: ["infrastructure_decay"],
                legacy: { icon: "📢", name: "The Micro-Manager", weight: 2 }
            },
            {
                text: "Ignore it",
                effects: {
                    anger: 15,
                    elite: 0
                }
            }
        ]
    },
    {
        id: "shortages_black_market",
        title: "The Black Market Boom",
        description: "Price controls have created shortages. A thriving black market has emerged, selling everything at triple the official price.",
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
                    anger: 10,
                    elite: -3,
                    treasury: -10 // Policing costs
                },
                removeFromPool: ["shortages_black_market"]
            },
            {
                text: "Turn a blind eye",
                effects: {
                    anger: -3,
                    treasury: -15 // Lost tax revenue
                },
                removeFromPool: ["shortages_black_market"]
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
                    treasury: -30, // Increased from -10 (depth 3 = 1.3x)
                    anger: -5,
                    elite: -3 // Increased from -2
                },
                // Removed explicit loop back to inflation_crisis to break the death spiral
                // addToPool: ["inflation_crisis"] 
            },
            {
                text: "Raise retirement age",
                effects: {
                    anger: 10, // Reduced from 15
                    treasury: 40, // Increased from 30
                    elite: 5
                }
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
                    treasury: -150, // Increased from -100 (depth 2 = 1.5x)
                    elite: 10, // Contracts for friends
                    anger: -5
                },
                removeFromPool: ["infrastructure_decay"]
            },
            {
                text: "Patch it up cheaply",
                effects: {
                    treasury: -20,
                    anger: 5
                },
                addToPool: ["infrastructure_decay"]
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
                text: "Amplify the blame",
                effects: {
                    anger: -5,
                    elite: 2
                },
                removeFromPool: ["tv_propaganda_blame"]
            },
            {
                text: "Focus on solutions",
                effects: {
                    anger: -3,
                    treasury: -15
                },
                removeFromPool: ["tv_propaganda_blame"]
            }
        ]
    }
];
