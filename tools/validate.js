#!/usr/bin/env node

/**
 * Event Validator
 * 
 * Validates all events against schema and checks for common issues
 */

const path = require('path');
const { validateAllEvents } = require('../events/schema');

/**
 * Loads all events from the events index
 */
function loadAllEvents() {
    try {
        const events = require('../events/index');
        return events;
    } catch (error) {
        console.error('Error loading events:', error.message);
        return [];
    }
}

/**
 * Main validation function
 */
function main() {
    console.log('╔════════════════════════════════════════╗');
    console.log('║         Event Validator                ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('📂 Loading events...\n');
    const events = loadAllEvents();
    console.log(`   Loaded ${events.length} events\n`);

    if (events.length === 0) {
        console.log('⚠️  No events found. Add events to events/index.js\n');
        process.exit(0);
    }

    console.log('🔍 Validating events...\n');
    const result = validateAllEvents(events);

    // Report errors
    if (result.errors.length > 0) {
        console.log('❌ ERRORS:\n');
        result.errors.forEach(error => {
            console.log(`   • ${error}`);
        });
        console.log('');
    }

    // Report warnings
    if (result.warnings.length > 0) {
        console.log('⚠️  WARNINGS:\n');
        result.warnings.forEach(warning => {
            console.log(`   • ${warning}`);
        });
        console.log('');
    }

    // Summary
    if (result.valid && result.warnings.length === 0) {
        console.log('✅ All events are valid!\n');
        process.exit(0);
    } else if (result.valid) {
        console.log('✅ Events are valid, but there are warnings.\n');
        process.exit(0);
    } else {
        console.log('❌ Validation failed. Please fix errors above.\n');
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { loadAllEvents };
