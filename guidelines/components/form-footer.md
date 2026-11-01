# FormFooter · ErrorPopover

SLDS blueprints: **Docked Form Footer** (`div.slds-docked-form-footer` with optional `slds-button_icon-error` button and error popover) and **Popover — error** ("We hit a snag.").
Files: `src/app/components/forms/FormFooter.tsx`, `src/app/components/overlays/ErrorPopover.tsx`.

## `FormFooterProps`
`actions: { value; label; variant?; disabled? }[]` (Figma: Cancel, Save & New, Save[brand]), `onAction(value)`, `hasErrors?`, `onErrorClick?`, `errorPopover?: ReactNode`, `position?: "fixed" | "inline"`.

## `ErrorPopoverProps`
`fields: { label; onClick?; href? }[]`, `heading?` ("We hit a snag."), `intro?` ("Review the following fields"), `messages?: string[]`, `onClose`, `nubbin?` (default bottom).
