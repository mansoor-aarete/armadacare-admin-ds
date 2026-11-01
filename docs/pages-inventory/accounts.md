> Detailed screen spec extracted from the Figma file `iiZjEBlMVcWNHALIB4qKBB` (text layers + screenshots, see docs/pages-inventory.md §1). Values are verbatim; "(?)" marks uncertainty.

# Accounts — page specifications (Figma screens A1–A9)

Source: Figma meta (`figma_meta.xml`) text layers + layer tree (positions), screenshots in `figma/`.
Helper outputs used: `inv/f-46225.txt`, `inv/f-55718.txt` (per-field structure of record pages), `inv/form-51331.txt`, `inv/form-48122.txt` (per-row structure of the create form).

Legend used in field tables
- **✎** = inline-edit pencil present (editable). **RO** = no pencil (read-only / formula).
- **ⓘ** = help-text icon next to the label (help text itself is not captured anywhere).
- **☐ / ☑** = read-only checkbox output unchecked / checked (unchecked glyph renders as a dotted square in the capture — glyph loss; render a normal SLDS unchecked checkbox).
- **link** = value rendered as a link (brand/olive link colour). **lookup** = user/record lookup link with avatar.
- Column: **L** = left column (label x≈441, value x≈592, pencil x≈881); **R** = right column (label x≈929, value x≈1080, pencil x≈1369). Detail grid width 976 px, 2 × 488 px.
- Empty value cells are left blank.

Shared chrome (all 9 screens): global header (org badge "Sandbox (CXDev)", "Search...", favorites ★▼, +, ?, gear, bell, avatar), context bar (app launcher, "ArmadaCare Admin Portal" [truncated "ArmadaCare Admin..."], object nav item **"Accounts"** with ▼ "Show Navigation Menu"), utility bar "Omni-Channel". Ignore the blank grey band under the global header (capture artefact).

---

## 0. Screen summary

| Code | Node | Frame name | Size | State shown | Workspace tabs (→ = active) | Split view |
|---|---|---|---|---|---|---|
| A1 | 2:41037 | Accounts New This Week \| Accounts \| Salesforce | 1920×1018 | Object home / list view, default, no selection | none (object nav item "Accounts" is the active item) | no |
| A2 | 2:42291 | AGent 1 \| Account \| Salesforce | 1920×3348 (png scaled 1495 w) | Record page, Details tab, **Delete Account modal open** | New Account: Group ✕ · → AGent 1 \| Account ▼ ✕ | yes, "4 items selected" |
| A3 | 2:44211 | AGent 1 \| Account \| Salesforce | 1920×3348 (scaled) | Record page, Details tab, **Share modal open**, Search lookup focused | same as A2 | yes, "4 items selected" |
| A4 | 2:46225 | AGent 1 \| Account \| Salesforce | 1920×3348 (scaled) | Record page (Broker Agency record type), Details tab, default | same as A2 | yes, "4 items selected" |
| A5 | 2:48122 | New Account: Group \| Salesforce | 1920×911 | Create form (Group), scrolled to Background Information, **error popover "We hit a snag." open** over docked footer | → New Account: Group ✕ | yes, "2 items selected", list scrolled |
| A6 | 2:51331 | New Account: Group \| Salesforce | 1920×911 | Create form (Group), top of form, Account Name in **error state** ("Complete this field.") | → New Account: Group ✕ | yes, "2 items selected", list scrolled |
| A7 | 2:54505 | New Account \| Salesforce | 1920×1310 | Record-type picker ("New Account"), "Group" selected | → New Account ✕ | yes, "22 items • Updated a few seconds ago" (no selection) |
| A8 | 2:55068 | Account Hierarchy \| Salesforce | 1920×1310 | Account Hierarchy sub-tab open inside the Blalock workspace tab | New Account: Group ✕ · AGent 1 \| Account ▼ ✕ · → Blalock Development Co \| Account ▼ ✕ ; **sub-tabs**: Blalock Development Co \| Account · → Account Hierarchy ▼ ✕ | yes, "4 items selected" |
| A9 | 2:55718 | Blalock Development Co \| Account \| Salesforce | 1920×5858 (png scaled 986 w) | Record page (Group record type), Details tab, **actions overflow ▼ menu open** | New Account: Group ✕ · AGent 1 \| Account ▼ ✕ · → Blalock Development Co \| Account ▼ ✕ | yes, "4 items selected" |

Workspace-tab details: every tab has the Account object icon (building/grid glyph) before the label. The first workspace tab "New Account: Group" has only ✕; record tabs ("AGent 1 | Account", "Blalock Development Co | Account") have ▼ and ✕. Long labels are truncated in the tab ("Blalock Developme…", sub-tabs "Blalock Develop…", "Account…").

Two distinct record page layouts exist: **Broker Agency** layout (A2/A3/A4, record "AGent 1") and **Group** layout (A9, record "Blalock Development Co"); the create form (A5/A6) is the **Group** layout (`ForcegeneratedDetailpanel_account___012400000009l6vaaq___full___create___recordlayout2`).

---

## 1. A1 — List view "Accounts New This Week" (2:41037)

### Header (LstListViewManagerHeader)
- Object icon (blue square, Account) · breadcrumb **"Accounts"** · title **"Accounts New This Week"** + ▼ (list view picker) · **pin** button (LstListViewManagerPinButton, outline pin icon).
- Header buttons (button group, right, in order): **New** · **Discover Companies** · **Import** · **Printable View** · **Add to an Actionable List** · **▼** (overflow; menu not shown).
- Meta line: **"22 items • Sorted by Account Name • Updated 2 minutes ago"**.
- Toolbar (right, in order): search input placeholder **"Search this list..."** · List View Controls (gear ▼, LstListViewManagerSettingsMenu) · Select list display (table icon ▼, LstListViewManagerDisplaySwitcher) · then LstListViewManagerButtonBar: Refresh (↻) · ↑↓ icon button (?: no label in layers; likely sort/"Sort by") · pencil (Edit list / inline edit) · button group [pie-chart (Show charts) · filter (Show filters, stateful)]. Labels for icon buttons are inferred (?) — layers carry no names.

### Table "Table - Accounts New This Week" (LightningDatatable)
Header row is blank in the capture (artefact) — labels come from layer names `Header Cell - …`. Columns (in order), widths from layer tree:

| # | Header label | Width px | Cell type | Notes |
|---|---|---|---|---|
| 0 | (Row Number / select) | 52 | checkbox | select-all checkbox in header |
| 1 | Account Name | 518 | link | sorted ascending (sort arrow icon in header); every header has a column-action ▼ button |
| 2 | Mailing State/Province | 83 | text | |
| 3 | Date of Armada Implementation | 184 | date text | |
| 4 | Original Effective Date | 154 | date text | |
| 5 | Armada Business Unit | 329 | text | |
| 6 | UH Covered Lives | 69 | number | values render left-aligned at the column start in the capture (x 1361 = header text x) |
| 7 | Account Manager | 295 | link | |
| 8 | Account Owner Alias | 151 | link | |
| 9 | (Action) | 50 | row-action ▼ button | |

Rows (22, all unchecked):

