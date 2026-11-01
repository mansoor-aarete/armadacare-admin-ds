import type { ReactNode } from "react";

export type RecordFieldGridProps = {
  /**
   * Fields in reading order (row by row). null = empty cell (keeps the next field in the right column,
   * as in Lightning record layouts). A RecordField with `fullWidth` should be placed alone in its row.
   */
  fields: Array<ReactNode | null>;
  /** 1 or 2 columns (Lightning record layouts use 2). */
  columns?: 1 | 2;
};

/** SLDS Form — record detail blueprint (div.slds-form[role=list] › .slds-form__row › .slds-form__item[role=listitem]). */
export function RecordFieldGrid({ fields, columns = 2 }: RecordFieldGridProps) {
  const rows: Array<Array<ReactNode | null>> = [];
  for (let i = 0; i < fields.length; i += columns) rows.push(fields.slice(i, i + columns));
  return (
    <div className="slds-form" role="list">
      {rows.map((row, r) => (
        <div key={r} className="slds-form__row">
          {row.map((field, c) => (
            <div key={c} className="slds-form__item" role="listitem">
              {field}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
