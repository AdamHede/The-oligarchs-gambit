# The Succession Question - Storyline Design Document

## Overview

**Storyline ID:** `succession`
**Trigger:** Dacha Summit → "We must think of legacy. Who continues our work?"
**Size:** ~25-30 events, Depth 5-6
**Theme:** The paranoid game of choosing and grooming an heir

## Core Tension

Every dictator must eventually face the question: who comes after? But choosing an heir creates new problems:
- **Competence** - A capable heir might want power sooner
- **Loyalty** - Will they honor your legacy or remake the state?
- **Legitimacy** - Do the elites accept them?
- **Timing** - When do you step aside (if ever)?

## Key Character: Andrei Volkov

**"The Crown Prince"** - Your chosen successor (one of three options). The storyline tracks his development from candidate to heir to potential threat.

### Three Heir Candidates (Chosen in first event)

1. **Dmitri Jr.** ("The Son") - Your actual son. Inexperienced, possibly incompetent, but blood is blood.
2. **Andrei Volkov** ("The Protégé") - Your former chief of staff. Brilliant, loyal, ambitious. Maybe too ambitious.
3. **Maxim Orlov** ("The Oligarch") - A powerful businessman. Has resources but no political experience. (CROSSOVER from Golden Circle)

---

## Event Structure

### Act 1: The Candidates (Depth 1-2)

#### Entry Event: `succession_the_candidates`
**"The Question of Succession"**

You've raised the forbidden topic. Your inner circle falls silent. No one wants to contemplate a world without you. But you insist. Three names emerge from the discussion.

**Choices:**
1. "My son will inherit. Blood is thicker than politics." → `heir_type: son`
2. "Andrei has served me loyally. He understands the system." → `heir_type: protege`
3. "Perhaps an outsider. Someone with resources but no faction." → `heir_type: oligarch`
4. "I will rule forever. This discussion is premature." → Delays storyline, but it returns

#### `succession_son_introduction`
**"Father and Son"** (if heir_type: son)

Your son Dmitri Jr. has been summoned. He's 32, educated in Switzerland, and has spent most of his life avoiding politics. He looks terrified. "Father, I don't know if I'm ready." Neither do you.

**Choices:**
1. "You will learn. I will teach you."
2. "Readiness doesn't matter. Destiny does."
3. "Perhaps you're right. We should consider alternatives."

#### `succession_protege_introduction`
**"The Loyal Lieutenant"** (if heir_type: protege)

Andrei Volkov receives the news with characteristic composure. He's served you for fifteen years. He knows where the bodies are buried - literally. "I am honored," he says. "I will not disappoint you." But you notice something in his eyes. Calculation.

**Choices:**
1. "I know you won't. You're practically my son."
2. "See that you don't. I will be watching."
3. "This is conditional. You must prove yourself."

#### `succession_oligarch_introduction`
**"The Money Man"** (if heir_type: oligarch OR crossover from Golden Circle)

Maxim Orlov - or whoever the powerful oligarch is - learns he's being considered for succession. He's surprised. Intrigued. Wealthy men rarely refuse power. "What would you need from me?" he asks.

**Choices:**
1. "Loyalty above all. Your money is secondary."
2. "Your resources. This transition won't be cheap."
3. "Your discretion. No one can know until I say."

---

### Act 2: The Testing (Depth 2-3)

#### `succession_first_test`
**"The Governor's Crisis"**

A regional governor is causing problems - skimming too much, ignoring orders. A perfect test for your heir. You send them to "resolve the situation."

**Choices:**
1. "Handle it however you see fit."
2. "I expect the governor to be replaced."
3. "Don't kill him. Just... remind him who's in charge."
4. "Actually, I'll handle this myself."

#### `succession_test_result`
**"The Report"**

Your heir returns from the provincial mission. The results vary based on their character type and your instructions.

**Branches:**
- Son: Possibly fumbled (needs more guidance)
- Protégé: Handled efficiently (maybe too efficiently)
- Oligarch: Threw money at the problem (effective but expensive)

**Choices:**
1. "Well done. You're learning."
2. "This wasn't what I asked for."
3. "Let's discuss what went wrong."

#### `succession_public_introduction`
**"The Announcement"**

It's time to formally introduce your heir to the public. State television is prepared. The speech is written. But announcements have consequences.

**Choices:**
1. "Full announcement. He is my chosen successor."
2. "Subtle introduction. 'Rising star' narrative."
3. "Not yet. Keep them guessing."

---

### Act 3: The Shadow Grows (Depth 3-4)

#### `succession_heir_allies`
**"The Heir's Friends"**

Your intelligence service reports: your heir is cultivating their own network. Loyal generals. Friendly oligarchs. Their own media supporters. Normal succession behavior? Or something more?

**Choices:**
1. "Good. They need allies to rule."
2. "Monitor them closely. Trust but verify."
3. "Cut them off. Isolate them."
4. "Confront them directly."

#### `succession_heir_impatience`
**"The Whispers"**

Rumors reach you: your heir has been overheard saying "The old man should step aside." Perhaps it was taken out of context. Perhaps not.

**Choices:**
1. "Ignore it. Rumors are inevitable."
2. "Summon them. Demand explanation."
3. "Reduce their public role. Cool things down."
4. "This changes everything. Begin surveillance."

#### `succession_golden_circle_crossover`
**"The Disappointing Heir"** (CROSSOVER EVENT → Golden Circle)

Your heir has failed you. Too weak, too corrupt, or too ambitious. Perhaps they'd be better as just another oligarch - rich but powerless. You could demote them and start over.

**Conditions:**
- `succession_active` = true
- `heir_demoted_to_oligarch` = false (prevents loop)

