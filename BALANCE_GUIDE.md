# Balance Guide

> **Status**: Living Document
> **Last Updated**: Dec 1, 2025
> **Based On**: `reports/balance-2025-12-01T19-42-30.json`, `reports/simulate-2025-12-01T19-42-30.json`

This guide bridges the gap between our narrative ideals (see `WRITING_GUIDE.md`) and the mathematical reality of the game engine. It provides actionable data for tuning events to ensure the game is challenging, fair, and fun.

---

## 1. Event Content Summary

**Total Events: 39**

| File | Count | Theme |
|------|-------|-------|
| `events_war_military.js` | 9 | War, invasion, military coups |
| `events_sanctions_international.js` | 7 | Sanctions, diplomacy, trade wars |
| `events_energy_pipeline.js` | 6 | Gas exports, price shocks, infrastructure |
| `events_succession_power.js` | 6 | Health crises, heirs, internal power struggles |
| `events_social_movements.js` | 5 | Protests, opposition, media control |
| `events_domestic_crisis.js` | 4 | Economy, shortages, disasters |
| `events_misc.js` | 2 | Random flavor events |

---

## 2. Balance Philosophy

The game is designed to be **winnable but difficult**, with a constant downward pressure. Balance does not mean "fairness" in the traditional sense—it means **meaningful tradeoffs**.

### The Core Tension
The game balances four competing pressures. A balanced event challenges the player to prioritize one at the expense of others:

1.  **Personal Wealth**: The score. Ideally trends up, but slowly.
2.  **Treasury**: The fuel. Trends down naturally; must be refilled via unpopular actions.
3.  **Elite Loyalty**: The shield. Trends down via paranoia/greed; expensive to maintain.
4.  **Public Anger**: The clock. Trends up naturally; requires constant suppression or appeasement.

### The "Sustainable-But-Doomed" Ideal
Players should feel they are "managing the decline."
- **Early Game**: Wealth accumulation is easy, threats are low.
- **Mid Game**: Crises begin to chain; choices become "bad vs. worse."
- **Late Game**: Survival mode. Wealth extraction stops; all resources go to preventing collapse.

---

## 3. Current State Analysis (Dec 2025)

Our simulation data (1000 games) reveals the current balance reality:

### Failure Modes
| Strategy | Avg Turns | Primary Death Cause | Analysis |
|----------|-----------|---------------------|----------|
| **Random** | ~43 | **Revolution (75%)** | Anger is manageable but eventually lethal. |
| **Greedy** | ~20 | **Revolution (100%)** | Maximizing wealth kills the regime quickly. |
| **Conservative** | ~67 | **Bankruptcy (100%)** | Survival is possible but leads to fiscal collapse. |
| **Balanced** | ~78 | **Bankruptcy (100%)** | Skilled play extends life, but Treasury is the hard limit. |

### Key Takeaway
**The game has two distinct phases based on skill:**
1.  **Novice/Greedy**: Dies to **Anger (Revolution)**. The early game challenge is managing public unrest.
2.  **Expert/Conservative**: Dies to **Bankruptcy**. Once anger is managed, the long-term treasury drain becomes the inescapable killer.

### Top Killer Events
These events appear most frequently in the final 3 turns before a game over:
1.  `tech_sector_collapse` (Brain Drain) - *Top Killer*
2.  `sanctions_initial_wave` (The Economic Iron Curtain)
3.  `import_substitution_failure` (The Cheese Incident)
4.  `loyal_tech_giant` (The Homegrown Tech Champion)
5.  `underground_railroad` (The Escape Network)

---

## 4. Effect Magnitude Reference

When designing events, use these ranges.

### Statistical Norms (Per Choice)
| Stat | Current Mean | Target Mean | Note |
|------|--------------|-------------|------|
| **Personal Wealth** | +6.0 | +5.0 | Slightly generous. |
| **Treasury** | -19.4 | -25.0 | Costs are rising towards target, but still a bit low. |
| **Elite** | -1.1 | -2.0 | Elite loyalty is too stable; needs more volatility. |
| **Anger** | +3.2 | +3.0 | **Perfect**. Anger gain is right on target. |

### Scale Reference
| Magnitude | Wealth (B) | Treasury (B) | Elite/Anger (%) |
|-----------|------------|--------------|-----------------|
| **Tiny** | ±1-2 | ±10-30 | ±2-5 |
| **Small** | ±3-5 | ±40-80 | ±6-10 |
| **Medium** | ±6-10 | ±90-150 | ±11-15 |
| **Large** | ±11-20 | ±160-250 | ±16-25 |
| **Extreme** | ±20-50 | ±260-400 | ±26-35 |

---

## 5. Choice Balance Guidelines

A choice is "balanced" if there is no mathematical "no-brainer."
- **Dominant Choice**: One option is mathematically superior in almost all game states.
- **Score Delta**: The difference in utility between the best and worst choice. Target < 15.

