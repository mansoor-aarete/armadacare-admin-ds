# Component registry

Status: **done** (built, in `/showcase`, verified) · **planned** (phase in brackets).

## Foundations (Phase 1)
| Component | File | Props | Status |
|---|---|---|---|
| Icon | `src/app/components/icons/Icon.tsx` | `name: IconName`, `size?: "xx-small" \| "x-small" \| "small" \| "medium" \| "large"`, `tone?: "default" \| "light" \| "warning" \| "error" \| "success" \| "current"` (utility only), `assistiveText?: string`, `className?: string` (SLDS utilities) | **done** — see `icon.md` |
| IconSvg | `src/app/components/icons/IconSvg.tsx` | `name: IconName`, `className: string` (blueprint svg class) | **done** — internal building block for blueprints that own their wrapper |

## Primitives (Phase 2)
All are in `/showcase`; typecheck, `verify-slds` and the Playwright checks pass. "Figma diff" means the element was rebuilt in the showcase *Figma comparison set* and pixel-diffed against the Figma node (`tools/visual/compare-components.mjs`).

| Component | File | Doc | Figma diff | Status |
|---|---|---|---|---|
| Button | `buttons/Button.tsx` | `button.md` | footer actions, list-view buttons, related-list actions | **done** |
| ButtonStateful | `buttons/ButtonStateful.tsx` | `button-stateful.md` | Follow | **done** |
| ButtonIcon | `buttons/ButtonIcon.tsx` | `button-icon.md` | pin, list-view toolbar | **done** |
| ButtonGroup | `buttons/ButtonGroup.tsx` | `button-group.md` | list-view buttons, related-list actions | **done** |
| ButtonMenu · MenuDropdown | `buttons/ButtonMenu.tsx`, `buttons/MenuDropdown.tsx` | `button-menu.md` | action overflow menu, toolbar gear / table triggers | **done** |
| FormElement | `forms/FormElement.tsx` | `form-element.md` | (via Input / Combobox) | **done** |
| Input | `forms/Input.tsx` | `input.md` | required + error field | **done** |
| Textarea | `forms/Textarea.tsx` | `textarea.md` | — (no isolated Figma node) | **done** |
| Checkbox | `forms/Checkbox.tsx` | `checkbox.md` | — (visual check only) | **done** |
| CheckboxGroup | `forms/CheckboxGroup.tsx` | `checkbox-group.md` | — (visual check only) | **done** |
| Select | `forms/Select.tsx` | `select.md` | — (not in Figma; used by the datepicker) | **done** |
| Combobox · ComboboxListbox · ComboboxObjectSwitcher | `forms/Combobox.tsx`, `forms/ComboboxListbox.tsx`, `forms/ComboboxObjectSwitcher.tsx` | `combobox.md` | picklist, lookup with object switcher, selected lookup | **done** |
| Datepicker · DatepickerCalendar | `forms/Datepicker.tsx`, `forms/DatepickerCalendar.tsx` | `datepicker.md` | — (Figma node can't be captured) | **done** |
| DualListbox | `forms/DualListbox.tsx` | `dual-listbox.md` | Participant Summary | **done** |
| Avatar | `feedback/Avatar.tsx` | `avatar.md` | — | **done** |
| Badge | `feedback/Badge.tsx` | `badge.md` | "current" badge | **done** |
| Spinner | `feedback/Spinner.tsx` | `spinner.md` | — (not in Figma) | **done** |
| HelpText | `overlays/HelpText.tsx` | `help-text.md` | info glyph (icon diff) | **done** |
| Tooltip | `overlays/Tooltip.tsx` | `tooltip.md` | — (not in Figma) | **done** |
| Popover | `overlays/Popover.tsx` | `popover.md` | "We hit a snag." error popover | **done** |

Shared utilities (not components): `utils/cx.ts`, `utils/useDismiss.ts` (outside click + Escape), `utils/formIds.ts`, `utils/dates.ts`.

## Patterns (Phase 3)
All in `/showcase` (sections Console shell · Page headers … · Data table · Cards … · Modal …); "Figma diff" = rebuilt in *Figma comparison set — patterns* and pixel-diffed.

| Component | File | Doc | Figma diff | Status |
|---|---|---|---|---|
| GlobalHeader | `shell/GlobalHeader.tsx` | `global-header.md` | A1 header row | **done** |
| AppNav | `shell/AppNav.tsx` | `app-nav.md` | A1 context bar | **done** |
| WorkspaceTabs · WorkspaceSubTabs | `shell/WorkspaceTabs.tsx`, `shell/WorkspaceSubTabs.tsx` | `workspace-tabs.md` | — (visual check: PY1, A8) | **done** |
| SplitView | `shell/SplitView.tsx` | `split-view.md` | PY1 split view | **done** |
| UtilityBar | `shell/UtilityBar.tsx` | `utility-bar.md` | A1 utility bar | **done** |
| ConsoleShell | `shell/ConsoleShell.tsx` | `console-shell.md` | — (layout) | **done** |
| PageHeader · Breadcrumb | `layout/PageHeader.tsx`, `navigation/Breadcrumb.tsx` | `page-header.md` | A1 object home | **done** |
| HighlightsPanel | `layout/HighlightsPanel.tsx` | `highlights-panel.md` | PY1 record header | **done** |
| ListViewToolbar | `layout/ListViewToolbar.tsx` | `list-view-toolbar.md` | A1 (in object home) | **done** |
| DataTable | `data/DataTable.tsx` | `data-table.md` | E1 related table | **done** |
| TreeGrid | `data/TreeGrid.tsx` | `tree-grid.md` | A8 account hierarchy | **done** |
| Tabs | `layout/Tabs.tsx` | `tabs.md` | E2 record tabs | **done** |
| ExpandableSection | `layout/ExpandableSection.tsx` | `expandable-section.md` | — (visual check: C1) | **done** |
| RecordField · RecordFieldGrid | `record/RecordField.tsx`, `record/RecordFieldGrid.tsx` | `record-field.md` | E2 details grid | **done** |
| Card | `cards/Card.tsx` | `card.md` | (via related lists) | **done** |
| RelatedListCard | `cards/RelatedListCard.tsx` | `related-list-card.md` | E1 / E2 related lists | **done** |
| RelatedListQuickLinks | `cards/RelatedListQuickLinks.tsx` | `related-list-quick-links.md` | — (Figma frame scaled; visual check C1) | **done** |
| MetricTile | `cards/MetricTile.tsx` | `metric-tile.md` | D1 KPI tiles | **done** |
| EmptyState (+ DesertIllustration) | `feedback/EmptyState.tsx`, `feedback/DesertIllustration.tsx` | `empty-state.md` | — (visual check D1) | **done** |
| Modal | `overlays/Modal.tsx` | `modal.md` | — (visual check CL5 / CL6 / C3) | **done** |
| FormFooter · ErrorPopover | `forms/FormFooter.tsx`, `overlays/ErrorPopover.tsx` | `form-footer.md` | error popover (Phase 2 diff) | **done** |
| VerticalNav | `navigation/VerticalNav.tsx` | `vertical-nav.md` | R1 Reports nav | **done** |

### Not built (seen in Figma, outside the Phase 3 list — decision needed)
Toggle (CL3), Radio group with descriptions (A7), File selector (CL3), Docked composer + rich-text editor (C5), Pagination (P5), Pills, Einstein header card (A2/A4/A9).
