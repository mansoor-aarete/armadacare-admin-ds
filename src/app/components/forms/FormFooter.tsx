import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "../buttons/Button";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { cx } from "../utils/cx";

export type FormFooterAction = { value: string; label: string; variant?: ButtonVariant; disabled?: boolean };

/** "fixed" = SLDS default (docked to the viewport bottom); "inline" = in normal flow (showcase, modals). */
export type FormFooterPosition = "fixed" | "inline";

export type FormFooterProps = {
  /** Left to right (Figma: Cancel, Save & New, Save[brand]). */
  actions: FormFooterAction[];
  onAction: (value: string) => void;
  /** Shows the red error button left of the actions. */
  hasErrors?: boolean;
  onErrorClick?: () => void;
  /** Error popover (<ErrorPopover/>) shown above the error button. */
  errorPopover?: ReactNode;
  position?: FormFooterPosition;
};

/** SLDS Docked Form Footer blueprint (div.slds-docked-form-footer with optional error button + popover). */
export function FormFooter({ actions, onAction, hasErrors, onErrorClick, errorPopover, position = "fixed" }: FormFooterProps) {
  return (
    <div className={cx("slds-docked-form-footer", position === "inline" && "slds-is-relative")}>
      {hasErrors ? (
        <div className="slds-is-relative">
          {/* Wrapper anchors the popover; SLDS spacing between the buttons is kept with slds-m-left_xx-small. */}
          <ButtonIcon
            iconName="utility:error"
            assistiveText="Resolve error"
            feedback="error"
            iconSize="large"
            aria-haspopup="dialog"
            onClick={onErrorClick}
          />
          {errorPopover ? (
            <div className="slds-is-absolute" style={{ bottom: "calc(100% + 1rem)", left: "50%", transform: "translateX(-50%)", width: "20rem" }}>
              {errorPopover}
            </div>
          ) : null}
        </div>
      ) : null}
      {actions.map((a, i) => (
        <Button
          key={a.value}
          label={a.label}
          variant={a.variant ?? "neutral"}
          disabled={a.disabled}
          className={i === 0 && hasErrors ? "slds-m-left_xx-small" : undefined}
          onClick={() => onAction(a.value)}
        />
      ))}
    </div>
  );
}
