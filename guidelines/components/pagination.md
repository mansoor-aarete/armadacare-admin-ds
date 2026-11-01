# Pagination

No SLDS 1 blueprint (gap G6). `nav` built from SLDS grid utilities: records-per-page picklist (Combobox, `slds-size_xx-small`) on the left; neutral **Previous** (disabled on page 1) · "Page x of y" (`aria-live`) · **Next** (disabled on the last page) on the right.
File: `src/app/components/data/Pagination.tsx`.

## Props — `PaginationProps`
`page` (1-based), `pageCount`, `onPageChange(page)`, `pageSize?` + `pageSizeOptions?` (default 10 / 25 / 50) + `onPageSizeChange?` (omit `pageSize` to hide the picklist), `label?` (accessible name).
