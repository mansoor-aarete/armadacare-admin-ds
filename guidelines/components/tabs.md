# Tabs

SLDS blueprint: **Tabs (default)** — `div.slds-tabs_default(.slds-tabs_medium|_large)(.slds-tabs_card)` › `ul.slds-tabs_default__nav[role=tablist]` › `li.slds-tabs_default__item(.slds-is-active)` › `a.slds-tabs_default__link[role=tab]` + `div.slds-tabs_default__content[role=tabpanel]`.
File: `src/app/components/layout/Tabs.tsx`.

## Props — `TabsProps`
`items: { id; label; content }[]`, `activeId`, `onSelect(id)`, `size?: "default" | "medium" | "large"` (record tabs = medium), `card?`.
Keyboard: ←/→, Home/End move and select. Active underline olive base (hook).
