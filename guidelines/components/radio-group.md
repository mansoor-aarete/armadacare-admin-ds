# RadioGroup

SLDS blueprint: **Radio Group** — `fieldset.slds-form-element[role=radiogroup]` › `legend.slds-form-element__legend.slds-form-element__label` › `div.slds-form-element__control` › `span.slds-radio` › `input[type=radio]` + `label.slds-radio__label` (`slds-radio_faux`, label text).
File: `src/app/components/forms/RadioGroup.tsx`.

## Props — `RadioGroupProps`
| Prop | Type | Notes |
|---|---|---|
| `legend`, `hideLegend?` | `string`, `boolean` | |
| `options` | `{ value; label; description?; disabled? }[]` | `description` = weak helper line under the label (Figma record-type picker), linked with `aria-describedby` |
| `value` / `onChange` | `string \| null` / `(value) => void` | controlled |
| `required`, `disabled`, `error`, `name` | | |

Descriptions are a Lightning addition built from SLDS text utilities (`slds-text-body_regular slds-text-color_weak slds-p-left_large`). Selected mark olive (radio hook).
