# SLDS `--slds-g-*` global styling hooks — @salesforce-ux/design-system 2.264.3

Generated from `assets/styles/salesforce-lightning-design-system.css` (Phase 0). Do not edit by hand.

- Unique hooks defined: **532**
- Defined in `:root`: **235** (wins over `:where(html)` because `:where()` has zero specificity)
- Defined in `:where(html)`: **514**
- Hooks actually read by SLDS component CSS (`var(--slds-g-…)`): **135** — only these change component rendering when overridden.

Columns: `:root` value · `:where(html)` value · number of `var()` reads in the CSS.

## color-accent (10)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-accent-1` | — | `var(--lwc-brandPrimary, var(--slds-r-color-brand-60))` | 1 |
| `--slds-g-color-accent-2` | — | `var(--lwc-brandPrimaryActive, var(--slds-r-color-brand-50))` | 9 |
| `--slds-g-color-accent-3` | — | `var(--slds-r-color-brand-40)` | 4 |
| `--slds-g-color-accent-container-1` | — | `var(--lwc-brandAccessible, var(--slds-r-color-brand-50))` | 0 |
| `--slds-g-color-accent-container-2` | — | `var(--lwc-brandAccessibleActive, var(--slds-r-color-brand-40))` | 0 |
| `--slds-g-color-accent-container-3` | — | `var(--slds-r-color-brand-30)` | 0 |
| `--slds-g-color-accent-dark-1` | — | `var(--lwc-brandDark, var(--slds-g-color-brand-base-20))` | 0 |
| `--slds-g-color-accent-dark-2` | — | `var(--lwc-brandDarkActive, var(--slds-g-color-brand-base-10))` | 0 |
| `--slds-g-color-accent-light-1` | — | `var(--lwc-brandLight, var(--slds-g-color-brand-base-95))` | 0 |
| `--slds-g-color-accent-light-2` | — | `var(--lwc-brandLightActive, var(--slds-g-color-brand-base-90))` | 0 |

## color-border (20)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-border-1` | — | `var(--slds-g-color-neutral-base-80)` | 2 |
| `--slds-g-color-border-2` | — | `var(--slds-g-color-neutral-base-50)` | 4 |
| `--slds-g-color-border-accent-1` | — | `var(--slds-r-color-brand-50)` | 0 |
| `--slds-g-color-border-accent-2` | — | `var(--slds-r-color-brand-40)` | 1 |
| `--slds-g-color-border-accent-3` | — | `var(--slds-r-color-brand-30)` | 0 |
| `--slds-g-color-border-base-1` | `#c9c9c9` | — | 155 |
| `--slds-g-color-border-base-2` | `#aeaeae` | — | 0 |
| `--slds-g-color-border-base-3` | `#939393` | — | 0 |
| `--slds-g-color-border-base-4` | `#747474` | — | 67 |
| `--slds-g-color-border-brand-1` | `#78b0fd` | — | 0 |
| `--slds-g-color-border-brand-2` | `#1b96ff` | — | 28 |
| `--slds-g-color-border-disabled-1` | — | `#c9c9c9` | 0 |
| `--slds-g-color-border-disabled-2` | — | `#aeaeae` | 0 |
| `--slds-g-color-border-error-1` | — | `var(--slds-r-color-error-40)` | 0 |
| `--slds-g-color-border-error-2` | — | `var(--slds-r-color-error-30)` | 0 |
| `--slds-g-color-border-inverse-1` | — | `#f3f3f3` | 0 |
| `--slds-g-color-border-inverse-2` | — | `#032d60` | 0 |
| `--slds-g-color-border-success-1` | — | `var(--slds-r-color-success-50)` | 0 |
| `--slds-g-color-border-success-2` | — | `var(--slds-r-color-success-40)` | 0 |
| `--slds-g-color-border-warning-1` | — | `var(--slds-r-color-warning-60)` | 0 |

## color-brand (15)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-brand-base-10` | `#001639` | `var(--slds-r-color-brand-10)` | 25 |
| `--slds-g-color-brand-base-100` | `#ffffff` | `var(--slds-g-color-neutral-base-100)` | 0 |
| `--slds-g-color-brand-base-15` | `#03234d` | `var(--slds-r-color-brand-15)` | 0 |
| `--slds-g-color-brand-base-20` | `#032d60` | `var(--slds-r-color-brand-20)` | 36 |
| `--slds-g-color-brand-base-30` | `#014486` | `var(--slds-r-color-brand-30)` | 8 |
| `--slds-g-color-brand-base-40` | `#0b5cab` | `var(--slds-r-color-brand-40)` | 13 |
| `--slds-g-color-brand-base-45` | — | `var(--slds-r-color-brand-45)` | 0 |
| `--slds-g-color-brand-base-50` | `#0176d3` | `var(--slds-r-color-brand-50)` | 32 |
| `--slds-g-color-brand-base-55` | — | `var(--slds-r-color-brand-55)` | 0 |
| `--slds-g-color-brand-base-60` | `#1b96ff` | `var(--slds-r-color-brand-60)` | 16 |
| `--slds-g-color-brand-base-65` | `#57a3fd` | `var(--slds-r-color-brand-65)` | 0 |
| `--slds-g-color-brand-base-70` | `#78b0fd` | `var(--slds-r-color-brand-70)` | 0 |
| `--slds-g-color-brand-base-80` | `#aacbff` | `var(--slds-r-color-brand-80)` | 0 |
| `--slds-g-color-brand-base-90` | `#d8e6fe` | `var(--slds-r-color-brand-90)` | 1 |
| `--slds-g-color-brand-base-95` | `#eef4ff` | `var(--slds-r-color-brand-95)` | 1 |

## color-disabled (4)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-disabled-1` | — | `#c9c9c9` | 0 |
| `--slds-g-color-disabled-2` | — | `#aeaeae` | 0 |
| `--slds-g-color-disabled-container-1` | — | `#fff` | 0 |
| `--slds-g-color-disabled-container-2` | — | `#c9c9c9` | 0 |

