import type { ObjectConfig } from "../../config/types";

/** Users exist as lookup targets only (no list view or record page in the Figma file). */
export const USER_CONFIG: ObjectConfig = {
  apiName: "User",
  label: "User",
  labelPlural: "People",
  iconName: "standard:user",
  nameField: "name",
  keyPrefix: "005",
  fields: {
    name: { label: "Name", type: "text", required: true },
    alias: { label: "Alias", type: "text" },
  },
  listViews: [],
  defaultListView: "",
  layouts: {},
  actions: [],
};
