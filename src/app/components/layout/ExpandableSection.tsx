import { useId, type ReactNode } from "react";
import { IconSvg } from "../icons/IconSvg";
import { cx } from "../utils/cx";

export type ExpandableSectionProps = {
  title: string;
  children: ReactNode;
  /** Collapsible (default). false = non-collapsible shaded title (Figma search panels). */
  collapsible?: boolean;
  /** Controlled open state (collapsible only). */
  open?: boolean;
  onToggle?: (open: boolean) => void;
  /** Right-aligned content of a non-collapsible title, e.g. an "Advanced Search" link (Figma P1; ds-v1.9). */
  actions?: ReactNode;
};

/** SLDS Expandable Section blueprint (div.slds-section › h3.slds-section__title › button / span › content). */
export function ExpandableSection({ title, children, collapsible = true, open = true, onToggle, actions }: ExpandableSectionProps) {
  const contentId = useId();
  const isOpen = collapsible ? open : true;

  return (
    <div className={cx("slds-section", isOpen && "slds-is-open")}>
      {collapsible ? (
        <h3 className="slds-section__title">
          <button
            type="button"
            aria-controls={contentId}
            aria-expanded={isOpen ? "true" : "false"}
            className="slds-button slds-section__title-action"
            onClick={() => onToggle?.(!isOpen)}
          >
            <IconSvg name="utility:switch" className="slds-section__title-action-icon slds-button__icon slds-button__icon_left" />
            <span className="slds-truncate" title={title}>
              {title}
            </span>
          </button>
        </h3>
      ) : (
        <h3 className="slds-section__title slds-theme_shade">
          <span className="slds-truncate slds-p-horizontal_small" title={title}>
            {title}
          </span>
          {actions ? <span className="slds-col_bump-left slds-p-horizontal_small">{actions}</span> : null}
        </h3>
      )}
      <div hidden={!isOpen} className="slds-section__content" id={contentId}>
        {children}
      </div>
    </div>
  );
}
