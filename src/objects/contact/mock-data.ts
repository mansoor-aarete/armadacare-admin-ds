import type { ConsoleScenario, FieldValue, RecordData } from "../../config/types";
import { userRef } from "../user/mock-data";

/*
 * Contacts from the Figma file: the 50 rows of the "All Members" split view (name, employee, gender, birthdate),
 * their employees (subscribers), and full values for the three contacts opened in C1–C7.
 */

const account = (id: string, name: string) => ({ id, name, objectApiName: "Account" });
const contact = (id: string, name: string) => ({ id, name, objectApiName: "Contact" });

export const ADAM_SAHN = "003Ec0000a1962939d";
export const AARAV_ARAMANAI = "003Ec0000bB8A527B1";
export const ANTOINETTE_MITCHAM = "003Ec00008CfF7Df83";

/** Values captured on the record pages (C1 Adam Sahn, C2 Aarav Aramanai, C3–C7 Antoinette Mitcham). */
const DETAILS: Record<string, Record<string, FieldValue>> = {
  [ADAM_SAHN]: {
    ssn: "*******0591",
    cdexId: "008554542",
    age: 22,
    product: "Ultimate Health",
    mailingAddress: { city: "LIVERMORE", state: "CA", postalCode: "94550" },
    accountName: account("001Ec00004794856Aa", "E&J Gallo Winery Active"),
    workPhone: "(877) 687-9463",
    maritalStatus: "Single",
    productPicklist: "Ultimate Health",
    relationship: "Dependent",
    activeEnrollmentsArmadaCare: 1,
    activeEnrollmentsArmadaHealth: 1,
    activeEnrollmentsVision: 1,
    depNo: "2",
    activeEnrollmentsMedical: 1,
    activeEnrollmentsDental: 1,
    activeEnrollmentsConcierge: 0,
    portal: "www.armadacare.com/myaccount",
    contactOwner: userRef("Zach Ackerman"),
  },
  [AARAV_ARAMANAI]: {
    ssn: "*******7710",
    cdexId: "008554856",
    age: 10,
    mailingAddress: { city: "San Jose", state: "CA", postalCode: "95123", country: "USA" },
    accountName: account("001Ec0000874A2433b", "Unifi Aviation, LLC"),
    homePhone: "(510) 598-5161",
    workPhone: "(404) 773-0452",
    maritalStatus: "Single",
    productPicklist: "Plena Health",
    relationship: "Dependent",
    activeEnrollmentsArmadaCare: 1,
    activeEnrollmentsArmadaHealth: 1,
    activeEnrollmentsVision: 0,
    depNo: "0",
    activeEnrollmentsMedical: 1,
    activeEnrollmentsDental: 0,
    activeEnrollmentsConcierge: 1,
    portal: "www.armadacare.com/myclaims",
    contactOwner: userRef("Zach Ackerman"),
  },
  [ANTOINETTE_MITCHAM]: {
    ssn: "*******5510",
    email: "amitcham@armadaglobal.com",
    age: 57,
    mailingAddress: { street: "8005 Derby Lane,", city: "Owings Mills", state: "MD", postalCode: "21117" },
    accountName: account("001Ec0000557Dc8133", "ArmadaCare"),
    homePhone: "(443) 204-4970",
    workPhone: "(410) 308-5213",
    mobile: "(443) 862-1915",
    maritalStatus: "Married",
    relationship: "Participant",
    depNo: "00",
    contactOwner: userRef("Zach Ackerman"),
  },
};

