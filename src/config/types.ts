import type { ObjectIconName, UtilityIconName } from "../app/components/icons/Icon";

/*
 * Config + data model shared by every object. Templates read these shapes; objects provide them
 * (src/objects/<object>/config.ts · mock-data.ts · types.ts). Adding an object = a new folder + one registry line.
 */

// ── Field values ────────────────────────────────────────────────────────────────────────────────

/** Reference to another record (owner, parent account, account manager …). */
export type LookupValue = { id: string; name: string; objectApiName: string };
/** HYPERLINK formula / URL with its own label. */
export type LinkValue = { label: string; url: string };
export type AddressValue = { street?: string; city?: string; state?: string; postalCode?: string; country?: string };
export type LocationValue = { latitude?: string; longitude?: string };
/** Created By / Last Modified By: user + ISO date-time ("2026-07-17T03:35"). */
export type AuditValue = { by: LookupValue; at: string };

/**
 * Stored value of one field. Dates are ISO ("2026-01-01"), date-times ISO local ("2026-07-17T03:35"),
 * numbers / currency are numbers, multi-select picklists are string arrays. The field's `type` says which.
 */
export type FieldValue = string | number | boolean | string[] | LookupValue | LinkValue | AddressValue | LocationValue | AuditValue | null;

export type RecordData = {
  id: string;
  /** Record type label, e.g. "Group" — selects the layout and form. */
  recordType?: string;
  values: Record<string, FieldValue>;
  /** Related-list record counts for quick links (number, or "10+"). */
  related?: Record<string, number | string>;
};

// ── Fields ──────────────────────────────────────────────────────────────────────────────────────

export type FieldType =
  | "text"
  | "textarea"
  | "phone"
  | "url"
  | "email"
  | "number"
  | "currency"
  | "percent"
  | "date"
  | "datetime"
  | "checkbox"
  | "picklist"
  | "multipicklist"
  | "lookup"
  | "address"
  | "location"
  | "hyperlink"
  | "audit"
  | "image";

/** Field-level action icon shown instead of the inline-edit pencil. */
export type FieldActionKind = "changeOwner" | "changeRecordType";

export type FieldDef = {
  label: string;
  type: FieldType;
  /** ⓘ next to the label. Salesforce help texts were not captured, so the text is a short description. */
  helpText?: string;
  /** No inline-edit pencil and not editable in forms (formula, system or action-only fields). */
  readOnly?: boolean;
  required?: boolean;
  /** Picklist / multi-select values. */
  options?: string[];
  /** Decimal places for number / currency / percent (default: 0 for number, 2 for currency). */
  scale?: number;
  lookup?: { objectApiName: string; placeholder: string };
  action?: FieldActionKind;
  /** Controlling picklist: forms show a "View all dependencies" link under it. */
  dependencies?: boolean;
  /** Address sub-field label prefix, e.g. "Corporate" → "Corporate Street", "Corporate City" … */
  addressPrefix?: string;
  /** Help line under the input in forms (Figma C4: "Tip: Type Control + period to insert quick text."). */
  inlineHelp?: string;
  /** Checkbox with its label beside the box (Figma C3 "Send notification email") instead of a form label. */
  inlineLabel?: boolean;
  /** Dates as "Mar 20, 2026" (claim cards); "comma" date-times as "10/16/2026, 12:29 PM" (Reports tables). */
  dateStyle?: "medium" | "comma";
  /** Checkbox shown as a read-only toggle with Yes / No (Figma CL3 "Place on Hold"). */
  display?: "toggle";
};

export type FieldMap = Record<string, FieldDef>;

// ── Record layouts ─────────────────────────────────────────────────────────────────────────────

/** One row of a two-column section: [left, right] field keys (null = empty cell), or one full-width field. */
export type SectionRow = [string | null, string | null] | { full: string };

export type SectionConfig = {
  id: string;
  /** Omit for an untitled section (no header, not collapsible). */
  title?: string;
  rows?: SectionRow[];
  /** Embedded page (iframe / Visualforce) rendered as a shaded placeholder region above the rows. */
  embed?: { label: string };
  /** Custom links, three per row. */
  links?: LinkValue[];
};

