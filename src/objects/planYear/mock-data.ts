import type { ConsoleScenario, FieldValue, RecordData } from "../../config/types";
import { userRef } from "../user/mock-data";

/*
 * Plan Years from the Figma file (PY1–PY3): the 27 rows of the "All" split view, captured values of
 * 2026 Meridian and 2026 Double Platinum, and the six Plan Year History rows of 2026 Meridian.
 */

const account = (id: string, name: string) => ({ id, name, objectApiName: "Account" });
const plan = (name: string) => ({ id: `a1QEc0000${name.replace(/\W/g, "").slice(0, 9).toUpperCase()}`, name, objectApiName: "Plan" });

const COMMON: Record<string, FieldValue> = {
  deductibleApplicationType: "Full Policy",
  deductibleRule: "Reset on Break",
  draftClaimExpiryDays: 30,
  draftExpiryReminderDays: 7,
  startDate: "2026-01-01",
  status: "Active",
  validEndDate: "2026-12-31",
  runOutDays: 30,
  renewalType: "Manual",
};
const MERIDIAN: Record<string, FieldValue> = {
  ...COMMON,
  annualFamilyMaximum: 15500,
  endDate: "2026-10-10",
  planYearLabel: "2026 Meridian",
  plan: plan("Ultimate Health Diamond"),
  group: account("001Ec0000557Dc8133", "ArmadaCare"),
  createdBy: { by: userRef("Feng Yue"), at: "2026-04-19T09:50" },
  lastModifiedBy: { by: userRef("Deepak Malviya"), at: "2026-10-08T10:40" },
};
const DOUBLE_PLATINUM: Record<string, FieldValue> = {
  ...COMMON,
  annualFamilyMaximum: 25000,
  endDate: "2026-12-31",
  planYearLabel: "2026 Double Platinum",
  plan: plan("Double Platinum"),
  group: account("001Ec000031d01937c", "HVAC and Associates"),
  createdBy: { by: userRef("Adner Ramos"), at: "2026-10-13T22:53" },
  lastModifiedBy: { by: userRef("Adner Ramos"), at: "2026-10-20T09:38" },
};

export const PLAN_YEAR_RECORDS: RecordData[] = [
  { id: "a1PEc00053C16D65D0", values: { name: "2025" } },
  { id: "a1PEc000C483E96A62", values: { ...DOUBLE_PLATINUM, name: "2026 Double Platinum" } },
  { id: "a1PEc00000PY26MER1", values: { ...MERIDIAN, name: "2026 Meridian" } },
  { id: "a1PEc0004B3BE5B460", values: { name: "2026 Ultimate Health Diamond Plus" } },
  { id: "a1PEc00067AA32A1A8", values: { name: "2027" } },
  { id: "a1PEc00020FB7D3F4C", values: { name: "a18Ec00000BbICX" } },
  { id: "a1PEc00078620D6044", values: { name: "a18Ec00000BbICX" } },
  { id: "a1PEc00025216F7C2B", values: { name: "a18Ec00000BbICX" } },
  { id: "a1PEc000812092AD18", values: { name: "a18Ec00000BbICX" } },
  { id: "a1PEc000E0D1338F40", values: { name: "a18Ec00000BbICX test" } },
  { id: "a1PEc0006B04938103", values: { name: "a18Ec00000FNxMv" } },
  { id: "a1PEc000A3F990FC48", values: { name: "Akshay Test Plan Year" } },
  { id: "a1PEc000376459C7F1", values: { name: "DK test" } },
  { id: "a1PEc00012F329AFC7", values: { name: "DK test 2" } },
  { id: "a1PEc0004A4884A6CC", values: { name: "DK test 3" } },
  { id: "a1PEc000730F47B06B", values: { name: "JP Test V1 2026" } },
  { id: "a1PEc000A871022DDF", values: { name: "JP Test2" } },
  { id: "a1PEc000E491494EBF", values: { name: "Plan Year SAL-992" } },
  { id: "a1PEc000ED3069DA15", values: { name: "PY 2026 Ultimate Health AR Plus" } },
  { id: "a1PEc000D0C57C6FC2", values: { name: "PY1" } },
  { id: "a1PEc0000C043F9DE4", values: { name: "Test" } },
  { id: "a1PEc0009ABC1839A8", values: { name: "Test" } },
  { id: "a1PEc00042FDD234A9", values: { name: "Test Mak 2026 11" } },
  { id: "a1PEc000E4430A4046", values: { name: "test vs" } },
  { id: "a1PEc0008E43487521", values: { name: "Test1" } },
  { id: "a1PEc000D90BCAFED3", values: { name: "Test2" } },
  { id: "a1PEc000BD334EDFF0", values: { name: "Test3" } },
];

