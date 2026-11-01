# ConsoleShell

Layout only (SLDS grid utilities): global header + context bar on top, optional split view (23.4375rem, Figma 375 px) on the left, scrolling workspace (`main#main-content`, `slds-p-around_small` by default), utility bar at the bottom.
File: `src/app/components/shell/ConsoleShell.tsx`.

## Props — `ConsoleShellProps`
`globalHeader: ReactNode` (`<GlobalHeader position="inline"/>`), `appNav: ReactNode`, `splitView?: ReactNode`, `utilityBar?: ReactNode` (`position="inline"`), `children` (workspace content),
`workspacePadding?: boolean` (default `true`; ds-v1.3), `fill?: "parent" | "viewport"` (default `"parent"`; ds-v1.3).

- `fill="parent"` fills its parent's height — give the parent a height (a fixed rem height in a showcase). `fill="viewport"` = `100vh`: the app console; only the workspace scrolls.
- With a `splitView`, the workspace gets `slds-m-left_large` so the split-view toggle has its own 1.5rem column (Figma; theme block C, ds-v1.4).
- `workspacePadding={false}`: workspace content flush with the edges — object homes / list views and the Intelligence View (Figma A1, D1). Record pages keep the 0.75rem padding (Figma highlights panel 12 px from the split view).
