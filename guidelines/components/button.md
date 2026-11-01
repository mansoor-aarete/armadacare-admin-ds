# Button

SLDS blueprint: **Buttons** — `button.slds-button` (+ `slds-button_neutral` / `slds-button_brand`) › optional `svg.slds-button__icon.slds-button__icon_left|right`.
File: `src/app/components/buttons/Button.tsx` · `forwardRef` to the `<button>`.

## Props — `ButtonProps` (plus native button attributes except `className` / `style` / `children`)
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `ReactNode` | — | visible text |
| `variant` | `"base" \| "neutral" \| "brand"` | `"neutral"` | brand = olive fill (Save); neutral = bordered white, olive text (Figma); base = text only |
| `iconName` | `UtilityIconName` | — | optional glyph |
| `iconPosition` | `"left" \| "right"` | `"left"` | |
| `iconSize` | `"x-small" \| "small" \| "medium"` | `"medium"` | x-small for menu chevrons |
| `className` | `string` | — | SLDS classes only (`slds-button_last`, spacing) |

## Do
- One `brand` button per footer / action bar (Figma: Save).
- Use `disabled` for unavailable actions.

## Don't
- Don't use `slds-button_destructive` / `_success` — not in the Figma inventory.
- Don't set colours; the olive comes from the theme hooks.
