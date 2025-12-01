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
                        elite: -5, // International isolation hurts them
                        anger: 5
                    },
                    addToPool: ["import_substitution_failure", "tech_sector_collapse", "sanctions_human_rights"],
                    removeFromPool: ["sanctions_initial_wave"]
                },
                {
                    text: "Try to negotiate secretly",
                    effects: {
                        personalWealth: -5,
                        elite: 2, // Business community relieved
                        treasury: -20 // Cost of lobbyists/bribes
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
                        elite: -10, // Draconian measures scare investors
                        treasury: -10, // Enforcement costs
                        personalWealth: 5 // Seized assets from fleeing traitors
                    },
                    addToPool: ["underground_railroad"]
                },
                {
                    text: "Offer massive tax breaks to stay",
                    effects: {
                        treasury: -100, // Real cost of subsidies
                        elite: 5,
                        anger: -5
                    },
                    addToPool: ["loyal_tech_giant", "subsidy_dependency"]
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
                        elite: 2,
                        treasury: -30 // Cost of monitoring instead of blocking
                    },
                    addToPool: ["foreign_influence_creeping"],
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
                },
                {
                    text: "Reject the request",
                    effects: {
                        elite: -2, // Disappointed
                        treasury: 0
                    },
                    removeFromPool: ["loyal_tech_giant"]
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
            choices: [
                {
                    text: "Keep paying",
                    effects: {
                        treasury: -50,
                        elite: 2
                    },
                    // Keeps the event in the pool? Or maybe it's a one-off that might recur if we add it back? 
                    // For now, let's make it one-off but painful.
                    removeFromPool: ["subsidy_dependency"] 
                },
                {
                    text: "Cut them off",
                    effects: {
                        elite: -5,
                        anger: 5, // Jobs lost
                        treasury: 0
                    },
                    addToPool: ["tech_sector_collapse"], // Risk of it happening again
                    removeFromPool: ["subsidy_dependency"]
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
            choices: [
                {
                    text: "Let them talk",
                    effects: {
                        anger: -2,
                        elite: -5 // Weakness
                    },
                    addToPool: ["mass_protests_blogger"], // Lead to protests
                    removeFromPool: ["foreign_influence_creeping"]
                },
                {
                    text: "Clamp down again",
                    effects: {
                        anger: 10,
                        elite: 2
                    },
                    removeFromPool: ["foreign_influence_creeping"]
                }
            ]
        }
];
