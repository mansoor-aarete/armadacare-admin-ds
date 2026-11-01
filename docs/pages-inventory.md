# Pages inventory and plan — ArmadaCare Admin Portal (built on ds-v1.0)

Figma: `iiZjEBlMVcWNHALIB4qKBB` (page 0:1) — 10 sections, 48 screens (frames 1920 px wide).
Status: **P0 (audit + plan) — no page code yet.**

## 1. Method and sources
- Figma MCP `get_metadata` of the whole page (cached in Phase 0) → every text layer with absolute position and its Salesforce component ancestors (`Header Cell - …`, `RecordsHighlightsDetailsItem`, `Record_flexipageRecordField`, `Article - …`, `Button - <field>` …). Dumped per screen and read in reading order.
- Figma screenshots of every frame (`get_screenshot`, cached) — checked for layout, column, active tab, state.
- Detailed, verbatim specs per section (every column, row, field in order with column / type / value, picklist values, modal text):

| Spec file | Screens |
|---|---|
| [pages-inventory/accounts.md](pages-inventory/accounts.md) | A1–A9 |
| [pages-inventory/contacts.md](pages-inventory/contacts.md) | C1–C7 |
| [pages-inventory/claims.md](pages-inventory/claims.md) | CL1–CL8 |
| [pages-inventory/reports-and-records.md](pages-inventory/reports-and-records.md) | R1–R9, T1, PY1–PY3, PI1, E1–E2 |
| [pages-inventory/participant-dashboard.md](pages-inventory/participant-dashboard.md) | P1–P7, D1 |

Capture glitches are ignored as listed in `docs/known-differences.md` / `docs/inventory.md` §4 (blank table header rows → labels from layer names; lost glyphs; grey stencils; blank grey band under the header; grey report iframes; overlapping tiny text in A9).

## 2. Screens → templates (48)

Status for every screen: **planned**. Planned URL in the last column (see §6).

