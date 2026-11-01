# Figma inventory — ArmadaCare Admin Portal (Salesforce Lightning console captures)

Source: Figma file `iiZjEBlMVcWNHALIB4qKBB`, page `0:1` ("Page 1"). 10 sections, **48 screens** (all frames 1920 px wide).
Method: `get_metadata` of the whole page (parsed offline, 7.8 MB), a `get_screenshot` of **every** screen (reviewed one by one), and `get_design_context` on 14 representative nodes for exact colours/type.
SLDS classes named below were checked against `@salesforce-ux/design-system@2.264.3` CSS; classes that exist only in SLDS markup docs (no CSS) are flagged *(markup-only)*.

---

## 0. Screen index

Codes are used in the tables below.

| Code | Node | Section · title | What the screen shows |
|---|---|---|---|
| P1 | 2:3 | Participant · Participant Search | Custom search LWC (tabs Participant/Employer/Claim Search), "Search Criteria" bar, required field, picklist, Search/Clear |
| P2 | 2:260 | Participant · Claim Search | Checkbox group of claim statuses ("All" checked) |
| P3 | 2:621 | Participant · Employer Search | Same LWC, but standard-looking checkbox (blue) and dark-olive Search button |
| P4 | 2:865 | Participant · Participant results | Results table (labels lost), link column, "30 record(s) found." |
| P5 | 2:2423 | Participant · Employer results | Search button focused, pagination (Records per page select, Previous disabled, Page 1 of 2, Next) |
| P6 | 2:3068 | Participant · Claim Search advanced | Shaded section titles, date inputs, picklists, 4 checkbox groups, "No records found…" |
| P7 | 2:3781 | Participant · Participant advanced + results | All status checkboxes checked, date input |
| D1 | 2:5437 | Accounts Dashboard · My Accounts | Object-home header, filter bar, metric tiles, list meta bar, empty-state illustration |
| C1 | 2:5847 | Contacts · Adam Sahn | Full console record page: split view, workspace tabs, highlights, quick links, sections, cards, right-column related lists |
| C2 | 2:7726 | Contacts · Aarav Aramanai | Same; Card Transactions card loading (stencil) |
| C3 | 2:9562 | Contacts · Change Contact Owner modal | Lookup with object switcher, checkbox, bullet list |
| C4 | 2:11470 | Contacts · Log an Activity modal | Lookups (selected pill / object switcher), comboboxes, datepickers, checkbox, scrolling body |
| C5 | 2:13502 | Contacts · Note composer | Docked composer (utility) with title, rich-text editor, related pill, footer actions |
| C6 | 2:15450 | Contacts · Notes (1) | Related-list card with one item + View All |
| C7 | 2:17295 | Contacts · overflow menu | Actions overflow menu opened (partially captured) |
| CL1 | 2:19210 | Claims · list only | Split view (status text on the right), empty workspace |
| CL2 | 2:20051 | Claims · CLM-0000023 Audit & System | Header actions (Approve/Deny/RMI/Split Approval/▼), tabs, 3 sections, read-only checkboxes, owner lookup, related lists with New |
| CL3 | 2:21357 | Claims · CLM-0000023 Details | Coloured-border custom cards, caps label/value grid, toggle, file drop zone, accumulator table, 6 related lists |
| CL4 | 2:22949 | Claims · CLM-0000020 Audit & System | As CL2 (different data) |
| CL5 | 2:24222 | Claims · Delete Claim modal | Prompt modal; Files (1); related list with table, settings/refresh, row menu |
| CL6 | 2:25897 | Claims · Repayment Recovery modal | Info modal, single brand "Close" |
| CL7 | 2:27571 | Claims · Split Approval calculator | Custom modal: error alert, summary grid, amount/percent inputs, multi-select, disabled buttons |
| CL8 | 2:29432 | Claims · CLM-0000020 Details | As CL3 |
| R1 | 2:31085 | Reports · Shared with Me | Reports home: header w/ count, search, New Report/New Folder, settings; vertical nav; table with folder icons + row menus |
| R2 | 2:32027 | Reports · report tab | Report iframe not captured (grey) |
| R3 | 2:32271 | Reports · AH Sales & Marketing | Breadcrumb title, button group with ▼, hovered row |
| R4 | 2:33107 | Reports · All Folders | As R1 |
| R5 | 2:34073 | Reports · report tab | Grey placeholder, 2 tabs |
| R6 | 2:34292 | Reports · report tab | Grey placeholder |
| R7 | 2:34485 | Reports · Public Reports | Wrapped description cell, hovered row |
| R8 | 2:35371 | Reports · report tab | Grey placeholder |
| R9 | 2:35564 | Reports · Recent | 2 rows |
| T1 | 2:35931 | Card Transactions · CTX-0000000 | Split view (single-line items), header with only ▼ menu, Related/Details tabs, masked values |
| PY1 | 2:36529 | Plan Years · 2026 Meridian Related | Related list "Plan Year History (6+)" table; 5 workspace tabs |
| PY2 | 2:37382 | Plan Years · 2026 Meridian Details | 2-column record detail, System Information |
| PY3 | 2:38258 | Plan Years · 2026 Double Platinum | As PY2 |
| PI1 | 2:39060 | Portal Informations · Portal Info Name 1 | 3-line split-view items, read-only checked checkboxes (✓ icon) |
| E1 | 2:39648 | Plan Year Enrollments · PYE-0000001 | Related list card with selectable table, row menus, Change Owner/New, View All |
| E2 | 2:40422 | Plan Year Enrollments · PYE-0000114 | Same related list with (0) items — header only |
| A1 | 2:41037 | Accounts · Accounts New This Week | Object home list view: header, pin, button group, list toolbar, datatable, utility bar |
| A2 | 2:42291 | Accounts · AGent 1 + Delete Account modal | Split view with multi-select, Follow button, quick links, 4 tabs, long field list, sidebar (Next Best Action, Duplicates, Activity) |
| A3 | 2:44211 | Accounts · Share modal | Focused lookup with object switcher, 4 required picklists inline, inline link |
| A4 | 2:46225 | Accounts · AGent 1 | As A2 without modal |
| A5 | 2:48122 | Accounts · New Account: Group (bottom) | Error popover "We hit a snag." on docked footer, dual listboxes, horizontal form |
| A6 | 2:51331 | Accounts · New Account: Group (top) | Record edit form: error input, lookups, read-only owner, picklists, datepickers, footer |
| A7 | 2:54505 | Accounts · New Account (record type) | Radio group with descriptions, Cancel/Next |
| A8 | 2:55068 | Accounts · Account Hierarchy | Workspace sub-tabs, breadcrumb, tree grid with "current" badge |
| A9 | 2:55718 | Accounts · Blalock Development Co | Full account record; overflow menu open with hovered item; sidebar cards |

