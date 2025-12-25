# Inaugural Address Content Drop

## Overview

This content drop introduces the player to their reign through **The Inaugural Address** - the first words spoken as the new leader. The player's choice here opens one of three major storylines, each exploring a different aspect of authoritarian power.

---

## The Inaugural Address (Early Event)

**When**: Force-added to starting deck, expires after Year 1 (Turn 4)

**Setup**: You stand before the nation. Thousands in the square, millions watching on state TV. The cameras are on. Your first words will define expectations, set the tone, and determine which forces rally behind you.

**The Three Choices**:

### 1. "I will restore our empire to its former glory!"
**Promise**: Military greatness, territorial expansion, national pride

**Who loves it**: The generals, the nationalists, the TV propagandists, the humiliated masses

**What opens**: **The Special Operation** - The war storyline

### 2. "I will root out the traitors who have stolen from you!"
**Promise**: Internal purge, anti-corruption theater, enemies punished

**Who loves it**: The security services, the paranoid, the resentful, those who want scapegoats

**What opens**: **The Dissident** - The opposition leader storyline

### 3. "I will return us to our sacred traditions and values!"
**Promise**: Religious revival, moral crusade, traditional power structures

**Who loves it**: The Church, the conservatives, the elderly, the provincial governors

**What opens**: **The Holy Alliance** - The church-state bargain storyline

---

## The Three Storylines

### The Special Operation [L]
**Size**: 25-35 events, Depth 5-6

**Premise**: You promised to restore the empire. Your generals promise a 72-hour "special military operation." What follows is war - with all its hubris, casualties, international isolation, and impossible choices.

**Key Characters**:
- **General Konstantin** - Promised easy victory, now desperately lying
- **Defense Minister Petrov** - The civilian scapegoat
- **Marina Volkov** - TV propagandist spinning defeat as victory
- **The Grieving Mother** - Wants to know where her son's body is

**Core Mechanics**:
- Heavy use of `unlocksExclusive` for battle outcomes (quick victory vs quagmire)
- Heavy use of `unlocks` for parallel consequences (sanctions + casualties + nationalism all cascade)
- Multiple ending paths: pyrrhic victory, frozen conflict, humiliating retreat, escalation

**Tone**: Darkly satirical about military hubris, increasingly grim as reality sets in

**Key Moments**:
- The generals' confident presentation
- Initial success turning to stalemate
- Conscription begins, body bags return
- International sanctions bite
- The choice to escalate or accept failure

---

### The Dissident [L]
**Size**: 25-30 events, Depth 5

**Premise**: You promised to root out traitors. Then one emerges - charismatic, brave, foolish. He returns from exile despite your warnings. What you do to him defines your regime forever.

**Key Characters**:
- **Alexei Volgin** (The Dissident) - Opposition leader, entity with states (free/imprisoned/exiled/dead)
- **Katya Volgin** - His wife, continues his work if he can't
- **Director Sokolov** - FSB chief, your instrument of repression
- **Ambassador Richardson** - Western diplomat watching closely

**Core Mechanics**:
- Heavy use of `requires: ["dissident_alexei"]` - events cascade when he dies/exits
- `characterStates` tracking his fate (free/imprisoned/exiled/dead)
- Multiple paths: show trial, mysterious death, poison attempt, exile, or ignore him
- Each path has consequences that ripple outward

**Tone**: Tense cat-and-mouse, increasingly desperate as he refuses to go away

**Key Moments**:
- His plane lands at the airport
- The arrest decision
- Poison attempts (successful or not)
- Prison conditions
- His wife continues the fight
- The martyrdom problem

---

### The Holy Alliance [M]
**Size**: 18-22 events, Depth 4

**Premise**: You promised sacred traditions. The Patriarch heard you. Now he wants payment: power, money, and your enemies destroyed. How much of your soul (and your treasury) will you give?

**Key Characters**:
- **Patriarch Kirill** - Head of Church, wants temporal power
- **Metropolitan Andrei** - More moderate voice in the Church
- **Father Dmitri** - TV preacher, prosperity gospel meets nationalism
- **Oligarch Rosenfeld** - Atheist billionaire who now has a problem

**Core Mechanics**:
- Parallel demands from the Church (money, laws, enemies punished)
- Choice between full alliance, photo-ops only, or dividing the Church
- Economic pressure (Church wants a cut)
- Elite pressure (some oligarchs hate religious interference)

**Tone**: Faustian bargain meets dark comedy, increasingly uncomfortable as the Church's demands escalate