| # | Code | Section | Node | Frame | Template | State shown | Planned URL |
|---|---|---|---|---|---|---|---|
| 1 | P1 | Participant | 2:3 | Account Intelligence View \| Accounts | SearchPage | Participant Search tab, basic, no search run | `/lightning/n/Participant_Search?tab=participant` |
| 2 | P2 | Participant | 2:260 | ″ | SearchPage | Claim Search tab, basic (17 status checkboxes, All checked) | `…?tab=claim` |
| 3 | P3 | Participant | 2:621 | ″ | SearchPage | Employer Search tab, no results | `…?tab=employer` |
| 4 | P4 | Participant | 2:865 | ″ | SearchPage | Participant results (Last Name "A", 30 rows) | `…?tab=participant&lastName=A` |
| 5 | P5 | Participant | 2:2423 | ″ | SearchPage | Employer results, 13 found, page 1 of 2 (10/page) | `…?tab=employer&name=A` |
| 6 | P6 | Participant | 2:3068 | ″ | SearchPage | Claim Search advanced ("Show Less"), no records found | `…?tab=claim&advanced=1&employer=…` |
| 7 | P7 | Participant | 2:3781 | ″ | SearchPage | Participant advanced, all statuses checked, results | `…?tab=participant&advanced=1&lastName=A` |
| 8 | D1 | Accounts Dashboard | 2:5437 | Account Intelligence View \| Accounts | IntelligenceViewPage | My Accounts, Total Accounts tile selected, empty state | `/lightning/o/Account/intelligence` |
| 9 | C1 | Contacts | 2:5847 | Adam Sahn \| Contact | RecordPage (no tabs) | default; tabs Aarav · **Adam** | `/lightning/r/Contact/<id>/view` |
| 10 | C2 | Contacts | 2:7726 | Aarav Aramanai \| Contact | RecordPage | Card Transactions card loading | ″ |
| 11 | C3 | Contacts | 2:9562 | Antoinette Mitcham \| Contact | RecordPage + ActionModal | Change Contact Owner modal | `…/view?action=changeOwner` |
| 12 | C4 | Contacts | 2:11470 | ″ | RecordPage + ActionModal (form) | Log an Activity modal | `…?action=logActivity` |
| 13 | C5 | Contacts | 2:13502 | ″ | RecordPage + composer | Note docked composer open | `…?composer=note` |
| 14 | C6 | Contacts | 2:15450 | ″ | RecordPage | Notes (1) populated | `…/view` |
| 15 | C7 | Contacts | 2:17295 | ″ | RecordPage | highlights overflow ▼ open (22 items) | `…/view` (menu open) |
| 16 | CL1 | Claims | 2:19210 | Lightning Experience | ObjectListPage (split mode) | split-view list only, empty workspace | `/lightning/o/Claim/list?filterName=All` |
| 17 | CL2 | Claims | 2:20051 | CLM-0000023 \| Claim | RecordPage | Audit & System tab | `/lightning/r/Claim/<id>/view?tab=audit` |
| 18 | CL3 | Claims | 2:21357 | CLM-0000023 \| Claim | RecordPage | Details tab (empty Files + upload area) | `…?tab=details` |
| 19 | CL4 | Claims | 2:22949 | CLM-0000020 \| Claim | RecordPage | Audit & System tab | `…?tab=audit` |
| 20 | CL5 | Claims | 2:24222 | CLM-0000020 \| Claim | RecordPage + ActionModal | Delete Claim confirm | `…?action=delete` |
| 21 | CL6 | Claims | 2:25897 | ″ | RecordPage + ActionModal | Repayment Recovery info modal | `…?action=repaymentRecovery` |
| 22 | CL7 | Claims | 2:27571 | ″ | RecordPage + ActionModal (custom) | Split Approval calculator | `…?action=splitApproval` |
| 23 | CL8 | Claims | 2:29432 | ″ | RecordPage | Details tab (Files (1), Adjudication History row) | `…?tab=details` |
| 24 | R1 | Reports | 2:31085 | Shared with Me \| Reports | ReportsHomePage | Shared with Me (folders) | `/lightning/o/Report/home?queryScope=sharedWithMe` |
| 25 | R2 | Reports | 2:32027 | AH Accounts and Contacts | ReportViewerPage | report tab (placeholder) | `/lightning/r/Report/<id>/view` |
| 26 | R3 | Reports | 2:32271 | AH Sales & Marketing | ReportsHomePage | folder contents (breadcrumb), row hover | `/lightning/r/ReportFolder/<id>/view` |
| 27 | R4 | Reports | 2:33107 | All Folders \| Reports | ReportsHomePage | All Folders | `…/home?queryScope=allFolders` |
| 28 | R5 | Reports | 2:34073 | 1-1-22 Sirius Transition Groups | ReportViewerPage | report tab | `/lightning/r/Report/<id>/view` |
| 29 | R6 | Reports | 2:34292 | > 2/1 NeverBounce Active Clients & Mem | ReportViewerPage | report tab | ″ |
| 30 | R7 | Reports | 2:34485 | Public Reports \| Reports | ReportsHomePage | Public Reports, row hover (wrapped description) | `…/home?queryScope=public` |
| 31 | R8 | Reports | 2:35371 | Account Census Data | ReportViewerPage | report tab | ″ |
| 32 | R9 | Reports | 2:35564 | Recent \| Reports | ReportsHomePage | Recent (2 reports) | `…/home?queryScope=recent` |
| 33 | T1 | Card Transactions | 2:35931 | CTX-0000000 \| Card Transaction | RecordPage | Details (Dynamic Forms sections) | `/lightning/r/CardTransaction/<id>/view` |
| 34 | PY1 | Plan Years | 2:36529 | 2026 Meridian \| Plan Year | RecordPage | Related tab (Plan Year History 6+), 5 workspace tabs | `/lightning/r/PlanYear/<id>/view?tab=related` |
| 35 | PY2 | Plan Years | 2:37382 | 2026 Meridian \| Plan Year | RecordPage | Details tab | `…?tab=details` |
| 36 | PY3 | Plan Years | 2:38258 | 2026 Double Platinum \| Plan Year | RecordPage | Details tab | ″ |
| 37 | PI1 | Portal Informations | 2:39060 | Portal Info Name 1 \| Portal Information | RecordPage | Details | `/lightning/r/PortalInformation/<id>/view` |
| 38 | E1 | Plan Year Enrollments | 2:39648 | PYE-0000001 \| Plan Year Enrollment | RecordPage | Details + members related list (2) | `/lightning/r/PlanYearEnrollment/<id>/view` |
| 39 | E2 | Plan Year Enrollments | 2:40422 | PYE-0000114 \| Plan Year Enrollment | RecordPage | Details + members (0) | ″ |
| 40 | A1 | Accounts | 2:41037 | Accounts New This Week \| Accounts | ObjectListPage | list view, 22 rows | `/lightning/o/Account/list?filterName=NewThisWeek` |
| 41 | A2 | Accounts | 2:42291 | AGent 1 \| Account | RecordPage + ActionModal | Delete Account confirm (Broker Agency layout) | `/lightning/r/Account/<id>/view?action=delete` |
| 42 | A3 | Accounts | 2:44211 | AGent 1 \| Account | RecordPage + ActionModal (form) | Share modal, lookup focused | `…?action=share` |
| 43 | A4 | Accounts | 2:46225 | AGent 1 \| Account | RecordPage | Broker Agency layout, Details | `/lightning/r/Account/<id>/view` |
| 44 | A5 | Accounts | 2:48122 | New Account: Group | RecordFormPage | Group form, scrolled, error popover open | `/lightning/o/Account/new?recordType=Group` (+ Save with errors) |
| 45 | A6 | Accounts | 2:51331 | New Account: Group | RecordFormPage | top of form, Account Name error | ″ |
| 46 | A7 | Accounts | 2:54505 | New Account | RecordTypePicker | Group selected | `/lightning/o/Account/new` |
| 47 | A8 | Accounts | 2:55068 | Account Hierarchy | HierarchyPage (sub-tab) | tree grid, "current" badge | `/lightning/r/Account/<id>/hierarchy` |
| 48 | A9 | Accounts | 2:55718 | Blalock Development Co \| Account | RecordPage | Group layout, overflow ▼ open (24 items) | `/lightning/r/Account/<id>/view` (menu open) |

