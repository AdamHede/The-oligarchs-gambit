# The Oligarch's Gambit - Design & Event Creation Guide

## Overview
The Oligarch's Gambit is a satirical political simulation game exploring authoritarian power dynamics, corruption, and the balancing act between enriching oneself and maintaining control. This document guides future event creation and maintains consistency in tone, mechanics, and balance.

---

## Core Game Philosophy

### The Central Tension
The game revolves around managing four competing pressures:
1. **Personal Enrichment** - Siphoning wealth from the state
2. **Elite Loyalty** - Keeping oligarchs, generals, and officials happy
3. **Public Compliance** - Preventing revolution through fear or appeasement
4. **State Functionality** - Maintaining enough treasury to prevent collapse

The optimal strategy is aggressive wealth extraction while keeping the system from imploding. Players should feel the constant tension between greed and survival.

---

## Tone & Style Guidelines

### Target Audience
- Adults with interest in politics, history, and satire
- Players who appreciate dark humor and moral complexity
- Those interested in understanding authoritarian systems

### Tone Requirements

**DO:**
- Be brutally realistic about authoritarian tactics
- Use dark satire to highlight absurdities of power
- Reference real historical patterns (without naming specific people)
- Show consequences of corruption clearly
- Make moral choices feel genuinely difficult
- Use specific, concrete details (amounts, methods, consequences)
- Include gallows humor from the perspective of cynical advisors
- Show the human cost of decisions (protests crushed, journalists killed, poverty)

**DON'T:**
- Be gratuitously violent or gleeful about suffering
- Make light of real atrocities
- Use slurs or dehumanizing language
- Be preachy or moralistic
- Sugarcoat the brutality of authoritarian rule
- Shy away from showing the reality of corrupt systems

### Writing Style

**Voice:**
- Clinical and matter-of-fact when describing violence
- Darkly humorous when showing absurdity
- Specific with numbers and details
- Multiple advisor perspectives (FSB wants violence, PR wants optics, Finance wants money)

**Example of Good Tone:**
> "Your FSB chief offers three options: novichok, a car accident, or we could just shoot her in the elevator. Your PR chief suggests buying her off."

**Example of Too Light:**
> "You could make her go away! ;)"

**Example of Too Dark:**
> "Torture her slowly and post the videos online!"

---

## Technical Capabilities

### Game Metrics

#### Wealth Metrics (in Billions of Dollars)
- **Personal Wealth**: 0-200 billion
  - Starts at 10B
  - Typical effects: ±1-20B
  - Large events: ±30-50B
  - Display: "$XXB"

- **State Treasury**: 0-2000 billion
  - Starts at 1000B
  - Typical effects: ±20-100B
  - Large events: ±150-300B
  - Display: "$XXB"
  - Threshold warning: <100B (critical)

#### Percentage Metrics
- **Elite Approval**: 0-100%
  - Starts at 50%
  - Typical effects: ±5-15%
  - Critical threshold: <10% (coup risk)
  - Display: "XX%"

- **Public Anger**: 0-100%
  - Starts at 20%
  - Typical effects: ±5-20%
  - Critical threshold: >90% (revolution risk)
  - Display: "XX%"

### Event Structure

```javascript
{
    id: "unique_event_id",
    title: "Event Title (Short, Punchy)",
    description: "2-4 sentences. Specific details. Advisor opinions. Stakes.",
    weight: 1-10, // Probability weight
    conditions: {
        personalWealth: 15,  // Minimum billions required
        treasury: 200,       // Minimum billions required
        elite: 40,           // Minimum % required
        anger: 35,           // Minimum % required
        year: 2,             // Minimum year required
        hasTriggered: ["event_id"]  // Requires previous event
    },
    onceOnly: true, // Optional: event only appears once
    choices: [
        {
            text: "Choice text (action-oriented, shows character)",
            effects: {
                personalWealth: 5,   // In billions
                treasury: -100,      // In billions
                elite: 10,           // In percentage points
                anger: 15            // In percentage points
            },
            legacy: {
                icon: "🎖️",
                name: "Legacy Name",
                weight: 8  // -20 to +20, see Legacy Guidelines
            },
            eventTriggers: ["subsequent_event_id"]  // Optional
        }
    ]
}
```

### Event Triggering System

**Weight-Based Selection:**
- Events with higher weight appear more frequently
- Default weight: 5
- Common events: 6-8
- Rare events: 2-4
- Critical story events: 10

**Conditional Triggers:**
- `conditions`: Requirements for event to appear
- `hasTriggered`: Chain events together
- `eventTriggers`: Flag events that can appear later
- `onceOnly`: Prevent repetition

**Dynamic Weight Modification:**
- Future feature: events can modify weights of other events
- Example: choosing war increases weight of war-related events

---

## Balance Guidelines

### Effect Scaling

