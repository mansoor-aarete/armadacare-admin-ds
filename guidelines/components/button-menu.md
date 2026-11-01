# ButtonMenu (+ MenuDropdown)

SLDS blueprint: **Menus** — `div.slds-dropdown-trigger.slds-dropdown-trigger_click(.slds-is-open)` › trigger (`Button` or `ButtonIcon` with `aria-haspopup` / `aria-expanded`) › `div.slds-dropdown` › `ul.slds-dropdown__list[role=menu]` › `li.slds-dropdown__item[role=presentation]` › `a[role=menuitem|menuitemcheckbox]` › `span[title]`.
Files: `buttons/ButtonMenu.tsx` (trigger + state) and `buttons/MenuDropdown.tsx` (the panel — reuse it wherever a menu panel is needed).

## `MenuItem` (union)
`{ type?: "item"; value; label; disabled?; iconName? }` · `{ type: "checkbox"; value; label; checked; disabled? }` · `{ type: "header"; label }` · `{ type: "divider" }`

## Props — `ButtonMenuProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `MenuItem[]` | — | |
| `onSelect` | `(value: string) => void` | — | |
| `label` | `string` | — | text trigger; omit for an icon trigger |
| `labelVariant` | `ButtonVariant` | `"neutral"` | |
| `iconName` | `UtilityIconName` | `"utility:down"` | icon-trigger glyph (gear, table, …) |
| `assistiveText` | `string` | — | **required** |
| `iconVariant` / `iconSize` | `ButtonIconVariant` / `ButtonIconSize` | `"border-filled"` / `"medium"` | |
| `iconClassName` | `string` | — | glyph classes of the icon trigger (row actions: `slds-button__icon_hint slds-button__icon_small`) |
| `position` | `"left" \| "right" \| "bottom"` | `"left"` | |
| `length` | `5 \| 7 \| 10` | — | max visible items before scrolling |
| `size` | `"xx-small" \| "x-small" \| "small" \| "medium" \| "large"` | — | `x-small` = 12rem min width (Figma action overflow) |
| `actions` | `boolean` | — | `slds-dropdown_actions` — record / list-view action overflow (olive text) |
| `disabled`, `defaultOpen`, `className` | | | `className` goes on the trigger wrapper (`slds-button_last`) |

## Keyboard
Arrow keys move between items, Enter/Space select, Escape/Tab close and return focus to the trigger; an outside click closes.
