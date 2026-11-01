> Detailed screen spec extracted from the Figma file `iiZjEBlMVcWNHALIB4qKBB` (text layers + screenshots, see docs/pages-inventory.md §1). Values are verbatim; "(?)" marks uncertainty.

# Contacts — page specification (C1–C7)

Sources: `texts/2-*.txt` (text layers, 1920-wide frame coords) + `figma/2-*.png` (~0.763 scale), crops in `crops/ct-*.png`.
Coordinates quoted below are frame coords (x ≥ 900 in a record section = right column; x ≈ 441 = left column label, 592 = left value; 929 = right label, 1080 = right value).
"Link-coloured" = olive brand link colour in the screenshot. "✎" = inline-edit pencil visible.

---

## 0. Summary of screens

| Code | Node | Frame name | Record | State | Workspace tabs (active **bold**) | Split-view meta line |
|---|---|---|---|---|---|---|
| C1 | 2:5847 | `Adam Sahn \| Contact \| Salesforce` (1920×3139) | Adam Sahn | default | `Aarav Aramanai \| Contact` (▼ ✕), **`Adam Sahn \| Contact`** (▼ ✕) | 50+ items • Updated a few seconds ago |
| C2 | 2:7726 | `Aarav Aramanai \| Contact \| Salesforce` (1920×3156) | Aarav Aramanai | loading — right-column "Card Transactions" card shows grey stencil | **`Aarav Aramanai \| Contact`** (▼ ✕) | 50+ items • Updated a few seconds ago |
| C3 | 2:9562 | `Antoinette Mitcham \| Contact \| Salesforce` (1920×3154) | Antoinette Mitcham | modal — Change Contact Owner | **`Antoinette Mitcham \| Contact`** (▼ ✕; label truncated "Antoinette Mitcha…") | 50+ items • Updated a minute ago |
| C4 | 2:11470 | `Antoinette Mitcham \| Contact \| Salesforce` | Antoinette Mitcham | modal — Log an Activity | same single tab | 50+ items • Updated 2 minutes ago |
| C5 | 2:13502 | `Antoinette Mitcham \| Contact \| Salesforce` | Antoinette Mitcham | composer open — docked Note composer (utility bar) | same single tab | 50+ items • Updated 3 minutes ago |
| C6 | 2:15450 | `Antoinette Mitcham \| Contact \| Salesforce` | Antoinette Mitcham | default — Notes (1) card populated after saving the note | same single tab | 50+ items • Updated 3 minutes ago |
| C7 | 2:17295 | `Antoinette Mitcham \| Contact \| Salesforce` | Antoinette Mitcham | menu open — highlights actions overflow ▼ | same single tab | 50+ items • Updated 4 minutes ago |

Workspace tab = contact-card icon + label + ▼ (tab menu) + ✕ (close). Active tab has the brand-coloured top border.
**Main tabs: none.** The Contact record page has no Details/Related tabset — sections and components are stacked directly in the main column (only tabset on the page is inside "Payment & Repayment History").

---

## 1. Shared console chrome (identical on C1–C7)

| Area | Content |
|---|---|
| Global header row 1 | ≡ (hamburger), badge "Sandbox (CXDev)" with org icon (`Devops_centerOrgInfo`); far right: round ▼ button |
| Global header row 2 | Search button "Search..." (centered); right: favorites ★ + ▾, + (global actions), ?, ⚙, 🔔, avatar. A text layer "0" at x 1843 inside `Button < List < Header` (?) — not visible; probably notification-count badge |
| Context bar | App launcher (waffle), "ArmadaCare Admin Portal" (rendered truncated "ArmadaCare Admin…"), object nav item "Contacts", separate ▼ (nav menu) button, then workspace tabs |
| Utility bar | "Omni-Channel" (with phone/headset icon), bottom-left |
| Capture glitch | blank grey band under global header (inventory §4) — ignore |

---

## 2. Split view list (identical rows on all 7 screens)

