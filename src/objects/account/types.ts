/** Account record types (Figma A7 record-type picker). */
export type AccountRecordType =
  | "Group"
  | "AH Group"
  | "AH Partner"
  | "Broker Agency"
  | "EP Facility"
  | "General Agency"
  | "Group Active"
  | "Partner/Sponsor"
  | "Prospect Agency"
  | "Strategic Partner"
  | "Vendor/Facility";

/** Account layouts captured in Figma: Broker Agency (A2–A4) and Group (A5–A9). */
export type AccountLayoutId = "brokerAgency" | "group";
