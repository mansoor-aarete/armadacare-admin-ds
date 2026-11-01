import avatarPhoto from "@salesforce-ux/design-system/assets/images/avatar1.jpg";
import type { MenuItem } from "../components/buttons/MenuDropdown";
import type { AvatarContent } from "../components/feedback/Avatar";

/** Showcase-only demo data for the Phase 3 patterns (content from the Figma captures). */

export const USER_AVATAR: AvatarContent = { kind: "image", src: avatarPhoto, alt: "Feng Yue" };

export const LIST_VIEWS: MenuItem[] = [
  { type: "header", label: "List Views" },
  { value: "all", label: "All" },
  { value: "recent", label: "Recently Viewed" },
  { value: "new-this-week", label: "Accounts New This Week" },
];

export const LIST_CONTROLS: MenuItem[] = [
  { type: "header", label: "List View Controls" },
  { value: "new", label: "New" },
  { value: "clone", label: "Clone" },
  { value: "rename", label: "Rename" },
  { value: "sharing", label: "Sharing Settings" },
  { value: "filters", label: "Edit List Filters" },
];

export const DISPLAY_AS: MenuItem[] = [
  { type: "header", label: "Display as" },
  { type: "checkbox", value: "table", label: "Table", checked: true },
  { type: "checkbox", value: "kanban", label: "Kanban", checked: false },
  { type: "checkbox", value: "split", label: "Split View", checked: false },
];

export const RELATED_MENU: MenuItem[] = [{ value: "new", label: "New" }];

export type AccountRow = { id: string; name: string; site: string; created: string; type: string; open: string; owner: string; alias: string };

export const ACCOUNT_ROWS: AccountRow[] = [
  { id: "a1", name: "AGent 1", site: "", created: "", type: "", open: "0", owner: "Feng Yue", alias: "fyue" },
  { id: "a2", name: "ArmadaCare", site: "4/1/2014", created: "", type: "Armada Care", open: "0", owner: "Donna Walter", alias: "eelle" },
  { id: "a3", name: "Blalock Development Co", site: "12/16/2021", created: "1/1/2013", type: "Armada Care", open: "0", owner: "Donna Walter", alias: "eelle" },
  { id: "a4", name: "Unifi Aviation, LLC", site: "8/8/2018", created: "8/1/2018", type: "Armada Care", open: "0", owner: "Donna Walter", alias: "eelle" },
  { id: "a5", name: "VS Test", site: "", created: "1/1/2026", type: "Armada Care", open: "0", owner: "Deepak Malviya", alias: "vsalu" },
];

export const ROW_ACTIONS: MenuItem[] = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
  { value: "owner", label: "Change Owner" },
];
