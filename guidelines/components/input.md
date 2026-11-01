# Input

SLDS blueprint: **Input** — FormElement › `input.slds-input` (+ `slds-input-has-icon_left|right` and `svg.slds-input__icon` when icons are set); `aria-invalid` + `aria-describedby` on error.
File: `src/app/components/forms/Input.tsx`.

## Props — `InputProps` (plus native input attributes)
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | |
| `type` | `"text" \| "email" \| "tel" \| "url" \| "number" \| "search" \| "password"` | `"text"` | |
| `onChange` | `(value, event) => void` | — | |
| `required`, `disabled`, `readOnly`, `placeholder` | native | | |
| `error` / `helpText` / `fieldLevelHelp` | `string` | — | |
| `hideLabel` | `boolean` | — | e.g. list-view search |
| `layout` | `FormElementLayout` | `"default"` | |
| `iconLeft` / `iconRight` | `UtilityIconName` | — | decorative (list search = `utility:search`, left) |

## Do
- Error text: "Complete this field." (Salesforce wording, as in Figma).