/** Related list: count and records come from `objectApiName` records whose `parentField` is this record, else `RecordData.related`. */
export type RelatedListConfig = {
  id: string;
  label: string;
  iconName: ObjectIconName;
  objectApiName?: string;
  parentField?: string;
  /** ▼ menu (default true). */
  menu?: boolean;
  /** Menu "New" opens this action (e.g. the note composer). */
  newAction?: string;
  /** Header buttons, e.g. Change Owner · New. */
  buttons?: Array<{ value: string; label: string }>;
  /** Body: "tiles" (Notes), "table" (columns) or "files" (upload area when empty, file tiles); omit for a header-only card. */
  display?: "tiles" | "table" | "files";
  /** Tiles: title field + detail lines ({field} placeholders, formatted by type). */
  tileTitle?: string;
  tileLines?: string[];
  columns?: ListColumnConfig[];
  /** Body shown while loading in the captured state (?state=error). */
  backend?: BackendState;
  /** Child records point at this field's lookup instead of the record itself (accumulators → the claim's subscriber). */
  parentValueField?: string;
  /** Lightning list-view meta line under the title ("1 item • Sorted by … • Updated …"), sorted by this field. */
  sort?: { field: string; direction: "ascending" | "descending" };
  /** List view controls (gear ▾) and refresh in the header. */
  settings?: boolean;
  /** Table body: row ▼ menus (default true) and selection checkboxes (default false). */
  rowActions?: boolean;
  selectable?: boolean;
  /** "N items • Updated …" meta line without a sort (Plan Year Enrollment Members). */
  meta?: boolean;
  /** Rows shown; the count reads "6+" when the list is at least this long (Plan Year History). */
  pageSize?: number;
};

/** How a region looks in the captured back-end state (`?state=error`, Figma). Default: working / empty. */
export type BackendState = { error?: string; loading?: boolean; /** Error text colour (Figma CL3 Benefit Snapshot: default text). */ errorTone?: "error" | "default" };

export type FilterControlConfig = { kind: "picklist"; label: string; value: string; options: string[]; size: "1-of-3" | "1-of-4" } | { kind: "search"; placeholder: string };

export type CardBodyConfig =
  | { kind: "message"; text: string; align?: "left" | "center" }
  | { kind: "tabs"; tabs: Array<{ id: string; label: string; body: CardBodyConfig }> }
  | { kind: "filters"; filters: FilterControlConfig[][]; message: string }
  /** Fields of the record in a caps-label grid (Claim Details). */
  | { kind: "fields"; fields: Array<string | CardFieldConfig>; columns: 2 | 3 }
  /** Child records in a plain table (Accumulator Balances). */
  | { kind: "table"; objectApiName: string; parentField: string; parentValueField?: string; columns: ListColumnConfig[] }
  | { kind: "empty" };

/** A field in a card grid with its own label / date style (the same value can read differently on two cards). */
export type CardFieldConfig = { field: string; label?: string; dateStyle?: "medium" };

/** One block of a record page column (Contact main column, tab content). */
export type RegionConfig =
  /** Field section; `card` wraps it in its own card (Contact). `blankHeight` keeps the empty body height Figma shows. */
  | { kind: "section"; section: SectionConfig; card?: boolean; blankHeight?: "small" | "medium" | "large" }
  | {
      kind: "card";
      id: string;
      title: string;
      iconName?: ObjectIconName;
      /** Line under the title chosen by a field value (Account Balance Summary by Relationship). */
      subtitle?: { field: string; values: Record<string, string> };
      body: CardBodyConfig;
      backend?: BackendState;
      /** Card border inside a tabset (Figma Claim Details). */
      bordered?: boolean;
    }
  | { kind: "relatedList"; list: RelatedListConfig };

export type RecordTabConfig = { id: string; label: string; sections?: SectionConfig[]; regions?: RegionConfig[] };

export type QuickLinkConfig = { id: string; label: string; iconName: ObjectIconName; objectApiName?: string; parentField?: string };

export type SidebarTabContent =
  | { kind: "message"; iconName: ObjectIconName; text: string }
  | { kind: "relatedLists"; lists: RelatedListConfig[] }
  | { kind: "empty" };

export type SidebarRegionConfig =
  | { kind: "einstein"; title: string; message: string }
  | { kind: "relatedList"; list: RelatedListConfig }
  | { kind: "tabs"; id: string; tabs: Array<{ id: string; label: string; content: SidebarTabContent }> };

export type HighlightsConfig = {
  /** Key fields in the highlights panel. */
  fields: string[];
  /** Visible action buttons (ActionConfig ids). */
  actions: string[];
  /** Overflow ▼ menu (ActionConfig ids). */
  overflow: string[];
  /** Scroll the overflow menu after 5, 7 or 10 items (Figma A9: 10). */
  overflowLength?: 5 | 7 | 10;
  follow?: boolean;
  /** View hierarchy icon button. */
  hierarchy?: boolean;
};

export type RecordLayoutConfig = {
  highlights: HighlightsConfig;
  quickLinks?: { links: QuickLinkConfig[]; totalCount?: number };
  /** Tabset (Details · Related …). Omit for pages without tabs (Contact) and use `main`. */
  tabs?: RecordTabConfig[];
  defaultTab?: string;
  /** Main column regions when there are no tabs. */
  main?: RegionConfig[];
  /** Main column width: "2-of-3" keeps the empty right column Lightning shows (Plan Years, Card Transactions …). Default: 2-of-3 with a sidebar, else full. */
  mainWidth?: "full" | "2-of-3";
  sidebar: SidebarRegionConfig[];
};

