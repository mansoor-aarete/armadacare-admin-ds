import { useId, type ChangeEvent } from "react";
import { describedBy } from "../utils/formIds";
import { FormElement, type FormElementLayout } from "./FormElement";

export type SelectOption = { value: string; label: string; disabled?: boolean };

type SelectCommonProps = {
  label: string;
  options: SelectOption[];
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  layout?: FormElementLayout;
  id?: string;
  name?: string;
};

export type SingleSelectProps = SelectCommonProps & {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
  /** Leading empty option, e.g. "--None--". */
  placeholderOption?: string;
};

/**
 * SLDS Select — "Multiple Selection" (narrow): native `select.slds-select[multiple]` without the container —
 * the multi-select listbox ("Reason codes (select one or more)", Figma CL7). Ctrl/Cmd/Shift-click or arrow keys.
 */
export type MultiSelectProps = SelectCommonProps & {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[], event: ChangeEvent<HTMLSelectElement>) => void;
  /** Visible rows (native `size`). Default 4. */
  size?: number;
};

export type SelectProps = SingleSelectProps | MultiSelectProps;

/** SLDS Select blueprint (single: native select in .slds-select_container; multiple: narrow multi-select listbox). */
export function Select(props: SelectProps) {
  const { label, options, hideLabel, required, disabled, error, helpText, layout, id, name } = props;
  const autoId = useId();
  const inputId = id ?? autoId;
  const common = {
    className: "slds-select",
    id: inputId,
    name,
    required,
    disabled,
    "aria-describedby": describedBy(inputId, Boolean(error ?? helpText)),
  };
  const optionEls = options.map((o) => (
    <option key={o.value} value={o.value} disabled={o.disabled}>
      {o.label}
    </option>
  ));

  return (
    <FormElement inputId={inputId} label={label} hideLabel={hideLabel} required={required} error={error} helpText={helpText} layout={layout}>
      {props.multiple ? (
        <select
          {...common}
          multiple
          size={props.size ?? 4}
          value={props.value}
          defaultValue={props.value === undefined ? props.defaultValue : undefined}
          onChange={(e) => props.onChange?.(Array.from(e.target.selectedOptions, (o) => o.value), e)}
        >
          {optionEls}
        </select>
      ) : (
        <div className="slds-select_container">
          <select
            {...common}
            value={props.value}
            defaultValue={props.value === undefined ? props.defaultValue : undefined}
            onChange={(e) => props.onChange?.(e.target.value, e)}
          >
            {props.placeholderOption !== undefined ? <option value="">{props.placeholderOption}</option> : null}
            {optionEls}
          </select>
        </div>
      )}
    </FormElement>
  );
}
