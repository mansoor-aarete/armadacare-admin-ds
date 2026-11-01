# Modal

SLDS blueprint: **Modals** — `section.slds-modal.slds-fade-in-open(.slds-modal_small|_medium|_large)[role=dialog][aria-modal]` › `div.slds-modal__container` › close `button.slds-modal__close` (outside, white square) › `div.slds-modal__header` › `h1.slds-modal__title` › `div.slds-modal__content` › `div.slds-modal__footer` + `div.slds-backdrop.slds-backdrop_open`.
File: `src/app/components/overlays/Modal.tsx`.

## Props — `ModalProps`
`open`, `heading?`, `tagline?`, `headless?`, `children`, `footer?: ReactNode`, `onClose`, `size?: "default" | "small" | "medium" | "large"` (default = 40rem, Figma Delete Claim / Share), `hideClose?`, `bodyPadding?` (default true).

Behaviour: focus moves into the modal, Tab is trapped, Escape closes, focus returns on close.
