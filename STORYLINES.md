# Storylines and Events Guide

## Overview

This document outlines the major storylines and basic recurring events for **The Oligarch's Gambit**. Storylines are multi-event narrative arcs that create dramatic story beats, while basic events are recurring situations that can happen multiple times.

---

## Major Storylines

### 1. Special Military Operation

**Inspired by:** The 2022 invasion of Ukraine

**Core Concept:** The decision to invade a neighboring territory and the cascading consequences that follow.

**Initial Event:** "A Neighboring Territory"
- Trigger: Available early game
- Decision Point: Launch, Delay, or Reject invasion

**Story Branches:**

#### Branch A: Launch the Invasion

**Immediate Adds to Pool:**
- `war_quick_victory` (mutual exclusive with stall)
- `war_stalls_at_capital` (mutual exclusive with victory)
- `war_profiteering` (defense contracts)
- `conscription_crisis` (need more troops)
- `sanctions_wave_1` (Western response)

**Quick Victory Path:**
- `occupation_resistance` - Guerrilla warfare
- `annexation_ceremony` - Make it official
- `international_isolation` - Diplomatic consequences
- `victory_parade` - Propaganda opportunity

**Stalls at Capital Path:**
- `generals_demand_mobilization` - Need more troops
- `equipment_failures` - Corruption catches up
- `war_crimes_allegations` - International pressure
- `retreat_or_escalate` - Major decision point

**Profiteering Subplot:**
- Track: Decision counts for accepting corrupt contracts
- Triggers: `military_disaster` if corruption too high
- Effects: Compounds with other war events

**Ending Events:**
- `pyrrhic_victory` - Won but at massive cost
- `catastrophic_defeat` - Complete failure
- `frozen_conflict` - Stalemate
- `negotiated_settlement` - Compromise

**Legacy Outcomes:**
- High legacy: "Conqueror" (+25)
- Medium legacy: "Liberator" (+12)
- Low legacy: "Strategic Failure" (-25)
- Criminal legacy: "War Criminal" (-30)

---

### 2. Oil & Gas Adventure

**Inspired by:** Russian energy politics and pipeline diplomacy

**Core Concept:** Using energy resources as geopolitical leverage and economic power.

**Initial Event:** "The Pipeline Opportunity"
- Trigger: Early-mid game
- Decision: Route through nephew, fill treasury, or international partnership

**Story Branches:**

#### Branch A: Energy Weapon Path

**Events:**
- `gas_cutoff_threat` - Use supply as leverage
- `europe_energy_crisis` - Watch them suffer
- `alternative_supply_search` - They're looking elsewhere
- `pipeline_sabotage` - Mysterious explosion
- `china_gas_deal` - Pivot East

**Key Mechanics:**
- Track: Times you weaponize energy
- Effects: Short-term treasury gains, long-term customer loss
- Triggers: `permanent_customer_loss` after too much weaponization

#### Branch B: Corruption Path

**Events:**
- `nephew_incompetence` - He's terrible at this
- `pipeline_cost_overruns` - Money disappearing
- `foreign_investigation` - They're following the money
- `shell_company_exposed` - Paper trail found

#### Branch C: Strategic Reserve Path

**Events:**
- `oil_price_manipulation` - Flood or restrict supply
- `opec_negotiations` - Cut deals with other producers
- `energy_modernization` - Invest in infrastructure
- `green_energy_threat` - Europe going solar/wind

**Ending Events:**
- `energy_empire` - Total dominance (+20 legacy)
- `stranded_assets` - World moved on (-15 legacy)
- `pipeline_king` - Infrastructure magnate (+18 legacy)
- `environmental_pariah` - Climate villain (-12 legacy)

---

### 3. Regional Independence Crisis

**Inspired by:** Chechnya, various separatist movements

**Core Concept:** A resource-rich region wants independence. How do you handle it?

**Initial Event:** "The Breakaway Province"
- Trigger: Mid game, or after "anger" threshold
- Setup: Oil-rich region, ethnic tensions, charismatic leader

**Story Branches:**

#### Branch A: Military Solution

**Events:**
- `send_in_troops` - Initial deployment
- `urban_warfare_nightmare` - City fighting
- `civilian_casualties_mounting` - Collateral damage
- `international_condemnation` - UN, ICC involvement
- `insurgency_or_pacification` - Did it work?

**Track:** Brutality level affects outcomes

#### Branch B: Political Solution

**Events:**
- `negotiation_offer` - Autonomy vs. independence
- `hardliner_backlash` - Nationalists angry at you
- `federalization_debate` - Constitutional changes
- `referendum_rigging` - Stage a vote