// ── Forms ───────────────────────────────────────────────────────────────────────────────────────

export type FormConfig = {
  sections: SectionConfig[];
  /** Initial values of a new record (owner and record type are set by the template). */
  defaults: Record<string, FieldValue>;
};

// ── List views ──────────────────────────────────────────────────────────────────────────────────

export type ListFilter =
  | { kind: "all" }
  | { kind: "ownedByMe" }
  | { kind: "recentlyViewed" }
  /** Records whose field equals a value (booleans, picklists) or whose lookup points at a record id. */
  | { kind: "fieldEquals"; field: string; value: string | boolean }
  /** Nothing captured / no records in the prototype (Private Reports …). */
  | { kind: "none" };

export type ListColumnConfig = {
  field: string;
  /** Header label (default: the field label). */
  label?: string;
  /** "record" opens the row's record; "lookup" opens the lookup's record; "plain" link styling only. */
  link?: "record" | "lookup" | "plain";
  /** Column width in rem. */
  width?: string;
  align?: "left" | "right";
  /** Glyph before the value (Reports home: grey folder on folder rows). */
  iconName?: UtilityIconName;
};

export type ListViewConfig = {
  id: string;
  label: string;
  filter: ListFilter;
  columns: ListColumnConfig[];
  sort: { field: string; direction: "ascending" | "descending" };
  /** Lightning row-number column (Figma A1: present, numbers not shown). */
  rowNumbers?: "hidden" | "numbers";
  /** Lightning loads 50 rows at a time: meta says "50+ items" when the list is longer. */
  pageSize?: number;
  /** List another object's records (Reports home: folder views list Report Folders). */
  objectApiName?: string;
  /** Opens as a workspace tab "<label> | <object plural>" (Figma R4 "All Folders | Reports"). */
  openInTab?: boolean;
  /** Search box placeholder (Reports home). */
  searchPlaceholder?: string;
  /** Left-navigation section (Reports home: REPORTS / FOLDERS / FAVORITES). */
  navSection?: string;
};

/** Split-view item lines: title = name field; optional right text and a second line. */
export type SplitViewLinesConfig = { titleRight?: string; line2Left?: string; line2Right?: string; /** "Search this list…" (default true; Figma Claims has none). */ search?: boolean };

// ── Actions ─────────────────────────────────────────────────────────────────────────────────────

export type ActionFieldConfig = {
  key: string;
  field: FieldDef;
  /** Lookup object switcher options (object api names). */
  objectSwitcher?: string[];
  /** Grid width inside the modal (default full width). */
  size?: "1-of-1" | "1-of-2" | "1-of-4";
  /** Initial value. Tokens: "$today", "$currentUser", "$recordName". */
  defaultValue?: FieldValue;
  /** Field label hidden (Figma C4: labels lost in the capture are still rendered for accessibility). */
  hideLabel?: boolean;
};

/** Paragraph under a form; {recordName} / {ownerName} are replaced and wrapped in bold. */
export type ActionNoteConfig = { text: string; linkLabel?: string; bullets?: string[] };

/** What Save does: close only, update this record (field ← form key), or create a related record. */
export type ActionSaveConfig =
  | { kind: "close" }
  | { kind: "update"; map: Record<string, string> }
  /** Creates a record; with `parentField` it points at the current record. */
  | { kind: "create"; objectApiName: string; parentField?: string; map: Record<string, string> };

/** Show the action only when a field has one of these values (claim actions by status). */
export type ActionVisibility = { field: string; in: string[] };

export type ActionConfig = { visibleWhen?: ActionVisibility } & (
  | { id: string; label: string; kind: "new" }
  | { id: string; label: string; kind: "edit" }
  /** Copies the record ("<name> Copy") and opens the copy. */
  | { id: string; label: string; kind: "clone" }
  | { id: string; label: string; kind: "hierarchy" }
  | { id: string; label: string; kind: "delete"; title: string; message: string; confirmLabel: string }
  /** Sets field values right away (Approve → Status = Approved). */
  | { id: string; label: string; kind: "update"; values: Record<string, FieldValue> }
  /** Information modal with one button (Repayment Recovery). */
  | { id: string; label: string; kind: "message"; title: string; message: string; closeLabel: string; size?: "default" | "small" | "medium" }
  /** Object-specific widget in a modal (Split Approval calculator), from src/objects/widgets.ts. */
  | { id: string; label: string; kind: "widget"; widget: string; title: string; size?: "default" | "small" | "medium" }
  | {
      id: string;
      label: string;
      kind: "form";
      title: string;
      fields: ActionFieldConfig[];
      /** Paragraphs under the fields, e.g. "Shared with 5 groups of users." + "Edit". */
      notes?: ActionNoteConfig[];
      saveLabel: string;
      save?: ActionSaveConfig;
      /** "* = Required Information" legend. */
      requiredLegend?: boolean;
      size?: "default" | "small" | "medium";
    }
  /** Docked composer creating a related record (Note). */
  | {
      id: string;
      label: string;
      kind: "composer";
      objectApiName: string;
      parentField: string;
      titleField: string;
      bodyField: string;
      /** Header text while the title is empty. */
      emptyTitle: string;
    }
  /** Captured in Figma, no behaviour in the prototype. */
  | { id: string; label: string; kind: "none" }
);

