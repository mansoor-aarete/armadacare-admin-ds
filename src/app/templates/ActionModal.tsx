import { useState } from "react";
import type { ActionConfig, FieldValue, RecordData } from "../../config/types";
import { deleteRecord } from "../../services/records";
import { Button } from "../components/buttons/Button";
import { Modal } from "../components/overlays/Modal";
import { FieldInput } from "../widgets/FieldInput";
import { hasValue } from "../widgets/fieldValues";

export type ActionModalProps = {
  apiName: string;
  record: RecordData;
  action: Extract<ActionConfig, { kind: "delete" | "form" }>;
  onClose: () => void;
  /** Called after a delete went through. */
  onDeleted: () => void;
};

/** Quick-action modal from config: delete confirmation or a small form (Share …). */
export function ActionModal({ apiName, record, action, onClose, onDeleted }: ActionModalProps) {
  const [values, setValues] = useState<Record<string, FieldValue>>(() =>
    action.kind === "form" ? Object.fromEntries(action.fields.map((f) => [f.key, f.defaultValue ?? null])) : {},
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const save = () => {
    const missing = Object.fromEntries(action.fields.filter((f) => f.field.required && !hasValue(values[f.key])).map((f) => [f.key, "Complete this field."]));
    setErrors(missing);
    if (Object.keys(missing).length === 0) onClose();
  };
  const full = action.fields.filter((f) => f.size !== "1-of-4");
  const inline = action.fields.filter((f) => f.size === "1-of-4");

  return (
    <Modal
      open
      heading={action.title}
      onClose={onClose}
      footer={
        <>
          <Button label="Cancel" onClick={onClose} />
          <Button label={action.saveLabel} variant="brand" onClick={save} />
        </>
      }
    >
      {full.map((f) => (
        <div key={f.key} className="slds-m-bottom_small">
          <FieldInput
            fieldKey={f.key}
            def={f.field}
            value={values[f.key]}
            layout="stacked"
            objectSwitcher={f.objectSwitcher}
            error={errors[f.key]}
            onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))}
          />
        </div>
      ))}
      {inline.length ? (
        <div className="slds-grid slds-gutters_x-small slds-m-bottom_small">
          {inline.map((f) => (
            <div key={f.key} className="slds-col slds-size_1-of-4">
              <FieldInput
                fieldKey={f.key}
                def={f.field}
                value={values[f.key]}
                layout="stacked"
                error={errors[f.key]}
                onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))}
              />
            </div>
          ))}
        </div>
      ) : null}
      {action.note ? (
        <p>
          {action.note.text}{" "}
          <a href="#" onClick={(e) => e.preventDefault()}>
            {action.note.linkLabel}
          </a>
        </p>
      ) : null}
    </Modal>
  );
}
