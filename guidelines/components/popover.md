# Popover

SLDS blueprint: **Popovers** — `section.slds-popover(.slds-popover_error)(.slds-nubbin_{side})[role=dialog][aria-labelledby]` › close `ButtonIcon` (`slds-popover__close`) › `header.slds-popover__header` (media: icon + `h2`) › `div.slds-popover__body` › optional `footer.slds-popover__footer`.
File: `src/app/components/overlays/Popover.tsx`.

## Props — `PopoverProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `heading` | `string` | — | |
| `children` | `ReactNode` | — | body |
| `variant` | `"default" \| "error"` | `"default"` | error = Figma "We hit a snag." (dark-red header, `utility:error`) |
| `iconName` | `UtilityIconName` | `utility:error` for error | |
| `nubbin` | `TooltipNubbin` | — | Figma error popover = `bottom` |
| `onClose` | `() => void` | — | shows the close button |
| `footer` | `ReactNode` | — | |
| `id`, `className` | | | `className` = SLDS positioning utilities |

Warning / walkthrough / feature popovers are not in the inventory.
