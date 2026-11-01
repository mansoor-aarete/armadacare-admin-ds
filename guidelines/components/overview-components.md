# Component registry

Every exported component in `src/app/components`, generated from the TypeScript source (exported `XxxProps` type and its props). **Bold** = required prop; `?` = optional. All components: SLDS 1 blueprint markup (or SLDS-class composition where SLDS 1 has no blueprint — noted in each doc), shown in every variant and state on `/showcase`, checked by `npm run verify` and `npm run typecheck`.

Status **stable** = API frozen for v1.0 (changes are additive). Role **building block** = used inside another component; prefer the parent in pages.

## Console shell

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| AppNav | `shell/AppNav.tsx` | `AppNavProps` | **`appName`**, `onAppLauncher?`, `objectItem?`, `items?`, `tabs?`, `onSelect?`, `onMenuSelect?` | `app-nav.md` | component | **stable** |
| ConsoleShell | `shell/ConsoleShell.tsx` | `ConsoleShellProps` | **`globalHeader`**, **`appNav`**, `splitView?`, `utilityBar?`, **`children`**, `workspacePadding?`, `fill?` | `console-shell.md` | component | **stable** |
| GlobalHeader | `shell/GlobalHeader.tsx` | `GlobalHeaderProps` | `logo?`, `search?`, `favorites?`, `onGlobalActions?`, `onHelp?`, `onSetup?`, `notificationCount?`, `onNotifications?`, **`avatar`**, **`userName`**, `onAvatar?`, `environment?`, `position?` | `global-header.md` | component | **stable** |
| SplitView | `shell/SplitView.tsx` | `SplitViewProps` | **`open`**, **`onToggle`**, **`iconName`**, **`objectLabel`**, **`listViewName`**, `listViews?`, `onListViewSelect?`, `pinned?`, `onPin?`, `controls?`, `onControlSelect?`, **`meta`**, `onRefresh?`, `search?`, `sort?`, `listInfo?`, **`items`**, `currentId?`, **`onOpen`**, `selection?` | `split-view.md` | component | **stable** |
| UtilityBar | `shell/UtilityBar.tsx` | `UtilityBarProps` | **`items`**, `activeId?`, **`onSelect`**, `panel?`, `position?` | `utility-bar.md` | component | **stable** |
| WorkspaceSubTabs | `shell/WorkspaceSubTabs.tsx` | `WorkspaceSubTabsProps` | **`tabs`**, **`activeId`**, **`onSelect`**, `onClose?`, `onMenu?`, `children?` | `workspace-sub-tabs.md` | component | **stable** |
| WorkspaceTabs | `shell/WorkspaceTabs.tsx` | `WorkspaceTabsProps` | **`tabs`**, `activeId?`, **`onSelect`**, `onClose?`, `onMenuSelect?` | `workspace-tabs.md` | component | **stable** |

## Page and record layout

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| ExpandableSection | `layout/ExpandableSection.tsx` | `ExpandableSectionProps` | **`title`**, **`children`**, `collapsible?`, `open?`, `onToggle?` | `expandable-section.md` | component | **stable** |
| HighlightsPanel | `layout/HighlightsPanel.tsx` | `HighlightsPanelProps` | **`iconName`**, **`objectLabel`**, **`title`**, `actions?`, `overflowActions?`, `overflowLength?`, `onAction?`, `follow?`, `onHierarchy?`, `details?`, `extraActions?` | `highlights-panel.md` | component | **stable** |
| ListViewToolbar | `layout/ListViewToolbar.tsx` | `ListViewToolbarProps` | `search?`, `settingsItems?`, `displayItems?`, `onMenuSelect?`, `onRefresh?`, `onSort?`, `onEdit?`, `charts?`, `filters?` | `list-view-toolbar.md` | component | **stable** |
| PageHeader | `layout/PageHeader.tsx` | `PageHeaderProps` | `variant?`, **`title`**, `iconName?`, `objectLabel?`, `breadcrumbs?`, `listViews?`, `onListViewSelect?`, `pin?`, `actions?`, `meta?`, `controls?`, `details?` | `page-header.md` | component | **stable** |
| Tabs | `layout/Tabs.tsx` | `TabsProps` | **`items`**, **`activeId`**, **`onSelect`**, `size?`, `card?` | `tabs.md` | component | **stable** |

