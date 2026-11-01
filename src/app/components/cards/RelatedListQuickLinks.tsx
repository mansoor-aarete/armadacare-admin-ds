import { Icon, type ObjectIconName } from "../icons/Icon";
import { HelpText } from "../overlays/HelpText";

export type QuickLink = {
  id: string;
  label: string;
  count: number | string;
  iconName: ObjectIconName;
};

export type RelatedListQuickLinksProps = {
  links: QuickLink[];
  onSelect: (id: string) => void;
  /** Total related lists for "Show All (n)". Omit to hide the link. */
  totalCount?: number;
  onShowAll?: () => void;
  title?: string;
  helpText?: string;
};

/**
 * Related List Quick Links (Lightning; no SLDS 1 blueprint — gap G4): SLDS Card + 7-column grid of
 * x-small object icons with "Label (count)" links + centred "Show All (n)".
 */
export function RelatedListQuickLinks({
  links,
  onSelect,
  totalCount,
  onShowAll,
  title = "Related List Quick Links",
  helpText = "Shortcuts to the related lists on this page.",
}: RelatedListQuickLinksProps) {
  return (
    <article className="slds-card slds-card_boundary">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__body slds-grid slds-grid_vertical-align-center">
            <h2 className="slds-card__header-title slds-text-title_bold slds-m-right_xx-small">{title}</h2>
            <HelpText content={helpText} />
          </div>
        </header>
      </div>
      <div className="slds-card__body slds-card__body_inner">
        <ul className="slds-grid slds-wrap">
          {links.map((l) => (
            <li key={l.id} className="slds-size_1-of-7 slds-p-bottom_xx-small slds-p-right_small">
              <a
                href="#"
                className="slds-grid slds-grid_vertical-align-center"
                title={`${l.label} (${l.count})`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(l.id);
                }}
              >
                <Icon name={l.iconName} size="x-small" className="slds-m-right_x-small slds-shrink-none" />
                <span className="slds-truncate">
                  {l.label} ({l.count})
                </span>
              </a>
            </li>
          ))}
        </ul>
        {totalCount !== undefined && onShowAll ? (
          <div className="slds-text-align_center slds-p-top_xx-small">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onShowAll();
              }}
            >
              Show All ({totalCount})
            </a>
          </div>
        ) : null}
      </div>
    </article>
  );
}
