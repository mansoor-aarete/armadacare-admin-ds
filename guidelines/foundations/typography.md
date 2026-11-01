# Typography

## Font
SLDS default system stack — **no web font is loaded**:
`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif` (on `html`; `--slds-g-font-family-base` adds `system-ui` first).
The Figma captures were taken on Windows, where this stack renders **Segoe UI** — exactly what Figma shows. On macOS it renders San Francisco (expected, see `docs/known-differences.md`).
Never add Salesforce Sans (licence restricted to Salesforce-platform apps), Montserrat, Arial-only stacks or Google Fonts.

## Scale (SLDS classes → Figma usage)
Body text is `0.8125rem` (13 px at 100 % root size) — set by SLDS on `body`.

| SLDS class | Size / weight | Figma usage |
|---|---|---|
| `slds-text-heading_large` | 1.75rem regular | metric tile value (28 px) |
| `slds-text-heading_medium` | 1.25rem regular | modal title, Reports page title, list picker "All" (20 px) |
| `slds-page-header__title` | 1.125rem bold | record / list-view name (18 px bold) |
| `slds-text-heading_small` | 1rem regular | record tabs, sidebar tabs (16 px) |
| `slds-text-title_bold` | 0.875rem bold | card titles (14 px bold) |
| body (no class) / `slds-text-body_regular` | 0.8125rem | body, table cells, buttons (13 px) |
| `slds-text-body_small` | 0.75rem | meta lines, menu items (12 px) |
| `slds-text-title` | 0.75rem, `#444` | field labels (12 px) |
| `slds-text-title_caps` | 0.75rem caps, 0.0625rem tracking | Reports nav section titles, tree-grid headers |
| `slds-text-color_weak` | `#444` | secondary text |
| `slds-text-color_error` | `#ba0517` | inline errors |

Field values on record pages are 14 px (`0.875rem`) — applied by the SLDS form-element blueprint (`slds-form-element__static`), not by a utility class.

## Do / Don't
- **Do** use SLDS text classes or the blueprint's own classes.
- **Don't** set `font-size`, `font-family`, `font-weight` or `line-height` inline.
