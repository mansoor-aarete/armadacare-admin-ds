import type { ReactNode } from "react";
import { Icon, type UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

/** "error" | "warning" | "success" | "info" = SLDS themed (coloured) notification; "light" / "dark" = neutral themes. */
export type ScopedNotificationVariant = "error" | "warning" | "success" | "info" | "light" | "dark";

export type ScopedNotificationProps = {
  variant?: ScopedNotificationVariant;
  children: ReactNode;
  /** Screen-reader name of the icon (defaults to the variant, e.g. "error"). */
  assistiveText?: string;
};

const CLASS: Record<ScopedNotificationVariant, string> = {
  error: "slds-theme_error",
  warning: "slds-theme_warning",
  success: "slds-theme_success",
  info: "slds-theme_info",
  light: "slds-scoped-notification_light",
  dark: "slds-scoped-notification_dark",
};

const ICON: Record<ScopedNotificationVariant, UtilityIconName> = {
  error: "utility:error",
  warning: "utility:warning",
  success: "utility:success",
  info: "utility:info",
  light: "utility:info",
  dark: "utility:info",
};

/** SLDS Scoped Notifications blueprint (div.slds-scoped-notification.slds-media[role=status] › icon + body). */
export function ScopedNotification({ variant = "light", children, assistiveText }: ScopedNotificationProps) {
  const themed = variant !== "light" && variant !== "dark";
  return (
    <div className={cx("slds-scoped-notification slds-media slds-media_center", CLASS[variant])} role="status">
      <div className="slds-media__figure">
        <Icon
          name={ICON[variant]}
          size="small"
          tone={variant === "light" ? "default" : "inverse"}
          assistiveText={assistiveText ?? (themed ? variant : "information")}
        />
      </div>
      <div className="slds-media__body">{children}</div>
    </div>
  );
}
