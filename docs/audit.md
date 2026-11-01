# Phase 0 — Audit (A: reference project, B: SLDS package)

Date: 2026-11-01 · Project: `armadacare-admin-ds` (ArmadaCare Admin Portal design system)

---

## A. Reference project (Figma Make)

Reference used: `C:\Users\mahmad\Downloads\Admin Portal\ArmadaCare _ Broker Portal13-10 (2)\ArmadaCare _ Broker Portal13-10\`
(the prompt left `<REFERENCE_PATH>` unfilled; this is the Figma Make project audited earlier in this session).

It contains two copies:

| Copy | What it is |
|---|---|
| `./` (root) | The Broker Portal as exported from Figma Make and worked on locally (has `dist/`, `node_modules/`, `plans/`). |
| `./Reference/` | A raw Figma Make checkout (older Employer Portal state). It is the only copy with Make's own files: `.figma/make/*`, `.mise.toml`, `AGENTS.md`, `CLAUDE.md`, `.mcp.json`, `.gitattributes` (LFS). |

Both share the same scaffold. Facts below hold for both unless noted.

### Folder structure

```
index.html                      # Vite shell: <div id="root">, <script type="module" src="/src/main.tsx">
package.json                    # name "@figma/my-make-file"; scripts: dev = vite, build = vite build
vite.config.ts                  # react() + tailwindcss() + figmaAssetResolver(); alias @ -> src
tsconfig.json / tsconfig.check.json
postcss.config.mjs              # empty export (Tailwind v4 handles PostCSS)
pnpm-workspace.yaml             # packages: ['.']
guidelines/Guidelines.md        # Figma Make reads this as AI instructions
ATTRIBUTIONS.md, README.md, PROJECT_RULES.md, ACCESSIBILITY_IMPLEMENTATION_GUIDE.md
default_shadcn_theme.css        # unused leftover of the Make template
src/
  main.tsx                      # entry
  app/App.tsx                   # RouterProvider + context + Toaster
  app/routes.tsx                # createBrowserRouter (react-router 7)
  app/components/ui/*.tsx       # ~70 shadcn/Radix primitives + house components
  app/components/layout/*       # AppLayout, AuthLayout
  app/components/figma/ImageWithFallback.tsx   # ships with every Make file
  app/pages/**                  # one file per screen; pages/design-system/* = live showcase route
  app/data, app/contexts, app/utils
  imports/                      # Figma-pasted frames + prompt .md files (excluded from tsc check)
  assets/<sha1>.png             # images referenced as `figma:asset/<sha1>.png`
  styles/index.css, fonts.css, tailwind.css, theme.css
.figma/make/ (Reference only)   # dev, install, deploy, format, langserver scripts; dev.json; site.json
.mise.toml  (Reference only)    # node = "22", pnpm = "10.34.3"
```

### Entry file

`index.html` → `/src/main.tsx`:

```tsx
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
createRoot(document.getElementById("root")!).render(<App />);
```

### Import style

- **Relative imports only** in application code: 670 relative specifiers, **0** uses of the `@/` alias (the alias exists in `vite.config.ts` and `tsconfig.json` but is unused).
- `.tsx` extension is written on the `App` import in `main.tsx` (`allowImportingTsExtensions: true`); elsewhere extensionless.
- **No versioned import specifiers** (no `from "pkg@1.2.3"`) anywhere in `src/` or `Reference/src/`. Packages are imported by bare name and resolved from `package.json` dependencies.
- Named exports for components (`export function Button`), default export only for `App`.

### How CSS is loaded

`main.tsx` imports `src/styles/index.css`, which `@import`s in order:

1. `fonts.css` — Google Fonts `@import url(...)` (Montserrat, EB Garamond).
2. `tailwind.css` — `@import 'tailwindcss' source(none); @source '../**/*.{js,ts,jsx,tsx}'; @import 'tw-animate-css';`
3. `theme.css` — `:root` tokens + `@theme inline { … }` mapping tokens to Tailwind utilities + `@layer base`.

`@import 'tw-animate-css'` is a **CSS file resolved from `node_modules`** through the CSS `@import` chain. This is the only evidence in the reference that Make resolves CSS from npm packages.

### Tailwind

- Version **4.1.12** via `@tailwindcss/vite` 4.1.12 (no `tailwind.config.js`).
- Used heavily: utility classes in every `.tsx`, tokens exposed via `@theme inline`.
- `vite.config.ts` comment: *"The React and Tailwind plugins are both required for Make, even if Tailwind is not being actively used – do not remove them."*
- Full `@import 'tailwindcss'` includes **Preflight** (global reset in `@layer base`).

### Path aliases vs relative imports

`@` → `./src` is configured (Vite + TS paths) but unused; the house convention is relative imports. We will follow relative imports.

### Guidelines folder

