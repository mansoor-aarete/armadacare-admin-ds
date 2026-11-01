import type { ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { ButtonMenu } from "../buttons/ButtonMenu";
import type { MenuItem } from "../buttons/MenuDropdown";
import { Checkbox } from "../forms/Checkbox";
import { Icon } from "../icons/Icon";
import { cx } from "../utils/cx";

export type DataTableRow = { id: string };

export type SortDirection = "ascending" | "descending";

export type DataTableColumn<Row extends DataTableRow> = {
  key: string;
  label: string;
  /** Plain cell text (also the cell's title for truncation). */
  value: (row: Row) => string;
  /** Render the text as a link (olive). Return false for rows without a link. */
  link?: (row: Row) => boolean;
  /** Custom cell content (e.g. icon + link). Overrides `value`/`link` rendering; `value` stays the title. */
  render?: (row: Row) => ReactNode;
  align?: "left" | "right";
  sortable?: boolean;
  /** Wrap long text instead of truncating (Figma: Reports description). */
  wrap?: boolean;
  /** Column width in rem units, e.g. "12rem". */
  width?: string;
};

/**
 * "advanced" = Lightning data grid (role=grid, select column, sortable / resizable headers, header ▾ menus, row actions).
 * "base" = simple bordered table (Figma accumulator). "compact" = base table as the search results' Lightning datatable
 * draws it: equal fixed-width columns, no cell buffer, single-line-height rows (Figma P4 / P5; ds-v1.9).
 */
export type DataTableVariant = "advanced" | "base" | "compact";

export type DataTableProps<Row extends DataTableRow> = {
  /** Accessible name of the table. */
  label: string;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  variant?: DataTableVariant;
  /** First column is the row header (th scope=row). Default true. */
  firstColumnIsRowHeader?: boolean;
  onLinkClick?: (row: Row, columnKey: string) => void;
  /**
   * Row-number column before the selection column (Lightning `show-row-number-column`, advanced; ds-v1.4).
   * "hidden" keeps the 3.25rem column without numbers (Figma A1), "numbers" shows 1, 2, 3 … With it the selection
   * column narrows to 2rem, as in Lightning.
   */
  rowNumberColumn?: "hidden" | "numbers";
  /** Row selection checkboxes (advanced). */
  selection?: { selectedIds: string[]; onChange: (ids: string[]) => void };
  sort?: { key: string; direction: SortDirection };
  onSort?: (key: string) => void;
  /** Header ▾ column-action buttons (advanced). */
  columnMenus?: boolean;
  onColumnMenu?: (key: string) => void;
  /** Resize handles on headers (advanced, visual only). Default true. */
  resizable?: boolean;
  /** Row ▾ menu in the last column (advanced). */
  rowActions?: MenuItem[];
  onRowAction?: (row: Row, value: string) => void;
};

function CellContent<Row extends DataTableRow>({
  row,
  column,
  linkTabIndex,
  onLinkClick,
}: {
  row: Row;
  column: DataTableColumn<Row>;
  linkTabIndex?: number;
  onLinkClick?: (row: Row, columnKey: string) => void;
}) {
  const text = column.value(row);
  if (column.render) {
    return (
      <div className={column.wrap ? "slds-line-clamp" : "slds-truncate"} title={text}>
        {column.render(row)}
      </div>
    );
  }
  return (
    <div className={column.wrap ? "slds-line-clamp" : "slds-truncate"} title={text}>
      {column.link?.(row) ? (
        <a
          href="#"
          tabIndex={linkTabIndex}
          onClick={(e) => {
            e.preventDefault();
            onLinkClick?.(row, column.key);
          }}
        >
          {text}
        </a>
      ) : (
        text
      )}
    </div>
  );
}

/** SLDS Data Tables blueprint (advanced data grid and base table). */
export function DataTable<Row extends DataTableRow>({
  label,
  columns,
  rows,
  variant = "advanced",
  firstColumnIsRowHeader = true,
  onLinkClick,
  rowNumberColumn,
  selection,
  sort,
  onSort,
  columnMenus,
  onColumnMenu,
  resizable = true,
  rowActions,
  onRowAction,
}: DataTableProps<Row>) {
  const advanced = variant === "advanced";
  const selected = selection?.selectedIds ?? [];
  const allSelected = rows.length > 0 && selected.length === rows.length;

  if (!advanced) {
    const compact = variant === "compact";
    return (
      <table className={cx("slds-table", !compact && "slds-table_cell-buffer", "slds-table_bordered", compact && "slds-table_fixed-layout")} aria-label={label}>
        <thead>
          <tr className="slds-line-height_reset">
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cx(c.align === "right" && "slds-text-align_right")} style={c.width ? { width: c.width } : undefined}>
                <div className="slds-truncate" title={c.label}>
                  {c.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className={cx("slds-hint-parent", compact && "slds-line-height_reset")}>
              {columns.map((c, i) => {
                const content = <CellContent row={row} column={c} onLinkClick={onLinkClick} />;
                const cls = cx(c.align === "right" && "slds-text-align_right", c.wrap && "slds-cell-wrap") || undefined;
                return i === 0 && firstColumnIsRowHeader ? (
                  <th key={c.key} scope="row" data-label={c.label} className={cls}>
                    {content}
                  </th>
                ) : (
                  <td key={c.key} data-label={c.label} className={cls}>
                    {content}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <table
      className="slds-table slds-table_bordered slds-table_fixed-layout slds-table_resizable-cols"
      role="grid"
      aria-label={label}
      aria-multiselectable={selection ? "true" : undefined}
    >
      <thead>
        <tr className="slds-line-height_reset">
          {rowNumberColumn ? (
            <th scope="col" style={{ width: "3.25rem" }}>
              <span className="slds-assistive-text">Row Number</span>
            </th>
          ) : null}
          {selection ? (
            <th className="slds-text-align_right" scope="col" style={{ width: rowNumberColumn ? "2rem" : "3.25rem" }}>
              <span className="slds-assistive-text">Choose a row</span>
              <div className="slds-th__action slds-th__action_form">
                <Checkbox
                  wrapper="none"
                  label="Select All"
                  hideLabel
                  checked={allSelected}
                  indeterminate={selected.length > 0 && !allSelected}
                  onChange={(c) => selection.onChange(c ? rows.map((r) => r.id) : [])}
                />
              </div>
            </th>
          ) : null}
          {columns.map((c) => {
            const sorted = sort?.key === c.key ? sort.direction : undefined;
            const headerText = (
              <div className="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                <span className="slds-truncate" title={c.label}>
                  {c.label}
                </span>
                {c.sortable ? (
                  <Icon name="utility:arrowdown" tone="default" svgClassName="slds-is-sortable__icon" />
                ) : null}
              </div>
            );
            return (
              <th
                key={c.key}
                aria-label={c.label}
                aria-sort={c.sortable ? (sorted ?? "none") : undefined}
                scope="col"
                className={cx(
                  c.sortable && "slds-is-sortable",
                  sorted && "slds-is-sorted",
                  sorted === "ascending" && "slds-is-sorted_asc",
                  sorted === "descending" && "slds-is-sorted_desc",
                  resizable && "slds-is-resizable",
                  columnMenus && "slds-has-button-menu",
                  c.align === "right" && "slds-text-align_right",
                  c.wrap && "slds-cell-wrap",
                ) || undefined}
                style={c.width ? { width: c.width } : undefined}
              >
                {c.sortable ? (
                  <a
                    className="slds-th__action slds-text-link_reset"
                    href="#"
                    role="button"
                    tabIndex={-1}
                    onClick={(e) => {
                      e.preventDefault();
                      onSort?.(c.key);
                    }}
                  >
                    <span className="slds-assistive-text">Sort by: </span>
                    {headerText}
                  </a>
                ) : (
                  <div className="slds-th__action">{headerText}</div>
                )}
                {sorted ? (
                  <span className="slds-assistive-text" aria-live="polite" aria-atomic="true">
                    Sorted {sorted}
                  </span>
                ) : null}
                {columnMenus ? (
                  <ButtonIcon
                    iconName="utility:chevrondown"
                    assistiveText={`Show ${c.label} column actions`}
                    aria-haspopup="true"
                    tabIndex={-1}
                    className="slds-th__action-button slds-button_icon-x-small"
                    iconClassName="slds-button__icon_hint slds-button__icon_small"
                    onClick={() => onColumnMenu?.(c.key)}
                  />
                ) : null}
                {resizable ? (
                  <div className="slds-resizable">
                    <input
                      aria-label={`${c.label} column width`}
                      className="slds-resizable__input slds-assistive-text"
                      max="1000"
                      min="20"
                      tabIndex={-1}
                      type="range"
                    />
                    <span className="slds-resizable__handle">
                      <span className="slds-resizable__divider" />
                    </span>
                  </div>
                ) : null}
              </th>
            );
          })}
          {rowActions?.length ? (
            <th scope="col" style={{ width: "3.25rem" }}>
              <div className="slds-truncate slds-assistive-text" title="Actions">
                Actions
              </div>
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          const isSelected = selected.includes(row.id);
          return (
            <tr
              key={row.id}
              aria-selected={selection ? (isSelected ? "true" : "false") : undefined}
              className={cx("slds-hint-parent", isSelected && "slds-is-selected")}
            >
              {rowNumberColumn ? (
                <td className="slds-text-align_right" role="gridcell">
                  {rowNumberColumn === "numbers" ? <span className="slds-row-number slds-text-body_small slds-text-color_weak" /> : null}
                </td>
              ) : null}
              {selection ? (
                <td className="slds-text-align_right" role="gridcell">
                  <Checkbox
                    wrapper="none"
                    label={`Select item ${columns[0]?.value(row) ?? row.id}`}
                    hideLabel
                    checked={isSelected}
                    onChange={(c) => selection.onChange(c ? [...selected, row.id] : selected.filter((s) => s !== row.id))}
                  />
                </td>
              ) : null}
              {columns.map((c, i) => {
                const content = <CellContent row={row} column={c} linkTabIndex={-1} onLinkClick={onLinkClick} />;
                const cls = cx(c.align === "right" && "slds-text-align_right", c.wrap && "slds-cell-wrap") || undefined;
                return i === 0 && firstColumnIsRowHeader ? (
                  <th key={c.key} scope="row" data-label={c.label} className={cls}>
                    {content}
                  </th>
                ) : (
                  <td key={c.key} role="gridcell" data-label={c.label} className={cls}>
                    {content}
                  </td>
                );
              })}
              {rowActions?.length ? (
                <td role="gridcell">
                  <ButtonMenu
                    assistiveText={`More actions for ${columns[0]?.value(row) ?? row.id}`}
                    items={rowActions}
                    iconSize="x-small"
                    iconClassName="slds-button__icon_hint slds-button__icon_small"
                    position="right"
                    onSelect={(v) => onRowAction?.(row, v)}
                  />
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