### Rebalancing Patterns

#### 1. The "Hidden Cost" Pattern
If a choice gives free money/stats, add a risk.
*Before*: Gain +10 Wealth.
*After*: Gain +15 Wealth, but add `investigation_risk` to deck.

#### 2. The "Silver Lining" Pattern
If a choice is purely negative, add a small mitigating bonus.
*Before*: Lose -20 Treasury.
*After*: Lose -20 Treasury, but gain +2 Elite (you paid someone off).

#### 3. The "Delayed Consequence" Pattern
If a choice is too good immediately, make the player pay later.
*Example*: "Print Money" gives +100 Treasury now, but adds `inflation_crisis` (triggered later, high damage).

### Dominant Choices to Fix
These events have a Score Delta > 15, meaning one choice is almost always taken by the Balanced strategy.

1.  `tech_sector_collapse` (Delta: 33.2) - "Tax breaks" is vastly superior to closing borders.
2.  `internet_censorship_tightens` (Delta: 20.0) - "Ease restrictions" is much safer than tightening them.
3.  `mass_protests_blogger` (Delta: 20.0) - "Wait it out" is the only viable option.
4.  `sanctions_human_rights` (Delta: 19.8) - "Defy sanctions" is surprisingly better mathematically than compliance.
5.  `oligarch_yacht_seized` (Delta: 19.0) - "Compensate fully" is the clear winner.

---

## 6. Storyline Balance Matrix

Storylines have different "flavors" of difficulty. Use this to ensure a mix of threats.

| Storyline | Avg Treasury | Avg Anger | Avg Elite | Character |
|-----------|--------------|-----------|-----------|-----------|
| **war-invasion** | **-34.1** | **+5.0** | -1.9 | **High Risk**. Drains treasury fast and spikes anger. |
| **oligarch-rivalry** | **-38.0** | **+5.0** | -1.7 | **Expensive**. Massive wealth transfers. |
| **popular-uprising** | -30.0 | +3.8 | **-3.7** | **Lethal**. Drains everything: money, elite support, and stability. |
| **sanctions-spiral** | -14.5 | +4.3 | -0.8 | **Grind**. Moderate drain but persistent. |
| **energy-politics** | -3.3 | +1.7 | **+3.2** | **Safe Haven**. Low risk, helps rebuild Elite loyalty. |
| **domestic-crisis** | -10.0 | +1.1 | -1.8 | **Minor nuisance**. Needs more bite. |

---

## 7. Death Spiral Prevention

A "Death Spiral" occurs when a severe choice adds *more* events that cause severe choices, creating an inescapable loop.

### High Risk Chains (Identified)
1.  **War Loop**: `war_special_operation_proposal` -> `war_goes_badly` -> `conscription_crisis` -> `border_exodus_brain_drain`.
    *Fix*: Ensure `war_goes_badly` has an "off-ramp" choice that ends the war (at high cost) rather than just spiraling.
2.  **Protest Loop**: `navalny_style_investigation` -> `mass_protests_blogger` -> `bloody_sunday_scenario`.
    *Fix*: Provide non-violent (propaganda/bribery) ways to diffuse protests early.

### Safety Guidelines
- **No double punishment**: If a choice costs -50 Treasury, don't *also* add a card that costs -50 Treasury immediately.
- **Escape Valves**: Every chain needs an exit, even if humiliating (e.g., "Admit defeat", "Pay reparations").
- **Cap Anger**: Avoid choices that give +25 Anger unless they are "Game Over" buttons. +10-15 is a safer maximum.

---

## 8. Testing Workflow

Designers should run these tools after editing events to verify impact.

### Step 1: Static Analysis
Check stats, dominant choices, and structural validity.
```bash
node tools/balance.js
```
*Look for*: "Dominant Choices" list and "Death Spiral Risks".

### Step 2: Simulation
Run 1000 games to see how the meta shifts.
```bash
node tools/simulate.js 1000
```
*Look for*:
- **Avg Turns**: Should be 40-60 for Random/Greedy, 80-120 for Balanced.
- **Death Causes**: Should be a healthy mix (~40% Revolution, ~40% Elite Revolt, ~20% Bankruptcy). *Currently skewing 85% Revolution.*

---

## Appendix: Rebalancing Targets (Dec Update)

### Priority Fixes
1.  **Nerf `tech_sector_collapse`**: The "Tax breaks" option is too good. It should cost significant Treasury or Elite loyalty.
2.  **Buff `domestic-crisis`**: These events are currently too weak (-10 Treasury). Scale them up to -50 to -100 to threaten the mid-game economy.
3.  **Fix Dominant Choices**: Rebalance the top 5 dominant choices listed in Section 5 to make the alternative options more viable.
4.  **Increase Elite Volatility**: Add more events that directly target Elite loyalty (both positive and negative) to break the 100% Bankruptcy meta for skilled players.
