# Icon

SLDS blueprint: **Icons** — `span.slds-icon_container.slds-icon-{sprite}-{name}` › `svg.slds-icon[aria-hidden=true]` + `span.slds-assistive-text`.

## When to use
- Object icons (standard / custom) in headers, related lists, quick links, tabs, lookups.
- Stand-alone utility icons (info glyphs, status marks, read-only checkbox ✓).
- Not for icons inside buttons or inputs — those blueprints render `IconSvg` with their own class.

## Props — `IconProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | `IconName` (`"utility:…" \| "standard:…" \| "custom:…"`) | — | only registry icons |
| `size` | `"xx-small" \| "x-small" \| "small" \| "medium" \| "large"` | `"medium"` | 0.875 / 1 / 1.5 / 2 / 3 rem |
| `tone` | `"default" \| "light" \| "warning" \| "error" \| "success" \| "current" \| "inverse"` | `"default"` | utility icons only (type error on object icons); `inverse` = no tone class (white on coloured surfaces) |
| `assistiveText` | `string` | — | sets `title` + `.slds-assistive-text`; omit only when decorative |
| `className` | `string` | — | extra SLDS utility classes on the container |
| `svgClassName` | `string` | — | extra SLDS classes on the `<svg>` (e.g. `slds-page-header__icon`, `slds-is-sortable__icon`) |

Object icons accept `tone="default"`: grey glyph without the coloured square (console tab / sub-tab icons — TabObjectIcon blueprint).

## Do
- `<Icon name="standard:note" size="small" assistiveText="Notes" />`
- Give every meaningful icon `assistiveText`.

## Don't
- Don't recolour object icons or set `style`.
- Don't use icons outside the registry — add them via `scripts/build-icons.mjs`.
