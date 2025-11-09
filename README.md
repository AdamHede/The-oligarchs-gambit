# The Oligarch's Gambit

A satirical single-player strategy game where you play as an oligarch in a country suspiciously similar to modern Russia. Balance personal wealth, state treasury, elite approval, and public anger as you navigate through political dilemmas inspired by recent history.

**Play the game:** [https://the-oligarchs-gambit.pages.dev](https://the-oligarchs-gambit.pages.dev)

## Game Concept

You are an oligarch in power, making quarterly decisions that affect four key metrics:
- 💰 **Personal Wealth** - Your goal is to maximize this
- 🏛️ **State Treasury** - Keep this from reaching 0%
- 👔 **Elite Approval** - Keep this above 0%
- 😤 **Public Anger** - Keep this below 100%

The game ends if Elite Approval reaches 0%, Public Anger reaches 100%, or the State Treasury is depleted.

## Features

### Core Mechanics
- **Quarterly Dilemmas**: Each turn presents a new event with 2-3 choice options
- **Conditional Events**: Events can unlock other events, or only appear based on game state
- **Once-Only Events**: Major story events that only happen once
- **Legacy Achievements**: Special decisions grant permanent badges

### Event System Architecture

The event system uses a sophisticated two-pool architecture inspired by **The King's Dilemma** board game, designed to scale to 250+ events with complex interconnections and branching storylines.

For complete documentation, see:
- [EVENTS_SYSTEM.md](EVENTS_SYSTEM.md) - Detailed event system mechanics
- [TONE_AND_STYLE.md](TONE_AND_STYLE.md) - Writing guidelines and tone guide
- [STORYLINES.md](STORYLINES.md) - Storyline design and basic events

#### Two-Pool System

**Universe Pool:** All ~250 possible events in the game
**Active Pool:** 20-30 events that can currently be drawn

Events dynamically move in and out of the active pool based on player decisions, creating a narrative that adapts to your choices while maintaining unpredictable pacing.

#### Event Structure
```javascript
{
    id: "unique_event_id",
    title: "Event Title",
    description: "Event description text",
    storyline: "storyline_name",     // Optional: Tags event as part of a storyline
    type: "basic|storyline|conditional", // Event type
    onceOnly: true/false,           // Can only happen once
    weight: 1-10,                    // Probability weight
    conditions: {
        personalWealth: 30,          // Minimum wealth required
        treasury: 40,                // Minimum treasury required
        elite: 20,                   // Minimum elite approval required
        anger: 40,                   // Minimum anger required
        year: 2,                     // Minimum year required
        hasTriggered: ["event_id"]   // Requires previous event to have been triggered
    },
    choices: [
        {
            text: "Choice text",
            effects: {
                personalWealth: +/-X,
                treasury: +/-X,
                elite: +/-X,
                anger: +/-X
            },
            legacy: {                // Optional achievement
                icon: "🏰",
                name: "Achievement Name",
                weight: 15,          // Effect on oligarch score
                explanation: "Brief description of what this represents"
            },
            eventTriggers: ["event_id1"],     // Legacy system (still supported)
            addToPool: ["event_id1", "event_id2"],  // Add events to active pool
            removeFromPool: ["event_id3"],          // Remove events from active pool
            completeStoryline: "storyline_name",    // Marks storyline as complete
            decisionThreshold: {     // For recurring events
                count: 3,            // After this many times choosing this option
                addToPool: ["triggered_event"]  // Add these events
            }
        }
    ]
}
```

#### Event Conditions System

Events can be conditioned on:
1. **Metric Thresholds**: Only appear when metrics are above/below certain values
2. **Year Requirements**: Only appear after certain years
3. **Triggered Events**: Only appear after other events have been triggered by player choices
4. **Once-Only Flag**: Major story events that shouldn't repeat
5. **Weight System**: More important/common events have higher weights

#### Adding New Events

To add new events to the game:

1. Add event object to the `EVENTS` array in `events.js`
2. Use unique IDs for each event
3. Set appropriate conditions based on when it should appear
4. Add `eventTriggers` to choices that should unlock future events
5. Consider adding legacy achievements for significant choices

#### Event Trigger System

Events can trigger other events through the `eventTriggers` array in choices. For example:

- Choosing to launch a "special operation" triggers `war_goes_badly` and `war_profiteering` events
- These events only appear if they're in the triggered set
- This creates branching narrative paths based on player choices

### Satirical Tone

The game satirizes authoritarian leadership through:
- Dilemmas inspired by real-world events (without naming countries directly)
- Dark humor about corruption, propaganda, and power
- Impossible balancing acts between conflicting interests
- Commentary on the absurdity of authoritarian decision-making

## Technical Details

### Files
- `index.html` - Main game structure
- `styles.css` - Mobile-first responsive styling
- `game.js` - Core game engine and logic
- `events.js` - Event definitions (currently 20 events, scalable to 150-250)

### Game State
The game tracks:
- Four core metrics (personalWealth, treasury, elite, anger)
- Current year and quarter
- Set of triggered events (legacy system)
- Set of completed events
- Array of legacy achievements earned
- Event weight modifiers
- **Active event pool** (20-30 events currently drawable)
- **Decision counts** (tracks recurring event choices)
- **Active storylines** (currently running narratives)
- **Completed storylines** (finished narrative arcs)

### Mobile Optimization
- Responsive design works on all screen sizes
- Touch-optimized buttons
- No external dependencies
- Lightweight and fast

## Playing the Game

1. Open `index.html` in any modern web browser
2. Click "Begin Your Ascent"
3. Read each dilemma carefully
4. Choose your response
5. Watch your metrics change
6. Try to survive as long as possible while maximizing your wealth

## Development Roadmap

### Phase 1: Core Game (Complete)
- ✅ Basic game engine
- ✅ Four metrics system
- ✅ Event selection and display
- ✅ Legacy achievement system
- ✅ Game over conditions
- ✅ 20 initial events

### Phase 2: Event Expansion (Next)
- Add 130-230 more events covering:
  - Military operations and consequences
  - Oligarch conflicts and alliances
  - International relations and sanctions
  - Domestic unrest and propaganda
  - Economic crises and opportunities
  - Succession and power struggles
  - Historical parallels to Putin's Russia

### Phase 3: Advanced Features (Future)
- Rare special events with unique effects
- Dynamic event weight modifications
- More complex metric interactions
- Sound effects and music
- Save/load game state
- Multiple difficulty levels
- Statistics tracking

## Contributing

When adding new events, maintain the satirical tone that:
- Mocks authoritarianism without being preachy
- References real events obliquely
- Presents impossible choices with no "good" options
- Emphasizes the absurdity of maintaining power through corruption

## Credits

Inspired by:
- Reigns (mobile game)
- The King's Dilemma (board game)
- Tropico (game series)
- Recent Russian history (2000-2024)

Made with vanilla JavaScript - no frameworks, no build process, just pure satirical fun.
