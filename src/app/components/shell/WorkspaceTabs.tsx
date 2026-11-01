import { useCallback, useRef, useState } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { MenuDropdown, type MenuItem } from "../buttons/MenuDropdown";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { cx } from "../utils/cx";
import { useDismiss } from "../utils/useDismiss";

export type WorkspaceTab = {
  id: string;
  /** e.g. "Adam Sahn | Contact". */
  label: string;
  iconName: ObjectIconName;
  /** Unsaved changes indicator (*). */
  unsaved?: boolean;
  /** Tab actions menu (▼). Default: Refresh / Pin / Close. Pass [] to hide the ▼ (Figma: "New Account: Group"). */
  menuItems?: MenuItem[];
  /** Hide the close ✕. */
  notClosable?: boolean;
  /** Id of the tab panel this tab controls. */
  panelId?: string;
};

export type WorkspaceTabsProps = {
  tabs: WorkspaceTab[];
  activeId?: string;
  onSelect: (id: string) => void;
  onClose?: (id: string) => void;
  onMenuSelect?: (id: string, value: string) => void;
};

const DEFAULT_TAB_MENU: MenuItem[] = [
  { value: "refresh", label: "Refresh Tab" },
  { value: "pin", label: "Pin Tab" },
  { value: "close", label: "Close Tab" },
];

function TabItem({
  tab,
  active,
  onSelect,
  onClose,
  onMenuSelect,
}: {
  tab: WorkspaceTab;
  active: boolean;
  onSelect: (id: string) => void;
  onClose?: (id: string) => void;
  onMenuSelect?: (id: string, value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);
  const menuItems = tab.menuItems ?? DEFAULT_TAB_MENU;
  const tabIndex = active ? 0 : -1;

  return (
    <li
      className={cx("slds-context-bar__item slds-context-bar__item_tab", active && "slds-is-active", tab.unsaved && "slds-is-unsaved")}
      role="presentation"
    >
      <a
        href="#"
        className="slds-context-bar__label-action"
        role="tab"
        title={tab.label}
        aria-selected={active ? "true" : "false"}
        aria-controls={tab.panelId}
        tabIndex={tabIndex}
        id={`${tab.id}__tab`}
        onClick={(e) => {
          e.preventDefault();
          onSelect(tab.id);
        }}
      >
        <span className="slds-indicator-container">
          {tab.unsaved ? (
            <abbr className="slds-indicator_unsaved" title="Tab Not Saved" aria-label="Tab Not Saved">
              *
            </abbr>
          ) : null}
        </span>
        <Icon name={tab.iconName} tone="default" size="small" />
        <span className="slds-truncate" title={tab.label}>
          {tab.label}
        </span>
      </a>
      {menuItems.length > 0 ? (
        <div
          ref={ref}
          className={cx(
            "slds-context-bar__icon-action slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-p-left_none slds-p-right_none",
            open && "slds-is-open",
          )}
        >
          <ButtonIcon
            iconName="utility:chevrondown"
            assistiveText={`Actions for ${tab.label}`}
            variant="container"
            size="x-small"
            tabIndex={tabIndex}
            menu={{ expanded: open, indicator: false }}
            className="slds-button_icon-current-color"
            onClick={() => setOpen((o) => !o)}
          />
          {open ? (
            <MenuDropdown
              items={menuItems}
              position="right"
              autoFocus
              onSelect={(v) => {
                onMenuSelect?.(tab.id, v);
                setOpen(false);
              }}
              onClose={close}
            />
          ) : null}
        </div>
      ) : null}
      {!tab.notClosable ? (
        <div className="slds-context-bar__icon-action slds-col_bump-left slds-p-left_none">
          <ButtonIcon
            iconName="utility:close"
            assistiveText={`Close ${tab.label}`}
            variant="container"
            size="x-small"
            tabIndex={tabIndex}
            className="slds-button_icon-current-color"
            onClick={() => onClose?.(tab.id)}
          />
        </div>
      ) : null}
    </li>
  );
}

/**
 * SLDS Global Navigation — console tabs (li.slds-context-bar__item_tab). Render inside <AppNav tabs={…}/>.
 */
export function WorkspaceTabs({ tabs, activeId, onSelect, onClose, onMenuSelect }: WorkspaceTabsProps) {
  return (
    <>
      {tabs.map((tab) => (
        <TabItem key={tab.id} tab={tab} active={tab.id === activeId} onSelect={onSelect} onClose={onClose} onMenuSelect={onMenuSelect} />
      ))}
    </>
  );
}
