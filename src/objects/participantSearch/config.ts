import type { SearchCheckboxGroupConfig, SearchPageConfig } from "../../config/types";
import { CLAIM_SEARCH_STATUSES } from "./types";

/*
 * Participant navigation item — the custom search component (Figma P1–P7): Participant, Employer and Claim Search tabs.
 * Claim results were never captured (P6 shows "no records"), so the claim dataset is empty and has no columns.
 */

const allOnly = (id: string, legend: string, options: string[]): SearchCheckboxGroupConfig => ({
  id,
  legend,
  options: ["All", ...options],
  defaultValue: ["All"],
  allBehavior: "exclusive",
});

/** Employer picklist values: the employers seen in the results (the open picklist was never captured). */
const EMPLOYER_NAMES = [
  "ArmadaCare",
  "Blalock Development Co",
  "Cascade Technologies Inc",
  "E&J Gallo Winery",
  "E&J Gallo Winery Active",
  "E&J Gallo Winery Ret 65P",
  "Flushing Kent Realty Management LLC",
  "HVAC and Associates",
  "Meridian Partners LLC",
  "QA Test Employer Group - CBSR",
  "Unifi Aviation, LLC",
];

const PARTICIPANT_STATUSES = ["All", "Active", "LOA", "Cobra", "Terminated", "Retired", "Laid Off", "Closed"];

