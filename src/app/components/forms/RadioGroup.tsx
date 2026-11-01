import { useId } from "react";
import { cx } from "../utils/cx";
import { describedBy, helpId } from "../utils/formIds";

export type RadioOption = {
  value: string;
  label: string;
  /** Helper line under the option (Figma record-type picker). */
  description?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  legend: string;
  hideLegend?: boolean;
  options: RadioOption[];
  /** Controlled value. */
  value: string | null;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  /** Group name for the native radios (defaults to a unique id). */
  name?: string;
};

/**
 * SLDS Radio Group blueprint (fieldset.slds-form-element[role=radiogroup] › legend › control › span.slds-radio).
 * Option descriptions (Lightning record-type selector) are weak text aligned with the label and linked via aria-describedby.
 */
export function RadioGroup({ legend, hideLegend, options, value, onChange, required, disabled, error, name }: RadioGroupProps) {
  const uid = useId();
  const groupName = name ?? uid;
  return (
    <fieldset
      className={cx("slds-form-element", error && "slds-has-error")}
      role="radiogroup"
      aria-required={required ? "true" : undefined}
      aria-describedby={describedBy(uid, Boolean(error))}
    >
      <legend className={cx("slds-form-element__legend slds-form-element__label", hideLegend && "slds-assistive-text")}>
        {required ? (
          <abbr className="slds-required" title="required">
            *
          </abbr>
        ) : null}
        {legend}
      </legend>
      <div className="slds-form-element__control">
        {options.map((o) => {
          const id = `${uid}-${o.value}`;
          const descId = `${id}-desc`;
          return (
            <div key={o.value} className="slds-m-bottom_small">
              <span className="slds-radio">
                <input
                  type="radio"
                  id={id}
                  value={o.value}
                  name={groupName}
                  checked={value === o.value}
                  disabled={disabled || o.disabled}
                  aria-describedby={o.description ? descId : undefined}
                  onChange={() => onChange(o.value)}
                />
                <label className="slds-radio__label" htmlFor={id}>
                  <span className="slds-radio_faux" />
                  <span className="slds-form-element__label">{o.label}</span>
                </label>
              </span>
              {o.description ? (
                <div id={descId} className="slds-text-body_regular slds-text-color_weak slds-p-left_large">
                  {o.description}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      {error ? (
        <div className="slds-form-element__help" id={helpId(uid)}>
          {error}
        </div>
      ) : null}
    </fieldset>
  );
}
