export const SOCIAL_EVENTS = [
    {
        id: "navalny_style_investigation",
        title: "The Golden Toilet Brush",
        description: "A popular opposition blogger has released a drone video of your secret palace. It features an aqua-disco, a hookah lounge, and a $700 toilet brush. It has 100 million views.",
        weight: 8,
        storyline: "popular-uprising",
        rarity: "legendary",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Claim it belongs to your friend",
                effects: {
                    elite: 10,   // 2x from 5
                    anger: 10    // 2x from 5
                },
                add: ["palace_denial_memes"]
            },
            {
                text: "Arrest the blogger—seize his 'Anti-Corruption Foundation' funds",
                effects: {
                    anger: 30,   // 2x from 15
                    elite: 10,   // 2x from 5
                    personalWealth: 10  // Added - seize blogger's assets
                },
                add: ["mass_protests_blogger", "sanctions_human_rights"]
            }
        ]
    },
    {
        id: "mass_protests_blogger",
        title: "Snow Revolution",
        description: "Thousands are in the streets demanding your resignation. They are throwing snowballs at the riot police.",
        weight: 0,
        storyline: "popular-uprising",
        rarity: "epic",
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Crack down hard—arrested protesters pay hefty fines",
                effects: {
                    anger: 16,   // 2x from 8
                    elite: -10,  // 2x from -5
                    personalWealth: 12  // Increased from 8
                },
                add: ["bloody_sunday_scenario"],
                remove: ["mass_protests_blogger"]
            },
            {
                text: "Wait it out",
                effects: {
                    elite: -20,  // 2x from -10
                    anger: -10   // 2x from -5
                },
                add: ["emboldened_opposition"],
                remove: ["mass_protests_blogger"]
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
        meta: {
            depth: 2,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Ignore the memes",
                effects: {
                    anger: 10,   // 2x from 5
                    elite: -4    // 2x from -2
                },
                remove: ["palace_denial_memes"]
            },
            {
                text: "Try to suppress them",
                effects: {
                    anger: 20,   // 2x from 10
                    elite: -10   // 2x from -5
                },
                remove: ["palace_denial_memes"]
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
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Defy the sanctions—'repatriate' frozen assets through friendly intermediaries",
                effects: {
                    elite: 10,   // 2x from 5
                    treasury: -10,
                    anger: 16,   // 2x from 8
                    personalWealth: 10  // Increased from 5
                },
                remove: ["sanctions_human_rights"]
            },
            {
                text: "Try to negotiate",
                effects: {
                    elite: -10,  // 2x from -5
                    personalWealth: -5,
                    treasury: 20
                },
                remove: ["sanctions_human_rights"]
            }
        ]
    },
    {
        id: "emboldened_opposition",
        title: "Opposition Grows Stronger",
        description: "Your hesitation to crack down has been interpreted as weakness. The opposition is organizing more effectively and demanding more.",
        weight: 0,
        storyline: "popular-uprising",
        rarity: "common",
        meta: {
            depth: 3,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Bribe their leaders",
                effects: {
                    treasury: -20,
                    elite: -4,   // 2x from -2
                    anger: -4    // 2x from -2
                },
                remove: ["emboldened_opposition"]
            },
            {
                text: "Let them march",
                effects: {
                    anger: 20,   // 2x from 10
                    elite: -10   // 2x from -5
                },
                add: ["mass_protests_blogger"],
                remove: ["emboldened_opposition"]
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
        meta: {
            depth: 3,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Double down—the martial law emergency fund is loosely audited",
                effects: {
                    anger: -30,  // 2x from -15
                    elite: -30,  // 2x from -15
                    treasury: -75,
                    personalWealth: 15  // Increased from 10
                },
                add: ["sanctions_human_rights"],
                remove: ["bloody_sunday_scenario"],
                legacy: { icon: "💀", name: "The Butcher", weight: 20 }
            },
            {
                text: "Back down",
                effects: {
                    elite: -40,  // 2x from -20
                    anger: -10   // 2x from -5
                },
                remove: ["bloody_sunday_scenario"]
            }
        ]
    }
];
