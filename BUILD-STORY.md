# Inventory teaching revision

The October 8 original was built in an automated Browser App Builder 0.1.1 trial with a recorded simulated planning conversation. This October 9 revision responds to the explicit example-app checklist, not an invented student request or learning outcome.

The [worked lesson](https://jordanmeyer.github.io/bab-trial-inventory-2026-10-08/learn.html) contains prediction tasks, hidden worked answers, model boundaries and a bounded extension. The application stays plain HTML/CSS/JavaScript; calculation functions remain separately testable and files stay local to the visitor browser. See EVALUATION.md for exact checks and remaining human evidence.


An actual narrow-chart review found that a fixed SVG viewBox shrank axis labels to about 6.7 CSS pixels. The chart now draws at its container's measured width, with inherited readable text and font-relative margins/height. It redraws when that container changes, preserving the same stock, arrival and one-day-point values. The failure and actual retest are recorded separately in EVALUATION.md.
