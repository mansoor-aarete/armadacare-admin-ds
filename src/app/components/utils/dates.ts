/** Date helpers for the Datepicker. Values are ISO dates (YYYY-MM-DD) in local time. */

export const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const WEEKDAYS = [
  { short: "Sun", long: "Sunday" },
  { short: "Mon", long: "Monday" },
  { short: "Tue", long: "Tuesday" },
  { short: "Wed", long: "Wednesday" },
  { short: "Thu", long: "Thursday" },
  { short: "Fri", long: "Friday" },
  { short: "Sat", long: "Saturday" },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function toIso(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function parseIso(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return d.getMonth() === Number(m[2]) - 1 ? d : null;
}

/** ISO → "M/D/YYYY" (the format shown in the Figma captures, e.g. 10/21/2026). */
export function formatUs(iso: string | null | undefined): string {
  const d = parseIso(iso);
  return d ? `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}` : "";
}

/** "M/D/YYYY" → ISO, or null when invalid. */
export function parseUs(text: string): string | null {
  const m = /^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/.exec(text);
  if (!m) return null;
  return toIso(new Date(Number(m[3]), Number(m[1]) - 1, Number(m[2]))) === `${m[3]}-${pad(Number(m[1]))}-${pad(Number(m[2]))}`
    ? `${m[3]}-${pad(Number(m[1]))}-${pad(Number(m[2]))}`
    : null;
}

export function addDays(iso: string, days: number): string {
  const d = parseIso(iso) ?? new Date();
  d.setDate(d.getDate() + days);
  return toIso(d);
}

export type CalendarDay = { iso: string; day: number; inMonth: boolean; label: string };

/** 6 weeks × 7 days starting on Sunday, covering the given month. */
export function monthGrid(year: number, month: number): CalendarDay[][] {
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());
  const weeks: CalendarDay[][] = [];
  for (let w = 0; w < 6; w++) {
    const week: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + i);
      week.push({
        iso: toIso(d),
        day: d.getDate(),
        inMonth: d.getMonth() === month,
        label: `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
      });
    }
    weeks.push(week);
  }
  return weeks;
}
