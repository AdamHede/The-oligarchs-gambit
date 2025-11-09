// The Oligarch's Gambit - v1.3
// Domestic Crisis & Institutional Breakdown
// 11 events

const DOMESTIC_CRISIS_EVENTS = [
    {
        id: "food_inflation",
        title: "The Price of Bread",
        description: "Bread prices tripled. Eggs up 400%. Meat is unaffordable. Pensioners are eating dog food. Your economic policies destroyed the ruble and killed imports. The state grain reserve is low. Social media is exploding. You could subsidize food (expensive), blame the West (classic), or arrest some supermarket CEOs for 'profiteering.'",
        weight: 7,
        conditions: { anger: 35 },
        choices: [
            {
                text: "Price controls and subsidies. Keep the proles fed.",
                effects: { personalWealth: 0, treasury: -220, elite: 0, anger: -20 }
            },
            {
                text: "Blame the West. Sanctions caused this. (State media blitz)",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 10 }
            },
            {
                text: "Arrest supermarket CEOs. 'Profiteering.' Seize their assets.",
                effects: { personalWealth: 4, treasury: 35, elite: -5, anger: 15 },
                legacy: { icon: "🎯", name: "Scapegoat Master", weight: -5 }
            }
        ]
    },
    {
        id: "ruble_collapse",
        title: "Currency Freefall",
        description: "The ruble crashed. Lost 70% of value in 3 days. Currency traders are shorting it mercilessly. Foreign reserves can't stop the bleeding. Imports instantly unaffordable. Savings wiped out. Pensioners' life savings worth nothing. This is 1998 all over again, but worse. The central bank is out of ammunition.",
        weight: 11,
        conditions: { hasTriggered: ["sanctions_incoming"], treasury: -200 },
        onceOnly: true,
        choices: [
            {
                text: "Peg to yuan. Abandon ruble independence. Chinese currency becomes de facto currency.",
                effects: { personalWealth: -10, treasury: -150, elite: -15, anger: 35 }
            },
            {
                text: "Capital controls. Ban forex trading. Make ruble-dollar exchange illegal.",
                effects: { personalWealth: 0, treasury: -100, elite: -10, anger: 40 }
            },
            {
                text: "Default on debt. Hyperinflation. Economic chaos. But you survive.",
                effects: { personalWealth: -5, treasury: -300, elite: -25, anger: 60 },
                legacy: { icon: "📉", name: "Currency Destroyer", weight: -22 }
            }
        ]
    },
    {
        id: "labor_strike",
        title: "The Factory Strike",
        description: "12,000 miners are on strike. Wages haven't kept pace with inflation. They're blocking the main highway. The factory owner (your friend) is losing $5 million daily. The workers have public sympathy. Riot police are ready. What happens next sets precedent for every labor dispute in the country.",
        weight: 6,
        conditions: { anger: 30 },
        choices: [
            {
                text: "Send riot police. Break the strike. Arrest union leaders.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 30 }
            },
            {
                text: "Force the owner to negotiate. 15% wage increase. They accept.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -15 }
            },
            {
                text: "Nationalize the mine. Fire the owner. Workers now work for state.",
                effects: { personalWealth: 5, treasury: -80, elite: -15, anger: -10 }
            }
        ]
    },
    {
        id: "disaster_response",
        title: "The Dam Breaks",
        description: "An aging Soviet-era dam just collapsed. Flooding downstream. 40 villages underwater. 200+ dead. Thousands homeless. Infrastructure neglect is obvious—maintenance budget was 'redirected.' International aid is offered. Your emergency response is being judged. This is a legitimacy test.",
        weight: 7,
        conditions: {},
        choices: [
            {
                text: "Massive state response. Military rescue. Rebuild everything. Show you care.",
                effects: { personalWealth: -5, treasury: -250, elite: 0, anger: -25 }
            },
            {
                text: "Blame local officials. Fire the governor. Scapegoat and move on.",
                effects: { personalWealth: 0, treasury: -80, elite: -5, anger: 15 }
            },
            {
                text: "Minimal response. People should be self-reliant. Budget's tight.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 35 }
            }
        ]
    },
    {
        id: "pension_crisis",
        title: "The Pension Fund",
        description: "The state pension fund is insolvent. You've been raiding it for years to plug budget holes. 18 million pensioners haven't been paid in 2 months. They're protesting. The finance minister says there's no money. Either cut pensions 40%, raise retirement age to 70, or find $150 billion somehow.",
        weight: 8,
        conditions: { treasury: -100 },
        choices: [
            {
                text: "Cut pensions 40%. They'll adjust. Better than state bankruptcy.",
                effects: { personalWealth: 0, treasury: 100, elite: 5, anger: 50 }
            },
            {
                text: "Raise retirement age to 70. Gradual implementation. Long-term fix.",
                effects: { personalWealth: 0, treasury: 80, elite: 0, anger: 40 }
            },
            {
                text: "Emergency fund injection. Print money. Deal with inflation later.",
                effects: { personalWealth: 0, treasury: -200, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "ethnic_tensions_flare",
        title: "Ethnic Violence",
        description: "Ethnic riots in a border region. The majority ethnic group is attacking the minority. 30 dead so far. It started with a market dispute but decades of resentment exploded. Separatist rhetoric is growing. Both sides are armed. Military deployment could either restore order or escalate to civil conflict.",
        weight: 8,
        conditions: { anger: 40 },
        choices: [
            {
                text: "Military crackdown. Martial law. Curfew. Arrest leaders from both sides.",
                effects: { personalWealth: 0, treasury: -80, elite: 0, anger: 30 }
            },
            {
                text: "Side with majority. They're 'defending themselves.' Minority caused this.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 35 }
            },
            {
                text: "Reconciliation commission. Dialogue. Power-sharing. (Slow, uncertain)",
                effects: { personalWealth: -2, treasury: -60, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "healthcare_privatization",
        title: "The Hospital Sale",
        description: "Your health minister proposes privatizing hospitals. It would raise $15B immediately and cut state healthcare costs. But 40 million people rely on state healthcare. Private care is unaffordable for most. Oligarchs are lining up to buy hospitals. The doctors' union is threatening strikes.",
        weight: 6,
        conditions: { treasury: -100 },
        choices: [
            {
                text: "Full privatization. Sell everything. Healthcare is now for profit.",
                effects: { personalWealth: 10, treasury: 600, elite: 15, anger: 55 }
            },
            {
                text: "Partial. Keep basic care public, allow private premium services.",
                effects: { personalWealth: 5, treasury: 300, elite: 5, anger: 30 }
            },
            {
                text: "Reject. Healthcare is a human right. Keep it public.",
                effects: { personalWealth: 0, treasury: -150, elite: -10, anger: -20 }
            }
        ]
    },
    {
        id: "youth_unemployment_crisis",
        title: "The Lost Generation",
        description: "Youth unemployment hit 45%. University graduates are driving taxis. Engineering degrees work in call centers. Brain drain accelerating. Young people have no future here. Revolution potential is high. You need jobs, but the economy is stagnant. Maybe a massive public works program?",
        weight: 7,
        conditions: { anger: 35 },
        choices: [
            {
                text: "Massive public works. $30B infrastructure program. Create 500k jobs.",
                effects: { personalWealth: -5, treasury: -1200, elite: -5, anger: -30 }
            },
            {
                text: "Tax breaks for employers. Subsidize private sector hiring.",
                effects: { personalWealth: 0, treasury: -300, elite: 10, anger: -15 }
            },
            {
                text: "Nothing. Market will correct itself. (It won't)",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 30 }
            }
        ]
    },
    {
        id: "state_bankruptcy_risk",
        title: "The Default Crisis",
        description: "You're $200B in debt. Creditors want payment. Options: default (economic chaos), austerity (political suicide), or print money (hyperinflation). Or maybe... seize oligarch wealth? Every option is terrible. Welcome to sovereign debt crisis.",
        weight: 10,
        conditions: { treasury: -500 },
        choices: [
            {
                text: "Default. Restructure debt. 10 years of economic pain.",
                effects: { personalWealth: 0, treasury: 200, elite: -20, anger: 50 }
            },
            {
                text: "Seize oligarch offshore accounts. Force them to 'donate' $150B.",
                effects: { personalWealth: -20, treasury: 600, elite: -40, anger: -10 }
            },
            {
                text: "Print money. Inflate the debt away. Savings destroyed but state survives.",
                effects: { personalWealth: 0, treasury: 100, elite: -15, anger: 55 }
            }
        ]
    },
    {
        id: "population_decline",
        title: "The Demographic Crisis",
        description: "Population declining 1% annually. Birth rates collapsing. Workforce shrinking. Aging crisis. Solutions: immigration (nationalists hate it), child subsidies ($50B/year), or nothing (decline continues). This is existential long-term.",
        weight: 6,
        conditions: { year: 4 },
        choices: [
            {
                text: "Massive immigration program. Open borders to Central Asia.",
                effects: { personalWealth: 0, treasury: -100, elite: -15, anger: 45 }
            },
            {
                text: "Child subsidies. $30k per child. Encourage births with money.",
                effects: { personalWealth: 0, treasury: -800, elite: 0, anger: -20 }
            },
            {
                text: "Do nothing. Natural population decline. Smaller is fine.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 20 }
            }
        ]
    },
    {
        id: "prison_riot",
        title: "The Prison Massacre",
        description: "Major prison riot. Inmates took guards hostage. Your interior minister sent special forces. 47 inmates killed. 'Official story: they were armed. Truth: it was an execution. Survivors are talking. Human rights groups investigating. Cover it up or admit?",
        weight: 8,
        conditions: {},
        choices: [
            {
                text: "Full cover-up. Prisoners were dangerous terrorists. Justified response.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 25 }
            },
            {
                text: "Admit excessive force. Fire prison warden. Compensate families.",
                effects: { personalWealth: -2, treasury: -80, elite: -10, anger: -10 }
            },
            {
                text: "Blame prisoners. They chose violence. No investigation needed.",
                effects: { personalWealth: 0, treasury: -10, elite: 15, anger: 30 }
            }
        ]
    }
];


