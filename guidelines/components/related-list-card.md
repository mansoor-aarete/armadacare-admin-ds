# RelatedListCard

Lightning related list built on **Card** (shaded, boundary): icon, "Title (count)" link, optional meta line, header controls (ListViewToolbar gear + refresh, buttons / button group, ▼ menu), body (tiles, custom table or spinner) and "View All" footer.
File: `src/app/components/cards/RelatedListCard.tsx`.

## Props — `RelatedListCardProps`
`iconName`, `title`, `count` (`number | string`, e.g. "6+"), `onTitleClick?`, `meta?`, `buttons?: { value; label }[]` + `onButton?`, `menuItems?` + `onMenuSelect?`, `settingsItems?`, `onRefresh?`, `records?: { id; title; details?: ReactNode[] }[]` + `onRecordClick?`, `children?` (e.g. `<DataTable/>`), `loading?`, `onViewAll?`.

States (Figma): header only (count 0), header + ▼, header + buttons, tiles + View All (Notes), table + controls + View All, loading (spinner — SLDS 1 has no stencil).
