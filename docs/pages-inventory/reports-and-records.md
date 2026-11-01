> Detailed screen spec extracted from the Figma file `iiZjEBlMVcWNHALIB4qKBB` (text layers + screenshots, see docs/pages-inventory.md §1). Values are verbatim; "(?)" marks uncertainty.

# Page specs — Reports, Card Transactions, Plan Years, Portal Informations, Plan Year Enrollments

Source: text dumps `texts/<node>.txt` + 1:1 screenshots `figma/<node>.png`. "Link" = olive link colour / `Link` layer. Glitches ignored per inventory §4 (blank table header rows → labels from `Header Cell - …` layer names; grey report iframes).

## 0. Shared console chrome (all 16 screens)
| Element | Content |
|---|---|
| Global header row 1 | ☰ · org badge "Sandbox (CXDev)" · round ▼ far right |
| Global header row 2 | "Search..." box · ★+▼ favorites split · ⊕ · ? · ⚙ · 🔔 · avatar |
| Context bar | 9-dot launcher · "ArmadaCare Admin Portal" · object nav item · separate ▼ chevron |
| Workspace tabs | `[icon] label…` · ▼ · ✕; active = olive top border + tint |
| Utility bar | "Omni-Channel" |

With no workspace tab open (R1, R7, R9) the object nav item itself is active.

### Split-view list (T1, PY1–3, PI1, E1–2)
Object icon, list view picker "All ▼", pin button, ▼ list controls; display-as + refresh; meta "N items • Updated a few seconds ago"; "Search this list..." (absent on E1/E2); list header: select-all checkbox · bold sort field · ↑ · ⓘ; rows: checkbox · primary field (top-left) · optional 2nd field (top-right) · optional extra lines (dark text). Collapse handle at x≈389.

### Record page structure
Highlights: icon · object label · record name · action group right. Tabset "Related", "Details" (hidden "More" in layers). Body card x≈414–1412; right of it empty.

### Icon colours (sampled)
| Object | Fill | Workspace-tab glyph |
|---|---|---|
| Card Transaction | #e9af67 | bank/columns |
| Plan Year | #d8be5f | two-diamond/tags (?) |
| Portal Information | #f26979 | globe |
| Plan Year Enrollment | #f77e75 | two-people |
| Related-list cards (Plan Year History, PYE Members) | #d8be5f | — |
| Report tab / Folder tab | — | report / folder |

---
## A. Reports

### A.0 Reports home layout (R1, R3, R4, R7, R9)
- Header: eyebrow "Reports" · title = breadcrumb · count.
- Right: search input (placeholder per view) · button group **New Report | New Folder** (R3 adds ▼) · ⚙▼ settings.
- Left nav: REPORTS (Recent · Created by Me · Private Reports · Public Reports · All Reports) · FOLDERS (All Folders · Created by Me · Shared with Me) · FAVORITES (All Favorites). Active item = grey full-width fill.
- Table: first column row header link; row ▼ at right. Folder rows have folder icon; report rows none. Created By / Last Modified By / Folder are links. Subscribed empty everywhere.
  - Folder table: Name · Created By · Created On · Last Modified By · Last Modified Date
  - Report table: Name (R3) / Report Name (R7, R9) · Description · Folder · Created By · Created On · Subscribed

