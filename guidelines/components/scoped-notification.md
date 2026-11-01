# ScopedNotification

SLDS blueprint: **Scoped Notifications** — `div.slds-scoped-notification.slds-media.slds-media_center[role=status]` (+ `slds-theme_error|warning|success|info` or `slds-scoped-notification_light|dark`) › `div.slds-media__figure` (utility icon, small) › `div.slds-media__body`.
File: `src/app/components/feedback/ScopedNotification.tsx` (ds-v1.1).

## Props — `ScopedNotificationProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `"error" \| "warning" \| "success" \| "info" \| "light" \| "dark"` | `"light"` | themed variants are coloured (SLDS theme utilities); light / dark are neutral |
| `children` | `ReactNode` | — | message (paragraph, links) |
| `assistiveText` | `string` | variant name | icon label |

Use for messages scoped to a region (Figma CL7 Split Approval error banner). Page-level errors use ErrorPopover; field errors use the form element error.
