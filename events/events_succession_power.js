export const SUCCESSION_EVENTS = [
    {
        id: "oligarch_yacht_seized",
        title: "The Yacht Incident",
        description: "Aluminum magnate Oleg Deripaska bursts into your office, red-faced with fury. Italian police have seized his 'Lady Anastasia'—$600 million of floating palace, now impounded in Sardinia. 'I built that empire for YOU,' he shouts. 'I moved aluminum for you, laundered for you, bribed for you. Now they take my yacht and you say nothing?' He demands compensation from state funds. Behind him, other oligarchs watch to see how you handle disloyalty... and loyalty.",
        weight: 8,
        storyline: "oligarch-rivalry",
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "negative"
        },
        image: "assets/images/events/oligarch_yacht_seized.png",
        choices: [
            {
                text: "Compensate him from the treasury",
                effects: {
                    treasury: -25,
                    elite: 10,
                    anger: 3
                },
                add: ["oligarch_greed_spiral"],
                legacy: { icon: "🛥️", name: "The Yacht Buyer", weight: -5, explanation: "You paid for a billionaire's toy with state money. The people noticed." }
            },
            {
                text: "Tell him to be a patriot and sacrifice",
                effects: {
                    elite: -15,
                    treasury: 0,
                    personalWealth: 10,
                    anger: 8
                },
                add: ["oligarch_plotting"],
                legacy: { icon: "🦅", name: "The Unmoved", weight: 10, explanation: "You refused to bail out the oligarchs. They learned who is master here." }
            }
        ]
    },
    {
        id: "health_scare_rumors",
        title: "Trembling Hands",
        description: "The video spreads through Telegram in hours: you, gripping a table edge during a meeting with Shoigu, your hand visibly trembling. Amateur analysts zoom in, slow it down, overlay medical diagrams. Western intelligence agencies leak 'assessments' of your health. FSB chief Bortnikov reports that General Surovikin was heard asking, 'How long does he have?' The sharks sense blood in the water. They're positioning themselves for what comes after.",
        weight: 6,
        storyline: "succession-crisis",
        rarity: "epic",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "negative"
        },
        image: "assets/images/events/health_scare_rumors.png",
        choices: [
            {
                text: "Stage a televised judo demonstration",
                effects: {
                    elite: 5,
                    anger: -2
                },
                add: ["body_double_auditions"],
                legacy: { icon: "🥋", name: "The Athlete", weight: 5, explanation: "You threw opponents on camera to prove your vigor. The performance convinced some." }
            },
            {
                text: "Purge the gossipers—make examples",
                effects: {
                    elite: -10,
                    personalWealth: 5
                },
                add: ["paranoia_increases"],
                legacy: { icon: "👁️", name: "The Paranoid", weight: 10, explanation: "You purged those who whispered about weakness. Now they only whisper when alone." }
            }
        ]
    },
    {
        id: "oligarch_greed_spiral",
        title: "The Compensation Spiral",
        description: "They come in waves: Potanin, Usmanov, Fridman, Aven. Each with a lawyer, each with a list of frozen assets, each demanding what Deripaska received. 'If he gets compensation, so do we,' declares nickel baron Vladimir Potanin. 'The West froze $400 billion of our money. Are you the protector of Russian capital or not?' The line outside your office stretches down the hallway. If you pay them all, the treasury collapses. If you refuse, they plot.",
        weight: 0,
        storyline: "oligarch-rivalry",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        image: "assets/images/events/oligarch_greed_spiral.png",
        choices: [
            {
                text: "Pay them all—buy their loyalty",
                effects: {
                    treasury: -150,
                    elite: 10,
                    anger: 15
                },
                remove: ["oligarch_greed_spiral"],
                legacy: { icon: "💸", name: "The Spendthrift", weight: -10, explanation: "You emptied the treasury to satisfy billionaires. The people starve while yachts sail." }
            },
            {
                text: "Refuse all further claims",
                effects: {
                    elite: -5,
                    anger: 0
                },
                remove: ["oligarch_greed_spiral"],
                legacy: { icon: "🛑", name: "The Refuser", weight: 5, explanation: "You drew a line. The oligarchs learned there are limits." }
            },
            {
                text: "Compensate them... from their own frozen assets",
                effects: {
                    treasury: -50,
                    elite: 5,
                    personalWealth: 15,
                    anger: 5
                },
                legacy: { icon: "🎩", name: "The Middleman", weight: 15, explanation: "You laundered their own money through the treasury and kept the difference. Brilliant." },
                remove: ["oligarch_greed_spiral"]
            }
        ]
    },
    {
        id: "oligarch_plotting",
        title: "The Plot Thickens",
        description: "FSB surveillance intercepts encrypted messages between Deripaska and former finance minister Alexei Kudrin. They're discussing 'transition scenarios.' Security cameras catch Potanin meeting with a retired general in a private dining room. Telegram channels whisper about 'palace intrigue.' Your personal chef starts his car remotely now—just in case. The oligarchs you built are wondering if they could do better with someone else.",
        weight: 0,
        storyline: "oligarch-rivalry",
        rarity: "epic",
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Strike first—preemptive purge",
                effects: {
                    elite: -20,
                    personalWealth: 20,
                    treasury: 10,
                    anger: 10
                },
                remove: ["oligarch_plotting"],
                legacy: { icon: "🔪", name: "The Survivor", weight: 15, explanation: "You struck before they could. Stalin would approve." }
            },
            {
                text: "Buy their loyalty with treasure",
                effects: {
                    treasury: -70,
                    elite: 5
                },
                remove: ["oligarch_plotting"],
                legacy: { icon: "🪙", name: "The Buyer", weight: -5, explanation: "You paid off conspirators instead of eliminating them. They'll try again." }
            }
        ]
    },
    {
        id: "body_double_auditions",
        title: "The Lookalike Search",
        description: "FSO chief Dmitry Kochnev presents the candidates: twelve men who bear varying degrees of resemblance to you. One is a former actor from Novosibirsk, another a mathematics teacher from Kazan. They've been surgically enhanced, trained in your mannerisms, fed the same diet. 'We can deploy them at regional events,' Kochnev explains. 'The distance will hide any imperfections.' The question is how often to use them—and what happens if someone notices.",
        weight: 0,
        storyline: "succession-crisis",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 2,
            sentiment: "negative"
        },
        image: "assets/images/events/body_double_auditions.png",
        choices: [
            {
                text: "Use doubles frequently—preserve yourself",
                effects: {
                    elite: -5,
                    anger: 5
                },
                remove: ["body_double_auditions"],
                legacy: { icon: "🎭", name: "The Phantom", weight: 5, explanation: "You multiplied yourself. Which one is real? Only you know." }
            },
            {
                text: "Use them sparingly—maintain authenticity",
                effects: {
                    elite: 2,
                    treasury: -10
                },
                remove: ["body_double_auditions"]
            }
        ]
    },
    {
        id: "paranoia_increases",
        title: "The Purge Begins",
        description: "The lists grow longer each night. Deputy Chief of Staff Sergei Kiriyenko hands you another folder: names of officials who attended the wrong dinner parties, who made the wrong jokes at the wrong time. 'This one asked his driver about your health,' Kiriyenko notes. 'This one has a daughter in London.' The elite watch each other now, reporting preemptively before they are reported. Trust has become a luxury you cannot afford.",
        weight: 0,
        storyline: "succession-crisis",
        rarity: "epic",
        meta: {
            depth: 2,
            impact: 4,
            sentiment: "negative"
        },
        image: "assets/images/events/paranoia_increases.png",
        choices: [
            {
                text: "Deepen the purge—trust no one",
                effects: {
                    elite: -15,
                    personalWealth: 20,
                    anger: 12
                },
                remove: ["paranoia_increases"],
                legacy: { icon: "👑", name: "The Mad King", weight: 15, explanation: "Like Stalin before you, you purged until only the terrified remained. Effective." }
            },
            {
                text: "Stop the purge—restore some trust",
                effects: {
                    elite: 5,
                    anger: -5
                },
                add: ["oligarch_plotting"],
                remove: ["paranoia_increases"],
                legacy: { icon: "🕊️", name: "The Merciful", weight: -10, explanation: "You showed mercy. They will interpret it as weakness." }
            }
        ]
    },
    {
        id: "oligarch_defection",
        title: "The Banker Flees",
        description: "Sergei Pugachev, the banker who knew everything—every offshore account, every shell company, every payoff—has surfaced in London. He's given interviews to the BBC, leaked documents to investigative journalists, and is writing a tell-all memoir. 'I know where $200 billion went,' he tells the cameras. 'I moved it personally.' The GRU proposes a solution involving umbrellas and nerve agents. The question is whether the cure would be worse than the disease.",
        weight: 6,
        storyline: "oligarch-rivalry",
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Send the specialists—silence him permanently",
                effects: {
                    elite: -10,
                    anger: -2,
                    treasury: -10
                },
                add: ["sanctions_human_rights"],
                legacy: { icon: "☠️", name: "The Eliminator", weight: 15, explanation: "You silenced the traitor permanently. A message sent across continents." }
            },
            {
                text: "Let him talk—deny everything",
                effects: {
                    elite: -5,
                    anger: 5
                },
                legacy: { icon: "🤷", name: "The Denier", weight: -10, explanation: "You let a traitor expose your secrets while the world watched." }
            }
        ]
    },
    {
        id: "palace_intrigue",
        title: "War of the Towers",
        description: "The eternal Kremlin conflict erupts anew. Security Council Secretary Nikolai Patrushev and his Siloviki faction demand more budget for 'defense of the motherland.' Central Bank chief Elvira Nabiullina and her technocrats insist on fiscal restraint. They argue in your presence now, no longer pretending to agree. 'The security services have become a state within a state,' Nabiullina says coldly. Patrushev's smile doesn't reach his eyes: 'And who keeps the state secure?'",
        weight: 6,
        storyline: "succession-crisis",
        rarity: "common",
        meta: {
            depth: 1,
            impact: 3,
            sentiment: "neutral"
        },
        image: "assets/images/events/palace_intrigue.png",
        choices: [
            {
                text: "Back the Siloviki—strength above economy",
                effects: {
                    elite: -5,
                    anger: 5,
                    treasury: -20,
                    personalWealth: 5
                },
                add: ["paranoia_increases"],
                legacy: { icon: "👮", name: "The Strongman", weight: 10, explanation: "You chose the security services. The economy suffers, but the regime endures." }
            },
            {
                text: "Back the Liberals—economy above security",
                effects: {
                    elite: -5,
                    treasury: 10,
                    anger: -2
                },
                add: ["generals_plotting_coup"],
                legacy: { icon: "📈", name: "The Reformer", weight: -5, explanation: "You chose the economists over the enforcers. The generals noticed." }
            }
        ]
    }
];
