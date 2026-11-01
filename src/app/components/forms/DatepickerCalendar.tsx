import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { cx } from "../utils/cx";
import { addDays, MONTH_NAMES, monthGrid, parseIso, toIso, WEEKDAYS } from "../utils/dates";

export type DatepickerCalendarProps = {
  idPrefix: string;
  /** Selected ISO date. */
  value: string | null;
  /** Today's ISO date (injectable for stable screenshots). */
  today: string;
  onSelect: (iso: string) => void;
  onClose: () => void;
  /** Inclusive year range for the year select. */
  yearRange: [number, number];
  /** Move focus into the grid when opened by keyboard. */
  autoFocus?: boolean;
};

/** SLDS Datepicker dropdown (div.slds-datepicker[role=dialog] › filter › table.slds-datepicker__month[role=grid] › Today). */
export function DatepickerCalendar({ idPrefix, value, today, onSelect, onClose, yearRange, autoFocus }: DatepickerCalendarProps) {
  const start = parseIso(value) ?? parseIso(today) ?? new Date();
  const [view, setView] = useState({ year: start.getFullYear(), month: start.getMonth() });
  const [focusIso, setFocusIso] = useState(toIso(start));
  const gridRef = useRef<HTMLTableElement>(null);
  const weeks = monthGrid(view.year, view.month);
  const monthId = `${idPrefix}-month`;

  useEffect(() => {
    if (autoFocus) gridRef.current?.querySelector<HTMLElement>('td[tabindex="0"]')?.focus();
  }, [autoFocus, focusIso, view]);

  const shiftMonth = (delta: number) =>
    setView((v) => {
      const d = new Date(v.year, v.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const moveFocus = (days: number) => {
    const next = addDays(focusIso, days);
    const d = parseIso(next) as Date;
    setFocusIso(next);
    setView({ year: d.getFullYear(), month: d.getMonth() });
  };

  const onGridKey = (e: KeyboardEvent<HTMLTableElement>) => {
    const keys: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (e.key in keys) {
      e.preventDefault();
      moveFocus(keys[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(focusIso);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const years: number[] = [];
  for (let y = yearRange[0]; y <= yearRange[1]; y++) years.push(y);

  return (
    <div className="slds-datepicker slds-dropdown slds-dropdown_left" role="dialog" aria-hidden="false" aria-label={`Date picker: ${MONTH_NAMES[view.month]}`}>
      <div className="slds-datepicker__filter slds-grid">
        <div className="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">
          <div className="slds-align-middle">
            <ButtonIcon iconName="utility:left" assistiveText="Previous Month" variant="container" onClick={() => shiftMonth(-1)} />
          </div>
          <h2 aria-atomic="false" aria-live="polite" className="slds-align-middle" id={monthId}>
            {MONTH_NAMES[view.month]}
          </h2>
          <div className="slds-align-middle">
            <ButtonIcon iconName="utility:right" assistiveText="Next Month" variant="container" onClick={() => shiftMonth(1)} />
          </div>
        </div>
        <div className="slds-shrink-none">
          <label className="slds-assistive-text" htmlFor={`${idPrefix}-select`}>
            Pick a Year
          </label>
          <div className="slds-select_container">
            <select
              className="slds-select"
              id={`${idPrefix}-select`}
              value={view.year}
              onChange={(e) => setView((v) => ({ ...v, year: Number(e.target.value) }))}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <table ref={gridRef} aria-labelledby={monthId} aria-multiselectable="true" className="slds-datepicker__month" role="grid" onKeyDown={onGridKey}>
        <thead>
          <tr id={`${idPrefix}-weekdays`}>
            {WEEKDAYS.map((w) => (
              <th key={w.short} id={`${idPrefix}-${w.long}`} scope="col">
                <abbr title={w.long}>{w.short}</abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].iso}>
              {week.map((d) => (
                <td
                  key={d.iso}
                  aria-selected={d.iso === value ? "true" : "false"}
                  aria-current={d.iso === today ? "date" : undefined}
                  aria-label={d.label}
                  className={cx(!d.inMonth && "slds-day_adjacent-month", d.iso === today && "slds-is-today", d.iso === value && "slds-is-selected")}
                  role="gridcell"
                  tabIndex={d.iso === focusIso ? 0 : -1}
                  onClick={() => onSelect(d.iso)}
                >
                  <span className="slds-day">{d.day}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="slds-button slds-align_absolute-center slds-text-link" onClick={() => onSelect(today)}>
        Today
      </button>
    </div>
  );
}