#### Personal Wealth Effects (Billions)
- **Tiny**: ±1-2B (skimming, minor bribes)
- **Small**: ±3-5B (medium corruption, deals)
- **Medium**: ±6-10B (major corruption, asset seizures)
- **Large**: ±11-20B (massive deals, oligarch wealth)
- **Extreme**: ±20-50B (once-in-game opportunities)

#### Treasury Effects (Billions)
- **Tiny**: ±10-30B (minor programs)
- **Small**: ±40-80B (medium programs, subsidies)
- **Medium**: ±90-150B (major infrastructure, welfare)
- **Large**: ±160-250B (war, major economic policy)
- **Extreme**: ±260-400B (sanctions, economic collapse)

#### Elite Approval Effects (Percentage)
- **Tiny**: ±2-5% (minor favors/slights)
- **Small**: ±6-10% (arrests, appointments)
- **Medium**: ±11-15% (power sharing, major decisions)
- **Large**: ±16-25% (purges, constitutional changes)

#### Public Anger Effects (Percentage)
- **Tiny**: ±2-5% (minor scandals, small policies)
- **Small**: ±6-10% (corruption revelations, price increases)
- **Medium**: ±11-20% (repression, visible wealth displays)
- **Large**: ±21-35% (massacres, economic collapse)

### Balance Philosophy

**The Siphon Mechanic:**
Most events should offer ways to extract wealth at the cost of:
- Treasury depletion (directly taking from state)
- Elite anger (not sharing enough)
- Public anger (visible corruption)

**Typical Event Pattern:**
1. **Greedy Choice**: High personal wealth gain, high costs elsewhere
2. **Balanced Choice**: Moderate gains/costs across metrics
3. **Prudent Choice**: Sacrifice personal gain for stability

**Difficulty Curve:**
- Early game (Years 1-2): Easier to balance, lower stakes
- Mid game (Years 3-5): Rising tensions, harder choices
- Late game (Years 6+): Multiple crises, cascading failures

**Death Spiral vs Recovery:**
- Players should be able to recover from bad decisions
- But repeated bad choices create compound problems
- Treasury depletion triggers economic events
- High anger triggers protest events
- Low elite support triggers coup events

---

## Legacy Achievement System

### Purpose
Legacy achievements create memorable moments and affect final score. They represent historical reputation.

### Weight Guidelines

#### Positive Legacy (1-20 points)
- **Minor Achievement (1-5)**: Small symbolic wins
  - Example: "Master of Optics" (+4)
- **Moderate Achievement (6-10)**: Notable accomplishments
  - Example: "Kingbreaker" (+9) - Defeated rival oligarch
- **Major Achievement (11-15)**: Significant historical impact
  - Example: "Liberator" (+12) - Won a war
- **Legendary Achievement (16-20)**: Defining characteristics
  - Example: "President for Life" (+18) - Abolished term limits

#### Negative Legacy (-20 to -1 points)
- **Minor Scandal (-1 to -5)**: Embarrassing moments
  - Example: "Scapegoat Master" (-5) - Blamed innocents for failures
- **Moderate Scandal (-6 to -10)**: Serious damage to reputation
  - Example: "Economy Killer" (-8) - Destroyed central bank independence
- **Major Atrocity (-11 to -15)**: War crimes, mass repression
  - Example: "War Profiteer" (-15) - Equipped soldiers with faulty gear
- **Historical Infamy (-16 to -20)**: Defining evil
  - Example: "Sanctioned Pariah" (-12) - Became international outcast

#### Neutral Legacy (0 points)
Reserved for narrative moments without clear moral valence.

### Legacy Naming
- **Keep it punchy**: 1-4 words maximum
- **Use irony**: "Democratic Champion (87%)"
- **Reference history**: "Ice King" (gas cutoffs)
- **Be specific**: Not "Bad Person" but "War Profiteer"

### Legacy Icons
Choose emojis that clearly represent the achievement:
- ⚔️ Military/War
- 💰💸 Money/Corruption
- 🎭 Deception/Propaganda
- 👑 Power/Authority
- 🚀 Ambition/Vision
- 💀☠️ Death/Destruction
- 🏴‍☠️ Theft/Piracy
- 🤐 Silence/Censorship
- ⚖️ Justice (or "Justice")
- 🔒 Control/Surveillance

---

## Event Creation Checklist

When creating a new event, verify:

**Structure:**
- [ ] Unique ID (snake_case)
- [ ] Clear, punchy title
- [ ] 2-4 sentence description with specific details
- [ ] Appropriate weight (2-10)
- [ ] Conditions match difficulty intent
- [ ] 2-4 choices offering meaningful variety

**Balance:**
- [ ] Effects use appropriate magnitude (see Balance Guidelines)
- [ ] At least one choice offers wealth extraction
- [ ] At least one choice offers stability
- [ ] Choices feel meaningfully different
- [ ] No "obvious best choice" unless intentional

**Tone:**
- [ ] Maintains dark satirical tone
- [ ] Includes specific details (numbers, methods)
- [ ] Shows advisor perspectives when relevant
- [ ] Doesn't glorify violence
- [ ] Makes moral complexity clear

