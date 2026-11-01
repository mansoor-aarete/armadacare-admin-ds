import type { ReactNode } from "react";
import { Button } from "../buttons/Button";
import { ButtonGroup } from "../buttons/ButtonGroup";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { ButtonMenu } from "../buttons/ButtonMenu";
import { ButtonStateful } from "../buttons/ButtonStateful";
import type { MenuItem, MenuLength } from "../buttons/MenuDropdown";
import type { ObjectIconName } from "../icons/Icon";
import { PageHeader, type PageHeaderDetail } from "./PageHeader";

export type HighlightsAction = { value: string; label: string; disabled?: boolean };

export type HighlightsPanelProps = {
  iconName: ObjectIconName;
  /** Object type label above the name (Figma: "Contact", "Account", "Plan Year"). */
  objectLabel: string;
  /** Record name. */
  title: string;
  /** Visible action buttons (Figma: Send with Docusign / Change Owner / Log an Activity). */
  actions?: HighlightsAction[];
  /** Overflow ▼ menu; with no `actions` it is the only control (Figma T1). */
  overflowActions?: MenuItem[];
  /** Scroll the overflow menu after this many items (Figma A9: 24 actions in a 10-item list). ds-v1.5. */
  overflowLength?: MenuLength;
  onAction?: (value: string) => void;
  /** Follow / Following stateful button (Figma: accounts). */
  follow?: { following: boolean; onToggle: (following: boolean) => void };
  /** View hierarchy icon button (Figma: accounts, contacts). */
  onHierarchy?: () => void;
  /** Up to ~6 key fields (Figma detail row); values may be links or empty. */
  details?: PageHeaderDetail[];
  /** Extra controls placed before the action group. */
  extraActions?: ReactNode[];
};

/**
 * Record highlights panel = SLDS Page Header (record home): icon, type, name, Follow, hierarchy,
 * action button group with overflow menu, detail row.
 */
export function HighlightsPanel({
  iconName,
  objectLabel,
  title,
  actions = [],
  overflowActions,
  overflowLength,
  onAction,
  follow,
  onHierarchy,
  details,
  extraActions = [],
}: HighlightsPanelProps) {
  const controls: ReactNode[] = [...extraActions];
  if (onHierarchy) {
    controls.push(<ButtonIcon iconName="utility:hierarchy" assistiveText="View Hierarchy" variant="border-filled" onClick={onHierarchy} />);
  }
  if (follow) {
    controls.push(<ButtonStateful selected={follow.following} onToggle={follow.onToggle} />);
  }
  if (actions.length || overflowActions?.length) {
    controls.push(
      <ButtonGroup kind="list" label="Record actions">
        {actions.map((a) => (
          <Button key={a.value} label={a.label} disabled={a.disabled} onClick={() => onAction?.(a.value)} />
        ))}
        {overflowActions?.length ? (
          <ButtonMenu assistiveText="Show more actions" items={overflowActions} onSelect={onAction} position="right" size="x-small" length={overflowLength} actions />
        ) : null}
      </ButtonGroup>,
    );
  }
  return <PageHeader variant="record-home" iconName={iconName} objectLabel={objectLabel} title={title} actions={controls} details={details} />;
}
