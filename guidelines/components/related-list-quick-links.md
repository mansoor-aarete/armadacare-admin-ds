# RelatedListQuickLinks

No SLDS 1 blueprint (gap G4). Card (boundary) + bold title with info help + `ul.slds-grid.slds-wrap` of `slds-size_1-of-7` items (x-small object icon + "Label (count)" link) + centred "Show All (n)".
File: `src/app/components/cards/RelatedListQuickLinks.tsx`.

## Props — `RelatedListQuickLinksProps`
`links: { id; label; count; iconName }[]`, `onSelect(id)`, `totalCount?` + `onShowAll?`, `title?`, `helpText?`.
Links are not underlined (Figma: underlined) — SLDS has no underline utility.
