> Detailed screen spec extracted from the Figma file `iiZjEBlMVcWNHALIB4qKBB` (text layers + screenshots, see docs/pages-inventory.md §1). Values are verbatim; "(?)" marks uncertainty.

# Claims — page specification (CL1–CL8)

Sources: text dumps `texts/2-*.txt` (layer y/x/width + ancestors) and screenshots `figma/2-*.png` (≈1:1, 1924 px wide). Colours sampled from the PNGs (approximate, ±anti-aliasing).
Conventions: "—" = field present but value blank in capture. x columns: left field column label x≈441 / value x≈638; right column label x≈1176 / value x≈1373. Custom 3-col grids: x≈441 / 929 / 1418.

---

## 0. Screen summary

| Code | Node | Frame name | Size | Record | State |
|---|---|---|---|---|---|
| CL1 | 2:19210 | Lightning Experience \| Salesforce | 1920×2063 | — | List only (split view), workspace empty (white) |
| CL2 | 2:20051 | CLM-0000023 \| Claim \| Salesforce | 1920×2063 | CLM-0000023 | Record, **Audit & System** tab active |
| CL3 | 2:21357 | CLM-0000023 \| Claim \| Salesforce | 1920×2232 | CLM-0000023 | Record, **Details** tab active |
| CL4 | 2:22949 | CLM-0000020 \| Claim \| Salesforce | 1920×2063 | CLM-0000020 | Record, **Audit & System** tab active |
| CL5 | 2:24222 | CLM-0000020 \| Claim \| Salesforce | 1920×2339 | CLM-0000020 | Details tab + **Delete Claim** modal |
| CL6 | 2:25897 | CLM-0000020 \| Claim \| Salesforce | 1920×2339 | CLM-0000020 | Details tab + **Repayment Recovery** modal |
| CL7 | 2:27571 | CLM-0000020 \| Claim \| Salesforce | 1920×2339 | CLM-0000020 | Details tab + **Split Approval calculator** custom modal |
| CL8 | 2:29432 | CLM-0000020 \| Claim \| Salesforce | 1920×2339 | CLM-0000020 | Record, **Details** tab active (default state for CL5–CL7 background) |

CL5/CL6/CL7 backgrounds are identical to CL8 (text-diff: only modal layers + list meta "Updated a minute ago" differ; Adjudication History status column at x 1343 instead of 1333).

---

## 1. Shared console chrome

| Element | Value |
|---|---|
| Global header row 1 | hamburger (Toggle Panel), chip "Sandbox (CXDev)", round ▼ at far right |
| Global header row 2 | centred search button "Search...", favourites ★ + ▼, global actions (+), help ?, setup gear, notifications bell (badge text "0" layer, hidden), avatar |
| App name | "ArmadaCare Admin Portal" (rendered truncated "ArmadaCare Admin...") + waffle |
| Object nav item | "Claims" (active) + ▼ "Show Navigation Menu" button |
| Utility bar (footer) | "Omni-Channel" (with icon) |

### Workspace tabs (Navigation - Workspaces)

| Screen | Tabs (left → right) | Active |
|---|---|---|
| CL1 | (none) | — |
| CL2, CL3 | "CLM-0000020 \| Claim" ▼ ✕ · "CLM-0000023 \| Claim" ▼ ✕ | CLM-0000023 |
| CL4, CL5, CL6, CL7, CL8 | "CLM-0000020 \| Claim" ▼ ✕ | CLM-0000020 |

Tab icon: small grey object icon that looks like a pen/quill (?) — glyph not identifiable from text layers; same icon on every Claim tab. Each tab has ▼ (tab menu) and ✕ (close). A ▼ overflow/"more tabs" button sits left of the first tab (between the nav item and the tabs).

---

## 2. Split view list (identical rows on all 8 screens — verified by diff)

