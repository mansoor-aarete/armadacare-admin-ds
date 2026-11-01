import { Icon, type ObjectIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

export type ComboboxListOption = {
  value: string;
  label: string;
  disabled?: boolean;
  /** Entity options: object icon + optional secondary line. */
  iconName?: ObjectIconName;
  meta?: string;
};

export type ComboboxListboxKind = "plain" | "entity";

export type ComboboxListboxProps = {
  id: string;
  kind: ComboboxListboxKind;
  options: ComboboxListOption[];
  selectedValue?: string | null;
  focusedIndex: number;
  optionId: (index: number) => string;
  onPick: (value: string) => void;
  onFocusIndex: (index: number) => void;
  ariaLabel: string;
  /** Extra SLDS dropdown classes (e.g. object switcher: "slds-dropdown_x-small slds-dropdown_left"). */
  className?: string;
};

/** SLDS Combobox listbox (div.slds-dropdown[role=listbox] › ul.slds-listbox_vertical › plain / entity options). */
export function ComboboxListbox({
  id,
  kind,
  options,
  selectedValue,
  focusedIndex,
  optionId,
  onPick,
  onFocusIndex,
  ariaLabel,
  className,
}: ComboboxListboxProps) {
  return (
    <div
      id={id}
      className={cx(
        "slds-dropdown",
        kind === "entity" ? "slds-dropdown_length-with-icon-7" : "slds-dropdown_length-5",
        className ?? "slds-dropdown_fluid",
      )}
      role="listbox"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      <ul className="slds-listbox slds-listbox_vertical" role="presentation">
        {options.map((o, i) => {
          const focused = i === focusedIndex;
          const selected = o.value === selectedValue;
          return (
            <li key={o.value} role="presentation" className="slds-listbox__item">
              {kind === "entity" ? (
                <div
                  id={optionId(i)}
                  role="option"
                  aria-selected={focused ? "true" : undefined}
                  aria-disabled={o.disabled ? "true" : undefined}
                  className={cx(
                    "slds-media slds-listbox__option slds-listbox__option_entity",
                    o.meta ? "slds-listbox__option_has-meta" : "slds-media_center",
                    focused && "slds-has-focus",
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => onFocusIndex(i)}
                  onClick={() => !o.disabled && onPick(o.value)}
                >
                  <span className="slds-media__figure slds-listbox__option-icon">
                    {o.iconName ? <Icon name={o.iconName} size="small" /> : null}
                  </span>
                  <span className="slds-media__body">
                    <span className="slds-listbox__option-text slds-listbox__option-text_entity">{o.label}</span>
                    {o.meta ? <span className="slds-listbox__option-meta slds-listbox__option-meta_entity">{o.meta}</span> : null}
                  </span>
                </div>
              ) : (
                <div
                  id={optionId(i)}
                  role="option"
                  aria-selected={focused ? "true" : undefined}
                  aria-checked={selected ? "true" : undefined}
                  aria-disabled={o.disabled ? "true" : undefined}
                  className={cx(
                    "slds-media slds-listbox__option slds-listbox__option_plain slds-media_small",
                    selected && "slds-is-selected",
                    focused && "slds-has-focus",
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => onFocusIndex(i)}
                  onClick={() => !o.disabled && onPick(o.value)}
                >
                  <span className="slds-media__figure slds-listbox__option-icon">
                    {selected ? <Icon name="utility:check" size="x-small" tone="current" /> : null}
                  </span>
                  <span className="slds-media__body">
                    <span title={o.label}>{o.label}</span>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
