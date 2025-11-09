// The Oligarch's Gambit - v1.3
// Corruption, Control, Tech & Cultural Events
// 66 events

const MISC_EVENTS = [
    {
        id: "oligarch_yacht_party",
        title: "The Yacht Incident",
        description: "Your aluminum magnate friend just acquired a 500-foot superyacht with a submarine dock and missile defense system. He's hosting a party in the Mediterranean. Half your cabinet will be there with their mistresses. Your PR team is panicking - bread lines are getting longer and social media is exploding with anger.",
        weight: 5,
        conditions: {},
        onceOnly: true,
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
        id: "journalist_problem",
        title: "An Inconvenient Reporter",
        description: "An investigative journalist has documents proving you own 47 properties abroad, including a palace that cost more than your official salary for 200 years. She's publishing in 48 hours. Your FSB chief offers three options: novichok, a car accident, or we could just shoot her in the elevator. Your PR chief suggests buying her off.",
        weight: 7,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        id: "military_parade",
        title: "Victory Day Parade",
        description: "Victory Day is here. The generals want a massive show of strength: 15,000 troops, 200 tanks, nuclear ICBMs rolling through Red Square, fighter jet flyovers. Cost: $500 million. The same amount would rebuild 50 hospitals. Your image consultant says the people need bread and circuses. Heavy on the circuses.",
        weight: 5,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        id: "energy_oligarch_rivalry",
        title: "The Gas Baron's Move",
        description: "Your former ally controls the second-largest gas company. He's quietly negotiating his own deals with China, cutting you out. He's offering better prices and faster delivery. Chinese officials are taking his calls. Your monopoly is threatened from within. The FSB has a dossier ready: embezzlement, fraud, treason.",
        weight: 7,
        conditions: { hasTriggered: ["alternative_energy_routes"] },
        onceOnly: true,
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
        id: "university_purge",
        title: "Academic Freedom",
        description: "The main university's faculty is too liberal. Professors criticize you in lectures. Students learn dangerous ideas. Your education minister wants to fire 40 'problematic' professors and install party loyalists. The university rector is protesting. Western academic organizations are watching.",
        weight: 5,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        id: "sports_prestige",
        title: "The World Cup Bid",
        description: "Your sports minister wants to bid for the World Cup. It would cost $25 billion in stadiums and infrastructure. But it's global prestige. Soft power. National pride. The bribe to FIFA officials alone is $800 million. Qatar did it. Russia did it. Why not you?",
        weight: 5,
        conditions: { treasury: 400 },
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        id: "diplomatic_incident",
        title: "The Ambassador Expelled",
        description: "You expelled the US Ambassador for 'interfering in internal affairs.' The Americans expelled yours in response. Now 15 European countries followed suit. Diplomatic crisis is escalating. Your foreign minister says we can't back down now—it's a matter of sovereignty. But isolation has consequences.",
        weight: 6,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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
        id: "cyber_attack",
        title: "The Hack",
        description: "A massive cyber attack just hit government systems. Foreign intelligence, probably. Your emails are leaked online. Cabinet meetings recorded. Financial transactions exposed. It's a digital Pearl Harbor. Embarrassing, damaging, and ongoing. Your cyber defense is primitive. You need help—maybe from those Chinese cyber units.",
        weight: 7,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        id: "nuclear_power_plant",
        title: "The Nuclear Option",
        description: "A nuclear power plant project: 12 reactors, $40 billion, Russian technology. It would solve energy independence. But it's earthquake-prone region. Environmental groups are protesting. Chernobyl anniversary protests are massive. The contractor is offering you a $2B 'consulting fee.'",
        weight: 5,
        conditions: { treasury: 200 },
        onceOnly: true,
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
        onceOnly: true,
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
        id: "royal_marriage_analogy",
        title: "The Dynastic Marriage",
        description: "Your daughter is marrying a billionaire oligarch's son. The wedding costs $300 million. Versailles-level opulence. Elton John is performing. Meanwhile, minimum wage is $200/month. The optics are catastrophic. Your PR team is sweating. Cancel, scale down, or embrace it?",
        weight: 6,
        conditions: { personalWealth: 50 },
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        id: "space_station_disaster",
        title: "The Station Falls",
        description: "Your space station is falling apart. Life support failing. 6 cosmonauts aboard. Budget cuts and corruption left it undermaintained. Rescue mission costs $2B. Or evacuate and let it crash (some deaths possible). Space program pride vs. lives vs. money.",
        weight: 8,
        conditions: {},
        onceOnly: true,
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
        id: "internet_cable_sabotage",
        title: "The Severed Cables",
        description: "Undersea internet cables connecting you to the world were cut. Suspicious. Could be sabotage. Internet is down nationwide. Economy losing $2B daily. Repairs take weeks. Maybe it's a  message from adversaries. Or test your resilience. You're digitally isolated.",
        weight: 8,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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
        id: "luxury_goods_tax",
        title: "The Oligarch Tax",
        description: "New proposal: 50% tax on luxury goods—yachts, private jets, supercars, watches over $100k. It would raise $8B and look populist. But your oligarch friends would pay it. They're calling you, angry. 'This is our money!' they say. Test of loyalty vs. populism.",
        weight: 6,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        id: "fifa_world_cup_disaster",
        title: "The World Cup Failure",
        description: "You hosted the World Cup. Cost $28B. It was a disaster. Stadiums unfinished. Corruption everywhere. Hooligans rioted. International embarrassment. The Minister responsible stole $8B. Everyone knows. Fire him (admit failure) or protect him (loyalty)?",
        weight: 8,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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
        id: "cyber_currency_scheme",
        title: "The State Crypto Scam",
        description: "Your government launched official cryptocurrency. Citizens bought billions worth. It crashed 95%. Officials profited from insider trading. It was essentially a pump-and-dump scheme. Citizens lost life savings. They're protesting. This was daylight robbery of your own people.",
        weight: 9,
        conditions: {},
        onceOnly: true,
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
        onceOnly: true,
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


