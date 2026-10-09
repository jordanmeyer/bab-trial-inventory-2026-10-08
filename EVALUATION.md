# Inventory trial evaluation

## Independent expectations and scope
PLAN.md was written before the model and contains hand-derived stock transitions, lead-time/threshold limits, the specified RNG recurrence, conservation, invalid input cases and a predeclared statistical tolerance. The coordinating agent independently confirmed the five-day deterministic sequence and the first five seed-42 demands using separate arithmetic. Uniform demand is a teaching assumption, not a forecast; correct code does not certify a retailer's policy.

Relevant source: `app/`, `tests/`, `.github/workflows/`; no other executable tooling exists. The Pages workflow is copied unchanged from frozen Browser App Builder 0.1.1. App and README source links target the authorized repository name; coordinator confirmed it was absent before planned creation. No remote operation has been performed by this app agent.

## Round 0 — exploratory numerical checks, not browser evaluation
Existing Node v22.19.0 imported the actual `app/model.js` through `--experimental-default-type=module --input-type=module`. This was shell execution, not a DOM/browser substitute. Exact five-day transition tuples matched PLAN.md; first five seed-42 demands matched [2,0,5,2,3]. The predeclared demand-mean check produced 3.9734794520547947, inside [3.92,4.08]. This does not establish UI behavior or network isolation.

Observed default model output (exploratory only, not an independent fixture): demand 123, sales 90, unmet 33, receipts 90, orders 9, ending stock 10, outstanding 0, fill rate 90/123.

No numerical defects were observed in these exploratory checks. Source/whole-file review and a separate simplification pass retained a single model module and canonical input limits; no framework, build tooling, compatibility layer or unused features were added. `git diff --check` passed. Browser module/tests, desktop/narrow rendering, focus/keyboard, errors/reset, actual contrast and observed network/console are pending the coordinating agent's checks. Do not call this round publishable evaluation.
