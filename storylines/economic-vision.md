# The Economic Vision - Storyline Design Document

## Overview

**Storyline ID:** `economic-vision`
**Trigger:** The Five-Year Plan → Choose economic direction
**Size:** ~40-45 events total (12-15 per branch + 5-6 shared convergence)
**Depth:** 4-5
**Theme:** Economic modernization vs stagnation - can an autocracy evolve?

## Novel Structure: Nested Diverge-Converge

Unlike other storylines:
- **Dacha Summit**: Three storylines that INTERCONNECT (crossover events)
- **Inaugural Address**: Three storylines that are SEPARATE (no crossover)
- **Economic Vision**: Three branches that CONVERGE to shared resolution

```
                    The Five-Year Plan (Entry)
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
    Silicon Steppe   Pipeline State   Fortress Economy
     (12 events)      (12 events)       (12 events)
          │                │                │
          └────────────────┼────────────────┘
                           ▼
                  The Economic Reckoning
                      (6 shared events)
                           │
                           ▼
                     Path-Specific Endings
```

---

## Core Tension

Every authoritarian regime faces the modernization dilemma:
- **Modernize** and risk creating forces you can't control (tech oligarchs, educated middle class)
- **Stagnate** and watch the economy hollow out (brain drain, dependency, decline)
- **Isolate** and try to build everything yourself (shortages, black markets, nostalgia)

There is no good answer. Each path has benefits and costs. All paths eventually face a reckoning.

---

## Key Characters

### Natasha Sergeyeva (Silicon Steppe)
**"The Digital Minister"** - 38, returned from Silicon Valley, true believer in technology's transformative power. She's the face of modernization - competent, idealistic, maybe naive. She thinks technology can be separated from politics. She's wrong.

- **Personality:** Optimistic, driven, slightly condescending
- **Fatal Flaw:** Believes technology is neutral
- **Arc:** From idealist to compromised to either reformer or enabler

### Grigory Gazov (Pipeline State)
**"The Energy Baron"** - 58, CEO of Gaz-State, old-school industrialist who sees gas and oil as weapons. He's the embodiment of the resource curse - powerful because of what's under the ground, vulnerable because the world is changing.

- **Personality:** Gruff, transactional, sees everything as leverage
- **Fatal Flaw:** Can't imagine a world without fossil fuel dominance
- **Arc:** From king to desperate to either survivor or dinosaur

### Viktor Narodny (Fortress Economy)
**"The Party Economist"** - 65, Soviet nostalgist, true believer in autarky. He remembers when the Motherland built everything itself. He thinks you can wall off from globalization. He's going to learn the cost.

- **Personality:** Ideological, patriotic, stubborn
- **Fatal Flaw:** Confuses ideology with economics
- **Arc:** From prophet to pragmatist or to zealot who brings ruin

### Irina Makarova (Shared - Central Banker)
**"The Last Technocrat"** - 52, head of Central Bank, trying to keep everything afloat no matter which path you choose. She's the voice of economic reality, ignored by everyone.

- **Personality:** Dry, exhausted, darkly funny
- **Fatal Flaw:** Competence in an incompetent system
- **Arc:** Constant throughout, cassandra figure

---

## The Entry Event

### `five_year_plan`
**"The Five-Year Plan"**

Your economic advisors gather in the Kremlin's walnut-paneled conference room. Oil prices are volatile. The ruble is weak. The technocrats argue over PowerPoint slides while the oligarchs check their Swiss watches. The Central Banker looks like she hasn't slept in three days.

Three competing visions emerge for the Federation's economic future.

**Choices:**

1. **"The future is digital. We will become the world's tech hub."**
   - Opens: Silicon Steppe
   - Effects: treasury -50, elite +8
   - Sets: `economic_path: "silicon"`, `silicon_steppe_active: true`
   - Unlocks: `silicon_tech_hub`

2. **"Our strength lies beneath our feet. Gas and oil will fuel our empire."**
   - Opens: Pipeline State
   - Effects: treasury +30, elite +12
   - Sets: `economic_path: "pipeline"`, `pipeline_state_active: true`
   - Unlocks: `pipeline_new_route`

