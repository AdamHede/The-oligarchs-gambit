/**
 * Common Events - Rotating Balance Pool
 * 
 * These events provide pacing and balance between major storyline moments.
 * 
 * MECHANIC: Always exactly 1 common event in the deck at any time.
 * When a common event is drawn and resolved, it's removed and a different
 * random common event is added.
 * 
 * Implementation: Each choice adds a random common event back via special logic
 */

import { defineStoryline, event, choice } from '../engine/storyline-dsl.js';

// Helper: Returns a random common event ID excluding the current one
function getRandomCommonEvent(excludeId) {
    const commonEvents = ['quiet_quarter', 'weekly_envelope', 'dacha_whispers', 'bread_prices'];
    const available = commonEvents.filter(id => id !== excludeId);
    return available[Math.floor(Math.random() * available.length)];
}

const commonEventsStoryline = defineStoryline({
    id: 'common-events',
    name: 'Common Events',
    description: 'Rotating pool of balance events',
    
    tree: [
        // ================================================================
        // QUIET QUARTER
        // ================================================================
        event("quiet_quarter", {
            title: "A Quiet Quarter",
            description: "For once, no crises demand your attention. Your advisors report that things are... stable. A rare moment. The Finance Minister suggests you could skim some funds. Your PR team says you could invest in goodwill. Or you could simply rest.",
            weight: 5,
            recurring: false,  // Manually managed via add/remove
            storylines: ['common-events'],
            
            choices: [
                choice("Skim 3 billion from infrastructure projects.", {
                    effects: {
                        stats: {
                            personalWealth: 3,
                            treasury: -30,
                            elite: 2  // They respect the hustle
                        }
                    },
                    unlocks: [
                        // Add a different random common event back
                        // Note: This is a placeholder - the actual implementation will need
                        // game engine support for dynamic event addition
                    ],
                    terminates: ['quiet_quarter']
                }),
                
                choice("Invest 5 billion in visible infrastructure. Good PR.", {
                    effects: {
                        stats: {
                            personalWealth: -2,
                            treasury: -50,
                            anger: -8,
                            elite: -3  // They think you're soft
                        }
                    },
                    terminates: ['quiet_quarter']
                }),
                
                choice("Take a vacation. Do nothing.", {
                    effects: {
                        stats: {
                            anger: -3  // People like when you're not causing problems
                        }
                    },
                    terminates: ['quiet_quarter']
                })
            ]
        }),
        
        // ================================================================
        // THE WEEKLY ENVELOPE
        // ================================================================
        event("weekly_envelope", {
            title: "The Weekly Envelope",
            description: "Your Finance Minister's assistant delivers the usual envelope. Your cut from this week's state contracts - oil, gas, defense, construction. It's become routine. The question is always the same: how much?",
            weight: 5,
            recurring: false,
            storylines: ['common-events'],
            
            choices: [
                choice("The usual 2 billion. Reliable, sustainable.", {
                    effects: {
                        stats: {
                            personalWealth: 2,
                            treasury: -20
                        }
                    },
                    terminates: ['weekly_envelope']
                }),
                
                choice("Make it 5 billion this week. Why not?", {
                    effects: {
                        stats: {
                            personalWealth: 5,
                            treasury: -50,
                            elite: -5,  // Other oligarchs notice
                            anger: 3    // Someone always leaks
                        }
                    },
                    terminates: ['weekly_envelope']
                }),
                
                choice("Refuse it. Clean hands, this week at least.", {
                    effects: {
                        stats: {
                            elite: 8,   // They respect the restraint
                            anger: -5   // Good PR somehow leaks
                        }
                    },
                    terminates: ['weekly_envelope']
                })
            ]
        }),
        
        // ================================================================
        // WHISPERS AT THE DACHA
        // ================================================================
        event("dacha_whispers", {
            title: "Whispers at the Dacha",
            description: "Your Chief of Staff mentions that the oligarchs have been meeting at their dachas. Nothing formal, just... talking. About what? He doesn't know. Should you be concerned?",
            weight: 5,
            recurring: false,
            storylines: ['common-events'],
            
            choices: [
                choice("Throw a lavish party. Remind them who's boss.", {
                    effects: {
                        stats: {
                            personalWealth: -1,
                            treasury: -40,
                            elite: 12,
                            anger: 5  // Party photos leak, bread lines visible
                        },
                        legacy: {
                            icon: "🍾",
                            name: "Party Thrower",
                            weight: -2
                        }
                    },
                    terminates: ['dacha_whispers']
                }),
                
                choice("Have the FSB investigate. Who's saying what?", {
                    effects: {
                        stats: {
                            elite: -8,  // They know you're spying
                            anger: 2    // Paranoia spreads
                        },
                        flags: {
                            "spied_on_oligarchs": true
                        }
                    },
                    terminates: ['dacha_whispers']
                }),
                
                choice("Ignore it. Oligarchs always mutter.", {
                    effects: {
                        stats: {
                            elite: -3  // They think you're not paying attention
                        }
                    },
                    terminates: ['dacha_whispers']
                })
            ]
        }),
        
        // ================================================================
        // THE PRICE OF BREAD
        // ================================================================
        event("bread_prices", {
            title: "The Price of Bread",
            description: "Inflation has hit. A loaf of bread costs twice what it did last quarter. Pensioners are furious. Your PR chief shows you footage of babushkas yelling at empty shelves. They vote, by the way. Well, sort of.",
            weight: 5,
            recurring: false,
            storylines: ['common-events'],
            
            choices: [
                choice("Subsidize bread. Cost: 60 billion.", {
                    effects: {
                        stats: {
                            treasury: -60,
                            anger: -12,
                            elite: -4  // Oligarchs think you're populist
                        }
                    },
                    terminates: ['bread_prices']
                }),
                
                choice("Blame Western sanctions. Run a propaganda blitz.", {
                    effects: {
                        stats: {
                            treasury: -15,  // Propaganda costs
                            anger: -5,      // Only partially works
                            elite: 3        // They like the narrative
                        },
                        flags: {
                            "blamed_west_for_inflation": true
                        }
                    },
                    terminates: ['bread_prices']
                }),
                
                choice("Do nothing. The market will adjust.", {
                    effects: {
                        stats: {
                            anger: 8,
                            elite: 5  // Oligarchs profit from inflation
                        }
                    },
                    terminates: ['bread_prices']
                })
            ]
        })
    ]
});

export default commonEventsStoryline;