**Choices:**
1. "Demote them. They can be wealthy, not powerful." → Sets `heir_demoted_to_oligarch`, unlocks `golden_circle_new_oligarch`
2. "Give them another chance."
3. "Remove them entirely. No half-measures."

---

### Act 4: The Crisis (Depth 4-5)

#### `succession_assassination_attempt`
**"The Bullet"**

Someone tried to kill your heir. A sniper, a car bomb, poison - the method varies. They survived, barely. Was it your enemies? Their enemies? Or... a message?

**Branches based on heir relationship:**
- Loyal heir: Genuine external threat
- Suspicious heir: Possible false flag
- Estranged heir: Could be either

**Choices:**
1. "Find who did this. Spare no expense."
2. "Investigate quietly. Trust no one."
3. "Increase their security. Show support."
4. "Curious timing. Investigate them too."

#### `succession_heir_coup`
**"The Move"** (if heir relationship is bad)

Your intelligence chief wakes you at 3 AM. Your heir is mobilizing. Loyal generals are taking positions. It's happening.

**Choices:**
1. "Arrest them immediately."
2. "Negotiate. Perhaps we can share power."
3. "Flee to the emergency bunker. Fight back."
4. "Accept it. Step down gracefully."

#### `succession_loyal_heir`
**"The Faithful Servant"** (if heir relationship is good)

Your heir comes to you, troubled. "People are trying to turn me against you," they say. "I won't let them." They present evidence of plots, factions trying to accelerate the succession. They could have used this. They didn't.

**Choices:**
1. "I knew I chose well. We face this together."
2. "Interesting. What would you do about it?"
3. "Trust no one. Not even yourself. Not even me."

---

### Act 5: The Transition (Depth 5-6)

#### `succession_the_moment`
**"The End Approaches"**

Your health is failing. Or your enemies are closing in. Or perhaps you've simply had enough. The succession you've been planning must now happen.

**Choices:**
1. "A formal transition. Dignity above all."
2. "Fake my death. Rule from the shadows."
3. "Take them all with me. No successor."
4. "Change my mind. One more fight."

#### `succession_the_aftermath`
**"The New Order"**

Your heir takes power. What happens next depends on everything that came before.

**Endings based on heir type and relationship:**
- Loyal Son: Continues your legacy (good)
- Ambitious Protégé: Erases your legacy (bad)
- Wealthy Oligarch: Sells the country (dark)
- No Heir: Civil war (catastrophic)

---

## Cross-over Events

### From Succession → Golden Circle
**`succession_golden_circle_crossover`**
- Trigger: Heir disappoints/fails
- Action: Demote them to oligarch status
- Sets: `heir_demoted_to_oligarch` flag
- Unlocks: `golden_circle_new_oligarch` event

### From Succession → Loyalty Apparatus
**`succession_loyalty_crossover`**
- Trigger: Heir's allies become threat
- Action: Purge the heir's network
- Sets: `succession_triggered_purge` flag
- Unlocks: `loyalty_heir_investigation` event

### From Golden Circle → Succession
**`succession_oligarch_heir`**
- Trigger: `oligarch_became_heir` flag set
- Entry point for oligarch heir type mid-storyline
- Skips candidate selection, goes to testing

---

## Event IDs Summary

```
succession_the_candidates          (Entry - Depth 1)
succession_son_introduction        (Depth 1)
succession_protege_introduction    (Depth 1)
succession_oligarch_introduction   (Depth 1)
succession_first_test              (Depth 2)
succession_test_result             (Depth 2)
succession_public_introduction     (Depth 2)
succession_heir_allies             (Depth 3)
succession_heir_impatience         (Depth 3)
succession_golden_circle_crossover (Depth 3 - CROSSOVER)
succession_assassination_attempt   (Depth 4)
succession_heir_coup               (Depth 4 - if hostile)
succession_loyal_heir              (Depth 4 - if friendly)
succession_loyalty_crossover       (Depth 4 - CROSSOVER)
succession_the_moment              (Depth 5)
succession_the_aftermath           (Depth 5 - ENDING)
succession_oligarch_heir           (CROSSOVER ENTRY from Golden Circle)
```

---

## Flags Used

| Flag | Set By | Used By |
|------|--------|---------|
| `succession_active` | Dacha Summit | Crossover conditions |
| `heir_type` | Candidates event | All heir events |
| `heir_relationship` | Various | Coup/Loyal branch |
| `heir_publicly_announced` | Public Introduction | Later events |
| `heir_demoted_to_oligarch` | Crossover | Prevents loop |
| `succession_triggered_purge` | Crossover | Prevents loop |
| `oligarch_became_heir` | From Golden Circle | Crossover entry |

---

## Character Relationship Tracking

The heir has a relationship value that tracks your dynamic:

- **Starting:** 50 (neutral)
- **Maximum:** 100 (absolute loyalty)
- **Minimum:** 0 (active hostility)
- **Coup threshold:** <20
- **Loyalty threshold:** >70

Actions that affect relationship:
- Trust shown: +5 to +15
- Suspicion shown: -5 to -10
- Punishment: -10 to -20
- Rewards: +5 to +10
- Humiliation: -15 to -25

---

## Theme Elements

- **Border Color:** #4B0082 (Indigo)
- **Accent Color:** #9932CC (Dark Orchid)
- **Icon:** 👑

## Tone Notes

- Classical tragedy vibes - the heir is both necessary and threatening
- Every kind act creates dependency; every harsh act creates resentment
- The player should feel the impossibility of the succession question
- Reference historical parallels (Stalin's succession chaos, Roman imperial succession)
- The heir should feel like a person, not a chess piece
- Dark irony: you're grooming your replacement who might replace you early

