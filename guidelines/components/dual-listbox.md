# DualListbox

SLDS blueprint: **Dueling Picklist** — `div.slds-form-element[role=group]` › label › `div.slds-dueling-list` › assistive live region + instructions › column (`slds-dueling-list__column(_responsive)` › label › `div.slds-dueling-list__options` › `ul.slds-listbox_vertical[role=listbox][aria-multiselectable]`) › move-buttons column › column.
File: `src/app/components/forms/DualListbox.tsx`.

## Props — `DualListboxProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | |
| `sourceLabel` / `selectedLabel` | `string` | "Available" / "Chosen" | Figma wording |
| `options` | `{ value; label; locked? }[]` | — | locked items can't leave the selected list (lock icon) |
| `value` / `onChange` | `string[]` | — | controlled; order = selected order |
| `required`, `disabled`, `error` | | | |
| `responsive` | `boolean` | — | columns share the width (Figma record forms) |
| `size` | `number` | — | rows visible before scrolling (as `lightning-dual-listbox`); Figma record forms ≈ 4 |
| `assistiveInstructions`, `defaultHighlighted` | | | |

## Behaviour
Click highlights (Ctrl/Cmd-click adds); ↑/↓ move the highlight; Ctrl/Cmd + →/← move items. A move button is disabled when there is nothing it could move (source list empty, or only locked items chosen) — as in Figma. Reorder (up/down) buttons are not used (not in the inventory). Highlighted options are olive (block B).
