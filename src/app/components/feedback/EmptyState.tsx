import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { DesertIllustration } from "./DesertIllustration";

/** "illustration" = SLDS Illustration (No Data: Desert); "text" = one-line message (Figma: "No payments found…"). */
export type EmptyStateVariant = "illustration" | "text";

export type EmptyStateProps = {
  variant?: EmptyStateVariant;
  /** Heading (illustration variant), e.g. "Get your accounts engaged". */
  heading?: string;
  /** Body text / the message of the text variant. */
  message: ReactNode;
  /** Illustration size. */
  size?: "small" | "large";
  /** Shaded background (Figma D1 list area). */
  shaded?: boolean;
};

/** SLDS Illustration blueprint (div.slds-illustration › svg + .slds-text-longform), or a plain message. */
export function EmptyState({ variant = "illustration", heading, message, size = "small", shaded }: EmptyStateProps) {
  if (variant === "text") {
    return <p className={cx("slds-text-body_regular slds-text-color_weak slds-p-around_small", shaded && "slds-theme_shade")}>{message}</p>;
  }
  return (
    <div className={cx("slds-p-around_large", shaded && "slds-theme_shade")}>
      <div className={cx("slds-illustration", size === "large" ? "slds-illustration_large" : "slds-illustration_small")}>
        <DesertIllustration />
        <div className="slds-text-longform">
          {heading ? <h3 className="slds-text-heading_medium">{heading}</h3> : null}
          <p className="slds-text-body_regular">{message}</p>
        </div>
      </div>
    </div>
  );
}
