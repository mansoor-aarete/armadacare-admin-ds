# WorkspaceTabs · WorkspaceSubTabs

SLDS blueprints: **Global Navigation — console tabs** (`li.slds-context-bar__item.slds-context-bar__item_tab` › `a.slds-context-bar__label-action[role=tab]` › indicators + object icon + label, ▼ actions, ✕ close) and **Tabs — Sub Tabs** (`div.slds-tabs_default.slds-sub-tabs`).
Files: `src/app/components/shell/WorkspaceTabs.tsx` (render inside `<AppNav tabs={…}/>`), `src/app/components/shell/WorkspaceSubTabs.tsx`.

## `WorkspaceTabsProps`
`tabs: WorkspaceTab[]`, `activeId?`, `onSelect(id)`, `onClose?(id)`, `onMenuSelect?(id, value)`.
`WorkspaceTab` = `{ id; label ("Adam Sahn | Contact"); iconName: ObjectIconName; unsaved?; menuItems? (default Refresh / Pin / Close; [] hides ▼); notClosable?; panelId? }`.

## `WorkspaceSubTabsProps`
`tabs: { id; label; iconName; hasMenu?; unsaved? }[]`, `activeId`, `onSelect`, `onClose?`, `onMenu?`, `children` (active panel).

Tab icons are grey glyphs without the coloured square (`Icon tone="default"` on an object icon — TabObjectIcon blueprint). Unsaved tabs show `*` and an italic label (SLDS).
