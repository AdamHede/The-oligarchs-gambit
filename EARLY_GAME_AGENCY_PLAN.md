# Early Game Agency Plan - v2.1 Update

## Problem Statement

**Current Early Game Issues:**
- Players start with 7 random events weighted toward low-impact "common" rarity events
- Major storylines (War, Popular Uprising, Succession) are gated by rarity/weight and unlikely to appear immediately
- Player is **reactive** - events happen TO them rather than player setting agenda
- No clear sense of "what kind of dictator am I building?"
- Small-scale corruption dilemmas don't establish strategic direction

**Late Game Strengths (To Preserve):**
- Escalating pressure from interlocking crises
- Organic death spirals from compounding choices
- Parallel narrative system creating overwhelming experience
- Real strategic tension between Elite/Anger/Treasury trade-offs

## Design Goals

1. **Increase early game agency** - Player makes agenda-setting choices in first 5-10 turns
2. **Create strategic direction** - Early choices influence which storylines dominate
3. **Maintain satire** - No "heroic" choices, all options involve moral compromise
4. **Front-load character/narrative** - Establish recurring characters and themes early
5. **Preserve mechanical balance** - Don't break existing resource economics

---

## Idea 1: "The Inner Circle" - Opening Power Consolidation

### Concept
A high-weight event appearing in the first 2-3 turns where your inner circle meets and you choose which faction to empower. This sets your early strategic direction.

### Event Design

**Event ID:** `dacha_summit`
**Title:** "The Dacha Summit"
**Weight:** 25 (extremely high to ensure early appearance)
**Rarity:** legendary
**Conditions:** Year 1, Quarter 1-3 only

**Description:**
"Your inner circle gathers at the presidential dacha. The fireplace crackles. Vodka flows. Each faction leader makes their pitch for your priorities. The Generals want military expansion. The Oligarchs want stability and contracts. The Patriots want spectacle and blood. The Technocrats... well, they're just trying to keep the lights on."

**Choices:**

1. **"The future belongs to the Siloviki"**
   - Stats: Elite +10, Treasury -50, Personal Wealth +5
   - Sets flag: `aligned_military`
   - Effects: Increases weight of `war-invasion` and `shadow-war` storylines by 50%
   - Removes self from deck
   - Legacy impact: Frames future military events as strategic vision

2. **"We serve the Oligarchs' interests"**
   - Stats: Elite +15, Treasury +50, Personal Wealth +10
   - Sets flag: `aligned_business`
   - Effects: Increases weight of `energy-politics` by 50%, decreases `war-invasion` by 50%
   - Removes self from deck
   - Legacy impact: Economic events become opportunities, not crises

3. **"We give the Patriots their glory"**
   - Stats: Anger -10, Elite +5, Treasury -30
   - Sets flag: `aligned_patriots`
   - Effects: Increases weight of `religious-revival` storyline by 50%
   - Removes self from deck
   - Legacy impact: Justifies repression as moral crusade

4. **"Play them against each other - I bow to no one"**
   - Stats: No immediate changes
   - Sets flag: `balanced_approach`
   - Effects: All storylines remain equally weighted (current behavior)
   - Removes self from deck
   - Legacy impact: Creates unpredictability, may trigger succession crisis earlier

### Mechanical Requirements
- **Dynamic weight modification**: System to adjust storyline weights based on flags
- **Time-gated conditions**: Events restricted to specific Year/Quarter ranges
- **Once-only events**: High weight initially, self-removes after first appearance

---

## Idea 2: "First Big Move" - Proactive Crisis Creation

### Concept
An early event (appears in first 5 turns) where player can choose to launch a major initiative. Unlike current events where crises happen TO you, this lets you START something deliberately.

### Event Design

**Event ID:** `first_big_move`
**Title:** "The First Big Move"
**Weight:** 20
**Rarity:** epic
**Conditions:** Year 1, Quarter 2-5, NOT if player already triggered major storyline

**Description:**
"Six months into your consolidation of power. The Federation is stable. Perhaps too stable. Your advisors present several... opportunities. Bold action now could cement your legacy. Or hasten your fall."

**Choices:**

1. **"Launch 'Operation Unity' - annex those disputed territories"**
   - Stats: Elite +15, Treasury -100, Personal Wealth +10
   - Effects:
     - Immediately adds `special_military_operation` to deck (war-invasion entry)
     - Sets flag: `war_started_deliberately`
     - Removes self from deck
   - Narrative: YOU chose war, not generals pressuring you - different framing

2. **"Nationalize key industries - take back what's ours"**
   - Stats: Treasury +200, Elite -25, Personal Wealth +20
   - Effects:
     - Adds custom "Oligarch Backlash" event chain to deck
     - Sets flag: `nationalization_enacted`
     - Removes self from deck
   - Consequences: Oligarchs begin plotting, capital flight risk