## 3. Templates (confirmed)
The expected list holds, with four additions found in the audit (marked **new**). All are generic — no object names inside.

| Template | Used by | Built from (ds-v1.0) |
|---|---|---|
| **ConsoleApp** (routing + workspace / sub-tab state) | all | ConsoleShell, GlobalHeader, AppNav, WorkspaceTabs, WorkspaceSubTabs, UtilityBar, SplitView, DockedComposer |
| **ObjectListPage** | A1, CL1 (split mode) | PageHeader object-home, ListViewToolbar, ButtonGroup, ButtonMenu, DataTable, SplitView |
| **RecordPage** | C1–C7, CL2–CL8, T1, PY1–3, PI1, E1–2, A2–A4, A9 | HighlightsPanel, RelatedListQuickLinks, Tabs, ExpandableSection, RecordFieldGrid / RecordField, RelatedListCard, Card, DataTable, EinsteinCard, Toggle, FileSelector, EmptyState |
| **RecordFormPage** (new / edit; also inline-edit mode of RecordPage) | A5, A6 | ExpandableSection, FormElement-based controls (Input, Textarea, Combobox, Datepicker, DualListbox, Checkbox), FormFooter, ErrorPopover, RecordField (read-only fields) |
| **RecordTypePicker** | A7 | RadioGroup, Button |
| **ActionModal** (**new**) — quick actions from config: confirm (Delete), message (Repayment Recovery), form (Share, Change Owner, Log an Activity), custom component (Split Approval) | A2, A3, C3, C4, CL5–CL7 | Modal, form controls, Checkbox |
| **IntelligenceViewPage** | D1 | PageHeader, Combobox, ButtonIcon / ButtonGroup, MetricTile, EmptyState |
| **ReportsHomePage** | R1, R3, R4, R7, R9 | PageHeader (breadcrumbs), Input, ButtonGroup, ButtonMenu, VerticalNav, DataTable |
| **ReportViewerPage** (**new**) | R2, R5, R6, R8 | report body is an iframe in Salesforce (not captured) → shaded placeholder region |
| **HierarchyPage** | A8 | WorkspaceSubTabs, PageHeader related-list (breadcrumbs), TreeGrid, Badge |
| **SearchPage** (**new**) — tabbed criteria sections + results + pagination, from config | P1–P7 | Tabs, Card, ExpandableSection (non-collapsible), Input, Combobox, CheckboxGroup, Button, DataTable, Pagination, EmptyState (text) |
| **List-only split mode** (**new state of ObjectListPage**) | CL1 | SplitView + empty workspace |

