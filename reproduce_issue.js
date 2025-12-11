
import { GameEngineV2 } from './engine/game-engine.js';
import { MISC_EVENTS } from './events/events_misc.js';
import { BASIC_RECURRING_EVENTS } from './events/events_basic_recurring.js';

// Setup a minimal set of events
const allEvents = [...MISC_EVENTS, ...BASIC_RECURRING_EVENTS];

// Initialize game with a deck containing ONLY quiet_quarter
// We want to verify that playing quiet_quarter refills the deck
const initialState = {
    deck: ['quiet_quarter'],
    stats: {
        personalWealth: 50,
        treasury: 50,
        elite: 50,
        anger: 20
    }
};

console.log('--- Starting Reproduction Test ---');
const engine = new GameEngineV2(allEvents, initialState);

console.log('Initial Deck:', engine.state.deck);

// Draw the event (should be quiet_quarter)
const event = engine.drawNextEvent();
console.log('Drawn Event:', event ? event.id : 'null');

if (event && event.id === 'quiet_quarter') {
    console.log('Quiet Quarter drawn successfully.');

    // Find the choice that should refill the deck
    // In events_misc.js: "Continue business as usual" is index 0
    const choiceIndex = 0;
    const choice = event.choices[choiceIndex];
    console.log('Selected Choice:', choice.text);
    console.log('Choice Properties:', Object.keys(choice));

    // Make the choice
    const result = engine.makeChoice(choiceIndex);

    console.log('Deck after choice:', engine.state.deck);

    // Logic from events_misc.js: 
    // addToPool: ["tax_haven_crackdown", "brain_drain", "university_protests", "arms_deal_opportunity", "infrastructure_project"]
    // Since quiet_quarter is not recurring, it should be removed.
    // The new events should be added.

    const expectedEvents = ["tax_haven_crackdown", "brain_drain", "university_protests", "arms_deal_opportunity", "infrastructure_project"];
    const hasExpected = expectedEvents.some(id => engine.state.deck.includes(id));

    if (!hasExpected) {
        console.error('❌ FAILURE: Deck does NOT contain expected events. Refill failed.');
        console.error('Expected one of:', expectedEvents);
        console.error('Actual Deck:', engine.state.deck);
    } else {
        console.log('✅ SUCCESS: Deck successfully refilled.');
    }

} else {
    console.error('❌ FAILURE: Could not draw quiet_quarter as expected.');
}
