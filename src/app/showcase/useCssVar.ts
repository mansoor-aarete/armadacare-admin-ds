import { useEffect, useState } from "react";

/** Reads the computed value of a CSS custom property from :root (for showcase display only). */
export function useCssVar(name: string): string {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
  }, [name]);
  return value;
}
