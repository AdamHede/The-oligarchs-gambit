# Balance Guide

> **Status**: Living Document
> **Last Updated**: Dec 1, 2025
> **Based On**: `reports/balance-2025-12-01T19-10-12.json`, `reports/simulate-2025-12-01T19-10-15.json`

This guide bridges the gap between our narrative ideals (see `WRITING_GUIDE.md`) and the mathematical reality of the game engine. It provides actionable data for tuning events to ensure the game is challenging, fair, and fun.

---

## 1. Balance Philosophy

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

## 2. Current State Analysis (Dec 2025)

Our simulation data reveals the current balance reality:

### Failure Modes
| Strategy | Avg Turns | Primary Death Cause | Analysis |
|----------|-----------|---------------------|----------|
| **Random** | ~35 | **Revolution (85%)** | Anger accumulates too fast for random choices to mitigate. |
| **Greedy** | ~18 | **Revolution (100%)** | Maximizing wealth kills the regime immediately. Anger is the bottleneck. |
| **Conservative** | ~80 | **Bankruptcy (100%)** | Survival is possible but leads to fiscal collapse. |
| **Balanced** | ~90 | **Bankruptcy (100%)** | The longest games end because the Treasury runs dry. |

### Key Takeaway
**Anger is currently the most lethal stat.** It accumulates faster than players can reduce it, leading to early revolutions. Once players survive the anger (Conservative/Balanced strategies), they run out of money (Treasury) because costs are high and revenue sources are scarce.

### Top Killer Events
These events appear most frequently in the final 3 turns before a game over:
1.  `tech_sector_collapse` (Brain Drain)
2.  `oligarch_greed_spiral` (Compensation Spiral)
3.  `import_substitution_failure` (The Cheese Incident)
4.  `war_goes_badly` (The 72-Hour Quagmire)
5.  `loyal_tech_giant` (The Homegrown Tech Champion) - *Surprisingly lethal due to high treasury costs*

---

## 3. Effect Magnitude Reference

When designing events, use these ranges. Note the discrepancy between our targets and current actuals.

### Statistical Norms (Per Choice)
| Stat | Current Mean | Target Mean | Note |
|------|--------------|-------------|------|
| **Personal Wealth** | +5.3 | +5.0 | Slightly generous, but okay. |
| **Treasury** | -16.9 | -25.0 | Costs are a bit low, but revenue is also scarce. |
| **Elite** | -1.3 | -2.0 | Elite loyalty is sticky; hard to lose, hard to gain. |
| **Anger** | +4.1 | +3.0 | **TOO HIGH**. Anger gain is aggressive. |

### Scale Reference
| Magnitude | Wealth (B) | Treasury (B) | Elite/Anger (%) |
|-----------|------------|--------------|-----------------|
| **Tiny** | ±1-2 | ±10-30 | ±2-5 |
| **Small** | ±3-5 | ±40-80 | ±6-10 |
| **Medium** | ±6-10 | ±90-150 | ±11-15 |
| **Large** | ±11-20 | ±160-250 | ±16-25 |
| **Extreme** | ±20-50 | ±260-400 | ±26-35 |

**Correction needed**: Many treasury effects currently use single/double digits (e.g., -10, -20) which map to "Tiny" or smaller. We need to scale treasury numbers up to match the narrative stakes (billions, not millions).

---

## 4. Choice Balance Guidelines

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

1.  `sanctions_initial_wave` (Delta: 35.3) - "Seize assets" is vastly superior to negotiating.
2.  `bloody_sunday_scenario` (Delta: 30.4) - "Back down" is much safer than "Double down" (which is a death sentence).
3.  `tech_sector_collapse` (Delta: 26.4) - "Tax breaks" is far better than closing borders.
4.  `paranoia_increases` (Delta: 25.0) - "Stop purge" is safe; "Continue purge" is self-destructive.

---

## 5. Storyline Balance Matrix

Storylines have different "flavors" of difficulty. Use this to ensure a mix of threats.

| Storyline | Avg Treasury | Avg Anger | Avg Elite | Character |
|-----------|--------------|-----------|-----------|-----------|
| **war-invasion** | **-34.1** | **+5.0** | -1.9 | **High Risk**. Drains treasury fast and spikes anger. |
| **oligarch-rivalry** | **-38.0** | **+8.3** | -2.5 | **Expensive**. Massive wealth transfers (-Treasury, +Wealth). |
| **popular-uprising** | -15.0 | **+8.1** | **-3.7** | **Lethal**. High anger + elite dissatisfaction = Game Over risk. |
| **sanctions-spiral** | -5.6 | +4.3 | -0.3 | **Grind**. Slow bleeding of resources. |
| **energy-politics** | -3.3 | +1.7 | **+2.1** | **Reward**. Often positive for the player (high elite gain). |

**Design Note**: `energy-politics` is currently too safe. It should have higher variance or risks (e.g., fluctuating prices causing budget holes).

---

## 6. Death Spiral Prevention

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

## 7. Testing Workflow

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

## Appendix: Rebalancing Targets

### Events Needing Adjustment (Priority)

1.  **`sanctions_initial_wave`**: Buff "Negotiate" or nerf "Seize Assets".
2.  **`bloody_sunday_scenario`**: Reduce the anger penalty for "Double down" (make it effectively suppress protests but hurt Elite/International standing instead).
3.  **`tech_sector_collapse`**: Closing borders should stop the Brain Drain event chain, making it a viable (if draconian) strategic choice.
4.  **`energy_price_spike`**: "Sell at max price" is too good (+100 Treasury). Add an inflation/anger risk.