### R1 — 2:31085 "Shared with Me | Reports | Salesforce" (1920×899)
Shared with Me active; no workspace tabs; nav "Reports" active. Header "Reports" / **Shared with Me** / "105 items". Search "Search folders shared with me...". Buttons New Report | New Folder · ⚙▼. Table `Folders Shared with Me` (20 rows, folder icons):
| # | Name | Created By | Created On | Last Modified By | Last Modified Date |
|---|---|---|---|---|---|
| 1 | 0.0 Mogli SMS | Sujan Vanga | 10/16/2026, 12:29 PM | Sujan Vanga | 10/16/2026, 12:29 PM |
| 2 | 01 - Armada Membership Lists | Marketing Cloud Administrator | 1/21/2025, 10:26 PM | Marketing Cloud Administrator | 1/21/2025, 10:26 PM |
| 3 | 01 - Marketing Suppression Lists | Marketing Cloud Administrator | 1/21/2025, 8:32 PM | Marketing Cloud Administrator | 1/21/2025, 9:54 PM |
| 4 | 2020 Snapshots | Zach Ackerman | 1/9/2020, 3:47 PM | Zach Ackerman | 1/9/2020, 3:47 PM |
| 5 | Account Audit Points | Administrator Qualtrics | 2/11/2019, 2:02 PM | Administrator Qualtrics | 2/11/2019, 2:02 PM |
| 6 | AH Sales | Zach Ackerman | 5/14/2018, 3:16 PM | Zach Ackerman | 5/14/2018, 3:16 PM |
| 7 | AH Sales & Marketing | Zach Ackerman | 12/7/2018, 3:06 PM | Zach Ackerman | 12/7/2018, 3:06 PM |
| 8 | Apex package reports | Administrator Qualtrics | 10/19/2018, 11:06 AM | Administrator Qualtrics | 10/19/2018, 11:06 AM |
| 9 | Armada Accounting | Suzanne Kirincic | 2/9/2015, 1:49 PM | Administrator Qualtrics | 7/29/2019, 12:22 PM |
| 10 | Armada Administrators | Doug Adkins | 2/11/2015, 4:38 PM | Doug Adkins | 2/11/2015, 4:38 PM |
| 11 | Armada Campaign Summaries | Zach Ackerman | 6/6/2016, 1:11 PM | Zach Ackerman | 6/6/2016, 1:11 PM |
| 12 | Armada Care | System Admin | 8/26/2013, 2:45 PM | Doug Adkins | 2/11/2015, 4:38 PM |
| 13 | Armada CBS | Suzanne Kirincic | 4/1/2015, 1:27 PM | Suzanne Kirincic | 4/1/2015, 1:27 PM |
| 14 | Armada Claims | Suzanne Kirincic | 4/6/2015, 2:25 PM | Suzanne Kirincic | 4/6/2015, 2:25 PM |
| 15 | Armada Dashboard Reports | Armada Avideon | 7/2/2014, 5:33 PM | Armada Avideon | 7/2/2014, 5:48 PM |
| 16 | Armada Drip Campaigns | Armada Administrator | 3/18/2016, 4:16 PM | Armada Administrator | 3/18/2016, 4:16 PM |
| 17 | Armada EZ Ticket Reporting | Armada Avideon | 5/18/2015, 7:56 AM | Armada Avideon | 5/18/2015, 7:56 AM |
| 18 | Armada Health | System Admin | 1/2/2013, 5:23 PM | Doug Adkins | 2/11/2015, 4:37 PM |
| 19 | Armada Health Research | Suzanne Kirincic | 8/7/2015, 11:42 AM | Suzanne Kirincic | 8/7/2015, 11:42 AM |
| 20 | Armada Inside Sales | Zach Ackerman | 11/26/2018, 11:14 AM | Zach Ackerman | 11/26/2018, 11:14 AM |

### R2 — 2:32027 "AH Accounts and Contacts | Salesforce"
Report tab body = grey iframe placeholder; nav "Reports" (not active). Tabs: "All Folders | Reports" (report icon) · "AH Sales & Marketing" (folder icon) · "AH Accounts and Contacts" (report icon, ACTIVE); all ▼ ✕.

### R3 — 2:32271 "AH Sales & Marketing | Salesforce"
Folder contents; left nav All Folders active; row 2 hovered. Tabs: "All Folders | Reports" (report icon) · "AH Sales & Marketing" (folder icon, ACTIVE). Header "Reports" / breadcrumb **All Folders › AH Sales & Marketing** / "16 items". Search "Search all folders...". Buttons **New Report | New Folder | ▼** · ⚙▼. Report table (Description, Subscribed empty):
| # | Name | Folder | Created By | Created On |
|---|---|---|---|---|
| 1 | AH Accounts and Contacts | AH Sales & Marketing | Jennifer Best | 12/7/2018, 9:49 AM |
| 2 (hover) | AH Accounts and Contacts w MC Field | AH Sales & Marketing | Jennifer Best | 12/20/2018, 10:26 AM |
| 3 | Lead Owner Erin Ehrlich | AH Sales & Marketing | Administrator Qualtrics | 6/4/2019, 11:33 AM |
| 4 | Oppty Owner Erin Ehrlich | AH Sales & Marketing | Administrator Qualtrics | 6/4/2019, 11:37 AM |
| 5 | Erin E Contacts | AH Sales & Marketing | Zach Ackerman | 6/6/2019, 8:13 AM |
| 6 | Active SCC PCP Members | AH Sales & Marketing | Zach Ackerman | 6/10/2019, 4:14 PM |
| 7 | USL Employees | AH Sales & Marketing | Jennifer Best | 7/3/2019, 1:31 PM |
| 8 | Active TDC Members | AH Sales & Marketing | Zach Ackerman | 6/10/2019, 4:15 PM |
| 9 | Active SCC Members | AH Sales & Marketing | Zach Ackerman | 6/10/2019, 4:13 PM |
| 10 | Armada Employees | AH Sales & Marketing | Jennifer Best | 8/20/2019, 3:19 PM |
| 11 | Hubspot Records Syncing | AH Sales & Marketing | Zach Ackerman | 10/17/2019, 9:24 AM |
| 12 | Health Oppty Vendor Account | AH Sales & Marketing | Jennifer Best | 2/12/2020, 9:16 AM |
| 13 | Health Oppty Care Account | AH Sales & Marketing | Zach Ackerman | 2/12/2020, 8:52 AM |
| 14 | AH Sales Activity | AH Sales & Marketing | Keith Schaub | 3/3/2020, 2:10 PM |
| 15 | Hubspot Leads | AH Sales & Marketing | Zach Ackerman | 9/11/2020, 8:20 AM |
| 16 | Health Leads | AH Sales & Marketing | Zach Ackerman | 2/11/2018, 1:32 PM |

