import { forwardRef, type ButtonHTMLAttributes } from "react";
import { IconSvg } from "../icons/IconSvg";
import type { UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

export type ButtonIconVariant = "bare" | "container" | "border" | "border-filled" | "brand" | "inverse" | "border-inverse";
/** Box size for non-bare variants: xx-small 1rem · x-small 1.25rem · small 1.5rem · medium 2rem (default). */
export type ButtonIconSize = "xx-small" | "x-small" | "small" | "medium";
/** Glyph size (mainly for "bare"): x-small 0.5rem · small 0.75rem · medium 0.875rem (default) · large 1.5rem. */
export type ButtonIconGlyphSize = "x-small" | "small" | "medium" | "large";
export type ButtonIconFeedback = "error" | "warning";

export type ButtonIconProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "style" | "children" | "aria-pressed" | "aria-haspopup" | "aria-expanded"
> & {
  iconName: UtilityIconName;
  /** Required: screen-reader label (also the tooltip unless `title` is given). */
  assistiveText: string;
  variant?: ButtonIconVariant;
  size?: ButtonIconSize;
  iconSize?: ButtonIconGlyphSize;
  /** Stateful icon button: renders slds-is-selected + aria-pressed. */
  pressed?: boolean;
  /**
   * Menu trigger: aria-haspopup / aria-expanded. `indicator` (default true) adds the small down glyph after the
   * icon (SLDS "icon-more", e.g. gear ▾); set false when the icon itself is the down chevron (overflow trigger).
   */
  menu?: { expanded: boolean; indicator?: boolean };
  feedback?: ButtonIconFeedback;
  /** Extra SLDS classes only (e.g. "slds-input__icon slds-input__icon_right", "slds-modal__close"). */
  className?: string;
  /** Extra SLDS classes on the glyph (blueprint iconClassName, e.g. "slds-button__icon_hint", "slds-global-header__icon"). */
  iconClassName?: string;
};

const VARIANT_CLASS: Record<ButtonIconVariant, string | undefined> = {
  bare: undefined,
  container: "slds-button_icon-container",
  border: "slds-button_icon-border",
  "border-filled": "slds-button_icon-border-filled",
  brand: "slds-button_icon-brand",
  inverse: "slds-button_icon-inverse",
  "border-inverse": "slds-button_icon-border-inverse",
};

const SIZE_CLASS: Record<ButtonIconSize, string | undefined> = {
  "xx-small": "slds-button_icon-xx-small",
  "x-small": "slds-button_icon-x-small",
  small: "slds-button_icon-small",
  medium: undefined,
};

const GLYPH_CLASS: Record<ButtonIconGlyphSize, string | undefined> = {
  "x-small": "slds-button__icon_x-small",
  small: "slds-button__icon_small",
  medium: undefined,
  large: "slds-button__icon_large",
};

const FEEDBACK_CLASS: Record<ButtonIconFeedback, string> = {
  error: "slds-button_icon-error",
  warning: "slds-button_icon-warning",
};

/** SLDS Button Icons blueprint (bare, container, bordered, filled, brand, inverse; stateful; menu trigger). */
export const ButtonIcon = forwardRef<HTMLButtonElement, ButtonIconProps>(function ButtonIcon(
  {
    iconName,
    assistiveText,
    variant = "bare",
    size = "medium",
    iconSize = "medium",
    pressed,
    menu,
    feedback,
    className,
    iconClassName,
    title,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        "slds-button slds-button_icon",
        VARIANT_CLASS[variant],
        variant !== "bare" && SIZE_CLASS[size],
        menu && menu.indicator !== false && variant === "border-filled" && "slds-button_icon-more",
        menu && menu.indicator !== false && (variant === "container" || variant === "border") && "slds-button_icon-container-more",
        pressed && "slds-is-selected",
        feedback && FEEDBACK_CLASS[feedback],
        className,
      )}
      title={title ?? assistiveText}
      aria-pressed={pressed === undefined ? undefined : pressed ? "true" : "false"}
      aria-haspopup={menu ? "true" : undefined}
      aria-expanded={menu ? (menu.expanded ? "true" : "false") : undefined}
      {...rest}
    >
      <IconSvg name={iconName} className={cx("slds-button__icon", GLYPH_CLASS[iconSize], iconClassName)} />
      {menu && menu.indicator !== false && variant !== "bare" ? (
        <IconSvg name="utility:down" className="slds-button__icon slds-button__icon_x-small" />
      ) : null}
      <span className="slds-assistive-text">{assistiveText}</span>
    </button>
  );
});
