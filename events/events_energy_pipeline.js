export const ENERGY_EVENTS = [
    {
        id: "energy_price_spike",
        title: "Winter is Coming",
        description: "Gazprom CEO Alexei Miller calls with excellent news: European spot prices have hit €300 per megawatt-hour, ten times the historical average. Germany's reserves will last six weeks. Poland is rationing. The European energy commissioner is on television, sweating visibly. 'We have them by the throat,' Miller says. 'What are your orders?'",
        weight: 8,
        storyline: "energy-politics",
        rarity: "rare",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Cut off the gas—let them freeze",
                effects: {
                    treasury: -50,
                    elite: 10,
                    anger: 5
                },
                add: ["europe_freezes_propaganda", "budget_deficit_energy", "counter_sanctions_energy"],
                legacy: { icon: "❄️", name: "The Coldmaker", weight: 15, explanation: "You wielded energy as a weapon. Europe shivered and remembered who controls the heat." }
            },
            {
                text: "Sell at maximum price—bleed them dry",
                effects: {
                    treasury: 100,
                    personalWealth: 10,
                    elite: 3,
                    anger: 15
                },
                add: ["oligarch_bonus_payout", "inflation_crisis"],
                legacy: { icon: "💎", name: "The Profiteer", weight: 10, explanation: "You extracted maximum profit from their desperation. Business is war." }
            }
        ]
    },
    {
        id: "pipeline_sabotage",
        title: "Pipeline Mystery",
        description: "The Nord Stream control room erupts in alarms. Massive pressure drops in both pipeline legs. Seismologists in Denmark and Sweden record explosions on the Baltic seafloor. Your $11 billion investment is now leaking methane into the sea. FSB director Nikolai Patrushev presents satellite imagery: 'American ships were in the area 48 hours ago.' The Western media points at you. Everyone is lying, and nobody knows the truth.",
        weight: 4,
        storyline: "energy-politics",
        rarity: "epic",
        meta: {
            depth: 1,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Blame the Americans publicly",
                effects: {
                    anger: -5,
                    elite: 2
                },
                add: ["shadow_war_escalation"],
                legacy: { icon: "🎭", name: "The Accuser", weight: 5, explanation: "You pointed fingers at the West. True or not, your people believed." }
            },
            {
                text: "Quietly repair, avoid escalation",
                effects: {
                    treasury: -40,
                    personalWealth: -2
                }
            }
        ]
    },
    {
        id: "europe_freezes_propaganda",
        title: "Winter of Discontent",
        description: "Channel One's evening news is glorious. Correspondent Olga Skabeyeva broadcasts from Berlin, where pensioners queue for heating oil. In Paris, the Eiffel Tower is dark to save electricity. Split-screen: your people watching from warm apartments, shaking their heads at Western hubris. 'They chose sanctions,' Skabeyeva smirks. 'Now they choose between eating and heating.' The ratings are excellent.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Amplify the schadenfreude—more coverage",
                effects: {
                    elite: 3,
                    anger: -3
                },
                add: ["counter_sanctions_energy"],
                remove: ["europe_freezes_propaganda"],
                legacy: { icon: "📺", name: "The Propagandist", weight: 10, explanation: "You turned their suffering into your entertainment. The people loved it." }
            },
            {
                text: "Quiet the coverage, focus domestically",
                effects: {
                    anger: -2
                },
                remove: ["europe_freezes_propaganda"]
            }
        ]
    },
    {
        id: "budget_deficit_energy",
        title: "The Energy Budget Hole",
        description: "Finance Minister Anton Siluanov presents the numbers with shaking hands. The gas cutoff means $200 million less per day in export revenue. The reserve fund is depleting faster than projected. 'We can raise domestic tariffs,' he suggests, 'but the people already struggle with bills. Or we cut the social programs—but that risks unrest.' He waits for your decision, knowing there are no good options.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Raise domestic energy prices",
                effects: {
                    treasury: 20,
                    anger: 10,
                    personalWealth: 3
                },
                remove: ["budget_deficit_energy"],
                legacy: { icon: "📈", name: "The Price Raiser", weight: 5, explanation: "You made your own people pay for your geopolitical games." }
            },
            {
                text: "Cut social spending instead",
                effects: {
                    treasury: 10,
                    elite: -5
                },
                remove: ["budget_deficit_energy"]
            }
        ]
    },
    {
        id: "oligarch_bonus_payout",
        title: "The Bonus Season",
        description: "Oligarch Igor Sechin arrives with a delegation: Timchenko, Rotenberg, Kovalchuk—the inner circle. They've done the math on the energy windfall and expect their share. 'We took the risks,' Sechin says, sliding a list across the table. 'We built the pipelines, bribed the Europeans, kept the system running. Now it's time to divide the profits.' The numbers on the list would fund a small country for a decade.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "positive"
        },
        image: "assets/images/events/oligarch_bonus_payout.png",
        choices: [
            {
                text: "Pay them generously—maintain loyalty",
                effects: {
                    elite: 10,
                    treasury: -70,
                    personalWealth: -5,
                    anger: 5
                },
                remove: ["oligarch_bonus_payout"],
                legacy: { icon: "🤝", name: "The Generous", weight: -5, explanation: "You shared the wealth with others. Generosity is weakness." }
            },
            {
                text: "Keep the lion's share for yourself",
                effects: {
                    personalWealth: 20,
                    elite: -8,
                    treasury: -10,
                    anger: 8
                },
                remove: ["oligarch_bonus_payout"],
                legacy: { icon: "💰", name: "The Greedy", weight: 15, explanation: "You took more than your share. But who will stop you? You are the state." }
            }
        ]
    },
    {
        id: "counter_sanctions_energy",
        title: "Energy Cap",
        description: "The G7 announces their masterstroke: a $60-per-barrel price cap on your oil. Ships carrying your crude above that price will be denied insurance and port access. Deputy PM Alexander Novak calculates the damage: billions in lost revenue annually. 'We can refuse to sell,' he suggests, 'or we can use the shadow fleet—old tankers with unclear ownership, sailing dark.' Each option has its price.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "common",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Refuse to sell—call their bluff",
                effects: {
                    treasury: -30,
                    elite: 2,
                    anger: 5
                },
                add: ["budget_deficit_energy"],
                remove: ["counter_sanctions_energy"],
                legacy: { icon: "✊", name: "The Defiant", weight: 10, explanation: "You refused their terms. Pride before profit." }
            },
            {
                text: "Use the shadow fleet—sell through intermediaries",
                effects: {
                    treasury: -10,
                    elite: -2,
                    personalWealth: 5
                },
                remove: ["counter_sanctions_energy"],
                legacy: { icon: "🚢", name: "The Shadow Captain", weight: 5, explanation: "You found ways around their blockade. The oil still flows, just... differently." }
            }
        ]
    },
    {
        id: "shadow_war_escalation",
        title: "The Shadow War Intensifies",
        description: "SVR chief Sergei Naryshkin presents the evidence board: explosions at power substations in Poland, mysterious fires at ammunition depots in Germany, American drones surveilling the Baltic Fleet. 'They are testing our resolve,' he says. 'We have assets in place. Sleeper cells in London, Berlin, Washington. Say the word and we respond in kind.' The shadow war has rules that only the shadows understand.",
        weight: 0,
        storyline: "energy-politics",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 3,
            sentiment: "neutral"
        },
        choices: [
            {
                text: "Authorize covert retaliation",
                effects: {
                    elite: 5,
                    treasury: -20,
                    anger: 5
                },
                remove: ["shadow_war_escalation"],
                legacy: { icon: "🗡️", name: "The Shadow Master", weight: 10, explanation: "You fought in the darkness. The West will never know what you've done." }
            },
            {
                text: "De-escalate—too risky",
                effects: {
                    elite: -3,
                    treasury: -10
                },
                remove: ["shadow_war_escalation"],
                legacy: { icon: "🏳️", name: "The Cautious", weight: -5, explanation: "You blinked first. The hawks remember." }
            }
        ]
    }
];
