# Select

SLDS blueprint: **Select** — FormElement › `div.slds-select_container` › `select.slds-select`.
File: `src/app/components/forms/Select.tsx`.

## Props — `SelectProps`
`label`, `options: { value; label; disabled? }[]`, `value` / `defaultValue`, `onChange(value, event)`, `placeholderOption` (e.g. "--None--"), `hideLabel`, `required`, `disabled`, `error`, `helpText`, `layout`, `id`, `name`.

## Do
- Prefer **Combobox (picklist)** for record-form picklists — that is what Figma shows. Use Select only where a native select is expected (e.g. the datepicker year).