## Record fields

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| RecordField | `record/RecordField.tsx` | `RecordFieldProps` | **`label`**, `value?`, `layout?`, `helpText?`, `required?`, `onEdit?`, `action?`, `capsLabel?`, `fullWidth?` | `record-field.md` | component | **stable** |
| RecordFieldGrid | `record/RecordFieldGrid.tsx` | `RecordFieldGridProps` | **`fields`**, `columns?` | `record-field-grid.md` | component | **stable** |

## Data

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| DataTable | `data/DataTable.tsx` | `DataTableProps` | **`label`**, **`columns`**, **`rows`**, `variant?`, `firstColumnIsRowHeader?`, `onLinkClick?`, `rowNumberColumn?`, `selection?`, `sort?`, `onSort?`, `columnMenus?`, `onColumnMenu?`, `resizable?`, `rowActions?`, `onRowAction?` | `data-table.md` | component | **stable** |
| Pagination | `data/Pagination.tsx` | `PaginationProps` | **`page`**, **`pageCount`**, **`onPageChange`**, `pageSize?`, `pageSizeOptions?`, `onPageSizeChange?`, `label?` | `pagination.md` | component | **stable** |
| TreeGrid | `data/TreeGrid.tsx` | `TreeGridProps` | **`label`**, **`columns`**, **`rows`**, **`expandedIds`**, **`onToggle`**, `onLinkClick?`, `capsHeader?`, `rowActions?`, `onRowAction?` | `tree-grid.md` | component | **stable** |

## Cards

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| Card | `cards/Card.tsx` | `CardProps` | `title?`, `onTitleClick?`, `titleHref?`, `meta?`, `iconName?`, `actions?`, `children?`, `bodyPadding?`, `footer?`, `shaded?`, `className?`, `boundary?` | `card.md` | component | **stable** |
| EinsteinCard | `cards/EinsteinCard.tsx` | `EinsteinCardProps` | `title?`, `onTitleClick?`, **`children`**, `centered?`, `footer?` | `einstein-card.md` | component | **stable** |
| MetricTile | `cards/MetricTile.tsx` | `MetricTileProps` | **`label`**, **`value`**, `selected?`, `onSelect?` | `metric-tile.md` | component | **stable** |
| RelatedListCard | `cards/RelatedListCard.tsx` | `RelatedListCardProps` | **`iconName`**, **`title`**, **`count`**, `onTitleClick?`, `meta?`, `buttons?`, `onButton?`, `menuItems?`, `onMenuSelect?`, `settingsItems?`, `onRefresh?`, `records?`, `onRecordClick?`, `children?`, `loading?`, `onViewAll?` | `related-list-card.md` | component | **stable** |
| RelatedListQuickLinks | `cards/RelatedListQuickLinks.tsx` | `RelatedListQuickLinksProps` | **`links`**, **`onSelect`**, `totalCount?`, `onShowAll?`, `title?`, `helpText?` | `related-list-quick-links.md` | component | **stable** |

## Navigation

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| Breadcrumb | `navigation/Breadcrumb.tsx` | `BreadcrumbProps` | **`items`**, `className?` | `breadcrumb.md` | component | **stable** |
| VerticalNav | `navigation/VerticalNav.tsx` | `VerticalNavProps` | **`label`**, **`sections`**, **`activeId`**, **`onSelect`**, `shaded?`, `compact?`, `capsTitles?` | `vertical-nav.md` | component | **stable** |

