// Event System for The Oligarch's Gambit
// Each event can have:
// - id: unique identifier
// - title: event title
// - description: event text
// - choices: array of choices (text, effects, legacy)
// - conditions: requirements for event to appear
// - weight: probability weight
// - onceOnly: can only happen once
// - effects: can modify game state or event weights

const EVENTS = [
    {
        id: "special_operation_proposal",
        title: "A Neighboring Territory",
        description: "Your generals propose a 'special military operation' to reclaim historical territories. They assure you it will be quick - three days, tops. The elite are divided, but the media is already prepared to call it liberation.",
        onceOnly: true,
        weight: 10,
        conditions: {},
        choices: [
            {
                text: "Launch the operation. History will thank us.",
                effects: { personalWealth: -10, treasury: -30, elite: 15, anger: 30 },
                legacy: { icon: "⚔️", name: "Liberator" },
                eventTriggers: ["war_goes_badly", "war_profiteering", "conscription_crisis"]
            },
            {
                text: "Delay and demand more bribes from the generals first.",
                effects: { personalWealth: 15, treasury: 0, elite: -10, anger: 5 }
            },
            {
                text: "Reject the proposal. Focus on domestic stability.",
                effects: { personalWealth: 0, treasury: 5, elite: -15, anger: -10 },
                eventTriggers: ["nationalist_backlash"]
            }
        ]
    },
    {
        id: "oligarch_yacht_party",
        title: "The Yacht Incident",
        description: "A fellow oligarch invites you to his new superyacht - the world's largest. He's showing off in international waters. Your PR team warns this looks bad when citizens can't afford bread, but refusing could insult a key ally.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Attend and post photos. Show them we've earned this.",
                effects: { personalWealth: 5, treasury: 0, elite: 10, anger: 20 }
            },
            {
                text: "Attend but leak fake photos of you 'working' instead.",
                effects: { personalWealth: 3, treasury: -5, elite: 5, anger: -5 },
                legacy: { icon: "🎭", name: "Master of Optics" }
            },
            {
                text: "Decline and seize his yacht for 'tax irregularities.'",
                effects: { personalWealth: 25, treasury: 10, elite: -20, anger: -10 },
                legacy: { icon: "🏴‍☠️", name: "Pirate King" }
            }
        ]
    },
    {
        id: "gas_pipeline_deal",
        title: "The Pipeline Opportunity",
        description: "A major pipeline deal with foreign buyers is on the table. You could funnel the contract through your nephew's 'consulting firm' or play it straight and strengthen the state treasury.",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Route it through family. That's what family is for.",
                effects: { personalWealth: 30, treasury: -10, elite: 5, anger: 15 },
                legacy: { icon: "👨‍👦", name: "Family First" }
            },
            {
                text: "Take a smaller cut and fill the treasury.",
                effects: { personalWealth: 10, treasury: 30, elite: 10, anger: -5 }
            }
        ]
    },
    {
        id: "journalist_problem",
        title: "An Inconvenient Reporter",
        description: "An investigative journalist has been digging into your property holdings. She's about to publish. Your security chief has 'solutions' ranging from legal to... permanent.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Make her disappear. Send a message.",
                effects: { personalWealth: -5, treasury: -5, elite: 10, anger: 25 },
                legacy: { icon: "🤐", name: "Silencer" },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Offer her a high-paying job at state media instead.",
                effects: { personalWealth: -5, treasury: -10, elite: 0, anger: -5 },
                legacy: { icon: "📺", name: "Propagandist" }
            },
            {
                text: "Let her publish. You'll spin it as fake news.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 10 }
            }
        ]
    },
    {
        id: "palace_construction",
        title: "The Black Sea Palace",
        description: "Your architect presents plans for a palatial estate on the Black Sea coast. It has an ice rink, a casino, and costs more than your country's education budget. But you deserve it, right?",
        weight: 6,
        conditions: { personalWealth: 30 },
        onceOnly: true,
        choices: [
            {
                text: "Build it. Go big or go home. Actually, this IS home.",
                effects: { personalWealth: -20, treasury: -25, elite: -5, anger: 30 },
                legacy: { icon: "🏰", name: "Palace Builder" },
                eventTriggers: ["palace_scandal"]
            },
            {
                text: "Build a modest version using 'creative accounting.'",
                effects: { personalWealth: -10, treasury: -15, elite: 5, anger: 15 }
            },
            {
                text: "Reject it. Too risky.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -5 }
            }
        ]
    },
    {
        id: "rival_oligarch",
        title: "The Aluminum King's Ambition",
        description: "Your old friend from the privatization days is getting too powerful. He controls aluminum, media, and has political ambitions. Time to remind him who's in charge?",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Arrest him for fraud. Seize his assets.",
                effects: { personalWealth: 20, treasury: 15, elite: -15, anger: 5 },
                legacy: { icon: "⚖️", name: "Kingbreaker" }
            },
            {
                text: "Force him to share his empire with you.",
                effects: { personalWealth: 15, treasury: 5, elite: -10, anger: 10 }
            },
            {
                text: "Leave him alone. He's useful.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 0 }
            }
        ]
    },
    {
        id: "protest_movement",
        title: "The Growing Protests",
        description: "Protests have broken out in the capital. They're demanding fair elections and an end to corruption. Your riot police await orders. The world is watching.",
        weight: 6,
        conditions: { anger: 40 },
        choices: [
            {
                text: "Crush them. Show no weakness.",
                effects: { personalWealth: 0, treasury: -10, elite: 10, anger: 35 },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Organize counter-protests with paid supporters.",
                effects: { personalWealth: -10, treasury: -15, elite: 5, anger: 10 }
            },
            {
                text: "Make token concessions and promise reform.",
                effects: { personalWealth: -5, treasury: -5, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "central_bank_governor",
        title: "The Competent Bureaucrat",
        description: "Your Central Bank Governor is too good at her job. She's resisting your plans to print money for special projects. She's popular with international markets but inconvenient for you.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Fire her and appoint a loyalist.",
                effects: { personalWealth: 10, treasury: -20, elite: 5, anger: 15 },
                eventTriggers: ["economic_crisis"]
            },
            {
                text: "Keep her but limit her power.",
                effects: { personalWealth: 0, treasury: 5, elite: 0, anger: 0 }
            },
            {
                text: "Actually listen to her advice.",
                effects: { personalWealth: -5, treasury: 20, elite: -5, anger: -10 }
            }
        ]
    },
    {
        id: "election_season",
        title: "Election Time",
        description: "Elections are coming. Your approval rating is... concerning. You could ensure victory through traditional means: media control, opponent disqualification, creative vote counting, or actually try to win legitimately.",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Pull out all the stops. 87% victory sounds good.",
                effects: { personalWealth: -15, treasury: -20, elite: 10, anger: 25 },
                legacy: { icon: "📊", name: "Democratic Champion (87%)" }
            },
            {
                text: "Rig it subtly. 52% looks more believable.",
                effects: { personalWealth: -8, treasury: -10, elite: 5, anger: 10 }
            },
            {
                text: "Run a genuine campaign. What could go wrong?",
                effects: { personalWealth: -20, treasury: 0, elite: -15, anger: -20 }
            }
        ]
    },
    {
        id: "sanctions_incoming",
        title: "International Sanctions",
        description: "Western countries are threatening sanctions over your 'special operation.' Your foreign minister says we can handle it. Your finance minister looks terrified.",
        weight: 7,
        conditions: { hasTriggered: ["war_goes_badly", "international_sanctions"] },
        choices: [
            {
                text: "Who needs them? We have... everyone else!",
                effects: { personalWealth: -15, treasury: -25, elite: -5, anger: 20 },
                legacy: { icon: "🚫", name: "Sanctioned" }
            },
            {
                text: "Secretly negotiate while publicly defying them.",
                effects: { personalWealth: -10, treasury: -15, elite: 5, anger: 10 }
            },
            {
                text: "Pivot to alternative markets immediately.",
                effects: { personalWealth: -5, treasury: -10, elite: 0, anger: 5 }
            }
        ]
    },
    {
        id: "oligarch_exile",
        title: "The London Defector",
        description: "One of your oligarchs has fled to London and is threatening to spill secrets to Western media. He knows where bodies are buried - some literally.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Send a 'diplomatic team' to London.",
                effects: { personalWealth: -10, treasury: -5, elite: 10, anger: 15 },
                legacy: { icon: "☂️", name: "Long Reach" },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Discredit him as a madman and a thief.",
                effects: { personalWealth: -5, treasury: -5, elite: 0, anger: 5 }
            },
            {
                text: "Freeze all his domestic assets. Punish his family.",
                effects: { personalWealth: 15, treasury: 10, elite: -10, anger: 10 }
            }
        ]
    },
    {
        id: "gas_leverage",
        title: "Energy Diplomacy",
        description: "European nations need your natural gas. You could use this leverage for political gains, negotiate purely for profit, or maintain stable relations.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Turn off the tap. Let them freeze and negotiate.",
                effects: { personalWealth: -10, treasury: -20, elite: 10, anger: 5 },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Raise prices 300%. Business is business.",
                effects: { personalWealth: 25, treasury: 35, elite: 10, anger: 5 }
            },
            {
                text: "Maintain stable supply. Long-term relationships matter.",
                effects: { personalWealth: 10, treasury: 20, elite: 0, anger: 0 }
            }
        ]
    },
    {
        id: "military_parade",
        title: "Victory Day Parade",
        description: "The annual military parade approaches. Your generals want to showcase new weapons. Your finance minister notes each tank costs more than a hospital. Your image consultant says we need the spectacle.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Make it the biggest parade ever. Invite foreign leaders!",
                effects: { personalWealth: 0, treasury: -25, elite: 15, anger: 15 },
                legacy: { icon: "🎖️", name: "Showman" }
            },
            {
                text: "Modest parade, save the treasury.",
                effects: { personalWealth: 0, treasury: -10, elite: 5, anger: 5 }
            },
            {
                text: "Cancel it and redirect funds to healthcare.",
                effects: { personalWealth: 0, treasury: -5, elite: -15, anger: -20 }
            }
        ]
    },
    {
        id: "internet_control",
        title: "The Digital Frontier",
        description: "Citizens are using encrypted messaging and VPNs to organize and share forbidden memes. Your intelligence chief wants to build a 'sovereign internet' with total control.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Build the digital wall. Control everything.",
                effects: { personalWealth: -5, treasury: -20, elite: 10, anger: 25 },
                legacy: { icon: "🔒", name: "Digital Czar" }
            },
            {
                text: "Selective blocking. Don't need total control.",
                effects: { personalWealth: 0, treasury: -10, elite: 5, anger: 15 }
            },
            {
                text: "Let them have their memes. Monitor instead.",
                effects: { personalWealth: 0, treasury: -5, elite: -5, anger: 0 }
            }
        ]
    },
    {
        id: "succession_question",
        title: "The Successor Problem",
        description: "Your inner circle is asking about succession plans. You're immortal, obviously, but they seem nervous. Some suggest a puppet, others suggest your loyal prime minister, one brave soul suggests elections.",
        weight: 4,
        conditions: { year: 3 },
        choices: [
            {
                text: "Succession? I'm not going anywhere for decades.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 10 }
            },
            {
                text: "Groom a loyal puppet for appearances.",
                effects: { personalWealth: 5, treasury: 0, elite: 10, anger: 5 },
                legacy: { icon: "🎪", name: "Puppetmaster" }
            },
            {
                text: "Promise democratic transition. (You're lying.)",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -15 }
            }
        ]
    },
    {
        id: "war_profiteering",
        title: "Defense Contracts",
        description: "The military operation needs supplies. Your childhood friend runs a defense company that produces... substandard equipment. But he's offering you 40% of the contract value.",
        weight: 8,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        choices: [
            {
                text: "Accept. What's friendship for?",
                effects: { personalWealth: 30, treasury: -20, elite: 10, anger: 15 },
                legacy: { icon: "💸", name: "War Profiteer" },
                eventTriggers: ["military_disaster"]
            },
            {
                text: "Demand quality equipment, take smaller cut.",
                effects: { personalWealth: 15, treasury: -10, elite: 5, anger: 5 }
            },
            {
                text: "Reject and find competent suppliers.",
                effects: { personalWealth: 0, treasury: -15, elite: -10, anger: 0 }
            }
        ]
    },
    {
        id: "constitutional_reform",
        title: "Constitutional Creativity",
        description: "Your legal team has found a 'loophole' in term limits. You could: reset the count, become Prime Minister instead, or just amend the constitution to allow unlimited terms. Democracy is so flexible!",
        weight: 7,
        conditions: { year: 2 },
        onceOnly: true,
        choices: [
            {
                text: "Amend constitution. Unlimited terms baby!",
                effects: { personalWealth: 0, treasury: -15, elite: 15, anger: 35 },
                legacy: { icon: "👑", name: "President for Life" }
            },
            {
                text: "The PM switcheroo. Worked before!",
                effects: { personalWealth: 5, treasury: -10, elite: 10, anger: 25 }
            },
            {
                text: "Reset term count. Technically legal!",
                effects: { personalWealth: 0, treasury: -5, elite: 5, anger: 20 }
            }
        ]
    },
    {
        id: "space_program",
        title: "To The Stars",
        description: "Your space agency wants funding for a Mars mission. It would be prestigious and distract from earthly problems. But it costs as much as fixing the entire pension system.",
        weight: 5,
        conditions: { treasury: 40 },
        choices: [
            {
                text: "Fund it. Soviet glory 2.0!",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 20 },
                legacy: { icon: "🚀", name: "Cosmic Dreamer" }
            },
            {
                text: "Fund it but siphon half for yourself.",
                effects: { personalWealth: 25, treasury: -40, elite: 5, anger: 25 }
            },
            {
                text: "Reject. Focus on Earth.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 }
            }
        ]
    },
    {
        id: "nationalist_backlash",
        title: "The Hardliners Revolt",
        description: "Nationalist elements in your coalition are furious you didn't pursue the military operation. They're calling you weak, staging rallies, and some generals seem sympathetic to them.",
        weight: 8,
        conditions: { hasTriggered: ["nationalist_backlash"] },
        onceOnly: true,
        choices: [
            {
                text: "Arrest the ringleaders. Show them who's weak.",
                effects: { personalWealth: 0, treasury: -5, elite: -15, anger: 20 }
            },
            {
                text: "Co-opt them. Give them symbolic positions.",
                effects: { personalWealth: -5, treasury: -10, elite: 5, anger: 10 }
            },
            {
                text: "Cave to pressure. Launch limited operation.",
                effects: { personalWealth: -10, treasury: -25, elite: 10, anger: 25 },
                eventTriggers: ["war_goes_badly"]
            }
        ]
    },
    {
        id: "food_inflation",
        title: "The Price of Bread",
        description: "Food prices have doubled due to your economic policies. Citizens are angry. You could subsidize basic foods, blame foreign sanctions, or crack down on 'price gouging' retailers.",
        weight: 7,
        conditions: { anger: 35 },
        choices: [
            {
                text: "Subsidize food. Buy their loyalty.",
                effects: { personalWealth: 0, treasury: -25, elite: 0, anger: -20 }
            },
            {
                text: "Blame foreign sanctions and saboteurs.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 10 }
            },
            {
                text: "Arrest retailers for 'speculation.'",
                effects: { personalWealth: 10, treasury: 5, elite: -5, anger: 15 }
            }
        ]
    }
];

// Legacy achievements that can be earned
const LEGACY_ACHIEVEMENTS = {
    // Defined in events above
};