## color-error (16)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-error-1` | — | `var(--slds-r-color-error-40)` | 1 |
| `--slds-g-color-error-base-10` | `#300c01` | `var(--slds-r-color-error-10)` | 0 |
| `--slds-g-color-error-base-100` | `#ffffff` | `var(--slds-g-color-neutral-base-100)` | 0 |
| `--slds-g-color-error-base-15` | — | `var(--slds-r-color-error-15)` | 0 |
| `--slds-g-color-error-base-20` | `#640103` | `var(--slds-r-color-error-20)` | 0 |
| `--slds-g-color-error-base-30` | `#8e030f` | `var(--slds-r-color-error-30)` | 20 |
| `--slds-g-color-error-base-40` | `#ba0517` | `var(--slds-r-color-error-40)` | 68 |
| `--slds-g-color-error-base-50` | `#ea001e` | `var(--slds-r-color-error-50)` | 1 |
| `--slds-g-color-error-base-60` | `#fe5c4c` | `var(--slds-r-color-error-60)` | 0 |
| `--slds-g-color-error-base-65` | — | `var(--slds-r-color-error-65)` | 0 |
| `--slds-g-color-error-base-70` | `#fe8f7d` | `var(--slds-r-color-error-70)` | 0 |
| `--slds-g-color-error-base-80` | `#feb8ab` | `var(--slds-r-color-error-80)` | 0 |
| `--slds-g-color-error-base-90` | `#feded8` | `var(--slds-r-color-error-90)` | 0 |
| `--slds-g-color-error-base-95` | — | `var(--slds-r-color-error-95)` | 0 |
| `--slds-g-color-error-container-1` | — | `var(--slds-r-color-error-40)` | 0 |
| `--slds-g-color-error-container-2` | — | `var(--slds-r-color-error-30)` | 0 |

## color-info (16)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-info-1` | — | `var(--slds-r-color-info-30)` | 0 |
| `--slds-g-color-info-base-10` | — | `var(--slds-r-color-info-10)` | 0 |
| `--slds-g-color-info-base-100` | — | `var(--slds-g-color-neutral-base-100)` | 0 |
| `--slds-g-color-info-base-15` | — | `var(--slds-r-color-info-15)` | 0 |
| `--slds-g-color-info-base-20` | — | `var(--slds-r-color-info-20)` | 0 |
| `--slds-g-color-info-base-30` | — | `var(--slds-r-color-info-30)` | 0 |
| `--slds-g-color-info-base-35` | — | `var(--slds-r-color-info-35)` | 0 |
| `--slds-g-color-info-base-40` | — | `var(--slds-r-color-info-40)` | 0 |
| `--slds-g-color-info-base-50` | — | `var(--slds-r-color-info-50)` | 0 |
| `--slds-g-color-info-base-60` | — | `var(--slds-r-color-info-60)` | 0 |
| `--slds-g-color-info-base-65` | — | `var(--slds-r-color-info-65)` | 0 |
| `--slds-g-color-info-base-70` | — | `var(--slds-r-color-info-70)` | 0 |
| `--slds-g-color-info-base-80` | — | `var(--slds-r-color-info-80)` | 0 |
| `--slds-g-color-info-base-90` | — | `var(--slds-r-color-info-90)` | 0 |
| `--slds-g-color-info-base-95` | — | `var(--slds-r-color-info-95)` | 0 |
| `--slds-g-color-info-container-1` | — | `var(--slds-r-color-info-40)` | 0 |

## color-neutral (22)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-neutral-10-opacity-10` | `rgba(24, 24, 24, 0.1)` | — | 6 |
| `--slds-g-color-neutral-10-opacity-25` | `rgba(24, 24, 24, 0.25)` | — | 3 |
| `--slds-g-color-neutral-10-opacity-50` | `rgba(24, 24, 24, 0.5)` | — | 5 |
| `--slds-g-color-neutral-10-opacity-75` | `rgba(24, 24, 24, 0.75)` | — | 4 |
| `--slds-g-color-neutral-100-opacity-10` | `rgba(255, 255, 255, 0.1)` | — | 12 |
| `--slds-g-color-neutral-100-opacity-25` | `rgba(255, 255, 255, 0.25)` | — | 3 |
| `--slds-g-color-neutral-100-opacity-50` | `rgba(255, 255, 255, 0.5)` | — | 16 |
| `--slds-g-color-neutral-100-opacity-75` | `rgba(255, 255, 255, 0.75)` | — | 7 |
| `--slds-g-color-neutral-base-0` | — | `#000` | 0 |
| `--slds-g-color-neutral-base-10` | `#181818` | `#181818` | 69 |
| `--slds-g-color-neutral-base-100` | `#ffffff` | `#fff` | 428 |
| `--slds-g-color-neutral-base-15` | `#242424` | `#242424` | 0 |
| `--slds-g-color-neutral-base-20` | `#2e2e2e` | `#2e2e2e` | 4 |
| `--slds-g-color-neutral-base-30` | `#444444` | `#444` | 61 |
| `--slds-g-color-neutral-base-40` | `#5c5c5c` | `#5c5c5c` | 1 |
| `--slds-g-color-neutral-base-50` | `#747474` | `#757575` | 66 |
| `--slds-g-color-neutral-base-60` | `#939393` | `#939393` | 21 |
| `--slds-g-color-neutral-base-65` | `#a0a0a0` | `#a0a0a0` | 0 |
| `--slds-g-color-neutral-base-70` | `#aeaeae` | `#aeaeae` | 10 |
| `--slds-g-color-neutral-base-80` | `#c9c9c9` | `#c9c9c9` | 79 |
| `--slds-g-color-neutral-base-90` | `#e5e5e5` | `#e5e5e5` | 16 |
| `--slds-g-color-neutral-base-95` | `#f3f3f3` | `#f3f3f3` | 151 |

## color-on (16)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-on-accent-1` | — | `var(--slds-g-color-neutral-base-100)` | 1 |
| `--slds-g-color-on-accent-2` | — | `var(--slds-g-color-neutral-base-100)` | 0 |
| `--slds-g-color-on-accent-3` | — | `var(--slds-g-color-neutral-base-100)` | 0 |
| `--slds-g-color-on-disabled-1` | — | `#c9c9c9` | 0 |
| `--slds-g-color-on-disabled-2` | — | `#939393` | 1 |
| `--slds-g-color-on-error-1` | — | `#fff` | 0 |
| `--slds-g-color-on-error-2` | — | `#fff` | 0 |
| `--slds-g-color-on-info-1` | — | `#fff` | 0 |
| `--slds-g-color-on-success-1` | — | `#fff` | 0 |
| `--slds-g-color-on-success-2` | — | `#181818` | 0 |
| `--slds-g-color-on-surface-1` | — | `#757575` | 1 |
| `--slds-g-color-on-surface-2` | — | `#2e2e2e` | 7 |
| `--slds-g-color-on-surface-3` | — | `#181818` | 2 |
| `--slds-g-color-on-surface-inverse-1` | — | `#fff` | 0 |
| `--slds-g-color-on-surface-inverse-2` | — | `#aeaeae` | 0 |
| `--slds-g-color-on-warning-1` | — | `#181818` | 0 |

