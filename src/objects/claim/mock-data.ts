import type { ConsoleScenario, FieldValue, RecordData } from "../../config/types";
import { CHEN_IDS } from "../contact/mock-data";
import { userRef } from "../user/mock-data";

/*
 * Claims from the Figma file: the 50 rows of the "All" split view (+3 so the list says "50+"), full values for
 * CLM-0000023 (Pending Review, CL2–CL3) and CLM-0000020 (Approved, CL4–CL8), their files, adjudication history and
 * the Chen family accumulator balances.
 */

const CHEN_NAMES: Record<keyof typeof CHEN_IDS, string> = { david: "David Chen", lisa: "Lisa Chen", natasha: "Natasha Chen", ryan: "Ryan Chen" };
const chen = (k: keyof typeof CHEN_IDS) => ({ id: CHEN_IDS[k], name: CHEN_NAMES[k], objectApiName: "Contact" });
/** Plan Year "2026 Meridian" (the Plan Years section uses the same id). */
export const PLAN_YEAR_2026_MERIDIAN = "a1PEc00000PY26MER1";
const meridian = { id: PLAN_YEAR_2026_MERIDIAN, name: "2026 Meridian", objectApiName: "PlanYear" };

export const CLM_20 = "a0CEc00000000020AA";
export const CLM_23 = "a0CEc00000000023AA";

const COMMON: Record<string, FieldValue> = {
  intakeChannel: "Member Portal",
  submissionSource: "Member Submitted",
  owner: userRef("Feng Yue"),
  isEscalated: false,
  isSlaBreached: false,
  isDueToday: false,
  isWorkComplete: false,
  isSlaBreachedNum: 0,
  isDueTodayNum: 0,
  placeOnHold: false,
  planYear: meridian,
  subscriber: chen("david"),
  createdBy: { by: userRef("Feng Yue"), at: "2026-04-19T15:33" },
};

const DETAILS: Record<string, Record<string, FieldValue>> = {
  [CLM_23]: {
    ...COMMON,
    member: chen("lisa"),
    dateOfService: "2026-03-20",
    providerName: "Dental Associates of Chicago",
    expenseType: { id: "a1XEc00000PYET0009", name: "PYET-0000009", objectApiName: "PlanYearExpenseType" },
    expenseCategory: "Dental",
    expenseTypeName: "Restorative Dental",
    billedAmount: 675,
    dateReceived: "2026-03-25",
    ageInDays: 210,
    lastModifiedBy: { by: userRef("Feng Yue"), at: "2026-04-19T15:33" },
  },
  [CLM_20]: {
    ...COMMON,
    member: chen("david"),
    dateOfService: "2026-01-15",
    providerName: "Northwestern Medicine",
    description: "JSK Description",
    expenseType: { id: "a1XEc00000PYET0000", name: "PYET-0000000", objectApiName: "PlanYearExpenseType" },
    expenseCategory: "Medical Cost-Sharing",
    expenseTypeName: "Copay",
    billedAmount: 350,
    dateReceived: "2026-01-20",
    draftExpiryDate: "2026-05-29",
    ageInDays: 274,
    netDeductibleApplied: 350,
    netCoinsuranceAmount: 0,
    netBenefitPaid: 0,
    lastModifiedBy: { by: userRef("Mehul Rathod"), at: "2026-06-09T05:27" },
  },
};

