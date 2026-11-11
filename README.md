# SkySupply Network — Concept 02

An independent aerospace supply-network prototype for OEM production planners and airline maintenance buyers. Connect existing-stock discovery, future demand, selected supplier readiness, simulated ERP records and explicit purchasing decisions. All organizations, people, part numbers, inventory, prices, dates, limits and transactions are fictional. Real aircraft/model names provide context only; no fit, affiliation or partnership is implied.

Public prototype: https://stevedog-krav.github.io/skysupply-readiness-demo/

Concept 01 remains separate and unchanged: https://stevedog-krav.github.io/skysupply-demo/

## Demo in five minutes

1. Start in **OEM · Meridian Aero Systems → Control tower**. Inspect 12 component lines; baseline has six exposed lines. Uncovered part value is quantity gap × invented price, not revenue, losses or savings.
2. Choose **Run pitch scenario** and load the OEM stress case: +20% demand and +30 calendar days disruption. In Analytics lab, compare baseline/scenario quantities and value. Check early raw-material commitment and recalculate: the forging median moves 21 days earlier, while remaining constraints can still leave a shortage.
3. Use **Why?** on an open PO to inspect historical lead, readiness allowances and source freshness. **Inspect scored records** shows all 90 synthetic holdouts and three delivery-estimate baselines. These calculated results are not evidence of real predictive accuracy.
4. Open **Demand & commitments** and explore the housing gap. Fifty usable units plus 700 expected commitments cover 750 of 1,000 required. Request existing stock or a production order; approve as Buyer, then switch to the named Supplier and accept. A reservation alone does not cover demand; convert it to an order and obtain approval/acceptance again. Late supply stays outside the need-date coverage.
5. Switch planning organization to **Airline · Meridian Air**. Fleet & maintenance → Work orders → **WO-DEMO-27010** shows an APU material gap. Compare a new replacement (75-day invented lead) with a separate loaner pool and a bridge to the existing modeled PO receipt. The baseline bridge is 20 billed days at $1,200/day + $500 fees + $600 shipping = $25,100 expense, plus $15,000 refundable deposit per unit. Edit days in the request form. Buyer approval and separate supplier acceptance are required before job coverage changes. Loaners never increase OEM supply.
6. Under **Replacement planning**, edit an installed component's fictional calendar/hour/cycle targets and usage. The earliest target, condition buffer, procurement lead and advance buffer determine its reorder date. These are planning assumptions, never maintenance instructions or manufacturer/regulatory life limits.
7. In **ERP data room**, inspect/search/paginate records, download a table or full JSON package, or download the sample inventory CSV. A selected file is validated and previewed before browser-local application. A simulated sync also requires preview/application. Neither contacts an ERP.

## Dataset and reproducibility

The fixed snapshot is **November 9, 2026**, deliberately independent of the real current date. `assets/synthetic-erp.json` and `erp-data.js` contain 556 records:

- 18 component categories and 6 fictional suppliers.
- 360 completed PO lines: 270 training receipts and 90 holdouts.
- 36 open PO schedule lines and 36 warehouse records, split across OEM/airline.
- 16 aircraft, 48 installed components and 36 maintenance work orders.

`python3 scripts/generate-erp.py` recreates the dataset with seed 13192026. Public references informed record structure and categories; every value was generated. No private company operating figures or interview transcripts are published.

Run from this folder:

```sh
node tests/analytics.cjs
node tests/network.cjs
python3 -m http.server 8000
```

Open http://localhost:8000. No install/build required. The frontend uses vanilla JavaScript/CSS and optional Google Fonts with system fallbacks. Tests cover allocation, approval stages, pool limits, leakage prevention, inventory validation and reminders.

## Estimation method and limits

- The analytics estimator fits a median historical lead baseline, adjusted for readiness. Allowances: material unconfirmed +21 days; tooling unready +12; utilization above 80% +0.5 day per point; yield below 94% +10. Scenario disruption is additional. Early material only changes affected OEM estimates. The original network slot estimator is a separate illustrative rule used for conditional capacity proposals, with its own displayed assumptions.
- Each backtest prediction uses only Train receipts completed by that holdout's order date. Holdout actuals are used only for scoring. The synthetic generator embeds relationships between readiness and delay. The resulting approximately 5.6-day estimator MAE versus 14.7-day promise MAE and 12.2-day historical-median MAE are reproducible demonstrations, not validated industry performance.
- Receipt windows use empirical training errors with a seven-day minimum. Withheld readiness is excluded and widens the window; stale shared sources also widen it. The on-time score is a smoothed synthetic residual share, explicitly uncalibrated, not a delivery guarantee.
- The 24-month housing chart is an assumed trajectory: demand growth 1.2% monthly, output growth 0.6% monthly for 12 months, bands ±20% then ±35%. It is not a trained long-range demand forecast or contracted capacity.
- Usable inventory excludes held/reserved quantities. Airline work orders allocate in due-date order without reusing supply. Confirmed requests apply to the named job only. The two-unit loaner pool is separate from owned inventory and OEM production.
- Pending network requests hold only scenario pool quantities. Reservations and production orders consume the same additional pool, which is separate from baseline commitments and listed stock. Availability is rechecked at approval and acceptance. No agreement creates on-hand inventory.
- Rental, procurement and reservation terms are invented. No actual quote, eligibility, documentation, serviceability, installation approval, airworthiness, purchasing, payment or logistics is supplied.
- There is no trained AI service, real ERP feed, secure login, company integration, live stock or enforceable capacity booking. Both preview roles and data exist in one browser; sharing controls demonstrate intended behavior, not security.
- Submitted changes save locally in `skysupply-analytics-v1` and `skysupply-network-v3`. No device sync or JSON restore exists. Reset analytics clears imports, component edits and airline requests but preserves OEM network agreements. Export first if needed. CSV import only accepts known organization/part pairs, valid nonfuture dates, integer nonnegative quantities and held + reserved ≤ on-hand. Files stay in the browser.
- Component images are illustrative generated assets, not exact part photography.

## Provenance and positioning

Public structure/context references are linked in ERP data room:

- [SAP PO schedule lines](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/8308e6d301d54584a33cd04a9861bc52/6e52f71dfb5a481b810ce0697708baf2.html)
- [SAP goods receipts](https://help.sap.com/docs/SAP_S4HANA_ON-PREMISE/9905622a5c1f49ba84e9076fc83a9c2c/e69ac7536e8e2a4be10000000a174cb4.html)
- [Honeywell APU context](https://www.honeywellaerospace.com/us/en/products-and-services/products/power-and-propulsion/auxiliary-power-units)
- [IATA supply-chain context](https://www.iata.org/en/programs/ops-infra/techops/aviation-supply-chain/)

Existing products overlap with discovery, forecasting and supplier collaboration: [ILS](https://www.ilsmart.com/), [o9](https://o9solutions.com/solutions/supplier-collaboration), [SAP](https://www.sap.com/uk/products/business-network/planning-collaboration.html). Novelty, willingness to share data, buyer value and forecast accuracy require validation with an actual pilot.

Earlier Concept 02 versions remain in tags `concept-02-readiness-backup` and `concept-02-network-backup`. Concept 01 is not modified by this repository.
