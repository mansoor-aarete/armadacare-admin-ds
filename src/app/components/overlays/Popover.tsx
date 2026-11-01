import { useId, type ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { Icon, type UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";
import type { TooltipNubbin } from "./Tooltip";

export type PopoverVariant = "default" | "error";

export type PopoverProps = {
  heading: string;
  children: ReactNode;
  variant?: PopoverVariant;
  /** Header icon. Defaults to utility:error for the error variant. */
  iconName?: UtilityIconName;
  nubbin?: TooltipNubbin;
  /** Shows the close button. */
  onClose?: () => void;
  footer?: ReactNode;
  id?: string;
  /** Extra SLDS classes (positioning utilities). */
  className?: string;
};

const VARIANT_CLASS: Record<PopoverVariant, string | undefined> = {
  default: undefined,
  error: "slds-popover_error",
};

const NUBBIN_CLASS: Record<TooltipNubbin, string> = {
  "bottom-left": "slds-nubbin_bottom-left",
  bottom: "slds-nubbin_bottom",
  "top-left": "slds-nubbin_top-left",
  top: "slds-nubbin_top",
  left: "slds-nubbin_left",
  right: "slds-nubbin_right",
};

/** SLDS Popovers blueprint — base dialog popover and the error feedback popover. */
export function Popover({ heading, children, variant = "default", iconName, nubbin, onClose, footer, id, className }: PopoverProps) {
  const uid = useId();
  const headingId = `${uid}-heading`;
  const bodyId = `${uid}-body`;
  const feedback = variant !== "default";
  const headerIcon: UtilityIconName | undefined = iconName ?? (variant === "error" ? "utility:error" : undefined);

  return (
    <section
      className={cx("slds-popover", VARIANT_CLASS[variant], nubbin && NUBBIN_CLASS[nubbin], className)}
      role="dialog"
      aria-labelledby={headingId}
      aria-describedby={bodyId}
      id={id}
    >
      {onClose ? (
        <ButtonIcon
          iconName="utility:close"
          assistiveText="Close dialog"
          variant={feedback ? "inverse" : "bare"}
          className="slds-button_icon-small slds-float_right slds-popover__close"
          onClick={onClose}
        />
      ) : null}
      <header className="slds-popover__header">
        <div className="slds-media slds-media_center slds-has-flexi-truncate">
          {headerIcon ? (
            <div className="slds-media__figure">
              <Icon name={headerIcon} size="x-small" tone={feedback ? "inverse" : "default"} />
            </div>
          ) : null}
          <div className="slds-media__body">
            <h2 className="slds-truncate slds-text-heading_medium" id={headingId} title={heading}>
              {heading}
            </h2>
          </div>
        </div>
      </header>
      <div className="slds-popover__body" id={bodyId}>
        {children}
      </div>
      {footer ? <footer className="slds-popover__footer">{footer}</footer> : null}
    </section>
  );
}
