# ButtonStateful

SLDS blueprint: **Stateful Buttons** — `button.slds-button.slds-button_neutral.slds-button_stateful` with three `span`s (`slds-text-not-selected`, `slds-text-selected`, `slds-text-selected-focus`), state classes `slds-not-selected` / `slds-is-selected` / `slds-is-selected-clicked`, `aria-live="assertive"`, `aria-pressed`.
File: `src/app/components/buttons/ButtonStateful.tsx`.

## Props — `ButtonStatefulProps`
| Prop | Type | Default | Notes |
|---|---|---|---|
| `selected` / `defaultSelected` | `boolean` | uncontrolled, `false` | controlled or uncontrolled |
| `onToggle` | `(selected: boolean) => void` | — | |
| `disabled` | `boolean` | — | |
| `notSelected` / `selectedState` / `selectedFocus` | `{ label; iconName }` | Follow (+) / Following (✓) / Unfollow (✕) | the Figma record header uses the defaults |
| `className` | `string` | — | SLDS classes only |

## Don't
- Don't use it for on/off settings — use Checkbox instead.
