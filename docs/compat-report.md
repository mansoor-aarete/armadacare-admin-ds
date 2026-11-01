# Figma Make compatibility report

How SLDS 1 (`@salesforce-ux/design-system@2.264.3`) CSS, icons and fonts will be delivered so the design system runs unchanged when copied into Figma Make. Decisions are based on what the reference project proves (`docs/audit.md` §A).

---

## 1. What the reference proves about Figma Make

| Proven | Evidence |
|---|---|
| npm packages listed in `package.json` are installed by Make | `.figma/make/install` runs `pnpm install --prefer-offline --no-frozen-lockfile`; `.figma/make/dev.json` re-installs when `package.json` changes |
| CSS can be imported **from an npm package** | `src/styles/tailwind.css` → `@import 'tw-animate-css';` resolved from `node_modules` |
| Vite dev server with React + Tailwind v4 plugins | `.figma/make/dev` → `pnpm exec vite`; `vite.config.ts` comment says both plugins are required |
| Exact-pinned versions work | every dependency pinned without `^` |
| Relative imports, `.tsx` components, one `index.css` entry | whole `src/` |

| **Not** proven | Consequence |
|---|---|
| Serving files from `public/` | No `public/` folder exists in either copy → don't use it. |
| Static files referenced by CSS `url()` inside an npm package | `tw-animate-css` has no `url()`. SLDS CSS has 16 `url(../images/…)` references → don't build anything that depends on them. |
| SVG sprite `<use href="/assets/icons/…-sprite/svg/symbols.svg#x">` | Would need static file serving → don't use. |
| Environment variables, Node APIs | Not used by the reference → forbidden. |

---

## 2. Delivery plan

### 2.1 SLDS CSS — load from the pinned npm package (recommended)

- `package.json` dependency: `"@salesforce-ux/design-system": "2.264.3"` (already installed, exact pin).
- One import, in `src/main.tsx`, **before** `./styles/index.css`:
  ```ts
  import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css";
  import "./styles/index.css";
  ```
  This is the same mechanism Make already uses for `tw-animate-css` (CSS from a package), but done as a JS import so Vite handles it, outside Tailwind's `@import` inliner.
- Theme overrides live in **one** file, `src/styles/slds-theme.css`, imported from `index.css` after SLDS so it wins the cascade at equal specificity.
- The 16 CSS `url()` images (brand band, Einstein header background, default avatars, popover header art, welcome mat) are **not relied on**. Where a component needs one of those images (Einstein header, G13), the SVG is inlined in that component.
- Size: 964 KB minified (≈ 120 KB gzipped). Acceptable for an internal admin tool. Tree-shaking via the per-component `css/*/index.css` files was considered and rejected: they import shared token/common files through relative `@import` chains, which is more Make risk for little gain.

Fallback, only if the package import fails in a Make smoke test: copy `salesforce-lightning-design-system.min.css` into `src/styles/vendor/` and import it relatively. That costs a 1 MB file inside the Make editor, so it isn't the default.

### 2.2 Tailwind (kept only because Make requires the plugin)

- `vite.config.ts` stays **byte-identical** to the reference (React + Tailwind + `figmaAssetResolver`, `@` alias).
- Tailwind **Preflight must not load.** It resets `svg { display:block }`, `border` and heading styles, `button` appearance, and `img` sizing, and these break SLDS icons and buttons. Proposed `src/styles/tailwind.css`:
  ```css
  @import 'tailwindcss/theme.css' layer(theme);
  @import 'tailwindcss/utilities.css' layer(utilities) source(none);
  ```
  No `@source`, so no utilities are generated. Components use **no** Tailwind classes, per your rules. Exact syntax will be verified with `vite build` in Phase 1.
- Cascade note: Tailwind output lives in `@layer`s, and unlayered SLDS CSS always beats layered CSS. Even an accidental utility can't override SLDS.

### 2.3 Icons — inline SVG registry copied from the package

- Source: `node_modules/@salesforce-ux/design-system/assets/icons/{utility,standard,custom,doctype}/*.svg`. All are single-colour, `viewBox="0 0 520 520"` (utility) or `0 0 100 100` (standard).
- A dev-only script, `scripts/build-icons.mjs`, reads **only the icons listed in the inventory** and writes `src/app/components/icons/registry.ts`, which maps `"utility:edit"` to its viewBox and path data. The generated file is committed. Make never runs the script, and app code never touches the file system.
- `Icon` renders the SLDS blueprint element with inline paths instead of `<use>`. Classes and ARIA match the blueprint:
  ```html
  <span class="slds-icon_container slds-icon-standard-account" title="Account">
    <svg class="slds-icon slds-icon_small" aria-hidden="true" viewBox="0 0 100 100"><path d="…"/></svg>
    <span class="slds-assistive-text">Account</span>
  </span>
  ```
  Replacing `<use xlink:href>` with the same `<path>` data is the one deliberate deviation from blueprint markup. It is required because sprites need static file serving.