Present on **all 48 screens**: global header (2 rows), context bar (app launcher, app name, object nav item with ▼), utility bar (Omni-Channel). Workspace tabs appear on 35 screens.

---

## 1. Component inventory

### 1.1 Console shell

| UI element | SLDS blueprint (classes) | Figma layer hints | Screens | Variants / states seen |
|---|---|---|---|---|
| **Global header** | Global Header: `slds-global-header_container`, `slds-global-header`, `slds-global-header__item`, `slds-global-header__item_search`, `slds-global-actions`, `slds-global-actions__item`, `slds-global-actions__item-action`, `slds-global-actions__favorites`, `slds-global-actions__favorites-action`, `slds-global-actions__favorites-more`, `slds-global-actions__task`, `slds-global-actions__notifications`, `slds-global-actions__avatar` (`…__help`, `…__setup` are *markup-only*) | `Navigation - Global`, `Button - Search`, `Button - Add favorite`, `Container` w/ avatar | all | Two rows in this org: **row 1** = panel toggle (hamburger, `Button - Toggle Panel`) + sandbox chip "Sandbox (CXDev)" (`Devops_centerOrgInfo`, bg `#e0e5f8`) + round ▼ button on the right; **row 2** = empty logo area (200 px), centred search button "Search…" (400 px), favourites star + ▼ split pair, global actions (+ filled grey), help, setup, notifications bell (badge hidden), avatar. Favourites star disabled ("This item doesn't support favorites") on D1, CL1, A5–A8. |
| **App nav / context bar** with app launcher | Context Bar: `slds-context-bar`, `slds-context-bar__primary`, `slds-icon-waffle_container`, `slds-icon-waffle` (+ `slds-r1…r9`), `slds-context-bar__app-name`, `slds-context-bar__item`, `slds-context-bar__label-action`, `slds-context-bar__icon-action`, `slds-context-bar__dropdown-trigger`, `slds-context-bar__secondary` | `Navigation - App`, `OneAppLauncherHeader`, `Heading 1` "ArmadaCare Admin…", `Navigation - Global` (object item), `Button - Show Navigation Menu` | all | App name truncated with ellipsis. One **object nav item** (Accounts / Contacts / Claims / Reports / …) shown *active* (10 % olive tint + 3 px top bar) with a ▼ "Show Navigation Menu" button. Bottom border 3 px **grey** `#c9c9c9`. |
| **Console workspace tabs** | Context bar tabs: `slds-context-bar_tabs` + `slds-context-bar__item_tab`, `slds-context-bar__label-action`, `slds-context-bar__icon-action` (tab menu ▼ and close ✕), `slds-is-active`, `slds-is-unsaved`, `slds-context-bar__item_divider-left` | `Navigation - Workspaces`, `Tab List - Workspace tabs for ArmadaCare Admin Portal`, `Placeholder for Tab` | C1–C7, CL2–CL8, R2–R9, T1, PY*, PI1, E*, A2–A9 | Tab = object icon (14 px, e.g. contact, claim, report, folder, account) + truncated label "Adam Sahn \| Contact" + ▼ menu + ✕ close. Active: bg `rgba(139,154,76,0.1)`, 3 px top bar `#8b9a4c`, label `#181818` 13 px. 1–5 tabs seen (PY1 has 5). "New Account: Group" tab has ✕ but **no** ▼ (A5, A6). Overflow (more tabs than fit) not seen. |
| **Workspace sub-tabs** | Sub Tabs: `slds-sub-tabs`, `slds-sub-tabs__item`, `slds-sub-tabs__item.slds-active` | `Navigation - Active Workspace Subtabs` | A8 | Second row under workspace tabs: "Blalock Develop…" (account icon) and active "Account…" (bold, ▼ + ✕). |
| **Split view** (list panel + collapse handle) | Split View: `slds-split-view_container`, `slds-is-open`/`slds-is-closed`, `slds-split-view`, `slds-split-view__header`, `slds-split-view__list-header`, `slds-split-view__list-item`, `slds-split-view__list-item-action`, `slds-split-view__toggle-button` | `LstListViewPicker`, `List - Select an item from this list to open it.`, `List Item`, `Button - Toggle Panel`-like handle | C1–C7, CL1–CL8, T1, PY1–3, PI1, E1–2, A2–A9 | Header: object icon (32 px), list-view picker title "All Members ▼" / "All ▼" / "Accounts New This Week ▼", pin button, ▼ list-view-controls button; meta line "50+ items • Updated 2 minutes ago" / **"4 items selected"**; display-as ▾ and refresh icon buttons; optional "Search this list…" input. List header row: select-all checkbox (unchecked / **indeterminate** A2, A5, A8), sortable column "Name ↑", info icon. Items: checkbox + 1–3 lines (title left, secondary text right, second line meta, third line right-aligned). Selected checkboxes ✓ olive (A2, A8). Background `#f3f3f3`, rows separated by `#c9c9c9`. Collapse handle ◀ on the panel's right edge, centred vertically. Hover/selected item highlight not captured. |
| **Utility bar** | Utility Bar: `slds-utility-bar_container`, `slds-utility-bar`, `slds-utility-bar__item`, `slds-utility-bar__action`, `slds-utility-bar__text` | `Footer - Utility Bar`, `Omni-Channel` | all | Single item "Omni-Channel" with icon, idle state. |
| **Docked composer** (utility panel) | Docked Composer: `slds-docked_container`, `slds-docked-composer`, `slds-docked-composer__header`, `…__body`, `…__footer` + Rich Text Editor `slds-rich-text-editor`, `…__toolbar`, `slds-rich-text-area__content` | Notes composer (no SF layer name) | C5 | Header: note icon + "No new note" + minimize / pop-out / close. Body: Title input, "Visibility Set by Record" (lock icon), "Compose text" rich-text editor (focused, toolbar icons lost in capture), "Related to" pill (contact icon). Footer: Delete, Share, Add to Records, Done. |

### 1.2 Page headers and toolbars