3. **"We need no one. Import substitution - build it ourselves."**
   - Opens: Fortress Economy
   - Effects: treasury -20, elite -5, anger -8
   - Sets: `economic_path: "fortress"`, `fortress_economy_active: true`
   - Unlocks: `fortress_import_ban`

4. **"This is above my pay grade. Let the market decide."**
   - No major path, but reduces control
   - Effects: treasury +20, elite -10
   - Sets: `economic_path: "laissez_faire"`
   - Leads to: Economic drift events, eventually forces choice

---

## Branch 1: The Silicon Steppe

**Arc:** Attempt digital transformation - hope, compromise, corruption

### Act 1: The Promise (Depth 1-2)

#### `silicon_tech_hub`
**"The Special Economic Zone"**

Natasha Sergeyeva presents the plan: a gleaming tech campus outside the capital. Tax breaks, fiber optic infrastructure, imported coffee machines. "We'll attract the world's best engineers," she says. "Or at least stop ours from leaving."

**Choices:**
1. "Full funding. Make it the envy of the world." → treasury -80, sets `tech_hub_lavish`
2. "Modest start. Prove the concept first." → treasury -30
3. "Partner with foreign companies. Share the cost." → treasury -20, sets `foreign_tech_partners`
4. "Pair it with security monitoring infrastructure." → treasury -50, sets `tech_surveillance_built_in`

#### `silicon_talent_recruitment`
**"The Talent War"**

To build Silicon Steppe, you need engineers. They're all in California, Berlin, or London. Natasha proposes aggressive recruitment: salaries, apartments, and promises they won't be drafted. The oligarchs are offended by the salary numbers.

**Choices:**
1. "Pay whatever it takes. Knowledge is priceless." → treasury -40, elite -8, sets `tech_salaries_high`
2. "Make them offers with... additional incentives." → personalWealth -5, sets `tech_kompromat_recruitment`
3. "Focus on returning expats. Appeal to patriotism." → treasury -15
4. "Build training programs domestically. It takes longer but it's ours." → treasury -25, sets `domestic_tech_training`

#### `silicon_first_success`
**"The App Store Hit"**

A startup from Silicon Steppe creates a messaging app that goes viral. 50 million downloads in three months. Western media runs profiles of "The Russian Zuckerberg." Natasha is vindicated. The FSB wants access to the user data.

**Choices:**
1. "Congratulations. Now give us backdoor access." → sets `tech_backdoor_required`, elite +5
2. "Let them operate freely. Success needs freedom." → anger -5, sets `tech_freedom_allowed`
3. "Take a government stake in the company. 'Investment.'" → treasury -20, personalWealth +10
4. "Encourage them to relocate abroad. Better optics." → elite -5

### Act 2: The Compromise (Depth 2-3)

#### `silicon_brain_drain`
**"The Departure Lounge"**

Despite the investment, engineers are still leaving. Exit interviews reveal the problem: it's not the money. It's the "other things." The surveillance. The uncertainty. The military conscription notices. Natasha looks tired.

**Choices:**
1. "Restrict exit visas for tech workers." → anger +10, sets `tech_exit_restricted`
2. "Double the incentives. Golden handcuffs." → treasury -60, sets `tech_golden_handcuffs`
3. "Create 'strategic importance' exemptions from conscription." → elite -10, anger -5
4. "Let them go. We'll train replacements." → sets `accepted_brain_drain`

#### `silicon_surveillance_deal`
**"The Dual-Use Dilemma"**

The FSB presents a proposal: they want Silicon Steppe companies to develop surveillance technology for export. Facial recognition, social media monitoring, the works. "Democratic countries won't do this," the Director says. "We can corner the market."

**Choices:**
1. "Approve it. Technology is neutral." → treasury +100, elite +8, sets `surveillance_tech_exports`
2. "Only for domestic use. We're not arms dealers." → elite +5, sets `domestic_surveillance_only`
3. "Reject it. This will destroy our international reputation." → elite -12
4. "Let Natasha decide. It's her project." → sets `natasha_surveillance_choice` (she refuses)

#### `silicon_tech_oligarch_rise`
**"The New Money"**

Alexei Petrov, founder of that messaging app, is now worth $8 billion. He's buying football teams and funding opposition podcasts. He says things like "innovation" and "disruption." The old oligarchs are threatened. So are you.

