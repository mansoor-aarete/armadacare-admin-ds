import type { ConsoleScenario, RecordData } from "../../config/types";
import { userRef } from "../user/mock-data";

/*
 * Reports home from the Figma file (R1–R9): the 20 folders shared with me (+ "Public Reports"), the 16 reports of
 * "AH Sales & Marketing", the first 20 public reports, the 2 recent reports and the report tabs of R2 / R5 / R6 / R8.
 * Lightning counts more (105 folders, 1272 public reports); only the captured rows exist here.
 */

const user = (name: string) => userRef(name);
const FOLDER_IDS: Record<string, string> = {
  "0.0 Mogli SMS": "00lEc000F26F6295B9",
  "01 - Armada Membership Lists": "00lEc0001A30FF679C",
  "01 - Marketing Suppression Lists": "00lEc0001D697DD2A9",
  "2020 Snapshots": "00lEc0004FAFDA0B92",
  "Account Audit Points": "00lEc00078510FB947",
  "AH Sales": "00lEc00034B7D3E00B",
  "AH Sales & Marketing": "00lEc000E60F7D2740",
  "Apex package reports": "00lEc000C9B2B8A433",
  "Armada Accounting": "00lEc0004748483113",
  "Armada Administrators": "00lEc0001347764410",
  "Armada Campaign Summaries": "00lEc0008352855F03",
  "Armada Care": "00lEc000F9DD23E490",
  "Armada CBS": "00lEc0001E7FD08EA6",
  "Armada Claims": "00lEc000EC5BFB9CA8",
  "Armada Dashboard Reports": "00lEc000F91E5D1846",
  "Armada Drip Campaigns": "00lEc000BBDD00D613",
  "Armada EZ Ticket Reporting": "00lEc000C89C998F13",
  "Armada Health": "00lEc0006CF775DE20",
  "Armada Health Research": "00lEc0007DDE0EE969",
  "Armada Inside Sales": "00lEc000997384FE12",
  "Public Reports": "00lEc000PUBLICREPT",
};
const folder = (name: string) => ({ id: FOLDER_IDS[name], name, objectApiName: "ReportFolder" });

