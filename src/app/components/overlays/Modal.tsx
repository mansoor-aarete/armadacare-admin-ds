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
};

const SIZE_CLASS: Record<ModalSize, string | undefined> = {
  default: undefined,
  small: "slds-modal_small",
  medium: "slds-modal_medium",
  large: "slds-modal_large",
};

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** SLDS Modals blueprint (section.slds-modal.slds-fade-in-open › container › close, header, content, footer + backdrop). */
export function Modal({ open, heading, tagline, headless, children, footer, onClose, size = "default", hideClose, bodyPadding = true }: ModalProps) {
  const uid = useId();
  const headingId = `${uid}-heading`;
  const contentId = `${uid}-content`;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const first = ref.current?.querySelector<HTMLElement>(".slds-modal__content " + FOCUSABLE) ?? ref.current?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? ref.current)?.focus();
    return () => previous?.focus();
  }, [open]);

  if (!open) return null;

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
          {headless ? (
            <div className="slds-modal__header slds-modal__header_empty" />
          ) : (
            <div className="slds-modal__header">
              <h1 id={headingId} className="slds-modal__title slds-hyphenate" tabIndex={-1}>
                {heading}
              </h1>
              {tagline ? <p className="slds-m-top_x-small">{tagline}</p> : null}
            </div>
          )}
          <div className={cx("slds-modal__content", bodyPadding && "slds-p-around_medium")} id={contentId}>
            {children}
          </div>
          {footer ? <div className="slds-modal__footer">{footer}</div> : null}
        </div>
      </section>
      <div className="slds-backdrop slds-backdrop_open" role="presentation" />
    </>
  );
}
