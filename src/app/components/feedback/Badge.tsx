import type { ReactNode } from "react";
import { cx } from "../utils/cx";

/** "inverse" = dark badge (Figma: tree grid "current"); "lightest" = white with border. */
export type BadgeVariant = "default" | "inverse" | "lightest";

export type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const VARIANT_CLASS: Record<BadgeVariant, string | undefined> = {
  default: undefined,
  inverse: "slds-badge_inverse",
  lightest: "slds-badge_lightest",
};

/** SLDS Badges blueprint. */
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return <span className={cx("slds-badge", VARIANT_CLASS[variant], className)}>{children}</span>;
}
