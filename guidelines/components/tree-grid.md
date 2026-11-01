# TreeGrid

SLDS blueprint: **Tree Grid** — `table.slds-table.slds-table_bordered.slds-table_edit.slds-table_fixed-layout.slds-tree.slds-table_tree[role=treegrid]`, rows `aria-level / aria-posinset / aria-setsize / aria-expanded`, `th.slds-tree__item` with the chevron button.
File: `src/app/components/data/TreeGrid.tsx`.

## Props — `TreeGridProps`
`label`, `columns: { key; label; link? }[]` (first = tree column), `rows: { id; cells: Record<string,string>; badge?: ReactNode; children? }[]`, `expandedIds`, `onToggle(id, expanded)`, `onLinkClick?`, `capsHeader?` (Figma Account Hierarchy caps header), `rowActions?`, `onRowAction?`.