`guidelines/Guidelines.md` at the project root (single file in the reference). Make treats it as AI instructions. The new project will expand it into the structure you specified (`setup.md`, `foundations/`, `components/`).

### Toolchain versions (from `package.json`)

React / React-DOM **18.3.1** (declared as *optional peerDependencies*, not dependencies — Make supplies them), TypeScript 5.9.3, Vite 6.3.5 (also pinned via `pnpm.overrides`), `@vitejs/plugin-react` 4.7.0, react-router 7.13.0. All versions pinned exactly (no `^`).

Note: `Reference/AGENTS.md` describes a *newer* Make scaffold (React 19, Vite 8, `src/App.tsx` at root, oxfmt). The actual `package.json` in both copies is React 18 / Vite 6. **Package.json wins**; AGENTS.md is a generic Make template doc.

### Anything that would break in Figma Make

| Risk | Detail | Our handling |
|---|---|---|
| Removing React/Tailwind Vite plugins | Make requires both. | Keep `vite.config.ts` byte-identical to the reference. |
| Custom Vite plugins / config edits | Only `figmaAssetResolver` exists and it ships with Make. | No changes (your rule). |
| Node APIs / `process.env` / `import.meta.env` | None used in reference `src/`. | Forbidden in our code. |
| `public/` folder | **Not present in either copy** → serving static files from `public/` is unproven in Make. | Don't use `public/`. |
| Static files from `node_modules` via `url()` | Unproven (tw-animate-css has no `url()`). | Avoid depending on SLDS CSS `url()` images (see compat report). |
| `tsconfig.json` `"types": ["node"]` without `@types/node` | `tsc --noEmit` fails with *Cannot find type definition file for 'node'* unless `@types/node` is installed. | Add `@types/node` as a devDependency, or drop `types` (decide in Phase 1). |
| React not in `dependencies` | Declared as optional peer deps; npm ≥7 auto-installs peers locally, Make injects them. | Keep the same pattern. |
| Large single files | Make's editor/AI works file-by-file; huge files (e.g. a 1 MB vendored CSS) are unwieldy. | Load SLDS CSS from the npm package, not a vendored copy. |
| `figma:asset/…` imports | Only work with the resolver plugin + files in `src/assets/`. | Not needed (inline SVG). |

---

## B. SLDS package

Installed into `armadacare-admin-ds/` with `npm install --save-exact`:

| Item | Value |
|---|---|
| Package | `@salesforce-ux/design-system` |
| **Exact version** | **2.264.3** (`"2.264.3"` in `package.json`, no `^`) — npm dist-tag `latest`; release "Winter '27" (id 264). `winter-27` tag points at 2.264.2. Published ~3 days before this audit. |
| Is it SLDS 1? | Yes. The package README title is **"Salesforce Lightning Design System 1"** and links to `v1.lightningdesignsystem.com`. Visual defaults confirm SLDS 1: brand `#0176d3`, link `#0b5cab`, 4 px button radius, `#c9c9c9` borders. (The CSS *also* carries `--slds-g-*` hook names as fallbacks; that is how SLDS 1 exposes styling hooks — it is not SLDS 2/Cosmos styling.) |
| License | BSD-3-Clause (code). Icons and images: CC BY-ND 4.0 (`assets/icons/License-for-icons.txt`, `assets/images/License-for-images.txt`). |

### CSS files (`assets/styles/`)

| File | Size |
|---|---|
| **`salesforce-lightning-design-system.min.css`** (main, minified) | **964,120 B** |
| `salesforce-lightning-design-system.css` (main, unminified — used for this audit) | 1,089,700 B |
| `…-legacy(.min).css` | 856,445 / 765,934 B |
| `…-offline(.min).css` | 1,516,892 / 1,420,631 B |
| `…sanitized.css`, `…-imports.sanitized.css` | 566,014 / 2,329 B |
| `…_touch(.min).css` | 30,795 / 27,048 B |

Per-component CSS also ships under `css/<component>/…/index.css`.

### `--slds-g-*` global hooks

- **532 unique `--slds-g-*` hooks are defined**: 235 in a `:root` block and 514 in a `:where(html)` block (overlapping; `:root` wins on specificity).
- Only **135** of them are actually read (`var(--slds-g-…)`) by component CSS. Overriding the other ~400 has no visible effect on SLDS components.
- The CSS also uses component hooks `--slds-c-*` (476 unique names), legacy `--sds-c-*`, reference tokens `--slds-r-*`, and a few `--slds-s-*` / `--slds-kx-*`.
- Full table (name, `:root` value, `:where(html)` value, read count): **`docs/slds-hooks.md`**.

### Which hooks control the brand colour

Brand blue appears as these values: `#0176d3` (brand-base-50), `#0b5cab` (link / brand-base-40), `#014486` (hover / brand-base-30), `#1b96ff` (brand-base-60 / accent), `#032d60` (brand-base-20). Measured in the CSS:

