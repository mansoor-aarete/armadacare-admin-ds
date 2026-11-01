# DatepickerCalendar

SLDS blueprint: **Datepicker — dropdown** — `div.slds-datepicker.slds-dropdown[role=dialog]` › `div.slds-datepicker__filter` (previous / next month, month `h2`, year select) › `table.slds-datepicker__month[role=grid]` (`slds-day`, `slds-is-today`, `slds-is-selected`, `slds-day_adjacent-month`) › Today button.
File: `src/app/components/forms/DatepickerCalendar.tsx`. Building block of Datepicker.

## Props — `DatepickerCalendarProps`
| Prop | Type | Notes |
|---|---|---|
| `idPrefix` | `string` | ids for the grid and labels |
| `value` | `string \| null` | selected ISO date |
| `today` | `string` | ISO; injectable for stable screenshots |
| `onSelect` | `(iso) => void` | |
| `onClose` | `() => void` | Escape |
| `yearRange` | `[number, number]` | year select range |
| `autoFocus?` | `boolean` | focus the grid (keyboard open) |

Keyboard: arrows move days, Enter selects, Escape closes. Selected day olive (block B).
