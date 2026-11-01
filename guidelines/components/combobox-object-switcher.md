# ComboboxObjectSwitcher

SLDS blueprint: **Lookup — object switcher** — `div.slds-combobox_object-switcher.slds-combobox-addon_start` › hidden-label form element › `slds-combobox_container.slds-has-icon-only` › object icon + faux combobox + down glyph › ComboboxListbox (`slds-dropdown_x-small slds-dropdown_left`).
File: `src/app/components/forms/ComboboxObjectSwitcher.tsx`. Used by Combobox (`variant="lookup"` + `objectSwitcher`); render it directly only when building a new lookup.

## Props — `ComboboxObjectSwitcherProps`
| Prop | Type | Notes |
|---|---|---|
| `config` | `ObjectSwitcherConfig` | `{ options: { value; label; iconName }[]; value; onChange; label? }` |
| `disabled?` | `boolean` | |

The user object icon uses the Figma cyan (`--ac-color-icon-user`).