## Overlays

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| DockedComposer | `overlays/DockedComposer.tsx` | `DockedComposerProps` | **`title`**, **`iconName`**, `minimized?`, `focused?`, `onMinimize?`, `onExpand?`, `onClose?`, **`children`**, `footer?`, `position?` | `docked-composer.md` | component | **stable** |
| ErrorPopover | `overlays/ErrorPopover.tsx` | `ErrorPopoverProps` | **`fields`**, `heading?`, `intro?`, `messages?`, **`onClose`**, `nubbin?` | `error-popover.md` | component | **stable** |
| HelpText | `overlays/HelpText.tsx` | `HelpTextProps` | **`content`**, `assistiveText?`, `defaultOpen?` | `help-text.md` | component | **stable** |
| Modal | `overlays/Modal.tsx` | `ModalProps` | **`open`**, `heading?`, `tagline?`, `headless?`, **`children`**, `footer?`, **`onClose`**, `size?`, `hideClose?`, `bodyPadding?`, `inline?` | `modal.md` | component | **stable** |
| Popover | `overlays/Popover.tsx` | `PopoverProps` | **`heading`**, **`children`**, `variant?`, `iconName?`, `nubbin?`, `onClose?`, `footer?`, `id?`, `className?` | `popover.md` | component | **stable** |
| Tooltip | `overlays/Tooltip.tsx` | `TooltipProps` | **`id`**, **`children`**, `nubbin?`, `placement?` | `tooltip.md` | component | **stable** |

