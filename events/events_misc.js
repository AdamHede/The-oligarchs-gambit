// The Oligarch's Gambit - v1.6.0
// Corruption, Control, Tech & Cultural Events
// 67 events (added A Quiet Quarter)

const MISC_EVENTS = [
    {
        id: "quiet_quarter",
        title: "A Quiet Quarter",
        description: "Nothing particularly dramatic happens this quarter. Your administration continues its usual operations. The bureaucracy grinds on. Budgets are approved. Palms are greased. The elite are satisfied with the status quo, but the treasury bleeds from inefficiency and corruption as always.",
        weight: 3,
        conditions: {},
        onceOnly: false,
        choices: [
            {
                text: "Continue business as usual",
                effects: { personalWealth: 0, treasury: -100, elite: 5, anger: -5 }
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
                addToPool: ["journalist_martyrdom", "press_fear", "international_sanctions"]
            },
            {
                text: "Offer her $5M and a state TV anchor position.",
                effects: { personalWealth: -2, treasury: -15, elite: 0, anger: -5 },
                legacy: { icon: "📺", name: "Propagandist", weight: 5 },
                addToPool: ["bought_journalist"]
            },
            {
                text: "Let it publish. Flood the zone with disinformation.",
                effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 10 },
                addToPool: ["corruption_exposed", "disinformation_campaign"]
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
                addToPool: ["palace_scandal_leak"]
            },
            {
                text: "Scale it down. Build 'off the books' using state contractors.",
                effects: { personalWealth: -3, treasury: -150, elite: 5, anger: 15 },
                addToPool: ["hidden_palace"]
            },
            {
                text: "Too risky. Invest offshore instead.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -5 },
                addToPool: ["offshore_expansion"]
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
                legacy: { icon: "⚖️", name: "Kingbreaker", weight: 9 },
                addToPool: ["oligarch_panic", "asset_seizure_precedent", "elite_fear", "opposition_funding_cut"]
            },
            {
                text: "Force him to 'sell' half his assets to your shell companies.",
                effects: { personalWealth: 15, treasury: 20, elite: -10, anger: 10 },
                addToPool: ["forced_sale_model", "oligarch_resentment", "wealth_consolidation", "power_demonstration"]
            },
            {
                text: "Leave him alone. Better to have him inside the tent.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 0 },
                addToPool: ["rival_strengthens", "opposition_funded", "power_sharing_uneasy", "future_threat"]
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
                addToPool: ["crackdown_aftermath", "international_sanctions"]
            },
            {
                text: "Bus in 100k loyalists. Pay them $50 each. Drown them out.",
                effects: { personalWealth: -2, treasury: -80, elite: 5, anger: 10 },
                addToPool: ["fake_counter_protest"]
            },
            {
                text: "Promise reforms. Release some political prisoners. Lie.",
                effects: { personalWealth: 0, treasury: -20, elite: -10, anger: -15 },
                addToPool: ["broken_promises"]
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
                addToPool: ["economic_crisis", "investor_flight"]
            },
            {
                text: "Keep her as figurehead. Route around her decisions.",
                effects: { personalWealth: 2, treasury: -40, elite: 0, anger: 5 },
                addToPool: ["shadow_economy"]
            },
            {
                text: "Actually listen to her. Tighten the belt.",
                effects: { personalWealth: -2, treasury: 150, elite: -5, anger: -10 },
                addToPool: ["economic_stability"]
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
                legacy: { icon: "📊", name: "Democratic Champion (87%)", weight: 10 },
                addToPool: ["election_protests", "international_condemnation"]
            },
            {
                text: "Subtle rigging. Block main opponent. Win 52%.",
                effects: { personalWealth: -2, treasury: -50, elite: 5, anger: 10 },
                addToPool: ["narrow_victory"]
            },
            {
                text: "Run a real campaign. Spend big. Risk everything.",
                effects: { personalWealth: -8, treasury: -150, elite: -15, anger: -20 },
                addToPool: ["legitimacy_boost"]
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
                legacy: { icon: "🔒", name: "Digital Czar", weight: 7 },
                addToPool: ["great_firewall", "tech_sector_collapse", "vpn_wars", "chinese_dependency"]
            },
            {
                text: "Selective censorship. Block opposition sites, allow cat videos.",
                effects: { personalWealth: 0, treasury: -80, elite: 5, anger: 15 },
                addToPool: ["censorship_escalation", "vpn_use_grows", "tech_cat_mouse", "partial_control"]
            },
            {
                text: "Light touch. Monitor but don't block. Honey trap.",
                effects: { personalWealth: 0, treasury: -30, elite: -5, anger: 0 },
                addToPool: ["surveillance_subtle", "intelligence_gathering", "false_freedom", "monitoring_state"]
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
                legacy: { icon: "👑", name: "President for Life", weight: 18 },
                addToPool: ["dictatorship_formalized", "protest_movement", "international_condemnation", "power_secured"]
            },
            {
                text: "The switcheroo. President→PM→President. Musical chairs.",
                effects: { personalWealth: 2, treasury: -50, elite: 10, anger: 25 },
                addToPool: ["constitutional_charade", "tandem_power_struggles", "puppet_president", "cynicism_grows"]
            },
            {
                text: "Reset the clock. 'New constitution, new me.' Referendum at 96%.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 20 },
                addToPool: ["fake_referendum", "term_limits_reset", "democratic_facade", "opposition_frustrated"]
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
                legacy: { icon: "🚀", name: "Cosmic Dreamer", weight: 9 },
                addToPool: ["space_program_decline"]
            },
            {
                text: "Fund it. But 50% goes to my nephew's 'consulting firm.'",
                effects: { personalWealth: 16, treasury: -320, elite: 5, anger: 25 },
                addToPool: ["space_corruption_exposed"]
            },
            {
                text: "Reject. Fix pensions first. Earth before Mars.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 },
                addToPool: ["pensioners_relieved"]
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
                addToPool: ["war_crimes_allegations"]
            },
            {
                text: "Pause. We made our point. Let them suffer but not die.",
                effects: { personalWealth: 0, treasury: -80, elite: 5, anger: 15 }
            },
            {
                text: "Offer to restore power in exchange for territorial concessions.",
                effects: { personalWealth: 0, treasury: -40, elite: 0, anger: 10 },
                addToPool: ["negotiated_settlement"]
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
                effects: { personalWealth: 18, treasury: 120, elite: -15, anger: 15 },
                addToPool: ["oligarch_panic"]
            },
            {
                text: "Force merger. 60/40 split in your favor. Absorb his network.",
                effects: { personalWealth: 12, treasury: 80, elite: -5, anger: 10 },
                addToPool: ["forced_partnership"]
            },
            {
                text: "Let him operate. Two suppliers competing makes both stronger. (Risky)",
                effects: { personalWealth: 0, treasury: 40, elite: 10, anger: 0 },
                addToPool: ["rival_grows_stronger"]
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
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 25 },
                addToPool: ["academic_exodus"]
            },
            {
                text: "Targeted dismissals. Fire 10 worst offenders. Warning to others.",
                effects: { personalWealth: 0, treasury: -10, elite: 0, anger: 15 },
                addToPool: ["self_censorship_spreads"]
            },
            {
                text: "Leave them alone. Academic freedom... within limits. Monitor them.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -5 },
                addToPool: ["intellectual_opposition"]
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
                effects: { personalWealth: 3, treasury: 40, elite: 5, anger: 30 },
                addToPool: ["media_monopoly", "press_freedom_dead", "oligarch_enemy_made", "information_control"]
            },
            {
                text: "Force sale to a 'friendly' oligarch. Keep it on air but controlled.",
                effects: { personalWealth: 2, treasury: 20, elite: 0, anger: 20 },
                addToPool: ["controlled_opposition", "fake_pluralism", "editorial_control", "subtle_censorship"]
            },
            {
                text: "Leave it. One critical voice makes you seem tolerant. Manageable risk.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -10 },
                addToPool: ["limited_freedom", "safety_valve", "corruption_exposed", "tolerance_demonstrated"]
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
                effects: { personalWealth: -5, treasury: -1000, elite: 10, anger: 25 },
                addToPool: ["fifa_world_cup_disaster"]
            },
            {
                text: "Symbolic bid. No bribes. We won't win but we look principled.",
                effects: { personalWealth: 0, treasury: -50, elite: -5, anger: 5 },
                addToPool: ["bid_rejected"]
            },
            {
                text: "Reject. $25B on stadiums while hospitals crumble? Insane.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 },
                addToPool: ["pragmatic_choice"]
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
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 30 },
                addToPool: ["journalist_problem", "press_crackdown", "western_sanctions_threat", "corruption_exposed"]
            },
            {
                text: "Partial admission. 'Legal tax planning.' Promise reform. (Lie)",
                effects: { personalWealth: -5, treasury: -40, elite: -10, anger: 20 },
                addToPool: ["fake_reform_commission", "transparency_theater", "elite_resentment", "broken_promises"]
            },
            {
                text: "Ignore it. What are they going to do? I control the courts.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 25 },
                addToPool: ["impunity_culture", "international_isolation", "protest_movement", "legitimacy_crisis"]
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
                effects: { personalWealth: 0, treasury: -60, elite: 5, anger: 30 },
                addToPool: ["extremist_underground", "martyrs_created", "radicalization_accelerates", "insurgency_risk"]
            },
            {
                text: "Co-opt moderate clerics. State-funded mosques. Control the message.",
                effects: { personalWealth: -3, treasury: -80, elite: 0, anger: -10 },
                addToPool: ["controlled_religion", "moderate_clergy", "extremist_opposition", "religious_stability"]
            },
            {
                text: "Ignore it. They're disorganized. No immediate threat.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: 20 },
                addToPool: ["extremism_spreads", "radicalization_grows", "future_crisis", "complacency_risk"]
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
                effects: { personalWealth: -3, treasury: -100, elite: -10, anger: -20 },
                addToPool: ["family_betrayal", "accountability_precedent", "infrastructure_reform", "elite_nervousness"]
            },
            {
                text: "Blame the contractor. Protect your nephew. Scapegoat engineers.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 25 },
                addToPool: ["scapegoat_engineers", "nepotism_exposed", "corruption_visible", "engineer_demoralization"]
            },
            {
                text: "Compensate families generously. Don't admit fault. Move on.",
                effects: { personalWealth: -5, treasury: -120, elite: 0, anger: 10 },
                addToPool: ["blood_money", "no_accountability", "infrastructure_still_broken", "negligence_continues"]
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
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 15 },
                addToPool: ["diplomatic_isolation"]
            },
            {
                text: "Backchannel de-escalation. Both sides quietly restore ambassadors.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: 5 },
                addToPool: ["quiet_diplomacy"]
            },
            {
                text: "Stand firm but pause. No more expulsions. Freeze the crisis.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 10 },
                addToPool: ["frozen_relations"]
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
                effects: { personalWealth: 0, treasury: -30, elite: -15, anger: 10 },
                addToPool: ["paranoia_spreads", "inner_circle_fractured", "loyalty_tested", "brutal_interrogation"]
            },
            {
                text: "Targeted investigation. High-tech surveillance. Catch them properly.",
                effects: { personalWealth: -2, treasury: -50, elite: -5, anger: 5 },
                addToPool: ["surveillance_state", "leak_identified", "trust_eroded", "counterintelligence"]
            },
            {
                text: "Feed false information to each. See which leak makes it to press.",
                effects: { personalWealth: 0, treasury: -20, elite: 0, anger: 0 },
                addToPool: ["canary_trap", "leak_exposed", "spy_games", "intelligence_craft"]
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
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: 10 },
                addToPool: ["chinese_dependency", "backdoor_compromise", "security_restored", "sovereignty_sacrificed"]
            },
            {
                text: "Hire private cyber mercenaries. Expensive but no political strings.",
                effects: { personalWealth: -5, treasury: -150, elite: -5, anger: 5 },
                addToPool: ["mercenary_reliance", "security_independent", "budget_strain", "professional_defense"]
            },
            {
                text: "Blame the attack on whoever's convenient. Use it for political advantage.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 15 },
                addToPool: ["false_flag_narrative", "diplomatic_crisis", "vulnerability_exposed", "propaganda_opportunity"]
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
                effects: { personalWealth: -5, treasury: 60, elite: -15, anger: -20 },
                addToPool: ["kgb_friend_enemy", "information_war", "competition_restored", "mutual_blackmail"]
            },
            {
                text: "Force him to sell 40% to another 'friendly' oligarch. Share the pie.",
                effects: { personalWealth: 3, treasury: 30, elite: -5, anger: -10 },
                addToPool: ["oligarch_consolidation", "fake_competition", "telecom_duopoly", "controlled_market"]
            },
            {
                text: "Protect the monopoly. He keeps quiet. Service stays terrible.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 20 },
                addToPool: ["blackmail_successful", "corruption_protected", "telecom_monopoly_continues", "public_suffers"]
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
                effects: { personalWealth: -8, treasury: -200, elite: -10, anger: -10 },
                addToPool: ["family_betrayal", "military_morale_boost", "defense_reform", "accountability_shown"]
            },
            {
                text: "Force fixes at contractor's expense. Threaten him. He'll comply.",
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: 5 },
                addToPool: ["contractor_resentment", "partial_fix", "military_skeptical", "corruption_persists"]
            },
            {
                text: "Accept the tanks. Propaganda says they're great. Hide the problems.",
                effects: { personalWealth: 5, treasury: -50, elite: -15, anger: 10 },
                addToPool: ["military_demoralization", "propaganda_vs_reality", "combat_ineffective", "generals_rage"]
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
                effects: { personalWealth: 0, treasury: -60, elite: 10, anger: 20 },
                addToPool: ["war_on_drugs", "mass_incarceration", "drug_trade_underground", "harsh_penalties_fail"]
            },
            {
                text: "Treatment approach. Build rehab centers. Public health, not criminal justice.",
                effects: { personalWealth: 0, treasury: -180, elite: -10, anger: -20 },
                addToPool: ["treatment_model", "budget_strain", "conservative_backlash", "lives_saved"]
            },
            {
                text: "Military strike on foreign labs. Destroy supply at source. (Escalatory)",
                effects: { personalWealth: 0, treasury: -120, elite: 15, anger: 15 },
                addToPool: ["border_conflict", "diplomatic_crisis", "labs_relocate", "military_solution_fails"]
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
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 30 },
                addToPool: ["oligarch_ostentation", "tone_deaf_leadership", "inequality_rage", "class_warfare"]
            },
            {
                text: "Apologize. 'Insensitive timing.' Promise to donate value to charity.",
                effects: { personalWealth: -3, treasury: 0, elite: -5, anger: -10 },
                addToPool: ["damage_control", "fake_charity", "elite_anger_weakness", "pr_recovery"]
            },
            {
                text: "Ignore it. Counter with distraction. Start a diplomatic crisis or something.",
                effects: { personalWealth: 0, treasury: -20, elite: 0, anger: 20 },
                addToPool: ["distraction_tactics", "wag_the_dog", "diplomatic_incident", "crisis_manufactured"]
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
                effects: { personalWealth: 0, treasury: -30, elite: -5, anger: -15 },
                addToPool: ["reputation_restored", "opposition_continues", "international_credibility", "transparency_precedent"]
            },
            {
                text: "Limited investigation. Announce findings quickly. 'Nothing suspicious.'",
                effects: { personalWealth: 0, treasury: -10, elite: 0, anger: 20 },
                addToPool: ["coverup_suspicions", "conspiracy_theories", "opposition_martyrdom", "trust_deficit"]
            },
            {
                text: "Refuse investigation. 'Sovereign matter.' Let them speculate. Fear is useful.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 },
                addToPool: ["fear_tactics_work", "international_condemnation", "opposition_intimidated", "reputation_assassin"]
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
                effects: { personalWealth: 15, treasury: 400, elite: 10, anger: 10 },
                addToPool: ["geopolitical_leverage", "bidding_war", "tech_dependency", "strategic_advantage"]
            },
            {
                text: "Exclusive Chinese deal. They pay less but offer political alliance.",
                effects: { personalWealth: 8, treasury: 250, elite: 5, anger: 15 },
                addToPool: ["chinese_dependency", "western_tech_cutoff", "alliance_deepens", "sovereignty_concerns"]
            },
            {
                text: "State monopoly. We extract and process ourselves. Long-term independence.",
                effects: { personalWealth: 5, treasury: -200, elite: 0, anger: 10 },
                addToPool: ["industrial_development", "technology_transfer_needed", "independence_strategy", "budget_strain"]
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
                effects: { personalWealth: -5, treasury: -120, elite: -15, anger: -20 },
                addToPool: ["military_reform_demanded", "transparency_precedent", "admirals_resentful", "families_honored"]
            },
            {
                text: "Blame admirals. Fire them. 'I wasn't informed in time.' Deflect.",
                effects: { personalWealth: 0, treasury: -60, elite: -10, anger: 15 },
                addToPool: ["scapegoat_tactics", "military_distrust", "officer_corps_demoralized", "accountability_theater"]
            },
            {
                text: "Classify everything. National security. Limited information release.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 35 },
                addToPool: ["families_rage", "coverup_exposed", "military_secrets_priority", "public_outrage"]
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
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 25 },
                addToPool: ["whistleblower_hunt", "international_mockery", "disinformation_exposed", "credibility_zero"]
            },
            {
                text: "Admit it. 'Countering Western propaganda.' Justify it. Own it.",
                effects: { personalWealth: 0, treasury: -20, elite: 10, anger: 20 },
                addToPool: ["information_warfare_admitted", "propaganda_justified", "domestic_cynicism", "truth_weaponized"]
            },
            {
                text: "Shut down the operation. Too exposed. Find subtler methods.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 10 },
                addToPool: ["intelligence_morale_drop", "new_tactics_needed", "propaganda_pivot", "tactical_retreat"]
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
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 20 },
                addToPool: ["international_mockery", "diplomatic_crisis", "absurd_lies_norm", "credibility_destroyed"]
            },
            {
                text: "Recall ambassadors. Counter-accusations. Information war. Distract.",
                effects: { personalWealth: 0, treasury: -50, elite: 10, anger: 25 },
                addToPool: ["diplomatic_escalation", "embassy_closures", "tit_for_tat", "isolation_deepens"]
            },
            {
                text: "Acknowledge 'rogue elements.' Punish agents. De-escalate. (Rare restraint)",
                effects: { personalWealth: 0, treasury: -20, elite: -10, anger: 5 },
                addToPool: ["intelligence_morale_drop", "diplomatic_thaw", "agents_scapegoated", "restraint_noted"]
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
                effects: { personalWealth: 5, treasury: 0, elite: 10, anger: 40 },
                addToPool: ["impunity_culture", "oligarch_privilege_demonstrated", "public_rage", "rule_of_law_dead"]
            },
            {
                text: "Prosecute fully. Equal justice. Send him to prison. (Makes enemies)",
                effects: { personalWealth: 0, treasury: -40, elite: -20, anger: -25 },
                addToPool: ["oligarch_revenge_planned", "justice_served", "banker_turns_hostile", "rule_of_law_precedent"]
            },
            {
                text: "Compromise. House arrest. Compensation to family. Satisfy no one equally.",
                effects: { personalWealth: 2, treasury: -20, elite: -5, anger: 15 },
                addToPool: ["compromise_justice", "both_sides_angry", "precedent_unclear", "wealth_advantage_visible"]
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
                effects: { personalWealth: 0, treasury: -350, elite: 0, anger: -20 },
                addToPool: ["food_dependency", "agricultural_reform_needed", "budget_crisis", "legitimacy_preserved"]
            },
            {
                text: "Rationing system. State controls distribution. Shortages but no famine.",
                effects: { personalWealth: 0, treasury: -120, elite: 5, anger: 30 },
                addToPool: ["black_market_food", "corruption_rationing", "state_control_expands", "inequality_visible"]
            },
            {
                text: "Market solution. Prices rise, let supply/demand work. (Poor starve)",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 50 },
                addToPool: ["mass_starvation", "rural_depopulation", "social_explosion", "humanitarian_catastrophe"]
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
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 40 },
                addToPool: ["oligarch_ostentation", "inequality_rage", "dominance_politics", "protest_movement"]
            },
            {
                text: "Blame oligarchs. 'They built it, not me.' Implausible but deniable.",
                effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 30 },
                addToPool: ["oligarch_resentment", "transparent_lie", "scapegoat_elites", "credibility_damaged"]
            },
            {
                text: "Announce it's 'state property'—a resort for veterans. (Nobody believes it)",
                effects: { personalWealth: 0, treasury: -50, elite: 0, anger: 25 },
                addToPool: ["veterans_mock_it", "propaganda_failure", "cynicism_deepens", "corrupt_narrative"]
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
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 },
                addToPool: ["rule_of_law_dead", "constitutional_crisis", "court_irrelevant", "dictatorship_normalized"]
            },
            {
                text: "Fire and replace 5 judges. Pack the court. Ensure future compliance.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 25 },
                addToPool: ["court_packing", "judicial_independence_dead", "rubber_stamp_court", "future_compliance"]
            },
            {
                text: "Respect the ruling. Withdraw the decree. Rule of law matters. (Rare)",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: -20 },
                addToPool: ["rule_of_law_strengthened", "elite_anger_restraint", "legitimacy_boost", "institutional_respect"]
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
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 30 },
                addToPool: ["crypto_underground", "capital_flight", "black_market_crypto", "enforcement_impossible"]
            },
            {
                text: "Regulate and tax. Legal crypto market. State takes 30% of transactions.",
                effects: { personalWealth: 8, treasury: 150, elite: 0, anger: 10 },
                addToPool: ["crypto_taxation", "regulated_market", "state_revenue", "innovation_controlled"]
            },
            {
                text: "State cryptocurrency. Launch official digital currency. Control the tech.",
                effects: { personalWealth: 0, treasury: -180, elite: 10, anger: 15 },
                addToPool: ["state_digital_currency", "surveillance_coin", "crypto_competition", "control_attempt"]
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
                effects: { personalWealth: 3, treasury: 0, elite: 10, anger: 10 },
                addToPool: ["judicial_corruption", "oligarch_loyalty", "ex_wife_revenge_risk", "court_rigging_exposed"]
            },
            {
                text: "Neutral. Let courts decide. You're above petty oligarch drama.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 5 },
                addToPool: ["neutrality_rare", "both_sides_uncertain", "independence_demonstrated", "waiting_game"]
            },
            {
                text: "Side with her. She gets full half. Oligarch is furious but she's loyal now.",
                effects: { personalWealth: 5, treasury: 0, elite: -15, anger: 5 },
                addToPool: ["oligarch_enemy_made", "female_oligarch_ally", "betrayal_felt", "strategic_calculation"]
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
                effects: { personalWealth: 0, treasury: 0, elite: 15, anger: 10 },
                addToPool: ["nationalist_support", "international_condemnation", "historical_denial", "relations_poisoned"]
            },
            {
                text: "Symbolic payment. $5B. Apology but not full reparations.",
                effects: { personalWealth: 0, treasury: -200, elite: -10, anger: 15 },
                addToPool: ["inadequate_reparations", "nationalist_backlash", "partial_reconciliation", "compromise_unsatisfying"]
            },
            {
                text: "Full reparations over 20 years. Accept historical responsibility.",
                effects: { personalWealth: 0, treasury: -400, elite: -25, anger: 35 },
                addToPool: ["budget_crisis", "nationalist_rage", "historical_accountability", "relations_normalized"]
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
                effects: { personalWealth: -10, treasury: 0, elite: 10, anger: 45 },
                addToPool: ["oligarch_ostentation", "inequality_rage", "dynastic_politics", "tone_deaf_opulence"]
            },
            {
                text: "Private ceremony. Still lavish but not broadcast. Minimize exposure.",
                effects: { personalWealth: -5, treasury: 0, elite: 5, anger: 20 },
                addToPool: ["damage_control", "leaked_photos", "elite_connections", "hidden_wealth"]
            },
            {
                text: "Modest wedding. Donate $200M to charity. Image rehabilitation.",
                effects: { personalWealth: -8, treasury: 0, elite: -5, anger: -15 },
                addToPool: ["pr_victory", "fake_charity_questions", "daughter_disappointed", "public_relations_win"]
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
                effects: { personalWealth: 0, treasury: -300, elite: 15, anger: 50 },
                addToPool: ["social_credit_dystopia", "total_surveillance", "behavioral_control", "chinese_model_copied"]
            },
            {
                text: "Pilot program. Test in one city. Scale if successful.",
                effects: { personalWealth: 0, treasury: -100, elite: 10, anger: 30 },
                addToPool: ["pilot_city", "surveillance_experiment", "resistance_grows", "gradual_implementation"]
            },
            {
                text: "Reject. Some lines shouldn't be crossed. This is dystopian.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 },
                addToPool: ["restraint_shown", "security_apparatus_disappointed", "moral_line", "elite_anger_weakness"]
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
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 20 },
                addToPool: ["international_sporting_ban", "conspiracy_narrative", "evidence_overwhelming", "isolation_sports"]
            },
            {
                text: "Admit minor issues. Promise reforms. Minimize damage.",
                effects: { personalWealth: 0, treasury: -80, elite: -5, anger: 10 },
                addToPool: ["partial_ban", "reform_promises", "athlete_betrayal_felt", "controlled_damage"]
            },
            {
                text: "Full admission. Fire sports minister. Clean house. Long ban.",
                effects: { personalWealth: 0, treasury: -120, elite: -15, anger: 5 },
                addToPool: ["accountability_shown", "minister_scapegoated", "long_term_ban", "eventual_readmission"]
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
                effects: { personalWealth: 8, treasury: 800, elite: -10, anger: 40 },
                addToPool: ["land_sold_foreign", "food_security_risk", "nationalist_rage", "chinese_land_ownership"]
            },
            {
                text: "Lease not sale. 99-year leases. They farm it, we keep ownership.",
                effects: { personalWealth: 5, treasury: 400, elite: 0, anger: 25 },
                addToPool: ["long_term_lease", "quasi_ownership", "nationalist_compromise", "revenue_generated"]
            },
            {
                text: "Reject. Land is sovereignty. Some things aren't for sale.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: -10 },
                addToPool: ["nationalist_support", "budget_crisis_continues", "sovereignty_preserved", "missed_opportunity"]
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
                effects: { personalWealth: 15, treasury: 500, elite: 10, anger: 15 },
                addToPool: ["vaccine_profiteering", "international_resentment", "health_capitalism", "moral_vacuum"]
            },
            {
                text: "Political trades. Vaccines for UN votes, basing rights, alliances.",
                effects: { personalWealth: 5, treasury: 200, elite: 15, anger: 10 },
                addToPool: ["vaccine_leverage", "geopolitical_gains", "health_weaponized", "alliance_building"]
            },
            {
                text: "Donate to poor countries. Soft power play. Long-term influence.",
                effects: { personalWealth: 0, treasury: -150, elite: -5, anger: -15 },
                addToPool: ["soft_power_boost", "global_goodwill", "influence_gained", "humanitarian_image"]
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
                effects: { personalWealth: 20, treasury: -100, elite: -10, anger: 30 },
                addToPool: ["mafia_state_formalized", "corruption_normalized", "violence_controlled", "criminal_alliance"]
            },
            {
                text: "Major crackdown. Arrest 50+ crime bosses. War with underworld.",
                effects: { personalWealth: -5, treasury: -150, elite: -15, anger: 20 },
                addToPool: ["underworld_war", "violence_escalates", "brave_stand", "retaliation_risk"]
            },
            {
                text: "Status quo. They stay underground, you ignore them. Plausible deniability.",
                effects: { personalWealth: 5, treasury: -50, elite: 0, anger: 15 },
                addToPool: ["mafia_strengthens", "uneasy_coexistence", "corruption_grows", "parallelstate"]
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
                effects: { personalWealth: 0, treasury: -350, elite: 5, anger: -15 },
                addToPool: ["space_program_reformed", "heroes_saved", "budget_crisis", "national_pride_moment"]
            },
            {
                text: "Controlled evacuation. Get them out. Let station crash into ocean.",
                effects: { personalWealth: 0, treasury: -120, elite: 0, anger: 5 },
                addToPool: ["space_program_decline", "pragmatic_choice", "soviet_glory_fades", "heroes_rescued"]
            },
            {
                text: "They knew the risks. Cosmonaut sacrifice. Save the money.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 45 },
                addToPool: ["martyred_cosmonauts", "callousness_exposed", "families_rage", "space_program_ends"]
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
                effects: { personalWealth: -5, treasury: -300, elite: 0, anger: 15 },
                addToPool: ["digital_vulnerability", "infrastructure_dependence", "satellite_costs", "connectivity_restored"]
            },
            {
                text: "Use it. National intranet only. Control all information during repair.",
                effects: { personalWealth: 0, treasury: -150, elite: 10, anger: 35 },
                addToPool: ["great_firewall", "information_control", "economic_isolation", "censorship_opportunity"]
            },
            {
                text: "Blame and retaliate. Cyber attack on suspected perpetrators.",
                effects: { personalWealth: 0, treasury: -200, elite: 15, anger: 20 },
                addToPool: ["cyber_warfare_escalation", "attribution_uncertain", "retaliation_cycle", "digital_cold_war"]
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
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 },
                addToPool: ["fear_tactics_work", "reputation_assassin", "oligarchs_terrified", "impunity_demonstrated"]
            },
            {
                text: "Aggressive denial. Release medical records. Prove it was natural.",
                effects: { personalWealth: 0, treasury: -20, elite: -5, anger: 15 },
                addToPool: ["suspicions_remain", "conspiracy_theories", "defensive_posture", "credibility_questioned"]
            },
            {
                text: "Honor him publicly. State funeral. Generosity masks involvement (or innocence).",
                effects: { personalWealth: -2, treasury: -30, elite: 0, anger: 20 },
                addToPool: ["calculated_magnanimity", "ambiguous_innocence", "elite_uncertainty", "fear_and_respect"]
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
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 25 },
                addToPool: ["fake_video_exposed", "conspiracy_theories", "press_intimidation", "propaganda_failure"]
            },
            {
                text: "Massive search operation. Find her. Prove innocence (or guilt).",
                effects: { personalWealth: 0, treasury: -60, elite: -5, anger: 20 },
                addToPool: ["investigation_results", "truth_uncertain", "fsb_involvement", "international_scrutiny"]
            },
            {
                text: "Ignore it. Journalists disappear. It happens. Move on.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 35 },
                addToPool: ["press_fear", "self_censorship", "impunity_demonstrated", "international_condemnation"]
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
                effects: { personalWealth: 0, treasury: -200, elite: 0, anger: -25 },
                addToPool: ["veteran_loyalty_restored", "budget_strain", "military_morale_boost", "promises_kept"]
            },
            {
                text: "Symbolic improvements. Small increases. Looks caring, manageable cost.",
                effects: { personalWealth: 0, treasury: -60, elite: 0, anger: -10 },
                addToPool: ["token_gestures", "veterans_still_angry", "insufficient_benefits", "pragmatic_compromise"]
            },
            {
                text: "Crack down. Veterans don't get special protest rights. Disperse them.",
                effects: { personalWealth: 0, treasury: -20, elite: 10, anger: 40 },
                addToPool: ["veteran_rage", "military_distrust", "dangerous_enemies_made", "ruthless_repression"]
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
                effects: { personalWealth: 3, treasury: 150, elite: -10, anger: -15 },
                addToPool: ["corruption_crackdown", "elite_nervousness", "minister_revenge_risk", "partial_accountability"]
            },
            {
                text: "Protect him. He knows too much. Loyalty over accountability.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 35 },
                addToPool: ["impunity_demonstrated", "corruption_normalized", "blackmail_leverage", "public_cynicism"]
            },
            {
                text: "Scapegoat lower officials. Protect the Minister, blame subordinates.",
                effects: { personalWealth: 0, treasury: 50, elite: 0, anger: 20 },
                addToPool: ["bureaucracy_demoralized", "scapegoat_tactics", "corruption_continues", "accountability_theater"]
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
                effects: { personalWealth: -10, treasury: -400, elite: -10, anger: -25 },
                addToPool: ["budget_crisis", "trust_partially_restored", "elite_anger_accountability", "financial_reform"]
            },
            {
                text: "Blame market volatility. 'Investment risk.' No compensation.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 50 },
                addToPool: ["savings_obliterated", "protest_movement", "trust_destroyed", "legitimacy_crisis"]
            },
            {
                text: "Arrest some officials as scapegoats. Limited compensation. Balance.",
                effects: { personalWealth: -3, treasury: -150, elite: 0, anger: 20 },
                addToPool: ["scapegoat_officials", "partial_justice", "anger_remains", "corruption_continues"]
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


