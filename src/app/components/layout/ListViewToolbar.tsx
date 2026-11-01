import { ButtonGroup } from "../buttons/ButtonGroup";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { ButtonMenu } from "../buttons/ButtonMenu";
import type { MenuItem } from "../buttons/MenuDropdown";
import { Input } from "../forms/Input";

export type ListViewToolbarProps = {
  /** "Search this list…" input. */
  search?: { value: string; onChange: (value: string) => void; placeholder?: string };
  /** List View Controls (gear ▾). */
  settingsItems?: MenuItem[];
  /** Display As (table ▾). */
  displayItems?: MenuItem[];
  onMenuSelect?: (menu: "settings" | "display", value: string) => void;
  onRefresh?: () => void;
  onSort?: () => void;
  /** Inline-edit pencil. */
  onEdit?: () => void;
  /** Charts / Filters stateful pair. */
  charts?: { pressed: boolean; onToggle: () => void };
  filters?: { pressed: boolean; onToggle: () => void };
};

/**
 * List view controls (SLDS Page Header — object home controls row): search, gear and display menus, refresh,
 * sort, edit and the charts/filters group. Omit props to drop controls (related lists: gear + refresh).
 */
export function ListViewToolbar({
  search,
  settingsItems,
  displayItems,
  onMenuSelect,
  onRefresh,
  onSort,
  onEdit,
  charts,
  filters,
}: ListViewToolbarProps) {
  return (
    <div className="slds-page-header__controls">
      {search ? (
        <div className="slds-page-header__control">
          <Input
            label="Search this list"
            hideLabel
            type="search"
            iconLeft="utility:search"
            placeholder={search.placeholder ?? "Search this list..."}
            value={search.value}
            onChange={(v) => search.onChange(v)}
          />
        </div>
      ) : null}
      {settingsItems?.length ? (
        <div className="slds-page-header__control">
          <ButtonMenu
            assistiveText="List View Controls"
            iconName="utility:settings"
            items={settingsItems}
            position="right"
            onSelect={(v) => onMenuSelect?.("settings", v)}
          />
        </div>
      ) : null}
      {displayItems?.length ? (
        <div className="slds-page-header__control">
          <ButtonMenu
            assistiveText="Select list display"
            iconName="utility:table"
            items={displayItems}
            position="right"
            onSelect={(v) => onMenuSelect?.("display", v)}
          />
        </div>
      ) : null}
      {onRefresh ? (
        <div className="slds-page-header__control">
          <ButtonIcon iconName="utility:refresh" assistiveText="Refresh" variant="border-filled" onClick={onRefresh} />
        </div>
      ) : null}
      {onSort ? (
        <div className="slds-page-header__control">
          <ButtonIcon iconName="utility:sort" assistiveText="Sort" variant="border-filled" onClick={onSort} />
        </div>
      ) : null}
      {onEdit ? (
        <div className="slds-page-header__control">
          <ButtonIcon iconName="utility:edit" assistiveText="Edit List" variant="border-filled" onClick={onEdit} />
        </div>
      ) : null}
      {charts || filters ? (
        <div className="slds-page-header__control">
          <ButtonGroup kind="list" label="Charts and filters">
            {charts ? (
              <ButtonIcon iconName="utility:chart" assistiveText="Show charts" variant="border-filled" pressed={charts.pressed} onClick={charts.onToggle} />
            ) : null}
            {filters ? (
              <ButtonIcon iconName="utility:filterList" assistiveText="Show filters" variant="border-filled" pressed={filters.pressed} onClick={filters.onToggle} />
            ) : null}
          </ButtonGroup>
        </div>
      ) : null}
    </div>
  );
}
