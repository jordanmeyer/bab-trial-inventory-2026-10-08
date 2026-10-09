# Inventory trial evaluation

## Independent expectations and scope
PLAN.md was written before the model and contains hand-derived stock transitions, lead-time/threshold limits, the specified RNG recurrence, conservation, invalid input cases and a predeclared statistical tolerance. The coordinating agent independently confirmed the five-day deterministic sequence and the first five seed-42 demands using separate arithmetic. Uniform demand is a teaching assumption, not a forecast; correct code does not certify a retailer's policy.

Relevant source: `app/`, `tests/`, `.github/workflows/`; no other executable tooling exists. The Pages workflow is copied unchanged from frozen Browser App Builder 0.1.1. App and README source links target the authorized repository name; coordinator confirmed it was absent before planned creation. No remote operation has been performed by this app agent.

## Round 0 — exploratory numerical checks, not browser evaluation
Existing Node v22.19.0 imported the actual `app/model.js` through `--experimental-default-type=module --input-type=module`. This was shell execution, not a DOM/browser substitute. Exact five-day transition tuples matched PLAN.md; first five seed-42 demands matched [2,0,5,2,3]. The predeclared demand-mean check produced 3.9734794520547947, inside [3.92,4.08]. This does not establish UI behavior or network isolation.

Observed default model output (exploratory only, not an independent fixture): demand 123, sales 90, unmet 33, receipts 90, orders 9, ending stock 10, outstanding 0, fill rate 90/123.

No numerical defects were observed in these exploratory checks. Source/whole-file review and a separate simplification pass retained a single model module and canonical input limits; no framework, build tooling, compatibility layer or unused features were added. `git diff --check` passed. Browser module/tests, desktop/narrow rendering, focus/keyboard, errors/reset, actual contrast and observed network/console are pending the coordinating agent's checks. Do not call this round publishable evaluation.


## Round 1 — browser model checks pass, required reset interaction fails
Tested source: `2defabeda790a075f25770f6e6916d228dcba676`; relevant paths `app/`, `tests/`, `.github/workflows/`. Pre-run source/plan freshness passed. Parent coordinator used its browser tool and a no-store loopback preview at `http://127.0.0.1:9100/inventory/` to avoid stale module caching. Browser version was not reported.

Actual parent observations:
- Browser test page: 10 passed, 0 failed.
- Five-day fixed-demand UI case (initial 5, min=max=4, reorder 3, quantity 6, lead 2): fill 75%, unmet 5, orders 3, ending stock 2, outstanding 6; exact daily ledger matched the independent derivation.
- Invalid minimum 5 > maximum 4: field-associated error, hidden results, focus moved to maximum.
- Narrow iframe width 319 and desktop width 1439: no page overflow; inspected screenshot legible.
- **FAIL:** clicking or keyboard-activating Reset defaults throws `TypeError: form.reset is not a function` at app.js:44. The form-associated control id `reset` shadows the form's native reset method. This required UI failure makes the round non-passing despite all model tests passing.

Build repair: rename the button id and selector to `reset-defaults`, preserving native `form.reset()`. No model, tests, plan or workflow changes. Actual reset retest and renewed final checkpoint are required. The simulated student confirmed the uniform teaching-model assumptions and limitations, including no forecast claim, calibration, seasonality, supplier delays, costs or optimization.
