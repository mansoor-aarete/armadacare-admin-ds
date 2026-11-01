# Datepicker

SLDS blueprint: **Datepicker** — FormElement (`slds-dropdown-trigger slds-dropdown-trigger_click(.slds-is-open)`) › `input.slds-input` + `ButtonIcon utility:event` (`slds-input__icon_right`) › `div.slds-datepicker.slds-dropdown[role=dialog]` › month navigation, year select, `table.slds-datepicker__month[role=grid]`, Today button.
Files: `forms/Datepicker.tsx`, `forms/DatepickerCalendar.tsx` (calendar panel), `utils/dates.ts` (M/D/YYYY parse / format).

## Props — `DatepickerProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | |
| `value` / `defaultValue` | ISO `string \| null` | — | displayed as M/D/YYYY |
| `onChange` | `(iso \| null) => void` | — | |
| `required`, `disabled`, `error`, `fieldLevelHelp`, `hideLabel`, `layout`, `id` | | | |
| `showFormatHint` | `boolean` | `false` | visible "Format: 12/31/2024" (assistive text only by default, as in the blueprint) |
| `today` | ISO `string` | current date | inject for stable screenshots |
| `yearRange` | `[number, number]` | — | year-select range |
| `defaultOpen` | `boolean` | — | |

## Keyboard
Arrow keys move between days, Enter selects, Escape closes. The selected day is olive (block B).