Object-specific widgets that have no generic shape (Split Approval calculator; Claim "Receipt / Documentation"; Contact "Payment & Repayment History") live in `src/objects/<object>/widgets/` and are referenced from config — still composed only from ds-v1.0 components.

## 4. Architecture — templates + config

### 4.1 Folder layout
```
src/
  app/
    App.tsx, routes.tsx               routes (showcase + console)
    console/                          ConsoleApp (shell + workspace-tab state), useConsole()
    templates/                        one file per template (§3) — generic, small
    widgets/                          generic record-page regions rendered from config: FieldSection, RelatedList,
                                      SummaryCard, TableCard, FilesCard, TabbedListCard, CustomLinks, TextCard …
  objects/<object>/                   config.ts · mock-data.ts · types.ts (+ widgets/ only if an object needs one)
  objects/index.ts                    object registry (apiName → config)
  services/                           async data access (Promises) — swap for Salesforce APIs later
    records.ts                        listRecords · getRecord · createRecord · updateRecord · deleteRecord · searchRecords
    store.ts                          in-memory store seeded from objects/*/mock-data.ts (per session)
    reports.ts · search.ts            report folders / reports; participant / employer / claim search
  config/types.ts                     ObjectConfig, ListViewConfig, RecordLayoutConfig, FormConfig, ActionConfig …
```
Pages never import mock data — only `services/*`. **Adding an object = a new `src/objects/<object>/` folder + one registry line. Zero page code.**

### 4.2 Config shape (`src/config/types.ts`)
- `ObjectConfig<F>`: `apiName`, `label`, `labelPlural`, `iconName`, `nameField`, `listViews`, `splitView` (list view + line fields), `recordTypes?` (label, description), `layouts` (per record type → `RecordLayoutConfig`), `forms?` (per record type → `FormConfig`), `actions` (`ActionConfig[]`), `hierarchy?`, `intelligence?`.
- `ListViewConfig`: `id`, `label`, `columns: ColumnConfig[]` (field, label, type text | link | date | datetime | number | currency | lookup | icon-link, align, sortable, wrap), `filter`, `defaultSort`, `headerActions`, `toolbar` (which ListViewToolbar controls).
- `RecordLayoutConfig`: `highlights` (fields, actions → `ActionConfig` ids, overflow, follow, hierarchy), `quickLinks`, `tabs?` (or a flat region list when the page has no tabs — Contact), regions: `fieldSection` · `relatedList` · `summaryCard` · `table` · `files` · `customLinks` · `textCard` · `tabbedListCard` · `widget`; `sidebar` regions.
- `FormConfig`: sections → fields (text, textarea, number, currency, percent, picklist, multiPicklist, lookup, date, datetime, checkbox, address, readOnly), `required`, `helpText`, values, defaults.
- `ActionConfig`: `id`, `label`, `kind` (`delete` | `message` | `form` | `navigate` | `widget` | `composer`), modal title / body / fields / buttons, `visibleWhen(record)` (e.g. claim actions by status).

### 4.3 Generic interactions (implemented once, in templates)
Workspace tabs open / close / focus; list view switching; search this list; sort; row selection; row action menus; section expand / collapse; tab switching; inline edit (pencil → edit mode for the layout, local state → `updateRecord`); form validation → field errors + ErrorPopover; modals; Save / Save & New / Cancel; Delete confirm → `deleteRecord` → close tab; New → record type → form → create → open record tab.