| Brand value | Declarations behind a hook | Hard-coded declarations |
|---|---|---|
| `#0176d3` | 184 | 70 |
| `#0b5cab` | 13 | 13 |
| `#014486` | 28 | 59 |
| `#1b96ff` | 158 | 35 |
| `#032d60` | 44 | 17 |

**Hooks that do change brand surfaces** (verified by reading the rules):

| Surface | Hook chain (first one wins) |
|---|---|
| Brand button background / border / text | `--slds-c-button-brand-color-background`, `--slds-c-button-brand-color-border`, `--slds-c-button-brand-text-color` (+ `-hover`, `-active` variants) |
| Neutral/base button text colour | `--slds-c-button-text-color` (+ `-hover`, `-active`); fallback is hard-coded `rgb(1,118,211)` |
| Outline-brand button | `--slds-c-button-outline-brand-*` |
| Checkbox check mark | `--slds-c-checkbox-mark-color-foreground` |
| Toggle checked | `--slds-c-checkbox-toggle-color-background-checked`, `…-border-checked` |
| Radio mark | `--slds-c-radio-mark-color-foreground` |
| Default tabs active / hover underline | `--slds-c-tabs-item-color-border-active`, `--slds-c-tabs-item-color-border-hover` |
| Dropdown menu item text | `--slds-c-dropdown-item-color` |
| Brand palette used by a few rules | `--slds-g-color-brand-base-10…95`, `--slds-g-color-accent-1/2/3`, `--slds-g-color-border-brand-1/2` |
| Link colour (only where SLDS reads it) | `--slds-g-link-color`, `--slds-g-link-color-hover`, `--slds-g-link-color-focus`, `--slds-g-link-color-active` |
| Focus rings | `--slds-g-shadow-outset-focus-1`, `--slds-g-shadow-inset-focus-1`, `--slds-g-shadow-outline-focus-1` (Figma keeps these **blue** — do not override) |

**Brand-blue rules with NO hook** (relevant to our inventory):

| Rule | Hard-coded value |
|---|---|
| `a`, `a:hover`, `a:focus`, `a:active`, `.slds-text-link` | `rgb(11,92,171)` / `rgb(1,68,134)` |
| `.slds-button_icon-brand` (+ hover/active) | `rgb(1,118,211)` / `rgb(1,68,134)` |
| `.slds-context-bar` border-bottom; `.slds-context-bar__item.slds-is-active:before` | `rgb(27,150,255)` |
| `.slds-sub-tabs__item.slds-active` background | `rgba(21,137,238,0.1)` |
| `.slds-split-view__list-item-action[aria-selected=true]` / `[aria-current=page]` | inset `rgb(1,118,211)` |
| `.slds-utility-bar__action.slds-is-active:after` | `rgb(27,150,255)` |
| `.slds-datepicker … .slds-is-selected > .slds-day` | `rgb(1,118,211)` |
| `.slds-listbox__option.slds-is-selected .slds-listbox__option-icon`, `.slds-listbox__icon-selected` | `rgb(1,118,211)` |
| `.slds-dueling-list__options [aria-selected=true]` | `rgb(1,118,211)` |
| `.slds-vertical-tabs__nav-item.slds-is-active` | `rgb(11,92,171)` |
| `.slds-path__*` current/active | `rgb(1,118,211)` / `rgb(1,68,134)` |
| `html` page background | `rgb(238,244,255)` |

Conclusion: **hooks alone cannot apply the ArmadaCare brand to links, the console context bar, sub-tabs, split view selection, the icon-brand button, datepicker/listbox selection, or the page background.** See `compat-report.md` § Open questions Q1.

### Icon SVG locations (`assets/icons/`)

| Folder | Files | Notes |
|---|---|---|
| `utility/` | 2,370 | Individual SVGs, `viewBox="0 0 520 520"`, monochrome |
| `standard/` | 1,938 | SVG + `_60.png` / `_120.png`; background colour comes from `.slds-icon-standard-*` classes |
| `action/` | 561 | |
| `custom/` | 339 | Background colour from `.slds-icon-custom-customN` |
| `doctype/` | 141 | |
| `*-sprite/` | 1 sprite each | `svg/symbols.svg` — not used (would need static file serving) |

Images (`assets/images/`): `einstein-headers/einstein-figure.svg`, `einstein-header-background.svg`, `illustrations/empty-state-{assistant,events,tasks}.svg`, avatars, spinners, themes, welcome-mat. **No fonts folder.**

### Font family

```
--slds-g-font-family-base: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                           'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
html { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, … ; font-size: 100% }
body { font-size: 0.8125rem }   /* 13px */
--slds-g-font-family-monospace: Consolas, Menlo, Monaco, Courier, monospace
```

SLDS 2.264.3 uses the **system font stack**; it does not ship Salesforce Sans.
