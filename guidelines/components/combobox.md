# Combobox (picklist / lookup)

SLDS blueprints: **Combobox** (select-only) and **Lookup** (autocomplete, selected state, object switcher).
Files: `forms/Combobox.tsx`, `forms/ComboboxListbox.tsx` (listbox panel, reusable), `forms/ComboboxObjectSwitcher.tsx` (object-switcher addon).

Markup: FormElement › `div.slds-combobox_container(.slds-has-selection)` › `div.slds-combobox.slds-dropdown-trigger.slds-dropdown-trigger_click(.slds-is-open)` › `div.slds-combobox__form-element.slds-input-has-icon_*` › input (`role=combobox`, `aria-controls`, `aria-expanded`, `aria-activedescendant`) › `div.slds-dropdown[role=listbox]` › `ul.slds-listbox_vertical` › options. With an object switcher everything sits in `div.slds-combobox-group`.

## Props — `ComboboxProps` = `PicklistComboboxProps | LookupComboboxProps`
Common: `label`, `hideLabel`, `required`, `disabled`, `error`, `helpText` (`ReactNode`), `fieldLevelHelp`, `layout`, `placeholder`, `id`, `defaultOpen`.

| Variant | Extra props |
|---|---|
| `variant?: "picklist"` (default) | `options: { value; label; disabled? }[]`, `value` / `defaultValue: string \| null`, `onChange(value \| null)` |
| `variant: "lookup"` | `options: LookupOption[]` (`value`, `label`, `iconName: ObjectIconName`, `objectLabel`, `meta?`, `disabled?`), `value` / `defaultValue`, `onChange`, `onSearchChange(term)`, `objectSwitcher?: { options: { value; label; iconName }[]; value; onChange; label? }` |

## Keyboard
↑/↓ move through options, Enter selects, Escape closes; an outside click closes. Lookup: the clear button removes the selection.

## Notes
- The selected picklist option shows the olive check (`.slds-listbox__icon-selected`, block B).
- `standard:user` lookups show the Figma cyan (`--ac-color-icon-user`).
