# ListViewToolbar

List view controls row (**Page Header — object home** controls): search input, List View Controls (gear ▾), Display As (table ▾), refresh, sort, inline-edit pencil, charts / filters stateful pair (button-group list).
File: `src/app/components/layout/ListViewToolbar.tsx` — renders `div.slds-page-header__controls`.

## Props — `ListViewToolbarProps`
`search?: { value; onChange; placeholder? }`, `settingsItems?`, `displayItems?`, `onMenuSelect?(menu, value)`, `onRefresh?`, `onSort?`, `onEdit?`, `charts?: { pressed; onToggle }`, `filters?: { pressed; onToggle }`. Omit a prop to drop its control (related lists: settings + refresh only).

Pressed charts / filters render SLDS blue (pressed icon button — decision pending, KD13).
