
import ALL_EVENTS from '../events/index.js';

function checkMetadata() {
    const events = ALL_EVENTS;
    let missing = 0;

    console.log("Checking metadata for " + events.length + " events...");

    events.forEach(event => {
        if (!event.meta) {
            console.error(`❌ Event '${event.id}' is missing 'meta' property.`);
            missing++;
            return;
        }

        const { depth, impact, sentiment } = event.meta;
        if (depth === undefined) {
            console.error(`❌ Event '${event.id}' is missing 'meta.depth'.`);
            missing++;
        }
        if (impact === undefined) {
            console.error(`❌ Event '${event.id}' is missing 'meta.impact'.`);
            missing++;
        }
        if (sentiment === undefined) {
            console.error(`❌ Event '${event.id}' is missing 'meta.sentiment'.`);
            missing++;
        }
    });

    if (missing === 0) {
        console.log("✅ All events have complete metadata!");
    } else {
        console.log(`⚠️  Found ${missing} events with missing metadata.`);
        process.exit(1);
    }
}

checkMetadata();
