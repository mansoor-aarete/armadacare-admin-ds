import type { CSSProperties, ReactNode } from "react";
import { cx } from "../utils/cx";

export type TooltipNubbin = "bottom-left" | "bottom" | "top-left" | "top" | "left" | "right";
/** Where the tooltip sits relative to the element it describes (its positioned parent). */
export type TooltipPlacement = "above" | "below" | "static";

export type TooltipProps = {
  id: string;
  children: ReactNode;
  nubbin?: TooltipNubbin;
  /** "above"/"below" position the tooltip against its relatively positioned parent; "static" = in flow. */
  placement?: TooltipPlacement;
};

const NUBBIN_CLASS: Record<TooltipNubbin, string> = {
  "bottom-left": "slds-nubbin_bottom-left",
  bottom: "slds-nubbin_bottom",
  "top-left": "slds-nubbin_top-left",
  top: "slds-nubbin_top",
  left: "slds-nubbin_left",
  right: "slds-nubbin_right",
};

// Geometry in rem only: the SLDS left-corner nubbin tip sits 1.5rem in and protrudes 0.5rem;
// -1.0625rem centres it on a 0.875rem help icon.
const PLACEMENT_STYLE: Record<TooltipPlacement, CSSProperties | undefined> = {
  above: { position: "absolute", bottom: "calc(100% + 0.75rem)", left: "-1.0625rem", width: "max-content", maxWidth: "20rem" },
  below: { position: "absolute", top: "calc(100% + 0.75rem)", left: "-1.0625rem", width: "max-content", maxWidth: "20rem" },
  static: undefined,
};

/** SLDS Tooltips blueprint (div.slds-popover.slds-popover_tooltip[role=tooltip]). */
export function Tooltip({ id, children, nubbin = "bottom-left", placement = "static" }: TooltipProps) {
  return (
    <div className={cx("slds-popover slds-popover_tooltip", NUBBIN_CLASS[nubbin])} role="tooltip" id={id} style={PLACEMENT_STYLE[placement]}>
      <div className="slds-popover__body">{children}</div>
    </div>
  );
}
