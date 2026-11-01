import type { ConsoleScenario, LookupValue, RecordData } from "../../config/types";
import { userRef } from "../user/mock-data";
import type { MemberType } from "./types";

/*
 * Search index of the Participant page (Figma P4 / P5): one row per result the custom search returns, linked to the
 * record it opens. Participants link to Contacts — the ones the Contacts mock data does not have yet are added as
 * Contacts here (PARTICIPANT_CONTACTS). Employers link to the existing Accounts.
 */

const contactRef = (id: string, name: string): LookupValue => ({ id, name, objectApiName: "Contact" });
const accountRef = (id: string, name: string): LookupValue => ({ id, name, objectApiName: "Account" });

/** Contacts already in src/objects/contact/mock-data.ts. */
const KNOWN_CONTACTS: Record<string, string> = {
  "Alexa Ackerman": "003Ec0000651B8Fe29",
  "Zachary Ackerman": "003Ec00008D89bC476",
  "Angela Alley": "003Ec000009dB27d55",
  "Kevin Alley": "003Ec000010dD9Cd41",
  "Aarav Aramanai": "003Ec0000bB8A527B1",
  "Aaron Ash": "003Ec0000bD67f2908",
  "Michael Ash": "003Ec000014031A9Aa",
};

type ParticipantRow = [lastName: string, firstName: string, memberType: MemberType, employeeNumber: string, ssn: string, employer: string, dependentName: string, email: string];

/** P4 / P7 results (Last Name "A"), in captured order. */
const PARTICIPANTS: ParticipantRow[] = [
  ["Abate", "Mary Ann", "Dependent", "", "*******4288", "E&J Gallo Winery Ret 65P", "", ""],
  ["Abate", "Peter", "Member", "", "*******7851", "E&J Gallo Winery Ret 65P", "Mary Ann Abate (Spouse)", "pete.abate@outlook.com"],
  ["Ackerman", "Alexa", "Dependent", "", "*******1621", "ArmadaCare", "", "alexa.curley@gmail.com"],
  ["Ackerman", "Palmer G", "Dependent", "", "", "ArmadaCare", "", ""],
  ["Ackerman", "Reagan A", "Dependent", "", "", "ArmadaCare", "", ""],
  ["Ackerman", "Zachary", "Member", "", "*******0224", "ArmadaCare", "Alexa Ackerman (Spouse), Palmer G Ackerman (Dependent), Reagan A Ackerman (Dependent)", "zachackerman48@gmail.com"],
  ["Aiello", "Maria", "Member", "", "*******1094", "ArmadaCare", "", "maiello@armadacare.com"],
  ["Aiello", "Samantha", "Member", "", "*******5378", "ArmadaCare", "", "saiello@armadacare.com"],
  ["Allen", "Emma", "Dependent", "", "", "Unifi Aviation, LLC", "", ""],
  ["Allen", "Hayden", "Member", "U5419313101", "*******6759", "Unifi Aviation, LLC", "Emma Allen (Spouse), Sloane Allen (Dependent)", "hayden.allen@unifiservice.com"],
  ["Allen", "Sloane", "Dependent", "", "*******6948", "Unifi Aviation, LLC", "", ""],
  ["Alley", "Angela", "Dependent", "", "*******1820", "Blalock Development Co", "", ""],
  ["Alley", "Kevin", "Member", "U3948629401", "*******7850", "Blalock Development Co", "Angela Alley (Spouse)", "kalley@blalockconstruction.com"],
  ["Alsup", "Samantha", "Member", "", "*******6819", "ArmadaCare", "Thomas Conley (Spouse)", "salsup@armadacare.com"],
  ["Alves Barbosa", "Reinaldo", "Dependent", "", "*******8715", "Unifi Aviation, LLC", "", "reinaldobarbosa@icloud.com"],
  ["Anderson", "Meredith J", "Dependent", "", "*******9772", "Unifi Aviation, LLC", "", ""],
  ["Anderson", "Steven", "Member", "", "*******3048", "E&J Gallo Winery Ret 65P", "Beth Nagle (Spouse)", "sjanderson001@yahoo.com"],
  ["Angra", "Javyn", "Dependent", "", "*******4487", "Unifi Aviation, LLC", "", ""],
  ["Angra", "Krish", "Dependent", "", "*******9036", "Unifi Aviation, LLC", "", ""],
  ["Angra", "Sandeep", "Member", "U3761949601", "*******0634", "Unifi Aviation, LLC", "Javyn Angra (Dependent), Krish Angra (Dependent), Heer Kansal (Spouse), Hridhaan Kansal (Dependent)", "sandeep.angra73@gmail.com"],
  ["Aramanai", "Aarav", "Dependent", "", "*******7710", "Unifi Aviation, LLC", "", ""],
  ["Aramanai-Vasan", "Ranjith", "Dependent", "981127848", "*******6901", "Unifi Aviation, LLC", "", ""],
  ["Argenbright", "Frank", "Member", "75351823100", "*******5139", "Unifi Aviation, LLC", "Kathy Argenbright (Spouse)", "fa@argenbrightcapital.com"],
  ["Argenbright", "Hunter", "Member", "", "*******5434", "Unifi Aviation, LLC", "", "hunter.argenbright@unifiservice.com"],
  ["Argenbright", "Kathy", "Dependent", "", "*******5247", "Unifi Aviation, LLC", "", "kathy@kbahouse.com"],
  ["Ash", "Aaron", "Dependent", "", "*******1569", "E&J Gallo Winery Active", "", ""],
  ["Ash", "Branson", "Dependent", "", "*******5351", "E&J Gallo Winery Active", "", ""],
  ["Ash", "Breanne", "Member", "", "*******2161", "E&J Gallo Winery Active", "", "breanneash@gmail.com"],
  ["Ash", "London", "Dependent", "", "*******8251", "E&J Gallo Winery Active", "", ""],
  ["Ash", "Michael", "Member", "", "*******8308", "E&J Gallo Winery Active", "Aaron Ash (Dependent), Branson Ash (Dependent), London Ash (Dependent)", "breanneash@gmail.com"],
];