const LIST: RecordData[] = [
  { id: "a0CEc00000000020AA", values: { name: "CLM-0000020", status: "Approved" } },
  { id: "a0CEc00000000021AA", values: { name: "CLM-0000021", status: "Approved" } },
  { id: "a0CEc00000000022AA", values: { name: "CLM-0000022", status: "Approved" } },
  { id: "a0CEc00000000023AA", values: { name: "CLM-0000023", status: "Pending Review" } },
  { id: "a0CEc00000000024AA", values: { name: "CLM-0000024", status: "Approved" } },
  { id: "a0CEc00000000025AA", values: { name: "CLM-0000025", status: "Approved" } },
  { id: "a0CEc00000000026AA", values: { name: "CLM-0000026", status: "Denied" } },
  { id: "a0CEc00000000027AA", values: { name: "CLM-0000027", status: "Pending Information" } },
  { id: "a0CEc00000000028AA", values: { name: "CLM-0000028", status: "Expired" } },
  { id: "a0CEc00000000029AA", values: { name: "CLM-0000029", status: "Expired" } },
  { id: "a0CEc00000000030AA", values: { name: "CLM-0000030", status: "Request More Information (RMI)" } },
  { id: "a0CEc00000000031AA", values: { name: "CLM-0000031", status: "Approved" } },
  { id: "a0CEc00000000032AA", values: { name: "CLM-0000032", status: "Auto Approved" } },
  { id: "a0CEc00000000033AA", values: { name: "CLM-0000033", status: "Approved" } },
  { id: "a0CEc00000000034AA", values: { name: "CLM-0000034", status: "Approved" } },
  { id: "a0CEc00000000035AA", values: { name: "CLM-0000035", status: "Pending Review" } },
  { id: "a0CEc00000000036AA", values: { name: "CLM-0000036", status: "Approved" } },
  { id: "a0CEc00000000037AA", values: { name: "CLM-0000037", status: "Approved" } },
  { id: "a0CEc00000000038AA", values: { name: "CLM-0000038", status: "Pending Review" } },
  { id: "a0CEc00000000039AA", values: { name: "CLM-0000039", status: "Denied" } },
  { id: "a0CEc00000000040AA", values: { name: "CLM-0000040", status: "Approved" } },
  { id: "a0CEc00000000041AA", values: { name: "CLM-0000041", status: "Paid" } },
  { id: "a0CEc00000000054AA", values: { name: "CLM-0000054", status: "Expired" } },
  { id: "a0CEc00000000057AA", values: { name: "CLM-0000057", status: "Request More Information (RMI)" } },
  { id: "a0CEc00000000059AA", values: { name: "CLM-0000059", status: "Approved" } },
  { id: "a0CEc00000000060AA", values: { name: "CLM-0000060", status: "Expired" } },
  { id: "a0CEc00000000061AA", values: { name: "CLM-0000061", status: "Approved" } },
  { id: "a0CEc00000000062AA", values: { name: "CLM-0000062", status: "Approved" } },
  { id: "a0CEc00000000063AA", values: { name: "CLM-0000063", status: "Pending Review" } },
  { id: "a0CEc00000000064AA", values: { name: "CLM-0000064", status: "Pending Review" } },
  { id: "a0CEc00000000065AA", values: { name: "CLM-0000065", status: "Approved" } },
  { id: "a0CEc00000000066AA", values: { name: "CLM-0000066", status: "Pending Review" } },
  { id: "a0CEc00000000067AA", values: { name: "CLM-0000067", status: "Approved" } },
  { id: "a0CEc00000000068AA", values: { name: "CLM-0000068", status: "Pending Reimbursement (PRB)" } },
  { id: "a0CEc00000000069AA", values: { name: "CLM-0000069", status: "Pending Review" } },
  { id: "a0CEc00000000071AA", values: { name: "CLM-0000071", status: "In Review" } },
  { id: "a0CEc00000000074AA", values: { name: "CLM-0000074", status: "Approved" } },
  { id: "a0CEc00000000081AA", values: { name: "CLM-0000081", status: "Expired" } },
  { id: "a0CEc00000000082AA", values: { name: "CLM-0000082", status: "Expired" } },
  { id: "a0CEc00000000085AA", values: { name: "CLM-0000085", status: "Expired" } },
  { id: "a0CEc00000000089AA", values: { name: "CLM-0000089", status: "Pending Information" } },
  { id: "a0CEc00000000090AA", values: { name: "CLM-0000090", status: "Partial Pay" } },
  { id: "a0CEc00000000091AA", values: { name: "CLM-0000091", status: "Pending Review" } },
  { id: "a0CEc00000000092AA", values: { name: "CLM-0000092", status: "Pending Review" } },
  { id: "a0CEc00000000093AA", values: { name: "CLM-0000093", status: "Applied" } },
  { id: "a0CEc00000000095AA", values: { name: "CLM-0000095", status: "Pending Review" } },
  { id: "a0CEc00000000097AA", values: { name: "CLM-0000097", status: "Pending Review" } },
  { id: "a0CEc00000000101AA", values: { name: "CLM-0000101", status: "In Review" } },
  { id: "a0CEc00000000102AA", values: { name: "CLM-0000102", status: "In Review" } },
  { id: "a0CEc00000000104AA", values: { name: "CLM-0000104", status: "In Review" } },
  { id: "a0CEc00000000105AA", values: { name: "CLM-0000105", status: "In Review" } },
  { id: "a0CEc00000000106AA", values: { name: "CLM-0000106", status: "Pending Review" } },
  { id: "a0CEc00000000107AA", values: { name: "CLM-0000107", status: "Approved" } },
];

export const CLAIM_RECORDS: RecordData[] = LIST.map((r) => ({ ...r, values: { ...r.values, ...(DETAILS[r.id] ?? {}) } }));

const claim = (id: string, name: string) => ({ id, name, objectApiName: "Claim" });

export const CLAIM_FILE_RECORDS: RecordData[] = [
  {
    id: "069Ec00000FILE0001",
    values: { title: "Screenshot 2026-05-27 194641", uploadedDate: "2026-05-27", size: "37KB", fileType: "png", claim: claim(CLM_20, "CLM-0000020") },
  },
];

export const ADJUDICATION_RECORDS: RecordData[] = [
  { id: "a0BEc00000ADJ00001", values: { name: "ADJ-0000001", adjudicationDate: "2026-01-20T10:00", adjudicationStatus: "Approved", claim: claim(CLM_20, "CLM-0000020") } },
];

