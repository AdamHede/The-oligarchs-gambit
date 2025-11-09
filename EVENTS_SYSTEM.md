# Events System Documentation

## Overview

The events system is the beating heart of **The Oligarch's Gambit**. It's inspired by **The King's Dilemma** board game, featuring a sophisticated two-pool event management system that creates dynamic, branching narratives.

## Core Concepts

### Two-Pool Architecture

The event system operates with two distinct pools:

#### 1. **The Universe Pool** (All Events)
- Contains ALL possible events in the game (~250 events eventually)
- This is the complete "box" of events
- Events exist here but may never appear in a playthrough
- Think of this as the master library

#### 2. **The Active Pool** (Current Events Deck)
- Contains 20-30 events at any given time
- These are the events that can actually be drawn
- This is the "deck" we draw from each turn
- Dynamically changes based on player decisions

### Event Lifecycle

Events move between states based on player actions:

1. **In Universe Pool** - Event exists but is not active
2. **Added to Active Pool** - Event becomes drawable
3. **Drawn** - Event is presented to player
4. **Resolved** - Player makes a choice
5. **Post-Resolution**:
   - **Removed from Active Pool** - Most events (one-off)
   - **Remains in Active Pool** - Recurring events
   - **Triggers New Events** - Adds/removes other events

## Event Types

### Basic Events (Recurring)

**Characteristics:**
- Can happen multiple times
- Generally remain in the active pool
- Often have lower narrative weight
- Track decision counts for consequences

**Examples:**
- "Protest in the City" - can happen repeatedly
- "Economic Crisis" - recurring problem
- "Corruption Opportunity" - always an option

**Special Behavior:**
- Decision tracking: The game tracks how many times you choose each option
- Threshold effects: After X uses of "lethal force on protesters," new events trigger
- Compounding consequences: Some choices have effects that build up

### One-Off Events (Storyline)

**Characteristics:**
- Happen exactly once
- Remove themselves from active pool after resolution
- Often part of larger storylines
- Usually have significant consequences

**Examples:**
- "Special Military Operation Proposal" - one-time decision
- "Constitutional Reform" - happens once
- "Palace Construction" - one-time project

## Storylines

Storylines are narrative arcs that span multiple related events. Events in a storyline are tagged and interconnected.

### Storyline Structure

```javascript
{
    id: "event_id",
    title: "Event Title",
    storyline: "special_military_operation", // Storyline tag
    // ... rest of event definition
}
```

### How Storylines Work

1. **Initiation**: A trigger event starts the storyline (e.g., "Launch invasion")
2. **Branching**: Player choice determines which branch of the storyline activates
3. **Dynamic Pool**: Events are added/removed based on choices
4. **Mutual Exclusivity**: Choosing one path removes incompatible events
5. **Conclusion**: Storylines end with dramatic, high-legacy-impact events

### Example: Special Military Operation Storyline

```
[Initial Event] "A Neighboring Territory"
    ├─> Choice: "Launch invasion"
    │   ├─> Adds to Active Pool: "war_quick_victory" OR "war_stalls_at_capital"
    │   ├─> Removes: "peaceful_resolution_opportunity"
    │   └─> Keeps in Pool: Basic events continue
    │
    ├─> Choice: "Delay for kickbacks"
    │   └─> No storyline progression, but decision tracked
    │
    └─> Choice: "Reject invasion"
        ├─> Removes: All war events
        └─> Adds: "nationalist_backlash" events
```

### Example: Student Protest Storyline

```
[Basic Event] "Small Protest" (recurring)
    └─> Track decisions:
        ├─> "Do nothing" x5 → Adds "Massive Organized Protest"
        ├─> "Propaganda" x3 → Adds "Media Distrust Crisis"
        └─> "Lethal force" x2 → Adds "Organized Student Movement"
                                → Adds "International Condemnation"
```

## Decision Tracking

### Purpose
Track how many times specific decisions are made on recurring events to trigger consequences.

### Implementation

```javascript
state: {
    decisionCounts: {
        "protest_movement_lethal": 3,  // Used lethal force 3 times
        "corruption_accept": 7,         // Accepted bribes 7 times
        "propaganda_deploy": 5          // Used propaganda 5 times
    }
}
```

### Threshold Triggers

```javascript
{
    id: "organized_resistance",
    conditions: {
        decisionCount: {
            "protest_movement_lethal": 3  // Requires 3+ lethal force uses
        }
    }
}
```

## Event Pool Management

### Adding Events to Active Pool

Events are added to the active pool through:

1. **Initial Pool**: Game starts with ~25 basic events active
2. **Choice Triggers**: `addToPool: ["event_id_1", "event_id_2"]`
3. **Conditional Adds**: When conditions are met, events auto-add
4. **Storyline Progression**: Advancing storylines adds related events

### Removing Events from Active Pool

Events are removed through:

1. **Self-Removal**: Most events remove themselves after resolution
2. **Choice Triggers**: `removeFromPool: ["event_id_1", "event_id_2"]`
3. **Mutual Exclusivity**: Choosing one path removes contradictory events
4. **Storyline Completion**: Finishing a storyline removes all its events

### Example Event with Pool Management

```javascript
{
    id: "launch_special_operation",
    title: "The Invasion Decision",
    onceOnly: true,
    choices: [
        {
            text: "Launch the invasion",
            effects: { /* ... */ },
            addToPool: [
                "war_quick_victory",
                "war_stalls",
                "war_profiteering",
                "conscription_crisis",
                "sanctions_wave_1"
            ],
            removeFromPool: [
                "peaceful_diplomacy_option",
                "trade_expansion_opportunity"
            ]
        }
    ]
}
```

