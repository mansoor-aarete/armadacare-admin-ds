import { useEffect, useState } from "react";

type CheckResult = { id: string; label: string; pass: boolean; detail: string };

/** Mounts a probe element, reads computed style, removes it. */
function probe<T>(html: string, read: (el: Element) => T): T {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.innerHTML = html;
  document.body.appendChild(host);
  try {
    return read(host.firstElementChild as Element);
  } finally {
    host.remove();
  }
}

function resolveColor(cssValue: string): string {
  return probe(`<div style="background-color:${cssValue}"></div>`, (el) => getComputedStyle(el).backgroundColor);
}

function runChecks(): CheckResult[] {
  const root = getComputedStyle(document.documentElement);
  const results: CheckResult[] = [];

  const assistive = probe(`<span class="slds-assistive-text">x</span>`, (el) => getComputedStyle(el).position);
  results.push({ id: "stylesheet", label: "SLDS stylesheet loaded", pass: assistive === "absolute", detail: `.slds-assistive-text position = ${assistive}` });

  const brandVar = root.getPropertyValue("--ac-color-brand").trim();
  results.push({ id: "theme-css", label: "Theme file loaded (--ac-color-brand defined)", pass: brandVar.length > 0, detail: brandVar || "(empty)" });

  const brandBtn = probe(`<button class="slds-button slds-button_brand">x</button>`, (el) => getComputedStyle(el).backgroundColor);
  const brandExpected = resolveColor("var(--ac-color-brand)");
  results.push({ id: "theme-hooks", label: "Block A hooks applied (brand button)", pass: brandBtn === brandExpected, detail: `${brandBtn} vs ${brandExpected}` });

  const link = probe(`<a href="#top">x</a>`, (el) => getComputedStyle(el).color);
  const linkExpected = probe(`<div style="color:var(--ac-color-brand)"></div>`, (el) => getComputedStyle(el).color);
  results.push({ id: "theme-overrides", label: "Block B overrides applied (link colour)", pass: link === linkExpected, detail: `${link} vs ${linkExpected}` });

  const pageBg = getComputedStyle(document.documentElement).backgroundColor;
  const pageExpected = resolveColor("var(--ac-color-page-background)");
  results.push({ id: "page-bg", label: "Page background from theme", pass: pageBg === pageExpected, detail: `${pageBg} vs ${pageExpected}` });

  const svgDisplay = probe(`<span><svg></svg></span>`, (el) => getComputedStyle(el.firstElementChild as Element).display);
  const divBorder = probe(`<div></div>`, (el) => getComputedStyle(el).borderTopStyle);
  results.push({
    id: "no-preflight",
    label: "Tailwind Preflight NOT loaded",
    pass: svgDisplay === "inline" && divBorder === "none",
    detail: `svg display = ${svgDisplay}, div border-style = ${divBorder}`,
  });

  const font = getComputedStyle(document.body).fontFamily;
  results.push({ id: "font", label: "SLDS system font stack", pass: /system-ui|-apple-system|Segoe UI/.test(font), detail: font });

  return results;
}

/** Runtime self-test used by the Figma Make smoke test and the Playwright run. */
export function EnvironmentChecks() {
  const [results, setResults] = useState<CheckResult[]>([]);
  useEffect(() => {
    setResults(runChecks());
  }, []);
  const allPass = results.length > 0 && results.every((r) => r.pass);

  return (
    <section className="slds-box slds-m-bottom_large" data-visual-id="environment-checks" data-all-pass={allPass ? "true" : "false"}>
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Environment checks</h2>
      <ul className="slds-list_dotted">
        {results.map((r) => (
          <li key={r.id} data-check={r.id} data-pass={r.pass ? "true" : "false"}>
            <span className={r.pass ? "slds-text-color_success" : "slds-text-color_error"}>{r.pass ? "PASS" : "FAIL"}</span>{" "}
            {r.label} <span className="slds-text-color_weak">— {r.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
