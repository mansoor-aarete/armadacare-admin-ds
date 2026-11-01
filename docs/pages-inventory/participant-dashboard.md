> Detailed screen spec extracted from the Figma file `iiZjEBlMVcWNHALIB4qKBB` (text layers + screenshots, see docs/pages-inventory.md §1). Values are verbatim; "(?)" marks uncertainty.

# Page specs — Participant (P1–P7) + Accounts Dashboard (D1)

Source: text-layer dumps `texts/<id>.txt` + screenshots `figma/<id>.png` (1:1, 1920 wide), verified visually.
All 8 frames are named **"Account Intelligence View | Accounts | Salesforce"** (browser-tab title captured; not shown on page).
Coordinates below are absolute frame px (x = left edge of label). "(?)" = uncertain, with reason.

## 0. Shared shell facts (all 8 screens)

| Item | Value |
|---|---|
| Org badge (global header row 1) | `Sandbox (CXDev)` |
| Global search placeholder | `Search...` |
| App name (context bar) | `ArmadaCare Admin Portal` (visually truncated "ArmadaCare Admin…") |
| Object nav item | P1–P7: `Participant` (selected, with ▼) · D1: `Accounts` (selected, with ▼) |
| Workspace tabs | **None** on any of these 8 screens |
| Utility bar | `Omni-Channel` |
| Glitch to ignore | P1–P7 grey ≈35 px band under the global header (inventory §4) |

---

## A. Participant — custom search LWC (`CAdminConsumerSearch`)

### Search tabs (identical on P1–P7)

Tabset (`LightningTabset` / `Tab List - Tabs`), left-aligned, in order:

| # | Tab label | Notes |
|---|---|---|
| 1 | `Participant Search` | active on P1, P4, P7 |
| 2 | `Employer Search` | active on P3, P5 |
| 3 | `Claim Search` | active on P2, P6 |
| 4 | `More` | overflow `LightningButtonMenu`; text layer exists (x≈375) but is **not visible** in any screenshot — hidden overflow menu, shown only when tabs overflow (?) |

