import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { IconSvg } from "../icons/IconSvg";
import type { UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

export type ButtonVariant = "base" | "neutral" | "brand";
export type ButtonIconPosition = "left" | "right";
export type ButtonIconSizeName = "x-small" | "small" | "medium";

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style" | "children"> & {
  label: ReactNode;
  /** "neutral" (default) = bordered white; "brand" = olive fill; "base" = text-only button. */
  variant?: ButtonVariant;
  iconName?: UtilityIconName;
  iconPosition?: ButtonIconPosition;
  /** Glyph size: x-small (menu chevrons) · small · medium (default). */
  iconSize?: ButtonIconSizeName;
  /** Extra SLDS classes only (e.g. "slds-button_last" inside a group, spacing utilities). */
  className?: string;
};

const ICON_SIZE_CLASS: Record<ButtonIconSizeName, string | undefined> = {
  "x-small": "slds-button__icon_x-small",
  small: "slds-button__icon_small",
  medium: undefined,
};

const VARIANT_CLASS: Record<ButtonVariant, string | undefined> = {
  base: undefined,
  neutral: "slds-button_neutral",
  brand: "slds-button_brand",
};

/** SLDS Buttons blueprint (base / neutral / brand, with optional left/right icon). */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { label, variant = "neutral", iconName, iconPosition = "left", iconSize = "medium", className, type = "button", ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={cx("slds-button", VARIANT_CLASS[variant], className)} {...rest}>
      {iconName && iconPosition === "left" ? (
        <IconSvg name={iconName} className={cx("slds-button__icon", ICON_SIZE_CLASS[iconSize], "slds-button__icon_left")} />
      ) : null}
      {label}
      {iconName && iconPosition === "right" ? (
        <IconSvg name={iconName} className={cx("slds-button__icon", ICON_SIZE_CLASS[iconSize], "slds-button__icon_right")} />
      ) : null}
    </button>
  );
});
