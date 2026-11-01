import type { ReactNode } from "react";

export type ShowcaseSpaceProps = {
  /** Reserved height in multiples of 3rem (slds-p-bottom_xx-large), for absolutely positioned dropdowns. */
  units: number;
  children: ReactNode;
};

/** Showcase-only: reserves vertical room under an open dropdown using SLDS spacing classes (no inline sizes). */
export function ShowcaseSpace({ units, children }: ShowcaseSpaceProps) {
  let content: ReactNode = children;
  for (let i = 0; i < units; i++) content = <div className="slds-p-bottom_xx-large">{content}</div>;
  return <>{content}</>;
}
