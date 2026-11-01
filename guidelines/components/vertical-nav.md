# VerticalNav

SLDS blueprint: **Vertical Navigation** — `nav.slds-nav-vertical(.slds-nav-vertical_shade|_compact)` › `div.slds-nav-vertical__section` › `h2.slds-nav-vertical__title` › `ul` › `li.slds-nav-vertical__item(.slds-is-active)` › `a.slds-nav-vertical__action[aria-current]`.
File: `src/app/components/navigation/VerticalNav.tsx`.

## Props — `VerticalNavProps`
`label`, `sections: { id; title; items: { id; label; href? }[] }[]`, `activeId`, `onSelect(id)`, `shaded?`, `compact?`, `capsTitles?` (default true — Figma Reports caps titles).
Active item: olive tint, bold, **no left bar** (Figma R1 — theme block B removes the SLDS bar; keyboard focus keeps the SLDS focus ring).
