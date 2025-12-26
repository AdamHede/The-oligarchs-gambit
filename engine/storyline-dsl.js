/**
 * Storyline DSL - Define event chains as explicit tree structures
 *
 * This DSL makes event chains first-class citizens by allowing nested definitions
 * instead of fragile add:[] references.
 */

/**
 * Creates an event node in the storyline tree
 * @param {string} id - Unique event identifier
 * @param {Object} config - Event configuration
 * @returns {Object} Event node
 */
export function event(id, config) {
    return {
        _type: 'event',
        id,
        title: config.title,
        description: config.description,
        weight: config.weight ?? 0,
        recurring: config.recurring ?? false,
        rarity: config.rarity ?? 'common',
        image: config.image,
        conditions: config.conditions,
        meta: config.meta ?? {},
        choices: config.choices ?? [],
        // v2.1 properties
        timeGate: config.timeGate,
        onceOnly: config.onceOnly,
        narrativeVariations: config.narrativeVariations,
        characterId: config.characterId,
        weightModifiers: config.weightModifiers,
        // v2.2: Entity dependencies - event is auto-removed if any required entity dies/exits
        requires: config.requires ?? [],
        // v2.2: Force add to initial deck
        forceAddAtStart: config.forceAddAtStart ?? false,
        // For referencing shared events
        _isReference: false
    };
}

/**
 * Creates a reference to an existing event (for shared/common events)
 * @param {string} id - Event ID to reference
 * @returns {Object} Event reference
 */
export function eventRef(id) {
    return {
        _type: 'event_ref',
        id,
        _isReference: true
    };
}

/**
 * Creates a choice within an event
 * @param {string} text - Choice text shown to player
 * @param {Object} config - Choice configuration
 * @returns {Object} Choice node
 */
export function choice(text, config = {}) {
    return {
        _type: 'choice',
        text,
        effects: config.effects ?? {},
        legacy: config.legacy,
        // Nested events that become available when this choice is made (parallel - all will occur)
        unlocks: config.unlocks ?? [],
        // v2.2: Exclusive outcomes - only ONE will occur, drawing one removes siblings
        unlocksExclusive: config.unlocksExclusive ?? [],
        // Events that become permanently blocked when this choice is made
        terminates: config.terminates ?? [],
        // Whether to keep this event in deck (for recurring events)
        keepInDeck: config.keepInDeck ?? false,
        // Whether to add this event back to deck (for non-recurring events)
        addSelf: config.addSelf ?? false
    };
}

/**
 * Defines a complete storyline with its event tree
 * @param {Object} config - Storyline configuration
 * @returns {Object} Compiled storyline
 */
export function defineStoryline(config) {
    const storyline = {
        id: config.id,
        name: config.name,
        description: config.description,
        theme: config.theme,
        // The root event(s) that start this storyline
        entryPoints: [],
        // Flat map of all events for quick lookup
        events: {},
        // Tree structure preserving parent-child relationships
        tree: {},
        // Original tree definition for reference
        _rawTree: config.tree
    };

    // Process the tree to extract events and build relationships
    if (config.tree) {
        const trees = Array.isArray(config.tree) ? config.tree : [config.tree];
        trees.forEach(rootEvent => {
            processEventNode(rootEvent, null, storyline);
            if (rootEvent.id) {
                storyline.entryPoints.push(rootEvent.id);
            }
        });
    }

    return storyline;
}

/**
 * Recursively processes event nodes to build flat event map and tree structure
 */
