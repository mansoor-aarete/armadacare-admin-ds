import type { ConsoleScenario, RecordData } from "../../config/types";
import { CHEN_IDS, ENROLLMENT_CONTACT_IDS } from "../contact/mock-data";
import { userRef } from "../user/mock-data";

/* Card transactions from the Figma split view (T1); CTX-0000000 carries the captured record values. */

const vs = { id: ENROLLMENT_CONTACT_IDS.vs, name: "vsfirst1 vslast1", objectApiName: "Contact" };
export const CTX_0 = "a2CEc00000CTX00000";

export const CARD_TRANSACTION_RECORDS: RecordData[] = [
  {
    id: CTX_0,
    values: {
      name: "CTX-0000000",
      employer: { id: "001Ec0000353Eb188b", name: "Meridian Partners LLC", objectApiName: "Account" },
      claimant: { id: CHEN_IDS.david, name: "David Chen", objectApiName: "Contact" },
      debitCardToken: "**************************dkag",
      cardNumber: "****-****-****-4999",
      owner: userRef("Jyotiraditya Dhalmahapatra"),
      createdBy: { by: userRef("Jyotiraditya Dhalmahapatra"), at: "2026-07-29T09:15" },
      lastModifiedBy: { by: userRef("Varsha Salunke"), at: "2026-10-19T06:47" },
    },
  },
  ...["0000003", "0000004", "0000005", "0000006", "0000019", "0000020"].map((n) => ({
    id: `a2CEc00000CTX${n.slice(2)}`,
    values: { name: `CTX-${n}`, claimant: vs },
  })),
];

/** Console state of the Card Transactions screen (?scenario=T1). */
export const CARD_TRANSACTION_SCENARIOS: Record<string, ConsoleScenario> = {
  T1: { tabs: [`/lightning/r/CardTransaction/${CTX_0}/view`], url: `/lightning/r/CardTransaction/${CTX_0}/view` },
};
