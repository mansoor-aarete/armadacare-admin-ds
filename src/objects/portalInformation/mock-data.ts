import type { ConsoleScenario, RecordData } from "../../config/types";
import { userRef } from "../user/mock-data";

/* Portal informations from the Figma split view (PI1); the second record carries the captured values. */

export const PORTAL_INFO_1 = "a3PEc00000PINF0001";
const LOGIN_NOTICE = "a3PEc00000PINF0000";

export const PORTAL_INFORMATION_RECORDS: RecordData[] = [
  { id: LOGIN_NOTICE, values: { name: "Login Notice Test Name", title: "Test Login Notice Title", message: "Test Login Notice Msg" } },
  {
    id: PORTAL_INFO_1,
    values: {
      name: "Portal Info Name 1",
      owner: userRef("Deepak Malviya"),
      title: "Portal Info Name 1",
      message: "Portal Info Message 1 Portal Info Message 1 Portal Info Message 1",
      severity: "Info",
      displayLocation: "Dashboard",
      approvalStatus: "Approved",
      displayOrder: 1,
      isActive: true,
      isDismissible: true,
      startTime: "2026-09-08T12:00",
      endTime: "2026-09-09T22:00",
      createdBy: { by: userRef("Deepak Malviya"), at: "2026-09-09T11:12" },
      lastModifiedBy: { by: userRef("Deepak Malviya"), at: "2026-09-09T11:42" },
    },
  },
  { id: "a3PEc00000PINF0002", values: { name: "Portal Info Name 1", message: "Portal Infor message", severity: "Success" } },
  { id: "a3PEc00000PINF0003", values: { name: "Test", title: "diufbsjkdbgujbgkjsdbgrb", message: "Messga eksndvjksdfngiofdbkjfdnbkijfdbgidfnviodfg" } },
];

const view = (id: string) => `/lightning/r/PortalInformation/${id}/view`;

/** Console state of the Portal Informations screen (?scenario=PI1). */
export const PORTAL_INFORMATION_SCENARIOS: Record<string, ConsoleScenario> = {
  PI1: { tabs: [view(LOGIN_NOTICE), view(PORTAL_INFO_1)], url: view(PORTAL_INFO_1) },
};