/** Identical on both claims: the balances belong to the subscriber's family. */
export const ACCUMULATOR_RECORDS: RecordData[] = [
  { id: "a0AEc00000ACC00000", values: { member: chen("david"), type: "Deductible", level: "Individual", category: "Mental Health", used: 971.0, remaining: 1029.0, limit: 2000.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00001", values: { member: chen("david"), type: "Deductible", level: "Family", used: 3000.0, remaining: 0.0, limit: 3000.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00002", values: { member: chen("david"), type: "Benefit Cap", level: "Individual", category: "Dental Treatments", used: 3000.0, remaining: 0.0, limit: 3000.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00003", values: { member: chen("david"), type: "Benefit Cap", level: "Individual", category: "Vision Treatments", used: 947.57, remaining: 552.43, limit: 1500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00004", values: { member: chen("david"), type: "Benefit Cap", level: "Individual", category: "Covered Medical Expenses", used: 999.0, remaining: 0.0, limit: 999.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00005", values: { member: chen("david"), type: "Benefit Cap", level: "Individual", category: "Mental Health", used: 2001.6, remaining: 5498.4, limit: 7500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00006", values: { member: chen("david"), type: "Family Maximum", level: "Family", used: 26303.09, remaining: 1473807.91, limit: 1500111.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00007", values: { member: chen("lisa"), type: "Deductible", level: "Individual", used: 550.0, remaining: 950.0, limit: 1500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00008", values: { member: chen("lisa"), type: "Benefit Cap", level: "Individual", category: "Dental Treatments", used: 0.0, remaining: 3000.0, limit: 3000.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00009", values: { member: chen("lisa"), type: "Benefit Cap", level: "Individual", category: "Vision Treatments", used: 0.0, remaining: 1500.0, limit: 1500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00010", values: { member: chen("lisa"), type: "Benefit Cap", level: "Individual", category: "Mental Health", used: 0.0, remaining: 7500.0, limit: 7500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00011", values: { member: chen("natasha"), type: "Deductible", level: "Individual", used: 0.0, remaining: 1500.0, limit: 1500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00012", values: { member: chen("natasha"), type: "Benefit Cap", level: "Individual", category: "Dental Treatments", used: 200.0, remaining: 2800.0, limit: 3000.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00013", values: { member: chen("natasha"), type: "Benefit Cap", level: "Individual", category: "Vision Treatments", used: 0.0, remaining: 1500.0, limit: 1500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00014", values: { member: chen("natasha"), type: "Benefit Cap", level: "Individual", category: "Mental Health", used: 0.0, remaining: 7500.0, limit: 7500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00015", values: { member: chen("ryan"), type: "Deductible", level: "Individual", used: 0.0, remaining: 1500.0, limit: 1500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00016", values: { member: chen("ryan"), type: "Benefit Cap", level: "Individual", category: "Mental Health", used: 0.0, remaining: 7500.0, limit: 7500.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00017", values: { member: chen("ryan"), type: "Benefit Cap", level: "Individual", category: "Dental Treatments", used: 200.0, remaining: 2800.0, limit: 3000.0, subscriber: chen("david") } },
  { id: "a0AEc00000ACC00018", values: { member: chen("ryan"), type: "Benefit Cap", level: "Individual", category: "Vision Treatments", used: 455.2, remaining: 1044.8, limit: 1500.0, subscriber: chen("david") } },
];

const view = (id: string) => `/lightning/r/Claim/${id}/view`;

/** Console states of the Claims screens (?scenario=CL1 … CL8). `state=error` shows the captured Benefit Snapshot error. */
export const CLAIM_SCENARIOS: Record<string, ConsoleScenario> = {
  CL1: { tabs: [], url: "/lightning/o/Claim/list" },
  CL2: { tabs: [view(CLM_20), view(CLM_23)], url: `${view(CLM_23)}?tab=auditSystem&state=error`, listUpdatedMinutesAgo: 2 },
  CL3: { tabs: [view(CLM_20), view(CLM_23)], url: `${view(CLM_23)}?state=error`, listUpdatedMinutesAgo: 1 },
  CL4: { tabs: [view(CLM_20)], url: `${view(CLM_20)}?tab=auditSystem&state=error`, listUpdatedMinutesAgo: 1 },
  CL5: { tabs: [view(CLM_20)], url: `${view(CLM_20)}?action=delete&state=error`, listUpdatedMinutesAgo: 1 },
  CL6: { tabs: [view(CLM_20)], url: `${view(CLM_20)}?action=repaymentRecovery&state=error`, listUpdatedMinutesAgo: 1 },
  CL7: { tabs: [view(CLM_20)], url: `${view(CLM_20)}?action=splitApproval&state=error`, listUpdatedMinutesAgo: 1 },
  CL8: { tabs: [view(CLM_20)], url: `${view(CLM_20)}?state=error` },
};
