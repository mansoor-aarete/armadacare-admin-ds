import { Children, type ReactNode } from "react";
import { cx } from "../utils/cx";

export type ButtonGroupKind = "group" | "list";

export type ButtonGroupProps = {
  /** Buttons / ButtonMenus. A trailing overflow ButtonMenu needs className="slds-button_last". */
  children: ReactNode;
  /** "group" = div[role=group] (SLDS Button Groups base); "list" = ul.slds-button-group-list (list-view / record action bars). */
  kind?: ButtonGroupKind;
  /** Accessible name for the group. */
  label?: string;
  className?: string;
};

/** SLDS Button Groups blueprint (base and list variants). */
export function ButtonGroup({ children, kind = "group", label, className }: ButtonGroupProps) {
  if (kind === "list") {
    return (
      <ul className={cx("slds-button-group-list", className)} aria-label={label}>
        {Children.toArray(children).map((child, i) => (
          <li key={i}>{child}</li>
        ))}
      </ul>
    );
  }
  return (
    <div className={cx("slds-button-group", className)} role="group" aria-label={label}>
      {children}
    </div>
  );
}
