# The Dissident

> **Storyline Type**: Large (L)  
> **Size**: 26-30 events  
> **Depth**: 5  
> **Trigger**: Inaugural Address → "I will root out the traitors!"

---

## Overview

You promised to root out traitors. Then one emerges - Alexei Volgin, the charismatic opposition leader. He returns from exile despite your warnings, landing at the airport to ten thousand supporters. What you do to him defines your regime forever.

This storyline is the cat-and-mouse game between authoritarian power and a single brave (or foolish) man. It's about the cost of repression, the power of martyrdom, and the impossible problem: he won't go away, but neither can you let him stay.

---

## Key Characters

- **Alexei Volgin** (The Dissident) - Opposition leader, 47, lawyer, charismatic, entity with states (free/imprisoned/exiled/dead)
- **Katya Volgin** - His wife, 44, becomes a figure herself if he can't continue
- **Director Sokolov** - FSB chief, your instrument of repression, cold and efficient
- **Ambassador Richardson** - Western diplomat, watching closely, interfering when possible

---

## Tone

Tense, paranoid, increasingly desperate. The humor comes from the absurdity of a dictatorship's panic over one man, and the increasingly elaborate lies told to justify repression. But as the storyline progresses, it becomes grimmer - because we all know how these stories tend to end.

---

## Event Tree

```
inaugural_address [Early Event]
  └─> dissident_returns [Entry Point - Always Added]
      │
      ├─> [Choice 1: "Arrest him at the airport"]
      │   └─> airport_arrest
      │       └─> [EXCLUSIVE: What happens in custody?]
      │           ├─> show_trial_begins
      │           │   ├─> show_trial_verdict
      │           │   └─> international_pressure_mounts
      │           │
      │           ├─> prison_death (requires: alexei_alive)
      │           │   └─> [EXCLUSIVE: How did he die?]
      │           │       ├─> official_heart_attack
      │           │       │   └─> nobody_believes_it
      │           │       ├─> hunger_strike_death
      │           │       └─> prison_beating
      │           │
      │           └─> prisoner_exchange_offered
      │               └─> [EXCLUSIVE]
      │                   ├─> accept_exchange → exile_arc
      │                   └─> refuse_exchange → he_rots_in_prison
      │
      ├─> [Choice 2: "Let him enter, then poison him"]
      │   └─> poison_attempt
      │       └─> [EXCLUSIVE: Does it work?]
      │           ├─> poison_succeeds (requires: alexei_alive)
      │           │   └─> cover_up_begins
      │           │       └─> [EXCLUSIVE]
      │           │           ├─> western_investigation
      │           │           └─> cover_holds
      │           │
      │           ├─> poison_fails_public
      │           │   └─> international_incident
      │           │       ├─> more_sanctions
      │           │       └─> alexei_becomes_hero
      │           │
      │           └─> poison_fails_secret (requires: alexei_alive)
      │               └─> he_knows_you_tried
      │                   └─> underground_movement
      │
      ├─> [Choice 3: "Ignore him. He's irrelevant."]
      │   └─> dissident_campaigns
      │       ├─> movement_grows
      │       │   ├─> mass_protests_begin
      │       │   └─> western_media_attention
      │       │
      │       └─> [Eventually forces harder choices]
      │           └─> forced_response
      │               └─> [loops back to arrest or poison]
      │
      └─> [Choice 4: "Discredit him. Find kompromat."]
          └─> kompromat_search
              └─> [EXCLUSIVE: What do you find?]
                  ├─> real_scandal_found
                  │   └─> release_kompromat
                  │       └─> [EXCLUSIVE: Does it work?]
                  │           ├─> movement_collapses
                  │           └─> nobody_cares → back to square one
                  │
                  ├─> nothing_found_fabricate
                  │   └─> fake_scandal_released
                  │       └─> [EXCLUSIVE]
                  │           ├─> western_debunks_it
                  │           └─> public_believes_it
                  │
                  └─> he_has_kompromat_on_you
                      └─> mutual_destruction_threat
                          └─> [Mexican standoff, multiple outcomes]

[PARALLEL: The Wife's Arc]
- If Alexei dies, imprisoned, or exiled → wife_continues
    └─> katya_emerges
        └─> [EXCLUSIVE: Your response]
            ├─> arrest_wife_too
            ├─> ignore_her
            └─> threaten_children

[PARALLEL: International Pressure]
- Western sanctions_for_repression
- Embassy protests
- International court considerations
```

---

## Event Summaries

### Entry Point

**dissident_returns**
- His plane lands at Sheremetyevo
- Ten thousand supporters in the terminal
- Western cameras everywhere
- FSB Director on phone: "Give the order"
- 4 choices: arrest immediately, let him enter then poison, ignore, or find dirt

### Arrest Path

**airport_arrest**
- Arrested the moment he steps off
- Video goes global
- Western leaders condemn
- But he's in your custody now
- Choices: show trial, quiet disposal, use as bargaining chip

