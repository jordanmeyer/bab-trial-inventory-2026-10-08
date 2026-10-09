# Inventory policy lab

A self-contained teaching simulation for one retailer item. Explore daily stock, lost sales and replenishment under a fixed reorder policy. This is an original synthetic Browser App Builder 0.1.1 trial with a simulated student conversation, not real student research.

## Use
Change assumptions, then select **Run simulation**. **Reset defaults** restores the original scenario and reruns. **Load delayed-delivery example** runs a five-day teaching case with two stockout days, arrivals on days 3 and 5, and a final order still outstanding. Read fill rate, unmet demand, orders placed, ending stock and the daily ledger. Seed and inputs reproduce the same sequence. Edited inputs hide old results until rerun; invalid fields explain what to fix. No inputs are sent to any service or persisted.

Arrivals occur before demand. After sales, one order is placed if stock plus outstanding units is at or below the reorder point. Lead time 2 means an end-of-day-1 order arrives at the start of day 3. Unmet demand is lost. Demand is uniform over integer bounds; this is a teaching assumption, not a forecast. PLAN.md defines precise limits, formulas, independent expected cases and rounding. No calibration, costs, optimization, seasonality or supplier uncertainty.

## Preview and checks
Use existing Python from this directory: `/usr/bin/python3 -m http.server 9102 --bind 127.0.0.1`. Open http://127.0.0.1:9102/app/ and http://127.0.0.1:9102/tests/ . No runtime installation, package manager or build is required. Tests visibly remain loading or error until modules finish. EVALUATION.md records actual browser checks against committed source.

## Provenance and publication
All data and fixtures are original and synthetic; no third-party libraries or assets. Plain HTML, CSS and JavaScript modules. Campus Designer's default visual guidance uses unchanged #012169 navy. Georgia headings and Arial body are local system-font substitutions for EB Garamond/Open Sans; no font files are redistributed or fetched. No university marks or affiliation/endorsement are implied.

[Source and reports](https://github.com/jordanmeyer/bab-trial-inventory-2026-10-08). [Live app](https://jordanmeyer.github.io/bab-trial-inventory-2026-10-08/). DEPLOYMENT.md records the verified revisions and workflow runs. The copied frozen Pages template packages only app/ into ignored dist/; reports and tests stay in source. Parent agent coordinates GitHub account operations and browser verification. Follow revise → evaluate → freshness check → ordinary commit/push → verify exact deployed revision.