## Conditional Events

### Advanced Conditions

Events can be conditioned on:

1. **Metrics**: `personalWealth >= 50`, `anger >= 70`
2. **Time**: `year >= 3`, `quarter === 1`
3. **Previous Events**: `hasTriggered: ["event_id"]`
4. **Decision Counts**: `decisionCounts.protest_lethal >= 3`
5. **Active Storylines**: `activeStorylines.includes("war")`
6. **Legacy Status**: `hasLegacy: ["Palace Builder"]`
7. **Complex Conditions**: Multiple ANDs and ORs

### Example Complex Condition

```javascript
{
    id: "international_sanctions",
    conditions: {
        hasTriggered: ["special_operation_launch", "journalist_killed"],
        anger: 60,
        OR: [
            { decisionCounts: { lethal_force: 3 } },
            { hasLegacy: ["War Criminal"] }
        ]
    }
}
```

## Luck vs. Choice

### The Balance

The system creates an elegant balance:

- **Player Choice**: Which path to take in each event
- **Luck/Fate**: Which event is drawn from the active pool

### How It Works

1. Player chooses to invade → War events added to pool
2. Random draw: Might get "War Goes Well" or "Economic Crisis" (basic event)
3. Player deals with whatever is drawn
4. Next draw: Might be war-related or might be domestic issue
5. Storylines progress when their events are drawn

This creates:
- Unpredictable pacing (war might develop quickly or slowly)
- Realistic chaos (problems don't wait their turn)
- Strategic tension (you can't control when issues surface)
- Replayability (different draw order = different experience)

## Weights and Probability

### Weight System

```javascript
{
    id: "basic_event",
    weight: 5  // 5x more likely than weight-1 events
}
```

### Dynamic Weight Modification

Weights can change based on game state:

```javascript
// After launching war, war events get higher weights
if (state.activeStorylines.includes("war")) {
    modifyWeight("war_development", 3.0);  // Triple the weight
}
```

### Weight Guidelines

- **Basic recurring events**: 3-7
- **Storyline events**: 8-12 (when active)
- **Rare special events**: 1-2
- **Critical storyline moments**: 15-20

## Storyline Endings

Storylines should conclude with high-impact events:

### Characteristics of Ending Events

1. **Dramatic Effect**: Major changes to metrics
2. **Significant Legacy**: High weight legacy items (±15 to ±25)
3. **Pool Cleanup**: Remove all storyline events from pool
4. **State Change**: Mark storyline as "completed"

### Example Ending Event

```javascript
{
    id: "war_catastrophic_loss",
    title: "The Retreat",
    storyline: "special_military_operation",
    weight: 15,
    conditions: {
        activeStorylines: ["special_military_operation"],
        treasury: 200,  // Low resources
        decisionCounts: { war_profiteering: 2 }
    },
    choices: [
        {
            text: "Order full retreat. Blame the generals.",
            effects: {
                treasury: -400,
                elite: -30,
                anger: 40
            },
            legacy: {
                icon: "🏳️",
                name: "Strategic Failure",
                weight: -25
            },
            removeFromPool: ["*storyline:special_military_operation"],
            completeStoryline: "special_military_operation"
        }
    ]
}
```

## Best Practices

### Event Design

1. **Clear Consequences**: Each choice should have logical effects
2. **No Perfect Choice**: All options have downsides
3. **Interesting Tradeoffs**: Force meaningful decisions
4. **Narrative Coherence**: Events should make sense in context

### Storyline Design

1. **Clear Arc**: Beginning, middle, end
2. **Multiple Branches**: 2-3 possible paths minimum
3. **Dramatic Conclusion**: Big impact at the end
4. **Cleanup**: Remove all storyline events when done

### Pool Management

1. **Keep Pool Size Consistent**: ~20-30 events
2. **Balance Event Types**: Mix basic and storyline events
3. **Prevent Stagnation**: Remove completed storylines
4. **Ensure Variety**: Don't flood pool with one storyline

## Technical Implementation

### State Structure

```javascript
state: {
    // Existing
    personalWealth: 50,
    treasury: 500,
    elite: 50,
    anger: 20,
    year: 1,
    quarter: 1,
    legacy: [],

    // New for enhanced system
    activeEventPool: [],           // IDs of events in active pool
    decisionCounts: {},            // Track recurring decisions
    activeStorylines: [],          // Currently active storylines
    completedStorylines: [],       // Finished storylines
    triggeredEvents: new Set(),    // Events that have been triggered
    completedEvents: new Set()     // Events that have been completed
}
```

### Event Selection Algorithm

```javascript
function selectEvent() {
    // 1. Filter to events in active pool only
    const poolEvents = allEvents.filter(e =>
        state.activeEventPool.includes(e.id)
    );

    // 2. Filter by conditions
    const eligible = poolEvents.filter(e =>
        checkConditions(e.conditions)
    );

    // 3. Apply weights
    const weighted = applyWeights(eligible);

    // 4. Random selection
    return weightedRandom(weighted);
}
```

## Future Enhancements

1. **Event Chains**: Multi-event sequences that must happen in order
2. **Timed Events**: Events that expire after X turns if not drawn
3. **Persistent Effects**: Events that modify game rules permanently
4. **Meta-Progression**: Unlockable events across playthroughs
5. **Dynamic Difficulty**: Pool adjusts based on player success
