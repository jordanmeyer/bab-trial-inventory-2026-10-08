# Simulated student conversation
This is a simulated student trial conducted by coordinating agents, not a real student interview or user research.

## Planning — actual exchanged messages
Builder: Who uses this and what decision do they make? Proposed first version: lost-sales single-SKU simulation; discrete uniform integer daily demand min..max, fixed seed; opening arrivals, demand/sales, then end-of-day reorder based on inventory position (stock + outstanding orders), fixed order quantity and integer lead time >=1. Is this your model? Choose horizon/default parameters and describe a plausible wrong result or misleading interpretation. Should no-demand fill rate display N/A?

Simulated student: I am an MBA operations student testing a small retailer's reorder policy for one item. I agree to your lost-sales model and exact event order: arrivals at start of day, integer demand and sales, then an end-of-day order based on inventory position including outstanding stock. Place a single fixed-size order when position is at or below the reorder point. Default initial stock 10, min demand 0, max demand 8, reorder point 5, order quantity 10, lead time 2 days, horizon 30 days, seed 42. Lead time L means an order placed end of day d arrives start of day d+L. Lost demand is not backlogged. Horizon capped at 365 days, stocks/demand/orders at 10,000 units; seed nonnegative 32-bit integer. Show no-demand fill rate as N/A. I care about fill rate, unmet demand, and orders placed. A wrong result would sell stock that hasn't arrived or reorder every day because outstanding orders were ignored. Explicitly say uniform demand is a teaching assumption, not a forecast. I agree to this model; no calibration or optimization needed.

Builder implementation choices: 32-bit LCG and strict whole-number validation make the agreed stochastic model reproducible. Parent authorized routine app design choices within the agreed scope. Independent hand examples, timing boundaries, conservation and a predeclared statistical sanity tolerance are recorded in PLAN.md before implementation.


## Evaluation assumption review
Builder: Please confirm the fixed inclusive-uniform demand, deterministic seed, and limitations: no calibration, seasonality, supplier delays, costs or optimization; this is not a forecast.

Simulated student (parent coordinator relaying its response): Accepts the uniform teaching model and limitations. The browser-discovered reset bug must be repaired before final evaluation.


## Version 2 request after live verification
Simulated student: Add “Load delayed-delivery example” preset stock 5, min=max 4, reorder 3, quantity 6, lead 2, days 5, seed 42 to see how outstanding orders affect policy.

Builder: The preset will load and run the already hand-derived five-day case. It will share the ordinary validation/rendering path, preserve Reset defaults, and change no model formulas. The parent coordinator will test the new control before the second push.
