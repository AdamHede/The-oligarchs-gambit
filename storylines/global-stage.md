# The Global Stage

> **Storyline Type**: Large (L)  
> **Size**: ~43 events  
> **Depth**: 5  
> **Trigger**: Early Game Agenda → The Global Stage (forced Year 1 event)

---

## Overview

Your first major international appearance. The World Economic Forum in Davos. World leaders are watching. The currency is weakening, inflation is rising, and foreign powers are circling. You must declare your position on the global order: Are you with the West, with the East, or forging your own path?

This storyline explores the impossible geopolitics of a petro-state autocracy: needing foreign investment but resenting foreign interference, wanting respect but earning contempt, seeking independence while drowning in dependencies.

---

## Novel Structure: REACTIVE/ADVERSARIAL

Unlike other early-game storylines:
- **Dacha Summit**: Three storylines that INTERCONNECT (crossover events)
- **Inaugural Address**: Three storylines that are SEPARATE (no crossover)
- **Five-Year Plan**: Three storylines that CONVERGE (meet at shared reckoning)

**This event**: Three storylines that are REACTIVE - your choice determines each storyline's **role**:
- **ALLY** - The path you chose (opportunities with strings attached)
- **ADVERSARY** - The path you most rejected (active opposition)
- **OPPORTUNIST** - The third path (exploits the chaos, unpredictable)

```
                       The Global Stage (Entry)
                              │
           ┌──────────────────┼──────────────────┐
           │                  │                  │
     "Go West"          "Look East"       "Go It Alone"
           │                  │                  │
           ▼                  ▼                  ▼
    ┌──────────────────────────────────────────────────┐
    │  REACTIVE ASSIGNMENT:                            │
    │  - Chosen path → ALLY storyline (opportunities)  │
    │  - Opposite path → ADVERSARY storyline (threats) │
    │  - Third path → OPPORTUNIST storyline (wildcard) │
    └──────────────────────────────────────────────────┘
           │                  │                  │
    All three storylines remain active but play different roles
```

---

## Key Characters

### Western Gambit Characters

**Ambassador James Morrison** - 55, American diplomat, Rhodes Scholar, career State Department. Speaks softly but carries sanctions lists. Genuinely believes in liberal democracy, genuinely condescending about it.
- **Personality:** Polished, patient, passive-aggressive
- **Fatal Flaw:** Assumes everyone secretly wants to be Western
- **Arc:** From hopeful engagement to reluctant containment

**European Trade Commissioner Helena Braun** - 52, German, former banker, Brussels pragmatist. Cares about gas supplies and trade balances, not human rights. Your best Western contact—and she knows it.
- **Personality:** Direct, transactional, exhausted by politics
- **Fatal Flaw:** Thinks economics can solve everything
- **Arc:** From partner to reluctant enforcer

**NGO Director Claire Whitfield** - 40, British, runs "Democracy Now" foundation. Western governments fund her to annoy you. Effective at it. Her reports are cited in every sanctions package.
- **Personality:** Righteous, relentless, genuinely believes
- **Fatal Flaw:** No sense of irony about Western hypocrisy
- **Arc:** Thorn in your side, potential crisis point

### Eastern Embrace Characters

**Ambassador Zhang Wei** - 58, Chinese diplomat, Party member since youth, patient as granite. Never raises voice. Never makes empty threats. Every smile means something.
- **Personality:** Enigmatic, transactional, plays the long game
- **Fatal Flaw:** Underestimates non-Chinese nationalism
- **Arc:** From generous partner to demanding creditor

**Belt and Road Director Li Mei** - 45, infrastructure czarina, oversees $500B in global projects. She sees your country as a hub, a node, a piece on the board. Numbers are her language.
- **Personality:** Efficient, unsentimental, corporate
- **Fatal Flaw:** Thinks every country has a price
- **Arc:** From investor to owner

**General Chen Zhongxin** - 62, PLA strategist, wants access to your military technology and Arctic bases. Offers weapons, exercises, intelligence sharing. Always smiling, always watching.
- **Personality:** Avuncular, strategic, patient predator
- **Fatal Flaw:** Military mind in economic world
- **Arc:** From ally to liability