export const REPORT_FOLDER_RECORDS: RecordData[] = [
  { id: "00lEc000F26F6295B9", values: { name: "0.0 Mogli SMS", createdBy: user("Sujan Vanga"), createdDate: "2026-10-16T12:29", lastModifiedBy: user("Sujan Vanga"), lastModifiedDate: "2026-10-16T12:29", sharedWithMe: true } },
  { id: "00lEc0001A30FF679C", values: { name: "01 - Armada Membership Lists", createdBy: user("Marketing Cloud Administrator"), createdDate: "2025-01-21T22:26", lastModifiedBy: user("Marketing Cloud Administrator"), lastModifiedDate: "2025-01-21T22:26", sharedWithMe: true } },
  { id: "00lEc0001D697DD2A9", values: { name: "01 - Marketing Suppression Lists", createdBy: user("Marketing Cloud Administrator"), createdDate: "2025-01-21T20:32", lastModifiedBy: user("Marketing Cloud Administrator"), lastModifiedDate: "2025-01-21T21:54", sharedWithMe: true } },
  { id: "00lEc0004FAFDA0B92", values: { name: "2020 Snapshots", createdBy: user("Zach Ackerman"), createdDate: "2020-01-09T15:47", lastModifiedBy: user("Zach Ackerman"), lastModifiedDate: "2020-01-09T15:47", sharedWithMe: true } },
  { id: "00lEc00078510FB947", values: { name: "Account Audit Points", createdBy: user("Administrator Qualtrics"), createdDate: "2019-02-11T14:02", lastModifiedBy: user("Administrator Qualtrics"), lastModifiedDate: "2019-02-11T14:02", sharedWithMe: true } },
  { id: "00lEc00034B7D3E00B", values: { name: "AH Sales", createdBy: user("Zach Ackerman"), createdDate: "2018-05-14T15:16", lastModifiedBy: user("Zach Ackerman"), lastModifiedDate: "2018-05-14T15:16", sharedWithMe: true } },
  { id: "00lEc000E60F7D2740", values: { name: "AH Sales & Marketing", createdBy: user("Zach Ackerman"), createdDate: "2018-12-07T15:06", lastModifiedBy: user("Zach Ackerman"), lastModifiedDate: "2018-12-07T15:06", sharedWithMe: true } },
  { id: "00lEc000C9B2B8A433", values: { name: "Apex package reports", createdBy: user("Administrator Qualtrics"), createdDate: "2018-10-19T11:06", lastModifiedBy: user("Administrator Qualtrics"), lastModifiedDate: "2018-10-19T11:06", sharedWithMe: true } },
  { id: "00lEc0004748483113", values: { name: "Armada Accounting", createdBy: user("Suzanne Kirincic"), createdDate: "2015-02-09T13:49", lastModifiedBy: user("Administrator Qualtrics"), lastModifiedDate: "2019-07-29T12:22", sharedWithMe: true } },
  { id: "00lEc0001347764410", values: { name: "Armada Administrators", createdBy: user("Doug Adkins"), createdDate: "2015-02-11T16:38", lastModifiedBy: user("Doug Adkins"), lastModifiedDate: "2015-02-11T16:38", sharedWithMe: true } },
  { id: "00lEc0008352855F03", values: { name: "Armada Campaign Summaries", createdBy: user("Zach Ackerman"), createdDate: "2016-06-06T13:11", lastModifiedBy: user("Zach Ackerman"), lastModifiedDate: "2016-06-06T13:11", sharedWithMe: true } },
  { id: "00lEc000F9DD23E490", values: { name: "Armada Care", createdBy: user("System Admin"), createdDate: "2013-08-26T14:45", lastModifiedBy: user("Doug Adkins"), lastModifiedDate: "2015-02-11T16:38", sharedWithMe: true } },
  { id: "00lEc0001E7FD08EA6", values: { name: "Armada CBS", createdBy: user("Suzanne Kirincic"), createdDate: "2015-04-01T13:27", lastModifiedBy: user("Suzanne Kirincic"), lastModifiedDate: "2015-04-01T13:27", sharedWithMe: true } },
  { id: "00lEc000EC5BFB9CA8", values: { name: "Armada Claims", createdBy: user("Suzanne Kirincic"), createdDate: "2015-04-06T14:25", lastModifiedBy: user("Suzanne Kirincic"), lastModifiedDate: "2015-04-06T14:25", sharedWithMe: true } },
  { id: "00lEc000F91E5D1846", values: { name: "Armada Dashboard Reports", createdBy: user("Armada Avideon"), createdDate: "2014-07-02T17:33", lastModifiedBy: user("Armada Avideon"), lastModifiedDate: "2014-07-02T17:48", sharedWithMe: true } },
  { id: "00lEc000BBDD00D613", values: { name: "Armada Drip Campaigns", createdBy: user("Armada Administrator"), createdDate: "2016-03-18T16:16", lastModifiedBy: user("Armada Administrator"), lastModifiedDate: "2016-03-18T16:16", sharedWithMe: true } },
  { id: "00lEc000C89C998F13", values: { name: "Armada EZ Ticket Reporting", createdBy: user("Armada Avideon"), createdDate: "2015-05-18T07:56", lastModifiedBy: user("Armada Avideon"), lastModifiedDate: "2015-05-18T07:56", sharedWithMe: true } },
  { id: "00lEc0006CF775DE20", values: { name: "Armada Health", createdBy: user("System Admin"), createdDate: "2013-01-02T17:23", lastModifiedBy: user("Doug Adkins"), lastModifiedDate: "2015-02-11T16:37", sharedWithMe: true } },
  { id: "00lEc0007DDE0EE969", values: { name: "Armada Health Research", createdBy: user("Suzanne Kirincic"), createdDate: "2015-08-07T11:42", lastModifiedBy: user("Suzanne Kirincic"), lastModifiedDate: "2015-08-07T11:42", sharedWithMe: true } },
  { id: "00lEc000997384FE12", values: { name: "Armada Inside Sales", createdBy: user("Zach Ackerman"), createdDate: "2018-11-26T11:14", lastModifiedBy: user("Zach Ackerman"), lastModifiedDate: "2018-11-26T11:14", sharedWithMe: true } },
  { id: "00lEc000PUBLICREPT", values: { name: "Public Reports", createdBy: user("System Admin"), createdDate: "2013-01-02T17:23", lastModifiedBy: user("System Admin"), lastModifiedDate: "2013-01-02T17:23", sharedWithMe: false } },
];