**Choices:**
1. "Invite him to the dacha. Make sure he understands the rules." → relationships: petrov -10
2. "Leave him alone. New money, new rules." → elite -15, sets `tech_oligarch_independent`
3. "Tax investigation. Remind him who built the roads." → treasury +30, elite +5, relationships: petrov -30
4. "Encourage him to enter politics. Co-opt, don't confront." → sets `tech_oligarch_political`

### Act 3: The Corruption (Depth 3-4)

#### `silicon_foreign_investment`
**"The Strings Attached"**

Western venture capital is interested in Silicon Steppe. Billions available. But they want things: rule of law, independent courts, press freedom. "Standard investor protections," they say. The FSB Director calls it "Western interference."

**Choices:**
1. "Accept the investment. Fake the reforms." → treasury +150, sets `fake_tech_reforms`
2. "Accept with genuine reforms. Limited, but real." → treasury +100, elite -15, anger -8
3. "Reject Western money. Pivot to Chinese investment." → treasury +80, sets `chinese_tech_investment`
4. "Tell them the money is welcome, the conditions are not." → treasury +50

#### `silicon_hack_blowback`
**"The Attribution"**

Silicon Steppe has been quietly doing state hacking operations. Very quietly. Until a Western cybersecurity firm publishes a detailed attribution report naming your tech companies. Screenshots. Code samples. Everything.

**Choices:**
1. "Complete denial. They fabricated the evidence." → sets `denied_hacking`
2. "Blame rogue elements. Fire some people publicly." → elite -5, treasury -20
3. "Admit nothing, retaliate with sanctions on their tech." → treasury -50
4. "Shut down the operations. This was a mistake." → elite -15, sets `ended_cyber_ops`

#### `silicon_natasha_disillusion`
**"The Resignation Letter"**

Natasha Sergeyeva's resignation letter leaks. It's devastating: compromise after compromise, surveillance built into everything, innovation strangled by paranoia. "I came to build the future," she writes. "I helped build a prettier prison."

**Choices:**
1. "Let her go. Replace her with someone more... aligned." → sets `natasha_departed`, unlocks replacement arc
2. "Arrest her before she talks more." → elite -10, anger +10, sets `natasha_arrested`
3. "Convince her to stay. Give her real authority." → elite -8, sets `natasha_empowered`
4. "The letter is fabricated. Western intelligence operation." → sets `denied_natasha_letter`

---

## Branch 2: The Pipeline State

**Arc:** Energy dominance - power, leverage, obsolescence

### Act 1: The Empire (Depth 1-2)

#### `pipeline_new_route`
**"The Northern Route"**

Grigory Gazov presents the crown jewel: a new pipeline bypassing troublesome transit countries. $45 billion. Ten years to complete. "We'll supply Europe directly," he says. "They'll depend on us completely." The Finance Minister looks pale.

**Choices:**
1. "Approve it. Energy is power." → treasury -150, elite +15, sets `northern_pipeline_approved`
2. "Too expensive. Scale it down." → treasury -80, elite +5
3. "Only if European partners co-invest." → treasury -60, sets `european_pipeline_partners`
4. "Delay until oil prices stabilize." → elite -5

#### `pipeline_european_leverage`
**"The Cold Winter"**

It's February. Gas reserves in Europe are low. Gazov suggests a "maintenance shutdown" of existing pipelines. Prices would triple. European politicians would panic. "Just leverage," he shrugs. "This is how the game is played."

**Choices:**
1. "Do it. Let them freeze a little." → treasury +200, elite +10, sets `weaponized_gas`, unlocks `pipeline_sanctions_response`
2. "Too aggressive. Reduce flows modestly." → treasury +80
3. "No. This will bring sanctions." → elite -10
4. "Threaten it publicly. Don't actually do it." → treasury +40, sets `gas_bluff`

#### `pipeline_price_war`
**"The OPEC Confrontation"**

The Saudis are flooding the market. Oil prices are crashing. Your budget depends on $70 barrels. They're at $40 and falling. Gazov wants to increase production to maintain revenue. The Finance Minister says that's insane.

**Choices:**
1. "Match their production. We can outlast them." → treasury -80, sets `oil_price_war`
2. "Negotiate production cuts with OPEC." → elite -5
3. "Diversify revenue. Emergency tax increases." → treasury +40, anger +15
4. "Raid the sovereign wealth fund. This will pass." → treasury +100, sets `raided_wealth_fund`

