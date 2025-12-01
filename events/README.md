# Events Directory

This directory contains all game events.

## Files

- `schema.js` - Type definitions and validation helpers
- `example.js` - Example events demonstrating the event format
- `index.js` - Combines all event files into a single export

## Creating New Events

1. Create a new file (e.g., `war-invasion.js`) for your storyline
2. Follow the format in `example.js`
3. Import and add to `index.js`
4. Run `npm run validate` to check for errors

## Event Format

See `EVENT_SYSTEM.md` in the project root for complete documentation.

```javascript
{
    id: "unique_event_id",
    title: "Event Title",
    description: "Event description...",
    recurring: false,
    weight: 5,
    tags: ["tag1", "tag2"],
    storylines: ["storyline-id"],
    conditions: { /* condition DSL */ },
    choices: [
        {
            text: "Choice text",
            effects: { /* effects */ },
            add: ["event_to_add"],
            remove: ["event_to_remove"]
        }
    ]
}
```

## Validation

```bash
npm run validate   # Check all events
npm run analyze    # Statistics and warnings
npm run visualize  # Generate graph visualization
```