## color-palette (170)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-palette-blue-10` | `#001639` | `#001639` | 0 |
| `--slds-g-color-palette-blue-15` | `#03234d` | `#03234d` | 0 |
| `--slds-g-color-palette-blue-20` | `#032d60` | `#032d60` | 2 |
| `--slds-g-color-palette-blue-30` | `#014486` | `#014486` | 2 |
| `--slds-g-color-palette-blue-40` | `#0b5cab` | `#0b5cab` | 3 |
| `--slds-g-color-palette-blue-50` | `#0176d3` | `#0176d3` | 0 |
| `--slds-g-color-palette-blue-60` | `#1b96ff` | `#1b96ff` | 0 |
| `--slds-g-color-palette-blue-65` | `#57a3fd` | `#57a3fd` | 0 |
| `--slds-g-color-palette-blue-70` | `#78b0fd` | `#78b0fd` | 0 |
| `--slds-g-color-palette-blue-80` | `#aacbff` | `#aacbff` | 0 |
| `--slds-g-color-palette-blue-90` | `#d8e6fe` | `#d8e6fe` | 0 |
| `--slds-g-color-palette-blue-95` | `#eef4ff` | `#eef4ff` | 0 |
| `--slds-g-color-palette-cloud-blue-10` | `#001a28` | `#001a28` | 0 |
| `--slds-g-color-palette-cloud-blue-15` | `#0a2636` | `#0a2636` | 0 |
| `--slds-g-color-palette-cloud-blue-20` | `#023248` | `#023248` | 0 |
| `--slds-g-color-palette-cloud-blue-30` | `#084968` | `#084968` | 0 |
| `--slds-g-color-palette-cloud-blue-40` | `#05628a` | `#05628a` | 0 |
| `--slds-g-color-palette-cloud-blue-50` | `#107cad` | `#107cad` | 0 |
| `--slds-g-color-palette-cloud-blue-60` | `#0d9dda` | `#0d9dda` | 1 |
| `--slds-g-color-palette-cloud-blue-65` | `#08abed` | `#08abed` | 0 |
| `--slds-g-color-palette-cloud-blue-70` | `#1ab9ff` | `#1ab9ff` | 0 |
| `--slds-g-color-palette-cloud-blue-80` | `#90d0fe` | `#90d0fe` | 4 |
| `--slds-g-color-palette-cloud-blue-90` | `#cfe9fe` | `#cfe9fe` | 4 |
| `--slds-g-color-palette-cloud-blue-95` | `#eaf5fe` | `#eaf5fe` | 0 |
| `--slds-g-color-palette-electric-blue-10` | — | `#001642` | 0 |
| `--slds-g-color-palette-electric-blue-15` | — | `#001e5b` | 0 |
| `--slds-g-color-palette-electric-blue-20` | — | `#002775` | 0 |
| `--slds-g-color-palette-electric-blue-30` | — | `#022ac0` | 0 |
| `--slds-g-color-palette-electric-blue-40` | — | `#0250d9` | 0 |
| `--slds-g-color-palette-electric-blue-50` | — | `#066afe` | 0 |
| `--slds-g-color-palette-electric-blue-60` | — | `#4992fe` | 0 |
| `--slds-g-color-palette-electric-blue-65` | — | `#5f9ffe` | 0 |
| `--slds-g-color-palette-electric-blue-70` | — | `#7cb1fe` | 0 |
| `--slds-g-color-palette-electric-blue-80` | — | `#a8cbff` | 0 |
| `--slds-g-color-palette-electric-blue-90` | — | `#d6e6ff` | 0 |
| `--slds-g-color-palette-electric-blue-95` | — | `#edf4ff` | 0 |
| `--slds-g-color-palette-green-10` | `#071b12` | `#071b12` | 0 |
| `--slds-g-color-palette-green-15` | `#0c2912` | `#0c2912` | 0 |
| `--slds-g-color-palette-green-20` | `#1C3326` | `#143b25` | 0 |
| `--slds-g-color-palette-green-30` | `#194e31` | `#194e31` | 0 |
| `--slds-g-color-palette-green-40` | `#396547` | `#396547` | 0 |
| `--slds-g-color-palette-green-50` | `#2e844a` | `#2e844a` | 0 |
| `--slds-g-color-palette-green-60` | `#3ba755` | `#3ba755` | 0 |
| `--slds-g-color-palette-green-65` | `#41b658` | `#41b658` | 0 |
| `--slds-g-color-palette-green-70` | `#45c65a` | `#45c65a` | 0 |
| `--slds-g-color-palette-green-80` | `#91db8b` | `#91db8b` | 0 |
| `--slds-g-color-palette-green-90` | `#cdefc4` | `#cdefc4` | 0 |
| `--slds-g-color-palette-green-95` | `#ebf7e6` | `#ebf7e6` | 0 |
| `--slds-g-color-palette-hot-orange-10` | `#281202` | `#281202` | 0 |
| `--slds-g-color-palette-hot-orange-15` | `#421604` | `#421604` | 0 |
| `--slds-g-color-palette-hot-orange-20` | `#4A2413` | `#4a2413` | 0 |
| `--slds-g-color-palette-hot-orange-30` | `#7e2600` | `#7e2600` | 0 |
| `--slds-g-color-palette-hot-orange-40` | `#aa3001` | `#aa3001` | 0 |
| `--slds-g-color-palette-hot-orange-50` | `#d83a00` | `#d83a00` | 0 |
| `--slds-g-color-palette-hot-orange-60` | `#ff5d2d` | `#ff5d2d` | 0 |
| `--slds-g-color-palette-hot-orange-65` | `#ff784f` | `#ff784f` | 0 |
| `--slds-g-color-palette-hot-orange-70` | `#ff906e` | `#ff906e` | 0 |
| `--slds-g-color-palette-hot-orange-80` | `#feb9a5` | `#feb9a5` | 0 |
| `--slds-g-color-palette-hot-orange-90` | `#ffded5` | `#ffded5` | 0 |
| `--slds-g-color-palette-hot-orange-95` | `#fef1ed` | `#fef1ed` | 0 |
| `--slds-g-color-palette-indigo-10` | `#200647` | `#17094e` | 0 |
| `--slds-g-color-palette-indigo-15` | `#1f0974` | `#1f0974` | 0 |
| `--slds-g-color-palette-indigo-20` | `#321D71` | `#270c92` | 0 |
| `--slds-g-color-palette-indigo-30` | `#2f2cb7` | `#2f2cb7` | 0 |
| `--slds-g-color-palette-indigo-40` | `#3a49da` | `#3a49da` | 0 |
| `--slds-g-color-palette-indigo-50` | `#5867e8` | `#5867e8` | 0 |
| `--slds-g-color-palette-indigo-60` | `#7f8ced` | `#7f8ced` | 0 |
| `--slds-g-color-palette-indigo-65` | `#8e9bef` | `#8e9bef` | 0 |
| `--slds-g-color-palette-indigo-70` | `#9ea9f1` | `#9ea9f1` | 0 |
| `--slds-g-color-palette-indigo-80` | `#bec7f6` | `#bec7f6` | 0 |
| `--slds-g-color-palette-indigo-90` | `#e0e5f8` | `#e0e5f8` | 0 |
| `--slds-g-color-palette-indigo-95` | `#f1f3fb` | `#f1f3fb` | 0 |
| `--slds-g-color-palette-neutral-0` | — | `#000` | 0 |
| `--slds-g-color-palette-neutral-10` | `#181818` | `#181818` | 0 |
| `--slds-g-color-palette-neutral-100` | `#ffffff` | `#fff` | 0 |
| `--slds-g-color-palette-neutral-15` | `#242424` | `#242424` | 0 |
| `--slds-g-color-palette-neutral-20` | `#2e2e2e` | `#2e2e2e` | 0 |
| `--slds-g-color-palette-neutral-30` | `#444444` | `#444` | 0 |
| `--slds-g-color-palette-neutral-40` | `#5c5c5c` | `#5c5c5c` | 0 |
| `--slds-g-color-palette-neutral-50` | `#747474` | `#757575` | 0 |
| `--slds-g-color-palette-neutral-60` | `#939393` | `#939393` | 0 |
| `--slds-g-color-palette-neutral-65` | `#a0a0a0` | `#a0a0a0` | 0 |
| `--slds-g-color-palette-neutral-70` | `#aeaeae` | `#aeaeae` | 0 |
| `--slds-g-color-palette-neutral-80` | `#c9c9c9` | `#c9c9c9` | 0 |
| `--slds-g-color-palette-neutral-90` | `#e5e5e5` | `#e5e5e5` | 0 |
| `--slds-g-color-palette-neutral-95` | `#f3f3f3` | `#f3f3f3` | 0 |
| `--slds-g-color-palette-orange-10` | `#201600` | `#201600` | 0 |
| `--slds-g-color-palette-orange-15` | `#371e03` | `#2e2204` | 0 |
| `--slds-g-color-palette-orange-20` | `#3e2b02` | `#3e2b02` | 0 |
| `--slds-g-color-palette-orange-30` | `#5f3e02` | `#5f3e02` | 0 |
| `--slds-g-color-palette-orange-40` | `#825101` | `#825101` | 0 |
| `--slds-g-color-palette-orange-50` | `#a96404` | `#a96404` | 0 |
| `--slds-g-color-palette-orange-60` | `#dd7a01` | `#dd7a01` | 0 |
| `--slds-g-color-palette-orange-65` | `#f38303` | `#f38303` | 0 |
| `--slds-g-color-palette-orange-70` | `#fe9339` | `#fe9339` | 0 |
| `--slds-g-color-palette-orange-80` | `#ffba90` | `#ffba90` | 0 |
| `--slds-g-color-palette-orange-90` | `#fedfd0` | `#fedfd0` | 0 |
| `--slds-g-color-palette-orange-95` | `#fff1ea` | `#fff1ea` | 0 |
| `--slds-g-color-palette-pink-10` | `#370114` | `#370114` | 0 |
| `--slds-g-color-palette-pink-15` | `#4b0620` | `#4b0620` | 0 |
| `--slds-g-color-palette-pink-20` | `#61022a` | `#61022a` | 0 |
| `--slds-g-color-palette-pink-30` | `#8a033e` | `#8a033e` | 0 |
| `--slds-g-color-palette-pink-40` | `#b60554` | `#b60554` | 0 |
| `--slds-g-color-palette-pink-50` | `#e3066a` | `#e3066a` | 0 |
| `--slds-g-color-palette-pink-60` | `#ff538a` | `#ff538a` | 0 |
| `--slds-g-color-palette-pink-65` | `#fe7298` | `#fe7298` | 0 |
| `--slds-g-color-palette-pink-70` | `#fe8aa7` | `#fe8aa7` | 0 |
| `--slds-g-color-palette-pink-80` | `#fdb6c5` | `#fdb6c5` | 0 |
| `--slds-g-color-palette-pink-90` | `#fddde3` | `#fddde3` | 3 |
| `--slds-g-color-palette-pink-95` | `#fef0f3` | `#fef0f3` | 0 |
| `--slds-g-color-palette-purple-10` | `#240643` | `#240643` | 0 |
| `--slds-g-color-palette-purple-15` | `#300b60` | `#300b60` | 0 |
| `--slds-g-color-palette-purple-20` | `#401075` | `#401075` | 0 |
| `--slds-g-color-palette-purple-30` | `#5a1ba9` | `#5a1ba9` | 0 |
| `--slds-g-color-palette-purple-40` | `#7526e3` | `#7526e3` | 0 |
| `--slds-g-color-palette-purple-50` | `#9050e9` | `#9050e9` | 0 |
| `--slds-g-color-palette-purple-60` | `#ad7bee` | `#ad7bee` | 0 |
| `--slds-g-color-palette-purple-65` | `#b78def` | `#b78def` | 0 |
| `--slds-g-color-palette-purple-70` | `#c29ef1` | `#c29ef1` | 0 |
| `--slds-g-color-palette-purple-80` | `#D7BFF2` | `#d7bff2` | 0 |
| `--slds-g-color-palette-purple-90` | `#ece1f9` | `#ece1f9` | 0 |
| `--slds-g-color-palette-purple-95` | `#f6f2fb` | `#f6f2fb` | 0 |
| `--slds-g-color-palette-red-10` | `#300c01` | `#300c01` | 0 |
| `--slds-g-color-palette-red-15` | `#4a0c04` | `#4a0c04` | 0 |
| `--slds-g-color-palette-red-20` | `#640103` | `#640103` | 0 |
| `--slds-g-color-palette-red-30` | `#8e030f` | `#8e030f` | 0 |
| `--slds-g-color-palette-red-40` | `#ba0517` | `#ba0517` | 0 |
| `--slds-g-color-palette-red-50` | `#ea001e` | `#ea001e` | 0 |
| `--slds-g-color-palette-red-60` | `#fe5c4c` | `#fe5c4c` | 0 |
| `--slds-g-color-palette-red-65` | `#fe7765` | `#fe7765` | 0 |
| `--slds-g-color-palette-red-70` | `#fe8f7d` | `#fe8f7d` | 0 |
| `--slds-g-color-palette-red-80` | `#feb8ab` | `#feb8ab` | 0 |
| `--slds-g-color-palette-red-90` | `#feded8` | `#feded8` | 0 |
| `--slds-g-color-palette-red-95` | `#fef1ee` | `#fef1ee` | 0 |
| `--slds-g-color-palette-teal-10` | `#071b12` | `#071b12` | 0 |
| `--slds-g-color-palette-teal-15` | `#072825` | `#072825` | 0 |
| `--slds-g-color-palette-teal-20` | `#023434` | `#023434` | 0 |
| `--slds-g-color-palette-teal-30` | `#024d4c` | `#024d4c` | 0 |
| `--slds-g-color-palette-teal-40` | `#056764` | `#056764` | 0 |
| `--slds-g-color-palette-teal-50` | `#0b827c` | `#0b827c` | 0 |
| `--slds-g-color-palette-teal-60` | `#06a59a` | `#06a59a` | 0 |
| `--slds-g-color-palette-teal-65` | `#03b4a7` | `#03b4a7` | 0 |
| `--slds-g-color-palette-teal-70` | `#01c3b3` | `#01c3b3` | 0 |
| `--slds-g-color-palette-teal-80` | `#04e1cb` | `#04e1cb` | 0 |
| `--slds-g-color-palette-teal-90` | `#acf3e4` | `#acf3e4` | 0 |
| `--slds-g-color-palette-teal-95` | `#def9f3` | `#def9f3` | 0 |
| `--slds-g-color-palette-violet-10` | `#2e0039` | `#2e0039` | 0 |
| `--slds-g-color-palette-violet-15` | `#3d0157` | `#3d0157` | 0 |
| `--slds-g-color-palette-violet-20` | `#481A54` | `#580276` | 0 |
| `--slds-g-color-palette-violet-30` | `#730394` | `#730394` | 0 |
| `--slds-g-color-palette-violet-40` | `#9602c7` | `#9602c7` | 0 |
| `--slds-g-color-palette-violet-50` | `#ba01ff` | `#ba01ff` | 0 |
| `--slds-g-color-palette-violet-60` | `#cb65ff` | `#cb65ff` | 0 |
| `--slds-g-color-palette-violet-65` | `#d17dfe` | `#d17dfe` | 0 |
| `--slds-g-color-palette-violet-70` | `#d892fe` | `#d892fe` | 0 |
| `--slds-g-color-palette-violet-80` | `#e5b9fe` | `#e5b9fe` | 0 |
| `--slds-g-color-palette-violet-90` | `#f2defe` | `#f2defe` | 0 |
| `--slds-g-color-palette-violet-95` | `#f9f0ff` | `#f9f0ff` | 0 |
| `--slds-g-color-palette-yellow-10` | `#281202` | `#281202` | 0 |
| `--slds-g-color-palette-yellow-15` | `#2e2204` | `#371e03` | 0 |
| `--slds-g-color-palette-yellow-20` | `#4f2100` | `#4f2100` | 0 |
| `--slds-g-color-palette-yellow-30` | `#6f3400` | `#6f3400` | 0 |
| `--slds-g-color-palette-yellow-40` | `#8c4b02` | `#8c4b02` | 0 |
| `--slds-g-color-palette-yellow-50` | `#a86403` | `#a96504` | 0 |
| `--slds-g-color-palette-yellow-60` | `#ca8501` | `#ca8501` | 0 |
| `--slds-g-color-palette-yellow-65` | `#d79304` | `#da9401` | 0 |
| `--slds-g-color-palette-yellow-70` | `#e4a201` | `#e4a201` | 0 |
| `--slds-g-color-palette-yellow-80` | `#fcc003` | `#fcc003` | 1 |
| `--slds-g-color-palette-yellow-90` | `#f9e3b6` | `#f9e3b6` | 10 |
| `--slds-g-color-palette-yellow-95` | `#fbf3e0` | `#fbf3e0` | 0 |

