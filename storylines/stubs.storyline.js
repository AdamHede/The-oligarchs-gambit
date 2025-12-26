import { defineStoryline, event, choice } from '../engine/storyline-dsl.js';

/**
 * Stubs for missing events to prevent game stalls and validation errors.
 */
const stubsStoryline = defineStoryline({
    id: 'stubs',
    name: 'Stubs',
    description: 'Stub events for missing references',
    tree: [
        event("attacking_the_widow", { title: "Attacking the Widow", description: "The campaign against Katya Volgin begins. It's dirty work.", choices: [choice("Continue", {})] }),
        event("back_channel_negotiations", { title: "Back Channel Negotiations", description: "Secret talks are underway.", choices: [choice("Continue", {})] }),
        event("betrayed_negotiation", { title: "Betrayed Negotiation", description: "The talks were a trap.", choices: [choice("Continue", {})] }),
        event("blackmail_negotiation", { title: "Blackmail Negotiation", description: "You present the evidence. He has a choice.", choices: [choice("Continue", {})] }),
        event("bluff_called_outcome", { title: "Bluff Called", description: "You called his bluff. Now we see who was lying.", choices: [choice("Continue", {})] }),
        event("broken_confession", { title: "The Broken Confession", description: "He confesses on camera. His supporters are devastated.", choices: [choice("Continue", {})] }),
        event("children_threatened_outcome", { title: "Family Pressure", description: "The threats against the family have an effect.", choices: [choice("Continue", {})] }),
        event("church_demands_more", { title: "The Church Demands More", description: "The Patriarch is never satisfied.", choices: [choice("Continue", {})] }),
        event("church_demands_more_enforcement", { title: "More Enforcement", description: "The Church wants stricter adherence to moral laws.", choices: [choice("Continue", {})] }),
        event("church_disappointed_laws", { title: "Church Disappointed", description: "The Church is unhappy with the new laws.", choices: [choice("Continue", {})] }),
        event("church_disappointed_money", { title: "Church Disappointed", description: "The Church expected more funding.", choices: [choice("Continue", {})] }),
        event("church_vs_state_tension", { title: "Church-State Tension", description: "The alliance is showing signs of strain.", choices: [choice("Continue", {})] }),
        event("confrontation_meeting", { title: "The Confrontation", description: "A tense meeting with your rivals.", choices: [choice("Continue", {})] }),
        event("cooptation_attempt_outcome", { title: "Co-optation Outcome", description: "The attempt to bring him into the fold has results.", choices: [choice("Continue", {})] }),
        event("cover_holds_barely", { title: "The Cover-up", description: "The official story is holding, but only just.", choices: [choice("Continue", {})] }),
        event("crackdown_aftermath", { title: "Crackdown Aftermath", description: "The streets are quiet after the arrests.", choices: [choice("Continue", {})] }),
        event("criticism_escalates", { title: "Criticism Escalates", description: "The public voices are getting louder.", choices: [choice("Continue", {})] }),
        event("delayed_arrest", { title: "The Delayed Arrest", description: "You finally move in for the arrest.", choices: [choice("Continue", {})] }),
        event("desperate_elimination_attempt", { title: "Desperate Measures", description: "A high-risk attempt to solve the problem permanently.", choices: [choice("Continue", {})] }),
        event("escalating_sanctions_war", { title: "Sanctions War", description: "The economic conflict escalates.", choices: [choice("Continue", {})] }),
        event("fabricated_scandal_outcome", { title: "Scandal Outcome", description: "The fabricated evidence has been released.", choices: [choice("Continue", {})] }),
        event("foreign_hit_attempt", { title: "The Foreign Operation", description: "An operation on foreign soil. Very risky.", choices: [choice("Continue", {})] }),
        event("fsb_morale_crisis", { title: "FSB Morale Crisis", description: "The security services are unhappy with recent events.", choices: [choice("Continue", {})] }),
        event("harassment_backfires", { title: "Harassment Backfires", description: "The attempt to disrupt him only made him more popular.", choices: [choice("Continue", {})] }),
        event("heroic_arrest", { title: "The Heroic Arrest", description: "His arrest makes him a martyr.", choices: [choice("Continue", {})] }),
        event("hunger_strike_narrative", { title: "The Hunger Strike", description: "The prisoner refuses food. The world watches.", choices: [choice("Continue", {})] }),
        event("limited_alliance", { title: "Limited Alliance", description: "A temporary and fragile agreement.", choices: [choice("Continue", {})] }),
        event("massacre_aftermath", { title: "Massacre Aftermath", description: "A dark day in history. The cost is high.", choices: [choice("Continue", {})] }),
        event("modest_cathedral_built", { title: "The Modest Cathedral", description: "The project is finished, but it's not the grand monument some wanted.", choices: [choice("Continue", {})] }),
        event("movement_continues_without_him", { title: "The Movement Continues", description: "Even without the leader, the protests don't stop.", choices: [choice("Continue", {})] }),
        event("mutual_destruction_standoff", { title: "The Standoff", description: "Neither side can move without destroying the other.", choices: [choice("Continue", {})] }),
        event("negotiated_solution", { title: "The Compromise", description: "A deal has been reached, but at what cost?", choices: [choice("Continue", {})] }),
        event("partial_crackdown", { title: "Partial Crackdown", description: "A measured use of force.", choices: [choice("Continue", {})] }),
        event("patriarch_demands_renewed", { title: "Renewed Demands", description: "The Church returns with more requests.", choices: [choice("Continue", {})] }),
        event("patriarch_fights_back", { title: "The Patriarch Fights Back", description: "The Church is not easily marginalized.", choices: [choice("Continue", {})] }),
        event("patriarch_insulted_deeply", { title: "Patriarch Insulted", description: "The relationship with the Church is severely damaged.", choices: [choice("Continue", {})] }),
        event("preemptive_denial", { title: "Preemptive Denial", description: "You strike first with the official narrative.", choices: [choice("Continue", {})] }),
        event("prison_beating_story", { title: "The Prison Incident", description: "A tragic accident in custody.", choices: [choice("Continue", {})] }),
        event("prison_years_begin", { title: "The Sentence Begins", description: "He is sent away for a long time.", choices: [choice("Continue", {})] }),
        event("prison_years_long", { title: "Years in Prison", description: "The long years in custody continue.", choices: [choice("Continue", {})] }),
        event("renegotiation_attempt", { title: "Renegotiation", description: "Trying to change the terms of the deal.", choices: [choice("Continue", {})] }),
        event("scandal_release_outcome", { title: "Scandal Outcome", description: "The evidence has been released to the public.", choices: [choice("Continue", {})] }),
        event("second_attempt_fails_catastrophically", { title: "Catastrophic Failure", description: "The second attempt failed in the worst possible way.", choices: [choice("Continue", {})] }),
        event("second_attempt_succeeds", { title: "Second Attempt Success", description: "This time, the operation was successful.", choices: [choice("Continue", {})] }),
        event("selective_persecution", { title: "Selective Persecution", description: "Targeting specific enemies of the Church.", choices: [choice("Continue", {})] }),
        event("trial_drags_on", { title: "The Trial Drags On", description: "Months of legal battles in the public eye.", choices: [choice("Continue", {})] })
    ]
});

export default stubsStoryline;

