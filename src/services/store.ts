import type { RecordData } from "../config/types";
import { SEED_RECORDS } from "../objects/seeds";

/*
 * In-memory record store for the session, seeded from src/objects/<object>/mock-data.ts.
 * Only src/services uses it — replace the services with Salesforce API calls and nothing else changes.
 */

let tables: Record<string, RecordData[]> = JSON.parse(JSON.stringify(SEED_RECORDS)) as Record<string, RecordData[]>;
const recentlyViewed: string[] = [];
let version = 0;
const listeners = new Set<() => void>();

/** Notified after every write (pages re-load their data). */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getVersion(): number {
  return version;
}

export function readTable(apiName: string): RecordData[] {
  return tables[apiName] ?? [];
}

export function writeTable(apiName: string, rows: RecordData[]): void {
  tables = { ...tables, [apiName]: rows };
  version += 1;
  listeners.forEach((l) => l());
}

export function markViewed(id: string): void {
  const i = recentlyViewed.indexOf(id);
  if (i >= 0) recentlyViewed.splice(i, 1);
  recentlyViewed.unshift(id);
}

export function recentIds(): string[] {
  return recentlyViewed;
}
