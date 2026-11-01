import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { ButtonMenu } from "../buttons/ButtonMenu";
import { MenuDropdown, type MenuItem } from "../buttons/MenuDropdown";
import { Checkbox } from "../forms/Checkbox";
import { Input } from "../forms/Input";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { HelpText } from "../overlays/HelpText";
import { IconSvg } from "../icons/IconSvg";
import { cx } from "../utils/cx";
import { useDismiss } from "../utils/useDismiss";

/** One text row of an item: left text and optional right-aligned text (Figma: up to 3 rows). */
export type SplitViewItemRow = { left?: ReactNode; right?: ReactNode };

export type SplitViewItem = {
  id: string;
  /** Title (row 1, left) — also the item's accessible name. */
  title: string;
  /** Row 1 right text, then extra rows. */
  titleRight?: ReactNode;
  rows?: SplitViewItemRow[];
  unread?: boolean;
};

export type SplitViewSort = { label: string; direction: "ascending" | "descending" };

export type SplitViewProps = {
  open: boolean;
  onToggle: (open: boolean) => void;
  /** Object icon of the list (32 px). */
  iconName: ObjectIconName;
  /** Object name for screen readers, e.g. "Plan Years". */
  objectLabel: string;
  /** List view name (Figma: "All", "All Members"); with `listViews` it opens the list-view picker. */
  listViewName: string;
  listViews?: MenuItem[];
  onListViewSelect?: (value: string) => void;
  /** Pin button next to the list name. */
  pinned?: boolean;
  onPin?: () => void;
  /** List view controls (▼, right of the title). */
  controls?: MenuItem[];
  onControlSelect?: (value: string) => void;
  /** Meta line, e.g. "27 items • Updated a few seconds ago" or "4 items selected". */
  meta: string;
  onRefresh?: () => void;
  /** "Search this list…" input. */
  search?: { value: string; onChange: (value: string) => void; placeholder?: string };
  sort?: SplitViewSort;
  /** Info icon text at the right of the list header. */
  listInfo?: string;
  items: SplitViewItem[];
  /** Item open in the workspace (aria-current). */
  currentId?: string;
  onOpen: (id: string) => void;
  /** Row checkboxes (Figma split views). Omit for the plain SLDS list. */
  selection?: { selectedIds: string[]; onChange: (ids: string[]) => void };
};

/**
 * SLDS Split View blueprint (container + toggle, header, sortable list header, list items).
 * Lightning additions seen in Figma: pin button, search input, row checkboxes.
 */
