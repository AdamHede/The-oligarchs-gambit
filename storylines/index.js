/**
 * Storylines Index - Import and Export All Storylines
 * 
 * This file imports all storyline definitions and exports them for use by the game engine.
 */

// ================================================================
// Import Storylines
// ================================================================

import commonEventsStoryline from './common-events.storyline.js';
import earlyEventsStoryline from './early-events.storyline.js';
import specialOperationStoryline from './special-operation.storyline.js';
import dissidentStoryline from './dissident.storyline.js';
import holyAllianceStoryline from './holy-alliance.storyline.js';

// ================================================================
// Export Individual Storylines (for selective imports)
// ================================================================

export {
    commonEventsStoryline,
    earlyEventsStoryline,
    specialOperationStoryline,
    dissidentStoryline,
    holyAllianceStoryline
};

// ================================================================
// Export Array of All Storylines (for game initialization)
// ================================================================

export const allStorylines = [
    commonEventsStoryline,
    earlyEventsStoryline,
    specialOperationStoryline,
    dissidentStoryline,
    holyAllianceStoryline
];

// ================================================================
// Export Storyline Metadata (for UI theming and behavior)
// ================================================================

export const storylineMetadata = {
    'common-events': {
        name: 'Common Events',
        description: 'Balance and pacing events that rotate through the deck',
        entryWeight: 10,  // Always present in some form
        theme: {
            borderColor: '#696969',  // Dim gray
            accentColor: '#A9A9A9'   // Dark gray
        }
    },
    
    'early-events': {
        name: 'Early Events',
        description: 'Year 1 agenda-setting moments',
        entryWeight: 0,  // Forced, not random
        theme: {
            borderColor: '#FFD700',  // Gold
            accentColor: '#FFA500'   // Orange
        }
    },
    
    'special-operation': {
        name: 'The Special Operation',
        description: 'War, hubris, and impossible choices',
        entryWeight: 0,  // Triggered by inaugural address
        theme: {
            borderColor: '#8B0000',  // Dark red
            accentColor: '#FF4444'   // Bright red
        }
    },
    
    'dissident': {
        name: 'The Dissident',
        description: 'One man vs the state - repression and its costs',
        entryWeight: 0,  // Triggered by inaugural address
        theme: {
            borderColor: '#2F4F4F',  // Dark slate gray
            accentColor: '#778899'   // Light slate gray
        }
    },
    
    'holy-alliance': {
        name: 'The Holy Alliance',
        description: 'Church-state bargain, moral crusade, cynical power',
        entryWeight: 0,  // Triggered by inaugural address
        theme: {
            borderColor: '#8B4513',  // Saddle brown
            accentColor: '#DAA520'   // Goldenrod
        }
    }
};

// ================================================================
// Default Export
// ================================================================

export default allStorylines;