| Property | Value |
|---|---|
| Object icon | 32 px square, pink `#e769b4` (Claim object icon) |
| List view name | "All" ▼ (LstListViewPicker) + pin button; ▼ list-view-controls button on the right |
| Meta | CL1: "50+ items • Updated a few seconds ago"; CL2: "50+ items • Updated 2 minutes ago"; CL3–CL7: "50+ items • Updated a minute ago"; CL8: "50+ items • Updated a few seconds ago" |
| Toolbar | display-as ▾ icon button, refresh icon button |
| Column header | select-all checkbox (unchecked) · "Claim Number" ↑ (sorted ascending) · info (i) icon at right |
| Item layout | checkbox · Claim Number (left, x 41) · status text right-aligned (grey, x right-aligned to ≈364). 1 line per item, row pitch 35 px |
| Collapse handle | ◀ on panel's right edge, vertically centred |
| Selected/highlighted item | none visible (?) — the open record (CLM-0000023 / -0000020) is not highlighted in the capture |

Items (50 rendered; "50+" in meta):

| # | Claim Number | Right text (status) |
|---|---|---|
| 1 | CLM-0000020 | Approved |
| 2 | CLM-0000021 | Approved |
| 3 | CLM-0000022 | Approved |
| 4 | CLM-0000023 | Pending Review |
| 5 | CLM-0000024 | Approved |
| 6 | CLM-0000025 | Approved |
| 7 | CLM-0000026 | Denied |
| 8 | CLM-0000027 | Pending Information |
| 9 | CLM-0000028 | Expired |
| 10 | CLM-0000029 | Expired |
| 11 | CLM-0000030 | Request More Information (RMI) |
| 12 | CLM-0000031 | Approved |
| 13 | CLM-0000032 | Auto Approved |
| 14 | CLM-0000033 | Approved |
| 15 | CLM-0000034 | Approved |
| 16 | CLM-0000035 | Pending Review |
| 17 | CLM-0000036 | Approved |
| 18 | CLM-0000037 | Approved |
| 19 | CLM-0000038 | Pending Review |
| 20 | CLM-0000039 | Denied |
| 21 | CLM-0000040 | Approved |
| 22 | CLM-0000041 | Paid |
| 23 | CLM-0000054 | Expired |
| 24 | CLM-0000057 | Request More Information (RMI) |
| 25 | CLM-0000059 | Approved |
| 26 | CLM-0000060 | Expired |
| 27 | CLM-0000061 | Approved |
| 28 | CLM-0000062 | Approved |
| 29 | CLM-0000063 | Pending Review |
| 30 | CLM-0000064 | Pending Review |
| 31 | CLM-0000065 | Approved |
| 32 | CLM-0000066 | Pending Review |
| 33 | CLM-0000067 | Approved |
| 34 | CLM-0000068 | Pending Reimbursement (PRB) |
| 35 | CLM-0000069 | Pending Review |
| 36 | CLM-0000071 | In Review |
| 37 | CLM-0000074 | Approved |
| 38 | CLM-0000081 | Expired |
| 39 | CLM-0000082 | Expired |
| 40 | CLM-0000085 | Expired |
| 41 | CLM-0000089 | Pending Information |
| 42 | CLM-0000090 | Partial Pay |
| 43 | CLM-0000091 | Pending Review |
| 44 | CLM-0000092 | Pending Review |
| 45 | CLM-0000093 | Applied |
| 46 | CLM-0000095 | Pending Review |
| 47 | CLM-0000097 | Pending Review |
| 48 | CLM-0000101 | In Review |
| 49 | CLM-0000102 | In Review |
| 50 | CLM-0000104 | In Review |

Note: the list says CLM-0000020 is "Approved" and CLM-0000023 "Pending Review" — consistent with the action sets below (pending claim gets Approve/Deny/RMI). Which field the right text is (Claim Status?) is not labelled (?).

---

## 3. Record highlights panel (CL2–CL8)

| Item | CLM-0000023 (CL2, CL3) | CLM-0000020 (CL4–CL8) |
|---|---|---|
| Icon | pink `#e769b4` square | same |
| Object label | "Claim" | "Claim" |
| Name (Heading 1) | CLM-0000023 | CLM-0000020 |
| Actions (button group, order) | **Approve · Deny · RMI · Split Approval · ▼** (overflow menu) | **Split Approval · Repayment Recovery · Delete** (no ▼) |

Highlight detail fields (RecordsHighlightsDetailsItem), same for both claims, **all values blank in capture**:

