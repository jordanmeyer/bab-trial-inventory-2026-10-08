# Inventory policy lab — agreed plan

## Purpose and scope
An MBA operations student explores a small retailer's single-item reorder policy. Change synthetic assumptions and inspect daily stock, unmet demand, fill rate, and orders placed. This is a teaching simulation, not calibrated forecasting, inventory optimization, or a business recommendation. No accounts, backend, remote services, imports, export, storage, or costs in version 1. All inputs and fixtures are original synthetic examples; no third-party data.

## Agreed model
Units are indivisible items and whole days. Start with no outstanding orders. Each day:
1. Receive orders due that morning into on-hand stock.
2. Draw daily integer demand uniformly from inclusive minimum..maximum. Sell the smaller of available stock and demand. Unmet demand is lost, never carried forward.
3. Compute inventory position = remaining stock + all outstanding order units. If position is at or below the reorder point, place exactly one fixed-quantity order. An order at the end of day d with lead time L arrives at the start of day d+L. Multiple orders may be outstanding.

Output a complete day ledger with arrivals, demand, sales, unmet demand, closing stock and quantity ordered. Summaries: total demand/sales/unmet, demand fill rate = sales / demand × 100, orders placed and ending stock. Zero total demand gives N/A fill rate, never 100%. Format percentages to one decimal; arithmetic uses integers and full precision. Orders due after the horizon remain outstanding; do not count as arrivals.

Defaults: initial stock 10; demand 0..8; reorder point 5; order quantity 10; lead time 2; horizon 30; seed 42. All fields are required integers. Initial stock, demand bounds and reorder point 0..10,000; order quantity 1..10,000; lead time 1..365; horizon 1..365; seed 0..4,294,967,295. Demand minimum must not exceed maximum. Reject invalid input with a field-associated error, keep it editable, and clear stale results until valid rerun.

Randomness: an explicitly specified 32-bit LCG, xₙ₊₁ = (1664525 × xₙ + 1013904223) modulo 2³²; u = x / 2³²; demand = minimum + floor(u × (maximum − minimum + 1)). Seed resets on every run. Same inputs/seed reproduce exactly; fixed min=max is seed-independent. This simple generator serves reproducible teaching examples, not cryptography or an assurance of realistic demand.

## Independent examples established before implementation
- Five-day receipt and lost-sales sequence: initial 5, fixed demand 4, reorder point 3, quantity 6, lead 2. Day tuples (arrivals, sales, unmet, closing, ordered) are (0,4,0,1,6), (0,1,3,0,0), (6,4,0,2,6), (0,2,2,0,0), (6,4,0,2,6). Manual arithmetic gives demand 20, sales 15, unmet 5, receipts 12, final stock 2, three orders, one still outstanding (6 units), fill rate 75%. Outstanding orders prevent extra orders on days 2 and 4. A due day beyond the horizon must remain outstanding.
- Lead time 1: initial 0, fixed demand 1, reorder 0, quantity 2, three days. Day 1 loses 1 and orders 2; day 2 receives 2, sells 1, closes 1; day 3 sells 1, closes 0, orders 2. Sales 2, unmet 1, two orders, fill 2/3 (66.7% displayed).
- Zero demand, stock 7, reorder 0: no sales, no orders, final stock 7, fill N/A.
- Exact threshold: initial 5, demand 0, reorder 5, quantity 2, horizon 1: one order because 5 ≤ 5; final stock 5, outstanding 2.
- Seed 42 LCG's first five states by integer recurrence: 1083814273, 378494188, 2479403867, 955863294, 1613448261. Scale to inclusive demand 0..8 gives 2,0,5,2,3. With other defaults and five days, closing stock is 8,8,3,1,8, receipts 10 on day 5, one order on day 3, demand/sales 12, unmet 0.
- Conservation each day: prior closing + arrivals − sales = closing; demand = sales + unmet. Over horizon: initial + received − sales = final; ordered − received = outstanding. Check nonnegative integral stock/sales/unmet and demand bounds over 365-day sequences.
- Statistical check fixed in advance: 100 seeds × 365 days of demand 0..8, mean within 0.08 of 4. Discrete-uniform variance is 80/12 = 6.6667; independent-draw standard error for 36,500 draws is about 0.0135, so tolerance is roughly six standard errors. This is a generator sanity check, not proof of independent real-world demand or accuracy.
- Reject empty, negative, fractional, nonfinite and out-of-range inputs; reject reversed demand bounds. Exercise upper allowed values and exact seed 0.

## Interaction and visual acceptance
Responsive form and results ledger, Run simulation, and Reset defaults. Values are units/days and assumptions stay visible. Initial default run loads automatically. Mark edited inputs as needing rerun. At 320px and desktop, no page-level horizontal overflow; the wide ledger has its own labeled keyboard-scrollable region. Keyboard can reach inputs, submit, reset, ledger, and source link with clear focus. Results/status use live announcements; every input has an explicit label. Default visual direction uses unchanged navy #012169, Georgia headings and system Arial body; no remote assets or institutional marks/endorsement.

## Agreement
The parent agent supplied the simulated student's explicit agreement to the model, defaults, event order, caps, lost-sales interpretation and N/A behavior on 2026-10-08. The two misleading outcomes identified were selling unavailable stock and ordering again while overlooking outstanding stock. All material model choices are resolved. Transcript is labeled simulated in SIMULATED-CONVERSATION.md. Rendered checks are coordinated by the parent agent and must be recorded as actual observations rather than inferred from source.


## Agreed version 2 improvement
After the first live deployment, the simulated student requested a **Load delayed-delivery example** preset to show outstanding orders in the policy. It sets initial stock 5, demand min=max=4, reorder point 3, order quantity 6, lead time 2 days, horizon 5 days, seed 42, then runs immediately. Expected output is the independently derived five-day example above: fill 75%, unmet 5, three orders, ending stock 2, outstanding 6. Daily orders are 6,0,6,0,6; arrivals are 0,0,6,0,6. No formula or assumption changes. Preset activation works by mouse and keyboard; Reset defaults still restores the original scenario. The action must clear prior field errors through the ordinary run path.
