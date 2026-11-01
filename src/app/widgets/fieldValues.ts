import type { AddressValue, AuditValue, FieldDef, FieldValue, LinkValue, LocationValue, LookupValue, ObjectConfig, RecordData } from "../../config/types";
import { formatUs, MONTH_NAMES, parseIso } from "../components/utils/dates";

/** "2026-03-20" → "Mar 20, 2026". */
export function formatMediumDate(iso: string): string {
  const d = parseIso(iso.split("T")[0]);
  return d ? `${MONTH_NAMES[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}` : "";
}

/*
 * Reading and formatting field values by field type (shared by every template). Values follow the
 * conventions in src/config/types.ts (ISO dates, numbers, lookups …).
 */

export function isLookup(v: FieldValue | undefined): v is LookupValue {
  return v !== null && typeof v === "object" && !Array.isArray(v) && "objectApiName" in v;
}
export function isLink(v: FieldValue | undefined): v is LinkValue {
  return v !== null && typeof v === "object" && !Array.isArray(v) && "url" in v;
}
export function isAudit(v: FieldValue | undefined): v is AuditValue {
  return v !== null && typeof v === "object" && !Array.isArray(v) && "by" in v;
}
export function asAddress(v: FieldValue | undefined): AddressValue {
  return v !== null && typeof v === "object" && !Array.isArray(v) && !isLookup(v) && !isLink(v) && !isAudit(v) ? (v as AddressValue) : {};
}
export function asLocation(v: FieldValue | undefined): LocationValue {
  return v !== null && typeof v === "object" && !Array.isArray(v) && "latitude" in v ? v : {};
}

const ADDRESS_PARTS: Array<[keyof AddressValue, string]> = [
  ["street", "Street"],
  ["city", "City"],
  ["state", "State/Province"],
  ["postalCode", "Zip/Postal Code"],
  ["country", "Country"],
];

/** Value at a field path ("accountName", or "mailingAddress.state" for an address part). */
export function getValue(record: RecordData, path: string): FieldValue | undefined {
  const [key, part] = path.split(".");
  const v = record.values[key];
  if (!part) return v;
  const address = asAddress(v);
  return address[part as keyof AddressValue] ?? null;
}

/** Field definition for a path; address parts become text fields ("Mailing State/Province"). */
export function fieldAt(config: ObjectConfig, path: string): FieldDef {
  const [key, part] = path.split(".");
  const def = config.fields[key];
  if (!def) throw new Error(`${config.apiName}: unknown field ${key}`);
  if (!part) return def;
  const label = ADDRESS_PARTS.find(([p]) => p === part)?.[1] ?? part;
  return { label: `${def.addressPrefix ?? ""} ${label}`.trim(), type: "text", readOnly: def.readOnly };
}

export function addressParts(def: FieldDef): Array<{ part: keyof AddressValue; label: string }> {
  return ADDRESS_PARTS.map(([part, label]) => ({ part, label: `${def.addressPrefix ?? ""} ${label}`.trim() }));
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "2026-07-17T03:35" → "7/17/2026 3:35 AM" ("comma": "7/17/2026, 3:35 AM", Reports tables). */
export function formatDateTime(iso: string, style?: "medium" | "comma"): string {
  const [date, time = "00:00"] = iso.split("T");
  const [h, m] = time.split(":").map(Number);
  return `${formatUs(date)}${style === "comma" ? "," : ""} ${h % 12 === 0 ? 12 : h % 12}:${pad(m)} ${h < 12 ? "AM" : "PM"}`;
}

function formatNumber(n: number, scale: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: scale, maximumFractionDigits: scale });
}

/** Plain-text display of a value (list cells, highlights, split view). Empty string for no value. */
export function formatValue(def: FieldDef, v: FieldValue | undefined): string {
  if (v === null || v === undefined || v === "") return "";
  if (isLookup(v)) return v.name;
  if (isLink(v)) return v.label;
  if (isAudit(v)) return `${v.by.name}, ${formatDateTime(v.at)}`;
  if (Array.isArray(v)) return v.join("; ");
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") {
    if (def.type === "currency") return `$${formatNumber(v, def.scale ?? 2)}`;
    if (def.type === "percent") return `${formatNumber(v, def.scale ?? 0)}%`;
    return formatNumber(v, def.scale ?? 0);
  }
  if (typeof v === "string") {
    if (def.type === "date") return def.dateStyle === "medium" ? formatMediumDate(v) : formatUs(v);
    if (def.type === "datetime") return formatDateTime(v, def.dateStyle);
    return v;
  }
  if (def.type === "location") {
    const loc = asLocation(v);
    return [loc.latitude, loc.longitude].filter(Boolean).join(", ");
  }
  const a = asAddress(v);
  return [a.street, [a.city, a.state].filter(Boolean).join(", "), a.postalCode, a.country].filter(Boolean).join(" ");
}

/** True when a value counts as filled in (required-field validation). */
export function hasValue(v: FieldValue | undefined): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === "string") return v.trim() !== "";
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

/** "{createdDate} by {createdBy}" → field values formatted by type (missing fields become empty). */
export function formatTemplate(config: ObjectConfig, record: RecordData, template: string): string {
  return template.replace(/\{([\w.]+)\}/g, (_, path: string) => {
    const key = path.split(".")[0];
    if (!config.fields[key]) return "";
    const v = getValue(record, path);
    // Audit values in templates read as the user's name; the time comes from a separate field.
    return isAudit(v) ? v.by.name : formatValue(fieldAt(config, path), v);
  });
}
