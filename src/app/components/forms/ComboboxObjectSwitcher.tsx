import { useCallback, useId, useRef, useState } from "react";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { cx } from "../utils/cx";
import { useDismiss } from "../utils/useDismiss";
import { ComboboxListbox } from "./ComboboxListbox";

export type ObjectSwitcherOption = { value: string; label: string; iconName: ObjectIconName };

export type ObjectSwitcherConfig = {
  options: ObjectSwitcherOption[];
  value: string;
  onChange: (value: string) => void;
  /** Hidden label of the switcher (default "Filter Search by:"). */
  label?: string;
};

export type ComboboxObjectSwitcherProps = { config: ObjectSwitcherConfig; disabled?: boolean };

/** Object switcher addon (SLDS Lookup — object switcher): select-only combobox showing the current object's icon. */
export function ComboboxObjectSwitcher({ config, disabled }: ComboboxObjectSwitcherProps) {
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);
  const current = config.options.find((o) => o.value === config.value) ?? config.options[0];
  const listboxId = `${uid}-listbox`;
  const pick = (v: string) => {
    config.onChange(v);
    setOpen(false);
  };

  return (
    <div ref={ref} className="slds-combobox_object-switcher slds-combobox-addon_start">
      <div className="slds-form-element">
        <label className="slds-form-element__label slds-assistive-text" htmlFor={`${uid}-input`} id={`${uid}-label`}>
          {config.label ?? "Filter Search by:"}
        </label>
        <div className="slds-form-element__control">
          <div className="slds-combobox_container slds-has-icon-only">
            <div className={cx("slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click", open && "slds-is-open")}>
              <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right" role="none">
                <Icon name={current.iconName} size="x-small" assistiveText={current.label} className="slds-input__icon slds-input__icon_left" />
                <div
                  role="combobox"
                  tabIndex={disabled ? -1 : 0}
                  id={`${uid}-input`}
                  className={cx("slds-input_faux slds-combobox__input", disabled && "slds-is-disabled")}
                  aria-labelledby={`${uid}-label`}
                  aria-controls={listboxId}
                  aria-expanded={open ? "true" : "false"}
                  aria-haspopup="listbox"
                  aria-disabled={disabled ? "true" : undefined}
                  aria-activedescendant={open && focusedIndex >= 0 ? `${uid}-option-${focusedIndex}` : undefined}
                  onClick={() => !disabled && setOpen((o) => !o)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      if (open && focusedIndex >= 0) pick(config.options[focusedIndex].value);
                      else setOpen(true);
                    } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault();
                      setOpen(true);
                      const n = config.options.length;
                      setFocusedIndex((i) => (e.key === "ArrowDown" ? (i + 1) % n : (i - 1 + n) % n));
                    } else if (e.key === "Escape") setOpen(false);
                  }}
                >
                  <span className="slds-truncate"> </span>
                </div>
                <Icon name="utility:down" size="xx-small" className="slds-input__icon slds-input__icon_right" />
              </div>
              {open ? (
                <ComboboxListbox
                  id={listboxId}
                  kind="plain"
                  options={config.options}
                  selectedValue={config.value}
                  focusedIndex={focusedIndex}
                  optionId={(i) => `${uid}-option-${i}`}
                  onPick={pick}
                  onFocusIndex={setFocusedIndex}
                  ariaLabel={config.label ?? "Filter Search by:"}
                  className="slds-dropdown_x-small slds-dropdown_left"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
