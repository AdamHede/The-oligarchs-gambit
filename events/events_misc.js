export const MISC_EVENTS = [
        {
            id: "quiet_quarter",
            title: "A Quiet Quarter",
            description: "Nothing particularly dramatic happens this quarter. Your administration continues its usual... operations.",
            weight: 1, // Very low weight so it only appears if nothing else does
            storyline: null,
            rarity: "common",
            choices: [
                {
                    text: "Continue business as usual",
                    effects: {
                        personalWealth: 1,
                        treasury: 1,
                        elite: 0,
                        anger: -1
                    }
                }
            ]
        },
        {
            id: "birthday_celebration",
            title: "Your Birthday",
            description: "It is your 70th birthday. The elite are gathering to pay homage and offer gifts.",
            weight: 2,
            storyline: null,
            rarity: "rare",
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

