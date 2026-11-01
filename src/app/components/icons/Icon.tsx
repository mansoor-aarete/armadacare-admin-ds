import { cx } from "../utils/cx";
import { IconSvg } from "./IconSvg";
import { ICONS, type IconName } from "./registry";

export type IconSize = "xx-small" | "x-small" | "small" | "medium" | "large";
/** "inverse" = SLDS default white fill (no text-colour class), for icons on coloured headers. */
export type IconTone = "default" | "light" | "warning" | "error" | "success" | "current" | "inverse";

export type UtilityIconName = Extract<IconName, `utility:${string}`>;
export type ObjectIconName = Exclude<IconName, UtilityIconName>;

type IconCommonProps = {
  /** "medium" = SLDS default (2rem). */
  size?: IconSize;
  /** Describes the icon for screen readers and as a tooltip. Omit only for decorative icons. */
  assistiveText?: string;
  /** Extra SLDS utility classes for the container (e.g. "slds-m-right_x-small"). */
  className?: string;
  /** Extra SLDS classes on the <svg> (blueprint className, e.g. "slds-page-header__icon"). */
  svgClassName?: string;
};

export type IconProps = IconCommonProps &
  (
    | {
        name: UtilityIconName;
        /** Utility icons only. "current" inherits the text colour. Default: "default" (grey). */
        tone?: IconTone;
      }
    | {
        /**
         * Standard / custom object icons have a fixed SLDS background colour. tone "default" renders the glyph
         * only, grey, without the coloured container (console tab / sub-tab icons — TabObjectIcon blueprint).
         */
        name: ObjectIconName;
        tone?: "default";
      }
  );

const SIZE_CLASS: Record<IconSize, string | undefined> = {
  "xx-small": "slds-icon_xx-small",
  "x-small": "slds-icon_x-small",
  small: "slds-icon_small",
  medium: undefined,
  large: "slds-icon_large",
};

const TONE_CLASS: Record<Exclude<IconTone, "current">, string | undefined> = {
  default: "slds-icon-text-default",
  light: "slds-icon-text-light",
  warning: "slds-icon-text-warning",
  error: "slds-icon-text-error",
  success: "slds-icon-text-success",
  inverse: undefined,
};

/** SLDS Icon blueprint (icon_container + svg.slds-icon + assistive text). */
export function Icon(props: IconProps) {
  const { name, size = "medium", assistiveText, className, svgClassName } = props;
  const icon = ICONS[name];
  const isUtility = icon.sprite === "utility";
  const tone = isUtility ? (props.tone ?? "default") : props.tone;
  const glyphOnly = !isUtility && tone === "default";

  return (
    <span
      className={cx("slds-icon_container", !glyphOnly && icon.containerClass, tone === "current" && "slds-current-color", className)}
      title={assistiveText}
    >
      <IconSvg
        name={name}
        className={cx("slds-icon", SIZE_CLASS[size], tone !== undefined && tone !== "current" && TONE_CLASS[tone], svgClassName)}
      />
      {assistiveText ? <span className="slds-assistive-text">{assistiveText}</span> : null}
    </span>
  );
}
