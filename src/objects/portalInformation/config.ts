import type { ObjectConfig } from "../../config/types";
import { standardActions } from "../planYear/config";

/* Portal Information — Figma PI1: split view "All" (3-line items), one Details tab with a single section. */

export const PORTAL_INFORMATION_CONFIG: ObjectConfig = {
  apiName: "PortalInformation",
  label: "Portal Information",
  labelPlural: "Portal Informations",
  iconName: "custom:custom68",
  nameField: "name",
  ownerField: "owner",
  keyPrefix: "a3P",
  fields: {
    name: { label: "Portal Information Name", type: "text", required: true },
    owner: { label: "Owner", type: "lookup", readOnly: true, action: "changeOwner", lookup: { objectApiName: "User", placeholder: "Search People..." } },
    title: { label: "Title", type: "text" },
    message: { label: "Message", type: "textarea" },
    severity: { label: "Severity", type: "picklist", options: ["Info", "Success", "Warning", "Error"] },
    displayLocation: { label: "Display Location", type: "picklist", options: ["Dashboard"] },
    approvalStatus: { label: "Approval Status", type: "picklist", options: ["Draft", "Approved"] },
    displayOrder: { label: "Display Order", type: "number" },
    isActive: { label: "Is Active", type: "checkbox" },
    isDismissible: { label: "Is Dismissible", type: "checkbox" },
    ctaLabel: { label: "CTA Label", type: "text" },
    startTime: { label: "Start Time", type: "datetime" },
    ctaPage: { label: "CTA Page", type: "text" },
    endTime: { label: "End Time", type: "datetime" },
    ctaUrl: { label: "CTA URL", type: "url" },
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
      columns: [{ field: "name", link: "record" }, { field: "title" }, { field: "severity" }, { field: "displayLocation" }, { field: "isActive" }],
    },
  ],
  defaultListView: "All",
  listHeaderActions: ["new"],
  splitView: { titleRight: "title", line2Left: "message", line2Right: "severity" },
  layouts: {
    portalInformation: {
      highlights: { fields: [], actions: ["edit", "delete", "clone"], overflow: ["sharing", "printableView"] },
      tabs: [
        {
          id: "details",
          label: "Details",
          sections: [
            {
              id: "main",
              rows: [
                ["name", "owner"],
                ["title", "message"],
                ["severity", "displayLocation"],
                ["approvalStatus", "displayOrder"],
                ["isActive", "isDismissible"],
                ["ctaLabel", "startTime"],
                ["ctaPage", "endTime"],
                ["ctaUrl", null],
                ["createdBy", "lastModifiedBy"],
              ],
            },
          ],
        },
      ],
      defaultTab: "details",
      sidebar: [],
      mainWidth: "2-of-3",
    },
  },
  forms: {
    portalInformation: {
      sections: [
        {
          id: "main",
          rows: [
            ["name", "title"],
            ["message", "severity"],
            ["displayLocation", "approvalStatus"],
            ["displayOrder", "isActive"],
            ["isDismissible", "ctaLabel"],
            ["startTime", "endTime"],
            ["ctaPage", "ctaUrl"],
          ],
        },
      ],
      defaults: { severity: "Info", displayLocation: "Dashboard", approvalStatus: "Draft", isActive: true },
    },
  },
  actions: [{ id: "new", label: "New", kind: "new" }, ...standardActions("Portal Information")],
};
