# Event System Documentation

## Overview

The event system models events as a **directed graph** where:
- **Nodes** = Events (fixed content "cards")
- **Edges** = Decision outcomes that introduce/remove events from the deck

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

## Storylines

### Multi-Storyline Events

Events can belong to multiple storylines:

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

