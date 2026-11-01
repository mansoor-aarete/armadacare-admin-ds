import { cx } from "../utils/cx";

export type MetricTileProps = {
  label: string;
  value: string | number;
  /** Selected tile filters the list (bordered box, aria-pressed). */
  selected?: boolean;
  onSelect?: () => void;
};

/**
 * KPI tile (Figma Intelligence View; no SLDS 1 blueprint — gap G2): a toggle button built from SLDS
 * button-reset, box and text utilities. Selected = .slds-box border on the shaded surface.
 */
export function MetricTile({ label, value, selected, onSelect }: MetricTileProps) {
  return (
    <button
      type="button"
      className={cx(
        "slds-button_reset slds-text-align_left slds-p-around_medium",
        selected && "slds-box slds-theme_shade",
      )}
      aria-pressed={selected ? "true" : "false"}
      onClick={onSelect}
    >
      <span className="slds-text-body_regular slds-show">{label}</span>
      <span className="slds-text-heading_large slds-show">{value}</span>
    </button>
  );
}
