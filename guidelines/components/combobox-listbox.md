# ComboboxListbox

SLDS blueprint: **Combobox — listbox** — `div.slds-dropdown(.slds-dropdown_length-5|_length-with-icon-7)[role=listbox]` › `ul.slds-listbox.slds-listbox_vertical` › plain options (`slds-listbox__option_plain`, check icon when selected) or entity options (`slds-listbox__option_entity` with object icon and meta line).
File: `src/app/components/forms/ComboboxListbox.tsx`. Building block of Combobox and ComboboxObjectSwitcher.

## Props — `ComboboxListboxProps`
| Prop | Type | Notes |
|---|---|---|
| `id` | `string` | referenced by the input's `aria-controls` |
| `kind` | `"plain" \| "entity"` | |
| `options` | `{ value; label; disabled?; iconName?; meta? }[]` | |
| `selectedValue?` | `string \| null` | |
| `focusedIndex` | `number` | keyboard-highlighted option (`aria-activedescendant`) |
| `optionId` | `(index) => string` | option ids |
| `onPick` | `(value) => void` | |
| `onFocusIndex` | `(index) => void` | hover / keyboard focus |
| `ariaLabel` | `string` | |
| `className?` | `string` | SLDS dropdown classes (default `slds-dropdown_fluid`) |
