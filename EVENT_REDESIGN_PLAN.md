# Event System Redesign - Battle Plan

## Current Status

### ✅ Completed
1. **Event Analysis Automation** (`analyze-events.js`)
   - Analyzes all events across 7 categories
   - Generates markdown report + JSON for frontend
   - Identifies dead ends, orphaned events, branching ratio
   - Updates version numbers across all files

2. **In-Game Debug Viewer**
   - Added event tree viewer to debugging menu
   - Shows branching statistics, dead ends, orphaned events
   - Protected with spoiler warnings
   - Loads from `event-tree.json`

3. **War_Military Category Redesigned** (22 events)
   - Template showing proper branching structure
   - Every event has 2-4 branching choices
   - Created proper storyline chains
   - Added missing foundational events

### 📊 Current Metrics (After War_Military Redesign)
- **Total Events:** 147
- **Branching Ratio:** 20.4% (worse than before, but intentional)
- **Why worse?** War_military now references 142 new events that don't exist yet
- **War_military alone:** 100% of events have branching (perfect template)

### ❌ Remaining Work

Need to redesign 6 categories with heavy branching:
1. **events_energy_pipeline.js** (12 events) - currently ~25% branching
2. **events_sanctions_international.js** (11 events) - currently ~20% branching
3. **events_succession_power.js** (13 events) - currently ~30% branching
4. **events_social_movements.js** (11 events) - currently ~20% branching
5. **events_domestic_crisis.js** (11 events) - currently ~25% branching
6. **events_misc.js** (67 events) - currently ~30% branching

---

## The Goal

**Target:** 50-60% of all choices should have branching (`addToPool`)

**Current:** 20-25% have branching

**Needed:** Add branching to ~200-250 choices across 6 categories

---

## Strategy

### Approach 1: Systematic Redesign (Recommended)
Follow the war_military template for each category:

1. **Read the storyline docs** (STORYLINES.md, TONE_AND_STYLE.md)
2. **Identify the core storyline** for that category
3. **Map out event chains:**
   - Entry point events (no conditions)
   - Escalation events (triggered by entry points)
   - Branch points (major decisions with 3+ consequences)
   - Conclusion events (endings with legacies)

4. **Add branching to every event:**
   - Greedy choice → scandal, investigation, costs
   - Moderate choice → followup, complications
   - Reform choice → backlash, consequences

5. **Test with analyzer:** `node analyze-events.js`

6. **Iterate until category hits 80%+ branching**

### Approach 2: Quick Wins (Faster)
Add branching to existing events without full redesign:

1. **Open each category file**
2. **Find choices without `addToPool`**
3. **Add 2-3 consequence events per choice** using these patterns:

```javascript
// Repression/Violence choice
addToPool: ["underground_resistance", "martyr_effect", "international_condemnation"]

// Corruption choice
addToPool: ["corruption_scandal", "investigation_risk", "elite_resentment"]

// Economic choice
addToPool: ["economic_consequences", "public_reaction", "fiscal_crisis"]

// Negotiate choice
addToPool: ["hardliner_backlash", "temporary_peace", "trust_building"]

// Ignore/delay choice
addToPool: ["problem_worsens", "situation_escalates", "missed_opportunity"]
```

4. **Don't worry if referenced events don't exist yet**
   - Create placeholders later
   - Focus on structure first

5. **Test frequently:** `node analyze-events.js`

---

## Branching Patterns by Event Type

### Corruption/Money Events
- **Greedy choice** → `corruption_exposed`, `investigation_begins`, `elite_jealousy`
- **Moderate choice** → `sustainable_graft`, `reputation_intact`, `calculated_risk`
- **Reform choice** → `elite_backlash`, `public_approval`, `oligarch_resentment`

### Repression Events
- **Harsh crackdown** → `underground_resistance`, `martyrs_created`, `international_outrage`
- **Moderate response** → `ongoing_protests`, `escalation_possible`, `status_quo`
- **Negotiate** → `hardliner_anger`, `temporary_calm`, `concessions_demanded`

### Economic Events
- **Print money** → `inflation_spiral`, `currency_collapse`, `savings_destroyed`
- **Austerity** → `social_unrest`, `pension_cuts_rage`, `economic_contraction`
- **Borrow** → `debt_trap`, `foreign_dependency`, `interest_payments_mount`

### International Events
- **Aggressive** → `sanctions_incoming`, `diplomatic_isolation`, `conflict_escalation`
- **Diplomatic** → `negotiations_begin`, `compromise_needed`, `backchannel_talks`
- **Defiant** → `isolation_deepens`, `retaliation`, `siege_mentality`

