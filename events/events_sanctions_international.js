export const SANCTIONS_EVENTS = [
    {
        id: "sanctions_initial_wave",
        title: "The Economic Iron Curtain",
        description: "In response to your recent actions, Western nations have imposed sweeping sanctions. Luxury brands are leaving, and the stock market is in freefall. Western companies are abandoning factories and warehouses—the fire sale begins.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        meta: {
            depth: 4,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Seize foreign assets in the fire sale",
                effects: {
                    personalWealth: 30,  // Increased from 20
                    treasury: 10,
                    elite: -10,  // 2x from -5
                    anger: 10    // 2x from 5
                },
                add: ["import_substitution_failure", "tech_sector_collapse", "sanctions_human_rights"],
                remove: ["sanctions_initial_wave"]
            },
            {
                text: "Try to negotiate secretly",
                effects: {
                    personalWealth: -5,
                    elite: 4,    // 2x from 2
                    treasury: -20
                },
                add: ["sanctions_loophole_found"],
                remove: ["sanctions_initial_wave"]
            }
        ]
    },
    {
        id: "import_substitution_failure",
        title: "The Cheese Incident",
        description: "Your 'Import Substitution' policy has led to local factories producing a cheese-like substance that burns when lit on fire. The public is mocking you on social media.",
        weight: 5,
        storyline: "sanctions-spiral",
        rarity: "common",
        meta: {
            depth: 5,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Ban the criticism",
                effects: {
                    anger: 10,   // 2x from 5
                    elite: 0
                },
                add: ["internet_censorship_tightens"]
            },
            {
                text: "Ignore it",
                effects: {
                    elite: -4,   // 2x from -2
                    anger: 4     // 2x from 2
                },
                legacy: { icon: "🤡", name: "The Laughing Stock", weight: -5, explanation: "Your pathetic retaliation made you a global joke." }
            }
        ]
    },
    {
        id: "tech_sector_collapse",
        title: "Brain Drain",
        description: "Without access to western chips and software, your tech sector is dying. Thousands of IT specialists are fleeing to Georgia and Armenia.",
        weight: 5,
        storyline: "sanctions-spiral",
        rarity: "rare",
        meta: {
            depth: 5,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Close the borders for IT workers—exit visas require a 'processing fee'",
                effects: {
                    anger: 30,   // 2x from 15
                    elite: -20,  // 2x from -10
                    treasury: -10,
                    personalWealth: 15  // Increased from 10
                },
                add: ["underground_railroad"]
            },
            {
                text: "Offer massive tax breaks to stay",
                effects: {
                    treasury: -150,
                    elite: 10,   // 2x from 5
                    anger: -10   // 2x from -5
                },
                add: ["loyal_tech_giant", "subsidy_dependency"]
            }
        ]
    },
    {
        id: "sanctions_loophole_found",
        title: "Creative Accounting",
        description: "Your financial advisors have found ways to circumvent some sanctions through shell companies and third-party intermediaries.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "rare",
        meta: {
            depth: 5,
            impact: 3,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Exploit the loopholes",
                effects: {
                    treasury: 30,
                    personalWealth: 10,  // Increased from 5
                    elite: 6     // 2x from 3
                },
                remove: ["sanctions_loophole_found"]
            },
            {
                text: "Be cautious",
                effects: {
                    treasury: 10
                },
                remove: ["sanctions_loophole_found"]
            }
        ]
    },
    {
        id: "internet_censorship_tightens",
        title: "The Great Firewall Expands",
        description: "Your internet censorship has been expanded. Social media platforms are blocked, VPNs are being hunted down.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        meta: {
            depth: 6,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Tighten control further",
                effects: {
                    anger: 20,   // 2x from 10
                    elite: -6    // 2x from -3
                },
                remove: ["internet_censorship_tightens"]
            },
            {
                text: "Ease restrictions slightly",
                effects: {
                    anger: -10,  // 2x from -5
                    elite: 4,    // 2x from 2
                    treasury: -30
                },
                add: ["foreign_influence_creeping"],
                remove: ["internet_censorship_tightens"]
            }
        ]
    },
    {
        id: "underground_railroad",
        title: "The Escape Network",
        description: "An underground network has formed to help people flee the country. It's becoming harder to stop the brain drain.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "rare",
        meta: {
            depth: 6,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Crack down hard—those caught fleeing forfeit all assets",
                effects: {
                    anger: 30,   // 2x from 15
                    elite: -10,  // 2x from -5
                    personalWealth: 5  // Added - seized escapee assets
                },
                remove: ["underground_railroad"]
            },
            {
                text: "Turn a blind eye",
                effects: {
                    elite: -6,   // 2x from -3
                    treasury: -10
                },
                remove: ["underground_railroad"]
            }
        ]
    },
    {
        id: "loyal_tech_giant",
        title: "The Homegrown Tech Champion",
        description: "One major tech company has stayed loyal, developing local alternatives to Western software. They're asking for more support.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "rare",
        meta: {
            depth: 6,
            impact: 3,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Invest heavily",
                effects: {
                    treasury: -40,
                    elite: 10,   // 2x from 5
                    anger: -6    // 2x from -3
                },
                remove: ["loyal_tech_giant"]
            },
            {
                text: "Offer modest support—for a quiet equity stake in your wife's name",
                effects: {
                    treasury: -15,
                    elite: 4,    // 2x from 2
                    personalWealth: 5  // Added - equity stake
                },
                remove: ["loyal_tech_giant"]
            },
            {
                text: "Reject the request",
                effects: {
                    elite: -4,   // 2x from -2
                    treasury: 0
                },
                remove: ["loyal_tech_giant"]
            }
        ]
    },
    {
        id: "subsidy_dependency",
        title: "Subsidy Addiction",
        description: "The tech sector has become completely dependent on state subsidies. They are threatening to leave if the money stops flowing.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        meta: {
            depth: 6,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Keep paying",
                effects: {
                    treasury: -80,
                    elite: 4     // 2x from 2
                },
                remove: ["subsidy_dependency"]
            },
            {
                text: "Cut them off",
                effects: {
                    elite: -10,  // 2x from -5
                    anger: 10,   // 2x from 5
                    treasury: 0
                },
                add: ["tech_sector_collapse"],
                remove: ["subsidy_dependency"]
            },
            {
                text: "Restructure subsidies through your holding company (30% commission)",
                effects: {
                    treasury: -60,
                    elite: 0,
                    personalWealth: 18  // Increased from 12
                },
                legacy: { icon: "🏦", name: "The Subsidy King", weight: 5 },
                remove: ["subsidy_dependency"]
            }
        ]
    },
    {
        id: "foreign_influence_creeping",
        title: "Western Ideas Spread",
        description: "With the internet slightly more open, 'dangerous' Western ideas about democracy and transparency are spreading among the youth.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        meta: {
            depth: 7,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Let them talk",
                effects: {
                    anger: -4,   // 2x from -2
                    elite: -10   // 2x from -5
                },
                add: ["mass_protests_blogger"],
                remove: ["foreign_influence_creeping"]
            },
            {
                text: "Clamp down again",
                effects: {
                    anger: 20,   // 2x from 10
                    elite: 4     // 2x from 2
                },
                remove: ["foreign_influence_creeping"]
            }
        ]
    }
];
