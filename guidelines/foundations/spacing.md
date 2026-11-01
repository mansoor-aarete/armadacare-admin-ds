# Spacing

Use SLDS spacing utilities only — never inline `margin`, `padding`, `gap`, or `px` values.

| Size | rem | px @16 | Padding | Margin |
|---|---|---|---|---|
| xxx-small | 0.125 | 2 | `slds-p-around_xxx-small` | `slds-m-around_xxx-small` |
| xx-small | 0.25 | 4 | `slds-p-around_xx-small` | `slds-m-around_xx-small` |
| x-small | 0.5 | 8 | `slds-p-around_x-small` | `slds-m-around_x-small` |
| small | 0.75 | 12 | `slds-p-around_small` | `slds-m-around_small` |
| medium | 1 | 16 | `slds-p-around_medium` | `slds-m-around_medium` |
| large | 1.5 | 24 | `slds-p-around_large` | `slds-m-around_large` |
| x-large | 2 | 32 | `slds-p-around_x-large` | `slds-m-around_x-large` |
| xx-large | 3 | 48 | `slds-p-around_xx-large` | `slds-m-around_xx-large` |

Directions: `_around`, `_horizontal`, `_vertical`, `_top`, `_right`, `_bottom`, `_left` (e.g. `slds-m-bottom_small`, `slds-p-horizontal_medium`). `none` exists for every direction.

Layout: `slds-grid`, `slds-col`, `slds-wrap`, `slds-grid_vertical-align-center`, `slds-grid_align-spread`, `slds-size_1-of-2` …

Figma rhythm observed: cards and page headers 12 px horizontal / 8 px vertical padding (SLDS card & page-header blueprints already apply this); record fields 30–34 px rows; buttons 32 px high; icon buttons 32 / 24 / 20 px.
