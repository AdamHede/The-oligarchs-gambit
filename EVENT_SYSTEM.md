# Event System Documentation

> **Version 2.2** - Adds exclusive groups, entity dependencies, and force-add events

## Quick Reference: DSL Syntax

```javascript
import { defineStoryline, event, choice, eventRef } from './engine/storyline-dsl.js';

// Define an event
event("event_id", {
    title: "Event Title",
    description: "Event description...",
    weight: 5,                    // Draw probability
    requires: ["entity_id"],      // v2.2: Auto-removed if entity dies
    forceAddAtStart: true,        // v2.2: Always in initial deck
    timeGate: { maxYear: 1 },     // Disappears after Year 1
    
    choices: [
        choice("Choice text", {
            effects: {
                stats: { treasury: -50 },
                flags: { war_started: true },
                characterStates: { general_X: "dead" }  // Triggers cascade
            },
            unlocks: [...],           // Parallel outcomes (all occur)
            unlocksExclusive: [...],  // v2.2: Exclusive outcomes (one occurs)
            terminates: ["event_id"]  // Explicit blocking
        })
    ]
})
```

## Overview

The event system is a **card-based narrative engine** where events ("cards") are drawn randomly from a shared pool. This creates a unique gameplay feel:

- **Within each storyline**: Events branch like a tree. Player choices unlock new events in that storyline.
- **Across storylines**: Multiple storylines unfold **in parallel**. The player doesn't know when they'll return to a particular storyline.
- **The pool/deck**: All available events from all active storylines live in a shared pool. Each turn, one card is drawn randomly based on weight.

### Why This Design?

1. **Tension through unpredictability**: You make a choice in the War storyline, but you don't know when the consequences will arrive. Other storylines (sanctions, oligarch rivalries) keep happening in between.
2. **Interleaved narratives**: Real crises don't wait in line. While dealing with a popular uprising, you might suddenly have to handle a sanctions deadline.
3. **Branching with randomness**: A choice can trigger multiple possible outcomes, but the player experiences them in a random order—or only experiences some of them.

### Core Concepts

- **Nodes** = Events (fixed content "cards")
- **Edges** = Decision outcomes that add/remove events from the pool
- **Pool/Deck** = The set of events that can be drawn next turn

## Architecture

### File Structure

```
/engine/
    game-state.js          # State management
    deck-manager.js        # Add/remove/draw logic
    condition-eval.js      # Condition DSL evaluator
    effect-applier.js      # Apply choice effects
    game-engine.js         # Main game engine
    storyline-themes.js   # Frontend theming

/events/
    schema.js              # Type definitions + validation
    example.js             # Example events
    index.js               # Events index
    [event files...]       # Event definitions

/storylines/
    README.md              # Storyline documentation guide
    war-invasion.md        # Narrative blueprints
    [storyline files...]

/tools/
    validate.js            # Validate all events
    analyze.js             # Statistics + warnings
    visualize.js           # Generate graph visualization
```

## Event Schema

### Basic Structure

```javascript
{
    id: "unique_event_id",
    title: "Event Title",
    description: "Event description text...",
    
    // Card properties
    recurring: false,           // true = stays in deck after drawn
    weight: 5,                  // draw probability (higher = more likely)
    tags: ["political", "crisis"],  // Categorization tags
    storylines: ["war-invasion"],    // Array of storyline IDs
    
    // Conditions (when is this event playable?)
    conditions: { /* condition DSL */ },
    
    // Choices (1-4 options)
    choices: [
        {
            text: "Choice text",
            effects: { /* stat/counter/flag changes */ },
            add: ["event_id_1", "event_id_2"],      // Events to add to deck
            remove: ["event_id_3"],                 // Events to remove from deck
            removeSelf: true,                       // Remove this event (default: !recurring)
            addSelf: false                          // Keep/re-add this event (for recurring)
        }
    ]
}
```

## Condition DSL

### Simple Conditions (Implicit AND)

```javascript
conditions: {
    stats: {
        treasury: { gte: 200 },      // Treasury >= 200
        anger: { lt: 50 }             // Anger < 50
    },
    flags: {
        "war_started": true           // Flag must be true
    },
    counters: {
        "choice:punish_prisoner": { gte: 2 }  // Counter >= 2
    }
}
```

