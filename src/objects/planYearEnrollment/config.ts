import type { FieldDef, ObjectConfig } from "../../config/types";
import { standardActions } from "../planYear/config";

/*
 * Plan Year Enrollment — Figma E1, E2: split view "All" (no search), one Details tab with the record fields and the
 * Plan Year Enrollment Members related list.
 */

const contact = (label: string): FieldDef => ({ label, type: "lookup", lookup: { objectApiName: "Contact", placeholder: "Search Contacts..." } });
const enrollmentStatus: FieldDef = { label: "Status", type: "picklist", options: ["Active", "Terminated"] };

export const PLAN_YEAR_ENROLLMENT_CONFIG: ObjectConfig = {
  apiName: "PlanYearEnrollment",
  label: "Plan Year Enrollment",
  labelPlural: "Plan Year Enrollments",
  iconName: "custom:custom18",
  nameField: "name",
  ownerField: "owner",
  keyPrefix: "a1E",
  fields: {
    name: { label: "Plan Year Enrollment Number", type: "text", readOnly: true },
    owner: { label: "Owner", type: "lookup", readOnly: true, action: "changeOwner", lookup: { objectApiName: "User", placeholder: "Search People..." } },
    effectiveDate: { label: "Effective Date", type: "date" },
    planYearTier: { label: "Plan Year Tier", type: "lookup", lookup: { objectApiName: "PlanYearTier", placeholder: "Search Plan Year Tiers..." } },
    planYear: { label: "Plan Year", type: "lookup", lookup: { objectApiName: "PlanYear", placeholder: "Search Plan Years..." } },
    status: enrollmentStatus,
    subscriber: contact("Subscriber"),
    createdBy: { label: "Created By", type: "audit", readOnly: true },
    lastModifiedBy: { label: "Last Modified By", type: "audit", readOnly: true },
  },
  listViews: [
    {
      id: "All",
      label: "All",
      filter: { kind: "all" },
      sort: { field: "name", direction: "ascending" },
      rowNumbers: "hidden",
      columns: [{ field: "name", link: "record" }, { field: "planYear", link: "lookup" }, { field: "subscriber", link: "lookup" }, { field: "status" }],
    },
  ],
  defaultListView: "All",
  splitView: { search: false },
  layouts: {
    enrollment: {
      highlights: { fields: [], actions: ["edit", "delete", "clone"], overflow: ["sharing", "printableView"] },
      tabs: [
        {
          id: "details",
          label: "Details",
          sections: [
            {
              id: "main",
              rows: [
                ["name", "owner"],
                ["effectiveDate", null],
                ["planYearTier", null],
                ["planYear", null],
                ["status", null],
                ["subscriber", null],
                ["createdBy", "lastModifiedBy"],
              ],
            },
          ],
          regions: [
            {
              kind: "relatedList",
              list: {
                id: "members",
                label: "Plan Year Enrollment Members",
                iconName: "custom:custom18",
                objectApiName: "PlanYearEnrollmentMember",
                parentField: "enrollment",
                buttons: [
                  { value: "changeOwner", label: "Change Owner" },
                  { value: "new", label: "New" },
                ],
                newAction: "newMember",
                display: "table",
                selectable: true,
                settings: true,
                meta: true,
                columns: [
                  { field: "name", link: "record" },
                  { field: "member", link: "lookup" },
                  { field: "subscriber", link: "lookup" },
                  { field: "status" },
                ],
              },
            },
          ],
        },
      ],
      defaultTab: "details",
      sidebar: [],
      mainWidth: "2-of-3",
    },
  },
  actions: [
    ...standardActions("Plan Year Enrollment"),
    {
      id: "newMember",
      label: "New Plan Year Enrollment Member",
      kind: "form",
      title: "New Plan Year Enrollment Member",
      requiredLegend: true,
      saveLabel: "Save",
      fields: [
        { key: "member", field: { ...contact("Member"), required: true } },
        { key: "status", field: enrollmentStatus, defaultValue: "Active" },
      ],
      save: { kind: "create", objectApiName: "PlanYearEnrollmentMember", parentField: "enrollment", map: { member: "member", status: "status" } },
    },
  ],
};

export const PLAN_YEAR_ENROLLMENT_MEMBER_CONFIG: ObjectConfig = {
  apiName: "PlanYearEnrollmentMember",
  label: "Plan Year Enrollment Member",
  labelPlural: "Plan Year Enrollment Members",
  iconName: "custom:custom18",
  nameField: "name",
  keyPrefix: "a1M",
  fields: {
    name: { label: "Plan Year Enrollment Member Name", type: "text" },
    member: contact("Member"),
    subscriber: contact("Subscriber"),
    status: { label: "Status", type: "picklist", options: ["Active", "Terminated"] },
    enrollment: { label: "Plan Year Enrollment", type: "lookup", lookup: { objectApiName: "PlanYearEnrollment", placeholder: "Search Plan Year Enrollments..." } },
  },
  listViews: [],
  defaultListView: "",
  layouts: {},
  actions: [],
};
