# The Oligarch's Gambit

A satirical single-player strategy game where you play as an oligarch in a country suspiciously similar to modern Russia. Balance personal wealth, state treasury, elite approval, and public anger as you navigate through political dilemmas inspired by recent history.

**Play the game:** [https://the-oligarchs-gambit.pages.dev](https://the-oligarchs-gambit.pages.dev)

## Game Concept

You are an oligarch in power, making quarterly decisions that affect four key metrics:
- 💰 **Personal Wealth** - Your goal is to maximize this
- 🏛️ **State Treasury** - Keep this from reaching 0
- 👔 **Elite Approval** - Keep this above 0%
- 😤 **Public Anger** - Keep this below 100%

The game ends if Elite Approval reaches 0%, Public Anger reaches 100%, or the State Treasury is depleted.

## Documentation

| Document | Purpose |
|----------|---------|
| [EVENT_SYSTEM.md](EVENT_SYSTEM.md) | Technical reference for the event engine |
| [WRITING_GUIDE.md](WRITING_GUIDE.md) | Tone, style, balance guidelines |
| [STORYLINE_IDEAS.md](STORYLINE_IDEAS.md) | Creative ideas for storylines and events |
| [storylines/](storylines/) | Narrative blueprints for each storyline |

## Project Structure

```
/engine/           # Game engine components
    game-engine.js     # Main game loop
    deck-manager.js    # Event pool management
    condition-eval.js  # Condition DSL evaluator
    effect-applier.js  # Apply choice effects
    game-state.js      # State management

/events/           # Event definitions
    schema.js          # Type definitions + validation
    index.js           # Events index
    example.js         # Example events

/storylines/       # Narrative documentation
    README.md          # Template guide
    war-invasion.md    # Example storyline

/tools/            # Developer utilities
    validate.js        # Validate events against schema
    analyze.js         # Statistics and warnings
    visualize.js       # Generate graph visualization

/tests/            # Test suite
    *.test.js          # Unit and integration tests
```

## Development

### Running Tests

```bash
npm test
```

### Validating Events

```bash
node tools/validate.js
```

### Analyzing Events

```bash
node tools/analyze.js
```

## Credits

Inspired by:
- Reigns (mobile game)
- The King's Dilemma (board game)
- Tropico (game series)
- Recent Russian history (2000-2024)

Made with vanilla JavaScript - no frameworks, no build process, just pure satirical fun.
