import type { ReactNode } from "react";
import { cx } from "../utils/cx";
import { DesertIllustration } from "./DesertIllustration";

/**
 * "illustration" = SLDS Illustration (No Data: Desert); "text" = one-line message (Figma: "No payments found…");
 * "region" = shaded placeholder block of a set height (Figma: embedded iframe / Visualforce areas that render grey).
 */
export type EmptyStateVariant = "illustration" | "text" | "region";

/** Height of the "region" variant: small 6.25rem (Figma iframe 100 px) · medium 12.5rem · large 25rem · fill = 100 % of the parent (ds-v1.8, report body). */
export type EmptyStateRegionSize = "small" | "medium" | "large" | "fill";

export type EmptyStateProps = {
  variant?: EmptyStateVariant;
  /** Heading (illustration variant), e.g. "Get your accounts engaged". */
  heading?: string;
  /** Body text / the message of the text variant (optional for "region"). */
  message?: ReactNode;
  /** Illustration size. */
  size?: "small" | "large";
  /** Shaded background (Figma D1 list area). Region variant: shaded unless `false` (ds-v1.6 — blank section bodies, Figma C1). */
  shaded?: boolean;
  /** Height of the "region" variant. Default "small". */
  regionSize?: EmptyStateRegionSize;
  /** Accessible name of the region (e.g. "Participant/Members"). */
  regionLabel?: string;
};

const REGION_HEIGHT: Record<EmptyStateRegionSize, string> = { small: "6.25rem", medium: "12.5rem", large: "25rem", fill: "100%" };

/** SLDS Illustration blueprint (div.slds-illustration › svg + .slds-text-longform), a plain message, or a shaded placeholder region. */
export function EmptyState({ variant = "illustration", heading, message, size = "small", shaded, regionSize = "small", regionLabel }: EmptyStateProps) {
  if (variant === "region") {
    return (
      <div
        className={cx(shaded !== false && "slds-theme_shade", "slds-grid slds-grid_align-center slds-grid_vertical-align-center")}
        style={{ height: REGION_HEIGHT[regionSize] }}
        role="region"
        aria-label={regionLabel}
      >
        {message ? <p className="slds-text-body_regular slds-text-color_weak">{message}</p> : null}
      </div>
    );
  }
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
