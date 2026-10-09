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

## Round 2 — passing evaluation after reset repair
Tested full commit: `dd5009db75111a09266c8a44a3ab96e07837a074`. Paths: `app/`, `tests/`, `.github/workflows/`. Agreed PLAN.md is present at this checkpoint and substantively unchanged. Evaluation performed by parent coordinator with actual browser tools at the no-store `http://127.0.0.1:9100/inventory/app/` and `/inventory/tests/` previews. Existing loopback server is a cache-control preview aid, not app/deployment runtime tooling.

Actual repaired-source observations:
- All 10 browser test groups rerun: **10 passed, 0 failed**. They include complete hand-derived stock transitions, lead-time and inclusive-threshold boundaries, no demand, seed recurrence/repetition, 365-day conservation over 20 seeds, demand bounds/integrality, the predeclared statistical interval, upper limits, and 14 rejected invalid cases.
- Changed initial stock, then pressed Enter on Reset defaults: defaults and results restored successfully.
- Set zero demand, then clicked Reset defaults: defaults and results restored successfully.
- Seed 42, five days: demand sequence 2,0,5,2,3; ending stock 8 and one order, matching the independent recurrence and ledger calculation.
- Zero-demand scenario: N/A fill, stock 10 and no orders. Expected because demand is zero and initial stock exceeds the reorder point.
- Browser logs retain the earlier timestamped reset error; **no new errors after the fix**. Earlier error remains documented in Round 1.

Unchanged behavior verified in Round 1 carries forward: five-day fixed-demand known answer and exact ledger; reversed-bound validation, hidden stale results and focus; legible desktop/narrow screenshots at iframe widths 1439/319 with no page overflow. The repair changed only a button id and its selector; model, tests, layout and workflow are unchanged. Parent confirmed assumptions and limits with the simulated student.

Freshness checked immediately before the repaired run and again after the observations: committed/staged/unstaged relevant-path diffs all exited 0; `git ls-files --others -- app/ tests/ .github/workflows/` was empty, including ignored source; baseline PLAN.md existed, current plan diff was empty and plan status clean. Whole-project inventory found no extra executable tooling. Review of all three commits found only original/synthetic source, approved attribution and public-safe reports. No force push, history rewrite or credentials.

Result: required model and exercised UI checks pass; ready for authorized publication with limitations below. Report-only commits may follow without changing this evaluated checkpoint.

### Inspection limits
Browser version, full network capture and 200% text zoom were not recorded. No universal network-isolation or accessibility certification is claimed. Source review found local modules/styles only and no service requests, storage or remote assets. The rendered views were visually legible; computed-color contrast and full assistive-technology behavior were not instrumented. This stochastic model sanity check does not validate real retailer demand or prescribe an optimal policy.


## Version 2 build handoff — evaluation pending
The simulated student requested a delayed-delivery preset after the verified first deployment. PLAN.md now includes this agreed interaction and its independent known answer. Build adds one native button and a handler that fills the eight inputs and reuses the existing run/validation/render path. No model, test, style or workflow change. Whole-file source review and a separate simplification pass found no need for a preset abstraction or an implementation-mirroring test. Existing model cases already cover the exact preset; actual mouse/keyboard activation, error clearing, reset, and narrow wrapping must be checked by the coordinator before publication.

## Round 3 — version 2 passing evaluation
Tested full commit: `a3bbfc08b48bb9ec7fc79b52f2376c16f9401e15`; paths `app/`, `tests/`, `.github/workflows/`. The committed PLAN.md includes the simulated student's agreed preset addition. Its model formulas, seed specification and earlier independent expected examples are unchanged; acceptance adds the new preset, error recovery and preserved reset behavior.

