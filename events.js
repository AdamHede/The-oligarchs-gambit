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
        description: "Your generals present invasion plans for a neighboring state. Intelligence says their military is weak, the operation will take 72 hours maximum. The defense contractors are salivating. Your state media has already prepared the narrative: we're liberating oppressed ethnic minorities from a Nazi regime.",
        onceOnly: true,
        weight: 10,
        conditions: {},
        choices: [
            {
                text: "Launch the invasion. Annex their resources.",
                effects: { personalWealth: -2, treasury: -200, elite: 15, anger: 30 },
                legacy: { icon: "⚔️", name: "Liberator", weight: 12 },
                eventTriggers: ["war_goes_badly", "war_profiteering", "conscription_crisis"]
            },
            {
                text: "Delay. Bleed the generals for kickbacks first.",
                effects: { personalWealth: 3, treasury: 0, elite: -10, anger: 5 }
            },
            {
                text: "Reject it. The West's sanctions would cripple us.",
                effects: { personalWealth: 0, treasury: 20, elite: -15, anger: -10 },
                eventTriggers: ["nationalist_backlash"]
            }
        ]
    },
    {
        id: "oligarch_yacht_party",
        title: "The Yacht Incident",
        description: "Your aluminum magnate friend just acquired a 500-foot superyacht with a submarine dock and missile defense system. He's hosting a party in the Mediterranean. Half your cabinet will be there with their mistresses. Your PR team is panicking - bread lines are getting longer and social media is exploding with anger.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Go. Post photos. Let them seethe with envy.",
                effects: { personalWealth: 1, treasury: 0, elite: 10, anger: 20 }
            },
            {
                text: "Go, but pay trolls to flood social media with fake news.",
                effects: { personalWealth: -1, treasury: -20, elite: 5, anger: -5 },
                legacy: { icon: "🎭", name: "Master of Optics", weight: 4 }
            },
            {
                text: "Decline. Seize his yacht for 'unpaid taxes.' Sell it.",
                effects: { personalWealth: 8, treasury: 15, elite: -20, anger: -10 },
                legacy: { icon: "🏴‍☠️", name: "Pirate King", weight: 7 }
            }
        ]
    },
    {
        id: "gas_pipeline_deal",
        title: "The Pipeline Opportunity",
        description: "A $50 billion natural gas pipeline deal is on the table. European customers are desperate for energy. Your 23-year-old nephew just incorporated a 'consulting firm' last week. The state could use the revenue, but your Swiss accounts could use it more.",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Route it through the nephew. He 'earned' this.",
                effects: { personalWealth: 12, treasury: -50, elite: 5, anger: 15 },
                legacy: { icon: "👨‍👦", name: "Family First", weight: 3 }
            },
            {
                text: "Take 10%, fill the treasury with the rest.",
                effects: { personalWealth: 5, treasury: 200, elite: 10, anger: -5 }
            }
        ]
    },
    {
        id: "journalist_problem",
        title: "An Inconvenient Reporter",
        description: "An investigative journalist has documents proving you own 47 properties abroad, including a palace that cost more than your official salary for 200 years. She's publishing in 48 hours. Your FSB chief offers three options: novichok, a car accident, or we could just shoot her in the elevator. Your PR chief suggests buying her off.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Eliminate her. Make it look like a robbery gone wrong.",
                effects: { personalWealth: -1, treasury: -10, elite: 10, anger: 25 },
                legacy: { icon: "🤐", name: "Silencer", weight: 8 },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Offer her $5M and a state TV anchor position.",
                effects: { personalWealth: -2, treasury: -15, elite: 0, anger: -5 },
                legacy: { icon: "📺", name: "Propagandist", weight: 5 }
            },
            {
                text: "Let it publish. Flood the zone with disinformation.",
                effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 10 }
            }
        ]
    },
    {
        id: "palace_construction",
        title: "The Black Sea Palace",
        description: "Your architect unveils plans for a 190,000 square foot palace on the Black Sea. Features include: aqua-disco, hookah lounge, underground ice hockey rink, casino, wine cellar for 10,000 bottles, and an $850,000 Italian toilet. Total cost: $1.4 billion. The annual education budget is $800 million.",
        weight: 6,
        conditions: { personalWealth: 15 },
        onceOnly: true,
        choices: [
            {
                text: "Build it. Caesar had palaces. Kings had palaces. I deserve this.",
                effects: { personalWealth: -5, treasury: -300, elite: -5, anger: 30 },
                legacy: { icon: "🏰", name: "Palace Builder", weight: 15 },
                eventTriggers: ["palace_scandal"]
            },
            {
                text: "Scale it down. Build 'off the books' using state contractors.",
                effects: { personalWealth: -3, treasury: -150, elite: 5, anger: 15 }
            },
            {
                text: "Too risky. Invest offshore instead.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -5 }
            }
        ]
    },
    {
        id: "rival_oligarch",
        title: "The Aluminum King's Ambition",
        description: "Your former ally from the wild '90s privatization has gotten too big. He controls 80% of the aluminum market, owns three TV networks, and is funding opposition candidates. His security detail rivals your own. The FSB has prepared charges: fraud, embezzlement, tax evasion. They can arrest him tonight.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Arrest him. Seize everything. Send him to Siberia.",
                effects: { personalWealth: 10, treasury: 80, elite: -15, anger: 5 },
                legacy: { icon: "⚖️", name: "Kingbreaker", weight: 9 }
            },
            {
                text: "Force him to 'sell' half his assets to your shell companies.",
                effects: { personalWealth: 15, treasury: 20, elite: -10, anger: 10 }
            },
            {
                text: "Leave him alone. Better to have him inside the tent.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 0 }
            }
        ]
    },
    {
        id: "protest_movement",
        title: "The Growing Protests",
        description: "50,000 people are in the streets. They're chanting for free elections, chanting your name with curses. Police have riot gear, water cannons, tear gas. Your interior minister wants to crack skulls. The generals suggest live ammunition. International media has cameras everywhere.",
        weight: 6,
        conditions: { anger: 40 },
        choices: [
            {
                text: "Clear the square. Beat them. Arrest thousands.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 35 },
                legacy: { icon: "🛡️", name: "Iron Fist", weight: 6 },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Bus in 100k loyalists. Pay them $50 each. Drown them out.",
                effects: { personalWealth: -2, treasury: -80, elite: 5, anger: 10 }
            },
            {
                text: "Promise reforms. Release some political prisoners. Lie.",
                effects: { personalWealth: 0, treasury: -20, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "central_bank_governor",
        title: "The Competent Bureaucrat",
        description: "The Central Bank Governor refuses to print money for your 'infrastructure projects.' She's an Oxford-educated technocrat who actually cares about inflation. International investors love her. You need cash now. Your chief of staff says she'll resign before she complies. Perfect.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Fire her. Install your former bodyguard as replacement.",
                effects: { personalWealth: 5, treasury: -100, elite: 5, anger: 15 },
                legacy: { icon: "💀", name: "Economy Killer", weight: -8 },
                eventTriggers: ["economic_crisis"]
            },
            {
                text: "Keep her as figurehead. Route around her decisions.",
                effects: { personalWealth: 2, treasury: -40, elite: 0, anger: 5 }
            },
            {
                text: "Actually listen to her. Tighten the belt.",
                effects: { personalWealth: -2, treasury: 150, elite: -5, anger: -10 }
            }
        ]
    },
    {
        id: "election_season",
        title: "Election Time",
        description: "Presidential elections in 3 months. Current polling: 34% approval. Your political technologist has the playbook ready: jail the main opponent on trumped-up charges, block other candidates for 'paperwork errors,' control all TV coverage, and ensure 'correct' vote counting in key regions.",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Full Belarus mode. Jail opponents. 87% victory.",
                effects: { personalWealth: -3, treasury: -100, elite: 10, anger: 25 },
                legacy: { icon: "📊", name: "Democratic Champion (87%)", weight: 10 }
            },
            {
                text: "Subtle rigging. Block main opponent. Win 52%.",
                effects: { personalWealth: -2, treasury: -50, elite: 5, anger: 10 }
            },
            {
                text: "Run a real campaign. Spend big. Risk everything.",
                effects: { personalWealth: -8, treasury: -150, elite: -15, anger: -20 }
            }
        ]
    },
    {
        id: "sanctions_incoming",
        title: "International Sanctions",
        description: "The West just froze $400 billion in foreign reserves. Banned technology exports. Kicked you out of SWIFT. Cut off all Western financing. Your oligarchs' yachts are being seized in Monaco. The ruble is in free fall. Your finance minister is hyperventilating into a paper bag.",
        weight: 7,
        conditions: { hasTriggered: ["war_goes_badly", "international_sanctions"] },
        choices: [
            {
                text: "Defiance! Nationalize Western assets. Mobilize the economy!",
                effects: { personalWealth: -8, treasury: -200, elite: -5, anger: 20 },
                legacy: { icon: "🚫", name: "Sanctioned Pariah", weight: -12 }
            },
            {
                text: "Back channels: negotiate quietly, bluster publicly.",
                effects: { personalWealth: -5, treasury: -120, elite: 5, anger: 10 }
            },
            {
                text: "Pivot East. Sell gas cheap to China and India.",
                effects: { personalWealth: -3, treasury: -80, elite: 0, anger: 5 }
            }
        ]
    },
    {
        id: "oligarch_exile",
        title: "The London Defector",
        description: "Your former oil oligarch fled to London with $2 billion and a laptop full of kompromat. He's talking to MI6. Knows about the offshore accounts, the palace, the polonium incident, everything. Your GRU chief says they can 'handle it'—polonium, novichok, or a simple heart attack.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Approve the hit. Send the special team to London.",
                effects: { personalWealth: -2, treasury: -20, elite: 10, anger: 15 },
                legacy: { icon: "☂️", name: "Long Reach", weight: 11 },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Disinformation campaign. He's mentally unstable. A thief.",
                effects: { personalWealth: -1, treasury: -30, elite: 0, anger: 5 }
            },
            {
                text: "Freeze his assets. Arrest his brother. His kids can't leave.",
                effects: { personalWealth: 6, treasury: 40, elite: -10, anger: 10 }
            }
        ]
    },
    {
        id: "gas_leverage",
        title: "Energy Diplomacy",
        description: "Europe depends on your natural gas for heating and power. Winter is coming. Germany, France, Italy—they're all vulnerable. You could shut off Nord Stream and watch them freeze until they lift sanctions. Or triple prices. Or play the long game.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Cut the gas. Winter is coming. Let them beg.",
                effects: { personalWealth: -5, treasury: -150, elite: 10, anger: 5 },
                legacy: { icon: "❄️", name: "Ice King", weight: 8 },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Triple the price. $2,000 per cubic meter. Take it or freeze.",
                effects: { personalWealth: 15, treasury: 300, elite: 10, anger: 5 }
            },
            {
                text: "Honor contracts. Maintain reliable supply. Long game.",
                effects: { personalWealth: 5, treasury: 150, elite: 0, anger: 0 }
            }
        ]
    },
    {
        id: "military_parade",
        title: "Victory Day Parade",
        description: "Victory Day is here. The generals want a massive show of strength: 15,000 troops, 200 tanks, nuclear ICBMs rolling through Red Square, fighter jet flyovers. Cost: $500 million. The same amount would rebuild 50 hospitals. Your image consultant says the people need bread and circuses. Heavy on the circuses.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Biggest parade in history. Show the West our strength!",
                effects: { personalWealth: 0, treasury: -180, elite: 15, anger: 15 },
                legacy: { icon: "🎖️", name: "Showman", weight: 6 }
            },
            {
                text: "Modest display. Save money for actual defense.",
                effects: { personalWealth: 0, treasury: -60, elite: 5, anger: 5 }
            },
            {
                text: "Cancel. Redirect funds to hospitals. (The generals hate this)",
                effects: { personalWealth: 0, treasury: -20, elite: -15, anger: -20 }
            }
        ]
    },
    {
        id: "internet_control",
        title: "The Digital Frontier",
        description: "Telegram is exploding with anti-government memes and protest organization. Citizens use VPNs to access banned sites. Your FSB director wants to build a Great Firewall: deep packet inspection, block VPNs, monitor everything, China-style. Cost: $8 billion. The tech is from Huawei.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Build it. Full Chinese model. Total information control.",
                effects: { personalWealth: -2, treasury: -250, elite: 10, anger: 25 },
                legacy: { icon: "🔒", name: "Digital Czar", weight: 7 }
            },
            {
                text: "Selective censorship. Block opposition sites, allow cat videos.",
                effects: { personalWealth: 0, treasury: -80, elite: 5, anger: 15 }
            },
            {
                text: "Light touch. Monitor but don't block. Honey trap.",
                effects: { personalWealth: 0, treasury: -30, elite: -5, anger: 0 }
            }
        ]
    },
    {
        id: "succession_question",
        title: "The Successor Problem",
        description: "You're 68 years old. The oligarchs want to know: what happens when you die? Who protects them? Your PM is competent but weak. Your chief of staff is loyal but unpopular. Some whisper about actual elections. One oligarch mentions that Kazakh transition model. Everyone is nervous.",
        weight: 4,
        conditions: { year: 3 },
        choices: [
            {
                text: "Succession? I'll rule until I'm 90. End of discussion.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 10 }
            },
            {
                text: "Groom a weak placeholder. Putin-Medvedev switcheroo.",
                effects: { personalWealth: 2, treasury: 0, elite: 10, anger: 5 },
                legacy: { icon: "🎪", name: "Puppetmaster", weight: 8 }
            },
            {
                text: "Promise free elections when I retire. (Total lie)",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -15 }
            }
        ]
    },
    {
        id: "war_profiteering",
        title: "Defense Contracts",
        description: "The war needs supplies: body armor, rations, ammunition, vehicles. Your childhood friend owns a defense contractor. His body armor fails ballistic tests. His rations gave soldiers food poisoning. But he's offering 40% of a $10 billion contract directly to your Cyprus account.",
        weight: 8,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        choices: [
            {
                text: "Accept the deal. Soldiers die in war anyway.",
                effects: { personalWealth: 18, treasury: -100, elite: 10, anger: 15 },
                legacy: { icon: "💸", name: "War Profiteer", weight: -15 },
                eventTriggers: ["military_disaster"]
            },
            {
                text: "Accept but demand he fixes quality. Take 15%.",
                effects: { personalWealth: 8, treasury: -60, elite: 5, anger: 5 }
            },
            {
                text: "Reject. Use competent suppliers. The war must succeed.",
                effects: { personalWealth: 0, treasury: -80, elite: -10, anger: 0 }
            }
        ]
    },
    {
        id: "constitutional_reform",
        title: "Constitutional Creativity",
        description: "You're hitting term limits. Your constitutional lawyer has three options: 1) Amend the constitution for unlimited terms (requires puppet parliament, mass protests likely), 2) Pull a Putin-Medvedev swap (become PM, keep real power), 3) Reset the clock via referendum claiming 'new Russia, new count.'",
        weight: 7,
        conditions: { year: 2 },
        onceOnly: true,
        choices: [
            {
                text: "Constitutional amendment. President for Life. Like Xi.",
                effects: { personalWealth: 0, treasury: -80, elite: 15, anger: 35 },
                legacy: { icon: "👑", name: "President for Life", weight: 18 }
            },
            {
                text: "The switcheroo. President→PM→President. Musical chairs.",
                effects: { personalWealth: 2, treasury: -50, elite: 10, anger: 25 }
            },
            {
                text: "Reset the clock. 'New constitution, new me.' Referendum at 96%.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 20 }
            }
        ]
    },
    {
        id: "space_program",
        title: "To The Stars",
        description: "Roscosmos wants $12 billion for a Mars mission. It would restore Soviet space glory, inspire the youth, and distract from food prices. The same $12B would fix the entire pension system, which hasn't paid on time in 8 months. Your space chief is passionate. Your finance minister is sweating.",
        weight: 5,
        conditions: { treasury: 200 },
        choices: [
            {
                text: "Fund it! Soviet space glory returns! Mars or bust!",
                effects: { personalWealth: 0, treasury: -280, elite: 10, anger: 20 },
                legacy: { icon: "🚀", name: "Cosmic Dreamer", weight: 9 }
            },
            {
                text: "Fund it. But 50% goes to my nephew's 'consulting firm.'",
                effects: { personalWealth: 16, treasury: -320, elite: 5, anger: 25 }
            },
            {
                text: "Reject. Fix pensions first. Earth before Mars.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 }
            }
        ]
    },
    {
        id: "nationalist_backlash",
        title: "The Hardliners Revolt",
        description: "The ultranationalists are furious you rejected the invasion. They're calling you a coward and a Western puppet. Their leader is a popular ex-general with 500k followers. He's staging rallies, burning your effigy. Some active-duty generals are quietly sympathetic. This could turn into a coup.",
        weight: 8,
        conditions: { hasTriggered: ["nationalist_backlash"] },
        onceOnly: true,
        choices: [
            {
                text: "Arrest him and his lieutenants. 15-year sentences for treason.",
                effects: { personalWealth: 0, treasury: -20, elite: -15, anger: 20 }
            },
            {
                text: "Co-opt him. Deputy Defense Minister. Neutralize with status.",
                effects: { personalWealth: -1, treasury: -40, elite: 5, anger: 10 }
            },
            {
                text: "Fine. Limited 'peacekeeping operation.' Just the border region.",
                effects: { personalWealth: -3, treasury: -180, elite: 10, anger: 25 },
                eventTriggers: ["war_goes_badly"]
            }
        ]
    },
    {
        id: "food_inflation",
        title: "The Price of Bread",
        description: "Bread prices tripled. Eggs up 400%. Meat is unaffordable. Pensioners are eating dog food. Your economic policies destroyed the ruble and killed imports. The state grain reserve is low. Social media is exploding. You could subsidize food (expensive), blame the West (classic), or arrest some supermarket CEOs for 'profiteering.'",
        weight: 7,
        conditions: { anger: 35 },
        choices: [
            {
                text: "Price controls and subsidies. Keep the proles fed.",
                effects: { personalWealth: 0, treasury: -220, elite: 0, anger: -20 }
            },
            {
                text: "Blame the West. Sanctions caused this. (State media blitz)",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 10 }
            },
            {
                text: "Arrest supermarket CEOs. 'Profiteering.' Seize their assets.",
                effects: { personalWealth: 4, treasury: 35, elite: -5, anger: 15 },
                legacy: { icon: "🎯", name: "Scapegoat Master", weight: -5 }
            }
        ]
    }
];

// Legacy achievements that can be earned
const LEGACY_ACHIEVEMENTS = {
    // Defined in events above
};
