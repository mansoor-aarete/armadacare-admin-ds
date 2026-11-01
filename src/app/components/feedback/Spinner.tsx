import { cx } from "../utils/cx";

export type SpinnerSize = "xx-small" | "x-small" | "small" | "medium" | "large";
export type SpinnerVariant = "base" | "brand" | "inverse";
/** "overlay" = SLDS spinner container covering its positioned parent; "inline" = in-flow (e.g. listbox loading row). */
export type SpinnerLayout = "overlay" | "inline";

export type SpinnerProps = {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  layout?: SpinnerLayout;
  /** Screen-reader text (default "Loading"). */
  assistiveText?: string;
};

const SIZE_CLASS: Record<SpinnerSize, string> = {
  "xx-small": "slds-spinner_xx-small",
  "x-small": "slds-spinner_x-small",
  small: "slds-spinner_small",
  medium: "slds-spinner_medium",
  large: "slds-spinner_large",
};

const VARIANT_CLASS: Record<SpinnerVariant, string | undefined> = {
  base: undefined,
  brand: "slds-spinner_brand",
  inverse: "slds-spinner_inverse",
};

/** SLDS Spinners blueprint (div.slds-spinner[role=status] with two dots; optional overlay container). */
export function Spinner({ size = "medium", variant = "base", layout = "overlay", assistiveText = "Loading" }: SpinnerProps) {
  const spinner = (
    <div className={cx("slds-spinner", SIZE_CLASS[size], VARIANT_CLASS[variant], layout === "inline" && "slds-spinner_inline")} role="status">
      <span className="slds-assistive-text">{assistiveText}</span>
      <div className="slds-spinner__dot-a" />
      <div className="slds-spinner__dot-b" />
    </div>
  );
  return layout === "overlay" ? <div className="slds-spinner_container">{spinner}</div> : spinner;
}
