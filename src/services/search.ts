import type { FieldValue, LookupValue, RecordData, SearchFieldConfig } from "../config/types";
import { PAGES } from "../objects";
import { readTable } from "./store";

/*
 * Search pages (Figma P1–P7). Async like records.ts, so the custom search's Apex call can replace runSearch without
 * touching the page.
 */

/** Criteria of one search tab: field id → text / picklist value, checkbox group id → checked options. */
export type SearchCriteria = Record<string, string | string[]>;

const text = (v: FieldValue | undefined) => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "").toLowerCase();

function matchesField(row: RecordData, field: SearchFieldConfig, value: string): boolean {
  if (!value || !field.match) return true;
  const cell = text(row.values[field.match.field]);
  const term = value.toLowerCase();
  if (field.match.operator === "startsWith") return cell.startsWith(term);
  if (field.match.operator === "contains") return cell.includes(term);
  return cell === term;
}

/** Rows of a search tab matching the criteria, sorted; each row gets `recordUrl` (the URL of the record it opens). */
export async function runSearch(pageName: string, tabId: string, criteria: SearchCriteria): Promise<RecordData[]> {
  const tab = PAGES[pageName]?.tabs.find((t) => t.id === tabId);
  if (!tab) return [];
  const blocks = [...tab.blocks, ...(tab.advanced?.blocks ?? [])];
  const fields = blocks.flatMap((b) => [...(b.fields ?? []), ...(b.fieldsAfter ?? [])]);
  const groups = blocks.flatMap((b) => b.checkboxGroups ?? []);
  const sort = tab.results.sort ?? [];

  return readTable(tab.results.dataset)
    .filter((row) =>
      fields.every((f) => {
        const v = criteria[f.id];
        return typeof v !== "string" || matchesField(row, f, v);
      }),
    )
    .filter((row) =>
      groups.every((g) => {
        const checked = criteria[g.id];
        if (!g.match || !Array.isArray(checked) || checked.includes("All")) return true;
        return checked.includes(String(row.values[g.match.field] ?? ""));
      }),
    )
    .sort((a, b) => {
      for (const f of sort) {
        const c = text(a.values[f]).localeCompare(text(b.values[f]));
        if (c) return c;
      }
      return 0;
    })
    .map((row) => {
      const record = row.values.record as LookupValue | undefined;
      return { ...row, values: { ...row.values, recordUrl: record ? `/lightning/r/${record.objectApiName}/${record.id}/view` : "" } };
    });
}
