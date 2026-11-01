# HelpText

SLDS blueprint: **Help Text** (tooltip "learn more" pattern) — `div.slds-form-element__icon` › `button.slds-button.slds-button_icon[aria-describedby]` (`utility:info`) › Tooltip (`nubbin="bottom-left"`) above the icon.
File: `src/app/components/overlays/HelpText.tsx`. FormElement renders it for `fieldLevelHelp`.

## Props — `HelpTextProps`
`content: string` (tooltip text), `assistiveText?: string` (default "Help"), `defaultOpen?: boolean`.
Opens on hover and keyboard focus; closes on leave / blur / Escape.
