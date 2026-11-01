# Timepicker

SLDS blueprint: **Timepicker** — FormElement › `div.slds-combobox_container` › `div.slds-combobox.slds-dropdown-trigger.slds-dropdown-trigger_click.slds-timepicker(.slds-is-open)` › `div.slds-combobox__form-element.slds-input-has-icon_right` › `input.slds-input.slds-combobox__input[role=combobox][aria-autocomplete=list]` + clock icon (`slds-input__icon_right`) › ComboboxListbox (plain time options, ✓ on the selected time).
File: `src/app/components/forms/Timepicker.tsx` (ds-v1.1). Exports `formatTime` / `parseTime` helpers.

## Props — `TimepickerProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | |
| `value` / `defaultValue` | `"HH:mm" \| null` | — | 24-hour value; displayed "h:mm AM/PM" (Figma "12:00 PM") |
| `onChange` | `(value \| null) => void` | — | |
| `step` | `15 \| 30 \| 60` | `15` | minutes between suggestions |
| `placeholder`, `required`, `disabled`, `error`, `hideLabel`, `layout`, `defaultOpen`, `id` | | | error turns the clock icon red |

## Behaviour
Type to filter ("9", "9:30 pm", "13:30" are parsed on Enter / blur); ↑/↓ move, Enter selects, Escape closes; on open the selected time is highlighted and scrolled into view (inside the list only).
Date + time fields ("datetime") = a Datepicker and a Timepicker side by side.
