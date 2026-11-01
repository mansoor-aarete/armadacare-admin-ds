import { ColorSwatch } from "./ColorSwatch";

const BRAND_TOKENS = [
  { token: "--ac-color-brand", role: "Brand buttons, neutral-button text, links, menu items, checkbox and radio marks", source: "Figma" },
  { token: "--ac-color-brand-dark", role: "Hover / active of every brand surface", source: "Derived" },
  { token: "--ac-color-brand-base", role: "Active indicators: console-tab bar, tab underline, split-view selection", source: "Figma" },
  { token: "--ac-color-brand-base-tint", role: "Active console tab / nav item background", source: "Figma" },
  { token: "--ac-color-page-background", role: "Page background", source: "Figma (SLDS neutral-base-100)" },
];

const SLDS_TOKENS = [
  { token: "--slds-g-color-neutral-base-10", role: "Primary text", source: "SLDS default = Figma" },
  { token: "--slds-g-color-neutral-base-30", role: "Secondary text, field labels, table headers", source: "SLDS default = Figma" },
  { token: "--slds-g-color-border-base-4", role: "Control borders (buttons, inputs, checkboxes)", source: "SLDS default = Figma" },
  { token: "--slds-g-color-border-base-1", role: "Card, row and section borders", source: "SLDS default = Figma" },
  { token: "--slds-g-color-neutral-base-95", role: "Shaded surfaces: headers, split view, footers", source: "SLDS default = Figma" },
  { token: "--slds-g-color-error-base-40", role: "Error text, required marker, error border", source: "SLDS default = Figma" },
  { token: "--slds-g-color-error-base-30", role: "Error popover header", source: "SLDS default = Figma" },
];

const TYPE_SAMPLES = [
  { cls: "slds-text-heading_large", spec: "1.75rem · regular", sample: "Metric value 0" },
  { cls: "slds-text-heading_medium", spec: "1.25rem · regular", sample: "Modal title — Delete Claim" },
  { cls: "slds-page-header__title", spec: "1.125rem · bold", sample: "Record name — Blalock Development Co" },
  { cls: "slds-text-heading_small", spec: "1rem · regular", sample: "Record tab label" },
  { cls: "slds-text-title_bold", spec: "0.875rem · bold", sample: "Card title — Plan Year Enrollment Members (2)" },
  { cls: "slds-text-body_regular", spec: "0.8125rem (body default)", sample: "Body copy and table cells" },
  { cls: "slds-text-body_small", spec: "0.75rem", sample: "Meta — 22 items • Updated 2 minutes ago" },
  { cls: "slds-text-title", spec: "0.75rem · weak colour", sample: "Field label — Account Owner" },
  { cls: "slds-text-title_caps", spec: "0.75rem · caps · tracked", sample: "Section title — Reports" },
];

const SPACING = ["xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large"];

export function FoundationsSection() {
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="foundations">
      <h2 className="slds-text-heading_medium slds-m-bottom_medium">Foundations</h2>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Colour — brand tokens (theme file)</h3>
      <ul className="slds-m-bottom_large">
        {BRAND_TOKENS.map((t) => (
          <ColorSwatch key={t.token} {...t} />
        ))}
      </ul>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Colour — SLDS defaults used unchanged</h3>
      <ul className="slds-m-bottom_large">
        {SLDS_TOKENS.map((t) => (
          <ColorSwatch key={t.token} {...t} />
        ))}
      </ul>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Typography — SLDS system font stack</h3>
      <ul className="slds-m-bottom_large" data-visual-id="typography">
        {TYPE_SAMPLES.map((t) => (
          <li key={t.cls} className="slds-m-bottom_small">
            <div className={t.cls}>{t.sample}</div>
            <div className="slds-text-body_small slds-text-color_weak">
              .{t.cls} — {t.spec}
            </div>
          </li>
        ))}
      </ul>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Spacing — SLDS padding/margin scale</h3>
      <ul className="slds-grid slds-wrap" data-visual-id="spacing">
        <li className="slds-m-right_small slds-m-bottom_small">
          <div className="slds-box slds-p-around_none">
            <div className="slds-theme_shade slds-p-around_xxx-small">xxx-small</div>
          </div>
        </li>
        <li className="slds-m-right_small slds-m-bottom_small">
          <div className="slds-box slds-p-around_none">
            <div className="slds-theme_shade slds-p-around_xx-small">xx-small</div>
          </div>
        </li>
        <li className="slds-m-right_small slds-m-bottom_small">
          <div className="slds-box slds-p-around_none">
            <div className="slds-theme_shade slds-p-around_x-small">x-small</div>
          </div>
        </li>
        <li className="slds-m-right_small slds-m-bottom_small">
          <div className="slds-box slds-p-around_none">
            <div className="slds-theme_shade slds-p-around_small">small</div>
          </div>
        </li>
        <li className="slds-m-right_small slds-m-bottom_small">
          <div className="slds-box slds-p-around_none">
            <div className="slds-theme_shade slds-p-around_medium">medium</div>
          </div>
        </li>
        <li className="slds-m-right_small slds-m-bottom_small">
          <div className="slds-box slds-p-around_none">
            <div className="slds-theme_shade slds-p-around_large">large</div>
          </div>
        </li>
        <li className="slds-m-right_small slds-m-bottom_small">
          <div className="slds-box slds-p-around_none">
            <div className="slds-theme_shade slds-p-around_x-large">x-large</div>
          </div>
        </li>
        <li className="slds-m-right_small slds-m-bottom_small">
          <div className="slds-box slds-p-around_none">
            <div className="slds-theme_shade slds-p-around_xx-large">xx-large</div>
          </div>
        </li>
      </ul>
      <p className="slds-text-body_small slds-text-color_weak">Scale: {SPACING.join(" · ")}</p>
    </section>
  );
}
