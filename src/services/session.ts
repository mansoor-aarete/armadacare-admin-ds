import type { ConsoleScenario, RecordData } from "../config/types";
import { readTable, writeTable } from "./store";
import { SEED_CURRENT_USER_ID, SEED_SCENARIOS } from "../objects/seeds";

/** Id of the signed-in user. */
export function getCurrentUserId(): string {
  return SEED_CURRENT_USER_ID;
}

/** Console state of a Figma screen (`?scenario=A4`), or null. */
export async function getScenario(id: string): Promise<ConsoleScenario | null> {
  return SEED_SCENARIOS[id] ?? null;
}

/** Adds a scenario's records to the store (replacing records with the same id). */
export async function applyScenarioRecords(records: Record<string, RecordData[]>): Promise<void> {
  for (const [apiName, rows] of Object.entries(records)) {
    const ids = new Set(rows.map((r) => r.id));
    writeTable(apiName, [...readTable(apiName).filter((r) => !ids.has(r.id)), ...rows]);
  }
}
