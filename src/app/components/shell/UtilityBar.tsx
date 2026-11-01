import type { ReactNode } from "react";
import { IconSvg } from "../icons/IconSvg";
import type { UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

export type UtilityBarItem = {
  id: string;
  label: string;
  iconName: UtilityIconName;
  /** Second text line above the label (blueprint: "Online" over "Omni-Channel"). */
  status?: string;
  notification?: boolean;
  poppedOut?: boolean;
};

/** "fixed" = SLDS default (pinned to the viewport bottom); "inline" = in normal flow (ConsoleShell, showcase). */
export type UtilityBarPosition = "fixed" | "inline";

export type UtilityBarProps = {
  items: UtilityBarItem[];
  /** Item whose panel is open (pressed state). */
  activeId?: string;
  onSelect: (id: string) => void;
  /** Open utility panel (e.g. a docked composer). */
  panel?: ReactNode;
  position?: UtilityBarPosition;
};

/** SLDS Utility Bar blueprint (footer.slds-utility-bar_container › ul.slds-utility-bar › items). */
export function UtilityBar({ items, activeId, onSelect, panel, position = "fixed" }: UtilityBarProps) {
  return (
    <footer className="slds-utility-bar_container" aria-label="Utility Bar">
      <h2 className="slds-assistive-text">Utility Bar</h2>
      <ul className={cx("slds-utility-bar", position === "inline" && "slds-is-relative")}>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li
              key={item.id}
              className={cx("slds-utility-bar__item", item.notification && "slds-has-notification", item.poppedOut && "slds-utility-bar__item_pop-out")}
            >
              <button
                type="button"
                className={cx("slds-button slds-utility-bar__action", active && "slds-is-active")}
                aria-pressed={active ? "true" : "false"}
                onClick={() => onSelect(item.id)}
              >
                {item.notification ? (
                  <abbr className="slds-indicator_unread" title="Unread Item" aria-label="Unread Item">
                    <span className="slds-assistive-text">●</span>
                  </abbr>
                ) : null}
                <IconSvg name={item.iconName} className="slds-button__icon slds-button__icon_left" />
                <span className="slds-utility-bar__text">
                  {item.status ? (
                    <>
                      <span className="slds-m-bottom_xxx-small">{item.status}</span>
                      <span>{item.label}</span>
                    </>
                  ) : (
                    item.label
                  )}
                </span>
                {item.poppedOut ? <span className="slds-assistive-text">: is popped out in new window</span> : null}
              </button>
            </li>
          );
        })}
      </ul>
      {panel}
    </footer>
  );
}