const LIST: RecordData[] = [
  { id: "003Ec0000bB8A527B1", values: { name: "Aarav Aramanai", employee: { id: "003Ec00006Fb9c8c06", name: "Smitanjali Priyadarshini", objectApiName: "Contact" }, gender: "M", birthdate: "2015-11-28" } },
  { id: "003Ec0000bD67f2908", values: { name: "Aaron Ash", employee: { id: "003Ec000014031A9Aa", name: "Michael Ash", objectApiName: "Contact" }, gender: "M", birthdate: "2006-08-17" } },
  { id: "003Ec00009FaBf5761", values: { name: "Abigail Grace-Ferguson Lane", employee: { id: "003Ec0000c03Fc8462", name: "Oliver Lane", objectApiName: "Contact" }, gender: "F", birthdate: "2000-08-29" } },
  { id: "003Ec00005B235C0E2", values: { name: "Ace Summers", employee: { id: "003Ec0000dC6172fDe", name: "Kenneth Summers", objectApiName: "Contact" }, gender: "M", birthdate: "2013-01-30" } },
  { id: "003Ec0000a1962939d", values: { name: "Adam Sahn", employee: { id: "003Ec0000fC8Ce1702", name: "Mark Sahn", objectApiName: "Contact" }, gender: "M", birthdate: "2004-05-02" } },
  { id: "003Ec0000756366695", values: { name: "Adrian Mitchell", employee: { id: "003Ec000067c01Bc60", name: "Eric Mitchell", objectApiName: "Contact" }, gender: "M", birthdate: "2017-11-09" } },
  { id: "003Ec00005A00f5bDa", values: { name: "Aidan Booth", employee: { id: "003Ec0000cF1Cf8b91", name: "David Booth", objectApiName: "Contact" }, gender: "M", birthdate: "2008-08-09" } },
  { id: "003Ec0000a933d8e04", values: { name: "Aidan R Bohn", employee: { id: "003Ec00005827cE234", name: "Susan Bohn", objectApiName: "Contact" }, gender: "M", birthdate: "2007-04-26" } },
  { id: "003Ec0000732Db7e72", values: { name: "Aiden J Hlavek", employee: { id: "003Ec000010d2a913d", name: "Mark Hlavek", objectApiName: "Contact" }, gender: "M", birthdate: "2008-02-17" } },
  { id: "003Ec000039c775b4e", values: { name: "Akshay Loomba", gender: "M", birthdate: "1981-11-02" } },
  { id: "003Ec0000408EbD9C2", values: { name: "Akshay Pandit", gender: "M" } },
  { id: "003Ec000043c8eD84e", values: { name: "Akshay Pandit", gender: "M" } },
  { id: "003Ec0000e6dD16d2e", values: { name: "Akshay PanditTest", gender: "M" } },
  { id: "003Ec0000bE6D5De18", values: { name: "Alessi Veritas Mitchell", employee: { id: "003Ec000067c01Bc60", name: "Eric Mitchell", objectApiName: "Contact" }, gender: "F", birthdate: "2022-08-07" } },
  { id: "003Ec0000651B8Fe29", values: { name: "Alexa Ackerman", employee: { id: "003Ec00008D89bC476", name: "Zachary Ackerman", objectApiName: "Contact" }, gender: "F", birthdate: "1991-10-01" } },
  { id: "003Ec0000bA368De62", values: { name: "Alexander Clay", employee: { id: "003Ec00001D3A239A0", name: "Jessica Clay", objectApiName: "Contact" }, gender: "M", birthdate: "1970-03-18" } },
  { id: "003Ec00000E10cE840", values: { name: "Alice Regot", gender: "F", birthdate: "1989-01-20" } },
  { id: "003Ec000085276Eb7d", values: { name: "Alisa Russell", employee: { id: "003Ec0000441A1Cb35", name: "Emerson Russell", objectApiName: "Contact" }, gender: "F", birthdate: "1989-02-19" } },
  { id: "003Ec000061607C83c", values: { name: "Alison Jerden", gender: "F", birthdate: "1974-12-04" } },
  { id: "003Ec0000f4512C865", values: { name: "Allen Doty", gender: "M", birthdate: "1959-03-24" } },
  { id: "003Ec000011a61Ac28", values: { name: "Allie McFarland", employee: { id: "003Ec000068f62FfE4", name: "Matthew McFarland", objectApiName: "Contact" }, gender: "F", birthdate: "2006-07-19" } },
  { id: "003Ec0000c9986917e", values: { name: "Alyssa A Hlavek", employee: { id: "003Ec000010d2a913d", name: "Mark Hlavek", objectApiName: "Contact" }, gender: "F", birthdate: "1973-09-18" } },
  { id: "003Ec00003922f8a93", values: { name: "Alyssa Seburn", employee: { id: "003Ec0000eE583C9D1", name: "Ted Seburn", objectApiName: "Contact" }, gender: "F", birthdate: "1973-09-12" } },
  { id: "003Ec000019d5674E9", values: { name: "Amalyn Kennedy", employee: { id: "003Ec000053f5dBaA4", name: "Joshua Kennedy", objectApiName: "Contact" }, gender: "F", birthdate: "2012-08-04" } },
  { id: "003Ec00000924d0dDd", values: { name: "Amanda Ewig Riccardi", employee: { id: "003Ec0000e4b9179E7", name: "Roger Riccardi", objectApiName: "Contact" }, gender: "F", birthdate: "1978-01-17" } },
  { id: "003Ec0000fCbB1032f", values: { name: "Amanda Maletich", employee: { id: "003Ec000023bAd20Cd", name: "George Maletich", objectApiName: "Contact" }, gender: "F", birthdate: "2000-11-05" } },
  { id: "003Ec00007A2F82e72", values: { name: "Amelia Tyler", employee: { id: "003Ec00004Ae9d78D9", name: "Stephanie Gallo", objectApiName: "Contact" }, gender: "F", birthdate: "2005-03-03" } },
  { id: "003Ec00000F40eB4F4", values: { name: "Amit Patel", employee: { id: "003Ec0000254228b3c", name: "Priya Patel", objectApiName: "Contact" }, birthdate: "1983-12-19" } },
  { id: "003Ec00008Dc7916B8", values: { name: "Amy Fuggi", gender: "F", birthdate: "1993-09-28" } },
  { id: "003Ec0000f1e780f96", values: { name: "Amy Lund", gender: "F", birthdate: "1974-03-28" } },
  { id: "003Ec0000c68BdDc29", values: { name: "Ana Dragasevic", employee: { id: "003Ec0000a71475a5e", name: "Bojan Dragasevic", objectApiName: "Contact" }, gender: "F", birthdate: "2011-01-01" } },
  { id: "003Ec00000466411B5", values: { name: "Anderson Puckett", gender: "M", birthdate: "1976-06-15" } },
  { id: "003Ec0000781Dc4d0a", values: { name: "Andreas Ingerson", gender: "F", birthdate: "1982-10-17" } },
  { id: "003Ec00007C7F4F423", values: { name: "Andrew Owings", employee: { id: "003Ec00006424a199c", name: "Matthew Owings", objectApiName: "Contact" }, gender: "M", birthdate: "2011-04-24" } },
  { id: "003Ec000009dB27d55", values: { name: "Angela Alley", employee: { id: "003Ec000010dD9Cd41", name: "Kevin Alley", objectApiName: "Contact" }, gender: "F", birthdate: "1966-11-26" } },
  { id: "003Ec0000c60348200", values: { name: "Angelica Stanfield", employee: { id: "003Ec0000321A4B719", name: "Michael Stanfield", objectApiName: "Contact" }, gender: "F", birthdate: "1970-06-21" } },
  { id: "003Ec0000dF6040e1c", values: { name: "Anika Patel", employee: { id: "003Ec0000254228b3c", name: "Priya Patel", objectApiName: "Contact" }, birthdate: "2016-06-25" } },
  { id: "003Ec000056a3b54F3", values: { name: "Ann Marie Barrios", employee: { id: "003Ec00004Dc408421", name: "Robert Barrios", objectApiName: "Contact" }, gender: "F", birthdate: "1976-08-07" } },
  { id: "003Ec0000c1620F492", values: { name: "Anna Blalock", employee: { id: "003Ec00000DeDc616b", name: "Douglas Blalock", objectApiName: "Contact" }, gender: "F", birthdate: "2008-03-19" } },
  { id: "003Ec00003007c0207", values: { name: "Anthony DiMarco", gender: "M", birthdate: "1966-06-29" } },
  { id: "003Ec0000e5aC1E25e", values: { name: "Anthony Fiveash", employee: { id: "003Ec000042572C23b", name: "Lisa Fiveash", objectApiName: "Contact" }, gender: "M", birthdate: "1968-04-27" } },
  { id: "003Ec0000f8dD421E0", values: { name: "Anthony Youga", gender: "M", birthdate: "1959-01-20" } },
  { id: "003Ec00008CfF7Df83", values: { name: "Antoinette Mitcham", gender: "F", birthdate: "1969-05-26" } },
  { id: "003Ec000052493FaF3", values: { name: "Antonio Ferraro", gender: "M", birthdate: "1978-02-08" } },
  { id: "003Ec00002220490Ca", values: { name: "Anvi Koushik", employee: { id: "003Ec0000b95B971A7", name: "Nikhil Koushik", objectApiName: "Contact" }, gender: "F", birthdate: "2012-11-29" } },
  { id: "003Ec00007D576B5D1", values: { name: "April Skinner", employee: { id: "003Ec000077d8dE365", name: "William Skinner", objectApiName: "Contact" }, gender: "F", birthdate: "2012-02-28" } },
  { id: "003Ec00009C33a4764", values: { name: "Armand Skol", gender: "M", birthdate: "1943-08-26" } },
  { id: "003Ec00008F7Bd445c", values: { name: "Arpna Bhola", employee: { id: "003Ec0000bC416F066", name: "Nishant Bhola", objectApiName: "Contact" }, gender: "F", birthdate: "1976-12-27" } },
  { id: "003Ec0000e9835430c", values: { name: "Asha Bhola", employee: { id: "003Ec0000bC416F066", name: "Nishant Bhola", objectApiName: "Contact" }, gender: "F", birthdate: "2015-04-15" } },
  { id: "003Ec000015eC7BcA3", values: { name: "Asher Clay", employee: { id: "003Ec00001D3A239A0", name: "Jessica Clay", objectApiName: "Contact" }, gender: "M", birthdate: "2011-07-26" } },
  { id: "003Ec0000a71475a5e", values: { name: "Bojan Dragasevic", relationship: "Participant" } },
  { id: "003Ec0000cF1Cf8b91", values: { name: "David Booth", relationship: "Participant" } },
  { id: "003Ec00000DeDc616b", values: { name: "Douglas Blalock", relationship: "Participant" } },
  { id: "003Ec0000441A1Cb35", values: { name: "Emerson Russell", relationship: "Participant" } },
  { id: "003Ec000067c01Bc60", values: { name: "Eric Mitchell", relationship: "Participant" } },
  { id: "003Ec000023bAd20Cd", values: { name: "George Maletich", relationship: "Participant" } },
  { id: "003Ec00001D3A239A0", values: { name: "Jessica Clay", relationship: "Participant" } },
  { id: "003Ec000053f5dBaA4", values: { name: "Joshua Kennedy", relationship: "Participant" } },
  { id: "003Ec0000dC6172fDe", values: { name: "Kenneth Summers", relationship: "Participant" } },
  { id: "003Ec000010dD9Cd41", values: { name: "Kevin Alley", relationship: "Participant" } },
  { id: "003Ec000042572C23b", values: { name: "Lisa Fiveash", relationship: "Participant" } },
  { id: "003Ec000010d2a913d", values: { name: "Mark Hlavek", relationship: "Participant" } },
  { id: "003Ec0000fC8Ce1702", values: { name: "Mark Sahn", relationship: "Participant" } },
  { id: "003Ec000068f62FfE4", values: { name: "Matthew McFarland", relationship: "Participant" } },
  { id: "003Ec00006424a199c", values: { name: "Matthew Owings", relationship: "Participant" } },
  { id: "003Ec000014031A9Aa", values: { name: "Michael Ash", relationship: "Participant" } },
  { id: "003Ec0000321A4B719", values: { name: "Michael Stanfield", relationship: "Participant" } },
  { id: "003Ec0000b95B971A7", values: { name: "Nikhil Koushik", relationship: "Participant" } },
  { id: "003Ec0000bC416F066", values: { name: "Nishant Bhola", relationship: "Participant" } },
  { id: "003Ec0000c03Fc8462", values: { name: "Oliver Lane", relationship: "Participant" } },
  { id: "003Ec0000254228b3c", values: { name: "Priya Patel", relationship: "Participant" } },
  { id: "003Ec00004Dc408421", values: { name: "Robert Barrios", relationship: "Participant" } },
  { id: "003Ec0000e4b9179E7", values: { name: "Roger Riccardi", relationship: "Participant" } },
  { id: "003Ec00006Fb9c8c06", values: { name: "Smitanjali Priyadarshini", relationship: "Participant" } },
  { id: "003Ec00004Ae9d78D9", values: { name: "Stephanie Gallo", relationship: "Participant" } },
  { id: "003Ec00005827cE234", values: { name: "Susan Bohn", relationship: "Participant" } },
  { id: "003Ec0000eE583C9D1", values: { name: "Ted Seburn", relationship: "Participant" } },
  { id: "003Ec000077d8dE365", values: { name: "William Skinner", relationship: "Participant" } },
  { id: "003Ec00008D89bC476", values: { name: "Zachary Ackerman", relationship: "Participant" } },
];