| UI element | SLDS blueprint | Figma layer hints | Screens | Variants / states seen |
|---|---|---|---|---|
| **Object home page header** with list-view picker and pin | Page Header (object home): `slds-page-header`, `slds-page-header_object-home`, `slds-page-header__row`, `slds-page-header__col-title`, `slds-page-header__name`, `slds-page-header__name-title`, `slds-page-header__name-switcher`, `slds-page-header__title`, `slds-page-header__col-actions`, `slds-page-header__col-meta`, `slds-page-header__meta-text`, `slds-page-header__col-controls`, `slds-page-header__controls`, `slds-page-header__control` | `LstListViewManagerHeader`, `LstBreadcrumbs`, `LstListViewPicker`, `LstListViewManagerPinButton` | A1, D1 | Bg `#f3f3f3`, bottom border `#c9c9c9`. Object icon 32 px (account `#5867e8`), breadcrumb line "Accounts" 13 px, title 18 px bold "Accounts New This Week" + ▼ switcher, **pin** icon button (24 px, bordered). Meta "22 items • Sorted by Account Name • Updated 2 minutes ago" (12 px). D1 variant: "My Accounts ▼", no pin, controls group on the right. |
| **Reports home header** | Same blueprint (object home) + Breadcrumbs (`slds-breadcrumb`, `slds-breadcrumb__item`, `slds-list_horizontal`) | `Reports`, `Shared with Me`, `Link - All Folders` | R1, R3, R4, R7, R9 | Breadcrumb line "Reports", title 20 px regular "Shared with Me" / "All Folders > AH Sales & Marketing" (breadcrumb link in olive), count "105 items". Right: search input ("Search folders shared with me…"), button group New Report \| New Folder (+ ▼ on R3), gear-with-▾ settings menu. |
| **List view button bar** | Button Group: `slds-button-group-list` / `slds-button-group` + `slds-button_neutral` + overflow `slds-button_icon-border-filled` `slds-button_last` + Dropdown | `List`, `List Item`, `ForceListViewManagerButtonBar` | A1, D1 | A1: New \| Discover Companies \| Import \| Printable View \| Add to an Actionable List \| ▼. D1: Add to an Actionable List \| Assign Label. |
| **List view toolbar** | Page header controls: `slds-page-header__controls` with `slds-button_icon-border-filled` (+ `slds-button_icon-more` for ▾), Input with icon `slds-input-has-icon_left` (search), `slds-button-group` | `ForceListViewManagerSearchBar`, `LstListViewManagerSettingsMenu`, `LstListViewManagerDisplaySwitcher`, `LightningButtonGroup`, `LightningButtonIconStateful` | A1, R*, D1, E1, CL5 | "Search this list…" (240 px); gear ▾ (list view controls); table-icon ▾ (display as); refresh; sort; pencil (inline edit); chart; filter (stateful, grouped with chart). Related-list variant (E1, CL5): gear ▾ + refresh only. |
| **Record home header + highlights panel** | Page Header (record home): `slds-page-header` + `slds-page-header__row` / `slds-page-header__detail-row` / `slds-page-header__detail-block` (`slds-page-header_record-home` is *markup-only*) | `RecordsHighlights2`, `RecordsHighlightsIcon`, `ForceSocialRecordAvatarWrapper`, `RecordsHighlightsDetailsItem`, `SfaAccountHighlightsPanelRightContent` | C1–C7, CL2–CL8, T1, PY1–3, PI1, E1–2, A2, A4, A9 | Top part bg `#f3f3f3`, shadow `0 2px 1px rgba(0,0,0,.1)`, border `#c9c9c9`, radius 4. Object icon 32 px; type label "Account" 13 px `#444`; name 18 px bold. Detail row (white): up to 6 items, label 12 px `#444`, value 14 px `#181818` / link olive; empty values allowed (CL2: labels only). Optional hierarchy icon button (A9, C1). |
| **Actions ribbon / button group with overflow** | Button Group (`slds-button-group`) of `slds-button_neutral` + `slds-button_icon-border-filled slds-button_last` dropdown trigger (`slds-dropdown-trigger_click`) + Dropdown Menu | `Runtime_platform_actionsActionsRibbon`, `LightningButtonMenu` | C*, CL*, T1, PY*, PI1, E*, A2–A9 | Labels: Send with Docusign / Change Owner / Log an Activity / ▼ (contacts); Approve / Deny / RMI / Split Approval / ▼ (claims CLM-23); Split Approval / Repayment Recovery / Delete (CLM-20, no ▼); Edit / Delete / Clone / ▼; Follow (stateful, **+ icon**, separate) + Send with Docusign / Sharing / Delete / ▼ (account). T1: only ▼. Overflow **menu open** (A9, C7): 20+ items, item text `#57612d` 12 px, hovered item bg `#f3f3f3` text `#181818`, max-height scroll. |
| **Related list quick links** | No dedicated SLDS 1 CSS blueprint (see Gaps G4). Built from `slds-card` + `slds-grid slds-wrap` + Icon (`slds-icon_container`, `slds-icon_x-small`) + `slds-text-link` (underlined) | `Related List Quick Links`, `LstRelatedListQuickLink` | C1–C7, A2, A4, A9 | Title "Related List Quick Links" bold 13 px + info icon; 2 rows × 7 columns of `[icon 12–16px] Label (count)` links (underlined, olive); "Show All (17)" / "Show All (22)" centred link. |

### 1.3 Data display

