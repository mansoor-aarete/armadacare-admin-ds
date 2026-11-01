/** Joins class names, skipping falsy values. Callers must pass complete SLDS class names (no string building). */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
