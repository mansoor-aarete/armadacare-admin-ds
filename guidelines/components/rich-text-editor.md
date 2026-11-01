# RichTextEditor

SLDS blueprint: **Rich Text Editor** — form element › `div.slds-rich-text-editor.slds-grid.slds-grid_vertical.slds-nowrap(.slds-has-focus)` › `div.slds-rich-text-editor__toolbar[role=toolbar]` (button-group lists: format text, format body, insert content) › `div.slds-rich-text-editor__textarea` › `div.slds-rich-text-area__content[contenteditable]`.
File: `src/app/components/forms/RichTextEditor.tsx`.

## Props — `RichTextEditorProps`
`label`, `hideLabel?`, `defaultValue?` (HTML, uncontrolled), `onChange?(html)`, `placeholder?`, `onInsertImage?` (shows the image button — Figma composer), `disabled?`, `error?`, `fill?` (grow inside a flex column, e.g. the docked composer).

Toolbar: Bold, Italic, Underline, Strike Through · Bulleted / Numbered List, Indent, Outdent (browser editing commands, client-side only).