### R4 — 2:33107 "All Folders | Reports | Salesforce"
Tab "All Folders | Reports" active. Left nav All Folders. Header "Reports" / **All Folders** / "105 items". Search "Search all folders...". New Report | New Folder · ⚙▼. Folder table rows identical to R1.

### R5 — 2:34073 "1-1-22 Sirius Transition Groups"
Grey iframe. Tabs "$ Pipeline By Campaign" (report) · "1-1-22 Sirius Transition Groups" (report, ACTIVE).

### R6 — 2:34292 "> 2/1 NeverBounce Active Clients & Mem"
Grey iframe. One tab "> 2/1 NeverBounce Active Clients & Mem" (report, ACTIVE).

### R7 — 2:34485 "Public Reports | Reports | Salesforce"
Public Reports active; no workspace tabs; nav "Reports" active; row 4 hovered (Description wraps). Header "Reports" / **Public Reports** / "1272 items". Search "Search public reports...". Report table:
| # | Report Name | Description | Folder | Created By | Created On |
|---|---|---|---|---|---|
| 1 | > 2/1 NeverBounce Active Clients & Mem | | Public Reports | Emily Ellerman | 1/29/2026, 11:26 AM |
| 2 | > 2/1 NeverBounce Active Clients w PGC | | Public Reports | Emily Ellerman | 1/29/2026, 11:16 AM |
| 3 | >=10/1/25 Opportunities | | Public Reports | Emily Ellerman | 9/30/2025, 2:45 PM |
| 4 (hover) | 1-1-22 Sirius Transition Groups | 01/01/2022 Sirius Groups Eligible for Sirius Transition with Transition Status 'Accepted' | Public Reports | Christina Swetz | 10/28/2021, 1:25 PM |
| 5 | 1/1 Covid Rate Relief Requests | | Public Reports | Jessica Cheng | 10/19/2020, 9:51 AM |
| 6 | 1/1 Groups in Save | | Public Reports | Marsha Saul | 12/31/2019, 12:53 PM |
| 7 | 1/1 Groups Save for 1/1 Readiness Meetin | | Public Reports | Marsha Saul | 12/10/2019, 12:37 PM |
| 8 | 1/1 Groups to go on Claims Hold | | Public Reports | Marsha Saul | 12/31/2018, 11:56 AM |
| 9 | 1/1 NY Terms | | Public Reports | Jessica Cheng | 12/29/2020, 3:30 PM |
| 10 | 1/1 O/S Renewals - Nikki | | Public Reports | Nicole LaGrega | 12/17/2020, 2:14 PM |
| 11 | 1/1 Outstanding renewals - Jess | | Public Reports | Jessica Cheng | 12/17/2020, 10:47 AM |
| 12 | 1/1/2023 Round 1 CBS Renewal Release | | Public Reports | Huntley Mitchell | 9/29/2022, 3:59 PM |
| 13 | 1/1/21 Outstanding Renewals | | Public Reports | Jessica Cheng | 12/29/2020, 9:51 AM |
| 14 | 1/1/21 Transition Readiness for Reportin | | Public Reports | Marsha Saul | 12/16/2020, 2:11 PM |
| 15 | 1/1/23 non ACH non verbal groups | | Public Reports | Huntley Mitchell | 12/30/2022, 10:03 AM |
| 16 | 1/1/26 Sold Groups w Agency | | Public Reports | Emily Ellerman | 2/12/2026, 11:51 AM |
| 17 | 12/1/20 Renewal Report - Zoe Edit | | Public Reports | Zoe Hatzes | 12/7/2020, 2:28 PM |
| 18 | 12/1/25 Ops | | Public Reports | Emily Ellerman | 8/4/2025, 11:26 AM |
| 19 | 2/1/25 Enrollment Report | | Public Reports | Emily Ellerman | 4/24/2025, 9:52 AM |
| 20 | 2018 FY CC Sales | | Public Reports | Marsha Saul | 4/5/2019, 2:40 PM |

