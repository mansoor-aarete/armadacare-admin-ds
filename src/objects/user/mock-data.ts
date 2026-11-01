import type { LookupValue, RecordData } from "../../config/types";

/** The signed-in user (Figma: owner of new records, "Mansoor Ahmad"). */
export const CURRENT_USER_ID = "005Ec00000MAhmad01";

/**
 * Users seen in the Figma file. Full names were captured for some users only (Zach Ackerman from the C3 owner text); the others appear
 * only as an owner alias (list views), so their name is the alias.
 */
const USERS: Array<[id: string, name: string, alias: string]> = [
  [CURRENT_USER_ID, "Mansoor Ahmad", "mahma"],
  ["005Ec00000GKaly001", "Gaurav kalyankar", "gkaly"],
  ["005Ec00000EElle001", "Emily Ellerman", "eelle"],
  ["005Ec00000FYue0001", "Feng Yue", "fyue"],
  ["005Ec00000VSalu001", "Varsha Salunke", "vsalu"],
  ["005Ec00000DMalv001", "Deepak Malviya", "malv"],
  ["005Ec00000DWalt001", "Donna Walter", "dwalt"],
  ["005Ec00000KBern001", "Kathryn Stacy Bernal", "kbern"],
  ["005Ec00000CEsse001", "Chris Esser", "cesse"],
  ["005Ec00000Zach0001", "Zach Ackerman", "zachman"],
  ["005Ec00000ABhus001", "abhus", "abhus"],
  ["005Ec00000ARamo001", "aramo", "aramo"],
  ["005Ec00000PJaka001", "pjaka", "pjaka"],
  ["005Ec00000Arma0001", "arma", "arma"],
  ["005Ec00000JSmit001", "jsmit", "jsmit"],
  ["005Ec00000MRath001", "Mehul Rathod", "mrath"],
  ["005Ec00000LMegh001", "lmegh", "lmegh"],
  // Reports, Card Transactions and Plan Years screens.
  ["005Ec0000U00000000", "Administrator Qualtrics", "aqual"],
  ["005Ec0000U00000001", "Armada Administrator", "aadmi"],
  ["005Ec0000U00000002", "Armada Avideon", "aavid"],
  ["005Ec0000U00000003", "Christina Swetz", "cswet"],
  ["005Ec0000U00000004", "Doug Adkins", "dadki"],
  ["005Ec0000U00000005", "Huntley Mitchell", "hmitc"],
  ["005Ec0000U00000006", "Jennifer Best", "jbest"],
  ["005Ec0000U00000007", "Jessica Cheng", "jchen"],
  ["005Ec0000U00000008", "Keith Schaub", "kscha"],
  ["005Ec0000U00000009", "Marketing Cloud Administrator", "madmi"],
  ["005Ec0000U00000010", "Marsha Saul", "msaul"],
  ["005Ec0000U00000011", "Nicole LaGrega", "nlagr"],
  ["005Ec0000U00000012", "Sujan Vanga", "svang"],
  ["005Ec0000U00000013", "Suzanne Kirincic", "skiri"],
  ["005Ec0000U00000014", "System Admin", "sadmi"],
  ["005Ec0000U00000015", "Zoe Hatzes", "zhatz"],
  ["005Ec0000U00000016", "Jyotiraditya Dhalmahapatra", "jdhal"],
  ["005Ec0000U00000017", "Tanmoy Das", "tdas"],
  ["005Ec0000U00000018", "Adner Ramos", "aramo"],
];

export const USER_RECORDS: RecordData[] = USERS.map(([id, name, alias]) => ({ id, values: { name, alias } }));

/** Lookup value of a user by name (mock-data helper). */
export function userRef(name: string): LookupValue {
  const user = USERS.find((u) => u[1] === name);
  if (!user) throw new Error(`Unknown mock user ${name}`);
  return { id: user[0], name, objectApiName: "User" };
}

/** Alias of a user by name (mock-data helper). */
export function userAlias(name: string): string {
  return USERS.find((u) => u[1] === name)?.[2] ?? "";
}
