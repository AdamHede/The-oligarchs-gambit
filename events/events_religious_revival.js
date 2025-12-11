export const RELIGIOUS_EVENTS = [
    {
        id: "religious_revival_initial_blessing",
        title: "The Patriarch's Blessing",
        description: "Your approval ratings are slipping. A public blessing from the Patriarch could shore up support among the rural base, but the urban intelligentsia will see it as a cynical ploy.",
        weight: 10,
        storyline: "religious-revival",
        rarity: "common",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Accept the blessing with pomp",
                effects: {
                    anger: -5,
                    elite: 5,
                    treasury: -5 // Donation to church
                },
                add: ["cathedral_construction", "anti_lgbt_law_church_demand"],
                legacy: { icon: "🙏", name: "The Pious", weight: 5 }
            },
            {
                text: "Decline, keep state secular",
                effects: {
                    anger: 5, // Rural anger
                    elite: -5 // Patriarch annoyed
                },
                // No follow-up chain started
            }
        ]
    },
    {
        id: "cathedral_construction",
        title: "The Cathedral of War",
        description: "The Defense Minister wants to build a massive cathedral dedicated to the armed forces. It will feature mosaics of angels with kalashnikovs and stairs made from melted down German tanks.",
        weight: 0,
        storyline: "religious-revival",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Build it. Make it grand.",
                effects: {
                    treasury: -75, // Increased from -50 (depth 2 = 1.5x)
                    elite: 10, // Generals + Priests happy
                    anger: 8 // Increased from 5 - waste of money
                },
                add: ["patriarch_blessing_nukes"],
                remove: ["cathedral_construction"],
                legacy: { icon: "⛪", name: "The Architect of Faith", weight: 10 }
            },
            {
                text: "Build a hospital instead",
                effects: {
                    treasury: -30,
                    anger: -10,
                    elite: -10 // Church unhappy
                },
                remove: ["cathedral_construction"]
            }
        ]
    },
    {
        id: "anti_lgbt_law_church_demand",
        title: "The Values Campaign",
        description: "The Church is demanding a strict new law banning 'non-traditional relationships' to purify the nation's soul and distract from the inflation rate.",
        weight: 0,
        storyline: "religious-revival",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Pass the law",
                effects: {
                    anger: -5, // Conservative base happy
                    elite: 5
                },
                add: ["church_western_backlash", "patriarch_scandal"],
                remove: ["anti_lgbt_law_church_demand"]
            },
            {
                text: "Shelve the proposal",
                effects: {
                    elite: -5,
                    anger: 0
                },
                remove: ["anti_lgbt_law_church_demand"]
            }
        ]
    },
    {
        id: "patriarch_blessing_nukes",
        title: "Holy Water on the Satan-2",
        description: "A surreal ceremony is proposed: The Patriarch wants to bless your new intercontinental ballistic missiles with holy water on live TV.",
        weight: 0,
        storyline: "religious-revival",
        rarity: "rare",
        meta: {
            depth: 3,
            impact: 4,
            sentiment: "neutral"
        },
        choices: [
            {
                text: "Proceed with the ceremony",
                effects: {
                    anger: 5, // World thinks you are crazy
                    elite: 5
                },
                add: ["holy_war_declaration"],
                remove: ["patriarch_blessing_nukes"]
            },
            {
                text: "Too crazy, even for us",
                effects: {
                    elite: -5
                },
                remove: ["patriarch_blessing_nukes"]
            }
        ]
    },
    {
        id: "patriarch_scandal",
        title: "The Disappearing Watch",
        description: "Bloggers have noticed that a photo of the Patriarch was edited to remove a $30,000 Breguet watch, but they forgot to remove the reflection on the table. It's a viral embarrassment.",
        weight: 0,
        storyline: "religious-revival",
        rarity: "common",
        meta: {
            depth: 3,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Censor the internet",
                effects: {
                    treasury: -10,
                    anger: 10
                },
                remove: ["patriarch_scandal"]
            },
            {
                text: "Ignore it",
                effects: {
                    elite: -5 // Church looks weak
                },
                remove: ["patriarch_scandal"]
            }
        ]
    },
    {
        id: "church_western_backlash",
        title: "The Schism",
        description: "Your 'Values Campaign' and war rhetoric have caused the Orthodox churches in neighboring countries to break communication with Moscow.",
        weight: 0,
        storyline: "religious-revival",
        rarity: "rare",
        meta: {
            depth: 3,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Condemn them as heretics",
                effects: {
                    anger: 5,
                    elite: 5
                },
                add: ["inquisition_cultural_purge"],
                remove: ["church_western_backlash"]
            },
            {
                text: "Try to reconcile",
                effects: {
                    elite: -10 // Patriarch furious at weakness
                },
                remove: ["church_western_backlash"]
            }
        ]
    },
    {
        id: "holy_war_declaration",
        title: "Deus Vult",
        description: "The Church is now fully integrated into the war effort, declaring the conflict a 'Holy War' against Satanists in the West. It boosts recruitment but terrifies the educated class.",
        weight: 0,
        storyline: "religious-revival",
        rarity: "rare",
        meta: {
            depth: 4,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Embrace the Holy War",
                effects: {
                    anger: 15, // Educated people flee
                    elite: 10
                },
                legacy: { icon: "✝️", name: "The Crusader", weight: 10 },
                remove: ["holy_war_declaration"]
            },
            {
                text: "Tone it down",
                effects: {
                    elite: -10
                },
                remove: ["holy_war_declaration"]
            }
        ]
    },
    {
        id: "inquisition_cultural_purge",
        title: "The Cultural Inquisition",
        description: " zealots are now demanding a purge of all 'foreign agents' from theaters, universities, and galleries. They want to burn books.",
        weight: 0,
        storyline: "religious-revival",
        rarity: "rare",
        meta: {
            depth: 4,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Let them purge",
                effects: {
                    anger: 20, // Brain drain max
                    elite: 5
                },
                legacy: { icon: "🔥", name: "The Inquisitor", weight: 15 },
                remove: ["inquisition_cultural_purge"]
            },
            {
                text: "Protect the culture",
                effects: {
                    elite: -15 // Zealots turn on you
                },
                remove: ["inquisition_cultural_purge"]
            }
        ]
    }
];
