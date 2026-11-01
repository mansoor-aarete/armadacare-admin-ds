import type { ReactNode } from "react";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

export type CardProps = {
  /** Omit (with no `actions`) for a plain bordered container without a header (tab containers, sidebar tab cards). */
  title?: string;
  /** Title as a link (related lists). */
  onTitleClick?: () => void;
  titleHref?: string;
  /** Line under the title (related lists: "2 items • Updated a few seconds ago"). */
  meta?: string;
  /** Small object icon left of the title. */
  iconName?: ObjectIconName;
  /** Header actions (buttons, menus) — right side. */
  actions?: ReactNode;
  children?: ReactNode;
  /** Pad the body (.slds-card__body_inner). */
  bodyPadding?: boolean;
  /** Footer link, e.g. "View All". */
  footer?: { label: string; assistiveText?: string; onClick?: () => void; href?: string };
  /** Grey card with white body (Lightning related-list cards). */
  shaded?: boolean;
  /** Extra SLDS classes on the article (e.g. "slds-card_boundary", spacing). */
  className?: string;
};

/** SLDS Cards blueprint (article.slds-card › header › body › footer). Without title and actions the header is left out. */
export function Card({ title, onTitleClick, titleHref, meta, iconName, actions, children, bodyPadding, footer, shaded, className }: CardProps) {
  const isLink = Boolean(onTitleClick || titleHref);
  const header = title || actions ? (
    <div className="slds-card__header slds-grid">
      <header className="slds-media slds-media_center slds-has-flexi-truncate">
        {iconName ? (
          <div className="slds-media__figure">
            <Icon name={iconName} size="small" />
          </div>
        ) : null}
        <div className="slds-media__body">
          {title ? (
            <h2 className="slds-card__header-title">
              {isLink ? (
                <a
                  href={titleHref ?? "#"}
                  className="slds-card__header-link slds-truncate"
                  title={title}
                  onClick={(e) => {
                    if (!titleHref) e.preventDefault();
                    onTitleClick?.();
                  }}
                >
                  <span>{title}</span>
                </a>
              ) : (
                <span className="slds-truncate" title={title}>
                  <span className="slds-text-heading_small">{title}</span>
                </span>
              )}
            </h2>
          ) : null}
          {meta ? <p className="slds-text-body_small slds-m-top_xx-small">{meta}</p> : null}
        </div>
        {actions ? <div className="slds-no-flex">{actions}</div> : null}
      </header>
    </div>
  ) : null;
  return (
    <article className={cx("slds-card", shaded && "slds-theme_shade", className)}>
      {header}
      {children !== undefined && children !== null && children !== false ? (
        <div className={cx("slds-card__body", bodyPadding && "slds-card__body_inner", shaded && "slds-theme_default")}>{children}</div>
      ) : null}
      {footer ? (
        <footer className={cx("slds-card__footer", shaded && "slds-theme_default")}>
          <a
            className="slds-card__footer-action"
            href={footer.href ?? "#"}
            onClick={(e) => {
              if (!footer.href) e.preventDefault();
              footer.onClick?.();
            }}
          >
            {footer.label}
            {footer.assistiveText ? <span className="slds-assistive-text"> {footer.assistiveText}</span> : null}
          </a>
        </footer>
      ) : null}
    </article>
  );
}
