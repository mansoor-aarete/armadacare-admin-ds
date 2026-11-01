# Avatar

SLDS blueprint: **Avatar** — `span.slds-avatar(.slds-avatar_{size})(.slds-avatar_circle)` › `img` | `abbr.slds-avatar__initials.slds-icon-{object}` | Icon.
File: `src/app/components/feedback/Avatar.tsx`.

## Props — `AvatarProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `content` | `{ kind: "image"; src; alt }` \| `{ kind: "initials"; initials; title; iconName }` \| `{ kind: "icon"; iconName; assistiveText }` | — | |
| `size` | `"x-small" \| "small" \| "medium" \| "large"` | `"medium"` | 1.25 / 1.5 / 2 / 3 rem — SLDS has nothing smaller (Figma lookup avatars are 1rem, see KD12) |
| `shape` | `"square" \| "circle"` | `"square"` | circle for people |
| `className` | `string` | — | SLDS classes only |