### R8 — 2:35371 "Account Census Data"
Grey iframe. One tab "Account Census Data" (report, ACTIVE).

### R9 — 2:35564 "Recent | Reports | Salesforce"
Recent active; no workspace tabs. Header "Reports" / **Recent** / "2 items". Search "Search recent reports...".
| Report Name | Description | Folder | Created By | Created On | Subscribed |
|---|---|---|---|---|---|
| Account Census Data | | Public Reports | Administrator Qualtrics | 6/21/2021, 7:12 PM | |
| Medical Plans | | Public Reports | Administrator Qualtrics | 6/21/2021, 6:56 PM | |

### Search placeholders
Recent → "Search recent reports..." · Public Reports → "Search public reports..." · All Folders / folder contents → "Search all folders..." · Shared with Me → "Search folders shared with me..." · other views not captured.

---
## B. Card Transactions — T1 2:35931 "CTX-0000000 | Card Transaction"
Nav **Card Transactions**. Tab "CTX-0000000 | Card Transaction" (bank glyph, ACTIVE). Main tab **Details**.
Split view: "All" · "7 items • Updated a few seconds ago" · search · sort **Card Transaction Number ↑**; rows: CTX-0000000 David Chen · CTX-0000003 / 0004 / 0005 / 0006 / 0019 / 0020 vsfirst1 vslast1 (right-hand name probably Claimant (?)).
Highlights: "Card Transaction" / **CTX-0000000**; only a ▼ menu.
Details (Dynamic Forms, 6 collapsible shaded sections):
1. **Information** — L: Card Transaction Number = CTX-0000000 (no pencil) · R: Employer = Meridian Partners LLC (link ✎) · R: Claimant = David Chen (link ✎) · R: Debit Card Token = **************************dkag (✎) · R: Card Number = ****-****-****-4999 (✎)
2–5. **Amounts**, **Merchant & Description**, **Adjudication & Status**, **Participant & Receipt Info** — headers only, contents not captured (?).
6. **System Information** — L: Created By = Jyotiraditya Dhalmahapatra, 7/29/2026 9:15 AM · R: Owner = Jyotiraditya Dhalmahapatra (avatar, change-owner) · R: Last Modified By = Varsha Salunke, 10/19/2026 6:47 AM

---
## C. Plan Years (nav **Plan Years**)
Split view (PY1–3): "All" · "27 items • Updated a few seconds ago" · search · sort **Plan Year Name ↑**; rows: 2025 · 2026 Double Platinum · 2026 Meridian · 2026 Ultimate Health Diamond Plus · 2027 · a18Ec00000BbICX ×4 · a18Ec00000BbICX test · a18Ec00000FNxMv · Akshay Test Plan Year · DK test · DK test 2 · DK test 3 · JP Test V1 2026 · JP Test2 · Plan Year SAL-992 · PY 2026 Ultimate Health AR Plus · PY1 · Test · Test · Test Mak 2026 11 · test vs · Test1 · Test2 · Test3
Highlights: "Plan Year" / name · Edit | Delete | Clone | ▼.

