import { useState } from "react";
import { updateRecord } from "../../../services/records";
import { Button } from "../../../app/components/buttons/Button";
import { Card } from "../../../app/components/cards/Card";
import { ScopedNotification } from "../../../app/components/feedback/ScopedNotification";
import { Datepicker } from "../../../app/components/forms/Datepicker";
import { Input } from "../../../app/components/forms/Input";
import { Select } from "../../../app/components/forms/Select";
import { Textarea } from "../../../app/components/forms/Textarea";
import type { ObjectWidgetProps } from "../../widgets";

/*
 * Split Approval calculator (Figma CL7): split a claim's total into Approved / Apply to Deductible / Denied / RMI
 * amounts, with reason codes for the denied and RMI parts. Composed from design-system components only.
 */

const DENIED_REASONS = ["Not covered", "Duplicate", "Missing documentation"];
const RMI_REASONS = ["EOB", "Itemized bill", "POL", "LOMN"];
const CAPTURED_ERROR =
  "No such column 'Is_Cost_Sharing_Source__c' on entity 'Plan_Year_Tier__c'. If you are attempting to use a custom field, be sure to append the '__c' after the custom field name. Please reference your WSDL or the describe call for the appropriate names.";

type Part = "approved" | "deductible" | "denied" | "rmi";
type Reason = { codes: string[]; other: string; amount: number };

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const pct = (n: number) => `${Math.round(n)}%`;

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="slds-col slds-size_1-of-2 slds-m-bottom_small">
      <p className="slds-text-body_small">{label}</p>
      <p className="slds-text-title_bold">{value}</p>
    </div>
  );
}

