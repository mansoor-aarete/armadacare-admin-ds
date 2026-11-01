#!/usr/bin/env node
/**
 * Generates src/app/components/icons/registry.ts from the installed SLDS package.
 *
 * Dev-only script (uses Node fs). Figma Make never runs it — the generated file is committed.
 * Path data is copied VERBATIM (icons are CC BY-ND 4.0 — no derivatives). Only the root <svg>
 * element is replaced; its inner markup is kept byte-for-byte.
 *
 * Only icons listed in docs/inventory.md are included. To add one: add it to ICONS below
 * (with the Figma evidence), run `npm run icons`, then `npm run verify`.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pkgDir = path.join(root, 'node_modules', '@salesforce-ux', 'design-system');
const iconsDir = path.join(pkgDir, 'assets', 'icons');
const cssPath = path.join(pkgDir, 'assets', 'styles', 'salesforce-lightning-design-system.css');
const outFile = path.join(root, 'src', 'app', 'components', 'icons', 'registry.ts');
const pkgVersion = JSON.parse(fs.readFileSync(path.join(pkgDir, 'package.json'), 'utf8')).version;

/** [sprite, name, evidence]. Evidence: "figma" = glyph compared against the Figma vector export;
 *  "colour" = object-icon background colour matched exactly in Figma; "blueprint" = required by the
 *  SLDS blueprint of an inventory component (glyph lost or not visible in the capture);
 *  "nearest" = nearest SLDS icon by Figma colour and meaning (org uses a custom image) — listed in KD4. */
const ICONS = [
  // Console shell / global header
  ['utility', 'rows', 'figma'],
  ['utility', 'dx_org_dev', 'figma'],
  ['utility', 'down', 'figma'],
  ['utility', 'search', 'figma'],
  ['utility', 'favorite', 'figma'],
  ['utility', 'add', 'figma'],
  ['utility', 'question', 'figma'],
  ['utility', 'setup', 'figma'],
  ['utility', 'notification', 'figma'],
  ['utility', 'chevrondown', 'figma'],
  ['utility', 'close', 'figma'],
  ['utility', 'omni_channel', 'blueprint'],
  // List views / toolbars
  ['utility', 'pin', 'figma'],
  ['utility', 'settings', 'figma'],
  ['utility', 'table', 'figma'],
  ['utility', 'side_list', 'figma'],
  ['utility', 'refresh', 'figma'],
  ['utility', 'sort', 'figma'],
  ['utility', 'edit', 'figma'],
  ['utility', 'chart', 'figma'],
  ['utility', 'filterList', 'figma'],
  ['utility', 'arrowup', 'blueprint'],
  ['utility', 'arrowdown', 'blueprint'],
  ['utility', 'left', 'blueprint'],
  ['utility', 'right', 'blueprint'],
  // Record pages / forms
  ['utility', 'hierarchy', 'figma'],
  ['utility', 'info', 'figma'],
  ['utility', 'check', 'figma'],
  ['utility', 'error', 'figma'],
  ['utility', 'change_owner', 'blueprint'],
  ['utility', 'switch', 'blueprint'],
  ['utility', 'chevronright', 'blueprint'],
  ['utility', 'event', 'figma'], // datepicker calendar button (Figma glyph = utility:event, not date_input)
  ['utility', 'upload', 'blueprint'],
  ['utility', 'lock', 'blueprint'],
  // Docked composer + rich text editor
  ['utility', 'minimize_window', 'blueprint'],
  ['utility', 'expand_alt', 'blueprint'],
  ['utility', 'bold', 'blueprint'],
  ['utility', 'italic', 'blueprint'],
  ['utility', 'underline', 'blueprint'],
  ['utility', 'strikethrough', 'blueprint'],
  ['utility', 'richtextbulletedlist', 'blueprint'],
  ['utility', 'richtextnumberedlist', 'blueprint'],
  ['utility', 'richtextindent', 'blueprint'],
  ['utility', 'richtextoutdent', 'blueprint'],
  ['utility', 'image', 'blueprint'],
  // Object icons (standard)
  ['standard', 'account', 'colour'],
  ['standard', 'contact', 'colour'],
  ['standard', 'case', 'colour'],
  ['standard', 'opportunity', 'colour'],
  ['standard', 'team_member', 'colour'],
  ['standard', 'merge', 'figma'],
  ['standard', 'note', 'colour'],
  ['standard', 'file', 'colour'],
  ['standard', 'report', 'colour'],
  ['standard', 'folder', 'colour'],
  ['standard', 'user', 'blueprint'],
  // Nearest SLDS icons for org icons with no exact SLDS match (docs/known-differences.md KD4)
  ['standard', 'custom', 'figma'], // wrench image used by Bank Accounts, Member Documents, Notifications, DocuSign Status, Open Activities, Activity History
  ['standard', 'event', 'colour'], // Account Activity (#cb65ff)
  ['standard', 'metrics', 'colour'], // Accumulator Balances (#1b96ff, bar chart)
  ['standard', 'document', 'colour'], // Receipt / Documentation (#939393)
  // Object icons (custom objects of this org — matched by exact background colour)
  ['custom', 'custom12', 'colour'],
  ['custom', 'custom15', 'colour'],
  ['custom', 'custom16', 'colour'],
  ['custom', 'custom18', 'colour'],
  ['custom', 'custom40', 'colour'],
  ['custom', 'custom41', 'colour'],
  ['custom', 'custom51', 'colour'],
  ['custom', 'custom58', 'colour'],
  ['custom', 'custom66', 'colour'],
  ['custom', 'custom68', 'colour'],
  ['custom', 'custom70', 'colour'],
  // ds-v1.1 (pages audit, M5) — evidence "nearest": SLDS icon picked by Figma colour + meaning (docs/known-differences.md KD4)
  ['utility', 'clock', 'blueprint'], // Timepicker (SLDS Timepicker blueprint)
  ['utility', 'warning', 'blueprint'], // ScopedNotification warning (SLDS Scoped Notifications blueprint)
  ['utility', 'success', 'blueprint'], // ScopedNotification success
  ['utility', 'bookmark', 'nearest'], // Accounts Intelligence View filter bar (D1)
  ['utility', 'change_record_type', 'nearest'], // Account Record Type field action (A4 / A9)
  ['standard', 'account_info', 'nearest'], // "Account History" quick link — Figma #5868e8 = SLDS #5867e8
  ['standard', 'currency', 'nearest'], // "Payment & Repayment History" card — Figma grey money glyph (#939393)
];

