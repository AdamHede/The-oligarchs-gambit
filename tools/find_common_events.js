
import { loadAllEvents } from './validate.js';

const events = loadAllEvents();

const CURRENT_LOOP = [
    "tax_haven_crackdown",
    "brain_drain",
    "university_protests",
    "arms_deal_opportunity",
    "infrastructure_project"
];

console.log('--- Candidate Events for Recurring Pool ---');
const candidates = events.filter(e =>
    (e.rarity === 'common' || e.rarity === 'rare') &&
    !CURRENT_LOOP.includes(e.id) &&
    e.id !== 'quiet_quarter' &&
    e.weight > 0
);

candidates.forEach(e => {
    console.log(`[${e.rarity}] ${e.id}: ${e.title}`);
});
