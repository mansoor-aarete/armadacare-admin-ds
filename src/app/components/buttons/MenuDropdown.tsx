import { useEffect, useRef, type KeyboardEvent } from "react";
import type { UtilityIconName } from "../icons/Icon";
import { IconSvg } from "../icons/IconSvg";
import { cx } from "../utils/cx";

export type MenuItem =
  | { type?: "item"; value: string; label: string; disabled?: boolean; iconName?: UtilityIconName }
  | { type: "checkbox"; value: string; label: string; checked: boolean; disabled?: boolean }
  | { type: "header"; label: string }
  | { type: "divider" };

export type MenuPosition = "left" | "right" | "bottom";
export type MenuLength = 5 | 7 | 10;
/** SLDS dropdown widths: xx-small/x-small set a min-width (6rem/12rem); small/medium/large a fixed width. */
export type MenuSize = "xx-small" | "x-small" | "small" | "medium" | "large";

export type MenuDropdownProps = {
  items: MenuItem[];
  onSelect: (value: string) => void;
  /** Called on Escape / Tab so the owner can close the menu and restore focus. */
  onClose: () => void;
  position?: MenuPosition;
  /** Max visible items before scrolling (SLDS dropdown length). */
  length?: MenuLength;
  size?: MenuSize;
  /** Action-overflow styling (slds-dropdown_actions) — used for button-group / record action overflows. */
  actions?: boolean;
  /** Focus the first enabled item on mount (keyboard open). */
  autoFocus?: boolean;
  ariaLabel?: string;
};

const POSITION_CLASS: Record<MenuPosition, string> = {
  left: "slds-dropdown_left",
  right: "slds-dropdown_right",
  bottom: "slds-dropdown_bottom",
};
const LENGTH_CLASS: Record<MenuLength, string> = {
  5: "slds-dropdown_length-5",
  7: "slds-dropdown_length-7",
  10: "slds-dropdown_length-10",
};
const SIZE_CLASS: Record<MenuSize, string> = {
  "xx-small": "slds-dropdown_xx-small",
  "x-small": "slds-dropdown_x-small",
  small: "slds-dropdown_small",
  medium: "slds-dropdown_medium",
  large: "slds-dropdown_large",
};

/** SLDS Menus — dropdown blueprint (div.slds-dropdown › ul.slds-dropdown__list[role=menu]). */
export function MenuDropdown({
  items,
  onSelect,
  onClose,
  position = "left",
  length,
  size,
  actions,
  autoFocus,
  ariaLabel,
}: MenuDropdownProps) {
  const listRef = useRef<HTMLUListElement>(null);

  const focusables = () =>
    Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('a[role^="menuitem"]:not([aria-disabled="true"])') ?? []);

  useEffect(() => {
    if (autoFocus) focusables()[0]?.focus();
  }, [autoFocus]);

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const list = focusables();
    const idx = list.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      list[(idx + 1) % list.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      list[(idx - 1 + list.length) % list.length]?.focus();
    } else if (e.key === "Escape" || e.key === "Tab") {
      onClose();
    }
  };

  let firstFocusable = true;
  return (
    <div className={cx("slds-dropdown", POSITION_CLASS[position], length && LENGTH_CLASS[length], size && SIZE_CLASS[size], actions && "slds-dropdown_actions")}>
      <ul className="slds-dropdown__list" role="menu" aria-label={ariaLabel} ref={listRef} onKeyDown={onKeyDown}>
        {items.map((item, i) => {
          if (item.type === "divider") return <li key={`d${i}`} className="slds-has-divider_top-space" role="separator" />;
          if (item.type === "header")
            return (
              <li key={`h${i}`} className="slds-dropdown__header" title={item.label} role="presentation">
                <span>{item.label}</span>
              </li>
            );
          const isCheckbox = item.type === "checkbox";
          const tabIndex = !item.disabled && firstFocusable ? 0 : -1;
          if (!item.disabled) firstFocusable = false;
          return (
            <li
              key={item.value}
              className={cx("slds-dropdown__item", isCheckbox && item.checked && "slds-is-selected")}
              role="presentation"
            >
              <a
                href="#"
                role={isCheckbox ? "menuitemcheckbox" : "menuitem"}
                aria-checked={isCheckbox ? (item.checked ? "true" : "false") : undefined}
                aria-disabled={item.disabled ? "true" : undefined}
                tabIndex={tabIndex}
                onClick={(e) => {
                  e.preventDefault();
                  if (!item.disabled) onSelect(item.value);
                }}
              >
                <span title={item.label}>
                  {isCheckbox ? (
                    <IconSvg
                      name="utility:check"
                      className="slds-icon slds-icon_selected slds-icon_x-small slds-icon-text-default slds-m-right_x-small"
                    />
                  ) : item.iconName ? (
                    <IconSvg name={item.iconName} className="slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small" />
                  ) : null}
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
