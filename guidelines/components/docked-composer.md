# DockedComposer

SLDS blueprint: **Docked Composer** — `div.slds-docked_container` › `section.slds-docked-composer(.slds-is-open|.slds-is-closed)(.slds-has-focus)[role=dialog]` › `header.slds-docked-composer__header` (grey object glyph, title, minimise / expand / close) › `div.slds-docked-composer__body` › `footer.slds-docked-composer__footer`.
File: `src/app/components/overlays/DockedComposer.tsx`.

## Props — `DockedComposerProps`
`title`, `iconName: ObjectIconName`, `minimized?`, `focused?`, `onMinimize?`, `onExpand?`, `onClose?`, `children` (body), `footer?`, `position?: "fixed" | "inline"` (SLDS docks it to the viewport bottom right; inline for the showcase).

Figma C5 note composer = DockedComposer + Input (Title) + "Visibility Set by Record" + RichTextEditor (`fill`) + "Related to" Pill; footer Delete · Share · Add to Records · Done. Header underline olive base (block B).