export const PLAN_YEAR_IDS = {
  "2025": "a1PEc00053C16D65D0",
  "2026 Double Platinum": "a1PEc000C483E96A62",
  "2026 Meridian": "a1PEc00000PY26MER1",
  "2026 Ultimate Health Diamond Plus": "a1PEc0004B3BE5B460",
  "2027": "a1PEc00067AA32A1A8",
  "a18Ec00000BbICX": "a1PEc00020FB7D3F4C",
  "a18Ec00000BbICX test": "a1PEc000E0D1338F40",
  "a18Ec00000FNxMv": "a1PEc0006B04938103",
  "Akshay Test Plan Year": "a1PEc000A3F990FC48",
  "DK test": "a1PEc000376459C7F1",
  "DK test 2": "a1PEc00012F329AFC7",
  "DK test 3": "a1PEc0004A4884A6CC",
  "JP Test V1 2026": "a1PEc000730F47B06B",
  "JP Test2": "a1PEc000A871022DDF",
  "Plan Year SAL-992": "a1PEc000E491494EBF",
  "PY 2026 Ultimate Health AR Plus": "a1PEc000ED3069DA15",
  "PY1": "a1PEc000D0C57C6FC2",
  "Test": "a1PEc0000C043F9DE4",
  "Test Mak 2026 11": "a1PEc00042FDD234A9",
  "test vs": "a1PEc000E4430A4046",
  "Test1": "a1PEc0008E43487521",
  "Test2": "a1PEc000D90BCAFED3",
  "Test3": "a1PEc000BD334EDFF0",
} as const;
const meridian = { id: PLAN_YEAR_IDS["2026 Meridian"], name: "2026 Meridian", objectApiName: "PlanYear" };
const history = (n: number, date: string, field: string, user: string, from: string, to: string): RecordData => ({
  id: `017Ec00000PYH0000${n}`,
  values: { date, field, user: userRef(user), originalValue: from, newValue: to, planYear: meridian },
});
export const PLAN_YEAR_HISTORY_RECORDS: RecordData[] = [
  history(1, "2026-10-08T10:40", "End Date", "Deepak Malviya", "8/17/2026", "10/10/2026"),
  history(2, "2026-10-08T10:32", "End Date", "Deepak Malviya", "10/10/2026", "8/17/2026"),
  history(3, "2026-10-08T10:17", "End Date", "Deepak Malviya", "8/17/2026", "10/10/2026"),
  history(4, "2026-10-08T10:02", "Plan Year Label", "Deepak Malviya", "2026 Meridiana", "2026 Meridian"),
  history(5, "2026-10-08T10:01", "Plan Year Label", "Deepak Malviya", "2026 Meridian", "2026 Meridiana"),
  history(6, "2026-10-07T09:53", "Plan", "Tanmoy Das", "Test123456", "Ultimate Health Diamond"),
];

const view = (name: keyof typeof PLAN_YEAR_IDS) => `/lightning/r/PlanYear/${PLAN_YEAR_IDS[name]}/view`;

/** Console states of the Plan Years screens (?scenario=PY1 … PY3). */
export const PLAN_YEAR_SCENARIOS: Record<string, ConsoleScenario> = {
  PY1: {
    tabs: [view("2025"), view("2026 Double Platinum"), view("Akshay Test Plan Year"), view("2026 Meridian"), view("2026 Ultimate Health Diamond Plus")],
    url: `${view("2026 Meridian")}?tab=related`,
  },
  PY2: {
    tabs: [view("2025"), view("2026 Double Platinum"), view("Akshay Test Plan Year"), view("2026 Meridian"), view("2026 Ultimate Health Diamond Plus")],
    url: `${view("2026 Meridian")}?tab=details`,
  },
  PY3: { tabs: [view("2025"), view("2026 Double Platinum")], url: `${view("2026 Double Platinum")}?tab=details` },
};