3. **"Build the Cathedral of the Motherland - 500 meters of gold"**
   - Stats: Anger -15, Treasury -150, Elite +5
   - Effects:
     - Starts `religious-revival` storyline early
     - Sets flag: `grand_project_started`
     - Adds recurring "Cathedral Progress" events
     - Removes self from deck
   - Narrative: Spectacle politics, opiate of the masses

4. **"Consolidate power quietly - patience is wisdom"**
   - Stats: Treasury +50, Personal Wealth +5, Elite +5
   - Effects: Removes self from deck, no major early move
   - Legacy impact: Sets `cautious_leader` flag

### Follow-up Events

**Oligarch Backlash Chain** (triggered by nationalization):
- `oligarch_exodus_begins` - Capital flight, -50 Treasury per quarter
- `frozen_assets_abroad` - Your personal wealth frozen in response
- `oligarch_assassination_plot` - Elite faction turns dangerous

**Cathedral Progress** (recurring):
- Quarterly drain: -25 Treasury, -2 Anger
- Eventually completes with major propaganda win
- Can be abandoned for Elite penalty

### Mechanical Requirements
- **Conditional storyline triggers**: Ability to add storyline entry events directly to deck
- **Custom event chains**: Mini-storylines that aren't part of main nine
- **Recurring event templates**: Events that repeat on timer/condition

---

## Idea 3: "Your Defining Doctrine" - Ideological Framing

### Concept
Instead of pure mechanical effects, this event sets *narrative flavor* that recontextualizes future events. Same events, different framing based on your stated ideology.

### Event Design

**Event ID:** `inaugural_address`
**Title:** "The Inaugural Address"
**Weight:** 18
**Rarity:** rare
**Conditions:** Year 1, Quarter 1-4

**Description:**
"Your speechwriter asks: what is the defining principle of your rule? This will be repeated in every speech, every decree, every monument inscription for years to come."

**Choices:**

1. **"Restoring the Great Empire's Glory"**
   - Stats: Elite +5, Anger -5
   - Sets legacy marker: `"The Revanchist"` (neutral, 0 points initially)
   - Sets flag: `ideology_empire`
   - Effects:
     - War events get +2 weight
     - War events framed as "restoration" not "aggression"
     - Foreign conquest described as "reunification"

2. **"Traditional Values Against Western Decadence"**
   - Stats: Anger -10, Elite +3
   - Sets legacy marker: `"The Moralist"` (neutral, 0 points initially)
   - Sets flag: `ideology_tradition`
   - Effects:
     - Religious-revival +2 weight
     - Repression events justified as moral crusade
     - Western sanctions described as "spiritual warfare"

3. **"Economic Sovereignty and Self-Sufficiency"**
   - Stats: Treasury +50, Elite +8
   - Sets legacy marker: `"The Autarch"` (neutral, 0 points initially)
   - Sets flag: `ideology_economy`
   - Effects:
     - Energy-politics events prioritized
     - Sanctions events reframed as opportunity for autarky
     - Import substitution failures more damaging (hypocrisy)

4. **"Stability Above All - Peace and Order"**
   - Stats: Anger -8, Treasury +30
   - Sets legacy marker: `"The Stabilizer"` (neutral, 0 points initially)
   - Sets flag: `ideology_stability`
   - Effects:
     - Popular-uprising events hit harder (broken promise)
     - Repression events justified as maintaining calm
     - War events more costly to Elite (contradicts doctrine)

### Mechanical Requirements
- **Narrative variation system**: Same event, different description text based on flags
- **Legacy tracking enhancement**: Multiple legacy markers, some gained early
- **Conditional event text**: Event descriptions that check flags and vary accordingly
- **Weight modifiers**: Small persistent weight changes based on ideology

### Example Narrative Variation

**Same Event (War Decision), Different Framing:**

**Base version:**
"The Generals present 'Operation Unity' - a quick strike to secure the border territories."

**If `ideology_empire` flag set:**
"The Generals present 'Operation Unity' - finally, a chance to undo the humiliation of '91 and restore what was always ours."

**If `ideology_stability` flag set:**
"The Generals present 'Operation Unity' - a reckless adventure that could destabilize everything you've built. But they're insistent..."

**If `ideology_economy` flag set:**
"The Generals present 'Operation Unity' - just when the economy is recovering. The cost could be staggering."

---

## Idea 4: "The Rival" - Early Character-Driven Event

### Concept
Introduce a specific recurring character early who becomes a through-line. Creates narrative continuity and makes early choices feel consequential when character reappears.

### Event Design

**Event ID:** `aluminum_king_introduction`
**Title:** "The Aluminum King"
**Weight:** 16
**Rarity:** rare
**Conditions:** Year 1, Quarter 2-6