| # | Account Name | Mailing State/Province | Date of Armada Implementation | Original Effective Date | Armada Business Unit | UH Covered Lives | Account Manager | Account Owner Alias |
|---|---|---|---|---|---|---|---|---|
| 1 | AGent 1 |  |  |  |  | 0 |  | gkaly |
| 2 | ArmadaCare |  | 4/1/2014 |  | Armada Care | 0 |  | zachman |
| 3 | Blalock Development Co |  | 12/16/2021 | 1/1/2013 | Armada Care | 0 | Donna Walter | eelle |
| 4 | Cascade Technologies Inc | WA |  |  | Armada Care | 0 |  | fyue |
| 5 | E&J Gallo Winery |  | 1/1/2008 | 1/1/2008 | Armada Care | 0 | Kathryn Stacy Bernal | eelle |
| 6 | E&J Gallo Winery Active |  | 1/1/2008 | 1/1/2008 | Armada Care | 0 | Kathryn Stacy Bernal | eelle |
| 7 | E&J Gallo Winery Ret 65P |  | 1/1/2008 | 1/1/2008 | Armada Care | 0 | Kathryn Stacy Bernal | eelle |
| 8 | Flushing Kent Realty Management LLC |  | 1/31/2020 | 3/1/2014 | Armada Care | 0 | Chris Esser | eelle |
| 9 | For Test |  |  |  | Armada Administrators | 0 |  | abhus |
| 10 | HVAC and Associates | AZ |  |  | Armada Care | 0 |  | aramo |
| 11 | JP Test V1 |  |  |  | Armada Care | 0 |  | pjaka |
| 12 | Meridian Partners LLC | IL |  |  | Armada Care | 0 |  | fyue |
| 13 | QA Test Broker Agency - CBSR |  |  |  |  | 0 |  | arma |
| 14 | QA Test Employer - CBSR Role |  |  |  |  | 0 |  | jsmit |
| 15 | QA Test Employer Group - CBSR |  |  |  | Armada Care | 0 |  | arma |
| 16 | SAL952 |  |  |  | Armada Care | 0 |  | mrath |
| 17 | Test |  |  |  | Armada Care | 0 |  | gkaly |
| 18 | Test 1501 |  |  |  |  | 0 |  | malv |
| 19 | Test Aarete |  |  |  | Armada Care | 0 |  | lmegh |
| 20 | TEST VS GROUP |  |  |  | Armada Care | 0 |  | vsalu |
| 21 | Unifi Aviation, LLC |  | 8/8/2018 | 8/1/2018 | Armada Care | 0 | Donna Walter | eelle |
| 22 | VS Test |  |  | 1/1/2026 | Armada Care | 0 | Deepak Malviya | vsalu |

---

## 2. Split-view list (record pages A2–A9)

Same list on every record/form screen.

- Header: object icon · **"Accounts New This Week"** + ▼ (list view picker) · boxed ▼ button at right of title (list controls, 32×32; label not captured (?)) · pin button under the title.
- Meta line (left) varies: A2/A3/A4/A8/A9 **"4 items selected"**; A5/A6 **"2 items selected"**; A7 **"22 items • Updated a few seconds ago"**.
- Meta-row controls (right): display switcher (table icon ▼) · Refresh (↻).
- Search input placeholder **"Search this list..."**.
- Column header row: select-all checkbox (shows "−" indeterminate when some selected; empty in A7) · **"Account Name"** with ↑ (sorted ascending) · info (i) icon button at far right.
- Item layout: checkbox · line 1 = Account Name (link) with **Mailing State/Province** right-aligned on line 1; line 2 = **Date of Armada Implementation** (left) and **Original Effective Date** (right-aligned).
- Collapse handle "◂" on the panel's right edge (24 px vertical button).

| # | Title (line 1) | Line 1 right | Line 2 left | Line 2 right | Selected in A2/A3/A4/A8/A9 |
|---|---|---|---|---|---|
| 1 | AGent 1 | | | | ☑ |
| 2 | ArmadaCare | | 4/1/2014 | | ☑ |
| 3 | Blalock Development Co | | 12/16/2021 | 1/1/2013 | |
| 4 | Cascade Technologies Inc | WA | | | |
| 5 | E&J Gallo Winery | | 1/1/2008 | 1/1/2008 | |
| 6 | E&J Gallo Winery Active | | 1/1/2008 | 1/1/2008 | |
| 7 | E&J Gallo Winery Ret 65P | | 1/1/2008 | 1/1/2008 | |
| 8 | Flushing Kent Realty Management LLC | | 1/31/2020 | 3/1/2014 | |
| 9 | For Test | | | | |
| 10 | HVAC and Associates | AZ | | | |
| 11 | JP Test V1 | | | | |
| 12 | Meridian Partners LLC | IL | | | |
| 13 | QA Test Broker Agency - CBSR | | | | |
| 14 | QA Test Employer - CBSR Role | | | | |
| 15 | QA Test Employer Group - CBSR | | | | |
| 16 | SAL952 | | | | ☑ |
| 17 | Test | | | | ☑ |
| 18 | Test 1501 | | | | |
| 19 | Test Aarete | | | | |
| 20 | TEST VS GROUP | | | | |
| 21 | Unifi Aviation, LLC | | 8/8/2018 | 8/1/2018 | |
| 22 | VS Test | | | 1/1/2026 | |

Selection notes: A2/A3/A4/A9 screenshots confirm AGent 1, ArmadaCare, SAL952, Test checked. A8 shows AGent 1 checked (rest consistent). A5/A6: list is scrolled (starts at "For Test" partially); all visible rows (For Test … VS Test) are unchecked, so the 2 selected items are above the fold (which ones (?) — not visible). A7: no selection, all unchecked. Note the meta line in record screens is "N items selected" (replaces the "22 items • …" text).

---

## 3. Record page — "AGent 1" (Broker Agency layout) — A4 2:46225 (also base of A2, A3)

### Highlights panel (RecordsHighlights2)
- Icon (blue Account icon) · object label **"Account"** · record name **"AGent 1"**.
- Actions (right, in order): **View Account Hierarchy** icon button (SfaOutputNameWithHierarchyIconAccount, hierarchy glyph) · **+ Follow** · button group **Send with Docusign** · **Sharing** · **Delete** · **▼** (overflow; menu not shown on this screen).
- Detail fields (label / value): **Active Groups** / (empty) · **Inactive Groups** / (empty) · **# of Downstream Brokers** / (empty).

### Related List Quick Links (card, title has ⓘ help icon)
Two rows, 7 per row, each with coloured object icon. No "Show All" link on this layout.

| Row | Links (in order) |
|---|---|
| 1 | Account Team (0) · Opportunities (0) · Contacts (0) · Affiliated Groups (1) · Open Activities (0) · Activity History (0) · Notes & Attachments (0) |
| 2 | Account History (2) · Plans/Packages (TEST) (0) · Executive Physicals (0) · Identified Providers (0) · Portal Information Target (0) |

Icon colours seen (approx.): Account Team orange, Opportunities orange, Contacts purple, Affiliated Groups yellow-olive, Open Activities teal (wrench-like glyph), Activity History teal, Notes & Attachments grey; Account History blue/indigo, Plans/Packages (TEST) teal, Executive Physicals grey (glyph), Identified Providers grey (glyph), Portal Information Target pink-red. ("Portal Information Target (0)" wraps to 2 lines.)

