import { useId } from "react";
import { cx } from "../utils/cx";

/** "inline" = SLDS default (label left of the switch); "stacked" = label above (Figma record fields). */
export type ToggleLayout = "inline" | "stacked";

export type ToggleProps = {
  label: string;
  /** Controlled state; omit and use defaultChecked for uncontrolled. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Captions under the switch (Figma: "Yes" / "No"; SLDS default "Enabled" / "Disabled"). */
  onLabel?: string;
  offLabel?: string;
  disabled?: boolean;
  hideLabel?: boolean;
  /** Caps label (Figma claim cards: "PLACE ON HOLD"). */
  capsLabel?: boolean;
  layout?: ToggleLayout;
  name?: string;
};

/** SLDS Checkbox Toggle blueprint (label.slds-checkbox_toggle › label text, input[role=switch], faux container). */
export function Toggle({
  label,
  checked,
  defaultChecked,
  onChange,
  onLabel = "Enabled",
  offLabel = "Disabled",
  disabled,
  hideLabel,
  capsLabel,
  layout = "inline",
  name,
}: ToggleProps) {
  const descId = useId();
  return (
    <div className="slds-form-element">
      <label className={cx("slds-checkbox_toggle slds-grid", layout === "stacked" && "slds-grid_vertical")}>
        <span
          className={cx(
            "slds-form-element__label slds-m-bottom_none",
            hideLabel && "slds-assistive-text",
            capsLabel && "slds-text-title_caps",
          )}
        >
          {label}
        </span>
        <input
          type="checkbox"
          role="switch"
          name={name}
          checked={checked}
          defaultChecked={checked === undefined ? defaultChecked : undefined}
          disabled={disabled}
          aria-describedby={descId}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span id={descId} className="slds-checkbox_faux_container">
          <span className="slds-checkbox_faux" />
          <span className="slds-checkbox_on">{onLabel}</span>
          <span className="slds-checkbox_off">{offLabel}</span>
        </span>
      </label>
    </div>
  );
}