### Third Way Characters

**Turkish Envoy Mehmet Yilmaz** - 50, represents a president who also has Western problems. Offers alternative payment systems, weapons deals, diplomatic cover. Also has his own agenda.
- **Personality:** Charming, cunning, unreliable
- **Fatal Flaw:** Too clever for his own good
- **Arc:** Useful partner or backstabber

**Prince Khalid bin Faisal** - 42, Saudi/Gulf sovereign wealth fund director. Has $300B looking for assets. Apolitical, but his money isn't. Wants discount prices on your distressed assets.
- **Personality:** Smooth, transactional, obscenely rich
- **Fatal Flaw:** Thinks money solves everything
- **Arc:** Buyer of last resort

**Indian Trade Minister Priya Sharma** - 48, represents the world's largest non-aligned power. Pragmatic, careful, won't commit to anything. Wants cheap oil and technology without strings.
- **Personality:** Cautious, analytical, frustratingly balanced
- **Fatal Flaw:** Analysis paralysis at crucial moments
- **Arc:** Fair-weather friend

---

## The Entry Event

### `global_stage_summit`
**"The Global Stage"**

The World Economic Forum in Davos. Your first invitation since taking power. You fly in on the presidential jet—Western media notes it cost $80 million. Ambassador Morrison requests "frank discussions." Ambassador Zhang offers "strategic partnership." The Turkish envoy slides you a card. Back home, the ruble fell 4% today. Everyone has an offer. Everyone wants something.

**Four Choices:**

1. **"We seek partnership with the civilized world."** (Western Alignment)
   - Effects: treasury +50, elite -10
   - Sets: `global_alignment: "western"`, `western_accord_ally`, `eastern_embrace_adversary`, `third_way_opportunist`
   - Legacy: "The Westernizer" - You reached toward Europe. They reached back with conditions.
   - Unlocks: `western_accord_first_offer`

2. **"Our future lies with our Eastern friends."** (Chinese Pivot)
   - Effects: treasury +30, elite +5
   - Sets: `global_alignment: "eastern"`, `eastern_embrace_ally`, `western_accord_adversary`, `third_way_opportunist`
   - Legacy: "The Eastern Pivot" - You turned away from Europe toward a rising power.
   - Unlocks: `eastern_embrace_first_offer`

3. **"We will build a new order with new partners."** (Non-Aligned)
   - Effects: treasury +20, elite +8, anger -5
   - Sets: `global_alignment: "third_way"`, `third_way_ally`, `western_accord_opportunist`, `eastern_embrace_opportunist`
   - Legacy: "The Non-Aligned" - You rejected both superpowers. Now prove you don't need them.
   - Unlocks: `third_way_first_offer`

4. **"Let them all court us. We answer to no one."** (Multi-Vector)
   - Effects: elite +3
   - Sets: `global_alignment: "multi_vector"`, all three to `opportunist`
   - Legacy: "The Multi-Vector" - You played all sides. They noticed.
   - Unlocks: `multi_vector_chaos`

---

## Branch 1: The Western Gambit

### As ALLY Path (12 events)

#### Act 1: The Offer (Depth 1-2)

**`western_accord_first_offer`** - "The IMF Package"

Ambassador Morrison and Commissioner Braun present the offer: $40 billion credit line, debt restructuring, technology transfer agreements. The conditions are... extensive. Court reforms. Press freedom. "Just procedural," Morrison says. Braun looks uncomfortable.

**Choices:**
1. "Accept the package and conditions." → treasury +150, elite -15, unlocks `western_reform_demands`
2. "Accept the money, negotiate the conditions." → treasury +80, elite -8, unlocks `western_reform_demands`
3. "The conditions are unacceptable." → elite +5, unlocks `western_relationship_cools`
4. "Let us consider. We have other offers." → unlocks `western_pressure_begins`

**`western_reform_demands`** - "The Reform Agenda"

