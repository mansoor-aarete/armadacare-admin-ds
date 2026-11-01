# MenuDropdown

SLDS blueprint: **Menus — dropdown** — `div.slds-dropdown(.slds-dropdown_left|_right|_bottom)(.slds-dropdown_length-N)(.slds-dropdown_{size})(.slds-dropdown_actions)` › `ul.slds-dropdown__list[role=menu]` › `li.slds-dropdown__item[role=presentation]` › `a[role=menuitem|menuitemcheckbox]` › `span[title]`; headers `li.slds-dropdown__header`, dividers `li.slds-has-divider_top-space`.
File: `src/app/components/buttons/MenuDropdown.tsx`. Building block used by ButtonMenu, AppNav, WorkspaceTabs, SplitView and PageHeader — reuse it for any menu panel.

## Props — `MenuDropdownProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `items` | `MenuItem[]` | — | item / checkbox / header / divider |
| `onSelect` | `(value: string) => void` | — | |
| `onClose` | `() => void` | — | Escape / Tab |
| `position` | `"left" \| "right" \| "bottom"` | `"left"` | |
| `length` | `5 \| 7 \| 10` | — | max visible items |
| `size` | `"xx-small" \| "x-small" \| "small" \| "medium" \| "large"` | — | |
| `actions` | `boolean` | — | action-overflow style (olive text) |
| `autoFocus` | `boolean` | — | focus the first item (keyboard open) |
| `ariaLabel` | `string` | — | |

Keyboard: ↑/↓ move, Enter selects, Escape / Tab close.
