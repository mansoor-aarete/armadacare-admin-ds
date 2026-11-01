# EmptyState

SLDS blueprint: **Illustration** — `div.slds-illustration.slds-illustration_small|_large` › `svg.slds-illustration__svg` ("No Data: Desert", `feedback/DesertIllustration.tsx`, copied from the blueprint) › `div.slds-text-longform` › `h3.slds-text-heading_medium` + `p.slds-text-body_regular`. Text variant: one weak paragraph.
File: `src/app/components/feedback/EmptyState.tsx`.

## Props — `EmptyStateProps`
`variant?: "illustration" | "text" | "region"`, `heading?`, `message?`, `size?: "small" | "large"`, `shaded?`, `regionSize?: "small" | "medium" | "large"`, `regionLabel?`.

### Region variant (ds-v1.2)
A shaded placeholder block (`div.slds-theme_shade` + SLDS grid centering, `role="region"`) for content that renders as an empty grey area in Figma — embedded iframes / Visualforce pages (Participant/Members, Administrative Contacts) and report viewer frames. Heights: small 6.25rem (Figma iframe 100 px), medium 12.5rem, large 25rem. Optional centered weak `message`.
Illustration colours come from the SLDS illustration classes (light blue, as in Figma).

ds-v1.6: the region variant is shaded unless `shaded={false}` — a blank white body of the set height (Figma C1: open sections whose fields were not captured).

ds-v1.8: `regionSize="fill"` — the region fills its parent's height (report tab body, Figma R2).