| UI element | SLDS blueprint | Figma layer hints | Screens | Variants / states seen |
|---|---|---|---|---|
| **Data table** | Data Table: `slds-table`, `slds-table_bordered`, `slds-table_fixed-layout`, `slds-table_resizable-cols`, `slds-table_header-fixed`?, `slds-is-sortable`, `slds-th__action`, `slds-is-resizable`, `slds-row-number`, `slds-cell-buffer_left`, `slds-hint-parent`, `slds-text-align_right`, `slds-truncate`, `slds-checkbox` (row select), row action `slds-button_icon-border-filled slds-button_icon-x-small` + Dropdown; `slds-has-focus` | `LightningDatatable`, `LightningPrimitiveHeaderFactory`, `LightningPrimitiveHeaderActions`, `LightningPrimitiveCellFactory`, `LightningPrimitiveCellCheckbox`, `Header Cell - Row Number`, `Header Cell - Action` | A1, E1, CL5, PY1, R1/R3/R4/R7/R9, P4, P5, P7 | Header row bg `#f3f3f3`, 32 px, label 13 px **bold** `#444`, column divider `#aeaeae`, per-column ▾ header-action button (24 px). Rows 28–30 px, text 13 px `#181818`, row separator `#c9c9c9`. Cell types: row number (empty), select checkbox, **link** (olive), plain text, date, number right-aligned, status text ("Active", "Approved"), folder icon + link (reports), wrapped multi-line text (R7, P4). Row action ▾ (20 px bordered) at row end. Hovered row grey (R3, R7). Sort arrow ↑ on split-view list header. **All header labels lost in capture** (see §4). Pagination footer on P5. |
| **Simple table** (accumulator / results) | Data Table with `slds-table_bordered` (no actions) | `Accumulator Balances` (custom LWC) | CL3, CL5–CL8 | Header bold 13 px, currency right-aligned, rows `#c9c9c9` separators; title with icon (chart icon 20 px). |
| **Tree grid** (account hierarchy) | Tree Grid: `slds-table_tree` + `slds-table`, `slds-table_bordered`, `slds-tree__item`, row `aria-level`/`aria-expanded`, `slds-button_icon` chevron | `Header Cell - Account Name`…, `Table` | A8 | Header in **caps** with letter spacing (`slds-text-title_caps`), one row level 1: link "Blalock Development Co" + inverse badge "current". Expand chevron not visible (single node). |
| **Related list card with New button** | Card: `slds-card`, `slds-card__header`, `slds-card__header-title`, `slds-card__header-link`, `slds-card__body`, `slds-card__footer` (View All) + `slds-media` + Icon + neutral Button / button group; collapsed variant = header only | `Article - …`, `LstCommonListInternal`, `LstListViewManagerHeader` (related list), `LstRelatedListViewManager` | C1–C7 (right column), CL2–CL8, E1–2, PY1, A9 | Header bg `#f3f3f3` (when it hosts a table) or white; border `#c9c9c9`, radius 4. Title 14 px bold `#181818` "Plan Year Enrollment Members (2)". States: **(0) header only** with New / Change Owner + New (CL2, E2); **collapsed with ▼ menu** (C1 right column); **with items** list (Notes (1) C6: title link, meta "date by user", body) or table (E1, PY1, CL5) + "View All" footer; **loading** stencil (C2, A2 Card Transactions). Header actions: gear ▾ + refresh + buttons. |
| **Record detail fields** — read | Form Element (readonly): `slds-form-element`, `slds-form-element_readonly`, `slds-form-element_horizontal`, `slds-form-element__label`, `slds-form-element__control`, `slds-form-element__static` | `RecordsLwcRecordLayout`, `RecordsRecordLayoutSection`, `RecordsRecordLayoutRow`, `RecordsRecordLayoutItem`, `Record_flexipageRecordField` | C*, CL2/4, T1, PY2/3, PI1, E1–2, A2/4/9 | 2-column grid (488 px columns), label 12 px `#444` (wraps to 2 lines), value 14 px `#181818`, underline `#c9c9c9`. Value types: text, multi-line, date, currency, masked ("*******5510"), **link** (olive), address link + static map placeholder (C1), URL link, **lookup with user avatar** (16 px avatar + link + ", date"), owner lookup with **change-owner** icon button. |
| **Inline-edit pencil** | Form Element edit: `slds-form-element_edit` + `slds-button_icon-bare`/`slds-button_icon` with `slds-button__icon_hint` (pencil) | pencil per field | same as above | Grey pencil at the far right of each editable field; absent on formula/system fields. |
| **Read-only checkbox** | Static checkbox inside `slds-form-element__static`: checked = utility `check` icon; unchecked = `slds-checkbox_faux` disabled (see Gaps G7) | `Is Escalated`, `Is Active` | CL2/4, PI1, A2/4/9 | **Checked:** ✓ icon (16 px). **Unchecked:** dotted/dashed 14 px square (rendered as image in capture). |
| **Help text icon** | Help Text: `slds-form-element__icon` + `slds-button slds-button_icon` (info icon) + Popover tooltip `slds-popover slds-popover_tooltip slds-nubbin_bottom-left` (`slds-help-text` is *markup-only*) | `LightningHelptext` | C1 (SSN), CL3 (Escalation Indicator), A2/4/9 (many) | Filled grey info "i" 14 px after label; tooltip open state not captured. |
| **Expandable record sections** | Expandable Section: `slds-section`, `slds-is-open`, `slds-section__title`, `slds-section__title-action`, `slds-section__title-action-icon`, `slds-section__content` | `RecordsRecordLayoutSection`, `Button - Address & Contact Information`, `Button - System Information`… | C*, CL2–8, T1, PY2/3, A2/4/5/6/9, P6/P7 (non-collapsible variant) | Title bar bg `#f3f3f3`, radius 4, 14–16 px regular `#181818`, chevron ▼ (open). Collapsed state not captured (T1 sections appear open-but-empty). P6/P7 use a **non-collapsible** shaded title (`slds-section__title slds-theme_shade`). |
| **Tabs** | Tabs (default): `slds-tabs_default`, `slds-tabs_default__nav`, `slds-tabs_default__item`, `slds-tabs_default__link`, `slds-tabs_default__content`, `slds-is-active`; medium size `slds-tabs_medium` for record tabs; overflow `slds-tabs_default__overflow-button` | `LightningTabset`, `FlexipageTabset2`, `FlexipageTab2`, `Tab List - Tabs` | C* (Payments/Repayments/Recovery), CL2–8 (Details / Audit & System), T1, PY*, PI1, E*, A2/4/9 (Details/Related/Report/ZoomInfo), P1–P7 (custom LWC) | Active: bold `#181818`, 3 px underline `#8b9a4c`; inactive `#444`; list border bottom `#747474` (sidebar) / `#c9c9c9`. Sizes: 13 px (cards), 16 px (record tabs/sidebar). Hidden "More" overflow in DOM (A9 sidebar). |
| **Metric tiles** (Intelligence View) | No SLDS 1 blueprint (Gaps G2); compose from `slds-grid` + `slds-box`?/`slds-card` + `slds-text-title` + `slds-text-heading_large` + button semantics (`aria-pressed`) | `LightningButton` (tiles are buttons), `LightningFormattedText` | D1 | 4 tiles: label 13 px + value 28 px light ("0"). **Selected** tile: bordered box (`#848484`-ish 2 px, radius 4). Others: no border. |
| **Empty state with illustration** | Illustration: `slds-illustration`, `slds-illustration_small`/`_large`, `slds-illustration__svg`, `slds-text-heading_medium`, `slds-text-body_regular` | `Cloud1`, `PlantDarkBlue…`, `MountainLine…` (desert illustration vectors) | D1 | "Get your accounts engaged" (18 px) + body text; illustration = SLDS "desert" (No Data) drawing in light blues; container bg `#f3f3f3`. Text-only empty states also seen ("No payments found for this contact.", "No records found matching your search criteria." italic, "30 record(s) found." italic small). |
| **Avatar** | Avatar: `slds-avatar`, `slds-avatar_x-small`/`_small`/`_circle`, `slds-avatar__initials` | `ForceRecordAvatar`, avatar image | global header, CL2, PY2, PI1, E1, T1, A6 | 16 px square user avatar next to lookup links (bear "ArmadaCare" photo); 32 px circular profile avatar in global header (one with photo, one blue `#1b96ff` fallback on A8). |
| **Badge** | Badge: `slds-badge`, `slds-badge_inverse` | `current` | A8 | Dark inverse pill "current". |
| **Icons** (object / utility) | Icon: `slds-icon_container`, `slds-icon`, `slds-icon_small`/`_x-small`, `slds-icon-standard-*`, `slds-icon-custom-customN`, `slds-icon-text-default`, `slds-current-color` | `LightningIcon`, `LightningPrimitiveIcon`, `RecordsHighlightsIcon` | all | Object icon backgrounds seen: account `#5867e8` (`standard-account`), contact purple, claim `#e769b4` (`custom-70`), plan year `#d8be5f` (`custom-66`), PYE/portal salmon (to map in Phase 1), card transaction orange, user `#34becd` (`standard-user`), duplicates `#ff5d2d`. Utility icons: see Phase 1 icon list (chevrondown, close, pin, settings, refresh, edit, search, filter, chart, table, info, check, add, favorite, help, notification, setup, apps (waffle), hierarchy, change_owner/user, upload, error, date_input, lock, minimize/expand…). |