export function SplitView({
  open,
  onToggle,
  iconName,
  objectLabel,
  listViewName,
  listViews,
  onListViewSelect,
  pinned,
  onPin,
  controls,
  onControlSelect,
  meta,
  onRefresh,
  search,
  sort,
  listInfo,
  items,
  currentId,
  onOpen,
  selection,
}: SplitViewProps) {
  const uid = useId();
  const panelId = `${uid}-split-view`;
  const selected = selection?.selectedIds ?? [];
  const allSelected = items.length > 0 && selected.length === items.length;
  const someSelected = selected.length > 0 && !allSelected;
  const currentIndex = Math.max(0, items.findIndex((i) => i.id === currentId));

  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const closePicker = useCallback(() => setPickerOpen(false), []);
  useDismiss(pickerRef, pickerOpen, closePicker);

  const toggleItem = (id: string, checked: boolean) =>
    selection?.onChange(checked ? [...selected, id] : selected.filter((s) => s !== id));

  return (
    <div className={cx("slds-split-view_container", open ? "slds-is-open" : "slds-is-closed")}>
      <ButtonIcon
        iconName="utility:left"
        assistiveText={open ? "Close Split View" : "Open Split View"}
        iconSize="x-small"
        aria-controls={panelId}
        aria-expanded={open ? "true" : "false"}
        className={cx("slds-split-view__toggle-button", open ? "slds-is-open" : "slds-is-closed")}
        onClick={() => onToggle(!open)}
      />
      <article
        hidden={!open}
        id={panelId}
        className="slds-split-view slds-grid slds-grid_vertical slds-grow"
        aria-label={`${objectLabel}: ${listViewName}`}
        style={{ minHeight: 0 }}
      >
        <header className="slds-split-view__header">
          <div className="slds-grid slds-grid_vertical-align-center slds-m-bottom_xx-small">
            <div className="slds-has-flexi-truncate">
              <div className="slds-media slds-media_center">
                <div className="slds-media__figure">
                  <Icon name={iconName} assistiveText={objectLabel} />
                </div>
                <div className="slds-media__body slds-grid slds-grid_vertical-align-center">
                  <h1 className="slds-text-heading_small slds-text-color_default slds-p-right_x-small">
                    {listViews?.length ? (
                      <div ref={pickerRef} className={cx("slds-dropdown-trigger slds-dropdown-trigger_click", pickerOpen && "slds-is-open")}>
                        <button
                          type="button"
                          className="slds-button slds-button_reset slds-type-focus slds-truncate"
                          aria-haspopup="true"
                          aria-expanded={pickerOpen ? "true" : "false"}
                          title={`Select a List View: ${listViewName}`}
                          onClick={() => setPickerOpen((o) => !o)}
                        >
                          <span className="slds-grid slds-has-flexi-truncate slds-grid_vertical-align-center">
                            <span className="slds-truncate" title={listViewName}>
                              {listViewName}
                            </span>
                            <IconSvg name="utility:down" className="slds-button__icon slds-button__icon_right slds-no-flex" />
                          </span>
                        </button>
                        {pickerOpen ? (
                          <MenuDropdown
                            items={listViews}
                            autoFocus
                            onSelect={(v) => {
                              onListViewSelect?.(v);
                              setPickerOpen(false);
                            }}
                            onClose={closePicker}
                          />
                        ) : null}
                      </div>
                    ) : (
                      <span className="slds-truncate" title={listViewName}>
                        {listViewName}
                      </span>
                    )}
                  </h1>
                  {onPin ? (
                    <ButtonIcon
                      iconName="utility:pin"
                      assistiveText={pinned ? "Unpin this list view" : "Pin this list view"}
                      variant="border-filled"
                      size="small"
                      pressed={pinned}
                      onClick={onPin}
                    />
                  ) : null}
                </div>
              </div>
            </div>
            {controls?.length ? (
              <div className="slds-no-flex slds-grid">
                <ButtonMenu assistiveText="List View Controls" items={controls} onSelect={onControlSelect} position="right" />
              </div>
            ) : null}
          </div>
          <div className="slds-grid slds-grid_vertical-align-center">
            <p className="slds-text-body_small slds-text-color_weak">{meta}</p>
            <div className="slds-no-flex slds-grid slds-col_bump-left">
              <div className="slds-button-group">
                <ButtonIcon
                  iconName="utility:side_list"
                  assistiveText="Display As Split View"
                  variant="container"
                  menu={{ expanded: false }}
                />
              </div>
              {onRefresh ? (
                <div className="slds-button-group">
                  <ButtonIcon iconName="utility:refresh" assistiveText="Refresh List" variant="container" onClick={onRefresh} />
                </div>
              ) : null}
            </div>
          </div>
          {search ? (
            <div className="slds-m-top_x-small">
              <Input
                label="Search this list"
                hideLabel
                type="search"
                iconLeft="utility:search"
                placeholder={search.placeholder ?? "Search this list..."}
                value={search.value}
                onChange={(v) => search.onChange(v)}
              />
            </div>
          ) : null}
        </header>
        <div className="slds-grid slds-grid_vertical slds-grow" style={{ minHeight: 0 }}>
          <div className="slds-split-view__list-header slds-grid slds-grid_vertical-align-center">
            {selection ? (
              <Checkbox
                wrapper="none"
                label="Select all items"
                hideLabel
                checked={allSelected}
                indeterminate={someSelected}
                onChange={(c) => selection.onChange(c ? items.map((i) => i.id) : [])}
                className="slds-m-right_x-small"
              />
            ) : null}
            {sort ? (
              <>
                <span className="slds-assistive-text">Sorted by:</span>
                <span>
                  {sort.label}
                  <IconSvg
                    name={sort.direction === "ascending" ? "utility:arrowup" : "utility:arrowdown"}
                    className="slds-icon slds-icon_xx-small slds-icon-text-default slds-align-top slds-m-left_x-small"
                  />
                </span>
                <span className="slds-assistive-text">- {sort.direction === "ascending" ? "Ascending" : "Descending"}</span>
              </>
            ) : null}
            {listInfo ? (
              <div className="slds-col_bump-left">
                <HelpText content={listInfo} />
              </div>
            ) : null}
          </div>
          <ul
            aria-multiselectable="true"
            className="slds-scrollable_y"
            role="listbox"
            aria-label="Select an item from this list to open it."
            style={{ minHeight: 0 }}
          >
            {items.map((item, i) => (
              <li key={item.id} className="slds-split-view__list-item" role="presentation">
                {selection ? (
                  <div className="slds-grid slds-grid_vertical-align-center slds-p-left_medium">
                    <Checkbox
                      wrapper="none"
                      label={`Select ${item.title}`}
                      hideLabel
                      checked={selected.includes(item.id)}
                      onChange={(c) => toggleItem(item.id, c)}
                    />
                  </div>
                ) : null}
                <a
                  href="#"
                  aria-current={item.id === currentId ? "page" : undefined}
                  role="option"
                  aria-selected={item.id === currentId ? "true" : "false"}
                  className={cx(
                    "slds-split-view__list-item-action slds-grow slds-has-flexi-truncate slds-p-vertical_x-small",
                    selection && "slds-p-left_small",
                  )}
                  tabIndex={i === currentIndex ? 0 : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    onOpen(item.id);
                  }}
                >
                  {item.unread ? (
                    <abbr className="slds-indicator_unread" title="Unread Item" aria-label="Unread Item">
                      <span className="slds-assistive-text">●</span>
                    </abbr>
                  ) : null}
                  <div className="slds-grid slds-wrap">
                    <span className="slds-truncate slds-text-body_regular slds-text-color_default" title={item.title}>
                      {item.title}
                    </span>
                    {item.titleRight !== undefined ? <span className="slds-truncate slds-col_bump-left">{item.titleRight}</span> : null}
                  </div>
                  {(item.rows ?? []).map((row, r) => (
                    <div key={r} className="slds-grid slds-wrap">
                      {row.left !== undefined ? <span className="slds-truncate">{row.left}</span> : null}
                      {row.right !== undefined ? <span className="slds-truncate slds-col_bump-left">{row.right}</span> : null}
                    </div>
                  ))}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