### Elite/Power Events
- **Eliminate rival** → `paranoia_grows`, `loyalty_through_fear`, `succession_crisis`
- **Compromise** → `power_sharing_tension`, `temporary_alliance`, `future_betrayal`
- **Ignore** → `rival_grows_stronger`, `coup_risk_increases`, `lost_control`

---

## Detailed Plan by Category

### 1. Energy_Pipeline (12 events, ~2 hours)

**Core Storyline:** Using energy as geopolitical weapon

**Key Events to Redesign:**
- `gas_pipeline_deal` → add: `corruption_windfall`, `chinese_leverage`, `european_dependency`
- `gas_leverage` → add: `energy_weapon_backlash`, `customers_flee`, `china_pivot`
- `opec_plus_meeting` → add: `oil_manipulation`, `saudi_alliance`, `price_volatility`

**New Events Needed:**
- `pipeline_explosion` (sabotage)
- `green_energy_threat` (Europe going renewable)
- `china_gas_deal` (pivot east)
- `permanent_customer_loss` (overplayed the weapon)

**Target:** 80%+ branching

### 2. Sanctions_International (11 events, ~2 hours)

**Core Storyline:** Western economic warfare escalation

**Key Events to Redesign:**
- `sanctions_incoming` → add: `swift_cutoff`, `asset_freezes`, `elite_panic`
- `asset_freeze_escalation` → add: `compensation_demands`, `oligarch_flight`, `elite_rebellion`
- `brain_drain_sanctions` → add: `tech_sector_collapse`, `engineer_exodus`, `innovation_loss`

