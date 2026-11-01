import type { ReactNode } from "react";
import { cx } from "../utils/cx";

/** "parent" = fill the parent's height (give the parent a height); "viewport" = fill the browser window (100vh). */
export type ConsoleShellFill = "parent" | "viewport";

export type ConsoleShellProps = {
  /** <GlobalHeader position="inline" …/> */
  globalHeader: ReactNode;
  /** <AppNav …/> (with <WorkspaceTabs/> for console apps). */
  appNav: ReactNode;
  /** <SplitView …/> — the list panel on the left of record pages (optional). */
  splitView?: ReactNode;
  /** <UtilityBar position="inline" …/> */
  utilityBar?: ReactNode;
  /** Workspace content (page header, record layout, …). */
  children: ReactNode;
  /**
   * Pad the workspace by 0.75rem (default true — record pages). false = content flush with the workspace edges
   * (object homes / list views, Figma A1 and D1). ds-v1.3.
   */
  workspacePadding?: boolean;
  /** Height source (default "parent"). ds-v1.3. */
  fill?: ConsoleShellFill;
};

/**
 * Lightning console layout built from SLDS grid utilities: global header, context bar, optional split view,
 * scrolling workspace and utility bar. Fills its parent's height, or the viewport with `fill="viewport"`.
 */
export function ConsoleShell({ globalHeader, appNav, splitView, utilityBar, children, workspacePadding = true, fill = "parent" }: ConsoleShellProps) {
  return (
    <div className="slds-grid slds-grid_vertical" style={{ height: fill === "viewport" ? "100vh" : "100%", minHeight: 0 }}>
      <div className="slds-shrink-none">
        {globalHeader}
        {appNav}
      </div>
      <div className="slds-grid slds-grow" style={{ minHeight: 0 }}>
        {splitView ? (
          <div className="slds-grid slds-shrink-none" style={{ width: "23.4375rem" }}>
            {splitView}
          </div>
        ) : null}
        <main id="main-content" className={cx("slds-col slds-scrollable_y", workspacePadding && "slds-p-around_small")}>
          {children}
        </main>
      </div>
      {utilityBar ? <div className="slds-shrink-none">{utilityBar}</div> : null}
    </div>
  );
}