## 5. Objects (summary — full detail in the spec files)

| Object | List view columns | Record layout | Forms / actions |
|---|---|---|---|
| **Account** (2 layouts: Broker Agency, Group) | A1 "Accounts New This Week": Account Name (link) · Mailing State/Province · Date of Armada Implementation · Original Effective Date · Armada Business Unit · UH Covered Lives (num) · Account Manager (link) · Account Owner Alias (link) — 22 rows | Highlights + hierarchy, Follow, Send with Docusign / Sharing / Delete / ▼ (Broker Agency) or Group set with 24-item overflow; quick links (12 / 14 + Show All (22)); tabs Details · Related · Report · ZoomInfo; 10–16 sections (2 columns); sidebar Next Best Action · Duplicates · Activity | Record types (11, with descriptions); Group create form ≈170 fields / 16 sections (dual listboxes, address compound, datetime); Delete; Share |
| **Contact** | split view "All Members" (50+): Name · Employee · gender · birthdate | no tabs; highlights (6 fields); quick links 14 + Show All (17); Contact Information (10+11), Coverage Information (8+8); custom regions Account Activity (error), Payment & Repayment History (tabs + filters + empty), Account Balance Summary (subtitle by relationship), Plan Change Overview, Emergency Contact, Enrollment & Plan, Claim Substantiation Documents, Repayment Obligations; sidebar related lists Notes · Member Documents · Notifications · Cases · Card Transactions | Change Owner, Log an Activity, Note composer, overflow (22 items) |
| **Claim** | split view "All" (50): Claim Number · status | tabs Details · Audit & System; Details: Claim Details card (3-col caps grid), Benefit Snapshot (error), Claims, Adjudication Summary, Receipt / Documentation (toggle), Files, Accumulator Balances (7 cols × 19 rows), 6 related lists; Audit & System: 3 sections (15 / 2 / 17 fields) + 3 related lists | actions by status (Approve / Deny / RMI / Split Approval / ▼ vs Split Approval / Repayment Recovery / Delete); Delete, Repayment Recovery, Split Approval modals |
| **Card Transaction** | split view "All" (7) | Details: 6 sections (only Information + System Information have fields) | ▼ only |
| **Plan Year** | split view "All" (27) | tabs Related (Plan Year History 6+) · Details (17 fields + System Information) | Edit / Delete / Clone / ▼ |
| **Plan Year Enrollment** | split view "All" (10, no search) | Details: fields + Plan Year Enrollment Members related list (table, selection, row ▼) | Edit / Delete / Clone / ▼ |
| **Portal Information** | split view "All" (4, 3-line items) | Details: one section, 17 fields incl. ✓ checkboxes, datetimes | Edit / Delete / Clone / ▼ |
| **Report / Report Folder** | folder table (Name · Created By · Created On · Last Modified By · Last Modified Date); report table (Name · Description · Folder · Created By · Created On · Subscribed) | report viewer placeholder | New Report / New Folder (+ ▼) |
| **Participant search** (custom) | participant results 10 cols (30 rows); employer results 9 cols (13, paged); claim search no results | criteria sections per tab, checkbox groups (17 claim statuses etc.) | Search / Clear |

## 6. Data model (`src/objects/<object>/types.ts`)
One type per object; every record is `{ id: string; recordTypeId?: string } & <Object>Fields`. Field keys mirror the Figma labels (camelCase); values are the real Figma values (names, IDs, dates as displayed, statuses, amounts). Lookups are `{ id; name; avatar? }`. Full field lists come from the spec files.