**New Events Needed:**
- `sanctions_evasion_network` (gray markets)
- `china_bailout` (unfavorable terms)
- `import_substitution_failure` (can't make advanced tech)
- `economic_adaptation` (new normal after 2 years)

**Target:** 80%+ branching

### 3. Succession_Power (13 events, ~2 hours)

**Core Storyline:** Managing rivals, succession, coups

**Key Events to Redesign:**
- `oligarch_rival` → add: `power_struggle`, `kompromat_war`, `assassination_risk`
- `general_power_grows` → add: `coup_risk`, `loyalty_test`, `purge_decision`
- `succession_question` → add: `grooming_successor`, `power_vacuum`, `elite_positioning`

**New Events Needed:**
- `coup_attempt` (they make their move)
- `purge_loyalists` (paranoia escalates)
- `successor_problem` (heir turns against you)
- `palace_coup` (sudden power shift)

**Target:** 80%+ branching

### 4. Social_Movements (11 events, ~2 hours)

**Core Storyline:** Protest movements → organized resistance

**Key Events to Redesign:**
- `student_protests` → add: `crackdown_blowback`, `movement_grows`, `international_support`
- `protest_movement` → add: `general_strike_threat`, `color_revolution_risk`, `mass_arrests`
- `university_occupation` → add: `student_martyrs`, `siege_begins`, `international_observers`

**New Events Needed:**
- `mass_protest_mobilization` (huge crowds)
- `organized_resistance` (it's serious now)
- `exile_leaders` (they fled to the West)
- `movement_crushed` (repression succeeded)

**Target:** 80%+ branching

### 5. Domestic_Crisis (11 events, ~1.5 hours)

**Core Storyline:** Economic crises and domestic problems

**Key Events to Redesign:**
- `food_price_inflation` → add: `bread_riots`, `rationing`, `subsidy_spiral`
- `ruble_collapse` → add: `bank_run`, `savings_lost`, `dollar_shortage`
- `infrastructure_collapse` → add: `bridge_falls`, `public_death`, `negligence_exposed`

**New Events Needed:**
- `hyperinflation_crisis` (out of control)
- `pension_crisis` (can't pay retirees)
- `utility_failures` (power/water/heat)
- `housing_crisis` (people freezing)

**Target:** 80%+ branching

### 6. Misc (67 events, ~5-6 hours)

**Largest category** - focus on top 30-40 most important events

**Priority Events:**
- All `onceOnly: true` events (major storyline beats)
- High `weight` events (appear frequently)
- Events referenced by other events

**Strategy:**
1. Sort events by importance
2. Add branching to top 40 events first
3. Test - should get to 50% overall
4. Add branching to remaining 27 events
5. Final test - should hit 60-70% overall

**Target:** 60%+ branching (acceptable for misc category)

---

## Implementation Workflow

### Daily Session (2-4 hours)
1. **Choose one category** (start with smallest)
2. **Read the category file**
3. **For each event:**
   - Check if choices have `addToPool`
   - If not, add 2-3 consequence events per choice
   - Use branching patterns above
4. **Test:** `node analyze-events.js`
5. **Check branching ratio** for that category
6. **Iterate** until 80%+ branching
7. **Commit:** `git add -A && git commit -m "Redesign [category]"`

### Testing Commands
```bash
# Full analysis
node analyze-events.js

# Check specific category branching
grep -c "addToPool" events/events_energy_pipeline.js

# View branching statistics
cat EVENT_ANALYSIS.md | grep "Branching Analysis" -A 5

# Test in browser
open index.html  # Check debug menu → Event Tree Structure
```

### Quality Checklist
For each redesigned category:
- [ ] 80%+ of choices have `addToPool`
- [ ] Each choice adds 2-3 events on average
- [ ] Event chains make narrative sense
- [ ] Follows tone/style guidelines
- [ ] No syntax errors (file loads in game)
- [ ] Analyzer shows improvement

---

## Estimated Timeline

**Total:** 16-20 hours of work

| Category | Events | Estimated Time | Priority |
|----------|--------|----------------|----------|
| energy_pipeline | 12 | 2h | HIGH |
| sanctions_international | 11 | 2h | HIGH |
| succession_power | 13 | 2h | MEDIUM |
| social_movements | 11 | 2h | MEDIUM |
| domestic_crisis | 11 | 1.5h | LOW |
| misc | 67 | 5-6h | LOW |

**Phase 1** (6-8 hours): Redesign high-priority categories
- Target: Get to 40% overall branching

**Phase 2** (4-6 hours): Redesign medium-priority categories
- Target: Get to 50% overall branching

**Phase 3** (6-8 hours): Redesign misc + polish
- Target: Get to 60%+ overall branching

---

## Success Metrics

### Minimum Viable (Phase 1 Complete)
- ✅ War_military: 100% branching
- ✅ Energy_pipeline: 80%+ branching
- ✅ Sanctions_international: 80%+ branching
- ⏸️ Others: 20-30% branching
- **Overall: 40%+ branching**

### Target (Phase 2 Complete)
- ✅ War_military: 100%
- ✅ Energy, Sanctions: 80%+
- ✅ Succession, Social: 80%+
- ⏸️ Domestic, Misc: 30-40%
- **Overall: 50%+ branching**

### Ideal (Phase 3 Complete)
- ✅ All specific categories: 70-90% branching
- ✅ Misc: 60%+ branching
- **Overall: 60-70% branching**
- Most games won't run out of events

---

## Tips & Tricks

### Speed Up Development
1. **Don't create every event immediately**
   - Reference events that don't exist yet
   - Create them in batches later
   - Analyzer will show warnings (that's OK)

2. **Use find/replace for patterns**
   ```javascript
   // Find: effects: {
   // After each one, check if addToPool exists
   ```

3. **Copy successful patterns**
   - War_military has great examples
   - Copy branching structure, change event IDs

4. **Test in groups**
   - Redesign 3-4 events
   - Test
   - Redesign 3-4 more
   - Test again

### Avoid Common Mistakes
1. ❌ Don't add branching to basic recurring events unnecessarily
   - Events like "A Quiet Quarter" should stay simple
   - Focus on storyline events

2. ❌ Don't create circular dependencies
   - Event A → Event B → Event A (infinite loop)
   - Analyzer will catch this eventually

3. ❌ Don't add too many events per choice
   - 2-3 is good
   - 5+ is too many (pool floods)

4. ❌ Don't forget `onceOnly: true` for major events
   - Storyline conclusions should happen once
   - Recurring events can repeat

### AI Assistant Prompts
If using AI to help:

```
Add addToPool with 2-3 consequence events to each choice in this event that doesn't have it. Use these patterns:
- Repression → underground_resistance, martyrs, international_condemnation
- Corruption → scandal_risk, investigation, elite_resentment
- Economic → crisis_escalates, public_suffering, fiscal_pressure

Event: [paste event code]
```

---

## Next Steps

1. **Immediate:** Redesign energy_pipeline (2 hours)
2. **Today:** Redesign sanctions_international (2 hours)
3. **Tomorrow:** Redesign succession_power + social_movements (4 hours)
4. **Next:** Tackle misc category in phases (6 hours)
5. **Final:** Polish, test, iterate (2-4 hours)

**Total: 16-20 hours of focused work**

---

## Tools Available

- `analyze-events.js` - Full event analysis + version updates
- `EVENT_ANALYSIS.md` - Generated analysis report
- `event-tree.json` - Frontend debug data
- `AUTOMATION.md` - Tool usage guide
- `STORYLINES.md` - Storyline reference
- `TONE_AND_STYLE.md` - Writing guide
- `DESIGN_GUIDE.md` - Event design patterns

---

## Questions?

If unclear about:
- **Branching strategy** → Review war_military examples
- **What events to create** → Check STORYLINES.md for ideas
- **Tone/style** → Read TONE_AND_STYLE.md
- **Technical issues** → Run analyzer, check warnings

**Remember:** Progress > Perfection. Get to 50% branching first, then polish.
