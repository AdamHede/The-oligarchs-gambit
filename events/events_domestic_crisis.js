export const DOMESTIC_EVENTS = [
        {
            id: "inflation_crisis",
            title: "The Price of Eggs",
            description: "Inflation has hit 20%. The price of eggs has tripled. Grandmothers are fighting in supermarkets.",
            weight: 8,
            storyline: "domestic-crisis",
            rarity: "common",
            choices: [
                {
                    text: "Price controls",
                    effects: {
                        treasury: -10,
                        anger: -5, // Short term relief
                        elite: -5 // Business owners mad
                    },
                    addToPool: ["shortages_black_market"]
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
            choices: [
                {
                    text: "Fly there and yell at the Governor",
                    effects: {
                        anger: -5, // "The Tsar is good"
                        elite: -5 // "The Boyars are bad"
                    },
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
            choices: [
                {
                    text: "Crack down on the black market",
                    effects: {
                        anger: 10,
                        elite: -3
                    },
                    removeFromPool: ["shortages_black_market"]
                },
                {
                    text: "Turn a blind eye",
                    effects: {
                        anger: -3,
                        treasury: -5
                    },
                    removeFromPool: ["shortages_black_market"]
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

