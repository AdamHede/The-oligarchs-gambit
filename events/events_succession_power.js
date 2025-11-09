// The Oligarch's Gambit - v1.3
// Succession & Power Struggles
// 13 events

const SUCCESSION_POWER_EVENTS = [
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
    }
];


