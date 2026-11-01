import type { ReactNode } from "react";
import { cx } from "../utils/cx";

export type EinsteinCardProps = {
  /** Header title (Figma: "Next Best Action"). */
  title?: string;
  /** Title as a link. */
  onTitleClick?: () => void;
  /** Body (Figma: "Einstein doesn't have any recommendations for you right now."). */
  children: ReactNode;
  /** Centre the body text (Figma empty recommendations). */
  centered?: boolean;
  /** Footer link, e.g. "View All". */
  footer?: { label: string; onClick: () => void };
};

/**
 * SLDS Card — Einstein blueprint (article.slds-card › div.slds-einstein-header.slds-card__header › title + figure).
 * The sky background and Einstein figure are the SLDS package images referenced by the SLDS CSS.
 */
export function EinsteinCard({ title = "Next Best Action", onTitleClick, children, centered, footer }: EinsteinCardProps) {
  return (
    <article className="slds-card">
      <div className="slds-grid slds-einstein-header slds-card__header">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-grid slds-grid_vertical-align-center slds-size_3-of-4 slds-medium-size_2-of-3">
            <div className="slds-media__body">
              <h2 className="slds-card__header-title slds-truncate" title={title}>
                {onTitleClick ? (
                  <a
                    href="#"
                    className="slds-card__header-link"
                    title={title}
                    onClick={(e) => {
                      e.preventDefault();
                      onTitleClick();
                    }}
                  >
                    <span className="slds-text-heading_small">{title}</span>
                  </a>
                ) : (
                  <span className="slds-text-heading_small">{title}</span>
                )}
              </h2>
            </div>
          </div>
          <div className="slds-einstein-header__figure slds-size_1-of-4 slds-medium-size_1-of-3" />
        </header>
      </div>
      <div className={cx("slds-card__body slds-card__body_inner", centered && "slds-text-align_center")}>{children}</div>
      {footer ? (
        <footer className="slds-card__footer">
          <a
            className="slds-card__footer-action"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              footer.onClick();
            }}
          >
            {footer.label}
          </a>
        </footer>
      ) : null}
    </article>
  );
}
