import { Fragment, type ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { ButtonMenu } from "../buttons/ButtonMenu";
import type { MenuItem } from "../buttons/MenuDropdown";
import { cx } from "../utils/cx";

export type TreeGridRow = {
  id: string;
  /** Values per column key. */
  cells: Record<string, string>;
  /** Extra content after the first-column link (Figma: "current" badge). */
  badge?: ReactNode;
  children?: TreeGridRow[];
};

export type TreeGridColumn = {
  key: string;
  label: string;
  /** Render the cell as a link. */
  link?: boolean;
};

export type TreeGridProps = {
  label: string;
  /** First column is the tree column (row header with the expand chevron). */
  columns: TreeGridColumn[];
  rows: TreeGridRow[];
  expandedIds: string[];
  onToggle: (id: string, expanded: boolean) => void;
  onLinkClick?: (row: TreeGridRow, columnKey: string) => void;
  /** Header labels in caps (Figma Account Hierarchy uses the legacy caps header). */
  capsHeader?: boolean;
  rowActions?: MenuItem[];
  onRowAction?: (row: TreeGridRow, value: string) => void;
};

/** SLDS Tree Grid blueprint (table.slds-table_tree[role=treegrid] with aria-level / aria-expanded rows). */
export function TreeGrid({
  label,
  columns,
  rows,
  expandedIds,
  onToggle,
  onLinkClick,
  capsHeader,
  rowActions,
  onRowAction,
}: TreeGridProps) {
  const cell = (row: TreeGridRow, c: TreeGridColumn) => {
    const text = row.cells[c.key] ?? "";
    return (
      <div className="slds-truncate" title={text}>
        {c.link && text ? (
          <a
            href="#"
            tabIndex={-1}
            onClick={(e) => {
              e.preventDefault();
              onLinkClick?.(row, c.key);
            }}
          >
            {text}
          </a>
        ) : (
          text
        )}
      </div>
    );
  };

  const renderRows = (list: TreeGridRow[], level: number): ReactNode =>
    list.map((row, i) => {
      const hasChildren = Boolean(row.children?.length);
      const expanded = hasChildren ? expandedIds.includes(row.id) : undefined;
      const name = row.cells[columns[0].key] ?? row.id;
      return (
        <Fragment key={row.id}>
          <tr
            aria-expanded={expanded === undefined ? undefined : expanded ? "true" : "false"}
            aria-level={level}
            aria-posinset={i + 1}
            aria-setsize={list.length}
            className="slds-hint-parent"
          >
            <th className="slds-tree__item" data-label={columns[0].label} scope="row">
              <ButtonIcon
                iconName="utility:chevronright"
                assistiveText={expanded ? `Collapse ${name}` : `Expand ${name}`}
                aria-hidden="true"
                tabIndex={-1}
                iconSize="small"
                className={cx("slds-button_icon-x-small slds-m-right_x-small", !hasChildren && "slds-is-disabled")}
                onClick={() => hasChildren && onToggle(row.id, !expanded)}
              />
              <div className="slds-grid slds-grid_vertical-align-center slds-has-flexi-truncate">
                {cell(row, columns[0])}
                {row.badge ? <span className="slds-m-left_x-small slds-shrink-none">{row.badge}</span> : null}
              </div>
            </th>
            {columns.slice(1).map((c) => (
              <td key={c.key} data-label={c.label} role="gridcell">
                {cell(row, c)}
              </td>
            ))}
            {rowActions?.length ? (
              <td role="gridcell" style={{ width: "3.25rem" }}>
                <ButtonMenu
                  assistiveText={`More actions for ${name}`}
                  items={rowActions}
                  iconSize="x-small"
                  iconClassName="slds-button__icon_hint slds-button__icon_small"
                  position="right"
                  onSelect={(v) => onRowAction?.(row, v)}
                />
              </td>
            ) : null}
          </tr>
          {hasChildren && expanded && row.children ? renderRows(row.children, level + 1) : null}
        </Fragment>
      );
    });

  return (
    <table className="slds-table slds-table_bordered slds-table_edit slds-table_fixed-layout slds-tree slds-table_tree" role="treegrid" aria-label={label}>
      <thead>
        <tr className="slds-line-height_reset">
          {columns.map((c) => (
            <th key={c.key} aria-label={c.label} scope="col">
              <div className="slds-th__action">
                <span className={cx("slds-truncate", capsHeader && "slds-text-title_caps")} title={c.label}>
                  {c.label}
                </span>
              </div>
            </th>
          ))}
          {rowActions?.length ? (
            <th scope="col" style={{ width: "3.25rem" }}>
              <div className="slds-truncate slds-assistive-text" title="Actions">
                Actions
              </div>
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody>{renderRows(rows, 1)}</tbody>
    </table>
  );
}
