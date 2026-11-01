import type { ActionConfig, ActionVisibility, FieldDef, FieldMap, ObjectConfig, RegionConfig, RelatedListConfig, SectionConfig } from "../../config/types";
import { CLAIM_STATUSES, CLOSED_STATUSES, PENDING_STATUSES } from "./types";

/*
 * Claim — config for the Claims screens in Figma (CL1–CL8): split-view home, tabs Details · Audit & System,
 * header actions by claim status, Split Approval calculator widget.
 */

const date: FieldDef["type"] = "date";
const text = (label: string): FieldDef => ({ label, type: "text" });
const datetime = (label: string): FieldDef => ({ label, type: "datetime" });
const checkbox = (label: string): FieldDef => ({ label, type: "checkbox" });
const currency = (label: string): FieldDef => ({ label, type: "currency" });

const FIELDS: FieldMap = {
  name: { label: "Claim Number", type: "text", readOnly: true },
  status: { label: "Claim Status", type: "picklist", options: [...CLAIM_STATUSES] },
  // Highlights (blank in the capture)
  claimNumber: { label: "Claim Number", type: "text", readOnly: true },
  slaStatus: { label: "SLA Status", type: "picklist", options: [] },
  slaDueDate: { label: "SLA Due Date", type: date },
  claimInternalStatus: text("Claim Internal Status"),
  internalStatusReason: text("Internal Status Reason"),
  // Additional Information
  member: { label: "Member", type: "lookup", lookup: { objectApiName: "Contact", placeholder: "Search Contacts..." } },
  dateOfService: { label: "Date of Service", type: date },
  providerName: text("Provider Name"),
  description: text("Description"),
  expenseType: { label: "Expense Type", type: "lookup", lookup: { objectApiName: "PlanYearExpenseType", placeholder: "Search Plan Year Expense Types..." } },
  billedAmount: currency("Billed Amount"),
  receiptAmount: currency("Receipt Amount"),
  intakeChannel: { label: "Intake Channel", type: "picklist", options: ["Member Portal"] },
  dateReceived: { label: "Date Received", type: date },
  draftExpiryDate: { label: "Draft Expiry Date", type: date },
  isEscalated: { label: "Is Escalated", type: "checkbox", readOnly: true },
  escalationState: { label: "Escalation State", type: "text", readOnly: true },
  owner: { label: "Owner", type: "lookup", readOnly: true, action: "changeOwner", lookup: { objectApiName: "User", placeholder: "Search People..." } },
  assignedAnalyst: { label: "Assigned Analyst", type: "lookup", lookup: { objectApiName: "User", placeholder: "Search People..." } },
  submissionSource: { label: "Submission Source", type: "picklist", options: ["Member Submitted"] },
  createdBy: { label: "Created By", type: "audit", readOnly: true },
  lastModifiedBy: { label: "Last Modified By", type: "audit", readOnly: true },
  // SLA & Routing
  slaStartDateTime: datetime("SLA Start DateTime"),
  newDocumentsReceivedDateTime: datetime("New Documents Received DateTime"),
  slaPolicyKey: text("SLA Policy Key"),
  slaTarget: { label: "SLA Target", type: "number" },
  slaUnit: { label: "SLA Unit", type: "picklist", options: [] },
  isSlaBreached: checkbox("Is SLA Breached"),
  slaBreachDateTime: datetime("SLA Breach DateTime"),
  isDueToday: checkbox("Is Due Today"),
  isWorkComplete: checkbox("Is Work Complete"),
  queueRoutedDateTime: datetime("Queue Routed DateTime"),
  queueRoutedTo: text("Queue Routed To"),
  isSlaBreachedNum: { label: "Is SLA Breached Num", type: "number", scale: 2, readOnly: true },
  isDueTodayNum: { label: "Is Due Today Num", type: "number", scale: 2, readOnly: true },
  ageInDays: { label: "Age In Days", type: "number", readOnly: true },
  receiptStatus: { label: "Receipt Status", type: "picklist", options: [] },
  // Claim Details card (values not captured on the record sections)
  phoneNumber: { label: "Phone Number", type: "phone" },
  employer: text("Employer"),
  expenseCategory: text("Expense Category"),
  expenseTypeName: text("Expense Type"),
  filedBy: text("Filed By"),
  payee: text("Payee"),
  recipient: text("Recipient"),
  // Adjudication Summary
  netDeductibleApplied: currency("Net Deductible Applied"),
  netCoinsuranceAmount: currency("Net Coinsurance Amount"),
  netBenefitPaid: currency("Net Benefit Paid"),
  planYear: { label: "Plan Year", type: "lookup", lookup: { objectApiName: "PlanYear", placeholder: "Search Plan Years..." } },
  subscriber: { label: "Subscriber", type: "lookup", lookup: { objectApiName: "Contact", placeholder: "Search Contacts..." } },
  escalationIndicator: { label: "Escalation Indicator", type: "text", helpText: "Help text not captured in Figma." },
  // Receipt / Documentation
  receiptReceived: text("Receipt Received"),
  viewReceipt: text("View Receipt"),
  placeOnHold: { label: "Place on Hold", type: "checkbox", display: "toggle" },
};

