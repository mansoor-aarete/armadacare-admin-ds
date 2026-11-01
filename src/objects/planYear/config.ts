import type { ActionConfig, FieldDef, ObjectConfig } from "../../config/types";

/*
 * Plan Year — Figma PY1–PY3: split view "All", tabs Related (Plan Year History) · Details, Edit | Delete | Clone | ▼.
 */

const number = (label: string): FieldDef => ({ label, type: "number" });
const picklist = (label: string, options: string[]): FieldDef => ({ label, type: "picklist", options });

/** Standard record actions shared by the simple record pages (Plan Year, Plan Year Enrollment, Portal Information). */
export function standardActions(label: string): ActionConfig[] {
  return [
    { id: "edit", label: "Edit", kind: "edit" },
    { id: "delete", label: "Delete", kind: "delete", title: `Delete ${label}`, message: `Are you sure you want to delete this ${label.toLowerCase()}?`, confirmLabel: "Delete" },
    { id: "clone", label: "Clone", kind: "clone" },
    // ▼ menu items were not captured; Lightning standard items with no behaviour in the prototype.
    { id: "sharing", label: "Sharing", kind: "none" },
    { id: "printableView", label: "Printable View", kind: "none" },
  ];
}

export const PLAN_YEAR_CONFIG: ObjectConfig = {
  apiName: "PlanYear",
  label: "Plan Year",
  labelPlural: "Plan Years",
  iconName: "custom:custom66",
  nameField: "name",
  keyPrefix: "a1P",
  fields: {
    name: { label: "Plan Year Name", type: "text", required: true },
    validStartDate: { label: "Valid Start Date", type: "date" },
    annualFamilyMaximum: { label: "Annual Family Maximum", type: "currency" },
    deductibleApplicationType: picklist("Deductible Application Type", ["Full Policy"]),
    deductibleRule: picklist("Deductible Rule", ["Reset on Break"]),
    draftClaimExpiryDays: number("Draft Claim Expiry Days"),
    draftExpiryReminderDays: number("Draft Expiry Reminder Days"),
    endDate: { label: "End Date", type: "date" },
    planYearLabel: { label: "Plan Year Label", type: "text" },
    plan: { label: "Plan", type: "lookup", lookup: { objectApiName: "Plan", placeholder: "Search Plans..." } },
    startDate: { label: "Start Date", type: "date" },
    status: picklist("Status", ["Active", "Inactive"]),
    group: { label: "Group", type: "lookup", readOnly: true, lookup: { objectApiName: "Account", placeholder: "Search Accounts..." } },
    validEndDate: { label: "Valid End Date", type: "date" },
    runOutDays: number("Run Out Days"),
    benefitPlanTemplate: { label: "Benefit Plan Template", type: "text" },
    renewalType: picklist("Renewal Type", ["Manual"]),
    createdBy: { label: "Created By", type: "audit", readOnly: true },
    lastModifiedBy: { label: "Last Modified By", type: "audit", readOnly: true },
  },
  listViews: [
    {
      id: "All",
      label: "All",
      filter: { kind: "all" },
      sort: { field: "name", direction: "ascending" },
      rowNumbers: "hidden",
      columns: [{ field: "name", link: "record" }, { field: "group", link: "lookup" }, { field: "startDate" }, { field: "endDate" }, { field: "status" }],
    },
  ],
  defaultListView: "All",
  listHeaderActions: ["new"],
  splitView: {},
  layouts: {
    planYear: {
      highlights: { fields: [], actions: ["edit", "delete", "clone"], overflow: ["sharing", "printableView"] },
      tabs: [
        {
          id: "related",
          label: "Related",
          regions: [
            {
              kind: "relatedList",
              list: {
                id: "history",
                label: "Plan Year History",
                iconName: "custom:custom66",
                objectApiName: "PlanYearHistory",
                parentField: "planYear",
                menu: false,
                display: "table",
                rowActions: false,
                pageSize: 6,
                columns: [{ field: "date" }, { field: "field" }, { field: "user", link: "plain" }, { field: "originalValue" }, { field: "newValue" }],
              },
            },
          ],
        },
        {
          id: "details",
          label: "Details",
          sections: [
            {
              id: "main",
              rows: [
                ["name", "group"],
                ["validStartDate", "validEndDate"],
                ["annualFamilyMaximum", "runOutDays"],
                ["deductibleApplicationType", "benefitPlanTemplate"],
                ["deductibleRule", "renewalType"],
                ["draftClaimExpiryDays", null],
                ["draftExpiryReminderDays", null],
                ["endDate", null],
                ["planYearLabel", null],
                ["plan", null],
                ["startDate", null],
                ["status", null],
              ],
            },
            { id: "systemInformation", title: "System Information", rows: [["createdBy", "lastModifiedBy"]] },
          ],
        },
      ],
      defaultTab: "related",
      sidebar: [],
      mainWidth: "2-of-3",
    },
  },
  forms: {
    planYear: {
      sections: [
        {
          id: "main",
          rows: [
            ["name", "validStartDate"],
            ["annualFamilyMaximum", "validEndDate"],
            ["deductibleApplicationType", "runOutDays"],
            ["deductibleRule", "renewalType"],
            ["draftClaimExpiryDays", "status"],
            ["draftExpiryReminderDays", "startDate"],
            ["planYearLabel", "endDate"],
          ],
        },
      ],
      defaults: { status: "Active" },
    },
  },
  actions: [{ id: "new", label: "New", kind: "new" }, ...standardActions("Plan Year")],
};

export const PLAN_YEAR_HISTORY_CONFIG: ObjectConfig = {
  apiName: "PlanYearHistory",
  label: "Plan Year History",
  labelPlural: "Plan Year History",
  iconName: "custom:custom66",
  nameField: "field",
  keyPrefix: "017",
  fields: {
    date: { label: "Date", type: "datetime" },
    field: { label: "Field", type: "text" },
    user: { label: "User", type: "lookup", lookup: { objectApiName: "User", placeholder: "Search People..." } },
    originalValue: { label: "Original Value", type: "text" },
    newValue: { label: "New Value", type: "text" },
    planYear: { label: "Plan Year", type: "lookup", lookup: { objectApiName: "PlanYear", placeholder: "Search Plan Years..." } },
  },
  listViews: [],
  defaultListView: "",
  layouts: {},
  actions: [],
};
