import type { ObjectConfig } from "../config/types";
import { ACCOUNT_CONFIG } from "./account/config";
import { ACCOUNT_FUNNEL_TRACKER_CONFIG, NOTE_CONFIG, TASK_CONFIG } from "./activity/config";
import { ACCUMULATOR_CONFIG, ADJUDICATION_CONFIG, CLAIM_CONFIG, CLAIM_FILE_CONFIG } from "./claim/config";
import { CONTACT_CONFIG } from "./contact/config";
import { PLAN_YEAR_CONFIG, PLAN_YEAR_HISTORY_CONFIG } from "./planYear/config";
import { PLAN_YEAR_ENROLLMENT_CONFIG, PLAN_YEAR_ENROLLMENT_MEMBER_CONFIG } from "./planYearEnrollment/config";
import { REPORT_CONFIG, REPORT_FOLDER_CONFIG } from "./report/config";
import { USER_CONFIG } from "./user/config";

/*
 * Object registry. Adding an object = its folder (config.ts · mock-data.ts · types.ts) + one line here and one in
 * seeds.ts. Pages read configs from here; mock data (seeds.ts) is read only by src/services.
 */

export const OBJECTS: Record<string, ObjectConfig> = {
  Account: ACCOUNT_CONFIG,
  Contact: CONTACT_CONFIG,
  Claim: CLAIM_CONFIG,
  ClaimFile: CLAIM_FILE_CONFIG,
  Adjudication: ADJUDICATION_CONFIG,
  Accumulator: ACCUMULATOR_CONFIG,
  Report: REPORT_CONFIG,
  ReportFolder: REPORT_FOLDER_CONFIG,
  PlanYear: PLAN_YEAR_CONFIG,
  PlanYearHistory: PLAN_YEAR_HISTORY_CONFIG,
  PlanYearEnrollment: PLAN_YEAR_ENROLLMENT_CONFIG,
  PlanYearEnrollmentMember: PLAN_YEAR_ENROLLMENT_MEMBER_CONFIG,
  User: USER_CONFIG,
  Note: NOTE_CONFIG,
  Task: TASK_CONFIG,
  AccountFunnelTracker: ACCOUNT_FUNNEL_TRACKER_CONFIG,
};

/** Objects listed in the console navigation menu, in order. */
export const NAV_OBJECTS = ["Account", "Contact", "Claim", "Report", "PlanYear", "PlanYearEnrollment"];

export function getObjectConfig(apiName: string): ObjectConfig {
  const config = OBJECTS[apiName];
  if (!config) throw new Error(`Unknown object ${apiName}`);
  return config;
}