// ── Other pages ─────────────────────────────────────────────────────────────────────────────────

export type HierarchyConfig = {
  parentField: string;
  columns: Array<{ field: string; label?: string; link?: boolean }>;
};

export type MetricCount = { kind: "all" } | { kind: "relatedAtLeastOne"; listId: string } | { kind: "relatedNone"; listId: string };

export type IntelligenceViewConfig = {
  listViewId: string;
  filters: Array<{ label: string; value: string; iconName: "utility:chevrondown" | "utility:search" }>;
  metrics: Array<{ id: string; label: string; count: MetricCount }>;
  /** Meta line; {count} and {metric} are replaced. */
  meta: string;
  toolbarButtons: string[];
  headerButtons: string[];
  empty: { heading: string; message: string };
};

export type RecordTypeConfig = { value: string; label: string; description?: string; layout: string; form?: string };

// ── Object ──────────────────────────────────────────────────────────────────────────────────────

export type ObjectConfig = {
  apiName: string;
  label: string;
  labelPlural: string;
  iconName: ObjectIconName;
  /** Field holding the record name. */
  nameField: string;
  /** Field holding the owner lookup (record ownership, "My …" list views). `<ownerField>Alias` is kept in sync. */
  ownerField?: string;
  /** Field showing the record type label (kept in sync with `RecordData.recordType`). */
  recordTypeField?: string;
  /** Salesforce key prefix for new record ids (Account "001"). */
  keyPrefix: string;
  fields: FieldMap;
  listViews: ListViewConfig[];
  defaultListView: string;
  listHeaderActions?: string[];
  splitView?: SplitViewLinesConfig;
  recordTypes?: RecordTypeConfig[];
  /** Record type used when a record has none. */
  defaultRecordType?: string;
  /** Object home: "list" (list view page, default), "split" (split view only, empty workspace — Figma CL1) or
   *  "reports" (Reports home: left navigation + folder / report tables — Figma R1–R9). */
  home?: "list" | "split" | "reports";
  /** Record pages: "record" (RecordPage, default), "reportsFolder" (folder contents in the Reports home layout),
   *  "reportViewer" (report body placeholder — Figma R2, R5, R6, R8). */
  recordTemplate?: "record" | "reportsFolder" | "reportViewer";
  /** Object whose navigation item is shown for this object's pages (Report Folder → Reports). */
  navObject?: string;
  /** Workspace tab label: "name | Object" (default) or the record name only (Reports / folders). */
  tabLabel?: "nameAndObject" | "name";
  layouts: Record<string, RecordLayoutConfig>;
  forms?: Record<string, FormConfig>;
  actions: ActionConfig[];
  hierarchy?: HierarchyConfig;
  intelligence?: IntelligenceViewConfig;
};

// ── Console scenarios ───────────────────────────────────────────────────────────────────────────

/**
 * Console state matching one Figma screen, opened with `?scenario=<id>` (e.g. "A4"): which workspace tabs are open,
 * which URL is shown, and the split-view selection. Used for review and pixel diffs; normal navigation never needs it.
 */
export type ConsoleScenario = {
  /** Workspace tab URLs in tab order (record, new-record, hierarchy URLs). */
  tabs: string[];
  /** URL to show (one of `tabs`, or an object home / page URL). */
  url: string;
  /** Split-view rows checked (record ids). */
  splitSelection?: string[];
  /** List views say "Updated N minutes ago" (Figma A1: 2). */
  listUpdatedMinutesAgo?: number;
  /** Records added to the store first (state after an action, e.g. the saved note of C6). */
  records?: Record<string, RecordData[]>;
  /** Pin "today" (ISO) to the capture date (Figma C4: 10/21/2026). */
  today?: string;
  /** Open composer: action id, parent record id and its draft values (Figma C5). */
  composer?: { apiName: string; actionId: string; parentId: string; values: Record<string, FieldValue> };
};