## color-success (16)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-success-1` | — | `var(--slds-r-color-success-50)` | 0 |
| `--slds-g-color-success-base-10` | `#071b12` | `var(--slds-r-color-success-10)` | 0 |
| `--slds-g-color-success-base-100` | `#ffffff` | `var(--slds-g-color-neutral-base-100)` | 0 |
| `--slds-g-color-success-base-15` | — | `var(--slds-r-color-success-15)` | 0 |
| `--slds-g-color-success-base-20` | `#1C3326` | `var(--slds-r-color-success-20)` | 0 |
| `--slds-g-color-success-base-30` | `#194e31` | `var(--slds-r-color-success-30)` | 0 |
| `--slds-g-color-success-base-40` | `#396547` | `var(--slds-r-color-success-40)` | 5 |
| `--slds-g-color-success-base-50` | `#2e844a` | `var(--slds-r-color-success-50)` | 39 |
| `--slds-g-color-success-base-60` | `#3ba755` | `var(--slds-r-color-success-60)` | 3 |
| `--slds-g-color-success-base-65` | — | `var(--slds-r-color-success-65)` | 0 |
| `--slds-g-color-success-base-70` | `#45c65a` | `var(--slds-r-color-success-70)` | 2 |
| `--slds-g-color-success-base-80` | `#91db8b` | `var(--slds-r-color-success-80)` | 0 |
| `--slds-g-color-success-base-90` | `#cdefc4` | `var(--slds-r-color-success-90)` | 0 |
| `--slds-g-color-success-base-95` | — | `var(--slds-r-color-success-95)` | 0 |
| `--slds-g-color-success-container-1` | — | `var(--slds-r-color-success-50)` | 0 |
| `--slds-g-color-success-container-2` | — | `var(--slds-r-color-success-30)` | 0 |

