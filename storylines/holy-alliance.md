# The Holy Alliance

> **Storyline Type**: Medium (M)  
> **Size**: 18-22 events  
> **Depth**: 4  
> **Trigger**: Inaugural Address → "I will return us to our sacred traditions!"

---

## Overview

You promised sacred traditions. Patriarch Kirill heard you. Now he wants payment: power, money, and your enemies destroyed. This is the church-state bargain storyline - legitimacy and blessings in exchange for temporal power. A Faustian deal where both sides think they're using the other.

The humor comes from the cynicism on both sides - a dictator using religion for control, a church using power for wealth. But it's also serious: religious nationalism is a powerful drug, and the Church's demands escalate.

---

## Key Characters

- **Patriarch Kirill** - Head of the Church, 70s, wants to return the Church to its Soviet-era power
- **Metropolitan Andrei** - More moderate voice, 50s, believes in actual spirituality
- **Father Dmitri** - TV preacher, 40s, prosperity gospel meets nationalism, useful idiot
- **Oligarch Rosenfeld** - Atheist billionaire, now has a religious problem

---

## Tone

Dark comedy about cynical power, religious hypocrisy, and the weaponization of faith. The joke is that nobody believes any of this except the peasants - and even they're not sure. But it works politically, so everyone pretends.

---

## Event Tree

```
inaugural_address [Early Event]
  └─> patriarch_audience [Entry Point - Always Added]
      │
      ├─> [Choice 1: "Full alliance. Church and State united."]
      │   └─> church_demands_begin
      │       ├─> [PARALLEL: Multiple demands simultaneously]
      │       │   ├─> church_wants_money
      │       │   │   └─> cathedral_project
      │       │   │       └─> [EXCLUSIVE]
      │       │   │           ├─> build_billion_dollar_cathedral
      │       │   │           └─> build_modest_cathedral
      │       │   │
      │       │   ├─> church_wants_laws
      │       │   │   └─> blasphemy_law_proposed
      │       │   │       └─> restrictions_expand
      │       │   │
      │       │   └─> church_wants_enemies_punished
      │       │       └─> atheist_oligarch_targeted
      │       │           └─> [EXCLUSIVE]
      │       │               ├─> arrest_rosenfeld
      │       │               └─> rosenfeld_flees
      │       │
      │       └─> patriarch_consolidates_power
      │           └─> church_becoming_problem
      │
      ├─> [Choice 2: "Photo ops only. No real power."]
      │   └─> patriarch_insulted
      │       └─> [EXCLUSIVE: His response]
      │           ├─> public_criticism
      │           │   └─> church_vs_state_conflict
      │           │
      │           ├─> quiet_scheming
      │           │   └─> church_allied_with_generals
      │           │
      │           └─> accepts_lesser_role
      │               └─> symbolic_alliance
      │
      ├─> [Choice 3: "Play them against each other. Fund reformers."]
      │   └─> church_schism_begins
      │       ├─> reformers_vs_traditionalists
      │       └─> patriarch_fights_back
      │           └─> religious_civil_war
      │
      └─> [Choice 4: "Use them, then marginalize them later."]
          └─> temporary_alliance
              ├─> church_useful_phase
              └─> betrayal_planned
                  └─> church_realizes_betrayal
                      └─> [EXCLUSIVE]
                          ├─> patriarch_purged
                          └─> church_retaliates
```

---

## Event Summaries

### Entry Point

**patriarch_audience**
- First private meeting with Patriarch Kirill
- He arrives in full regalia, with advisors
- "God has chosen you to lead our people"
- But then comes the ask
- 4 choices: full alliance, photo ops only, divide the church, or temporary use

### Full Alliance Path

**church_demands_begin**
- The Patriarch presents a list
- It's... extensive
- Money, laws, enemies destroyed
- "For the glory of God, of course"
- Three parallel branches of demands

**Branch 1: Money Demands**

