# The Golden Circle - Storyline Design Document

## Overview

**Storyline ID:** `golden-circle`
**Trigger:** Dacha Summit → "Let's make ourselves obscenely rich"
**Size:** ~25-30 events, Depth 5-6
**Theme:** Managing oligarch wealth and excess - the tension between accumulating riches and hiding them

## Core Tension

The oligarchs want to get rich. Very rich. Obscenely rich. But visibility breeds resentment. The game is about balancing:
- **Accumulation** - More wealth, more power, more toys
- **Discretion** - Don't let the public see how much you're stealing
- **Loyalty** - Keep the oligarchs happy without making any one too powerful
- **Control** - You're the boss, not them

## Key Character: Viktor Kozlov

**"The Yachtsman"** - Your most flamboyant oligarch friend. Controls the shipping industry and has a weakness for ostentatious displays of wealth. He's the canary in the coal mine - when Viktor goes too far, the public notices.

- **Personality:** Charming, reckless, nouveau riche
- **Fatal Flaw:** Cannot resist showing off
- **Arc:** From partner to liability to potential scapegoat

---

## Event Structure

### Act 1: The Feast Begins (Depth 1-2)

#### Entry Event: `golden_circle_first_deal`
**"The First Big Contract"**

The oligarchs have assembled. They've brought proposals - oil pipelines, defense contracts, rare earth mining. Everyone wants a piece. Your job is to allocate the spoils.

**Choices:**
1. "Equal shares for all loyal friends" → Spread the wealth, everyone happy but less control
2. "Favor Viktor - he's been most loyal" → One oligarch rises, others jealous
3. "Take the lion's share myself" → Maximum personal wealth, oligarchs resentful
4. "Create a bidding war" → Extract maximum state revenue, but make enemies

#### `golden_circle_offshore_setup`
**"The Cyprus Arrangement"**

Your financial advisor explains: keeping wealth inside the Federation is... risky. He proposes a network of offshore accounts. Cyprus, the Caymans, British Virgin Islands. "Completely legal. Mostly."

**Choices:**
1. "Set it up. Discretion is everything."
2. "I want my money where I can see it."
3. "Create accounts for my friends too - bind them to me."

#### `golden_circle_viktor_yacht`
**"Viktor's New Toy"**

Viktor has purchased a yacht. Not just any yacht - a 500-foot superyacht with a submarine dock, missile defense system, and reportedly, a gold toilet. He wants to throw a party. Half your cabinet is invited. Instagram is already buzzing.

**Choices:**
1. "Attend the party. We're among friends."
2. "Skip it, but send congratulations."
3. "Tell Viktor to be more discreet."
4. "Have his yacht inspected for 'safety violations'."

---

### Act 2: The Feeding Frenzy (Depth 2-3)

#### `golden_circle_pipeline_deal`
**"The Northern Route"**

A $40 billion gas pipeline project. Viktor wants the construction contract. Another oligarch, Sergei, wants it too. They're both offering you personal cuts. The state treasury would benefit from competitive bidding.

**Choices:**
1. "Give it to Viktor. Loyalty deserves reward."
2. "Give it to Sergei. Viktor's had enough."
3. "Split the contract. Both can profit."
4. "Open competitive bidding. Maximize state revenue."

#### `golden_circle_palace_construction`
**"The Palace by the Sea"**

Your chief of staff presents architectural plans: a palace on the Black Sea coast. 18,000 square meters. Theatre, ice rink, casino, vineyard. "A retreat worthy of a great leader." Cost: approximately $1.4 billion. The annual education budget is $800 million.

**Choices:**
1. "Build it. I deserve this."
2. "Scale it back. Something more modest."
3. "Build it, but route the funds through state 'infrastructure'."
4. "Perhaps later. The timing is poor."

#### `golden_circle_sanctions_warning`
**"The Western Notice"**

Western intelligence has noticed your oligarch friends' spending sprees. The EU is making noise about sanctions lists. Asset freezes. Travel bans. Your friends are nervous.

**Choices:**
1. "Ignore them. They need our gas."
2. "Quietly move assets to friendlier jurisdictions."
3. "Meet with their ambassadors. Negotiate."
4. "Let them sanction Viktor - sacrifice him to protect the rest."

---

### Act 3: The Reckoning (Depth 3-4)

#### `golden_circle_panama_leak`
**"The Data Breach"**

Disaster. An investigative journalism consortium has obtained documents from a Panamanian law firm. Your name appears 47 times. Viktor's appears 312 times. Shell companies, hidden assets, suspicious transactions. Publication in 48 hours.

**Choices:**
1. "Deny everything. Fake news."
2. "Get ahead of it - admit to 'minor accounting errors'."
3. "Block the websites. Arrest any domestic journalists who publish."
4. "Sacrifice Viktor. He's the real story."

#### `golden_circle_viktor_problem`
**"Viktor's Troubles"**

Viktor has become a liability. His Instagram is a constant PR disaster. The opposition uses his yacht photos in every protest. Western media calls him "Putin's wallet." Something must be done.

