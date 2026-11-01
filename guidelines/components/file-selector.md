# FileSelector

SLDS blueprint: **File Selector** — `div.slds-form-element[role=group]` › label › `div.slds-file-selector(.slds-file-selector_files|_images)` › `div.slds-file-selector__dropzone(.slds-has-drag-over)` › `input.slds-file-selector__input.slds-assistive-text[type=file]` + `label.slds-file-selector__body` (`slds-file-selector__button` neutral button with upload icon, `slds-file-selector__text`).
File: `src/app/components/forms/FileSelector.tsx`.

## Props — `FileSelectorProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `label` | `string` | — | omit inside a Files card |
| `variant` | `"files" \| "area" \| "images"` | `"files"` | `area` = full-width drop area, button above the hint (Figma Files list; SLDS images layout) |
| `onFiles` | `(files: File[]) => void` | — | from the picker or a drop |
| `accept`, `multiple` (default true), `disabled`, `error` | | | |
| `buttonLabel`, `dropLabel` | `string` | "Upload Files" / "or Drop Files" | Figma: "Or drop files" |

Drag-over state adds `slds-has-drag-over` (SLDS blue focus glow — a focus-like state, kept).
