# Events Directory - v1.3

This directory contains all game events organized into thematic categories for easier management and development.

## Event Files

### War & Military Operations (29 events)
**File:** `events_war_military.js`

Contains two major storylines:
- **Invasion War**: Special military operation, mobilization, war crimes, various endings
- **Separatist War**: Breakaway province, urban warfare, insurgency, negotiated outcomes

### Energy & Pipeline Politics (12 events)
**File:** `events_energy_pipeline.js`

Resource control and energy geopolitics:
- Pipeline deals and sabotage
- Gas leverage and European energy crisis
- OPEC+ meetings and strategic reserves
- Arctic oil discovery

### International Sanctions & Isolation (11 events)
**File:** `events_sanctions_international.js`

Economic warfare and international pressure:
- Asset freezes and secondary sanctions
- Brain drain and import substitution
- Financial system crisis
- Sanctions evasion and relief talks

### Succession & Power Struggles (13 events)
**File:** `events_succession_power.js`

Internal power dynamics and political survival:
- Succession questions and ambitious generals
- Coup attempts and assassination plots
- Tandem rule and power vacuum scenarios
- Civil war threats

### Student & Social Movements (11 events)
**File:** `events_social_movements.js`

Popular resistance and protest movements:
- Student protests and university occupations
- Viral social media moments
- General strikes and color revolutions
- Movement fragmentation

### Domestic Crisis & Institutional Breakdown (11 events)
**File:** `events_domestic_crisis.js`

Internal system failures:
- Economic collapse (ruble, pensions, inflation)
- Healthcare and population decline
- Labor strikes and prison riots
- Ethnic tensions

### Miscellaneous Events (66 events)
**File:** `events_misc.js`

Various standalone events:
- Corruption and oligarch interactions
- Propaganda and media control
- Technology and surveillance
- Cultural and prestige projects
- Constitutional reforms
- Diplomatic incidents

## Total: 153 Events

## How It Works

All event files are loaded via script tags in `index.html` before the main `events.js` file. The main `events.js` file combines all event arrays using the spread operator:

```javascript
const EVENTS = [
    ...WAR_MILITARY_EVENTS,
    ...ENERGY_PIPELINE_EVENTS,
    ...SANCTIONS_INTERNATIONAL_EVENTS,
    ...SUCCESSION_POWER_EVENTS,
    ...SOCIAL_MOVEMENTS_EVENTS,
    ...DOMESTIC_CRISIS_EVENTS,
    ...MISC_EVENTS
];
```

## Event Structure

Each event follows this structure:
```javascript
{
    id: "unique_event_id",
    title: "Event Title",
    description: "Event description text",
    onceOnly: true/false,  // Whether event can trigger multiple times
    weight: number,        // Probability weight for selection
    conditions: {},        // Requirements for event to appear
    storyline: "string",   // Optional storyline tag
    choices: [
        {
            text: "Choice text",
            effects: { /* stat changes */ },
            legacy: { /* legacy achievement */ },
            eventTriggers: [ /* IDs of events to add to pool */ ]
        }
    ]
}
```

## Adding New Events

1. Determine which category file the event belongs to
2. Add the event object to the appropriate array
3. Ensure the event has a unique ID
4. Update the event count in the file header comment
5. Update this README if adding a new category

## Version History

- **v1.3**: Split events into organized category files (153 events)
