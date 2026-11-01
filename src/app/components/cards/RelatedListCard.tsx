import type { ReactNode } from "react";
import { Button } from "../buttons/Button";
import { ButtonGroup } from "../buttons/ButtonGroup";
import { ButtonMenu } from "../buttons/ButtonMenu";
import type { MenuItem } from "../buttons/MenuDropdown";
import { Spinner } from "../feedback/Spinner";
import type { ObjectIconName } from "../icons/Icon";
import { ListViewToolbar } from "../layout/ListViewToolbar";
import { Card } from "./Card";

export type RelatedListRecord = {
  id: string;
  title: string;
  /** Detail lines under the title (Figma Notes: "10/21/2026 10:11 AM by Mansoor Ahmad", "Basic testing"). */
  details?: ReactNode[];
};

export type RelatedListCardProps = {
  iconName: ObjectIconName;
  /** Related list name, e.g. "Notes". */
  title: string;
  /** Shown as "(n)"; strings allow "6+". */
  count: number | string;
  onTitleClick?: () => void;
  /** Line under the title (Figma: "2 items • Updated a few seconds ago"). */
  meta?: string;
  /** Header buttons (Figma: "New", "Change Owner | New"). */
  buttons?: { value: string; label: string }[];
  onButton?: (value: string) => void;
  /** ▼ menu (collapsed related lists in the right column). */
  menuItems?: MenuItem[];
  onMenuSelect?: (value: string) => void;
  /** List view controls in the header (Figma E1 / CL5: gear ▾ + refresh). */
  settingsItems?: MenuItem[];
  onRefresh?: () => void;
  /** Tile list body (Notes). */
  records?: RelatedListRecord[];
  onRecordClick?: (id: string) => void;
  /** Custom body (e.g. a DataTable). */
  children?: ReactNode;
  /** Loading body (Figma shows stencils; SLDS 1 has no stencil — spinner). */
  loading?: boolean;
  /** "View All" footer. */
  onViewAll?: () => void;
};

/**
 * Lightning related-list card: SLDS Card (shaded) with object icon, "Title (count)" link, header controls,
 * tiles / table body and "View All" footer. Empty lists render the header only.
 */
export function RelatedListCard({
  iconName,
  title,
  count,
  onTitleClick,
  meta,
  buttons = [],
  onButton,
  menuItems,
  onMenuSelect,
  settingsItems,
  onRefresh,
  records,
  onRecordClick,
  children,
  loading,
  onViewAll,
}: RelatedListCardProps) {
  const fullTitle = `${title} (${count})`;
  const hasToolbar = Boolean(settingsItems?.length || onRefresh);
  const actions =
    hasToolbar || buttons.length || menuItems?.length ? (
      <div className="slds-grid slds-grid_vertical-align-center">
        {hasToolbar ? (
          <div className="slds-m-right_x-small">
            <ListViewToolbar settingsItems={settingsItems} onRefresh={onRefresh} />
          </div>
        ) : null}
        {buttons.length > 1 ? (
          <ButtonGroup kind="list" label={`${title} actions`}>
            {buttons.map((b) => (
              <Button key={b.value} label={b.label} onClick={() => onButton?.(b.value)} />
            ))}
          </ButtonGroup>
        ) : buttons.length === 1 ? (
          <Button label={buttons[0].label} onClick={() => onButton?.(buttons[0].value)} />
        ) : null}
        {menuItems?.length ? (
          <ButtonMenu assistiveText={`Show actions for ${title}`} items={menuItems} iconSize="x-small" position="right" onSelect={onMenuSelect} />
        ) : null}
      </div>
    ) : undefined;

  let body: ReactNode = null;
  if (loading) {
    body = (
      <div className="slds-is-relative slds-p-around_x-large">
        <Spinner size="small" assistiveText={`Loading ${title}`} />
      </div>
    );
  } else if (children) {
    body = children;
  } else if (records?.length) {
    body = (
      <ul className="slds-p-horizontal_medium">
        {records.map((r) => (
          <li key={r.id} className="slds-p-vertical_x-small">
            <article className="slds-tile">
              <h3 className="slds-tile__title slds-truncate" title={r.title}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onRecordClick?.(r.id);
                  }}
                >
                  {r.title}
                </a>
              </h3>
              <div className="slds-tile__detail">
                {(r.details ?? []).map((d, i) => (
                  <p key={i} className="slds-truncate">
                    {d}
                  </p>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <Card
      shaded
      className="slds-card_boundary"
      iconName={iconName}
      title={fullTitle}
      meta={meta}
      onTitleClick={onTitleClick ?? (() => undefined)}
      actions={actions}
      footer={body && onViewAll ? { label: "View All", assistiveText: title, onClick: onViewAll } : undefined}
    >
      {body}
    </Card>
  );
}
