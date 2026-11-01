# FormElement

SLDS blueprint: **Form Element** — `div.slds-form-element(.slds-has-error)(.slds-form-element_stacked|_horizontal)` › `label.slds-form-element__label` (`abbr.slds-required` "* ") › optional help icon › `div.slds-form-element__control` › `div.slds-form-element__help`.
File: `src/app/components/forms/FormElement.tsx` · `forwardRef` to the root. Shared wrapper for Input, Textarea, Select, Combobox and Datepicker — use it for any new labelled control.

## Props — `FormElementProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `inputId` | `string` | — | label `for`; help/error id = `${inputId}-help` |
| `label` | `ReactNode` | — | |
| `hideLabel` | `boolean` | — | `slds-assistive-text` |
| `required` | `boolean` | — | |
| `error` | `ReactNode` | — | adds `slds-has-error`, replaces `helpText` |
| `helpText` / `hideHelpText` | `ReactNode` / `boolean` | — | |
| `fieldLevelHelp` | `string` | — | HelpText icon next to the label |
| `layout` | `"default" \| "stacked" \| "horizontal"` | `"default"` | record forms use `horizontal` (label on the left) |
| `labelAs`, `labelId`, `controlClassName`, `className`, `dropdown` | | | blueprint plumbing |
