# ButtonIcon

SLDS blueprint: **Button Icons** — `button.slds-button.slds-button_icon[title]` (+ variant / size classes) › `svg.slds-button__icon` + `span.slds-assistive-text`.
File: `src/app/components/buttons/ButtonIcon.tsx` · `forwardRef` to the `<button>`.

## Props — `ButtonIconProps` (plus native button attributes)
| Prop | Type | Default | Notes |
|---|---|---|---|
| `iconName` | `UtilityIconName` | — | |
| `assistiveText` | `string` | — | **required**; also the `title` unless `title` is passed |
| `variant` | `"bare" \| "container" \| "border" \| "border-filled" \| "brand" \| "inverse" \| "border-inverse"` | `"bare"` | Figma list-view / pin buttons = `border-filled` |
| `size` | `"xx-small" \| "x-small" \| "small" \| "medium"` | `"medium"` | box size (non-bare); pin = `small` |
| `iconSize` | `"x-small" \| "small" \| "medium" \| "large"` | `"medium"` | glyph size |
| `pressed` | `boolean` | — | stateful: `slds-is-selected` + `aria-pressed` |
| `menu` | `{ expanded: boolean; indicator?: boolean }` | — | menu-trigger ARIA; `indicator` adds the small ▾ (`slds-button_icon-more`) |
| `feedback` | `"error" \| "warning"` | — | `slds-button_icon-error` (record "We hit a snag" trigger) |
| `className` | `string` | — | SLDS classes only (`slds-input__icon`, `slds-modal__close`, …) |
| `iconClassName` | `string` | — | extra SLDS classes on the glyph (blueprint `iconClassName`: `slds-button__icon_hint`, `slds-global-header__icon`) |

## Note
- The pressed state is olive (block B, **derived** — not captured in Figma).