| # | Label | Value 23 | Value 20 |
|---|---|---|---|
| 1 | Claim Number | — | — |
| 2 | SLA Status | — | — |
| 3 | SLA Due Date | — | — |
| 4 | Claim Internal Status | — | — |
| 5 | Internal Status Reason | — | — |

(Claim Number blank even though record name exists — likely a different field, e.g. external claim number (?).)

Highlights panel background: light grey header band (`#f3f3f3`-ish), white bottom area.

---

## 4. Record main tabset

Tabs: **Details** · **Audit & System** · (layer "More" LightningButtonMenu at x≈671–675 exists in the text dump but is **not visible** in any screenshot — hidden overflow menu (?); do not render unless tabs overflow).
Active tab: bold label + 3 px olive underline.

---

## 5. Audit & System tab (CL2 = CLM-0000023, CL4 = CLM-0000020)

All three sections are open (chevron ▼), shaded grey title bar (`#f3f3f3`), collapsible (title is a Button inside Heading 3). 2-column field layout, rows separated by bottom borders. Pencil = inline-edit icon at row right.

### 5.1 Section "Additional Information" (open)

Left column:

| # | Label | Type | CLM-0000023 | CLM-0000020 | Edit icon |
|---|---|---|---|---|---|
| 1 | Member | lookup link (olive, hoverable) | Lisa Chen | David Chen | pencil |
| 2 | Date of Service | date | 3/20/2026 | 1/15/2026 | pencil |
| 3 | Provider Name | text | Dental Associates of Chicago | Northwestern Medicine | pencil |
| 4 | Description | text | — | JSK Description | pencil |
| 5 | Expense Type | lookup link | PYET-0000009 | PYET-0000000 | pencil |
| 6 | Billed Amount | currency | $675.00 | $350.00 | pencil |
| 7 | Receipt Amount | currency (?) | — | — | pencil |

Right column:

| # | Label | Type | CLM-0000023 | CLM-0000020 | Edit icon |
|---|---|---|---|---|---|
| 1 | Intake Channel | picklist/text | Member Portal | Member Portal | pencil |
| 2 | Date Received | date | 3/25/2026 | 1/20/2026 | pencil |
| 3 | Draft Expiry Date | date | — | 5/29/2026 | pencil |
| 4 | Is Escalated | read-only checkbox (rendered as dashed empty square = unchecked) | unchecked | unchecked | none |
| 5 | Escalation State | text/picklist | — | — | none |
| 6 | Owner | user lookup with avatar icon + link | Feng Yue | Feng Yue | change-owner icon (person ⇄), not pencil |
| 7 | Assigned Analyst | lookup (?) | — | — | pencil |
| 8 | Submission Source | picklist/text | Member Submitted | Member Submitted | pencil |

### 5.2 Section "System Information" (open)

| Col | Label | Type | CLM-0000023 | CLM-0000020 | Edit |
|---|---|---|---|---|---|
| L | Created By | user lookup: avatar + link + ", date time" | Feng Yue, 4/19/2026 3:33 PM | Feng Yue, 4/19/2026 3:33 PM | none |
| R | Last Modified By | user lookup: avatar + link + ", date time" | Feng Yue, 4/19/2026 3:33 PM | Mehul Rathod, 6/9/2026 5:27 AM | none |

### 5.3 Section "SLA & Routing" (open)

Left column:

| # | Label | Type | 23 | 20 | Edit |
|---|---|---|---|---|---|
| 1 | SLA Due Date | date (?) | — | — | pencil |
| 2 | SLA Start DateTime | datetime | — | — | pencil |
| 3 | New Documents Received DateTime | datetime (label wraps to 2 lines) | — | — | pencil |
| 4 | SLA Policy Key | text | — | — | pencil |
| 5 | SLA Target | number (?) | — | — | pencil |
| 6 | SLA Unit | picklist (?) | — | — | pencil |
| 7 | Is SLA Breached | checkbox (dashed empty square) | unchecked | unchecked | pencil |
| 8 | SLA Breach DateTime | datetime | — | — | pencil |
| 9 | Is Due Today | checkbox (dashed empty square) | unchecked | unchecked | pencil |

Right column:

