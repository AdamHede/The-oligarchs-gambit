# Codebase Cleanup Plan

This document outlines the cleanup and refactoring opportunities identified in The Oligarch's Gambit codebase.

## Executive Summary

The codebase has accumulated significant technical debt, primarily from a **partially implemented storyline system migration**. A new tree-based storyline system was built (`/storylines/` and related engine files) but never integrated into the main game, which still uses the legacy event system. This has left ~90,000+ lines of code orphaned.

---

## 1. Orphan Files - HIGH PRIORITY

### 1.1 Unused HTML Files

| File | Status | Recommendation |
|------|--------|----------------|
| `index-legacy.html` | Not linked, legacy version | **DELETE** |
| `event-lab.html` | Debug tool, only referenced from index-legacy.html | **DELETE or DOCUMENT** as standalone tool |
| `event-graph.html` | Mermaid-based graph tool, not linked | **DELETE or DOCUMENT** as standalone tool |
| `reference/folio-edition-engine.html` | Historical reference | **DELETE** (keep in git history) |

**Estimated savings:** 4 files removed

### 1.2 Unused Engine Files

| File | Lines | Issue | Recommendation |
|------|-------|-------|----------------|
| `engine/storyline-themes.js` | ~160 | Exported but never imported anywhere | **DELETE** |

### 1.3 Unused Example File

| File | Lines | Issue | Recommendation |
|------|-------|-------|----------------|
| `events/example.js` | ~267 | Imported but commented out | Keep as documentation, or **DELETE** |

---

## 2. Orphan Storyline System - CRITICAL

The entire tree-based storyline system is implemented but **never used**. The main game (`game.js`) imports `GameEngineV2` and events from `events/index.js`, completely bypassing the storyline infrastructure.

### 2.1 Never-Imported Modules

| File | Lines | Exports Never Used |
|------|-------|-------------------|
| `storylines/index.js` | ~104 | All storyline definitions - never imported |
| `engine/storyline-engine.js` | ~237 | `StorylineEngine`, `createStorylineEngine` |
| `engine/event-status.js` | ~238 | `initEventStatus`, `clearEventStatus` |
| `engine/event-tracker.js` | ~417 | Partially used (exports exist but not called from game) |

### 2.2 Orphaned Storyline Definition Files (~90,000+ lines total)

These `.storyline.js` files exist but are never loaded by the game:

| File | Lines |
|------|-------|
| `storylines/war-invasion.storyline.js` | ~16,264 |
| `storylines/common.storyline.js` | ~12,327 |
| `storylines/sanctions-spiral.storyline.js` | ~12,034 |
| `storylines/religious-revival.storyline.js` | ~11,168 |
| `storylines/succession-crisis.storyline.js` | ~9,656 |
| `storylines/domestic-crisis.storyline.js` | ~7,327 |
| `storylines/energy-pipeline.storyline.js` | ~7,294 |
| `storylines/shadow-war.storyline.js` | ~7,035 |
| `storylines/popular-uprising.storyline.js` | ~6,488 |

**Total orphaned lines: ~89,593**

### 2.3 Orphaned Design Documents (no corresponding code)

| File | Issue |
|------|-------|
| `storylines/ai-dictator.md` | Design doc exists, no `.storyline.js` implementation |
| `storylines/cultural-purge.md` | Design doc exists, no `.storyline.js` implementation |
| `storylines/oligarch-rivalry.md` | Partially implemented - events reference it but no storyline file |

### Recommendation for Storyline System

**Option A: Complete the Migration** - Integrate the storyline system into the game
- Modify `game.js` to use `StorylineEngine` instead of `GameEngineV2`
- Import and register storylines from `storylines/index.js`
- This would activate ~90,000 lines of content

**Option B: Remove the Unused System** - Delete all storyline infrastructure
- Remove `engine/storyline-engine.js`, `engine/event-status.js`
- Remove `engine/storyline-themes.js`
- Remove all `storylines/*.storyline.js` files
- Remove storyline DSL exports from `engine/index.js`
- Keep the legacy event system as-is
- **This would remove ~90,000 lines of dead code**

**Option C: Archive for Future** - Move to separate branch/directory
- Move all storyline files to `archive/` or separate git branch
- Keep the codebase clean while preserving the work

---

## 3. Unused Functions and Exports - MEDIUM PRIORITY

### 3.1 Exported But Never Called

| Location | Function/Export | Recommendation |
|----------|-----------------|----------------|
| `engine/storyline-dsl.js:254` | `visualizeTree()` | **REMOVE** from exports |
| `engine/storyline-themes.js:154-160` | `STORYLINE_THEMES`, `getStorylineTheme()`, `getStorylineThemes()`, `getPrimaryTheme()`, `formatStorylineBadges()` | **DELETE** entire file |
| `engine/index.js:15` | `visualizeTree` export | **REMOVE** |

### 3.2 Duplicate Code

| Locations | Function | Recommendation |
|-----------|----------|----------------|
| `engine/effect-applier.js:14` and `tools/simulate.js` | `clamp()` | Extract to shared `utils.js` module |

---

## 4. Code Quality Improvements - LOW PRIORITY

### 4.1 Conditional Exports to Clean Up

In `engine/index.js`, some exports are for the orphaned storyline system:

```javascript
// Line 15-17: These are for orphaned storyline system
export { defineStoryline, event, choice, eventRef, compileStorylines, getEventsArray, visualizeTree } from './storyline-dsl.js';
export { EventTracker, EventStatus, createEventTracker, getEventStatusHelper } from './event-tracker.js';
export { StorylineEngine, createStorylineEngine } from './storyline-engine.js';
```

### 4.2 Legacy Format Conversion Code

`game.js:69-188` contains a large `convertEvents()` method for backward compatibility. If all events have been migrated to v2 format, this can be removed.

---

## 5. Recommended Cleanup Order

### Phase 1: Quick Wins (Low Risk)
1. Delete `index-legacy.html`
2. Delete `reference/folio-edition-engine.html`
3. Delete `engine/storyline-themes.js`
4. Remove `visualizeTree` export from `engine/index.js`

### Phase 2: Decide on Storyline System (Decision Required)
Choose Option A, B, or C from section 2.3 above.

### Phase 3: Code Consolidation
1. Extract shared `clamp()` to utils module
2. Clean up `engine/index.js` exports based on Phase 2 decision
3. Remove or document standalone HTML tools (`event-lab.html`, `event-graph.html`)

### Phase 4: Verify & Test
1. Run `npm test` to ensure no regressions
2. Run `npm run validate` to check event integrity
3. Test game in browser

---

## Summary Statistics

| Category | Files | Lines of Code |
|----------|-------|---------------|
| Orphan HTML files | 4 | ~500 |
| Orphan engine files | 1-4 | ~650-1,050 |
| Orphan storyline files | 9 | ~89,593 |
| Unused exports | 6 | ~100 |
| **Total potentially removable** | **14-18** | **~90,000+** |

---

## Questions for Decision

1. **Storyline System**: Should we complete the migration to the tree-based storyline system, or remove it entirely?
2. **Debug Tools**: Should `event-lab.html` and `event-graph.html` be kept as standalone developer tools (with documentation), or removed?
3. **Example Events**: Should `events/example.js` be kept for documentation purposes?
