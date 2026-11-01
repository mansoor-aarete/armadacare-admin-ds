import { useId } from "react";
import { cx } from "../utils/cx";
import { helpId } from "../utils/formIds";
import { Checkbox } from "./Checkbox";

export type CheckboxGroupOption = { value: string; label: string; disabled?: boolean };
/** "stacked" = SLDS default (one per line); "inline" = horizontal row (Figma status filters), via slds-grid. */
export type CheckboxGroupLayout = "stacked" | "inline";

export type CheckboxGroupProps = {
  legend: string;
  options: CheckboxGroupOption[];
  /** Checked values (controlled). */
  value: string[];
  onChange: (value: string[]) => void;
  layout?: CheckboxGroupLayout;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};

/** SLDS Checkbox Group blueprint (fieldset.slds-form-element › legend › control › checkboxes). */
export function CheckboxGroup({ legend, options, value, onChange, layout = "stacked", required, disabled, error }: CheckboxGroupProps) {
  const id = useId();
  const toggle = (v: string, on: boolean) => onChange(on ? [...value, v] : value.filter((x) => x !== v));
  return (
    <fieldset className={cx("slds-form-element", error && "slds-has-error", required && "slds-is-required")} aria-describedby={error ? helpId(id) : undefined}>
      <legend className="slds-form-element__legend slds-form-element__label">
        {required ? (
          <abbr className="slds-required" title="required">
            *{" "}
          </abbr>
        ) : null}
        {legend}
      </legend>
      <div className={cx("slds-form-element__control", layout === "inline" && "slds-grid slds-wrap")}>
        {options.map((o) => (
          <Checkbox
            key={o.value}
            wrapper="none"
            className={layout === "inline" ? "slds-m-right_medium" : undefined}
            label={o.label}
            name={id}
            value={o.value}
            checked={value.includes(o.value)}
            disabled={disabled || o.disabled}
            onChange={(on) => toggle(o.value, on)}
          />
        ))}
      </div>
      {error ? (
        <div className="slds-form-element__help" id={helpId(id)}>
          {error}
        </div>
      ) : null}
    </fieldset>
  );
}