### Main tabset (left column, 976 px)
Tabs: **Details** (active) · Related · Report · ZoomInfo. A "More" LightningButtonMenu exists in the layer tree after ZoomInfo but is not visible in the screenshot (overflow container, hidden) (?).

All sections are expanded (chevron ▾). First section has **no title** (untitled section).

#### Section (untitled) — 2-column

| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Account Name | AGent 1 | ✎ | Account Record Type | Broker Agency | change-record-type icon button (no pencil) |
| 2 | Doing Business As | | ✎ | Account Owner | Gaurav kalyankar (lookup) | change-owner icon button (no pencil) |
| 3 | Website | | ✎ | Account Manager | | ✎ |
| 4 | Parent Account | | ✎ | Type | Prospect | ✎ |
| 5 | National Affiliation | | ⓘ ✎ | Status | | ✎ |
| 6 | Current Reference | ☐ | ✎ | Contacting Restrictions | | ⓘ ✎ |
| 7 | Testimonial Provided | | ✎ | Account Source | | ✎ |
| 8 | Allow Edit | | ⓘ ✎ | Broker & Distribution Assessment | | ✎ |
| 9 | Key Decision Maker Present | ☐ | ✎ | Partnerships | | ✎ |
| 10 | Reason Unqualified | | ✎ | | | |
| 11 | Acct | 1 | RO | | | |
| 12 | Concierge Run Out | | ✎ | | | |
| 13 | Territory Owner | | ✎ | | | |
| 14 | Territory Region | | RO | | | |
| 15 | Account Territory Region | | RO | | | |
| 16 | Agency Ranking | | ✎ | | | |
| 17 | Active Billing Contact | ☐ | ✎ | | | |
| 18 | Accelerated Comp | | ✎ | | | |
| 19 | Parent Comp | | RO | | | |
| 20 | Total UH Equivalent Lives | 0.00 | RO | | | |
| 21 | Calculated Segment | | ✎ | | | |
| 22 | Incorporation State | | ✎ | | | |
| 23 | SOC Report Delivered | | ✎ | | | |
| 24 | Last Office Visit | | ✎ | | | |
| 25 | W9 Received | | ✎ | | | |
| 26 | C Corporation | ☐ | ✎ | | | |
| 27 | DSS Registration | | ✎ | | | |
| 28 | Navigator/Member Communication | | ✎ | | | |
| 29 | Opened PCP | | ✎ | | | |
| 30 | Opened Specialist | | ✎ | | | |
| 31 | Persona | Boutique | RO | | | |
| 32 | Brokers at Account | 0 | ✎ | | | |
| 33 | ZI Products and Services | | ✎ | | | |
| 34 | Partner Tier | | ✎ | | | |
| 35 | Clean County | | ✎ | | | |
| 36 | Priority | 4 | RO | | | |
| 37 | Next QBR Month | | ✎ | | | |
| 38 | # of KPI Covered Lives | | ✎ | | | |
| 39 | Production ID | | ✎ | | | |

#### Section "Agency Demographics"

| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Active Groups | | ✎ | Inactive Groups | | ✎ |
| 2 | TIN | | ⓘ ✎ | Broker-Producer Rating Key | | ⓘ ✎ |
| 3 | Legal Entity | | ✎ | Engagement Priority | | ⓘ ✎ |
| 4 | Company Ownership | | ✎ | Industry Focus | | ✎ |
| 5 | Corporate Office | ☐ | ✎ | Client Focus | | ⓘ ✎ |
| 6 | | | | Firm Reach | | ✎ |

#### Section "Address & Contact Information"

| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Payment Address Type | | ✎ | Mailing Address | | ✎ |
| 2 | Payment Street | | ⓘ ✎ | Phone | | ✎ |
| 3 | Payment City | | ✎ | Geolocation | | ✎ |
| 4 | Payment State | | ✎ | | | |
| 5 | Payment Zip Postal Code | | ✎ | | | |
| 6 | Payment Country | | ✎ | | | |

#### Section "ZoomInfo" (all values empty, all ✎)

| Row | L label | R label |
|---|---|---|
| 1 | ZI Company Name | ZI Employee Range |
| 2 | ZI Company Description | ZI Company Employees |
| 3 | ZI Company Phone | ZI Industry |
| 4 | ZI Company Fax | ZI Revenue |
| 5 | ZI Company Ranking | ZI Revenue Range |
| 6 | ZI Ticker Symbol | ZI Company Website |
| 7 | ZI SIC Codes | ZI Company Profile URL |
| 8 | ZI NAICS Codes | ZI Company ID |
| 9 | ZI Company State | ZI Ultimate Parent Company Name |
| 10 | ZI Company Street | ZI Ultimate Parent Company ID |
| 11 | ZI Company City | ZI Parent Company ID |
| 12 | ZI Company Country | ZI Parent Company Name |
| 13 | ZI Company Zip | ZI Company is Defunct |

#### Section (untitled, no header) — full-width rows
| Row | Label | Value | Flags |
|---|---|---|---|
| 1 | Office Location | | ✎ (pencil at far right, full-width row) |
| 2 | Home Location | | ✎ (full-width row) |

#### Section "Armada Agency Information"

| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Armada Region | United States | ✎ | Direct Deposit | | ✎ |
| 2 | Armada Business Unit | | ✎ | | | |

#### Section "EUC Information"

| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Mega | | ⓘ ✎ | EUC Clients | | ✎ |
| 2 | Large | | ⓘ ✎ | RegisteredTimeStamp | | ✎ |
| 3 | Mid | | ⓘ ✎ | EUC Status | | ✎ |
| 4 | Typical | | ⓘ ✎ | | | |
| 5 | Mini | | ⓘ ✎ | | | |
| 6 | Micro | | ⓘ ✎ | | | |

#### Section "Custom Links" (3 columns of links, x 441 / 772 / 1095)
**Google Search** · **Google News** · **Hoovers Profile** (all links).

#### Section "System Information"

| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Created By | Gaurav kalyankar (lookup), 7/17/2026 3:35 AM | RO | Mark for Delete | ☐ | ⓘ ✎ |
| 2 | Last Modified By | Gaurav kalyankar (lookup), 7/17/2026 3:35 AM | RO | Reason for Deletion | | ✎ |
| 3 | BenefitPoint ID | | ✎ | Other Reason for Deletion | | ✎ |
| 4 | Active Oppty Id | | ✎ | Id | AGN-1029006 | ✎ (pencil present in layer + screenshot) |
| 5 | Acct ID 18 | 001Ec00002JBm5RIAT | RO | General Agency Name | AGent | RO |

No form footer visible (RecordsFormFooter height 0 — view mode).

### Right sidebar (482 px column)
1. **Next Best Action** card — header with Einstein illustration (blue sky/clouds); body text: **"Einstein doesn't have any recommendations for you right now."**
2. Tabset card, single tab **"Duplicates"** (active) — content row with orange duplicate icon + **"We found no potential duplicates of this Account."** (a hidden "More" tab-overflow menu exists in layers (?)).
3. Tabset card, single tab **"Activity"** (active) — content empty in A4 (panel 8 px high). (hidden "More" overflow in layers (?)).