### PY1 — 2:36529 2026 Meridian, Related tab
Tabs: 2025 | Plan Year · 2026 Double Platinum | Plan Year · Akshay Test Plan Year | Plan Year · **2026 Meridian | Plan Year** (active) · 2026 Ultimate Health Diamond Plus | Plan Year.
Related list **Plan Year History (6+)** (no buttons, no checkboxes, no row ▼); columns Date · Field · User (link) · Original Value · New Value:
| Date | Field | User | Original Value | New Value |
|---|---|---|---|---|
| 10/8/2026 10:40 AM | End Date | Deepak Malviya | 8/17/2026 | 10/10/2026 |
| 10/8/2026 10:32 AM | End Date | Deepak Malviya | 10/10/2026 | 8/17/2026 |
| 10/8/2026 10:17 AM | End Date | Deepak Malviya | 8/17/2026 | 10/10/2026 |
| 10/8/2026 10:02 AM | Plan Year Label | Deepak Malviya | 2026 Meridiana | 2026 Meridian |
| 10/8/2026 10:01 AM | Plan Year Label | Deepak Malviya | 2026 Meridian | 2026 Meridiana |
| 10/7/2026 9:53 AM | Plan | Tanmoy Das | Test123456 | Ultimate Health Diamond |
Footer **View All**.

### PY2 — 2:37382 2026 Meridian, Details tab
Section 1 (untitled):
| Col | Label | Value | Type | Pencil |
|---|---|---|---|---|
| L | Plan Year Name | 2026 Meridian | text | ✓ |
| L | Valid Start Date | (blank) | date | ✓ |
| L | Annual Family Maximum | $15,500.00 | currency | ✓ |
| L | Deductible Application Type | Full Policy | picklist | ✓ |
| L | Deductible Rule | Reset on Break | picklist | ✓ |
| L | Draft Claim Expiry Days | 30 | number | ✓ |
| L | Draft Expiry Reminder Days | 7 | number | ✓ |
| L | End Date | 10/10/2026 | date | ✓ |
| L | Plan Year Label | 2026 Meridian | text | ✓ |
| L | Plan | Ultimate Health Diamond | link lookup | ✓ |
| L | Start Date | 1/1/2026 | date | ✓ |
| L | Status | Active | picklist | ✓ |
| R | Group | ArmadaCare | link lookup | no |
| R | Valid End Date | 12/31/2026 | date | ✓ |
| R | Run Out Days | 30 | number | ✓ |
| R | Benefit Plan Template | (blank) | (?) | ✓ |
| R | Renewal Type | Manual | picklist | ✓ |
Row pairs: Name|Group · Valid Start|Valid End · Annual Family Max|Run Out Days · Deductible App Type|Benefit Plan Template · Deductible Rule|Renewal Type; rest left only.
**System Information**: L Created By = Feng Yue, 4/19/2026 9:50 AM · R Last Modified By = Deepak Malviya, 10/8/2026 10:40 AM. No Owner field.

### PY3 — 2:38258 2026 Double Platinum, Details tab
Tabs: 2025 | Plan Year · **2026 Double Platinum | Plan Year**. Values: Plan Year Name 2026 Double Platinum · Valid Start (blank) · Annual Family Maximum $25,000.00 · Deductible Application Type Full Policy · Deductible Rule Reset on Break · Draft Claim Expiry Days 30 · Draft Expiry Reminder Days 7 · End Date 12/31/2026 · Plan Year Label 2026 Double Platinum · Plan Double Platinum (link) · Start Date 1/1/2026 · Status Active · Group HVAC and Associates (link) · Valid End Date 12/31/2026 · Run Out Days 30 · Benefit Plan Template (blank) · Renewal Type Manual · Created By Adner Ramos, 10/13/2026 10:53 PM · Last Modified By Adner Ramos, 10/20/2026 9:38 AM.

