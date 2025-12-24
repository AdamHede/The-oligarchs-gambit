export const SANCTIONS_EVENTS = [
    {
        id: "sanctions_initial_wave",
        title: "The Economic Iron Curtain",
        description: "The Western hammer falls. SWIFT access revoked. Visa and Mastercard suspend operations. The ruble crashes 40% in a single day as panicked citizens queue at ATMs. Oligarch Arkady Deripaska calls from his seized yacht in Monaco, screaming about his frozen accounts. Mercedes-Benz, IKEA, McDonald's—all announce they're leaving. Finance Minister Anton Siluanov looks pale: 'We have perhaps six months of reserves.'",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 4,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Seize all foreign assets in retaliation",
                effects: {
                    personalWealth: 20,
                    treasury: 10,
                    elite: -5,
                    anger: 5
                },
                add: ["import_substitution_failure", "tech_sector_collapse", "sanctions_human_rights"],
                remove: ["sanctions_initial_wave"],
                legacy: { icon: "🏴‍☠️", name: "The Pirate", weight: 15, explanation: "You seized what was theirs and made it yours. The West can only watch." }
            },
            {
                text: "Send Abramovich to negotiate secretly",
                effects: {
                    personalWealth: -5,
                    elite: 2,
                    treasury: -20
                },
                add: ["sanctions_loophole_found"],
                remove: ["sanctions_initial_wave"],
                legacy: { icon: "🐍", name: "The Negotiator", weight: -10, explanation: "You sent intermediaries to beg. The West smells desperation." }
            }
        ]
    },
    {
        id: "import_substitution_failure",
        title: "The Cheese Incident",
        description: "Deputy Prime Minister Dmitry Kozak proudly unveils 'Rodina Cheese'—the centerpiece of your import substitution program. A blogger named Alexei Pivovarov livestreams the product test: the 'cheese' burns with a blue flame when lit. Within hours, #BurningCheese trends globally. Foreign journalists quote the video in segments titled 'Russia's Potemkin Economy.' Your own citizens share it with laughing emojis.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 5,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Arrest the blogger, ban the video",
                effects: {
                    anger: 5,
                    elite: 0
                },
                add: ["internet_censorship_tightens"],
                legacy: { icon: "🔇", name: "The Silencer", weight: 5, explanation: "You silenced the mockery with force. The laughter stopped." }
            },
            {
                text: "Ignore it and hope it fades",
                effects: {
                    elite: -2,
                    anger: 2
                },
                legacy: { icon: "🤡", name: "The Laughing Stock", weight: -15, explanation: "The world mocked your fake cheese, and you did nothing. The ridicule echoes." }
            }
        ]
    },
    {
        id: "tech_sector_collapse",
        title: "Brain Drain",
        description: "Yandex CEO Arkady Volozh has quietly relocated to Tel Aviv. Kaspersky reports 40% of their engineers have emigrated. The Skolkovo Innovation Center—your $4 billion tech hub—stands half-empty. Without NVIDIA chips and Oracle licenses, Russia's AI ambitions are dead. Young programmer Konstantin Malofeyev posts a viral video from Tbilisi: 'Why I left and will never return.' It has 8 million views.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "rare",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 5,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Close borders—no IT worker leaves",
                effects: {
                    anger: 15,
                    elite: -10,
                    treasury: -10,
                    personalWealth: 10
                },
                add: ["underground_railroad"],
                legacy: { icon: "🔒", name: "The Captor", weight: 10, explanation: "You imprisoned the talent. They work for you now, willing or not." }
            },
            {
                text: "Offer massive tax breaks to stay",
                effects: {
                    treasury: -150,
                    elite: 5,
                    anger: -5
                },
                add: ["loyal_tech_giant", "subsidy_dependency"],
                legacy: { icon: "💸", name: "The Briber", weight: -5, explanation: "You paid them to stay. Loyalty bought is loyalty rented." }
            }
        ]
    },
    {
        id: "sanctions_loophole_found",
        title: "Creative Accounting",
        description: "Banker Andrei Kostin arrives with good news. His team at VTB has established a network of shell companies through Dubai, Kazakhstan, and Turkey. 'We can move $2 billion a month through these channels,' he explains. 'The Turks take 5%, the Kazakhs take 3%, but the money flows.' He slides a folder across the desk—a list of Western luxury goods still available 'through alternative channels.'",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "rare",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 5,
            impact: 3,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Exploit the loopholes aggressively",
                effects: {
                    treasury: 30,
                    personalWealth: 5,
                    elite: 3
                },
                remove: ["sanctions_loophole_found"],
                legacy: { icon: "🕳️", name: "The Smuggler", weight: 10, explanation: "You found ways around their walls. Sanctions are for the weak." }
            },
            {
                text: "Be cautious—don't antagonize further",
                effects: {
                    treasury: 10
                },
                remove: ["sanctions_loophole_found"]
            }
        ]
    },
    {
        id: "internet_censorship_tightens",
        title: "The Great Firewall Expands",
        description: "Roskomnadzor chief Alexander Zharov presents the new internet control plan. Instagram: blocked. Facebook: blocked. Twitter: throttled to unusability. VPN providers are being systematically identified and cut off. 'We will create a sovereign internet,' Zharov promises. 'Clean of Western propaganda.' Young people are adapting, sharing workarounds on Telegram, but the digital iron curtain descends.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 6,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Complete the digital isolation",
                effects: {
                    anger: 10,
                    elite: -3
                },
                remove: ["internet_censorship_tightens"],
                legacy: { icon: "🌐", name: "The Disconnector", weight: 10, explanation: "You cut your people off from the world. They see only what you allow." }
            },
            {
                text: "Ease restrictions slightly",
                effects: {
                    anger: -5,
                    elite: 2,
                    treasury: -30
                },
                add: ["foreign_influence_creeping"],
                remove: ["internet_censorship_tightens"]
            }
        ]
    },
    {
        id: "underground_railroad",
        title: "The Escape Network",
        description: "FSB officer Sergei Naryshkin reports a troubling development: an organized network is smuggling people across the Finnish and Georgian borders. Telegram channels with coded language guide escapees to safe houses. A former journalist named Elena Milashina is coordinating from Vilnius, helping thousands disappear. 'We've arrested 47 facilitators,' Naryshkin says, 'but for every one we catch, three more appear.'",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "rare",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 6,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Crack down ruthlessly—15 years for facilitators",
                effects: {
                    anger: 15,
                    elite: -5,
                    personalWealth: 5
                },
                remove: ["underground_railroad"],
                legacy: { icon: "⛓️", name: "The Warden", weight: 10, explanation: "You sealed the exits. The nation is your prison." }
            },
            {
                text: "Turn a blind eye—focus elsewhere",
                effects: {
                    elite: -3,
                    treasury: -10
                },
                remove: ["underground_railroad"],
                legacy: { icon: "👁️", name: "The Blind Eye", weight: -5, explanation: "You let them escape. The competent fled while you watched." }
            }
        ]
    },
    {
        id: "loyal_tech_giant",
        title: "The Homegrown Tech Champion",
        description: "Mikhail Mishustin, CEO of your domestic tech giant RuSoft, presents an ambitious proposal. His company will build Russian alternatives to Google, Microsoft, and Apple services—a complete digital ecosystem independent of the West. 'It will be called RuNet,' he explains, 'and it will serve 150 million users. I need only modest investment: $4 billion and exclusive government contracts.'",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "rare",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 6,
            impact: 3,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Invest heavily—build the Russian internet",
                effects: {
                    treasury: -40,
                    elite: 5,
                    anger: -3,
                    personalWealth: 5
                },
                remove: ["loyal_tech_giant"],
                legacy: { icon: "💻", name: "The Tech Tsar", weight: 10, explanation: "You built a digital empire independent of the West." }
            },
            {
                text: "Offer modest support only",
                effects: {
                    treasury: -15,
                    elite: 2
                },
                remove: ["loyal_tech_giant"]
            },
            {
                text: "Reject—the money is better spent elsewhere",
                effects: {
                    elite: -2,
                    treasury: 0
                },
                remove: ["loyal_tech_giant"]
            }
        ]
    },
    {
        id: "subsidy_dependency",
        title: "Subsidy Addiction",
        description: "The chickens come home to roost. RuSoft CEO Mishustin is back, but this time with demands. 'Without continued subsidies, we collapse. 40,000 jobs vanish. The alternative software—gone. I need another $3 billion, or I relocate what remains to Dubai.' Behind him, a delegation of tech oligarchs nods in unison. They've formed a cartel, and they know you need them.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 6,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Pay the ransom—keep the subsidies flowing",
                effects: {
                    treasury: -80,
                    elite: 2
                },
                remove: ["subsidy_dependency"],
                legacy: { icon: "🐄", name: "The Cash Cow", weight: -10, explanation: "They milked you. The tech oligarchs learned you'll always pay." }
            },
            {
                text: "Cut them off—call their bluff",
                effects: {
                    elite: -5,
                    anger: 5,
                    treasury: 0
                },
                add: ["tech_sector_collapse"],
                remove: ["subsidy_dependency"],
                legacy: { icon: "✂️", name: "The Budget Hawk", weight: 5, explanation: "You refused to be extorted. Painful, but principled." }
            },
            {
                text: "Restructure subsidies through your own holding company",
                effects: {
                    treasury: -60,
                    elite: 0,
                    personalWealth: 12
                },
                legacy: { icon: "🏦", name: "The Subsidy King", weight: 15, explanation: "You made yourself the middleman. Every ruble flows through your accounts." },
                remove: ["subsidy_dependency"]
            }
        ]
    },
    {
        id: "foreign_influence_creeping",
        title: "Western Ideas Spread",
        description: "University professor Andrei Kolesnikov reports worrying trends in his lectures: students openly discussing Western concepts like 'transparency' and 'rule of law.' Youth bloggers on the semi-open internet share videos from European capitals—clean streets, functioning courts, politicians who resign when caught stealing. A philosophy student named Daria Navalnaya starts a podcast called 'What Could Be Different.' It has 2 million subscribers.",
        weight: 0,
        storyline: "sanctions-spiral",
        rarity: "common",
        conditions: { flags: { sanctions_active: true } },
        meta: {
            depth: 7,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Let them talk—monitor, don't suppress",
                effects: {
                    anger: -2,
                    elite: -5
                },
                add: ["mass_protests_blogger"],
                remove: ["foreign_influence_creeping"],
                legacy: { icon: "🎙️", name: "The Tolerant", weight: -10, explanation: "You let dangerous ideas spread. Now they dream of change." }
            },
            {
                text: "Arrest the ringleaders, close the podcast",
                effects: {
                    anger: 10,
                    elite: 2
                },
                remove: ["foreign_influence_creeping"],
                legacy: { icon: "🔒", name: "The Thought Police", weight: 10, explanation: "You crushed the dreamers before they could organize." }
            }
        ]
    }
];
