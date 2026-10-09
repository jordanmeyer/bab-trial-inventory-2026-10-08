# Decisions
- 2026-10-08, simulated student: one-item lost-sales teaching model. No calibration or optimization. Synthetic parameters only.
- Morning receipts precede sales; evening ordering uses stock plus outstanding units. At most one fixed-size order per day, triggered inclusively at the reorder point. Lead time counts from order day to receipt day.
- Seeded discrete uniform integer demand; reproducible LCG specified in the plan. N/A fill when demand is zero. No forecast or endorsement claims.
- Native HTML/CSS/ES modules and browser tests, no dependency/runtime installs. Bundled Campus Designer guidance, local system-font substitutions, no external assets.
- Authorized public repository: jordanmeyer/bab-trial-inventory-2026-10-08. Parent coordinates repository creation, pushes, Pages settings, browser evaluation and live checks.

- Version 2, simulated student: add one preset for the existing independent delayed-delivery example. This exposes a useful teaching sequence without changing the model or adding storage/export.

- Publication correction: version the changed entry script as `app.js?v=2` to prevent a stale version-1 script being paired with new preset markup. Trigger was an observed pricing-trial cache failure, not an observed inventory failure. Keep unchanged model import stable; no build tooling.
