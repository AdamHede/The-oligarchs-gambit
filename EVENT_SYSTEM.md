# Event System Documentation

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

### Pattern 1: Parallel Consequences

A single action triggers **multiple independent consequences** that all unfold over time.

**Example: Killing a hostage**
```javascript
{
    id: "hostage_situation",
    choices: [{
        text: "Execute the hostage to send a message",
        add: [
            "international_outrage",      // Foreign leaders condemn you
            "hostage_family_revenge",     // The family seeks vengeance
            "domestic_fear_spreads"       // Your own people grow afraid
        ]
    }]
}
```

All three events will eventually be drawn. The player doesn't know the order—maybe they deal with international sanctions first, then the family's revenge plot shows up weeks later. This creates **layered storytelling** where consequences unfold unpredictably.

**When to use:**
- An action has multiple real-world ripple effects
- You want the player to experience all consequences, just not all at once
- Different factions react to the same event

### Pattern 2: Competing Outcomes (Random Fork)

A single action has **multiple possible outcomes**, but only one will occur. This adds uncertainty to player decisions.

**Example: Send idiot nephew to summit**
```javascript
{
    id: "climate_summit_invitation",
    choices: [{
        text: "Send your incompetent nephew as delegation head",
        add: [
            "nephew_surprising_success",  // He actually does well
            "nephew_embarrasses_regime"   // He's a disaster
        ]
    }]
}

// In nephew_surprising_success:
{
    id: "nephew_surprising_success",
    title: "The Idiot Savant",
    description: "Against all odds, your nephew charmed the EU delegates...",
    choices: [{
        text: "Promote him",
        remove: ["nephew_embarrasses_regime"]  // Cancel the bad outcome
    }]
}

// In nephew_embarrasses_regime:
{
    id: "nephew_embarrasses_regime", 
    title: "The Diplomatic Disaster",
    description: "Your nephew got drunk and insulted the German chancellor...",
    choices: [{
        text: "Recall him immediately",
        remove: ["nephew_surprising_success"]  // Cancel the good outcome
    }]
}
```

**Key mechanic:** Whichever event is drawn first removes the other from the pool. The player made one decision but experiences one of two random outcomes.

**When to use:**
- Actions with uncertain outcomes (gambling, diplomacy, military operations)
- You want to create "what if" moments
- The player should feel they're rolling dice with consequences

### Combining Both Patterns

A single choice can use both patterns:

```javascript
{
    id: "start_war",
    choices: [{
        text: "Launch the special military operation",
        add: [
            // Parallel consequences (all will happen):
            "sanctions_incoming",
            "war_casualties_mount",
            
            // Competing outcomes (only one will happen):
            "quick_victory",        // 72-hour special operation
            "war_becomes_quagmire"  // Years of conflict
        ]
    }]
}
```

The sanctions and casualties are guaranteed. But the war's outcome is uncertain until one of those cards is drawn.

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

