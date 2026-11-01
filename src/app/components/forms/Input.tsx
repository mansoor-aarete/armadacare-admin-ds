import { useId, type ChangeEvent, type InputHTMLAttributes } from "react";
import { IconSvg } from "../icons/IconSvg";
import type { UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";
import { describedBy } from "../utils/formIds";
import { FormElement, type FormElementLayout } from "./FormElement";

export type InputType = "text" | "email" | "tel" | "url" | "number" | "search" | "password";

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className" | "style" | "type" | "onChange" | "children" | "size"
> & {
  label: string;
  type?: InputType;
  onChange?: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  hideLabel?: boolean;
  error?: string;
  helpText?: string;
  fieldLevelHelp?: string;
  layout?: FormElementLayout;
  /** Decorative utility icon inside the input, left (e.g. list search) and/or right (e.g. lookup search). */
  iconLeft?: UtilityIconName;
  iconRight?: UtilityIconName;
};

function iconClasses(left: boolean, right: boolean): string | undefined {
  if (left && right) return "slds-input-has-icon slds-input-has-icon_left-right";
  if (left) return "slds-input-has-icon slds-input-has-icon_left";
  if (right) return "slds-input-has-icon slds-input-has-icon_right";
  return undefined;
}

/** SLDS Input blueprint inside a Form Element (label, required, help, error, icons). */
export function Input({
  label,
  type = "text",
  onChange,
  hideLabel,
  error,
  helpText,
  fieldLevelHelp,
  layout,
  iconLeft,
  iconRight,
  id,
  required,
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <FormElement
      inputId={inputId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      error={error}
      helpText={helpText}
      fieldLevelHelp={fieldLevelHelp}
      layout={layout}
      controlClassName={iconClasses(Boolean(iconLeft), Boolean(iconRight))}
    >
      {iconLeft ? (
        <IconSvg name={iconLeft} className="slds-icon slds-input__icon slds-input__icon_left slds-icon-text-default" />
      ) : null}
      <input
        {...rest}
        id={inputId}
        type={type}
        className="slds-input"
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy(inputId, Boolean(error ?? helpText))}
        onChange={(e) => onChange?.(e.target.value, e)}
      />
      {iconRight ? (
        <IconSvg name={iconRight} className="slds-icon slds-input__icon slds-input__icon_right slds-icon-text-default" />
      ) : null}
    </FormElement>
  );
}
