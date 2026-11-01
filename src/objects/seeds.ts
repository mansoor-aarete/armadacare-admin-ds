import type { ConsoleScenario, RecordData } from "../config/types";
import { ACCOUNT_RECORDS, ACCOUNT_SCENARIOS } from "./account/mock-data";
import { CONTACT_RECORDS, CONTACT_SCENARIOS } from "./contact/mock-data";
import { CURRENT_USER_ID, USER_RECORDS } from "./user/mock-data";

/** Mock data of every object — read only by src/services (swap the services for Salesforce APIs later). */
export const SEED_RECORDS: Record<string, RecordData[]> = {
  Account: ACCOUNT_RECORDS,
  Contact: CONTACT_RECORDS,
  User: USER_RECORDS,
  Note: [],
  Task: [],
  AccountFunnelTracker: [],
};

export const SEED_CURRENT_USER_ID = CURRENT_USER_ID;

/** Console scenarios (Figma screen states) by id. */
export const SEED_SCENARIOS: Record<string, ConsoleScenario> = {
  ...ACCOUNT_SCENARIOS,
  ...CONTACT_SCENARIOS,
};
