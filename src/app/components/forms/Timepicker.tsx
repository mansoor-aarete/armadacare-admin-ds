import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Icon } from "../icons/Icon";
import { cx } from "../utils/cx";
import { describedBy } from "../utils/formIds";
import { useDismiss } from "../utils/useDismiss";
import { ComboboxListbox } from "./ComboboxListbox";
import { FormElement, type FormElementLayout } from "./FormElement";

/** Minutes between suggested times. */
export type TimepickerStep = 15 | 30 | 60;

export type TimepickerProps = {
  label: string;
  /** 24-hour "HH:mm" or null. Displayed as "h:mm AM/PM" (Figma: "12:00 PM"). */
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  step?: TimepickerStep;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hideLabel?: boolean;
  layout?: FormElementLayout;
  defaultOpen?: boolean;
  id?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Scrolls the dropdown (not the page) so the option is visible. */
function scrollOptionIntoList(option: HTMLElement | null) {
  const box = option?.closest<HTMLElement>(".slds-dropdown");
  if (!option || !box) return;
  const top = option.offsetTop;
  const bottom = top + option.offsetHeight;
  if (top < box.scrollTop) box.scrollTop = top;
  else if (bottom > box.scrollTop + box.clientHeight) box.scrollTop = bottom - box.clientHeight;
}

/** "13:30" → "1:30 PM". */
export function formatTime(value: string): string {
  const [h, m] = value.split(":").map(Number);
  const suffix = h < 12 ? "AM" : "PM";
  return `${h % 12 === 0 ? 12 : h % 12}:${pad(m)} ${suffix}`;
}

/** "1:30 pm", "13:30", "9 am" → "13:30" / "09:00"; null when not a time. */
export function parseTime(text: string): string | null {
  const m = text.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2] ?? "0");
  const ampm = m[3]?.toLowerCase();
  if (min > 59 || h > 23 || (ampm && (h < 1 || h > 12))) return null;
  if (ampm === "pm" && h < 12) h += 12;
  if (ampm === "am" && h === 12) h = 0;
  return `${pad(h)}:${pad(min)}`;
}

/** SLDS Timepicker blueprint: autocomplete combobox (.slds-timepicker) with a clock icon and a plain time listbox. */
export function Timepicker({
  label,
  value,
  defaultValue = null,
  onChange,
  step = 15,
  placeholder,
  required,
  disabled,
  error,
  hideLabel,
  layout,
  defaultOpen = false,
  id,
}: TimepickerProps) {
  const uid = useId();
  const inputId = id ?? uid;
  const listboxId = `${uid}-listbox`;
  const optionId = useCallback((i: number) => `${uid}-option-${i}`, [uid]);
  const [internal, setInternal] = useState<string | null>(defaultValue);
  const current = value !== undefined ? value : internal;
  const [term, setTerm] = useState<string | null>(null);
  const [open, setOpen] = useState(defaultOpen);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const comboRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
  }, []);
  useDismiss(comboRef, open, close);

  const allOptions = useMemo(() => {
    const list = [];
    for (let t = 0; t < 24 * 60; t += step) {
      const v = `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
      list.push({ value: v, label: formatTime(v) });
    }
    return list;
  }, [step]);
  const options = term ? allOptions.filter((o) => o.label.toLowerCase().startsWith(term.trim().toLowerCase())) : allOptions;

  // On open, highlight the selected time (or the first match while typing) and scroll it into view.
  useEffect(() => {
    if (!open) return;
    const idx = term ? 0 : options.findIndex((o) => o.value === current);
    setFocusedIndex(idx);
    // Runs only when the list opens or the typed term changes (not on every option change).
  }, [open, term]);

  useEffect(() => {
    if (open && focusedIndex >= 0) scrollOptionIntoList(document.getElementById(optionId(focusedIndex)));
  }, [open, focusedIndex, optionId]);

  const commit = (v: string | null) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
    setTerm(null);
    close();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      const n = options.length;
      if (n) setFocusedIndex((i) => (e.key === "ArrowDown" ? (i + 1) % n : (i - 1 + n) % n));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (open && focusedIndex >= 0 && options[focusedIndex]) commit(options[focusedIndex].value);
      else if (term !== null) commit(parseTime(term));
    } else if (e.key === "Escape") {
      setTerm(null);
      close();
    }
  };

  return (
    <FormElement inputId={inputId} label={label} hideLabel={hideLabel} required={required} error={error} layout={layout}>
      <div className="slds-combobox_container">
        <div ref={comboRef} className={cx("slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-timepicker", open && "slds-is-open")}>
          <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
            <input
              type="text"
              id={inputId}
              className="slds-input slds-combobox__input"
              role="combobox"
              aria-autocomplete="list"
              aria-controls={listboxId}
              aria-expanded={open ? "true" : "false"}
              aria-haspopup="listbox"
              aria-activedescendant={open && focusedIndex >= 0 ? optionId(focusedIndex) : undefined}
              aria-describedby={describedBy(inputId, Boolean(error))}
              aria-invalid={error ? "true" : undefined}
              autoComplete="off"
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              value={term ?? (current ? formatTime(current) : "")}
              onChange={(e) => {
                setTerm(e.target.value);
                setOpen(true);
              }}
              onClick={() => !disabled && setOpen(true)}
              onKeyDown={onKeyDown}
              onBlur={() => {
                if (term !== null && !open) commit(term.trim() ? parseTime(term) : null);
              }}
            />
            <Icon name="utility:clock" size="x-small" tone={error ? "error" : "default"} className="slds-input__icon slds-input__icon_right" />
          </div>
          {open ? (
            <ComboboxListbox
              id={listboxId}
              kind="plain"
              options={options}
              selectedValue={current}
              focusedIndex={focusedIndex}
              optionId={optionId}
              onPick={commit}
              onFocusIndex={setFocusedIndex}
              ariaLabel={label}
            />
          ) : null}
        </div>
      </div>
    </FormElement>
  );
}
