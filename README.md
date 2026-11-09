# SkySupply Network — Concept 02

A separate aerospace supply-network prototype connecting parts discovery, future buyer demand, selected supplier capacity/readiness and explicit purchasing decisions. Independent venture concept; all organizations, inventory, parts, prices, dates and transactions are synthetic.

Public link: https://stevedog-krav.github.io/skysupply-readiness-demo/

Original marketplace, unchanged: https://stevedog-krav.github.io/skysupply-demo/

## Demo the 1,000 / 750 case

1. The sample buyer, Meridian Aero, forecasts 1,000 cast housings by February 1, 2027. Fifty on hand plus 700 existing supplier commitments provide 750 units of coverage. The gap is 250.
2. Explore the gap. Two distinct listed-stock pools offer 100 and 50 units; a supplier shares a conditional 100-unit additional production pool.
3. Request stock, review it in Actions and approve as the buyer. Coverage stays unchanged until the named supplier accepts the request in Supplier view.
4. For the remaining need, propose a production order or capacity reservation. Review readiness estimates and fictional terms. All requests need buyer approval and supplier acceptance.
5. An accepted reservation holds capacity only. It does not count as parts coverage. In Actions, convert it to a production order, review it again and have the supplier accept it. Its original assumed reservation fee is retained.
6. Accept all three on-time quantities to reach 1,000 expected coverage. This does not mean those parts are on hand. Accepting a late date leaves the relevant gap open.
7. Change a forecast quantity or date; choose whether to share it with the named partner. In Supplier view, edit capacity/readiness, sharing choices or listed inventory. Withheld capacity is unknown, not zero.

The question-mark button opens the walkthrough. Marketplace search and part/source-type filters work. The top-right request icon opens Actions. An editable service APU rental/buy/bridge calculator remains separate from manufacturing coverage. Scenario changes save locally; JSON export produces a readable snapshot.

## Boundaries

- No trained AI, live ERP, supplier feeds, secure accounts, real agreements, capacity booking, purchasing, payments or logistics are connected.
- Buyer forecasts, buyer approvals, supplier acceptance and reservations are distinct states. On-time accepted stock purchases and production orders contribute expected coverage. Reservations do not until converted and accepted as production orders. Opening stock never increases merely because an agreement is accepted.
- Additional capacity is modeled as a part/date-specific pool net of other allocations. It excludes the existing supplier commitments and listed stock in the sample. Production orders and reservations consume the same additional pool, preventing local double allocation. Pending requests hold scenario quantity, not real stock.
- Supplier changes can make a pending request infeasible; quantity availability is checked again on buyer approval and supplier acceptance. Accepted quantities cannot be removed through the supplier editing forms. Actual contract amendment/cancellation workflows remain future scope.
- Readiness estimates add invented allowances to the proposed slot: material unconfirmed +7 days; tooling unready +7; first-pass yield below 95% +3. Sources over 48 hours old relative to the fixed Nov 9, 2026 snapshot are flagged. Suggestions are rule-based matches, not calibrated probabilities or proven delivery predictions.
- Reservation fees are fictional, nonrefundable, additional to part value and not credited against purchase. Production orders created directly have no separate reservation fee in this example. Real terms would have to be negotiated. Production quotes exclude shipping, taxes and financing.
- Sharing controls demonstrate the intended workflow only. Both roles and all data exist in the same browser; this is not authentication or security against client-side inspection. Buyer forecasts are shared only with the named partner in the presented interface; explicit requests share their own quantity/date with the selected source.
- State uses `skysupply-network-v3`, separate from the original marketplace and earlier readiness preview. Saves happen on submitted forms and actions, not every keystroke. There is no device sync, JSON restore or ERP CSV import in this revised concept.
- Nothing here approves production or installation eligibility, source qualification, traceability, serviceability or airworthiness. Component photos are generated illustrative assets reused from the original prototype, not exact part photography.
- The service rental calculator assumes $1,200/day, $500 fees, $600 shipping and a $15,000 refundable deposit. Replacement is $250,000 + $600 shipping with 45-day lead time. Bridge rental has 45 billed days (delivery day 2, replacement day 45, two return days). Taxes, damage, extended rental and downtime are excluded.

## Run locally

Serve this folder with any static web server, e.g. `python3 -m http.server 8000`, then open http://localhost:8000. No install/build is required. The frontend uses vanilla JavaScript/CSS and optional Google Fonts with system fallbacks. `network-model.js` contains the independently testable scenario rules. `app.js` renders the interface and handles interactions.

## Keep earlier directions available

Concept 01 is unchanged. The initial Concept 02 readiness dashboard is preserved at Git tag `concept-02-readiness-backup`. A separate local downloadable archive, `SkySupply-earlier-readiness-backup.zip`, also preserves it. The new direction replaces the live Concept 02 page at the same public address.

## Positioning references

Existing products overlap with the broad concept; aerospace workflow usability and supplier participation are hypotheses to validate, not proven differentiation:

- https://www.ilsmart.com/
- https://o9solutions.com/solutions/supplier-collaboration
- https://www.sap.com/uk/products/business-network/planning-collaboration.html
