// The Oligarch's Gambit - v1.3
// War & Military Operations
// 29 events

const WAR_MILITARY_EVENTS = [
    {
        id: "special_operation_proposal",
        title: "A Neighboring Territory",
        description: "Your generals present invasion plans for a neighboring state. Intelligence says their military is weak, the operation will take 72 hours maximum. The defense contractors are salivating. Your state media has already prepared the narrative: we're liberating oppressed ethnic minorities from a Nazi regime.",
        onceOnly: true,
        weight: 10,
        storyline: "war_military",
        conditions: {},
        choices: [
            {
                text: "Launch the invasion. Annex their resources.",
                effects: { personalWealth: -2, treasury: -200, elite: 15, anger: 30 },
                legacy: { icon: "⚔️", name: "Liberator", weight: 12 },
                addToPool: ["war_goes_badly", "war_profiteering", "conscription_crisis"]
            },
            {
                text: "Delay. Bleed the generals for kickbacks first.",
                effects: { personalWealth: 3, treasury: 0, elite: -10, anger: 5 }
            },
            {
                text: "Reject it. The West's sanctions would cripple us.",
                effects: { personalWealth: 0, treasury: 20, elite: -15, anger: -10 },
                addToPool: ["nationalist_backlash"]
            }
        ]
    },
    {
        id: "war_profiteering",
        title: "Defense Contracts",
        description: "The war needs supplies: body armor, rations, ammunition, vehicles. Your childhood friend owns a defense contractor. His body armor fails ballistic tests. His rations gave soldiers food poisoning. But he's offering 40% of a $10 billion contract directly to your Cyprus account.",
        weight: 8,
        storyline: "war_military",
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept the deal. Soldiers die in war anyway.",
                effects: { personalWealth: 18, treasury: -100, elite: 10, anger: 15 },
                legacy: { icon: "💸", name: "War Profiteer", weight: -15 },
                addToPool: ["military_disaster"]
            },
            {
                text: "Accept but demand he fixes quality. Take 15%.",
                effects: { personalWealth: 8, treasury: -60, elite: 5, anger: 5 }
            },
            {
                text: "Reject. Use competent suppliers. The war must succeed.",
                effects: { personalWealth: 0, treasury: -80, elite: -10, anger: 0 }
            }
        ]
    },
    {
        id: "nationalist_backlash",
        title: "The Hardliners Revolt",
        description: "The ultranationalists are furious you rejected the invasion. They're calling you a coward and a Western puppet. Their leader is a popular ex-general with 500k followers. He's staging rallies, burning your effigy. Some active-duty generals are quietly sympathetic. This could turn into a coup.",
        weight: 8,
        storyline: "war_military",
        conditions: { hasTriggered: ["nationalist_backlash"] },
        onceOnly: true,
        choices: [
            {
                text: "Arrest him and his lieutenants. 15-year sentences for treason.",
                effects: { personalWealth: 0, treasury: -20, elite: -15, anger: 20 }
            },
            {
                text: "Co-opt him. Deputy Defense Minister. Neutralize with status.",
                effects: { personalWealth: -1, treasury: -40, elite: 5, anger: 10 }
            },
            {
                text: "Fine. Limited 'peacekeeping operation.' Just the border region.",
                effects: { personalWealth: -3, treasury: -180, elite: 10, anger: 25 },
                addToPool: ["war_goes_badly"]
            }
        ]
    },
    {
        id: "war_goes_badly",
        title: "The 72-Hour War: Day 47",
        description: "Your generals promised 72 hours. It's been 47 days. The capital hasn't fallen. Your tanks are stuck in mud. Javelin missiles destroyed 450 vehicles. Generals are lying about casualties. Actual dead: 8,000. Official count: 498. Mothers are calling. The coffins keep coming. The defense minister says we need more troops, more time, more everything.",
        weight: 10,
        storyline: "war_military",
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Escalate. Full invasion. Mobilize reserves. Flatten cities.",
                effects: { personalWealth: -5, treasury: -400, elite: -10, anger: 40 },
                addToPool: ["conscription_crisis", "war_crimes_allegations", "mobilization_announcement"]
            },
            {
                text: "Dig in. Limited objectives. Hold what we have, claim victory.",
                effects: { personalWealth: -3, treasury: -200, elite: 5, anger: 25 },
                addToPool: ["frozen_conflict", "partisan_resistance"]
            },
            {
                text: "Negotiate. Blame the generals. Seek face-saving exit.",
                effects: { personalWealth: 0, treasury: -100, elite: -20, anger: -15 },
                addToPool: ["negotiated_settlement", "nationalist_backlash"]
            }
        ]
    },
    {
        id: "conscription_crisis",
        title: "The Mobilization",
        description: "The military needs 300,000 more troops. Your defense minister wants partial mobilization. Problem: the word 'mobilization' hasn't been used since 1941. It will cause panic. Men are already fleeing to Georgia, Kazakhstan, Finland. Border crossings are jammed. Flights out are $5,000 and sold out for weeks.",
        weight: 9,
        storyline: "war_military",
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Full mobilization. Every man 18-60. Close the borders.",
                effects: { personalWealth: 0, treasury: -350, elite: -15, anger: 60 },
                addToPool: ["elite_sons_fleeing", "mass_protest_mobilization"]
            },
            {
                text: "'Partial' mobilization. Target ethnic minorities and poor regions.",
                effects: { personalWealth: 0, treasury: -250, elite: 5, anger: 35 },
                addToPool: ["ethnic_tensions"]
            },
            {
                text: "Pay mercenaries. Private military companies. No conscription.",
                effects: { personalWealth: -8, treasury: -300, elite: 10, anger: 15 },
                addToPool: ["wagner_mutiny"]
            }
        ]
    },
    {
        id: "war_crimes_allegations",
        title: "The Massacre",
        description: "Satellite photos show mass graves. 400+ civilian bodies in streets. Hands bound. Execution-style. The photos are everywhere: BBC, CNN, Al Jazeera. The UN Security Council is meeting. The prosecutor at The Hague is opening an investigation. Your defense minister says it was the enemy staging fake bodies. Nobody believes him.",
        weight: 8,
        storyline: "war_military",
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Deny everything. Western propaganda. Staged by actors.",
                effects: { personalWealth: 0, treasury: -40, elite: 5, anger: 20 },
                addToPool: ["international_tribunal"]
            },
            {
                text: "Blame rogue units. Court-martial some junior officers.",
                effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 10 }
            },
            {
                text: "Defiant: 'This is war. Casualties happen. We make no apologies.'",
                effects: { personalWealth: 0, treasury: -20, elite: 15, anger: 25 },
                legacy: { icon: "⚰️", name: "War Criminal", weight: -30 },
                addToPool: ["international_tribunal", "sanctions_escalation"]
            }
        ]
    },
    {
        id: "bridge_strike",
        title: "The Bridge Explodes",
        description: "The Kerch Bridge—your $4 billion prestige project connecting the mainland to occupied Crimea—just exploded. Massive truck bomb. The railway section collapsed into the sea. It's a humiliating blow. Military supplies can't get through. Your generals are screaming for retaliation. Social media is celebrating.",
        weight: 8,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Massive retaliation. Target their power grid. No electricity.",
                effects: { personalWealth: 0, treasury: -80, elite: 15, anger: 15 },
                addToPool: ["energy_infrastructure_war"]
            },
            {
                text: "Precision strikes. Military targets only. Show restraint.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 10 }
            },
            {
                text: "Rebuild the bridge. Stronger. Use it as propaganda victory.",
                effects: { personalWealth: -4, treasury: -200, elite: 10, anger: 10 }
            }
        ]
    },
    {
        id: "elite_sons_fleeing",
        title: "The Patriotic Elite",
        description: "Your mobilization decree went live. Within 24 hours, private jets carried 87 sons of oligarchs, ministers, and generals out of the country. The FSB chief's son is in Dubai. The defense minister's son has a sudden 'heart condition.' The propaganda chief's son is now studying in Switzerland. Meanwhile, poor farmers' sons are getting drafted at gunpoint.",
        weight: 7,
        conditions: { hasTriggered: ["conscription_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Publicize it. Name and shame. No one is exempt! (Lie)",
                effects: { personalWealth: 0, treasury: 0, elite: -20, anger: 10 }
            },
            {
                text: "Ignore it. The elite must maintain morale. Different rules.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 }
            },
            {
                text: "One token arrest. Minister's son. Show trial. He serves 2 months.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -10 }
            }
        ]
    },
    {
        id: "wagner_mutiny",
        title: "The Chef's Rebellion",
        description: "Your favorite mercenary warlord—the ex-convict caterer who runs Wagner PMC—just seized a major military headquarters. His forces are rolling toward Moscow. He's on Telegram calling you a coward and a thief. He has 25,000 battle-hardened troops. Some regular army units are joining him. This is a coup attempt.",
        weight: 12,
        conditions: { hasTriggered: ["conscription_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Negotiate. Promise him anything. Then eliminate him later.",
                effects: { personalWealth: -3, treasury: -80, elite: -15, anger: 20 },
                addToPool: ["wagner_leader_death"]
            },
            {
                text: "Full military response. Bomb the convoy. End this now.",
                effects: { personalWealth: 0, treasury: -120, elite: -20, anger: 25 },
                legacy: { icon: "🔪", name: "Chef Killer", weight: -12 },
                addToPool: ["military_fragmentation"]
            },
            {
                text: "Let him march. Wait for him to stall. Internal pressure stops him.",
                effects: { personalWealth: 0, treasury: -40, elite: -10, anger: 15 }
            }
        ]
    },
    {
        id: "nuclear_threats",
        title: "The Nuclear Option",
        description: "You're losing. Territory is slipping. NATO is supplying advanced weapons. Your generals are whispering: tactical nuclear weapons. Small yield. Battlefield use. It would shock the world. End the stalemate. The West would have to respond, but how? Your nuclear briefcase is in the next room. Your hand trembles.",
        weight: 9,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Nuclear demonstration. Unpopulated area. Show we're serious.",
                effects: { personalWealth: 0, treasury: -100, elite: -20, anger: 50 },
                legacy: { icon: "☢️", name: "Nuclear Brinkmanship", weight: -25 },
                addToPool: ["nuclear_escalation_crisis"]
            },
            {
                text: "Threaten only. Raise alert level. Move warheads. Psychological warfare.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 30 }
            },
            {
                text: "Reject. Even I have lines I won't cross. (For now)",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: 10 }
            }
        ]
    },
    {
        id: "territorial_annexation",
        title: "Annexation Referendum",
        description: "You control 20% of their territory. Your political technologists stage referendums in occupied zones. Result: 97% vote to join you. International observers weren't invited. Videos show soldiers watching voting. Western media calls it a sham. You're planning a grand ceremony to formally annex the territory and redraw maps.",
        weight: 8,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Grand annexation ceremony. Sign the documents. History is made!",
                effects: { personalWealth: 0, treasury: -100, elite: 20, anger: 20 },
                legacy: { icon: "🗺️", name: "Conqueror", weight: 25 },
                addToPool: ["permanent_occupation"]
            },
            {
                text: "Annex but keep it quiet. No ceremony. Fait accompli.",
                effects: { personalWealth: 0, treasury: -60, elite: 10, anger: 15 }
            },
            {
                text: "Wait. Use as negotiating leverage for peace talks.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 10 },
                addToPool: ["negotiated_settlement"]
            }
        ]
    },
    {
        id: "partisan_resistance",
        title: "Ghosts in the Occupation",
        description: "Occupied territories are bleeding you dry. Partisans blow up supply convoys weekly. Your soldiers are shot by snipers at checkpoints. Every collaborator you install gets assassinated within months. You're spending $8 billion monthly just to hold territory. The locals hate you. Every house could hide a fighter.",
        weight: 7,
        conditions: { hasTriggered: ["territorial_annexation", "war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Brutal pacification. Collective punishment. Mass arrests.",
                effects: { personalWealth: 0, treasury: -120, elite: 5, anger: 20 },
                addToPool: ["war_crimes_allegations"]
            },
            {
                text: "Hearts and minds. Invest in infrastructure. Buy loyalty.",
                effects: { personalWealth: -4, treasury: -200, elite: 0, anger: 15 }
            },
            {
                text: "Withdraw to defensible lines. Cut losses. Fortress strategy.",
                effects: { personalWealth: 0, treasury: -80, elite: -15, anger: 10 },
                addToPool: ["frozen_conflict"]
            }
        ]
    },
    {
        id: "negotiated_settlement",
        title: "Peace Talks",
        description: "Backchannel negotiations in Istanbul. Turkey is mediating. The West wants you out of all occupied territory. You want sanctions lifted and recognition of Crimea. Neither side will budge. Your military is exhausted. Their resistance is Western-supplied. This war could drag on for years. Or you could compromise.",
        weight: 8,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Ceasefire. Freeze current lines. Korea-style armistice.",
                effects: { personalWealth: 0, treasury: -100, elite: 0, anger: -20 },
                legacy: { icon: "🕊️", name: "Frozen War", weight: -8 },
                addToPool: ["frozen_conflict"]
            },
            {
                text: "Trade territory for sanctions relief. Pragmatic retreat.",
                effects: { personalWealth: 5, treasury: 200, elite: -15, anger: -15 },
                legacy: { icon: "📉", name: "Strategic Retreat", weight: -5 }
            },
            {
                text: "Walk away from talks. We fight until total victory.",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 35 },
                addToPool: ["catastrophic_defeat", "pyrrhic_victory"]
            }
        ]
    },
    {
        id: "pyrrhic_victory",
        title: "Victory Day",
        description: "After 18 months, it's over. You captured the capital. Their government fled. You control the territory. Cost: 47,000 dead soldiers, $400 billion, permanent sanctions, and international pariah status. The victory parade has 5,000 troops—most are wounded or fresh conscripts. The economy is in ruins. Mothers weep. The West will never forgive. But you won.",
        weight: 9,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Grand victory celebration. Medals for everyone. Rewrite history.",
                effects: { personalWealth: 0, treasury: -150, elite: 15, anger: 30 },
                legacy: { icon: "💀", name: "Pyrrhic Victor", weight: -18 }
            },
            {
                text: "Modest observance. The cost was high. Honor the dead.",
                effects: { personalWealth: 0, treasury: -60, elite: 5, anger: 20 }
            }
        ]
    },
    {
        id: "frozen_conflict",
        title: "The New Normal",
        description: "Three years since the invasion. Lines haven't moved in 18 months. You control 18% of their territory. They've rebuilt with Western money. Your economy adapted to sanctions. Occasional shelling. Occasional drone strikes. No negotiations. No resolution. Just... frozen. A permanent wound. Thousands dead for a stalemate.",
        weight: 6,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept it. Build defenses. This is the new border.",
                effects: { personalWealth: 0, treasury: -100, elite: 5, anger: 10 },
                legacy: { icon: "🧊", name: "Stalemate Architect", weight: -10 }
            },
            {
                text: "One more push. Break the stalemate. Mobilize again.",
                effects: { personalWealth: -5, treasury: -400, elite: -15, anger: 50 },
                addToPool: ["catastrophic_defeat"]
            }
        ]
    },
    {
        id: "catastrophic_defeat",
        title: "The Rout",
        description: "It's a disaster. Your offensive collapsed within 72 hours. Counter-offensive broke through multiple lines. They recaptured major cities. Soldiers are surrendering en masse. Equipment abandoned. Generals can't reach you—they're in hiding. The defense minister committed suicide. The military is fractured. The elite are panicking. The end is near.",
        weight: 10,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Immediate ceasefire. Accept any terms. Survive at all costs.",
                effects: { personalWealth: -10, treasury: -200, elite: -25, anger: -20 },
                legacy: { icon: "🏳️", name: "The Defeated", weight: -28 }
            },
            {
                text: "Scorched earth. If I lose, everyone loses. Destroy everything.",
                effects: { personalWealth: -5, treasury: -300, elite: -30, anger: 60 },
                legacy: { icon: "🔥", name: "Scorched Earth", weight: -35 }
            },
            {
                text: "Flee. Exile. Take the money and run to Minsk or Dubai.",
                effects: { personalWealth: 0, treasury: -500, elite: -40, anger: -30 }
            }
        ]
    },
    {
        id: "mass_protest_mobilization",
        title: "The Mothers March",
        description: "100,000 mothers and wives are marching. They want their sons back. Their husbands. Their brothers. 'Not one more coffin.' Spreading from the capital to 50 cities. These aren't political activists—these are ordinary women who've lost everything. The police are hesitant to beat grieving mothers on camera.",
        weight: 8,
        conditions: { hasTriggered: ["conscription_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Mass arrests. All of them. 20,000 detained nationwide.",
                effects: { personalWealth: 0, treasury: -60, elite: -10, anger: 45 }
            },
            {
                text: "Promise to bring the boys home. (Lie). Buy time.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 15 }
            },
            {
                text: "Limited rotation. Bring back 10,000. Send 10,000 fresh troops.",
                effects: { personalWealth: 0, treasury: -80, elite: -5, anger: -10 }
            }
        ]
    },
    {
        id: "breakaway_province",
        title: "The Breakaway Province",
        description: "Your resource-rich southern province just declared independence. Population: 4 million. They control 40% of your oil refineries and a major seaport. Their 'president' is a former general you purged 5 years ago. Ethnic tensions have been simmering for decades. They've seized government buildings. Your generals say the military can retake it in 2 weeks. Analysts say it'll be Chechnya 2.0.",
        weight: 9,
        conditions: { anger: 35, year: 2 },
        onceOnly: true,
        choices: [
            {
                text: "Full military assault. No negotiations with traitors.",
                effects: { personalWealth: 0, treasury: -280, elite: 10, anger: 35 },
                addToPool: ["urban_warfare_separatist", "separatist_referendum"]
            },
            {
                text: "Blockade the province. Cut power, water, food. Strangle them.",
                effects: { personalWealth: 0, treasury: -120, elite: 5, anger: 30 },
                addToPool: ["humanitarian_crisis_separatist", "international_condemnation"]
            },
            {
                text: "Negotiate. Offer expanded autonomy. Keep them in the federation.",
                effects: { personalWealth: 0, treasury: -80, elite: -15, anger: -10 },
                addToPool: ["autonomy_negotiations"]
            }
        ]
    },
    {
        id: "urban_warfare_separatist",
        title: "Street by Street",
        description: "Your forces entered the provincial capital. Separatists are fighting from apartment buildings, schools, hospitals. Every block is a battle. Snipers everywhere. IEDs hidden in rubble. Civilian casualties mounting. International media is calling it a humanitarian catastrophe. Your generals admit: this will take months, not weeks.",
        weight: 10,
        conditions: { hasTriggered: ["breakaway_province"] },
        onceOnly: true,
        choices: [
            {
                text: "Level it. Artillery, airstrikes, total war. Grozny doctrine.",
                effects: { personalWealth: 0, treasury: -400, elite: 5, anger: 50 },
                legacy: { icon: "💣", name: "City Destroyer", weight: -22 },
                addToPool: ["separatist_insurgency", "war_crimes_allegations"]
            },
            {
                text: "Slow advance. Minimize civilian casualties. Months of grinding war.",
                effects: { personalWealth: 0, treasury: -300, elite: -5, anger: 35 },
                addToPool: ["separatist_insurgency"]
            },
            {
                text: "Withdraw. This is unwinnable. Cut a deal now.",
                effects: { personalWealth: 0, treasury: -100, elite: -20, anger: 10 },
                addToPool: ["autonomy_negotiations"]
            }
        ]
    },
    {
        id: "separatist_referendum",
        title: "The Independence Vote",
        description: "The separatists held a referendum despite your military operation. Result: 89% for independence. International observers from 15 countries validated it. The EU is debating recognition. Turkey already opened a consulate. Your state media calls it illegal and staged. But 3 million people voted under shellfire.",
        weight: 9,
        conditions: { hasTriggered: ["breakaway_province"] },
        onceOnly: true,
        choices: [
            {
                text: "Declare the vote illegal. Double military pressure. No surrender.",
                effects: { personalWealth: 0, treasury: -250, elite: 5, anger: 40 },
                addToPool: ["urban_warfare_separatist"]
            },
            {
                text: "Covert campaign. Assassinate their leaders. Destabilize their 'state.'",
                effects: { personalWealth: -3, treasury: -80, elite: 10, anger: 30 },
                addToPool: ["separatist_terrorism_response"]
            },
            {
                text: "Recognize reality. Negotiate terms of separation. Salvage what we can.",
                effects: { personalWealth: -15, treasury: -200, elite: -25, anger: -15 },
                legacy: { icon: "🕊️", name: "Let Them Go", weight: -12 },
                addToPool: ["negotiated_separation"]
            }
        ]
    },
    {
        id: "humanitarian_crisis_separatist",
        title: "The Siege Tightens",
        description: "Your blockade is in its 4th month. No food, medicine, electricity. Hospitals operating by candlelight. Children dying from preventable diseases. The UN estimates 15,000 civilian deaths from the blockade alone. Humanitarian convoys are blocked at checkpoints. CNN has footage of starving families. The ICC prosecutor is watching.",
        weight: 8,
        conditions: { hasTriggered: ["breakaway_province"] },
        onceOnly: true,
        choices: [
            {
                text: "Maintain the siege. Starvation is a weapon. They'll surrender.",
                effects: { personalWealth: 0, treasury: -60, elite: 5, anger: 25 },
                addToPool: ["war_crimes_allegations"]
            },
            {
                text: "Allow limited humanitarian aid. Not enough to fight, just enough to survive.",
                effects: { personalWealth: 0, treasury: -40, elite: 0, anger: 20 }
            },
            {
                text: "Lift the blockade. The optics are destroying us internationally.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 },
                addToPool: ["autonomy_negotiations"]
            }
        ]
    },
    {
        id: "separatist_insurgency",
        title: "The Endless War",
        description: "You control the cities, they control the countryside. Ambushes kill soldiers weekly. Car bombs target military convoys. Collaborators are executed publicly. You're spending $12 billion annually to hold territory. Veterans are returning traumatized. Mothers are demanding withdrawals. This is Afghanistan, but it's your own country.",
        weight: 7,
        conditions: { hasTriggered: ["urban_warfare_separatist"] },
        onceOnly: true,
        choices: [
            {
                text: "Collective punishment. Villages that harbor rebels get razed.",
                effects: { personalWealth: 0, treasury: -150, elite: 5, anger: 35 },
                addToPool: ["war_crimes_allegations"]
            },
            {
                text: "Counter-insurgency. Buy local loyalty. Win hearts and minds. (Expensive)",
                effects: { personalWealth: -5, treasury: -280, elite: -5, anger: 25 }
            },
            {
                text: "Controlled withdrawal. Defend key infrastructure only. Admit partial defeat.",
                effects: { personalWealth: 0, treasury: -120, elite: -15, anger: 15 },
                addToPool: ["de_facto_independence"]
            }
        ]
    },
    {
        id: "separatist_terrorism_response",
        title: "Retribution",
        description: "Separatist commandos just bombed a concert hall in the capital. 186 dead. 400 wounded. Your FSB claims to have intercepted communications proving the separatist 'government' ordered it. Public is screaming for vengeance. Your interior minister wants mass reprisals. The generals want to restart the full military operation.",
        weight: 9,
        conditions: { hasTriggered: ["separatist_referendum"] },
        onceOnly: true,
        choices: [
            {
                text: "Massive retaliation. Bomb their 'capital.' Kill their leadership.",
                effects: { personalWealth: 0, treasury: -180, elite: 15, anger: -15 },
                addToPool: ["urban_warfare_separatist", "cycle_of_violence"]
            },
            {
                text: "Targeted operations. Special forces. Surgical strikes only.",
                effects: { personalWealth: 0, treasury: -80, elite: 5, anger: 10 }
            },
            {
                text: "Investigate carefully. Avoid cycle of revenge. (Political suicide)",
                effects: { personalWealth: 0, treasury: -40, elite: -20, anger: 25 }
            }
        ]
    },
    {
        id: "autonomy_negotiations",
        title: "The Negotiating Table",
        description: "Secret talks in Geneva. Mediators from Switzerland. The separatists demand: their own parliament, control of oil revenues, their own military, and veto power over federal decisions. You're offering: a regional governor you appoint, 15% of oil revenues, and cultural autonomy. Neither side is budging. The talks could collapse any moment.",
        weight: 8,
        conditions: { hasTriggered: ["breakaway_province"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept their demands. Autonomy is better than independence.",
                effects: { personalWealth: -10, treasury: -150, elite: -20, anger: -20 },
                legacy: { icon: "🤝", name: "Negotiated Autonomy", weight: 5 },
                addToPool: ["autonomous_province"]
            },
            {
                text: "Limited concessions. 30% of revenue, elected governor. Take it or leave it.",
                effects: { personalWealth: -5, treasury: -100, elite: -10, anger: -10 }
            },
            {
                text: "Walk away. These demands are insulting. Resume military operations.",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 35 },
                addToPool: ["urban_warfare_separatist"]
            }
        ]
    },
    {
        id: "negotiated_separation",
        title: "The Velvet Divorce",
        description: "You've agreed to let them go. Terms: they get independence but you keep the major oil fields. You get the port facilities but they get transit rights. $50 billion in disputed assets to split. Citizens can choose citizenship. Military equipment must be divided. It's messy, painful, and humiliating. But the war is over.",
        weight: 8,
        conditions: { hasTriggered: ["separatist_referendum"] },
        onceOnly: true,
        choices: [
            {
                text: "Generous terms. Make this a model for peaceful separation.",
                effects: { personalWealth: -20, treasury: -400, elite: -30, anger: -25 },
                legacy: { icon: "🕊️", name: "Peaceful Divorce", weight: 8 }
            },
            {
                text: "Extract maximum compensation. They pay for every pipe and wire.",
                effects: { personalWealth: 5, treasury: -200, elite: -20, anger: -10 }
            },
            {
                text: "Sabotage on the way out. Destroy infrastructure. Salt the earth.",
                effects: { personalWealth: 0, treasury: -150, elite: -15, anger: 5 },
                legacy: { icon: "🔥", name: "Scorched Departure", weight: -18 }
            }
        ]
    },
    {
        id: "de_facto_independence",
        title: "The Frozen Breakaway",
        description: "They control their territory. You control yours. No formal recognition, but they have their own government, currency, military. You maintain the fiction of sovereignty. They print their own passports. Frozen conflict. A permanent wound. Neither war nor peace. Just a festering border that bleeds money and soldiers.",
        weight: 6,
        conditions: { hasTriggered: ["separatist_insurgency"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept it. De facto independence. Minimize the bleeding.",
                effects: { personalWealth: 0, treasury: -80, elite: -10, anger: 15 },
                legacy: { icon: "❄️", name: "Frozen Breakaway", weight: -14 }
            },
            {
                text: "Occasional raids. Keep them weak. Permanent low-intensity conflict.",
                effects: { personalWealth: 0, treasury: -150, elite: 0, anger: 25 }
            }
        ]
    },
    {
        id: "brutal_reconquest",
        title: "Victory at Any Cost",
        description: "After 3 years of war, you've won. The separatist leaders are dead or fled. Their 'capital' is rubble. You control the territory again. Cost: 28,000 soldiers dead, 80,000 civilians dead, $380 billion spent, the region's economy destroyed for a generation. The population hates you. International condemnation is unanimous. But you won.",
        weight: 8,
        conditions: { hasTriggered: ["urban_warfare_separatist"] },
        onceOnly: true,
        choices: [
            {
                text: "Victory parade. Rebuild as showcase of loyalty. Massive investment.",
                effects: { personalWealth: -15, treasury: -500, elite: 10, anger: 30 },
                legacy: { icon: "🔨", name: "Brutal Reunification", weight: -20 }
            },
            {
                text: "Maintain military occupation. Rule through fear. Minimal investment.",
                effects: { personalWealth: 0, treasury: -200, elite: 5, anger: 45 },
                legacy: { icon: "⛓️", name: "Occupation Master", weight: -25 }
            }
        ]
    },
    {
        id: "autonomous_province",
        title: "The Autonomy Experiment",
        description: "They have their parliament, control resources, fly their flag alongside yours. It's autonomy, not independence. So far it's holding. They're investing oil revenues in infrastructure. No violence in 18 months. But nationalists in your capital are furious—calling you weak. And other regions are now demanding the same deal.",
        weight: 6,
        conditions: { hasTriggered: ["autonomy_negotiations"] },
        onceOnly: true,
        choices: [
            {
                text: "Offer similar autonomy to other restive regions. Federation model.",
                effects: { personalWealth: -8, treasury: -200, elite: -20, anger: -30 }
            },
            {
                text: "This was a one-time deal. No more autonomy for anyone else.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 20 }
            },
            {
                text: "Renege on the deal. Slowly strip their autonomy away.",
                effects: { personalWealth: 0, treasury: 0, elite: 15, anger: 40 },
                addToPool: ["breakaway_province"]
            }
        ]
    },
    {
        id: "cycle_of_violence",
        title: "Blood for Blood",
        description: "Retaliation sparked counter-retaliation. They bombed a school. You bombed a hospital. They attacked a military base. You leveled a neighborhood. Civilians on both sides are traumatized. The cycle is self-sustaining now. Neither side can back down without appearing weak. The violence has its own momentum.",
        weight: 8,
        conditions: { hasTriggered: ["separatist_terrorism_response"] },
        onceOnly: true,
        choices: [
            {
                text: "Escalate to overwhelming force. Break them completely. End it.",
                effects: { personalWealth: 0, treasury: -350, elite: 10, anger: 40 },
                addToPool: ["brutal_reconquest"]
            },
            {
                text: "Maintain current level. Match their violence, no more, no less.",
                effects: { personalWealth: 0, treasury: -180, elite: 5, anger: 30 }
            },
            {
                text: "Unilateral ceasefire. Someone has to stop first. (Seen as weakness)",
                effects: { personalWealth: 0, treasury: -60, elite: -15, anger: 10 },
                addToPool: ["autonomy_negotiations"]
            }
        ]
    }
];


