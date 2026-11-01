import { useId } from "react";
import { Button } from "../buttons/Button";
import { Combobox } from "../forms/Combobox";

export type PaginationProps = {
  /** 1-based current page. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Records-per-page picklist; omit to hide it. */
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  /** Accessible name of the pager (e.g. "Search results pages"). */
  label?: string;
};

/**
 * Pager (Figma P5; no SLDS 1 blueprint — gap G6): records-per-page picklist on the left; Previous / "Page x of y" / Next
 * neutral buttons on the right. Built from SLDS grid, Combobox and Button.
 */
export function Pagination({ page, pageCount, onPageChange, pageSize, pageSizeOptions = [10, 25, 50], onPageSizeChange, label = "Pagination" }: PaginationProps) {
  const statusId = useId();
  return (
    <nav className="slds-grid slds-grid_vertical-align-center slds-grid_align-spread slds-p-vertical_x-small" aria-label={label}>
      {pageSize !== undefined ? (
        <div className="slds-grid slds-grid_vertical-align-center">
          <span className="slds-m-right_x-small" aria-hidden="true">
            Records per page
          </span>
          <div className="slds-size_xx-small">
            <Combobox
              label="Records per page"
              hideLabel
              options={pageSizeOptions.map((n) => ({ value: String(n), label: String(n) }))}
              value={String(pageSize)}
              onChange={(v) => v && onPageSizeChange?.(Number(v))}
            />
          </div>
        </div>
      ) : (
        <span />
      )}
      <div className="slds-grid slds-grid_vertical-align-center">
        <Button label="Previous" disabled={page <= 1} aria-describedby={statusId} onClick={() => onPageChange(page - 1)} />
        <span id={statusId} className="slds-p-horizontal_x-small" aria-live="polite">
          Page {page} of {pageCount}
        </span>
        <Button label="Next" disabled={page >= pageCount} aria-describedby={statusId} onClick={() => onPageChange(page + 1)} />
      </div>
    </nav>
  );
}
