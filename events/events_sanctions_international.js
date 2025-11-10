// The Oligarch's Gambit - v1.6.0
// International Sanctions & Isolation
// 11 events

const SANCTIONS_INTERNATIONAL_EVENTS = [
    {
        id: "sanctions_incoming",
        title: "International Sanctions",
        description: "The West just froze $400 billion in foreign reserves. Banned technology exports. Kicked you out of SWIFT. Cut off all Western financing. Your oligarchs' yachts are being seized in Monaco. The ruble is in free fall. Your finance minister is hyperventilating into a paper bag.",
        weight: 7,
        conditions: { hasTriggered: ["war_goes_badly", "international_sanctions"] },
        onceOnly: true,
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
        storyline: "oligarch_intrigue",
        onceOnly: true,
        choices: [
            {
                text: "Approve the hit. Send the special team to London.",
                effects: { personalWealth: -2, treasury: -20, elite: 10, anger: 15 },
                legacy: { icon: "☂️", name: "Long Reach", weight: 11 },
                addToPool: ["international_sanctions", "rival_oligarch", "oligarch_yacht_party"]
            },
            {
                text: "Disinformation campaign. He's mentally unstable. A thief.",
                effects: { personalWealth: -1, treasury: -30, elite: 0, anger: 5 },
                addToPool: ["journalist_problem", "rival_oligarch", "palace_construction"]
            },
            {
                text: "Freeze his assets. Arrest his brother. His kids can't leave.",
                effects: { personalWealth: 6, treasury: 40, elite: -10, anger: 10 },
                addToPool: ["rival_oligarch", "oligarch_yacht_party", "palace_construction"]
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
                addToPool: ["sanctions_evasion_network"]
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
        onceOnly: true,
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
    }
];


