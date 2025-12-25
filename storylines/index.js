/**
 * Storylines Index - Import and Export All Storylines
 * 
 * This file imports all storyline definitions and exports them for use by the game engine.
 */

// ================================================================
// Import Storylines
// ================================================================

import commonStoryline from './common.storyline.js';
import earlyGameAgendaStoryline from './early-game-agenda.storyline.js';
import specialOperationStoryline from './special-operation.storyline.js';
import dissidentStoryline from './dissident.storyline.js';
import holyAllianceStoryline from './holy-alliance.storyline.js';
import stubsStoryline from './stubs.storyline.js';

// Dacha Summit Storylines (interconnected)
import goldenCircleStoryline from './golden-circle.storyline.js';
import successionStoryline from './succession.storyline.js';
import loyaltyApparatusStoryline from './loyalty-apparatus.storyline.js';

// Economic Vision Storylines (nested/convergent)
import economicVisionStoryline from './economic-vision.storyline.js';

// ================================================================
// Export Individual Storylines (for selective imports)
// ================================================================

export {
    commonStoryline,
    earlyGameAgendaStoryline,
    specialOperationStoryline,
    dissidentStoryline,
    holyAllianceStoryline,
    stubsStoryline,
    // Dacha Summit Storylines
    goldenCircleStoryline,
    successionStoryline,
    loyaltyApparatusStoryline,
    // Economic Vision Storylines
    economicVisionStoryline
};

// ================================================================
// Export Array of All Storylines (for game initialization)
// ================================================================

export const allStorylines = [
    commonStoryline,
    earlyGameAgendaStoryline,
    specialOperationStoryline,
    dissidentStoryline,
    holyAllianceStoryline,
    stubsStoryline,
    // Dacha Summit Storylines
    goldenCircleStoryline,
    successionStoryline,
    loyaltyApparatusStoryline,
    // Economic Vision Storylines
    economicVisionStoryline
];

// ================================================================
// Export Storyline Metadata (for UI theming and behavior)
// ================================================================

export const storylineMetadata = {
    'common': {
        name: 'Common Events',
        description: 'Balance and pacing events that rotate through the deck',
        entryWeight: 10,  // Always present in some form
        theme: {
            borderColor: '#696969',  // Dim gray
            accentColor: '#A9A9A9'   // Dark gray
        }
    },
    
    'early-game-agenda': {
        name: 'Early Game Agenda',
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
    },
    
    // ================================================================
    // Dacha Summit Storylines (interconnected)
    // ================================================================
    
    'golden-circle': {
        name: 'The Golden Circle',
        description: 'Oligarch wealth, excess, and the price of greed',
        entryWeight: 0,  // Triggered by dacha summit
        theme: {
            borderColor: '#FFD700',  // Gold
            accentColor: '#DAA520'   // Goldenrod
        }
    },
    
    'succession': {
        name: 'The Succession Question',
        description: 'Dynasty, heirs, and the impossible question of who comes after',
        entryWeight: 0,  // Triggered by dacha summit
        theme: {
            borderColor: '#4B0082',  // Indigo
            accentColor: '#9932CC'   // Dark Orchid
        }
    },
    
    'loyalty-apparatus': {
        name: 'The Loyalty Apparatus',
        description: 'Paranoia, surveillance, and the price of trust',
        entryWeight: 0,  // Triggered by dacha summit
        theme: {
            borderColor: '#2F4F4F',  // Dark Slate Gray
            accentColor: '#778899'   // Light Slate Gray
        }
    },
    
    // ================================================================
    // Economic Vision Storylines (nested/convergent)
    // ================================================================
    
    'economic-vision': {
        name: 'The Economic Vision',
        description: 'Three paths to economic power, all leading to a reckoning',
        entryWeight: 0,  // Triggered by Five-Year Plan
        theme: {
            borderColor: '#4682B4',  // Steel Blue
            accentColor: '#B8860B'   // Dark Goldenrod
        }
    }
};

// ================================================================
// Default Export
// ================================================================

export default allStorylines;
