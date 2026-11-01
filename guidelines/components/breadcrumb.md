# Breadcrumb

SLDS blueprint: **Breadcrumbs** — `nav[role=navigation][aria-label=Breadcrumbs]` › `ol.slds-breadcrumb.slds-list_horizontal.slds-wrap` › `li.slds-breadcrumb__item` › `a`.
File: `src/app/components/navigation/Breadcrumb.tsx`. PageHeader renders it for `breadcrumbs`.

## Props — `BreadcrumbProps`
| Prop | Type | Notes |
|---|---|---|
| `items` | `{ label; href?; onClick? }[]` | Figma: "Account > Blalock Development Co", "All Folders > AH Sales & Marketing" |
| `className?` | `string` | SLDS spacing classes on the `nav` |

Links are olive (theme links).
