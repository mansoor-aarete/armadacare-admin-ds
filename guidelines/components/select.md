# Select

SLDS blueprint: **Select** — FormElement › `div.slds-select_container` › `select.slds-select`.
File: `src/app/components/forms/Select.tsx`.

## Props — `SelectProps`
`label`, `options: { value; label; disabled? }[]`, `value` / `defaultValue`, `onChange(value, event)`, `placeholderOption` (e.g. "--None--"), `hideLabel`, `required`, `disabled`, `error`, `helpText`, `layout`, `id`, `name`.

## Do
- Prefer **Combobox (picklist)** for record-form picklists — that is what Figma shows. Use Select only where a native select is expected (e.g. the datepicker year).

## Multiple selection (ds-v1.1)
`multiple: true` renders the SLDS **Select — Multiple Selection (narrow)** blueprint: a native `select.slds-select[multiple]` without the container — the multi-select listbox (Figma CL7 "Reason codes (select one or more)"). Props then are `value?: string[]`, `defaultValue?: string[]`, `onChange?(values, event)`, `size?` (visible rows, default 4). Select with Ctrl/Cmd/Shift-click or the keyboard (native listbox semantics).