### 1.4 Forms and inputs

| UI element | SLDS blueprint | Figma layer hints | Screens | Variants / states seen |
|---|---|---|---|---|
| **Text input** | Input: `slds-form-element`, `slds-form-element__label`, `slds-form-element__control`, `slds-input`, `slds-required` (`abbr`), `slds-has-error`, `slds-form-element__help` | `LightningInput`, `LightningPrimitiveInputSimple`, `Text Input` | P*, A3, A6, C4, CL7 | Default (border `#747474`, radius 4, 32 px), with value, placeholder (`#747474`), **required** (`*` `#ba0517`), **error** ("Complete this field." `#ba0517`, red border + inset 1 px + **blue focus ring** `0 0 0 2px #0b5cab`), focus (A3: dark ring), **with right search icon** (`slds-input-has-icon_right`), with left search icon (list search). Horizontal label layout on A5/A6 (`slds-form-element_horizontal`). |
| **Textarea** | Textarea: `slds-textarea` | `LightningTextarea`, `RecordsRecordLayoutTextArea` | A5/A6 (Description), C4 (Comments) | Default (bottom of form, partially visible). |
| **Checkbox** | Checkbox: `slds-checkbox`, `slds-checkbox__label`, `slds-checkbox_faux`, `slds-form-element__legend` for groups; standalone `slds-checkbox_standalone` | checkbox frames | P2/P3/P6/P7, C3, C4, A5/A6, tables, split view | Unchecked (white, border `#747474`, radius 2, 16 px), **checked** (✓ `#57612d`), **indeterminate** (header), inline **group** with legend ("Claim Status:", "Participant Status:"). |
| **Toggle** | Checkbox Toggle: `slds-checkbox_toggle`, `slds-checkbox_faux_container`, `slds-checkbox_faux`, `slds-checkbox_on`/`_off` | `LightningPrimitiveInputToggle` | CL3/CL5–8 | Off state ("No" caption under), label "PLACE ON HOLD" caps. |
| **Radio group** | Radio Group: `slds-radio`, `slds-radio__label`, `slds-radio_faux`, `slds-form-element__label` | `RegistrationStep` (record type) | A7 | 11 options, selected "Group"; each with helper description line (13 px `#444`). |
| **Combobox / picklist** | Combobox (base, read-only picklist): `slds-combobox_container`, `slds-combobox`, `slds-dropdown-trigger`, `slds-dropdown-trigger_click`, `slds-combobox__form-element`, `slds-input-has-icon_right`, `slds-input__icon`, `slds-dropdown`, `slds-listbox_vertical`, `slds-listbox__option` | `LightningCombobox`, `LightningBaseCombobox`, `LightningPicklist`, `RecordsRecordPicklist`, `Button - <Field>` | P*, C1 (filters), C4, A3, A5, A6 | Closed only: "--None--", value ("Prospect", "Inactive", "Read Only", "Private"), **required** (A3), with "View all dependencies" link below (A6), chevron ▼. Two chevron styles: modal/Log-an-Activity = small **blue** filled triangle (SLDS default `#0176d3`?) vs record form = grey ▼. Open listbox not captured. |
| **Lookup** (combobox with object switcher / selected pill) | Lookup: `slds-combobox-group`, `slds-combobox_object-switcher`, `slds-combobox-addon_start`/`_end`, `slds-combobox_container`, `slds-has-selection`, `slds-listbox_inline`/`slds-listbox_selection-group`, Pill `slds-pill`, `slds-pill__label`, `slds-pill__remove`, `slds-input-has-icon_right` | `ForceLookup`, `RecordsRecordLayoutLookup`, `LightningGroupedCombobox`, `Button - Select New Owner—Current Selection`, `Button - Search—Current Selection: User, Pick an object` | C3, C4, A3, A6 | **Object switcher** (user icon `#34becd` + ▼) + "Search Users…" + search icon (C3, A3 — A3 **focused**); **selected** pill-in-input "Mansoor Ahmad ✕" with user icon (C4); plain lookup "Search Accounts…" + search icon (A6). |
| **Date picker** | Datepicker: input `slds-input` + `slds-input-has-icon_right` + calendar `slds-button_icon`; popup `slds-datepicker`, `slds-datepicker__filter`, `slds-datepicker__month`, `slds-day`, `slds-is-today`, `slds-is-selected` | `LightningDatepicker`, `LightningTimepicker` | P6, P7, C4, A5, A6 | Closed only: empty and with value ("10/21/2026"), calendar icon right. Calendar popup not captured. Date-time pairs (Timepicker) present in A5 DOM. |
| **Dual listbox** | Dueling Picklist: `slds-dueling-list`, `slds-dueling-list__column`, `slds-dueling-list__options`, `slds-listbox_vertical`, `slds-listbox__option`, move buttons `slds-button_icon-container` | `Available`, `Chosen`, `Participant Summary` | A5 (3 instances in DOM) | Group label "Participant Summary", columns "Available" / "Chosen", options (Admin, Participant, Do Not Mail…), ▶ ◀ move buttons (◀ disabled grey). Selected option state not captured. |
| **Native multi-select** (custom LWC) | Not SLDS — map to Dueling list or Listbox multi-select (Gaps G8) | "Reason codes (select one or more)" | CL7 | 3 options, none selected. |
| **Record edit form** | Form layout: `slds-form-element_horizontal` (A5/A6) / stacked (modals), sections `slds-section`, required legend "* = Required Information" (`slds-required`) | `RecordsBaseRecordForm`, `RecordsModalLwcDetailPanelWrapper`, `ForcegeneratedDetailpanel_…` | A5, A6, C4, A3 | Two columns, label column ~100 px, field ~208 px. Read-only fields inside edit form (Record Type "Group", Owner with avatar). |
| **Docked form footer** | Docked Form Footer: `slds-docked-form-footer` + `slds-button_neutral` + `slds-button_brand` | `RecordsFormFooter` | A5, A6, (CL2 hidden, PY2, PI1, E1 in DOM) | Bg `#f3f3f3`, top border 2 px `#c9c9c9`: [error icon button] Cancel, Save & New, **Save** (brand). Error icon (red ⊘ 24 px) appears left of Cancel when errors exist (A5). |
| **Error popover "We hit a snag."** | Popover error: `slds-popover`, `slds-popover_error`, `slds-nubbin_bottom`, `slds-popover__header`, `slds-popover__body`, `slds-popover__close`? + Icon error | `Dialog - We hit a snag.`, `RecordsRecordEditErrorHeader`, `RecordsRecordEditError` | A5 | 320 px, header bg `#8e030f` with ⊘ icon + "We hit a snag." 20 px white, close ✕; body: "Review the following fields" bold + bullet list of field links (olive); nubbin bottom pointing at footer error icon. |
| **File upload / drop zone** | File Selector: `slds-file-selector`, `slds-file-selector_files`, `slds-file-selector__dropzone`, `slds-file-selector__body`, `slds-file-selector__button`, `slds-file-selector__text`, `slds-file-selector__input` | `LightningPrimitiveFileDroppableZone` | CL3 | Dashed drop zone, neutral "Upload Files" button with upload icon, "Or drop files". |
| **Filter controls** (Intelligence View) | Combobox (button style), Lookup (owner), Button icons (`slds-button_icon-border-filled`) — no single blueprint (Gaps G3) | `Button - Time Period Filter`, `Button - Account owner filter`, `LightningButton` | D1 | "Activity [All Time ⌄]" , "Owner [Me 🔍]", bookmark + filter icon buttons (grouped). |
| **Search criteria panel** (custom LWC) | Card + shaded section title (`slds-section__title slds-theme_shade`) — see Gaps G1 | `LightningTabset` + custom | P1–P7 | Dark header bar `#5a5a5a` "Search Criteria" + "Advanced Search"/"Show Less" underlined white link; Arial; separate button styling (Search `#93a445`, Clear white/`#9e9e9e` border, radius 3). |
| **Pagination** | No SLDS 1 blueprint (Gaps G6) | `Records per page`, `Previous`, `Next` | P5 | "Records per page [10 ▼]" select; Previous (disabled), "Page 1 of 2", Next (neutral). |

