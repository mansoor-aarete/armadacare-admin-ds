# Checkbox

SLDS blueprint: **Checkbox** — `div.slds-form-element` › `div.slds-form-element__control` › `div.slds-checkbox` › `input[type=checkbox]` + `label.slds-checkbox__label` › `span.slds-checkbox_faux` + `span.slds-form-element__label`.
File: `src/app/components/forms/Checkbox.tsx`.

## Props — `CheckboxProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | |
| `checked` / `defaultChecked` | `boolean` | — | controlled / uncontrolled |
| `indeterminate` | `boolean` | — | set on the DOM node |
| `onChange` | `(checked: boolean) => void` | — | |
| `disabled`, `required`, `error`, `name`, `value`, `id` | | | |
| `hideLabel` | `boolean` | — | table / split-view row selection |
| `wrapper` | `"form-element" \| "none"` | `"form-element"` | `none` inside groups and tables |
| `className` | `string` | — | SLDS classes on `.slds-checkbox` |

The check mark is olive via `--slds-c-checkbox-mark-color-foreground`.
