import type { ObjectConfig, RecordData } from "../../config/types";
import type { MenuItem } from "../components/buttons/MenuDropdown";
import { fieldAt, formatValue, getValue } from "../widgets/fieldValues";

/** List View Controls menu (gear ▾) — Lightning standard items. */
export const LIST_VIEW_CONTROLS: MenuItem[] = [
  { type: "header", label: "List View Controls" },
  { value: "new", label: "New" },
  { value: "clone", label: "Clone" },
  { value: "rename", label: "Rename" },
  { value: "sharing", label: "Sharing Settings" },
  { value: "filters", label: "Edit List Filters" },
];

/** Row ▾ menu of list views. */
export const ROW_ACTIONS: MenuItem[] = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
];

/** Sorts records by a field path: numbers numerically, everything else by its displayed text. */
export function sortRows(config: ObjectConfig, rows: RecordData[], sort: { field: string; direction: "ascending" | "descending" }): RecordData[] {
  const def = fieldAt(config, sort.field);
  const key = (r: RecordData) => {
    const v = getValue(r, sort.field);
    if (typeof v === "number") return v;
    // ISO dates sort correctly as text.
    if (typeof v === "string" && (def.type === "date" || def.type === "datetime")) return v;
    return formatValue(def, v).toLowerCase();
  };
  const dir = sort.direction === "ascending" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const x = key(a);
    const y = key(b);
    if (x === y) return 0;
    if (x === "") return 1;
    if (y === "") return -1;
    return (x < y ? -1 : 1) * dir;
  });
}
