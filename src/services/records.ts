import type { AuditValue, FieldValue, ListFilter, LookupValue, RecordData } from "../config/types";
import { getObjectConfig } from "../objects";
import { getCurrentUserId } from "./session";
import { markViewed, readTable, recentIds, writeTable } from "./store";

/*
 * Record data access. Async (Promise) on purpose: a Salesforce API (UI API / Apex) can replace these functions
 * without touching pages.
 */

const copy = (r: RecordData): RecordData => JSON.parse(JSON.stringify(r)) as RecordData;

/** Display name of a record (its config's name field). */
export function recordName(apiName: string, record: RecordData): string {
  const v = record.values[getObjectConfig(apiName).nameField];
  return typeof v === "string" ? v : "";
}

function lookupOf(apiName: string, record: RecordData): LookupValue {
  return { id: record.id, name: recordName(apiName, record), objectApiName: apiName };
}

function isLookup(v: FieldValue | undefined): v is LookupValue {
  return v !== null && typeof v === "object" && !Array.isArray(v) && "objectApiName" in v;
}

function nowIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function currentUserRef(): LookupValue {
  const user = readTable("User").find((u) => u.id === getCurrentUserId());
  return user ? lookupOf("User", user) : { id: getCurrentUserId(), name: "", objectApiName: "User" };
}

/** Keeps derived values in sync: record type label, owner alias, audit fields. */
function derive(apiName: string, record: RecordData, created: boolean): RecordData {
  const config = getObjectConfig(apiName);
  const values = { ...record.values };
  if (config.recordTypeField && record.recordType) values[config.recordTypeField] = record.recordType;
  const owner = config.ownerField ? values[config.ownerField] : undefined;
  const aliasField = config.ownerField ? `${config.ownerField}Alias` : "";
  if (isLookup(owner) && config.fields[aliasField]) {
    const user = readTable("User").find((u) => u.id === owner.id);
    values[aliasField] = user?.values.alias ?? null;
  }
  const audit: AuditValue = { by: currentUserRef(), at: nowIso() };
  if (created && config.fields.createdBy) values.createdBy = audit;
  if (created && config.fields.createdDate) values.createdDate = audit.at;
  if (config.fields.lastModifiedBy) values.lastModifiedBy = audit;
  return { ...record, values };
}

export async function listRecords(apiName: string, filter: ListFilter = { kind: "all" }): Promise<RecordData[]> {
  const config = getObjectConfig(apiName);
  let rows = readTable(apiName);
  if (filter.kind === "ownedByMe" && config.ownerField) {
    const field = config.ownerField;
    rows = rows.filter((r) => {
      const owner = r.values[field];
      return isLookup(owner) && owner.id === getCurrentUserId();
    });
  } else if (filter.kind === "fieldEquals") {
    rows = rows.filter((r) => {
      const v = r.values[filter.field];
      return isLookup(v) ? v.id === filter.value : v === filter.value;
    });
  } else if (filter.kind === "none") {
    rows = [];
  } else if (filter.kind === "recentlyViewed") {
    rows = recentIds()
      .map((id) => rows.find((r) => r.id === id))
      .filter((r): r is RecordData => Boolean(r));
  }
  return rows.map(copy);
}

export async function getRecord(apiName: string, id: string): Promise<RecordData | null> {
  const record = readTable(apiName).find((r) => r.id === id);
  if (!record) return null;
  markViewed(id);
  return copy(record);
}

/** Records whose name contains `term` (lookup search). */
export async function searchRecords(apiName: string, term: string): Promise<RecordData[]> {
  const t = term.trim().toLowerCase();
  return readTable(apiName)
    .filter((r) => recordName(apiName, r).toLowerCase().includes(t))
    .slice(0, 10)
    .map(copy);
}

export async function createRecord(apiName: string, recordType: string | undefined, values: Record<string, FieldValue>): Promise<RecordData> {
  const config = getObjectConfig(apiName);
  const rows = readTable(apiName);
  const id = `${config.keyPrefix}Ec0000NEW${String(rows.length + 1).padStart(6, "0")}`;
  const owner: Record<string, FieldValue> = config.ownerField ? { [config.ownerField]: currentUserRef() } : {};
  const record = derive(apiName, { id, recordType, values: { ...owner, ...values } }, true);
  writeTable(apiName, [...rows, record]);
  return copy(record);
}

export async function updateRecord(apiName: string, id: string, values: Record<string, FieldValue>): Promise<RecordData> {
  const rows = readTable(apiName);
  const current = rows.find((r) => r.id === id);
  if (!current) throw new Error(`${apiName} ${id} not found`);
  const record = derive(apiName, { ...current, values: { ...current.values, ...values } }, false);
  writeTable(
    apiName,
    rows.map((r) => (r.id === id ? record : r)),
  );
  return copy(record);
}

export async function deleteRecord(apiName: string, id: string): Promise<void> {
  writeTable(
    apiName,
    readTable(apiName).filter((r) => r.id !== id),
  );
}

export async function getCurrentUser(): Promise<LookupValue> {
  return currentUserRef();
}

/** Subscribe to record changes (any create / update / delete). Returns the unsubscribe function. */
export { subscribe as onDataChange } from "./store";

/** Child records of a parent (related lists): records of `apiName` whose lookup `parentField` points at `parentId`. */
export async function listRelated(apiName: string, parentField: string, parentId: string): Promise<RecordData[]> {
  return readTable(apiName)
    .filter((r) => {
      const v = r.values[parentField];
      return isLookup(v) && v.id === parentId;
    })
    .map(copy);
}