### 1.5 Overlays and feedback

| UI element | SLDS blueprint | Figma layer hints | Screens | Variants / states seen |
|---|---|---|---|---|
| **Modal** (delete confirm, prompt) | Modal: `slds-modal`, `slds-fade-in-open`, `slds-modal_small`/`_medium`, `slds-modal__container`, `slds-modal__header`, `slds-modal__title`, `slds-modal__close`, `slds-modal__content`, `slds-modal__footer`, `slds-backdrop`, `slds-backdrop_open`; prompt variant `slds-modal_prompt` | `Dialog - Share`, modal containers | CL5 (Delete Claim), A2 (Delete Account), CL6 (Repayment Recovery), C3, C4, A3, CL7 | Header centred title 20 px; close ✕ **outside** the panel (top-right, white square, SLDS 1 style); body 13 px; footer bg `#f3f3f3` + top border 2 px `#c9c9c9`: Cancel (neutral) + brand action (Delete / Submit / Save / Close). Delete button seen **focused** (blue `#0176d3` border). Sizes: small (CL5/A2/C3/A3), medium (C4, CL7). Scrolling body (C4). Headless/custom header (CL7). |
| **Dropdown menu** | Dropdown: `slds-dropdown`, `slds-dropdown_right`, `slds-dropdown_actions`, `slds-dropdown__item`, `slds-dropdown__header`, `slds-has-divider_top-space` (`slds-dropdown__list` is *markup-only*) | `Menu`, `Menu Item` | A9, C7 | Width 185 px, max-height 400 px (scroll), shadow `0 2px 3px rgba(0,0,0,.16)`, border `#747474` (= SLDS default via `--slds-g-color-border-base-4`); items 34 px, 12 px text `#57612d`; hover bg `#f3f3f3` text `#181818`. |
| **Tooltip / popover** | Popover tooltip `slds-popover_tooltip` + nubbins | help icons | (not captured open) | — |
| **Spinner / loading** | Spinner `slds-spinner_container`, `slds-spinner`, `slds-spinner_brand`, `slds-spinner_medium` | — | not seen (grey stencils instead) | Loading placeholders shown as grey gradient blocks (C1, C2, A2) — see Gaps G5. |
| **Inline error text** | `slds-text-color_error` | Account Activity card | C1–C7 | Red 12 px message inside a card. |
| **Alert / scoped error** | Scoped notification / Alert: `slds-notify_alert slds-alert_error` or `slds-scoped-notification` | CL7 header | CL7 | Pink background `#ffeaea`-ish, red text — custom LWC. |

### 1.6 Navigation and sidebar

| UI element | SLDS blueprint | Figma layer hints | Screens | Variants / states seen |
|---|---|---|---|---|
| **Vertical navigation** (Reports) | Vertical Navigation: `slds-nav-vertical`, `slds-nav-vertical_shade`?, `slds-nav-vertical__section`, `slds-nav-vertical__title`, `slds-nav-vertical__item`, `slds-nav-vertical__action`, `slds-is-active` | `Reports` (sections), `Tab List`, `Tab` | R1, R3, R4, R7, R9 | 3 sections with caps titles (12 px, `#444`, letter-spacing 1 px): REPORTS (Recent, Created by Me, Private Reports, Public Reports, All Reports), FOLDERS (All Folders, Created by Me, Shared with Me), FAVORITES (All Favorites). Items 13 px `#181818`, padding 8/24/32. **Active** item: light tinted background (≈ `#f3f4ed`), no visible brand bar in capture. |
| **Breadcrumb** | Breadcrumbs: `slds-breadcrumb`, `slds-list_horizontal`, `slds-wrap`, `slds-breadcrumb__item` | `Navigation - Breadcrumbs` | R1–R9, A8 | "Account > Blalock Development Co" (olive links), "Reports" label, inline in title on R3. |
| **Sidebar card: Next Best Action** | Einstein Header card: `slds-card` + `slds-einstein-header`, `slds-einstein-header__figure` + body text (`slds-einstein-header__container` is *markup-only*) | Einstein text, header image | A2, A4, A9 | Blue sky header with Einstein figure, title "Next Best Action" bold; body "Einstein doesn't have any recommendations for you right now." centred. |
| **Sidebar card: Duplicates** | Tabs (one tab "Duplicates", 16 px bold) + `slds-card` with `slds-media` + Icon (`standard`, `#ff5d2d`) | `LightningTabset` (sidebar) | A2, A4, A9 | Tab underline `#8b9a4c`; card text "We found no potential duplicates of this Account." 14 px. |
| **Sidebar card: Activity** | Tabs ("Activity") + related list card (Card Transactions (0) with ▼) | `LightningTabset` | A2, A4, A9 | Tab only (A2/A4); with a collapsed related-list card (A9). |
| **Custom links section** | `slds-grid` of `slds-text-link` | `Custom Links` | A2, A4 | 3 links in a row (Google Search, Google News, Hoovers Profile). |

