import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { cx } from "../utils/cx";
import { formatUs, parseUs, toIso } from "../utils/dates";
import { describedBy } from "../utils/formIds";
import { useDismiss } from "../utils/useDismiss";
import { DatepickerCalendar } from "./DatepickerCalendar";
import { FormElement, type FormElementLayout } from "./FormElement";

export type DatepickerProps = {
  label: string;
  /** ISO date (YYYY-MM-DD) or null. */
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  fieldLevelHelp?: string;
  hideLabel?: boolean;
  layout?: FormElementLayout;
  /** Show the "Format: 12/31/2024" hint visibly (default: assistive text only, as in the blueprint). */
  showFormatHint?: boolean;
  /** Today's ISO date — defaults to the current date (inject for stable screenshots). */
  today?: string;
  yearRange?: [number, number];
  defaultOpen?: boolean;
  id?: string;
};

/** SLDS Datepicker blueprint: input + calendar button-icon in a dropdown-trigger form element. */
export function Datepicker({
  label,
  value,
  defaultValue = null,
  onChange,
  required,
  disabled,
  error,
  fieldLevelHelp,
  hideLabel,
  layout,
  showFormatHint = false,
  today = toIso(new Date()),
  yearRange,
  defaultOpen = false,
  id,
}: DatepickerProps) {
  const uid = useId();
  const inputId = id ?? uid;
  const [internal, setInternal] = useState<string | null>(defaultValue);
  const current = value !== undefined ? value : internal;
  const [text, setText] = useState(formatUs(current));
  const [open, setOpen] = useState(defaultOpen);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(rootRef, open, close);
  useEffect(() => setText(formatUs(current)), [current]);

  const commit = (iso: string | null) => {
    if (value === undefined) setInternal(iso);
    onChange?.(iso);
  };
  const year = Number(today.slice(0, 4));
  const range: [number, number] = yearRange ?? [year - 100, year + 10];
  const hint = error ?? "Format: 12/31/2024";

  return (
      <FormElement
        ref={rootRef}
        inputId={inputId}
        label={label}
        hideLabel={hideLabel}
        required={required}
        error={error}
        helpText={error ? undefined : hint}
        hideHelpText={!showFormatHint}
        fieldLevelHelp={fieldLevelHelp}
        layout={layout}
        className={cx("slds-dropdown-trigger slds-dropdown-trigger_click", open && "slds-is-open")}
        controlClassName="slds-input-has-icon slds-input-has-icon_right"
        dropdown={
          open && !disabled ? (
            <DatepickerCalendar
              idPrefix={`${uid}-dp`}
              value={current}
              today={today}
              yearRange={range}
              autoFocus={keyboardOpen}
              onClose={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              onSelect={(iso) => {
                commit(iso);
                setOpen(false);
                buttonRef.current?.focus();
              }}
            />
          ) : null
        }
      >
        <input
          type="text"
          id={inputId}
          className="slds-input"
          placeholder=" "
          value={text}
          required={required}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={describedBy(inputId, true)}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            if (text.trim() === "") commit(null);
            else {
              const iso = parseUs(text);
              if (iso) commit(iso);
              else setText(formatUs(current));
            }
          }}
        />
        <ButtonIcon
          ref={buttonRef}
          iconName="utility:event"
          assistiveText="Select a date"
          className="slds-input__icon slds-input__icon_right"
          disabled={disabled}
          onClick={(e) => {
            setKeyboardOpen(e.detail === 0);
            setOpen((o) => !o);
          }}
        />
      </FormElement>
  );
}
