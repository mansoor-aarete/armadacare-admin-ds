# ErrorPopover

SLDS blueprint: **Popovers — error** — `section.slds-popover.slds-popover_error.slds-nubbin_bottom[role=dialog]` › close button › `header.slds-popover__header` (error icon + "We hit a snag.") › body: intro + `ul.slds-list_dotted` of field links.
File: `src/app/components/overlays/ErrorPopover.tsx`. Built on Popover; FormFooter positions it above its error button.

## Props — `ErrorPopoverProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `fields` | `{ label; onClick?; href? }[]` | — | fields to review (links jump to them) |
| `heading?` | `string` | "We hit a snag." | |
| `intro?` | `string` | "Review the following fields" | |
| `messages?` | `string[]` | `[]` | page-level errors |
| `onClose` | `() => void` | — | |
| `nubbin?` | `TooltipNubbin` | `"bottom"` | |