### Act 2: The Pressure (Depth 2-3)

#### `pipeline_sanctions_bite`
**"The Technology Ban"**

Western sanctions hit the oil sector. No more imported drilling technology. No more deep-water expertise. No more Arctic exploration equipment. Gazov is furious. "We can build our own," he insists. You're not sure he's right.

**Choices:**
1. "Steal the technology. Industrial espionage." → sets `oil_tech_espionage`, treasury -30
2. "Partner with China for equipment." → treasury -50, sets `chinese_oil_partnership`
3. "Invest in domestic alternatives. It will take years." → treasury -80, sets `domestic_oil_tech`
4. "Abandon the advanced projects. Stick to easy oil." → elite -15, treasury +30

#### `pipeline_environmental_disaster`
**"The Black Sea Spill"**

A pipeline ruptures. Thousands of tons of crude in the Black Sea. Resort beaches covered in tar. International media arrives. Environmental groups are screaming. Gazov calls it "a minor incident."

**Choices:**
1. "Massive cleanup. Spare no expense." → treasury -100, anger -10
2. "Standard response. These things happen." → treasury -30, anger +15
3. "Blame sabotage. Western terrorists." → sets `spill_blamed_on_west`
4. "Cover it up. Control the media, restrict access." → treasury -20, anger +8, sets `covered_up_spill`

#### `pipeline_asian_pivot`
**"The Eastern Alternative"**

Europe is reducing gas imports. The green transition is real. Gazov proposes a massive pivot: new pipelines to China. They'll buy everything Europe won't. "We just need to accept their price," he admits quietly.

**Choices:**
1. "Build the eastern pipelines. China is the future." → treasury -120, sets `china_gas_pivot`
2. "Negotiate hard. We're not desperate." → treasury -80, sets `china_negotiations_tough`
3. "Diversify to both. Don't depend on anyone." → treasury -180
4. "Reduce production. Wait for Europe to come back." → elite -20, sets `gas_production_cut`

### Act 3: The Decline (Depth 3-4)

#### `pipeline_green_transition`
**"The World Moves On"**

Germany announces its last coal plant closure. The EU sets 2040 carbon neutrality. Electric vehicle sales are exploding. Gazov's confident projections from five years ago look like fantasy. The pipeline you built might be a stranded asset.

**Choices:**
1. "They're bluffing. Fossil fuels will return." → sets `denied_green_transition`
2. "Invest in Federation solar and wind. Pivot." → treasury -100, sets `renewable_pivot`
3. "Sell everything now while it still has value." → personalWealth +50, treasury +200, elite -20
4. "Blame the West for 'green colonialism.'" → anger -5, sets `anti_green_propaganda`

#### `pipeline_gazov_desperation`
**"The Old Man's Gamble"**

Gazov proposes something dangerous: secretly funding environmental protests in Europe to slow their transition. NGOs, politicians, the works. "We've done this before," he says. "Information operations. Nobody will know."

**Choices:**
1. "Do it. Buy us time." → treasury -40, sets `funded_anti_green_ops`
2. "Too risky. If exposed, it's catastrophic." → elite -5
3. "Let's focus on our own economy, not theirs." → 
4. "You've lost perspective, Grigory. You're done." → elite -15, sets `gazov_fired`

#### `pipeline_stranded_assets`
**"The $45 Billion Question"**

The northern pipeline is complete. It cost more than projected. And now... Europe doesn't want the gas. The pipeline runs at 20% capacity. Bond payments are due. Gazov has no answers.

**Choices:**
1. "Force European purchases. Threaten something." → sets `gas_threats_escalate`
2. "Sell capacity to China at a loss." → treasury -80
3. "Default on the pipeline bonds. Let investors suffer." → elite -25, sets `pipeline_default`
4. "Nationalize the losses. Taxpayers pay." → treasury -200, anger +20

---

## Branch 3: The Fortress Economy

**Arc:** Autarky ideology - purity, shortage, black markets

### Act 1: The Decree (Depth 1-2)

#### `fortress_import_ban`
**"The Self-Sufficiency Decree"**

Viktor Narodny presents the vision: ban Western imports, build domestic alternatives, achieve true independence. "We did this before," he says, gesturing at Soviet-era industrial photos. "We can do it again." The oligarchs look nauseated.

