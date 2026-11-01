# RecordFieldGrid

SLDS blueprint: **Form — record detail** — `div.slds-form[role=list]` › `div.slds-form__row` › `div.slds-form__item[role=listitem]`.
File: `src/app/components/record/RecordFieldGrid.tsx`. Lays out RecordFields.

## Props — `RecordFieldGridProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `fields` | `(ReactNode \| null)[]` | — | reading order, row by row; `null` = empty cell (keeps the next field in the right column, as in Lightning layouts) |
| `columns?` | `1 \| 2 \| 3` | `2` | 3 = summary cards with stacked caps labels (Figma Claim Details, Receipt / Documentation) — ds-v1.1 |

`slds-form` is blueprint markup without CSS (allowlisted).
