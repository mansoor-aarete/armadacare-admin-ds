# Toggle

SLDS blueprint: **Checkbox Toggle** — `div.slds-form-element` › `label.slds-checkbox_toggle.slds-grid` › `span.slds-form-element__label.slds-m-bottom_none` › `input[type=checkbox][role=switch]` › `span.slds-checkbox_faux_container` (`slds-checkbox_faux`, `slds-checkbox_on`, `slds-checkbox_off`).
File: `src/app/components/forms/Toggle.tsx`.

## Props — `ToggleProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | |
| `checked` / `defaultChecked` | `boolean` | — | controlled / uncontrolled |
| `onChange` | `(checked) => void` | — | |
| `onLabel` / `offLabel` | `string` | "Enabled" / "Disabled" | Figma: "Yes" / "No" |
| `disabled`, `hideLabel`, `name` | | | read-only record fields use `disabled` (Figma CL3) |
| `capsLabel` | `boolean` | — | `slds-text-title_caps` ("PLACE ON HOLD") |
| `layout` | `"inline" \| "stacked"` | `"inline"` | stacked = label above the switch (`slds-grid_vertical`) |

Checked track is olive (theme block A toggle hooks).
