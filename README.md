# Skyligned Network — Concept 02

An independent aerospace supply-network prototype for OEM production planners and airline maintenance buyers. Connect existing-stock discovery, future demand, selected supplier readiness, simulated ERP records and explicit purchasing decisions. All organizations, people, part numbers, inventory, prices, dates, limits and transactions are fictional. Real aircraft/model names provide context only; no fit, affiliation or partnership is implied.

Public prototype: https://stevedog-krav.github.io/skysupply-readiness-demo/

Concept 01 remains separate and unchanged: https://stevedog-krav.github.io/skysupply-demo/

## Demo in five minutes

1. Start in **OEM · Crestline Aerospace → Control tower**. Inspect 12 component lines; baseline has six exposed lines. Uncovered part value is quantity gap × invented price, not revenue, losses or savings.
2. Choose **Run pitch scenario** and load the OEM stress case: +20% demand and +30 calendar days disruption. In Metrics & Forecasting, compare baseline/scenario quantities and value. Check early raw-material commitment and recalculate: the forging median moves 21 days earlier, while remaining constraints can still leave a shortage.
3. Use **Why?** on an open PO to inspect historical lead, readiness allowances and source freshness. **Inspect scored records** shows all 90 synthetic holdouts and three delivery-estimate baselines. These calculated results are not evidence of real predictive accuracy.
4. Open **Demand & commitments** and explore the housing gap. Fifty usable units plus 700 expected commitments cover 750 of 1,000 required. Request existing stock or a production order; approve as Buyer, then switch to the named Supplier and accept. A reservation alone does not cover demand; convert it to an order and obtain approval/acceptance again. Late supply stays outside the need-date coverage.
5. Switch planning organization to **Airline · Westhaven Air**. Fleet & maintenance → Work orders → **WO-DEMO-27010** shows an APU material gap. Compare a new replacement (75-day invented lead) with a separate loaner pool and a bridge to the existing modeled PO receipt. The baseline bridge is 20 billed days at $1,200/day + $500 fees + $600 shipping = $25,100 expense, plus $15,000 refundable deposit per unit. Edit days in the request form. Buyer approval and separate supplier acceptance are required before job coverage changes. Loaners never increase OEM supply.
6. Under **Replacement planning**, edit an installed component's fictional calendar/hour/cycle targets and usage. The earliest target, condition buffer, procurement lead and advance buffer determine its reorder date. These are planning assumptions, never maintenance instructions or manufacturer/regulatory life limits.
7. In **ERP data room**, inspect/search/paginate records, download a table or full JSON package, or download the sample inventory CSV. A selected file is validated and previewed before browser-local application. A simulated sync also requires preview/application. Neither contacts an ERP.

## Dataset and reproducibility

The fixed snapshot is **November 20, 2026**, deliberately independent of the real current date. `assets/synthetic-erp.json` and `erp-data.js` contain 556 records:

- 18 component categories and 6 fictional suppliers.
- 360 completed PO lines: 270 training receipts and 90 holdouts.
- 36 open PO schedule lines and 36 warehouse records, split across OEM/airline.
- 16 aircraft, 48 installed components and 36 maintenance work orders.

`python3 scripts/generate-erp.py` recreates the dataset with seed 13192026. Public references informed record structure and categories; every value was generated. No private company operating figures or interview transcripts are published.

Run from this folder:

