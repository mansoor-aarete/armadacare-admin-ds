# Setup

## Stack (pinned exactly — never use `^`)
| Package | Version | Why |
|---|---|---|
| `@salesforce-ux/design-system` | 2.264.3 | SLDS 1 CSS + icons |
| `react`, `react-dom` | 18.3.1 | as in the Figma Make template (peer + dev dependency) |
| `react-router` | 7.13.0 | `/showcase` route (same as the Make template) |
| `vite` | 6.3.5 | Make template |
| `@vitejs/plugin-react` | 4.7.0 | required by Make |
| `tailwindcss`, `@tailwindcss/vite` | 4.1.12 | **only** because Make's `vite.config.ts` loads the plugin — no Tailwind CSS is ever imported |
| `typescript` | 5.9.3 | |
| `@types/react` / `@types/react-dom` / `@types/node` | 18.3.31 / 18.3.7 / 22.20.5 | `@types/node` is needed because the Make `tsconfig.json` sets `"types": ["node"]` |

## How CSS loads
`src/main.tsx`:
```ts
import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css"; // 1. SLDS
import "./styles/index.css";                                                                    // 2. theme
import App from "./app/App.tsx";
```
`src/styles/index.css` only contains `@import './slds-theme.css';`. The theme must load **after** SLDS so its rules win.

## Tailwind and Preflight — exact procedure

**Rule:** the design system does not use Tailwind, and Tailwind's global reset (Preflight) must never load alongside SLDS. Preflight sets `svg { display: block }`, `* { border: 0 solid }`, resets headings and buttons, and breaks SLDS icons, buttons and typography.

Figma Make needs the Tailwind **Vite plugin** to exist, so:

1. **Keep** `vite.config.ts` exactly as Make ships it (React + Tailwind plugins, `figmaAssetResolver`, `@` alias). Do not edit it.
2. **Keep** `tailwindcss` and `@tailwindcss/vite` in `devDependencies` — the config imports the plugin.
3. **Never import Tailwind CSS.** The plugin only acts on CSS files that contain `@import 'tailwindcss'` / `@tailwind`. With no such file, it outputs nothing (verified: 0 `--tw-` variables and no Preflight rule in the production CSS).
4. **When copying into a Figma Make file that already has its own template files:**
   - Delete `src/styles/tailwind.css` (or empty it) and `src/styles/theme.css` / `fonts.css` if present.
   - Make sure `src/styles/index.css` contains **only** `@import './slds-theme.css';` — remove any `@import 'tailwindcss'`, `@import './tailwind.css'`, `@import 'tw-animate-css'` lines.
   - Make sure `src/main.tsx` is this project's version (SLDS CSS import first).
   - Remove template UI kits from `package.json` if Make re-adds them (shadcn/Radix/MUI are not used).
5. **Check:** open `/showcase` → *Environment checks* → "Tailwind Preflight NOT loaded" must be **PASS** (it tests that a bare `<svg>` is `inline` and a bare `<div>` has `border-style: none`).
6. **Tell Make's AI:** never add Tailwind classes or `@import 'tailwindcss'`; `npm run verify` fails if anyone does.

## Scripts
| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | production build |
| `npm run typecheck` | `tsc --noEmit -p tsconfig.app.json` (strict, `src/` only — see note) |
| `npm run verify` | `scripts/verify-slds.mjs` guard rails |
| `npm run icons` | regenerate `src/app/components/icons/registry.ts` from the SLDS package |

Note: a bare `tsc --noEmit` (root `tsconfig.json`) reports one error in `vite.config.ts` (`resolveId(id)` implicit `any`). That file must stay identical to the Make template, so it is excluded from the app typecheck via `tsconfig.app.json`, which extends the Make tsconfig unchanged.

## Not part of the Make project
- `tools/visual/` — local Playwright screenshot + pixel-diff tooling with its own `package.json`. Do not copy it into Make.
- `scripts/` — dev-only Node scripts (Make never runs them; generated files are committed).

## Figma Make import checklist
Copy: `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `postcss.config.mjs`, `pnpm-workspace.yaml`, `src/`, `guidelines/`, `ATTRIBUTIONS.md`. Optional: `docs/`, `scripts/`. Never: `node_modules/`, `dist/`, `tools/`.
Then open the preview at `/showcase` and confirm every Environment check is PASS.