| # | Label | Type | 23 | 20 | Edit |
|---|---|---|---|---|---|
| 1 | SLA Status | picklist (?) | — | — | pencil |
| 2 | Is Work Complete | checkbox (dashed empty square) | unchecked | unchecked | pencil |
| 3 | Queue Routed DateTime | datetime | — | — | pencil |
| 4 | Queue Routed To | text | — | — | pencil |
| 5 | Is SLA Breached Num | number (formula) | 0.00 | 0.00 | none |
| 6 | Is Due Today Num | number (formula) | 0.00 | 0.00 | none |
| 7 | Age In Days | number (formula) | 210 | 274 | none |
| 8 | Receipt Status | picklist (?) | — | — | pencil |

### 5.4 Related lists on Audit & System (card style: grey `#f3f3f3` header-only cards, bold "Title (n)")

| # | Title | Count | Icon (colour) | Button | Body |
|---|---|---|---|---|---|
| 1 | Claim History | (0) | pink `#e769b4` square | none | empty (header only) |
| 2 | Notifications | (0) | slate `#747e96` wrench | New | empty |
| 3 | Repayment Obligations | (0) | magenta `#dc71d1` square | New | empty |

Same for both claims.

---

## 6. Details tab (CL3 = CLM-0000023, CL8 = CLM-0000020; CL5–7 background = CL8)

Order top → bottom:
1. Claim Details card (custom LWC `CApClaimDetailSection`)
2. Benefit Snapshot card (`CApClaimBenefitSnapshot`)
3. Claims card (`CApClaimSiblingClaims`)
4. Record section "Adjudication Summary" (standard field section)
5. Receipt / Documentation (custom component)
6. Files related list
7. Accumulator Balances (custom table)
8. Related lists: Payment History, Denial History, Denial Letters, RMI History, Notes, Adjudication History

### 6.1 Custom card "Claim Details"

Card: white, 1 px border + **4 px left accent `#e3517e`** (top/right border lighter tint of same pink `#f0a7be`), title "Claim Details" bold ~18 px. Grid 3 columns (x 441/929/1418), each cell = CAPS letter-spaced grey label over value (13 px, dark).

| Row | Col 1 label → 23 / 20 | Col 2 label → 23 / 20 | Col 3 label → 23 / 20 |
|---|---|---|---|
| 1 | PARTICIPANT → **Lisa Chen** (olive link) / **David Chen** (link) | PHONE NUMBER → — / — | EMPLOYER → — / — |
| 2 | SERVICE DATE → Mar 20, 2026 / Jan 15, 2026 | EXPENSE CATEGORY → Dental / Medical Cost-Sharing | EXPENSE TYPE → Restorative Dental / Copay |
| 3 | METHOD FILED → Member Portal / Member Portal | FILED BY → — / — | DESCRIPTION → — / JSK Description |
| 4 | PROVIDER → Dental Associates of Chicago / Northwestern Medicine | PAYEE → — / — | RECIPIENT → — / — |
| 5 | TOTAL CLAIM AMOUNT → $675.00 / $350.00 | RECEIPT AMOUNT → — / — | SUBMISSION DATE → Mar 25, 2026 / Jan 20, 2026 |

(Labels in layers are Title Case — "Participant", "Phone Number", … — rendered uppercase via CSS.)

### 6.2 Custom card "Benefit Snapshot"

Border **4 px left `#1b96ff`**, 1 px blue elsewhere. Title "Benefit Snapshot". Body = error text (both claims, same):

> No such column 'Subject_To_Deductible__c' on entity 'Plan_Year_Expense_Type__c'. If you are attempting to use a custom field, be sure to append the '__c' after the custom field name. Please reference your WSDL or the describe call for the appropriate names.

Real content not captured (?) — the error is a backend bug; rebuild should design a placeholder/empty or error state.

### 6.3 Custom card "Claims"

Border **4 px left `#5c6b7a`** (slate), 1 px slate elsewhere. Title "Claims" only; body empty (sibling claims list — no rows in either capture).

### 6.4 Section "Adjudication Summary" (open, shaded grey title, collapsible)

