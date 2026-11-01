# Colour

All colour values live in **`src/styles/slds-theme.css`** — nowhere else. Components get colour only from SLDS classes and SLDS styling hooks. `npm run verify` fails on any hex / `rgb()` outside the theme's `@brand-tokens` block.

## Brand tokens (defined once, top of the theme file)
| Token | Value | Source | Used for |
|---|---|---|---|
| `--ac-color-brand` | `#57612d` | Figma (Save/Delete buttons, links, menu items, radio/checkbox marks) | brand surfaces at rest |
| `--ac-color-brand-dark` | `#373e1d` | **Derived** — `#57612d` with SLDS's hover step (`#0176d3 → #014486`, HSL lightness × 0.637) | hover / active / focus states of brand surfaces |
| `--ac-color-brand-base` | `#8b9a4c` | Figma (console tab top bar, tab underline) | active indicators |
| `--ac-color-brand-base-tint` | `rgba(139, 154, 76, 0.1)` | Figma (active console tab / nav item background) | active backgrounds |
| `--ac-color-page-background` | `var(--slds-g-color-neutral-base-100)` (white) | Figma | page background |
| `--ac-color-icon-user` | `#34becd` | Figma (lookup / object-switcher user icon; SLDS 2.264.3 `standard:user` is `#107cad`) | `.slds-icon-standard-user` background — see `docs/known-differences.md` KD3 |
| `--ac-color-environment-chip` | `#e0e5f8` | Figma (sandbox chip "Sandbox (CXDev)") | GlobalHeader environment badge (Block C) | Figma (lookup / object-switcher user icon; SLDS 2.264.3 `standard:user` is `#107cad`) | `.slds-icon-standard-user` background — see `docs/known-differences.md` KD3 |

Contrast on white: `#57612d` 6.66:1 (AA text), `#373e1d` 11.37:1, `#8b9a4c` 3.08:1 (non-text indicators only — never text).
Not used: the Broker Portal palette (`#8F993E` etc.) is a different product.

