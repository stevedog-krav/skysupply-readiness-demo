# SkySupply Readiness — Concept 02

An independent, interactive aerospace supply-planning concept. It is a separate application from the original [SkySupply marketplace](https://stevedog-krav.github.io/skysupply-demo/). The original repository and application are not modified.

## What to try

1. On Overview, review the APU cast housing. The sample supplier promises Dec 12; shared constraints place the modeled median at Dec 18 and expose a Nov 30 build-week gap.
2. Switch to Supplier. For Aster Foundry, mark material and tooling ready and save. Return to OEM and review the housing: the median becomes Dec 6. The promise remains Dec 12. The largest weekly gap falls from 24 to 3 units.
3. Edit the weekly build plan or delivery-delay scenario and recalculate.
4. In Source & bridge, select the drilled-head fastener. Request the suggested 104 units. In Actions, review and approve the request: its largest projected gap falls from 104 to zero under the initial plan. Opening stock remains 220; the request contributes an expected receipt.
5. Record a simulated receipt to compare its date with the offer ETA captured at request creation. This illustrates the logging workflow, not validated predictive performance.
6. Change rental days to compare renting a service APU, buying a replacement, and renting as a bridge. Deposits are separate from expense. Loaners never add manufacturing material coverage.
7. In Data & assumptions, download a sample ERP CSV, change a synthetic row, choose it, review and apply it. Invalid dates, quantities, duplicate and unknown part numbers are rejected.
8. Export your local scenario as JSON, or reset Concept 02 independently.

Use the question-mark button for an in-app demo guide. Supplier readiness can also be searched by part or supplier.

## Honest scope

- All part numbers, organizations, prices, inventory, lead times, signals and transactions are invented. Prices are not supplier quotes. Photos are illustrative assets reused from the first prototype; they are generated product/editorial illustrations, not exact part photography.
- This is not a complete ERP, live marketplace, real purchase-order system, trained AI or calibrated forecast. No real suppliers or customers are connected. No company partnership is implied.
- The fixed planning snapshot is November 9, 2026. Twelve weekly demand buckets extend through February 1, 2027. Calendar days are used; no working-day, holiday, shipping disruption or capacity scheduling engine runs.
- Six illustrative BOM items are modeled. The displayed material-supported builds are capped by the most constrained item. This is not a full BOM, job allocation or production-readiness assessment.
- Existing incoming quantities arrive at the heuristic median in the scenario; approval adds expected spot-stock receipts. Pending requests do not improve coverage. Recorded receipt dates replace expected dates for those quantities and do not double-count them.
- Role switching demonstrates sharing choices, not authentication or secure isolation. Both roles and all state are in one browser. Withheld supplier values are excluded from the OEM estimate, but they are not secured against inspection of the client application.
- Data saves locally under `skysupply-readiness-v2`, separately from Concept 01. Browsers/devices do not sync. Saving occurs on form submission or a scenario action, not on every keystroke. Export before clearing browser storage. Export is a readable snapshot; there is no JSON restore flow.
- CSV import replaces baseline fields only for matching DEMO parts. Do not count scenario purchases again in imported stock or incoming quantities. `updated_date` is the shared source freshness timestamp in this simplified model.
- This does not approve parts for production or installation, determine airworthiness, or replace an authorized review of configuration, documentation and source qualification.
- Twelve-to-twenty-four-month predictive demand planning, full procurement approval permissions, ERP integrations, logistics feeds and forecast validation remain future scope.

## Model

The complete calculation is visible in `model.js` and explained in Data & assumptions. Median lead time starts with a synthetic historical baseline, adds explicit material/tooling/capacity/yield allowances and the selected delay scenario. A symmetric triangular distribution produces an assumed window and on-time percentage. Missing or stale signals widen the window. No trained model or accuracy claim is involved.

## Run locally

No build or dependencies are required. Serve this directory with any static web server, for example `python3 -m http.server 8000`, then open `http://localhost:8000`.

The interface uses vanilla JavaScript and CSS. Google Fonts is optional; system-font fallbacks work without it. Application data stays in browser storage; the static host receives ordinary page/asset requests and Google Fonts receives font requests. No analytics or data-upload endpoint is included.

## Positioning references

Existing products overlap with the broad idea. The hypothesis here is a narrower workflow, not market novelty:

- [ILS aerospace marketplace](https://www.ilsmart.com/)
- [o9 supplier collaboration](https://o9solutions.com/solutions/supplier-collaboration)
- [Kinaxis aerospace and defense planning](https://www.kinaxis.com/en/industries/aerospace-defense?language=en)
- [SAP integrated business planning](https://www.sap.com/products/scm/integrated-business-planning/features.html)

See `DECISIONS.md` for the product recommendation and pilot questions.
