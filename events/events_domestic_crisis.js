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
        }
];

