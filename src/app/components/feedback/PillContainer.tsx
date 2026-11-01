import type { ReactNode } from "react";

export type PillContainerProps = {
  /** <Pill/> elements. */
  children: ReactNode;
  /** Accessible name of the group (e.g. "Selected recipients"). */
  label?: string;
};

/** SLDS Pills — pill container blueprint (div.slds-pill_container). */
export function PillContainer({ children, label }: PillContainerProps) {
  return (
    <div className="slds-pill_container" role="group" aria-label={label}>
      {children}
    </div>
  );
}
