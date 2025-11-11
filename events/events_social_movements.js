// The Oligarch's Gambit - v1.6.0
// Student & Social Movements
// Redesigned for comprehensive branching

const SOCIAL_MOVEMENTS_EVENTS = [
    {
        id: "student_protest_small",
        title: "The Campus Rebellion",
        description: "University students are protesting. Started with 200 at the main university, now spreading to 12 campuses. They want free elections, end to corruption, freedom of speech. They're young, tech-savvy, making memes. Western media loves them. Your interior minister says riot police can clear them in an hour. Your political advisor says martyring students creates movements.",
        weight: 7,
        conditions: { anger: 30 },
        onceOnly: true,
        choices: [
            {
                text: "Send riot police. Beat them. Arrest the leaders. End this now.",
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 25 },
                addToPool: ["student_martyrdom", "underground_resistance", "international_condemnation"]
            },
            {
                text: "Ignore them. Students always protest. They'll get bored and graduate.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 10 },
                addToPool: ["student_movement_grows", "organization_improves", "public_sympathy"]
            },
            {
                text: "Meet with them. Listen. Promise vague reforms. Co-opt the moderates.",
                effects: { personalWealth: 0, treasury: -10, elite: -5, anger: -5 },
                addToPool: ["movement_cooptation", "hardliner_student_backlash", "false_hope"]
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
                addToPool: ["student_martyrdom", "international_condemnation", "brutal_crackdown", "western_sanctions"]
            },
            {
                text: "Siege tactics. Cut power, water, food. Wait them out. Slow pressure.",
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 20 },
                addToPool: ["student_movement_grows", "humanitarian_crisis", "international_observers"]
            },
            {
                text: "Negotiate. End the occupation peacefully. Grant minor concessions.",
                effects: { personalWealth: 0, treasury: -15, elite: -10, anger: -10 },
                addToPool: ["movement_cooptation", "elite_anger_weakness", "temporary_victory"]
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
                addToPool: ["tech_savvy_resistance", "digital_underground", "vpn_black_market", "internet_isolation"]
            },
            {
                text: "Apologize. Scapegoat the police officer. Public trial. Damage control.",
                effects: { personalWealth: 0, treasury: -30, elite: -5, anger: -15 },
                addToPool: ["police_morale_drop", "admission_of_guilt", "international_praise_minimal"]
            },
            {
                text: "Flood zone. Hire trolls. Create fake videos. Discredit her. Disinformation blitz.",
                effects: { personalWealth: -1, treasury: -50, elite: 0, anger: 20 },
                addToPool: ["disinformation_campaign", "truth_war", "credibility_damaged"]
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
                addToPool: ["color_revolution", "coverup_fails", "international_tribunal", "mass_outrage"]
            },
            {
                text: "Admit negligence. Prosecute officers. Pay family blood money. Contain it.",
                effects: { personalWealth: -2, treasury: -50, elite: -10, anger: 10 },
                addToPool: ["scapegoat_police", "police_resentment", "temporary_calm", "admission_weakness"]
            },
            {
                text: "Claim foreign agents killed him. Blame Western intelligence. Rally nationalism.",
                effects: { personalWealth: 0, treasury: -40, elite: 10, anger: 35 },
                addToPool: ["conspiracy_narrative", "nationalist_rally", "western_denial", "truth_questions"]
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
                addToPool: ["color_revolution", "mass_arrests", "foreign_agent_law", "political_prisoners"]
            },
            {
                text: "Target the leadership. Arrest organizers. Disrupt funding. Cut off the head.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 30 },
                addToPool: ["leaderless_resistance", "decentralized_movement", "martyrs_multiply"]
            },
            {
                text: "Make real concessions. Anti-corruption reforms. Release political prisoners.",
                effects: { personalWealth: -5, treasury: -60, elite: -20, anger: -25 },
                addToPool: ["movement_cooptation", "hardliner_elite_rage", "reform_expectations", "slippery_slope"]
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
                addToPool: ["color_revolution", "massacre_workers", "civil_war_brink", "military_rule"]
            },
            {
                text: "Arrest union leaders. Replace them. Force workers back with threats.",
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: 50 },
                addToPool: ["union_resistance", "wildcat_strikes", "labor_underground", "economic_disruption"]
            },
            {
                text: "Negotiate with unions. Meet some demands. Break the student-labor alliance.",
                effects: { personalWealth: -8, treasury: -120, elite: -15, anger: -20 },
                addToPool: ["strike_settlement", "student_isolation", "elite_betrayal_feeling", "tactical_victory"]
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
                legacy: { icon: "🤝", name: "Revolution Coopted", weight: 6 },
                addToPool: ["movement_fractures", "moderate_opposition", "hardliners_continue", "controlled_dissent"]
            },
            {
                text: "Trap. Make promises. Let them legitimize you. Betray them after.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 15 },
                addToPool: ["betrayal_revealed", "trust_destroyed", "radicalization", "promises_broken"]
            },
            {
                text: "Reject. These demands are unacceptable. No negotiations with traitors.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 35 },
                addToPool: ["color_revolution", "negotiations_failed", "hardline_strategy", "total_confrontation"]
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
                legacy: { icon: "🩸", name: "The Massacre", weight: -40 },
                addToPool: ["massacre_aftermath", "international_pariah", "sanctions_total", "regime_survival"]
            },
            {
                text: "Negotiate exit. Step down. Immunity guaranteed. Live in exile.",
                effects: { personalWealth: 0, treasury: -100, elite: -40, anger: -50 },
                legacy: { icon: "🏳️", name: "Color Revolution Victor", weight: -15 },
                addToPool: ["peaceful_transition", "exile_abroad", "immunity_deal", "democracy_emerges"]
            },
            {
                text: "Compromise. New elections. You can run but not rig. Roll the dice.",
                effects: { personalWealth: -5, treasury: -80, elite: -20, anger: -35 },
                addToPool: ["risky_election", "legitimate_contest", "defeat_possible", "democratic_gamble"]
            }
        ]
    },
    {
        id: "tech_savvy_resistance",
        title: "The Digital Underground",
        description: "You blocked social media. They're using mesh networks. You banned VPNs. They're distributing USB sticks with Tor. You shut down opposition sites. They're using blockchain hosting. You arrested tech activists. New ones appear. The youth are always two steps ahead. Your censors are losing the tech war.",
        weight: 7,
        conditions: { hasTriggered: ["social_media_viral"] },
        onceOnly: true,
        choices: [
            {
                text: "China-level response. National firewall. Deep packet inspection. $10B investment.",
                effects: { personalWealth: 0, treasury: -400, elite: 5, anger: 30 },
                addToPool: ["great_firewall", "tech_sector_collapse", "vpn_wars", "internet_control"]
            },
            {
                text: "Arrest tech workers en masse. Intimidate the sector. Break their spirit.",
                effects: { personalWealth: 0, treasury: -60, elite: 0, anger: 35 },
                addToPool: ["brain_drain_tech", "startup_exodus", "innovation_killed", "tech_fear"]
            },
            {
                text: "Accept you've lost the digital battle. Focus on controlling physical space.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: 20 },
                addToPool: ["digital_defeat", "physical_control", "dual_reality", "internet_freedom"]
            }
        ]
    },
    {
        id: "movement_fractures",
        title: "The Split",
        description: "The movement is fracturing. The students want radical change now. The liberals want gradual reform. The workers want economic justice. The nationalists want ethnic purity. They're fighting each other more than you. Social media feuds. Competing protests. Your intelligence service is quietly helping the fractures grow.",
        weight: 7,
        conditions: { hasTriggered: ["student_movement_grows"] },
        onceOnly: true,
        choices: [
            {
                text: "Accelerate the split. Fund the extremes. Make moderates seem weak.",
                effects: { personalWealth: -2, treasury: -40, elite: 5, anger: 20 },
                addToPool: ["movement_divided", "extremists_empowered", "infighting", "controlled_opposition"]
            },
            {
                text: "Pick one faction. Legitimize them. Delegitimize the others.",
                effects: { personalWealth: 0, treasury: -30, elite: 0, anger: 15 },
                addToPool: ["chosen_opposition", "excluded_factions", "tactical_alliance", "managed_dissent"]
            },
            {
                text: "Let them destroy themselves. Just watch. They're doing your work.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 10 },
                addToPool: ["movement_collapse", "self_destruction", "natural_fracture", "patience_pays"]
            }
        ]
    },
    {
        id: "women_rights_protest",
        title: "The Women's March",
        description: "50,000 women protesting domestic violence laws. 40% of women experience abuse. Police rarely intervene. New law would strengthen protections. But it also empowers feminist movement. Conservative lawmakers oppose it. Orthodox Church opposes it. But the women aren't backing down.",
        weight: 6,
        conditions: { anger: 30 },
        onceOnly: true,
        choices: [
            {
                text: "Pass the law. Women's rights matter. Anger conservatives.",
                effects: { personalWealth: 0, treasury: -40, elite: -10, anger: -15 },
                addToPool: ["conservative_backlash", "church_opposition", "progressive_reputation", "feminist_victory"]
            },
            {
                text: "Watered-down version. Symbolic changes, little enforcement.",
                effects: { personalWealth: 0, treasury: -20, elite: 0, anger: 10 },
                addToPool: ["token_reform", "women_disappointed", "status_quo_maintained", "hollow_victory"]
            },
            {
                text: "Reject. 'Traditional values.' Church and conservatives win.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 },
                addToPool: ["women_radicalize", "feminist_underground", "conservative_alliance", "cultural_war"]
            }
        ]
    }
];
