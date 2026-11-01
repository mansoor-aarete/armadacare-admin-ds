import type { ReactNode } from "react";

export type ShowcaseExampleProps = {
  title: string;
  /** Stable id for Playwright screenshots. */
  visualId?: string;
  children: ReactNode;
  /** Two-column tile for wide content (e.g. the fixed 15rem-column dual listbox). */
  wide?: boolean;
  /** Full-width tile (shell patterns, tables). */
  full?: boolean;
};

/** One labelled example tile in /showcase. */
export function ShowcaseExample({ title, visualId, children, wide, full }: ShowcaseExampleProps) {
  return (
    <div
      className={
        full
          ? "slds-col slds-size_1-of-1 slds-p-around_small"
          : wide
          ? "slds-col slds-size_1-of-1 slds-large-size_2-of-3 slds-p-around_small"
          : "slds-col slds-size_1-of-1 slds-medium-size_1-of-2 slds-large-size_1-of-3 slds-p-around_small"
      }
    >
      <div className="slds-box slds-theme_default" data-visual-id={visualId}>
        <p className="slds-text-title_caps slds-m-bottom_small">{title}</p>
        {children}
      </div>
    </div>
  );
}
