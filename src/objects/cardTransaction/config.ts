import type { ObjectConfig } from "../../config/types";
import { standardActions } from "../planYear/config";

/*
 * Card Transaction — Figma T1: split view "All", tabs Related · Details (Dynamic Forms sections; only Information and
 * System Information had fields in the capture), highlights with only the ▼ menu.
 */

export const CARD_TRANSACTION_CONFIG: ObjectConfig = {
  apiName: "CardTransaction",
  label: "Card Transaction",
  labelPlural: "Card Transactions",
  iconName: "custom:custom16",
  nameField: "name",
  ownerField: "owner",
  keyPrefix: "a2C",
  fields: {
    name: { label: "Card Transaction Number", type: "text", readOnly: true },
    employer: { label: "Employer", type: "lookup", lookup: { objectApiName: "Account", placeholder: "Search Accounts..." } },
    claimant: { label: "Claimant", type: "lookup", lookup: { objectApiName: "Contact", placeholder: "Search Contacts..." } },
    debitCardToken: { label: "Debit Card Token", type: "text" },
    cardNumber: { label: "Card Number", type: "text" },
    owner: { label: "Owner", type: "lookup", readOnly: true, action: "changeOwner", lookup: { objectApiName: "User", placeholder: "Search People..." } },
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
      columns: [{ field: "name", link: "record" }, { field: "claimant", link: "lookup" }, { field: "employer", link: "lookup" }, { field: "cardNumber" }],
    },
  ],
  defaultListView: "All",
  splitView: { titleRight: "claimant" },
  layouts: {
    cardTransaction: {
      highlights: { fields: [], actions: [], overflow: ["edit", "delete", "sharing", "printableView"] },
      tabs: [
        { id: "related", label: "Related", sections: [] },
        {
          id: "details",
          label: "Details",
          sections: [
            {
              id: "information",
              title: "Information",
              rows: [
                ["name", "employer"],
                [null, "claimant"],
                [null, "debitCardToken"],
                [null, "cardNumber"],
              ],
            },
            // Sections captured with their headers only (fields not captured) — add rows here when known.
            { id: "amounts", title: "Amounts" },
            { id: "merchant", title: "Merchant & Description" },
            { id: "adjudication", title: "Adjudication & Status" },
            { id: "participant", title: "Participant & Receipt Info" },
            {
              id: "systemInformation",
              title: "System Information",
              rows: [
                ["createdBy", "owner"],
                [null, "lastModifiedBy"],
              ],
            },
          ],
        },
      ],
      defaultTab: "details",
      sidebar: [],
      mainWidth: "2-of-3",
    },
  },
  actions: standardActions("Card Transaction"),
};