- Path data is copied **verbatim** (licence §3). Colour comes from SLDS classes (`slds-icon-text-default`, `slds-icon-standard-*`, `slds-current-color`), not from editing the SVG.
- Estimated size: about 70 icons, roughly 60–90 KB of TS.

### 2.4 Fonts — SLDS default system stack, nothing to ship

- SLDS 2.264.3 sets `--slds-g-font-family-base: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, 'Helvetica Neue', Arial, sans-serif, …`.
- Every SLDS element in the Figma capture is **Segoe UI**, which is exactly what that stack resolves to on Windows, where the capture was made. **Decision: use the SLDS default; load no web font.**
- On macOS the stack resolves to San Francisco, so metrics differ slightly from Figma. Playwright comparisons should run on Windows (Chromium) to match.
- The Participant search LWC uses Arial and the notification badge uses SF Pro. Both are capture-specific custom styling and are not reproduced (see Q3).

### 2.5 Images and illustrations

- The Einstein header (`einstein-header-background.svg`, `einstein-figure.svg`) and empty-state illustrations get inlined in their components, unmodified.
- The "desert" empty-state illustration in D1 isn't in the package (Q9).

---

## 3. Licensing

| Asset | Licence | What we must do |
|---|---|---|
| SLDS CSS / code | BSD-3-Clause | Keep the copyright notice: add an SLDS entry to `ATTRIBUTIONS.md` with the licence link. |
| SLDS icons (`assets/icons`) | **CC BY-ND 4.0** | (1) **Attribution**: credit Salesforce and link the licence in `ATTRIBUTIONS.md` and `guidelines/foundations/icons.md`. (2) **No derivatives**: path data stays byte-for-byte unchanged, with no merging, simplifying or redrawing. Converting format (SVG file to JSX element) is a technical modification permitted by CC 4.0 §2(a)(4). Colouring via CSS `fill` is presentation, not modification. |
| SLDS images and illustrations (`assets/images`) | CC BY-ND 4.0 | Same as icons. Multi-colour illustrations keep their original colours; we do **not** recolour them olive. |
| **Salesforce Sans** | Not included in 2.264.3; its licence restricts use to Salesforce-platform apps | **Do not add it.** |
| **Segoe UI** | Microsoft proprietary | Used only as an installed system font via the CSS stack. We never ship or embed the font file. |
| ArmadaCare olive brand colours | Your org's branding | Only in `slds-theme.css`. |

---

## 4. Risks

