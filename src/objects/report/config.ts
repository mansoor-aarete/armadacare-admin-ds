import type { ActionConfig, FieldDef, ListColumnConfig, ListViewConfig, ObjectConfig } from "../../config/types";
import { PUBLIC_REPORTS_FOLDER } from "./types";

/*
 * Reports — Figma R1–R9. The Reports home (left navigation REPORTS / FOLDERS / FAVORITES, folder and report tables)
 * is the object home of "Report"; folders open as workspace tabs listing their reports; reports open a report tab
 * whose body (an iframe in Salesforce) was not captured.
 */

const userLookup = (label: string): FieldDef => ({ label, type: "lookup", lookup: { objectApiName: "User", placeholder: "Search People..." } });
const created = (label: string): FieldDef => ({ label, type: "datetime", dateStyle: "comma" });

const REPORT_COLUMNS: ListColumnConfig[] = [
  { field: "name", label: "Report Name", link: "record" },
  { field: "description" },
  { field: "folder", link: "lookup" },
  { field: "createdBy", link: "plain" },
  { field: "createdDate" },
  { field: "subscribed" },
];
const FOLDER_COLUMNS: ListColumnConfig[] = [
  { field: "name", link: "record", iconName: "utility:open_folder" },
  { field: "createdBy", link: "plain" },
  { field: "createdDate" },
  { field: "lastModifiedBy", link: "plain" },
  { field: "lastModifiedDate" },
];
const view = (id: string, label: string, section: string, extra: Partial<ListViewConfig> = {}): ListViewConfig => ({
  id,
  label,
  navSection: section,
  filter: { kind: "none" },
  sort: { field: "name", direction: "ascending" },
  columns: REPORT_COLUMNS,
  ...extra,
});
const folders = { objectApiName: "ReportFolder", columns: FOLDER_COLUMNS };

const ACTIONS: ActionConfig[] = [
  { id: "newReport", label: "New Report", kind: "none" },
  {
    id: "newFolder",
    label: "New Folder",
    kind: "form",
    title: "New Folder",
    saveLabel: "Save",
    requiredLegend: true,
    fields: [
      { key: "name", field: { label: "Folder Label", type: "text", required: true } },
      { key: "uniqueName", field: { label: "Folder Unique Name", type: "text" } },
    ],
    save: { kind: "create", objectApiName: "ReportFolder", map: { name: "name" } },
  },
  { id: "delete", label: "Delete", kind: "delete", title: "Delete Report", message: "Are you sure you want to delete this report?", confirmLabel: "Delete" },
];

export const REPORT_CONFIG: ObjectConfig = {
  apiName: "Report",
  label: "Report",
  labelPlural: "Reports",
  iconName: "standard:report",
  nameField: "name",
  ownerField: "createdBy",
  keyPrefix: "00O",
  home: "reports",
  recordTemplate: "reportViewer",
  tabLabel: "name",
  fields: {
    name: { label: "Name", type: "text", required: true },
    description: { label: "Description", type: "text" },
    folder: { label: "Folder", type: "lookup", lookup: { objectApiName: "ReportFolder", placeholder: "Search Folders..." } },
    createdBy: userLookup("Created By"),
    createdDate: created("Created On"),
    subscribed: { label: "Subscribed", type: "text" },
    recent: { label: "Recently Viewed", type: "checkbox" },
  },
  listViews: [
    view("recent", "Recent", "Reports", { filter: { kind: "fieldEquals", field: "recent", value: true }, searchPlaceholder: "Search recent reports..." }),
    view("createdByMe", "Created by Me", "Reports", { searchPlaceholder: "Search reports created by me..." }),
    view("private", "Private Reports", "Reports", { searchPlaceholder: "Search private reports..." }),
    view("public", "Public Reports", "Reports", {
      filter: { kind: "fieldEquals", field: "folder", value: PUBLIC_REPORTS_FOLDER },
      searchPlaceholder: "Search public reports...",
    }),
    view("all", "All Reports", "Reports", { filter: { kind: "all" }, searchPlaceholder: "Search all reports..." }),
    view("allFolders", "All Folders", "Folders", { ...folders, filter: { kind: "all" }, openInTab: true, searchPlaceholder: "Search all folders..." }),
    view("foldersCreatedByMe", "Created by Me", "Folders", { ...folders, searchPlaceholder: "Search folders created by me..." }),
    view("sharedWithMe", "Shared with Me", "Folders", {
      ...folders,
      filter: { kind: "fieldEquals", field: "sharedWithMe", value: true },
      searchPlaceholder: "Search folders shared with me...",
    }),
    view("favorites", "All Favorites", "Favorites", { searchPlaceholder: "Search all favorites..." }),
    // Folder contents (folder tab): "$folder" is the open folder. Not in the left navigation.
    view("folderContents", "Folder", "", {
      filter: { kind: "fieldEquals", field: "folder", value: "$folder" },
      columns: [{ ...REPORT_COLUMNS[0], label: "Name" }, ...REPORT_COLUMNS.slice(1)],
      searchPlaceholder: "Search all folders...",
    }),
  ],
  defaultListView: "recent",
  listHeaderActions: ["newReport", "newFolder"],
  layouts: {},
  actions: ACTIONS,
};

export const REPORT_FOLDER_CONFIG: ObjectConfig = {
  apiName: "ReportFolder",
  label: "Report Folder",
  labelPlural: "Report Folders",
  iconName: "standard:folder",
  nameField: "name",
  keyPrefix: "00l",
  navObject: "Report",
  recordTemplate: "reportsFolder",
  tabLabel: "name",
  fields: {
    name: { label: "Name", type: "text", required: true },
    createdBy: userLookup("Created By"),
    createdDate: created("Created On"),
    lastModifiedBy: userLookup("Last Modified By"),
    lastModifiedDate: created("Last Modified Date"),
    sharedWithMe: { label: "Shared with Me", type: "checkbox" },
  },
  listViews: [],
  defaultListView: "",
  layouts: {},
  actions: [{ id: "delete", label: "Delete", kind: "delete", title: "Delete Folder", message: "Are you sure you want to delete this folder?", confirmLabel: "Delete" }],
};
