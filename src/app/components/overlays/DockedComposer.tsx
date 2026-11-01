import { useId, type ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

/** "fixed" = SLDS default (docked to the viewport bottom right); "inline" = in normal flow (showcase). */
export type DockedComposerPosition = "fixed" | "inline";

export type DockedComposerProps = {
  /** Header title (Figma: "No new note"). */
  title: string;
  /** Header object glyph (grey, no background), e.g. "standard:note". */
  iconName: ObjectIconName;
  /** Minimised = header only (.slds-is-closed). */
  minimized?: boolean;
  /** Focus ring around the panel. */
  focused?: boolean;
  onMinimize?: () => void;
  onExpand?: () => void;
  onClose?: () => void;
  /** Body content (e.g. title input + RichTextEditor + related pill). */
  children: ReactNode;
  /** Footer content (buttons). */
  footer?: ReactNode;
  position?: DockedComposerPosition;
};

/** SLDS Docked Composer blueprint (div.slds-docked_container › section.slds-docked-composer › header / body / footer). */
export function DockedComposer({
  title,
  iconName,
  minimized,
  focused,
  onMinimize,
  onExpand,
  onClose,
  children,
  footer,
  position = "fixed",
}: DockedComposerProps) {
  const uid = useId();
  const headingId = `${uid}-heading`;
  const bodyId = `${uid}-body`;
  return (
    <div
      className={cx("slds-docked_container", position === "inline" && "slds-is-relative")}
      // Inline: let the container take the panel's height (SLDS fixes it to the 2.5rem docked strip).
      style={position === "inline" ? { height: "auto" } : undefined}
    >
      <section
        className={cx("slds-docked-composer slds-grid slds-grid_vertical", minimized ? "slds-is-closed" : "slds-is-open", focused && "slds-has-focus")}
        role="dialog"
        aria-labelledby={headingId}
        aria-describedby={bodyId}
      >
        <header className="slds-docked-composer__header slds-grid slds-shrink-none" aria-live="assertive">
          <div className="slds-media slds-media_center slds-no-space">
            <div className="slds-media__figure slds-m-right_x-small">
              <Icon name={iconName} tone="default" size="small" />
            </div>
            <div className="slds-media__body">
              {minimized ? <span className="slds-assistive-text">Minimized</span> : null}
              <h2 className="slds-truncate" id={headingId} title={title}>
                {title}
              </h2>
            </div>
          </div>
          <div className="slds-col_bump-left slds-shrink-none">
            <ButtonIcon iconName="utility:minimize_window" assistiveText="Minimize Composer Panel" title="Minimize window" onClick={onMinimize} />
            <ButtonIcon iconName="utility:expand_alt" assistiveText="Expand Composer Panel" title="Expand Composer" onClick={onExpand} />
            <ButtonIcon iconName="utility:close" assistiveText="Close Composer Panel" title="Close" onClick={onClose} />
          </div>
        </header>
        <div className="slds-docked-composer__body" id={bodyId}>
          {children}
        </div>
        {footer ? <footer className="slds-docked-composer__footer slds-shrink-none">{footer}</footer> : null}
      </section>
    </div>
  );
}