### 1.7 Things found that were not on your list

- **Workspace sub-tabs** (A8), **docked note composer + rich-text editor** (C5), **file drop zone** (CL3), **toggle** (CL3), **radio group with descriptions** (A7), **pagination** (P5), **Follow stateful button** (A2/A9), **user avatars inside lookups** and **change-owner icon button** (CL2, PI1, E1), **tree grid "current" inverse badge** (A8), **static map placeholder** in address field (C1), **sandbox environment chip** in the global header (all), **list-view "items selected" + indeterminate checkbox** (A2/A5/A8), **overflow action menu with 20+ items** (A9), **custom coloured-left-border summary cards** (CL3 — Gaps G9).

---

## 2. Visual tokens extracted from Figma

Exact values from `get_design_context` unless marked *(px sample)* = pixel sampled from the screenshot (anti-aliasing possible).

| Token | Figma value | Where measured | Maps to (override) or SLDS default |
|---|---|---|---|
| **Brand — accessible/dark** | **`#57612d`** | Save / Delete / Submit / Next button fill + border (2:54013, 2:24244); neutral button text (2:54008, 2:41078); links (2:39983, 2:51328); menu item text (2:55796) | `--slds-c-button-brand-color-background`, `--slds-c-button-brand-color-border`, `--slds-c-button-text-color`, `--slds-c-checkbox-mark-color-foreground`, `--slds-c-dropdown-item-color`, `--slds-g-link-color`; hard-coded rules for `a`, `.slds-text-link`, `.slds-button_icon-brand` (see Q1) |
| **Brand — base** | **`#8b9a4c`** | Workspace-tab / nav-item active top bar 3 px (2:54383, 2:42279); tab active underline 3 px (2:57936) | `--slds-c-tabs-item-color-border-active`; hard-coded `.slds-context-bar__item.slds-is-active:before` (Q1) |
| **Brand — tint (active tab bg)** | **`rgba(139,154,76,0.1)`** | Active workspace tab & object nav item bg (2:54374, 2:42278) | hard-coded SLDS active context-bar item / sub-tab bg `rgba(21,137,238,0.1)` (Q1) |
| Brand hover / active | not captured | — | Proposal: derive (darken `#57612d` ~15 %) — needs your OK (Q4) |
| Checkbox check mark | `#57612d` | split view ✓ (2:43776) | `--slds-c-checkbox-mark-color-foreground` |
| Link colour | `#57612d` (regular, no underline; underline in Quick Links & "Show Less") | many | `--slds-g-link-color` + `a` rule (Q1). **Exception:** A8 tree-grid link renders SLDS default **blue** `#0b5cab`-ish *(px sample `#85aed5` edge)* — legacy page; treat as capture inconsistency, use brand. |
| Focus ring | `0 0 0 2px #0b5cab` (input error+focus 2:51381), Delete button focused border `#0176d3` | | **SLDS default — do not override** |
| Error | `#ba0517` (required `*`, error text, error border) | 2:51375, 2:51382 | SLDS default (`--slds-g-color-error-base-40`) |
| Error popover header | `#8e030f` | 2:51313 | SLDS default — `.slds-popover_error .slds-popover__header` reads `--slds-g-color-error-base-30`, which `:root` sets to `#8e030f` |
| Text — primary | `#181818` | everywhere | SLDS default `--slds-g-color-neutral-base-10` |
| Text — secondary / labels | `#444444` | field labels, table header, meta | SLDS default (`--slds-g-color-neutral-base-30`) |
| Text — placeholder | `#747474` (inputs), `#757575` (global search) | 2:41113, 2:42203 | SLDS default |
| Border — default | `#c9c9c9` | cards, rows, sections, context bar bottom (3 px), footer top (2 px) | SLDS default `--slds-g-color-border-base-1` |
| Border — controls | `#747474` | neutral buttons, inputs, checkboxes, icon buttons, tab list (sidebar) | SLDS default |
| Border — table column divider | `#aeaeae` | 2:39935 | SLDS default |
| Global header icon grey | `#919191` | favourites border, global-actions "+" fill (2:42206, 2:42222) | SLDS default-ish (SLDS uses `#747474`/`#818181` hover) — keep SLDS default |
| Sandbox chip bg | `#e0e5f8` | 2:42176 | Not part of SLDS; component-level token in theme file (Gaps G10) |
| **Page background** | **`#ffffff`** *(px sample, multiple screens)* | behind record/list pages | hard-coded `html { background: rgb(238,244,255) }` → override (Q1) |
| Surface — shaded | `#f3f3f3` | page/list/card headers, split view, footers, empty-state area, table header | SLDS default `--slds-g-color-neutral-base-95` |
| Surface — card | `#ffffff` | cards, modals | SLDS default |
| Vertical nav active bg | ≈ `#f3f4ed` *(px sample)* | R1 | needs confirmation (Q5) |
| Object icon colours | account `#5867e8`, claim `#e769b4` (custom-70), plan year `#d8be5f` (custom-66), user `#34becd`, duplicates `#ff5d2d` | | SLDS defaults via `slds-icon-standard-*` / `slds-icon-custom-*` |
| **Font family** | **Segoe UI** (Regular / Bold) in all SLDS parts; Arial in the Participant search LWC; SF Pro Bold for notification badge | all | SLDS default system stack (`system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, …`) — the capture was taken on Windows. **SLDS default.** |
| Font sizes | 12 (labels, meta, menu items), **13 (body/base)**, 14 (field values, card titles), 16 (record tabs, sidebar tab), 18 (record/list title bold), 20 (modal title, list picker "All", Reports title), 28 (metric value) | | SLDS defaults (`body` = 0.8125 rem = 13 px; `slds-text-heading_*`) |
| Font weights | 400 regular, 700 bold | | SLDS default |
| Line heights | 1.5 base; 17.5 px card titles; 30 px button text | | SLDS default |
| Radius | 4 px buttons/inputs/cards/icons; 2 px checkbox; 3 px custom LWC buttons; 240 px round button | | SLDS default |
| Button height | 32 px; icon buttons 32/24/20 px | | SLDS default |
| Shadows | dropdown/card `0 2px 3px rgba(0,0,0,.16)`; highlights `0 2px 1px rgba(0,0,0,.1)` | | SLDS defaults |