export const REPORT_RECORDS: RecordData[] = [
  { id: "00OEc000005336F5F3", values: { name: "AH Accounts and Contacts", folder: folder("AH Sales & Marketing"), createdBy: user("Jennifer Best"), createdDate: "2018-12-07T09:49" } },
  { id: "00OEc0003F8DFEE360", values: { name: "AH Accounts and Contacts w MC Field", folder: folder("AH Sales & Marketing"), createdBy: user("Jennifer Best"), createdDate: "2018-12-20T10:26" } },
  { id: "00OEc000A7B89A1921", values: { name: "Lead Owner Erin Ehrlich", folder: folder("AH Sales & Marketing"), createdBy: user("Administrator Qualtrics"), createdDate: "2019-06-04T11:33" } },
  { id: "00OEc000C32B5A3F7B", values: { name: "Oppty Owner Erin Ehrlich", folder: folder("AH Sales & Marketing"), createdBy: user("Administrator Qualtrics"), createdDate: "2019-06-04T11:37" } },
  { id: "00OEc000999B92706D", values: { name: "Erin E Contacts", folder: folder("AH Sales & Marketing"), createdBy: user("Zach Ackerman"), createdDate: "2019-06-06T08:13" } },
  { id: "00OEc000692882A991", values: { name: "Active SCC PCP Members", folder: folder("AH Sales & Marketing"), createdBy: user("Zach Ackerman"), createdDate: "2019-06-10T16:14" } },
  { id: "00OEc000621187C914", values: { name: "USL Employees", folder: folder("AH Sales & Marketing"), createdBy: user("Jennifer Best"), createdDate: "2019-07-03T13:31" } },
  { id: "00OEc000F65188A447", values: { name: "Active TDC Members", folder: folder("AH Sales & Marketing"), createdBy: user("Zach Ackerman"), createdDate: "2019-06-10T16:15" } },
  { id: "00OEc000C65B6A6C15", values: { name: "Active SCC Members", folder: folder("AH Sales & Marketing"), createdBy: user("Zach Ackerman"), createdDate: "2019-06-10T16:13" } },
  { id: "00OEc000E2EEA8ECD2", values: { name: "Armada Employees", folder: folder("AH Sales & Marketing"), createdBy: user("Jennifer Best"), createdDate: "2019-08-20T15:19" } },
  { id: "00OEc0001112368C22", values: { name: "Hubspot Records Syncing", folder: folder("AH Sales & Marketing"), createdBy: user("Zach Ackerman"), createdDate: "2019-10-17T09:24" } },
  { id: "00OEc000447AD2549F", values: { name: "Health Oppty Vendor Account", folder: folder("AH Sales & Marketing"), createdBy: user("Jennifer Best"), createdDate: "2020-02-12T09:16" } },
  { id: "00OEc0004335A62828", values: { name: "Health Oppty Care Account", folder: folder("AH Sales & Marketing"), createdBy: user("Zach Ackerman"), createdDate: "2020-02-12T08:52" } },
  { id: "00OEc00080A5BAC250", values: { name: "AH Sales Activity", folder: folder("AH Sales & Marketing"), createdBy: user("Keith Schaub"), createdDate: "2020-03-03T14:10" } },
  { id: "00OEc0002ED277EA34", values: { name: "Hubspot Leads", folder: folder("AH Sales & Marketing"), createdBy: user("Zach Ackerman"), createdDate: "2020-09-11T08:20" } },
  { id: "00OEc0006696B8011E", values: { name: "Health Leads", folder: folder("AH Sales & Marketing"), createdBy: user("Zach Ackerman"), createdDate: "2018-02-11T13:32" } },
  { id: "00OEc000FEECF448F2", values: { name: "> 2/1 NeverBounce Active Clients & Mem", folder: folder("Public Reports"), createdBy: user("Emily Ellerman"), createdDate: "2026-01-29T11:26" } },
  { id: "00OEc000F96BFB019C", values: { name: "> 2/1 NeverBounce Active Clients w PGC", folder: folder("Public Reports"), createdBy: user("Emily Ellerman"), createdDate: "2026-01-29T11:16" } },
  { id: "00OEc0005463DE45B1", values: { name: ">=10/1/25 Opportunities", folder: folder("Public Reports"), createdBy: user("Emily Ellerman"), createdDate: "2025-09-30T14:45" } },
  { id: "00OEc000C61B39028B", values: { name: "1-1-22 Sirius Transition Groups", description: "01/01/2022 Sirius Groups Eligible for Sirius Transition with Transition Status 'Accepted'", folder: folder("Public Reports"), createdBy: user("Christina Swetz"), createdDate: "2021-10-28T13:25" } },
  { id: "00OEc000F0E92F73FF", values: { name: "1/1 Covid Rate Relief Requests", folder: folder("Public Reports"), createdBy: user("Jessica Cheng"), createdDate: "2020-10-19T09:51" } },
  { id: "00OEc000DE646C0B9E", values: { name: "1/1 Groups in Save", folder: folder("Public Reports"), createdBy: user("Marsha Saul"), createdDate: "2019-12-31T12:53" } },
  { id: "00OEc0007D444A79CA", values: { name: "1/1 Groups Save for 1/1 Readiness Meetin", folder: folder("Public Reports"), createdBy: user("Marsha Saul"), createdDate: "2019-12-10T12:37" } },
  { id: "00OEc000A31927D747", values: { name: "1/1 Groups to go on Claims Hold", folder: folder("Public Reports"), createdBy: user("Marsha Saul"), createdDate: "2018-12-31T11:56" } },
  { id: "00OEc0005FF0A42E6D", values: { name: "1/1 NY Terms", folder: folder("Public Reports"), createdBy: user("Jessica Cheng"), createdDate: "2020-12-29T15:30" } },
  { id: "00OEc00015E58C2BFF", values: { name: "1/1 O/S Renewals - Nikki", folder: folder("Public Reports"), createdBy: user("Nicole LaGrega"), createdDate: "2020-12-17T14:14" } },
  { id: "00OEc000BA1DB4484B", values: { name: "1/1 Outstanding renewals - Jess", folder: folder("Public Reports"), createdBy: user("Jessica Cheng"), createdDate: "2020-12-17T10:47" } },
  { id: "00OEc00048BE466CAD", values: { name: "1/1/2023 Round 1 CBS Renewal Release", folder: folder("Public Reports"), createdBy: user("Huntley Mitchell"), createdDate: "2022-09-29T15:59" } },
  { id: "00OEc0009692DD5E41", values: { name: "1/1/21 Outstanding Renewals", folder: folder("Public Reports"), createdBy: user("Jessica Cheng"), createdDate: "2020-12-29T09:51" } },
  { id: "00OEc0006E33003751", values: { name: "1/1/21 Transition Readiness for Reportin", folder: folder("Public Reports"), createdBy: user("Marsha Saul"), createdDate: "2020-12-16T14:11" } },
  { id: "00OEc0009E321EB2F5", values: { name: "1/1/23 non ACH non verbal groups", folder: folder("Public Reports"), createdBy: user("Huntley Mitchell"), createdDate: "2022-12-30T10:03" } },
  { id: "00OEc0009AF875FEC9", values: { name: "1/1/26 Sold Groups w Agency", folder: folder("Public Reports"), createdBy: user("Emily Ellerman"), createdDate: "2026-02-12T11:51" } },
  { id: "00OEc0004BEE030C61", values: { name: "12/1/20 Renewal Report - Zoe Edit", folder: folder("Public Reports"), createdBy: user("Zoe Hatzes"), createdDate: "2020-12-07T14:28" } },
  { id: "00OEc000D64EAE2215", values: { name: "12/1/25 Ops", folder: folder("Public Reports"), createdBy: user("Emily Ellerman"), createdDate: "2025-08-04T11:26" } },
  { id: "00OEc000388EEF98BA", values: { name: "2/1/25 Enrollment Report", folder: folder("Public Reports"), createdBy: user("Emily Ellerman"), createdDate: "2025-04-24T09:52" } },
  { id: "00OEc0001F69BEDE4C", values: { name: "2018 FY CC Sales", folder: folder("Public Reports"), createdBy: user("Marsha Saul"), createdDate: "2019-04-05T14:40" } },
  { id: "00OEc0001540F74168", values: { name: "Account Census Data", folder: folder("Public Reports"), createdBy: user("Administrator Qualtrics"), createdDate: "2021-06-21T19:12", recent: true } },
  { id: "00OEc000FCFC148E47", values: { name: "Medical Plans", folder: folder("Public Reports"), createdBy: user("Administrator Qualtrics"), createdDate: "2021-06-21T18:56", recent: true } },
  { id: "00OEc00059C5D78528", values: { name: "$ Pipeline By Campaign", folder: folder("Public Reports"), createdBy: user("Administrator Qualtrics"), createdDate: "2021-06-21T18:40" } },
];

