# Spinner

SLDS blueprint: **Spinners** — (`div.slds-spinner_container` ›) `div.slds-spinner.slds-spinner_{size}(.slds-spinner_brand|_inverse)[role=status]` › `span.slds-assistive-text` + `div.slds-spinner__dot-a` + `div.slds-spinner__dot-b`.
File: `src/app/components/feedback/Spinner.tsx`.

## Props — `SpinnerProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `size` | `"xx-small" \| "x-small" \| "small" \| "medium" \| "large"` | `"medium"` | |
| `variant` | `"base" \| "brand" \| "inverse"` | `"base"` | `brand` dots are olive (block B, **derived**) |
| `layout` | `"overlay" \| "inline"` | `"overlay"` | overlay covers its nearest positioned parent |
| `assistiveText` | `string` | "Loading" | |

Not in the Figma captures — rendered from the blueprint only.
