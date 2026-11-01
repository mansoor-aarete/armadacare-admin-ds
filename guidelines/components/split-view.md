# SplitView

SLDS blueprint: **Split View** — `div.slds-split-view_container(.slds-is-open|closed)` › toggle button › `article.slds-split-view` › header (object icon, list-view picker button, meta, display-as + refresh) › `.slds-split-view__list-header` (sort) › `ul[role=listbox]` › `li.slds-split-view__list-item` › `a.slds-split-view__list-item-action[role=option]`.
File: `src/app/components/shell/SplitView.tsx`.

## Props — `SplitViewProps` (main)
| Prop | Type | Notes |
|---|---|---|
| `open` / `onToggle` | `boolean` / `(open) => void` | collapse handle |
| `iconName`, `objectLabel` | `ObjectIconName`, `string` | 32 px object icon |
| `listViewName`, `listViews?`, `onListViewSelect?` | | "All ▼" list-view picker |
| `pinned?`, `onPin?` | | Lightning pin button |
| `controls?`, `onControlSelect?` | `MenuItem[]` | ▼ list view controls (right) |
| `meta` | `string` | "27 items • Updated …" / "4 items selected" |
| `onRefresh?`, `search?` | | refresh button; "Search this list…" input |
| `sort?`, `listInfo?` | `{ label; direction }`, `string` | list header with arrow and info icon |
| `items` | `SplitViewItem[]` | `{ id; title; titleRight?; rows?: { left?; right? }[]; unread? }` (1–3 lines) |
| `currentId?`, `onOpen` | | open item (olive left bar, block B) |
| `selection?` | `{ selectedIds; onChange }` | row + select-all checkboxes (Lightning addition) |

The list scrolls inside the panel; give the panel a height (ConsoleShell does).
List-view name uses `slds-page-header__title` (18 px bold, Figma) instead of the blueprint's `slds-text-heading_small`; rows use `slds-p-vertical_x-small` (Figma 35 px rows).
