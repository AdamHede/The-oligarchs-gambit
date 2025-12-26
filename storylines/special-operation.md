# The Special Operation

> **Storyline Type**: Large (L)  
> **Size**: 28-32 events  
> **Depth**: 5-6  
> **Trigger**: Inaugural Address → "I will restore our empire to its former glory!"

---

## Overview

You promised to restore the empire. Your generals promised a 72-hour "special military operation." What follows is war - with all its hubris, casualties, international isolation, and impossible choices.

This is the largest and most consequential storyline in the game, exploring military hubris, the cost of war, and the impossible position of an authoritarian leader who can never admit failure.

---

## Key Characters

- **General Konstantin Volkov** - Promised easy victory, now desperately revising his estimates
- **Defense Minister Petrov** - Civilian overseer, natural scapegoat
- **Marina Volkov** - TV propagandist, spins defeat as victory
- **Irina Federova** - Mother searching for her conscripted son

---

## Tone

Starts darkly satirical (confident generals, absurd promises), becomes increasingly grim as reality sets in. The humor comes from the gap between propaganda and reality, not from the suffering itself.

---

## Event Tree

```
inaugural_address [Early Event]
  └─> war_proposal [Entry Point - Always Added]
      │
      ├─> [Choice 1: "Approve the full invasion"]
      │   ├─> [PARALLEL: All these happen]
      │   │   ├─> sanctions_warning
      │   │   ├─> conscription_begins  
      │   │   └─> nationalism_surge
      │   │
      │   └─> [EXCLUSIVE: Only one happens]
      │       ├─> lightning_victory (10% weight - lucky path)
      │       │   └─> victory_parade
      │       │       └─> [ends or minor followup]
      │       │
      │       └─> resistance_stiffens (90% weight - realistic path)
      │           ├─> war_goes_badly
      │           ├─> casualties_mount
      │           │   └─> mothers_protest (requires: irina_son)
      │           │       └─> [EXCLUSIVE]
      │           │           ├─> arrest_protestors
      │           │           └─> ignore_protestors
      │           │
      │           ├─> equipment_failures
      │           │   └─> blame_defense_minister
      │           │       └─> petrov_arrested (characterState change)
      │           │
      │           └─> stalemate_deepens
      │               └─> [EXCLUSIVE: Big choice]
      │                   ├─> escalate_to_total_war
      │                   │   └─> mobilization_decree
      │                   │       └─> [EXCLUSIVE]
      │                   │           ├─> draft_riots
      │                   │           └─> nuclear_threats
      │                   │
      │                   ├─> frozen_conflict
      │                   │   └─> ceasefire_negotiation
      │                   │       └─> [ends]
      │                   │
      │                   └─> humiliating_retreat
      │                       └─> withdrawal_chaos
      │                           └─> [ends badly]
      │
      ├─> [Choice 2: "A limited border operation only"]
      │   └─> border_skirmish
      │       └─> [EXCLUSIVE]
      │           ├─> skirmish_contained (easier path)
      │           └─> skirmish_escalates → rejoins main path
      │
      ├─> [Choice 3: "Not yet. Build strength first"]
      │   └─> military_buildup
      │       ├─> defense_spending_spiral
      │       └─> eventual_war_pressure
      │           └─> [loops back to war_proposal]
      │
      └─> [Choice 4: "This is madness. Reject the plan."]
          └─> generals_insulted
              └─> [EXCLUSIVE]
                  ├─> military_coup_attempt
                  └─> generals_demoted → different storyline path
```

---

## Event Summaries

### Entry Point

