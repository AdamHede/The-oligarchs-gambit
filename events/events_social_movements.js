export const SOCIAL_EVENTS = [
    {
        id: "navalny_style_investigation",
        title: "The Golden Toilet Brush",
        description: "Opposition blogger Alexei Navalenko releases his masterpiece: a two-hour drone documentary of your 'private residence'—17,691 square meters of palace overlooking the Black Sea. The internet explodes: the aqua-disco, the hookah lounge, the $700 toilet brush, the personal ice rink shaped like your initials. 100 million views in 48 hours. Even your supporters are sharing it, incredulous. 'Is this real?' they ask. Your press secretary sweats through her blazer at the podium.",
        weight: 8,
        storyline: "popular-uprising",
        rarity: "legendary",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Claim it belongs to 'a friend'",
                effects: {
                    elite: 5,
                    anger: 5
                },
                add: ["palace_denial_memes"],
                legacy: { icon: "🤥", name: "The Clumsy Liar", weight: -10, explanation: "Nobody believed your 'friend' story. The memes will outlive you." }
            },
            {
                text: "Arrest the blogger immediately",
                effects: {
                    anger: 15,
                    elite: 5
                },
                add: ["mass_protests_blogger", "sanctions_human_rights"],
                legacy: { icon: "⛓️", name: "The Jailer", weight: 10, explanation: "You imprisoned your critic. He became a martyr, but a silent one." }
            }
        ]
    },
    {
        id: "mass_protests_blogger",
        title: "Snow Revolution",
        description: "The streets of Moscow fill with bodies—not corpses, but protesters. They gather at Pushkin Square, at Manezhnaya, at the boulevards surrounding the Kremlin. They are young, educated, fearless. They chant the blogger's name. They throw snowballs at OMON riot police. Live streams show 50,000 in Moscow, 20,000 in St. Petersburg, smaller crowds in 100 cities. Interior Minister Vladimir Kolokoltsev waits for orders, water cannons at the ready.",
        weight: 0,
        storyline: "popular-uprising",
        rarity: "epic",
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Disperse them with force",
                effects: {
                    anger: 8,
                    elite: -5,
                    personalWealth: 8
                },
                add: ["bloody_sunday_scenario"],
                remove: ["mass_protests_blogger"],
                legacy: { icon: "🚨", name: "The Disperser", weight: 10, explanation: "You broke the protests with batons and tear gas. Order was restored." }
            },
            {
                text: "Wait them out—winter is cold",
                effects: {
                    elite: -10,
                    anger: -5
                },
                add: ["emboldened_opposition"],
                remove: ["mass_protests_blogger"],
                legacy: { icon: "⏳", name: "The Patient", weight: -5, explanation: "You waited for the protests to fade. They saw it as hesitation." }
            }
        ]
    },
    {
        id: "palace_denial_memes",
        title: "Internet Memes",
        description: "The meme economy explodes. Your face Photoshopped onto gold toilets. Your 'friend' trending as a hashtag. A viral TikTok of teenagers doing the 'toilet brush dance.' Even state TV hosts are struggling to keep straight faces. Comedian Ivan Urgant's late-night monologue—broadcast before censors could stop it—trends worldwide. You have become a punchline, and nothing kills authority faster than laughter.",
        weight: 0,
        storyline: "popular-uprising",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Ignore it—maintain dignity",
                effects: {
                    anger: 5,
                    elite: -2
                },
                remove: ["palace_denial_memes"],
                legacy: { icon: "😶", name: "The Silent", weight: -5, explanation: "You said nothing while they laughed. Dignity or paralysis?" }
            },
            {
                text: "Block every platform, arrest the comedians",
                effects: {
                    anger: 10,
                    elite: -5
                },
                remove: ["palace_denial_memes"],
                legacy: { icon: "🚫", name: "The Humorless", weight: 5, explanation: "You banned laughter. They stopped laughing in public, at least." }
            }
        ]
    },
    {
        id: "sanctions_human_rights",
        title: "Human Rights Sanctions",
        description: "The Magnitsky-style sanctions land like artillery. You're personally named—travel banned to 47 countries. Your London townhouse: frozen. Your Monaco apartment: seized. Your children's Swiss bank accounts: locked. Oligarch Alisher Usmanov calls, panicking—he can't access his Titian paintings stored in Geneva. The West has weaponized your wealth against you.",
        weight: 0,
        storyline: "popular-uprising",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Defy them publicly—wear sanctions as badge of honor",
                effects: {
                    elite: 5,
                    treasury: -10,
                    anger: 8,
                    personalWealth: 5
                },
                remove: ["sanctions_human_rights"],
                legacy: { icon: "✊", name: "The Defiant", weight: 10, explanation: "You wore their sanctions as a badge of honor. The motherland applauded." }
            },
            {
                text: "Quietly negotiate through back channels",
                effects: {
                    elite: -5,
                    personalWealth: -5,
                    treasury: 20
                },
                remove: ["sanctions_human_rights"],
                legacy: { icon: "🙇", name: "The Supplicant", weight: -15, explanation: "You begged the West to lift sanctions. The humiliation was televised." }
            }
        ]
    },
    {
        id: "emboldened_opposition",
        title: "Opposition Grows Stronger",
        description: "Your restraint has been misread. Former chess champion and opposition figure Garry Kasparov gives interviews calling you 'a paper tiger.' Liberal economist Sergei Guriev publishes op-eds from Paris arguing for 'peaceful transition.' Telegram channels coordinate flash mobs. Young lawyer Lyubov Sobol has become the new face of resistance—photogenic, articulate, unafraid. The opposition smells blood.",
        weight: 0,
        storyline: "popular-uprising",
        rarity: "common",
        meta: {
            depth: 3,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Co-opt the leaders—everyone has a price",
                effects: {
                    treasury: -20,
                    elite: -2,
                    anger: -2
                },
                remove: ["emboldened_opposition"],
                legacy: { icon: "💵", name: "The Corrupter", weight: 5, explanation: "You bought the opposition. Principles crumble before rubles." }
            },
            {
                text: "Let them march—they'll tire eventually",
                effects: {
                    anger: 10,
                    elite: -5
                },
                add: ["mass_protests_blogger"],
                remove: ["emboldened_opposition"]
            }
        ]
    },
    {
        id: "bloody_sunday_scenario",
        title: "The Crackdown",
        description: "The images are everywhere: OMON officers beating a grandmother with a cane. A young medic bleeding on the pavement. Rosgvardia troops dragging students by their hair. 3,500 arrested in Moscow alone. The EU ambassador is recalled. The UN Human Rights Council calls an emergency session. Your own officials look at you differently now—some with fear, some with something else. You have crossed a line. The question is whether to cross further.",
        weight: 0,
        storyline: "popular-uprising",
        rarity: "epic",
        meta: {
            depth: 3,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Crush them completely—fear is the only answer",
                effects: {
                    anger: -15,
                    elite: -15,
                    treasury: -75,
                    personalWealth: 10
                },
                add: ["sanctions_human_rights"],
                remove: ["bloody_sunday_scenario"],
                legacy: { icon: "💀", name: "The Butcher", weight: 20, explanation: "You crushed them without mercy. The streets ran red, but they ran quiet." }
            },
            {
                text: "Back down—release the prisoners",
                effects: {
                    elite: -20,
                    anger: -5
                },
                remove: ["bloody_sunday_scenario"],
                legacy: { icon: "🏳️", name: "The Hesitant", weight: -15, explanation: "You blinked. The blood was spilled, but you couldn't finish what you started." }
            }
        ]
    }
];
