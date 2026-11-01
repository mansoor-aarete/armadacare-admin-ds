import { useState, type FocusEvent } from "react";
import type { FieldValue } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { createRecord, getCurrentUser } from "../../services/records";
import { FormFooter } from "../components/forms/FormFooter";
import { ErrorPopover } from "../components/overlays/ErrorPopover";
import { Modal } from "../components/overlays/Modal";
import { useConsole } from "../console/ConsoleContext";
import { newUrl, recordUrl } from "../console/urls";
import { useServiceData } from "../console/useServiceData";
import { FieldSection } from "../widgets/FieldSection";
import { hasValue } from "../widgets/fieldValues";

export type RecordFormPageProps = {
  apiName: string;
  recordType?: string;
};

const REQUIRED_MESSAGE = "Complete this field.";

/** New-record form in a console tab (inline modal panel), sections from the object's form config. */
export function RecordFormPage({ apiName, recordType }: RecordFormPageProps) {
  const config = getObjectConfig(apiName);
  const con = useConsole();
  const { data: owner } = useServiceData(() => getCurrentUser(), []);
  const formId = config.recordTypes?.find((t) => t.value === recordType)?.form ?? Object.keys(config.forms ?? {})[0];
  const form = config.forms?.[formId];
  const [values, setValues] = useState<Record<string, FieldValue>>(() => ({ ...(form?.defaults ?? {}) }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [popover, setPopover] = useState(false);

  if (!form) return null;
  const shown: Record<string, FieldValue> = {
    ...values,
    ...(config.recordTypeField && recordType ? { [config.recordTypeField]: recordType } : {}),
    ...(config.ownerField && owner ? { [config.ownerField]: owner } : {}),
  };
  const requiredKeys = Object.entries(config.fields)
    .filter(([, def]) => def.required && !def.readOnly)
    .map(([key]) => key);

  const validate = () => Object.fromEntries(requiredKeys.filter((k) => !hasValue(values[k])).map((k) => [k, REQUIRED_MESSAGE]));
  // Lightning checks a required field when it loses focus.
  const onBlur = (e: FocusEvent<HTMLDivElement>) => {
    const key = e.target.id;
    if (requiredKeys.includes(key) && !hasValue(values[key])) setErrors((s) => ({ ...s, [key]: REQUIRED_MESSAGE }));
  };
  const save = (andNew: boolean) => {
    const missing = validate();
    setErrors(missing);
    setSubmitted(true);
    setPopover(Object.keys(missing).length > 0);
    if (Object.keys(missing).length) return;
    createRecord(apiName, recordType, values).then((r) => con.replaceTab(andNew ? newUrl(apiName) : recordUrl(apiName, r.id)));
  };
  const errorKeys = Object.keys(errors);

  return (
    <Modal
      open
      inline
      heading={`New ${config.label}${recordType ? `: ${recordType}` : ""}`}
      onClose={() => con.closeTab()}
      footer={
        <FormFooter
          position="inline"
          hasErrors={submitted && errorKeys.length > 0}
          onErrorClick={() => setPopover((p) => !p)}
          errorPopover={
            popover && errorKeys.length ? (
              <ErrorPopover
                fields={errorKeys.map((key) => ({ label: config.fields[key].label, onClick: () => document.getElementById(key)?.focus() }))}
                onClose={() => setPopover(false)}
              />
            ) : null
          }
          actions={[
            { value: "cancel", label: "Cancel" },
            { value: "saveNew", label: "Save & New" },
            { value: "save", label: "Save", variant: "brand" },
          ]}
          onAction={(a) => (a === "cancel" ? con.closeTab() : save(a === "saveNew"))}
        />
      }
    >
      <p className="slds-text-align_right slds-m-bottom_small">
        <abbr className="slds-required" title="required">
          *
        </abbr>{" "}
        = Required Information
      </p>
      <div onBlur={onBlur}>
        {form.sections.map((s) => (
          <FieldSection
            key={s.id}
            config={config}
            section={s}
            values={shown}
            mode="edit"
            errors={errors}
            onChange={(key, v) => {
              setValues((cur) => ({ ...cur, [key]: v }));
              if (hasValue(v)) setErrors(({ [key]: _, ...rest }) => rest);
            }}
          />
        ))}
      </div>
    </Modal>
  );
}
