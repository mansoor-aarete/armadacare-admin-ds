import type { ObjectConfig } from "../config/types";
import { ACCOUNT_CONFIG } from "./account/config";
import { USER_CONFIG } from "./user/config";

/*
 * Object registry. Adding an object = its folder (config.ts · mock-data.ts · types.ts) + one line here and one in
 * seeds.ts. Pages read configs from here; mock data (seeds.ts) is read only by src/services.
 */

export const OBJECTS: Record<string, ObjectConfig> = {
  Account: ACCOUNT_CONFIG,
  User: USER_CONFIG,
};

/** Objects listed in the console navigation menu, in order. */
export const NAV_OBJECTS = ["Account"];

export function getObjectConfig(apiName: string): ObjectConfig {
  const config = OBJECTS[apiName];
  if (!config) throw new Error(`Unknown object ${apiName}`);
  return config;
}