### Complex Conditions (Explicit Logic)

```javascript
conditions: {
    all: [  // AND: all must be true
        { stat: "treasury", lt: 200 },
        { any: [  // OR: any must be true
            { flag: "sanctions_active" },
            { counter: "choice:corruption", gte: 5 }
        ]},
        { not: { flag: "has_foreign_aid" } }  // NOT: negate
    ]
}
```

### Supported Operators

- `eq` - Equal to
- `neq` - Not equal to
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal
- `between: [min, max]` - Between min and max (inclusive)

## Effects System

### Stat Changes

```javascript
effects: {
    stats: {
        personalWealth: 10,    // Add 10
        treasury: -50,          // Subtract 50
        elite: 5,
        anger: -10
    }
}
```

Stats are automatically clamped to bounds:
- `personalWealth`: 0-200
- `treasury`: 0-2000
- `elite`: 0-100
- `anger`: 0-100

### Counter Operations

```javascript
effects: {
    counters: {
        "choice:lethal_force": 1,      // Increment by 1
        "custom:prisoners": -1          // Decrement by 1
    }
}
```

Auto-counters are automatically tracked:
- `event:{eventId}` - Increments each time event is drawn
- `choice:{eventId}_{choiceIndex}` - Increments when choice selected

### Flag Toggles

```javascript
effects: {
    flags: {
        "war_started": true,
        "peace_talks": false,
        "prisoner_exists": true
    }
}
```

### Legacy Achievements

```javascript
effects: {
    legacy: {
        icon: "⚔️",
        name: "Warmonger",
        weight: -10
    }
}
```

## Deck Operations

### Adding Events

```javascript
choices: [{
    text: "Launch invasion",
    add: ["war_goes_badly", "conscription_crisis", "sanctions_incoming"]
}]
```

### Removing Events

```javascript
choices: [{
    text: "Release prisoner",
    remove: ["prisoner_escape_risk"]  // Remove escape event
}]
```

### Recurring Events

```javascript
{
    id: "economic_crisis",
    recurring: true,  // Stays in deck after being drawn
    choices: [{
        text: "Print money",
        removeSelf: false  // Explicitly keep in deck
    }]
}
```

## Multi-Event Patterns

When a single choice adds multiple events to the pool, there are two distinct patterns. **Understanding these is critical for good game design.**

### Pattern 1: Parallel Consequences (unlocks)

A single action triggers **multiple independent consequences** that all unfold over time.

**Example: Killing a hostage**
```javascript
choice("Execute the hostage to send a message", {
    unlocks: [
        event("international_outrage", {...}),    // Foreign leaders condemn you
        event("hostage_family_revenge", {...}),   // The family seeks vengeance
        event("domestic_fear_spreads", {...})     // Your own people grow afraid
    ]
})
```

All three events will eventually be drawn. The player doesn't know the order—maybe they deal with international sanctions first, then the family's revenge plot shows up weeks later. This creates **layered storytelling** where consequences unfold unpredictably.

**When to use:**
- An action has multiple real-world ripple effects
- You want the player to experience all consequences, just not all at once
- Different factions react to the same event

### Pattern 2: Mutually Exclusive Outcomes (unlocksExclusive) ⭐ NEW v2.2

A single action has **multiple possible outcomes**, but only one will occur. The engine automatically removes siblings when one is drawn.

**Example: Send idiot nephew to summit**
```javascript
choice("Send your incompetent nephew as delegation head", {
    unlocksExclusive: [
        event("nephew_surprising_success", {
            title: "The Idiot Savant",
            description: "Against all odds, your nephew charmed the EU delegates...",
            choices: [
                choice("Promote him", { effects: { stats: { elite: 5 } } })
            ]
        }),
        event("nephew_embarrasses_regime", {
            title: "The Diplomatic Disaster", 
            description: "Your nephew got drunk and insulted the German chancellor...",
            choices: [
                choice("Recall him immediately", { effects: { stats: { elite: -5 } } })
            ]
        })
    ]
})
```

**Key mechanic:** When ANY event from an exclusive group is **drawn**, all siblings are automatically removed from the deck. No manual `remove: []` needed!

**When to use:**
- Actions with uncertain outcomes (gambling, diplomacy, military operations)
- You want to create "what if" moments
- The player should feel they're rolling dice with consequences

