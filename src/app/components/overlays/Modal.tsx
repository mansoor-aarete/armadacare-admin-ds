import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { cx } from "../utils/cx";

/** "default" = 40rem (Figma Delete Claim / Share); "small" | "medium" (Figma Log an Activity, Repayment Recovery) | "large". */
export type ModalSize = "default" | "small" | "medium" | "large";

export type ModalProps = {
  open: boolean;
  /** Header title; omit with `headless` for a header-less modal. */
  heading?: string;
  tagline?: ReactNode;
  headless?: boolean;
  children: ReactNode;
  /** Footer buttons (Cancel + brand action). */
  footer?: ReactNode;
  onClose: () => void;
  size?: ModalSize;
  /** Hide the outside close button (prompt-style confirmations). */
  hideClose?: boolean;
  /** Pad the body (.slds-p-around_medium). Default true. */
  bodyPadding?: boolean;
  /**
   * Render the modal panel inside the page (no overlay, backdrop, close button or focus trap), as Lightning console
   * tabs show record create / edit forms (Figma "New Account: Group", "New Account"). The panel fills the height of
   * its parent; the body scrolls. `footer` is rendered as-is (no .slds-modal__footer wrapper) — pass a
   * <FormFooter position="inline" />.
   */
  inline?: boolean;
};

const SIZE_CLASS: Record<ModalSize, string | undefined> = {
  default: undefined,
  small: "slds-modal_small",
  medium: "slds-modal_medium",
  large: "slds-modal_large",
};

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** SLDS Modals blueprint (section.slds-modal.slds-fade-in-open › container › close, header, content, footer + backdrop). */
export function Modal({ open, heading, tagline, headless, children, footer, onClose, size = "default", hideClose, bodyPadding = true, inline }: ModalProps) {
  const uid = useId();
  const headingId = `${uid}-heading`;
  const contentId = `${uid}-content`;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open || inline) return;
    const previous = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>(".slds-modal__content " + FOCUSABLE) ?? ref.current?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? ref.current)?.focus();
    return () => previous?.focus();
  }, [open, inline]);

  if (!open) return null;

  const header = headless ? (
    <div className="slds-modal__header slds-modal__header_empty" />
  ) : (
    <div className="slds-modal__header">
      {/* .slds-modal__title is sized only inside .slds-modal; inline panels use the same size via slds-text-heading_medium. */}
      <h1 id={headingId} className={cx("slds-modal__title slds-hyphenate", inline && "slds-text-heading_medium")} tabIndex={-1}>
        {heading}
      </h1>
      {tagline ? <p className="slds-m-top_x-small">{tagline}</p> : null}
    </div>
  );
  const content = (
    <div className={cx("slds-modal__content", bodyPadding && "slds-p-around_medium", inline && "slds-grow")} id={contentId}>
      {children}
    </div>
  );

  if (inline) {
    // Full-height wrapper (.slds-template__container) carrying the size class, so the SLDS container widths apply
    // without the fixed .slds-modal section.
    return (
      <div className={cx("slds-template__container", SIZE_CLASS[size])}>
        <section
          className="slds-modal__container slds-p-top_small slds-p-bottom_none"
          aria-labelledby={heading && !headless ? headingId : undefined}
          aria-label={headless ? heading : undefined}
        >
          {header}
          {content}
          {footer}
        </section>
      </div>
    );
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
    } else if (e.key === "Tab") {
      const items = Array.from(ref.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <>
      <section
        ref={ref}
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        aria-labelledby={heading && !headless ? headingId : undefined}
        aria-label={headless ? heading : undefined}
        aria-describedby={contentId}
        className={cx("slds-modal slds-fade-in-open", SIZE_CLASS[size])}
        onKeyDown={onKeyDown}
      >
        <div className="slds-modal__container">
          {!hideClose ? (
            <ButtonIcon iconName="utility:close" assistiveText="Cancel and close" iconSize="large" className="slds-modal__close" onClick={onClose} />
          ) : null}
          {header}
          {content}
          {footer ? <div className="slds-modal__footer">{footer}</div> : null}
        </div>
      </section>
      <div className="slds-backdrop slds-backdrop_open" role="presentation" />
    </>
  );
}