**church_wants_money**
- The Church wants a cut of state contracts
- "Religious education" budget
- Tax exemptions (they don't pay now anyway)
- The real ask: the Cathedral project

**cathedral_project**
- $1.4 billion cathedral proposed
- Annual education budget: $800 million
- With gold domes, Italian marble, heated floors
- The Patriarch: "A monument to faith"
- Choices: build it lavish, build it modest, refuse

**build_billion_dollar_cathedral**
- Construction begins, oligarchs get contracts
- Photos of luxury while bread lines grow
- But it's... impressive
- The Patriarch consecrates it personally
- Consequences cascade

**Branch 2: Legal Demands**

**church_wants_laws**
- Blasphemy laws proposed
- "Religious feelings" protected by 5-year prison term
- Censorship of "anti-traditional" content
- Schools must teach "traditional values"
- Choices: full implementation, partial, refuse

**blasphemy_law_proposed**
- Draft law: 5 years for "insulting religious feelings"
- Vague enough to target anyone
- Even your oligarchs nervous
- Choices: pass it, water it down, shelve it

**restrictions_expand**
- The law is used aggressively
- Artists arrested, books banned
- Even comedy shows censored
- The Church wants more
- "Atheist propaganda" next

**Branch 3: Enemy Demands**

**church_wants_enemies_punished**
- The Patriarch has a list of names
- Atheists, liberals, "degenerates"
- Top of list: Oligarch Rosenfeld
- "A godless man should not control our resources"
- Choices: arrest him, force conversion, refuse, exile him

**atheist_oligarch_targeted**
- Rosenfeld is one of your richest backers
- But he's openly atheist, funds secular causes
- The Church wants him destroyed
- Exclusive outcomes: he's arrested, flees, fights back

**arrest_rosenfeld**
- Tax evasion charges (real enough)
- Show trial with religious overtones
- His assets seized
- Half goes to treasury, half to Church
- Elite see the message: compliance required

**rosenfeld_flees**
- He gets out hours before arrest
- Now in Tel Aviv, funding opposition
- His assets frozen here
- The Church celebrates
- You lost a major oligarch

**patriarch_consolidates_power**
- The Church now has money, laws, revenge
- Patriarch Kirill is on TV constantly
- Regional governors consult him
- He's becoming... very powerful
- Maybe too powerful?

**church_becoming_problem**
- The Patriarch demands more
- A seat on your Security Council
- Veto power over "immoral" policies
- He's not asking anymore
- Choices: give it, refuse, remove him

### Photo Ops Only Path

**patriarch_insulted**
- You offer symbolic positions, no power
- He's not stupid, he sees through it
- His advisors are angry
- "We expected more," he says coldly
- Exclusive outcomes: public fight, quiet scheming, or acceptance

**public_criticism**
- Sunday sermon: The Patriarch criticizes "false leaders"
- Not naming you directly, but everyone knows
- His influence is significant
- Church vs State brewing
- Choices: pressure him, negotiate, ignore

**church_vs_state_conflict**
- Open confrontation
- His followers vs your followers
- Regional governors choosing sides
- This is destabilizing
- Choices: back down, escalate, find compromise

**quiet_scheming**
- He accepts publicly, schemes privately
- Meetings with your generals
- Building alternative power base
- You might have made an enemy
- Choices: surveil him, negotiate, preemptive strike

**church_allied_with_generals**
- Intelligence reports concerning meetings
- The Patriarch and General Staff
- They share interest in "traditional order"
- Potential coup threat
- Choices: purge one or both, negotiate, pit them against each other

**accepts_lesser_role**
- He takes the symbolic alliance
- Blessing ceremonies, photo ops
- No real power, but no enemy either
- The stable path
- Some minor events follow

### Church Schism Path

**church_schism_begins**
- You fund reformist bishops
- "New Orthodox" vs traditionalists
- Metropolitan Andrei becomes reformer figurehead
- The Patriarch is furious
- Two Orthodox churches emerging

**reformers_vs_traditionalists**
- Competing churches, competing claims
- Regional governors choosing sides
- It's getting messy
- Choices: back reformers, abandon strategy, force reunion

**religious_civil_war**
- Violence at some churches
- Competing patriarchs
- Regional instability
- This backfired
- Choices: crack down on both, pick a winner, secular state declaration

### Temporary Alliance Path

**temporary_alliance**
- You use Church for legitimacy initially
- Planning to sideline them later
- For now, play along
- The Church is useful for nationalism campaigns
- But you're preparing the betrayal

**church_useful_phase**
- They help with propaganda
- Bless military operations
- Provide cover for repression
- "God wills it" is useful rhetoric
- But the bill comes due

**betrayal_planned**
- You start marginalizing Church figures
- Funding dries up quietly
- Patriarch notices
- Too late?

**church_realizes_betrayal**
- The Patriarch confronts you privately
- "We are not fools"
- Exclusive outcomes: you purge him first, or he mobilizes resistance

**patriarch_purged**
- You move first
- "Corruption investigation" into Church finances
- They find (real) Swiss accounts
- Patriarch "retires"
- New, compliant patriarch installed

**church_retaliates**
- He moved first
- Public denunciation from pulpit
- Millions still listen to him
- Your legitimacy questioned
- This is a problem

---

## Key Mechanics

### Parallel Demands
When choosing full alliance, three demand tracks open simultaneously:
- Money demands (cathedral, budgets)
- Legal demands (blasphemy laws, censorship)
- Enemy demands (targeting specific people)

All three progress in parallel, creating multiple pressure points.

### Exclusive Outcomes
- **Patriarch's response**: public criticism vs quiet scheming vs acceptance
- **Oligarch target**: arrested vs flees vs fights back
- **Cathedral choice**: lavish vs modest vs refused
- **Church schism**: reformers win vs traditionalists win vs chaos

### Character Dependencies
- `requires: ["patriarch_kirill"]` for Church-dependent events
- `requires: ["oligarch_rosenfeld"]` for atheist oligarch arc
- Removing characters cascades events appropriately

### Progressive Escalation
The Church's demands grow event by event. Start with "partnership," become "we need budget," become "we need laws," become "we need power," become "we are the power."

---

## Balance Notes

### Elite Approval
- Full alliance: +10% initially (conservatives approve)
- Church demands escalate: -5% to -15% (even oligarchs have limits)
- Refusing demands: -8% (you promised them power)
- Arresting Patriarch: -15% (dangerous move)
- Targeting atheist oligarch: -10% (elite see threat to themselves)

### Public Anger
- Church alliance: -15% (older voters love it)
- Expensive cathedral during crisis: +12% (visible hypocrisy)
- Blasphemy laws: -8% (religious majority approves)
- Church vs State conflict: +15% (instability scares people)

### Treasury
- Church budget demands: -50B to -100B annually
- Cathedral project: -140B ($1.4 billion)
- Seizing Rosenfeld's assets: +80B
- Tax exemptions for Church: -30B annually

### Personal Wealth
- Skimming church contracts: +5B to +10B
- Seizing atheist oligarch's assets: +15B (your cut)

---

## Writing Guidelines

### The Patriarch's Character
- Cunning, not stupid
- Uses religious language but understands power
- Genuinely believes Church should rule
- But also personally corrupt (Swiss accounts)
- "We serve God... and God rewards his servants"

### Metropolitan Andrei
- Actually spiritual, kind of
- Uncomfortable with politicization
- Caught between belief and power
- Makes him vulnerable to manipulation
- Or genuine alternative?

### Father Dmitri (TV Preacher)
- Prosperity gospel + nationalism
- "God wants you to be rich... and bomb the enemy"
- Useful idiot or cynical grifter?
- Either way, very popular
- Gold chains, expensive suits, "man of God"

### Tone Balance
- Dark comedy about religious hypocrisy
- Juxtapose piety and corruption
- But don't mock believers themselves
- The joke is the cynical use of faith, not faith itself
- Specific details of luxury vs poverty

### Satirical Techniques
- **Juxtaposition**: "$1.4B cathedral / $800M education budget"
- **Doublespeak**: "For God's glory" (means "give us money")
- **Specificity**: Italian marble, heated floors, gold leaf details
- **Euphemism breaking**: Patriarch's Swiss accounts revealed

---

## Example Event

```javascript
event("cathedral_project", {
    title: "The Cathedral Proposal",
    description: "Patriarch Kirill presents architectural renderings. The Cathedral of National Salvation: 340 feet tall, gold-plated domes, Italian marble floors, underground parking for 500 luxury cars, and - he adds carefully - heated bathroom floors. Cost: $1.4 billion. 'A monument to our revival,' he says. Your Finance Minister notes that the annual education budget is $800 million.",
    weight: 0,
    requires: ["patriarch_kirill"],
    storylines: ['holy-alliance'],
    
    choices: [
        choice("Build it. Spare no expense. God's glory demands it.", {
            effects: {
                stats: {
                    personalWealth: 8,   // Your construction companies get contracts
                    treasury: -140,
                    elite: 5,            // Church faction happy
                    anger: 15            // Visible hypocrisy
                },
                legacy: {
                    icon: "⛪",
                    name: "Cathedral Builder",
                    weight: -10
                }
            },
            unlocks: [
                eventRef("cathedral_construction"),
                eventRef("public_reaction_cathedral")
            ]
        }),
        
        choice("Build it, but modest. $400 million. Still impressive.", {
            effects: {
                stats: {
                    personalWealth: 3,
                    treasury: -40,
                    elite: -3,          // Church disappointed
                    anger: 8            // Still expensive during hard times
                }
            },
            unlocks: [
                eventRef("modest_cathedral")
            ]
        }),
        
        choice("Refuse. We have hospitals to build, schools to fund.", {
            effects: {
                stats: {
                    elite: -12,         // Church furious
                    anger: -5           // Public likes priorities
                },
                flags: {
                    "denied_cathedral": true
                }
            },
            unlocks: [
                eventRef("patriarch_insulted_by_refusal")
            ]
        }),
        
        choice("Propose a public fundraising campaign. Let the faithful pay.", {
            effects: {
                stats: {
                    elite: -5,          // Church wanted state funding
                    treasury: 20,       // Some donations come in
                    anger: -3
                }
            }
        })
    ]
})
```

---

## Estimated Event Count: 20

- Entry: 1 (patriarch_audience)
- Full alliance path: 10 events
  - Money branch: 3 events
  - Legal branch: 3 events
  - Enemy branch: 4 events
- Photo ops path: 4 events
- Schism path: 3 events
- Temporary alliance path: 4 events
- Supporting/consequence events: 2 events

Total: ~20 events