const ADDITIONAL_INFORMATION: SectionConfig = {
  id: "additionalInformation",
  title: "Additional Information",
  rows: [
    ["member", "intakeChannel"],
    ["dateOfService", "dateReceived"],
    ["providerName", "draftExpiryDate"],
    ["description", "isEscalated"],
    ["expenseType", "escalationState"],
    ["billedAmount", "owner"],
    ["receiptAmount", "assignedAnalyst"],
    [null, "submissionSource"],
  ],
};
const SYSTEM_INFORMATION: SectionConfig = { id: "systemInformation", title: "System Information", rows: [["createdBy", "lastModifiedBy"]] };
const SLA_ROUTING: SectionConfig = {
  id: "slaRouting",
  title: "SLA & Routing",
  rows: [
    ["slaDueDate", "slaStatus"],
    ["slaStartDateTime", "isWorkComplete"],
    ["newDocumentsReceivedDateTime", "queueRoutedDateTime"],
    ["slaPolicyKey", "queueRoutedTo"],
    ["slaTarget", "isSlaBreachedNum"],
    ["slaUnit", "isDueTodayNum"],
    ["isSlaBreached", "ageInDays"],
    ["slaBreachDateTime", "receiptStatus"],
    ["isDueToday", null],
  ],
};
const ADJUDICATION_SUMMARY: SectionConfig = {
  id: "adjudicationSummary",
  title: "Adjudication Summary",
  rows: [
    ["netDeductibleApplied", "planYear"],
    ["netCoinsuranceAmount", "subscriber"],
    ["netBenefitPaid", "escalationIndicator"],
  ],
};

const list = (l: RelatedListConfig): RegionConfig => ({ kind: "relatedList", list: l });