### Related lists
None rendered on the Details tab (Related tab not captured).

---

## 4. A2 — Delete Account modal (2:42291)

Background = A4 page (identical text), dimmed by modal backdrop.

| Part | Content |
|---|---|
| Close | ✕ icon button above the modal's top-right corner |
| Title (Heading 1, centered) | **Delete Account** |
| Body (centered) | **Are you sure you want to delete this account?** |
| Footer buttons (right) | **Cancel** (neutral) · **Delete** (brand/olive) |

---

## 5. A3 — Share modal (2:44211)

Background = A4 page. Modal "Dialog - Share".

| Part | Content |
|---|---|
| Close | ✕ icon button above modal top-right |
| Title (Heading 2, centered) | **Share** |
| Field 1 | Label **"Search"**; lookup with **object switcher** (User object icon + ▼; layer "Button - Search—Current Selection: User, Pick an object"); input placeholder **"Search User..."**; search icon at right; **focused** (dark thick border). Hidden assistive text (not visible in screenshot): "To remove the selected record, press Backspace or …" (truncated in layer) with an info icon. |
| Fields 2–5 (one row, inline) | 4 required picklists (red `*`): **Account Access** = **Read Only** · **Case Access** = **Private** · **Contact Access** = **Private** · **Opportunity Access** = **Private** |
| Text row | **"Shared with 5 groups of users."** followed by inline link **"Edit"** |
| Footer buttons | **Cancel** (neutral) · **Save** (brand) |

---

## 6. A6 / A5 — Create form "New Account: Group" (2:51331 top, 2:48122 bottom)

Both frames contain the **entire** form in their layer tree (scroll content); A6 shows the top viewport, A5 the Background Information area with the error popover. The form is rendered as a centered panel inside the "New Account: Group" workspace tab (RecordsModalLwcDetailPanelWrapper), split view on the left.

- Title (Heading 2, centered): **New Account: Group**
- Legend (right): red **`*`** **" = Required Information"**
- Layout: **horizontal labels** (label left of input), 2 columns: L label x≈834 / input x≈936 (w≈207); R label x≈1176 / input x≈1278 (w≈207). Long labels wrap ("Account Record Type", "Primary Group Contact"…).
- Footer (docked, sticky at bottom of panel): **Cancel** · **Save & New** · **Save** (brand). In A5 an **error icon button (red ⊘)** sits to the left of Cancel; in A6 it is not visible.
- Error state (A6 & A5): **Account Name** input has red border and message **"Complete this field."** below it. Required `*` exists in the Account Name label layer but is drawn under the label text (overlap, not visible in capture).
- Error popover (A5, anchored to footer error icon, pointer at bottom): header (dark red band, ⊘ icon) **"We hit a snag."**; body bold **"Review the following fields"**; bullet list: **• Account Name** (link).

Types: text = text input; number = number input (spin); date = date input with calendar icon; datetime = Date + Time pair; picklist = combobox ▼; lookup = search combobox w/ placeholder + magnifier; dual listbox = Available / Chosen boxes with ▸ ◂ move buttons; checkbox; textarea; compound address = "Address Search" lookup (placeholder "Search Address") + Street textarea + City / State/Province / Zip/Postal Code / Country inputs. Fields missing from the form vs detail view are read-only/formula fields.

### Section (untitled, first section)

| Row | Col | Label | Req | Type | Value / placeholder | ⓘ | Notes |
|---|---|---|---|---|---|---|---|
| 1 | L | Account Name | * | text | (empty) | | error "Complete this field." |
| 1 | R | Account Record Type | | read-only text | Group | | |
| 2 | L | Doing Business As | | text | | | |
| 2 | R | Account Owner | | read-only lookup w/ avatar | Mansoor Ahmad | | |
| 3 | L | Parent Account | | lookup (Account) | "Search Accounts..." | | |
| 3 | R | Territory Owner | | text | | | |
| 4 | L | Primary Group Contact | | lookup (Contact) | "Search Contacts..." | | |
| 4 | R | Account Manager | | lookup (User) | "Search People..." | | |
| 5 | L | Phone | | text (phone) | | | |
| 5 | R | Type | | picklist | **Prospect** | | |
| 6 | L | Fax | | text (phone) | | | |
| 6 | R | Status | | picklist | **Inactive** | | link "View all dependencies" under it (controlling field) |
| 7 | L | Key Decision Maker Present | | checkbox | unchecked | | |
| 7 | R | Last Status Update | | date | | | |
| 8 | L | Referred By | | lookup (Account) | "Search Accounts..." | | |
| 9 | L | Concierge Effective Date | | date | | | |
| 9 | R | Free Trial Effective Date | | date | | | |
| 10 | L | Concierge Run Out | | picklist | --None-- | | |
| 10 | R | Free Trial Termination Date | | date | | | |
| 11 | L | Calculated Segment | | text | | | |
| 11 | R | Free Trial Status | | picklist | --None-- | | |
| 12 | L | Incorporation State | | picklist | --None-- | | |
| 12 | R | Communication Suppression | | dual listbox | Available: Welcome Kit, Monthly Engagement Emails, Operational Emails, MVP, Sync · Chosen: (empty) | | |
| 13 | L | Corporate Address | | compound address | Address Search ("Search Address"), Corporate Street (textarea), Corporate City, Corporate State/Province, Corporate Zip/Postal Code, Corporate Country | | |
| 13 | R | Count DD | | number | | | |
| 14 | L | SOC Report Delivered | | date | | | |
| 14 | R | Count Portal | | number | | | |
| 15 | L | DSS Registration | | number | | | |
| 15 | R | Count Rx | | number | | | |
| 16 | L | Navigator/Member Communication | | picklist | --None-- | | |
| 16 | R | DD Recommendation | | checkbox | unchecked | | |
| 17 | L | Opened PCP | | number | | | |
| 17 | R | Portal Recommendation | | checkbox | | | |
| 18 | L | Opened Specialist | | number | | | |
| 18 | R | RX Recommendation | | checkbox | | | |
| 19 | L | Sirius Place Holder | | number | | | |
| 20 | L | Sirius Policy Number | | text | | | |
| 21 | L | Plan Type | | picklist | --None-- | ⓘ | |
| 22 | L | Plan Type Multi-Pick | | dual listbox | Available: Expense Reimbursed, Indemnity, DentaPak, WellPak · Chosen: (empty) | | |
| 23 | L | Docusign Master ID | | text | | | |
| 24 | L | (blank spacer row) | | | | | |
| 25 | L | Officer Name | | lookup (Contact) | "Search Contacts..." | | |
| 26 | L | (blank spacer row) | | | | | |
| 27 | L | Agent Name | | lookup (Contact) | "Search Contacts..." | | |
| 28 | L | Concierge Type | | picklist | --None-- | | |
| 29 | L | Active Medical Plans | | number | | | |
| 30 | L | Original UH Quoted Lives | | number | | | |
| 31 | L | Original PH Quoted Lives | | number | | | |
| 32 | L | PSR Effective Date | | date | | | |
| 33 | L | PSR Termination Date | | date | | | |
| 34 | L | Next QBR Month | | number | | | |
| 35 | L | WEX Setup | | date | | | |
| 36 | L | Admin Landing Page | | text (url) | | | |
| 37 | L | # of KPI Covered Lives | | number | | | |
| 38 | L | Production ID | | text | | | |