The Western package requires "structural reforms." Independent judiciary. Free press. Opposition allowed to register parties. Your advisors translate: give up control. Morrison insists these are "standard conditions." Your oligarchs are panicking.

**Choices:**
1. "Implement genuine reforms. Limited, but real." → elite -20, anger -15, flags: `genuine_western_reforms`
2. "Create the appearance of reform. Paper compliance." → elite -5, flags: `fake_western_reforms`
3. "Refuse. We will not be colonized." → unlocks `western_sanctions_begin`
4. "Reform the economy, not the politics." → treasury +30, elite -10

#### Act 2: The Friction (Depth 2-3)

**`western_pressure_begins`** - "The Human Rights Report"

Claire Whitfield's NGO releases its annual report. Your country is featured prominently: political prisoners, disappeared journalists, suspicious deaths. CNN runs it for three days. Morrison asks for "clarification." Braun looks away.

**Choices:**
1. "Deny everything. Western propaganda." → anger -5, elite +5, unlocks `western_media_war`
2. "Release some prisoners. Token gesture." → treasury -10, flags: `prisoner_release`, unlocks `western_relationship_improves`
3. "Expel the NGO. Enough interference." → elite +8, unlocks `western_sanctions_begin`
4. "Invite them to inspect. Call their bluff." → flags: `allowed_inspection`, unlocks `western_inspection_disaster`

**`western_relationship_improves`** - "The Thaw"

Your token gestures have been noted. Braun signals that the EU might ease some restrictions. American businesses are inquiring about investment. But the hardliners at home are furious—you're showing weakness.

**Choices:**
1. "Continue the opening. Carefully." → treasury +50, elite -12, unlocks `western_investment_wave`
2. "Slow down. We've given enough." → elite +5, unlocks `western_pressure_resumes`
3. "Extract maximum concessions first." → treasury +80, elite -5

**`western_sanctions_begin`** - "The First Sanctions"

The EU announces "targeted sanctions" against "individuals responsible for human rights violations." Your personal accounts in London are frozen. Your daughter can't finish her degree at Oxford. The oligarchs are next.

**Choices:**
1. "Retaliate. Expel diplomats, seize assets." → elite +10, treasury -30, unlocks `western_escalation_spiral`
2. "Ignore them. We have other banks." → treasury -20, unlocks `western_asset_hunt`
3. "Negotiate through back channels." → treasury -10, unlocks `western_back_channel`
4. "Sacrifice some oligarchs. Save the rest." → elite -15, unlocks `western_oligarch_sacrifice`

#### Act 3: The Reckoning (Depth 3-4)

**`western_investment_wave`** - "The Money Arrives"

Western investment is flowing. Shell, BP, Siemens all want in. Your economy is stabilizing. But they want guarantees—contracts that can't be unilaterally changed, courts that follow law. The strings multiply.

**Choices:**
1. "Give them what they want. Growth is growth." → treasury +100, elite -20, flags: `western_dependent`
2. "Extract better terms. We have leverage now." → treasury +60, elite -10
3. "Nationalize once they've invested." → treasury +150, elite +5, unlocks `western_nuclear_option`

**`western_escalation_spiral`** - "The New Cold War"

Relations are collapsing. Full sanctions, diplomatic expulsions, frozen assets, travel bans. Your oligarchs are screaming. Western companies are fleeing. Morrison calls to say he's being recalled. "We tried," he says.

**Choices:**
1. "Let them go. We don't need them." → treasury -100, elite -20, unlocks `global_isolation`
2. "One last attempt at negotiation." → treasury -30, unlocks `western_back_channel`
3. "Retaliate asymmetrically. Cyber, energy, elections." → flags: `hybrid_war_west`, unlocks `western_hybrid_war`

**`western_back_channel`** - "The Secret Talks"

A former European prime minister arrives quietly. He represents "certain interests" who want to avoid complete breakdown. A deal might be possible—sanctions relief for specific concessions. But it would have to stay secret.

**Choices:**
1. "Negotiate. What do they want?" → unlocks `western_secret_deal`
2. "No secret deals. If they want peace, do it publicly." → unlocks `western_public_standoff`
3. "Use this channel to deceive them." → flags: `betrayed_back_channel`

