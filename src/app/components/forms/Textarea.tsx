import { useId, type ChangeEvent, type TextareaHTMLAttributes } from "react";
import { describedBy } from "../utils/formIds";
import { FormElement, type FormElementLayout } from "./FormElement";

export type TextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "style" | "onChange" | "children"> & {
  label: string;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  hideLabel?: boolean;
  error?: string;
  helpText?: string;
  fieldLevelHelp?: string;
  layout?: FormElementLayout;
};

/** SLDS Textarea blueprint inside a Form Element. */
export function Textarea({ label, onChange, hideLabel, error, helpText, fieldLevelHelp, layout, id, required, ...rest }: TextareaProps) {
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
    >
      <textarea
        {...rest}
        id={inputId}
        className="slds-textarea"
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy(inputId, Boolean(error ?? helpText))}
        onChange={(e) => onChange?.(e.target.value, e)}
      />
    </FormElement>
  );
}
