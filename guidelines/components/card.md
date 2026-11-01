# Card

SLDS blueprint: **Cards** — `article.slds-card(.slds-card_boundary)` › `div.slds-card__header.slds-grid` › `header.slds-media` (icon, `h2.slds-card__header-title` › link or text, actions `div.slds-no-flex`) › `div.slds-card__body(.slds-card__body_inner)` › `footer.slds-card__footer › a.slds-card__footer-action`.
File: `src/app/components/cards/Card.tsx`.

## Props — `CardProps`
`title`, `onTitleClick?` / `titleHref?` (link title), `meta?` (line under the title), `iconName?`, `actions?: ReactNode`, `children`, `bodyPadding?`, `footer?: { label; assistiveText?; onClick?; href? }`, `shaded?` (grey card, white body — related lists), `className?` (SLDS classes, e.g. `slds-card_boundary`).

Card titles are 14 px (`--slds-c-card-heading-font-size`, theme block A — Figma).