**`western_final_choice`** - "The Atlantic Question"

Years have passed. The Western relationship has defined your reign. Now a moment of clarity: integrate fully and accept their rules, or break permanently and accept the consequences. There is no middle ground left.

**Choices:**
1. "Full integration. We become a 'normal' country." → elite -30, anger -20, treasury +200, legacy: "The Reformer"
2. "Permanent break. We chart our own course." → elite +10, treasury -100, legacy: "The Defiant"
3. "Managed tension. Neither peace nor war." → legacy: "The Pragmatist"
4. "Collapse the talks. Blame them." → elite +5, legacy: "The Nationalist"

---

### As ADVERSARY Path (Events when West is hostile)

**`western_sanctions_escalate`** - "The Full Package"

You chose differently, and the West noticed. Full sectoral sanctions. Oil technology banned. Banking restrictions. SWIFT access threatened. They're trying to crush you economically. Your Chinese friends are watching.

**`western_asset_hunt`** - "The Oligarch Squeeze"

Western governments are hunting oligarch assets. Yachts seized in Monaco. Mansions frozen in London. Your friends are panicking—their money is trapped abroad. Some blame you. Some want to switch sides.

**`western_media_war`** - "The Documentary"

BBC releases a two-hour documentary about your corruption. Leaked documents, hidden camera footage, interviews with defectors. Watched by 30 million people. Your press secretary calls it "lies." Nobody believes him.

**`western_opposition_funding`** - "The Democracy Fund"

Western governments are openly funding your opposition. NGOs, media outlets, civil society groups. It's technically legal—"democracy promotion." It feels like regime change.

---

### As OPPORTUNIST Path (Events when West is playing you)

**`western_quiet_approach`** - "The Unofficial Offer"

Despite publicly condemning you, Western business interests are... curious. Through intermediaries, they offer deals. Lucrative ones. They don't care about democracy—they care about oil contracts. But if you accept, you're in their pocket.

**`western_playing_both_sides`** - "The Brussels Whisper"

You learn through intelligence that Western diplomats are negotiating with both you AND your opposition. They're hedging bets, preparing for any outcome. You're not a partner—you're an option.

---

## Branch 2: The Dragon's Embrace

### As ALLY Path (12 events)

#### Act 1: The Partnership (Depth 1-2)

**`eastern_embrace_first_offer`** - "The Belt and Road Invitation"

Ambassador Zhang invites you to join the Belt and Road Initiative. $60 billion in infrastructure investment. High-speed rail, ports, digital networks. No political conditions. "We don't interfere in internal affairs," he smiles. Li Mei hands you the contract—273 pages.

**Choices:**
1. "Sign immediately. This is our future." → treasury +100, elite +10, flags: `belt_road_full`, unlocks `eastern_infrastructure_boom`
2. "Negotiate better terms first." → treasury +60, elite +5, unlocks `eastern_tough_negotiations`
3. "Accept some projects, not all." → treasury +40, unlocks `eastern_selective_partnership`
4. "We need time to review the contracts." → elite -3, unlocks `eastern_patience_tested`

**`eastern_infrastructure_boom`** - "The Construction Sites"

Chinese workers are everywhere. New rail lines, ports, highways appearing across your country. Your people are impressed. But you notice: the workers are Chinese. The materials are Chinese. The managers are Chinese. Where is the technology transfer?

**Choices:**
1. "This is fine. Speed matters." → treasury +50, flags: `eastern_dependency_deepens`
2. "Demand local hiring requirements." → treasury +30, elite -5, unlocks `eastern_friction_begins`
3. "Renegotiate the contracts." → unlocks `eastern_contract_dispute`

**`eastern_military_offer`** - "The Defense Package"

General Chen presents military cooperation: advanced fighters, air defense systems, joint exercises. Your generals are excited—this is equipment the West would never sell you. But the terms include "basing rights" and "intelligence sharing."

