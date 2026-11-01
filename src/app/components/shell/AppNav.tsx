import { useCallback, useRef, useState, type ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { MenuDropdown, type MenuItem } from "../buttons/MenuDropdown";
import { cx } from "../utils/cx";
import { useDismiss } from "../utils/useDismiss";

export type AppNavItem = {
  id: string;
  label: string;
  /** Current page (olive tint + top bar). */
  active?: boolean;
  /** Adds the ▼ button and its menu (e.g. the object item's "Show Navigation Menu"). */
  menuItems?: MenuItem[];
  href?: string;
};

export type AppNavProps = {
  appName: string;
  onAppLauncher?: () => void;
  /**
   * Console object item (blueprint "object switcher", Figma: "Accounts ▼"). Active when no workspace tab is open.
   */
  objectItem?: AppNavItem;
  /** Standard-navigation items (non-console apps). Ignored when `tabs` is set. */
  items?: AppNavItem[];
  /** Console workspace tabs (<WorkspaceTabs/>). Switches the bar to the console variant (slds-context-bar_tabs). */
  tabs?: ReactNode;
  onSelect?: (itemId: string) => void;
  onMenuSelect?: (itemId: string, value: string) => void;
};

function NavItem({
  item,
  primary,
  onSelect,
  onMenuSelect,
}: {
  item: AppNavItem;
  primary: boolean;
  onSelect?: (id: string) => void;
  onMenuSelect?: (id: string, value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const liRef = useRef<HTMLLIElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(primary ? divRef : liRef, open, close);
  const hasMenu = Boolean(item.menuItems?.length);
  const label = (
    <a
      href={item.href ?? "#"}
      className="slds-context-bar__label-action"
      title={item.label}
      aria-current={item.active ? "page" : undefined}
      onClick={(e) => {
        if (!item.href) e.preventDefault();
        onSelect?.(item.id);
      }}
    >
      {item.active ? <span className="slds-assistive-text">Current Page:</span> : null}
      <span className="slds-truncate" title={item.label}>
        {item.label}
      </span>
    </a>
  );
  const menu = hasMenu ? (
    <div className="slds-context-bar__icon-action slds-p-left_none">
      <ButtonIcon
        iconName="utility:chevrondown"
        assistiveText={primary ? `Show Navigation Menu` : `Open ${item.label} submenu`}
        variant={primary ? "container" : "bare"}
        size={primary ? "x-small" : "medium"}
        className="slds-context-bar__button"
        menu={{ expanded: open, indicator: false }}
        onClick={() => setOpen((o) => !o)}
      />
    </div>
  ) : null;
  const dropdown =
    hasMenu && open && item.menuItems ? (
      <MenuDropdown
        items={item.menuItems}
        position="right"
        autoFocus
        onSelect={(v) => {
          onMenuSelect?.(item.id, v);
          setOpen(false);
        }}
        onClose={close}
      />
    ) : null;

  const className = cx(
    "slds-context-bar__item",
    primary && "slds-context-bar__object-switcher",
    hasMenu && "slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click",
    item.active && "slds-is-active",
    open && "slds-is-open",
  );
  if (primary) {
    return (
      <div ref={divRef} className={className}>
        {label}
        {menu}
        {dropdown}
      </div>
    );
  }
  return (
    <li ref={liRef} className={className}>
      {label}
      {menu}
      {dropdown}
    </li>
  );
}

/** SLDS Global Navigation / Context Bar blueprint: app launcher, app name, object item, nav items or console tabs. */
export function AppNav({ appName, onAppLauncher, objectItem, items = [], tabs, onSelect, onMenuSelect }: AppNavProps) {
  return (
    <div className={cx("slds-context-bar", tabs !== undefined && "slds-context-bar_tabs")}>
      <div className="slds-context-bar__primary">
        <div className="slds-context-bar__item slds-context-bar__dropdown-trigger slds-dropdown-trigger slds-dropdown-trigger_click slds-no-hover">
          <div className="slds-context-bar__icon-action">
            <button type="button" className="slds-button slds-icon-waffle_container slds-context-bar__button" title="App Launcher" onClick={onAppLauncher}>
              <span className="slds-icon-waffle">
                <span className="slds-r1" />
                <span className="slds-r2" />
                <span className="slds-r3" />
                <span className="slds-r4" />
                <span className="slds-r5" />
                <span className="slds-r6" />
                <span className="slds-r7" />
                <span className="slds-r8" />
                <span className="slds-r9" />
              </span>
              <span className="slds-assistive-text">Open App Launcher</span>
            </button>
          </div>
          <span className="slds-context-bar__label-action slds-context-bar__app-name">
            <span className="slds-truncate" title={appName}>
              {appName}
            </span>
          </span>
        </div>
        {objectItem ? <NavItem item={objectItem} primary onSelect={onSelect} onMenuSelect={onMenuSelect} /> : null}
      </div>
      {tabs !== undefined ? (
        <div className="slds-context-bar__secondary">
          <div className="slds-context-bar__vertical-divider" />
          <ul className="slds-grid" role="tablist" aria-label={`Workspace tabs for ${appName}`}>
            {tabs}
          </ul>
        </div>
      ) : (
        <nav className="slds-context-bar__secondary" role="navigation" id="navigation">
          <ul className="slds-grid">
            {items.map((item) => (
              <NavItem key={item.id} item={item} primary={false} onSelect={onSelect} onMenuSelect={onMenuSelect} />
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
