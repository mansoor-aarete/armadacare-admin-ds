import { useEffect, useId, useRef } from "react";
import { cx } from "../utils/cx";
import { describedBy, helpId } from "../utils/formIds";

export type CheckboxProps = {
  label: string;
  /** Controlled checked state; omit and use defaultChecked for uncontrolled. */
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  /** Visually hide the label (e.g. row selection in tables / split view). */
  hideLabel?: boolean;
  name?: string;
  value?: string;
  id?: string;
  /** "form-element" (default) wraps in .slds-form-element; "none" renders the bare .slds-checkbox (inside groups / tables). */
  wrapper?: "form-element" | "none";
  /** Extra SLDS classes on .slds-checkbox (e.g. spacing inside inline groups). */
  className?: string;
};

/** SLDS Checkbox blueprint (div.slds-checkbox › input + label.slds-checkbox__label › faux + label text). */
export function Checkbox({
  label,
  checked,
  defaultChecked,
  indeterminate = false,
  onChange,
  disabled,
  required,
  error,
  hideLabel,
  name,
  value,
  id,
  wrapper = "form-element",
  className,
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const box = (
    <div className={cx("slds-checkbox", className)}>
      <input
        ref={ref}
        type="checkbox"
        id={inputId}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={checked === undefined ? defaultChecked : undefined}
        disabled={disabled}
        required={required}
        aria-describedby={describedBy(inputId, Boolean(error))}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      <label className="slds-checkbox__label" htmlFor={inputId}>
        <span className="slds-checkbox_faux" />
        <span className={cx("slds-form-element__label", hideLabel && "slds-assistive-text")}>
          {required ? (
            <abbr className="slds-required" title="required">
              *
            </abbr>
          ) : null}
          {label}
        </span>
      </label>
    </div>
  );

  if (wrapper === "none") return box;
  return (
    <div className={cx("slds-form-element", error && "slds-has-error")}>
      <div className="slds-form-element__control">{box}</div>
      {error ? (
        <div className="slds-form-element__help" id={helpId(inputId)}>
          {error}
        </div>
      ) : null}
    </div>
  );
}
