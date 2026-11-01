# HighlightsPanel

Record highlights = **Page Header (record home)** composed from PageHeader + ButtonIcon (hierarchy) + ButtonStateful (Follow) + ButtonGroup list + ButtonMenu (overflow, actions style, 12rem).
File: `src/app/components/layout/HighlightsPanel.tsx`.

## Props — `HighlightsPanelProps`
`iconName`, `objectLabel` ("Contact"), `title` (record name), `actions?: { value; label; disabled? }[]`, `overflowActions?: MenuItem[]`, `onAction?(value)`, `follow?: { following; onToggle }`, `onHierarchy?`, `details?: PageHeaderDetail[]` (≈6 fields; empty values allowed), `extraActions?: ReactNode[]`.

Figma variants: contact (hierarchy + 3 actions + ▼ + details), account (Follow + hierarchy), plan year (Edit / Delete / Clone + ▼, no details), card transaction (▼ only).