## SLDS defaults kept unchanged (they already match Figma)
Text `--slds-g-color-neutral-base-10` (#181818) · secondary text `--slds-g-color-neutral-base-30` (#444) · control borders `--slds-g-color-border-base-4` (#747474) · borders `--slds-g-color-border-base-1` (#c9c9c9) · shaded surfaces `--slds-g-color-neutral-base-95` (#f3f3f3) · error `--slds-g-color-error-base-40` (#ba0517) · error popover header `--slds-g-color-error-base-30` (#8e030f) · **focus rings stay SLDS blue** (Figma shows them blue).

## Block A — styling-hook overrides
Each hook is verified: `npm run verify` checks that the SLDS CSS reads it.

| Hook | Value |
|---|---|
| `--slds-g-link-color` | brand |
| `--slds-g-link-color-hover`, `--slds-g-link-color-focus` | brand-dark |
| `--slds-c-button-brand-color-background`, `--slds-c-button-brand-color-border` | brand |
| `--slds-c-button-brand-color-background-hover` / `-active`, `--slds-c-button-brand-color-border-hover` / `-active` | brand-dark |
| `--slds-c-button-text-color` | brand |
| `--slds-c-button-text-color-hover` / `-active` | brand-dark |
| `--slds-c-checkbox-mark-color-foreground` | brand |
| `--slds-c-checkbox-toggle-color-background-checked`, `--slds-c-checkbox-toggle-color-border-checked` | brand |
| `--slds-c-checkbox-toggle-color-background-checked-hover` / `-focus` | brand-dark |
| `--slds-c-radio-mark-color-foreground` | brand |
| `--slds-c-tabs-item-color-border-active` | brand-base |
| `--slds-c-tabs-item-color-border-hover` | brand |
| `--slds-c-card-heading-font-size` | `--slds-g-font-scale-1` (0.875rem) — not a colour: Figma card / related-list titles are 14 px |
| `--slds-c-dropdown-item-color` | brand (Figma A9 menu text `#57612d`) |
| `--slds-c-dropdown-item-color-hover` / `-focus` / `-active` | `--slds-g-color-neutral-base-10` |

Note: brand button, checkbox, toggle, radio, tab and dropdown hooks exist only as `--slds-c-*` (component) hooks in SLDS 1; there is no `--slds-g-*` equivalent. The `--slds-g-color-brand-base-*` palette is **not** overridden — SLDS uses it for focus/drag states, which stay blue.

## Block B — hard-coded Salesforce-blue rules re-coloured (every selector)
Selectors are copied verbatim from the SLDS 2.264.3 CSS; only the colour changes.

| Area | Selector | Property → value |
|---|---|---|
| Page background | `html` | `background` → page-background |
| Links | `a` | `color` → brand |
| | `a:hover`, `a:focus` | `color` → brand-dark |
| | `a:active` | `color` → brand-dark |
| | `.slds-text-link` | `color` → brand |
| | `.slds-text-link:hover`, `.slds-text-link:focus` | `color` → brand-dark |
| | `.slds-text-link:active` | `color` → brand-dark |
| | `.slds-dropdown_actions a` | `color` → brand (SLDS hard-codes `#0b5cab` on action-overflow menu items; hover/focus/active keep the block A dropdown hooks) |
| Console tabs | `.slds-context-bar` | `border-bottom-color` → `--slds-g-color-border-base-1` (grey in Figma, not blue) |
| | `.slds-context-bar__item:not(.slds-no-hover):hover`, `.slds-context-bar__item.slds-is-active` | `background-color` → brand-base-tint |
| | `.slds-context-bar__item.slds-is-active:before` | `background` → brand-base |
| | `.slds-context-bar__item.slds-is-active:hover` | `border-bottom-color` → brand-base-tint |
| | `@keyframes bkAnim` (entry animation of the active item, fill-mode both) | 100 % `background-color` → brand-base-tint (SLDS ends on the blue tint) |
| Sub-tabs | `.slds-sub-tabs__item.slds-active`, `.slds-sub-tabs__item.slds-is-open` | `background` → brand-base-tint |
| | `.slds-has-pinned-regions .slds-sub-tabs__item.slds-active:before`, `.slds-has-pinned-regions .slds-sub-tabs__item.slds-is-open:before` | `background` → brand-base |
| Split view selection | `.slds-split-view__list-item-action[aria-selected=true]` | `box-shadow` inset bar → brand-base |
| | `.slds-split-view__list-item-action[aria-selected=true]:focus` | inset bar → brand-base (focus ring keeps `--slds-g-color-brand-base-50`) |
| | `.slds-split-view__list-item-action[aria-current=page]` | inset bar → brand-base |
| | `.slds-split-view__list-item-action[aria-current=page]:focus` | inset bar → brand-base (focus rings keep SLDS hooks) |
| Brand icon button | `.slds-button_icon-brand` | `background-color`, `border-color` → brand |
| | `.slds-button_icon-brand:hover`, `.slds-button_icon-brand:focus` | → brand-dark |
| | `.slds-button_icon-brand:active` | → brand-dark |
| Datepicker selection | `.slds-datepicker tbody > tr > td.slds-is-selected > .slds-day` | `background` → brand |
| | `.slds-datepicker tbody > tr > td.slds-is-selected:focus > .slds-day` | `background` → brand-dark |
| | `.slds-datepicker .slds-has-multi-row-selection .slds-is-selected-multi:first-child > .slds-day:before`, `… :last-child > .slds-day:after` | `background` → brand |
| | `.slds-datepicker td.slds-is-selected-multi + .slds-is-selected-multi > .slds-day:before` | `background` → brand |
| Vertical navigation (Reports) | `.slds-nav-vertical__item:hover:before`, `.slds-nav-vertical__item.slds-is-active:before` | `background` → brand-base-tint |
| | `.slds-nav-vertical__action`, `:hover`, `[dir=rtl] …:hover`, `:focus:hover`, `.slds-is-active …` (+ `:focus`, rtl) | `box-shadow: none` — no left bar (Figma, KD5); focus keeps the SLDS focus shadow / blue-40 outline |
| | `.slds-nav-vertical__item [type=radio]:checked + .slds-nav-vertical__action` | `background-color` → brand-base-tint, no bar |
| Utility bar — **DERIVED** (active state not in Figma; same treatment as console tabs) | `.slds-utility-bar__action:hover`, `.slds-utility-bar__action:focus` | `background` → brand-base-tint |
| | `.slds-utility-bar__action.slds-is-active` | `background` → brand-base-tint |
| | `.slds-utility-bar__action.slds-is-active:after` | `background` → brand-base |
| User object icon | `.slds-icon-standard-user` | `background-color` → icon-user |
| Docked composer | `.slds-docked-composer__header` | `border-bottom-color` → brand-base (Figma C5) |
| Pressed icon buttons — **DERIVED** | `.slds-button_icon-border.slds-is-selected`, `.slds-button_icon-container.slds-is-selected`, `.slds-button_icon-border-filled.slds-is-selected`, `.slds-button_icon-border-inverse.slds-is-selected` | `background-color`, `border-color` → brand |
| | same selectors `:focus`, `:hover` | → brand-dark |
| Brand spinner — **DERIVED** | `.slds-spinner_brand .slds-spinner__dot-a:after` / `:before`, `.slds-spinner_brand .slds-spinner__dot-b:after` / `:before`, `.slds-spinner_brand.slds-spinner:after` / `:before` | `background-color` → brand |
| Listbox selection | `.slds-listbox__icon-selected` | `fill` → brand |
| | `.slds-listbox__option.slds-is-selected .slds-listbox__option-icon` | `color` → brand |
| | `.slds-dueling-list__options [aria-selected=true]`, `.slds-picklist__options [aria-selected=true]` | `background-color` → brand |
| | `.slds-dueling-list__options [aria-selected=true]:hover`, `…:focus`, `.slds-picklist__options [aria-selected=true]:hover`, `…:focus` | `background` → brand-dark |

### Hard-coded blue rules deliberately NOT overridden
- File selector drag-over glow (`.slds-file-selector__dropzone.slds-has-drag-over`) — focus-like state, kept SLDS blue.
- Sortable column header icon on hover / focus (`.slds-is-sortable .slds-th__action:hover .slds-is-sortable__icon` fill `#0176d3`) — hover state, not in Figma.
- Unread indicators (`.slds-indicator_unread`, split view / utility bar) — read `--slds-g-color-brand-base-50`, which stays SLDS blue by design (brand-base palette not overridden).
- Context bar notification state (`.slds-context-bar__item.slds-has-notification`) — not seen in Figma.
- Focus glows (`box-shadow: 0 0 3px #0176d3`) — focus stays SLDS blue by design.

## Block C — approved Figma-matching overrides (not blue re-colours)
| Area | Selector | Change |
|---|---|---|
| Global header logo | `.slds-global-header__logo` | `background-image: none` (logo is an optional slot) |
| Sandbox chip | `.slds-global-header_container .slds-badge` | `background-color` → environment-chip, transparent border, 0.25rem radius, regular weight |
| Sandbox row panel toggle | `.slds-global-header_container > .slds-border_bottom .slds-button_icon-container` | `color` → `--slds-g-color-palette-blue-40` (Figma #0b5cab — Salesforce header chrome, not the org brand) |
| Sandbox row round ▼ | `.slds-global-header_container > .slds-border_bottom .slds-button_icon-border` | `border-radius: 50%` |
| Einstein header (Next Best Action) | `.slds-einstein-header` (overflow hidden), `.slds-einstein-header.slds-card__header` (padding-left 0.75rem), `.slds-einstein-header .slds-einstein-header__figure` (height 9.25rem, margin-top −4.5rem) | Figma A4 figure size and position |
| List-view ▼ (object home actions only; record headers stay grey, as in Figma) | `.slds-page-header_object-home .slds-page-header__col-actions .slds-button_icon-border-filled` | `color` → brand |
| Selected metric tile | `.slds-button_reset.slds-box[aria-pressed="true"]` | 2 px `--slds-g-color-border-base-4` border |
| Quick links | `.slds-card__body_inner > .slds-grid > .slds-size_1-of-7 > a`, `.slds-card__body_inner > .slds-text-align_center > a` | `text-decoration: underline` |
| Record detail density (ds-v1.4) | `.slds-form-element_readonly .slds-form-element__control` (padding 0, line-height 1), `… .slds-form-element__static` (0.8125rem, line-height 1.5, min-height 0), `.slds-form-element_readonly.slds-form-element_horizontal .slds-form-element__label` (padding-top 0.125rem, line-height 1.25) | Lightning record rows: 26 px empty / 28.5 px with a value / 41 px two-line label (Figma A4 / A9) instead of 34 px |
| Split-view toggle column (ds-v1.4) | `.slds-split-view__toggle-button` (width 1.5rem, right −1.5rem); ConsoleShell adds `slds-m-left_large` to the workspace when a split view is shown | Lightning's 24 px toggle column (Figma: list ends x 378, workspace x 402) instead of a 12 px strip over the workspace |
| Data table density (ds-v1.5) | `.slds-table .slds-th__action` (height 1.796875rem), `.slds-table td .slds-dropdown-trigger, .slds-table td .slds-checkbox` (vertical-align top; trigger inline-flex), `.slds-table tbody tr` (height 1.859375rem) | Lightning datatable: 28.75 px header, 29.75 px rows (Figma A1) instead of 32 / 30.75 px |
| Inline record form / picker panel (ds-v1.5) | `.slds-template__container > .slds-modal__container` (45.875rem, padding-top 0.125rem), `.slds-template__container.slds-modal_medium > .slds-modal__container` (62.5rem), `.slds-template__container.slds-modal_medium .slds-modal__header` (left-aligned, 0.9375rem inset) | Figma A5/A6 panel 734 px, A7 picker 1,000 px with a left-aligned title |
| Console workspace tabs (ds-v1.5) | `.slds-context-bar__item_tab` (width 13.75rem) | Figma 220 px tabs show full labels (SLDS 12rem) |
| Small modal (ds-v1.6) | `.slds-modal_small .slds-modal__container` (min-width 48em) | max-width 59.125rem — Figma C4 Log an Activity 946 px |
| Docked composer in the utility bar (ds-v1.6) | `.slds-utility-bar_container > .slds-docked_container` | bottom 2.5rem — docked above the utility bar (Figma C5) |
| Console object item | `.slds-context-bar__object-switcher` (width 11.5625rem), `.slds-is-active` (no item tint / animation / `:before` bar), `> .slds-context-bar__label-action` (12 px padding; active: tint + 3 px inset top bar), `> .slds-context-bar__icon-action` (own cell: left border, no negative margin) | ▼ in its own cell (Figma A1) |

## Do / Don't
- **Do** use SLDS classes (`slds-button_brand`, `slds-text-color_weak`, …) and hooks.
- **Do** add new brand values only to the `@brand-tokens` block, then reference them.
- **Don't** write a hex, `rgb()` or named colour anywhere else; **don't** use `style={{ color: … }}` with literal colours.
- **Don't** override `--slds-g-color-brand-base-*` or focus-shadow hooks.
