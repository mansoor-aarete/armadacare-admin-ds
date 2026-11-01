import { Fragment, useState, type ReactNode } from "react";
import type { ActionConfig, ActionFieldConfig, FieldValue, LookupValue, RecordData } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { createRecord, deleteRecord, recordName, updateRecord } from "../../services/records";
import { Button } from "../components/buttons/Button";
import { Modal } from "../components/overlays/Modal";
import { cx } from "../components/utils/cx";
import { FieldInput } from "../widgets/FieldInput";
import { FieldView } from "../widgets/FieldView";
import { hasValue, isLookup } from "../widgets/fieldValues";

export type ActionModalProps = {
  apiName: string;
  record: RecordData;
  action: Extract<ActionConfig, { kind: "delete" | "form" | "message" }>;
  currentUser?: LookupValue;
  /** Today's ISO date ("$today" defaults). */
  today: string;
  onClose: () => void;
  /** Called after a delete went through. */
  onDeleted: () => void;
};

const SIZE_CLASS: Record<NonNullable<ActionFieldConfig["size"]>, string> = {
  "1-of-1": "slds-col slds-size_1-of-1",
  "1-of-2": "slds-col slds-size_1-of-2",
  "1-of-4": "slds-col slds-size_1-of-4",
};

const FULL = "1-of-1";

/** "{recordName}" / "{ownerName}" → bold text. */
function richText(text: string, tokens: Record<string, string>): ReactNode {
  return text.split(/(\{\w+\})/).map((part, i) => {
    const m = /^\{(\w+)\}$/.exec(part);
    return m ? (
      <strong key={i}>{tokens[m[1]] ?? ""}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

/** Quick-action modal from config: delete confirmation or a form (Share, Change Owner, Log an Activity …). */
export function ActionModal({ apiName, record, action, currentUser, today, onClose, onDeleted }: ActionModalProps) {
  const config = getObjectConfig(apiName);
  const owner = config.ownerField ? record.values[config.ownerField] : null;
  const tokens: Record<string, string> = { recordName: recordName(apiName, record), ownerName: isLookup(owner) ? owner.name : "" };
  const resolve = (v: FieldValue | undefined): FieldValue => {
    if (v === "$today") return today;
    if (v === "$currentUser") return currentUser ?? null;
    if (v === "$recordName") return tokens.recordName;
    return v ?? null;
  };
  const [values, setValues] = useState<Record<string, FieldValue>>(() =>
    action.kind === "form" ? Object.fromEntries(action.fields.map((f) => [f.key, resolve(f.defaultValue)])) : {},
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (action.kind === "message") {
    return (
      <Modal open heading={action.title} size={action.size ?? "default"} onClose={onClose} footer={<Button label={action.closeLabel} variant="brand" onClick={onClose} />}>
        <p>{action.message}</p>
      </Modal>
    );
  }
  if (action.kind === "delete") {
    return (
      <Modal
        open
        heading={action.title}
        onClose={onClose}
        footer={
          <>
            <Button label="Cancel" onClick={onClose} />
            <Button label={action.confirmLabel} variant="brand" onClick={() => deleteRecord(apiName, record.id).then(onDeleted)} />
          </>
        }
      >
        <p className="slds-text-align_center">{action.message}</p>
      </Modal>
    );
  }

  const pick = (map: Record<string, string>) => Object.fromEntries(Object.entries(map).map(([target, key]) => [target, values[key] ?? null]));
  const save = () => {
    const missing = Object.fromEntries(action.fields.filter((f) => f.field.required && !f.field.readOnly && !hasValue(values[f.key])).map((f) => [f.key, "Complete this field."]));
    setErrors(missing);
    if (Object.keys(missing).length) return;
    const s = action.save ?? { kind: "close" };
    const done =
      s.kind === "update"
        ? updateRecord(apiName, record.id, pick(s.map))
        : s.kind === "create"
          ? createRecord(s.objectApiName, undefined, { ...pick(s.map), [s.parentField]: { id: record.id, name: tokens.recordName, objectApiName: apiName } })
          : Promise.resolve();
    done.then(onClose);
  };

  return (
    <Modal
      open
      heading={action.title}
      size={action.size ?? "default"}
      onClose={onClose}
      footer={
        <>
          <Button label="Cancel" onClick={onClose} />
          <Button label={action.saveLabel} variant="brand" onClick={save} />
        </>
      }
    >
      {action.requiredLegend ? (
        <p className="slds-text-align_right slds-m-bottom_x-small">
          <abbr className="slds-required" title="required">
            *
          </abbr>{" "}
          = Required Information
        </p>
      ) : null}
      <div className="slds-grid slds-wrap slds-gutters_small">
        {action.fields.map((f) => (
          <div key={f.key} className={cx(SIZE_CLASS[f.size ?? FULL], "slds-m-bottom_small")}>
            {f.field.readOnly ? (
              <FieldView def={f.field} value={values[f.key]} layout="stacked" />
            ) : (
              <FieldInput
                fieldKey={f.key}
                def={f.field}
                value={values[f.key]}
                layout="stacked"
                objectSwitcher={f.objectSwitcher}
                error={errors[f.key]}
                onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))}
              />
            )}
          </div>
        ))}
      </div>
      {(action.notes ?? []).map((n, i) => (
        <div key={i} className="slds-m-bottom_small">
          <p>
            {richText(n.text, tokens)}
            {n.linkLabel ? (
              <>
                {" "}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  {n.linkLabel}
                </a>
              </>
            ) : null}
          </p>
          {n.bullets ? (
            <ul className="slds-m-top_small slds-m-left_medium">
              {n.bullets.map((b) => (
                <li key={b} className="slds-m-bottom_x-small">
                  {"• "}
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </Modal>
  );
}