function processEventNode(node, parentChoiceInfo, storyline) {
    if (!node || node._isReference) {
        // Reference nodes are resolved later
        if (node && node._isReference) {
            if (parentChoiceInfo) {
                // Track that this choice unlocks a referenced event
                const { parentEventId, choiceIndex } = parentChoiceInfo;
                if (!storyline.tree[parentEventId]) {
                    storyline.tree[parentEventId] = { children: {}, terminates: {} };
                }
                if (!storyline.tree[parentEventId].children[choiceIndex]) {
                    storyline.tree[parentEventId].children[choiceIndex] = [];
                }
                storyline.tree[parentEventId].children[choiceIndex].push(node.id);
            }
        }
        return;
    }

    const eventId = node.id;

    // Build the flat event object (compatible with existing system)
    const flatEvent = {
        id: eventId,
        title: node.title,
        description: node.description,
        weight: node.weight ?? 0,
        recurring: node.recurring ?? false,
        rarity: node.rarity ?? 'common',
        storyline: storyline.id,
        image: node.image,
        conditions: node.conditions,
        meta: node.meta ?? {},
        choices: [],
        // v2.1 properties
        timeGate: node.timeGate,
        onceOnly: node.onceOnly,
        narrativeVariations: node.narrativeVariations,
        characterId: node.characterId,
        weightModifiers: node.weightModifiers,
        // v2.2 properties
        requires: node.requires ?? [],
        forceAddAtStart: node.forceAddAtStart ?? false
    };

    // Track tree relationships
    if (!storyline.tree[eventId]) {
        storyline.tree[eventId] = { children: {}, terminates: {} };
    }

    // Process choices
    if (node.choices) {
        node.choices.forEach((choiceNode, choiceIndex) => {
            const flatChoice = {
                text: choiceNode.text,
                effects: choiceNode.effects ?? {},
                legacy: choiceNode.legacy,
                // We'll compute add/remove from unlocks/terminates
                add: [],
                remove: [],
                // v2.2: Track exclusive groups for this choice
                exclusiveGroups: []
            };

            // Track unlocks in tree structure
            storyline.tree[eventId].children[choiceIndex] = [];
            storyline.tree[eventId].terminates[choiceIndex] = choiceNode.terminates ?? [];

            // Process nested unlocks (parallel - all will eventually occur)
            if (choiceNode.unlocks) {
                choiceNode.unlocks.forEach(childNode => {
                    if (childNode._isReference) {
                        // Reference to shared event
                        flatChoice.add.push(childNode.id);
                        storyline.tree[eventId].children[choiceIndex].push(childNode.id);
                    } else if (childNode.id) {
                        // Nested event definition
                        flatChoice.add.push(childNode.id);
                        storyline.tree[eventId].children[choiceIndex].push(childNode.id);
                        // Recursively process child
                        processEventNode(childNode, { parentEventId: eventId, choiceIndex }, storyline);
                    }
                });
            }

            // v2.2: Process exclusive unlocks (mutually exclusive - only one will occur)
            if (choiceNode.unlocksExclusive && choiceNode.unlocksExclusive.length > 0) {
                const exclusiveGroupIds = [];
                
                choiceNode.unlocksExclusive.forEach(childNode => {
                    if (childNode._isReference) {
                        flatChoice.add.push(childNode.id);
                        storyline.tree[eventId].children[choiceIndex].push(childNode.id);
                        exclusiveGroupIds.push(childNode.id);
                    } else if (childNode.id) {
                        flatChoice.add.push(childNode.id);
                        storyline.tree[eventId].children[choiceIndex].push(childNode.id);
                        exclusiveGroupIds.push(childNode.id);
                        // Recursively process child
                        processEventNode(childNode, { parentEventId: eventId, choiceIndex }, storyline);
                    }
                });
                
                // Store the exclusive group for engine registration
                if (exclusiveGroupIds.length > 1) {
                    flatChoice.exclusiveGroups.push(exclusiveGroupIds);
                }
            }

            // Process terminates
            if (choiceNode.terminates) {
                flatChoice.remove = [...choiceNode.terminates];
            }

            // Handle recurring events and addSelf
            if (!node.recurring && !choiceNode.keepInDeck) {
                flatChoice.removeSelf = true;
            }
            
            // v2.1: Support addSelf for non-recurring events that should occasionally reappear
            if (choiceNode.addSelf !== undefined) {
                flatChoice.addSelf = choiceNode.addSelf;
            }

            flatEvent.choices.push(flatChoice);
        });
    }

    // Add to flat event map
    storyline.events[eventId] = flatEvent;

    // Track parent relationship
    if (parentChoiceInfo) {
        const { parentEventId, choiceIndex } = parentChoiceInfo;
        if (!storyline.tree[parentEventId]) {
            storyline.tree[parentEventId] = { children: {}, terminates: {} };
        }
        if (!storyline.tree[parentEventId].children[choiceIndex]) {
            storyline.tree[parentEventId].children[choiceIndex] = [];
        }
        // Already added above, but ensure it's there
        if (!storyline.tree[parentEventId].children[choiceIndex].includes(eventId)) {
            storyline.tree[parentEventId].children[choiceIndex].push(eventId);
        }
    }
}

