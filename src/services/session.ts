import type { ConsoleScenario } from "../config/types";
import { SEED_CURRENT_USER_ID, SEED_SCENARIOS } from "../objects/seeds";

/** Id of the signed-in user. */
export function getCurrentUserId(): string {
  return SEED_CURRENT_USER_ID;
}

/** Console state of a Figma screen (`?scenario=A4`), or null. */
export async function getScenario(id: string): Promise<ConsoleScenario | null> {
  return SEED_SCENARIOS[id] ?? null;
}