**Key Moments**:
- The private audience with the Patriarch
- His first demand (a cut of state contracts)
- Pressure to persecute "enemies of faith"
- Church wants to change laws
- Do you let them build a $1 billion cathedral while pensions are frozen?
- The atheist oligarch becomes a target

---

## Common Events (Balance Pool)

Four rotating events that provide pacing and balance. **Mechanic**: Always exactly 1 common event in the deck. When drawn and resolved, it's removed and a different random common event is added.

### 1. Quiet Quarter
**Concept**: Nothing dramatic happens. A rare moment to breathe, skim some wealth, or invest in stability.

**Choices**: 
- Small treasury skim for personal wealth
- Invest in infrastructure (spend wealth to boost treasury/stability)
- Take a vacation (do nothing, reduce anger slightly)

### 2. The Weekly Envelope
**Concept**: Your regular cut from state contracts arrives. How greedy are you today?

**Choices**:
- Small skim (safe, reliable)
- Big skim (risky, someone might notice)
- Refuse it this time (clean hands, improve elite/public opinion)

### 3. Whispers at the Dacha
**Concept**: Your oligarchs are muttering about something at their country estates. What do you do?

**Choices**:
- Throw a lavish party (cost treasury, improve elite)
- Investigate the whispers (learn something, risk paranoia)
- Ignore them (do nothing)

### 4. The Price of Bread
**Concept**: Inflation hits. Babushkas are angry. Bread prices have doubled.

**Choices**:
- Subsidize bread (cost treasury, reduce anger)
- Blame foreign interference (propaganda, temporary fix)
- Do nothing (anger increases)

---

## Writing Guidelines for This Content

### Tone Reference
- **Cynical but engaging**: We're showing the absurdity of power without being preachy
- **Specific details**: Use numbers, names, concrete imagery
- **Dark humor**: Gallows humor from advisors, absurd juxtapositions
- **No moralizing**: Let consequences speak for themselves

### Event Structure
- **Titles**: 2-6 words, punchy, evocative
- **Descriptions**: 2-4 sentences (setup, complication, stakes, vivid detail)
- **Choices**: 6-15 words, active voice, imperative mood

### Balance Guidelines
- **Personal Wealth**: ±1-5B for small, ±6-15B for big moments
- **Treasury**: ±20-80B for normal, ±100-250B for war/crisis
- **Elite/Anger**: ±5-10% for normal, ±15-25% for major choices

### Example Event (The Dissident storyline)

```
Title: "The Airport Arrival"

Description: "Alexei Volgin's plane touches down at Sheremetyevo. Ten thousand people are waiting in the terminal - some supporters, some your plainclothes officers. The FSB Director is on the phone: 'Give me the order.' Western cameras are everywhere."

Choices:
1. "Arrest him the moment he steps off the plane." 
   → Start prison arc, international outrage
2. "Let him enter. Poison him within a week."
   → Start assassination arc, risky
3. "Do nothing. He's irrelevant."
   → He gains power, harder to stop later
4. "Fabricate charges. Make it look legal."
   → Show trial arc, but with veneer of legitimacy
```

---

## Technical Notes

### File Naming
- Storylines: `kebab-case.storyline.js` and matching `.md`
- Event IDs within: `snake_case`

### DSL Usage
- Use `event()`, `choice()`, `eventRef()` from storyline-dsl.js
- Use `unlocks` for parallel consequences (all will occur)
- Use `unlocksExclusive` for mutually exclusive outcomes (only one occurs)
- Use `requires: ["entity_id"]` for character-dependent events
- Use `forceAddAtStart: true` for inaugural address
- Use `timeGate: { maxYear: 1 }` for year-1-only events

### Branching Strategy
- **Wide, not deep**: Each choice should unlock 2-4 possible next events
- **Use exclusivity thoughtfully**: Uncertain outcomes (battle results, assassination attempts)
- **Parallel consequences**: Major decisions should trigger multiple storylines simultaneously
- **Dead ends are OK**: Not every branch needs to go 5 levels deep

---

## Implementation Checklist

- [ ] `inaugural-address-overview.md` (this file)
- [ ] `common-events.storyline.js`
- [ ] `early-events.storyline.js`
- [ ] `special-operation.md` + `.storyline.js`
- [ ] `dissident.md` + `.storyline.js`
- [ ] `holy-alliance.md` + `.storyline.js`
- [ ] Update `index.js`

**Total Events**: ~77-89 events