**show_trial_begins**
- Public trial, state TV broadcasts
- Charges: fraud, embezzlement, foreign agent
- His lawyer is... limited
- Choices: convict quickly, drag it out, make him confess

**show_trial_verdict**
- Guilty, obviously
- 20 years in penal colony
- Western outcry
- Choices: harsh prison, comfortable prison, early release for price

**prison_death** (requires: alexei_alive)
- He dies in custody
- How? That's the question
- Exclusive outcomes: heart attack, hunger strike, beating, suicide
- Each has different consequences

**official_heart_attack**
- "Natural causes" at age 47
- Prison doctor's report is detailed
- Nobody believes it
- Choices: stick to story, investigate, blame prison staff

**prisoner_exchange_offered**
- Western country offers prisoner swap
- Your spy for their dissident
- Tempting, but he'd be free abroad
- Choices: accept exchange (exile path), refuse (rotting path)

### Poison Path

**poison_attempt**
- FSB operation, novichok or similar
- Multiple ways it could go wrong
- Exclusive outcomes: succeeds, fails publicly, fails secretly
- Each branches differently

**poison_succeeds** (requires: alexei_alive)
- He dies, seemingly natural at first
- Then Western labs find traces
- Cover-up becomes necessary
- Choices: deny everything, expel investigators, blame someone else

**cover_up_begins**
- Cremation rushed, evidence destroyed
- FSB cleans the scene
- Official story: sudden illness
- But Western investigators are coming
- Exclusive: investigation penetrates or cover holds

**poison_fails_public**
- He survives, publicly announces attempt
- Shows the evidence
- International scandal
- He's now a hero and you look incompetent
- Choices: deny, double down, blame rogue elements

**poison_fails_secret** (requires: alexei_alive)
- He survives but you think he doesn't know
- Actually he knows everything
- Now he has leverage
- Choices: try again, negotiate, go public first

### Ignore Path

**dissident_campaigns**
- He's doing rallies, YouTube videos, interviews
- Drawing crowds, young people especially
- Western media loves him
- Choices: still ignore, disrupt quietly, respond legally

**movement_grows**
- From thousands to tens of thousands
- Protests in multiple cities
- Your popularity dropping
- Can't ignore anymore
- Choices: crackdown, co-opt, arrest now

**mass_protests_begin**
- 50,000 people in the streets
- Chanting his name
- Western cameras everywhere
- This is a crisis now
- Choices: mass arrest, negotiate, military response

### Kompromat Path

**kompromat_search**
- FSB digs into everything
- Financials, relationships, history
- Looking for anything usable
- Exclusive outcomes: real scandal, nothing (fabricate), or he has dirt on you

**real_scandal_found**
- He had an affair, or some financial irregularity
- Not huge, but usable
- Release it or hold for leverage?
- Choices: release now, blackmail him, save for later

**release_kompromat**
- State TV runs the scandal 24/7
- Photos, documents, witnesses
- Does it work?
- Exclusive: movement collapses or nobody cares

**nothing_found_fabricate**
- No real dirt, so make some up
- Fake documents, paid witnesses
- Release the fabricated scandal
- Exclusive: Western experts debunk it or public believes it

**he_has_kompromat_on_you**
- The FSB search finds something disturbing
- He has files on your corruption
- He's been preparing for this
- Mutual assured destruction
- Choices: negotiate silence, call his bluff, kill him before he releases

### The Wife's Arc

**wife_continues** (Triggered when Alexei is removed)
- Katya steps forward
- "I will continue his work"
- Different energy - grief, determination
- Choices: arrest her too, ignore, threaten family

**katya_emerges**
- She's effective - possibly more than him
- Sympathy factor, mother of two
- Western media loves the narrative
- Harder to kill a grieving widow
- Choices: imprisonment, exile, character assassination

### International Consequences

**international_pressure_mounts**
- New sanctions targeting you personally
- International court considers case
- Western leaders cancel meetings
- Your oligarchs angry - this is costly
- Choices: retaliate, negotiate, ignore

**western_investigation**
- UK/EU investigators arrive
- They have evidence samples
- They're building a case
- Choices: cooperate (ha), expel them, obstruct

**more_sanctions**
- Another round, deeper this time
- Targeting your family specifically
- Elite are furious
- Choices: retaliate, cave, escalate

---

## Key Mechanics

### Entity Dependencies
The entire storyline uses `requires: ["dissident_alexei"]` heavily. When he dies or is permanently exiled, many events auto-remove from the deck. This creates a natural narrative end to certain branches.

### Character States
- **free**: Default, active opposition
- **imprisoned**: In custody, different event set
- **exiled**: Abroad, different leverage
- **dead**: Martyrdom problem, triggers wife arc

State changes cascade through the system, removing incompatible events automatically.

