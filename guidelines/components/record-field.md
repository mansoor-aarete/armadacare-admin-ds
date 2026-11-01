# RecordField · RecordFieldGrid

SLDS blueprint: **Form Element — record detail** — `div.slds-form[role=list]` › `.slds-form__row` › `.slds-form__item[role=listitem]` › `div.slds-form-element.slds-form-element_readonly(.slds-form-element_edit).slds-form-element_horizontal|_stacked.slds-hint-parent` › `span.slds-form-element__label` › help › `div.slds-form-element__control` › `div.slds-form-element__static` + hint buttons.
Files: `src/app/components/record/RecordField.tsx`, `src/app/components/record/RecordFieldGrid.tsx`.

## `RecordFieldProps`
| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | |
| `value?` | `RecordFieldValue` | `text` (`multiline?`) · `link` · `lookup` (avatar + link + ", timestamp") · `checkbox` (✓ icon "True" / disabled empty checkbox "False") · `custom` |
| `layout` | `"horizontal" \| "stacked"` | default horizontal (Figma record detail) |
| `helpText?`, `required?` | | |
| `onEdit?` | `() => void` | inline-edit pencil (`slds-button__icon_hint`) |
| `action?` | `{ iconName; assistiveText; onClick }` | e.g. change owner |
| `capsLabel?` | `boolean` | claim summary cards |
| `fullWidth?` | `boolean` | `slds-form-element_1-col` |

## `RecordFieldGridProps`
`fields: (ReactNode | null)[]` in reading order (null = empty cell), `columns?: 1 | 2` (default 2).
