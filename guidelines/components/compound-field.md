# CompoundField

SLDS blueprint: **Form Element — Compound** (and **Address**) — `fieldset.slds-form-element.slds-form-element_compound(.slds-form-element_address)(.slds-form-element_horizontal|_stacked)(.slds-has-error)` › `legend.slds-form-element__legend.slds-form-element__label` (+ `abbr.slds-required`) › optional help icon › `div.slds-form-element__control` › `div.slds-form-element__row` › `div.slds-size_X-of-Y` (one per sub-field) › error `div.slds-form-element__help`.
File: `src/app/components/forms/CompoundField.tsx` (ds-v1.2).

## Props — `CompoundFieldProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | legend, e.g. "Corporate Address" |
| `rows` | `CompoundFieldCell[][]` | — | rows top to bottom; a cell is `{ content: ReactNode; size?: CompoundFieldSize }` |
| `required` | `boolean` | | red `*` before the legend |
| `address` | `boolean` | | `.slds-form-element_address` (rows aligned on the baseline) |
| `layout` | `"default" \| "stacked" \| "horizontal"` | `"default"` | horizontal = legend left of the rows (record forms) |
| `hideLabel`, `fieldLevelHelp`, `error`, `id` | | | |

`CompoundFieldSize` = `"1-of-1" | "1-of-2" | "1-of-3" | "2-of-3" | "2-of-6" | "4-of-6"`; omit `size` to share the row equally (`slds-col`).

## Use it for (Figma New Account: Group)
- **Address**: Address Search lookup (1-of-1) · Street textarea (1-of-1) · City (4-of-6) + State/Province (2-of-6) · Zip/Postal Code (4-of-6) + Country (2-of-6) — the SLDS address example.
- **Latitude / Longitude** (GeoPointeGeolocation): two Inputs in one row.
- **Date + Time** (datetime fields): a Datepicker and a Timepicker in one row.

Sub-fields are normal form components with their own labels; the CompoundField only groups them.