### Exclusive Groups
- **Poison outcome**: succeeds vs fails publicly vs fails secretly
- **Prison outcome**: heart attack vs hunger strike vs beating
- **Kompromat outcome**: real scandal vs fabrication vs mutual destruction
- **Cover-up**: investigation penetrates vs holds

### Parallel Consequences
- Arresting him triggers: international_pressure + show_trial_begins + domestic_crackdown
- Killing him triggers: cover_up_begins + western_investigation + wife_continues
- Ignoring him triggers: movement_grows + western_media_attention + popularity_drops

---

## Balance Notes

### Elite Approval
- Arresting him: +8% (hardliners approve)
- Show trial: +10% (public order)
- Killing him: +5% (problem solved?)
- Letting movement grow: -15% (look weak)

### Public Anger
- Arrest: +8% (his supporters angry)
- Public poison failure: +20% (incompetence + brutality)
- Death in custody: +15% (martyrdom)
- Show trial conviction: -5% (rule of law theater)
- Ignore path: -5% initially, then grows

### Treasury
- Show trial: -30B (legal theater costs)
- Poison operation: -20B
- FSB operations: -10B per action
- International sanctions from repression: -100B to -200B

### Personal Wealth
- Seize his assets: +2B
- Blackmail with kompromat: +5B
- Profit from related crackdowns: +8B

---

## Writing Guidelines

### The Dissident's Character
- Brave but not stupid
- Charismatic but flawed
- He knows he might die
- Mixes hope with gallows humor
- Never make him a saint - he's human

### The Wife's Character
- Initially reluctant, thrust into role
- Grief as fuel for courage
- Mother of two - that matters
- Harder to demonize than him
- Different energy - quieter, more determined

### FSB Director Sokolov
- Cold, efficient, no ideology
- "It's just a job"
- Presents options like a menu
- "Novichok, car accident, or simple shooting?"
- Never cruel for cruelty's sake - it's professional

### Tone Balance
- Start with dark humor (regime panicking over one guy)
- Gradually get grimmer (stakes rise)
- Never mock the dissident himself
- The joke is always on power's insecurity
- Show cost of repression clearly

### Specific Details
- Use real tactics: novichok, show trials, penal colonies
- Name places: Sheremetyevo Airport, Penal Colony #4
- Concrete numbers: "10,000 supporters," "20-year sentence"
- Video evidence, encrypted messages, Western labs

### Euphemisms and Breaking Them
- Start with official language: "administrative detention," "unfortunate incident"
- Sokolov speaks plainly in private: "We can make him disappear"
- Public statements vs private conversations
- The gap is the dark comedy

---

## Example Event

```javascript
event("poison_fails_public", {
    title: "The Surviving Dissident",
    description: "Alexei Volgin appears on camera from his hospital bed. He holds up a water bottle. 'They poisoned this,' he says calmly. 'I have samples in three Western labs. The results will be public tomorrow.' Director Sokolov sits across from you, expressionless. 'The operation was... not clean. Too many cameras.'",
    weight: 8,
    requires: ["dissident_alexei"],
    storylines: ['dissident'],
    
    choices: [
        choice("Complete denial. It's a Western fabrication.", {
            effects: {
                stats: {
                    elite: 5,     // Domestic hardliners approve
                    anger: 15,    // But the evidence is public
                    treasury: -40 // Propaganda campaign costs
                },
                flags: { "denied_poison_attempt": true }
            },
            unlocks: [
                eventRef("international_incident"),
                eventRef("alexei_becomes_hero")
            ]
        }),
        
        choice("Blame rogue FSB elements. Arrest some low-level officers.", {
            effects: {
                stats: {
                    elite: -10,   // FSB angry at betrayal
                    anger: -5     // Scapegoat partially works
                },
                characterStates: { "fsb_scapegoat": "arrested" }
            },
            unlocks: [
                eventRef("fsb_morale_crisis")
            ]
        }),
        
        choice("Say nothing publicly. Offer him a deal in private.", {
            effects: {
                stats: {
                    elite: -8,    // Look weak
                    anger: 10
                },
                flags: { "negotiating_with_dissident": true }
            },
            unlocks: [
                eventRef("secret_negotiation")
            ]
        }),
        
        choice("Double down. 'He should have taken the warning.'", {
            effects: {
                stats: {
                    elite: 8,
                    anger: 25,    // You just confessed
                    treasury: -100 // Sanctions incoming
                },
                legacy: {
                    icon: "☠️",
                    name: "Poisoner",
                    weight: -18
                }
            },
            unlocks: [
                eventRef("more_sanctions"),
                eventRef("western_investigation")
            ]
        })
    ]
})
```

---

## Estimated Event Count: 28

- Entry: 1 (dissident_returns)
- Arrest path: 8 events
- Poison path: 7 events
- Ignore path: 5 events
- Kompromat path: 5 events
- Wife's arc: 3 events
- International consequences: 4 events
- Supporting events: 5 events

Total: ~28 events

