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