/** The Chen family (Figma Claims: claim members, subscriber David Chen, accumulator balances). */
export const DAVID_CHEN = "003Ec00000DChen001";
export const LISA_CHEN = "003Ec00000LChen001";
const NATASHA_CHEN = "003Ec00000NChen001";
const RYAN_CHEN = "003Ec00000RChen001";
const CHEN_FAMILY: RecordData[] = [
  { id: DAVID_CHEN, values: { name: "David Chen", relationship: "Participant", gender: "M" } },
  { id: LISA_CHEN, values: { name: "Lisa Chen", relationship: "Dependent", employee: contact(DAVID_CHEN, "David Chen"), gender: "F" } },
  { id: NATASHA_CHEN, values: { name: "Natasha Chen", relationship: "Dependent", employee: contact(DAVID_CHEN, "David Chen"), gender: "F" } },
  { id: RYAN_CHEN, values: { name: "Ryan Chen", relationship: "Dependent", employee: contact(DAVID_CHEN, "David Chen"), gender: "M" } },
];
export const CHEN_IDS = { david: DAVID_CHEN, lisa: LISA_CHEN, natasha: NATASHA_CHEN, ryan: RYAN_CHEN };

export const CONTACT_RECORDS: RecordData[] = [...LIST, ...CHEN_FAMILY].map((r) => ({
  ...r,
  values: { contactOwner: userRef("Zach Ackerman"), ...r.values, ...(DETAILS[r.id] ?? {}) },
  related: r.id === ADAM_SAHN ? { affiliatedPlans: 3, contactHistory: 1 } : r.id === AARAV_ARAMANAI ? { affiliatedPlans: 2, contactHistory: 1 } : r.id === ANTOINETTE_MITCHAM ? { affiliatedPlans: 6, contactHistory: 2 } : undefined,
}));

