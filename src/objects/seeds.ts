import type { ConsoleScenario, RecordData } from "../config/types";
import { ACCOUNT_RECORDS, ACCOUNT_SCENARIOS } from "./account/mock-data";
import { ACCUMULATOR_RECORDS, ADJUDICATION_RECORDS, CLAIM_FILE_RECORDS, CLAIM_RECORDS, CLAIM_SCENARIOS } from "./claim/mock-data";
import { CARD_TRANSACTION_RECORDS, CARD_TRANSACTION_SCENARIOS } from "./cardTransaction/mock-data";
import { CONTACT_RECORDS, CONTACT_SCENARIOS } from "./contact/mock-data";
import { PLAN_YEAR_HISTORY_RECORDS, PLAN_YEAR_RECORDS, PLAN_YEAR_SCENARIOS } from "./planYear/mock-data";
import { PLAN_YEAR_ENROLLMENT_MEMBER_RECORDS, PLAN_YEAR_ENROLLMENT_RECORDS, PLAN_YEAR_ENROLLMENT_SCENARIOS } from "./planYearEnrollment/mock-data";
import { REPORT_FOLDER_RECORDS, REPORT_RECORDS, REPORT_SCENARIOS } from "./report/mock-data";
import { CURRENT_USER_ID, USER_RECORDS } from "./user/mock-data";

/** Mock data of every object — read only by src/services (swap the services for Salesforce APIs later). */
export const SEED_RECORDS: Record<string, RecordData[]> = {
  Account: ACCOUNT_RECORDS,
  Contact: CONTACT_RECORDS,
  Claim: CLAIM_RECORDS,
  ClaimFile: CLAIM_FILE_RECORDS,
  Adjudication: ADJUDICATION_RECORDS,
  Accumulator: ACCUMULATOR_RECORDS,
  Report: REPORT_RECORDS,
  ReportFolder: REPORT_FOLDER_RECORDS,
  PlanYear: PLAN_YEAR_RECORDS,
  PlanYearHistory: PLAN_YEAR_HISTORY_RECORDS,
  PlanYearEnrollment: PLAN_YEAR_ENROLLMENT_RECORDS,
  PlanYearEnrollmentMember: PLAN_YEAR_ENROLLMENT_MEMBER_RECORDS,
  CardTransaction: CARD_TRANSACTION_RECORDS,
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
  ...CLAIM_SCENARIOS,
  ...REPORT_SCENARIOS,
  ...PLAN_YEAR_SCENARIOS,
  ...PLAN_YEAR_ENROLLMENT_SCENARIOS,
  ...CARD_TRANSACTION_SCENARIOS,
};
