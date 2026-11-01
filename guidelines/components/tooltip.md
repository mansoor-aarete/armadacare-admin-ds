# Tooltip

SLDS blueprint: **Tooltips** — `div.slds-popover.slds-popover_tooltip.slds-nubbin_{side}[role=tooltip]` › `div.slds-popover__body`.
File: `src/app/components/overlays/Tooltip.tsx`.

## Props — `TooltipProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `id` | `string` | — | referenced by the trigger's `aria-describedby` |
| `children` | `ReactNode` | — | |
| `nubbin` | `"bottom-left" \| "bottom" \| "top-left" \| "top" \| "left" \| "right"` | `"bottom-left"` | |
| `placement` | `"above" \| "below" \| "static"` | `"static"` | above / below position against the relatively positioned parent (rem offsets) |

The background is the SLDS default dark navy — tooltips aren't captured in Figma.
