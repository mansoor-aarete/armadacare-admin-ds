import { forwardRef, type ReactNode } from "react";
import { HelpText } from "../overlays/HelpText";
import { cx } from "../utils/cx";
import { helpId } from "../utils/formIds";

export type FormElementLayout = "default" | "stacked" | "horizontal";

export type FormElementProps = {
  /** Id of the control the label points at. Help / error text gets `${inputId}-help`. */
  inputId: string;
  label: ReactNode;
  hideLabel?: boolean;
  required?: boolean;
  /** Error message — adds slds-has-error and replaces helpText. */
  error?: ReactNode;
  /** Inline help under the control. */
  helpText?: ReactNode;
  /** Keep helpText for screen readers only (.slds-form-element__help.slds-assistive-text). */
  hideHelpText?: boolean;
  /** Info icon with a tooltip next to the label. */
  fieldLevelHelp?: string;
  layout?: FormElementLayout;
  /** Render the label as a span (controls without a native labelable element). */
  labelAs?: "label" | "span";
  labelId?: string;
  /** SLDS classes on .slds-form-element__control (e.g. input icon positioning). */
  controlClassName?: string;
  /** SLDS classes on the root (e.g. dropdown-trigger classes for the datepicker). */
  className?: string;
  children: ReactNode;
  /** Rendered after the help message (dropdown panels), as in the SLDS blueprint. */
  dropdown?: ReactNode;
};

const LAYOUT_CLASS: Record<FormElementLayout, string | undefined> = {
  default: undefined,
  stacked: "slds-form-element_stacked",
  horizontal: "slds-form-element_horizontal",
};

/**
 * SLDS Form Element blueprint: label (+ required marker) › help icon › control › help/error message.
 * Shared by every form control — not used on its own.
 */
export const FormElement = forwardRef<HTMLDivElement, FormElementProps>(function FormElement({
  inputId,
  label,
  hideLabel,
  required,
  error,
  helpText,
  hideHelpText,
  fieldLevelHelp,
  layout = "default",
  labelAs = "label",
  labelId,
  controlClassName,
  className,
  children,
  dropdown,
}, ref) {
  const labelContent = (
    <>
      {required ? (
        <abbr className="slds-required" title="required" aria-hidden="true">
          *{" "}
        </abbr>
      ) : null}
      {label}
    </>
  );
  const message = error ?? helpText;
  return (
    <div ref={ref} className={cx("slds-form-element", error !== undefined && error !== null && "slds-has-error", LAYOUT_CLASS[layout], className)}>
      {labelAs === "label" ? (
        <label className={cx("slds-form-element__label", hideLabel && "slds-assistive-text")} htmlFor={inputId} id={labelId}>
          {labelContent}
        </label>
      ) : (
        <span className={cx("slds-form-element__label", hideLabel && "slds-assistive-text")} id={labelId}>
          {labelContent}
        </span>
      )}
      {fieldLevelHelp ? <HelpText content={fieldLevelHelp} /> : null}
      <div className={cx("slds-form-element__control", controlClassName)}>{children}</div>
      {message ? (
        <div className={cx("slds-form-element__help", !error && hideHelpText && "slds-assistive-text")} id={helpId(inputId)}>
          {message}
        </div>
      ) : null}
      {dropdown}
    </div>
  );
});