### Section "At Risk"
| Row | Col | Label | Type | Value | ⓘ | Notes |
|---|---|---|---|---|---|---|
| 1 | L | Monthly AT RISK Status | picklist | **Green** | | "View all dependencies" |
| 1 | R | Red/Yellow Alert Reason | picklist | --None-- | | "View all dependencies" |
| 2 | R | Last Monthly AT-Risk Change | date | | | |

### Section "Relationship/Opportunity Details"
| Row | L label (type) | R label (type) |
|---|---|---|
| 1 | Original Effective Date (date) | # of UH Covered Lives (number) ⓘ |
| 2 | Synched Effective Date (date) | # of CM Covered Lives (number) |
| 3 | Date of Armada Termination (date) | # of PH Covered Lives (number) |
| 4 | Premium Invoice Date (date) | # TD Connect Covered Lives (number) ⓘ |
| 5 | UH Latest Month Premium (number/currency) | # of EC Covered Lives (number) |
| 6 | PH Latest Month Premium (number/currency) | # TDCGA Covered Lives (number) ⓘ |
| 7 | CM Latest Month Premium (number/currency) | # TMH Covered Lives (number) ⓘ |
| 8 | EC Latest Month Premium (number/currency) | Segment (picklist, --None--) ⓘ |
| 9 | Reason Lost (picklist, --None--, "View all dependencies") | Employees (number) |
| 10 | Reason Unqualified (picklist, --None--) | Number of Executives (number) ⓘ |
| 11 | | Number of Retirees (number) |

### Section "Background Information" (visible in A5)
| Row | L label (type) | R label (type) |
|---|---|---|
| 1 | Corporate Office (checkbox) | Website (text/url) |
| 2 | Executive Travel (checkbox) | Contacting Restrictions ⓘ (dual listbox; Available: None, Unknown, Do Not Mail, Do Not Email, Do Not Call, Do Not Market - All, Do Not Market- EUC, Do Not Market - RSL; Chosen empty) |
| 3 | Current Reference (checkbox, unchecked) | Preferred Communication Method (picklist, --None--) |
| 4 | Testimonial Provided (date) | Participant Summary (dual listbox, group label bold; Available: Admin, Participant; Chosen empty) |
| 5 | Company Ownership (picklist, --None--) | Industry (picklist, --None--) |
| 6 | Company Reach (picklist, --None--) | High Level Industry (text) |
| 7 | Sell to (picklist, --None--) | Account Source (picklist, --None--) |
| 8 | | Fortune Ranking (number) |
| 9 | | Legal Entity (picklist, --None--) |
| 10 | | TIN (text) ⓘ |

### Section "Group Information"
| Row | L label (type) | R label (type) |
|---|---|---|
| 1 | Primary Plan Renewal Month (picklist, --None--) | Current Programs ⓘ (dual listbox; Available: Accident Insurance, Advocate Programs, Cancer Insurance, Case Management, Critical Illness, Dental, Disease Management, EAP, Exec. Disability, Executive Compensation Planning, FSA, Health, HRA, HSA, International, Medical Navigation &/or Support, Travel, Vision, Wellness, None; Chosen empty) |
| 2 | Primary Medical Plan Renewal Date (date) | Dental Plan Present (checkbox) |
| 3 | | Vision Plan Present (checkbox) |

### Section "Armada Group Details"
| Row | L label (type, value) | R label (type, value) |
|---|---|---|
| 1 | External Ids Synced (checkbox) ⓘ | Date of Armada Implementation (date) |
| 2 | UH Carrier (picklist, --None--) | ACH (picklist, --None--) |
| 3 | Armada Business Unit (picklist, **Armada Care**) | |
| 4 | Armada Region (picklist, **United States**) | |

### Section "Data.Com Information"
| Row | L | R |
|---|---|---|
| 1 | Account Site (text) | Ownership (picklist, --None--) |
| 2 | Annual Revenue (number/currency) | SIC Code (text) |
| 3 | Description (textarea) | SIC Description (text) |
| 4 | | Ticker Symbol (text) |

### Section "Claims Information"
| Row | L | R |
|---|---|---|
| 1 | HRA In Place (picklist, --None--) | Claims Status (picklist, --None--) |
| 2 | HRA Pays First (picklist, --None--) | Date of Claims Status Change (date) |
| 3 | Enrollees Contribute to an FSA (picklist, --None--) | DOS of Claims on Hold (date) |
| 4 | Sirius Transition Date (date) | Claims Hold Reason (picklist, --None--) |
| 5 | # of RSL Claims (text) | Other Claims Hold Reason (text) |
| 6 | RSL Claim Volume (number) | Run-Out Claims (picklist, --None--) |
| 7 | Last RSL Claim Update (date) | |

### Section "GeoPointe"
| Row | L | R |
|---|---|---|
| 1 | GeoPointeGeolocation (fieldset: **Latitude** text, **Longitude** text) | Clean City (text) |
| 2 | Geocode Retrieval Time (datetime: **Date** + **Time**) | Clean Street (text) |
| 3 | Geocode Quality (text) | Clean State (text) |
| 4 | | Clean County (text) |
| 5 | | Clean Postal Code (text) |
| 6 | | Clean Country (text) |
| 7 | | Clean ISO Country (text) |

### Section "EUC Information"
| Row | L | R |
|---|---|---|
| 1 | Number of Active Participants (number) | EUCPolicyNum (text) ⓘ |
| 2 | Number Of Covered Lives (number) | RegisteredTimeStamp (datetime Date + Time) |
| 3 | RegistrationStep (number) | Release Requested (datetime Date + Time) |
| 4 | Former EUC GOLD (checkbox) ⓘ | DocuSign Returned Date (datetime Date + Time) |
| 5 | GOLD Client Contact Date (date) ⓘ | EUC Status (picklist, --None--) |
| 6 | | Lincoln Data Processed (checkbox) ⓘ |
| 7 | Primary Health Insurance (picklist, --None--) | |

### Section "Address Information"
| Row | L | R |
|---|---|---|
| 1 | Payment Address Type (picklist, --None--) | Mailing Address (compound: Address Search "Search Address", Mailing Street textarea, Mailing City, Mailing State/Province, Mailing Zip/Postal Code, Mailing Country) |
| 2 | Payment Street (textarea) ⓘ | Situs Street (text) |
| 3 | Payment City (text) | Situs City (text) |
| 4 | Payment State (text) | Situs State (picklist, --None--) |
| 5 | Payment Zip Postal Code (text) | Situs Zip Code (text) |
| 6 | Payment Country (text) | |

### Section "Latest RFP Information (Originally provided and/or updated as necessary)"
| Row | L | R |
|---|---|---|
| 1 | Primary Medical Base Plan Carrier (text) | Primary Medical Base Plan Renewal Date (date) |
| 2 | Employer HRA Contribution-Family (number/currency) | Dental Plan Carrier (text) |
| 3 | Employer HRA Contribution-Single (number/currency) | Vision Plan Carrier (text) |
| 4 | Medical Reimb Plan (Competitor) (checkbox) | Medical Reimbursement Name (text) |

