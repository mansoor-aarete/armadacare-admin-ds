# ButtonGroup

SLDS blueprint: **Button Groups** — `div.slds-button-group[role=group]` (base) or `ul.slds-button-group-list` › `li` (list).
File: `src/app/components/buttons/ButtonGroup.tsx`.

## Props — `ButtonGroupProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `children` | `ReactNode` | — | Buttons / ButtonIcons / ButtonMenus |
| `kind` | `"group" \| "list"` | `"group"` | `list` for list-view and record action bars (Figma A9 "New · Discover Companies · … ▾") |
| `label` | `string` | — | accessible name |
| `className` | `string` | — | SLDS classes only |

## Do
- In `kind="group"`, give a trailing overflow `ButtonMenu` `className="slds-button_last"`.
