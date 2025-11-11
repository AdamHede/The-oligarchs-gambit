// The Oligarch's Gambit - v1.6.0
// Domestic Crisis & Institutional Breakdown
// Redesigned for comprehensive branching

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
                effects: { personalWealth: 0, treasury: -220, elite: 0, anger: -20 },
                addToPool: ["budget_crisis", "subsidy_trap", "fiscal_hemorrhage", "temporary_relief"]
            },
            {
                text: "Blame the West. Sanctions caused this. (State media blitz)",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 10 },
                addToPool: ["propaganda_success", "western_scapegoat", "nationalist_unity", "blame_game"]
            },
            {
                text: "Arrest supermarket CEOs. 'Profiteering.' Seize their assets.",
                effects: { personalWealth: 4, treasury: 35, elite: -5, anger: 15 },
                legacy: { icon: "🎯", name: "Scapegoat Master", weight: -5 },
                addToPool: ["business_elite_fear", "supply_chain_collapse", "scapegoat_tactic", "economic_uncertainty"]
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
                effects: { personalWealth: -10, treasury: -150, elite: -15, anger: 35 },
                addToPool: ["chinese_dependency", "sovereignty_lost", "currency_stabilization", "nationalist_shame"]
            },
            {
                text: "Capital controls. Ban forex trading. Make ruble-dollar exchange illegal.",
                effects: { personalWealth: 0, treasury: -100, elite: -10, anger: 40 },
                addToPool: ["black_market_currency", "capital_flight", "enforcement_impossible", "economic_prison"]
            },
            {
                text: "Default on debt. Hyperinflation. Economic chaos. But you survive.",
                effects: { personalWealth: -5, treasury: -300, elite: -25, anger: 60 },
                legacy: { icon: "📉", name: "Currency Destroyer", weight: -22 },
                addToPool: ["hyperinflation_spiral", "savings_obliterated", "economic_meltdown", "sovereign_default"]
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
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 30 },
                addToPool: ["labor_repression", "union_underground", "strike_wave", "worker_rage"]
            },
            {
                text: "Force the owner to negotiate. 15% wage increase. They accept.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -15 },
                addToPool: ["labor_precedent", "owner_resentment", "wage_spiral", "union_emboldened"]
            },
            {
                text: "Nationalize the mine. Fire the owner. Workers now work for state.",
                effects: { personalWealth: 5, treasury: -80, elite: -15, anger: -10 },
                addToPool: ["nationalization_wave", "oligarch_panic", "state_enterprise_inefficiency", "expropriation_precedent"]
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
                effects: { personalWealth: -5, treasury: -250, elite: 0, anger: -25 },
                addToPool: ["legitimacy_restored", "budget_strain", "competence_shown", "compassion_politics"]
            },
            {
                text: "Blame local officials. Fire the governor. Scapegoat and move on.",
                effects: { personalWealth: 0, treasury: -80, elite: -5, anger: 15 },
                addToPool: ["scapegoat_governor", "regional_resentment", "infrastructure_still_broken", "accountability_theater"]
            },
            {
                text: "Minimal response. People should be self-reliant. Budget's tight.",
                effects: { personalWealth: 0, treasury: -30, elite: 5, anger: 35 },
                addToPool: ["legitimacy_crisis", "international_condemnation", "negligence_exposed", "callousness_revealed"]
            }
        ]
    },
    {
        id: "pension_crisis",
        title: "The Pension Fund",
        description: "The state pension fund is insolvent. You've been raiding it for years to plug budget holes. 18 million pensioners haven't been paid in 2 months. They're protesting. The finance minister says there's no money. Either cut pensions 40%, raise retirement age to 70, or find $150 billion somehow.",
        weight: 8,
        conditions: { treasury: -100 },
        onceOnly: true,
        choices: [
            {
                text: "Cut pensions 40%. They'll adjust. Better than state bankruptcy.",
                effects: { personalWealth: 0, treasury: 100, elite: 5, anger: 50 },
                addToPool: ["pensioner_rage", "elderly_protests", "generational_betrayal", "social_explosion"]
            },
            {
                text: "Raise retirement age to 70. Gradual implementation. Long-term fix.",
                effects: { personalWealth: 0, treasury: 80, elite: 0, anger: 40 },
                addToPool: ["retirement_rage", "work_until_death", "unpopular_reform", "youth_unemployment_worse"]
            },
            {
                text: "Emergency fund injection. Print money. Deal with inflation later.",
                effects: { personalWealth: 0, treasury: -200, elite: -10, anger: -15 },
                addToPool: ["inflation_acceleration", "money_printing", "temporary_fix", "future_crisis_bigger"]
            }
        ]
    },
    {
        id: "ethnic_tensions_flare",
        title: "Ethnic Violence",
        description: "Ethnic riots in a border region. The majority ethnic group is attacking the minority. 30 dead so far. It started with a market dispute but decades of resentment exploded. Separatist rhetoric is growing. Both sides are armed. Military deployment could either restore order or escalate to civil conflict.",
        weight: 8,
        conditions: { anger: 40 },
        onceOnly: true,
        choices: [
            {
                text: "Military crackdown. Martial law. Curfew. Arrest leaders from both sides.",
                effects: { personalWealth: 0, treasury: -80, elite: 0, anger: 30 },
                addToPool: ["martial_law", "ethnic_resentment", "authoritarian_control", "temporary_order"]
            },
            {
                text: "Side with majority. They're 'defending themselves.' Minority caused this.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 35 },
                addToPool: ["ethnic_cleansing", "minority_persecution", "separatist_movement", "international_condemnation"]
            },
            {
                text: "Reconciliation commission. Dialogue. Power-sharing. (Slow, uncertain)",
                effects: { personalWealth: -2, treasury: -60, elite: -10, anger: -15 },
                addToPool: ["peace_process", "fragile_truce", "extremist_opposition", "long_term_solution"]
            }
        ]
    },
    {
        id: "healthcare_privatization",
        title: "The Hospital Sale",
        description: "Your health minister proposes privatizing hospitals. It would raise $15B immediately and cut state healthcare costs. But 40 million people rely on state healthcare. Private care is unaffordable for most. Oligarchs are lining up to buy hospitals. The doctors' union is threatening strikes.",
        weight: 6,
        conditions: { treasury: -100 },
        onceOnly: true,
        choices: [
            {
                text: "Full privatization. Sell everything. Healthcare is now for profit.",
                effects: { personalWealth: 10, treasury: 600, elite: 15, anger: 55 },
                addToPool: ["healthcare_collapse", "oligarch_hospitals", "medical_access_crisis", "death_panels"]
            },
            {
                text: "Partial. Keep basic care public, allow private premium services.",
                effects: { personalWealth: 5, treasury: 300, elite: 5, anger: 30 },
                addToPool: ["two_tier_healthcare", "quality_gap", "brain_drain_doctors", "inequality_health"]
            },
            {
                text: "Reject. Healthcare is a human right. Keep it public.",
                effects: { personalWealth: 0, treasury: -150, elite: -10, anger: -20 },
                addToPool: ["budget_hemorrhage", "underfunded_hospitals", "doctor_exodus", "healthcare_crisis_continues"]
            }
        ]
    },
    {
        id: "youth_unemployment_crisis",
        title: "The Lost Generation",
        description: "Youth unemployment hit 45%. University graduates are driving taxis. Engineering degrees work in call centers. Brain drain accelerating. Young people have no future here. Revolution potential is high. You need jobs, but the economy is stagnant. Maybe a massive public works program?",
        weight: 7,
        conditions: { anger: 35 },
        onceOnly: true,
        choices: [
            {
                text: "Massive public works. $30B infrastructure program. Create 500k jobs.",
                effects: { personalWealth: -5, treasury: -1200, elite: -5, anger: -30 },
                addToPool: ["jobs_created", "infrastructure_boom", "budget_crisis", "youth_satisfied"]
            },
            {
                text: "Tax breaks for employers. Subsidize private sector hiring.",
                effects: { personalWealth: 0, treasury: -300, elite: 10, anger: -15 },
                addToPool: ["low_quality_jobs", "elite_subsidies", "marginal_improvement", "business_windfall"]
            },
            {
                text: "Nothing. Market will correct itself. (It won't)",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 30 },
                addToPool: ["youth_radicalization", "brain_drain_accelerates", "lost_generation", "revolution_risk"]
            }
        ]
    },
    {
        id: "state_bankruptcy_risk",
        title: "The Default Crisis",
        description: "You're $200B in debt. Creditors want payment. Options: default (economic chaos), austerity (political suicide), or print money (hyperinflation). Or maybe... seize oligarch wealth? Every option is terrible. Welcome to sovereign debt crisis.",
        weight: 10,
        conditions: { treasury: -500 },
        onceOnly: true,
        choices: [
            {
                text: "Default. Restructure debt. 10 years of economic pain.",
                effects: { personalWealth: 0, treasury: 200, elite: -20, anger: 50 },
                addToPool: ["sovereign_default", "international_pariah", "decade_of_pain", "economic_isolation"]
            },
            {
                text: "Seize oligarch offshore accounts. Force them to 'donate' $150B.",
                effects: { personalWealth: -20, treasury: 600, elite: -40, anger: -10 },
                addToPool: ["oligarch_rebellion", "capital_flight", "elite_conspiracy", "expropriation"]
            },
            {
                text: "Print money. Inflate the debt away. Savings destroyed but state survives.",
                effects: { personalWealth: 0, treasury: 100, elite: -15, anger: 55 },
                addToPool: ["hyperinflation_spiral", "currency_worthless", "savings_obliterated", "economic_chaos"]
            }
        ]
    },
    {
        id: "population_decline",
        title: "The Demographic Crisis",
        description: "Population declining 1% annually. Birth rates collapsing. Workforce shrinking. Aging crisis. Solutions: immigration (nationalists hate it), child subsidies ($50B/year), or nothing (decline continues). This is existential long-term.",
        weight: 6,
        conditions: { year: 4 },
        onceOnly: true,
        choices: [
            {
                text: "Massive immigration program. Open borders to Central Asia.",
                effects: { personalWealth: 0, treasury: -100, elite: -15, anger: 45 },
                addToPool: ["nationalist_backlash", "ethnic_tensions", "workforce_restored", "cultural_conflict"]
            },
            {
                text: "Child subsidies. $30k per child. Encourage births with money.",
                effects: { personalWealth: 0, treasury: -800, elite: 0, anger: -20 },
                addToPool: ["birth_rate_boost", "budget_crisis", "long_term_investment", "family_support"]
            },
            {
                text: "Do nothing. Natural population decline. Smaller is fine.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 20 },
                addToPool: ["demographic_collapse", "workforce_shrinkage", "pension_crisis_worse", "economic_stagnation"]
            }
        ]
    },
    {
        id: "prison_riot",
        title: "The Prison Massacre",
        description: "Major prison riot. Inmates took guards hostage. Your interior minister sent special forces. 47 inmates killed. 'Official story: they were armed. Truth: it was an execution. Survivors are talking. Human rights groups investigating. Cover it up or admit?",
        weight: 8,
        conditions: {},
        onceOnly: true,
        choices: [
            {
                text: "Full cover-up. Prisoners were dangerous terrorists. Justified response.",
                effects: { personalWealth: 0, treasury: -30, elite: 10, anger: 25 },
                addToPool: ["coverup_attempt", "evidence_leaks", "international_investigation", "human_rights_violations"]
            },
            {
                text: "Admit excessive force. Fire prison warden. Compensate families.",
                effects: { personalWealth: -2, treasury: -80, elite: -10, anger: -10 },
                addToPool: ["admission_weakness", "prison_reform_demanded", "accountability_shown", "elite_anger"]
            },
            {
                text: "Blame prisoners. They chose violence. No investigation needed.",
                effects: { personalWealth: 0, treasury: -10, elite: 15, anger: 30 },
                addToPool: ["prison_brutality_normalized", "human_rights_ignored", "impunity_culture", "repression_justified"]
            }
        ]
    }
];
