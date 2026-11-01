# UtilityBar

SLDS blueprint: **Docked Utility Bar** — `footer.slds-utility-bar_container` › `ul.slds-utility-bar` › `li.slds-utility-bar__item` › `button.slds-utility-bar__action(.slds-is-active)[aria-pressed]` › icon + `span.slds-utility-bar__text`.
File: `src/app/components/shell/UtilityBar.tsx`.

## Props — `UtilityBarProps`
`items: { id; label; iconName: UtilityIconName; status? ("Online"); notification?; poppedOut? }[]`, `activeId?`, `onSelect(id)`, `panel?: ReactNode` (open utility panel), `position?: "fixed" | "inline"` (default fixed — SLDS pins the bar to the viewport bottom).

Active / hover state is the olive tint (block B, **derived**).