| Col | Label | Type | CLM-0000023 | CLM-0000020 | Edit |
|---|---|---|---|---|---|
| L1 | Net Deductible Applied | currency | — | $350.00 | pencil |
| L2 | Net Coinsurance Amount | currency | — | $0.00 | pencil |
| L3 | Net Benefit Paid | currency | — | $0.00 | pencil |
| R1 | Plan Year | lookup link | 2026 Meridian | 2026 Meridian | pencil |
| R2 | Subscriber | lookup link | David Chen | David Chen | pencil |
| R3 | Escalation Indicator | text/formula + **help (i) icon** after label | — | — | pencil |

### 6.5 Custom "Receipt / Documentation"

Header: grey `#939393` document icon + bold "Receipt / Documentation". No card border (sits on page). 3-col grid, CAPS labels:

| Row | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| 1 | RECEIPT STATUS → — | RECEIPT RECEIVED → — | VIEW RECEIPT → — |
| 2 | RECEIVED DATE → Mar 25, 2026 (23) / Jan 20, 2026 (20) | PLACE ON HOLD → **toggle, off**, caption "No" under it | — |

### 6.6 Files related list (Article - Files)

| | CLM-0000023 (CL3) | CLM-0000020 (CL5–CL8) |
|---|---|---|
| Header | grey `#939393` icon · "Files (0)" · button "Add Files" | "Files (1)" · "Add Files" |
| Body | dashed-border drop zone: button "Upload Files" (upload icon, olive text) centred, caption "Or drop files" below | one file row: title link "Screenshot 2026-05-27 194641"; meta "May 27, 2026 • 37KB • png" (no thumbnail visible (?)) |
| Footer | none | "View All" link (centred) |

### 6.7 Custom table "Accumulator Balances"

Header: blue `#1b96ff` chart icon + bold "Accumulator Balances". Plain table (no card border), header row bold, rows with bottom borders, currency columns right-aligned. **Identical rows for CLM-0000023 and CLM-0000020** (verified by diff).

Columns: Member · Type · Level · Category · Used (right) · Remaining (right) · Limit (right)

| Member | Type | Level | Category | Used | Remaining | Limit |
|---|---|---|---|---|---|---|
| David Chen | Deductible | Individual | Mental Health | $971.00 | $1,029.00 | $2,000.00 |
| David Chen | Deductible | Family | | $3,000.00 | $0.00 | $3,000.00 |
| David Chen | Benefit Cap | Individual | Dental Treatments | $3,000.00 | $0.00 | $3,000.00 |
| David Chen | Benefit Cap | Individual | Vision Treatments | $947.57 | $552.43 | $1,500.00 |
| David Chen | Benefit Cap | Individual | Covered Medical Expenses | $999.00 | $0.00 | $999.00 |
| David Chen | Benefit Cap | Individual | Mental Health | $2,001.60 | $5,498.40 | $7,500.00 |
| David Chen | Family Maximum | Family | | $26,303.09 | $1,473,807.91 | $1,500,111.00 |
| Lisa Chen | Deductible | Individual | | $550.00 | $950.00 | $1,500.00 |
| Lisa Chen | Benefit Cap | Individual | Dental Treatments | $0.00 | $3,000.00 | $3,000.00 |
| Lisa Chen | Benefit Cap | Individual | Vision Treatments | $0.00 | $1,500.00 | $1,500.00 |
| Lisa Chen | Benefit Cap | Individual | Mental Health | $0.00 | $7,500.00 | $7,500.00 |
| Natasha Chen | Deductible | Individual | | $0.00 | $1,500.00 | $1,500.00 |
| Natasha Chen | Benefit Cap | Individual | Dental Treatments | $200.00 | $2,800.00 | $3,000.00 |
| Natasha Chen | Benefit Cap | Individual | Vision Treatments | $0.00 | $1,500.00 | $1,500.00 |
| Natasha Chen | Benefit Cap | Individual | Mental Health | $0.00 | $7,500.00 | $7,500.00 |
| Ryan Chen | Deductible | Individual | | $0.00 | $1,500.00 | $1,500.00 |
| Ryan Chen | Benefit Cap | Individual | Mental Health | $0.00 | $7,500.00 | $7,500.00 |
| Ryan Chen | Benefit Cap | Individual | Dental Treatments | $200.00 | $2,800.00 | $3,000.00 |
| Ryan Chen | Benefit Cap | Individual | Vision Treatments | $455.20 | $1,044.80 | $1,500.00 |

