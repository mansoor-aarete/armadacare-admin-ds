import type { ConsoleScenario, RecordData } from "../../config/types";
import { ENROLLMENT_CONTACT_IDS } from "../contact/mock-data";
import { PLAN_YEAR_IDS } from "../planYear/mock-data";
import { userRef } from "../user/mock-data";

/*
 * Plan Year Enrollments from the Figma file (E1, E2): the 10 split-view rows, PYE-0000001 (Active, 2 members) and
 * PYE-0000114 (Terminated, no members).
 */

const contact = (k: keyof typeof ENROLLMENT_CONTACT_IDS, name: string) => ({ id: ENROLLMENT_CONTACT_IDS[k], name, objectApiName: "Contact" });
const planYear = (name: keyof typeof PLAN_YEAR_IDS) => ({ id: PLAN_YEAR_IDS[name], name, objectApiName: "PlanYear" });
const tier = (name: string) => ({ id: `a7LEc0000${name.slice(-6)}`, name, objectApiName: "PlanYearTier" });

export const PYE_1 = "a1EEc00000PYE00001";
export const PYE_114 = "a1EEc00000PYE00114";

export const PLAN_YEAR_ENROLLMENT_RECORDS: RecordData[] = [
  ...["0000000", "0000002", "0000003", "0000004", "0000005", "0000006", "0000356", "0000479"].map((n) => ({ id: `a1EEc00000PYE${n.slice(2)}`, values: { name: `PYE-${n}` } })),
  {
    id: PYE_1,
    values: {
      name: "PYE-0000001",
      owner: userRef("Feng Yue"),
      effectiveDate: "2026-01-01",
      planYearTier: tier("a7LEc00000TIcXb"),
      planYear: planYear("2026 Meridian"),
      status: "Active",
      subscriber: contact("sofia", "Sofia Martinez"),
      createdBy: { by: userRef("Feng Yue"), at: "2026-04-19T09:50" },
      lastModifiedBy: { by: userRef("Feng Yue"), at: "2026-04-19T09:50" },
    },
  },
  {
    id: PYE_114,
    values: {
      name: "PYE-0000114",
      owner: userRef("Varsha Salunke"),
      effectiveDate: "2026-01-01",
      planYearTier: tier("a7LEc00000TIcXe"),
      planYear: planYear("test vs"),
      status: "Terminated",
      subscriber: contact("vs", "vsfirst1 vslast1"),
      createdBy: { by: userRef("Varsha Salunke"), at: "2026-08-27T03:51" },
      lastModifiedBy: { by: userRef("Varsha Salunke"), at: "2026-10-19T04:54" },
    },
  },
];

const enrollment = { id: PYE_1, name: "PYE-0000001", objectApiName: "PlanYearEnrollment" };
export const PLAN_YEAR_ENROLLMENT_MEMBER_RECORDS: RecordData[] = [
  { id: "a1MEc00000PYEM0004", values: { name: "PYEM-0000004", member: contact("sofia", "Sofia Martinez"), subscriber: contact("sofia", "Sofia Martinez"), status: "Active", enrollment } },
  { id: "a1MEc00000PYEM0005", values: { name: "PYEM-0000005", member: contact("carlos", "Carlos Martinez"), subscriber: contact("sofia", "Sofia Martinez"), status: "Active", enrollment } },
];

const view = (id: string) => `/lightning/r/PlanYearEnrollment/${id}/view`;

/** Console states of the Plan Year Enrollments screens (?scenario=E1, E2). */
export const PLAN_YEAR_ENROLLMENT_SCENARIOS: Record<string, ConsoleScenario> = {
  E1: { tabs: [view(PYE_1), view(PYE_114)], url: view(PYE_1) },
  E2: { tabs: [view(PYE_1), view(PYE_114)], url: view(PYE_114) },
};
