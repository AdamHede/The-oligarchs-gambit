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
        },
        {
            id: "palace_denial_memes",
            title: "Internet Memes",
            description: "The internet has turned your palace denial into a viral meme. Every social media platform is flooded with jokes about your 'friend's' golden toilet brush.",
            weight: 0,
            storyline: "popular-uprising",
            rarity: "common",
            choices: [
                {
                    text: "Ignore the memes",
                    effects: {
                        anger: 5,
                        elite: -2
                    },
                    removeFromPool: ["palace_denial_memes"]
                },
                {
                    text: "Try to suppress them",
                    effects: {
                        anger: 10,
                        elite: -5
                    },
                    removeFromPool: ["palace_denial_memes"]
                }
            ]
        },
        {
            id: "sanctions_human_rights",
            title: "Human Rights Sanctions",
            description: "Western nations have imposed personal sanctions on you and your inner circle. Your foreign assets are frozen, and travel bans are in place.",
            weight: 0,
            storyline: "popular-uprising",
            rarity: "rare",
            choices: [
                {
                    text: "Defy the sanctions",
                    effects: {
                        elite: 5,
                        treasury: -10
                    },
                    removeFromPool: ["sanctions_human_rights"]
                },
                {
                    text: "Try to negotiate",
                    effects: {
                        elite: -5,
                        personalWealth: -10
                    },
                    removeFromPool: ["sanctions_human_rights"]
                }
            ]
        },
        {
            id: "bloody_sunday_scenario",
            title: "The Crackdown",
            description: "Your security forces have used excessive force against the protesters. Images of violence are spreading globally, sparking international condemnation.",
            weight: 0,
            storyline: "popular-uprising",
            rarity: "epic",
            choices: [
                {
                    text: "Double down and crush them",
                    effects: {
                        anger: -15, // Fear suppresses them
                        elite: -10, // International outcast
                        treasury: -50 // Massive security operation
                    },
                    addToPool: ["sanctions_human_rights"],
                    removeFromPool: ["bloody_sunday_scenario"]
                },
                {
                    text: "Back down",
                    effects: {
                        elite: -15, // Weakness
                        anger: -5 // Appeased
                    },
                    removeFromPool: ["bloody_sunday_scenario"]
                }
            ]
        }
];