- Object icon: purple square (Contact). List view name: **All Members** ▼ (list-view picker, `LstListViewPicker`). Pin button (outline pin). Right: ▼ list-view controls menu button.
- Meta: **"50+ items • Updated …"** (see per-screen value above). Icons below at right: display-as (list ▾), refresh ↻.
- Search input placeholder: **"Search this list..."**
- Column header row: select-all checkbox, **Name ↑** (sorted ascending by Name), info (i) icon at right.
- Each item: checkbox, line 1 left = Name (link), line 1 right = second name (matches the contact's **Employee** lookup — e.g. Aarav → Smitanjali Priyadarshini, Adam → Mark Sahn), line 2 left = **Gender**, line 2 right = **Birthdate**. Item height 50 frame px.
- Split-view divider has a collapse toggle ◀ (vertically centred).
- C1/C2: list scrolled to top. C3–C7: list is a scroll container scrolled down (`Container:scroll-content`), so Angela Alley … Antoinette Mitcham are in view; same 50 items.

| # | Title (Name) | Line 1 right (Employee) | Line 2 left (Gender) | Line 2 right (Birthdate) |
|---|---|---|---|---|
| 1 | Aarav Aramanai | Smitanjali Priyadarshini | M | 11/28/2015 |
| 2 | Aaron Ash | Michael Ash | M | 8/17/2006 |
| 3 | Abigail Grace-Ferguson Lane | Oliver Lane | F | 8/29/2000 |
| 4 | Ace Summers | Kenneth Summers | M | 1/30/2013 |
| 5 | Adam Sahn | Mark Sahn | M | 5/2/2004 |
| 6 | Adrian Mitchell | Eric Mitchell | M | 11/9/2017 |
| 7 | Aidan Booth | David Booth | M | 8/9/2008 |
| 8 | Aidan R Bohn | Susan Bohn | M | 4/26/2007 |
| 9 | Aiden J Hlavek | Mark Hlavek | M | 2/17/2008 |
| 10 | Akshay Loomba | — | M | 11/2/1981 |
| 11 | Akshay Pandit | — | M | — |
| 12 | Akshay Pandit | — | M | — |
| 13 | Akshay PanditTest | — | M | — |
| 14 | Alessi Veritas Mitchell | Eric Mitchell | F | 8/7/2022 |
| 15 | Alexa Ackerman | Zachary Ackerman | F | 10/1/1991 |
| 16 | Alexander Clay | Jessica Clay | M | 3/18/1970 |
| 17 | Alice Regot | — | F | 1/20/1989 |
| 18 | Alisa Russell | Emerson Russell | F | 2/19/1989 |
| 19 | Alison Jerden | — | F | 12/4/1974 |
| 20 | Allen Doty | — | M | 3/24/1959 |
| 21 | Allie McFarland | Matthew McFarland | F | 7/19/2006 |
| 22 | Alyssa A Hlavek | Mark Hlavek | F | 9/18/1973 |
| 23 | Alyssa Seburn | Ted Seburn | F | 9/12/1973 |
| 24 | Amalyn Kennedy | Joshua Kennedy | F | 8/4/2012 |
| 25 | Amanda Ewig Riccardi | Roger Riccardi | F | 1/17/1978 |
| 26 | Amanda Maletich | George Maletich | F | 11/5/2000 |
| 27 | Amelia Tyler | Stephanie Gallo | F | 3/3/2005 |
| 28 | Amit Patel | Priya Patel | — (no gender) | 12/19/1983 |
| 29 | Amy Fuggi | — | F | 9/28/1993 |
| 30 | Amy Lund | — | F | 3/28/1974 |
| 31 | Ana Dragasevic | Bojan Dragasevic | F | 1/1/2011 |
| 32 | Anderson Puckett | — | M | 6/15/1976 |
| 33 | Andreas Ingerson | — | F | 10/17/1982 |
| 34 | Andrew Owings | Matthew Owings | M | 4/24/2011 |
| 35 | Angela Alley | Kevin Alley | F | 11/26/1966 |
| 36 | Angelica Stanfield | Michael Stanfield | F | 6/21/1970 |
| 37 | Anika Patel | Priya Patel | — (no gender) | 6/25/2016 |
| 38 | Ann Marie Barrios | Robert Barrios | F | 8/7/1976 |
| 39 | Anna Blalock | Douglas Blalock | F | 3/19/2008 |
| 40 | Anthony DiMarco | — | M | 6/29/1966 |
| 41 | Anthony Fiveash | Lisa Fiveash | M | 4/27/1968 |
| 42 | Anthony Youga | — | M | 1/20/1959 |
| 43 | Antoinette Mitcham | — | F | 5/26/1969 |
| 44 | Antonio Ferraro | — | M | 2/8/1978 |
| 45 | Anvi Koushik | Nikhil Koushik | F | 11/29/2012 |
| 46 | April Skinner | William Skinner | F | 2/28/2012 |
| 47 | Armand Skol | — | M | 8/26/1943 |
| 48 | Arpna Bhola | Nishant Bhola | F | 12/27/1976 |
| 49 | Asha Bhola | Nishant Bhola | F | 4/15/2015 |
| 50 | Asher Clay | Jessica Clay | M | 7/26/2011 |

No row is visibly highlighted as selected (?) — capture shows all rows on the same grey background.

---

## 3. Record page layout (common to all screens)

Main column (≈ x 425–1180) top→bottom, then a right sidebar column (≈ x 1460–1900):

1. Highlights panel (`RecordsHighlights2`)
2. Related List Quick Links card
3. Section **Contact Information** (open)
4. Section **Coverage Information** (open)
5. Component **Account Activity**
6. Component **Payment & Repayment History**
7. Component **Account Balance Summary**
8. Component **Plan Change Overview**
9. Section **Emergency Contact Information** (open, body blank)
10. Section **Enrollment & Plan** (open, body blank)
11. Component **Claim Substantiation Documents**
12. Component **Repayment Obligations** (grey loading stencil)

Right column: related-list cards Notes, Member Documents, Notifications, Cases, Card Transactions.

### 3.1 Highlights panel

- Object icon: purple square. Object label **"Contact"**, title = contact name (Heading 1).
- Right side, in order: hierarchy icon button (org-chart glyph; View Contact Hierarchy), then button group **Send with Docusign | Change Owner | Log an Activity | ▼** (overflow — items in §7).
- Detail fields (label order, left→right): **CDEX Id · Employment Start Date · Employment Status · Product · Account Name · Portal**

| Field | C1 Adam Sahn | C2 Aarav Aramanai | C3–C7 Antoinette Mitcham | Rendering |
|---|---|---|---|---|
| CDEX Id | 008554542 | 008554856 | (empty) | text |
| Employment Start Date | (empty) | (empty) | (empty) | — |
| Employment Status | (empty) | (empty) | (empty) | — |
| Product | Ultimate Health | (empty) | (empty) | text |
| Account Name | E&J Gallo Winery Active | Unifi Aviation, LLC | ArmadaCare | lookup link (`ForceLookup`) |
| Portal | www.armadacare.com/myaccount | www.armadacare.com/myclaims | (empty) | link-coloured URL (layer is Paragraph, not Link (?)) |

Note: "E&J Gallo Winery Active" is the verbatim account name text (one link) — whether "Active" is part of the name or a status suffix is unclear (?).

### 3.2 Related List Quick Links

Heading **"Related List Quick Links"** + info (i) icon. Two rows × 7 columns, each = coloured object icon + underlined link "Label (n)". Then centred link **"Show All (17)"**.

| Order | Label | Icon (screenshot) | C1 | C2 | C3–C5 | C6–C7 |
|---|---|---|---|---|---|---|
| 1 | Notes | crimson square | 0 | 0 | 0 | **1** |
| 2 | Notes & Attachments | grey square | 0 | 0 | 0 | 0 |
| 3 | Bank Accounts | slate wrench (custom) | 0 | 0 | 0 | 0 |
| 4 | Banking Infos | green square | 0 | 0 | 0 | 0 |
| 5 | Card Transactions | orange square | 0 | 0 | 0 | 0 |
| 6 | Claims | pink square | 0 | 0 | 0 | 0 |
| 7 | Plans/Packages | teal square | 0 | 0 | 0 | 0 |
| 8 | Files | grey square | 0 | 0 | 0 | 0 |
| 9 | Cases | pink-red square | 0 | 0 | 0 | 0 |
| 10 | Affiliated Plans | green square | **3** | **2** | **6** | **6** |
| 11 | Open Activities | teal (event/task glyph) | 0 | 0 | 0 | 0 |
| 12 | Activity History | teal (glyph) | 0 | 0 | 0 | 0 |
| 13 | Contact History | purple square | **1** | **1** | **2** | **2** |
| 14 | Member Documents | slate wrench (custom) | 0 | 0 | 0 | 0 |

Row 1 = items 1–7, row 2 = items 8–14. Show All (17) ⇒ 3 further lists not shown (?). Some icon glyphs lost in capture (inventory §4).

### 3.3 Section "Contact Information" (open, chevron ▼)

Two columns; rows in order. ✎ = pencil visible; "—" = no pencil (read-only).

**Left column**

| # | Label | ✎ | C1 Adam Sahn | C2 Aarav Aramanai | C3–C7 Antoinette Mitcham | Notes |
|---|---|---|---|---|---|---|
| 1 | Name | ✎ | Adam Sahn | Aarav Aramanai | Antoinette Mitcham | text |
| 2 | Middle Initial/Name | ✎ | | | | |
| 3 | Social Security Number | ✎ | *******0591 | *******7710 | *******5510 | **masked**; an (i) info icon sits immediately before the value (help-text or reveal icon (?)) |
| 4 | CDEX Id | — | 008554542 | 008554856 | (empty) | |
| 5 | Email | ✎ | | | amitcham@armadaglobal.com | link-coloured (email) |
| 6 | Age | — | 22 | 10 | 57 | formula |
| 7 | Medicare Carrier | ✎ | | | | |
| 8 | Employment Status | ✎ | | | | |
| 9 | Product | — | Ultimate Health | (empty) | (empty) | read-only (differs from right-column Product) |
| 10 | Mailing Address | ✎ | LIVERMORE, CA 94550 | San Jose, CA 95123 / USA (2 lines) | 8005 Derby Lane, / Owings Mills, MD 21117 (2 lines) | link "Show in Google Maps, …"; below it a grey static-map placeholder ≈ 235×155 frame px (iframe not captured) |

**Right column**

| # | Label | ✎ | C1 | C2 | C3–C7 | Notes |
|---|---|---|---|---|---|---|
| 1 | Account Name | ✎ | E&J Gallo Winery Active | Unifi Aviation, LLC | ArmadaCare | lookup link |
| 2 | Home Phone | ✎ | | (510) 598-5161 | (443) 204-4970 | phone, link-coloured |
| 3 | Work Phone | ✎ | (877) 687-9463 | (404) 773-0452 | (410) 308-5213 | phone, link-coloured |
| 4 | Mobile | ✎ | | | (443) 862-1915 | phone |
| 5 | Birthdate | ✎ | 5/2/2004 | 11/28/2015 | 5/26/1969 | date |
| 6 | Gender | ✎ | M | M | F | picklist |
| 7 | Marital Status | ✎ | Single | Single | Married | picklist |
| 8 | Product | ✎ | Ultimate Health | Plena Health | (empty) | picklist/text |
| 9 | Other Address | ✎ | | | | |
| 10 | Portal Access | ✎ | | | | |
| 11 | Last Card Request Date | ✎ | | | | date |

### 3.4 Section "Coverage Information" (open)

**Left column**

| # | Label | ✎ | C1 Adam Sahn | C2 Aarav Aramanai | C3–C7 Antoinette Mitcham | Notes |
|---|---|---|---|---|---|---|
| 1 | Employee | ✎ | Mark Sahn | Smitanjali Priyadarshini | (empty) | contact lookup link (`RecordsHoverableLink`) |
| 2 | Relationship | ✎ | Dependent | Dependent | Participant | picklist |
| 3 | Marital Status | ✎ | Single | Single | Married | picklist |
| 4 | Marital Status Effective Date | ✎ | | | | date (label wraps 2 lines) |
| 5 | Active Enrollments ArmadaCare | ✎ | 1 | 1 | (empty) | number (label wraps) |
| 6 | Active Enrollments ArmadaHealth | ✎ | 1 | 1 | (empty) | |
| 7 | Active Enrollments BHS | ✎ | (empty) | (empty) | (empty) | |
| 8 | Active Enrollments Vision | ✎ | 1 | 0 | (empty) | |

**Right column**

| # | Label | ✎ | C1 | C2 | C3–C7 | Notes |
|---|---|---|---|---|---|---|
| 1 | Employment Start Date | ✎ | | | | date |
| 2 | Employment End Date | ✎ | | | | date |
| 3 | Dep No | ✎ | 2 | 0 | 00 | text (verbatim "00") |
| 4 | childCount | ✎ | | | | verbatim lower-camel label |
| 5 | BHS Usage | ✎ | | | | |
| 6 | Active Enrollments Medical | ✎ | 1 | 1 | (empty) | |
| 7 | Active Enrollments Dental | ✎ | 1 | 0 | (empty) | |
| 8 | Active Enrollments Concierge | ✎ | 0 | 1 | (empty) | |

### 3.5 Component "Account Activity"

- Card with magenta/orchid icon (diagonal-arrows glyph) + title **"Account Activity"**.
- Body: red error text (`Alert`), full width: **"We couldn't access the credential(s). You might not have the required permissions, or the external credential "Alegeus_Auth" might not exist."** (same on all screens).

### 3.6 Component "Payment & Repayment History"

- Card with grey icon (cash/money glyph) + title **"Payment & Repayment History"**.
- `LightningTabset` tabs: **Payments** (active, brand underline) · **Repayments** · **Recovery**; plus a hidden overflow button "More" (`LightningButtonMenu`, not rendered).
- Payments tab controls:
  - Combobox (`Button - Status`): value **"All Statuses"** (≈ 255 px wide), left.
  - Search input (`Search Input`, ≈ 572 px wide, magnifier icon): placeholder **"Search payments..."**, right of Status.
  - Combobox (`Button - Period`): value **"All Time"**, second row, left (narrower ≈ 190 px).
  - Empty message centred: **"No payments found for this contact."**
- Repayments / Recovery tab contents not captured (?).

### 3.7 Component "Account Balance Summary"

- No icon. Title bold **"Account Balance Summary"** immediately followed by an italic grey subtitle in parentheses that varies with Relationship:
  - Dependent (C1, C2): **"(Dependent Account Balance Summary only)"**
  - Participant (C3–C7): **"(Including the balances of the Dependents of the Member)"**
- Body (left-aligned): **"No account balance data is available for this member."**

### 3.8 Component "Plan Change Overview"

- Grey document icon + title **"Plan Change Overview"**.
- Body centred: **"No plan changes detected for this subscriber."**

### 3.9 Section "Emergency Contact Information" (open)

- Header with ▼ chevron; body is blank (≈ 300+ frame px of empty space). Fields probably not captured (?) — cannot be inferred.

### 3.10 Section "Enrollment & Plan" (open)

- Same: header only, large blank body (?).

### 3.11 Component "Claim Substantiation Documents"

- Grey document-copy icon + title **"Claim Substantiation Documents"**.
- Body centred: **"No substantiation documents found for this member."**

### 3.12 Component "Repayment Obligations"

- Orchid/pink square icon + title **"Repayment Obligations"** (`Article < LafProgressiveContainer`).
- Body: grey gradient loading stencil (≈ 615×165 frame px) on all screens — content never loaded (capture artifact).

### 3.13 Right-column related-list cards

All cards are collapsed-style headers (icon + "Title (n)" link + ▼ menu button) with no body, except where noted.

| Order | Title | Icon | ▼ | C1 | C2 | C3–C5 | C6–C7 |
|---|---|---|---|---|---|---|---|
| 1 | Notes | crimson square | yes | (0) | (0) | (0) | **(1)** + body (below) |
| 2 | Member Documents | slate wrench | yes | (0) | (0) | (0) | (0) |
| 3 | Notifications | slate wrench | yes | (0) | (0) | (0) | (0) |
| 4 | Cases | pink square | **no** | (0) | (0) | (0) | (0) |
| 5 | Card Transactions | orange square | yes | (0) | **loading**: title "Card Transactions" with no count, no ▼, grey stencil body ≈ 290 frame px tall (`Heading 2 < Article < FlexipageComponent2`) | (0) | (0) |

**Notes card body (C6, C7)** — `Article - Notes`:
- Item title (link-coloured, Heading 2): **"No new note"**
- Meta: **"10/21/2026 10:11 AM by "** + link **"Mansoor Ahmad"**
- Preview text: **"Basic testing"**
- Footer link (centred, divider above): **"View All"** (layer "Link - View All Notes")

---

## 4. C3 — Change Contact Owner modal (2:9562)

Backdrop dims page; close ✕ button outside top-right of modal.

| Element | Content |
|---|---|
| Header | **"Change Contact Owner"** (Heading 1, centred) |
| Required legend | red **"*"** + **"= Required Information"** (right-aligned) |
| Field | Label **"* Select New Owner"** (required). Lookup with **object switcher** on the left (blue user icon + ▾) and input placeholder **"Search Users..."** with magnifier icon right. Hidden assistive text layer "To remove the selected record, press Backspace or …" (truncated in dump; not visible) |
| Checkbox | ☐ **"Send notification email"** (unchecked) |
| Paragraph | "The new owner will also become the owner of these records related to **Antoinette Mitcham** that are owned by **Zach Ackerman**." (names bold) |
| Bullet list (◦ glyph, grey) | • **Notes and attachments** • **Open activities** |
| Footer | **Cancel** (neutral) · **Submit** (brand, dark olive) |

Current owner of Antoinette Mitcham = Zach Ackerman (from text).

---

## 5. C4 — Log an Activity modal (2:11470)

Close ✕ outside top-right. Header **"Log an Activity"** (Heading 2). Legend "* = Required Information" (right). Two-column form; body scrolls (Comments cut off by footer). Text layers exist for 4 labels that are **not rendered** in the screenshot (marked "label lost").

| Row | Left column | Right column |
|---|---|---|
| 1 | **Subject** — full-width combobox/text input with magnifier icon (`LightningGroupedCombobox`), empty | (spans both columns) |
| 2 | **Type** *(label lost)* — picklist, value **"--None--"** | **\* Assigned To** (required) — user lookup with selected pill: blue user icon + **"Mansoor Ahmad"** + ✕ (remove). Hidden assistive text "To remove the selected record, press Backspace or …" |
| 3 | **Due Date** — date input **"10/21/2026"** + calendar icon | **\* Status** *(label lost, required)* — picklist **"Completed"** |
| 4 | **Date Completed** — date input **"10/21/2026"** + calendar icon | **\* Priority** *(label lost, required)* — picklist **"Normal"** |
| 5 | **Sales Task** *(label lost)* — picklist **"--None--"** | **Name** — read-only text **"Antoinette Mitcham"** (not link) |
| 6 | **Call Result** — text input, empty | **Related To** — lookup with object switcher (grey object icon + ▾), placeholder **"Search Account Funnel Trackers..."**, magnifier; hidden assistive remove text |
| 7 | **Disposition** — full-width text input, empty | |
| 8 | **Process** — checkbox, unchecked | |
| 9 | **Comments** — textarea (clipped by footer; not visible). Helper text layer: **"Tip: Type Control + period to insert quick text."** (clipped) | |
| Footer | **Cancel** (neutral) · **Save** (brand) | |

Note: Type/Status/Priority/Sales Task label text layers sit at the same y as the combobox (overlapped/lost) — inventory §4 says labels must be rendered. Assignment of the * to Status and Priority comes from `*` layers at x 976 on the same rows (351, 423) (?).

---

## 6. C5 — Note docked composer (2:13502)

Page = C3 record (Notes still (0)) with a docked composer panel bottom-right (≈ x 1425–1900, y 2625–3105), inside `Footer - Utility Bar`.

| Element | Content |
|---|---|
| Header | note icon + **"No new note"** (Heading 2); right: minimize (_), pop-out/expand (⤢), close (✕); brand-colour bottom border |
| Title | label **"Title"**; input value **"No new note"**; right of it: lock icon + **"Visibility Set by Record"** |
| Rich text | label **"Compose text"**; toolbar = 2 groups of 4 buttons + 1 image-insert button (glyphs lost, inventory §4); editor (focused, blue border) contains **"Basic testing"** |
| Related | **"Related to"** + pill: purple contact icon + link **"Antoinette Mitcham"** |
| Footer | **Delete** (left) · **Share** · **Add to Records** · **Done** (all neutral) |

---

## 7. C7 — Highlights overflow ▼ menu (2:17295)

`LightningButtonMenu` dropping from the ▼ after "Log an Activity". Menu is only partially drawn in the PNG (inventory §4); item text comes from layers. Order:

1. Add Dependent
2. Printable View
3. Delete
4. Edit
5. View Contact Hierarchy
6. Sharing — rendered with grey background (hover/focus (?))
7. Change Record Type
8. Get Survey Invitation
9. Check for New Data
10. Submit for Approval
11. Enable Customer User
12. Sharing Hierarchy
13. Clone
14. Send to Account Engagement
15. Email Pitch
16. Map
17. Participant Summary
18. Docusign HIPAA Form
19. Edit Enrollments
20. Sync Debit Card Data
21. Activate Debit Card
22. Request Additional Card

(22 items; item pitch 34 frame px, y 207 → 921.)

Page behind = C6 state (Notes (1)).

---

## 8. Picklist / value sets observed

| Field | Values seen |
|---|---|
| Gender | M, F |
| Marital Status | Single, Married |
| Relationship | Dependent, Participant |
| Product | Ultimate Health, Plena Health |
| Payments › Status filter | All Statuses (only value seen) |
| Payments › Period filter | All Time (only value seen) |
| Payment & Repayment History tabs | Payments, Repayments, Recovery (+ More overflow) |
| Task Type (Log an Activity) | --None-- |
| Task Status | Completed |
| Task Priority | Normal |
| Sales Task | --None-- |
| Related To object (switcher default) | Account Funnel Trackers |
| Change Owner object (switcher default) | Users |

---

## 9. Uncertainties

- Emergency Contact Information and Enrollment & Plan sections render open but empty — fields not captured.
- Repayment Obligations (all) and C2 Card Transactions cards are loading stencils; contents unknown.
- Repayments / Recovery tab contents and the "More" tab overflow items unknown.
- SSN (i) icon: help-text vs. reveal-masked-value control not distinguishable.
- Portal highlight value is link-coloured but its layer is a Paragraph (formula URL?).
- "E&J Gallo Winery Active" may be name + status; kept verbatim.
- Assistive "To remove the selected record, press Backspace or …" text is truncated in the dump (likely "…or Delete." — not verified).
- Show All (17) implies 3 related lists not shown in the quick-links grid.
- Global header "0" text layer meaning (notification count?) unverified.
