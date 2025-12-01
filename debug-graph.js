/**
 * Debug Graph Visualizer
 * 
 * Interactive graph visualization with real-time state highlighting
 */

import { buildGraphData } from './graph-builder.js';

export class DebugGraph {
    constructor(containerId, engine, allEvents) {
        this.engine = engine;
        this.allEvents = allEvents;
        this.container = document.getElementById(containerId);
        this.cy = null;
        this.currentEventId = null;
        this.completedEventIds = new Set();
        
        this.init();
    }

    init() {
        if (!this.container) {
            console.error('Graph container not found');
            return;
        }

        if (typeof cytoscape === 'undefined') {
            console.error('Cytoscape.js not loaded');
            return;
        }

        const graphData = buildGraphData(this.allEvents);
            
            // Initialize Cytoscape
            this.cy = cytoscape({
                container: this.container,
                elements: graphData,
                style: [
                    {
                        selector: 'node',
                        style: {
                            'label': 'data(label)',
                            'width': 80,
                            'height': 80,
                            'shape': 'round-rectangle',
                            'background-color': '#2a2a2a',
                            'border-width': 2,
                            'border-color': '#555',
                            'color': '#e8e8e8',
                            'text-valign': 'center',
                            'text-halign': 'center',
                            'font-size': '10px',
                            'text-wrap': 'wrap',
                            'text-max-width': '70px',
                            'overlay-padding': '4px'
                        }
                    },
                    {
                        selector: 'edge',
                        style: {
                            'width': 2,
                            'line-color': '#666',
                            'target-arrow-color': '#666',
                            'target-arrow-shape': 'triangle',
                            'curve-style': 'bezier',
                            'opacity': 0.6
                        }
                    },
                    {
                        selector: 'node.eligible',
                        style: {
                            'background-color': '#d4af37',
                            'border-color': '#f4d03f',
                            'border-width': 4,
                            'width': 100,
                            'height': 100,
                            'font-size': '11px',
                            'text-max-width': '90px'
                        }
                    },
                    {
                        selector: 'node.in-deck',
                        style: {
                            'background-color': '#aa8c2c',
                            'border-color': '#d4af37',
                            'border-width': 3,
                            'opacity': 0.8
                        }
                    },
                    {
                        selector: 'node.completed',
                        style: {
                            'background-color': '#444',
                            'border-color': '#666',
                            'opacity': 0.4,
                            'text-decoration': 'line-through'
                        }
                    },
                    {
                        selector: 'node.current',
                        style: {
                            'background-color': '#e74c3c',
                            'border-color': '#c0392b',
                            'border-width': 5,
                            'width': 120,
                            'height': 120,
                            'font-size': '12px',
                            'text-max-width': '110px',
                            'z-index': 999
                        }
                    },
                    {
                        selector: 'node.not-in-deck',
                        style: {
                            'opacity': 0.2,
                            'width': 60,
                            'height': 60,
                            'font-size': '8px'
                        }
                    },
                    {
                        selector: 'edge.highlight',
                        style: {
                            'line-color': '#d4af37',
                            'target-arrow-color': '#d4af37',
                            'width': 3,
                            'opacity': 1
                        }
                    }
                ],
                layout: {
                    name: 'cose',
                    idealEdgeLength: 100,
                    nodeOverlap: 20,
                    refresh: 20,
                    fit: true,
                    padding: 30,
                    randomize: false,
                    componentSpacing: 40,
                    nodeRepulsion: 4500,
                    edgeElasticity: 100,
                    nestingFactor: 5,
                    gravity: 0.25,
                    numIter: 2500,
                    initialTemp: 200,
                    coolingFactor: 0.95,
                    minTemp: 1.0
                }
            });
        
        // Add pulsing animation for eligible nodes
        this.addPulsingAnimation();
        
        // Initial highlight
        this.highlightActive();
    }

    addPulsingAnimation() {
        // Create CSS animation for pulsing effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse-gold {
                0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
                50% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
            }
            .cy-node.eligible {
                animation: pulse-gold 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    highlightActive() {
        if (!this.cy) return;

        const state = this.engine.getState();
        const deck = state.deck;
        const eligibleEvents = this.engine.getEligibleEvents();
        const eligibleIds = new Set(eligibleEvents.map(e => e.id));
        const deckIds = new Set(deck);
        const allEventIds = new Set(this.allEvents.map(e => e.id));

        // Get current event
        const currentEvent = this.engine.currentEvent;
        const currentId = currentEvent ? currentEvent.id : null;

        this.cy.nodes().forEach(node => {
            const id = node.id();
            
            // Remove all classes
            node.removeClass('eligible in-deck completed current not-in-deck');
            
            if (currentId && id === currentId) {
                node.addClass('current');
            } else if (eligibleIds.has(id)) {
                node.addClass('eligible');
            } else if (deckIds.has(id)) {
                node.addClass('in-deck');
            } else if (this.completedEventIds.has(id)) {
                node.addClass('completed');
            } else if (allEventIds.has(id)) {
                node.addClass('not-in-deck');
            }
        });

        // Highlight edges from current event
        if (currentId) {
            this.cy.edges().forEach(edge => {
                edge.removeClass('highlight');
                if (edge.source().id() === currentId) {
                    edge.addClass('highlight');
                }
            });
        }
    }

    setCurrentEvent(eventId) {
        this.currentEventId = eventId;
        this.highlightActive();
    }

    markCompleted(eventId) {
        this.completedEventIds.add(eventId);
        this.highlightActive();
    }

    fitView() {
        if (this.cy) {
            this.cy.fit();
        }
    }

    centerOnActive() {
        if (!this.cy) return;
        
        const state = this.engine.getState();
        const eligibleEvents = this.engine.getEligibleEvents();
        const currentEvent = this.engine.currentEvent;
        
        let targetId = null;
        if (currentEvent) {
            targetId = currentEvent.id;
        } else if (eligibleEvents.length > 0) {
            targetId = eligibleEvents[0].id;
        }
        
        if (targetId) {
            const node = this.cy.getElementById(targetId);
            if (node.length > 0) {
                this.cy.animate({
                    center: { eles: node },
                    zoom: 1.5
                }, {
                    duration: 500
                });
            }
        } else {
            this.fitView();
        }
    }

    update() {
        this.highlightActive();
    }
}