### Combining Both Patterns

A single choice can use both patterns:

```javascript
choice("Launch the special military operation", {
    // Parallel consequences (all will happen):
    unlocks: [
        event("sanctions_incoming", {...}),
        event("war_casualties_mount", {...})
    ],
    // Exclusive outcomes (only one will happen):
    unlocksExclusive: [
        event("quick_victory", {...}),        // 72-hour special operation
        event("war_becomes_quagmire", {...})  // Years of conflict
    ]
})
```

The sanctions and casualties are guaranteed. But the war's outcome is uncertain until one of those cards is drawn.

## Entity Dependencies (requires) ⭐ NEW v2.2

Events can declare dependencies on characters or entities. When an entity becomes unavailable (dead, exiled, fled), all events requiring that entity are **automatically removed** from the deck.

### Declaring Dependencies

```javascript
event("prisoner_hunger_strike", {
    title: "Hunger Strike",
    description: "Your famous prisoner has begun refusing food...",
    requires: ["prisoner_navalny"],  // This event requires the prisoner to exist
    choices: [
        choice("Force-feed him", {...}),
        choice("Let him starve", {...})
    ]
})
```

### Triggering Cascade Removal

When a choice changes a character's state to an "unavailable" state, all dependent events are removed:

```javascript
choice("Execute the prisoner", {
    effects: {
        characterStates: { "prisoner_navalny": "dead" }  // Triggers cascade!
    }
})
```

**Unavailable states:** `dead`, `exiled`, `imprisoned`, `fled`

**What happens:**
1. Character state is set to "dead"
2. Engine finds all events with `requires: ["prisoner_navalny"]`
3. Those events are removed from deck and marked as terminated
4. They cannot be re-added later

### When to Use

- **Recurring characters**: Opposition leader, specific oligarch, family member
- **Narrative coherence**: Can't have "prisoner escapes" event if prisoner is dead
- **Scale management**: One character death can cleanly remove 10+ related events

## Early Game Events (forceAddAtStart) ⭐ NEW v2.2

Events that set up major storylines can be force-added to the initial deck:

```javascript
event("inaugural_address", {
    title: "Your Inaugural Address",
    description: "The cameras are rolling. What message defines your regime?",
    forceAddAtStart: true,              // Always in initial deck
    timeGate: { maxYear: 1 },           // Disappears after Year 1
    choices: [
        choice("Promise military glory", {
            unlocksExclusive: [
                event("war_planning", {...}),
                event("general_enthusiasm", {...})
            ]
        }),
        choice("Promise economic reform", {
            unlocks: [
                event("privatization_wave", {...})
            ]
        })
    ]
})
```

**Pattern for "Early Events":**
- `forceAddAtStart: true` - Guaranteed to be in starting deck
- `timeGate: { maxYear: 1 }` - Disappears after Year 1 (turn 4)
- Up to 4 choices that each spawn different storylines

## Event Lifecycle & Trigger Matrix ⭐ NEW v2.2

Understanding when events can be added or removed is crucial for designing responsive storylines.

### The Two Trigger Points

| Trigger | Can ADD events | Can REMOVE events |
|---------|----------------|-------------------|
| **Event is DRAWN** | ❌ No | ✅ Yes (exclusive siblings) |
| **Choice is MADE** | ✅ Yes | ✅ Yes |

**Drawing is passive** (fate determines outcome), **choosing is active** (player shapes consequences).

### Complete Deck Modification Matrix

| What happens | When | Where declared | Example |
|--------------|------|----------------|---------|
| Add events to deck | Choice made | `unlocks: []` or `unlocksExclusive: []` | Spawn consequences |
| Remove specific events | Choice made | `terminates: []` | Block alternative paths |
| Remove exclusive siblings | Event drawn | `unlocksExclusive: []` on parent | Only one outcome occurs |
| Remove entity-dependent events | Character state changes | `requires: []` + `characterStates` | Character dies, related events gone |
| Prevent draw (eligibility) | Every draw | `conditions: {}` | Stat/flag requirements not met |

### Event State Categories

The engine tracks every event in one of these states:

