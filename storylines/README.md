# Storyline Documentation

This directory contains narrative blueprints for the game's major storylines. These markdown files serve as **design documents** for AI agents and developers when creating events.

## Purpose

1. **Write the story first** - Define narrative arc, key beats, tone, themes
2. **Then implement as events** - Translate story beats into game events

## How to Use

When creating a new storyline:

1. Create a markdown file in this directory (e.g., `war-invasion.md`)
2. Follow the template structure below
3. Document the narrative arc, key events, branching points
4. Reference event IDs that will implement this storyline
5. Note overlaps with other storylines

## Designing for the Event Pool

Our event system is unique: events are drawn from a shared pool, meaning multiple storylines happen in parallel. When designing your storyline, use these patterns to create depth:

### Pattern 1: Parallel Consequences
One decision triggers multiple events that *all* happen eventually, but in random order.
*   **Example**: Execution of a prisoner adds `international_outrage` AND `domestic_fear`.
*   **Use for**: Ripple effects, complex fallout.

### Pattern 2: Competing Outcomes
One decision triggers multiple events, but only *one* happens (the first one drawn removes the others).
*   **Example**: Risky operation adds `operation_success` AND `operation_failure`.
*   **Use for**: Risk, uncertainty, "rolling the dice".

## Storyline Markdown Template

```markdown
# Storyline Name

## Theme & Tone
Brief description of the narrative theme and tone.

## Key Characters
- Character 1 (role, motivation)
- Character 2 (role, motivation)

## Story Beats
1. **Inciting Incident**: What starts this storyline
2. **Escalation**: How it develops
3. **Complications**: What goes wrong
4. **Climax**: The dramatic peak
5. **Resolution**: How it ends (multiple endings possible)

## Branching Points
- Major decision point 1 (leads to path A or B)
- Major decision point 2 (leads to path C or D)

## Related Events
- event_id_1 (entry point)
- event_id_2 (mid-story)
- event_id_3 (ending)

## Overlaps With
- other-storyline-name (shared events or consequences)
```

## Storyline Theming

Each storyline should have a visual theme defined in the frontend:

- **Icon**: Emoji representing the storyline
- **Label**: Short display name
- **Color**: Primary color for cards
- **Gradient**: Background gradient for cards

These themes are defined in the game's frontend code, not in these markdown files.

## Multi-Storyline Events

Events can belong to multiple storylines. When an event spans storylines:

- List all relevant storylines in the event's `storylines` array
- The first storyline is the "primary" theme
- Other storylines appear as secondary badges

## Current Storylines

- `world-bible.md` - **START HERE**. The overview of the setting, factions, and tone.
- `war-invasion.md` - War of expansion storyline
- `oligarch-rivalry.md` - Power struggles between oligarchs
- `succession-crisis.md` - Questions of succession and power transfer
- `sanctions-spiral.md` - Escalating international sanctions
- `popular-uprising.md` - Mass protests and social movements
- `shadow-war.md` - Spies, assassinations, and covert operations
- `religious-revival.md` - The church as a political tool
- `cultural-purge.md` - "The War on Woke", canceling artists and controlling culture
- `ai-dictator.md` - "Cyber-Gulag", digital surveillance and AI control
