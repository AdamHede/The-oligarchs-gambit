/**
 * Storylines Index
 *
 * Central registry of all storyline definitions.
 * Import this to get all storylines for the game.
 */

// New tree-based storylines
import warInvasion from './war-invasion.storyline.js';
import common from './common.storyline.js';

// Export individual storylines for selective use
export { warInvasion, common };

// Export all storylines as array for easy initialization
export const allStorylines = [
    warInvasion,
    common
];

// Export storyline metadata
export const storylineMetadata = {
    'war-invasion': {
        name: 'War of Expansion',
        description: 'A 72-hour operation that goes horribly wrong',
        entryWeight: 10,
        theme: { borderColor: '#8B0000', accentColor: '#DC143C' }
    },
    'common': {
        name: 'Common Events',
        description: 'Background events and pacing',
        entryWeight: 5,
        theme: { borderColor: '#555', accentColor: '#888' }
    }
};

export default allStorylines;