## color-surface (10)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-surface-1` | — | `#fff` | 0 |
| `--slds-g-color-surface-2` | — | `#f3f3f3` | 0 |
| `--slds-g-color-surface-3` | — | `#e5e5e5` | 0 |
| `--slds-g-color-surface-container-1` | — | `#fff` | 8 |
| `--slds-g-color-surface-container-2` | — | `#f3f3f3` | 9 |
| `--slds-g-color-surface-container-3` | — | `#e5e5e5` | 2 |
| `--slds-g-color-surface-container-inverse-1` | — | `#032d60` | 0 |
| `--slds-g-color-surface-container-inverse-2` | — | `#001639` | 0 |
| `--slds-g-color-surface-inverse-1` | — | `#032d60` | 0 |
| `--slds-g-color-surface-inverse-2` | — | `#001639` | 0 |

## color-warning (15)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-color-warning-1` | — | `var(--slds-r-color-warning-40)` | 0 |
| `--slds-g-color-warning-base-10` | `#201600` | `var(--slds-r-color-warning-10)` | 0 |
| `--slds-g-color-warning-base-100` | `#ffffff` | `var(--slds-g-color-neutral-base-100)` | 0 |
| `--slds-g-color-warning-base-15` | — | `var(--slds-r-color-warning-15)` | 0 |
| `--slds-g-color-warning-base-20` | `#3e2b02` | `var(--slds-r-color-warning-20)` | 0 |
| `--slds-g-color-warning-base-30` | `#5f3e02` | `var(--slds-r-color-warning-30)` | 0 |
| `--slds-g-color-warning-base-40` | `#825101` | `var(--slds-r-color-warning-40)` | 0 |
| `--slds-g-color-warning-base-50` | `#a96404` | `var(--slds-r-color-warning-50)` | 3 |
| `--slds-g-color-warning-base-60` | `#dd7a01` | `var(--slds-r-color-warning-60)` | 22 |
| `--slds-g-color-warning-base-65` | — | `var(--slds-r-color-warning-65)` | 0 |
| `--slds-g-color-warning-base-70` | `#fe9339` | `var(--slds-r-color-warning-70)` | 2 |
| `--slds-g-color-warning-base-80` | `#ffba90` | `var(--slds-r-color-warning-80)` | 0 |
| `--slds-g-color-warning-base-90` | `#fedfd0` | `var(--slds-r-color-warning-90)` | 0 |
| `--slds-g-color-warning-base-95` | — | `var(--slds-r-color-warning-95)` | 0 |
| `--slds-g-color-warning-container-1` | — | `var(--slds-r-color-warning-60)` | 0 |

