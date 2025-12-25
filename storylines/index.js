/**
 * Storylines Index
 *
 * Central registry of all storyline definitions.
 * Import this to get all storylines for the game.
 */

// Tree-based storylines
import warInvasion from './war-invasion.storyline.js';
import sanctionsSpiral from './sanctions-spiral.storyline.js';
import shadowWar from './shadow-war.storyline.js';
import successionCrisis from './succession-crisis.storyline.js';
import religiousRevival from './religious-revival.storyline.js';
import energyPipeline from './energy-pipeline.storyline.js';
import popularUprising from './popular-uprising.storyline.js';
import domesticCrisis from './domestic-crisis.storyline.js';
import common from './common.storyline.js';

// Export individual storylines for selective use
export {
    warInvasion,
    sanctionsSpiral,
    shadowWar,
    successionCrisis,
    religiousRevival,
    energyPipeline,
    popularUprising,
    domesticCrisis,
    common
};

// Export all storylines as array for easy initialization
export const allStorylines = [
    warInvasion,
    sanctionsSpiral,
    shadowWar,
    successionCrisis,
    religiousRevival,
    energyPipeline,
    popularUprising,
    domesticCrisis,
    common
];

// Export storyline metadata for UI theming
export const storylineMetadata = {
    'war-invasion': {
        name: 'War of Expansion',
        description: 'A 72-hour operation that goes horribly wrong',
        entryWeight: 10,
        theme: { borderColor: '#8B0000', accentColor: '#DC143C' }
    },
    'sanctions-spiral': {
        name: 'Sanctions Spiral',
        description: 'Western sanctions tighten the noose on your economy',
        entryWeight: 0, // Triggered
        theme: { borderColor: '#1a472a', accentColor: '#2d5a3d' }
    },
    'shadow-war': {
        name: 'Shadow War',
        description: 'Covert operations and espionage that can spiral out of control',
        entryWeight: 10,
        theme: { borderColor: '#1a1a2e', accentColor: '#16213e' }
    },
    'succession-crisis': {
        name: 'Succession Crisis',
        description: 'Power struggles and questions about your grip on power',
        entryWeight: 8,
        theme: { borderColor: '#4a0e0e', accentColor: '#722f2f' }
    },
    'religious-revival': {
        name: 'Religious Revival',
        description: 'The Church becomes a tool of state power',
        entryWeight: 10,
        theme: { borderColor: '#614126', accentColor: '#8B6914' }
    },
    'energy-pipeline': {
        name: 'Energy Politics',
        description: 'Weaponizing energy resources for geopolitical gain',
        entryWeight: 8,
        theme: { borderColor: '#2d4a2d', accentColor: '#4a7c4a' }
    },
    'popular-uprising': {
        name: 'Popular Uprising',
        description: 'Mass movements threaten your grip on power',
        entryWeight: 8,
        theme: { borderColor: '#8B0000', accentColor: '#FF4500' }
    },
    'domestic-crisis': {
        name: 'Domestic Crisis',
        description: 'Economic collapse and infrastructure decay threaten stability',
        entryWeight: 8,
        theme: { borderColor: '#4a3728', accentColor: '#6b4423' }
    },
    'common': {
        name: 'Common Events',
        description: 'Background events and pacing',
        entryWeight: 5,
        theme: { borderColor: '#555', accentColor: '#888' }
    }
};

export default allStorylines;
