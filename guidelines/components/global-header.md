# GlobalHeader

SLDS blueprint: **Global Header** — `header.slds-global-header_container` › skip links › `div.slds-global-header` › logo item, search item (`slds-global-header__item_search`), `ul.slds-global-actions` (favourites pair, global actions +, help, setup, notifications + `slds-notification-badge`, avatar button).
File: `src/app/components/shell/GlobalHeader.tsx`.

## Props — `GlobalHeaderProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `search` | `ReactNode` | — | e.g. `<Input hideLabel iconLeft="utility:search" placeholder="Search..." />` |
| `favorites` | `{ selected?; disabled?; onToggle?; onOpenList? }` | — | omit to hide; `disabled` = "This item doesn't support favorites" |
| `onGlobalActions`, `onHelp`, `onSetup` | `() => void` | — | each one shows its button |
| `notificationCount` / `onNotifications` | `number` / `() => void` | `0` | count > 0 shows the badge |
| `avatar` / `userName` / `onAvatar` | `AvatarContent` / `string` / `() => void` | — | round medium avatar button |
| `environment` | `{ label; onTogglePanel? }` | — | sandbox row above the header (Figma "Sandbox (CXDev)"); not in the SLDS blueprint |
| `position` | `"fixed" \| "inline"` | `"fixed"` | SLDS pins the header to the viewport; `inline` (adds `slds-is-relative`) for ConsoleShell / showcase |

## Notes
- The logo area shows the SLDS default logo (package image) — Figma shows an empty area (known difference).
- `slds-global-actions__help` / `__setup` are blueprint markup-only classes (allowlisted).