const DETAILS: RegionConfig[] = [
  {
    kind: "card",
    id: "claimDetails",
    title: "Claim Details",
    bordered: true,
    body: {
      kind: "fields",
      columns: 3,
      fields: [
        { field: "member", label: "Participant" },
        "phoneNumber",
        "employer",
        { field: "dateOfService", label: "Service Date", dateStyle: "medium" },
        "expenseCategory",
        "expenseTypeName",
        { field: "intakeChannel", label: "Method Filed" },
        "filedBy",
        "description",
        { field: "providerName", label: "Provider" },
        "payee",
        "recipient",
        { field: "billedAmount", label: "Total Claim Amount" },
        "receiptAmount",
        { field: "dateReceived", label: "Submission Date", dateStyle: "medium" },
      ],
    },
  },
  {
    kind: "card",
    id: "benefitSnapshot",
    title: "Benefit Snapshot",
    bordered: true,
    body: { kind: "empty" },
    backend: {
      errorTone: "default",
      error:
        "No such column 'Subject_To_Deductible__c' on entity 'Plan_Year_Expense_Type__c'. If you are attempting to use a custom field, be sure to append the '__c' after the custom field name. Please reference your WSDL or the describe call for the appropriate names.",
    },
  },
  { kind: "card", id: "siblingClaims", title: "Claims", bordered: true, body: { kind: "empty" } },
  { kind: "section", section: ADJUDICATION_SUMMARY },
  {
    kind: "card",
    id: "receipt",
    title: "Receipt / Documentation",
    iconName: "standard:document",
    body: {
      kind: "fields",
      columns: 3,
      fields: ["receiptStatus", "receiptReceived", "viewReceipt", { field: "dateReceived", label: "Received Date", dateStyle: "medium" }, "placeOnHold"],
    },
  },
  list({
    id: "files",
    label: "Files",
    iconName: "standard:file",
    objectApiName: "ClaimFile",
    parentField: "claim",
    display: "files",
    buttons: [{ value: "addFiles", label: "Add Files" }],
    tileTitle: "title",
    tileLines: ["{uploadedDate} • {size} • {fileType}"],
  }),
  {
    kind: "card",
    id: "accumulatorBalances",
    title: "Accumulator Balances",
    iconName: "standard:metrics",
    body: {
      kind: "table",
      objectApiName: "Accumulator",
      parentField: "subscriber",
      parentValueField: "subscriber",
      columns: [
        { field: "member" },
        { field: "type" },
        { field: "level" },
        { field: "category" },
        { field: "used", align: "right" },
        { field: "remaining", align: "right" },
        { field: "limit", align: "right" },
      ],
    },
  },
  list({ id: "paymentHistory", label: "Payment History", iconName: "custom:custom16", menu: false }),
  list({ id: "denialHistory", label: "Denial History", iconName: "standard:account_info", menu: false }),
  list({ id: "denialLetters", label: "Denial Letters", iconName: "standard:custom", menu: false }),
  list({ id: "rmiHistory", label: "RMI History", iconName: "standard:account_info", menu: false }),
  list({
    id: "notes",
    label: "Notes",
    iconName: "standard:note",
    objectApiName: "Note",
    parentField: "parent",
    buttons: [{ value: "new", label: "New" }],
    newAction: "newNote",
    display: "tiles",
    tileTitle: "title",
    tileLines: ["{createdDate} by {createdBy}", "{body}"],
  }),
  list({
    id: "adjudicationHistory",
    label: "Adjudication History",
    iconName: "standard:account_info",
    objectApiName: "Adjudication",
    parentField: "claim",
    menu: false,
    display: "table",
    settings: true,
    sort: { field: "adjudicationDate", direction: "descending" },
    columns: [{ field: "adjudicationDate" }, { field: "adjudicationStatus" }],
  }),
];

const AUDIT: RegionConfig[] = [
  { kind: "section", section: ADDITIONAL_INFORMATION },
  { kind: "section", section: SYSTEM_INFORMATION },
  { kind: "section", section: SLA_ROUTING },
  list({ id: "claimHistory", label: "Claim History", iconName: "custom:custom70", menu: false }),
  list({ id: "notifications", label: "Notifications", iconName: "standard:custom", buttons: [{ value: "new", label: "New" }] }),
  list({ id: "repaymentObligations", label: "Repayment Obligations", iconName: "custom:custom12", buttons: [{ value: "new", label: "New" }] }),
];

const pending: ActionVisibility = { field: "status", in: [...PENDING_STATUSES] };
const closed: ActionVisibility = { field: "status", in: [...CLOSED_STATUSES] };

const ACTIONS: ActionConfig[] = [
  { id: "approve", label: "Approve", kind: "update", values: { status: "Approved" }, visibleWhen: pending },
  { id: "deny", label: "Deny", kind: "update", values: { status: "Denied" }, visibleWhen: pending },
  { id: "rmi", label: "RMI", kind: "update", values: { status: "Request More Information (RMI)" }, visibleWhen: pending },
  { id: "splitApproval", label: "Split Approval", kind: "widget", widget: "splitApproval", title: "Split Approval calculator", size: "small" },
  {
    id: "repaymentRecovery",
    label: "Repayment Recovery",
    kind: "message",
    title: "Repayment Recovery",
    message: "Repayment Recovery is not available yet. It will be added in a later release.",
    closeLabel: "Close",
    size: "small",
    visibleWhen: closed,
  },
  { id: "delete", label: "Delete", kind: "delete", title: "Delete Claim", message: "Are you sure you want to delete this Claim?", confirmLabel: "Delete", visibleWhen: closed },
  { id: "edit", label: "Edit", kind: "edit", visibleWhen: pending },
  {
    id: "newNote",
    label: "New Note",
    kind: "composer",
    objectApiName: "Note",
    parentField: "parent",
    titleField: "title",
    bodyField: "body",
    emptyTitle: "No new note",
  },
];