**Choices:**
1. "Full ban. Immediate implementation." → treasury -30, elite -20, anger -10, sets `full_import_ban`
2. "Gradual phase-out. Five-year transition." → treasury -15, elite -10, sets `gradual_import_ban`
3. "Strategic sectors only. Medicine and tech exempt." → treasury -10, elite -5, sets `strategic_import_ban`
4. "Announce it loudly, enforce it loosely." → sets `import_ban_theater`

#### `fortress_factory_campaign`
**"The Industrial Revival"**

To replace imports, you need factories. Viktor wants a massive state investment: tractors, appliances, electronics. "Quality will come later," he says. "First, we need volume." The Central Banker calculates the cost at $200 billion over ten years.

**Choices:**
1. "Build them. National pride is worth any cost." → treasury -100, anger -5, sets `factory_campaign_launched`
2. "Focus on essentials. Food and medicine production." → treasury -50
3. "Private sector can do this. Offer incentives." → treasury -30, elite +5
4. "Import Chinese factories. Faster that way." → treasury -60, sets `chinese_factory_imports`

#### `fortress_cheese_problem`
**"The Parmesan Crisis"**

It's been six months since the import ban. The new Federation cheese factories are... operational. The cheese is... edible. Technically. The elite are furious. French restaurants in Moscow are serving "Motherland Camembert." Nobody is fooled.

**Choices:**
1. "This is the price of independence. They'll adapt." → elite -15
2. "Allow 'cultural exceptions' for luxury goods." → sets `luxury_exceptions`, elite +8, anger +5
3. "Import cheese through Belarus. Quietly." → treasury -10, sets `belarus_cheese_route`
4. "Launch propaganda campaign. 'Our cheese is patriotic.'" → treasury -20, anger -3

### Act 2: The Shortage (Depth 2-3)

#### `fortress_medicine_crisis`
**"The Pharmacy Lines"**

The import ban included pharmaceutical ingredients. Domestic production is months behind. Cancer patients can't get chemotherapy. Diabetics ration insulin. Lines form outside pharmacies. Viktor insists it's temporary.

**Choices:**
1. "Emergency exemption for medicines. Lives first." → sets `medicine_exemption`, treasury -40
2. "Accelerate domestic production. Deploy resources." → treasury -80, sets `emergency_pharma_production`
3. "Let the market solve it. Prices will attract producers." → anger +20
4. "Blame Western sanctions for the shortage." → anger +5, sets `blamed_west_for_shortage`

#### `fortress_black_market`
**"The Shadow Economy"**

Nature abhors a vacuum. Smuggling networks emerge overnight. Banned Western goods flow through Kazakhstan, Belarus, Turkey. Your customs officials are getting rich. The black market might now be 15% of GDP.

**Choices:**
1. "Crack down hard. Arrests, seizures, examples." → treasury -30, anger +10, sets `black_market_crackdown`
2. "Tax it instead. Legalize some gray imports." → treasury +50, sets `gray_import_scheme`
3. "Ignore it. The pressure valve prevents explosion." → sets `tolerated_black_market`
4. "Infiltrate the networks. Use them for intelligence." → sets `controlled_smuggling`

#### `fortress_ideological_purity`
**"The Cosmopolitan Question"**

Viktor wants to go further. "Some of our elite have... foreign attachments," he says. Bank accounts abroad. Children in London schools. Vacation homes in Monaco. "How can we build a fortress when our leaders have one foot outside?"

**Choices:**
1. "You're right. Mandatory repatriation of assets." → elite -30, treasury +100, sets `forced_repatriation`
2. "Focus on government officials only. Private wealth is private." → elite -10
3. "This is dangerous territory, Viktor." → 
4. "Start with voluntary declarations. Then decide." → sets `asset_declaration_program`

### Act 3: The Reality (Depth 3-4)

#### `fortress_quality_collapse`
**"The Tractor Problem"**

The new Federation tractors are rolling off the line. They look impressive. Unfortunately, they break down after 200 hours. Farmers are furious. The spring planting season is at risk. Someone imported Chinese parts anyway, and they don't fit.