### Section "Participant/Members" (full-width rows)
| Row | Label | Type | Values |
|---|---|---|---|
| 1 | Office Location | dual listbox | Available: AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY · Chosen: empty |
| 2 | Home Location | dual listbox | same 51 values · Chosen: empty |

### Section "System Information"
| Row | L | R |
|---|---|---|
| 1 | PYSD (date) | Mark for Delete (checkbox) ⓘ + link "View all dependencies" |
| 2 | PYED (date) | Reason for Deletion (picklist, --None--) + "View all dependencies" |
| 3 | CD (date) | Other Reason for Deletion (text) |
| 4 | BenefitPoint ID (text) | EDX Termination Date (date) |
| 5 | Active Oppty Id (text) | EDX Last Modified Date (date) |
| 6 | BOR Change Req Id (text) | FY Starting Enrollment (number) |
| 7 | Id (text) | FY Starting Premium (number/currency) |

Only required field: **Account Name**. (Administrative Contacts section from the detail view is absent from the form.)

Number vs currency: layers only show "Spin Button" (number input); "currency" is inferred from detail-view values ($…) (?).

---

## 7. A7 — Record type picker "New Account" (2:54505)

Rendered as a panel in workspace tab "New Account" (not an overlay). Title (Heading 2): **New Account**. Radio group (Field Set; legend not visible), first option selected:

| # | Option (label) | Description (verbatim) | Selected |
|---|---|---|---|
| 1 | Group | Collection of employees that purchased Armada products (either directly from Armada or through an Armada partner) to enroll a larger group of people (i.e. "Member/Participants") | ● |
| 2 | AH Group | — | |
| 3 | AH Partner | — | |
| 4 | Broker Agency | Agencies that represent employer groups as Broker Of Record (BOR) | |
| 5 | EP Facility | — | |
| 6 | General Agency | Agency that works with Armada to market products to its broker network | |
| 7 | Group Active | A Group with current, active enrollment in at least one Armada product. | |
| 8 | Partner/Sponsor | Any entity distributing/selling Armada product directly to Group(s) or Any intermediary distributing/selling Armada product via Partners/Brokers. | |
| 9 | Prospect Agency | — | |
| 10 | Strategic Partner | Strategic Partners that have special channels to distribute Armada products | |
| 11 | Vendor/Facility | Any vendor with which Armada is doing business or any account that houses a single or collection of physician/providers (ex, the Mayo Clinic). | |

Buttons (centered under the list): **Cancel** (neutral) · **Next** (brand). Descriptions copied from the screenshot (layer names are truncated); quotes in option 1 are typographic “Member/Participants” in the capture.

---

## 8. A8 — Account Hierarchy (2:55068)

- Workspace: → "Blalock Development Co | Account"; sub-tab bar (Navigation - Active Workspace Subtabs): "Blalock Development Co | Account" (truncated "Blalock Develop…", no ✕ visible) · → **"Account Hierarchy"** (truncated "Account…", bold, ▼ ✕).
- Banner/page header: breadcrumb **Account** (link) **>** **Blalock Development Co** (link); title (Heading 1) **Account Hierarchy**.
- Tree grid columns (header labels rendered UPPERCASE in screenshot; layer labels mixed case): **Account Name** · **Account Site** · **Mailing State/Province** · **Phone** · **Type** · **Account Owner Alias**.

| Account Name | Account Site | Mailing State/Province | Phone | Type | Account Owner Alias |
|---|---|---|---|---|---|
| Blalock Development Co (link, SLDS-blue in capture) + badge **"current"** (dark grey pill) | | | (865) 783-2808 | Client | eelle (link) |

Capture truncates Phone to "(8" and Type to "C" and hides "eelle" (artefact) — full values from text layers. Rest of grid is empty grey.

---

## 9. A9 — Record page "Blalock Development Co" (Group layout) (2:55718)

### Highlights panel
- Icon · **Account** · **Blalock Development Co**.
- Actions (in order): View Account Hierarchy icon button · **+ Follow** · button group **Send with Docusign** · **Printable View** · **Enable As Partner** · **▼** (open).
- Detail fields: **Id** / GRP-00727 · **Situs State** / TN · **Employees** / 750 · **Number of Executives** / (empty) · **Industry** / (empty).

### Overflow ▼ menu (open) — 24 items in order
1. Sharing
2. Check for New Data
3. Change Record Type
4. Edit
5. Submit for Approval
6. Delete
7. View Account Hierarchy
8. Sharing Hierarchy
9. Change Owner
10. Census
11. Clone
12. New Armada Plan
13. Sync External Ids
14. Email Pitch
15. Group Summary
16. Map
17. Launch X-Author
18. Deliver Policy
19. View Website
20. Docusign Master App
21. Rate Quote Wizard
22. Send To Account Engagement
23. Debit Card Cancellation
24. Debit Card Suspension

Menu frame is 183×400 at x 1697 (items 34 px each → list scrolls; 24 × 34 = 816 px). In the capture the menu is drawn behind the quick-links/sidebar cards (only fragments like "Clone" visible); no hovered item is identifiable (?) — inventory mentions a hovered item but it cannot be confirmed at this scale.

### Related List Quick Links (ⓘ on title) + **"Show All (22)"** link (centered under the grid)
| Row | Links (in order) |
|---|---|
| 1 | Fiscal Year Statistics (0) · Account Team (0) · Contacts (10+) · Plans/Packages (10+) · Broker Commission Code (0) · Affiliated Agencies (0) · Opportunities (0) |
| 2 | Open Activities (1) · Card Transactions (0) · Activity History (0) · Cases (0) · Notes & Attachments (0) · DocuSign Status (0) · Plan Years (0) |

("Broker Commission Code (0)" wraps to 2 lines.)

### Main tabset: **Details** (active) · Related · Report · ZoomInfo (hidden "More" in layers (?)). All sections expanded.