## duration-immediately (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-duration-immediately` | — | `0.05s` | 0 |

## duration-instantly (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-duration-instantly` | — | `0s` | 0 |

## duration-paused (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-duration-paused` | — | `3.2s` | 0 |

## duration-promptly (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-duration-promptly` | — | `0.2s` | 0 |

## duration-quickly (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-duration-quickly` | — | `0.1s` | 0 |

## duration-slowly (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-duration-slowly` | — | `0.4s` | 0 |

## duration-toast (2)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-duration-toast-medium` | — | `9.6s` | 0 |
| `--slds-g-duration-toast-short` | — | `4.8s` | 0 |

## font-family (3)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-font-family` | — | `var(--slds-g-font-family-base)` | 0 |
| `--slds-g-font-family-base` | — | `system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'` | 1 |
| `--slds-g-font-family-monospace` | — | `Consolas, Menlo, Monaco, Courier, monospace` | 0 |

## font-line (9)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-font-line-clamp` | — | `3` | 0 |
| `--slds-g-font-line-height-1` | — | `1` | 1 |
| `--slds-g-font-line-height-2` | — | `1.25` | 1 |
| `--slds-g-font-line-height-3` | — | `1.375` | 1 |
| `--slds-g-font-line-height-4` | — | `1.5` | 1 |
| `--slds-g-font-line-height-5` | — | `1.75` | 1 |
| `--slds-g-font-line-height-6` | — | `2` | 1 |
| `--slds-g-font-line-height-base` | — | `1.5` | 2 |
| `--slds-g-font-line-height-var-base` | — | `var(--slds-g-font-line-height-base)` | 1 |

## font-lineheight (8)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-font-lineheight-1` | — | `var(--slds-g-font-line-height-1)` | 0 |
| `--slds-g-font-lineheight-2` | — | `var(--slds-g-font-line-height-2)` | 0 |
| `--slds-g-font-lineheight-3` | — | `var(--slds-g-font-line-height-3)` | 0 |
| `--slds-g-font-lineheight-4` | — | `var(--slds-g-font-line-height-4)` | 0 |
| `--slds-g-font-lineheight-5` | — | `var(--slds-g-font-line-height-5)` | 0 |
| `--slds-g-font-lineheight-6` | — | `var(--slds-g-font-line-height-6)` | 0 |
| `--slds-g-font-lineheight-base` | — | `var(--slds-g-font-line-height-base)` | 0 |
| `--slds-g-font-lineheight-var-base` | — | `var(--slds-g-font-line-height-var-base)` | 0 |

## font-scale (31)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-font-scale-1` | — | `0.875rem` | 1 |
| `--slds-g-font-scale-10` | — | `var(--slds-g-font-scale-8)` | 0 |
| `--slds-g-font-scale-2` | — | `1rem` | 2 |
| `--slds-g-font-scale-3` | — | `1.125rem` | 1 |
| `--slds-g-font-scale-4` | — | `1.25rem` | 1 |
| `--slds-g-font-scale-5` | — | `1.5rem` | 1 |
| `--slds-g-font-scale-6` | — | `1.75rem` | 1 |
| `--slds-g-font-scale-7` | — | `2rem` | 1 |
| `--slds-g-font-scale-8` | — | `2.625rem` | 3 |
| `--slds-g-font-scale-9` | — | `var(--slds-g-font-scale-8)` | 0 |
| `--slds-g-font-scale-base` | — | `0.8125rem` | 2 |
| `--slds-g-font-scale-neg-1` | — | `0.75rem` | 3 |
| `--slds-g-font-scale-neg-2` | — | `0.625rem` | 2 |
| `--slds-g-font-scale-neg-3` | — | `var(--slds-g-font-scale-neg-2)` | 1 |
| `--slds-g-font-scale-neg-4` | — | `var(--slds-g-font-scale-neg-3)` | 0 |
| `--slds-g-font-scale-ratio` | — | `1.15` | 0 |
| `--slds-g-font-scale-var-1` | — | `var(--slds-g-font-scale-1)` | 0 |
| `--slds-g-font-scale-var-10` | — | `var(--slds-g-font-scale-var-8)` | 0 |
| `--slds-g-font-scale-var-2` | — | `var(--slds-g-font-scale-2)` | 1 |
| `--slds-g-font-scale-var-3` | — | `var(--slds-g-font-scale-3)` | 0 |
| `--slds-g-font-scale-var-4` | — | `var(--slds-g-font-scale-4)` | 0 |
| `--slds-g-font-scale-var-5` | — | `var(--slds-g-font-scale-5)` | 0 |
| `--slds-g-font-scale-var-6` | — | `var(--slds-g-font-scale-6)` | 0 |
| `--slds-g-font-scale-var-7` | — | `var(--slds-g-font-scale-7)` | 0 |
| `--slds-g-font-scale-var-8` | — | `var(--slds-g-font-scale-8)` | 2 |
| `--slds-g-font-scale-var-9` | — | `var(--slds-g-font-scale-var-8)` | 0 |
| `--slds-g-font-scale-var-base` | — | `var(--slds-g-font-scale-base)` | 0 |
| `--slds-g-font-scale-var-neg-1` | — | `var(--slds-g-font-scale-neg-1)` | 0 |
| `--slds-g-font-scale-var-neg-2` | — | `var(--slds-g-font-scale-neg-2)` | 1 |
| `--slds-g-font-scale-var-neg-3` | — | `var(--slds-g-font-scale-var-neg-2)` | 1 |
| `--slds-g-font-scale-var-neg-4` | — | `var(--slds-g-font-scale-var-neg-3)` | 0 |

## font-size (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-font-size-base` | — | `var(--slds-g-font-scale-base)` | 0 |

## font-weight (8)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-font-weight-1` | — | `100` | 0 |
| `--slds-g-font-weight-2` | — | `200` | 0 |
| `--slds-g-font-weight-3` | — | `300` | 0 |
| `--slds-g-font-weight-4` | — | `400` | 2 |
| `--slds-g-font-weight-5` | — | `500` | 0 |
| `--slds-g-font-weight-6` | — | `600` | 0 |
| `--slds-g-font-weight-7` | — | `700` | 2 |
| `--slds-g-font-weight-bold` | — | `bold` | 0 |

