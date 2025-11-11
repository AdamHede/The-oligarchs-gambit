// The Oligarch's Gambit - v1.6.0
// International Sanctions
// Redesigned for comprehensive branching

const SANCTIONS_INTERNATIONAL_EVENTS = [
    {
        id: "sanctions_incoming",
        title: "International Sanctions",
        description: "The West announced sweeping sanctions. Asset freezes for 50 oligarchs. Travel bans for your inner circle. They're freezing $300 billion of your central bank reserves. SWIFT disconnection is being discussed. Your finance minister says this will hurt, but the economy can adapt. Your foreign minister says negotiate. Your hardliners say defy them.",
        weight: 9,
        conditions: { hasTriggered: ["special_operation_proposal", "war_crimes_allegations"] },
        onceOnly: true,
        choices: [
            {
                text: "Defiance! Nationalize Western assets. Mobilize the economy!",
                effects: { personalWealth: -15, treasury: -200, elite: 15, anger: 20 },
                legacy: { icon: "🚫", name: "Sanctioned Pariah", weight: -12 },
                addToPool: ["asset_freeze_escalation", "swift_disconnection", "economic_isolation", "retaliation_measures"]
            },
            {
                text: "Seek workarounds. Shell companies. Gray markets. Evasion.",
                effects: { personalWealth: -5, treasury: -100, elite: 5, anger: 10 },
                addToPool: ["sanctions_evasion_network", "offshore_schemes", "neutral_countries_help", "smuggling_networks"]
            },
            {
                text: "Negotiate. Offer minor concessions for sanctions relief.",
                effects: { personalWealth: 0, treasury: -50, elite: -15, anger: -5 },
                addToPool: ["sanctions_relief_talks", "hardliner_backlash", "negotiation_process", "weakness_perceived"]
            }
        ]
    },
    {
        id: "asset_freeze_escalation",
        title: "The Oligarchs' Yachts",
        description: "They're seizing everything. Your oligarchs' superyachts in Monaco, Miami, the Med. Penthouses in London and New York. Art collections worth billions. Private jets grounded. Swiss accounts frozen. Your elite are calling, panicking. Some are considering defection. They're asking: was this war worth losing everything?",
        weight: 8,
        conditions: { hasTriggered: ["sanctions_incoming"] },
        onceOnly: true,
        choices: [
            {
                text: "Compensate them from state funds. Buy their loyalty.",
                effects: { personalWealth: 0, treasury: -300, elite: 10, anger: 30 },
                addToPool: ["treasury_hemorrhage", "compensation_demands", "budget_crisis", "elite_dependency"]
            },
            {
                text: "Tell them to be patriotic. Sacrifice for the motherland.",
                effects: { personalWealth: 0, treasury: 0, elite: -25, anger: 0 },
                addToPool: ["oligarch_rebellion", "defections_begin", "elite_conspiracy", "loyalty_crisis"]
            },
            {
                text: "Seize their domestic assets too. Nobody's escaping.",
                effects: { personalWealth: 30, treasury: 200, elite: -30, anger: 10 },
                legacy: { icon: "🏴‍☠️", name: "Asset Grabber", weight: -10 },
                addToPool: ["total_elite_panic", "mass_flight_attempts", "confiscation_precedent", "oligarch_purge"]
            }
        ]
    },
    {
        id: "swift_disconnection",
        title: "Cut Off from SWIFT",
        description: "They did it. Your banks are disconnected from the global financial system. International payments are impossible. Imports stop. Exports pile up unsold. Your currency plummets 40% in a day. Pensioners storm banks trying to withdraw savings. This is economic warfare at scale.",
        weight: 8,
        conditions: { hasTriggered: ["sanctions_incoming"] },
        onceOnly: true,
        choices: [
            {
                text: "Emergency measures. Capital controls. Freeze foreign currency.",
                effects: { personalWealth: -5, treasury: -150, elite: -10, anger: 40 },
                addToPool: ["bank_run", "currency_controls", "capital_flight", "financial_panic"]
            },
            {
                text: "Pivot to Chinese payment systems. CIPS. UnionPay.",
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: 20 },
                addToPool: ["china_bailout", "chinese_dependency", "eastern_pivot", "unfavorable_terms"]
            },
            {
                text: "Cryptocurrency and barter. Build parallel systems.",
                effects: { personalWealth: 0, treasury: -80, elite: 5, anger: 30 },
                addToPool: ["crypto_evasion", "shadow_banking", "parallel_economy", "tech_challenges"]
            }
        ]
    },
    {
        id: "secondary_sanctions_threat",
        title: "The Sanctions Tighten",
        description: "Secondary sanctions are now in effect. Any country that helps you evade sanctions gets sanctioned too. Turkey is backing away. UAE is nervous. Even China is getting cautious. Your circle of friends is shrinking. The noose tightens.",
        weight: 7,
        conditions: { hasTriggered: ["sanctions_incoming"], year: 2 },
        onceOnly: true,
        choices: [
            {
                text: "Offer massive bribes to neutral countries. Keep channels open.",
                effects: { personalWealth: -10, treasury: -200, elite: 0, anger: 0 },
                addToPool: ["bribe_network", "neutral_countries_help", "sanctions_leakage", "diplomatic_costs"]
            },
            {
                text: "Total autarky. We'll make everything ourselves.",
                effects: { personalWealth: 0, treasury: -300, elite: 5, anger: 35 },
                addToPool: ["import_substitution_failure", "economic_decline", "shortage_crisis", "technological_regression"]
            },
            {
                text: "Threaten energy cutoffs. Make them feel pain too.",
                effects: { personalWealth: 0, treasury: -50, elite: 10, anger: 20 },
                addToPool: ["gas_cutoff_threat", "energy_weapon", "european_energy_crisis", "counter_sanctions"]
            }
        ]
    },
    {
        id: "brain_drain_sanctions",
        title: "The Exodus",
        description: "Since sanctions hit, 500,000 people left. Engineers, programmers, doctors, scientists. The educated class is fleeing. Tech sector collapse. Startups shuttered. Universities half-empty. Your future is draining away, one departure gate at a time.",
        weight: 6,
        conditions: { hasTriggered: ["sanctions_incoming"], year: 1 },
        onceOnly: true,
        choices: [
            {
                text: "Close borders. No one leaves without approval.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 45 },
                addToPool: ["border_closure", "underground_escape_routes", "desperation_grows", "iron_curtain_redux"]
            },
            {
                text: "Let them go. Good riddance to Western sympathizers.",
                effects: { personalWealth: 0, treasury: -100, elite: 5, anger: 10 },
                addToPool: ["brain_drain_accelerates", "economic_competitiveness_lost", "tech_gap", "talent_shortage"]
            },
            {
                text: "Massive raises for key sectors. Bribe them to stay.",
                effects: { personalWealth: 0, treasury: -250, elite: 0, anger: -5 },
                addToPool: ["retention_crisis", "wage_inflation", "fiscal_crisis", "temporary_solution"]
            }
        ]
    },
    {
        id: "import_substitution_failure",
        title: "The Missing Parts",
        description: "You can't make commercial aircraft without Western avionics. Can't make advanced chips without Dutch lithography machines. Can't maintain oil refineries without German parts. Import substitution sounded good. Reality: it's impossible. Entire industries are grinding to a halt.",
        weight: 7,
        conditions: { hasTriggered: ["secondary_sanctions_threat"] },
        onceOnly: true,
        choices: [
            {
                text: "Smuggle the parts. Pay 5x. Use front companies.",
                effects: { personalWealth: -8, treasury: -200, elite: -5, anger: 15 },
                addToPool: ["smuggling_networks", "price_gouging", "quality_problems", "sanctions_violations"]
            },
            {
                text: "Accept obsolescence. Use old Soviet equipment. Downgrade.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 30 },
                addToPool: ["technological_regression", "1980s_redux", "falling_standards", "safety_compromised"]
            },
            {
                text: "Force China to sell you everything. Pay whatever it takes.",
                effects: { personalWealth: 0, treasury: -300, elite: 0, anger: 20 },
                addToPool: ["china_bailout", "unfavorable_terms", "debt_trap", "dependency_deepens"]
            }
        ]
    },
    {
        id: "financial_system_crisis",
        title: "Bank Run",
        description: "Rumors spread that banks are insolvent. ATMs run out of cash. Lines stretch for blocks. Your central bank is burning through reserves trying to stabilize the currency. Three regional banks collapsed this week. Contagion is spreading. This could be 1998 all over again, but worse.",
        weight: 8,
        conditions: { hasTriggered: ["swift_disconnection"], treasury: 400 },
        onceOnly: true,
        choices: [
            {
                text: "Bank bailouts. Print money if needed. Stop the panic.",
                effects: { personalWealth: 0, treasury: -400, elite: 10, anger: 25 },
                addToPool: ["hyperinflation_risk", "currency_collapse", "money_printing_spiral", "savings_destroyed"]
            },
            {
                text: "Limit withdrawals. Capital controls. Freeze accounts.",
                effects: { personalWealth: 0, treasury: -50, elite: -15, anger: 50 },
                addToPool: ["frozen_savings", "rage_at_government", "deposit_confiscation", "trust_destroyed"]
            },
            {
                text: "Let weak banks fail. Only protect state banks.",
                effects: { personalWealth: 0, treasury: -150, elite: -20, anger: 40 },
                addToPool: ["financial_chaos", "savings_lost", "bank_collapse_cascade", "economic_meltdown"]
            }
        ]
    },
    {
        id: "china_bailout",
        title: "The Dragon's Terms",
        description: "China will help. But their terms are steep: 25-year gas contracts at 40% below market price. Access to your Arctic resources. Military base rights in Central Asia. Yuan-denominated debt. Technology transfers. You need them more than they need you, and they know it.",
        weight: 7,
        conditions: { hasTriggered: ["sanctions_incoming"], treasury: 500 },
        onceOnly: true,
        choices: [
            {
                text: "Accept everything. Survival first. We'll renegotiate later. (Lie)",
                effects: { personalWealth: 0, treasury: 300, elite: 5, anger: -10 },
                addToPool: ["chinese_dependency", "vassal_state_warnings", "sovereignty_concerns", "long_term_trap"]
            },
            {
                text: "Negotiate harder. Get better terms. We have leverage too.",
                effects: { personalWealth: 0, treasury: 150, elite: 0, anger: 0 },
                addToPool: ["chinese_negotiations", "better_deal", "mutual_respect", "bargaining_success"]
            },
            {
                text: "Reject. We won't be Beijing's vassal. Find another way.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 15 },
                addToPool: ["isolated_completely", "economic_crisis_deepens", "no_friends", "pride_costs"]
            }
        ]
    },
    {
        id: "economic_adaptation",
        title: "The New Normal",
        description: "Two years into sanctions, you've adapted. Gray market imports through Central Asia. Chinese payment systems. Parallel SWIFT systems with friendly nations. It's not prosperity, but it's survival. Your economy is now a sanctions-evasion machine. The West didn't break you. Yet.",
        weight: 5,
        conditions: { hasTriggered: ["sanctions_incoming"], year: 3 },
        onceOnly: true,
        choices: [
            {
                text: "Claim victory. 'We're sanctions-proof now.' Propaganda.",
                effects: { personalWealth: 0, treasury: -100, elite: 10, anger: -10 },
                legacy: { icon: "🛡️", name: "Sanctions Survivor", weight: 8 },
                addToPool: ["false_confidence", "hidden_fragility", "propaganda_victory"]
            },
            {
                text: "Keep building alternatives. BRICS currency. New systems.",
                effects: { personalWealth: 0, treasury: -200, elite: 5, anger: 10 },
                addToPool: ["alternative_order", "multipolarity", "brics_expansion", "long_game"]
            },
            {
                text: "Quietly seek sanctions relief. The war costs too much.",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: 0 },
                addToPool: ["sanctions_relief_talks", "backroom_deals", "concessions_needed", "realism_sets_in"]
            }
        ]
    },
    {
        id: "sanctions_relief_talks",
        title: "The Sanctions Off-Ramp",
        description: "Secret talks with Western intermediaries. They'll lift some sanctions if you withdraw partially, release some political prisoners, make vague commitments about the future. It's not much, but your economy is dying. Your elite want relief. Do you swallow your pride?",
        weight: 6,
        conditions: { hasTriggered: ["sanctions_incoming"], year: 2 },
        onceOnly: true,
        choices: [
            {
                text: "Accept. Make the concessions. Get sanctions relief.",
                effects: { personalWealth: 0, treasury: 200, elite: -10, anger: -20 },
                addToPool: ["hardliner_rage", "nationalist_betrayal", "economic_recovery", "partial_victory"]
            },
            {
                text: "Accept but don't comply. Promise everything, deliver nothing.",
                effects: { personalWealth: 0, treasury: 50, elite: 5, anger: -5 },
                addToPool: ["sanctions_snap_back", "credibility_lost", "worse_than_before", "trust_destroyed"]
            },
            {
                text: "Reject. No surrender. We'll endure.",
                effects: { personalWealth: 0, treasury: -100, elite: 10, anger: 20 },
                addToPool: ["endless_sanctions", "permanent_isolation", "siege_mentality", "economic_decline_continues"]
            }
        ]
    },
    {
        id: "sanctions_escalation",
        title: "Maximum Pressure",
        description: "They're escalating. Oil price cap at $60/barrel. Complete tech embargo. Financial sanctions on every major bank. Threatening secondary sanctions on any nation helping you. This is economic strangulation. Your finance minister says the treasury can last 18 months at this rate. Then what?",
        weight: 7,
        conditions: { hasTriggered: ["war_crimes_allegations", "territorial_annexation"] },
        onceOnly: true,
        choices: [
            {
                text: "Sell oil at any price. Survival over profit.",
                effects: { personalWealth: -5, treasury: -150, elite: 0, anger: 15 },
                addToPool: ["discount_oil", "lost_revenue", "chinese_leverage", "fire_sale"]
            },
            {
                text: "Cut oil production. Drive up global prices. Hurt them back.",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 25 },
                addToPool: ["energy_weapon", "global_pain", "blowback", "price_spike"]
            },
            {
                text: "Emergency austerity. Cut all spending. Prepare for siege.",
                effects: { personalWealth: 0, treasury: 100, elite: -15, anger: 45 },
                addToPool: ["austerity_rage", "pension_cuts", "social_collapse_risk", "survival_mode"]
            }
        ]
    }
];