(19 rows; blank Category cells are blank in capture.)

### 6.8 Related lists on Details (grey `#f3f3f3` cards, bold title + count)

| # | Title | 23 count | 20 count | Icon (colour) | Buttons |
|---|---|---|---|---|---|
| 1 | Payment History | (0) | (0) | square `#d58a6a` (orange-brown) | none |
| 2 | Denial History | (0) | (0) | square `#679ef0` (blue) | none |
| 3 | Denial Letters | (0) | (0) | wrench, slate `#747e96` (?) | none |
| 4 | RMI History | (0) | (0) | square `#679ef0` | none |
| 5 | Notes | (0) | (0) | square `#b60554` (crimson) | New |
| 6 | Adjudication History | (0) | **(1)** | square `#679ef0` | (20 only) gear ▾ list-view-controls + refresh icon buttons |

**Adjudication History (CLM-0000020, CL5–CL8)** — list-view-manager style:
- Meta under title: "1 item • Sorted by Adjudication Date • Updated a few seconds ago" (truncated in layer: "…Updated a f…").
- Table columns (header labels lost in capture → empty grey band; labels from layer names): **Adjudication Date** (x 486) · **Adjudication Status** (x 1333) · row action ▼ at far right.
- Row 1: "1/20/2026 10:00 AM" (row-header cell) · "Approved" · ▼ row menu (menu items not captured (?)).
- Footer link "View All".

---

## 7. Modals

### 7.1 CL5 — Delete Claim (2:24222)

Standard SLDS prompt modal, small width (≈640 px), centred, backdrop over CL8 page; close ✕ (white square) outside top-right.

| Part | Content |
|---|---|
| Header (Heading 1, centred) | Delete Claim |
| Body (centred) | Are you sure you want to delete this Claim? |
| Footer (right-aligned, grey `#f3f3f3`) | **Cancel** (neutral) · **Delete** (brand/olive filled) |

Trigger: highlights action "Delete".

### 7.2 CL6 — Repayment Recovery (2:25897)

Quick-action LWC screen modal (`Runtime_platform_actionsExecutorLwcScreen`), medium width (≈950 px); close ✕ outside top-right.

| Part | Content |
|---|---|
| Header (Heading 2, centred) | Repayment Recovery |
| Body (left-aligned) | Repayment Recovery is not available yet. It will be added in a later release. |
| Footer (right) | **Close** (brand, olive `#626a39`-ish) |

### 7.3 CL7 — Split Approval calculator (2:27571)

Custom LWC modal (non-SLDS styling: system sans font, slate/teal text `#..` dark blue-grey, grey panels). Width ≈ 950 px (x ≈ 487–1437), top y ≈ 48; close ✕ white square outside top-right. **Modal body is clipped at y≈830 in the screenshot** — layers below (RMI row, RMI reasons, RMI deadline, Notes, footer buttons) exist only in the text dump (scrolled out of view). Values below are verbatim from layers; visual styling of the clipped part is inferred (?).

Order (layer y):

1. **Heading 2**: "Split Approval calculator" (bold, dark slate-teal).
2. **Error alert** (bg `#fff0f4`, crimson text, full width):
   > No such column 'Is_Cost_Sharing_Source__c' on entity 'Plan_Year_Tier__c'. If you are attempting to use a custom field, be sure to append the '__c' after the custom field name. Please reference your WSDL or the describe call for the appropriate names.
3. **Summary grid** (bg `#f3f4f6`, rounded, 2 columns; small label over bold value):

| Left label | Left value | Right label | Right value |
|---|---|---|---|
| Claim number | — (blank) | Total claim amount | $0.00 / 100% |
| Remaining Deductible Balance | $0.00 | Allocated total | $0.00 / 0% |
| Remaining to allocate | $0.00 / 0% | | |

4. **Allocation rows** — bold row label left; two number inputs right, each with label above:

| Row label | Amount ($) input | Percent (%) input | Visible? |
|---|---|---|---|
| Approved | 0 | 0 | yes |
| Apply to Deductible | 0 | 0 | yes |
| Denied | 0 | 0 | yes |
| RMI | 0 | 0 | layer only (after Denied reasons) |