## link-color (4)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-link-color` | `#0b5cab` | — | 8 |
| `--slds-g-link-color-active` | `#032d60` | — | 0 |
| `--slds-g-link-color-focus` | `#014486` | — | 3 |
| `--slds-g-link-color-hover` | `#014486` | — | 4 |

## radius-border (6)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-radius-border-1` | — | `0.125rem` | 0 |
| `--slds-g-radius-border-2` | — | `0.25rem` | 7 |
| `--slds-g-radius-border-3` | — | `0.5rem` | 0 |
| `--slds-g-radius-border-4` | — | `1rem` | 0 |
| `--slds-g-radius-border-circle` | — | `100%` | 0 |
| `--slds-g-radius-border-pill` | — | `15rem` | 0 |

## ratio-landscape (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-ratio-landscape` | — | `4/3` | 0 |

## ratio-portrait (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-ratio-portrait` | — | `3/4` | 0 |

## ratio-square (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-ratio-square` | — | `1` | 0 |

## ratio-ultrawide (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-ratio-ultrawide` | — | `18/5` | 0 |

## ratio-wide (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-ratio-wide` | — | `16/9` | 0 |

## shadow (6)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-1` | — | `0px 2px 2px 0px #0000001A` | 2 |
| `--slds-g-shadow-2` | — | `0px 2px 3px 0px #00000027` | 2 |
| `--slds-g-shadow-3` | — | `0px 2px 4px 0px #00000027` | 1 |
| `--slds-g-shadow-4` | — | `0px 2px 5px 0px #00000027` | 3 |
| `--slds-g-shadow-5` | — | `var(--slds-g-shadow-4)` | 0 |
| `--slds-g-shadow-6` | — | `var(--slds-g-shadow-4)` | 0 |

## shadow-block (8)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-block-end-1` | — | `var(--slds-g-shadow-1)` | 1 |
| `--slds-g-shadow-block-end-2` | — | `var(--slds-g-shadow-2)` | 1 |
| `--slds-g-shadow-block-end-3` | — | `var(--slds-g-shadow-3)` | 1 |
| `--slds-g-shadow-block-end-4` | — | `var(--slds-g-shadow-4)` | 1 |
| `--slds-g-shadow-block-start-1` | — | `0px -2px 2px 0px #0000001A` | 1 |
| `--slds-g-shadow-block-start-2` | — | `0px -2px 3px 0px #00000027` | 1 |
| `--slds-g-shadow-block-start-3` | — | `0px -2px 4px 0px #00000027` | 1 |
| `--slds-g-shadow-block-start-4` | — | `0px -2px 4px 0px #00000027` | 1 |

## shadow-blockend (4)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-blockend-1` | — | `var(--slds-g-shadow-block-end-1)` | 0 |
| `--slds-g-shadow-blockend-2` | — | `var(--slds-g-shadow-block-end-2)` | 0 |
| `--slds-g-shadow-blockend-3` | — | `var(--slds-g-shadow-block-end-3)` | 0 |
| `--slds-g-shadow-blockend-4` | — | `var(--slds-g-shadow-block-end-4)` | 0 |

## shadow-blockstart (4)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-blockstart-1` | — | `var(--slds-g-shadow-block-start-1)` | 0 |
| `--slds-g-shadow-blockstart-2` | — | `var(--slds-g-shadow-block-start-2)` | 0 |
| `--slds-g-shadow-blockstart-3` | — | `var(--slds-g-shadow-block-start-3)` | 0 |
| `--slds-g-shadow-blockstart-4` | — | `var(--slds-g-shadow-block-start-4)` | 0 |

## shadow-inline (8)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-inline-end-1` | — | `2px 0px 2px 0px #0000001A` | 1 |
| `--slds-g-shadow-inline-end-2` | — | `2px 0px 3px 0px #00000027` | 1 |
| `--slds-g-shadow-inline-end-3` | — | `2px 0px 4px 0px #00000027` | 1 |
| `--slds-g-shadow-inline-end-4` | — | `2px 0px 4px 0px #00000027` | 1 |
| `--slds-g-shadow-inline-start-1` | — | `-2px 0px 2px 0px #0000001A` | 1 |
| `--slds-g-shadow-inline-start-2` | — | `-2px 0px 3px 0px #00000027` | 1 |
| `--slds-g-shadow-inline-start-3` | — | `-2px 0px 4px 0px #00000027` | 1 |
| `--slds-g-shadow-inline-start-4` | — | `-2px 0px 4px 0px #00000027` | 1 |

## shadow-inlineend (4)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-inlineend-1` | — | `var(--slds-g-shadow-inline-end-1)` | 0 |
| `--slds-g-shadow-inlineend-2` | — | `var(--slds-g-shadow-inline-end-2)` | 0 |
| `--slds-g-shadow-inlineend-3` | — | `var(--slds-g-shadow-inline-end-3)` | 0 |
| `--slds-g-shadow-inlineend-4` | — | `var(--slds-g-shadow-inline-end-4)` | 0 |

## shadow-inlinestart (4)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-inlinestart-1` | — | `var(--slds-g-shadow-inline-start-1)` | 0 |
| `--slds-g-shadow-inlinestart-2` | — | `var(--slds-g-shadow-inline-start-2)` | 0 |
| `--slds-g-shadow-inlinestart-3` | — | `var(--slds-g-shadow-inline-start-3)` | 0 |
| `--slds-g-shadow-inlinestart-4` | — | `var(--slds-g-shadow-inline-start-4)` | 0 |

## shadow-inset (2)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-inset-focus-1` | `0 0 0 2px #FFFFFF inset, 0 0 0 4px #0B5CAB inset` | `0px 0px 0px 2px var(--slds-g-color-brand-base-40) inset` | 56 |
| `--slds-g-shadow-inset-inverse-focus-1` | `0 0 0 2px #0B5CAB inset, 0 0 0 4px #FFFFFF inset` | `0px 0px 0px 2px var(--slds-g-color-brand-base-40) inset, 0px 0px 0px 4px var(--slds-g-color-neutral-base-100) inset` | 31 |

## shadow-insetinverse (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-insetinverse-focus-1` | — | `var(--slds-g-shadow-inset-inverse-focus-1)` | 0 |

## shadow-inverse (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-inverse-1` | — | `0 0 3px #f3f3f3` | 0 |

## shadow-outline (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-outline-focus-1` | `0 0 0 2px #0B5CAB` | `0px 0px 0px 2px var(--slds-g-color-brand-base-40)` | 41 |

## shadow-outset (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-shadow-outset-focus-1` | `0 0 0 2px #FFFFFF, 0 0 0 4px #0B5CAB` | `0px 0px 0px 2px var(--slds-g-color-neutral-base-100), 0px 0px 0px 4px var(--slds-g-color-brand-base-40)` | 94 |