#### Section (untitled)
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Account Name | Blalock Development Co | ✎ | Account Record Type | Group | change-record-type icon |
| 2 | Doing Business As | | ✎ | Account Owner | Emily Ellerman (lookup) | change-owner icon |
| 3 | Parent Account | | ✎ | Territory Owner | Leslie Weis (plain text) | ✎ |
| 4 | Primary Group Contact | | ✎ | Account Manager | Donna Walter (lookup) | ✎ |
| 5 | Phone | (865) 783-2808 (link colour) | ✎ | Type | Client | ✎ |
| 6 | Fax | | ✎ | Status | Active | ✎ |
| 7 | Key Decision Maker Present | ☑ | ✎ | Last Status Update | | ✎ |
| 8 | Acct | 1 | RO | | | |
| 9 | Referred By | | ✎ | Free Trial Effective Date | | ✎ |
| 10 | Concierge Effective Date | | ✎ | Free Trial Termination Date | | ✎ |
| 11 | Concierge Run Out | | ✎ | Free Trial Status | | ✎ |
| 12 | Armada Logo | image (alt "Armada Care"; not visible in capture) | RO | Enrollment Form link | TransAmerica Expense Reimbursed (link) | RO |
| 13 | Total UH Equivalent Lives | 0.00 | RO | Communication Suppression | | ✎ |
| 14 | Calculated Segment | | ✎ | Count DD | 23 | ✎ |
| 15 | Incorporation State | | ✎ | Expected DD | 16 | RO |
| 16 | Corporate Address | | ✎ | Count Portal | 28 | ✎ |
| 17 | SOC Report Delivered | | ✎ | Expected Portal | 19 | RO |
| 18 | DSS Registration | | ✎ | Count Rx | 19 | ✎ |
| 19 | Navigator/Member Communication | | ✎ | Expected Rx | 16 | RO |
| 20 | Opened PCP | | ✎ | DD Recommendation | ☐ | ✎ |
| 21 | Opened Specialist | | ✎ | Portal Recommendation | ☐ | ✎ |
| 22 | Sirius Place Holder | 1,466 | ✎ | RX Recommendation | ☐ | ✎ |
| 23 | Sirius Policy Number | SA001466 | ✎ | | | |
| 24 | Plan Type | Expense Reimbursed | ⓘ ✎ | | | |
| 25 | Plan Type Multi-Pick | Expense Reimbursed | ✎ | | | |
| 26 | Docusign Concat ID | Expense ReimbursedTN | RO | | | |
| 27 | Docusign ID | | RO | | | |
| 28 | Docusign Master ID | | ✎ | | | |
| 29 | Primary Group Contact Email | | RO | | | |
| 30 | Primary Group Contact First Name | | RO | | | |
| 31 | Primary Group Contact Last Name | | RO | | | |
| 32 | (blank row) | | | | | |
| 33 | Officer Name | | ✎ | | | |
| 34 | Officer First Name | | RO | | | |
| 35 | Officer Last Name | | RO | | | |
| 36 | Officer Email | | RO | | | |
| 37 | Officer Title | | RO | | | |
| 38 | (blank row) | | | | | |
| 39 | Agent Name | | ✎ | | | |
| 40 | Agent First Name | | RO | | | |
| 41 | Agent Last Name | | RO | | | |
| 42 | Agent Email | | RO | | | |
| 43 | Concierge Type | | ✎ | | | |
| 44 | Active Medical Plans | 4 | ✎ | | | |
| 45 | Original UH Quoted Lives | | ✎ | | | |
| 46 | Original PH Quoted Lives | | ✎ | | | |
| 47 | Priority | 1 | RO | | | |
| 48 | PSR Effective Date | | ✎ | | | |
| 49 | PSR Termination Date | | ✎ | | | |
| 50 | Next QBR Month | 4 | ✎ | | | |
| 51 | WEX Setup | | ✎ | | | |
| 52 | Admin Landing Page | https://info.armadacare.com/pgc/ta-uh-noan-nocc (wraps; plain text colour) | ✎ | | | |
| 53 | # of KPI Covered Lives | | ✎ | | | |
| 54 | Production ID | 0014000000jzwcPAAQ | ✎ | | | |

#### Section "At Risk"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Monthly AT RISK Status | Green | ✎ | Red/Yellow Alert Reason | | ✎ |
| 2 | | | | Last Monthly AT-Risk Change | 2/15/2024 | ✎ |

#### Section "Relationship/Opportunity Details"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Original Effective Date | 1/1/2013 | ✎ | UH Renewal Month | 1 | RO |
| 2 | Synched Effective Date | | ✎ | # of UH Covered Lives | 30 | ⓘ ✎ |
| 3 | Date of Armada Termination | | ✎ | # of CM Covered Lives | | ✎ |
| 4 | Premium Invoice Date | 2/15/2026 | ✎ | # of PH Covered Lives | | ✎ |
| 5 | UH Latest Month Premium | $22,314.00 | ✎ | # TD Connect Covered Lives | | ⓘ ✎ |
| 6 | UH Estimate Annual Premium | $267,768.00 | RO | # of EC Covered Lives | | ✎ |
| 7 | PH Latest Month Premium | | ✎ | # TDCGA Covered Lives | | ⓘ ✎ |
| 8 | CM Latest Month Premium | | ✎ | # TMH Covered Lives | 8 | ⓘ ✎ |
| 9 | EC Latest Month Premium | | ✎ | Segment | Large | ⓘ ✎ |
| 10 | EC Estimated Annual Premium | $0.00 | RO | Employees | 750 | ✎ |
| 11 | Reason Lost | | ✎ | Number of Executives | | ⓘ ✎ |
| 12 | Reason Unqualified | | ✎ | Number of Retirees | | ✎ |

#### Section "Background Information"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Corporate Office | ☐ | ✎ | Website | http://blalockcompanies.com/ (link) | ✎ |
| 2 | Executive Travel | ☐ | ✎ | Contacting Restrictions | | ⓘ ✎ |
| 3 | Current Reference | ☐ | ✎ | Preferred Communication Method | Through Broker | ✎ |
| 4 | Testimonial Provided | | ✎ | Participant Summary | | ✎ |
| 5 | Company Ownership | | ✎ | Industry | | ✎ |
| 6 | Company Reach | | ✎ | High Level Industry | Construction | ✎ |
| 7 | Sell to | | ✎ | Account Source | AGS | ✎ |
| 8 | | | | Fortune Ranking | | ✎ |
| 9 | | | | Legal Entity | | ✎ |
| 10 | | | | TIN | | ⓘ ✎ |

#### Section "Group Information"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Primary Plan Renewal Month | January | ✎ | Current Programs | | ⓘ ✎ |
| 2 | Primary Medical Plan Renewal Date | | ✎ | Dental Plan Present | ☐ | ✎ |
| 3 | Next Primary Renewal | 1/1/2027 | ⓘ RO | Vision Plan Present | ☐ | ✎ |

#### Section "Armada Group Details"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | External Ids Synced | ☑ | ⓘ ✎ | Date of Armada Implementation | 12/16/2021 | ✎ |
| 2 | UH Carrier | TransPremier | ✎ | ACH | No | ✎ |
| 3 | Armada Business Unit | Armada Care | ✎ | | | |
| 4 | Armada Region | United States | ✎ | | | |

#### Section "Data.Com Information" (all empty, all ✎)
| Row | L | R |
|---|---|---|
| 1 | Account Site | Ownership |
| 2 | Annual Revenue | SIC Code |
| 3 | Description | SIC Description |
| 4 | | Ticker Symbol |

#### Section "Claims Information"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | HRA In Place | NO | ✎ | Claims Status | | ✎ |
| 2 | HRA Pays First | No | ✎ | Date of Claims Status Change | | ✎ |
| 3 | Enrollees Contribute to an FSA | | ✎ | DOS of Claims on Hold | | ✎ |
| 4 | Sirius Transition Date | | ✎ | Claims Hold Reason | | ✎ |
| 5 | # of RSL Claims | | ✎ | Other Claims Hold Reason | | ✎ |
| 6 | RSL Claim Volume | | ✎ | Run-Out Claims | | ✎ |
| 7 | Last RSL Claim Update | | ✎ | | | |

#### Section "GeoPointe" (all empty, all ✎)
| Row | L | R |
|---|---|---|
| 1 | GeoPointeGeolocation | Clean City |
| 2 | Geocode Retrieval Time | Clean Street |
| 3 | Geocode Quality | Clean State |
| 4 | | Clean County |
| 5 | | Clean Postal Code |
| 6 | | Clean Country |
| 7 | | Clean ISO Country |