export const PARTICIPANT_SEARCH_PAGE: SearchPageConfig = {
  name: "Participant_Search",
  navLabel: "Participant",
  defaultTab: "participant",
  tabs: [
    {
      id: "participant",
      label: "Participant Search",
      heading: "Participant Search",
      criteriaTitle: "Search Criteria",
      buttons: "right",
      blocks: [
        {
          id: "participantInformation",
          title: "Participant Information",
          titleStyle: "plain",
          columns: 4,
          controlSize: "3-of-4",
          fields: [
            { id: "lastName", label: "Last Name", type: "text", required: true, match: { field: "lastName", operator: "startsWith" } },
            { id: "firstName", label: "First Name", type: "text", match: { field: "firstName", operator: "startsWith" } },
            { id: "employeeNumber", label: "Employee Number", type: "text", match: { field: "employeeNumber", operator: "startsWith" } },
            { id: "employer", label: "Employer", type: "picklist", options: EMPLOYER_NAMES, match: { field: "employer", operator: "equals" } },
            { id: "email", label: "Email Address", type: "text", match: { field: "email", operator: "startsWith" } },
          ],
        },
      ],
      advanced: {
        showLabel: "Advanced Search",
        hideLabel: "Show Less",
        blocks: [
          {
            id: "participantStatus",
            columns: 4,
            checkboxGroups: [
              {
                id: "participantStatus",
                legend: "Participant Status:",
                options: PARTICIPANT_STATUSES,
                defaultValue: PARTICIPANT_STATUSES,
                allBehavior: "selectsAll",
                match: { field: "participantStatus" },
              },
            ],
          },
          {
            id: "participantIds",
            title: "Participant IDs",
            titleStyle: "shaded",
            columns: 2,
            controlSize: "1-of-2",
            fields: [
              { id: "employerCode", label: "Employer Code", type: "text" },
              { id: "employerEmployeeId", label: "Employer Employee ID", type: "text", match: { field: "employeeNumber", operator: "startsWith" } },
            ],
          },
          {
            id: "dependentInformation",
            title: "Dependent Information",
            titleStyle: "shaded",
            columns: 3,
            controlSize: "3-of-4",
            fields: [
              { id: "dependentLastName", label: "Dependent Last Name", type: "text", match: { field: "dependentName", operator: "contains" } },
              { id: "dependentFirstName", label: "Dependent First Name", type: "text", match: { field: "dependentName", operator: "contains" } },
              { id: "dependentBirthdate", label: "Dependent Date of Birth", type: "date" },
            ],
          },
        ],
      },
      results: {
        dataset: "ParticipantSearchRow",
        heading: "SEARCH RESULTS",
        headingStyle: "label",
        count: { text: "{count} record(s) found.", position: "below" },
        emptyText: "No records found matching your search criteria.",
        sort: ["lastName", "firstName"],
        columns: [
          { field: "lastName", label: "Last Name", link: true },
          { field: "firstName", label: "First Name" },
          { field: "memberType", label: "Member/Dependent" },
          { field: "employeeNumber", label: "Employee Number" },
          { field: "ssn", label: "SSN" },
          { field: "employer", label: "Employer" },
          { field: "participantStatus", label: "Participant Status" },
          { field: "dependentName", label: "Dependent Name", wrap: true },
          { field: "email", label: "Email Address", wrap: true },
          { field: "admin", label: "Admin" },
        ],
      },
    },
    {
      id: "employer",
      label: "Employer Search",
      heading: "Employer Search",
      criteriaTitle: "Search Criteria",
      buttons: "below",
      blocks: [
        {
          id: "employer",
          columns: 3,
          controlSize: "full",
          fields: [
            { id: "name", label: "Employer Name", type: "text", match: { field: "name", operator: "contains" } },
            { id: "employerCode", label: "Employer Code", type: "text", match: { field: "employerCode", operator: "equals" } },
            { id: "ein", label: "EIN", type: "text", placeholder: "XX-XXXXXXX", match: { field: "ein", operator: "startsWith" } },
          ],
          checkboxGroups: [{ ...allOnly("status", "Status", ["Active", "Inactive"]), match: { field: "status" } }],
        },
      ],
      results: {
        dataset: "EmployerSearchRow",
        heading: "Search Results",
        headingStyle: "title",
        count: { text: "{count} employer(s) found.", position: "heading" },
        emptyText: "No records found matching your search criteria.",
        sort: ["name"],
        pageSize: 10,
        pageSizeOptions: [10, 25, 50],
        columns: [
          { field: "name", label: "Employer Name", link: true },
          // As captured: the org shows the record URL in this column (likely misconfigured). Fix = field: "employerCode".
          { field: "recordUrl", label: "Employer Code", link: true },
          { field: "ein", label: "EIN" },
          { field: "street", label: "Street Address" },
          { field: "city", label: "City" },
          { field: "state", label: "State" },
          { field: "zip", label: "Zip Code" },
          { field: "status", label: "Status" },
          { field: "admin", label: "Admin" },
        ],
      },
    },
    {
      id: "claim",
      label: "Claim Search",
      heading: "Claim Search",
      criteriaTitle: "Search Criteria",
      buttons: "right",
      blocks: [
        {
          id: "claimInformation",
          title: "Claim Information",
          titleStyle: "plain",
          columns: 4,
          controlSize: "3-of-4",
          fields: [
            { id: "employer", label: "Employer", type: "picklist", options: EMPLOYER_NAMES },
            { id: "memberLastName", label: "Member Last Name", type: "text" },
            { id: "memberFirstName", label: "Member First Name", type: "text" },
            { id: "claimNumber", label: "Claim Number", type: "text" },
            { id: "memberId", label: "Member ID", type: "text" },
          ],
          checkboxGroups: [allOnly("claimStatus", "Claim Status:", CLAIM_SEARCH_STATUSES)],
        },
      ],
      advanced: {
        showLabel: "Advanced Search",
        hideLabel: "Show Less",
        blocks: [
          {
            id: "claimantInformation",
            title: "Claimant Information",
            titleStyle: "shaded",
            columns: 3,
            controlSize: "3-of-4",
            fields: [
              { id: "claimantLastName", label: "Claimant / Dependent Last Name", type: "text" },
              { id: "claimantFirstName", label: "Claimant / Dependent First Name", type: "text" },
              { id: "claimantId", label: "Claimant / Dependent ID", type: "text" },
            ],
          },
          {
            id: "claimDetails",
            title: "Claim Details",
            titleStyle: "shaded",
            columns: 3,
            controlSize: "3-of-4",
            fields: [
              { id: "provider", label: "Provider", type: "text" },
              { id: "planYear", label: "Plan Year", type: "picklist", options: [] },
              { id: "expenseType", label: "Expense Type", type: "picklist", options: [] },
            ],
            checkboxGroups: [
              allOnly("submissionSource", "Submission Source (Filing Method):", ["Member Submitted", "Debit Card", "Member Portal", "Concierge", "Mobile App", "Paper/Fax", "Carrier File"]),
              allOnly("intakeChannel", "Intake Channel (Reimbursement Type):", ["Member Portal", "Paper / Mail", "Phone / Staff Assisted", "Debit Card Feed", "Concierge"]),
              allOnly("escalationIndicator", "Escalation Indicator:", [
                "High Dollar / Carrier Approval",
                "Manager Review",
                "Training / QA",
                "Repayment Required",
                "Appeal Filed / Appeal Review",
                "Daily Payment Maximum",
                "Foreign / Specialized Claim Review",
                "OCR Low Confidence",
                "Aging / Escalation Threshold Exceeded",
              ]),
            ],
            fieldsAfter: [{ id: "escalationState", label: "Escalation State", type: "picklist", options: ["Either"], noneOption: false, defaultValue: "Either" }],
          },
          {
            id: "bucket",
            title: "Bucket (Benefit Category)",
            titleStyle: "shaded",
            columns: 3,
            checkboxGroups: [
              allOnly("bucket", "Bucket (Benefit Category)", [
                "Covered Medical Expenses",
                "Dental Treatments",
                "Durable Medical Equipment",
                "Mental Health",
                "Prescription Drugs",
                "Preventive Care",
                "Vision Treatments",
                "Wellness Treatments",
              ]),
            ],
          },
          {
            id: "dateFilters",
            title: "Date Filters",
            titleStyle: "shaded",
            columns: 2,
            controlSize: "1-of-2",
            fields: [
              { id: "serviceFrom", label: "Date of Service — From", type: "date" },
              { id: "serviceTo", label: "Date of Service — To", type: "date" },
              { id: "submittedFrom", label: "Submission Date — From", type: "date" },
              { id: "submittedTo", label: "Submission Date — To", type: "date" },
            ],
          },
          {
            id: "amountRange",
            title: "Claim Amount Range",
            titleStyle: "shaded",
            columns: 2,
            controlSize: "1-of-2",
            fields: [
              { id: "minAmount", label: "Minimum Amount ($)", type: "number" },
              { id: "maxAmount", label: "Maximum Amount ($)", type: "number" },
            ],
          },
        ],
      },
      results: {
        dataset: "ClaimSearchRow",
        count: { text: "{count} record(s) found.", position: "below" },
        emptyText: "No records found matching your search criteria.",
        columns: [],
      },
    },
  ],
};
