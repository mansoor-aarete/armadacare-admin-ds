import { useState } from "react";
import { Checkbox } from "../components/forms/Checkbox";
import { CheckboxGroup } from "../components/forms/CheckboxGroup";
import { Combobox, type LookupOption } from "../components/forms/Combobox";
import type { ObjectSwitcherOption } from "../components/forms/ComboboxObjectSwitcher";
import { Datepicker } from "../components/forms/Datepicker";
import { DualListbox } from "../components/forms/DualListbox";
import { Input } from "../components/forms/Input";
import { Select } from "../components/forms/Select";
import { Textarea } from "../components/forms/Textarea";
import { ShowcaseExample } from "./ShowcaseExample";
import { ShowcaseSpace } from "./ShowcaseSpace";

const TODAY = "2026-10-21";

const TYPE_OPTIONS = [
  { value: "prospect", label: "Prospect" },
  { value: "client", label: "Client" },
  { value: "former", label: "Former Client" },
  { value: "partner", label: "Partner" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted" },
  { value: "pending", label: "Pending Review" },
  { value: "approved", label: "Approved" },
  { value: "denied", label: "Denied" },
];

export const USER_OPTIONS: LookupOption[] = [
  { value: "u1", label: "Mansoor Ahmad", iconName: "standard:user", objectLabel: "User", meta: "Admin • ArmadaCare" },
  { value: "u2", label: "Feng Yue", iconName: "standard:user", objectLabel: "User", meta: "Analyst • ArmadaCare" },
  { value: "u3", label: "Deepak Malviya", iconName: "standard:user", objectLabel: "User", meta: "Developer • ArmadaCare" },
];

const ACCOUNT_OPTIONS: LookupOption[] = [
  { value: "a1", label: "Blalock Development Co", iconName: "standard:account", objectLabel: "Account", meta: "Group • TN" },
  { value: "a2", label: "E&J Gallo Winery", iconName: "standard:account", objectLabel: "Account", meta: "Group • CA" },
  { value: "a3", label: "Meridian Partners LLC", iconName: "standard:account", objectLabel: "Account", meta: "Group • IL" },
];

export const SWITCHER_OPTIONS: ObjectSwitcherOption[] = [
  { value: "user", label: "User", iconName: "standard:user" },
  { value: "account", label: "Account", iconName: "standard:account" },
  { value: "contact", label: "Contact", iconName: "standard:contact" },
];

const PARTICIPANT_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "participant", label: "Participant" },
  { value: "unknown", label: "Unknown" },
  { value: "no-mail", label: "Do Not Mail" },
  { value: "no-email", label: "Do Not Email" },
  { value: "no-call", label: "Do Not Call", locked: true },
];