#### Section "EUC Information"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Number of Active Participants | | ✎ | EUCPolicyNum | | ⓘ ✎ |
| 2 | Number Of Covered Lives | | ✎ | RegisteredTimeStamp | | ✎ |
| 3 | RegistrationStep | | ✎ | Release Requested | | ✎ |
| 4 | Former EUC GOLD | ☐ | ⓘ ✎ | DocuSign Returned Date | | ✎ |
| 5 | GOLD Client Contact Date | | ⓘ ✎ | EUC Status | | ✎ |
| 6 | | | | Lincoln Data Processed | ☐ | ⓘ ✎ |
| 7 | Primary Health Insurance | | ✎ | | | |

#### Section "Address Information"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | Payment Address Type | Billing | ✎ | Mailing Address | | ✎ |
| 2 | Payment Street | 415 Robert Henderson Road | ⓘ ✎ | Situs Street | | ✎ |
| 3 | Payment City | Sevierville | ✎ | Situs City | | ✎ |
| 4 | Payment State | TN | ✎ | Situs State | TN | ✎ |
| 5 | Payment Zip Postal Code | 37862 | ✎ | Situs Zip Code | | ✎ |
| 6 | Payment Country | USA | ✎ | Territory | | RO |

#### Section "Latest RFP Information (Originally provided and/or updated as necessary)"
| Row | L label | L value | L flags | R label | R flags |
|---|---|---|---|---|---|
| 1 | Primary Medical Base Plan Carrier | | ✎ | Primary Medical Base Plan Renewal Date | ✎ |
| 2 | Employer HRA Contribution-Family | | ✎ | Dental Plan Carrier | ✎ |
| 3 | Employer HRA Contribution-Single | | ✎ | Vision Plan Carrier | ✎ |
| 4 | Medical Reimb Plan (Competitor) | ☐ | ✎ | Medical Reimbursement Name | ✎ |

#### Section "Participant/Members"
- Embedded Visualforce/iframe (ForceAlohaPage > Iframe, 944×100) — renders as an empty grey box.
- Full-width rows: **Office Location** (✎) · **Home Location** (✎), values empty.

#### Section "Administrative Contacts"
- Embedded iframe only (ForceAlohaPage 944×100, grey box). No fields.

#### Section "System Information"
| Row | L label | L value | L flags | R label | R value | R flags |
|---|---|---|---|---|---|---|
| 1 | PYSD | 1/1/2025 | ✎ | Mark for Delete | ☐ | ⓘ ✎ |
| 2 | PYED | 12/31/2025 | ✎ | Reason for Deletion | | ✎ |
| 3 | CD | 3/31/2026 | ✎ | Other Reason for Deletion | | ✎ |
| 4 | Created By | Emily Ellerman (lookup), 2/25/2026 1:08 PM | RO | EDX Termination Date | | ✎ |
| 5 | Last Modified By | Emily Ellerman (lookup), 2/25/2026 1:09 PM | RO | EDX Last Modified Date | | ✎ |
| 6 | BenefitPoint ID | | ✎ | FY Starting Enrollment | 28 | ✎ |
| 7 | Active Oppty Id | | ✎ | FY Starting Premium | $21,384 | ✎ |
| 8 | BOR Change Req Id | | ✎ | | | |
| 9 | Id | GRP-00727 | ✎ | | | |
| 10 | Acct ID 18 | 001Ec00001fY0zTIAS | RO | | | |
| 11 | Current Month | 10/1/2026 | RO | | | |

(No Custom Links section on this layout.)

### Right sidebar
1. **Next Best Action** — "Einstein doesn't have any recommendations for you right now."
2. Tab **Duplicates** — "We found no potential duplicates of this Account."
3. Tab **Activity** — contains a collapsed related-list card **"Card Transactions (0)"** (orange/tan Card Transactions icon, title link "Card Transactions" + "(0)", ▼ menu button at right; list-view settings/display/button-bar placeholders are 4×1 px, i.e. hidden).

---

## 10. Picklist / value catalogue (every value seen)

| Field | Values seen | Where |
|---|---|---|
| Account Record Type | Group, AH Group, AH Partner, Broker Agency, EP Facility, General Agency, Group Active, Partner/Sponsor, Prospect Agency, Strategic Partner, Vendor/Facility | A7 (all), A4 "Broker Agency", A9/A6 "Group" |
| Type | Prospect, Client | A4/A6 Prospect, A9/A8 Client |
| Status | Inactive, Active | A6 Inactive (form default), A9 Active |
| Persona | Boutique | A4 |
| Monthly AT RISK Status | Green | A9, A6 default |
| Segment | Large | A9 |
| Plan Type | Expense Reimbursed | A9 |
| Plan Type Multi-Pick | Expense Reimbursed, Indemnity, DentaPak, WellPak | A6 dual listbox |
| Communication Suppression (multi) | Welcome Kit, Monthly Engagement Emails, Operational Emails, MVP, Sync | A6 |
| Contacting Restrictions (multi) | None, Unknown, Do Not Mail, Do Not Email, Do Not Call, Do Not Market - All, Do Not Market- EUC, Do Not Market - RSL | A5/A6 |
| Participant Summary (multi) | Admin, Participant | A5/A6 |
| Current Programs (multi) | Accident Insurance, Advocate Programs, Cancer Insurance, Case Management, Critical Illness, Dental, Disease Management, EAP, Exec. Disability, Executive Compensation Planning, FSA, Health, HRA, HSA, International, Medical Navigation &/or Support, Travel, Vision, Wellness, None | A6 |
| Office Location / Home Location (multi) | AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY | A6 |
| Preferred Communication Method | Through Broker | A9 |
| Account Source | AGS | A9 |
| High Level Industry (text in form) | Construction | A9 |
| Primary Plan Renewal Month | January | A9 |
| UH Carrier | TransPremier | A9 |
| ACH | No | A9 |
| Armada Business Unit | Armada Care, Armada Administrators | A1, A9, A6 default "Armada Care" |
| Armada Region | United States | A4, A9, A6 default |
| HRA In Place | NO | A9 |
| HRA Pays First | No | A9 |
| Payment Address Type | Billing | A9 |
| Situs State | TN | A9 |
| Share: Account Access | Read Only | A3 |
| Share: Case / Contact / Opportunity Access | Private | A3 |
| All other form picklists | --None-- (default shown) | A6/A5 |

---

## 11. Uncertainties

- Toolbar icon-button names in A1 and split view (↑↓ button, boxed ▼ next to split-view title) are not in layer names — labels inferred (?).
- Hidden "More" tab-overflow menus exist in layers for main tabset and sidebar tabsets but are not visible (?).
- A5/A6 split view: which 2 items are selected is not visible (scrolled out) (?).
- A9 overflow menu: drawn behind cards in capture; hovered item cannot be confirmed (?). Item order is from text layers (reliable).
- Currency vs number for premium fields in the form is inferred from detail-view formatting (?).
- Help-text content for ⓘ icons is not captured anywhere.
- A8 hierarchy row: Phone/Type/Owner Alias values come from text layers; screenshot truncates them (artefact).
