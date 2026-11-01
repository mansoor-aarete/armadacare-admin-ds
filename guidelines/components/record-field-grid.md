# RecordFieldGrid

SLDS blueprint: **Form — record detail** — `div.slds-form[role=list]` › `div.slds-form__row` › `div.slds-form__item[role=listitem]`.
File: `src/app/components/record/RecordFieldGrid.tsx`. Lays out RecordFields.

## Props — `RecordFieldGridProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `fields` | `(ReactNode \| null)[]` | — | reading order, row by row; `null` = empty cell (keeps the next field in the right column, as in Lightning layouts) |
| `columns?` | `1 \| 2` | `2` | |

`slds-form` is blueprint markup without CSS (allowlisted).
