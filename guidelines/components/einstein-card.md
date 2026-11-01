# EinsteinCard (Next Best Action)

SLDS blueprint: **Cards — Einstein** — `article.slds-card` › `div.slds-grid.slds-einstein-header.slds-card__header` › `header.slds-media` (title in `h2`, `slds-size_3-of-4 slds-medium-size_2-of-3`) + `div.slds-einstein-header__figure` › `div.slds-card__body.slds-card__body_inner` › optional footer.
File: `src/app/components/cards/EinsteinCard.tsx`.

## Props — `EinsteinCardProps`
`title?` (default "Next Best Action"), `onTitleClick?`, `children` (body), `centered?` (empty-recommendations layout: centred, extra top spacing), `footer?: { label; onClick }`.

Figma sizing (theme Block C): figure enlarged to Figma's size and clipped by the header (`overflow: hidden`, figure 9.25rem with −4.5rem top margin), header left padding 0.75rem. Empty message in Figma: `slds-text-body_small slds-text-color_weak`.

The sky background and Einstein figure are the SLDS package images referenced by the SLDS CSS (`url(../images/einstein-headers/…)`), bundled by Vite — see `setup.md`.
