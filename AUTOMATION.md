# Event System Automation Tools

This document describes the automation tools for analyzing and maintaining the event system.

## Quick Start

After making changes to events, run:

```bash
node analyze-events.js
```

This will:
- Analyze all 154 events across 7 category files
- Generate `EVENT_ANALYSIS.md` with detailed statistics
- Generate `event-tree.json` for the in-game debug viewer
- Report warnings and issues

## Version Management

To update the version number across all files:

```bash
node analyze-events.js 1.7.0
```

This automatically updates version numbers in:
- `game.js` (GAME_VERSION constant)
- `README.md` (Version line)
- `events.js` (header comment)
- All 7 event category files in `events/` directory

## What Gets Analyzed

### Event Statistics

The analyzer provides comprehensive statistics about your event system:

- **Total event count** and breakdown by category
- **Entry points**: Events that can appear without prerequisites
- **Branching events**: Events that introduce new events to the active pool
- **Dead ends**: Events that don't add any new events (currently 74.7% - too high!)
- **Orphaned events**: Events with `hasTriggered` conditions that are never added to the pool
- **Chain depth**: Longest sequence of connected events

### Warnings

The analyzer detects common issues:

- References to non-existent events in `addToPool`, `removeFromPool`, or `eventTriggers`
- Events that can never be triggered (orphaned events)
- Circular dependencies (coming soon)

### Event Tree Visualization

Two formats are generated:

1. **EVENT_ANALYSIS.md** - Human-readable markdown report with:
   - Statistics summary
   - Warning list
   - Orphaned events list
   - Entry point events
   - Event tree visualization showing major chains

2. **event-tree.json** - Machine-readable JSON for the frontend, containing:
   - Full event graph with relationships
   - Statistics for display
   - Trigger chains and dependencies

## In-Game Debug Viewer

The debug menu now includes an **Event Tree Structure** viewer with spoiler protection.

To access it:

1. Open the game in your browser
2. Click "Begin Your Ascent"
3. Expand the "🐛 Debug Information" section
4. Click "🌳 Event Tree Structure (Spoilers!)"

The viewer shows:
- 📊 Real-time statistics about the event system
- 🌿 Branching events (events that introduce new events)
- 🛑 Dead end events (events that don't branch)
- 🔴 Orphaned events (events that can never trigger)
- ⚠️ Warnings about missing references

Color coding:
- 🟢 Green badges: Branching events (good!)
- 🔴 Red badges: Dead ends (too many of these)
- 🟠 Orange badges: Orphaned events (bugs to fix)

## Current Issues Identified

Running the analyzer on v1.6.0 reveals:

### ⚠️ 25 Warnings
Events referencing non-existent events:
- `military_disaster`
- `mobilization_announcement`
- `ethnic_tensions`
- `international_tribunal`
- `sanctions_escalation`
- And 20 more...

### 🔴 19 Orphaned Events
Events that can never be triggered:
- `bridge_strike`
- `nuclear_threats`
- `territorial_annexation`
- `sanctions_incoming`
- And 15 more...

### 📉 Branching Problem
- **74.7% dead ends** - Most events don't introduce new events
- **Only 25.3% branching** - Too few events add content to the pool
- **Only 7.8% major branches** (3+ new events)

This explains why games end with empty active pools!

## Recommended Workflow

### After Making Event Changes

1. Run the analyzer:
   ```bash
   node analyze-events.js
   ```

2. Review `EVENT_ANALYSIS.md` for issues

3. Fix any warnings about missing events

4. Commit changes:
   ```bash
   git add -A
   git commit -m "Update events and fix issues"
   ```

### Before Releasing a New Version

1. Update version and analyze:
   ```bash
   node analyze-events.js 1.7.0
   ```

2. Review statistics to ensure good branching ratio

3. Test the game to verify event flow

4. Commit and push:
   ```bash
   git add -A
   git commit -m "Release v1.7.0: [description]"
   git push
   ```

## Improving Branching Ratio

To fix the "empty deck" problem, we need to increase branching:

### Current State
- 115 dead ends (74.7%)
- 39 branching events (25.3%)
- 12 major branches (7.8%)

### Target State
- 50% dead ends (acceptable)
- 50% branching events (good)
- 20-25% major branches (great)

### How to Improve

1. **Convert dead ends to branches**: Add `addToPool` to choices that currently have none

2. **Create event chains**: Design sequences of 3-5 events that flow from one to the next

3. **Add branching points**: When a major event happens, introduce 2-3 new events to the pool

4. **Fix orphaned events**: Either:
   - Add them to relevant `addToPool` arrays
   - Remove the `hasTriggered` condition if not needed
   - Delete the event if it's obsolete

5. **Create the missing events**: Add the 25 events that are referenced but don't exist

## Script Details

### Files Processed

The analyzer reads:
- `events/events_war_military.js` (29 events)
- `events/events_energy_pipeline.js` (12 events)
- `events/events_sanctions_international.js` (11 events)
- `events/events_succession_power.js` (13 events)
- `events/events_social_movements.js` (11 events)
- `events/events_domestic_crisis.js` (11 events)
- `events/events_misc.js` (67 events)

### Output Files

- `EVENT_ANALYSIS.md` - Detailed markdown report (for humans)
- `event-tree.json` - JSON data (for the debug viewer)

### Performance

The analyzer processes all 154 events in under 1 second.

## Future Enhancements

Planned features:
- [ ] Circular dependency detection
- [ ] Storyline completion path analysis
- [ ] Event weight distribution analysis
- [ ] Unreachable event detection (events with impossible conditions)
- [ ] Duplicate event detection
- [ ] Balance analysis (effects on game metrics)
- [ ] Play simulation to find problematic event sequences

## Troubleshooting

### "Cannot find module" error

Make sure you're running from the project root:
```bash
cd /path/to/The-oligarchs-gambit
node analyze-events.js
```

### "Event tree not loading in browser"

1. Make sure `event-tree.json` exists in the project root
2. Hard refresh the browser (Ctrl+F5 or Cmd+Shift+R)
3. Check browser console for errors

### Script reports wrong event count

Make sure all event files are:
1. Saved with your latest changes
2. Listed in the `EVENT_FILES` array in `analyze-events.js`
3. Properly formatted JavaScript arrays

## Contributing

When adding new events:

1. Add them to the appropriate category file in `events/`
2. Run `node analyze-events.js` to verify no warnings
3. Check the branching ratio improves
4. Review `EVENT_ANALYSIS.md` to see how your events fit into the tree
5. Test in the game debug viewer

Remember: **Every 2-3 dead end events should introduce at least 1 branching event!**
