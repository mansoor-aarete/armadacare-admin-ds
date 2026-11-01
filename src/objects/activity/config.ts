import type { ObjectConfig } from "../../config/types";

/*
 * Child objects created from Contact actions (no list views or record pages in Figma): Note (docked composer, Notes
 * related list), Task (Log an Activity → Activity History), Account Funnel Tracker (Related To lookup target, no records).
 */

const BASE = { listViews: [], defaultListView: "", layouts: {}, actions: [] };

export const NOTE_CONFIG: ObjectConfig = {
  ...BASE,
  apiName: "Note",
  label: "Note",
  labelPlural: "Notes",
  iconName: "standard:note",
  nameField: "title",
  keyPrefix: "002",
  fields: {
    title: { label: "Title", type: "text" },
    body: { label: "Body", type: "textarea" },
    parent: { label: "Related To", type: "lookup", lookup: { objectApiName: "Contact", placeholder: "Search Contacts..." } },
    createdBy: { label: "Created By", type: "audit", readOnly: true },
    createdDate: { label: "Created Date", type: "datetime", readOnly: true },
  },
};

export const TASK_CONFIG: ObjectConfig = {
  ...BASE,
  apiName: "Task",
  label: "Task",
  labelPlural: "Tasks",
  iconName: "standard:event",
  nameField: "subject",
  keyPrefix: "00T",
  fields: {
    subject: { label: "Subject", type: "text" },
    type: { label: "Type", type: "picklist" },
    assignedTo: { label: "Assigned To", type: "lookup", lookup: { objectApiName: "User", placeholder: "Search People..." } },
    dueDate: { label: "Due Date", type: "date" },
    status: { label: "Status", type: "picklist" },
    priority: { label: "Priority", type: "picklist" },
    comments: { label: "Comments", type: "textarea" },
    who: { label: "Name", type: "lookup", lookup: { objectApiName: "Contact", placeholder: "Search Contacts..." } },
    createdBy: { label: "Created By", type: "audit", readOnly: true },
    createdDate: { label: "Created Date", type: "datetime", readOnly: true },
  },
};

export const ACCOUNT_FUNNEL_TRACKER_CONFIG: ObjectConfig = {
  ...BASE,
  apiName: "AccountFunnelTracker",
  label: "Account Funnel Tracker",
  labelPlural: "Account Funnel Trackers",
  iconName: "standard:custom",
  nameField: "name",
  keyPrefix: "a0F",
  fields: { name: { label: "Name", type: "text" } },
};