**Legacy (if included):**
- [ ] Icon fits the achievement
- [ ] Name is punchy and specific
- [ ] Weight matches impact (-20 to +20)
- [ ] Makes narrative sense

**Integration:**
- [ ] Uses eventTriggers if it sets up future events
- [ ] References hasTriggered if it's a continuation
- [ ] Conditions prevent it from appearing at wrong time

---

## Example Event Breakdown

Let's analyze a well-designed event:

```javascript
{
    id: "journalist_problem",
    title: "An Inconvenient Reporter",
    description: "An investigative journalist has documents proving you own 47 properties abroad, including a palace that cost more than your official salary for 200 years. She's publishing in 48 hours. Your FSB chief offers three options: novichok, a car accident, or we could just shoot her in the elevator. Your PR chief suggests buying her off.",
    weight: 7,
    conditions: {},
    choices: [
        {
            text: "Eliminate her. Make it look like a robbery gone wrong.",
            effects: { personalWealth: -1, treasury: -10, elite: 10, anger: 25 },
            legacy: { icon: "🤐", name: "Silencer", weight: 8 },
            eventTriggers: ["international_sanctions"]
        },
        {
            text: "Offer her $5M and a state TV anchor position.",
            effects: { personalWealth: -2, treasury: -15, elite: 0, anger: -5 },
            legacy: { icon: "📺", name: "Propagandist", weight: 5 }
        },
        {
            text: "Let it publish. Flood the zone with disinformation.",
            effects: { personalWealth: 0, treasury: -30, elite: -10, anger: 10 }
        }
    ]
}
```

**Why This Works:**

1. **Specific Details**: "47 properties," "48 hours," "cost more than 200 years salary"
2. **Multiple Perspectives**: FSB offers violence, PR offers money
3. **Dark Humor**: Casual mention of assassination methods
4. **Meaningful Choices**:
   - Violence (elite love it, public hates it, triggers sanctions)
   - Corruption (costs money, reduces anger, gets legacy)
   - Propaganda (expensive, elite don't care, moderate anger)
5. **Consequences**: First choice triggers international sanctions
6. **Legacy Design**: Different legacies for different choices, appropriate weights
7. **No Obvious Winner**: Each choice has serious tradeoffs

---

## Common Event Patterns

### The Corruption Dilemma
Offer personal wealth gain vs. state treasury health
- **Example**: Pipeline deals, defense contracts, privatization

### The Repression Choice
How brutal to be against opposition
- **Example**: Protests, dissidents, free press

### The Elite Bargain
Keep oligarchs happy vs. maintain personal power
- **Example**: Rival oligarchs, succession, power sharing

### The International Crisis
Short-term gain vs. long-term sanctions/isolation
- **Example**: Invasions, assassinations abroad, resource weaponization

### The Spectacle Event
Expensive displays of power vs. treasury conservation
- **Example**: Military parades, space programs, palaces

### The Economic Crisis
How to handle self-inflicted economic damage
- **Example**: Inflation, bank failures, currency collapse

---

## Future Expansion Ideas

### New Mechanics to Consider
- **Succession system**: Grooming a successor affects end-game
- **Offshore accounts**: Hidden wealth that survives some endings
- **International allies**: Trade power for protection
- **Media control level**: Affects how much you can get away with
- **Military loyalty**: Separate from elite, affects coup risk

### Event Chains to Develop
- Full war campaign (invasion → occupation → insurgency → defeat/victory)
- Economic crisis cascade (inflation → default → IMF → privatization)
- Protest movement (small protests → mass protests → revolution)
- Oligarch rivalry (tensions → competition → elimination → consolidation)
- Succession crisis (age → illness → transition → outcome)

### New Event Types
- Random crises (natural disasters, accidents, scandals)
- Opportunity events (windfalls, lucky breaks)
- Character-driven events (specific oligarchs, generals, family)
- International events (foreign leaders, treaties, wars)

---

## Testing Guidelines

When testing new events:

1. **Playthrough Testing**: Experience the event in actual gameplay
2. **Balance Check**: Does it break the game economy?
3. **Tone Check**: Does it match the established voice?
4. **Integration Check**: Does it chain properly with other events?
5. **Player Choice**: Are all choices viable? Is there a trap option?

---

## Version History

- **v1.0** (2025-01-09): Initial design guide
  - Established billion-dollar economy
  - Created weighted legacy system
  - Defined tone guidelines for adult political satire

---

## Conclusion

The Oligarch's Gambit succeeds when it:
1. Makes players feel the weight of authoritarian power
2. Creates genuine moral dilemmas without being preachy
3. Uses dark humor to illuminate rather than obscure
4. Balances gameplay challenge with narrative coherence
5. Respects the intelligence of its adult audience

Every event should serve these goals. When in doubt, ask: "Does this make the player think about power, corruption, and consequences?"