**Choices:**
1. "Accept fully. We need modern weapons." → elite +15, flags: `chinese_military_base`, unlocks `eastern_military_integration`
2. "Weapons yes, bases no." → elite +8, treasury -30, unlocks `eastern_arms_deal`
3. "Decline. Military independence is non-negotiable." → elite -10, unlocks `eastern_relationship_cools`

#### Act 2: The Debt (Depth 2-3)

**`eastern_debt_accumulates`** - "The Repayment Schedule"

Li Mei requests a meeting. The infrastructure loans are coming due. $8 billion this year. Your treasury doesn't have it. She has suggestions: asset transfers, port concessions, mining rights. "Just restructuring," she says.

**Choices:**
1. "Accept the restructuring. We have no choice." → treasury -50, flags: `chinese_asset_transfers`, unlocks `eastern_debt_trap_springs`
2. "Demand better terms. We're partners." → unlocks `eastern_negotiations_tense`
3. "Default. Let them deal with it." → elite -15, unlocks `eastern_relationship_crisis`
4. "Seek Western refinancing instead." → unlocks `western_opportunist_approach`

**`eastern_debt_trap_springs`** - "The Port Concession"

To service the debt, you've signed over operating rights to your main Black Sea port. 99-year lease. Chinese companies now control your maritime trade. The opposition calls it "selling the country." They're not entirely wrong.

**Choices:**
1. "It's business. The country benefits." → elite -10, anger +15
2. "Publicly justify it. Spin the narrative." → treasury -20, anger +5
3. "Quietly limit the damage going forward." → flags: `resisting_chinese_control`

**`eastern_surveillance_request`** - "The Data Sharing Agreement"

Ambassador Zhang raises a "technical matter": your Chinese-built telecommunications networks have certain... capabilities. Beijing would like access to the data. For "security cooperation." Your FSB chief looks alarmed.

**Choices:**
1. "We are partners. Of course." → flags: `chinese_surveillance_access`, elite +5
2. "Domestic data stays domestic." → elite -8, unlocks `eastern_trust_erodes`
3. "We didn't realize the networks had these capabilities." → unlocks `eastern_tech_audit`

#### Act 3: The Reckoning (Depth 3-4)

**`eastern_junior_partner`** - "The Beijing Summit"

You're invited to Beijing. State dinner, honor guard, the works. But you notice: you're seated below several African leaders. Your trade minister is ignored in negotiations. You're not a partner—you're a client state.

**Choices:**
1. "Accept the reality. They're stronger." → elite -15, flags: `accepted_junior_status`
2. "Push back publicly. Demand respect." → elite +10, unlocks `eastern_confrontation`
3. "Quietly diversify away from China." → unlocks `eastern_escape_attempt`

**`eastern_escape_attempt`** - "The Pivot Back"

You've decided China has too much leverage. Time to balance. But they notice. Li Mei's calls become colder. Trade inspectors find "problems" with your exports. Belt and Road projects slow down. Are you trapped?

**Choices:**
1. "Push through. Accept the pain." → treasury -80, unlocks `global_rebalancing`
2. "Retreat. Apologize. Stay in their orbit." → elite -20, flags: `chinese_vassal`
3. "Play for time. Neither commit nor break." → unlocks `eastern_cold_peace`

**`eastern_final_choice`** - "The Eastern Question"

Years have passed. China has become your largest creditor, trading partner, weapons supplier. They've asked for something new: a formal mutual defense treaty. This would make the relationship permanent—and visible.

**Choices:**
1. "Sign the treaty. Accept junior partnership." → elite -20, treasury +100, legacy: "The Eastern Vassal"
2. "Refuse. Accept the consequences." → treasury -100, legacy: "The Independent"
3. "Stall indefinitely. Neither sign nor refuse." → legacy: "The Hedge"
4. "Use treaty talks to extract concessions." → treasury +50, legacy: "The Negotiator"

---

### As ADVERSARY Path (Events when China is hostile)

**`eastern_quiet_undermining`** - "The Currency Attack"