Parent coordinator's actual browser observations on the no-store local preview:
- Induced minimum 9 > maximum 8 validation error; pressed Enter on **Load delayed-delivery example**. All eight fields changed to the agreed values, errors cleared, and results became fill 75%, unmet 5, orders 3, ending stock 2, pending 6, with the exact independent five-day ledger.
- Clicked Reset defaults, then clicked the preset: same exact five-day ledger. Reset restored the original defaults between runs.
- Browser test page rerun: **10 passed, 0 failed**. Existing model checks cover the preset's full receipt/order sequence.
- Rechecked iframe widths 319 and 1439: no page overflow. New button visually fit the desktop layout and stayed within the narrow width.

Result: affected version 2 behavior passes. No new numerical model behavior was introduced. Source/plan freshness checked before and after the run: all three relevant-path diffs exited 0, untracked relevant listing was empty, tested PLAN.md existed and current plan diff/status were empty. Whole-project tooling inventory unchanged. Earlier failed reset round is preserved. Inspection limitations from Round 2 still apply; this round makes no additional network-capture, text-zoom or accessibility claims. Report-only changes may follow without retesting.


## Preventive publication cache correction — retest pending
After the second push, the coordinator observed a separate pricing trial serve new HTML with an older cached entry script, leaving its newly added preset inactive. This cache failure was observed in pricing, **not in inventory**. Inventory had the same unchanged entry-script URL across versions, so the coordinator requested a preventive correction before its final live claim: reference `./app.js?v=2` from index.html. The entry script changed in version 2; model.js did not, so its import URL remains unchanged. No model, tests, workflow or agreed behavior changes and no build system added. A new committed checkpoint and actual browser retest are required before the authorized corrective push. This does not rewrite or relabel the previous evaluation/deployments.

### Inventory second-live failure subsequently observed
After the preventive correction was prepared locally but before it was pushed, the coordinator also observed the failure on inventory's second live deployment. [Run 37877217350](https://github.com/jordanmeyer/bab-trial-inventory-2026-10-08/actions/runs/37877217350) succeeded at `183d0c9b3f8299bc6dd3ec9a9a20711755abd416`, but live navigation followed by ordinary reload showed the new preset button while clicking it left default inputs unchanged and gave no status update. Therefore the second deployment's live acceptance **failed** despite a successful workflow and passing local checks. The correction is now a response to an observed inventory update failure as well as the earlier pricing finding. The preceding preventive label describes what was known when the local correction was prepared; it is not a claim that inventory remained unaffected.

## Round 4 — versioned entry-script correction passes locally
Tested full commit: `6976d8aeafb902bbcead3a1695f2680ae0fda85f`; relevant paths `app/`, `tests/`, `.github/workflows/`. Parent actual browser retest observed the corrected local entry load, keyboard activation of the delayed-delivery preset with fill 75%, unmet 5, orders 3, ending 2, pending 6 and the correct independent five-day ledger. Browser tests rerun: **10 passed, 0 failed**. Prior Round 3 validation, mouse/reset and responsive checks apply to the unchanged implementation/layout; only the HTML entry-script URL changed. PLAN.md and its agreed meaning are unchanged.

All source/plan freshness checks passed before and after this retest: committed/staged/unstaged relevant diffs exited 0, untracked relevant listing empty, baseline plan exists, current plan diff/status empty. No extra executable tooling introduced. The parent authorized the corrective third push. This is a passing local retest, not evidence of live cache repair; actual live acceptance after the exact corrective workflow remains required. Earlier failed live acceptance is preserved above.


## October 9 checklist correction — source checkpoint and bounded evaluation

Source checkpoint: **cc3f6e1d183508aa658db0ac94504f73745d87ed**. Relevant paths: `app/`, `tests/`, `.github/workflows/`, `PLAN.md`, `BUILD-STORY.md`. The current plan includes sample-path framing, precise inventory-position timing, controlled comparison, paginated ledger/native SVG and strict local run-record export/restore. This revision follows the real user's checklist instruction; it is not a new simulated-student approval or an observed learning outcome. Earlier failed reset/cache and passing local rounds remain above.

