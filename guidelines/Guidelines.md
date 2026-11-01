# Guidelines — ArmadaCare Admin Portal design system (SLDS 1)

> Figma Make reads this folder as AI instructions. Every line is a rule.

## What this is
A React + TypeScript design system that reproduces **Salesforce Lightning Design System 1** (`@salesforce-ux/design-system` **2.264.3**, pinned) with the ArmadaCare olive brand. It mirrors a Salesforce Lightning **console** app. Design system only — no pages.

## Hard rules
1. **SLDS 1 blueprints only.** Same elements, classes and ARIA attributes as the SLDS 1 blueprint for 2.264.3. Never SLDS 2 / Cosmos.
2. **Only `slds-*` classes that exist in the installed CSS.** Exception: classes from official blueprint markup that have no CSS, listed in `scripts/slds-markup-only.json`. Never invent a class. Never build class names with string templates.
3. **No Tailwind.** No Tailwind classes, no `@import 'tailwindcss'`, no Preflight. See `setup.md`.
4. **No other UI kits.** No shadcn, Radix, MUI, Chakra, Bootstrap, etc.
5. **No hex, `rgb()`, `hsl()` or `px` in components.** Colours and sizes come from SLDS classes or verified styling hooks. Brand values live **only** in `src/styles/slds-theme.css` (see `foundations/color.md`).
6. **Client-side React only.** No backend, no environment variables, no Node APIs, no custom Vite plugins, no changes to `vite.config.ts`.
7. **Relative imports** (no `@/` alias), strict TypeScript, **no `any`**, **one component per file**, export an `XxxProps` type from each component, use **union string types** for variants.
8. **Generic components.** Nothing Salesforce-object-specific (Account, Claim, …) inside the design system. Content comes in through props / config arrays.
9. **Reuse before create.** Extend an existing component with a prop. Never duplicate one.
10. **Every icon-only control has `assistiveText`.**

## Before you finish any change
- `npm run verify` — fails on unknown `slds-*` classes, Tailwind, hex / rgb / px in components, unverified hooks.
- `npm run typecheck` — must be 0 errors.
- Check `/showcase` — every component in every variant and state; the **Environment checks** panel must be all PASS.

## File index
| File | Contents |
|---|---|
| `setup.md` | Project setup, how CSS loads, Tailwind/Preflight handling in Figma Make, scripts |
| `foundations/color.md` | Brand tokens, hook overrides (block A), selector overrides (block B — every selector) |
| `foundations/typography.md` | Font stack and SLDS type classes mapped to Figma sizes |
| `foundations/spacing.md` | SLDS spacing scale and utility classes |
| `foundations/icons.md` | Icon registry, sizes, tones, licence, how to add an icon |
| `components/overview-components.md` | Registry of every component: props, status |
| `components/icon.md` | Icon |
| `components/button.md`, `button-stateful.md`, `button-icon.md`, `button-group.md`, `button-menu.md` | Buttons and menus |
| `components/form-element.md`, `input.md`, `textarea.md`, `checkbox.md`, `checkbox-group.md`, `select.md`, `combobox.md`, `datepicker.md`, `dual-listbox.md` | Form controls |
| `components/avatar.md`, `badge.md`, `spinner.md` | Feedback |
| `components/help-text.md`, `tooltip.md`, `popover.md` | Overlays |
| `components/global-header.md`, `app-nav.md`, `workspace-tabs.md`, `split-view.md`, `utility-bar.md`, `console-shell.md` | Console shell (Phase 3) |
| `components/page-header.md`, `highlights-panel.md`, `list-view-toolbar.md`, `tabs.md`, `expandable-section.md`, `record-field.md` | Page and record layout (Phase 3) |
| `components/data-table.md`, `tree-grid.md` | Data (Phase 3) |
| `components/card.md`, `related-list-card.md`, `related-list-quick-links.md`, `metric-tile.md`, `empty-state.md` | Cards and states (Phase 3) |
| `components/modal.md`, `form-footer.md`, `vertical-nav.md` | Dialogs, footer, navigation (Phase 3) |
| `components/toggle.md`, `radio-group.md`, `file-selector.md`, `pill.md`, `rich-text-editor.md`, `docked-composer.md`, `pagination.md`, `einstein-card.md` | Phase 4 additions |

## Source layout
```
src/main.tsx                       entry — imports SLDS CSS, then styles/index.css, then App
src/styles/index.css               imports slds-theme.css (nothing else)
src/styles/slds-theme.css          the ONLY place with colour values
src/app/components/icons/          Icon, IconSvg, registry.ts (generated)
src/app/components/buttons/        Button, ButtonStateful, ButtonIcon, ButtonGroup, ButtonMenu, MenuDropdown
src/app/components/forms/          FormElement, Input, Textarea, Checkbox, CheckboxGroup, Select, Combobox (+ listbox, object switcher), Datepicker (+ calendar), DualListbox, FormFooter, Toggle, RadioGroup, FileSelector, RichTextEditor
src/app/components/feedback/       Avatar, Badge, Spinner, EmptyState, DesertIllustration, Pill, PillContainer
src/app/components/overlays/       HelpText, Tooltip, Popover, Modal, ErrorPopover, DockedComposer
src/app/components/shell/          GlobalHeader, AppNav, WorkspaceTabs, WorkspaceSubTabs, SplitView, UtilityBar, ConsoleShell
src/app/components/layout/         PageHeader, HighlightsPanel, ListViewToolbar, Tabs, ExpandableSection
src/app/components/record/         RecordField, RecordFieldGrid
src/app/components/data/           DataTable, TreeGrid, Pagination
src/app/components/cards/          Card, RelatedListCard, RelatedListQuickLinks, MetricTile, EinsteinCard
src/app/components/navigation/     Breadcrumb, VerticalNav
src/app/components/utils/          cx, useDismiss, formIds, dates
src/app/showcase/                  /showcase route
scripts/                           build-icons.mjs, verify-slds.mjs, slds-markup-only.json (dev only)
docs/                              audit, inventory, compat report, known differences
```
