import type { ObjectIconName } from "../app/components/icons/Icon";

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

export type RecordTabConfig = { id: string; label: string; sections: SectionConfig[] };

export type QuickLinkConfig = { id: string; label: string; iconName: ObjectIconName };

export type RelatedListConfig = { id: string; label: string; iconName: ObjectIconName };

export type SidebarTabContent =
  | { kind: "message"; iconName: ObjectIconName; text: string }
  | { kind: "relatedLists"; lists: RelatedListConfig[] }
  | { kind: "empty" };

export type SidebarRegionConfig =
  | { kind: "einstein"; title: string; message: string }
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
  tabs: RecordTabConfig[];
  defaultTab: string;
  sidebar: SidebarRegionConfig[];
};

// ── Forms ───────────────────────────────────────────────────────────────────────────────────────

export type FormConfig = {
  sections: SectionConfig[];
  /** Initial values of a new record (owner and record type are set by the template). */
  defaults: Record<string, FieldValue>;
};

// ── List views ──────────────────────────────────────────────────────────────────────────────────

export type ListFilter = { kind: "all" } | { kind: "ownedByMe" } | { kind: "recentlyViewed" };

export type ListColumnConfig = {
  field: string;
  /** Header label (default: the field label). */
  label?: string;
  /** "record" opens the record; "plain" link styling only (lookups / aliases). */
  link?: "record" | "plain";
  /** Column width in rem. */
  width?: string;
};

export type ListViewConfig = {
  id: string;
  label: string;
  filter: ListFilter;
  columns: ListColumnConfig[];
  sort: { field: string; direction: "ascending" | "descending" };
  /** Lightning row-number column (Figma A1: present, numbers not shown). */
  rowNumbers?: "hidden" | "numbers";
};

/** Split-view item lines: title = name field; optional right text and a second line. */
export type SplitViewLinesConfig = { titleRight?: string; line2Left?: string; line2Right?: string };

// ── Actions ─────────────────────────────────────────────────────────────────────────────────────

export type ActionFieldConfig = {
  key: string;
  field: FieldDef;
  /** Lookup object switcher options (object api names). */
  objectSwitcher?: string[];
  /** Grid width inside the modal. */
  size?: "1-of-1" | "1-of-4";
  defaultValue?: FieldValue;
};

export type ActionConfig =
  | { id: string; label: string; kind: "new" }
  | { id: string; label: string; kind: "edit" }
  | { id: string; label: string; kind: "hierarchy" }
  | { id: string; label: string; kind: "delete"; title: string; message: string; confirmLabel: string }
  | {
      id: string;
      label: string;
      kind: "form";
      title: string;
      fields: ActionFieldConfig[];
      /** Text line under the fields with an inline link, e.g. "Shared with 5 groups of users." + "Edit". */
      note?: { text: string; linkLabel: string };
      saveLabel: string;
    }
  /** Captured in Figma, no behaviour in the prototype. */
  | { id: string; label: string; kind: "none" };

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
};

