export const WAR_EVENTS = [
    {
        id: "war_special_operation_proposal",
        title: "Special Military Operation",
        description: "Defense Minister Sergei Kovalenko arrives with Marshal Dmitri Volkov and FSB chief Viktor Petrov. They unroll maps showing a 'lightning strike' into the neighboring republic—72 hours, minimal resistance, regime change by Tuesday. 'The West will send strongly-worded letters,' Volkov smirks. 'They are too weak to act.' The generals' eyes gleam with visions of medals and dacha expansions.",
        weight: 10,
        storyline: "war-invasion",
        rarity: "rare",
        meta: {
            depth: 3,
            impact: 5,
            sentiment: "neutral"
        },
        image: "assets/images/events/war_special_operation_proposal.png",
        choices: [
            {
                text: "Authorize the operation",
                effects: {
                    personalWealth: 5,
                    treasury: -50,
                    elite: 10,
                    anger: 5,
                    flags: { war_started: true, sanctions_active: true }
                },
                add: ["war_goes_badly", "sanctions_initial_wave", "rally_around_flag"],
                legacy: { icon: "⚔️", name: "The Invader", weight: 15, explanation: "You launched a full-scale invasion. History is written by the victorious—and you intend to win." }
            },
            {
                text: "Reject the plan",
                effects: {
                    elite: -10,
                    treasury: 5,
                    anger: -5
                },
                add: ["generals_plotting_coup"],
                legacy: { icon: "🕊️", name: "The Peacemaker", weight: -10, explanation: "You showed weakness when strength was required. The generals will remember." }
            }
        ]
    },
    {
        id: "war_goes_badly",
        title: "The 72-Hour Quagmire",
        description: "It has been three weeks. Marshal Volkov's '72-hour operation' has become a bloody stalemate. General Andrei Sorokin reports that the 4th Tank Division ran out of fuel outside Novograd and was picked apart by drones. Colonel Yuri Makarov's supply convoy was ambushed—600 men, gone. The generals have stopped returning each other's calls, each drafting memos blaming the others for the catastrophe.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        conditions: { flags: { war_started: true } },
        meta: {
            depth: 4,
            impact: 5,
            sentiment: "negative"
        },
        image: "assets/images/events/war_goes_badly.png",
        choices: [
            {
                text: "Double down: Mobilize more troops",
                effects: {
                    treasury: -150,
                    anger: 15,
                    elite: 5,
                    personalWealth: 5
                },
                add: ["conscription_crisis", "equipment_shortages"],
                remove: ["war_goes_badly"],
                legacy: { icon: "🎖️", name: "The Escalator", weight: 10, explanation: "When the operation stalled, you doubled down. Commitment or madness—history will decide." }
            },
            {
                text: "Pull back and regroup",
                effects: {
                    elite: -15,
                    anger: -5
                },
                add: ["general_fired_scapegoat"],
                remove: ["war_goes_badly"]
            },
            {
                text: "Declare victory and withdraw",
                effects: {
                    elite: -20,
                    anger: -10,
                    treasury: 30,
                    flags: { war_started: false }
                },
                add: ["frozen_conflict"],
                remove: ["war_goes_badly", "conscription_crisis", "equipment_shortages", "generals_plotting_coup", "rural_unrest", "border_exodus_brain_drain"],
                legacy: { icon: "🐈", name: "The Paper Tiger", weight: -15, explanation: "You retreated and called it victory. The mockery echoes from every capital." }
            }
        ]
    },
    {
        id: "conscription_crisis",
        title: "Partial Mobilization",
        description: "General Nikolai Zhukov delivers the grim arithmetic: the operation needs 300,000 more men. Interior Minister Pavel Orlov warns that announcing mobilization will trigger panic—already his officers report young men booking one-way flights to Kazakhstan. 'The villages will provide,' suggests Zhukov. 'The cities have too many cameras, too many mothers with smartphones.'",
        weight: 0,
        storyline: "war-invasion",
        rarity: "rare",
        conditions: { flags: { war_started: true } },
        meta: {
            depth: 5,
            impact: 5,
            sentiment: "negative"
        },
        image: "assets/images/events/conscription_crisis.png",
        choices: [
            {
                text: "Mobilize the rural poor only",
                effects: {
                    treasury: -20,
                    anger: 5,
                    elite: 0,
                    personalWealth: 5
                },
                add: ["rural_unrest"],
                remove: ["conscription_crisis"],
                legacy: { icon: "👑", name: "The Class Divider", weight: 10, explanation: "You spared the wealthy and sent the peasants. The old ways are best." }
            },
            {
                text: "General mobilization",
                effects: {
                    treasury: -80,
                    anger: 25,
                    elite: 5,
                    personalWealth: 3
                },
                add: ["border_exodus_brain_drain"],
                remove: ["conscription_crisis"],
                legacy: { icon: "🎺", name: "The Mobilizer", weight: 15, explanation: "You summoned the nation to war. Total commitment." }
            }
        ]
    },
    {
        id: "rally_around_flag",
        title: "Patriotic Surge",
        description: "State television host Marina Konstantinova delivers a fiery broadcast: 'Our brave soldiers advance against the fascist junta!' The hashtag #VictoryWillBeOurs trends nationally. Olga Petrova, the famous actress, performs patriotic songs outside the Kremlin. Young men wave flags; grandmothers weep with pride. For a brief, shining moment, the nation believes.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        conditions: { flags: { war_started: true } },
        meta: {
            depth: 4,
            impact: 2,
            sentiment: "positive"
        },
        choices: [
            {
                text: "Capitalize on the momentum",
                effects: {
                    elite: 5,
                    anger: -5,
                    personalWealth: 5
                },
                legacy: { icon: "🇷🇺", name: "The Patriot", weight: 5, explanation: "You harnessed national fervor. The people march for you." }
            }
        ]
    },
    {
        id: "generals_plotting_coup",
        title: "The Generals Are Restless",
        description: "FSB chief Viktor Petrov slides a dossier across your desk. Marshal Volkov has been meeting privately with General Sorokin and Admiral Kuznetsov. Your informants report whispered conversations about 'the weakness at the top' and 'restoring national honor.' The military has tasted humiliation, and they blame you for denying them glory.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "rare",
        meta: {
            depth: 2,
            impact: 5,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Purge the disloyal",
                effects: {
                    elite: -10,
                    treasury: -20,
                    personalWealth: 8
                },
                legacy: { icon: "🔪", name: "The Purger", weight: 15, explanation: "You struck before they could. Stalin would approve." }
            },
            {
                text: "Offer them concessions",
                effects: {
                    treasury: -30,
                    elite: 5
                },
                legacy: { icon: "💰", name: "The Appeaser", weight: -5, explanation: "You bought loyalty instead of commanding it. They smell weakness." }
            }
        ]
    },
    {
        id: "equipment_shortages",
        title: "The Supply Crisis",
        description: "Logistics Colonel Alexei Baranov delivers catastrophic news: the 12th Guards Brigade has run out of artillery shells. Tanks from the Uralvagonzavod factory are arriving without optics—someone sold them to Iran years ago and pocketed the difference. Defense contractor Roman Abramovich calls personally, offering to 'expedite' deliveries for a modest 40% markup.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        conditions: { flags: { war_started: true } },
        meta: {
            depth: 5,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Pay Abramovich's markup",
                effects: {
                    treasury: -80,
                    anger: 8,
                    personalWealth: 5
                },
                remove: ["equipment_shortages"]
            },
            {
                text: "Accept the shortages, blame saboteurs",
                effects: {
                    elite: -10,
                    anger: 10
                },
                remove: ["equipment_shortages"],
                legacy: { icon: "🎭", name: "The Blame-Shifter", weight: -5, explanation: "When supplies ran out, you pointed fingers instead of finding solutions." }
            }
        ]
    },
    {
        id: "general_fired_scapegoat",
        title: "A Scapegoat is Found",
        description: "On state television, you publicly strip General Mikhail Reznikov of his rank. He stands at attention as you accuse him of 'incompetence and possible treason.' His medals are removed; his family is escorted from their Moscow apartment. The message is clear: failure has consequences. Behind closed doors, the other generals exchange nervous glances—they know the real problems remain unsolved.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        conditions: { flags: { war_started: true } },
        meta: {
            depth: 5,
            impact: 2,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Press forward with new commanders",
                effects: {
                    elite: -5,
                    treasury: -30
                },
                remove: ["general_fired_scapegoat"],
                legacy: { icon: "👤", name: "The Scapegoater", weight: 5, explanation: "When things went wrong, heads rolled. Not yours, of course." }
            },
            {
                text: "Pause and reassess strategy",
                effects: {
                    elite: 5,
                    anger: -5
                },
                remove: ["general_fired_scapegoat"]
            }
        ]
    },
    {
        id: "rural_unrest",
        title: "The Countryside Rises",
        description: "In Dagestan, mothers block military buses with their bodies. In Buryatia, village elder Bato Dorzhiev leads a protest of 2,000 against the 'meat grinder.' Videos spread on Telegram: wives screaming at recruitment officers, babushkas throwing eggs at local officials. 'They take our sons, but the Moscow boys stay safe,' shouts one woman. The ethnic minorities have noticed who fills the body bags.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        conditions: { flags: { war_started: true } },
        meta: {
            depth: 6,
            impact: 3,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Suppress the protests violently",
                effects: {
                    anger: 10,
                    elite: 2,
                    personalWealth: 3
                },
                remove: ["rural_unrest"],
                legacy: { icon: "🔨", name: "The Crusher", weight: 10, explanation: "The villages learned that resistance is futile." }
            },
            {
                text: "Promise compensation and fair treatment",
                effects: {
                    anger: -5,
                    treasury: -10
                },
                remove: ["rural_unrest"],
                legacy: { icon: "🤝", name: "The Promiser", weight: -5, explanation: "You made promises you never intended to keep. At least it was quiet." }
            }
        ]
    },
    {
        id: "border_exodus_brain_drain",
        title: "The Great Exodus",
        description: "The Tbilisi road is jammed for 30 kilometers—a line of Lexuses and BMWs filled with IT workers, artists, and anyone with a foreign passport. Yandex reports that 15,000 developers have relocated to Armenia. The queue at the Kazakhstan border stretches for days. Telegram channels share tips on which crossings are still open. Your nation's future is driving away in a convoy of German sedans.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "rare",
        conditions: { flags: { war_started: true } },
        meta: {
            depth: 6,
            impact: 4,
            sentiment: "negative"
        },
        choices: [
            {
                text: "Close the borders immediately",
                effects: {
                    anger: 15,
                    elite: -5,
                    personalWealth: 5
                },
                remove: ["border_exodus_brain_drain"],
                legacy: { icon: "🚧", name: "The Jailer", weight: 10, explanation: "You locked the cage. If they can't leave, they must serve." }
            },
            {
                text: "Let the traitors flee",
                effects: {
                    treasury: -20,
                    elite: -10
                },
                remove: ["border_exodus_brain_drain"],
                legacy: { icon: "👋", name: "The Purifier", weight: 5, explanation: "Good riddance to the disloyal. The motherland is better without them." }
            }
        ]
    },
    {
        id: "frozen_conflict",
        title: "The Frozen Conflict",
        description: "The fighting has stopped, but nothing is resolved. A jagged line of trenches and minefields now marks the new 'border.' General Surovikin maintains a garrison of 80,000 troops who trade occasional artillery fire with the enemy. State media declares 'all objectives achieved,' but everyone knows the truth. The meat grinder has paused, not ended. Veterans return missing limbs and speaking of horrors, while their neighbors pretend not to notice.",
        weight: 0,
        storyline: "war-invasion",
        rarity: "common",
        meta: {
            depth: 5,
            impact: 3,
            sentiment: "negative"
        },
        image: "assets/images/events/frozen_conflict.png",
        choices: [
            {
                text: "Maintain the frozen stalemate",
                effects: {
                    treasury: -8,
                    elite: -1,
                    anger: 2
                },
                add: ["frozen_conflict"]
            }
        ]
    }
];