const REPORT_IDS: Record<string, string> = Object.fromEntries(REPORT_RECORDS.map((r) => [String(r.values.name), r.id]));
const report = (name: string) => `/lightning/r/Report/${REPORT_IDS[name]}/view`;
const ALL_FOLDERS = "/lightning/o/Report/list?filterName=allFolders";
const AH_FOLDER = `/lightning/r/ReportFolder/${FOLDER_IDS["AH Sales & Marketing"]}/view`;

/** Console states of the Reports screens (?scenario=R1 … R9). */
export const REPORT_SCENARIOS: Record<string, ConsoleScenario> = {
  R1: { tabs: [], url: "/lightning/o/Report/list?filterName=sharedWithMe" },
  R2: { tabs: [ALL_FOLDERS, AH_FOLDER, report("AH Accounts and Contacts")], url: report("AH Accounts and Contacts") },
  R3: { tabs: [ALL_FOLDERS, AH_FOLDER], url: AH_FOLDER },
  R4: { tabs: [ALL_FOLDERS], url: ALL_FOLDERS },
  R5: { tabs: [report("$ Pipeline By Campaign"), report("1-1-22 Sirius Transition Groups")], url: report("1-1-22 Sirius Transition Groups") },
  R6: { tabs: [report("> 2/1 NeverBounce Active Clients & Mem")], url: report("> 2/1 NeverBounce Active Clients & Mem") },
  R7: { tabs: [], url: "/lightning/o/Report/list?filterName=public" },
  R8: { tabs: [report("Account Census Data")], url: report("Account Census Data") },
  R9: { tabs: [], url: "/lightning/o/Report/list?filterName=recent" },
};
