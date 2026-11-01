/** Id conventions shared by FormElement and every form control (label ↔ input ↔ help/error text). */
export function helpId(inputId: string): string {
  return `${inputId}-help`;
}

/** aria-describedby value for a control: points at the inline help / error message when one is shown. */
export function describedBy(inputId: string, hasMessage: boolean): string | undefined {
  return hasMessage ? helpId(inputId) : undefined;
}