**Choices:**
1. "Warn him privately. Last chance."
2. "Distance yourself publicly, maintain ties privately."
3. "Investigate him for 'tax irregularities'."
4. "He's outlived his usefulness. Arrest him."

#### `golden_circle_oligarch_alliance`
**"The Quiet Meeting"**

Your intelligence chief reports: three oligarchs met privately in Geneva. Without you. Without your knowledge. They're not plotting - yet. But they're comparing notes.

**Choices:**
1. "Ignore it. They're just talking."
2. "Summon them. Remind them who's in charge."
3. "Bug their phones. Know everything."
4. "Preemptive strike. Arrest the ringleader."

---

### Act 4: The Fall (Depth 4-5)

#### `golden_circle_viktor_fall`
**"The Arrest"** (if Viktor was targeted)

Viktor is arrested on charges of tax evasion, money laundering, and "economic crimes against the state." His yacht is seized. His accounts frozen. Western media is outraged. The oligarchs are terrified. Is anyone safe?

**Branches:** 
- If viktor_protected: Different event
- If viktor_sacrificed: This event

**Choices:**
1. "Show trial. Make an example."
2. "Quiet conviction. Long sentence in a comfortable prison."
3. "Let him buy his way out. Take his assets."
4. "Exile. He can keep some money if he never returns."

#### `golden_circle_succession_crossover`
**"The Oligarch Prince"** (CROSSOVER EVENT → Succession)

One oligarch has become too powerful. He's richer than the state. He has his own security force. The only way to control him might be to... elevate him. Your advisors suggest making him your official heir. Bind him to the system.

**Conditions:** 
- `golden_circle_active` = true
- `oligarch_became_heir` = false (prevents loop)

**Choices:**
1. "Name him my successor. Control through elevation." → Sets `oligarch_became_heir`, unlocks `succession_oligarch_heir`
2. "Absolutely not. He stays in his lane."
3. "Destroy him instead. No one rivals me."

---

### Act 5: Endgame (Depth 5-6)

#### `golden_circle_final_accounting`
**"The Price of Everything"**

Years later. You're rich beyond imagination. But at what cost? The economy is hollowed out. Your friends are all either dead, exiled, or imprisoned. The people whisper about inequality. The West has frozen billions.

**Multiple endings based on flags:**
- `viktor_status` (allied/exiled/imprisoned/dead)
- `personal_wealth` level
- `sanctions_level`

**Choices:**
1. "It was all worth it. I regret nothing."
2. "Perhaps we went too far. Time to give something back."
3. "The game continues. There's always more to take."

---

## Cross-over Events

### From Golden Circle → Succession
**`golden_circle_succession_crossover`**
- Trigger: Oligarch becomes too powerful
- Action: Appoint him as heir to control
- Sets: `oligarch_became_heir` flag
- Unlocks: `succession_oligarch_heir` event in Succession storyline

### From Golden Circle → Loyalty Apparatus
**`golden_circle_loyalty_crossover`**
- Trigger: Oligarchs meeting secretly
- Action: Launch investigation/purge
- Sets: `wealth_triggered_purge` flag
- Unlocks: `loyalty_oligarch_investigation` event

---

## Event IDs Summary

```
golden_circle_first_deal          (Entry - Depth 1)
golden_circle_offshore_setup      (Depth 1)
golden_circle_viktor_yacht        (Depth 2)
golden_circle_pipeline_deal       (Depth 2)
golden_circle_palace_construction (Depth 2)
golden_circle_sanctions_warning   (Depth 3)
golden_circle_panama_leak         (Depth 3)
golden_circle_viktor_problem      (Depth 3)
golden_circle_oligarch_alliance   (Depth 4)
golden_circle_viktor_fall         (Depth 4)
golden_circle_succession_crossover (Depth 4 - CROSSOVER)
golden_circle_loyalty_crossover   (Depth 4 - CROSSOVER)
golden_circle_final_accounting    (Depth 5 - ENDING)
```

---

## Flags Used

| Flag | Set By | Used By |
|------|--------|---------|
| `golden_circle_active` | Dacha Summit | Crossover conditions |
| `viktor_allied` | First Deal | Viktor events |
| `viktor_warned` | Viktor Problem | Viktor Fall |
| `viktor_arrested` | Viktor Fall | Final Accounting |
| `viktor_exiled` | Viktor Fall | Final Accounting |
| `offshore_setup` | Offshore Setup | Panama Leak |
| `palace_built` | Palace Construction | Various |
| `oligarch_became_heir` | Succession Crossover | Prevents loop |
| `wealth_triggered_purge` | Loyalty Crossover | Prevents loop |

---

## Theme Elements

- **Border Color:** #FFD700 (Gold)
- **Accent Color:** #DAA520 (Goldenrod)
- **Icon:** 💰

## Tone Notes

- Emphasize the absurd excess (gold toilets, submarine docks)
- Juxtapose wealth with suffering ("education budget comparison")
- Viktor should be likeable but clearly doomed
- The player should feel complicit but also in control
- Dark comedy - these people are ridiculous