---

## 3. Gaps — things in Figma with no SLDS 1 blueprint

| # | Element (screens) | Why it's a gap | Proposal (SLDS pieces only) |
|---|---|---|---|
| G1 | **Search Criteria panel** (P1–P7) — dark grey header bar, Arial, lighter olive buttons | Custom LWC/Visualforce; not SLDS-styled | Build as `Card` + non-collapsible `ExpandableSection` title (`slds-section__title slds-theme_shade`) + standard Inputs/Comboboxes/Checkbox groups + Brand/Neutral buttons. **Do not** reproduce the dark bar, Arial or `#93a445` (Q3). |
| G2 | **Metric tiles** (D1) | No SLDS 1 metric/KPI blueprint | `MetricTile` = `button` with `aria-pressed`, `slds-box`?/`slds-card_boundary` look via `slds-card` + `slds-text-title` (label) + `slds-text-heading_large` (value); selected = `slds-card_boundary`-style border. Verify classes in Phase 3. |
| G3 | **Filter bar** (D1) "Activity / Owner / bookmark / filter" | Lightning-specific (Intelligence View) | `FilterBar` composing `Combobox` (button-style), `Lookup` (compact), `ButtonGroup` of `ButtonIcon` (`slds-button_icon-border-filled`). |
| G4 | **Related List Quick Links** (C*, A*) | Platform component; SLDS 1 has no CSS blueprint | `RelatedListQuickLinks` = `slds-card` + `slds-grid slds-wrap` + `Icon` (x-small) + `slds-text-link` items + "Show All" `slds-button_reset`/link. |
| G5 | **Loading placeholders** (C1, C2, A2 grey gradient blocks) | `slds-stencil` not in 2.264.3 CSS | Use `Spinner` (`slds-spinner_container` + `slds-spinner_brand`?) inside the card body; or omit. |
| G6 | **Pagination** (P5) | No `slds-pagination` in CSS | `ButtonGroup` (Previous / Next neutral, disabled state) + `slds-text-body_small` "Page 1 of 2" + `Select`/`Combobox` "Records per page". |
| G7 | **Read-only checkbox display** (CL2, PI1, A*) | SLDS 1 shows checked as a disabled faux checkbox; Lightning record view uses ✓ icon / empty | `RecordField` type `checkbox`: checked = utility `check` icon (x-small) with assistive text "True"; unchecked = disabled `slds-checkbox_faux` (or `check` hidden + assistive "False"). Figma's dashed square is a capture rendering — confirm (Q6). |
| G8 | **Native multi-select "Reason codes"** (CL7) | Native `<select multiple>` | Map to `DualListbox` or a `Listbox` multi-select (`slds-listbox_vertical`, `aria-multiselectable`). |
| G9 | **Coloured-left-border summary cards** "Claim Details / Benefit Snapshot / Claims" with caps label grid (CL3, CL5–8) | Custom LWC styling | `Card` + `DescriptionList`-style `slds-form-element_readonly` stacked fields with `slds-text-title_caps` labels. Left accent border is not SLDS → drop, or expose a single `accent` prop that maps to `slds-theme_*`? (Q7) |
| G10 | **Sandbox environment chip** in global header (all) | Not in SLDS global header blueprint | `GlobalHeader` prop `environmentLabel`; render with `slds-badge` + `slds-icon` (setup icon); `#e0e5f8` would need a theme token (Q8). |
| G11 | **Static map placeholder** under address (C1) | Lightning Map component, not captured (grey) | `RecordField` type `address` = link only; no map (out of scope). |
| G12 | **Report viewer iframe** (R2, R5, R6, R8) | Not captured (grey) | Out of scope — `EmptyState`/placeholder region only. |
| G13 | **Einstein header** image (A2/A4/A9) | `einstein-header-background.svg` and `einstein-figure.svg` are package files referenced by CSS `url()` | Inline the two SVGs (CC BY-ND, unmodified) in the `EinsteinHeader`/`Card` component instead of relying on CSS `url()` (see compat report). |
| G14 | **Desert empty-state illustration** (D1) | SLDS illustrations are markup snippets on the website; the package ships only `empty-state-{assistant,events,tasks}.svg` | Use the vector from Figma (it is Salesforce's illustration, CC BY-ND) inline in `EmptyState`, or substitute a packaged SVG (Q9). |

---

## 4. Capture artifacts — do NOT reproduce

| Artifact | Where | Handling |
|---|---|---|
| **Empty table header rows** (labels lost; header row is a blank `#f3f3f3` band) | A1, E1, CL5, PY1, R1/R3/R4/R7/R9, P4, P5, P7 | Data tables always render column labels (layer names keep them: `Header Cell - Account Name` …). |
| **Blank grey band under the global header** (≈ 35 px, `#f0f0f0`) | P1–P7, A2–A9, C* | Not rendered; context bar sits directly under the global header (as on D1, R*, PY*). |
| **Text rendered too small / overlapping** | A9 (whole frame at 5858 px), T1 "Created By" (date over name), A8 truncated cells "(8", "C", C7 overflow menu partially drawn | Use SLDS sizes. |
| **Dev "Live Preview" banner** | **Not found** — no layer named *Live Preview*/*Preview* and no banner visible in any of the 48 screenshots | Nothing to remove; please point me to it if it exists in another file/version. |
| Lost icon glyphs (rich-text toolbar C5, some quick-link icons) | C5, C1 | Use SLDS icons. |
| Grey placeholders for iframes (reports, static map) | R2/R5/R6/R8, C1 | See G11/G12. |
| Labels missing on some Log-an-Activity comboboxes | C4 | Labels required (a11y). |
| Sections shown open-but-empty | T1 | Render collapsed/expanded correctly. |
| Account Hierarchy link in SLDS blue | A8 | Use brand link colour. |