**Description:**
"Dmitri, your old friend from university, now controls 60% of the Federation's aluminum. He visits your office with a gift: a Patek Philippe worth more than a helicopter. 'We go back a long way,' he says. 'I just want to make sure we stay... aligned.'"

**Choices:**

1. **"Embrace him as your partner - we rise together"**
   - Stats: Elite +10, Personal Wealth +15, Treasury -50
   - Sets counter: `dmitri_relationship` = 100 (allied)
   - Sets flag: `dmitri_allied`
   - Removes self, adds `dmitri_opportunity_1` to deck
   - Future: Dmitri offers lucrative deals, defends you in Elite circles

2. **"Keep him at arm's length - professional only"**
   - Stats: Elite +5, Personal Wealth +5
   - Sets counter: `dmitri_relationship` = 50 (neutral)
   - Sets flag: `dmitri_neutral`
   - Removes self, adds `dmitri_transaction_1` to deck
   - Future: Dmitri is transactional, no favors but no betrayal

3. **"Subtle threat - remind him who's in charge"**
   - Stats: Elite -5, Personal Wealth +5, Treasury +25
   - Sets counter: `dmitri_relationship` = 25 (cowed)
   - Sets flag: `dmitri_cowed`
   - Removes self, adds `dmitri_resentment_1` to deck
   - Future: Dmitri fears you publicly, may betray when opportune

4. **"Refuse the gift - arrest him for 'corruption'"**
   - Stats: Elite -20, Treasury +100, Personal Wealth +30
   - Sets counter: `dmitri_relationship` = 0 (eliminated)
   - Sets flag: `dmitri_arrested`
   - Removes self, adds `oligarch_exodus` to deck immediately
   - Future: Dmitri gone, but oligarchs terrified, capital flight begins

### Follow-up Event Chain

**If Allied (`dmitri_relationship` ≥ 75):**

**Event:** `dmitri_opportunity_1`
- "Dmitri tips you off about a Western aluminum shortage. If you coordinate output cuts, prices soar and you both profit enormously."
- Choices: Coordinate (Treasury +150, Personal Wealth +25), Refuse (slight Elite penalty)

**Event:** `dmitri_crisis_ally`
- "During the Western sanctions crisis, Dmitri uses his offshore networks to move your money through shell companies."
- Effect: Reduces personal wealth losses from sanctions by 50%

**If Neutral (`dmitri_relationship` 40-70):**

**Event:** `dmitri_transaction_1`
- "Dmitri proposes a state contract for aluminum. Market rate. Everything above-board. Boring, but safe."
- Choices: Accept (small Treasury cost, small Elite gain), Reject (no effect)

**If Cowed (`dmitri_relationship` 15-35):**

**Event:** `dmitri_resentment_1`
- "Your intelligence chief reports: Dmitri is meeting with foreign investors. Quietly moving assets abroad. Legal, technically. But disloyal."
- Choices: Confront him (further Elite penalty), Let it slide (he becomes bolder)

**Event:** `dmitri_betrayal`
- Appears if Elite drops below 30: "Dmitri backs your rival in the power struggle. 'I'm just being pragmatic,' he says."

**If Arrested (`dmitri_relationship` = 0):**

**Event:** `oligarch_exodus`
- Immediate trigger: "Within a week, three more oligarchs announce 'extended vacations' to Monaco. Capital is fleeing."
- Effect: -15 Elite, -100 Treasury, recurring quarterly drain

**Event:** `dmitri_prison_interview`
- One-time: "From prison, Dmitri gives a Western media interview. 'There is no law, only power,' he says."
- Effect: Anger +5, Legacy: "The Tyrant" (-10 points)

### Additional Rival Characters (Future Expansion)

- **Katerina, The Media Magnate** - Controls TV networks
- **General Volkov, The Hawk** - Always wants more aggression
- **Father Mikhail, The Patriarch** - Religious power broker
- **Alexei, The Technocrat PM** - Trying to keep economy functional

### Mechanical Requirements
- **Relationship counters**: Numeric tracking of character relationships (0-100 scale)
- **Character state flags**: Track fate of characters (allied, neutral, arrested, dead, exiled)
- **Conditional event chains**: Events that only appear based on character relationship state
- **Character-specific narrative**: Events reference past interactions with character

---

## Implementation Approach

### Phase 1: Core Systems (Technical Foundation)
1. **Time-gated conditions**: Extend condition evaluator to support Year/Quarter ranges
2. **Dynamic weight system**: Ability to modify storyline weights based on flags at runtime
3. **Once-only events**: Event property to remove self after first appearance
4. **Relationship counters**: Named numeric counters for character relationships

