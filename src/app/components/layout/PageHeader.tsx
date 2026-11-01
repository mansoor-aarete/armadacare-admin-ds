import { useCallback, useRef, useState, type ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { MenuDropdown, type MenuItem } from "../buttons/MenuDropdown";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { Breadcrumb, type BreadcrumbItem } from "../navigation/Breadcrumb";
import { cx } from "../utils/cx";
import { useDismiss } from "../utils/useDismiss";

/**
 * "base" = title only · "object-home" = list view header (switcher, meta row, list controls) ·
 * "record-home" = record header (detail row via `details`) · "related-list" = breadcrumbs + title.
 */
export type PageHeaderVariant = "base" | "object-home" | "record-home" | "related-list";

export type PageHeaderDetail = { label: string; value?: ReactNode; title?: string };

export type PageHeaderProps = {
  variant?: PageHeaderVariant;
  title: string;
  /** Object icon (32 px). */
  iconName?: ObjectIconName;
  /** Line above the title (object-home: "Accounts"; record-home: "Contact"). */
  objectLabel?: string;
  /** related-list (and Figma Reports / Account Hierarchy) breadcrumbs above the title. */
  breadcrumbs?: BreadcrumbItem[];
  /** List view switcher ▼ next to the title (object-home). */
  listViews?: MenuItem[];
  onListViewSelect?: (value: string) => void;
  /** Pin button after the title (Lightning list views). */
  pin?: { pinned: boolean; onToggle: () => void };
  /** Right of the title row; each node becomes one .slds-page-header__control (buttons, groups, menus). */
  actions?: ReactNode[];
  /** Meta row text, e.g. "22 items • Sorted by Account Name • Updated 2 minutes ago". */
  meta?: ReactNode;
  /** Meta row controls — usually <ListViewToolbar/>. */
  controls?: ReactNode;
  /** record-home detail row (Figma highlights panel). */
  details?: PageHeaderDetail[];
};

const VARIANT_CLASS: Record<PageHeaderVariant, string | undefined> = {
  base: undefined,
  "object-home": "slds-page-header_object-home",
  "record-home": "slds-page-header_record-home",
  "related-list": "slds-page-header_related-list",
};

/** SLDS Page Headers blueprint (base, object home, record home, related list). */
export function PageHeader({
  variant = "base",
  title,
  iconName,
  objectLabel,
  breadcrumbs,
  listViews,
  onListViewSelect,
  pin,
  actions,
  meta,
  controls,
  details,
}: PageHeaderProps) {
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(switcherRef, open, close);

  const name = (
    <div className="slds-page-header__name">
      <div className="slds-page-header__name-title">
        <h1>
          {objectLabel ? <span>{objectLabel}</span> : null}
          <span className="slds-page-header__title slds-truncate" title={title}>
            {title}
          </span>
        </h1>
      </div>
      {listViews?.length ? (
        <div ref={switcherRef} className={cx("slds-page-header__name-switcher slds-dropdown-trigger slds-dropdown-trigger_click", open && "slds-is-open")}>
          <ButtonIcon
            iconName="utility:down"
            assistiveText="Switch list view"
            className="slds-button_icon-small"
            iconClassName="slds-icon_x-small"
            menu={{ expanded: open, indicator: false }}
            onClick={() => setOpen((o) => !o)}
          />
          {open ? (
            <MenuDropdown
              items={listViews}
              autoFocus
              onSelect={(v) => {
                onListViewSelect?.(v);
                setOpen(false);
              }}
              onClose={close}
            />
          ) : null}
        </div>
      ) : null}
      {pin ? (
        <div className="slds-page-header__name-switcher">
          <ButtonIcon
            iconName="utility:pin"
            assistiveText={pin.pinned ? "Unpin this list view" : "Pin this list view"}
            variant="border-filled"
            size="small"
            pressed={pin.pinned}
            onClick={pin.onToggle}
          />
        </div>
      ) : null}
    </div>
  );

  return (
    <div className={cx("slds-page-header", VARIANT_CLASS[variant])}>
      <div className="slds-page-header__row">
        <div className="slds-page-header__col-title">
          {breadcrumbs?.length ? <Breadcrumb items={breadcrumbs} className="slds-m-bottom_xx-small" /> : null}
          <div className="slds-media">
            {iconName ? (
              <div className="slds-media__figure">
                <Icon name={iconName} svgClassName="slds-page-header__icon" assistiveText={objectLabel ? undefined : title} />
              </div>
            ) : null}
            <div className="slds-media__body">{name}</div>
          </div>
        </div>
        {actions?.length ? (
          <div className="slds-page-header__col-actions">
            <div className="slds-page-header__controls">
              {actions.map((a, i) => (
                <div key={i} className="slds-page-header__control">
                  {a}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
      {meta !== undefined || controls !== undefined ? (
        <div className="slds-page-header__row">
          <div className="slds-page-header__col-meta">
            {meta !== undefined ? <p className="slds-page-header__meta-text">{meta}</p> : null}
          </div>
          {controls !== undefined ? <div className="slds-page-header__col-controls">{controls}</div> : null}
        </div>
      ) : null}
      {details?.length ? (
        <div className="slds-page-header__row slds-page-header__row_gutters">
          <div className="slds-page-header__col-details">
            <ul className="slds-page-header__detail-row">
              {details.map((d) => (
                <li key={d.label} className="slds-page-header__detail-block">
                  <div className="slds-text-title slds-truncate" title={d.label}>
                    {d.label}
                  </div>
                  <div className="slds-truncate" title={d.title ?? (typeof d.value === "string" ? d.value : undefined)}>
                    {d.value}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
