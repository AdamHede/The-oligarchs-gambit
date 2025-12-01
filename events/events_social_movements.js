export const SOCIAL_EVENTS = [
        {
            id: "navalny_style_investigation",
            title: "The Golden Toilet Brush",
            description: "A popular opposition blogger has released a drone video of your secret palace. It features an aqua-disco, a hookah lounge, and a $700 toilet brush. It has 100 million views.",
            weight: 8,
            storyline: "popular-uprising",
            rarity: "legendary",
            choices: [
                {
                    text: "Claim it belongs to your friend",
                    effects: {
                        elite: 5, // Friend takes the fall (and a favor)
                        anger: 5 // Nobody believes you
                    },
                    addToPool: ["palace_denial_memes"]
                },
                {
                    text: "Arrest the blogger",
                    effects: {
                        anger: 15, // Martyrdom
                        elite: 5 // Strength
                    },
                    addToPool: ["mass_protests_blogger", "sanctions_human_rights"]
                }
            ]
        },
        {
            id: "mass_protests_blogger",
            title: "Snow Revolution",
            description: "Thousands are in the streets demanding your resignation. They are throwing snowballs at the riot police.",
            weight: 0, // Triggered
            storyline: "popular-uprising",
            rarity: "epic",
            choices: [
                {
                    text: "Crack down hard",
                    effects: {
                        anger: 20, // Dangerous escalation
                        elite: -5 // Uneasy about violence
                    },
                    addToPool: ["bloody_sunday_scenario"],
                    removeFromPool: ["mass_protests_blogger"]
                },
                {
                    text: "Wait it out",
                    effects: {
                        elite: -10, // Looking weak
                        anger: -5 // Lose momentum
                    },
                    removeFromPool: ["mass_protests_blogger"]
                }
            ]
        }
];