## sizing (16)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-sizing-1` | — | `0.125rem` | 1 |
| `--slds-g-sizing-10` | — | `3rem` | 0 |
| `--slds-g-sizing-11` | — | `4rem` | 0 |
| `--slds-g-sizing-12` | — | `5rem` | 0 |
| `--slds-g-sizing-13` | — | `10rem` | 0 |
| `--slds-g-sizing-14` | — | `15rem` | 0 |
| `--slds-g-sizing-15` | — | `20rem` | 0 |
| `--slds-g-sizing-16` | — | `30rem` | 0 |
| `--slds-g-sizing-2` | — | `0.25rem` | 0 |
| `--slds-g-sizing-3` | — | `0.5rem` | 0 |
| `--slds-g-sizing-4` | — | `0.75rem` | 1 |
| `--slds-g-sizing-5` | — | `1rem` | 0 |
| `--slds-g-sizing-6` | — | `1.25rem` | 0 |
| `--slds-g-sizing-7` | — | `1.5rem` | 0 |
| `--slds-g-sizing-8` | — | `1.75rem` | 0 |
| `--slds-g-sizing-9` | — | `2rem` | 0 |

## sizing-base (1)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-sizing-base` | — | `1rem` | 0 |

## sizing-border (4)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-sizing-border-1` | — | `1px` | 0 |
| `--slds-g-sizing-border-2` | — | `2px` | 1 |
| `--slds-g-sizing-border-3` | — | `3px` | 0 |
| `--slds-g-sizing-border-4` | — | `4px` | 0 |

## sizing-content (3)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-sizing-content-1` | — | `20ch` | 0 |
| `--slds-g-sizing-content-2` | — | `45ch` | 0 |
| `--slds-g-sizing-content-3` | — | `60ch` | 0 |

## sizing-heading (3)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-sizing-heading-1` | — | `20ch` | 0 |
| `--slds-g-sizing-heading-2` | — | `25ch` | 0 |
| `--slds-g-sizing-heading-3` | — | `35ch` | 0 |

## spacing (12)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-spacing-1` | — | `0.25rem` | 6 |
| `--slds-g-spacing-10` | — | `4rem` | 3 |
| `--slds-g-spacing-11` | — | `4.5rem` | 3 |
| `--slds-g-spacing-12` | — | `5rem` | 3 |
| `--slds-g-spacing-2` | — | `0.5rem` | 4 |
| `--slds-g-spacing-3` | — | `0.75rem` | 3 |
| `--slds-g-spacing-4` | — | `1rem` | 4 |
| `--slds-g-spacing-5` | — | `1.5rem` | 3 |
| `--slds-g-spacing-6` | — | `2rem` | 3 |
| `--slds-g-spacing-7` | — | `2.5rem` | 3 |
| `--slds-g-spacing-8` | — | `3rem` | 3 |
| `--slds-g-spacing-9` | — | `3.5rem` | 3 |

## spacing-var (36)

| Hook | :root | :where(html) | reads |
|---|---|---|---|
| `--slds-g-spacing-var-1` | — | `var(--slds-g-spacing-1)` | 0 |
| `--slds-g-spacing-var-10` | — | `var(--slds-g-spacing-10)` | 0 |
| `--slds-g-spacing-var-11` | — | `var(--slds-g-spacing-11)` | 0 |
| `--slds-g-spacing-var-12` | — | `var(--slds-g-spacing-12)` | 0 |
| `--slds-g-spacing-var-2` | — | `var(--slds-g-spacing-2)` | 0 |
| `--slds-g-spacing-var-3` | — | `var(--slds-g-spacing-3)` | 0 |
| `--slds-g-spacing-var-4` | — | `var(--slds-g-spacing-4)` | 0 |
| `--slds-g-spacing-var-5` | — | `var(--slds-g-spacing-5)` | 0 |
| `--slds-g-spacing-var-6` | — | `var(--slds-g-spacing-6)` | 0 |
| `--slds-g-spacing-var-7` | — | `var(--slds-g-spacing-7)` | 0 |
| `--slds-g-spacing-var-8` | — | `var(--slds-g-spacing-8)` | 0 |
| `--slds-g-spacing-var-9` | — | `var(--slds-g-spacing-9)` | 0 |
| `--slds-g-spacing-var-block-1` | — | `var(--slds-g-spacing-1)` | 0 |
| `--slds-g-spacing-var-block-10` | — | `var(--slds-g-spacing-10)` | 0 |
| `--slds-g-spacing-var-block-11` | — | `var(--slds-g-spacing-11)` | 0 |
| `--slds-g-spacing-var-block-12` | — | `var(--slds-g-spacing-12)` | 0 |
| `--slds-g-spacing-var-block-2` | — | `var(--slds-g-spacing-2)` | 0 |
| `--slds-g-spacing-var-block-3` | — | `var(--slds-g-spacing-3)` | 0 |
| `--slds-g-spacing-var-block-4` | — | `var(--slds-g-spacing-4)` | 0 |
| `--slds-g-spacing-var-block-5` | — | `var(--slds-g-spacing-5)` | 0 |
| `--slds-g-spacing-var-block-6` | — | `var(--slds-g-spacing-6)` | 0 |
| `--slds-g-spacing-var-block-7` | — | `var(--slds-g-spacing-7)` | 0 |
| `--slds-g-spacing-var-block-8` | — | `var(--slds-g-spacing-8)` | 0 |
| `--slds-g-spacing-var-block-9` | — | `var(--slds-g-spacing-9)` | 0 |
| `--slds-g-spacing-var-inline-1` | — | `var(--slds-g-spacing-1)` | 0 |
| `--slds-g-spacing-var-inline-10` | — | `var(--slds-g-spacing-10)` | 0 |
| `--slds-g-spacing-var-inline-11` | — | `var(--slds-g-spacing-11)` | 0 |
| `--slds-g-spacing-var-inline-12` | — | `var(--slds-g-spacing-12)` | 0 |
| `--slds-g-spacing-var-inline-2` | — | `var(--slds-g-spacing-2)` | 0 |
| `--slds-g-spacing-var-inline-3` | — | `var(--slds-g-spacing-3)` | 0 |
| `--slds-g-spacing-var-inline-4` | — | `var(--slds-g-spacing-4)` | 0 |
| `--slds-g-spacing-var-inline-5` | — | `var(--slds-g-spacing-5)` | 0 |
| `--slds-g-spacing-var-inline-6` | — | `var(--slds-g-spacing-6)` | 0 |
| `--slds-g-spacing-var-inline-7` | — | `var(--slds-g-spacing-7)` | 0 |
| `--slds-g-spacing-var-inline-8` | — | `var(--slds-g-spacing-8)` | 0 |
| `--slds-g-spacing-var-inline-9` | — | `var(--slds-g-spacing-9)` | 0 |