const fullName = (r: ParticipantRow) => `${r[1]} ${r[0]}`;
const newContactIds = new Map(
  PARTICIPANTS.filter((r) => !KNOWN_CONTACTS[fullName(r)]).map((r, i) => [fullName(r), `003Ec00000PSrch${String(i + 1).padStart(3, "0")}`]),
);
const contactIdOf = (name: string) => KNOWN_CONTACTS[name] ?? newContactIds.get(name);

/** The member whose Dependent Name lists this participant (the Contact's Employee lookup). */
function memberOf(name: string): LookupValue | null {
  const member = PARTICIPANTS.find((r) => r[6].split(", ").some((d) => d.replace(/ \(.*\)$/, "") === name));
  const id = member && contactIdOf(fullName(member));
  return member && id ? contactRef(id, fullName(member)) : null;
}

export const PARTICIPANT_SEARCH_ROWS: RecordData[] = PARTICIPANTS.map((r, i) => ({
  id: `PS${String(i + 1).padStart(3, "0")}`,
  values: {
    lastName: r[0],
    firstName: r[1],
    memberType: r[2],
    employeeNumber: r[3],
    ssn: r[4],
    employer: r[5],
    participantStatus: "",
    dependentName: r[6],
    email: r[7],
    admin: "",
    record: contactRef(contactIdOf(fullName(r)) ?? "", fullName(r)),
  },
}));

