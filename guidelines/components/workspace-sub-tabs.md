# WorkspaceSubTabs

SLDS blueprint: **Tabs — Sub Tabs** — `div.slds-tabs_default.slds-sub-tabs` › `ul.slds-tabs_default__nav[role=tablist]` › `li.slds-tabs_default__item.slds-sub-tabs__item(.slds-active)` (indicator, grey object glyph, label, optional ▼, ✕) › `div.slds-tabs_default__content`.
File: `src/app/components/shell/WorkspaceSubTabs.tsx`. Second row of tabs inside a workspace tab (Figma A8).

## Props — `WorkspaceSubTabsProps`
| Prop | Type | Notes |
|---|---|---|
| `tabs` | `{ id; label; iconName; hasMenu?; unsaved? }[]` | |
| `activeId` | `string` | active sub-tab (olive tint, block B) |
| `onSelect` | `(id) => void` | |
| `onClose?` | `(id) => void` | |
| `onMenu?` | `(id) => void` | ▼ actions |
| `children?` | `ReactNode` | active panel content |
