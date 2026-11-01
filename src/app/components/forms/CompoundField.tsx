import type { ReactNode } from "react";
import { HelpText } from "../overlays/HelpText";
import { cx } from "../utils/cx";
import type { FormElementLayout } from "./FormElement";

/** Width of one cell in a compound row (SLDS sizing classes used by the blueprint). */
export type CompoundFieldSize = "1-of-1" | "1-of-2" | "1-of-3" | "2-of-3" | "2-of-6" | "4-of-6";

export type CompoundFieldCell = {
  /** Usually a form control with its own label (Input, Textarea, Combobox, Datepicker, Timepicker …). */
  content: ReactNode;
  /** Omit to share the row equally. */
  size?: CompoundFieldSize;
};

export type CompoundFieldProps = {
  /** Legend of the fieldset, e.g. "Corporate Address", "Geocode Retrieval Time". */
  label: string;
  /** Rows of sub-fields, top to bottom. */
  rows: CompoundFieldCell[][];
  required?: boolean;
  /** Address variant (.slds-form-element_address — rows aligned on the baseline). */
  address?: boolean;
  layout?: FormElementLayout;
  hideLabel?: boolean;
  /** Info icon with a tooltip next to the legend. */
  fieldLevelHelp?: string;
  /** Error message under the rows (adds slds-has-error). */
  error?: ReactNode;
  id?: string;
};

const SIZE_CLASS: Record<CompoundFieldSize, string> = {
  "1-of-1": "slds-size_1-of-1",
  "1-of-2": "slds-size_1-of-2",
  "1-of-3": "slds-size_1-of-3",
  "2-of-3": "slds-size_2-of-3",
  "2-of-6": "slds-size_2-of-6",
  "4-of-6": "slds-size_4-of-6",
};

const LAYOUT_CLASS: Record<FormElementLayout, string | undefined> = {
  default: undefined,
  stacked: "slds-form-element_stacked",
  horizontal: "slds-form-element_horizontal",
};

/** SLDS Form Element — Compound blueprint (fieldset.slds-form-element_compound › legend › control › rows of sub-fields). */
export function CompoundField({ label, rows, required, address, layout = "default", hideLabel, fieldLevelHelp, error, id }: CompoundFieldProps) {
  return (
    <fieldset
      id={id}
      className={cx(
        "slds-form-element slds-form-element_compound",
        address && "slds-form-element_address",
        error !== undefined && error !== null && "slds-has-error",
        LAYOUT_CLASS[layout],
      )}
    >
      <legend className={cx("slds-form-element__legend slds-form-element__label", hideLabel && "slds-assistive-text")}>
        {required ? (
          <abbr className="slds-required" title="required" aria-hidden="true">
            *{" "}
          </abbr>
        ) : null}
        {label}
      </legend>
      {fieldLevelHelp ? <HelpText content={fieldLevelHelp} /> : null}
      <div className="slds-form-element__control">
        {rows.map((row, r) => (
          <div key={r} className="slds-form-element__row">
            {row.map((cell, c) => (
              <div key={c} className={cell.size ? SIZE_CLASS[cell.size] : "slds-col"}>
                {cell.content}
              </div>
            ))}
          </div>
        ))}
      </div>
      {error ? <div className="slds-form-element__help">{error}</div> : null}
    </fieldset>
  );
}
