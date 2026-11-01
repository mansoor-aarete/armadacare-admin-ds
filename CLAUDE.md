# ArmadaCare Admin Portal — design system (SLDS 1) · v1.5

**Read `guidelines/Guidelines.md` first.** It is the source of truth: hard rules, file index, source layout and the checks to run. Component APIs are in `guidelines/components/overview-components.md` (one row per component) and `guidelines/components/<component-name>.md` (one file per component). Colour rules and every theme override: `guidelines/foundations/color.md`. Intentional differences from Figma: `docs/known-differences.md`.

## Rules (summary — the full list is in Guidelines.md)
1. **Reuse before create.** Use an existing component; if it can't do the job, extend it with a prop. Never duplicate or fork one. New components only when nothing in the registry fits — then add its `.md`, a registry row and showcase examples.
2. **SLDS only.** SLDS 1 blueprint markup from `@salesforce-ux/design-system` 2.264.3: same elements, classes and ARIA. Only `slds-*` classes that exist in the installed CSS (blueprint markup-only classes go through `scripts/slds-markup-only.json`). No Tailwind, no other UI kits, no invented classes.
3. **No hex outside the theme file.** No hex, `rgb()`, `hsl()` or `px` in components. Colours come from SLDS classes and verified hooks; brand values are defined once in `src/styles/slds-theme.css` (`@brand-tokens` block, block A hooks, block B / C overrides).
4. **Config-driven.** Components are generic; pages pass content and behaviour through props and config arrays (`items`, `columns`, `options`, `tabs`, `actions`, `details` …). Nothing object-specific inside `src/app/components`.
5. **Verify before done.** Never claim a change is finished until these pass:
   - `npm run verify` — SLDS class / colour / hook / Tailwind checks
   - `npm run typecheck` — 0 errors
   - `/showcase` (`npm run dev` → http://localhost:5173/showcase) — the new state is shown and the Environment checks panel is all PASS
   - for visual changes: `tools/visual` capture + `compare-components.mjs` against the Figma references

Also: client-side React only, relative imports, strict TypeScript without `any`, one component per file with an exported `XxxProps` type, union string types for variants, `assistiveText` on every icon-only control.