**war_proposal** (Always added after inaugural choice #1)
- The generals present their plan with maps and confidence
- "72 hours, maximum. The territory is ethnically ours anyway."
- 4 choices: approve, limited, delay, reject

### Main War Path Events

**lightning_victory** (Exclusive outcome - rare)
- Against all odds, it actually works
- Quick collapse, minimal casualties
- International condemnation but fait accompli
- Short victory arc (3-4 events)

**resistance_stiffens** (Exclusive outcome - common)
- The main path: things go wrong
- Bridges hold, defenders resist, mud season arrives
- Entry into the long quagmire

**war_goes_badly**
- Supply lines stretched, equipment breaks down
- Generals request more troops, more time, more money
- Choices: reinforce, scapegoat someone, propaganda

**casualties_mount**
- Body bags returning in unmarked vans
- Hospitals overflow, morgues fill
- Social media videos leak despite censorship
- Choices: suppress news, pay compensation, deny

**mothers_protest**
- Mothers demand answers about missing sons
- "Where is Conscript #2847392?"
- Requires: irina_son entity (the human face)
- Choices: arrest them, negotiate, ignore

**equipment_failures**
- Tanks break down, rations run out, radios don't work
- Defense minister says it's corruption
- Generals say it's the defense minister
- Choices: investigate, scapegoat, throw money at it

**stalemate_deepens**
- No progress for months
- International pressure mounting
- Treasury hemorrhaging
- Choices: escalate, freeze, retreat

### Escalation Path

**escalate_to_total_war**
- "The West has left us no choice"
- Full mobilization, war economy, total control
- Opens: mobilization events, nuclear threats

**mobilization_decree**
- Conscript everyone under 45
- Economic mobilization
- Society reorganizes for war
- Choices: brutal enforcement, propaganda campaign

**draft_riots**
- Men flee to borders
- Protests turn violent
- Regional governors resist
- Choices: military crackdown, exemptions for elite

**nuclear_threats**
- TV appearance, you mention "all options"
- Western leaders panic
- Even your generals look nervous
- Choices: clarify, double down, pretend it was mistranslated

### Frozen Conflict Path

**frozen_conflict**
- Neither side winning, both sides bleeding
- Unofficial ceasefire, snipers still shoot
- Sanctions permanent, integration stopped
- Choices: accept status quo, keep pressuring

**ceasefire_negotiation**
- Secret talks mediated by neutral party
- Both sides claim victory
- Thousands died for a border adjustment
- Choices: accept deal, demand more, walk away

### Retreat Path

**humiliating_retreat**
- The worst option: admit defeat
- "Goodwill gesture" announced
- Everyone knows you lost
- Choices: blame NATO, blame generals, go silent

**withdrawal_chaos**
- Equipment abandoned, allies betrayed
- Collaborators flee or face revenge
- International humiliation
- Consequences cascade

### Parallel Consequence Events

**sanctions_warning**
- Western ambassadors deliver message
- Asset freezes, trade restrictions coming
- Treasury impact begins
- Choices: retaliate, negotiate, ignore

**conscription_begins**
- Mobilization notices delivered
- Social media fills with farewell videos
- Middle class suddenly interested in politics
- Choices: elite exemptions, full fairness, brutal enforcement

**nationalism_surge**
- Initial rally-around-flag effect
- Support spikes temporarily
- TV shows nothing but patriotic concerts
- Choices: ride the wave, monetize it, let it fade

**blame_defense_minister**
- Petrov becomes the fall guy
- "The corruption was worse than we knew"
- Show trial, asset seizure
- Choices: arrest him, fire him, protect him

---

## Key Mechanics

### Exclusive Groups (Uncertain Outcomes)
- **Battle outcome**: lightning_victory vs resistance_stiffens
- **Protest response**: arrest_protestors vs ignore_protestors  
- **End state**: escalate vs frozen_conflict vs humiliating_retreat
- **Skirmish result**: skirmish_contained vs skirmish_escalates

### Parallel Consequences (All Happen)
- Approving war triggers: sanctions_warning + conscription_begins + nationalism_surge + battle_outcome
- Each major decision has multiple simultaneous consequences

### Entity Dependencies
- `requires: ["irina_son"]` for mother's protest events
- `requires: ["defense_minister_petrov"]` for scapegoat events
- When characters are arrested/killed, dependent events auto-remove

### Character States
- `petrov_arrested` changes defense minister to "arrested"
- Triggers cascade removal of petrov-dependent events

---

## Balance Notes

### Treasury Impact
- War costs 100-150B per quarter
- Equipment failures add 50-80B emergency spending
- Mobilization costs 200B upfront

### Elite Approval
- Generals love war initially (+10%)
- Oligarchs hate sanctions (-15%)
- Long war → everyone loses patience (-20% total)

### Public Anger
- Initial nationalism surge (-15% anger)
- Casualties mount (+10% anger per event)
- Draft notices (+15% anger)
- Retreat (+25% anger - you failed)
- Victory (-20% anger - rare)

### Personal Wealth
- War profiteering opportunities throughout
- Defense contracts can net 5-15B personal wealth
- But at cost to treasury and elite approval

---

## Writing Guidelines

### Specific Details
- Use real numbers: "72 hours," "200,000 troops," "$150 billion"
- Name equipment: "T-90 tanks," "Kalibr missiles," "encrypted radios"
- Concrete imagery: "body bags in unmarked vans," "mothers at the gates"

### Euphemisms and Breaking Them
- Start with official language: "special military operation," "denazification"
- Gradually drop the pretense as reality intrudes
- Advisors start saying "the war" in private
- Propaganda keeps using euphemisms publicly

### Dark Humor Sources
- Gap between propaganda and reality
- Generals revising timelines: "72 hours. I meant 72 weeks."
- Absurd briefings: "We have total air superiority. That's why we're using 1960s tanks."
- Sycophant behavior: Everyone congratulating you while the front collapses

### What to Avoid
- Don't mock the dead soldiers themselves
- Don't make light of civilian casualties
- Don't glorify violence
- Let consequences speak for themselves

---

## Example Event

```javascript
event("war_goes_badly", {
    title: "The General's New Timeline",
    description: "General Konstantin sits across from you, visibly aged in three months. The 72-hour operation is now entering week 14. 'We underestimated their NATO training,' he says carefully. 'We need 50,000 more troops and six more months.' Your Finance Minister coughs: 'That's another 80 billion we don't have.'",
    weight: 8,
    requires: ["general_konstantin"],
    
    choices: [
        choice("Give him what he asks. We cannot fail.", {
            effects: {
                stats: { 
                    treasury: -80, 
                    elite: -8,  // Oligarchs furious at cost
                    anger: 5    // More families get bad news
                }
            },
            unlocks: [
                eventRef("casualties_mount"),
                eventRef("equipment_failures")
            ]
        }),
        
        choice("The problem is corruption. Arrest the Defense Minister.", {
            effects: {
                stats: { elite: -5, anger: -3 },  // Scapegoat works temporarily
                characterStates: { "defense_minister_petrov": "arrested" },
                legacy: { icon: "🎯", name: "Scapegoater", weight: -5 }
            },
            unlocks: [
                eventRef("petrov_show_trial")
            ]
        }),
        
        choice("Launch a propaganda offensive. Redefine 'victory.'", {
            effects: {
                stats: { 
                    treasury: -20,  // Propaganda costs
                    elite: 5,       // They appreciate the spin
                    anger: -8       // Works on some people
                },
                flags: { "propaganda_victory": true }
            },
            unlocks: [
                eventRef("stalemate_deepens")
            ]
        })
    ]
})
```

---

## Estimated Event Count: 30

- Entry: 1 (war_proposal)
- Victory path: 3 events
- Main war path: 12 events  
- Escalation path: 5 events
- Frozen path: 3 events
- Retreat path: 3 events
- Parallel consequences: 3 events

Total: ~30 events

