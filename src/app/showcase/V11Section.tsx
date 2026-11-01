import { useState } from "react";
import { ScopedNotification } from "../components/feedback/ScopedNotification";
import { Select } from "../components/forms/Select";
import { Timepicker } from "../components/forms/Timepicker";
import { RecordField } from "../components/record/RecordField";
import { RecordFieldGrid } from "../components/record/RecordFieldGrid";
import { ShowcaseExample } from "./ShowcaseExample";
import { ShowcaseSpace } from "./ShowcaseSpace";

const REASONS = [
  { value: "not-covered", label: "Not covered" },
  { value: "duplicate", label: "Duplicate" },
  { value: "missing-documentation", label: "Missing documentation" },
];

/** ds-v1.1 additions: Timepicker, Select multiple, ScopedNotification, RecordFieldGrid 3 columns. */
export function V11Section() {
  const [time, setTime] = useState<string | null>("12:00");
  const [reasons, setReasons] = useState<string[]>([]);
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="v11">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">ds-v1.1 — time picker · multi-select · scoped notification · 3-column grid</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Timepicker — value / empty / required error / disabled" visualId="timepicker-states">
          <Timepicker label="Start Time" value={time} onChange={setTime} />
          <Timepicker label="End Time" placeholder="Select a time…" />
          <Timepicker label="Due Time" required error="Complete this field." />
          <Timepicker label="Locked Time" defaultValue="22:00" disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Timepicker — open (15-minute steps, selected time)" visualId="timepicker-open">
          <ShowcaseSpace units={5}>
            <Timepicker label="Start Time" defaultValue="09:00" defaultOpen />
          </ShowcaseSpace>
        </ShowcaseExample>
        <ShowcaseExample title="Select multiple — reason codes / preselected / disabled" visualId="select-multiple">
          <Select multiple label="Reason codes (select one or more)" options={REASONS} value={reasons} onChange={setReasons} />
          <Select multiple label="RMI reasons" options={REASONS} defaultValue={["duplicate"]} size={3} />
          <Select multiple label="Locked reasons" options={REASONS} defaultValue={["not-covered"]} disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Scoped notification — error / warning / success / info / light / dark" visualId="scoped-notifications" wide>
          {(["error", "warning", "success", "info", "light", "dark"] as const).map((v) => (
            <div key={v} className="slds-m-bottom_x-small">
              <ScopedNotification variant={v}>
                <p>
                  {v === "error"
                    ? "We couldn't load the allocation rules for this plan year tier."
                    : v === "light"
                      ? "It looks as if duplicates exist for this account."
                      : `Scoped notification — ${v} theme.`}
                </p>
              </ScopedNotification>
            </div>
          ))}
        </ShowcaseExample>
        <ShowcaseExample title="Record field grid — 3 columns, stacked caps labels (Claim Details)" visualId="record-grid-3" full>
          <RecordFieldGrid
            columns={3}
            fields={[
              <RecordField key="p" layout="stacked" capsLabel label="Participant" value={{ type: "link", text: "Lisa Chen" }} />,
              <RecordField key="ph" layout="stacked" capsLabel label="Phone Number" />,
              <RecordField key="e" layout="stacked" capsLabel label="Employer" />,
              <RecordField key="s" layout="stacked" capsLabel label="Service Date" value={{ type: "text", text: "Mar 20, 2026" }} />,
              <RecordField key="c" layout="stacked" capsLabel label="Expense Category" value={{ type: "text", text: "Dental" }} />,
              <RecordField key="t" layout="stacked" capsLabel label="Expense Type" value={{ type: "text", text: "Restorative Dental" }} />,
            ]}
          />
        </ShowcaseExample>
      </div>
    </section>
  );
}