function ReasonPanel({ title, codes, partAmount, reasons, onAdd, onRemove, addLabel }: {
  title: string;
  codes: string[];
  partAmount: number;
  reasons: Reason[];
  onAdd: (r: Reason) => void;
  onRemove: () => void;
  addLabel: string;
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const [amount, setAmount] = useState("");
  const used = reasons.reduce((s, r) => s + r.amount, 0);
  const remaining = partAmount - used;
  const value = Number(amount) || 0;
  const canAdd = (selected.length > 0 || other.trim() !== "") && value > 0 && value <= remaining;
  return (
    <div className="slds-m-bottom_medium">
      <Card title={title} shaded bodyPadding>
        <Card bodyPadding>
          <div className="slds-grid slds-gutters_small">
            <div className="slds-col slds-size_1-of-2">
              <Select multiple label="Reason codes (select one or more)" options={codes.map((c) => ({ value: c, label: c }))} value={selected} onChange={setSelected} />
            </div>
            <div className="slds-col slds-size_1-of-2">
              <Input label="Other reason" value={other} onChange={setOther} />
            </div>
          </div>
          <div className="slds-m-top_small">
            <Input label="Amount ($)" inputMode="decimal" value={amount} onChange={setAmount} />
          </div>
          <div className="slds-grid slds-m-top_small">
            <div className="slds-col slds-size_1-of-2 slds-text-align_center">
              <Button
                label="Add Reason"
                variant="base"
                disabled={!canAdd}
                onClick={() => {
                  onAdd({ codes: selected, other, amount: value });
                  setSelected([]);
                  setOther("");
                  setAmount("");
                }}
              />
            </div>
            <div className="slds-col slds-size_1-of-2 slds-text-align_center">
              <Button label="Remove Reason" variant="base" disabled={!reasons.length} onClick={onRemove} />
            </div>
          </div>
          {reasons.map((r, i) => (
            <p key={i} className="slds-text-body_small slds-m-top_x-small">
              {[...r.codes, r.other].filter(Boolean).join(", ")} — {money(r.amount)}
            </p>
          ))}
        </Card>
        <div className="slds-grid slds-grid_vertical-align-center slds-m-top_small">
          <Button label={addLabel} disabled={remaining <= 0 || !reasons.length} />
          <span className="slds-m-left_small">Reason amount remaining: {money(Math.max(remaining, 0))}</span>
        </div>
      </Card>
    </div>
  );
}

export function SplitApprovalCalculator({ apiName, record, captured, onClose }: ObjectWidgetProps) {
  // In the captured state the plan-year lookup fails, so the total is unknown ($0.00), as in Figma.
  const billed = record.values.billedAmount;
  const total = captured ? 0 : typeof billed === "number" ? billed : 0;
  const [amounts, setAmounts] = useState<Record<Part, number>>({ approved: 0, deductible: 0, denied: 0, rmi: 0 });
  const [denied, setDenied] = useState<Reason[]>([]);
  const [rmi, setRmi] = useState<Reason[]>([]);
  const [deadline, setDeadline] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const allocated = amounts.approved + amounts.deductible + amounts.denied + amounts.rmi;
  const remaining = total - allocated;
  const share = (n: number) => (total ? (n / total) * 100 : 0);
  const claimNumber = typeof record.values.claimNumber === "string" ? record.values.claimNumber : "";

  const row = (part: Part, label: string) => (
    <div className="slds-grid slds-grid_vertical-align-end slds-gutters_small slds-m-bottom_small">
      <div className="slds-col slds-size_1-of-3">
        <p className="slds-text-title_bold slds-p-bottom_x-small">{label}</p>
      </div>
      <div className="slds-col slds-size_1-of-3">
        <Input label="Amount ($)" inputMode="decimal" value={String(amounts[part])} onChange={(v) => setAmounts((a) => ({ ...a, [part]: Number(v) || 0 }))} />
      </div>
      <div className="slds-col slds-size_1-of-3">
        <Input
          label="Percent (%)"
          inputMode="decimal"
          value={String(Math.round(share(amounts[part])))}
          onChange={(v) => setAmounts((a) => ({ ...a, [part]: Math.round((total * (Number(v) || 0)) / 100 * 100) / 100 }))}
        />
      </div>
    </div>
  );

  const submit = () => {
    const status = amounts.denied > 0 || amounts.rmi > 0 ? "Partial Pay" : "Approved";
    updateRecord(apiName, record.id, { status }).then(onClose);
  };

  return (
    <>
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Split Approval calculator</h2>
      {captured ? (
        <div className="slds-m-bottom_small">
          <ScopedNotification variant="light">
            <p className="slds-text-color_error">{CAPTURED_ERROR}</p>
          </ScopedNotification>
        </div>
      ) : null}
      <div className="slds-m-bottom_medium">
        <Card shaded bodyPadding>
          <div className="slds-grid slds-wrap">
            <Summary label="Claim number" value={captured ? "" : claimNumber} />
            <Summary label="Total claim amount" value={`${money(total)} / 100%`} />
            <Summary label="Remaining Deductible Balance" value={money(0)} />
            <Summary label="Allocated total" value={`${money(allocated)} / ${pct(share(allocated))}`} />
            <Summary label="Remaining to allocate" value={`${money(remaining)} / ${pct(share(remaining))}`} />
          </div>
        </Card>
      </div>
      {row("approved", "Approved")}
      {row("deductible", "Apply to Deductible")}
      {row("denied", "Denied")}
      <ReasonPanel
        title="Denied reasons"
        codes={DENIED_REASONS}
        partAmount={amounts.denied}
        reasons={denied}
        onAdd={(r) => setDenied((d) => [...d, r])}
        onRemove={() => setDenied((d) => d.slice(0, -1))}
        addLabel="Add Denied Amount"
      />
      {row("rmi", "RMI")}
      <ReasonPanel
        title="RMI reasons"
        codes={RMI_REASONS}
        partAmount={amounts.rmi}
        reasons={rmi}
        onAdd={(r) => setRmi((d) => [...d, r])}
        onRemove={() => setRmi((d) => d.slice(0, -1))}
        addLabel="Add RMI Amount"
      />
      <div className="slds-m-bottom_small">
        <Datepicker label="RMI deadline" value={deadline} onChange={setDeadline} />
      </div>
      <Textarea label="Notes (optional)" value={notes} onChange={setNotes} />
      <div className="slds-grid slds-m-top_medium">
        <Button label="Submit Split" variant="brand" disabled={total === 0 || Math.abs(remaining) > 0.005} onClick={submit} />
        <Button label="Cancel" className="slds-m-left_x-small" onClick={onClose} />
      </div>
    </>
  );
}
