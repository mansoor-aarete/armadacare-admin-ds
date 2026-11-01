# PageHeader · Breadcrumb

SLDS blueprint: **Page Headers** (base, object home, record home, related list) — `div.slds-page-header` › `.slds-page-header__row` › `__col-title` (media: `svg.slds-page-header__icon`, `h1` › object label + `.slds-page-header__title`, name switcher) / `__col-actions` (`__controls` › `__control`) › meta row (`__col-meta` › `__meta-text`, `__col-controls`) › detail row (`ul.slds-page-header__detail-row` › `li.slds-page-header__detail-block`).
Files: `src/app/components/layout/PageHeader.tsx`, `src/app/components/navigation/Breadcrumb.tsx` (`nav › ol.slds-breadcrumb.slds-list_horizontal.slds-wrap`).

## Props — `PageHeaderProps`
| Prop | Type | Notes |
|---|---|---|
| `variant` | `"base" \| "object-home" \| "record-home" \| "related-list"` | default `base` |
| `title`, `iconName?`, `objectLabel?` | | `objectLabel` = line above the title |
| `breadcrumbs?` | `BreadcrumbItem[]` | `{ label; href?; onClick? }` |
| `listViews?`, `onListViewSelect?` | | ▼ list-view switcher |
| `pin?` | `{ pinned; onToggle }` | Lightning pin button |
| `actions?` | `ReactNode[]` | each wrapped in `.slds-page-header__control` |
| `meta?`, `controls?` | `ReactNode` | meta row; `controls` is usually `<ListViewToolbar/>` |
| `details?` | `{ label; value?; title? }[]` | record-home detail row (white, SLDS) |

Figma sizing: meta text `slds-text-body_small` (12 px); record-home uses `slds-p-top_x-small` / `slds-p-bottom_x-small`, `slds-line-height_reset` on the title block and a 12 px object label (52 px header). Object-home ▼ in the actions is olive (Block C).
