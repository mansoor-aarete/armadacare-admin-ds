# DataTable

SLDS blueprint: **Data Tables** — advanced (`table.slds-table.slds-table_bordered.slds-table_fixed-layout.slds-table_resizable-cols[role=grid]`, select-all `th › .slds-th__action_form`, sortable `a.slds-th__action.slds-text-link_reset[role=button]` + `slds-is-sortable__icon`, header ▾ `slds-th__action-button`, resize handle, row `tr.slds-hint-parent(.slds-is-selected)`, row actions) and base (`slds-table_cell-buffer slds-table_bordered`).
File: `src/app/components/data/DataTable.tsx` — generic over `Row extends { id: string }`.

## Props — `DataTableProps<Row>`
| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | accessible name |
| `columns` | `DataTableColumn<Row>[]` | `{ key; label; value(row); link?(row); render?(row); align?; sortable?; wrap?; width? }` |
| `rows` | `Row[]` | |
| `variant` | `"advanced" \| "base"` | default advanced |
| `firstColumnIsRowHeader` | `boolean` | default true |
| `rowNumberColumn?` | `"hidden" \| "numbers"` | ds-v1.4 — Lightning row-number column (3.25rem) before the checkboxes; `hidden` = column without numbers (Figma A1), `numbers` = SLDS `slds-row-number` counter. With it the selection column is 2rem |
| `selection?` | `{ selectedIds; onChange }` | checkboxes + indeterminate select-all |
| `sort?`, `onSort?` | `{ key; direction }`, `(key) => void` | one arrow glyph; SLDS rotates it for ascending |
| `columnMenus?`, `onColumnMenu?` | | header ▾ buttons |
| `resizable` | `boolean` | default true (visual handles) |
| `rowActions?`, `onRowAction?` | `MenuItem[]` | x-small ▾ menu per row |
| `onLinkClick?` | `(row, columnKey)` | |

Column header labels are always rendered (they are blank only in the Figma capture).

ds-v1.9: `variant="compact"` — the base table as the search results' Lightning datatable draws it: `slds-table_fixed-layout` (equal columns), no `slds-table_cell-buffer`, body rows `slds-line-height_reset` (≈23 px, Figma P4 / P5). `wrap` columns still wrap.

v1.0: the `compact` variant shows wrapped columns in full (no 3-line clamp, as Lightning datatable wraps), has a 2rem header row and 26 px rows (Block C). The base variant's rows are 26 px too (line-height 1.3, Figma Claims accumulators).