Independent full source/model/HTML/styles/lesson review passes after three review findings were repaired: imported assumptions must be actual JSON numbers and validate before mutation; editing comparison assumptions clears its previous result; a one-day run has a closing-stock point instead of an invisible single-point polyline. Browser-history input mismatch invalidates results. Current local CSS/module URLs use version 4. The authored layout fixture is committed; workflow remains unchanged and deploys only `app/`. No charting dependency or automatic storage was added.

### Actual local browser observations supplied by the coordinator

The coordinator used the Codex in-app browser on the configured Mac and reported **13/13 browser model cases passed**. The delayed preset displayed the full five-row ledger, 75% fill, 15/20 sales, ending on-hand 2 and pipeline 6. The independent derivation in PLAN remains authoritative: daily arrivals 0,0,6,0,6; sales 4,1,4,2,4; closing 1,0,2,0,2; orders 6,0,6,0,6; next due 3,3,5,5,7. Thus pipeline 6 is a final-day order due day 7, not stock received inside the report.

The current boundary/comparison evidence is in the course repository at `evidence/browser-app-builder/checklist-corrections/2026-10-09/inventory/browser-boundaries.json`.

| Actual case | Observed fill / sales | Distinct observed explanation or state |
| --- | --- | --- |
| Zero demand | N/A;0/0 | No demand tested the policy; not evidence of 100% service; average closing5 |
| Zero initial stock | 50%;10/20 | Three days with unmet demand; day 1 position0 orders 6 due day 3 |
| Order quantity1 | 40%;8/20 | Four days with unmet demand; average closing0.2; pipeline2 |
| Lead beyond five-day horizon | 25%;5/20 | No receipts; pipeline 6; first order due day 7 |
| Position exactly equal to point 3 | 85%;17/20 | First decision3+0=3≤3 orders 6 |
| One-day horizon | 100%;4/4 | Closing1, pipeline 6 due day 3; actual SVG contains one circle |

Actual paired comparison held the demand path constant: point 3/order 6 gives 75%, average 1, ending 2, pipeline 6; point 6/order 6 gives 85%, average 1.4, ending 0, pipeline 12. Editing a comparison input cleared the old table and showed the pending message. For a 365-day run, 24 Next activations reached Days 361–365 with five rows and Next disabled. The complete export/restore UI task and actual one-day chart readability remain distinct from numerical/DOM observations.

### Enlarged-text failure and repair

The coordinator observed a real heading overflow in the authored 200% text fixture: a 319px inner frame had 419px document width. Root repaired heading wrapping and the section-title heading's minimum width; the retest reported 319px document width at 319px inner width. The failed observation is retained here. This verifies the measured overflow correction, not readability or reachability of every control in every state. A current narrow result screenshot is retained by the coordinator at `evidence/browser-app-builder/checklist-corrections/2026-10-09/inventory/narrow-result.png`.

`tests/layout.html` selects a nominal 320px bordered frame, so actual inner width must be recorded. Its200% option snapshots computed fonts and doubles existing elements; it is authored text enlargement, not device zoom. New DOM created after interaction needs enlargement reapplied. Remaining gates include complete 320px and enlarged-text task inspection, saved-record download/rejection/reproduction, complete chart/table keyboard interpretation, actual screen-reader operation and an uncoached novice attempt. Participant scripts do not establish participant completion.

Source/staging whitespace checks passed. Source/plan/tests were committed before this report-only addition; final relevant-source/PLAN/BUILD-STORY diffs against that checkpoint were empty, as were ordinary and ignored untracked relevant-file listings. Only this evaluation changed. No push or current live deployment check has occurred. Source/model and exercised-browser results pass within the scope above; no full checklist closure or publication approval is claimed.


### Current-checkpoint browser suite confirmation

After the source/report commits, root reran the actual browser suite against the current files: **13/13 passed, zero failures**, including the final review labels and current asset references. Source checkpoint remains `cc3f6e1d183508aa658db0ac94504f73745d87ed`; no app/model/test change followed the run. For Sales this supersedes the earlier timing limitation on the model-suite observation; the prior observation remains truthful history. This new suite result does not close pending actual layout, export, mobile-keyboard, screen-reader or novice tasks. No push occurred.
