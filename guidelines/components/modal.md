# Modal

SLDS blueprint: **Modals** — `section.slds-modal.slds-fade-in-open(.slds-modal_small|_medium|_large)[role=dialog][aria-modal]` › `div.slds-modal__container` › close `button.slds-modal__close` (outside, white square) › `div.slds-modal__header` › `h1.slds-modal__title` › `div.slds-modal__content` › `div.slds-modal__footer` + `div.slds-backdrop.slds-backdrop_open`.
File: `src/app/components/overlays/Modal.tsx`.

## Props — `ModalProps`
`open`, `heading?`, `tagline?`, `headless?`, `children`, `footer?: ReactNode`, `onClose`, `size?: "default" | "small" | "medium" | "large"` (default = 40rem, Figma Delete Claim / Share), `hideClose?`, `bodyPadding?` (default true), `inline?` (ds-v1.2).

Behaviour: focus moves into the modal, Tab is trapped, Escape closes, focus returns on close.

## Inline mode (ds-v1.2)
`inline` renders the same panel inside the page, as Lightning console tabs show record create / edit forms and the record-type picker (Figma "New Account: Group", "New Account"):
`div.slds-template__container(.slds-modal_<size>)` › `section.slds-modal__container.slds-p-top_small.slds-p-bottom_none` › header › `div.slds-modal__content.slds-grow` › footer.
- No `section.slds-modal`, backdrop, close button, focus trap or Escape handling (it is page content, not a dialog).
- Fills the height of its parent (give the parent a height — the console workspace does); the body grows and scrolls, the footer stays at the bottom.
- `footer` is rendered as-is, without `.slds-modal__footer` — pass `<FormFooter position="inline" />` (centered Cancel / Save & New / Save, error button and "We hit a snag." popover, as in Figma).
- Title uses `slds-text-heading_medium` (`.slds-modal__title` is only sized inside `.slds-modal`).
- Width = the SLDS modal container width for `size` (default 50%, max 40rem). Figma's panel is 734 px — see known-differences.