| # | Risk | Likelihood | Mitigation |
|---|---|---|---|
| R1 | Make fails to resolve or serve the package CSS import | Low (CSS-from-package proven) | Phase 1 smoke test in Make. Fallback: vendored CSS (§2.1). |
| R2 | SLDS CSS `url()` assets 404 in Make | Medium | Not relied on. Images we need are inlined. |
| R3 | Tailwind Preflight leaks in (for example, Make's AI re-adds `@import 'tailwindcss'`) | Medium | `guidelines/setup.md` will forbid it in plain words. `scripts/verify-slds` can also flag `@import 'tailwindcss'` in any CSS file. |
| R4 | Make's AI "helpfully" adds Tailwind or shadcn classes, hex values, or new `slds-*` classes | High (Make defaults to Tailwind + shadcn) | Guidelines rules (dense, directive). The verify script fails on unknown `slds-*`, hex, `rgb()` and `px`. |
| R5 | Brand hooks don't reach every brand surface | **Certain** (see audit §B) | Needs your decision, Q1. |
| R6 | Blueprint markup uses classes absent from the CSS | **Certain** (12 found so far) | Needs your decision, Q2. |
| R7 | `tsc --noEmit` fails because of `"types": ["node"]` in the reference tsconfig | Certain if copied as-is | Add the `@types/node` devDependency (no runtime impact). |
| R8 | 964 KB CSS slows Make preview | Low | Acceptable. Re-evaluate only if Make complains. |
| R9 | Visual diffs from OS font rendering | Medium | Run Playwright on Windows. Document the tolerance. |
| R10 | `2.264.3` was published about 3 days ago (the `latest` tag) | Low | Pinned exactly. `2.264.2` (`winter-27` tag) is the alternative if you prefer a release that's been out longer. |
| R11 | Playwright (~150 MB of browsers) in `package.json` slows every Make install | High if added to the root | Keep Playwright in a separate `tools/visual/` package that is **not** copied into Make (Q11). |

---

## 5. Open questions (need your answer before Phase 1)

**Q1 — Brand colour beyond hooks (biggest decision).** Verified hooks cover brand buttons, neutral-button text, checkbox, toggle, radio, tab underline, dropdown items and link colour where SLDS reads it. They **do not** cover these hard-coded rules:
- `a` / `.slds-text-link` link colour
- context-bar active indicator and console-tab tint
- sub-tab tint
- split-view selected bar
- `.slds-button_icon-brand` (the "dropdown chevron button")
- datepicker and listbox selection
- page background (`html { background: #eef4ff }` vs Figma `#ffffff`)

Options:
- **(a) Recommended:** `slds-theme.css` has two clearly labelled blocks. Block 1 sets **hook overrides** (`:root { --slds-c-…; --slds-g-… }`). Block 2 holds **selector overrides** that repeat exactly those SLDS selectors and swap only the colour, using brand custom properties defined once at the top. All brand values still live in one file.
- (b) Hooks only. Those surfaces stay Salesforce blue, which contradicts "for colour, Figma wins".

**Q2 — Classes that SLDS markup uses but the CSS doesn't define.** Found so far:
- `slds-form`
- `slds-dropdown__list`
- `slds-tooltip-trigger`
- `slds-global-actions__help`
- `slds-global-actions__setup`
- `slds-page-header_record-home`
- `slds-help-text`
- `slds-einstein-header__container`
- `slds-radio-button-group`
- `slds-files__card`
- `slds-tile__title`
- `slds-icon-utility-*`

Your rules "same classes as the blueprint" and "only classes in the installed CSS" conflict for these. Options:
- **(a) Recommended:** keep them, and have `verify-slds` accept them only from an explicit allowlist file (`scripts/slds-markup-only.json`) that records the blueprint each one comes from.
- (b) Drop them. There's no visual change, but the markup diverges from the blueprint.

**Q3 — Participant / Employer / Claim Search LWC** (P1–P7). It uses a dark `#5a5a5a` header bar, Arial, a lighter olive `#93a445` button and 3 px radius. Should the design system render this with standard SLDS look (recommended, gap G1), or replicate the custom look?

**Q4 — Brand hover, active and disabled shades.** The capture only shows resting states for `#57612d` and `#8b9a4c`. Can you get the org's theme values (Setup → Themes and Branding → active theme: Brand Color, Page Background)? If not, I'll derive hover/active by darkening `#57612d`, the way SLDS steps `#0176d3 → #014486`, and mark them as derived.

**Q5 — Two olive values.** Proposed mapping:

| Value | Applies to |
|---|---|
| `#57612d` (accessible) | brand button fill/border, neutral-button text, links, menu items, checkbox mark, focus-free text |
| `#8b9a4c` (base) | active indicators: console-tab top bar, nav item bar, tab underline, split-view selected bar |
| `rgba(139,154,76,0.1)` | active console-tab / nav-item background |

Vertical-nav active background was sampled at ≈ `#f3f4ed`, which I propose to treat as the same 10 % tint. OK?

**Q6 — Read-only checkbox.** Checked fields show a ✓ icon. Unchecked fields show a dashed square that may be a capture artifact. Should unchecked be empty, or a disabled `slds-checkbox_faux`?

**Q7 — Coloured left-border cards** (Claim Details, Benefit Snapshot; G9). These aren't in SLDS. Drop the accent (recommended), or add one theme-file accent hook?

**Q8 — Sandbox chip** ("Sandbox (CXDev)", `#e0e5f8`) in the global header. Include it as a `GlobalHeader` `environmentLabel` slot (its colour lives in the theme file), or omit it?

**Q9 — Desert empty-state illustration** (D1). Should I extract the vector from Figma (it's Salesforce's illustration, CC BY-ND, unmodified) or use one of the packaged `empty-state-*.svg` files?

**Q10 — "Live Preview" banner.** I couldn't find it in any of the 48 frames, either by layer name or visually. Is it in another file or version?

**Q11 — Visual-check tooling location.** OK to put Playwright and the screenshot-diff script in `tools/visual/` with its own `package.json`, kept out of the Make copy? Playwright browsers must also be downloaded once (`npx playwright install chromium`).

**Q12 — Project location and name.** I created `C:\Users\mahmad\Downloads\Admin Portal\armadacare-admin-ds\`. It currently holds `package.json`, `node_modules`, `docs/`. Keep it?