## Forms

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| Checkbox | `forms/Checkbox.tsx` | `CheckboxProps` | **`label`**, `checked?`, `defaultChecked?`, `indeterminate?`, `onChange?`, `disabled?`, `required?`, `error?`, `hideLabel?`, `name?`, `value?`, `id?`, `wrapper?`, `className?` | `checkbox.md` | component | **stable** |
| CheckboxGroup | `forms/CheckboxGroup.tsx` | `CheckboxGroupProps` | **`legend`**, **`options`**, **`value`**, **`onChange`**, `layout?`, `required?`, `disabled?`, `error?` | `checkbox-group.md` | component | **stable** |
| Combobox | `forms/Combobox.tsx` | `ComboboxProps` | **`label`**, `hideLabel?`, `required?`, `disabled?`, `error?`, `helpText?`, `fieldLevelHelp?`, `layout?`, `placeholder?`, `id?`, `defaultOpen?`, `variant?`, **`options`**, `value?`, `defaultValue?`, `onChange?`, `onSearchChange?`, `objectSwitcher?` | `combobox.md` | component | **stable** |
| ComboboxListbox | `forms/ComboboxListbox.tsx` | `ComboboxListboxProps` | **`id`**, **`kind`**, **`options`**, `selectedValue?`, **`focusedIndex`**, **`optionId`**, **`onPick`**, **`onFocusIndex`**, **`ariaLabel`**, `className?` | `combobox-listbox.md` | building block | **stable** |
| ComboboxObjectSwitcher | `forms/ComboboxObjectSwitcher.tsx` | `ComboboxObjectSwitcherProps` | **`config`**, `disabled?` | `combobox-object-switcher.md` | building block | **stable** |
| CompoundField | `forms/CompoundField.tsx` | `CompoundFieldProps` | **`label`**, **`rows`**, `required?`, `address?`, `layout?`, `hideLabel?`, `fieldLevelHelp?`, `error?`, `id?` | `compound-field.md` | component | **stable** |
| Datepicker | `forms/Datepicker.tsx` | `DatepickerProps` | **`label`**, `value?`, `defaultValue?`, `onChange?`, `required?`, `disabled?`, `error?`, `fieldLevelHelp?`, `hideLabel?`, `layout?`, `showFormatHint?`, `today?`, `yearRange?`, `defaultOpen?`, `id?` | `datepicker.md` | component | **stable** |
| DatepickerCalendar | `forms/DatepickerCalendar.tsx` | `DatepickerCalendarProps` | **`idPrefix`**, **`value`**, **`today`**, **`onSelect`**, **`onClose`**, **`yearRange`**, `autoFocus?` | `datepicker-calendar.md` | building block | **stable** |
| DualListbox | `forms/DualListbox.tsx` | `DualListboxProps` | **`label`**, `sourceLabel?`, `selectedLabel?`, **`options`**, **`value`**, **`onChange`**, `required?`, `disabled?`, `error?`, `assistiveInstructions?`, `defaultHighlighted?`, `responsive?`, `size?` | `dual-listbox.md` | component | **stable** |
| FileSelector | `forms/FileSelector.tsx` | `FileSelectorProps` | `label?`, `variant?`, **`onFiles`**, `accept?`, `multiple?`, `disabled?`, `error?`, `buttonLabel?`, `dropLabel?` | `file-selector.md` | component | **stable** |
| FormElement | `forms/FormElement.tsx` | `FormElementProps` | **`inputId`**, **`label`**, `hideLabel?`, `required?`, `error?`, `helpText?`, `hideHelpText?`, `fieldLevelHelp?`, `layout?`, `labelAs?`, `labelId?`, `controlClassName?`, `className?`, **`children`**, `dropdown?` | `form-element.md` | building block | **stable** |
| FormFooter | `forms/FormFooter.tsx` | `FormFooterProps` | **`actions`**, **`onAction`**, `hasErrors?`, `onErrorClick?`, `errorPopover?`, `position?` | `form-footer.md` | component | **stable** |
| Input | `forms/Input.tsx` | `InputProps` | **`label`**, `type?`, `onChange?`, `hideLabel?`, `error?`, `helpText?`, `fieldLevelHelp?`, `layout?`, `iconLeft?`, `iconRight?` + native `<input>` attributes | `input.md` | component | **stable** |
| RadioGroup | `forms/RadioGroup.tsx` | `RadioGroupProps` | **`legend`**, `hideLegend?`, **`options`**, **`value`**, **`onChange`**, `required?`, `disabled?`, `error?`, `name?` | `radio-group.md` | component | **stable** |
| RichTextEditor | `forms/RichTextEditor.tsx` | `RichTextEditorProps` | **`label`**, `hideLabel?`, `defaultValue?`, `onChange?`, `placeholder?`, `onInsertImage?`, `disabled?`, `error?`, `fill?`, `autoFocus?` | `rich-text-editor.md` | component | **stable** |
| Select | `forms/Select.tsx` | `SelectProps` | **`label`**, **`options`**, `hideLabel?`, `required?`, `disabled?`, `error?`, `helpText?`, `layout?`, `id?`, `name?`, `multiple?`, `value?`, `defaultValue?`, `onChange?`, `placeholderOption?`, `size?` | `select.md` | component | **stable** |
| Textarea | `forms/Textarea.tsx` | `TextareaProps` | **`label`**, `onChange?`, `hideLabel?`, `error?`, `helpText?`, `fieldLevelHelp?`, `layout?` + native `<textarea>` attributes | `textarea.md` | component | **stable** |
| Timepicker | `forms/Timepicker.tsx` | `TimepickerProps` | **`label`**, `value?`, `defaultValue?`, `onChange?`, `step?`, `placeholder?`, `required?`, `disabled?`, `error?`, `hideLabel?`, `layout?`, `defaultOpen?`, `id?` | `timepicker.md` | component | **stable** |
| Toggle | `forms/Toggle.tsx` | `ToggleProps` | **`label`**, `checked?`, `defaultChecked?`, `onChange?`, `onLabel?`, `offLabel?`, `disabled?`, `hideLabel?`, `capsLabel?`, `layout?`, `name?` | `toggle.md` | component | **stable** |

