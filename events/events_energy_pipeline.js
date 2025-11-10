// The Oligarch's Gambit - v1.3
// Energy & Pipeline Politics
// 12 events

const ENERGY_PIPELINE_EVENTS = [
    {
        id: "gas_pipeline_deal",
        title: "The Pipeline Opportunity",
        description: "A $50 billion natural gas pipeline deal is on the table. European customers are desperate for energy. Your 23-year-old nephew just incorporated a 'consulting firm' last week. The state could use the revenue, but your Swiss accounts could use it more.",
        weight: 8,
        conditions: {},
        onceOnly: true,
        choices: [
            {
                text: "Route it through the nephew. He 'earned' this.",
                effects: { personalWealth: 12, treasury: -50, elite: 5, anger: 15 },
                legacy: { icon: "👨‍👦", name: "Family First", weight: 3 }
            },
            {
                text: "Take 10%, fill the treasury with the rest.",
                effects: { personalWealth: 5, treasury: 200, elite: 10, anger: -5 }
            }
        ]
    },
    {
        id: "gas_leverage",
        title: "Energy Diplomacy",
        description: "Europe depends on your natural gas for heating and power. Winter is coming. Germany, France, Italy—they're all vulnerable. You could shut off Nord Stream and watch them freeze until they lift sanctions. Or triple prices. Or play the long game.",
        weight: 7,
        conditions: {},
        onceOnly: true,
        choices: [
            {
                text: "Cut the gas. Winter is coming. Let them beg.",
                effects: { personalWealth: -5, treasury: -150, elite: 10, anger: 5 },
                legacy: { icon: "❄️", name: "Ice King", weight: 8 },
                addToPool: ["international_sanctions"]
            },
            {
                text: "Triple the price. $2,000 per cubic meter. Take it or freeze.",
                effects: { personalWealth: 15, treasury: 300, elite: 10, anger: 5 }
            },
            {
                text: "Honor contracts. Maintain reliable supply. Long game.",
                effects: { personalWealth: 5, treasury: 150, elite: 0, anger: 0 }
            }
        ]
    },
    {
        id: "pipeline_sabotage",
        title: "The Mysterious Explosion",
        description: "Your undersea pipeline just exploded in international waters. Seismographs recorded two massive underwater blasts. Gas is bubbling to the surface. $15 billion in infrastructure destroyed. European gas prices spiked 400%. Everyone's pointing fingers: the Americans, the Ukrainians, saboteurs, environmental activists. Or maybe... you did it yourself to lock in high prices?",
        weight: 9,
        conditions: { hasTriggered: ["gas_pipeline_deal"] },
        onceOnly: true,
        choices: [
            {
                text: "Blame the Americans. Demand UN investigation. Rally the nation.",
                effects: { personalWealth: 0, treasury: -100, elite: 10, anger: 20 }
            },
            {
                text: "Stay silent. Let conspiracy theories flourish. Prices stay high.",
                effects: { personalWealth: 12, treasury: 80, elite: 5, anger: 15 }
            },
            {
                text: "Offer to rebuild—for triple the original cost.",
                effects: { personalWealth: 8, treasury: -200, elite: 0, anger: 10 },
                addToPool: ["pipeline_construction_scandal"]
            }
        ]
    },
    {
        id: "european_energy_crisis",
        title: "Europe Shivers",
        description: "Germany's factories are shutting down from energy shortages. France is rationing heating. Italy's economy is contracting 8%. European leaders are desperate. They're offering to ease sanctions, recognize your territorial claims, anything for gas. The EU is fracturing over energy policy. You hold all the cards this winter.",
        weight: 8,
        conditions: { hasTriggered: ["gas_leverage"] },
        onceOnly: true,
        choices: [
            {
                text: "Maximum extraction. Bleed them for every concession possible.",
                effects: { personalWealth: 20, treasury: 350, elite: 15, anger: 5 },
                legacy: { icon: "🔥", name: "Energy Weapon", weight: 16 }
            },
            {
                text: "Partial relief. Turn gas back on at 3x price. No political concessions.",
                effects: { personalWealth: 15, treasury: 280, elite: 10, anger: 0 }
            },
            {
                text: "Humanitarian gesture. Restore 50% capacity for hospitals, heating. Long game.",
                effects: { personalWealth: 5, treasury: 100, elite: 0, anger: -10 }
            }
        ]
    },
    {
        id: "opec_plus_meeting",
        title: "The Cartel Convenes",
        description: "OPEC+ meeting in Vienna. The Saudis want production cuts to keep prices high. The Emirates want to pump more. The Americans are threatening everyone. You control 18% of global gas exports. Your vote decides whether oil hits $150/barrel or crashes to $60. The Saudis sent a $2B 'consulting contract' to your shell company as encouragement.",
        weight: 7,
        conditions: { treasury: 200 },
        onceOnly: true,
        choices: [
            {
                text: "Side with Saudis. Production cuts. Take the $2B. Prices soar.",
                effects: { personalWealth: 10, treasury: 220, elite: 10, anger: 20 }
            },
            {
                text: "Flood the market. Undercut everyone. Grab market share.",
                effects: { personalWealth: 8, treasury: 180, elite: 5, anger: 10 }
            },
            {
                text: "Play both sides. Promise Saudis cuts, pump secretly, pocket difference.",
                effects: { personalWealth: 15, treasury: 250, elite: 0, anger: 15 }
            }
        ]
    },
    {
        id: "gas_for_rubles",
        title: "The Currency Weapon",
        description: "Your central bank is under attack. The ruble is collapsing. You announce: all gas sales must be paid in rubles, not euros. It forces Europeans to buy rubles, propping up your currency. The EU calls it 'blackmail.' The IMF says it violates contracts. But what are they going to do, freeze in the dark?",
        weight: 8,
        conditions: { hasTriggered: ["gas_leverage"] },
        onceOnly: true,
        choices: [
            {
                text: "Enforce it strictly. No rubles, no gas. Total currency warfare.",
                effects: { personalWealth: 5, treasury: 280, elite: 15, anger: 10 },
                addToPool: ["european_energy_crisis"]
            },
            {
                text: "Carve out exceptions for 'friendly' countries. Divide them.",
                effects: { personalWealth: 8, treasury: 200, elite: 10, anger: 5 }
            },
            {
                text: "Threaten but don't enforce. Psychological pressure, maintain flexibility.",
                effects: { personalWealth: 3, treasury: 120, elite: 5, anger: 0 }
            }
        ]
    },
    {
        id: "alternative_energy_routes",
        title: "The Chinese Pivot",
        description: "Europe's cutting you off, but China's hungry for energy. They're offering a $280 billion deal for a mega-pipeline to Beijing. Problem: you'd be totally dependent on one customer. They'll negotiate brutal terms. The pipeline crosses 3,000 miles of permafrost. It'll take 8 years to build. But it's your future.",
        weight: 7,
        conditions: { hasTriggered: ["sanctions_incoming"] },
        onceOnly: true,
        choices: [
            {
                text: "Sign it. China's the future anyway. Europe's finished.",
                effects: { personalWealth: 12, treasury: -350, elite: 10, anger: 15 },
                legacy: { icon: "🐉", name: "Dragon's Partner", weight: 8 },
                addToPool: ["chinese_dependence"]
            },
            {
                text: "Negotiate hard. Play India against China for better terms.",
                effects: { personalWealth: 8, treasury: -250, elite: 5, anger: 10 }
            },
            {
                text: "Reject. Keep Europe as primary customer despite tensions.",
                effects: { personalWealth: 0, treasury: 50, elite: -10, anger: 5 }
            }
        ]
    },
    {
        id: "lng_terminal_race",
        title: "The LNG Gambit",
        description: "Americans are building LNG terminals to ship gas to Europe, undercutting your pipelines. Qatar is ramping up exports. Your monopoly is ending. Your energy minister says you need to invest $80 billion in LNG technology to compete, or offer Europe such deep discounts that LNG isn't competitive. Your market share is slipping.",
        weight: 6,
        conditions: { hasTriggered: ["gas_leverage"] },
        onceOnly: true,
        choices: [
            {
                text: "Massive LNG investment. Compete directly with US suppliers.",
                effects: { personalWealth: -15, treasury: -350, elite: -5, anger: 15 }
            },
            {
                text: "Price war. Cut gas prices 40%. Bankrupt the LNG terminals.",
                effects: { personalWealth: -8, treasury: -180, elite: 5, anger: 0 }
            },
            {
                text: "Accept reduced market share. Focus on Asia. Europe's lost anyway.",
                effects: { personalWealth: 0, treasury: -80, elite: -10, anger: 5 },
                addToPool: ["alternative_energy_routes"]
            }
        ]
    },
    {
        id: "arctic_oil_discovery",
        title: "Black Gold in the Arctic",
        description: "Geological surveys found a massive oil field in the Arctic: 20 billion barrels, maybe more. The Americans claim it's in disputed waters. Extraction would cost $120 billion and destroy fragile ecosystems. But it would make you the world's largest oil producer. Environmental groups are already protesting. The defense minister says we need to militarize the Arctic to protect it.",
        weight: 7,
        conditions: { treasury: 300 },
        onceOnly: true,
        choices: [
            {
                text: "Full extraction. Militarize the Arctic. Plant the flag. Drill.",
                effects: { personalWealth: 25, treasury: -450, elite: 15, anger: 20 },
                legacy: { icon: "🛢️", name: "Arctic Baron", weight: 14 },
                addToPool: ["arctic_militarization", "environmental_catastrophe"]
            },
            {
                text: "Limited extraction. Joint venture with Western oil companies.",
                effects: { personalWealth: 15, treasury: -200, elite: 5, anger: 10 }
            },
            {
                text: "Leave it in the ground. Too risky, too expensive, climate optics terrible.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -15 }
            }
        ]
    },
    {
        id: "climate_pressure",
        title: "The Green Transition",
        description: "Europe's accelerating away from fossil fuels. They're investing $2 trillion in renewables. Your energy exports are projected to drop 40% by 2030. Your entire economy is built on oil and gas. The finance minister is panicking. Diversification would cost trillions you don't have. The petro-state model is dying.",
        weight: 6,
        conditions: { year: 4 },
        onceOnly: true,
        choices: [
            {
                text: "Climate denial. Double down on oil. It's a hoax anyway.",
                effects: { personalWealth: 5, treasury: 80, elite: 10, anger: 15 }
            },
            {
                text: "Massive green investment. Pivot to renewables, hydrogen, nuclear.",
                effects: { personalWealth: -20, treasury: -600, elite: -15, anger: -20 }
            },
            {
                text: "Milk the dying cow. Extract maximum profit before transition.",
                effects: { personalWealth: 15, treasury: 120, elite: 5, anger: 10 },
                legacy: { icon: "🛢️", name: "Stranded Assets", weight: -15 }
            }
        ]
    },
    {
        id: "pipeline_construction_scandal",
        title: "The Pipeline to Nowhere",
        description: "Your nephew's construction firm won the $18 billion pipeline rebuild contract. Two years in, only 12% is complete. Costs have tripled. Investigators found that 60% of the budget went to phantom subcontractors—all linked to your family. The pipeline may never be finished. The Europeans are demanding their deposits back.",
        weight: 7,
        conditions: { hasTriggered: ["pipeline_sabotage"] },
        onceOnly: true,
        choices: [
            {
                text: "Kill the investigation. Arrest the investigators. Complete the grift.",
                effects: { personalWealth: 22, treasury: -200, elite: -10, anger: 25 }
            },
            {
                text: "Scapegoat the nephew. Jail him. Seize his assets. (Give them back later)",
                effects: { personalWealth: 8, treasury: 60, elite: 5, anger: -10 }
            },
            {
                text: "Actually finish the pipeline. Competent contractors. Salvage reputation.",
                effects: { personalWealth: -5, treasury: -280, elite: -5, anger: -15 }
            }
        ]
    },
    {
        id: "strategic_reserve_depletion",
        title: "The Empty Tanks",
        description: "Your strategic petroleum reserve is nearly empty. You sold it off over the years to plug budget holes and pocket the difference. A leaked report shows reserves are at 15% when they should be 95%. If there's an energy shock or supply disruption, the economy collapses immediately. The energy minister who wrote the report just resigned.",
        weight: 6,
        conditions: { personalWealth: 30 },
        onceOnly: true,
        choices: [
            {
                text: "Classify all reserve data. Kill the story. 'National security.'",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 15 }
            },
            {
                text: "Emergency refill. $80B purchase at current high prices. (Painful)",
                effects: { personalWealth: -10, treasury: -350, elite: -10, anger: 5 }
            },
            {
                text: "Blame the previous administration. Appoint investigation. Delay.",
                effects: { personalWealth: 0, treasury: -40, elite: 0, anger: 10 }
            }
        ]
    }
];


