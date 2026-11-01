# CheckboxGroup

SLDS blueprint: **Checkbox Group** — `fieldset.slds-form-element(.slds-has-error)` › `legend.slds-form-element__legend.slds-form-element__label` › `div.slds-form-element__control` › Checkbox (`wrapper="none"`) × n › help.
File: `src/app/components/forms/CheckboxGroup.tsx`.

## Props — `CheckboxGroupProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `legend` | `string` | — | |
| `options` | `{ value; label; disabled? }[]` | — | |
| `value` / `onChange` | `string[]` / `(value: string[]) => void` | — | controlled |
| `layout` | `"stacked" \| "inline"` | `"stacked"` | inline = Figma status filters (`slds-grid slds-wrap`) |
| `required`, `disabled`, `error` | | | |
