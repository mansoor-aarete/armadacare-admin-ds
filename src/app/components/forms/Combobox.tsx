import { useCallback, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { cx } from "../utils/cx";
import { describedBy } from "../utils/formIds";
import { useDismiss } from "../utils/useDismiss";
import { ComboboxListbox, type ComboboxListOption } from "./ComboboxListbox";
import { ComboboxObjectSwitcher, type ObjectSwitcherConfig } from "./ComboboxObjectSwitcher";
import { FormElement, type FormElementLayout } from "./FormElement";

export type ComboboxOption = { value: string; label: string; disabled?: boolean };
export type LookupOption = {
  value: string;
  label: string;
  iconName: ObjectIconName;
  /** Object name for the selected-value icon (screen readers), e.g. "User". */
  objectLabel: string;
  meta?: string;
  disabled?: boolean;
};
type ComboboxCommonProps = {
  label: string;
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  /** Inline help under the control — text or a node (e.g. a "View all dependencies" link). */
  helpText?: ReactNode;
  fieldLevelHelp?: string;
  layout?: FormElementLayout;
  placeholder?: string;
  id?: string;
  /** Start open (showcase / screenshots). */
  defaultOpen?: boolean;
};

export type PicklistComboboxProps = ComboboxCommonProps & {
  variant?: "picklist";
  options: ComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
};

export type LookupComboboxProps = ComboboxCommonProps & {
  variant: "lookup";
  options: LookupOption[];
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  /** Called as the user types; by default options are also filtered locally by label. */
  onSearchChange?: (term: string) => void;
  objectSwitcher?: ObjectSwitcherConfig;
};

export type ComboboxProps = PicklistComboboxProps | LookupComboboxProps;

/**
 * SLDS Combobox blueprint.
 *  - "picklist": select-only combobox (faux input + down icon + plain options).
 *  - "lookup": autocomplete with entity results, selected state (entity icon + clear button), optional object switcher.
 */
export function Combobox(props: ComboboxProps) {
  const { label, hideLabel, required, disabled, error, helpText, fieldLevelHelp, layout, defaultOpen = false } = props;
  const isLookup = props.variant === "lookup";
  const uid = useId();
  const inputId = props.id ?? uid;
  const labelId = `${uid}-label`;
  const listboxId = `${uid}-listbox`;
  const optionId = useCallback((i: number) => `${uid}-option-${i}`, [uid]);

  const [internalValue, setInternalValue] = useState<string | null>(props.defaultValue ?? null);
  const value = props.value !== undefined ? props.value : internalValue;
  const [open, setOpen] = useState(defaultOpen);
  const [focused, setFocused] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [term, setTerm] = useState("");
  const comboRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    setFocusedIndex(-1);
  }, []);
  useDismiss(comboRef, open, close);

  const listOptions: ComboboxListOption[] = useMemo(() => {
    if (props.variant === "lookup") {
      const t = term.trim().toLowerCase();
      return props.options.filter((o) => !t || o.label.toLowerCase().includes(t));
    }
    return props.options;
  }, [props.variant, props.options, term]);

  const selected = props.options.find((o) => o.value === value) ?? null;
  const commit = (v: string | null) => {
    if (props.value === undefined) setInternalValue(v);
    props.onChange?.(v);
    setTerm("");
    close();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) setOpen(true);
      const n = listOptions.length;
      if (n === 0) return;
      setFocusedIndex((i) => (e.key === "ArrowDown" ? (i + 1) % n : (i - 1 + n) % n));
    } else if (e.key === "Enter" || (e.key === " " && !isLookup)) {
      e.preventDefault();
      if (open && focusedIndex >= 0 && listOptions[focusedIndex] && !listOptions[focusedIndex].disabled) commit(listOptions[focusedIndex].value);
      else setOpen(true);
    } else if (e.key === "Escape") {
      close();
    }
  };

  const listbox = open ? (
    <ComboboxListbox
      id={listboxId}
      kind={isLookup ? "entity" : "plain"}
      options={listOptions}
      selectedValue={value}
      focusedIndex={focusedIndex}
      optionId={optionId}
      onPick={commit}
      onFocusIndex={setFocusedIndex}
      ariaLabel={label}
    />
  ) : null;

  const comboAria = {
    "aria-controls": listboxId,
    "aria-expanded": open ? ("true" as const) : ("false" as const),
    "aria-haspopup": "listbox" as const,
    "aria-activedescendant": open && focusedIndex >= 0 ? optionId(focusedIndex) : undefined,
    "aria-describedby": describedBy(inputId, Boolean(error ?? helpText)),
    "aria-invalid": error ? ("true" as const) : undefined,
  };

  const faux = (text: string, hasValue: boolean, id: string, ariaLabelledBy: string) => (
    <div
      role="combobox"
      tabIndex={disabled ? -1 : 0}
      id={id}
      className={cx("slds-input_faux slds-combobox__input", focused && "slds-has-focus", disabled && "slds-is-disabled", hasValue && "slds-combobox__input-value")}
      aria-labelledby={ariaLabelledBy}
      aria-disabled={disabled ? "true" : undefined}
      aria-required={required ? "true" : undefined}
      {...comboAria}
      onClick={() => !disabled && setOpen((o) => !o)}
      onKeyDown={onKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <span className="slds-truncate">{text}</span>
    </div>
  );

  // ---- picklist -------------------------------------------------------------------------------
  let combobox: ReactNode;
  if (!isLookup) {
    combobox = (
      <div className="slds-combobox_container">
        <div ref={comboRef} className={cx("slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click", open && "slds-is-open")}>
          <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
            {faux(selected?.label ?? props.placeholder ?? "Select an Option…", Boolean(selected), `${inputId}-selected-value`, labelId)}
            <Icon name="utility:down" size="x-small" className="slds-input__icon slds-input__icon_right" />
          </div>
          {listbox}
        </div>
      </div>
    );
  } else {
    // ---- lookup -------------------------------------------------------------------------------
    const lookupSelected = selected as LookupOption | null;
    const formElement = lookupSelected ? (
      <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_left-right" role="none">
        <Icon name={lookupSelected.iconName} size="small" assistiveText={lookupSelected.objectLabel} className="slds-combobox__input-entity-icon" />
        {faux(lookupSelected.label, true, inputId, labelId)}
        <ButtonIcon
          iconName="utility:close"
          assistiveText="Remove selected option"
          className="slds-input__icon slds-input__icon_right"
          disabled={disabled}
          onClick={() => commit(null)}
        />
      </div>
    ) : (
      <div className="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
        <input
          type="text"
          id={inputId}
          className={cx("slds-input slds-combobox__input", focused && "slds-has-focus")}
          role="combobox"
          aria-autocomplete="list"
          autoComplete="off"
          placeholder={props.placeholder ?? "Search..."}
          disabled={disabled}
          required={required}
          value={term}
          {...comboAria}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
            setFocusedIndex(-1);
            if (props.variant === "lookup") props.onSearchChange?.(e.target.value);
          }}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onClick={() => setOpen(true)}
        />
        <Icon name="utility:search" size="x-small" className="slds-input__icon slds-input__icon_right" />
      </div>
    );
    const lookupBox = (
      <div className={cx("slds-combobox_container", props.objectSwitcher && "slds-combobox-addon_end", lookupSelected && "slds-has-selection")}>
        <div ref={comboRef} className={cx("slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click", open && "slds-is-open")}>
          {formElement}
          {listbox}
        </div>
      </div>
    );
    combobox = props.objectSwitcher ? (
      <div className={cx("slds-combobox-group", lookupSelected && "slds-has-selection")}>
        <ComboboxObjectSwitcher config={props.objectSwitcher} disabled={disabled} />
        {lookupBox}
      </div>
    ) : (
      lookupBox
    );
  }

  return (
    <FormElement
        inputId={inputId}
        labelId={labelId}
        label={label}
        hideLabel={hideLabel}
        required={required}
        error={error}
        helpText={helpText}
        fieldLevelHelp={fieldLevelHelp}
        layout={layout}
      >
        {combobox}
    </FormElement>
  );
}
