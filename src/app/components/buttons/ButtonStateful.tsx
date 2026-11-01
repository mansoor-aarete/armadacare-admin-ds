import { useState } from "react";
import { IconSvg } from "../icons/IconSvg";
import type { UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

export type ButtonStatefulState = {
  label: string;
  iconName: UtilityIconName;
};

export type ButtonStatefulProps = {
  /** Controlled selected state. Omit to let the button manage it (see defaultSelected). */
  selected?: boolean;
  defaultSelected?: boolean;
  onToggle?: (selected: boolean) => void;
  disabled?: boolean;
  /** Defaults: Follow (+) / Following (✓) / Unfollow (✕) — the SLDS blueprint example. */
  notSelected?: ButtonStatefulState;
  selectedState?: ButtonStatefulState;
  selectedFocus?: ButtonStatefulState;
  className?: string;
};

/** SLDS Stateful Button blueprint (e.g. Follow / Following / Unfollow). */
export function ButtonStateful({
  selected,
  defaultSelected = false,
  onToggle,
  disabled,
  notSelected = { label: "Follow", iconName: "utility:add" },
  selectedState = { label: "Following", iconName: "utility:check" },
  selectedFocus = { label: "Unfollow", iconName: "utility:close" },
  className,
}: ButtonStatefulProps) {
  const [internal, setInternal] = useState(defaultSelected);
  const [focused, setFocused] = useState(false);
  const isSelected = selected ?? internal;

  return (
    <button
      type="button"
      className={cx(
        "slds-button slds-button_neutral slds-button_stateful",
        !isSelected && "slds-not-selected",
        isSelected && !focused && "slds-is-selected",
        isSelected && focused && "slds-is-selected-clicked",
        className,
      )}
      disabled={disabled}
      aria-live="assertive"
      aria-pressed={isSelected ? "true" : "false"}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onClick={() => {
        const next = !isSelected;
        if (selected === undefined) setInternal(next);
        onToggle?.(next);
      }}
    >
      <span className="slds-text-not-selected">
        <IconSvg name={notSelected.iconName} className="slds-button__icon slds-button__icon_small slds-button__icon_left" />
        {notSelected.label}
      </span>
      <span className="slds-text-selected">
        <IconSvg name={selectedState.iconName} className="slds-button__icon slds-button__icon_small slds-button__icon_left" />
        {selectedState.label}
      </span>
      <span className="slds-text-selected-focus">
        <IconSvg name={selectedFocus.iconName} className="slds-button__icon slds-button__icon_small slds-button__icon_left" />
        {selectedFocus.label}
      </span>
    </button>
  );
}