You aligned with the West, and China noticed. Your currency is under pressure—unusual selling patterns that trace back to Chinese state banks. Deniable, but effective. Your Finance Minister is panicking.

**`eastern_neighbor_support`** - "The Border Dispute"

China is suddenly very interested in your neighbors' territorial claims. Old disputes resurface. Border incidents increase. They're not threatening you directly—just making sure you feel surrounded.

**`eastern_economic_leverage`** - "The Trade Audit"

Chinese customs have found "irregularities" in your exports. Weeks of delays. Billions in perishable goods rotting at the border. Your agricultural sector is screaming. The message is clear.

---

### As OPPORTUNIST Path (Events when China is playing you)

**`eastern_patient_waiting`** - "The Open Door"

China isn't your ally, but they're not hostile either. Ambassador Zhang maintains contact. Small deals continue. They're waiting—for you to fail, for you to need them, for the right moment. Patient as always.

**`eastern_parallel_deals`** - "The Competition"

You learn China is making the same offers to your neighbors. The same infrastructure, the same terms. You're not special—you're a node in their network. They'll work with whoever is cheapest.

---

## Branch 3: The Third Way

### As ALLY Path (12 events)

#### Act 1: The Coalition (Depth 1-2)

**`third_way_first_offer`** - "The Alternative Summit"

Mehmet Yilmaz invites you to a summit in Istanbul. Turkey, India, Saudi Arabia, UAE, Indonesia, South Africa—countries tired of choosing between Washington and Beijing. They're building parallel institutions. New development bank, alternative payment systems, defense cooperation.

**Choices:**
1. "Join enthusiastically. This is the future." → elite +8, treasury +40, flags: `third_way_founding_member`, unlocks `third_way_institution_building`
2. "Join cautiously. Observer status first." → treasury +20, unlocks `third_way_testing_waters`
3. "Attend but don't commit. See who else joins." → unlocks `third_way_watching_waiting`
4. "Decline. This is a coalition of the marginal." → elite +5, unlocks `third_way_opportunist_approach`

**`third_way_institution_building`** - "The New Bank"

The new development bank is being structured. Where to headquarter it? Everyone wants it. You propose your capital. It would mean prestige—and scrutiny. The Saudis have more money. The Indians have more people.

**Choices:**
1. "Push hard for headquarters. Bribe if needed." → treasury -30, flags: `third_way_bank_host`, unlocks `third_way_leadership_challenge`
2. "Accept a subsidiary role. Less exposure." → treasury +20
3. "Focus on getting loans, not hosting." → treasury +40

**`third_way_currency_deal`** - "The Ruble-Rupee Swap"

India proposes bilateral currency swaps—trade in rupees and rubles, bypassing the dollar. It would reduce sanctions vulnerability. But it also means accepting Indian rupees, which aren't exactly stable either.

**Choices:**
1. "Sign the swap. Dollar dependence is dangerous." → treasury +20, flags: `currency_diversification`, unlocks `third_way_payment_systems`
2. "Wait for better partners. Rupee is risky." → elite -3
3. "Propose multilateral basket. Spread the risk." → unlocks `third_way_currency_basket`

#### Act 2: The Cracks (Depth 2-3)

**`third_way_unreliable_partners`** - "The Turkish Problem"

Mehmet Yilmaz's government is in crisis. Inflation at 80%. Currency collapsing. The partnership deals you signed are now worthless. Turkey can't deliver, can't pay, can't even show up to meetings. Some coalition.

**Choices:**
1. "Stand by them. Partners stick together." → treasury -30, flags: `loyal_to_turkey`
2. "Distance ourselves. They're a liability." → elite +5, unlocks `third_way_coalition_frays`
3. "Opportunistically buy Turkish assets cheap." → treasury +40, personalWealth +10

**`third_way_competing_interests`** - "The Kashmir Question"

India and Pakistan both want you to take sides on Kashmir. The Saudis are neutral. The Turks support Pakistan. Your "coalition" is dissolving into bilateral squabbles. Nobody agrees on anything except opposing the West.