/**
 * Compiles multiple storylines into a combined event registry
 * @param {Object[]} storylines - Array of storyline definitions
 * @returns {Object} Combined registry with all events and tree info
 */
export function compileStorylines(storylines) {
    const registry = {
        storylines: {},
        events: {},
        globalTree: {},
        entryPoints: [],
        // v2.2: Map of eventId -> array of sibling event IDs in same exclusive group
        exclusiveGroups: {},
        // v2.2: Map of entityId -> array of event IDs that require this entity
        entityDependencies: {}
    };

    storylines.forEach(storyline => {
        registry.storylines[storyline.id] = storyline;

        // Merge events
        Object.assign(registry.events, storyline.events);

        // Merge tree structure
        Object.assign(registry.globalTree, storyline.tree);

        // Collect entry points
        registry.entryPoints.push(...storyline.entryPoints);
    });

    // v2.2: Build exclusive groups from choice data
    for (const event of Object.values(registry.events)) {
        if (event.choices) {
            event.choices.forEach(choice => {
                if (choice.exclusiveGroups) {
                    choice.exclusiveGroups.forEach(group => {
                        // For each event in the group, map it to its siblings
                        group.forEach(eventId => {
                            const siblings = group.filter(id => id !== eventId);
                            if (!registry.exclusiveGroups[eventId]) {
                                registry.exclusiveGroups[eventId] = [];
                            }
                            // Add siblings (avoiding duplicates)
                            siblings.forEach(siblingId => {
                                if (!registry.exclusiveGroups[eventId].includes(siblingId)) {
                                    registry.exclusiveGroups[eventId].push(siblingId);
                                }
                            });
                        });
                    });
                }
            });
        }
        
        // v2.2: Build entity dependencies
        if (event.requires && event.requires.length > 0) {
            event.requires.forEach(entityId => {
                if (!registry.entityDependencies[entityId]) {
                    registry.entityDependencies[entityId] = [];
                }
                if (!registry.entityDependencies[entityId].includes(event.id)) {
                    registry.entityDependencies[entityId].push(event.id);
                }
            });
        }
    }

    return registry;
}

/**
 * Gets all events as a flat array (for compatibility with existing engine)
 * @param {Object} registry - Compiled registry
 * @returns {Object[]} Array of event objects
 */
export function getEventsArray(registry) {
    return Object.values(registry.events);
}

/**
 * Visualizes the storyline tree as a string (for debugging)
 * @param {Object} storyline - Storyline definition
 * @returns {string} Tree visualization
 */
export function visualizeTree(storyline) {
    const lines = [];
    lines.push(`=== ${storyline.name || storyline.id} ===`);

    function printNode(eventId, indent = 0) {
        const event = storyline.events[eventId];
        if (!event) {
            lines.push('  '.repeat(indent) + `[ref: ${eventId}]`);
            return;
        }

        lines.push('  '.repeat(indent) + `📌 ${event.title} (${eventId})`);

        const treeInfo = storyline.tree[eventId];
        if (treeInfo && event.choices) {
            event.choices.forEach((choice, idx) => {
                const children = treeInfo.children[idx] || [];
                const terminates = treeInfo.terminates[idx] || [];

                lines.push('  '.repeat(indent + 1) + `→ "${choice.text}"`);

                if (terminates.length > 0) {
                    lines.push('  '.repeat(indent + 2) + `✖ blocks: ${terminates.join(', ')}`);
                }

                children.forEach(childId => {
                    printNode(childId, indent + 2);
                });
            });
        }
    }

    storyline.entryPoints.forEach(entryId => {
        printNode(entryId);
    });

    return lines.join('\n');
}
