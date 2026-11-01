import type { ObjectConfig } from "../config/types";
import { ACCOUNT_CONFIG } from "./account/config";
import { ACCOUNT_FUNNEL_TRACKER_CONFIG, NOTE_CONFIG, TASK_CONFIG } from "./activity/config";
import { CONTACT_CONFIG } from "./contact/config";
import { USER_CONFIG } from "./user/config";

/*
 * Object registry. Adding an object = its folder (config.ts · mock-data.ts · types.ts) + one line here and one in
 * seeds.ts. Pages read configs from here; mock data (seeds.ts) is read only by src/services.
 */

export const OBJECTS: Record<string, ObjectConfig> = {
  Account: ACCOUNT_CONFIG,
  Contact: CONTACT_CONFIG,
  User: USER_CONFIG,
  Note: NOTE_CONFIG,
  Task: TASK_CONFIG,
  AccountFunnelTracker: ACCOUNT_FUNNEL_TRACKER_CONFIG,
};

/** Objects listed in the console navigation menu, in order. */
export const NAV_OBJECTS = ["Account", "Contact"];

export function getObjectConfig(apiName: string): ObjectConfig {
  const config = OBJECTS[apiName];
  if (!config) throw new Error(`Unknown object ${apiName}`);
  return config;
}