```sh
node tests/analytics.cjs
node tests/network.cjs
node tests/sourcing.cjs
node tests/calendar.cjs
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


## November 12 interview feedback iteration

Implemented as a simulated end-to-end sourcing workflow, preserving the separate Concept 01 site:

- **Planning windows:** Control tower now has urgent (dated needs within 7 days), short term (within 90 days), and long range (6–24 months). The same selection supplies a default RFQ need date. Other pages retain their explicitly labeled record scope. Missing dated production needs are shown as absent, not fabricated. Airline long range uses component targets; OEM long range remains the assumed housing trajectory.
- **Metrics & Forecasting:** renamed the Analytics lab, including navigation and walkthrough references. Existing ERP-derived shortage and delivery estimators remain intact.
- **Supplier search:** replaces the Marketplace navigation entry with 72 deterministic fictional listings (four sources per component). Filter component, supplier, source channel, condition, location/name search and earliest handling plus transit. Multiple sources can be selected for one exact component. Quote-required, stale listings and missing documentation are visible. The assistant recognizes a constrained set of part identifiers/names, quantity patterns and urgency; it is not an LLM or live internet search.
- **RFQs:** save a draft, review recipients, release a local simulation, then explicitly simulate responses. Compare complete, partial and documentation-pending quotes. Only a complete quote with sample documentation can create a purchase-review request. No email or RFQ is sent externally. Real multi-source split awards and negotiations remain future scope.
- **Quotes & shipping:** compare scheduled/standard, expedited and dedicated-courier scenarios. Heavy-component scenarios use freight terminology. Destination and quantity affect fictional costs; supplier handling is added to transit. Delivered estimates include parts and shipping but exclude tax/duties. No actual UPS or courier service is connected or quoted.
- **Purchase handoff:** selected quotes create requests in the original Actions workflow. OEM purchases require buyer approval and supplier acceptance before contributing expected supply. Airline purchases link to a specific matching work order and require the same approvals; existing loaners remain separate. Quote selection and logistics statuses never increase owned stock. Active requests reserve listing quantities; duplicate conversion of one RFQ is blocked.
- **Logistics updates:** after supplier acceptance, explicitly simulate dispatch readiness, in-transit and delivered states. No carrier is contacted and no warehouse receipt is automatically posted. The accepted supplier date remains authoritative for modeled expected coverage.
- **Program references:** Fleet & maintenance has editable document/revision/reviewer references for the two aircraft contexts. Missing references are flagged; user-entered references remain unverified. They do not import a real maintenance program, change existing targets or establish approval/eligibility.
- **Value calculator:** editable sourcing volumes, task times, loaded labor rate and subscription assumptions show hours, labor value, net labor value and break-even requests. A separate speculative delay-exposure calculation is excluded from labor ROI. No customer savings or subscription willingness-to-pay is claimed.
- **Supplier incentive:** supplier view explains a proposed free basic listing and optional selected-data participation discount. This is a business-model hypothesis, not a paid/free enrollment or agreed offer.
- **Persistence/export:** `skysupply-interview-v1` saves RFQs, planning window, reference entries and calculator assumptions. Full ERP demo export includes this state and the generated listing set. The existing analytics reset does not clear sourcing/RFQ records or network agreements; those workflows are separate. Export is readable, with no JSON restore. No secure authentication is implemented.

### Quick walkthrough of the new flow

1. Select OEM, open Supplier search, and choose **Source 100 housings**.
2. Select all four sources and **Prepare RFQ**. Save the draft, review/release it and **Simulate supplier responses**.
3. Compare incomplete/partial quotes against complete quotes. Change shipping service to compare arrival and total cost. Review a complete quote and create the purchase-review request.
4. In Actions, approve as buyer; open the selected supplier response and accept the date/quantity. Control tower coverage changes only after acceptance. Quotes & shipping links back to the request and now permits simulated logistics updates.
5. Select Airline. From a work order, use **Compare suppliers for this component**, select a source, and associate the RFQ with the matching work order. Selecting a job copies its need date/base into the draft. A timely accepted purchase can cover that job; no OEM supply is created.
6. Review Fleet & maintenance program references and edit a sample reference. Inspect a component target to see that the reference remains unverified and targets stay illustrative.
7. Open Value calculator and change request volume/time to show labor-only value separately from delay exposure.

Source files: `sourcing-model.js` contains deterministic listing, RFQ, shipping, scope and ROI rules; `sourcing-ui.js` connects these to the existing application. No dependencies were added. The preceding version is preserved by tag `concept-02-before-interview-feedback`.

## Presentation-ready product pass

The interface now uses finished-product wording and a compact workspace footer. Concept numbering, links to earlier marketplace directions, repeated simulation banners and demo button labels are removed from the rendered application. The footer still identifies sample data and the absence of live transactions; commercial inventory, quotes, partnerships or integrations must not be inferred from this presentation.

- Navigation follows the work: planning → sourcing → quotes → actions → value → source records. The duplicate airline demand destination is hidden because its content is already in Fleet & maintenance. OEM users see an explicitly labeled airline-maintenance workspace link.
- Guide opens separate seven-stage OEM and airline walkthroughs. A thin persistent banner explains each stage. Quote stages explicitly create a labeled comparison example, never a purchase request automatically. Exiting the guide leaves work intact.
- The guide includes a confirmed full-workspace reset and a full JSON backup download. Reset covers all three state stores while keeping Concept 01 separate. Export first; JSON restore remains unavailable.
- Planning-window controls appear only on Control tower, where they actually change the view. Other pages keep their stated record scope.
- Part numbers use a consistent private-label `SS-` prefix. These are not real OEM identifiers or evidence of applicability. Legacy `DEMO-` identifiers remain accepted by supplier search. Stable internal work-order identifiers are retained while their on-screen labels omit the legacy prefix.
- RFQs now record a required condition and documentation requirement. Condition-mismatched, incomplete or undocumented quotes cannot become a purchase request. Once converted, the selected service and freight estimate are retained and the quote's transport controls are locked.
- Transport comparisons include indicative UPS, FedEx and specialist options. Amazon Shipping appears only for standard parcel scenarios. Provider names identify the modeled service category, not a partnership, actual availability or carrier-issued price. Heavy-component packaging and booking eligibility still require review. The total combines part value and estimated shipping, excluding taxes/duties.
- Shipment progress has explicit milestones, still separate from a posted inventory receipt.
- Styling includes clearer type, consistent rounded cards/buttons, sticky desktop search/requests, hover/pressed states, reduced-motion support and phone/laptop layouts.

Public workflow references used to refine terminology and controls are recorded in `RESEARCH.md`. Source data remains synthetic and the application remains browser-local, without authentication or transactional integrations.

## Pitch calendar and planning controls

The November 20 pitch snapshot keeps upcoming work, procurement and replacement targets in the future. Historical receipts and installation dates remain historical. A compact header selector switches between urgent, short-term and long-term planning while retaining the aircraft hero image in both buyer workspaces. Existing saved scenarios migrate their calendar dates once; request amounts, identifiers and audit timestamps are preserved.