/** Contacts for the participants the Contacts mock data does not have (names sort after the 50 captured list rows). */
export const PARTICIPANT_CONTACTS: RecordData[] = PARTICIPANTS.filter((r) => newContactIds.has(fullName(r))).map((r) => ({
  id: newContactIds.get(fullName(r)) ?? "",
  values: {
    name: fullName(r),
    relationship: r[2] === "Member" ? "Participant" : "Dependent",
    employee: r[2] === "Member" ? null : memberOf(fullName(r)),
    ssn: r[4],
    email: r[7],
    contactOwner: userRef("Zach Ackerman"),
  },
}));

type EmployerRow = [id: string, name: string, ein: string, street: string, city: string, state: string, zip: string, status: string, admin: string];

/** P5 results (Employer Name "A"): page 1 as captured; page 2 (not captured) = the other Group accounts whose name contains "a". */
const EMPLOYERS: EmployerRow[] = [
  ["001Ec0000557Dc8133", "ArmadaCare", "", "", "", "", "", "Active", "Zach Ackerman"],
  ["001Ec00001fY0zTIAS", "Blalock Development Co", "", "", "", "", "", "Active", "Emily Ellerman"],
  ["001Ec0000bF14d03Dd", "Cascade Technologies Inc", "", "", "Seattle", "WA", "", "Inactive", "Feng Yue"],
  ["001Ec00001De25D242", "E&J Gallo Winery", "94-1009696", "", "", "", "", "Active", "Emily Ellerman"],
  ["001Ec00004794856Aa", "E&J Gallo Winery Active", "94-1009696", "", "", "", "", "Active", "Emily Ellerman"],
  ["001Ec000092f6c0591", "E&J Gallo Winery Ret 65P", "94-1009696", "", "", "", "", "Active", "Emily Ellerman"],
  ["001Ec000051a292916", "Flushing Kent Realty Management LLC", "264430444", "", "", "", "", "Active", "Emily Ellerman"],
  ["001Ec000031d01937c", "HVAC and Associates", "", "2210 E Camelback Rd", "Phoenix", "AZ", "85016", "Inactive", "Adner Ramos"],
  ["001Ec0000353Eb188b", "Meridian Partners LLC", "", "", "Chicago", "IL", "", "Inactive", "Feng Yue"],
  ["001Ec00000217f49Ff", "QA Test Employer Group - CBSR", "", "", "", "", "", "Inactive", "ArmadaCare Base User"],
  ["001Ec0000aAf55C704", "SAL952", "", "", "", "", "", "", ""],
  ["001Ec000054eE3Ef64", "Test Aarete", "", "", "", "", "", "", ""],
  ["001Ec0000874A2433b", "Unifi Aviation, LLC", "", "", "", "", "", "", ""],
];

export const EMPLOYER_SEARCH_ROWS: RecordData[] = EMPLOYERS.map(([id, name, ein, street, city, state, zip, status, admin]) => ({
  id: `ES-${id}`,
  values: { name, employerCode: "", ein, street, city, state, zip, status, admin, record: accountRef(id, name) },
}));

const PAGE = "/lightning/n/Participant_Search";
const LAST_NAME_A = "lastName=A&search=1";

/** Participant screens (?scenario=P1 … P7): no workspace tabs, state in the URL. */
export const PARTICIPANT_SEARCH_SCENARIOS: Record<string, ConsoleScenario> = {
  P1: { tabs: [], url: `${PAGE}?tab=participant` },
  P2: { tabs: [], url: `${PAGE}?tab=claim` },
  P3: { tabs: [], url: `${PAGE}?tab=employer` },
  P4: { tabs: [], url: `${PAGE}?tab=participant&${LAST_NAME_A}` },
  P5: { tabs: [], url: `${PAGE}?tab=employer&name=A&search=1` },
  P6: { tabs: [], url: `${PAGE}?tab=claim&advanced=1&employer=${encodeURIComponent("QA Test Employer Group - CBSR")}&search=1` },
  P7: { tabs: [], url: `${PAGE}?tab=participant&advanced=1&${LAST_NAME_A}` },
};