const css = fs.readFileSync(cssPath, 'utf8');
const cssHasClass = (cls) => new RegExp(`\\.${cls}(?![\\w-])`).test(css);

const errors = [];
const entries = [];
for (const [sprite, name, evidence] of ICONS) {
  const file = path.join(iconsDir, sprite, `${name}.svg`);
  if (!fs.existsSync(file)) { errors.push(`missing file ${sprite}/${name}.svg`); continue; }
  const svg = fs.readFileSync(file, 'utf8').trim();
  const open = svg.match(/^<svg\b[^>]*>/);
  const viewBox = open && open[0].match(/viewBox="([^"]+)"/);
  if (!open || !viewBox || !svg.endsWith('</svg>')) { errors.push(`unexpected SVG structure: ${sprite}/${name}`); continue; }
  const body = svg.slice(open[0].length, -'</svg>'.length);
  // Colour must come from SLDS classes, never from the SVG itself.
  if (/(fill|stroke|style|color)\s*=|#[0-9a-f]{3,8}\b|rgb\(/i.test(body)) errors.push(`${sprite}/${name} carries its own colour/style — not allowed`);
  // Container class (blueprint): standard/custom icons need their background class to exist in the CSS.
  let containerClass;
  if (sprite === 'utility') containerClass = `slds-icon-utility-${name}`; // blueprint uses the raw symbol; markup-only (allowlisted pattern)
  else {
    containerClass = `slds-icon-${sprite}-${name.replace(/_/g, '-')}`;
    if (!cssHasClass(containerClass)) errors.push(`${containerClass} not in installed CSS`);
  }
  entries.push({ id: `${sprite}:${name}`, sprite, viewBox: viewBox[1], body, containerClass, evidence });
}
if (errors.length) { console.error('build-icons FAILED:\n  ' + errors.join('\n  ')); process.exit(1); }

const q = (s) => JSON.stringify(s);
const out = `// GENERATED by scripts/build-icons.mjs from @salesforce-ux/design-system@${pkgVersion} — DO NOT EDIT.
// Icons and path data © Salesforce, licensed CC BY-ND 4.0 (https://creativecommons.org/licenses/by-nd/4.0/).
// SVG inner markup is copied verbatim; only the root <svg> element is re-created by IconSvg.
// To add an icon: edit ICONS in scripts/build-icons.mjs, then run \`npm run icons\`.

export type IconSprite = "utility" | "standard" | "custom";

export type IconName =
${entries.map((e) => `  | ${q(e.id)}`).join('\n')};

export interface IconDefinition {
  sprite: IconSprite;
  viewBox: string;
  /** Verbatim inner SVG markup from the SLDS package. */
  body: string;
  /** Blueprint container class: background colour for standard/custom icons. */
  containerClass: string;
}

export const ICONS: Record<IconName, IconDefinition> = {
${entries.map((e) => `  ${q(e.id)}: { sprite: ${q(e.sprite)}, viewBox: ${q(e.viewBox)}, containerClass: ${q(e.containerClass)}, body: ${q(e.body)} },`).join('\n')}
};

export const ICON_NAMES = Object.keys(ICONS) as IconName[];
`;
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, out);
const counts = entries.reduce((a, e) => ((a[e.sprite] = (a[e.sprite] || 0) + 1), a), {});
console.log(`build-icons: wrote ${entries.length} icons (${JSON.stringify(counts)}) → ${path.relative(root, outFile)} (${fs.statSync(outFile).size} bytes)`);
