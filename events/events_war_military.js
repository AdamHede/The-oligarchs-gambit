// The Oligarch's Gambit - v1.6.0
// War & Military Operations
// Redesigned for proper event branching

const WAR_MILITARY_EVENTS = [
    // ========================================
    // ENTRY POINT: The War Begins
    // ========================================
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
                addToPool: ["war_goes_badly", "war_profiteering", "conscription_crisis", "sanctions_incoming"]
            },
            {
                text: "Delay. Bleed the generals for kickbacks first.",
                effects: { personalWealth: 3, treasury: 0, elite: -10, anger: 5 },
                addToPool: ["military_corruption_exposed", "coup_risk_grows"]
            },
            {
                text: "Reject it. The West's sanctions would cripple us.",
                effects: { personalWealth: 0, treasury: 20, elite: -15, anger: -10 },
                addToPool: ["nationalist_backlash"]
            }
        ]
    },

    // ========================================
    // WAR PATH: Early Days
    // ========================================
    {
        id: "war_goes_badly",
        title: "The 72-Hour War: Day 47",
        description: "Your generals promised 72 hours. It's been 47 days. The capital hasn't fallen. Your tanks are stuck in mud. Javelin missiles destroyed 450 vehicles. Generals are lying about casualties. Actual dead: 8,000. Official count: 498. Mothers are calling. The coffins keep coming.",
        weight: 10,
        storyline: "war_military",
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Escalate. Full invasion. Mobilize reserves. Flatten cities.",
                effects: { personalWealth: -5, treasury: -400, elite: -10, anger: 40 },
                addToPool: ["conscription_crisis", "war_crimes_allegations", "mobilization_announcement", "elite_sons_fleeing"]
            },
            {
                text: "Dig in. Limited objectives. Hold what we have, claim victory.",
                effects: { personalWealth: -3, treasury: -200, elite: 5, anger: 25 },
                addToPool: ["frozen_conflict", "partisan_resistance", "bridge_strike"]
            },
            {
                text: "Negotiate. Blame the generals. Seek face-saving exit.",
                effects: { personalWealth: 0, treasury: -100, elite: -20, anger: -15 },
                addToPool: ["negotiated_settlement", "nationalist_backlash", "military_humiliation"]
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
                addToPool: ["military_disaster", "soldier_mutiny", "defense_scandal"]
            },
            {
                text: "Accept but demand he fixes quality. Take 15%.",
                effects: { personalWealth: 8, treasury: -60, elite: 5, anger: 5 },
                addToPool: ["improved_equipment", "contractor_resentment"]
            },
            {
                text: "Reject. Use competent suppliers. The war must succeed.",
                effects: { personalWealth: 0, treasury: -80, elite: -10, anger: 0 },
                addToPool: ["military_effectiveness_boost", "oligarch_resentment"]
            }
        ]
    },

    {
        id: "bridge_strike",
        title: "The Bridge Explodes",
        description: "The Kerch Bridge—your $4 billion prestige project connecting the mainland to occupied Crimea—just exploded. Massive truck bomb. The railway section collapsed into the sea. It's a humiliating blow. Military supplies can't get through. Your generals are screaming for retaliation.",
        weight: 8,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Massive retaliation. Target their power grid. No electricity.",
                effects: { personalWealth: 0, treasury: -80, elite: 15, anger: 15 },
                addToPool: ["energy_infrastructure_war", "civilian_casualties_winter", "nuclear_threats"]
            },
            {
                text: "Precision strikes. Military targets only. Show restraint.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 10 },
                addToPool: ["military_targets_campaign", "international_praise"]
            },
            {
                text: "Rebuild the bridge. Stronger. Use it as propaganda victory.",
                effects: { personalWealth: -4, treasury: -200, elite: 10, anger: 10 },
                addToPool: ["bridge_reconstruction", "engineers_shortage"]
            }
        ]
    },

    // ========================================
    // ESCALATION PATH: Mobilization
    // ========================================
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
                addToPool: ["elite_sons_fleeing", "mass_protest_mobilization", "border_guard_corruption", "draft_dodgers"]
            },
            {
                text: "'Partial' mobilization. Target ethnic minorities and poor regions.",
                effects: { personalWealth: 0, treasury: -250, elite: 5, anger: 35 },
                addToPool: ["ethnic_tensions", "regional_resentment", "minority_backlash"]
            },
            {
                text: "Pay mercenaries. Private military companies. No conscription.",
                effects: { personalWealth: -8, treasury: -300, elite: 10, anger: 15 },
                addToPool: ["wagner_mutiny", "mercenary_costs", "private_army_problem"]
            }
        ]
    },

    {
        id: "mobilization_announcement",
        title: "The Mobilization Speech",
        description: "You're about to announce mobilization on national TV. Your speechwriter prepared remarks about 'temporary measures' and 'limited scale.' Meanwhile, military recruiters are already printing summons for 500,000 men. Your PR chief says lie about the numbers. Your defense minister says tell the truth—they'll find out anyway.",
        weight: 7,
        conditions: { hasTriggered: ["conscription_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Lie. '300,000 reservists, temporary, limited scope.'",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 25 },
                addToPool: ["mobilization_lies_exposed", "trust_collapse"]
            },
            {
                text: "Truth. 'This will be extensive. Everyone must sacrifice.'",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: 50 },
                addToPool: ["mass_panic", "airport_chaos", "border_stampede"]
            },
            {
                text: "Vague. 'We'll do what's necessary.' No numbers.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 35 },
                addToPool: ["confusion_and_rumors", "speculation_frenzy"]
            }
        ]
    },

    {
        id: "elite_sons_fleeing",
        title: "The Patriotic Elite",
        description: "Your mobilization decree went live. Within 24 hours, private jets carried 87 sons of oligarchs, ministers, and generals out of the country. The FSB chief's son is in Dubai. The defense minister's son has a sudden 'heart condition.' Meanwhile, poor farmers' sons are getting drafted at gunpoint.",
        weight: 7,
        conditions: { hasTriggered: ["conscription_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Publicize it. Name and shame. No one is exempt! (Lie)",
                effects: { personalWealth: 0, treasury: 0, elite: -20, anger: 10 },
                addToPool: ["elite_rebellion_brewing", "oligarch_conspiracy"]
            },
            {
                text: "Ignore it. The elite must maintain morale. Different rules.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 30 },
                addToPool: ["class_rage_building", "populist_anger"]
            },
            {
                text: "One token arrest. Minister's son. Show trial. He serves 2 months.",
                effects: { personalWealth: 0, treasury: 0, elite: -5, anger: -10 },
                addToPool: ["minister_resentment", "elite_fear"]
            }
        ]
    },

    // ========================================
    // ATROCITIES PATH
    // ========================================
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
                addToPool: ["international_tribunal", "evidence_mounts", "whistleblower_leaks"]
            },
            {
                text: "Blame rogue units. Court-martial some junior officers.",
                effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 10 },
                addToPool: ["scapegoat_soldiers", "military_morale_drop"]
            },
            {
                text: "Defiant: 'This is war. Casualties happen. We make no apologies.'",
                effects: { personalWealth: 0, treasury: -20, elite: 15, anger: 25 },
                legacy: { icon: "⚰️", name: "War Criminal", weight: -30 },
                addToPool: ["international_tribunal", "sanctions_escalation", "pariah_status"]
            }
        ]
    },

    {
        id: "international_tribunal",
        title: "The Hague Calls",
        description: "The International Criminal Court issued arrest warrants. For you. For your defense minister. For 12 generals. 123 countries must arrest you on sight if you enter their territory. Your assets in 47 countries are being frozen. You can't travel to Europe, Americas, most of Africa, Australia. Your circle is shrinking.",
        weight: 6,
        conditions: { hasTriggered: ["war_crimes_allegations"] },
        onceOnly: true,
        choices: [
            {
                text: "Defiant. 'I don't recognize their authority.' Stay home.",
                effects: { personalWealth: -10, treasury: 0, elite: 10, anger: 10 },
                addToPool: ["isolated_dictator", "bunker_mentality"]
            },
            {
                text: "Surround yourself with loyalists. Purge anyone wavering.",
                effects: { personalWealth: 0, treasury: -50, elite: -15, anger: 5 },
                addToPool: ["paranoia_grows", "loyalist_circle"]
            },
            {
                text: "Blame the generals. Offer to hand them over. (Lie)",
                effects: { personalWealth: 0, treasury: 0, elite: -25, anger: -10 },
                addToPool: ["generals_panic", "coup_attempt_imminent"]
            }
        ]
    },

    {
        id: "nuclear_threats",
        title: "The Nuclear Option",
        description: "You're in the war room. It's going badly. Your generals are desperate. One suggests a tactical nuclear strike—just a small one, to show you're serious. The Americans will back down. Won't they? Your strategic forces commander says the weapons are ready. Your foreign minister is white as a sheet.",
        weight: 5,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Order the strike. Low yield. Military target. Show them we're serious.",
                effects: { personalWealth: 0, treasury: -100, elite: 5, anger: 40 },
                legacy: { icon: "☢️", name: "Nuclear User", weight: -50 },
                addToPool: ["nuclear_escalation_crisis", "nato_intervention_threat", "apocalypse_risk"]
            },
            {
                text: "Threaten it publicly. Keep the ambiguity. Don't actually do it.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 30 },
                addToPool: ["nuclear_brinkmanship", "credibility_test", "western_panic"]
            },
            {
                text: "Reject it absolutely. This is insane. Find another way.",
                effects: { personalWealth: 0, treasury: 0, elite: -15, anger: 0 },
                addToPool: ["generals_lose_faith", "search_for_options"]
            }
        ]
    },

    // ========================================
    // WAGNER / MERCENARY PATH
    // ========================================
    {
        id: "wagner_mutiny",
        title: "The Chef Rebels",
        description: "Your private military company commander—the ex-convict turned warlord you've been funding for years—just posted a video. He's taking his 25,000 fighters and marching on Moscow. He says you and the defense minister betrayed him. His troops are 200km from the capital. Military units are not engaging. Some are joining him.",
        weight: 7,
        storyline: "war_military",
        conditions: { hasTriggered: ["conscription_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Negotiate. Offer him anything. He can't reach Moscow.",
                effects: { personalWealth: -5, treasury: -100, elite: -20, anger: 0 },
                addToPool: ["wagner_deal", "wagner_exile", "military_humiliation"]
            },
            {
                text: "Fight. Order military to stop him. Bomb the highways if needed.",
                effects: { personalWealth: 0, treasury: -80, elite: 10, anger: 25 },
                addToPool: ["wagner_battle", "civil_war_risk", "military_split"]
            },
            {
                text: "Eliminate him afterwards. Plane crash. Convenient accident.",
                effects: { personalWealth: 0, treasury: -50, elite: 15, anger: 10 },
                legacy: { icon: "✈️", name: "Plane Crash Specialist", weight: -12 },
                addToPool: ["wagner_leader_death", "mercenary_anger", "loyalty_through_fear"]
            }
        ]
    },

    {
        id: "wagner_leader_death",
        title: "The Suspicious Plane Crash",
        description: "His private jet exploded at 30,000 feet. All 10 people aboard dead. Pieces scattered over 10 kilometers. The official story: catastrophic technical failure. Nobody believes it. His fighters know. The West knows. The message is clear: challenge me, and your plane falls from the sky.",
        weight: 5,
        conditions: { hasTriggered: ["wagner_mutiny"] },
        onceOnly: true,
        choices: [
            {
                text: "Deny involvement. Express condolences. Blame maintenance.",
                effects: { personalWealth: 0, treasury: 0, elite: 5, anger: 10 },
                addToPool: ["wagner_revenge_plot", "mercenary_dissolution"]
            },
            {
                text: "Silent treatment. No comment. Let the implications speak.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 15 },
                addToPool: ["fear_consolidates", "ruthless_reputation"]
            },
            {
                text: "Absorb his forces. Bring Wagner directly under military control.",
                effects: { personalWealth: 0, treasury: -120, elite: 5, anger: 5 },
                addToPool: ["mercenary_integration", "military_expansion"]
            }
        ]
    },

    // ========================================
    // NATIONALIST BACKLASH PATH
    // ========================================
    {
        id: "nationalist_backlash",
        title: "The Hardliners Revolt",
        description: "The ultranationalists are furious you rejected the invasion. They're calling you a coward and a Western puppet. Their leader is a popular ex-general with 500k followers. He's staging rallies, burning your effigy. Some active-duty generals are quietly sympathetic. This could turn into a coup.",
        weight: 8,
        storyline: "war_military",
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Arrest him and his lieutenants. 15-year sentences for treason.",
                effects: { personalWealth: 0, treasury: -20, elite: -15, anger: 20 },
                addToPool: ["nationalist_underground", "martyrdom_effect"]
            },
            {
                text: "Co-opt him. Deputy Defense Minister. Neutralize with status.",
                effects: { personalWealth: -1, treasury: -40, elite: 5, anger: 10 },
                addToPool: ["nationalist_insider", "moderate_nationalists"]
            },
            {
                text: "Fine. Limited 'peacekeeping operation.' Just the border region.",
                effects: { personalWealth: -3, treasury: -180, elite: 10, anger: 25 },
                addToPool: ["war_goes_badly", "creeping_escalation"]
            }
        ]
    },

    // ========================================
    // WAR CONCLUSION PATHS
    // ========================================
    {
        id: "frozen_conflict",
        title: "The Forever War",
        description: "Three years later, you control 20% of their territory. It costs $300 billion per year. 50,000 of your soldiers are dead. Neither side can advance. Neither side will negotiate. It's Korea, but with drones. Your economy is hemorrhaging. The war has become... permanent.",
        weight: 6,
        conditions: { hasTriggered: ["war_goes_badly"], year: 3 },
        onceOnly: true,
        choices: [
            {
                text: "Claim victory. Annex it officially. Declare mission accomplished.",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 20 },
                legacy: { icon: "🗺️", name: "Land Grabber", weight: 8 },
                addToPool: ["permanent_occupation_costs", "insurgency_forever"]
            },
            {
                text: "Seek negotiations. Trade land for sanctions relief.",
                effects: { personalWealth: 0, treasury: -50, elite: -15, anger: -10 },
                addToPool: ["peace_talks_begin", "hardliner_opposition"]
            },
            {
                text: "Dig in deeper. Build fortifications. Accept the new reality.",
                effects: { personalWealth: 0, treasury: -400, elite: 5, anger: 15 },
                addToPool: ["militarized_society", "permanent_war_economy"]
            }
        ]
    },

    {
        id: "negotiated_settlement",
        title: "The Armistice",
        description: "After months of secret talks mediated by neutral countries, there's a deal on the table. You withdraw from 80% of occupied territory. They promise neutrality and protect ethnic minorities. International observers verify. Sanctions gradually lift. It's not victory, but it's not defeat. Your generals hate it.",
        weight: 5,
        conditions: { hasTriggered: ["war_goes_badly"] },
        onceOnly: true,
        choices: [
            {
                text: "Accept it. End the war. Rebuild the economy.",
                effects: { personalWealth: 0, treasury: 200, elite: -20, anger: -30 },
                legacy: { icon: "🕊️", name: "Peacemaker (Forced)", weight: 5 },
                addToPool: ["nationalist_rage", "economic_recovery", "purge_generals"]
            },
            {
                text: "Accept but cheat. Keep 'advisors' and proxies there.",
                effects: { personalWealth: 0, treasury: -100, elite: 5, anger: -10 },
                addToPool: ["covert_war_continues", "sanctions_stay"]
            },
            {
                text: "Reject. The war continues. We'll win eventually.",
                effects: { personalWealth: 0, treasury: -300, elite: 10, anger: 30 },
                addToPool: ["endless_war", "economic_collapse_looms"]
            }
        ]
    },

    {
        id: "territorial_annexation",
        title: "Annexation Referendum",
        description: "You're holding referendums in occupied territories. Official results: 97.3% vote to join you. International observers weren't allowed in. People voted with soldiers watching. Ballots were pre-filled. Nobody is fooled. But you're annexing the territory anyway. Four new regions. Nuclear protection applies. The point of no return.",
        weight: 6,
        conditions: { hasTriggered: ["war_goes_badly"], year: 2 },
        onceOnly: true,
        choices: [
            {
                text: "Annex all of it. Official ceremony. Constitutional changes.",
                effects: { personalWealth: 0, treasury: -150, elite: 15, anger: 25 },
                legacy: { icon: "🗺️", name: "Land Grabber", weight: 6 },
                addToPool: ["permanent_occupation", "international_isolation", "partisan_resistance"]
            },
            {
                text: "Annex only the resource-rich parts. Be strategic.",
                effects: { personalWealth: 5, treasury: -100, elite: 10, anger: 20 },
                addToPool: ["selective_occupation", "resource_extraction_ramps"]
            },
            {
                text: "Declare them 'independent republics.' Puppet states.",
                effects: { personalWealth: 0, treasury: -120, elite: 5, anger: 15 },
                addToPool: ["puppet_government_problems", "frozen_conflict"]
            }
        ]
    },

    {
        id: "partisan_resistance",
        title: "The Insurgency",
        description: "Occupied territories are not pacified. Guerrilla attacks kill 5-10 soldiers per week. IEDs on roads. Assassinations of collaborators. Your puppet governors need 500-man security details. The locals hate you. Every patrol could be an ambush. This will never end.",
        weight: 7,
        conditions: { hasTriggered: ["territorial_annexation", "frozen_conflict"] },
        onceOnly: false,
        choices: [
            {
                text: "Harsh crackdown. Collective punishment. Terror tactics.",
                effects: { personalWealth: 0, treasury: -80, elite: 5, anger: 20 },
                addToPool: ["population_flees", "war_crimes_new"]
            },
            {
                text: "Hearts and minds. Build schools, pay pensions, buy loyalty.",
                effects: { personalWealth: 0, treasury: -200, elite: -5, anger: 10 },
                addToPool: ["occupation_costs_spiral", "limited_success"]
            },
            {
                text: "Withdraw from indefensible areas. Consolidate key cities.",
                effects: { personalWealth: 0, treasury: -50, elite: -10, anger: 15 },
                addToPool: ["tactical_retreat", "nationalist_anger_retreat"]
            }
        ]
    },

    // ========================================
    // SECONDARY MILITARY EVENTS
    // ========================================
    {
        id: "military_disaster",
        title: "The Equipment Failure",
        description: "The faulty equipment you approved is killing your own soldiers. Body armor shatters on impact. Radios don't work. Vehicles break down. Rations cause dysentery. Soldiers are posting videos online: 'Send us anything. Even from WWII.' Families are crowdfunding to buy their sons basic gear. The corruption has become a military disaster.",
        weight: 6,
        conditions: { hasTriggered: ["war_profiteering"] },
        onceOnly: true,
        choices: [
            {
                text: "Blame the contractor. Arrest him. Seize his assets.",
                effects: { personalWealth: 8, treasury: 50, elite: -15, anger: -10 },
                addToPool: ["oligarch_panic", "contractor_revenge"]
            },
            {
                text: "Emergency procurement. Pay triple. Get real equipment now.",
                effects: { personalWealth: -10, treasury: -300, elite: 5, anger: -5 },
                addToPool: ["military_morale_boost", "treasury_crisis"]
            },
            {
                text: "Censor the videos. Arrest the posters. Deny the problem.",
                effects: { personalWealth: 0, treasury: 0, elite: 0, anger: 35 },
                addToPool: ["coverup_fails", "truth_leaks_anyway"]
            }
        ]
    },

    {
        id: "soldier_mutiny",
        title: "The Battalion Refuses",
        description: "Battalion 237—400 men—refused deployment orders. They're not going back to the front. Their commander tried to force them. They locked him in a storage room. Word is spreading. Other units are watching. If you don't crush this now, the whole army could unravel.",
        weight: 6,
        conditions: { hasTriggered: ["military_disaster", "conscription_crisis"] },
        onceOnly: true,
        choices: [
            {
                text: "Example. Court-martial the ringleaders. Firing squad.",
                effects: { personalWealth: 0, treasury: 0, elite: 10, anger: 25 },
                legacy: { icon: "⚖️", name: "Iron Discipline", weight: -8 },
                addToPool: ["fear_in_ranks", "underground_resistance"]
            },
            {
                text: "Negotiate. Better pay, better conditions, 2-week leave.",
                effects: { personalWealth: 0, treasury: -150, elite: -5, anger: 0 },
                addToPool: ["other_units_demand_same", "concession_cascade"]
            },
            {
                text: "Rotate them out. New uniforms. Propaganda heroes. Buy them off.",
                effects: { personalWealth: 0, treasury: -80, elite: 0, anger: -5 },
                addToPool: ["temporary_calm", "problem_delayed"]
            }
        ]
    },

    {
        id: "breakaway_province",
        title: "The Breakaway Province",
        description: "An ethnic region in your own country—rich in oil and minerals—just declared independence. Their leader is a former warlord you've been paying off for 20 years. He's decided he doesn't need you anymore. 200,000 people. Strategic resources. A direct challenge to your authority.",
        weight: 7,
        conditions: {},
        onceOnly: true,
        choices: [
            {
                text: "Send in the army. Crush them. No negotiations with traitors.",
                effects: { personalWealth: 0, treasury: -200, elite: 10, anger: 30 },
                addToPool: ["internal_war", "ethnic_conflict", "international_condemnation"]
            },
            {
                text: "Blockade. Starve them out. Cut power, water, supplies.",
                effects: { personalWealth: 0, treasury: -50, elite: 5, anger: 25 },
                addToPool: ["humanitarian_crisis", "refugee_flows", "international_pressure"]
            },
            {
                text: "Offer massive autonomy. Keep them in but barely.",
                effects: { personalWealth: 0, treasury: -100, elite: -10, anger: 15 },
                addToPool: ["autonomy_precedent", "other_regions_want_same"]
            }
        ]
    },

    {
        id: "military_corruption_exposed",
        title: "The Defense Ministry Scandal",
        description: "A whistleblower leaked documents showing the Defense Ministry has been inflating troop numbers by 150,000 phantom soldiers. Officers pocket their salaries. Equipment budgets are fiction. $50 billion disappeared into offshore accounts. Your defense minister is implicated. So are you, technically.",
        weight: 6,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Scapegoat the minister. Prosecute him. You knew nothing.",
                effects: { personalWealth: 0, treasury: 0, elite: -10, anger: -10 },
                addToPool: ["minister_has_receipts", "blackmail_threat"]
            },
            {
                text: "Bury it. Arrest the whistleblower. Classify everything.",
                effects: { personalWealth: 0, treasury: -20, elite: 5, anger: 20 },
                addToPool: ["coverup_attempt", "evidence_spreads_anyway"]
            },
            {
                text: "Seize everything. You'll take the stolen money yourself.",
                effects: { personalWealth: 25, treasury: 0, elite: -15, anger: 15 },
                addToPool: ["oligarchs_fear_you", "confiscation_precedent"]
            }
        ]
    },

    {
        id: "coup_risk_grows",
        title: "The Generals Whisper",
        description: "Your FSB chief brings you intercepts. Three generals, two oligarchs, and a regional governor met secretly. Topic: 'post-transition planning.' They're not planning your birthday party. This is coup talk. Early stages. They don't think you know. You have a small window to act.",
        weight: 7,
        conditions: { hasTriggered: ["special_operation_proposal"] },
        onceOnly: true,
        choices: [
            {
                text: "Strike first. Arrest all of them. Show trials.",
                effects: { personalWealth: 5, treasury: 0, elite: -20, anger: 10 },
                addToPool: ["loyalty_purge", "paranoia_spreads", "general_arrests"]
            },
            {
                text: "Divide them. Promote one, arrest one, buy off two.",
                effects: { personalWealth: -3, treasury: -80, elite: -5, anger: 5 },
                addToPool: ["conspirators_fracture", "bought_loyalty"]
            },
            {
                text: "Watch and wait. Let them reveal more participants.",
                effects: { personalWealth: 0, treasury: -30, elite: 0, anger: 0 },
                addToPool: ["coup_plot_develops", "surveillance_intensifies"]
            }
        ]
    }
];
