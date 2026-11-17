# Concept 02: OEM and airline demand-to-decision network

The core hypothesis is that earlier demand commitments and selected supplier readiness can improve decisions before a shortage occurs. A nonbinding forecast alone does not transfer inventory risk or create factory output.

Concept 01 demonstrates sourcing and maintenance commerce: marketplace discovery, orders, rental/loaner comparisons, reminders and planning tools. Concept 02 expands the center of gravity to future demand, supplier readiness, ERP evidence and human-approved purchasing/production decisions. Existing marketplace and rental functions do not disappear, but they support the coordinated planning workflow.

The two planning profiles share the delivery estimator and source-data tools, while retaining different needs:

- OEM: component demand, production timing, material/tooling/capacity signals, stock discovery, production orders and capacity reservations.
- Airline: maintenance work orders, installed-component planning targets, usable stock allocation, replacement procurement and job-specific service loaners.

Existing ERP/MRO systems would remain systems of record. A real product would consume only authorized data, return approved workflow updates, and require server-enforced access controls, integration reconciliation and validation. This prototype demonstrates none of those production integrations or security guarantees.

The 556 generated records make calculations inspectable. The historical estimator and synthetic backtest explain the proposed analytical behavior; they do not establish real predictive accuracy. The 24-month projection is an explicit what-if assumption. Fabricated values are never presented as company quotes, real availability or manufacturer life limits.

Buyer approval, supplier acceptance, capacity reservation, production order, expected receipt and usable on-hand stock remain distinct. Loaner supply never closes OEM manufacturing gaps. People decide whether to act; the system does not automatically order.

Team discovery themes inform the scenarios: uncertain material purchasing before confirmed demand, constrained tooling/capacity, rework, longer planning horizons and selective information sharing. Private interview figures and transcripts are excluded from the public source/data.

A useful pilot would start with one buyer, a few willing suppliers and a defined part family. Compare forecast errors against simple baselines on genuinely held-out future receipts, track shortage decisions and material wait time, and test whether partners will share the required signals. Existing industry tools overlap; the prototype supports a hypothesis, not a defensible claim that the industry lacks these capabilities.

Concept 01 remains untouched. Git backup tags preserve both earlier Concept 02 directions.


The interview iteration prioritizes turning a shortage into a reviewed sourcing decision. Supplier search uses transparent source-channel previews instead of implying unrestricted access to proprietary databases. RFQ response generation is explicit and simulated. Selected quotes reuse the existing approval/coverage rules, rather than creating a second inventory ledger. Shipping progress stays separate from warehouse receipts. The maintenance source register is intentionally unverified until a real authorized program can be supplied. Value calculations separate measurable purchasing effort from speculative downtime benefits.