**Choices:**
1. "Fix it. Whatever it costs." → treasury -60
2. "Blame saboteurs and wreckers. Classic approach." → sets `blamed_saboteurs`
3. "Allow temporary tractor imports. Farming is critical." → sets `tractor_exception`
4. "Lower the quality standards. 200 hours is acceptable." → anger +10, sets `lowered_standards`

#### `fortress_brain_drain`
**"The Empty Universities"**

The smartest people are leaving. Not to Silicon Valley this time - anywhere. Georgia, Kazakhstan, even Mongolia. Viktor blames "lack of patriotism." The rector of Moscow State reports: physics department down 40%.

**Choices:**
1. "Restrict emigration. Exit visas required." → anger +15, sets `exit_restrictions`
2. "Raise salaries. Match international offers." → treasury -50
3. "Let them go. Patriotic citizens will remain." → sets `accepted_brain_drain`
4. "Recruit internationally. Offer refuge to foreign scientists." → treasury -30

#### `fortress_viktor_doubts`
**"The Old Believer's Crisis"**

Viktor comes to you privately. He looks shaken. "I believed... I still believe... but the numbers..." The factories are failing. The shelves are thin. The people are angry. "Perhaps we moved too fast," he admits.

**Choices:**
1. "Stay the course. History will vindicate us." → sets `doubled_down_autarky`
2. "Gradual liberalization. Keep the rhetoric, change the policy." → sets `quiet_liberalization`
3. "You failed, Viktor. Time for new leadership." → elite -10, sets `viktor_dismissed`
4. "We need a new approach entirely." → triggers early reckoning

---

## The Economic Reckoning (Shared Convergence)

All three paths lead here. The specific trigger varies, but the structure is the same.

### `economic_reckoning_arrives`
**"The Moment of Truth"**

**Silicon Version:** The global tech bubble bursts. Valuations collapse 70%. Your tech companies are worthless on paper. The engineers you recruited want their salaries in dollars. The surveillance tech you exported is being used in a human rights scandal. Natasha—if she's still around—has no answers.

**Pipeline Version:** Oil hits $30 and stays there. Electric vehicles crossed the tipping point. European gas demand is permanently down 40%. Your pipeline is a $45 billion concrete sculpture. Gazov has a stress-induced heart condition. The sovereign wealth fund is empty.

**Fortress Version:** Inflation hits 40%. The shops are stocked with domestic goods nobody wants. The black market controls essential medicines. Your factories produce at 60% capacity—when they run at all. Viktor's hair has gone white. The opposition is quoting your old speeches back at you.

**Universal Choices:**
1. "Double down. We just need more time." → unlocks `reckoning_double_down`
2. "Pivot. Adopt a different approach." → unlocks `reckoning_pivot`
3. "Find a scapegoat. Someone must pay." → unlocks `reckoning_sacrifice`
4. "Accept reality. Begin fundamental reform." → unlocks `reckoning_reform`

### `reckoning_elite_revolt`
**"The Dacha Confrontation"**

Your inner circle demands a meeting. They're not asking nicely. The oligarchs lost billions. The generals want their equipment budgets. The technocrats are tired of explaining the inexplicable. Someone breaks a wine glass. The conversation becomes tense.

**Choices:**
1. "Remind them who made them." → elite -20, sets `confronted_elite`
2. "Listen. Really listen." → elite -5, sets `listened_to_elite`
3. "Concessions. Give them something real." → treasury -100, personalWealth -20, elite +10
4. "Find the ringleader. Make an example." → elite -15, sets `purged_elite_dissident`

### `reckoning_foreign_pressure`
**"The Creditors Call"**

China wants repayment on those infrastructure loans. The IMF is making noises. Bond markets are closed to you. The ruble is in free fall. Foreign leaders who used to take your calls are suddenly "in meetings."

**Choices:**
1. "Default on everything. Consequences be damned." → sets `sovereign_default`
2. "Negotiate. Accept some conditions." → treasury +100, elite -10
3. "Pivot east completely. China's terms, whatever they are." → sets `chinese_dependency`
4. "Emergency asset sales. The crown jewels." → treasury +200, sets `sold_state_assets`

### `reckoning_bread_riots`
**"The Streets Explode"**

Spontaneous protests erupt in ten cities simultaneously. Not organized opposition—just angry people. Bread lines. Unemployment. Inflation. They're chanting economic slogans, not political ones. For now.

