export const SANCTIONS_EVENTS = [
        {
            id: "sanctions_initial_wave",
            title: "The Economic Iron Curtain",
            description: "In response to your recent actions, Western nations have imposed sweeping sanctions. Luxury brands are leaving, and the stock market is in freefall.",
            weight: 0, // Triggered
            storyline: "sanctions-spiral",
            rarity: "common",
            choices: [
                {
                    text: "Seize foreign assets",
                    effects: {
                        personalWealth: 20, // Steal the factories
                        treasury: 10,
                        elite: 5
                    },
                    addToPool: ["import_substitution_failure", "tech_sector_collapse"],
                    removeFromPool: ["sanctions_initial_wave"]
                },
                {
                    text: "Try to negotiate secretly",
                    effects: {
                        personalWealth: -5,
                        elite: -5, // Look weak
                        treasury: -5
                    },
                    addToPool: ["sanctions_loophole_found"],
                    removeFromPool: ["sanctions_initial_wave"]
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
            choices: [
                {
                    text: "Ban the criticism",
                    effects: {
                        anger: 5,
                        elite: 0
                    },
                    addToPool: ["internet_censorship_tightens"]
                },
                {
                    text: "Ignore it",
                    effects: {
                        elite: -2, // You look silly
                        anger: 2
                    }
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
            choices: [
                {
                    text: "Close the borders for IT workers",
                    effects: {
                        anger: 15,
                        elite: -5, // Even they need IT support
                        treasury: 0
                    },
                    addToPool: ["underground_railroad"]
                },
                {
                    text: "Offer tax breaks to stay",
                    effects: {
                        treasury: -30,
                        elite: 2,
                        anger: -5
                    },
                    addToPool: ["loyal_tech_giant"]
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
            choices: [
                {
                    text: "Exploit the loopholes",
                    effects: {
                        treasury: 30,
                        personalWealth: 5,
                        elite: 3
                    },
                    removeFromPool: ["sanctions_loophole_found"]
                },
                {
                    text: "Be cautious",
                    effects: {
                        treasury: 10
                    },
                    removeFromPool: ["sanctions_loophole_found"]
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
            choices: [
                {
                    text: "Tighten control further",
                    effects: {
                        anger: 10,
                        elite: -3
                    },
                    removeFromPool: ["internet_censorship_tightens"]
                },
                {
                    text: "Ease restrictions slightly",
                    effects: {
                        anger: -5,
                        elite: 2
                    },
                    removeFromPool: ["internet_censorship_tightens"]
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
            choices: [
                {
                    text: "Crack down hard",
                    effects: {
                        anger: 15,
                        elite: -5
                    },
                    removeFromPool: ["underground_railroad"]
                },
                {
                    text: "Turn a blind eye",
                    effects: {
                        elite: -3,
                        treasury: -10
                    },
                    removeFromPool: ["underground_railroad"]
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
            choices: [
                {
                    text: "Invest heavily",
                    effects: {
                        treasury: -40,
                        elite: 5,
                        anger: -3
                    },
                    removeFromPool: ["loyal_tech_giant"]
                },
                {
                    text: "Offer modest support",
                    effects: {
                        treasury: -15,
                        elite: 2
                    },
                    removeFromPool: ["loyal_tech_giant"]
                }
            ]
        }
];

