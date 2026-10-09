# Decisions
- 2026-10-08, simulated student: one-item lost-sales teaching model. No calibration or optimization. Synthetic parameters only.
- Morning receipts precede sales; evening ordering uses stock plus outstanding units. At most one fixed-size order per day, triggered inclusively at the reorder point. Lead time counts from order day to receipt day.
- Seeded discrete uniform integer demand; reproducible LCG specified in the plan. N/A fill when demand is zero. No forecast or endorsement claims.
- Native HTML/CSS/ES modules and browser tests, no dependency/runtime installs. Bundled Campus Designer guidance, local system-font substitutions, no external assets.
- Authorized public repository: jordanmeyer/bab-trial-inventory-2026-10-08. Parent coordinates repository creation, pushes, Pages settings, browser evaluation and live checks.
