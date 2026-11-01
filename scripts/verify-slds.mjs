#!/usr/bin/env node
/**
 * verify-slds — design-system guard rails. Exit code 1 on any violation.
 *
 *  1. Every slds-* class used in src/ exists in the installed SLDS CSS, or is allowlisted
 *     (scripts/slds-markup-only.json — blueprint markup-only classes).
 *  2. No class names are built dynamically (`slds-icon-${x}`), so (1) can see every class.
 *  3. className literals contain only slds-* classes (catches Tailwind / invented classes).
 *  4. No hex, rgb()/rgba()/hsl() or px values in .ts/.tsx files.
 *  5. CSS: hex / rgb() only inside the @brand-tokens block of src/styles/slds-theme.css;
 *     px only in slds-theme.css (box-shadow geometry copied from SLDS); every --slds-* hook the
 *     theme sets must be read somewhere in the SLDS CSS (verified hooks only).
 *  6. Tailwind (incl. Preflight) is never imported.
 *
 * Dev-only (Node fs). Figma Make never runs it.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rel = (p) => path.relative(root, p).replace(/\\/g, '/');
const cssPath = path.join(root, 'node_modules', '@salesforce-ux', 'design-system', 'assets', 'styles', 'salesforce-lightning-design-system.css');
const THEME = 'src/styles/slds-theme.css';

const sldsCss = fs.readFileSync(cssPath, 'utf8');
const sldsClasses = new Set([...sldsCss.matchAll(/\.(slds-[A-Za-z0-9_-]+)/g)].map((m) => m[1]));
const sldsHookReads = new Set([...sldsCss.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)].map((m) => m[1]));

const allow = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'slds-markup-only.json'), 'utf8'));
const allowedClasses = new Set(Object.keys(allow.classes));
// Pattern entries: concrete values come from the generated icon registry.
const registry = fs.readFileSync(path.join(root, 'src', 'app', 'components', 'icons', 'registry.ts'), 'utf8');
const registryUtilityClasses = new Set([...registry.matchAll(/containerClass: "(slds-icon-utility-[A-Za-z0-9_-]+)"/g)].map((m) => m[1]));
for (const p of allow.patterns) {
  if (p.prefix === 'slds-icon-utility-') for (const c of registryUtilityClasses) allowedClasses.add(c);
}

const errors = [];
const warnings = [];
const usedAllowlisted = new Set();
const err = (file, line, msg) => errors.push(`${file}:${line}  ${msg}`);
const lineOf = (text, idx) => text.slice(0, idx).split('\n').length;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}
const files = walk(path.join(root, 'src'));

function checkClass(file, text, idx, cls) {
  if (sldsClasses.has(cls)) return;
  if (allowedClasses.has(cls)) { usedAllowlisted.add(cls); return; }
  err(file, lineOf(text, idx), `unknown class "${cls}" (not in SLDS 2.264.3 CSS, not allowlisted)`);
}

for (const abs of files) {
  const file = rel(abs);
  const text = fs.readFileSync(abs, 'utf8');
  const ext = path.extname(abs);

  if (ext === '.ts' || ext === '.tsx') {
    // 1 + 2: every slds-* token (not CSS custom properties like --slds-g-…)
    for (const m of text.matchAll(/(?<![\w-])slds-[A-Za-z0-9_-]*/g)) {
      const tok = m[0];
      const next = text[m.index + tok.length];
      if (/[-_]$/.test(tok) || next === '$') { err(file, lineOf(text, m.index), `dynamic class construction "${tok}…" — use complete class names`); continue; }
      checkClass(file, text, m.index, tok);
    }
    // 3: className literals may only contain slds-* classes
    const literalRes = [/className="([^"]*)"/g, /className=\{"([^"]*)"\}/g, /className=\{`([^`$]*)`\}/g];
    for (const re of literalRes) {
      for (const m of text.matchAll(re)) {
        for (const tok of m[1].split(/\s+/).filter(Boolean)) {
          if (!tok.startsWith('slds-')) err(file, lineOf(text, m.index), `non-SLDS class "${tok}" in className`);
        }
      }
    }
    for (const m of text.matchAll(/\bcx\(([^)]*)\)/g)) {
      for (const s of m[1].matchAll(/"([^"]*)"/g)) {
        if (/(===|!==|==|!=)\s*$/.test(m[1].slice(0, s.index))) continue; // comparison operand, not a class
        for (const tok of s[1].split(/\s+/).filter(Boolean)) {
          if (!tok.startsWith('slds-')) err(file, lineOf(text, m.index), `non-SLDS class "${tok}" passed to cx()`);
        }
      }
    }
    // 4: no hex / rgb / px in TS
    for (const m of text.matchAll(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])/g)) err(file, lineOf(text, m.index), `hex colour "${m[0]}"`);
    for (const m of text.matchAll(/\b(?:rgba?|hsla?)\(/g)) err(file, lineOf(text, m.index), `colour function "${m[0]}"`);
    for (const m of text.matchAll(/(?<![\w.])\d*\.?\d+px\b/g)) err(file, lineOf(text, m.index), `px value "${m[0]}"`);
    // 6
    if (/['"]tailwindcss|tailwind\.css/.test(text)) err(file, 1, 'imports Tailwind');
  }

  if (ext === '.css') {
    const noComments = text.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));
    // 1: selector classes
    for (const m of noComments.matchAll(/\.(slds-[A-Za-z0-9_-]+)/g)) checkClass(file, noComments, m.index, m[1]);
    // 5: colours / px
    let start = -1;
    let end = -1;
    if (file === THEME) {
      start = text.indexOf('@brand-tokens:start');
      end = text.indexOf('@brand-tokens:end');
      if (start < 0 || end < start) err(file, 1, 'missing @brand-tokens:start/end markers');
    }
    for (const m of noComments.matchAll(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])|\b(?:rgba?|hsla?)\(/g)) {
      if (!(m.index > start && m.index < end)) err(file, lineOf(text, m.index), `colour value "${m[0]}" outside the @brand-tokens block`);
    }
    if (file !== THEME) for (const m of noComments.matchAll(/(?<![\w.])\d*\.?\d+px\b/g)) err(file, lineOf(text, m.index), `px value "${m[0]}"`);
    // 5: hooks set by the theme must be read by SLDS
    for (const m of noComments.matchAll(/(--slds-[A-Za-z0-9_-]+)\s*:/g)) {
      if (!sldsHookReads.has(m[1])) err(file, lineOf(text, m.index), `hook "${m[1]}" is not read anywhere in the SLDS CSS (unverified hook)`);
    }
    // 6
    if (/@import\s+['"]tailwindcss|@tailwind\b|tailwindcss\/preflight/.test(noComments)) err(file, 1, 'imports Tailwind / Preflight');
  }
}

// 6: index.html must not pull Tailwind either
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (/tailwind/i.test(indexHtml)) err('index.html', 1, 'references Tailwind');

for (const c of Object.keys(allow.classes)) {
  if (sldsClasses.has(c)) warnings.push(`allowlist: "${c}" now exists in the CSS — remove it from slds-markup-only.json`);
  if (!usedAllowlisted.has(c)) warnings.push(`allowlist: "${c}" is not used anywhere`);
}

const stats = `${files.length} files scanned · ${sldsClasses.size} SLDS classes known · ${allowedClasses.size} allowlisted (${usedAllowlisted.size} used)`;
for (const w of warnings) console.warn('WARN  ' + w);
if (errors.length) {
  console.error(`verify-slds FAILED — ${errors.length} problem(s)\n  ` + errors.join('\n  ') + `\n${stats}`);
  process.exit(1);
}
console.log(`verify-slds OK — ${stats}`);