const view = (id: string) => `/lightning/r/Contact/${id}/view`;
const ADAM = view(ADAM_SAHN);
const AARAV = view(AARAV_ARAMANAI);
const ANTOINETTE = view(ANTOINETTE_MITCHAM);

/** The note saved in C5 and shown in C6 / C7. */
const SAVED_NOTE: RecordData = {
  id: "002Ec00000NOTE0001",
  values: {
    title: "No new note",
    body: "Basic testing",
    parent: contact(ANTOINETTE_MITCHAM, "Antoinette Mitcham"),
    createdBy: { by: userRef("Mansoor Ahmad"), at: "2026-10-21T10:11" },
    createdDate: "2026-10-21T10:11",
  },
};

/** Console states of the Contacts screens (?scenario=C1 … C7). `state=error` shows the captured Account Activity error. */
export const CONTACT_SCENARIOS: Record<string, ConsoleScenario> = {
  C1: { tabs: [AARAV, ADAM], url: `${ADAM}?state=error` },
  C2: { tabs: [AARAV], url: `${AARAV}?state=error` },
  C3: { tabs: [ANTOINETTE], url: `${ANTOINETTE}?action=changeOwner&state=error`, listUpdatedMinutesAgo: 1 },
  C4: { tabs: [ANTOINETTE], url: `${ANTOINETTE}?action=logActivity&state=error`, listUpdatedMinutesAgo: 2, today: "2026-10-21" },
  C5: {
    tabs: [ANTOINETTE],
    url: `${ANTOINETTE}?state=error`,
    listUpdatedMinutesAgo: 3,
    composer: { apiName: "Contact", actionId: "newNote", parentId: ANTOINETTE_MITCHAM, values: { title: "No new note", body: "Basic testing" } },
  },
  C6: { tabs: [ANTOINETTE], url: `${ANTOINETTE}?state=error`, listUpdatedMinutesAgo: 3, records: { Note: [SAVED_NOTE] } },
  C7: { tabs: [ANTOINETTE], url: `${ANTOINETTE}?state=error`, listUpdatedMinutesAgo: 4, records: { Note: [SAVED_NOTE] } },
};