export function FormsSection() {
  const [statuses, setStatuses] = useState<string[]>(["all"]);
  const [stacked, setStacked] = useState<string[]>(["approved"]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [chosen2, setChosen2] = useState<string[]>(["no-call"]);
  const [switcher, setSwitcher] = useState("user");

  return (
    <section className="slds-m-bottom_x-large" data-visual-id="forms">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Form controls</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Input — default / placeholder / value" visualId="input-basic">
          <Input label="Doing Business As" />
          <Input label="Search" placeholder="Search this list..." iconLeft="utility:search" hideLabel />
          <Input label="Account Name" defaultValue="Blalock Development Co" />
        </ShowcaseExample>
        <ShowcaseExample title="Input — required / error / disabled / read-only" visualId="input-states">
          <Input label="Last Name" required />
          <Input label="Account Name" required error="Complete this field." />
          <Input label="Employee Number" disabled defaultValue="U5419313101" />
          <Input label="CDEX Id" readOnly defaultValue="008554542" />
        </ShowcaseExample>
        <ShowcaseExample title="Input — help / field-level help / icons" visualId="input-help">
          <Input label="EIN" placeholder="XX-XXXXXXX" helpText="Nine digits, as on the IRS letter." />
          <Input label="TIN" fieldLevelHelp="Taxpayer Identification Number of the agency." />
          <Input label="Parent Account" placeholder="Search Accounts..." iconRight="utility:search" />
        </ShowcaseExample>
        <ShowcaseExample title="Input — horizontal / stacked layout" visualId="input-layout">
          <Input label="Phone" layout="horizontal" />
          <Input label="Fax" layout="horizontal" required error="Complete this field." />
          <Input label="Website" layout="stacked" />
        </ShowcaseExample>
        <ShowcaseExample title="Textarea" visualId="textarea">
          <Textarea label="Description" placeholder="Placeholder text…" />
          <Textarea label="Comments" required error="Complete this field." />
          <Textarea label="Notes" disabled defaultValue="Read only note" />
        </ShowcaseExample>
        <ShowcaseExample title="Checkbox — states" visualId="checkbox-states">
          <Checkbox label="Send notification email" />
          <Checkbox label="Is Active" defaultChecked />
          <Checkbox label="Select all" indeterminate />
          <Checkbox label="Mark for Delete" disabled />
          <Checkbox label="Is Dismissible" defaultChecked disabled />
          <Checkbox label="Accept terms" required error="This field is required" />
          <Checkbox label="Select row Aarav Aramanai" hideLabel defaultChecked />
        </ShowcaseExample>
        <ShowcaseExample title="Checkbox group — inline (status filters)" visualId="checkbox-group-inline">
          <CheckboxGroup legend="Claim Status:" layout="inline" options={STATUS_OPTIONS} value={statuses} onChange={setStatuses} />
        </ShowcaseExample>
        <ShowcaseExample title="Checkbox group — stacked / required error / disabled" visualId="checkbox-group-stacked">
          <CheckboxGroup legend="Status" options={STATUS_OPTIONS.slice(1, 4)} value={stacked} onChange={setStacked} required error="Select at least one status." />
          <CheckboxGroup legend="Locked" options={STATUS_OPTIONS.slice(4)} value={["approved"]} onChange={() => undefined} disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Select (native)" visualId="select">
          <Select label="Records per page" options={[{ value: "10", label: "10" }, { value: "25", label: "25" }, { value: "50", label: "50" }]} defaultValue="10" />
          <Select label="Escalation State" placeholderOption="Either" options={[{ value: "yes", label: "Escalated" }, { value: "no", label: "Not escalated" }]} required error="Select a value." />
        </ShowcaseExample>
        <ShowcaseExample title="Picklist — none / value / required / disabled" visualId="picklist-states">
          <Combobox label="Concierge Run Out" placeholder="--None--" options={TYPE_OPTIONS} />
          <Combobox label="Type" options={TYPE_OPTIONS} defaultValue="prospect" />
          <Combobox
            label="Status"
            required
            options={[{ value: "inactive", label: "Inactive" }, { value: "active", label: "Active" }]}
            defaultValue="inactive"
            helpText={<a href="#dependencies">View all dependencies</a>}
          />
          <Combobox label="Account Access" options={TYPE_OPTIONS} defaultValue="client" disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Picklist — error" visualId="picklist-error">
          <Combobox label="Industry" placeholder="--None--" options={TYPE_OPTIONS} required error="Complete this field." />
        </ShowcaseExample>
        <ShowcaseExample title="Picklist — open (selected option)" visualId="picklist-open">
          <ShowcaseSpace units={4}>
            <Combobox label="Type" options={TYPE_OPTIONS} defaultValue="prospect" defaultOpen />
          </ShowcaseSpace>
        </ShowcaseExample>
        <ShowcaseExample title="Lookup — empty / selected / disabled" visualId="lookup-states">
          <Combobox variant="lookup" label="Parent Account" placeholder="Search Accounts..." options={ACCOUNT_OPTIONS} />
          <Combobox variant="lookup" label="Assigned To" required options={USER_OPTIONS} defaultValue="u1" />
          <Combobox variant="lookup" label="Referred By" placeholder="Search Accounts..." options={ACCOUNT_OPTIONS} disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Lookup — object switcher / error" visualId="lookup-switcher">
          <Combobox
            variant="lookup"
            label="Select New Owner"
            required
            placeholder="Search Users..."
            options={USER_OPTIONS}
            objectSwitcher={{ options: SWITCHER_OPTIONS, value: switcher, onChange: setSwitcher }}
          />
          <Combobox variant="lookup" label="Related To" placeholder="Search Accounts..." options={ACCOUNT_OPTIONS} required error="Complete this field." />
        </ShowcaseExample>
        <ShowcaseExample title="Lookup — open results" visualId="lookup-open">
          <ShowcaseSpace units={4}>
            <Combobox variant="lookup" label="Account Manager" placeholder="Search People..." options={USER_OPTIONS} defaultOpen />
          </ShowcaseSpace>
        </ShowcaseExample>
        <ShowcaseExample title="Datepicker — empty / value / required / error / disabled" visualId="datepicker-states">
          <Datepicker label="Testimonial Provided" today={TODAY} />
          <Datepicker label="Due Date" defaultValue="2026-10-21" today={TODAY} />
          <Datepicker label="Date of Service — From" required error="Complete this field." today={TODAY} />
          <Datepicker label="Last Status Update" disabled defaultValue="2026-04-19" today={TODAY} showFormatHint />
        </ShowcaseExample>
        <ShowcaseExample title="Datepicker — open (today + selected)" visualId="datepicker-open">
          <ShowcaseSpace units={7}>
            <Datepicker label="Date Completed" defaultValue="2026-10-14" today={TODAY} defaultOpen />
          </ShowcaseSpace>
        </ShowcaseExample>
        <ShowcaseExample title="Dual listbox — default / highlighted" visualId="dual-listbox" wide>
          <DualListbox label="Participant Summary" options={PARTICIPANT_OPTIONS.slice(0, 2)} value={chosen} onChange={setChosen} defaultHighlighted={["admin"]} />
        </ShowcaseExample>
        <ShowcaseExample title="Dual listbox — required / locked item / disabled" visualId="dual-listbox-states" wide>
          <DualListbox label="Contacting Restrictions" required options={PARTICIPANT_OPTIONS} value={chosen2} onChange={setChosen2} />
          <DualListbox label="Disabled" options={PARTICIPANT_OPTIONS.slice(0, 3)} value={["admin"]} onChange={() => undefined} disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Dual listbox — responsive columns, size 4 (record form)" visualId="dual-listbox-responsive">
          <DualListbox label="Participant Summary" options={PARTICIPANT_OPTIONS.slice(0, 2)} value={[]} onChange={() => undefined} responsive size={4} />
        </ShowcaseExample>
      </div>
    </section>
  );
}
