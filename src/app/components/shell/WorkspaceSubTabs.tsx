import type { ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

export type WorkspaceSubTab = {
  id: string;
  label: string;
  iconName: ObjectIconName;
  /** Shows the ▼ actions button (Figma: on the active sub-tab). */
  hasMenu?: boolean;
  unsaved?: boolean;
};

export type WorkspaceSubTabsProps = {
  tabs: WorkspaceSubTab[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose?: (id: string) => void;
  onMenu?: (id: string) => void;
  /** Content of the active sub-tab. */
  children?: ReactNode;
};

/** SLDS Tabs — Sub Tabs blueprint (div.slds-tabs_default.slds-sub-tabs): second row of tabs inside a workspace tab. */
export function WorkspaceSubTabs({ tabs, activeId, onSelect, onClose, onMenu, children }: WorkspaceSubTabsProps) {
  return (
    <div className="slds-tabs_default slds-sub-tabs">
      <ul className="slds-tabs_default__nav" role="tablist">
        {tabs.map((tab) => {
          const active = tab.id === activeId;
          const tabIndex = active ? 0 : -1;
          return (
            <li
              key={tab.id}
              className={cx(
                "slds-tabs_default__item slds-sub-tabs__item slds-grid slds-grid_vertical-align-center",
                active && "slds-active",
                tab.unsaved && "slds-is-unsaved",
              )}
              role="presentation"
            >
              <a
                aria-controls={`${tab.id}__panel`}
                aria-selected={active ? "true" : "false"}
                className="slds-tabs_default__link slds-p-horizontal_xx-small"
                href="#"
                id={`${tab.id}__subtab`}
                role="tab"
                tabIndex={tabIndex}
                title={tab.label}
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
              {tab.hasMenu ? (
                <div className="slds-dropdown-trigger slds-dropdown-trigger_click slds-p-left_none slds-p-right_none">
                  <ButtonIcon
                    iconName="utility:chevrondown"
                    assistiveText={`Actions for ${tab.label}`}
                    variant="container"
                    size="x-small"
                    tabIndex={tabIndex}
                    menu={{ expanded: false, indicator: false }}
                    onClick={() => onMenu?.(tab.id)}
                  />
                </div>
              ) : null}
              <div className="slds-col_bump-left slds-p-left_none slds-p-right_none">
                <ButtonIcon
                  iconName="utility:close"
                  assistiveText={`Close ${tab.label}`}
                  variant="container"
                  size="x-small"
                  tabIndex={tabIndex}
                  onClick={() => onClose?.(tab.id)}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {children !== undefined ? (
        <div className="slds-tabs_default__content slds-show" id={`${activeId}__panel`} role="tabpanel" aria-labelledby={`${activeId}__subtab`}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