1. **PASSED** - Event was drawn and player made a choice
2. **AVAILABLE** - Event is in the deck, can be drawn
3. **REACHABLE** - Event could still be unlocked through future choices
4. **BLOCKED** - Event can NEVER be reached (paths are permanently closed)

### Example: Complete Prisoner Storyline

```javascript
// Parent event with exclusive outcomes
choice("Throw him in prison", {
    effects: { 
        flags: { prisoner_arrested: true },
        characterStates: { prisoner_X: "imprisoned" }
    },
    
    // Parallel: These will all eventually happen
    unlocks: [
        event("prison_conditions_criticized", {...}),
        event("family_appeals_to_west", {...})
    ],
    
    // Exclusive: Only ONE of these will happen
    unlocksExclusive: [
        event("prisoner_dies_in_custody", {
            requires: ["prisoner_X"],
            choices: [
                choice("Cover it up", {
                    effects: { characterStates: { prisoner_X: "dead" } }
                    // ↑ This triggers cascade: removes all events requiring prisoner_X
                })
            ]
        }),
        event("prisoner_escapes", {
            requires: ["prisoner_X"],
            choices: [...]
        }),
        event("prisoner_hunger_strike", {
            requires: ["prisoner_X"],
            choices: [...]
        })
    ]
})
```

**What happens:**
1. Player chooses "Throw him in prison"
2. Deck gets: `prison_conditions_criticized`, `family_appeals_to_west`, `prisoner_dies_in_custody`, `prisoner_escapes`, `prisoner_hunger_strike`
3. Random draw picks `prisoner_dies_in_custody`
4. **Automatic**: `prisoner_escapes` and `prisoner_hunger_strike` are removed (exclusive siblings)
5. Player chooses "Cover it up"
6. **Cascade**: Any other events with `requires: ["prisoner_X"]` are removed (he's dead)

## Storylines

### Parallel Storylines

Multiple storylines unfold **simultaneously**. The player doesn't control which storyline they engage with next—it's determined by the random draw.

**Why this matters:**
- You're managing a war, but suddenly an oligarch rivalry demands attention
- Real crises don't wait in line; neither do game events
- Creates the feeling of being an overwhelmed autocrat juggling multiple fires

**In practice:**
1. The player starts the War storyline by authorizing an invasion
2. That adds `war_goes_badly`, `sanctions_incoming`, `rally_around_flag` to the pool
3. But the pool also contains events from other storylines (economic crises, oligarch plots)
4. The player might draw `pension_crisis` before they draw `war_goes_badly`
5. When they finally draw a war event, it feels like "oh right, that's still happening"

### Multi-Storyline Events

Events can belong to multiple storylines when they bridge narratives:

```javascript
{
    id: "sanctions_escalation",
    storylines: ["war-invasion", "sanctions-spiral"],
    // ...
}
```

The first storyline is the "primary" theme. Others appear as secondary badges.

### Storyline Documentation

Storylines are documented in `/storylines/*.md` files. These serve as narrative blueprints for creating events.

See `/storylines/README.md` for the template.

## Usage

### In Game Engine

```javascript
const GameEngine = require('./engine/game-engine');
const events = require('./events/index');

const engine = new GameEngine(events, {
    stats: { personalWealth: 10, treasury: 1000, elite: 90, anger: 10 },
    deck: ["event_id_1", "event_id_2"]
});

// Draw next event
const event = engine.drawNextEvent();

// Make a choice
const result = engine.makeChoice(0);

// Check game over
const gameOver = engine.checkGameOver();
```

### CLI Tools

```bash
# Validate all events
node tools/validate.js

# Analyze events (statistics, warnings)
node tools/analyze.js

# Generate graph visualization
node tools/visualize.js --output=graph.html

```

## Best Practices

1. **Clear event IDs**: Use descriptive, snake_case IDs
2. **Meaningful conditions**: Use conditions to create logical event flow
3. **Balanced choices**: Each choice should have tradeoffs
4. **Storyline coherence**: Events in a storyline should form a narrative arc
5. **Dead ends**: Not all events need to trigger new events (dead ends are OK)
6. **Weight tuning**: Adjust weights to control event frequency

## Examples

See `/events/example.js` for complete examples including:
- Basic events with conditions
- Recurring events
- Multi-storyline events
- Complex condition logic
- Event variants (graduated severity)

