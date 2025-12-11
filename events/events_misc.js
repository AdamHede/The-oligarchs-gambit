export const MISC_EVENTS = [
    {
        id: "quiet_quarter",
        title: "A Quiet Quarter",
        description: "Nothing particularly dramatic happens this quarter. Your administration continues its usual... operations.",
        weight: 10, // Standard common weight
        storyline: null,
        rarity: "common",
        meta: {
            depth: 1,
            impact: 1,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Continue business as usual",
                effects: {
                    personalWealth: 1,
                    treasury: 1,
                    elite: 0,
                    anger: -1
                },
                // Reload basic events if the deck gets thin
                addToPool: ["tax_haven_crackdown", "brain_drain", "university_protests", "arms_deal_opportunity", "infrastructure_project"]
            }
        ]
    },
    {
        id: "birthday_celebration",
        title: "Your Birthday",
        description: "It is your 70th birthday. The elite are gathering to pay homage and offer gifts.",
        weight: 3, // Standard rare weight
        storyline: null,
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Accept the lavish gifts",
                effects: {
                    personalWealth: 5,
                    elite: 5,
                    anger: 2
                }
            },
            {
                text: "Ask for donations to the army",
                effects: {
                    treasury: 5,
                    anger: -2,
                    elite: -2 // Cheapskate
                }
            }
        ]
    }
];