5. **"Denied reasons" panel** (light grey bg `#f9fafb`, heading 3 "Denied reasons"), inner white bordered box:
   - "Reason codes (select one or more)" — multi-select listbox, options: **Not covered · Duplicate · Missing documentation** (none selected).
   - "Other reason" — text input (empty), to the right.
   - "Amount ($)" — full-width input (empty).
   - Buttons (centred in two halves): **Add Reason** (disabled, grey text) · **Remove Reason** (disabled).
   - Below the inner box: **Add Denied Amount** (disabled, grey) + text "Reason amount remaining: $0.00".
6. *(layer only)* **RMI** allocation row (Amount ($) 0, Percent (%) 0).
7. *(layer only)* **"RMI reasons" panel**: "Reason codes (select one or more)" options **EOB · Itemized bill · POL · LOMN**; "Other reason" input; "Amount ($)" input; **Add Reason** · **Remove Reason**; **Add RMI Amount** + "Reason amount remaining: $0.00". (Disabled state assumed same as Denied (?).)
8. *(layer only)* "RMI deadline" — label (input type not captured; probably date (?)).
9. *(layer only)* "Notes (optional)" — label (textarea (?)).
10. *(layer only)* **Footer**: "Submit Split" (x 513, left) · "Cancel" (x 616). Enabled/disabled state not visible (?).

Trigger: highlights action "Split Approval" (present on both claims).

---

## 8. Picklist / status values observed

| Field (context) | Values |
|---|---|
| Claim status (split-view right text; field name not shown (?)) | Approved, Pending Review, Denied, Pending Information, Expired, Request More Information (RMI), Auto Approved, Paid, Pending Reimbursement (PRB), In Review, Partial Pay, Applied |
| Adjudication Status (Adjudication History) | Approved |
| Intake Channel | Member Portal |
| Method Filed (Claim Details card) | Member Portal |
| Submission Source | Member Submitted |
| Expense Category | Dental, Medical Cost-Sharing |
| Expense Type (card text) | Restorative Dental, Copay |
| Expense Type (lookup record ids) | PYET-0000009, PYET-0000000 |
| Plan Year (lookup) | 2026 Meridian |
| Accumulator Type | Deductible, Benefit Cap, Family Maximum |
| Accumulator Level | Individual, Family |
| Accumulator Category | Mental Health, Dental Treatments, Vision Treatments, Covered Medical Expenses, (blank) |
| Denied reason codes (Split Approval) | Not covered, Duplicate, Missing documentation |
| RMI reason codes (Split Approval) | EOB, Itemized bill, POL, LOMN |
| Place on Hold (toggle) | No (off) |
| Users seen | Feng Yue (owner/creator), Mehul Rathod (last modified CLM-0000020) |
| Members seen | Lisa Chen, David Chen (subscriber), Natasha Chen, Ryan Chen |

---

## 9. Action sets by claim status (observed)

| Claim | List status | Header actions |
|---|---|---|
| CLM-0000023 | Pending Review | Approve, Deny, RMI, Split Approval, ▼ (overflow; contents not captured (?)) |
| CLM-0000020 | Approved | Split Approval, Repayment Recovery, Delete |

---

## 10. Uncertainties / capture artifacts

- Highlights panel: all 5 field values blank on both claims (real blanks or capture loss (?)).
- "More" tab-overflow button exists in layers but invisible in screenshots.
- Read-only checkboxes render as a dashed empty square (unchecked) — likely SLDS faux checkbox rendered without border style; treat as standard unchecked read-only checkbox.
- Adjudication History header row labels lost (inventory §4 glitch); labels from layer names.
- Split Approval modal clipped: RMI section, RMI deadline, Notes, Submit Split / Cancel are layer-only.
- Benefit Snapshot and Split Approval alert show backend SOQL errors, not designed content.
- Workspace-tab object icon glyph unclear (pen/quill-like).
- Row-menu (▼) contents for Adjudication History and header ▼ overflow menu contents not captured.
- Colours are pixel samples from PNGs (anti-aliased, ±small).