```ts
type Lookup = { id: string; name: string; objectApiName: string; avatarUrl?: string };
type Audit = { createdBy: Lookup; createdDate: string; lastModifiedBy: Lookup; lastModifiedDate: string };

type Account = Audit & { id; recordType: "Group" | "Broker Agency" | …11; name; mailingState?; dateOfArmadaImplementation?; originalEffectiveDate?;
  armadaBusinessUnit?; uhCoveredLives?: number; accountManager?: Lookup; owner: Lookup; ownerAlias; type?: "Prospect" | "Client"; status?;
  parentId?; phone?; site?; …(full Broker Agency + Group field sets) };
type Contact = Audit & { id; name; employee?: Lookup; gender?; birthdate?; cdexId?; employmentStartDate?; employmentStatus?; product?; account?: Lookup;
  portal?; ssnMasked?; relationship: "Dependent" | "Participant" | …; …(Contact / Coverage Information fields) };
type Claim = Audit & { id; claimNumber; status: ClaimStatus /* 12 values */; participant?: Lookup; serviceDate?; expenseCategory?; expenseType?;
  methodFiled?; provider?; totalClaimAmount?: number; submissionDate?; planYear?: Lookup; subscriber?: Lookup; netDeductibleApplied?; …
  accumulators: AccumulatorBalance[]; files: ClaimFile[]; adjudicationHistory: AdjudicationEntry[] };
type CardTransaction = Audit & { id; number; employer?: Lookup; claimant?: Lookup; debitCardToken; cardNumber; owner: Lookup };
type PlanYear = Audit & { id; name; group?: Lookup; validStartDate?; validEndDate?; annualFamilyMaximum?: number; runOutDays?: number;
  deductibleApplicationType?; deductibleRule?; benefitPlanTemplate?; draftClaimExpiryDays?; draftExpiryReminderDays?; renewalType?; endDate?;
  label?; plan?: Lookup; startDate?; status; history: PlanYearHistoryEntry[] };
type PlanYearEnrollment = Audit & { id; number; owner: Lookup; effectiveDate?; planYearTier?: Lookup; planYear?: Lookup; status: "Active" | "Terminated";
  subscriber?: Lookup; members: PlanYearEnrollmentMember[] };
type PortalInformation = Audit & { id; name; owner: Lookup; title; message; severity: "Info" | "Success" | …; displayLocation; approvalStatus;
  displayOrder: number; isActive: boolean; isDismissible: boolean; ctaLabel?; ctaPage?; ctaUrl?; startTime?; endTime? };
type ReportFolder = Audit & { id; name };  type Report = { id; name; description?; folder: Lookup; createdBy: Lookup; createdDate: string; subscribed?: boolean };
type Note = { id; title; body; createdDate; createdBy: Lookup; parentId };  type Task = { id; subject; type?; status; priority; dueDate?; … };
type ParticipantSearchRow · EmployerSearchRow — the P4 / P5 result columns.
```

## 7. Routes and navigation
Salesforce-style URLs (react-router, client-side). The console keeps workspace tabs in app state; the active tab's route is the URL.

