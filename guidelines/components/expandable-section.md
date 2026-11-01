# ExpandableSection

SLDS blueprint: **Expandable Section** — `div.slds-section(.slds-is-open)` › `h3.slds-section__title` › `button.slds-section__title-action[aria-expanded]` (`utility:switch`) › `div.slds-section__content[hidden]`; non-collapsible: `h3.slds-section__title.slds-theme_shade › span`.
File: `src/app/components/layout/ExpandableSection.tsx`.

## Props — `ExpandableSectionProps`
`title`, `children`, `collapsible?` (default true), `open?` (default true), `onToggle?(open)`.

ds-v1.9: `actions?: ReactNode` — right-aligned content in a non-collapsible title (`span.slds-col_bump-left`), e.g. the "Advanced Search" / "Show Less" base button of the search panels (Figma P1–P7). Non-collapsible titles are 28 px with a button, 26 px without (Block C).

v1.0: `tone?: "shade" | "inverse"` (non-collapsible titles) — `"inverse"` is the dark search-panel bar (`h3.slds-section__title.slds-theme_inverse`, Block C: `--ac-color-search-bar`, 13 px bold white title, underlined white `actions` link, square corners, flush with the top of its bordered card).
