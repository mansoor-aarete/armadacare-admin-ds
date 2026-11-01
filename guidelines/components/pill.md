# Pill · PillContainer

SLDS blueprint: **Pills** — `span.slds-pill(.slds-pill_link)` › `span.slds-pill__icon_container` (object icon or avatar) › `a.slds-pill__action › span.slds-pill__label` (link) or `span.slds-pill__label` › `button.slds-pill__remove`; container `div.slds-pill_container`.
Files: `src/app/components/feedback/Pill.tsx`, `src/app/components/feedback/PillContainer.tsx`.

## `PillProps`
`label`, `href?` / `onClick?` (link pill — Figma "Related to: Antoinette Mitcham"), `iconName?: ObjectIconName`, `avatar?: AvatarContent`, `onRemove?` (shows ✕), `error?`.

## `PillContainerProps`
`children` (pills), `label?` (group name).