## Buttons and menus

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| Button | `buttons/Button.tsx` | `ButtonProps` | **`label`**, `variant?`, `iconName?`, `iconPosition?`, `iconSize?`, `className?` + native `<button>` attributes | `button.md` | component | **stable** |
| ButtonGroup | `buttons/ButtonGroup.tsx` | `ButtonGroupProps` | **`children`**, `kind?`, `label?`, `className?` | `button-group.md` | component | **stable** |
| ButtonIcon | `buttons/ButtonIcon.tsx` | `ButtonIconProps` | **`iconName`**, **`assistiveText`**, `variant?`, `size?`, `iconSize?`, `pressed?`, `menu?`, `feedback?`, `className?`, `iconClassName?` + native `<button>` attributes | `button-icon.md` | component | **stable** |
| ButtonMenu | `buttons/ButtonMenu.tsx` | `ButtonMenuProps` | **`items`**, `onSelect?`, `label?`, `labelVariant?`, `iconName?`, **`assistiveText`**, `iconVariant?`, `iconSize?`, `iconClassName?`, `position?`, `length?`, `size?`, `actions?`, `disabled?`, `defaultOpen?`, `className?` | `button-menu.md` | component | **stable** |
| ButtonStateful | `buttons/ButtonStateful.tsx` | `ButtonStatefulProps` | `selected?`, `defaultSelected?`, `onToggle?`, `disabled?`, `notSelected?`, `selectedState?`, `selectedFocus?`, `className?` | `button-stateful.md` | component | **stable** |
| MenuDropdown | `buttons/MenuDropdown.tsx` | `MenuDropdownProps` | **`items`**, **`onSelect`**, **`onClose`**, `position?`, `length?`, `size?`, `actions?`, `autoFocus?`, `ariaLabel?` | `menu-dropdown.md` | building block | **stable** |

## Feedback

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| Avatar | `feedback/Avatar.tsx` | `AvatarProps` | **`content`**, `size?`, `shape?`, `className?` | `avatar.md` | component | **stable** |
| Badge | `feedback/Badge.tsx` | `BadgeProps` | **`children`**, `variant?`, `className?` | `badge.md` | component | **stable** |
| DesertIllustration | `feedback/DesertIllustration.tsx` | `DesertIllustrationProps` | — | `desert-illustration.md` | building block | **stable** |
| EmptyState | `feedback/EmptyState.tsx` | `EmptyStateProps` | `variant?`, `heading?`, `message?`, `size?`, `shaded?`, `regionSize?`, `regionLabel?` | `empty-state.md` | component | **stable** |
| Pill | `feedback/Pill.tsx` | `PillProps` | **`label`**, `href?`, `onClick?`, `iconName?`, `avatar?`, `onRemove?`, `error?` | `pill.md` | component | **stable** |
| PillContainer | `feedback/PillContainer.tsx` | `PillContainerProps` | **`children`**, `label?` | `pill-container.md` | component | **stable** |
| ScopedNotification | `feedback/ScopedNotification.tsx` | `ScopedNotificationProps` | `variant?`, **`children`**, `assistiveText?` | `scoped-notification.md` | component | **stable** |
| Spinner | `feedback/Spinner.tsx` | `SpinnerProps` | `size?`, `variant?`, `layout?`, `assistiveText?` | `spinner.md` | component | **stable** |

## Icons

| Component | File | Props type | Props | Doc | Role | Status |
|---|---|---|---|---|---|---|
| Icon | `icons/Icon.tsx` | `IconProps` | `size?`, `assistiveText?`, `className?`, `svgClassName?`, **`name`**, `tone?` | `icon.md` | component | **stable** |
| IconSvg | `icons/IconSvg.tsx` | `IconSvgProps` | **`name`**, **`className`** | `icon-svg.md` | building block | **stable** |

Shared utilities (not components): `utils/cx.ts`, `utils/useDismiss.ts`, `utils/formIds.ts`, `utils/dates.ts`; icon registry `icons/registry.ts` (generated by `npm run icons`).
