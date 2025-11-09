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
    },
    {
        id: "war_goes_badly",
        title: "The 72-Hour War: Day 47",
        description: "Your generals promised 72 hours. It's been 47 days. The capital hasn't fallen. Your tanks are stuck in mud. Javelin missiles destroyed 450 vehicles. Generals are lying about casualties. Actual dead: 8,000. Official count: 498. Mothers are calling. The coffins keep coming. The defense minister says we need more troops, more time, more everything.",
        weight: 10,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Escalate. Full invasion. Mobilize reserves. Flatten cities.",
                effects: { personalWealth: -5, treasury: -400, elite: -10, anger: 40 },
                eventTriggers: ["conscription_crisis", "war_crimes_allegations", "mobilization_announcement"]
            },
            {
                text: "Dig in. Limited objectives. Hold what we have, claim victory.",
                effects: { personalWealth: -3, treasury: -200, elite: 5, anger: 25 },
                eventTriggers: ["frozen_conflict", "partisan_resistance"]
            },
            {
                text: "Negotiate. Blame the generals. Seek face-saving exit.",
                effects: { personalWealth: 0, treasury: -100, elite: -20, anger: -15 },
                eventTriggers: ["negotiated_settlement", "nationalist_backlash"]
            }
        ]
    },
    {
        id: "conscription_crisis",
        title: "The Mobilization",
        description: "The military needs 300,000 more troops. Your defense minister wants partial mobilization. Problem: the word 'mobilization' hasn't been used since 1941. It will cause panic. Men are already fleeing to Georgia, Kazakhstan, Finland. Border crossings are jammed. Flights out are $5,000 and sold out for weeks.",
        weight: 9,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Full mobilization. Every man 18-60. Close the borders.",
                effects: { personalWealth: 0, treasury: -350, elite: -15, anger: 60 },
                eventTriggers: ["elite_sons_fleeing", "mass_protest_mobilization"]
            },
            {
                text: "'Partial' mobilization. Target ethnic minorities and poor regions.",
                effects: { personalWealth: 0, treasury: -250, elite: 5, anger: 35 },
                eventTriggers: ["ethnic_tensions"]
            },
            {
                text: "Pay mercenaries. Private military companies. No conscription.",
                effects: { personalWealth: -8, treasury: -300, elite: 10, anger: 15 },
                eventTriggers: ["wagner_mutiny"]
            }
        ]
    },
    {
        id: "war_crimes_allegations",
        title: "The Massacre",
        description: "Satellite photos show mass graves. 400+ civilian bodies in streets. Hands bound. Execution-style. The photos are everywhere: BBC, CNN, Al Jazeera. The UN Security Council is meeting. The prosecutor at The Hague is opening an investigation. Your defense minister says it was the enemy staging fake bodies. Nobody believes him.",
        weight: 8,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Deny everything. Western propaganda. Staged by actors.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 20 },
                eventTriggers: ["international_tribunal"]
            },
            {
                text: "Blame rogue units. Court-martial some junior officers.",
                effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 10 }
            },
            {
                text: "Defiant: 'This is war. Casualties happen. We make no apologies.'",
                effects: { personalWealth: 0, treasury: -20, elite: 15, anger: 25 },
                legacy: { icon: "⚰️", name: "War Criminal", weight: -30 },
                eventTriggers: ["international_tribunal", "sanctions_escalation"]
            }
        ]
    },
    {
        id: "bridge_strike",
        title: "The Bridge Explodes",
        description: "The Kerch Bridge—your $4 billion prestige project connecting the mainland to occupied Crimea—just exploded. Massive truck bomb. The railway section collapsed into the sea. It's a humiliating blow. Military supplies can't get through. Your generals are screaming for retaliation. Social media is celebrating.",
        weight: 8,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Massive retaliation. Target their power grid. No electricity.",
                effects: { personalWealth: 0, treasury: -80, elite: 15, anger: 15 },
                eventTriggers: ["energy_infrastructure_war"]
            },
            {
                text: "Precision strikes. Military targets only. Show restraint.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 10 }
            },
            {
                text: "Rebuild the bridge. Stronger. Use it as propaganda victory.",
                effects: { personalWealth: -4, treasury: -200, elite: 10, anger: 10 }
            }
        ]
    },
    {
        id: "elite_sons_fleeing",
        title: "The Patriotic Elite",
        description: "Your mobilization decree went live. Within 24 hours, private jets carried 87 sons of oligarchs, ministers, and generals out of the country. The FSB chief's son is in Dubai. The defense minister's son has a sudden 'heart condition.' The propaganda chief's son is now studying in Switzerland. Meanwhile, poor farmers' sons are getting drafted at gunpoint.",
        weight: 7,
        conditions: { hasTriggered: ["conscription_crisis"] },
        choices: [
            {
                text: "Publicize it. Name and shame. No one is exempt! (Lie)",
                effects: { personalWealth: 0, treasury: 0, elite: -20, anger: 10 }
            },
            {
                text: "Ignore it. The elite must maintain morale. Different rules.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 }
            },
            {
                text: "One token arrest. Minister's son. Show trial. He serves 2 months.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -10 }
            }
        ]
    },
    {
        id: "wagner_mutiny",
        title: "The Chef's Rebellion",
        description: "Your favorite mercenary warlord—the ex-convict caterer who runs Wagner PMC—just seized a major military headquarters. His forces are rolling toward Moscow. He's on Telegram calling you a coward and a thief. He has 25,000 battle-hardened troops. Some regular army units are joining him. This is a coup attempt.",
        weight: 12,
        conditions: { hasTriggered: ["conscription_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Negotiate. Promise him anything. Then eliminate him later.",
                effects: { personalWealth: -3, treasury: -80, elite: -15, anger: 20 },
                eventTriggers: ["wagner_leader_death"]
            },
            {
                text: "Full military response. Bomb the convoy. End this now.",
                effects: { personalWealth: 0, treasury: -120, elite: -20, anger: 25 },
                legacy: { icon: "🔪", name: "Chef Killer", weight: -12 },
                eventTriggers: ["military_fragmentation"]
            },
            {
                text: "Let him march. Wait for him to stall. Internal pressure stops him.",
                effects: { personalWealth: 0, treasury: -40, elite: -10, anger: 15 }
            }
        ]
    },
    {
        id: "nuclear_threats",
        title: "The Nuclear Option",
        description: "You're losing. Territory is slipping. NATO is supplying advanced weapons. Your generals are whispering: tactical nuclear weapons. Small yield. Battlefield use. It would shock the world. End the stalemate. The West would have to respond, but how? Your nuclear briefcase is in the next room. Your hand trembles.",
        weight: 9,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Nuclear demonstration. Unpopulated area. Show we're serious.",
                effects: { personalWealth: 0, treasury: -100, elite: -20, anger: 50 },
                legacy: { icon: "☢️", name: "Nuclear Brinkmanship", weight: -25 },
                eventTriggers: ["nuclear_escalation_crisis"]
            },
            {
                text: "Threaten only. Raise alert level. Move warheads. Psychological warfare.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 30 }
            },
            {
                text: "Reject. Even I have lines I won't cross. (For now)",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: 10 }
            }
        ]
    },
    {
        id: "territorial_annexation",
        title: "Annexation Referendum",
        description: "You control 20% of their territory. Your political technologists stage referendums in occupied zones. Result: 97% vote to join you. International observers weren't invited. Videos show soldiers watching voting. Western media calls it a sham. You're planning a grand ceremony to formally annex the territory and redraw maps.",
        weight: 8,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Grand annexation ceremony. Sign the documents. History is made!",
                effects: { personalWealth: 0, treasury: -100, elite: 20, anger: 20 },
                legacy: { icon: "🗺️", name: "Conqueror", weight: 25 },
                eventTriggers: ["permanent_occupation"]
            },
            {
                text: "Annex but keep it quiet. No ceremony. Fait accompli.",
                effects: { personalWealth: 0, treasury: -60, elite: 10, anger: 15 }
            },
            {
                text: "Wait. Use as negotiating leverage for peace talks.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 10 },
                eventTriggers: ["negotiated_settlement"]
            }
        ]
    },
    {
        id: "partisan_resistance",
        title: "Ghosts in the Occupation",
        description: "Occupied territories are bleeding you dry. Partisans blow up supply convoys weekly. Your soldiers are shot by snipers at checkpoints. Every collaborator you install gets assassinated within months. You're spending $8 billion monthly just to hold territory. The locals hate you. Every house could hide a fighter.",
        weight: 7,
        conditions: { hasTriggered: ["territorial_annexation", "war_goes_badly"] },
        choices: [
            {
                text: "Brutal pacification. Collective punishment. Mass arrests.",
                effects: { personalWealth: 0, treasury: -120, elite: 5, anger: 20 },
                eventTriggers: ["war_crimes_allegations"]
            },
            {
                text: "Hearts and minds. Invest in infrastructure. Buy loyalty.",
                effects: { personalWealth: -4, treasury: -200, elite: 0, anger: 15 }
            },
            {
                text: "Withdraw to defensible lines. Cut losses. Fortress strategy.",
                effects: { personalWealth: 0, treasury: -80, elite: -15, anger: 10 },
                eventTriggers: ["frozen_conflict"]
            }
        ]
    },
    {
        id: "negotiated_settlement",
        title: "Peace Talks",
        description: "Backchannel negotiations in Istanbul. Turkey is mediating. The West wants you out of all occupied territory. You want sanctions lifted and recognition of Crimea. Neither side will budge. Your military is exhausted. Their resistance is Western-supplied. This war could drag on for years. Or you could compromise.",
        weight: 8,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Ceasefire. Freeze current lines. Korea-style armistice.",
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: -20 },
                legacy: { icon: "🕊️", name: "Frozen War", weight: -8 },
                eventTriggers: ["frozen_conflict"]
            },
            {
                text: "Trade territory for sanctions relief. Pragmatic retreat.",
                effects: { personalWealth: 5, treasury: 200, elite: -15, anger: -15 },
                legacy: { icon: "📉", name: "Strategic Retreat", weight: -5 }
            },
            {
                text: "Walk away from talks. We fight until total victory.",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 35 },
                eventTriggers: ["catastrophic_defeat", "pyrrhic_victory"]
            }
        ]
    },
    {
        id: "pyrrhic_victory",
        title: "Victory Day",
        description: "After 18 months, it's over. You captured the capital. Their government fled. You control the territory. Cost: 47,000 dead soldiers, $400 billion, permanent sanctions, and international pariah status. The victory parade has 5,000 troops—most are wounded or fresh conscripts. The economy is in ruins. Mothers weep. The West will never forgive. But you won.",
        weight: 9,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Grand victory celebration. Medals for everyone. Rewrite history.",
                effects: { personalWealth: 0, treasury: -150, elite: 15, anger: 30 },
                legacy: { icon: "💀", name: "Pyrrhic Victor", weight: -18 }
            },
            {
                text: "Modest observance. The cost was high. Honor the dead.",
                effects: { personalWealth: 0, treasury: -60, elite: 5, anger: 20 }
            }
        ]
    },
    {
        id: "frozen_conflict",
        title: "The New Normal",
        description: "Three years since the invasion. Lines haven't moved in 18 months. You control 18% of their territory. They've rebuilt with Western money. Your economy adapted to sanctions. Occasional shelling. Occasional drone strikes. No negotiations. No resolution. Just... frozen. A permanent wound. Thousands dead for a stalemate.",
        weight: 6,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept it. Build defenses. This is the new border.",
                effects: { personalWealth: 0, treasury: -100, elite: 5, anger: 10 },
                legacy: { icon: "🧊", name: "Stalemate Architect", weight: -10 }
            },
            {
                text: "One more push. Break the stalemate. Mobilize again.",
                effects: { personalWealth: -5, treasury: -400, elite: -15, anger: 50 },
                eventTriggers: ["catastrophic_defeat"]
            }
        ]
    },
    {
        id: "catastrophic_defeat",
        title: "The Rout",
        description: "It's a disaster. Your offensive collapsed within 72 hours. Counter-offensive broke through multiple lines. They recaptured major cities. Soldiers are surrendering en masse. Equipment abandoned. Generals can't reach you—they're in hiding. The defense minister committed suicide. The military is fractured. The elite are panicking. The end is near.",
        weight: 10,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Immediate ceasefire. Accept any terms. Survive at all costs.",
                effects: { personalWealth: -10, treasury: -200, elite: -25, anger: -20 },
                legacy: { icon: "🏳️", name: "The Defeated", weight: -28 }
            },
            {
                text: "Scorched earth. If I lose, everyone loses. Destroy everything.",
                effects: { personalWealth: -5, treasury: -300, elite: -30, anger: 60 },
                legacy: { icon: "🔥", name: "Scorched Earth", weight: -35 }
            },
            {
                text: "Flee. Exile. Take the money and run to Minsk or Dubai.",
                effects: { personalWealth: 0, treasury: -500, elite: -40, anger: -30 }
            }
        ]
    },
    {
        id: "mass_protest_mobilization",
        title: "The Mothers March",
        description: "100,000 mothers and wives are marching. They want their sons back. Their husbands. Their brothers. 'Not one more coffin.' Spreading from the capital to 50 cities. These aren't political activists—these are ordinary women who've lost everything. The police are hesitant to beat grieving mothers on camera.",
        weight: 8,
        conditions: { hasTriggered: ["conscription_crisis"] },
        choices: [
            {
                text: "Mass arrests. All of them. 20,000 detained nationwide.",
                effects: { personalWealth: 0, treasury: -60, elite: -10, anger: 45 }
            },
            {
                text: "Promise to bring the boys home. (Lie). Buy time.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 15 }
            },
            {
                text: "Limited rotation. Bring back 10,000. Send 10,000 fresh troops.",
                effects: { personalWealth: 0, treasury: -80, elite: -5, anger: -10 }
            }
        ]
    },
    {
        id: "energy_infrastructure_war",
        title: "Winter Campaign",
        description: "You've launched 200 cruise missiles at their power grid. 60% of the country is without electricity. It's November. Temperatures dropping. Hospitals losing power. Elderly freezing. Your goal: break their will through suffering. International media shows frozen families huddled by candles. The UN calls it collective punishment.",
        weight: 7,
        conditions: { hasTriggered: ["bridge_strike"] },
        onceOnly: true,
        choices: [
            {
                text: "Continue the campaign. More missiles. Break them completely.",
                effects: { personalWealth: 0, treasury: -150, elite: 10, anger: 20 },
                eventTriggers: ["war_crimes_allegations"]
            },
            {
                text: "Pause. We made our point. Let them suffer but not die.",
                effects: { personalWealth: 0, treasury: -80, elite: 5, anger: 15 }
            },
            {
                text: "Offer to restore power in exchange for territorial concessions.",
                effects: { personalWealth: 0, treasury: -40, elite: 0, anger: 10 },
                eventTriggers: ["negotiated_settlement"]
            }
        ]
    },
    {
        id: "pipeline_sabotage",
        title: "The Mysterious Explosion",
        description: "Your undersea pipeline just exploded in international waters. Seismographs recorded two massive underwater blasts. Gas is bubbling to the surface. $15 billion in infrastructure destroyed. European gas prices spiked 400%. Everyone's pointing fingers: the Americans, the Ukrainians, saboteurs, environmental activists. Or maybe... you did it yourself to lock in high prices?",
        weight: 9,
        conditions: { hasTriggered: ["gas_pipeline_deal"] },
        onceOnly: true,
        choices: [
            {
                text: "Blame the Americans. Demand UN investigation. Rally the nation.",
                effects: { personalWealth: 0, treasury: -100, elite: 10, anger: 20 }
            },
            {
                text: "Stay silent. Let conspiracy theories flourish. Prices stay high.",
                effects: { personalWealth: 12, treasury: 80, elite: 5, anger: 15 }
            },
            {
                text: "Offer to rebuild—for triple the original cost.",
                effects: { personalWealth: 8, treasury: -200, elite: 0, anger: 10 },
                eventTriggers: ["pipeline_construction_scandal"]
            }
        ]
    },
    {
        id: "european_energy_crisis",
        title: "Europe Shivers",
        description: "Germany's factories are shutting down from energy shortages. France is rationing heating. Italy's economy is contracting 8%. European leaders are desperate. They're offering to ease sanctions, recognize your territorial claims, anything for gas. The EU is fracturing over energy policy. You hold all the cards this winter.",
        weight: 8,
        conditions: { hasTriggered: ["gas_leverage"] },
        choices: [
            {
                text: "Maximum extraction. Bleed them for every concession possible.",
                effects: { personalWealth: 20, treasury: 350, elite: 15, anger: 5 },
                legacy: { icon: "🔥", name: "Energy Weapon", weight: 16 }
            },
            {
                text: "Partial relief. Turn gas back on at 3x price. No political concessions.",
                effects: { personalWealth: 15, treasury: 280, elite: 10, anger: 0 }
            },
            {
                text: "Humanitarian gesture. Restore 50% capacity for hospitals, heating. Long game.",
                effects: { personalWealth: 5, treasury: 100, elite: 0, anger: -10 }
            }
        ]
    },
    {
        id: "opec_plus_meeting",
        title: "The Cartel Convenes",
        description: "OPEC+ meeting in Vienna. The Saudis want production cuts to keep prices high. The Emirates want to pump more. The Americans are threatening everyone. You control 18% of global gas exports. Your vote decides whether oil hits $150/barrel or crashes to $60. The Saudis sent a $2B 'consulting contract' to your shell company as encouragement.",
        weight: 7,
        conditions: { treasury: 200 },
        choices: [
            {
                text: "Side with Saudis. Production cuts. Take the $2B. Prices soar.",
                effects: { personalWealth: 10, treasury: 220, elite: 10, anger: 20 }
            },
            {
                text: "Flood the market. Undercut everyone. Grab market share.",
                effects: { personalWealth: 8, treasury: 180, elite: 5, anger: 10 }
            },
            {
                text: "Play both sides. Promise Saudis cuts, pump secretly, pocket difference.",
                effects: { personalWealth: 15, treasury: 250, elite: 0, anger: 15 }
            }
        ]
    },
    {
        id: "gas_for_rubles",
        title: "The Currency Weapon",
        description: "Your central bank is under attack. The ruble is collapsing. You announce: all gas sales must be paid in rubles, not euros. It forces Europeans to buy rubles, propping up your currency. The EU calls it 'blackmail.' The IMF says it violates contracts. But what are they going to do, freeze in the dark?",
        weight: 8,
        conditions: { hasTriggered: ["gas_leverage"] },
        onceOnly: true,
        choices: [
            {
                text: "Enforce it strictly. No rubles, no gas. Total currency warfare.",
                effects: { personalWealth: 5, treasury: 280, elite: 15, anger: 10 },
                eventTriggers: ["european_energy_crisis"]
            },
            {
                text: "Carve out exceptions for 'friendly' countries. Divide them.",
                effects: { personalWealth: 8, treasury: 200, elite: 10, anger: 5 }
            },
            {
                text: "Threaten but don't enforce. Psychological pressure, maintain flexibility.",
                effects: { personalWealth: 3, treasury: 120, elite: 5, anger: 0 }
            }
        ]
    },
    {
        id: "alternative_energy_routes",
        title: "The Chinese Pivot",
        description: "Europe's cutting you off, but China's hungry for energy. They're offering a $280 billion deal for a mega-pipeline to Beijing. Problem: you'd be totally dependent on one customer. They'll negotiate brutal terms. The pipeline crosses 3,000 miles of permafrost. It'll take 8 years to build. But it's your future.",
        weight: 7,
        conditions: { hasTriggered: ["sanctions_incoming"] },
        onceOnly: true,
        choices: [
            {
                text: "Sign it. China's the future anyway. Europe's finished.",
                effects: { personalWealth: 12, treasury: -350, elite: 10, anger: 15 },
                legacy: { icon: "🐉", name: "Dragon's Partner", weight: 8 },
                eventTriggers: ["chinese_dependence"]
            },
            {
                text: "Negotiate hard. Play India against China for better terms.",
                effects: { personalWealth: 8, treasury: -250, elite: 5, anger: 10 }
            },
            {
                text: "Reject. Keep Europe as primary customer despite tensions.",
                effects: { personalWealth: 0, treasury: 50, elite: -10, anger: 5 }
            }
        ]
    },
    {
        id: "lng_terminal_race",
        title: "The LNG Gambit",
        description: "Americans are building LNG terminals to ship gas to Europe, undercutting your pipelines. Qatar is ramping up exports. Your monopoly is ending. Your energy minister says you need to invest $80 billion in LNG technology to compete, or offer Europe such deep discounts that LNG isn't competitive. Your market share is slipping.",
        weight: 6,
        conditions: { hasTriggered: ["gas_leverage"] },
        choices: [
            {
                text: "Massive LNG investment. Compete directly with US suppliers.",
                effects: { personalWealth: -15, treasury: -350, elite: -5, anger: 15 }
            },
            {
                text: "Price war. Cut gas prices 40%. Bankrupt the LNG terminals.",
                effects: { personalWealth: -8, treasury: -180, elite: 5, anger: 0 }
            },
            {
                text: "Accept reduced market share. Focus on Asia. Europe's lost anyway.",
                effects: { personalWealth: 0, treasury: -80, elite: -10, anger: 5 },
                eventTriggers: ["alternative_energy_routes"]
            }
        ]
    },
    {
        id: "arctic_oil_discovery",
        title: "Black Gold in the Arctic",
        description: "Geological surveys found a massive oil field in the Arctic: 20 billion barrels, maybe more. The Americans claim it's in disputed waters. Extraction would cost $120 billion and destroy fragile ecosystems. But it would make you the world's largest oil producer. Environmental groups are already protesting. The defense minister says we need to militarize the Arctic to protect it.",
        weight: 7,
        conditions: { treasury: 300 },
        onceOnly: true,
        choices: [
            {
                text: "Full extraction. Militarize the Arctic. Plant the flag. Drill.",
                effects: { personalWealth: 25, treasury: -450, elite: 15, anger: 20 },
                legacy: { icon: "🛢️", name: "Arctic Baron", weight: 14 },
                eventTriggers: ["arctic_militarization", "environmental_catastrophe"]
            },
            {
                text: "Limited extraction. Joint venture with Western oil companies.",
                effects: { personalWealth: 15, treasury: -200, elite: 5, anger: 10 }
            },
            {
                text: "Leave it in the ground. Too risky, too expensive, climate optics terrible.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "climate_pressure",
        title: "The Green Transition",
        description: "Europe's accelerating away from fossil fuels. They're investing $2 trillion in renewables. Your energy exports are projected to drop 40% by 2030. Your entire economy is built on oil and gas. The finance minister is panicking. Diversification would cost trillions you don't have. The petro-state model is dying.",
        weight: 6,
        conditions: { year: 4 },
        choices: [
            {
                text: "Climate denial. Double down on oil. It's a hoax anyway.",
                effects: { personalWealth: 5, treasury: 80, elite: 10, anger: 15 }
            },
            {
                text: "Massive green investment. Pivot to renewables, hydrogen, nuclear.",
                effects: { personalWealth: -20, treasury: -600, elite: -15, anger: -20 }
            },
            {
                text: "Milk the dying cow. Extract maximum profit before transition.",
                effects: { personalWealth: 15, treasury: 120, elite: 5, anger: 10 },
                legacy: { icon: "🛢️", name: "Stranded Assets", weight: -15 }
            }
        ]
    },
    {
        id: "pipeline_construction_scandal",
        title: "The Pipeline to Nowhere",
        description: "Your nephew's construction firm won the $18 billion pipeline rebuild contract. Two years in, only 12% is complete. Costs have tripled. Investigators found that 60% of the budget went to phantom subcontractors—all linked to your family. The pipeline may never be finished. The Europeans are demanding their deposits back.",
        weight: 7,
        conditions: { hasTriggered: ["pipeline_sabotage"] },
        onceOnly: true,
        choices: [
            {
                text: "Kill the investigation. Arrest the investigators. Complete the grift.",
                effects: { personalWealth: 22, treasury: -200, elite: -10, anger: 25 }
            },
            {
                text: "Scapegoat the nephew. Jail him. Seize his assets. (Give them back later)",
                effects: { personalWealth: 8, treasury: 60, elite: 5, anger: -10 }
            },
            {
                text: "Actually finish the pipeline. Competent contractors. Salvage reputation.",
                effects: { personalWealth: -5, treasury: -280, elite: -5, anger: -15 }
            }
        ]
    },
    {
        id: "strategic_reserve_depletion",
        title: "The Empty Tanks",
        description: "Your strategic petroleum reserve is nearly empty. You sold it off over the years to plug budget holes and pocket the difference. A leaked report shows reserves are at 15% when they should be 95%. If there's an energy shock or supply disruption, the economy collapses immediately. The energy minister who wrote the report just resigned.",
        weight: 6,
        conditions: { personalWealth: 30 },
        choices: [
            {
                text: "Classify all reserve data. Kill the story. 'National security.'",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 15 }
            },
            {
                text: "Emergency refill. $80B purchase at current high prices. (Painful)",
                effects: { personalWealth: -10, treasury: -350, elite: -10, anger: 5 }
            },
            {
                text: "Blame the previous administration. Appoint investigation. Delay.",
                effects: { personalWealth: 0, treasury: -40, elite: 0, anger: 10 }
            }
        ]
    },
    {
        id: "energy_oligarch_rivalry",
        title: "The Gas Baron's Move",
        description: "Your former ally controls the second-largest gas company. He's quietly negotiating his own deals with China, cutting you out. He's offering better prices and faster delivery. Chinese officials are taking his calls. Your monopoly is threatened from within. The FSB has a dossier ready: embezzlement, fraud, treason.",
        weight: 7,
        conditions: { hasTriggered: ["alternative_energy_routes"] },
        choices: [
            {
                text: "Arrest him tonight. Seize his gas company. Restore monopoly.",
                effects: { personalWealth: 18, treasury: 120, elite: -15, anger: 15 }
            },
            {
                text: "Force merger. 60/40 split in your favor. Absorb his network.",
                effects: { personalWealth: 12, treasury: 80, elite: -5, anger: 10 }
            },
            {
                text: "Let him operate. Two suppliers competing makes both stronger. (Risky)",
                effects: { personalWealth: 0, treasury: 40, elite: 10, anger: 0 }
            }
        ]
    },
    {
        id: "breakaway_province",
        title: "The Breakaway Province",
        description: "Your resource-rich southern province just declared independence. Population: 4 million. They control 40% of your oil refineries and a major seaport. Their 'president' is a former general you purged 5 years ago. Ethnic tensions have been simmering for decades. They've seized government buildings. Your generals say the military can retake it in 2 weeks. Analysts say it'll be Chechnya 2.0.",
        weight: 9,
        conditions: { anger: 35, year: 2 },
        onceOnly: true,
        choices: [
            {
                text: "Full military assault. No negotiations with traitors.",
                effects: { personalWealth: 0, treasury: -280, elite: 10, anger: 35 },
                eventTriggers: ["urban_warfare_separatist", "separatist_referendum"]
            },
            {
                text: "Blockade the province. Cut power, water, food. Strangle them.",
                effects: { personalWealth: 0, treasury: -120, elite: 5, anger: 30 },
                eventTriggers: ["humanitarian_crisis_separatist", "international_condemnation"]
            },
            {
                text: "Negotiate. Offer expanded autonomy. Keep them in the federation.",
                effects: { personalWealth: 0, treasury: -80, elite: -15, anger: -10 },
                eventTriggers: ["autonomy_negotiations"]
            }
        ]
    },
    {
        id: "urban_warfare_separatist",
        title: "Street by Street",
        description: "Your forces entered the provincial capital. Separatists are fighting from apartment buildings, schools, hospitals. Every block is a battle. Snipers everywhere. IEDs hidden in rubble. Civilian casualties mounting. International media is calling it a humanitarian catastrophe. Your generals admit: this will take months, not weeks.",
        weight: 10,
        conditions: { hasTriggered: ["breakaway_province"] },
        onceOnly: true,
        choices: [
            {
                text: "Level it. Artillery, airstrikes, total war. Grozny doctrine.",
                effects: { personalWealth: 0, treasury: -400, elite: 5, anger: 50 },
                legacy: { icon: "💣", name: "City Destroyer", weight: -22 },
                eventTriggers: ["separatist_insurgency", "war_crimes_allegations"]
            },
            {
                text: "Slow advance. Minimize civilian casualties. Months of grinding war.",
                effects: { personalWealth: 0, treasury: -300, elite: -5, anger: 35 },
                eventTriggers: ["separatist_insurgency"]
            },
            {
                text: "Withdraw. This is unwinnable. Cut a deal now.",
                effects: { personalWealth: 0, treasury: -100, elite: -20, anger: 10 },
                eventTriggers: ["autonomy_negotiations"]
            }
        ]
    },
    {
        id: "separatist_referendum",
        title: "The Independence Vote",
        description: "The separatists held a referendum despite your military operation. Result: 89% for independence. International observers from 15 countries validated it. The EU is debating recognition. Turkey already opened a consulate. Your state media calls it illegal and staged. But 3 million people voted under shellfire.",
        weight: 9,
        conditions: { hasTriggered: ["breakaway_province"] },
        onceOnly: true,
        choices: [
            {
                text: "Declare the vote illegal. Double military pressure. No surrender.",
                effects: { personalWealth: 0, treasury: -250, elite: 5, anger: 40 },
                eventTriggers: ["urban_warfare_separatist"]
            },
            {
                text: "Covert campaign. Assassinate their leaders. Destabilize their 'state.'",
                effects: { personalWealth: -3, treasury: -80, elite: 10, anger: 30 },
                eventTriggers: ["separatist_terrorism_response"]
            },
            {
                text: "Recognize reality. Negotiate terms of separation. Salvage what we can.",
                effects: { personalWealth: -15, treasury: -200, elite: -25, anger: -15 },
                legacy: { icon: "🕊️", name: "Let Them Go", weight: -12 },
                eventTriggers: ["negotiated_separation"]
            }
        ]
    },
    {
        id: "humanitarian_crisis_separatist",
        title: "The Siege Tightens",
        description: "Your blockade is in its 4th month. No food, medicine, electricity. Hospitals operating by candlelight. Children dying from preventable diseases. The UN estimates 15,000 civilian deaths from the blockade alone. Humanitarian convoys are blocked at checkpoints. CNN has footage of starving families. The ICC prosecutor is watching.",
        weight: 8,
        conditions: { hasTriggered: ["breakaway_province"] },
        choices: [
            {
                text: "Maintain the siege. Starvation is a weapon. They'll surrender.",
                effects: { personalWealth: 0, treasury: -60, elite: 5, anger: 25 },
                eventTriggers: ["war_crimes_allegations"]
            },
            {
                text: "Allow limited humanitarian aid. Not enough to fight, just enough to survive.",
                effects: { personalWealth: 0, treasury: -40, elite: 0, anger: 20 }
            },
            {
                text: "Lift the blockade. The optics are destroying us internationally.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 },
                eventTriggers: ["autonomy_negotiations"]
            }
        ]
    },
    {
        id: "separatist_insurgency",
        title: "The Endless War",
        description: "You control the cities, they control the countryside. Ambushes kill soldiers weekly. Car bombs target military convoys. Collaborators are executed publicly. You're spending $12 billion annually to hold territory. Veterans are returning traumatized. Mothers are demanding withdrawals. This is Afghanistan, but it's your own country.",
        weight: 7,
        conditions: { hasTriggered: ["urban_warfare_separatist"] },
        choices: [
            {
                text: "Collective punishment. Villages that harbor rebels get razed.",
                effects: { personalWealth: 0, treasury: -150, elite: 5, anger: 35 },
                eventTriggers: ["war_crimes_allegations"]
            },
            {
                text: "Counter-insurgency. Buy local loyalty. Win hearts and minds. (Expensive)",
                effects: { personalWealth: -5, treasury: -280, elite: -5, anger: 25 }
            },
            {
                text: "Controlled withdrawal. Defend key infrastructure only. Admit partial defeat.",
                effects: { personalWealth: 0, treasury: -120, elite: -15, anger: 15 },
                eventTriggers: ["de_facto_independence"]
            }
        ]
    },
    {
        id: "separatist_terrorism_response",
        title: "Retribution",
        description: "Separatist commandos just bombed a concert hall in the capital. 186 dead. 400 wounded. Your FSB claims to have intercepted communications proving the separatist 'government' ordered it. Public is screaming for vengeance. Your interior minister wants mass reprisals. The generals want to restart the full military operation.",
        weight: 9,
        conditions: { hasTriggered: ["separatist_referendum"] },
        onceOnly: true,
        choices: [
            {
                text: "Massive retaliation. Bomb their 'capital.' Kill their leadership.",
                effects: { personalWealth: 0, treasury: -180, elite: 15, anger: -15 },
                eventTriggers: ["urban_warfare_separatist", "cycle_of_violence"]
            },
            {
                text: "Targeted operations. Special forces. Surgical strikes only.",
                effects: { personalWealth: 0, treasury: -80, elite: 5, anger: 10 }
            },
            {
                text: "Investigate carefully. Avoid cycle of revenge. (Political suicide)",
                effects: { personalWealth: 0, treasury: -40, elite: -20, anger: 25 }
            }
        ]
    },
    {
        id: "autonomy_negotiations",
        title: "The Negotiating Table",
        description: "Secret talks in Geneva. Mediators from Switzerland. The separatists demand: their own parliament, control of oil revenues, their own military, and veto power over federal decisions. You're offering: a regional governor you appoint, 15% of oil revenues, and cultural autonomy. Neither side is budging. The talks could collapse any moment.",
        weight: 8,
        conditions: { hasTriggered: ["breakaway_province"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept their demands. Autonomy is better than independence.",
                effects: { personalWealth: -10, treasury: -150, elite: -20, anger: -20 },
                legacy: { icon: "🤝", name: "Negotiated Autonomy", weight: 5 },
                eventTriggers: ["autonomous_province"]
            },
            {
                text: "Limited concessions. 30% of revenue, elected governor. Take it or leave it.",
                effects: { personalWealth: -5, treasury: -100, elite: -10, anger: -10 }
            },
            {
                text: "Walk away. These demands are insulting. Resume military operations.",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 35 },
                eventTriggers: ["urban_warfare_separatist"]
            }
        ]
    },
    {
        id: "negotiated_separation",
        title: "The Velvet Divorce",
        description: "You've agreed to let them go. Terms: they get independence but you keep the major oil fields. You get the port facilities but they get transit rights. $50 billion in disputed assets to split. Citizens can choose citizenship. Military equipment must be divided. It's messy, painful, and humiliating. But the war is over.",
        weight: 8,
        conditions: { hasTriggered: ["separatist_referendum"] },
        onceOnly: true,
        choices: [
            {
                text: "Generous terms. Make this a model for peaceful separation.",
                effects: { personalWealth: -20, treasury: -400, elite: -30, anger: -25 },
                legacy: { icon: "🕊️", name: "Peaceful Divorce", weight: 8 }
            },
            {
                text: "Extract maximum compensation. They pay for every pipe and wire.",
                effects: { personalWealth: 5, treasury: -200, elite: -20, anger: -10 }
            },
            {
                text: "Sabotage on the way out. Destroy infrastructure. Salt the earth.",
                effects: { personalWealth: 0, treasury: -150, elite: -15, anger: 5 },
                legacy: { icon: "🔥", name: "Scorched Departure", weight: -18 }
            }
        ]
    },
    {
        id: "de_facto_independence",
        title: "The Frozen Breakaway",
        description: "They control their territory. You control yours. No formal recognition, but they have their own government, currency, military. You maintain the fiction of sovereignty. They print their own passports. Frozen conflict. A permanent wound. Neither war nor peace. Just a festering border that bleeds money and soldiers.",
        weight: 6,
        conditions: { hasTriggered: ["separatist_insurgency"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept it. De facto independence. Minimize the bleeding.",
                effects: { personalWealth: 0, treasury: -80, elite: -10, anger: 15 },
                legacy: { icon: "❄️", name: "Frozen Breakaway", weight: -14 }
            },
            {
                text: "Occasional raids. Keep them weak. Permanent low-intensity conflict.",
                effects: { personalWealth: 0, treasury: -150, elite: 0, anger: 25 }
            }
        ]
    },
    {
        id: "brutal_reconquest",
        title: "Victory at Any Cost",
        description: "After 3 years of war, you've won. The separatist leaders are dead or fled. Their 'capital' is rubble. You control the territory again. Cost: 28,000 soldiers dead, 80,000 civilians dead, $380 billion spent, the region's economy destroyed for a generation. The population hates you. International condemnation is unanimous. But you won.",
        weight: 8,
        conditions: { hasTriggered: ["urban_warfare_separatist"] },
        onceOnly: true,
        choices: [
            {
                text: "Victory parade. Rebuild as showcase of loyalty. Massive investment.",
                effects: { personalWealth: -15, treasury: -500, elite: 10, anger: 30 },
                legacy: { icon: "🔨", name: "Brutal Reunification", weight: -20 }
            },
            {
                text: "Maintain military occupation. Rule through fear. Minimal investment.",
                effects: { personalWealth: 0, treasury: -200, elite: 5, anger: 45 },
                legacy: { icon: "⛓️", name: "Occupation Master", weight: -25 }
            }
        ]
    },
    {
        id: "autonomous_province",
        title: "The Autonomy Experiment",
        description: "They have their parliament, control resources, fly their flag alongside yours. It's autonomy, not independence. So far it's holding. They're investing oil revenues in infrastructure. No violence in 18 months. But nationalists in your capital are furious—calling you weak. And other regions are now demanding the same deal.",
        weight: 6,
        conditions: { hasTriggered: ["autonomy_negotiations"] },
        choices: [
            {
                text: "Offer similar autonomy to other restive regions. Federation model.",
                effects: { personalWealth: -8, treasury: -200, elite: -20, anger: -30 }
            },
            {
                text: "This was a one-time deal. No more autonomy for anyone else.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 20 }
            },
            {
                text: "Renege on the deal. Slowly strip their autonomy away.",
                effects: { personalWealth: 0, treasury: 0, elite: 15, anger: 40 },
                eventTriggers: ["breakaway_province"]
            }
        ]
    },
    {
        id: "cycle_of_violence",
        title: "Blood for Blood",
        description: "Retaliation sparked counter-retaliation. They bombed a school. You bombed a hospital. They attacked a military base. You leveled a neighborhood. Civilians on both sides are traumatized. The cycle is self-sustaining now. Neither side can back down without appearing weak. The violence has its own momentum.",
        weight: 8,
        conditions: { hasTriggered: ["separatist_terrorism_response"] },
        choices: [
            {
                text: "Escalate to overwhelming force. Break them completely. End it.",
                effects: { personalWealth: 0, treasury: -350, elite: 10, anger: 40 },
                eventTriggers: ["brutal_reconquest"]
            },
            {
                text: "Maintain current level. Match their violence, no more, no less.",
                effects: { personalWealth: 0, treasury: -180, elite: 5, anger: 30 }
            },
            {
                text: "Unilateral ceasefire. Someone has to stop first. (Seen as weakness)",
                effects: { personalWealth: 0, treasury: -60, elite: -15, anger: 10 },
                eventTriggers: ["autonomy_negotiations"]
            }
        ]
    },
    {
        id: "student_protest_small",
        title: "The Campus Rebellion",
        description: "University students are protesting. Started with 200 at the main university, now spreading to 12 campuses. They want free elections, end to corruption, freedom of speech. They're young, tech-savvy, making memes. Western media loves them. Your interior minister says riot police can clear them in an hour. Your political advisor says martyring students creates movements.",
        weight: 7,
        conditions: { anger: 30 },
        choices: [
            {
                text: "Send riot police. Beat them. Arrest the leaders. End this now.",
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 25 },
                eventTriggers: ["student_martyrdom"]
            },
            {
                text: "Ignore them. Students always protest. They'll get bored and graduate.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 10 },
                eventTriggers: ["student_movement_grows"]
            },
            {
                text: "Meet with them. Listen. Promise vague reforms. Co-opt the moderates.",
                effects: { personalWealth: 0, treasury: -10, elite: -5, anger: -5 },
                eventTriggers: ["movement_cooptation"]
            }
        ]
    },
    {
        id: "university_occupation",
        title: "The Occupied Campus",
        description: "Students have occupied the main university. Barricaded the gates. Set up a protest camp. 5,000 students living there. They've got kitchens, medical tents, a media center live-streaming everything. Famous intellectuals are visiting to show support. This is becoming a symbol. Every day it stands, your authority weakens.",
        weight: 9,
        conditions: { hasTriggered: ["student_protest_small"] },
        onceOnly: true,
        choices: [
            {
                text: "Midnight raid. SWAT teams. Clear it violently. National TV blackout.",
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 35 },
                eventTriggers: ["student_martyrdom", "international_condemnation"]
            },
            {
                text: "Siege tactics. Cut power, water, food. Wait them out. Slow pressure.",
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 20 },
                eventTriggers: ["student_movement_grows"]
            },
            {
                text: "Negotiate. End the occupation peacefully. Grant minor concessions.",
                effects: { personalWealth: 0, treasury: -15, elite: -10, anger: -10 },
                eventTriggers: ["movement_cooptation"]
            }
        ]
    },
    {
        id: "social_media_viral",
        title: "The Viral Moment",
        description: "A video went viral: riot police beating a 19-year-old female student unconscious. She wasn't violent. Just standing there with a sign. 50 million views in 24 hours. International outrage. She's become a symbol. Her face is on murals. Anonymous made her profile picture a protest icon. Your internet censors can't contain this.",
        weight: 10,
        conditions: { hasTriggered: ["student_protest_small"] },
        onceOnly: true,
        choices: [
            {
                text: "Full internet crackdown. Block social media. VPN ban. Information war.",
                effects: { personalWealth: 0, treasury: -100, elite: 5, anger: 40 },
                eventTriggers: ["tech_savvy_resistance"]
            },
            {
                text: "Apologize. Scapegoat the police officer. Public trial. Damage control.",
                effects: { personalWealth: 0, treasury: -30, elite: -5, anger: -15 }
            },
            {
                text: "Flood zone. Hire trolls. Create fake videos. Discredit her. Disinformation blitz.",
                effects: { personalWealth: -1, treasury: -50, elite: 0, anger: 20 }
            }
        ]
    },
    {
        id: "student_martyrdom",
        title: "The Martyr",
        description: "A student died in police custody. Official story: suicide. Leaked autopsy photos show he was beaten to death. His funeral turned into a protest march of 200,000 people. His mother is on every TV channel. The UN High Commissioner for Human Rights is demanding an investigation. You've created a martyr.",
        weight: 11,
        conditions: { hasTriggered: ["student_protest_small"] },
        onceOnly: true,
        choices: [
            {
                text: "Deny. Cover up. Threaten the family. Arrest anyone who investigates.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 50 },
                legacy: { icon: "🩸", name: "Martyr Maker", weight: -20 },
                eventTriggers: ["color_revolution"]
            },
            {
                text: "Admit negligence. Prosecute officers. Pay family blood money. Contain it.",
                effects: { personalWealth: -2, treasury: -50, elite: -10, anger: 10 }
            },
            {
                text: "Claim foreign agents killed him. Blame Western intelligence. Rally nationalism.",
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 35 }
            }
        ]
    },
    {
        id: "student_movement_grows",
        title: "The Movement Spreads",
        description: "It's not just students anymore. Their parents are joining. Teachers are striking in solidarity. Labor unions are coordinating. White-collar professionals march on weekends. The movement has 15 chapters in major cities. They have funding—probably Western NGOs. They're organized, persistent, and growing.",
        weight: 9,
        conditions: { hasTriggered: ["student_protest_small"] },
        onceOnly: true,
        choices: [
            {
                text: "Declare them a terrorist organization. Mass arrests. Label it a foreign coup.",
                effects: { personalWealth: 0, treasury: -80, elite: 10, anger: 45 },
                eventTriggers: ["color_revolution"]
            },
            {
                text: "Target the leadership. Arrest organizers. Disrupt funding. Cut off the head.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 30 }
            },
            {
                text: "Make real concessions. Anti-corruption reforms. Release political prisoners.",
                effects: { personalWealth: -5, treasury: -60, elite: -20, anger: -25 },
                eventTriggers: ["movement_cooptation"]
            }
        ]
    },
    {
        id: "general_strike",
        title: "The General Strike",
        description: "The students called for a general strike. And it's working. Factories shut down. Public transport stopped. Schools closed. Hospitals on emergency-only. 3 million workers off the job. The economy is hemorrhaging $2 billion daily. The business elite is panicking. This isn't just students anymore—this is a revolution.",
        weight: 12,
        conditions: { hasTriggered: ["student_movement_grows"] },
        onceOnly: true,
        choices: [
            {
                text: "State of emergency. Military in the streets. Shoot strikers. Total war.",
                effects: { personalWealth: 0, treasury: -150, elite: -15, anger: 70 },
                legacy: { icon: "⚔️", name: "Strike Breaker", weight: -18 },
                eventTriggers: ["color_revolution"]
            },
            {
                text: "Arrest union leaders. Replace them. Force workers back with threats.",
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: 50 }
            },
            {
                text: "Negotiate with unions. Meet some demands. Break the student-labor alliance.",
                effects: { personalWealth: -8, treasury: -120, elite: -15, anger: -20 }
            }
        ]
    },
    {
        id: "movement_cooptation",
        title: "Buying the Revolution",
        description: "You've identified the pragmatists in the movement. They're willing to talk. You offer: some opposition candidates allowed in elections (not winners), anti-corruption theater (arrest some unpopular oligarchs), media reforms (controlled). In exchange, they call off protests and join the 'loyal opposition.' Many in the movement will call them sellouts.",
        weight: 8,
        conditions: { hasTriggered: ["student_protest_small"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept the deal. Co-opt them. Divide the movement. Neutralize the threat.",
                effects: { personalWealth: -3, treasury: -80, elite: -10, anger: -25 },
                legacy: { icon: "🤝", name: "Revolution Coopted", weight: 6 }
            },
            {
                text: "Trap. Make promises. Let them legitimize you. Betray them after.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 15 }
            },
            {
                text: "Reject. These demands are unacceptable. No negotiations with traitors.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 35 },
                eventTriggers: ["color_revolution"]
            }
        ]
    },
    {
        id: "color_revolution",
        title: "The Final Confrontation",
        description: "500,000 people in the capital's main square. They're not leaving. 'Resignation or Revolution' is the chant. International media everywhere. Western leaders 'expressing concern.' Your generals say they can clear the square—with thousands of casualties. Or you could flee. Or somehow this could still be contained. The next 24 hours decide everything.",
        weight: 15,
        conditions: { hasTriggered: ["student_movement_grows"] },
        onceOnly: true,
        choices: [
            {
                text: "Tiananmen solution. Clear the square. Whatever it takes. History judges later.",
                effects: { personalWealth: -10, treasury: -200, elite: -25, anger: 80 },
                legacy: { icon: "🩸", name: "The Massacre", weight: -40 }
            },
            {
                text: "Negotiate exit. Step down. Immunity guaranteed. Live in exile.",
                effects: { personalWealth: 0, treasury: -100, elite: -40, anger: -50 },
                legacy: { icon: "🏳️", name: "Color Revolution Victor", weight: -15 }
            },
            {
                text: "Compromise. New elections. You can run but not rig. Roll the dice.",
                effects: { personalWealth: -5, treasury: -80, elite: -20, anger: -35 }
            }
        ]
    },
    {
        id: "tech_savvy_resistance",
        title: "The Digital Underground",
        description: "You blocked social media. They're using mesh networks. You banned VPNs. They're distributing USB sticks with Tor. You shut down opposition sites. They're using blockchain hosting. You arrested tech activists. New ones appear. The youth are always two steps ahead. Your censors are losing the tech war.",
        weight: 7,
        conditions: { hasTriggered: ["social_media_viral"] },
        choices: [
            {
                text: "China-level response. National firewall. Deep packet inspection. $10B investment.",
                effects: { personalWealth: 0, treasury: -400, elite: 5, anger: 30 }
            },
            {
                text: "Arrest tech workers en masse. Intimidate the sector. Break their spirit.",
                effects: { personalWealth: 0, treasury: -60, elite: 0, anger: 35 }
            },
            {
                text: "Accept you've lost the digital battle. Focus on controlling physical space.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: 20 }
            }
        ]
    },
    {
        id: "movement_fractures",
        title: "The Split",
        description: "The movement is fracturing. The students want radical change now. The liberals want gradual reform. The workers want economic justice. The nationalists want ethnic purity. They're fighting each other more than you. Social media feuds. Competing protests. Your intelligence service is quietly helping the fractures grow.",
        weight: 7,
        conditions: { hasTriggered: ["student_movement_grows"] },
        choices: [
            {
                text: "Accelerate the split. Fund the extremes. Make moderates seem weak.",
                effects: { personalWealth: -2, treasury: -40, elite: 5, anger: 20 }
            },
            {
                text: "Pick one faction. Legitimize them. Delegitimize the others.",
                effects: { personalWealth: 0, treasury: -30, elite: 0, anger: 15 }
            },
            {
                text: "Let them destroy themselves. Just watch. They're doing your work.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 10 }
            }
        ]
    },
    {
        id: "ambitious_general",
        title: "The General's Ambition",
        description: "General Zhukov isn't just a war hero anymore. He's built a following. Soldiers worship him. He gives speeches about 'restoring strength' and 'ending corruption.' Veterans rally around him. He hasn't explicitly challenged you, but he's positioning himself. Your FSB chief warns: this is how coups begin. Act now or watch him grow stronger.",
        weight: 8,
        conditions: { year: 3, elite: -50 },
        onceOnly: true,
        choices: [
            {
                text: "Promote him. Defense Minister. Keep him close. Control him from within.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 0 },
                eventTriggers: ["general_power_grows"]
            },
            {
                text: "Arrest him tonight. Treason charges. Fake coup plot evidence.",
                effects: { personalWealth: 0, treasury: -50, elite: -20, anger: 15 },
                eventTriggers: ["military_loyalty_crisis"]
            },
            {
                text: "Forced retirement. 'Health reasons.' Pension and a dacha. Neutralize quietly.",
                effects: { personalWealth: -3, treasury: -20, elite: -5, anger: 5 }
            }
        ]
    },
    {
        id: "general_power_grows",
        title: "The General's Network",
        description: "Defense Minister Zhukov has been busy. Half the military reports to him now. He's installed his protégés as regional commanders. FSB intercepts show he's meeting with oligarchs and judges. He's building parallel power structures. Your orders go through him now. He hasn't made his move yet, but it's coming.",
        weight: 10,
        conditions: { hasTriggered: ["ambitious_general"] },
        onceOnly: true,
        choices: [
            {
                text: "Strike first. Arrest him and 40 officers. Decapitate his network.",
                effects: { personalWealth: 0, treasury: -80, elite: -25, anger: 20 },
                eventTriggers: ["coup_attempt", "military_fragmentation"]
            },
            {
                text: "Power-sharing. Make him Prime Minister. Co-rule. (Temporary truce)",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 10 },
                eventTriggers: ["tandem_rule"]
            },
            {
                text: "Bribe his network. Offer them more than he can. Buy their loyalty.",
                effects: { personalWealth: -15, treasury: -200, elite: -10, anger: 5 }
            }
        ]
    },
    {
        id: "coup_attempt",
        title: "The Midnight Knock",
        description: "3 AM. Gunfire outside your compound. Loyal guards are fighting rebel units. The Defense Minister's tanks are moving on the capital. State TV is off air. Your escape helicopter is fueled. The FSB chief says we have 200 loyal troops vs. 2,000 rebels. This is it. The coup is happening. You have minutes to decide.",
        weight: 15,
        conditions: { hasTriggered: ["general_power_grows"] },
        onceOnly: true,
        choices: [
            {
                text: "Flee. Take the helicopter. Dubai will grant asylum. Live to plot return.",
                effects: { personalWealth: 0, treasury: -300, elite: -50, anger: -30 },
                legacy: { icon: "🚁", name: "The Exile", weight: -22 }
            },
            {
                text: "Fight. Rally loyalists. Promise them everything. This is my country.",
                effects: { personalWealth: -20, treasury: -400, elite: -30, anger: 40 },
                eventTriggers: ["civil_war_brink"]
            },
            {
                text: "Negotiate surrender. Immunity for you and family. They won. Accept it.",
                effects: { personalWealth: 0, treasury: -200, elite: -40, anger: -20 },
                legacy: { icon: "🏳️", name: "Deposed", weight: -18 }
            }
        ]
    },
    {
        id: "military_loyalty_crisis",
        title: "The Army Divided",
        description: "You arrested their hero. Now the military is split. Northern Command declares loyalty to you. Southern Command refuses to recognize your authority. Eastern divisions are 'neutral' (waiting to see who wins). Tanks face tanks at regional borders. Officers are resigning. This could become a civil war.",
        weight: 12,
        conditions: { hasTriggered: ["ambitious_general"] },
        onceOnly: true,
        choices: [
            {
                text: "Release the general. Apologize. 'Misunderstanding.' Restore unity.",
                effects: { personalWealth: 0, treasury: 0, elite: -25, anger: 10 },
                legacy: { icon: "🫠", name: "Forced Retreat", weight: -12 }
            },
            {
                text: "Purge the military. Fire 200 officers. Install totally loyal (incompetent) ones.",
                effects: { personalWealth: 0, treasury: -100, elite: -30, anger: 20 },
                eventTriggers: ["weakened_military"]
            },
            {
                text: "Execute the general. Televise it. Show what happens to traitors.",
                effects: { personalWealth: 0, treasury: -50, elite: -35, anger: 25 },
                legacy: { icon: "⚰️", name: "General Killer", weight: -15 },
                eventTriggers: ["military_fragmentation"]
            }
        ]
    },
    {
        id: "assassination_attempt",
        title: "The Poisoned Cup",
        description: "You collapsed during dinner. Doctors say it's novichok—your own poison. Someone in your inner circle tried to kill you. You survived, barely. Three days in ICU. While you recovered, your PM tried to assume powers. Your security chief arrested him. Everyone's a suspect. Trust is gone. Paranoia is rational.",
        weight: 10,
        conditions: { elite: -60, year: 4 },
        onceOnly: true,
        choices: [
            {
                text: "Massive purge. Cabinet, generals, oligarchs. Arrest 50 people. Find the traitor.",
                effects: { personalWealth: -5, treasury: -80, elite: -40, anger: 20 }
            },
            {
                text: "Blame foreign intelligence. Rally the nation. Turn weakness into strength.",
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 15 }
            },
            {
                text: "Go silent. Disappear for months. Rule from an undisclosed bunker.",
                effects: { personalWealth: 0, treasury: 0, elite: -20, anger: 30 },
                eventTriggers: ["power_vacuum"]
            }
        ]
    },
    {
        id: "rival_in_exile",
        title: "The Pretender Abroad",
        description: "Your former PM fled to Warsaw. He's set up a 'government in exile.' Western capitals are receiving him. He's giving interviews calling you a dictator. EU Parliament gave him a standing ovation. He's promising free elections if he returns. Young people inside your country are sharing his speeches. He's becoming a symbol.",
        weight: 7,
        conditions: { hasTriggered: ["ambitious_general", "coup_attempt"] },
        choices: [
            {
                text: "Assassination order. GRU team to Warsaw. Permanent solution.",
                effects: { personalWealth: -3, treasury: -40, elite: 5, anger: 20 },
                eventTriggers: ["international_sanctions"]
            },
            {
                text: "Discredit him. Release kompromat. Corruption, affairs, scandal.",
                effects: { personalWealth: 0, treasury: -30, elite: 0, anger: 10 }
            },
            {
                text: "Ignore him. He's powerless abroad. Don't make him a martyr.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: 15 }
            }
        ]
    },
    {
        id: "tandem_rule",
        title: "The Uneasy Partnership",
        description: "You're President. He's Prime Minister. Officially equal. Actually competing. Every decision is negotiated. The oligarchs play you off each other. The military is split in loyalty. The bureaucracy doesn't know who to obey. This can't last. Eventually, one of you must dominate—or destroy—the other.",
        weight: 8,
        conditions: { hasTriggered: ["general_power_grows"] },
        choices: [
            {
                text: "Strengthen presidency. Transfer powers from PM. Constitutional changes.",
                effects: { personalWealth: 0, treasury: -60, elite: 5, anger: 15 },
                eventTriggers: ["power_struggle_escalates"]
            },
            {
                text: "Accept it. Genuine power-sharing. He handles military, you handle money.",
                effects: { personalWealth: -5, treasury: 0, elite: 10, anger: -10 }
            },
            {
                text: "Slow coup. Remove his allies one by one. Year-long campaign to weaken him.",
                effects: { personalWealth: -3, treasury: -80, elite: -5, anger: 10 },
                eventTriggers: ["power_struggle_escalates"]
            }
        ]
    },
    {
        id: "power_struggle_escalates",
        title: "The Breaking Point",
        description: "The tandem is over. He tried to fire your FSB chief. You tried to arrest his Defense Minister. Both orders were ignored. Now it's open conflict. State media is split—half attacks him, half attacks you. Regional governors are choosing sides. The oligarchs are hedging bets. One of you will win. One will fall.",
        weight: 12,
        conditions: { hasTriggered: ["tandem_rule"] },
        onceOnly: true,
        choices: [
            {
                text: "Presidential coup. Arrest him. Declare emergency. Winner takes all.",
                effects: { personalWealth: -10, treasury: -150, elite: -20, anger: 30 },
                eventTriggers: ["coup_attempt"]
            },
            {
                text: "Resign. Step down. 'For the good of the nation.' (You lose)",
                effects: { personalWealth: 0, treasury: 0, elite: -30, anger: -20 },
                legacy: { icon: "📉", name: "Outmaneuvered", weight: -10 }
            },
            {
                text: "Compromise. Divide the country into spheres. You take capital, he takes regions.",
                effects: { personalWealth: -5, treasury: -100, elite: -15, anger: 20 }
            }
        ]
    },
    {
        id: "civil_war_brink",
        title: "The Nation Fractures",
        description: "It's civil war in all but name. The coup failed, but the general fled to the south with loyalist troops. He controls 3 regions. You control the capital and north. Borders are closed between zones. Both sides are conscripting. International community is 'alarmed.' This is Yugoslavia 1991. How does it end?",
        weight: 14,
        conditions: { hasTriggered: ["coup_attempt"] },
        onceOnly: true,
        choices: [
            {
                text: "Full military assault. Crush the rebellion. One country, one leader.",
                effects: { personalWealth: -20, treasury: -600, elite: -25, anger: 60 },
                legacy: { icon: "⚔️", name: "Civil War Victor", weight: -28 }
            },
            {
                text: "Negotiate partition. Two countries. This federation is dead anyway.",
                effects: { personalWealth: -15, treasury: -400, elite: -30, anger: 30 },
                legacy: { icon: "🗺️", name: "Nation Divider", weight: -20 }
            },
            {
                text: "International mediation. UN peacekeepers. Freeze the conflict.",
                effects: { personalWealth: -10, treasury: -250, elite: -20, anger: 25 },
                legacy: { icon: "🕊️", name: "Frozen Civil War", weight: -16 }
            }
        ]
    },
    {
        id: "power_vacuum",
        title: "The Invisible Leader",
        description: "No one's seen you in 4 months. Your inner circle is running things by committee. Rumors say you're dead, incapacitated, insane. Your PM is acting president. Oligarchs are looting state assets. Regions are ignoring federal law. The state is dissolving in your absence. You need to reappear, or accept you've lost control forever.",
        weight: 9,
        conditions: { hasTriggered: ["assassination_attempt"] },
        choices: [
            {
                text: "Dramatic return. National address. Purge those who overstepped. Reassert control.",
                effects: { personalWealth: -5, treasury: -100, elite: 10, anger: 20 }
            },
            {
                text: "Stay hidden. Rule through proxies. The myth is more powerful than the man.",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: 30 }
            },
            {
                text: "Permanent retreat. Resign for 'health reasons.' The game is over.",
                effects: { personalWealth: 0, treasury: 0, elite: -25, anger: -15 },
                legacy: { icon: "👻", name: "The Vanished", weight: -14 }
            }
        ]
    },
    {
        id: "asset_freeze_escalation",
        title: "The Oligarchs' Yachts",
        description: "The West just seized $80 billion in oligarch assets. Yachts, mansions, private jets, bank accounts—all frozen. Your aluminum magnate lost his London penthouse. Your oil baron's kids can't access their trust funds. They're panicking, calling you constantly. 'Do something!' But what? The damage is done. And they're blaming you.",
        weight: 9,
        conditions: { hasTriggered: ["sanctions_incoming"] },
        onceOnly: true,
        choices: [
            {
                text: "Compensate them from state treasury. Buy their continued loyalty.",
                effects: { personalWealth: 0, treasury: -350, elite: 15, anger: 30 }
            },
            {
                text: "Let them suffer. They shouldn't have been so visible anyway. Survival of the smartest.",
                effects: { personalWealth: 0, treasury: 0, elite: -25, anger: 10 }
            },
            {
                text: "Seize domestic assets. If West took theirs, you take what's left here.",
                effects: { personalWealth: 25, treasury: 200, elite: -30, anger: 15 }
            }
        ]
    },
    {
        id: "secondary_sanctions_threat",
        title: "The Sanctions Tighten",
        description: "US Treasury announced secondary sanctions: any company doing business with you faces sanctions themselves. Chinese banks are closing your accounts. Indian refineries won't take your oil calls. Turkish shipping companies refuse your cargo. You're being cut out of the global financial system. It's economic warfare.",
        weight: 10,
        conditions: { hasTriggered: ["sanctions_incoming"] },
        onceOnly: true,
        choices: [
            {
                text: "Build parallel system. SWIFT alternative. Yuan-based trade. Dedollarize completely.",
                effects: { personalWealth: -10, treasury: -400, elite: 0, anger: 25 }
            },
            {
                text: "Sanction evasion. Shell companies. Front businesses. Criminal networks.",
                effects: { personalWealth: 15, treasury: -200, elite: -10, anger: 20 },
                eventTriggers: ["sanctions_evasion_network"]
            },
            {
                text: "Capitulate. Accept sanctions terms. Seek readmission to global economy.",
                effects: { personalWealth: -30, treasury: -300, elite: -40, anger: -30 },
                legacy: { icon: "🏳️", name: "Sanctions Surrender", weight: -16 }
            }
        ]
    },
    {
        id: "brain_drain_sanctions",
        title: "The Exodus",
        description: "Your best tech workers, doctors, engineers, scientists—they're leaving. 300,000 educated professionals emigrated this year. Brain drain is accelerating. Western sanctions destroyed their salaries' purchasing power. Universities losing professors. Hospitals losing surgeons. Tech companies losing programmers. The future is fleeing.",
        weight: 7,
        conditions: { hasTriggered: ["sanctions_incoming"] },
        choices: [
            {
                text: "Close borders. Exit visas required. Trap the talent.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 40 }
            },
            {
                text: "Massive salary increases for key professions. Compete with West financially.",
                effects: { personalWealth: -10, treasury: -300, elite: 5, anger: -10 }
            },
            {
                text: "Let them go. Diaspora can be useful. Remittances will flow back.",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: 15 }
            }
        ]
    },
    {
        id: "import_substitution_failure",
        title: "The Missing Parts",
        description: "Import substitution isn't working. Factories need German machine parts—none available. Hospitals need Western medicines—blockaded. Airlines can't get Boeing parts—planes grounded. You can't just replace 40 years of global integration overnight. The economy is seizing up from lack of imports.",
        weight: 8,
        conditions: { hasTriggered: ["sanctions_incoming"] },
        choices: [
            {
                text: "Emergency imports through China. Pay 3x markup. No choice.",
                effects: { personalWealth: -5, treasury: -280, elite: -5, anger: 20 }
            },
            {
                text: "Domestic manufacturing crash program. $50B investment. Will take years.",
                effects: { personalWealth: -8, treasury: -500, elite: 0, anger: 30 }
            },
            {
                text: "Black market. Sanctions busting. Use criminal networks to import essentials.",
                effects: { personalWealth: 5, treasury: -200, elite: -10, anger: 25 }
            }
        ]
    },
    {
        id: "financial_system_crisis",
        title: "Bank Run",
        description: "Three major banks collapsed. Depositors are panicking. Lines outside every bank. ATMs empty. Foreign currency reserves evaporating. The central bank is printing money frantically. Inflation hitting 45% annually. Your finance minister resigned. The financial system is in meltdown. You have days to stabilize or it all collapses.",
        weight: 12,
        conditions: { hasTriggered: ["sanctions_incoming"], anger: 50 },
        onceOnly: true,
        choices: [
            {
                text: "Emergency nationalization. Seize all banks. State controls everything.",
                effects: { personalWealth: -20, treasury: -600, elite: -30, anger: 35 }
            },
            {
                text: "Capital controls. Freeze withdrawals. Martial law for the banks.",
                effects: { personalWealth: 0, treasury: -200, elite: -15, anger: 50 }
            },
            {
                text: "Let banks fail. Creative destruction. The weak will die. (Catastrophic)",
                effects: { personalWealth: 0, treasury: -800, elite: -40, anger: 70 },
                legacy: { icon: "💥", name: "Economic Collapse", weight: -32 }
            }
        ]
    },
    {
        id: "sanctions_evasion_network",
        title: "The Shadow Economy",
        description: "You've built a sophisticated sanctions evasion network. Shell companies in Dubai. Front businesses in Turkey. Money laundering through crypto. Phantom tankers with fake transponders. You're moving oil, moving money, moving goods—all off the books. It works, but you're now dependent on criminals and autocrats.",
        weight: 7,
        conditions: { hasTriggered: ["secondary_sanctions_threat"] },
        choices: [
            {
                text: "Expand it. If we're sanctioned anyway, embrace the dark economy.",
                effects: { personalWealth: 20, treasury: 150, elite: -10, anger: 15 }
            },
            {
                text: "Keep it limited. Only essentials. Don't become a mafia state.",
                effects: { personalWealth: 8, treasury: 80, elite: 0, anger: 10 }
            },
            {
                text: "Dismantle it. Too risky. Western intelligence is watching.",
                effects: { personalWealth: -5, treasury: -100, elite: -15, anger: 25 }
            }
        ]
    },
    {
        id: "china_bailout",
        title: "The Dragon's Terms",
        description: "China's offering a $200 billion bailout package. Conditions: exclusive natural resources contracts for 30 years, port access, military basing rights, and your vote on all UN resolutions. You'd be Beijing's client state. But the alternative is economic collapse. The finance minister says you have no choice. The nationalists are furious.",
        weight: 10,
        conditions: { hasTriggered: ["financial_system_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept everything. Survival first. Independence is a luxury you can't afford.",
                effects: { personalWealth: -10, treasury: 800, elite: -20, anger: -20 },
                legacy: { icon: "🐉", name: "Beijing's Vassal", weight: -18 }
            },
            {
                text: "Negotiate hard. Take the money but minimize political conditions.",
                effects: { personalWealth: -5, treasury: 500, elite: -10, anger: -10 }
            },
            {
                text: "Reject. We'll survive without becoming anyone's puppet. (Risky)",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 30 }
            }
        ]
    },
    {
        id: "economic_adaptation",
        title: "The New Normal",
        description: "Five years under sanctions. The economy contracted 15% initially, but stabilized. Parallel import chains developed. Domestic industries emerged. Trade with Asia grew. It's not prosperity, but it's not collapse either. You've adapted. The West's sanctions are permanent, but so is your workaround economy. A strange equilibrium.",
        weight: 6,
        conditions: { hasTriggered: ["sanctions_incoming"], year: 6 },
        onceOnly: true,
        choices: [
            {
                text: "Declare victory. We survived. We're stronger through adversity.",
                effects: { personalWealth: 0, treasury: 100, elite: 10, anger: -15 },
                legacy: { icon: "🛡️", name: "Sanctions Survivor", weight: 10 }
            },
            {
                text: "Acknowledge pain. Promise it's temporary. (It's not). Maintain hope.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 5 }
            }
        ]
    },
    {
        id: "sanctions_relief_talks",
        title: "The Sanctions Off-Ramp",
        description: "Secret backchannel talks. The West is willing to lift some sanctions. Terms: withdraw from occupied territories, release political prisoners, allow free elections monitoring, end support for allied regimes. It's basically regime change in slow motion. But the economy desperately needs relief. Your oligarchs are begging you to consider it.",
        weight: 8,
        conditions: { hasTriggered: ["sanctions_incoming"], year: 5 },
        choices: [
            {
                text: "Accept terms. Sanctions relief is worth any humiliation.",
                effects: { personalWealth: -15, treasury: 400, elite: -30, anger: -30 },
                legacy: { icon: "🕊️", name: "Sanctions Capitulation", weight: -14 }
            },
            {
                text: "Partial compliance. Symbolic gestures. Release a few prisoners. Keep territories.",
                effects: { personalWealth: -5, treasury: 150, elite: -10, anger: -10 }
            },
            {
                text: "Refuse. We don't negotiate under pressure. Sanctions forever if needed.",
                effects: { personalWealth: 0, treasury: -100, elite: 15, anger: 25 }
            }
        ]
    },
    {
        id: "ruble_collapse",
        title: "Currency Freefall",
        description: "The ruble crashed. Lost 70% of value in 3 days. Currency traders are shorting it mercilessly. Foreign reserves can't stop the bleeding. Imports instantly unaffordable. Savings wiped out. Pensioners' life savings worth nothing. This is 1998 all over again, but worse. The central bank is out of ammunition.",
        weight: 11,
        conditions: { hasTriggered: ["sanctions_incoming"], treasury: -200 },
        onceOnly: true,
        choices: [
            {
                text: "Peg to yuan. Abandon ruble independence. Chinese currency becomes de facto currency.",
                effects: { personalWealth: -10, treasury: -150, elite: -15, anger: 35 }
            },
            {
                text: "Capital controls. Ban forex trading. Make ruble-dollar exchange illegal.",
                effects: { personalWealth: 0, treasury: -100, elite: -10, anger: 40 }
            },
            {
                text: "Default on debt. Hyperinflation. Economic chaos. But you survive.",
                effects: { personalWealth: -5, treasury: -300, elite: -25, anger: 60 },
                legacy: { icon: "📉", name: "Currency Destroyer", weight: -22 }
            }
        ]
    },
    {
        id: "labor_strike",
        title: "The Factory Strike",
        description: "12,000 miners are on strike. Wages haven't kept pace with inflation. They're blocking the main highway. The factory owner (your friend) is losing $5 million daily. The workers have public sympathy. Riot police are ready. What happens next sets precedent for every labor dispute in the country.",
        weight: 6,
        conditions: { anger: 30 },
        choices: [
            {
                text: "Send riot police. Break the strike. Arrest union leaders.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 30 }
            },
            {
                text: "Force the owner to negotiate. 15% wage increase. They accept.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -15 }
            },
            {
                text: "Nationalize the mine. Fire the owner. Workers now work for state.",
                effects: { personalWealth: 5, treasury: -80, elite: -15, anger: -10 }
            }
        ]
    },
    {
        id: "university_purge",
        title: "Academic Freedom",
        description: "The main university's faculty is too liberal. Professors criticize you in lectures. Students learn dangerous ideas. Your education minister wants to fire 40 'problematic' professors and install party loyalists. The university rector is protesting. Western academic organizations are watching.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Full purge. Fire them all. Education must serve the state.",
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 25 }
            },
            {
                text: "Targeted dismissals. Fire 10 worst offenders. Warning to others.",
                effects: { personalWealth: 0, treasury: -10, elite: 0, anger: 15 }
            },
            {
                text: "Leave them alone. Academic freedom... within limits. Monitor them.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -5 }
            }
        ]
    },
    {
        id: "arms_deal_offer",
        title: "The Questionable Client",
        description: "A military dictatorship wants to buy $8 billion in weapons. They have a horrible human rights record. The UN has an arms embargo. But your defense industry needs the money. The sale would be 'unofficial.' Western media would go crazy. Your military-industrial complex is lobbying hard.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Approve the sale. Route through shell companies. Plausible deniability.",
                effects: { personalWealth: 12, treasury: 280, elite: 10, anger: 15 }
            },
            {
                text: "Reject. Too risky. International reputation matters.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 0 }
            },
            {
                text: "Approve but leak it. Let opposition take the blame. Political trap.",
                effects: { personalWealth: 8, treasury: 200, elite: 0, anger: 20 }
            }
        ]
    },
    {
        id: "media_oligarch_challenge",
        title: "The Independent TV Station",
        description: "One TV station refuses to follow the script. They're actually investigating corruption, interviewing opposition, broadcasting protests. The owner is a billionaire who thinks he's untouchable. 15 million viewers trust this station. Your propaganda chief wants it shut down. It's the last independent voice.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Raid and shut it down. 'Tax violations.' Seize the station.",
                effects: { personalWealth: 3, treasury: 40, elite: 5, anger: 30 }
            },
            {
                text: "Force sale to a 'friendly' oligarch. Keep it on air but controlled.",
                effects: { personalWealth: 2, treasury: 20, elite: 0, anger: 20 }
            },
            {
                text: "Leave it. One critical voice makes you seem tolerant. Manageable risk.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -10 }
            }
        ]
    },
    {
        id: "disaster_response",
        title: "The Dam Breaks",
        description: "An aging Soviet-era dam just collapsed. Flooding downstream. 40 villages underwater. 200+ dead. Thousands homeless. Infrastructure neglect is obvious—maintenance budget was 'redirected.' International aid is offered. Your emergency response is being judged. This is a legitimacy test.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Massive state response. Military rescue. Rebuild everything. Show you care.",
                effects: { personalWealth: -5, treasury: -250, elite: 0, anger: -25 }
            },
            {
                text: "Blame local officials. Fire the governor. Scapegoat and move on.",
                effects: { personalWealth: 0, treasury: -80, elite: -5, anger: 15 }
            },
            {
                text: "Minimal response. People should be self-reliant. Budget's tight.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 35 }
            }
        ]
    },
    {
        id: "sports_prestige",
        title: "The World Cup Bid",
        description: "Your sports minister wants to bid for the World Cup. It would cost $25 billion in stadiums and infrastructure. But it's global prestige. Soft power. National pride. The bribe to FIFA officials alone is $800 million. Qatar did it. Russia did it. Why not you?",
        weight: 5,
        conditions: { treasury: 400 },
        choices: [
            {
                text: "Full bid. Pay the bribes. Win the hosting rights. Glory!",
                effects: { personalWealth: -5, treasury: -1000, elite: 10, anger: 25 }
            },
            {
                text: "Symbolic bid. No bribes. We won't win but we look principled.",
                effects: { personalWealth: 0, treasury: -50, elite: -5, anger: 5 }
            },
            {
                text: "Reject. $25B on stadiums while hospitals crumble? Insane.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 }
            }
        ]
    },
    {
        id: "tax_haven_scandal",
        title: "The Panama Papers",
        description: "Leaked documents show you have $18 billion in offshore accounts. The Panama Papers. Everyone knew you were corrupt, but now there's proof. Shell companies, fake nominees, elaborate schemes. International media is having a field day. Your spokesman called it 'fake news.' Nobody believes him.",
        weight: 8,
        conditions: { personalWealth: 40 },
        choices: [
            {
                text: "Defiant denial. Western plot. Arrest the journalist who published it locally.",
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 30 }
            },
            {
                text: "Partial admission. 'Legal tax planning.' Promise reform. (Lie)",
                effects: { personalWealth: -5, treasury: -40, elite: -10, anger: 20 }
            },
            {
                text: "Ignore it. What are they going to do? I control the courts.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 25 }
            }
        ]
    },
    {
        id: "religious_extremism",
        title: "The Rising Fundamentalism",
        description: "Religious extremism is growing in the south. Radical imams control 50+ mosques. They're preaching against secular government, calling for Sharia law. Young men are radicalized. Your security services want mass arrests. Religious leaders say heavy-handed tactics will make it worse.",
        weight: 6,
        conditions: { anger: 35 },
        choices: [
            {
                text: "Security crackdown. Raid mosques. Arrest 500 suspects. No tolerance.",
                effects: { personalWealth: 0, treasury: -60, elite: 5, anger: 30 }
            },
            {
                text: "Co-opt moderate clerics. State-funded mosques. Control the message.",
                effects: { personalWealth: -3, treasury: -80, elite: 0, anger: -10 }
            },
            {
                text: "Ignore it. They're disorganized. No immediate threat.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: 20 }
            }
        ]
    },
    {
        id: "infrastructure_collapse",
        title: "The Bridge Falls",
        description: "A major highway bridge collapsed during morning rush hour. 67 dead. The bridge was built in 1973, last inspected in 2008. Maintenance records were falsified. The contractor who 'repaired' it in 2015 is your nephew. This is infrastructure neglect made visible. Families demand answers.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Massive investigation. Arrest your nephew. Show you're serious about accountability.",
                effects: { personalWealth: -3, treasury: -100, elite: -10, anger: -20 }
            },
            {
                text: "Blame the contractor. Protect your nephew. Scapegoat engineers.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 25 }
            },
            {
                text: "Compensate families generously. Don't admit fault. Move on.",
                effects: { personalWealth: -5, treasury: -120, elite: 0, anger: 10 }
            }
        ]
    },
    {
        id: "pension_crisis",
        title: "The Pension Fund",
        description: "The state pension fund is insolvent. You've been raiding it for years to plug budget holes. 18 million pensioners haven't been paid in 2 months. They're protesting. The finance minister says there's no money. Either cut pensions 40%, raise retirement age to 70, or find $150 billion somehow.",
        weight: 8,
        conditions: { treasury: -100 },
        choices: [
            {
                text: "Cut pensions 40%. They'll adjust. Better than state bankruptcy.",
                effects: { personalWealth: 0, treasury: 100, elite: 5, anger: 50 }
            },
            {
                text: "Raise retirement age to 70. Gradual implementation. Long-term fix.",
                effects: { personalWealth: 0, treasury: 80, elite: 0, anger: 40 }
            },
            {
                text: "Emergency fund injection. Print money. Deal with inflation later.",
                effects: { personalWealth: 0, treasury: -200, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "diplomatic_incident",
        title: "The Ambassador Expelled",
        description: "You expelled the US Ambassador for 'interfering in internal affairs.' The Americans expelled yours in response. Now 15 European countries followed suit. Diplomatic crisis is escalating. Your foreign minister says we can't back down now—it's a matter of sovereignty. But isolation has consequences.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Escalate. Expel 50 more diplomats. We don't need them.",
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 15 }
            },
            {
                text: "Backchannel de-escalation. Both sides quietly restore ambassadors.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: 5 }
            },
            {
                text: "Stand firm but pause. No more expulsions. Freeze the crisis.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 10 }
            }
        ]
    },
    {
        id: "whistleblower",
        title: "The Insider",
        description: "A senior official in your administration is leaking to Western media. Classified documents. Meeting transcripts. Your actual net worth. Security services narrowed it to 5 suspects. Your chief of staff recommends arresting all 5. One is your close friend from university. One is the FSB deputy director.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Arrest all 5. Interrogate harshly. Find the leak. No exceptions.",
                effects: { personalWealth: 0, treasury: -30, elite: -15, anger: 10 }
            },
            {
                text: "Targeted investigation. High-tech surveillance. Catch them properly.",
                effects: { personalWealth: -2, treasury: -50, elite: -5, anger: 5 }
            },
            {
                text: "Feed false information to each. See which leak makes it to press.",
                effects: { personalWealth: 0, treasury: -20, elite: 0, anger: 0 }
            }
        ]
    },
    {
        id: "ethnic_tensions_flare",
        title: "Ethnic Violence",
        description: "Ethnic riots in a border region. The majority ethnic group is attacking the minority. 30 dead so far. It started with a market dispute but decades of resentment exploded. Separatist rhetoric is growing. Both sides are armed. Military deployment could either restore order or escalate to civil conflict.",
        weight: 8,
        conditions: { anger: 40 },
        choices: [
            {
                text: "Military crackdown. Martial law. Curfew. Arrest leaders from both sides.",
                effects: { personalWealth: 0, treasury: -80, elite: 0, anger: 30 }
            },
            {
                text: "Side with majority. They're 'defending themselves.' Minority caused this.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 35 }
            },
            {
                text: "Reconciliation commission. Dialogue. Power-sharing. (Slow, uncertain)",
                effects: { personalWealth: -2, treasury: -60, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "cyber_attack",
        title: "The Hack",
        description: "A massive cyber attack just hit government systems. Foreign intelligence, probably. Your emails are leaked online. Cabinet meetings recorded. Financial transactions exposed. It's a digital Pearl Harbor. Embarrassing, damaging, and ongoing. Your cyber defense is primitive. You need help—maybe from those Chinese cyber units.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Accept Chinese cyber help. They'll secure systems but have backdoor access.",
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: 10 }
            },
            {
                text: "Hire private cyber mercenaries. Expensive but no political strings.",
                effects: { personalWealth: -5, treasury: -150, elite: -5, anger: 5 }
            },
            {
                text: "Blame the attack on whoever's convenient. Use it for political advantage.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 15 }
            }
        ]
    },
    {
        id: "monopoly_breakup",
        title: "The Telecom Monopoly",
        description: "One company controls 85% of telecom. Service is terrible. Prices are high. They're owned by your former KGB colleague. Competition regulators want to break up the monopoly. Your friend is threatening to release 'certain information' if you move against him. Extortion. But he's right—he knows everything.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Break up the monopoly. Call his bluff. You have more dirt on him.",
                effects: { personalWealth: -5, treasury: 60, elite: -15, anger: -20 }
            },
            {
                text: "Force him to sell 40% to another 'friendly' oligarch. Share the pie.",
                effects: { personalWealth: 3, treasury: 30, elite: -5, anger: -10 }
            },
            {
                text: "Protect the monopoly. He keeps quiet. Service stays terrible.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 20 }
            }
        ]
    },
    {
        id: "military_equipment_failure",
        title: "The Defective Tanks",
        description: "Your new main battle tank is a disaster. Engines catch fire. Armor penetrated easily. 40% failure rate in exercises. The defense contractor delivered garbage but charged premium prices. He's your wife's cousin. The generals are quietly furious. This affects national security.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Cancel the contract. Court-martial your wife's cousin. Fix the problem.",
                effects: { personalWealth: -8, treasury: -200, elite: -10, anger: -10 }
            },
            {
                text: "Force fixes at contractor's expense. Threaten him. He'll comply.",
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: 5 }
            },
            {
                text: "Accept the tanks. Propaganda says they're great. Hide the problems.",
                effects: { personalWealth: 5, treasury: -50, elite: -15, anger: 10 }
            }
        ]
    },
    {
        id: "drug_epidemic",
        title: "The Opioid Crisis",
        description: "Synthetic opioids are flooding the country. Overdoses up 400%. It's coming from labs in neighboring states—maybe with their government's knowledge. Young people dying. Treatment centers overwhelmed. Harsh drug laws aren't working. Some advisors suggest decriminalization. Your interior minister wants the death penalty for dealers.",
        weight: 6,
        conditions: { anger: 30 },
        choices: [
            {
                text: "Death penalty for trafficking. Harsh mandatory minimums. War on drugs.",
                effects: { personalWealth: 0, treasury: -60, elite: 10, anger: 20 }
            },
            {
                text: "Treatment approach. Build rehab centers. Public health, not criminal justice.",
                effects: { personalWealth: 0, treasury: -180, elite: -10, anger: -20 }
            },
            {
                text: "Military strike on foreign labs. Destroy supply at source. (Escalatory)",
                effects: { personalWealth: 0, treasury: -120, elite: 15, anger: 15 }
            }
        ]
    },
    {
        id: "artificial_intelligence_surveillance",
        title: "The AI Panopticon",
        description: "Chinese company is offering AI-powered surveillance: facial recognition, behavior prediction, social credit scoring. It works. Every camera, every transaction, every movement tracked. Perfect social control. Cost: $12 billion and your citizens' privacy forever. Your security chief is salivating.",
        weight: 5,
        conditions: { treasury: 300 },
        choices: [
            {
                text: "Full implementation. Every city. Social credit system. Total surveillance state.",
                effects: { personalWealth: 0, treasury: -500, elite: 15, anger: 40 }
            },
            {
                text: "Limited rollout. Major cities only. Monitor dissidents and criminals.",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 25 }
            },
            {
                text: "Reject. This is dystopian even by our standards. Draw a line.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "historical_revisionism_project",
        title: "Rewriting History",
        description: "Your education minister proposes new history textbooks. The 1990s collapse is now 'Western sabotage.' Your rise to power is 'national salvation.' Documented atrocities become 'necessary security measures.' Previous leaders are villains. You're the hero. It's propaganda, but it'll shape a generation's understanding.",
        weight: 5,
        conditions: {},
        choices: [
            {
                text: "Approve everything. Control the narrative. History is written by winners.",
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 15 }
            },
            {
                text: "Moderate version. Some truth, some spin. Balance propaganda and credibility.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 10 }
            },
            {
                text: "Reject. Blatant lies undermine long-term legitimacy. Keep some honesty.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -5 }
            }
        ]
    },
    {
        id: "wealth_display_problem",
        title: "The Watch",
        description: "You wore a $650,000 Swiss watch to a state TV interview about pension cuts. The screenshot went viral. Social media is exploding. Opposition calculated: that watch cost more than 80 years of average pension. Your spokesman's excuse ('It's a gift!') made it worse. Optics disaster.",
        weight: 6,
        conditions: { personalWealth: 30 },
        choices: [
            {
                text: "Defiant. 'I earned this.' Attack critics as jealous. Double down.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 30 }
            },
            {
                text: "Apologize. 'Insensitive timing.' Promise to donate value to charity.",
                effects: { personalWealth: -3, treasury: 0, elite: -5, anger: -10 }
            },
            {
                text: "Ignore it. Counter with distraction. Start a diplomatic crisis or something.",
                effects: { personalWealth: 0, treasury: -20, elite: 0, anger: 20 }
            }
        ]
    },
    {
        id: "opposition_figure_death",
        title: "Convenient Death",
        description: "Your main political opponent died suddenly. Official cause: heart attack. Unofficially: everyone thinks you killed him. His allies are calling it assassination. International media is speculating. Western governments demand investigation. The truth: he actually had a heart attack. But nobody believes that.",
        weight: 8,
        conditions: { anger: 35 },
        choices: [
            {
                text: "Thorough international investigation. Prove it was natural. Clear your name.",
                effects: { personalWealth: 0, treasury: -30, elite: -5, anger: -15 }
            },
            {
                text: "Limited investigation. Announce findings quickly. 'Nothing suspicious.'",
                effects: { personalWealth: 0, treasury: -10, elite: 0, anger: 20 }
            },
            {
                text: "Refuse investigation. 'Sovereign matter.' Let them speculate. Fear is useful.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 }
            }
        ]
    },
    {
        id: "rare_earth_monopoly",
        title: "The Strategic Minerals",
        description: "Your country has 40% of global rare earth mineral reserves—critical for all modern electronics. Chinese companies want exclusive extraction rights. Western tech companies are desperate for supply. You could play them against each other. This is geopolitical leverage. The question is: how ruthless to be?",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Auction to highest bidder. West and China compete. Maximize profit.",
                effects: { personalWealth: 15, treasury: 400, elite: 10, anger: 10 }
            },
            {
                text: "Exclusive Chinese deal. They pay less but offer political alliance.",
                effects: { personalWealth: 8, treasury: 250, elite: 5, anger: 15 }
            },
            {
                text: "State monopoly. We extract and process ourselves. Long-term independence.",
                effects: { personalWealth: 5, treasury: -200, elite: 0, anger: 10 }
            }
        ]
    },
    {
        id: "submarine_accident",
        title: "The Lost Submarine",
        description: "A nuclear submarine sank during exercises. 118 sailors trapped. Oxygen running out. International rescue offered. Your admirals refused—'classified military vessel.' 72 hours later: everyone dead. Families are devastated. The media is asking why you rejected help. Pride killed 118 men.",
        weight: 9,
        conditions: {},
        choices: [
            {
                text: "Admit the mistake. Apologize. Compensate families generously. Accountability.",
                effects: { personalWealth: -5, treasury: -120, elite: -15, anger: -20 }
            },
            {
                text: "Blame admirals. Fire them. 'I wasn't informed in time.' Deflect.",
                effects: { personalWealth: 0, treasury: -60, elite: -10, anger: 15 }
            },
            {
                text: "Classify everything. National security. Limited information release.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 35 }
            }
        ]
    },
    {
        id: "fake_news_factory",
        title: "The Troll Farm",
        description: "Your intelligence service runs a massive troll farm: 2,000 employees creating fake social media accounts, spreading disinformation, attacking critics. It's effective. But a whistleblower just leaked the operation. Screenshots of orders. Payment records. Your direct involvement. International scandal. Domestic embarrassment.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Deny everything. 'Fabricated by enemies.' Hunt the whistleblower.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 25 }
            },
            {
                text: "Admit it. 'Countering Western propaganda.' Justify it. Own it.",
                effects: { personalWealth: 0, treasury: -20, elite: 10, anger: 20 }
            },
            {
                text: "Shut down the operation. Too exposed. Find subtler methods.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 10 }
            }
        ]
    },
    {
        id: "brain_drain_tech",
        title: "The AI Startup Exodus",
        description: "Your best AI researchers are leaving for Silicon Valley. They're offered 10x salary, freedom to publish, stock options. Your tech sector is being hollowed out. You could restrict emigration, increase funding, or just accept that talent follows freedom and money. Keeping them requires real change.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Exit visa requirements for STEM graduates. Trap them here.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: 35 }
            },
            {
                text: "Massive tech investment. $20B fund. Compete with Silicon Valley.",
                effects: { personalWealth: -10, treasury: -800, elite: -5, anger: -15 }
            },
            {
                text: "Let them go. Brain drain is real but forced retention is worse.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 10 }
            }
        ]
    },
    {
        id: "monument_controversy",
        title: "The Statue",
        description: "Your supporters want to erect a 40-meter statue of you in the capital. Cost: $180 million. They say it's about 'preserving your legacy.' Critics call it cult of personality. International media will mock it. But your ego... it would be impressive. Caesar had statues. Stalin had statues. Why not you?",
        weight: 5,
        conditions: { personalWealth: 40, year: 5 },
        choices: [
            {
                text: "Build it. 50 meters, even. Gold-plated. Biggest in the region.",
                effects: { personalWealth: 0, treasury: -250, elite: 5, anger: 35 }
            },
            {
                text: "More modest monument. 'Memorial to National Revival' (with your face on it).",
                effects: { personalWealth: 0, treasury: -80, elite: 0, anger: 20 }
            },
            {
                text: "Reject. 'I am but a humble servant.' (Wait until after death for statues)",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -10 }
            }
        ]
    },
    {
        id: "foreign_agent_law",
        title: "Foreign Agent Registration",
        description: "New law proposal: any NGO receiving foreign funding must register as 'foreign agent.' It effectively kills civil society organizations—human rights groups, environmental orgs, election monitors. The West is threatening sanctions. But it also crushes your opposition's funding pipeline. Effective repression.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Pass it. Register 500+ NGOs as foreign agents. Cripple civil society.",
                effects: { personalWealth: 0, treasury: -30, elite: 15, anger: 30 }
            },
            {
                text: "Pass with exemptions. Target political groups, spare humanitarian ones.",
                effects: { personalWealth: 0, treasury: -20, elite: 10, anger: 20 }
            },
            {
                text: "Reject. NGOs are annoying but this is too heavy-handed. Monitor instead.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 }
            }
        ]
    },
    {
        id: "assassination_abroad_exposed",
        title: "The Botched Hit",
        description: "Your GRU agents tried to poison a defector in Berlin. They were caught on camera. Passports were fake but traceable. German intelligence identified them. Russia now has the whole operation documented. Your spokesman's denials are laughable. Two options: brazen it out or apologize (weakness).",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Total denial. 'They're tourists!' Absurd but maintain deniability.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 20 }
            },
            {
                text: "Recall ambassadors. Counter-accusations. Information war. Distract.",
                effects: { personalWealth: 0, treasury: -50, elite: 10, anger: 25 }
            },
            {
                text: "Acknowledge 'rogue elements.' Punish agents. De-escalate. (Rare restraint)",
                effects: { personalWealth: 0, treasury: -20, elite: -10, anger: 5 }
            }
        ]
    },
    {
        id: "banking_heir_arrest",
        title: "The Banker's Son",
        description: "A major banker's son killed someone in a drunk driving accident. Witnesses everywhere. He's guilty. But his father controls 40% of private credit. He's calling in favors. Wants charges dropped. The victim's family wants justice. This is a test: rule of law vs. oligarch privilege. Everyone's watching.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Drop charges. 'Insufficient evidence.' Oligarch privilege maintained.",
                effects: { personalWealth: 5, treasury: 0, elite: 10, anger: 40 }
            },
            {
                text: "Prosecute fully. Equal justice. Send him to prison. (Makes enemies)",
                effects: { personalWealth: 0, treasury: -40, elite: -20, anger: -25 }
            },
            {
                text: "Compromise. House arrest. Compensation to family. Satisfy no one equally.",
                effects: { personalWealth: 2, treasury: -20, elite: -5, anger: 15 }
            }
        ]
    },
    {
        id: "drought_famine_risk",
        title: "The Drought",
        description: "Worst drought in 50 years. Crops failing. Food prices rising 200%. Rural regions face famine. Climate change or bad luck—doesn't matter to starving people. You need emergency food imports ($8B) or ration domestic supplies. Either way, it's a crisis that exposes your agricultural failures.",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Emergency imports. Whatever it costs. Prevent famine. Protect legitimacy.",
                effects: { personalWealth: 0, treasury: -350, elite: 0, anger: -20 }
            },
            {
                text: "Rationing system. State controls distribution. Shortages but no famine.",
                effects: { personalWealth: 0, treasury: -120, elite: 5, anger: 30 }
            },
            {
                text: "Market solution. Prices rise, let supply/demand work. (Poor starve)",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 50 }
            }
        ]
    },
    {
        id: "palace_scandal_leak",
        title: "The Palace Plans",
        description: "Architectural plans for your Black Sea palace leaked online. 3D renders. Cost breakdowns. $1.4 billion. Hookah lounge. Underground ice rink. Italian toilet: $850K. People are sharing it everywhere. Your spokesman said 'it's not his palace.' Nobody believes that. The opulence is breathtaking and enraging.",
        weight: 8,
        conditions: { personalWealth: 35 },
        choices: [
            {
                text: "Admit it. 'Yes, it's mine. I earned it.' Own the luxury. Dominance display.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 40 }
            },
            {
                text: "Blame oligarchs. 'They built it, not me.' Implausible but deniable.",
                effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 30 }
            },
            {
                text: "Announce it's 'state property'—a resort for veterans. (Nobody believes it)",
                effects: { personalWealth: 0, treasury: -50, elite: 0, anger: 25 }
            }
        ]
    },
    {
        id: "constitutional_court_defiance",
        title: "The Stubborn Court",
        description: "The Constitutional Court ruled your latest decree unconstitutional. They actually defied you. The chief judge is a holdover from previous era. He has public support. You could ignore the ruling (set precedent), pack the court (obvious), or actually respect it (weakness). Rule of law vs. rule of power.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Ignore the ruling. 'Political decision.' Court has no enforcement power.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 }
            },
            {
                text: "Fire and replace 5 judges. Pack the court. Ensure future compliance.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 25 }
            },
            {
                text: "Respect the ruling. Withdraw the decree. Rule of law matters. (Rare)",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: -20 }
            }
        ]
    },
    {
        id: "bitcoin_boom",
        title: "The Crypto Question",
        description: "Bitcoin and crypto are booming in your country. Citizens using it to evade capital controls, hide wealth, and escape your monetary policy. Your central bank wants to ban it. Your tech oligarchs want to embrace it. Some officials are mining it themselves. You could ban, regulate, or adopt. Each has implications.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Total ban. Crypto is a threat to monetary sovereignty. Jail miners.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 30 }
            },
            {
                text: "Regulate and tax. Legal crypto market. State takes 30% of transactions.",
                effects: { personalWealth: 8, treasury: 150, elite: 0, anger: 10 }
            },
            {
                text: "State cryptocurrency. Launch official digital currency. Control the tech.",
                effects: { personalWealth: 0, treasury: -180, elite: 10, anger: 15 }
            }
        ]
    },
    {
        id: "oligarch_divorce",
        title: "The $12 Billion Divorce",
        description: "Your oligarch friend is divorcing his wife. She wants half: $12 billion. She knows everything—offshore accounts, shell companies, your personal deals. He's begging for help. You could pressure judges to minimize her settlement. Or stay neutral. Or even side with her—she'd be grateful and useful.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Rig the court. She gets $500M. Oligarch keeps the rest. Favors owed.",
                effects: { personalWealth: 3, treasury: 0, elite: 10, anger: 10 }
            },
            {
                text: "Neutral. Let courts decide. You're above petty oligarch drama.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 5 }
            },
            {
                text: "Side with her. She gets full half. Oligarch is furious but she's loyal now.",
                effects: { personalWealth: 5, treasury: 0, elite: -15, anger: 5 }
            }
        ]
    },
    {
        id: "healthcare_privatization",
        title: "The Hospital Sale",
        description: "Your health minister proposes privatizing hospitals. It would raise $15B immediately and cut state healthcare costs. But 40 million people rely on state healthcare. Private care is unaffordable for most. Oligarchs are lining up to buy hospitals. The doctors' union is threatening strikes.",
        weight: 6,
        conditions: { treasury: -100 },
        choices: [
            {
                text: "Full privatization. Sell everything. Healthcare is now for profit.",
                effects: { personalWealth: 10, treasury: 600, elite: 15, anger: 55 }
            },
            {
                text: "Partial. Keep basic care public, allow private premium services.",
                effects: { personalWealth: 5, treasury: 300, elite: 5, anger: 30 }
            },
            {
                text: "Reject. Healthcare is a human right. Keep it public.",
                effects: { personalWealth: 0, treasury: -150, elite: -10, anger: -20 }
            }
        ]
    },
    {
        id: "nuclear_power_plant",
        title: "The Nuclear Option",
        description: "A nuclear power plant project: 12 reactors, $40 billion, Russian technology. It would solve energy independence. But it's earthquake-prone region. Environmental groups are protesting. Chernobyl anniversary protests are massive. The contractor is offering you a $2B 'consulting fee.'",
        weight: 5,
        conditions: { treasury: 200 },
        choices: [
            {
                text: "Build it. Accept the kickback. Nuclear is the future.",
                effects: { personalWealth: 12, treasury: -1200, elite: 10, anger: 35 }
            },
            {
                text: "Build but reject personal payment. Transparent development.",
                effects: { personalWealth: 0, treasury: -1000, elite: 0, anger: 25 }
            },
            {
                text: "Cancel. Too risky. Invest in renewables instead.",
                effects: { personalWealth: 0, treasury: -300, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "historical_reparations_demand",
        title: "The Reparations Claim",
        description: "A neighboring country demands $100 billion in reparations for historical atrocities committed 70 years ago. It's legitimate—your predecessor's regime killed 200,000 of their citizens. International courts support their claim. But paying would bankrupt you. Nationalists say never apologize.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Reject completely. 'Historical revisionism.' We owe nothing.",
                effects: { personalWealth: 0, treasury: 0, elite: 15, anger: 10 }
            },
            {
                text: "Symbolic payment. $5B. Apology but not full reparations.",
                effects: { personalWealth: 0, treasury: -200, elite: -10, anger: 15 }
            },
            {
                text: "Full reparations over 20 years. Accept historical responsibility.",
                effects: { personalWealth: 0, treasury: -400, elite: -25, anger: 35 }
            }
        ]
    },
    {
        id: "youth_unemployment_crisis",
        title: "The Lost Generation",
        description: "Youth unemployment hit 45%. University graduates are driving taxis. Engineering degrees work in call centers. Brain drain accelerating. Young people have no future here. Revolution potential is high. You need jobs, but the economy is stagnant. Maybe a massive public works program?",
        weight: 7,
        conditions: { anger: 35 },
        choices: [
            {
                text: "Massive public works. $30B infrastructure program. Create 500k jobs.",
                effects: { personalWealth: -5, treasury: -1200, elite: -5, anger: -30 }
            },
            {
                text: "Tax breaks for employers. Subsidize private sector hiring.",
                effects: { personalWealth: 0, treasury: -300, elite: 10, anger: -15 }
            },
            {
                text: "Nothing. Market will correct itself. (It won't)",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 30 }
            }
        ]
    },
    {
        id: "royal_marriage_analogy",
        title: "The Dynastic Marriage",
        description: "Your daughter is marrying a billionaire oligarch's son. The wedding costs $300 million. Versailles-level opulence. Elton John is performing. Meanwhile, minimum wage is $200/month. The optics are catastrophic. Your PR team is sweating. Cancel, scale down, or embrace it?",
        weight: 6,
        conditions: { personalWealth: 50 },
        choices: [
            {
                text: "Full spectacle. Let them see how power celebrates. Dominance.",
                effects: { personalWealth: -10, treasury: 0, elite: 10, anger: 45 }
            },
            {
                text: "Private ceremony. Still lavish but not broadcast. Minimize exposure.",
                effects: { personalWealth: -5, treasury: 0, elite: 5, anger: 20 }
            },
            {
                text: "Modest wedding. Donate $200M to charity. Image rehabilitation.",
                effects: { personalWealth: -8, treasury: 0, elite: -5, anger: -15 }
            }
        ]
    },
    {
        id: "social_credit_system",
        title: "The Loyalty Score",
        description: "Implement a social credit system: rewards for loyalty, punishment for dissent. Criticize government online: lose job prospects. Attend rallies: get better housing. The Chinese system works. Your security apparatus wants it. It's Orwellian but effective.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Full implementation. Track everything. Rewards and punishments.",
                effects: { personalWealth: 0, treasury: -300, elite: 15, anger: 50 }
            },
            {
                text: "Pilot program. Test in one city. Scale if successful.",
                effects: { personalWealth: 0, treasury: -100, elite: 10, anger: 30 }
            },
            {
                text: "Reject. Some lines shouldn't be crossed. This is dystopian.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 }
            }
        ]
    },
    {
        id: "sports_doping_scandal",
        title: "The Doping Program",
        description: "Your state-sponsored athletic doping program was exposed. 1,000+ athletes systematically drugged. Olympics medals stripped. International sporting bans. Your sports minister ran it with FSB help. The whistleblower is in protective custody abroad. Deny or admit?",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Total denial. Whistleblower is a traitor. Western conspiracy.",
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 20 }
            },
            {
                text: "Admit minor issues. Promise reforms. Minimize damage.",
                effects: { personalWealth: 0, treasury: -80, elite: -5, anger: 10 }
            },
            {
                text: "Full admission. Fire sports minister. Clean house. Long ban.",
                effects: { personalWealth: 0, treasury: -120, elite: -15, anger: 5 }
            }
        ]
    },
    {
        id: "agricultural_land_grab",
        title: "The Farmland Seizure",
        description: "New law: allow foreign investors to buy agricultural land. Chinese companies want 5 million hectares. It's worth $20B. But it's national territory—selling to foreigners is treason to nationalists. Food security concerns. But you need the money.",
        weight: 6,
        conditions: { treasury: -200 },
        choices: [
            {
                text: "Allow the sale. $20B injection. Food security can be managed.",
                effects: { personalWealth: 8, treasury: 800, elite: -10, anger: 40 }
            },
            {
                text: "Lease not sale. 99-year leases. They farm it, we keep ownership.",
                effects: { personalWealth: 5, treasury: 400, elite: 0, anger: 25 }
            },
            {
                text: "Reject. Land is sovereignty. Some things aren't for sale.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: -10 }
            }
        ]
    },
    {
        id: "vaccine_nationalism",
        title: "The Vaccine Diplomacy",
        description: "You developed a COVID vaccine. It's 70% effective (you claim 95%). Western vaccines are better but scarce. You could sell to desperate countries, trade for political influence, or donate for goodwill. Vaccine diplomacy is geopolitical leverage.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Sell at premium prices. Maximize profit. Capitalism in crisis.",
                effects: { personalWealth: 15, treasury: 500, elite: 10, anger: 15 }
            },
            {
                text: "Political trades. Vaccines for UN votes, basing rights, alliances.",
                effects: { personalWealth: 5, treasury: 200, elite: 15, anger: 10 }
            },
            {
                text: "Donate to poor countries. Soft power play. Long-term influence.",
                effects: { personalWealth: 0, treasury: -150, elite: -5, anger: -15 }
            }
        ]
    },
    {
        id: "mafia_state_problem",
        title: "The Bratva Summit",
        description: "The major crime bosses want a meeting. They control ports, construction, half the economy. They're requesting 'understanding'—you don't interfere, they support you. Or you could try to break them (risky). Or legitimize them as 'security companies.' The line between state and mafia is blurring.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Partnership. They operate, you get 30%. Mafia state formalized.",
                effects: { personalWealth: 20, treasury: -100, elite: -10, anger: 30 }
            },
            {
                text: "Major crackdown. Arrest 50+ crime bosses. War with underworld.",
                effects: { personalWealth: -5, treasury: -150, elite: -15, anger: 20 }
            },
            {
                text: "Status quo. They stay underground, you ignore them. Plausible deniability.",
                effects: { personalWealth: 5, treasury: -50, elite: 0, anger: 15 }
            }
        ]
    },
    {
        id: "state_bankruptcy_risk",
        title: "The Default Crisis",
        description: "You're $200B in debt. Creditors want payment. Options: default (economic chaos), austerity (political suicide), or print money (hyperinflation). Or maybe... seize oligarch wealth? Every option is terrible. Welcome to sovereign debt crisis.",
        weight: 10,
        conditions: { treasury: -500 },
        choices: [
            {
                text: "Default. Restructure debt. 10 years of economic pain.",
                effects: { personalWealth: 0, treasury: 200, elite: -20, anger: 50 }
            },
            {
                text: "Seize oligarch offshore accounts. Force them to 'donate' $150B.",
                effects: { personalWealth: -20, treasury: 600, elite: -40, anger: -10 }
            },
            {
                text: "Print money. Inflate the debt away. Savings destroyed but state survives.",
                effects: { personalWealth: 0, treasury: 100, elite: -15, anger: 55 }
            }
        ]
    },
    {
        id: "space_station_disaster",
        title: "The Station Falls",
        description: "Your space station is falling apart. Life support failing. 6 cosmonauts aboard. Budget cuts and corruption left it undermaintained. Rescue mission costs $2B. Or evacuate and let it crash (some deaths possible). Space program pride vs. lives vs. money.",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Emergency rescue. Whatever it costs. Save them. National pride.",
                effects: { personalWealth: 0, treasury: -350, elite: 5, anger: -15 }
            },
            {
                text: "Controlled evacuation. Get them out. Let station crash into ocean.",
                effects: { personalWealth: 0, treasury: -120, elite: 0, anger: 5 }
            },
            {
                text: "They knew the risks. Cosmonaut sacrifice. Save the money.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 45 }
            }
        ]
    },
    {
        id: "population_decline",
        title: "The Demographic Crisis",
        description: "Population declining 1% annually. Birth rates collapsing. Workforce shrinking. Aging crisis. Solutions: immigration (nationalists hate it), child subsidies ($50B/year), or nothing (decline continues). This is existential long-term.",
        weight: 6,
        conditions: { year: 4 },
        choices: [
            {
                text: "Massive immigration program. Open borders to Central Asia.",
                effects: { personalWealth: 0, treasury: -100, elite: -15, anger: 45 }
            },
            {
                text: "Child subsidies. $30k per child. Encourage births with money.",
                effects: { personalWealth: 0, treasury: -800, elite: 0, anger: -20 }
            },
            {
                text: "Do nothing. Natural population decline. Smaller is fine.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 20 }
            }
        ]
    },
    {
        id: "military_coup_plot_discovered",
        title: "The Colonel's Plot",
        description: "Your FSB discovered a coup plot. Junior military officers, 200+ involved. They planned to arrest you during military parade. Plot was serious—trucks, weapons, safe houses. Ringleader is a colonel. Now: show trials, mass purge, or quiet arrests?",
        weight: 9,
        conditions: { elite: -40 },
        choices: [
            {
                text: "Public show trials. Televise executions. Terror as deterrent.",
                effects: { personalWealth: 0, treasury: -50, elite: -20, anger: 35 }
            },
            {
                text: "Quiet arrests. Disappear them. No publicity, no martyrs.",
                effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 15 }
            },
            {
                text: "Mass military purge. Fire 2,000 officers. Gut potential opposition.",
                effects: { personalWealth: 0, treasury: -120, elite: -30, anger: 25 }
            }
        ]
    },
    {
        id: "internet_cable_sabotage",
        title: "The Severed Cables",
        description: "Undersea internet cables connecting you to the world were cut. Suspicious. Could be sabotage. Internet is down nationwide. Economy losing $2B daily. Repairs take weeks. Maybe it's a  message from adversaries. Or test your resilience. You're digitally isolated.",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Emergency satellite internet. Expensive but restores connectivity.",
                effects: { personalWealth: -5, treasury: -300, elite: 0, anger: 15 }
            },
            {
                text: "Use it. National intranet only. Control all information during repair.",
                effects: { personalWealth: 0, treasury: -150, elite: 10, anger: 35 }
            },
            {
                text: "Blame and retaliate. Cyber attack on suspected perpetrators.",
                effects: { personalWealth: 0, treasury: -200, elite: 15, anger: 20 }
            }
        ]
    },
    {
        id: "oligarch_heart_attack",
        title: "The Suspicious Timing",
        description: "Your rival oligarch had a fatal heart attack. He was about to testify about your corruption. Perfect timing. Everyone suspects you ordered it. The truth: you didn't. It was natural. But the narrative is set—you kill business rivals. Fear increases but so does hatred.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Lean into it. Let them think you did it. Fear is power.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 }
            },
            {
                text: "Aggressive denial. Release medical records. Prove it was natural.",
                effects: { personalWealth: 0, treasury: -20, elite: -5, anger: 15 }
            },
            {
                text: "Honor him publicly. State funeral. Generosity masks involvement (or innocence).",
                effects: { personalWealth: -2, treasury: -30, elite: 0, anger: 20 }
            }
        ]
    },
    {
        id: "women_rights_protest",
        title: "The Women's March",
        description: "50,000 women protesting domestic violence laws. 40% of women experience abuse. Police rarely intervene. New law would strengthen protections. But it also empowers feminist movement. Conservative lawmakers oppose it. Orthodox Church opposes it. But the women aren't backing down.",
        weight: 6,
        conditions: { anger: 30 },
        choices: [
            {
                text: "Pass the law. Women's rights matter. Anger conservatives.",
                effects: { personalWealth: 0, treasury: -40, elite: -10, anger: -15 }
            },
            {
                text: "Watered-down version. Symbolic changes, little enforcement.",
                effects: { personalWealth: 0, treasury: -20, elite: 0, anger: 10 }
            },
            {
                text: "Reject. 'Traditional values.' Church and conservatives win.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 }
            }
        ]
    },
    {
        id: "luxury_goods_tax",
        title: "The Oligarch Tax",
        description: "New proposal: 50% tax on luxury goods—yachts, private jets, supercars, watches over $100k. It would raise $8B and look populist. But your oligarch friends would pay it. They're calling you, angry. 'This is our money!' they say. Test of loyalty vs. populism.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Pass it. Populist win. Oligarchs can afford it.",
                effects: { personalWealth: -3, treasury: 320, elite: -20, anger: -25 }
            },
            {
                text: "Pass with loopholes. Looks good, doesn't hurt friends.",
                effects: { personalWealth: 0, treasury: 100, elite: -5, anger: -10 }
            },
            {
                text: "Reject. Oligarchs are untouchable. Protect their wealth.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 25 }
            }
        ]
    },
    {
        id: "journalist_abduction",
        title: "The Missing Reporter",
        description: "A prominent investigative journalist vanished. Last seen investigating your money laundering network. Her colleagues say she was abducted. International press freedom groups are protesting. Your FSB says they know nothing. Everyone thinks you killed her. She may still be alive... somewhere.",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "'She fled the country.' Produce a fake video. End the story.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 25 }
            },
            {
                text: "Massive search operation. Find her. Prove innocence (or guilt).",
                effects: { personalWealth: 0, treasury: -60, elite: -5, anger: 20 }
            },
            {
                text: "Ignore it. Journalists disappear. It happens. Move on.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 35 }
            }
        ]
    },
    {
        id: "currency_manipulation",
        title: "The Currency War",
        description: "US Treasury designated you a 'currency manipulator.' They're right—you've been suppressing currency value to boost exports. It works economically but now faces sanctions. Continue manipulation (economic benefit, political cost) or stop (economic damage, sanctions lifted)?",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Continue. Economic benefits outweigh sanctions risk.",
                effects: { personalWealth: 5, treasury: 200, elite: 5, anger: 10 }
            },
            {
                text: "Stop manipulation. Let currency float. Appease international pressure.",
                effects: { personalWealth: 0, treasury: -150, elite: -5, anger: 15 }
            },
            {
                text: "Counter-accuse US. Propaganda war. Deflect attention.",
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 15 }
            }
        ]
    },
    {
        id: "veterans_protests",
        title: "The Forgotten Veterans",
        description: "Afghanistan veterans are protesting. Promised benefits never materialized. Medical care inadequate. Many are homeless. They fought for you, now feel abandoned. War veterans protesting is powerful optics. They have military training and weapons access. This could get ugly.",
        weight: 7,
        conditions: { anger: 30 },
        choices: [
            {
                text: "Full benefits package. $5B annually. Honor their service properly.",
                effects: { personalWealth: 0, treasury: -200, elite: 0, anger: -25 }
            },
            {
                text: "Symbolic improvements. Small increases. Looks caring, manageable cost.",
                effects: { personalWealth: 0, treasury: -60, elite: 0, anger: -10 }
            },
            {
                text: "Crack down. Veterans don't get special protest rights. Disperse them.",
                effects: { personalWealth: 0, treasury: -20, elite: 10, anger: 40 }
            }
        ]
    },
    {
        id: "arctic_military_base",
        title: "The Arctic Fortress",
        description: "Build a massive Arctic military base. Project power. Control shipping lanes. Claim territory. Cost: $15B. Strategic value: enormous. But it's aggressive militarization. US and NATO will respond. Arms race in Arctic begins. Worth it for national security?",
        weight: 6,
        conditions: { treasury: 300 },
        choices: [
            {
                text: "Build it. Full military complex. Permanent Arctic presence.",
                effects: { personalWealth: 0, treasury: -600, elite: 15, anger: 10 }
            },
            {
                text: "Limited base. Research station with military support. Lower profile.",
                effects: { personalWealth: 0, treasury: -250, elite: 5, anger: 5 }
            },
            {
                text: "Cancel. Too provocative. Avoid Arctic arms race.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 0 }
            }
        ]
    },
    {
        id: "state_tv_propaganda_fail",
        title: "The Propaganda Blunder",
        description: "State TV produced a propaganda piece so absurd it became a meme. CGI was terrible. Lies were obvious. Even your supporters are laughing. International media mocking you. The propaganda minister responsible is your nephew. Fire him (admit failure) or double down (look ridiculous)?",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Fire him publicly. 'Unacceptable quality.' Admit error, move on.",
                effects: { personalWealth: 0, treasury: -20, elite: -5, anger: -10 }
            },
            {
                text: "Double down. 'Western misinterpretation.' Defend the absurd.",
                effects: { personalWealth: 0, treasury: -10, elite: 5, anger: 25 }
            },
            {
                text: "Ignore completely. Pretend it never happened. Bury it.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 15 }
            }
        ]
    },
    {
        id: "biodiversity_collapse",
        title: "The Dying Lake",
        description: "Largest lake in country is dying. Pollution from state industries. Fish populations collapsed. 5 million depend on it. Environmental catastrophe. Cleanup costs $10B. Stopping pollution means closing factories (20k jobs). Choose: environment, jobs, or ignore the problem.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Full cleanup. Close polluting factories. Save the lake.",
                effects: { personalWealth: 0, treasury: -450, elite: -10, anger: -15 }
            },
            {
                text: "Partial measures. Reduce pollution, keep factories open. Compromise.",
                effects: { personalWealth: 0, treasury: -200, elite: 0, anger: 5 }
            },
            {
                text: "Ignore. Pollution is the price of industry. Lake is expendable.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 }
            }
        ]
    },
    {
        id: "billionaire_space_race",
        title: "The Oligarch's Rocket",
        description: "Your oligarch friend wants to start a private space company. Like SpaceX but yours. He needs $20B in state contracts. It's vanity project meets genuine innovation. Could boost aerospace industry. Or it's just billionaire ego. Fund it or refuse?",
        weight: 5,
        conditions: { treasury: 400 },
        choices: [
            {
                text: "Fund it fully. $20B contracts. Maybe it works. National prestige.",
                effects: { personalWealth: 5, treasury: -800, elite: 10, anger: 20 }
            },
            {
                text: "Partial support. $5B. Let him prove concept first.",
                effects: { personalWealth: 2, treasury: -200, elite: 5, anger: 10 }
            },
            {
                text: "Reject. Billionaire space toys while people starve? No.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 }
            }
        ]
    },
    {
        id: "succession_grooming",
        title: "The Chosen One",
        description: "You need to groom a successor. Options: your son (incompetent but loyal), your PM (competent but ambitious), or a young technocrat (unknown quantity). The succession determines your legacy and retirement security. Choose carefully.",
        weight: 7,
        conditions: { year: 8 },
        choices: [
            {
                text: "Your son. Keep power in family. Incompetence is manageable.",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: 25 }
            },
            {
                text: "The Prime Minister. Competent governance. But he might betray you later.",
                effects: { personalWealth: -5, treasury: 0, elite: 10, anger: -10 }
            },
            {
                text: "Young technocrat. Fresh face. You pull strings from behind.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 5 }
            }
        ]
    },
    {
        id: "fifa_world_cup_disaster",
        title: "The World Cup Failure",
        description: "You hosted the World Cup. Cost $28B. It was a disaster. Stadiums unfinished. Corruption everywhere. Hooligans rioted. International embarrassment. The Minister responsible stole $8B. Everyone knows. Fire him (admit failure) or protect him (loyalty)?",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Arrest the Minister. Recover stolen money. Show accountability.",
                effects: { personalWealth: 3, treasury: 150, elite: -10, anger: -15 }
            },
            {
                text: "Protect him. He knows too much. Loyalty over accountability.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 35 }
            },
            {
                text: "Scapegoat lower officials. Protect the Minister, blame subordinates.",
                effects: { personalWealth: 0, treasury: 50, elite: 0, anger: 20 }
            }
        ]
    },
    {
        id: "educational_brain_drain_crisis",
        title: "The University Exodus",
        description: "Your best universities are collapsing. Top professors leaving. Research funding cut. Students going abroad. Academic standards plummeting. You need $15B to stabilize higher education. Or let it decline—educated people cause problems anyway.",
        weight: 6,
        conditions: {},
        choices: [
            {
                text: "Major investment. $15B. Rebuild academic excellence.",
                effects: { personalWealth: -5, treasury: -600, elite: -5, anger: -20 }
            },
            {
                text: "Selective funding. Elite universities get money, others decline.",
                effects: { personalWealth: 0, treasury: -250, elite: 0, anger: 15 }
            },
            {
                text: "Let it decline. Technical schools are enough. Less critical thinking.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 25 }
            }
        ]
    },
    {
        id: "prison_riot",
        title: "The Prison Massacre",
        description: "Major prison riot. Inmates took guards hostage. Your interior minister sent special forces. 47 inmates killed. 'Official story: they were armed. Truth: it was an execution. Survivors are talking. Human rights groups investigating. Cover it up or admit?",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Full cover-up. Prisoners were dangerous terrorists. Justified response.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 25 }
            },
            {
                text: "Admit excessive force. Fire prison warden. Compensate families.",
                effects: { personalWealth: -2, treasury: -80, elite: -10, anger: -10 }
            },
            {
                text: "Blame prisoners. They chose violence. No investigation needed.",
                effects: { personalWealth: 0, treasury: -10, elite: 15, anger: 30 }
            }
        ]
    },
    {
        id: "cyber_currency_scheme",
        title: "The State Crypto Scam",
        description: "Your government launched official cryptocurrency. Citizens bought billions worth. It crashed 95%. Officials profited from insider trading. It was essentially a pump-and-dump scheme. Citizens lost life savings. They're protesting. This was daylight robbery of your own people.",
        weight: 9,
        conditions: {},
        choices: [
            {
                text: "Compensate victims 50%. Admit mistakes. Costly but ethical.",
                effects: { personalWealth: -10, treasury: -400, elite: -10, anger: -25 }
            },
            {
                text: "Blame market volatility. 'Investment risk.' No compensation.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 50 }
            },
            {
                text: "Arrest some officials as scapegoats. Limited compensation. Balance.",
                effects: { personalWealth: -3, treasury: -150, elite: 0, anger: 20 }
            }
        ]
    },
    {
        id: "secret_police_expansion",
        title: "The New KGB",
        description: "Expand secret police powers. More surveillance. More arrests. No warrants needed. Political prisoners doubled. It's effective repression but increasingly brutal. Even loyal elites are nervous—nobody's safe. This is crossing into true police state territory.",
        weight: 7,
        conditions: { anger: 45 },
        choices: [
            {
                text: "Full expansion. Total security state. Everyone is monitored.",
                effects: { personalWealth: 0, treasury: -200, elite: -20, anger: 50 }
            },
            {
                text: "Targeted expansion. Focus on genuine threats, not everyone.",
                effects: { personalWealth: 0, treasury: -100, elite: -5, anger: 30 }
            },
            {
                text: "Limit powers. Even security states need some constraints.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: -10 }
            }
        ]
    }
];

// Legacy achievements that can be earned
const LEGACY_ACHIEVEMENTS = {
    // Defined in events above
};
