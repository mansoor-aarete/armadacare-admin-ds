# ConsoleShell

Layout only (SLDS grid utilities): global header + context bar on top, optional split view (23.4375rem, Figma 375 px) on the left, scrolling workspace (`main#main-content`, `slds-p-around_small`), utility bar at the bottom.
File: `src/app/components/shell/ConsoleShell.tsx`.

## Props — `ConsoleShellProps`
`globalHeader: ReactNode` (`<GlobalHeader position="inline"/>`), `appNav: ReactNode`, `splitView?: ReactNode`, `utilityBar?: ReactNode` (`position="inline"`), `children` (workspace content).

Fills its parent's height — give the parent a height (e.g. `100vh` in an app, a fixed rem height in a showcase).