#### Branch C: Scorched Earth

**Events:**
- `resource_extraction_intensifies` - Grab what you can
- `population_displacement` - Clear them out
- `install_puppet_government` - Replace leadership
- `perpetual_occupation` - Endless military presence

**Ending Events:**
- `brutal_peace` - Won through force (-18 legacy)
- `negotiated_autonomy` - Compromise (+5 legacy)
- `regional_independence` - They won (game doesn't end but major loss)
- `pyrrhic_pacification` - Destroyed the region to save it (-22 legacy)

---

### 4. Student Protest Movement

**Inspired by:** 2011-2012 Russian protests, various color revolutions

**Core Concept:** Educated, organized youth movement demanding change.

**Evolution:** Starts as basic recurring event, becomes storyline

#### Phase 1: Basic Protests (Recurring Event)

**Event:** "Small Street Protest"
- Frequency: Can happen repeatedly
- Track decisions:
  - `do_nothing` - Ignore them
  - `propaganda_response` - Media campaign
  - `light_crackdown` - Arrests, fines
  - `lethal_force` - Violent suppression

**Decision Tracking Triggers:**

- **Do Nothing x5** → `massive_peaceful_protest` added to pool
- **Propaganda x3** → `media_savvy_activists` (they're countering you)
- **Light Crackdown x4** → `prison_martyrs` (arrests backfiring)
- **Lethal Force x2** → `organized_resistance` (now it's serious)

#### Phase 2: Organized Movement (Storyline)

**Triggers after:** 2+ uses of lethal force OR 5+ protests ignored

**Events:**
- `student_leader_emerges` - Charismatic spokesperson
- `international_support` - Western NGOs helping
- `general_strike_threat` - Spreading beyond students
- `oligarch_defection` - One of your elites joins them

**Story Branches:**

#### Branch A: Repression

**Events:**
- `mass_arrests_begin` - Thousands detained
- `show_trials` - Public prosecutions
- `foreign_agent_laws` - Label them traitors
- `complete_crackdown` - Martial law

#### Branch B: Co-optation

**Events:**
- `fake_reforms_announced` - Promise changes
- `corrupt_student_leaders` - Buy some off
- `controlled_opposition` - Let them have token victories
- `parliamentary_seats_offer` - Absorb them into system

#### Branch C: Distraction

**events:**
- `foreign_enemy_needed` - Start a crisis elsewhere
- `nationalist_rally_staged` - Counter-protest
- `propaganda_blitz` - Flood the zone
- `limited_concessions` - Give something small

**Ending Events:**
- `movement_crushed` - Repression succeeded (-20 legacy)
- `movement_absorbed` - They're part of the system now (+8 legacy)
- `exile_leaders` - They fled to the West (-8 legacy)
- `ongoing_resistance` - Never truly defeated (permanent anger +10)

---

### 5. Internal Challenger

**Inspired by:** Prigozhin's mutiny, various oligarch conflicts

**Core Concept:** Someone within your power structure challenges you directly.

**Initial Event:** "The Ambitious General" or "The Rival Oligarch"
- Trigger: Mid-late game, or after certain storyline choices
- Setup: Powerful insider with independent power base

**Story Branches:**

#### Branch A: Immediate Elimination

**Events:**
- `arrest_on_fabricated_charges` - Legal route
- `polonium_accident` - Permanent solution
- `exile_and_seizure` - Take their assets
- `show_trial_spectacle` - Public humiliation

**Consequences:** Quick but risky, might anger their supporters

#### Branch B: Political Maneuvering

**Events:**
- `divide_their_supporters` - Peel off allies
- `kompromat_release` - Leak dirt on them
- `offer_golden_exile` - Pay them to leave
- `power_sharing_deal` - Bring them into the fold

#### Branch C: Let Them Grow

**Events:**
- `parallel_power_structure` - They're building an alternative
- `oligarch_split` - Elites choosing sides
- `coup_attempt` - They make their move
- `civil_war_brink` - Full conflict possible

**Ending Events:**
- `challenger_eliminated` - You won (+15 legacy)
- `negotiated_power_share` - Uneasy alliance (+5 legacy)
- `survived_coup_attempt` - Close call (-10 elite permanently)
- `replaced_in_coup` - GAME OVER

---

### 6. International Sanctions Spiral

**Inspired by:** Post-2014 and post-2022 sanctions regimes

**Core Concept:** The West's economic warfare against you.

**Trigger:** Conditional on other storylines
- Launches after: War, assassinations, major human rights violations
- Can be triggered by: Multiple "bad" decisions in other storylines

**Phases:**

#### Phase 1: Initial Sanctions

**Event:** "Targeted Sanctions"
- Asset freezes on oligarchs
- Travel bans
- Limited sectoral restrictions

#### Phase 2: Escalation

**Events:**
- `swift_disconnection` - Cut off from banking
- `oil_embargo_threat` - Energy sector targeted
- `technology_export_ban` - No advanced imports
- `foreign_reserves_frozen` - Massive treasury hit

#### Phase 3: Economic Warfare

**Events:**
- `secondary_sanctions` - Countries that help you get punished
- `asset_seizures` - They're taking yachts, properties
- `brain_drain_accelerates` - Educated people fleeing
- `currency_collapse` - Ruble in freefall

**Response Options (recurring):**

**Event:** "Sanctions Bite"
- Can happen multiple times as sanctions persist
- Choices:
  - `defiance_rhetoric` - Tough talk, no action
  - `import_substitution` - Try to make everything domestically
  - `sanctions_evasion` - Shell companies, gray markets
  - `seek_negotiation` - Try to get them lifted

**Track:** Which response strategy you use most

**Ending Events:**
- `economic_adaptation` - Found ways around it (+12 legacy)
- `economic_collapse` - They broke you (-25 legacy, near game over)
- `sanctions_normalized` - New permanent reality (-10 legacy)
- `sanctions_lifted` - You won the standoff (+20 legacy, rare)

---

## Basic Recurring Events

These events can happen multiple times and stay in the active pool. Many track decision counts.

### 1. Street Protests (Basic)

**Event:** "Protest in the City"
- **Frequency:** Common when anger > 40
- **Remains in pool:** Yes
- **Choices:**
  - Do nothing (small anger increase)
  - Propaganda response (cost treasury, small anger decrease)
  - Violent crackdown (anger spike, elite approval)

**Decision Tracking:**
- Violent crackdown x3 → Adds `organized_student_movement` to pool

---

### 2. Corruption Opportunity (Basic)

**Event:** "The Eager Businessman"
- **Frequency:** Common, always available
- **Remains in pool:** Yes
- **Choices:**
  - Accept bribe (personal wealth up, treasury down)
  - Demand higher cut (more wealth, risk elite anger)
  - Refuse and investigate (elite down, anger down)

**Decision Tracking:**
- Accept bribe x10 → Adds `anti_corruption_crusader` (rival) to pool
- Refuse x5 → Adds `reputation_for_integrity` legacy

---

### 3. Western Criticism (Basic)

**Event:** "International Condemnation"
- **Frequency:** Varies based on actions
- **Remains in pool:** Yes
- **Choices:**
  - Ignore them (no effect)
  - Defiant response (elite up, sanctions risk)
  - Symbolic concession (anger down, elite down)

**Conditional:** More common if you're in war or crackdown storylines

---

### 4. Economic Crisis (Basic)

**Event:** "Currency Instability"
- **Frequency:** Increases with low treasury
- **Remains in pool:** Yes
- **Choices:**
  - Print money (short term fix, long term disaster)
  - Austerity measures (anger up, stabilizes economy)
  - Raid reserve funds (treasury down, temporary fix)

**Decision Tracking:**
- Print money x3 → Adds `hyperinflation_crisis` to pool

---

### 5. Oligarch Loyalty Test (Basic)

**Event:** "The Billionaire's Request"
- **Frequency:** Regular
- **Remains in pool:** Yes
- **Choices:**
  - Grant favor (elite up, treasury/wealth effects vary)
  - Refuse (elite down)
  - Demand payment for favor (wealth up, elite neutral)

**Decision Tracking:**
- Grant favor x7 → Oligarchs very loyal (elite floor +10)
- Refuse x5 → Oligarchs nervous, more likely to defect

---

### 6. Media Control (Basic)

**Event:** "Inconvenient News Story"
- **Frequency:** Common
- **Remains in pool:** Yes
- **Choices:**
  - Censor it (anger up, cost treasury)
  - Distraction campaign (cost treasury, no anger)
  - Let it run (anger up, save money)

**Decision Tracking:**
- Censor x5 → Adds `underground_media_network` to pool

---

### 7. Infrastructure Decay (Basic)

**Event:** "Crumbling Roads and Bridges"
- **Frequency:** Increases over time
- **Remains in pool:** Yes
- **Choices:**
  - Repair properly (expensive, anger down)
  - Cheap fixes (less expensive, temporary)
  - Ignore (free, anger up)

**Decision Tracking:**
- Ignore x4 → Adds `infrastructure_collapse` crisis event

---

### 8. Food Price Inflation (Basic)

**Event:** "The Price of Bread"
- **Frequency:** Common when economy struggling
- **Remains in pool:** Yes (variant in current game is storyline-triggered)
- **Choices:**
  - Subsidize (expensive, anger down)
  - Blame the West (cheaper, propaganda)
  - Let market work (free, anger up)

---

### 9. Military Funding Request (Basic)

**Event:** "The Generals Want More"
- **Frequency:** Regular
- **Remains in pool:** Yes
- **Choices:**
  - Full funding (treasury down, elite up)
  - Partial funding (moderate cost, neutral)
  - Deny request (elite down, save money)

**Decision Tracking:**
- Deny x3 → Military coup risk increases

---

### 10. International Summit Invitation (Basic)

**Event:** "The G20 Meeting"
- **Frequency:** Yearly
- **Remains in pool:** Yes
- **Choices:**
  - Attend (cost, potential benefits)
  - Send representative (cheaper, less impact)
  - Boycott defiantly (free, elite up, isolation)

**Conditional:** May be rescinded if sanctions active

---

## Special Conditional Events

These events only appear under specific conditions, often related to multiple storylines.

### Multiple Storyline Intersections

**Example:** "The Perfect Storm"
- **Conditions:**
  - Active war storyline
  - Active sanctions storyline
  - Active protest storyline
  - Treasury < 400
- **Effect:** Massive crisis, multiple metrics at risk
- **Choices:** All bad, pick least worst option

### Legacy-Triggered Events

**Example:** "The War Crimes Tribunal"
- **Conditions:**
  - Has legacy: "War Criminal" or "Butcher"
  - NOT in active war
  - Year > 4
- **Effect:** International prosecution attempt
- **Choices:** Defy them, negotiate, surrender (game over)

---

## Event Pool Management Guidelines

### Starting Active Pool (~25 events)

**Composition:**
- 15 basic recurring events
- 5 storyline initiator events
- 5 flavor/variety events

**Balance:**
- Mix of low and high stakes
- Various metric targets (wealth, treasury, elite, anger)
- Enough variety to not feel repetitive

### Mid-Game Pool (~30 events)

**Composition:**
- 10 basic recurring events (some removed as resolved)
- 10 active storyline events (multiple storylines running)
- 5 conditional events (based on state)
- 5 flavor events

### Late-Game Pool (~25 events)

**Composition:**
- 8 basic recurring events
- 7 storyline conclusion events
- 5 legacy-triggered events
- 5 endgame crisis events

---

## Design Principles

### For Basic Events:
1. Should be interesting even the 3rd or 4th time
2. Track decisions for consequences
3. No single "correct" answer
4. Vary which metrics they affect
5. Keep in pool unless explicitly removed

### For Storylines:
1. Clear beginning, middle, end
2. Multiple paths (2-3 minimum)
3. Dramatic conclusion with high legacy impact
4. Remove all storyline events when complete
5. Can intersect with other storylines
6. Should feel like a "season" of a TV show

### For Conditional Events:
1. Rewards (or punishes) player patterns
2. Creates "Oh no, my choices are catching up with me" moments
3. Should feel earned/logical
4. Can be positive or negative
5. Often bridges between storylines

---

## Implementation Notes

### Event Tags

All events should include a `type` field:

```javascript
{
    id: "event_id",
    type: "basic", // or "storyline", "conditional", "conclusion"
    storyline: "special_military_operation", // if applicable
    // ... rest of event
}
```

### Decision Tracking

Track with specific keys:

```javascript
decisionCounts: {
    "protest_movement_lethal": 3,
    "corruption_accept": 7,
    "war_profiteering_accept": 2,
    // etc.
}
```

### Pool Management

Events specify pool operations:

```javascript
{
    addToPool: ["event_id_1", "event_id_2"],
    removeFromPool: ["event_id_3"],
    removeFromPool: ["*storyline:old_storyline"], // Remove all events from a storyline
}
```

---

## Future Storyline Ideas

- **The Offshore Empire** - Building and hiding your wealth
- **The Cult of Personality** - Media and propaganda as you become a "dear leader"
- **The Nuclear Option** - Weapons development and threats
- **The Arab Spring Moment** - Multiple regions rebelling simultaneously
- **The Health Crisis** - Your health failing, succession urgent
- **The Climate Catastrophe** - Environmental disaster in your territory
- **The Cyber Warfare** - Digital attacks and defense
- **The Religious Schism** - Church-state relations explode

---

This document will evolve as we build out the full event library. Each storyline should ultimately have 8-15 events, with multiple endings possible.