**Choices:**
1. "Stay neutral. Frustrate everyone equally." → elite -5
2. "Side with India. They're more important." → unlocks `third_way_pakistan_problem`
3. "Side with Pakistan. Arab money follows." → treasury +30
4. "Propose a new regional security framework." → unlocks `third_way_mediation_attempt`

**`third_way_saudi_strings`** - "The Prince's Price"

Prince Khalid is willing to invest $50 billion—but he wants something specific: your support against Iran, your silence on Yemen, your public alignment with Saudi positions. His money isn't as string-free as advertised.

**Choices:**
1. "Accept. Their money, their rules." → treasury +50, flags: `saudi_aligned`, unlocks `third_way_iran_problem`
2. "Negotiate. Less money, fewer strings." → treasury +25
3. "Decline. We won't be bought." → elite +5, unlocks `third_way_funding_crisis`

#### Act 3: The Chaos (Depth 3-4)

**`third_way_coalition_collapses`** - "The Empty Summit"

The Third Way Summit in Dubai. Half the leaders don't show up. Those who come are distracted, negotiating side deals, checking their phones. The "new world order" looks a lot like the old chaos.

**Choices:**
1. "Double down. Revive the coalition." → treasury -40, unlocks `third_way_second_attempt`
2. "Acknowledge failure. Return to great powers." → unlocks `global_humiliation`
3. "Pivot to bilateral deals. Forget the multilateral dream." → unlocks `third_way_transactional_mode`

**`third_way_playing_all_sides`** - "The Triple Cross"

You discover your "partners" have been negotiating with your enemies. Turkey cut a deal with NATO. Saudi Arabia is talking to Beijing. India is cozying up to Washington. Everyone is hedging. Everyone except you.

**Choices:**
1. "Confront them. Demand loyalty." → elite +5, unlocks `third_way_confrontation`
2. "Do the same. Play all sides yourself." → flags: `everybody_for_themselves`
3. "Accept reality. There is no third way." → unlocks `third_way_final_choice`

**`third_way_final_choice`** - "The Independence Question"

Years of trying to build an alternative. Some successes, many failures. You're not dependent on the West or China—but you're not exactly independent either. Just... alone. Was it worth it?

**Choices:**
1. "It was worth it. We answer to no one." → legacy: "The Truly Non-Aligned"
2. "Time to pick a side. This isolation is killing us." → unlocks `global_realignment`
3. "Keep trying. The future is multipolar." → legacy: "The Visionary"
4. "Admit failure. At least internally." → elite -10, legacy: "The Realist"

---

### As ADVERSARY Path (Events when Third Way countries are hostile)

**`third_way_no_help_coming`** - "The Silent Partners"

You reached out to your "alternative partners" for help. Radio silence. Turkey is dealing with its own crisis. The Saudis are recalculating. India is "studying the situation." Some coalition.

**`third_way_vulture_circling`** - "The Distressed Asset Sale"

When you're weak, the Third Way countries don't help—they circle. Gulf sovereign wealth funds are making lowball offers for your best assets. India wants exclusive oil contracts at steep discounts. Partners in poverty, competitors in crisis.

---

### As OPPORTUNIST Path (Events when Third Way is playing you)

**`third_way_fair_weather`** - "The Conditional Friends"

The Third Way countries are friendly when it's convenient. They'll trade, they'll talk, they'll attend summits. But when you need real support—sanctions relief, military aid, diplomatic cover—they're suddenly "studying the situation."

**`third_way_side_deals`** - "The Bilateral Web"

Everyone is making deals with everyone. You're part of a web of overlapping bilateral arrangements, none of which add up to real partnership. Useful, but exhausting.

---

## Shared Crisis Events (6 events)

**`inflation_crisis_deepens`** - "The Bread Lines Form"

Whatever your geopolitical choice, the domestic economy is suffering. Inflation at 25%. Bread prices doubled. Currency down 40%. Your foreign policy isn't filling stomachs. People are getting angry.

**Choices:**
1. "Emergency price controls. Soviet style." → anger -10, treasury -50
2. "Blame foreign enemies. Any will do." → anger +5, elite +5
3. "Emergency central bank measures. Conventional." → treasury -30
4. "Do nothing. This will pass." → anger +15

