# AppNav

SLDS blueprint: **Global Navigation / Context Bar** — `div.slds-context-bar(.slds-context-bar_tabs)` › `div.slds-context-bar__primary` (waffle `button.slds-icon-waffle_container`, app name, object item `slds-context-bar__object-switcher`) › `slds-context-bar__secondary` (nav items, or the console tab list).
File: `src/app/components/shell/AppNav.tsx`.

## Props — `AppNavProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `appName` | `string` | — | truncates (Figma "ArmadaCare Admin…") |
| `onAppLauncher` | `() => void` | — | waffle button |
| `objectItem` | `AppNavItem` | — | console object item ("Accounts ▼"); `active` when no workspace tab is open |
| `items` | `AppNavItem[]` | `[]` | standard (non-console) nav items |
| `tabs` | `ReactNode` | — | `<WorkspaceTabs/>`; any value (also `null`) switches to the console bar |
| `onSelect` / `onMenuSelect` | `(id)` / `(id, value)` | — | |

`AppNavItem` = `{ id; label; active?; menuItems?: MenuItem[]; href? }` — `menuItems` adds the ▼ button and its menu.

Active item: olive 10 % tint + 3 px olive top bar (theme block B, including the SLDS `bkAnim` keyframes).
Console object item: fixed 11.5625rem (Figma 185 px) with the ▼ in its own bordered cell; tint and top bar only on the label (theme Block C).