| Route | Template | Tab behaviour |
|---|---|---|
| `/` | → `/lightning/o/Account/list?filterName=NewThisWeek` | — |
| `/lightning/o/:object/list?filterName=` | ObjectListPage (split mode when the object's home is split view — Claim) | object nav item active, no workspace tab |
| `/lightning/o/Account/intelligence` | IntelligenceViewPage | object nav item active |
| `/lightning/r/:object/:id/view?tab=&action=` | RecordPage (+ ActionModal when `action`) | opens / focuses "<Name> \| <Object>" tab |
| `/lightning/o/:object/new` → `?recordType=` | RecordTypePicker → RecordFormPage | "New <Object>" → "New <Object>: <Record Type>" tab (no ▼) |
| `/lightning/r/:object/:id/edit` | RecordFormPage (edit) | in the record's tab |
| `/lightning/r/Account/:id/hierarchy` | HierarchyPage | sub-tab "Account Hierarchy" inside the account's workspace tab |
| `/lightning/o/Report/home?queryScope=` | ReportsHomePage | nav item "Reports" active; "All Folders \| Reports" opens as a tab when navigated from a report |
| `/lightning/r/ReportFolder/:id/view` · `/lightning/r/Report/:id/view` | ReportsHomePage (folder) · ReportViewerPage | folder / report tabs |
| `/lightning/n/Participant_Search?tab=` | SearchPage | nav item "Participant" active |
| `/showcase` | design-system showcase (unchanged) | — |

Navigation: object nav ▼ menu lists all objects · list row / split-view item → record tab · New → record type → form → Save → record tab · Delete → confirm → record deleted, tab closed · hierarchy icon → sub-tab · report / folder row → tab · Participant results → Contact / Account record tab.

## 8. Missing from ds-v1.0 (NOT built — need your OK)
| # | Need | Where | Proposal |
|---|---|---|---|
| M1 | **Time picker** (date + time fields) | A5/A6 Group form datetime fields; editing PI1 Start/End Time | New `Timepicker` component (SLDS Timepicker blueprint: combobox + time listbox + clock icon) + registry icon `utility:clock` |
| M2 | **Scoped notification / alert** | CL7 Split Approval error alert | New `ScopedNotification` (SLDS Scoped Notifications blueprint, error / warning / info) |
| M3 | **Multi-select listbox** ("Reason codes — select one or more") | CL7 denied / RMI reasons | Option A: new `Listbox` (SLDS listbox multi-select); Option B: reuse `CheckboxGroup` (no DS change, different look) |
| M4 | **3-column field grid** | Claim Details card, Receipt / Documentation (3 caps fields per row) | `RecordFieldGrid` prop `columns: 3` (additive) |
| M5 | **Icons not in the registry** | utility:bookmark (D1 filter bar), utility:clock (M1), utility:change_record_type (Account Record Type field); object icons for Account quick links / cards (Account History, Affiliated Groups, Executive Physicals, Identified Providers, Portal Information Target), Contact regions (Account Activity, Payment & Repayment History, Plan Change Overview, Claim Substantiation Documents), Claim (Benefit Snapshot, Files grey) | add to `scripts/build-icons.mjs` with evidence; nearest SLDS icon where the org uses custom images (as KD4) |
| M6 | **Inline-edit field control in a record grid** | pencil → edit | No new component: RecordPage switches the section to edit mode using existing form controls + FormFooter (Lightning behaviour). Listed for awareness only. |

Not needed (covered): stencils → Spinner (KD29); report iframe → placeholder; static map → omitted (G11); custom accent cards → standard Card (KD34); Search Criteria dark bar → standard section title (KD1).

## 9. Phase plan
| Phase | Scope | New template code |
|---|---|---|
| P1 | Console routing + workspace tabs; templates ObjectListPage, RecordPage, RecordFormPage, RecordTypePicker, ActionModal, IntelligenceViewPage, HierarchyPage; Accounts config + mock data (A1–A9, D1) | yes |
| P2 | Contacts (C1–C7) | composer / Log an Activity via ActionModal — none new |
| P3 | Claims (CL1–CL8) | split mode + Claim widgets (Split Approval) |
| P4 | Reports (R1–R9) | ReportsHomePage, ReportViewerPage |
| P5 | Plan Years (PY1–3) | none |
| P6 | Plan Year Enrollments (E1–2) | none |
| P7 | Card Transactions (T1) | none |
| P8 | Portal Informations (PI1) | none (datetime needs M1) |
| P9 | Participant (P1–P7) | SearchPage |
| P10 | Accounts Dashboard (D1) | (IntelligenceViewPage from P1) |

Note: D1 (Accounts Dashboard) is planned in P1 because the Accounts phase includes the Intelligence View; P10 then only verifies it.

## 10. Open questions
1. **M1–M5** — approve the new components / prop / icons (or tell me which to drop and render a fallback).
2. **Content not captured** (Contact Emergency Contact / Enrollment & Plan fields, Card Transaction Amounts / Merchant / Adjudication / Participant sections, Contact Repayments / Recovery tabs, Claim Benefit Snapshot): render the sections empty as in Figma (proposed), or invent fields?
3. **Backend error texts in Figma** (Account Activity credential error, Benefit Snapshot and Split Approval "No such column …"): reproduce the error states as captured (proposed, matches Figma), or show the intended content?
4. P5 Employer Code column shows record URLs in Figma (misconfigured column) — reproduce as captured (proposed)?