**`currency_collapse_moment`** - "Black Monday"

The ruble falls 20% in one day. Banks are closed. ATM lines snake around blocks. Your Finance Minister is ashen. This is the moment—every foreign relationship, every trade deal, every loan is being tested.

**Choices:**
1. "Emergency IMF call. Beg if necessary." → unlocks `western_crisis_intervention`
2. "Chinese emergency line. Pay their price." → unlocks `eastern_crisis_intervention`
3. "Capital controls. Close the borders." → anger +20, elite -15
4. "Ride it out. Project confidence." → treasury -80

**`foreign_creditors_call`** - "The Bills Come Due"

All your foreign creditors want their money simultaneously. Western banks, Chinese development funds, Gulf investment vehicles. Everyone is calling. Your reserves won't cover it.

**Choices:**
1. "Selective default. Pick who to stiff." → elite -15, unlocks `creditor_hierarchy`
2. "Emergency asset sales. Whatever it takes." → treasury -100, personalWealth +30
3. "Moratorium. Nobody gets paid until we stabilize." → unlocks `international_pariah`
4. "Negotiate restructuring. Buy time." → treasury -20

**`geopolitical_reckoning`** - "The Price of Independence"

Your choices have consequences. The world has changed. You must assess: was it worth it? Who are your real friends? What have you given up?

*Multiple variations based on flags and relationships*

**`global_isolation`** - "The Hermit Kingdom"

All doors have closed. West hostile. East disappointed. Third Way scattered. You've achieved independence through isolation. The price is growing clear.

**`global_rebalancing`** - "The New Equilibrium"

After the chaos, a new balance emerges. You've navigated between the great powers. Bruised but intact. Dependent but not dominated. Is this victory?

---

## Flags and Variables

### Path Selection
| Flag | Set By | Effect |
|------|--------|--------|
| `global_alignment` | Global Stage | "western", "eastern", "third_way", or "multi_vector" |
| `western_accord_ally` | Global Stage | West is ally path |
| `western_accord_adversary` | Global Stage | West is adversary path |
| `western_accord_opportunist` | Global Stage | West is opportunist path |
| `eastern_embrace_ally` | Global Stage | China is ally path |
| `eastern_embrace_adversary` | Global Stage | China is adversary path |
| `eastern_embrace_opportunist` | Global Stage | China is opportunist path |
| `third_way_ally` | Global Stage | Third Way is ally path |
| `third_way_adversary` | Global Stage | Third Way is adversary path |
| `third_way_opportunist` | Global Stage | Third Way is opportunist path |

### Key Story Flags
| Flag | Set By | Effect |
|------|--------|--------|
| `genuine_western_reforms` | Reform Demands | Actually reformed |
| `fake_western_reforms` | Reform Demands | Paper compliance |
| `belt_road_full` | First Offer | Full Chinese integration |
| `chinese_asset_transfers` | Debt Trap | Gave assets to China |
| `chinese_military_base` | Military Offer | Chinese base on your soil |
| `third_way_founding_member` | First Offer | Coalition leader |
| `currency_diversification` | Currency Deal | De-dollarized |

---

## Theme Elements

- **Border Color:** #1E3A5F (Deep Navy Blue)
- **Accent Color:** #C9B037 (Gold/Brass)
- **Icon:** 🌐

## Tone Notes

- International relations as dark comedy: everyone is lying, everyone knows it
- Every offer has strings; every partnership has prices
- The small country's impossible position: needing the great powers, despising them
- Inflation and economic crisis as constant pressure
- Nobody is your friend; some are just less hostile
- The absurdity of "sovereignty" when you need foreign money
- Reference real events: BRI debt traps, IMF conditions, sanctions regimes

---

## Estimated Event Count: 43

- Entry: 1 (global_stage_summit)
- Western Gambit: 12 events
- Eastern Embrace: 12 events
- Third Way: 12 events
- Shared crisis events: 6 events

Total: ~43 events