---
## D. Portal Informations — PI1 2:39060 "Portal Info Name 1"
Nav **Portal Informations**. Tabs: "Login Notice Test Name | Portal Information" · **"Portal Info Name 1 | Portal Information"** (active). Main tab **Details**.
Split view: "All" · "4 items • Updated a few seconds ago" · search · sort **Portal Information Name ↑**; rows (mapping inferred: Name | Title / Message / Severity):
| # | L1 left | L1 right | Line 2 | Severity |
|---|---|---|---|---|
| 1 | Login Notice Test Name | Test Login Notice Title | Test Login Notice Msg | — |
| 2 | Portal Info Name 1 | Portal Info Name 1 | Portal Info Message 1 Portal Info Message 1 Portal Info Me... | Info (3rd line) |
| 3 | Portal Info Name 1 | — | Portal Infor message | Success (same line) |
| 4 | Test | diufbsjkdbgujbgkjsdbgrb | Messga eksndvjksdfngiofdbkjfdnbkijfdbgidfnviodfg | — |
Highlights "Portal Information" / **Portal Info Name 1** · Edit | Delete | Clone | ▼.
Details (one untitled section; rows L | R):
| L label | L value | R label | R value |
|---|---|---|---|
| Portal Information Name ✎ | Portal Info Name 1 | Owner (change-owner) | Deepak Malviya (avatar) |
| Title ✎ | Portal Info Name 1 | Message ✎ | Portal Info Message 1 Portal Info Message 1 Portal Info Message 1 |
| Severity ✎ | Info | Display Location ✎ | Dashboard |
| Approval Status ✎ | Approved | Display Order ✎ | 1 |
| Is Active ✎ | ✓ | Is Dismissible ✎ | ✓ |
| CTA Label ✎ | (blank) | Start Time ✎ | 9/8/2026 12:00 PM |
| CTA Page ✎ | (blank) | End Time ✎ | 9/9/2026 10:00 PM |
| CTA URL ✎ | (blank) | | |
| Created By | Deepak Malviya, 9/9/2026 11:12 AM | Last Modified By | Deepak Malviya, 9/9/2026 11:42 AM |
No related lists.

---
## E. Plan Year Enrollments (nav **Plan Year Enrollments**)
Tabs: "PYE-0000001 | Plan Year Enrollment" · "PYE-0000114 | Plan Year Enrollment".
Split view: "All" · "10 items • Updated a few seconds ago" · NO search · sort **Plan Year Enrollment Number ↑**; rows PYE-0000000, 0001, 0002, 0003, 0004, 0005, 0006, 0114, 0356, 0479.
Highlights "Plan Year Enrollment" / number · Edit | Delete | Clone | ▼. Main tab **Details** (fields + related list below).
Fields (one untitled section): L Plan Year Enrollment Number (no pencil) | R Owner (avatar, change-owner) · L Effective Date ✎ · L Plan Year Tier ✎ (link) · L Plan Year ✎ (link) · L Status ✎ · L Subscriber ✎ (link) · L Created By | R Last Modified By.

### E1 — 2:39648 PYE-0000001 (tab 1 active)
PYE-0000001 · Owner Feng Yue · Effective Date 1/1/2026 · Plan Year Tier a7LEc00000TIcXb · Plan Year 2026 Meridian · Status Active · Subscriber Sofia Martinez · Created By Feng Yue, 4/19/2026 9:50 AM · Last Modified By Feng Yue, 4/19/2026 9:50 AM.
Related **Plan Year Enrollment Members (2)**: ⚙▼ · ⟳ · Change Owner | New; meta "2 items • Updated a few seconds ago"; checkbox column; columns Plan Year Enrollment Member Number (link) · Member (link) · Subscriber (link) · Status · row ▼:
| PYEM # | Member | Subscriber | Status |
|---|---|---|---|
| PYEM-0000004 | Sofia Martinez | Sofia Martinez | Active |
| PYEM-0000005 | Carlos Martinez | Sofia Martinez | Active |
Footer **View All**.

### E2 — 2:40422 PYE-0000114 (tab 2 active)
PYE-0000114 · Owner Varsha Salunke · Effective Date 1/1/2026 · Plan Year Tier a7LEc00000TIcXe · Plan Year test vs · Status Terminated · Subscriber vsfirst1 vslast1 · Created By Varsha Salunke, 8/27/2026 3:51 AM · Last Modified By Varsha Salunke, 10/19/2026 4:54 AM.
Related **Plan Year Enrollment Members (0)**: header only (Change Owner | New).

---
## F. Picklist / status values seen
Plan Year.Status: Active · Deductible Application Type: Full Policy · Deductible Rule: Reset on Break · Renewal Type: Manual · Plan Year History.Field: End Date, Plan Year Label, Plan · Portal Information.Severity: Info, Success · Approval Status: Approved · Display Location: Dashboard · Plan Year Enrollment.Status: Active, Terminated · PYE Member.Status: Active.

## G. Uncertainties
1. Card Transaction sections Amounts / Merchant & Description / Adjudication & Status / Participant & Receipt Info: headers only, contents unknown.
2. T1 split-view right field assumed Claimant.
3. PI1 split-view mapping inferred.
4. Exact SLDS icon names unknown (coloured squares); Plan Year tab glyph unidentified.
5. Types for blank Benefit Plan Template, CTA Page guessed.
6. Hidden "More" tab button in layers.
7. T1 Created By name/date overlap (glitch).