export const CLAIM_CONFIG: ObjectConfig = {
  apiName: "Claim",
  label: "Claim",
  labelPlural: "Claims",
  iconName: "custom:custom70",
  nameField: "name",
  ownerField: "owner",
  keyPrefix: "a0C",
  home: "split",
  fields: FIELDS,
  listViews: [
    {
      id: "All",
      label: "All",
      filter: { kind: "all" },
      sort: { field: "name", direction: "ascending" },
      pageSize: 50,
      rowNumbers: "hidden",
      columns: [{ field: "name", link: "record" }, { field: "status" }, { field: "member", link: "plain" }, { field: "dateOfService" }, { field: "billedAmount", align: "right" }],
    },
  ],
  defaultListView: "All",
  splitView: { titleRight: "status", search: false },
  layouts: {
    claim: {
      highlights: {
        fields: ["claimNumber", "slaStatus", "slaDueDate", "claimInternalStatus", "internalStatusReason"],
        actions: ["approve", "deny", "rmi", "splitApproval", "repaymentRecovery", "delete"],
        overflow: ["edit"],
      },
      tabs: [
        { id: "details", label: "Details", regions: DETAILS },
        { id: "auditSystem", label: "Audit & System", regions: AUDIT },
      ],
      defaultTab: "details",
      sidebar: [],
    },
  },
  actions: ACTIONS,
};

// Child objects shown on the claim page (no pages of their own in Figma).
const BASE = { listViews: [], defaultListView: "", layouts: {}, actions: [] };
const claimLookup: FieldDef = { label: "Claim", type: "lookup", lookup: { objectApiName: "Claim", placeholder: "Search Claims..." } };

export const CLAIM_FILE_CONFIG: ObjectConfig = {
  ...BASE,
  apiName: "ClaimFile",
  label: "File",
  labelPlural: "Files",
  iconName: "standard:file",
  nameField: "title",
  keyPrefix: "069",
  fields: {
    title: { label: "Title", type: "text" },
    uploadedDate: { label: "Uploaded Date", type: "date", dateStyle: "medium" },
    size: { label: "Size", type: "text" },
    fileType: { label: "File Type", type: "text" },
    claim: claimLookup,
  },
};

export const ADJUDICATION_CONFIG: ObjectConfig = {
  ...BASE,
  apiName: "Adjudication",
  label: "Adjudication",
  labelPlural: "Adjudication History",
  iconName: "standard:account_info",
  nameField: "name",
  keyPrefix: "a0B",
  fields: {
    name: { label: "Adjudication", type: "text" },
    adjudicationDate: { label: "Adjudication Date", type: "datetime" },
    adjudicationStatus: { label: "Adjudication Status", type: "picklist", options: ["Approved", "Denied"] },
    claim: claimLookup,
  },
};

export const ACCUMULATOR_CONFIG: ObjectConfig = {
  ...BASE,
  apiName: "Accumulator",
  label: "Accumulator Balance",
  labelPlural: "Accumulator Balances",
  iconName: "standard:metrics",
  nameField: "type",
  keyPrefix: "a0A",
  fields: {
    member: { label: "Member", type: "lookup", lookup: { objectApiName: "Contact", placeholder: "Search Contacts..." } },
    type: { label: "Type", type: "text" },
    level: { label: "Level", type: "text" },
    category: { label: "Category", type: "text" },
    used: currency("Used"),
    remaining: currency("Remaining"),
    limit: currency("Limit"),
    subscriber: { label: "Subscriber", type: "lookup", lookup: { objectApiName: "Contact", placeholder: "Search Contacts..." } },
  },
};
