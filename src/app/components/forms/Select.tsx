import { useId, type ChangeEvent } from "react";
import { describedBy } from "../utils/formIds";
import { FormElement, type FormElementLayout } from "./FormElement";

export type SelectOption = { value: string; label: string; disabled?: boolean };

export type SelectProps = {
  label: string;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
  /** Leading empty option, e.g. "--None--". */
  placeholderOption?: string;
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  layout?: FormElementLayout;
  id?: string;
  name?: string;
};

/** SLDS Select blueprint (native select in .slds-select_container). Prefer Combobox (picklist) for record forms. */
export function Select({
  label,
  options,
  value,
  defaultValue,
  onChange,
  placeholderOption,
  hideLabel,
  required,
  disabled,
  error,
  helpText,
  layout,
  id,
  name,
}: SelectProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FormElement inputId={inputId} label={label} hideLabel={hideLabel} required={required} error={error} helpText={helpText} layout={layout}>
      <div className="slds-select_container">
        <select
          className="slds-select"
          id={inputId}
          name={name}
          value={value}
          defaultValue={value === undefined ? defaultValue : undefined}
          required={required}
          disabled={disabled}
          aria-describedby={describedBy(inputId, Boolean(error ?? helpText))}
          onChange={(e) => onChange?.(e.target.value, e)}
        >
          {placeholderOption !== undefined ? <option value="">{placeholderOption}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </FormElement>
  );
}