### Phase 2: Early Game Storyline (Content)
1. Create `early-game-agenda.storyline.js` with Ideas 1-4 implemented
2. Implement 4 core events + 8-10 follow-up events
3. Write narrative variations for existing events based on new flags
4. Balance stat changes to maintain current economic pressure

### Phase 3: Integration & Testing
1. Integrate early-game events into initial deck with high weights
2. Test that events appear in first 5 turns consistently
3. Verify storyline weight modifications work correctly
4. Playtest different paths to ensure balance

### Phase 4: Narrative Enhancement (Optional)
1. Add character portraits/icons for recurring characters
2. Create "ideology summary" UI showing chosen doctrine
3. Add "relationship panel" showing character states
4. Enhanced legacy screen showing how early choices shaped game

---

## Success Metrics

**Player Agency:**
- [ ] Players feel they're setting direction, not just reacting
- [ ] Early choices create visible consequences in mid-game
- [ ] Different early paths create noticeably different game experiences

**Pacing:**
- [ ] First 5 turns feel more engaging than current version
- [ ] Transition from early → mid game feels natural
- [ ] Late game death spirals still emerge organically

**Balance:**
- [ ] Average game length remains 40-80 turns
- [ ] Resource economy maintains current pressure levels
- [ ] No dominant strategy emerges from early choices

**Narrative:**
- [ ] Recurring characters create emotional investment
- [ ] Ideological framing makes satire sharper
- [ ] Players remember their "defining moment" choices

---

## Future Expansion Ideas

### "The First 100 Days" Series
- 5-6 connected events in Year 1 forming a structured tutorial/setup phase
- Each presents a different aspect of rule (military, economic, social, foreign)
- Choices in each affect options in subsequent events

### Regional Crisis System
- Early choice of which region to prioritize (Siberia, Caucasus, Western Border)
- Creates location-based event chains
- Neglected regions become crisis zones later

### Cabinet Building
- Choose your Minister of Defense, Finance, Interior
- Each has personality and relationship meter
- May be loyal or betray based on your choices

### International Rival
- Choose early foreign policy stance toward "The Empire" (USA), "The Union" (EU), "The Dragon" (China)
- Creates diplomatic rival who appears in multiple events
- Rival may offer deals, impose costs, or exploit weaknesses

---

## Open Questions

1. **Weight modification magnitude**: Should aligned storylines get +50% weight, +100%, or fixed +5 bonus?
2. **Once-only enforcement**: Should early events be truly once-only, or rare recurring?
3. **Ideology impact**: Should ideology purely affect narrative, or also create mechanical bonuses/penalties?
4. **Character proliferation**: How many recurring characters before it's overwhelming?
5. **Difficulty calibration**: Should early agency make game easier or just more interesting?

---

## Appendix: Technical Specifications

### New Event Properties

```javascript
{
    // Existing properties
    id: string,
    title: string,
    description: string,
    weight: number,
    recurring: boolean,
    rarity: string,
    storylines: string[],
    conditions: object,
    choices: array,

    // NEW properties for v2.1
    timeGate: {
        minYear: number,      // Only appears >= this year
        maxYear: number,      // Only appears <= this year
        minQuarter: number,   // Only appears >= this quarter
        maxQuarter: number    // Only appears <= this quarter
    },
    onceOnly: boolean,        // If true, removes self after first draw
    weightModifiers: {        // Dynamic weight changes
        conditions: object,   // Same format as event conditions
        multiplier: number    // Weight * this if conditions met
    },
    narrativeVariations: [    // Multiple descriptions based on flags
        {
            conditions: object,
            description: string,
            title: string  // Optional title variation
        }
    ],
    characterId: string       // Links event to recurring character
}
```

### New Condition Types

```javascript
// Time-based conditions
{
    year: { gte: 1, lte: 2 },           // Year 1-2 only
    quarter: { gte: 1, lte: 4 },        // Q1-Q4
    turn: { gte: 1, lte: 10 }           // Absolute turn count
}

// Relationship conditions
{
    relationship: "dmitri",
    gte: 75                              // Dmitri relationship >= 75
}

// Complex storyline state
{
    storylineActive: "war-invasion"      // War storyline has events in deck
}
```

### New Effect Types

```javascript
{
    // Existing effect types: stats, counters, flags, legacy, deck operations

    // NEW: Dynamic weight modification
    modifyStorylineWeight: {
        storyline: "war-invasion",
        multiplier: 1.5              // 50% increase
    },

    // NEW: Relationship changes
    relationship: {
        character: "dmitri",
        change: 25                   // +25 to relationship (0-100 scale)
    },

    // NEW: Add custom event chain
    addEventChain: {
        events: ["event_1", "event_2", "event_3"],
        delay: 2                     // Add to deck after 2 turns
    }
}
```

---

*This document is a living design spec. Update as implementation reveals new requirements or balancing needs.*
