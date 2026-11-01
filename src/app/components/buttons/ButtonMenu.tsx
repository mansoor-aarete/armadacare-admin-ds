import { useCallback, useRef, useState } from "react";
import { Button, type ButtonVariant } from "./Button";
import { ButtonIcon, type ButtonIconSize, type ButtonIconVariant } from "./ButtonIcon";
import { MenuDropdown, type MenuItem, type MenuLength, type MenuPosition, type MenuSize } from "./MenuDropdown";
import type { UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";
import { useDismiss } from "../utils/useDismiss";

export type ButtonMenuProps = {
  items: MenuItem[];
  onSelect?: (value: string) => void;
  /** Text trigger (Button with a down icon). Omit for an icon trigger. */
  label?: string;
  /** Text trigger style (default "neutral"). */
  labelVariant?: ButtonVariant;
  /** Icon trigger glyph (default "utility:down"). */
  iconName?: UtilityIconName;
  /** Required for icon triggers; extra screen-reader text for text triggers. */
  assistiveText: string;
  /** Icon trigger style (default "border-filled"). */
  iconVariant?: ButtonIconVariant;
  iconSize?: ButtonIconSize;
  /** Extra SLDS classes on the icon trigger's glyph (row actions: "slds-button__icon_hint slds-button__icon_small"). */
  iconClassName?: string;
  position?: MenuPosition;
  length?: MenuLength;
  size?: MenuSize;
  actions?: boolean;
  disabled?: boolean;
  /** Start open (showcase / screenshots). */
  defaultOpen?: boolean;
  /** Extra SLDS classes on the trigger wrapper (e.g. "slds-button_last" as a group's overflow). */
  className?: string;
};

/** SLDS Menus — dropdown trigger (div.slds-dropdown-trigger_click) with a button or button-icon trigger. */
export function ButtonMenu({
  items,
  onSelect,
  label,
  labelVariant = "neutral",
  iconName = "utility:down",
  assistiveText,
  iconVariant = "border-filled",
  iconSize = "medium",
  iconClassName,
  position = "left",
  length,
  size,
  actions,
  disabled,
  defaultOpen = false,
  className,
}: ButtonMenuProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(wrapperRef, open, close);

  const closeAndFocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const toggle = (viaKeyboard: boolean) => {
    setKeyboardOpen(viaKeyboard);
    setOpen((o) => !o);
  };

  return (
    <div
      ref={wrapperRef}
      className={cx("slds-dropdown-trigger slds-dropdown-trigger_click", open && "slds-is-open", className)}
    >
      {label ? (
        <Button
          ref={triggerRef}
          label={
            <>
              {label}
              {assistiveText !== label ? <span className="slds-assistive-text">{assistiveText}</span> : null}
            </>
          }
          variant={labelVariant}
          iconName="utility:down"
          iconPosition="right"
          iconSize="x-small"
          aria-haspopup="true"
          aria-expanded={open ? "true" : "false"}
          disabled={disabled}
          onClick={(e) => toggle(e.detail === 0)}
        />
      ) : (
        <ButtonIcon
          ref={triggerRef}
          iconName={iconName}
          assistiveText={assistiveText}
          variant={iconVariant}
          size={iconSize}
          iconClassName={iconClassName}
          menu={{ expanded: open, indicator: iconName !== "utility:down" }}
          disabled={disabled}
          onClick={(e) => toggle(e.detail === 0)}
        />
      )}
      {open ? (
        <MenuDropdown
          items={items}
          position={position}
          length={length}
          size={size}
          actions={actions}
          autoFocus={keyboardOpen}
          ariaLabel={label ?? assistiveText}
          onClose={closeAndFocus}
          onSelect={(value) => {
            onSelect?.(value);
            closeAndFocus();
          }}
        />
      ) : null}
    </div>
  );
}