**Choices:**
1. "Disperse them. Water cannons if necessary." → anger +20, sets `suppressed_bread_riots`
2. "Emergency subsidies. Buy peace." → treasury -80, anger -10
3. "Address them personally. Historic speech." → anger -5, sets `addressed_crowds`
4. "Blame foreign interference. Arrest 'organizers.'" → anger +10, sets `blamed_foreign_agitators`

### `reckoning_final_choice`
**"The Decision"**

It's late. You're alone in your office. The reports are on your desk. Every option has costs. Every path forward is painful. You came to power to make the Federation great. Instead... this.

**Path-specific variations with universal structure:**

**Choices:**
1. **"Purge and persist."** → Arrest the failures, seize assets, brutal consolidation
   - Effects vary by path but heavy on negative consequences
   - Sets: `chose_purge`

2. **"Reform and risk."** → Liberalize, privatize, open markets, invite foreign help
   - Treasury improves, elite collapses, uncertainty rises
   - Sets: `chose_reform`

3. **"Pivot and pretend."** → Adopt another path's rhetoric, change nothing fundamental
   - Buys time, solves nothing
   - Sets: `chose_pivot`

4. **"Admit and abdicate."** → The economy is broken. Maybe you're part of the problem.
   - Triggers endgame considerations
   - Sets: `economic_failure_admitted`

---

## Flags and Variables

### Path Selection
| Flag | Set By | Effect |
|------|--------|--------|
| `economic_path` | Five-Year Plan | "silicon", "pipeline", "fortress", or "laissez_faire" |
| `silicon_steppe_active` | Five-Year Plan | Enables Silicon events |
| `pipeline_state_active` | Five-Year Plan | Enables Pipeline events |
| `fortress_economy_active` | Five-Year Plan | Enables Fortress events |

### Silicon Path Flags
| Flag | Set By | Effect |
|------|--------|--------|
| `tech_hub_lavish` | Tech Hub | Higher costs, higher profile |
| `tech_surveillance_built_in` | Tech Hub | Surveillance integrated from start |
| `tech_freedom_allowed` | First Success | Less control, more innovation |
| `tech_backdoor_required` | First Success | Control at cost of trust |
| `surveillance_tech_exports` | Surveillance Deal | Revenue but reputation cost |
| `natasha_departed` | Resignation | Moderate path |
| `natasha_arrested` | Resignation | Hardline path |
| `natasha_empowered` | Resignation | Reform path |

### Pipeline Path Flags
| Flag | Set By | Effect |
|------|--------|--------|
| `northern_pipeline_approved` | New Route | Major investment committed |
| `weaponized_gas` | Cold Winter | Used energy as weapon |
| `china_gas_pivot` | Asian Pivot | Dependency shift |
| `gazov_fired` | Desperation | Leadership change |
| `pipeline_default` | Stranded Assets | Financial crisis |

### Fortress Path Flags
| Flag | Set By | Effect |
|------|--------|--------|
| `full_import_ban` | Import Ban | Maximum autarky |
| `import_ban_theater` | Import Ban | Rhetoric without enforcement |
| `forced_repatriation` | Ideological Purity | Elite asset seizure |
| `viktor_dismissed` | Doubts | Leadership change |
| `tolerated_black_market` | Black Market | Parallel economy |

---

## Theme Elements

- **Border Color:** #4682B4 (Steel Blue)
- **Accent Color:** #B8860B (Dark Goldenrod)
- **Icon:** 📊

## Tone Notes

- Economic policy is usually boring. Make it personal and dramatic.
- Every economic choice has human faces: engineers leaving, farmers without tractors, babushkas in pharmacy lines.
- The dark comedy comes from the gap between ideological promises and economic reality.
- No path is "right" - each has genuine appeal and genuine catastrophe.
- The reckoning should feel inevitable but not predetermined - your choices shaped how it unfolds.
- Reference real examples: Soviet industrialization, resource curse, tech bubbles.
- The Central Banker is the voice of sanity nobody listens to.

---

## Estimated Event Count: 42

- Entry: 1 (five_year_plan)
- Silicon Steppe: 12 events
- Pipeline State: 12 events
- Fortress Economy: 12 events
- Shared Reckoning: 5 events

Total: ~42 events

