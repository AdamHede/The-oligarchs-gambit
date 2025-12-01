# Test Suite for Event System 2.0

## Running Tests

```bash
# Run all tests
npm test

# Run with watch mode (auto-rerun on changes)
npm run test:watch

# Run specific test file
node --test tests/condition-eval.test.js
```

## Test Files

- `condition-eval.test.js` - Condition DSL evaluator tests (30+ tests)
- `effect-applier.test.js` - Effect application tests (20+ tests)
- `deck-manager.test.js` - Deck operations tests (20+ tests)
- `game-state.test.js` - State management tests (15+ tests)
- `game-engine.test.js` - Integration tests (20+ tests)
- `schema.test.js` - Schema validation tests (20+ tests)

## Coverage

The test suite covers:
- ✅ All comparison operators (eq, neq, gt, gte, lt, lte, between)
- ✅ Logic operators (all, any, not)
- ✅ Edge cases (empty conditions, missing values, bounds)
- ✅ Stat/counter/flag operations
- ✅ Deck add/remove/draw operations
- ✅ Weighted random selection
- ✅ Game state initialization and time advancement
- ✅ Full game flow integration
- ✅ Game over conditions
- ✅ Error handling
- ✅ Schema validation

## Test Results

Run `npm test` to see detailed test results.

