import type { ReactNode } from "react";

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
};

/**
 * Lightning console layout built from SLDS grid utilities: global header, context bar, optional split view,
 * scrolling workspace and utility bar. Fills its parent's height — give the parent a height (e.g. 100vh).
 */
export function ConsoleShell({ globalHeader, appNav, splitView, utilityBar, children }: ConsoleShellProps) {
  return (
    <div className="slds-grid slds-grid_vertical" style={{ height: "100%", minHeight: 0 }}>
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
        <main id="main-content" className="slds-col slds-scrollable_y slds-p-around_small">
          {children}
        </main>
      </div>
      {utilityBar ? <div className="slds-shrink-none">{utilityBar}</div> : null}
    </div>
  );
}
