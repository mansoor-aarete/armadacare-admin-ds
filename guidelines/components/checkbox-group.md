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

ds-v1.9: `hideLegend?: boolean` — the legend becomes `slds-assistive-text` when a section title already names the group (Figma P6 "Bucket (Benefit Category)"). Inline options are spaced with `slds-m-right_small` (Figma 21 px between a label and the next box).