Below the tab strip each tab has a page heading (bold) equal to the tab name, then a dark grey (#5c5c5c-ish) **"Search Criteria"** bar. On Participant/Claim tabs the bar has a right-aligned underlined link `Advanced Search` (collapsed) / `Show Less` (expanded). Employer tab has **no** link.

Grid columns used (label x positions):
- 4-col basic grid: x = 35 · 461 · 889 · 1316 (each input ≈320 px), with button stack at x ≈1742 (`Search` brand) + 1822 (`Clear` neutral), vertically aligned to the first field row.
- 3-col advanced grid: x = 35 · 656 · 1280 (inputs ≈469 px).
- 2-col advanced grid: x = 35 · 968 (inputs ≈469 px).
- Employer tab: 3 equal cols x = 37 · 660 · 1284 (inputs ≈598 px), buttons below form, left-aligned.

---

### P1 — 2:3 · Participant Search (basic, no results)

State: tab **Participant Search** active · collapsed (link `Advanced Search`) · no search run (no results area). Frame 1920×923.

Heading: `Participant Search` → bar `Search Criteria` + link `Advanced Search`.

**Sub-heading (plain bold, not shaded): `Participant Information`**

| Row | Col (x) | Label | Req | Type | Value / placeholder |
|---|---|---|---|---|---|
| 1 | 1 (35) | `Last Name` | **\*** | text | empty |
| 1 | 2 (461) | `First Name` | | text | empty |
| 1 | 3 (889) | `Employee Number` | | text | empty |
| 1 | 4 (1316) | `Employer` | | picklist (combobox) | `--None--` |
| 2 | 1 (35) | `Email Address` | | text | empty |

Buttons (right, row 1): `Search` (brand, light olive green) · `Clear` (neutral).

---

### P2 — 2:260 · Claim Search (basic, no results)

State: tab **Claim Search** active · collapsed (`Advanced Search`) · no results area. Frame 1920×923. Component `CAdminClaimSearch`.

Heading: `Claim Search` → bar `Search Criteria` + link `Advanced Search`.

**Sub-heading (plain bold): `Claim Information`**

| Row | Col (x) | Label | Req | Type | Value |
|---|---|---|---|---|---|
| 1 | 1 (33) | `Employer` | | picklist | `--None--` |
| 1 | 2 (461) | `Member Last Name` | | text | empty |
| 1 | 3 (889) | `Member First Name` | | text | empty |
| 1 | 4 (1316) | `Claim Number` | | text | empty |
| 2 | 1 (33) | `Member ID` | | text | empty |

Buttons (right, row 1): `Search` (brand) · `Clear` (neutral).

**Checkbox group — legend `Claim Status:`** (single horizontal row, y≈491). Checked: **All** only.

| # | Option | Checked |
|---|---|---|
| 1 | `All` | ✔ |
| 2 | `Draft` | |
| 3 | `Submitted` | |
| 4 | `Pending Review` | |
| 5 | `Auto Approved` | |
| 6 | `In Review` | |
| 7 | `Pending Information` | |
| 8 | `Approved` | |
| 9 | `Denied` | |
| 10 | `Reversed` | |
| 11 | `Closed` | |
| 12 | `Expired` | |
| 13 | `Pending Reimbursement (PRB)` | |
| 14 | `Request More Information (RMI)` | |
| 15 | `Paid` | |
| 16 | `Partial Pay` | |
| 17 | `Applied` | |

---

### P3 — 2:621 · Employer Search (no results)

State: tab **Employer Search** active · no advanced link · no results area. Frame 1920×923. Component `CAdminEmployerSearch` (heading is `Heading 1`; form is a `Section`).

Heading: `Employer Search` → bar `Search Criteria` (no right-side link). No sub-heading.

| Row | Col (x) | Label | Req | Type | Value / placeholder |
|---|---|---|---|---|---|
| 1 | 1 (37) | `Employer Name` | | text | empty |
| 1 | 2 (660) | `Employer Code` | | text | empty |
| 1 | 3 (1284) | `EIN` | | text | placeholder **`XX-XXXXXXX`** |

**Checkbox group (`Field Set` + `Legend`) — legend `Status`** (no colon). Checked: **All** only.

| # | Option | Checked |
|---|---|---|
| 1 | `All` | ✔ |
| 2 | `Active` | |
| 3 | `Inactive` | |

Buttons (below the form, left-aligned, x≈39): `Search` (brand — dark olive in capture) · `Clear` (neutral).

---

### P4 — 2:865 · Participant Search results (basic)

State: tab **Participant Search** active · collapsed (`Advanced Search`) · **results**. Frame 1920×1531.

Form identical to P1 except **Last Name value = `A`**; Employer = `--None--`.

Results:
- Heading: **`SEARCH RESULTS`** (all caps, bold, x=20) — below the criteria card.
- Table (`LightningDatatable`): header labels lost in capture (blank grey band — inventory §4 glitch); labels taken from `Header Cell - …` layer names.
- Count text **below** the table, small italic grey: **`30 record(s) found.`**
- No pagination shown.

Columns (x of column start):

| # | Column | x | Cell type |
|---|---|---|---|
| 1 | `Last Name` | 28 | **link** (row header; brand-coloured) |
| 2 | `First Name` | 214 | text |
| 3 | `Member/Dependent` | 400 | text (`Member` / `Dependent`) |
| 4 | `Employee Number` | 586 | text |
| 5 | `SSN` | 772 | text, masked `*******NNNN` |
| 6 | `Employer` | 958 | text |
| 7 | `Participant Status` | 1144 | text — **empty in every row** |
| 8 | `Dependent Name` | 1330 | text, wraps (multi-line) |
| 9 | `Email Address` | 1516 | text, wraps |
| 10 | `Admin` | 1702 | text — **empty in every row** |

Rows (30, all shown; blank = empty cell; Participant Status and Admin omitted because empty throughout):

| # | Last Name (link) | First Name | Member/Dependent | Employee Number | SSN | Employer | Dependent Name | Email Address |
|---|---|---|---|---|---|---|---|---|
| 1 | Abate | Mary Ann | Dependent | | \*\*\*\*\*\*\*4288 | E&J Gallo Winery Ret 65P | | |
| 2 | Abate | Peter | Member | | \*\*\*\*\*\*\*7851 | E&J Gallo Winery Ret 65P | Mary Ann Abate (Spouse) | pete.abate@outlook.com |
| 3 | Ackerman | Alexa | Dependent | | \*\*\*\*\*\*\*1621 | ArmadaCare | | alexa.curley@gmail.com |
| 4 | Ackerman | Palmer G | Dependent | | | ArmadaCare | | |
| 5 | Ackerman | Reagan A | Dependent | | | ArmadaCare | | |
| 6 | Ackerman | Zachary | Member | | \*\*\*\*\*\*\*0224 | ArmadaCare | Alexa Ackerman (Spouse), Palmer G Ackerman (Dependent), Reagan A Ackerman (Dependent) | zachackerman48@gmail.com |
| 7 | Aiello | Maria | Member | | \*\*\*\*\*\*\*1094 | ArmadaCare | | maiello@armadacare.com |
| 8 | Aiello | Samantha | Member | | \*\*\*\*\*\*\*5378 | ArmadaCare | | saiello@armadacare.com |
| 9 | Allen | Emma | Dependent | | | Unifi Aviation, LLC | | |
| 10 | Allen | Hayden | Member | U5419313101 | \*\*\*\*\*\*\*6759 | Unifi Aviation, LLC | Emma Allen (Spouse), Sloane Allen (Dependent) | hayden.allen@unifiservice.com |
| 11 | Allen | Sloane | Dependent | | \*\*\*\*\*\*\*6948 | Unifi Aviation, LLC | | |
| 12 | Alley | Angela | Dependent | | \*\*\*\*\*\*\*1820 | Blalock Development Co | | |
| 13 | Alley | Kevin | Member | U3948629401 | \*\*\*\*\*\*\*7850 | Blalock Development Co | Angela Alley (Spouse) | kalley@blalockconstruction.com |
| 14 | Alsup | Samantha | Member | | \*\*\*\*\*\*\*6819 | ArmadaCare | Thomas Conley (Spouse) | salsup@armadacare.com |
| 15 | Alves Barbosa | Reinaldo | Dependent | | \*\*\*\*\*\*\*8715 | Unifi Aviation, LLC | | reinaldobarbosa@icloud.com |
| 16 | Anderson | Meredith J | Dependent | | \*\*\*\*\*\*\*9772 | Unifi Aviation, LLC | | |
| 17 | Anderson | Steven | Member | | \*\*\*\*\*\*\*3048 | E&J Gallo Winery Ret 65P | Beth Nagle (Spouse) | sjanderson001@yahoo.com |
| 18 | Angra | Javyn | Dependent | | \*\*\*\*\*\*\*4487 | Unifi Aviation, LLC | | |
| 19 | Angra | Krish | Dependent | | \*\*\*\*\*\*\*9036 | Unifi Aviation, LLC | | |
| 20 | Angra | Sandeep | Member | U3761949601 | \*\*\*\*\*\*\*0634 | Unifi Aviation, LLC | Javyn Angra (Dependent), Krish Angra (Dependent), Heer Kansal (Spouse), Hridhaan Kansal (Dependent) | sandeep.angra73@gmail.com |
| 21 | Aramanai | Aarav | Dependent | | \*\*\*\*\*\*\*7710 | Unifi Aviation, LLC | | |
| 22 | Aramanai-Vasan | Ranjith | Dependent | 981127848 | \*\*\*\*\*\*\*6901 | Unifi Aviation, LLC | | |
| 23 | Argenbright | Frank | Member | 75351823100 | \*\*\*\*\*\*\*5139 | Unifi Aviation, LLC | Kathy Argenbright (Spouse) | fa@argenbrightcapital.com |
| 24 | Argenbright | Hunter | Member | | \*\*\*\*\*\*\*5434 | Unifi Aviation, LLC | | hunter.argenbright@unifiservice.com |
| 25 | Argenbright | Kathy | Dependent | | \*\*\*\*\*\*\*5247 | Unifi Aviation, LLC | | kathy@kbahouse.com |
| 26 | Ash | Aaron | Dependent | | \*\*\*\*\*\*\*1569 | E&J Gallo Winery Active | | |
| 27 | Ash | Branson | Dependent | | \*\*\*\*\*\*\*5351 | E&J Gallo Winery Active | | |
| 28 | Ash | Breanne | Member | | \*\*\*\*\*\*\*2161 | E&J Gallo Winery Active | | breanneash@gmail.com |
| 29 | Ash | London | Dependent | | \*\*\*\*\*\*\*8251 | E&J Gallo Winery Active | | |
| 30 | Ash | Michael | Member | | \*\*\*\*\*\*\*8308 | E&J Gallo Winery Active | Aaron Ash (Dependent), Branson Ash (Dependent), London Ash (Dependent) | breanneash@gmail.com |

Notes:
- SSN mask is exactly 7 asterisks + last 4 (`*******4288`).
- Long Dependent Name / Email values wrap inside the cell (rows 6, 10, 13, 20, 24, 30 are taller). Multi-line Dependent Name text verified from screenshot (layer text truncated at 50 chars).
- Row 30 (Michael Ash) email = `breanneash@gmail.com` (same as row 28) — as captured.
- No row-number, checkbox or action column.

---

### P5 — 2:2423 · Employer Search results + pagination

State: tab **Employer Search** active · **results** · Search button shows **focus ring** (just clicked). Frame 1920×1013.

Form identical to P3 except **Employer Name value = `A`**; EIN placeholder `XX-XXXXXXX`; Status: `All` ✔, `Active` ☐, `Inactive` ☐.

Results:
- Heading: **`Search Results`** (title case, `Heading 2`, bold, x=24) with right-aligned count on the same line: **`13 employer(s) found.`** (small, not italic).
- Table header labels lost (glitch) — from `Header Cell - …` layer names.

| # | Column | x | Cell type |
|---|---|---|---|
| 1 | `Employer Name` | 32 | **link** (row header) |
| 2 | `Employer Code` | 238 | **link** — displays the record URL `/lightning/r/Account/<Id>/view`, truncated with "…" ("/lightning/r/Account/001Ec000…") (?) looks like a misconfigured column (URL shown instead of a code); reproduce as captured or flag to BA |
| 3 | `EIN` | 444 | text |
| 4 | `Street Address` | 650 | text |
| 5 | `City` | 856 | text |
| 6 | `State` | 1062 | text |
| 7 | `Zip Code` | 1268 | text |
| 8 | `Status` | 1474 | text (`Active` / `Inactive`) |
| 9 | `Admin` | 1680 | text |

Rows (page 1 = 10 rows):

| # | Employer Name (link) | Employer Code (link, full value) | EIN | Street Address | City | State | Zip Code | Status | Admin |
|---|---|---|---|---|---|---|---|---|---|
| 1 | ArmadaCare | /lightning/r/Account/001Ec00001bdS8HIAU/view | | | | | | Active | Zach Ackerman |
| 2 | Blalock Development Co | /lightning/r/Account/001Ec00001fY0zTIAS/view | | | | | | Active | Emily Ellerman |
| 3 | Cascade Technologies Inc | /lightning/r/Account/001Ec00001sNytdIAC/view | | | Seattle | WA | | Inactive | Feng Yue |
| 4 | E&J Gallo Winery | /lightning/r/Account/001Ec00001fY0zQIAS/view | 94-1009696 | | | | | Active | Emily Ellerman |
| 5 | E&J Gallo Winery Active | /lightning/r/Account/001Ec00001fY0zRIAS/view | 94-1009696 | | | | | Active | Emily Ellerman |
| 6 | E&J Gallo Winery Ret 65P | /lightning/r/Account/001Ec00001fY0zSIAS/view | 94-1009696 | | | | | Active | Emily Ellerman |
| 7 | Flushing Kent Realty Management LLC (displayed truncated "Flushing Kent Realty Managem…") | /lightning/r/Account/001Ec00001fY0zUIAS/view | 264430444 | | | | | Active | Emily Ellerman |
| 8 | HVAC and Associates | /lightning/r/Account/001Ec00002oJNj6IAG/view | | 2210 E Camelback Rd | Phoenix | AZ | 85016 | Inactive | Adner Ramos |
| 9 | Meridian Partners LLC | /lightning/r/Account/001Ec00001sNytcIAC/view | | | Chicago | IL | | Inactive | Feng Yue |
| 10 | QA Test Employer Group - CBSR | /lightning/r/Account/001Ec00002eslzoIAA/view | | | | | | Inactive | ArmadaCare Base User |

Pagination (below table, one row):
- Left: label `Records per page` + picklist value **`10`**.
- Right: `Previous` (neutral, **disabled**) · text **`Page 1 of 2`** · `Next` (neutral, enabled).
- Remaining 3 of 13 employers (page 2) are not captured — do not invent.

---

### P6 — 2:3068 · Claim Search advanced ("Show Less"), no results

State: tab **Claim Search** active · **expanded** (link `Show Less`) · search run, **no results**. Frame 1920×1430.

Heading `Claim Search` → bar `Search Criteria` + link `Show Less`.

**Sub-heading (plain bold): `Claim Information`** — same fields as P2:

| Row | Col (x) | Label | Type | Value |
|---|---|---|---|---|
| 1 | 1 (33) | `Employer` | picklist | **`QA Test Employer Group - CBSR`** |
| 1 | 2 (461) | `Member Last Name` | text | empty |
| 1 | 3 (889) | `Member First Name` | text | empty |
| 1 | 4 (1316) | `Claim Number` | text | empty |
| 2 | 1 (33) | `Member ID` | text | empty |

Buttons (right, row 1): `Search` (brand) · `Clear` (neutral).

Checkbox group `Claim Status:` — same 17 options as P2, **All ✔ only**.

Then a thin divider, then shaded section titles (grey band, bold) — the advanced block:

**Section `Claimant Information`** (3-col)

| Col (x) | Label | Type |
|---|---|---|
| 1 (33) | `Claimant / Dependent Last Name` | text |
| 2 (656) | `Claimant / Dependent First Name` | text |
| 3 (1280) | `Claimant / Dependent ID` | text |

**Section `Claim Details`** (3-col)

| Row | Col (x) | Label | Type | Value |
|---|---|---|---|---|
| 1 | 1 (33) | `Provider` | text | empty |
| 1 | 2 (656) | `Plan Year` | picklist | `--None--` |
| 1 | 3 (1280) | `Expense Type` | picklist | `--None--` |

Inside Claim Details (not shaded — bold legends with colon), checkbox groups, each **All ✔ only**:

`Submission Source (Filing Method):`

| # | Option | Checked |
|---|---|---|
| 1 | `All` | ✔ |
| 2 | `Member Submitted` | |
| 3 | `Debit Card` | |
| 4 | `Member Portal` | |
| 5 | `Concierge` | |
| 6 | `Mobile App` | |
| 7 | `Paper/Fax` | |
| 8 | `Carrier File` | |

`Intake Channel (Reimbursement Type):`

| # | Option | Checked |
|---|---|---|
| 1 | `All` | ✔ |
| 2 | `Member Portal` | |
| 3 | `Paper / Mail` | |
| 4 | `Phone / Staff Assisted` | |
| 5 | `Debit Card Feed` | |
| 6 | `Concierge` | |

`Escalation Indicator:`

| # | Option | Checked |
|---|---|---|
| 1 | `All` | ✔ |
| 2 | `High Dollar / Carrier Approval` | |
| 3 | `Manager Review` | |
| 4 | `Training / QA` | |
| 5 | `Repayment Required` | |
| 6 | `Appeal Filed / Appeal Review` | |
| 7 | `Daily Payment Maximum` | |
| 8 | `Foreign / Specialized Claim Review` | |
| 9 | `OCR Low Confidence` | |
| 10 | `Aging / Escalation Threshold Exceeded` | |

Then field: `Escalation State` — picklist, col 1 (x 33, ≈469 wide), value **`Either`**.

**Section `Bucket (Benefit Category)`** — checkbox group only (no separate legend; the section title is the label). All ✔ only.

| # | Option | Checked |
|---|---|---|
| 1 | `All` | ✔ |
| 2 | `Covered Medical Expenses` | |
| 3 | `Dental Treatments` | |
| 4 | `Durable Medical Equipment` | |
| 5 | `Mental Health` | |
| 6 | `Prescription Drugs` | |
| 7 | `Preventive Care` | |
| 8 | `Vision Treatments` | |
| 9 | `Wellness Treatments` | |

**Section `Date Filters`** (2-col; date inputs with calendar icon, empty)

| Row | Col (x) | Label | Type |
|---|---|---|---|
| 1 | 1 (33) | `Date of Service — From` | date |
| 1 | 2 (968) | `Date of Service — To` | date |
| 2 | 1 (33) | `Submission Date — From` | date |
| 2 | 2 (968) | `Submission Date — To` | date |

(Labels use an em dash "—".)

**Section `Claim Amount Range`** (2-col, empty)

| Col (x) | Label | Type |
|---|---|---|
| 1 (33) | `Minimum Amount ($)` | number/currency (?) — plain input in capture, no icon/placeholder; type inferred from label |
| 2 (968) | `Maximum Amount ($)` | number/currency (?) — same |

Results area (below criteria card, after dotted divider): no heading, no table; italic grey text **`No records found matching your search criteria.`** (x=20).

---

### P7 — 2:3781 · Participant Search advanced ("Show Less") + results

State: tab **Participant Search** active · **expanded** (`Show Less`) · **results**. Frame 1920×1795.

Heading `Participant Search` → bar `Search Criteria` + link `Show Less`.

**Sub-heading (plain bold): `Participant Information`** — same fields as P1:

| Row | Col (x) | Label | Req | Type | Value |
|---|---|---|---|---|---|
| 1 | 1 (35) | `Last Name` | **\*** | text | **`A`** |
| 1 | 2 (461) | `First Name` | | text | empty |
| 1 | 3 (889) | `Employee Number` | | text | empty |
| 1 | 4 (1316) | `Employer` | | picklist | `--None--` |
| 2 | 1 (35) | `Email Address` | | text | empty |

Buttons (right, row 1): `Search` (brand) · `Clear` (neutral).

Divider, then checkbox group **`Participant Status:`** — **all 8 checked**:

| # | Option | Checked |
|---|---|---|
| 1 | `All` | ✔ |
| 2 | `Active` | ✔ |
| 3 | `LOA` | ✔ |
| 4 | `Cobra` | ✔ |
| 5 | `Terminated` | ✔ |
| 6 | `Retired` | ✔ |
| 7 | `Laid Off` | ✔ |
| 8 | `Closed` | ✔ |

**Section (shaded) `Participant IDs`** (2-col)

| Col (x) | Label | Type |
|---|---|---|
| 1 (33) | `Employer Code` | text |
| 2 (968) | `Employer Employee ID` | text |

**Section (shaded) `Dependent Information`** (3-col)

| Col (x) | Label | Type |
|---|---|---|
| 1 (33) | `Dependent Last Name` | text |
| 2 (656) | `Dependent First Name` | text |
| 3 (1280) | `Dependent Date of Birth` | date (calendar icon) |

Results: `SEARCH RESULTS` heading, same 10 columns and **the same 30 rows as P4** (text-diffed: identical cell text), count `30 record(s) found.` below the table, no pagination.

---

### Participant — picklist values seen

| Field | Screen | Values seen |
|---|---|---|
| Employer (Participant Search) | P1, P4, P7 | `--None--` |
| Employer (Claim Search) | P2 / P6 | `--None--` / `QA Test Employer Group - CBSR` |
| Plan Year | P6 | `--None--` |
| Expense Type | P6 | `--None--` |
| Escalation State | P6 | `Either` |
| Records per page | P5 | `10` |

No picklist was captured open; full option lists unknown (?). Employer names that appear as data (candidate Employer options, NOT seen in a picklist): ArmadaCare, Blalock Development Co, Cascade Technologies Inc, E&J Gallo Winery, E&J Gallo Winery Active, E&J Gallo Winery Ret 65P, Flushing Kent Realty Management LLC, HVAC and Associates, Meridian Partners LLC, QA Test Employer Group - CBSR, Unifi Aviation, LLC.

Other text-input values seen: Last Name `A` (P4, P7); Employer Name `A` (P5).

### Participant — visual notes (for SLDS standardisation)

- Participant/Claim tabs: brand Search button is light olive green, bold labels; Clear neutral. Employer tab: Search is dark olive, Clear neutral with olive text; Search has focus ring on P5. → render all as standard SLDS brand/neutral.
- Checkboxes: Participant/Claim tabs use small olive checkboxes; Employer tab uses blue standard checkboxes.
- Sub-heading "Participant Information" / "Claim Information" is plain bold text; "Participant IDs", "Dependent Information", "Claimant Information", "Claim Details", "Bucket (Benefit Category)", "Date Filters", "Claim Amount Range" are shaded section-title bands (`slds-section__title` look).
- Checkbox-group legends on Participant/Claim tabs end with a colon (`Claim Status:`, `Participant Status:`…); Employer tab legend `Status` has none.
- Results headings differ by tab: Participant `SEARCH RESULTS` (caps) with count below table in italic; Employer `Search Results` with count right-aligned beside heading.

---

## B. Accounts Dashboard

### D1 — 2:5437 · Account Intelligence View / My Accounts

State: object home in "Account Intelligence" (pipeline-inspector) layout, **empty** (0 items). Nav item `Accounts`. No workspace tabs. Frame 1920×984. (No grey band glitch on this screen.)

**Page header** (grey object-home header)

| Item | Value |
|---|---|
| Object icon | Accounts standard icon (blue/purple square, 32×32) |
| Object label (small) | `Accounts` |
| List view picker | **`My Accounts`** (large bold) + ▼ (`LstListViewPicker`) |
| Right-side controls, in order | icon button gear ▾ (list view controls) · icon button refresh · icon button pencil (`…InlineEditButton`) · button group: `New` · `List View` · ▼ menu (`LightningButtonMenu`) |

**Filter bar** (right-aligned, inside white card)

| Item | Value |
|---|---|
| `Activity` (label) | button **`All Time`** with chevron-down (`Button - Time Period Filter: All Time`) |
| `Owner` (label) | button **`Me`** with search (magnifier) icon (`Button - Account owner filter: Me`) |
| Icon button group | bookmark (outline) · filter (funnel) |
| Help text (tooltip on bookmark button, visually hidden) | `Shows the accounts you mark as important. If you f…` (?) — full text truncated at 50 chars in the Figma layer name and tooltip not visible in screenshot |

**Metric tiles** (`Runtime_pipeline_inspectorKpiPanel`, clickable buttons, label over large value)

| # | Label | Value | Selected |
|---|---|---|---|
| 1 | `Total Accounts` | `0` | **✔** (bordered/rounded tile, light grey fill) |
| 2 | `With Opportunities` | `0` | |
| 3 | `No Recent Activity` | `0` | |
| 4 | `With Upcoming Activity` | `0` | |

**List toolbar** (grey band above list)
- Meta line (left): **`0 items • Filtered by Last Activity, Me, Total Accounts`** (full text read from screenshot).
- Buttons (right, button group, neutral): `Add to an Actionable List` · `Assign Label`.

**Empty state** (grey panel, centred desert/cactus illustration)
- Heading: **`Get your accounts engaged`**
- Body: **`When there are accounts that match your selections, you'll see them here.`** (full text read from screenshot; layer name truncated)

No table/columns rendered (empty). Picklist values seen: Activity = `All Time`; Owner = `Me`; list view = `My Accounts`.
