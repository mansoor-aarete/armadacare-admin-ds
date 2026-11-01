# IconSvg

The bare SLDS icon `<svg>` (`aria-hidden="true"`, viewBox + verbatim SLDS path markup from the generated registry). Used inside blueprints that own the wrapper (buttons, inputs, menus); stand-alone icons use **Icon**.
File: `src/app/components/icons/IconSvg.tsx`.

## Props — `IconSvgProps`
| Prop | Type | Notes |
|---|---|---|
| `name` | `IconName` | registry icon (`utility:…`, `standard:…`, `custom:…`) |
| `className` | `string` | the blueprint's svg classes, e.g. `slds-button__icon slds-button__icon_left` |

Icon artwork is © Salesforce, CC BY-ND 4.0 — never edit the path data (see `foundations/icons.md`).
