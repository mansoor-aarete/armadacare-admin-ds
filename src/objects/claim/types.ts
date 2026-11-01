/** Claim statuses seen in the Figma split view (CL1–CL8). */
export const CLAIM_STATUSES = [
  "Approved",
  "Pending Review",
  "Denied",
  "Pending Information",
  "Expired",
  "Request More Information (RMI)",
  "Auto Approved",
  "Paid",
  "Pending Reimbursement (PRB)",
  "In Review",
  "Partial Pay",
  "Applied",
] as const;

export type ClaimStatus = (typeof CLAIM_STATUSES)[number];

/** Claims still being decided: Approve · Deny · RMI · Split Approval · ▼ (Figma CLM-0000023). */
export const PENDING_STATUSES: ClaimStatus[] = ["Pending Review", "Pending Information", "In Review", "Request More Information (RMI)", "Pending Reimbursement (PRB)"];

/** Decided claims: Split Approval · Repayment Recovery · Delete (Figma CLM-0000020). */
export const CLOSED_STATUSES: ClaimStatus[] = ["Approved", "Auto Approved", "Paid", "Partial Pay", "Applied", "Denied", "Expired"];
