import { useMemo, useState } from "react";
import type { RecordData } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { listRecords } from "../../services/records";
import { Button } from "../components/buttons/Button";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { ButtonMenu } from "../components/buttons/ButtonMenu";
import type { MenuItem } from "../components/buttons/MenuDropdown";
import { DataTable, type DataTableColumn } from "../components/data/DataTable";
import { ListViewToolbar } from "../components/layout/ListViewToolbar";
import { PageHeader } from "../components/layout/PageHeader";
import { updatedAgo, useConsole } from "../console/ConsoleContext";
import { intelligenceUrl, listUrl, newUrl } from "../console/urls";
import { useServiceData } from "../console/useServiceData";
import { fieldAt, formatValue, getValue, hasValue } from "../widgets/fieldValues";
import { ActionModal } from "./ActionModal";
import { LIST_VIEW_CONTROLS, ROW_ACTIONS, sortRows } from "./listShared";

export type ObjectListPageProps = { apiName: string; listViewId?: string };

type Row = RecordData;

/** Object home: list view header, toolbar and table — columns, filter and sort from the list view config. */
export function ObjectListPage({ apiName, listViewId }: ObjectListPageProps) {
  const config = getObjectConfig(apiName);
  const con = useConsole();
  const listView = config.listViews.find((v) => v.id === listViewId) ?? config.listViews.find((v) => v.id === config.defaultListView) ?? config.listViews[0];
  const { data } = useServiceData(() => listRecords(apiName, listView.filter), [apiName, listView.id]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(listView.sort);
  const [selected, setSelected] = useState<string[]>([]);
  const [pinned, setPinned] = useState(false);
  const [charts, setCharts] = useState(false);
  const [filters, setFilters] = useState(false);
  const [deleting, setDeleting] = useState<Row | null>(null);

  const columns: DataTableColumn<Row>[] = listView.columns.map((c) => {
    const def = fieldAt(config, c.field);
    return {
      key: c.field,
      label: c.label ?? def.label,
      value: (r) => formatValue(def, getValue(r, c.field)),
      link: c.link ? (r) => hasValue(getValue(r, c.field)) : undefined,
      sortable: true,
      width: c.width,
    };
  });
  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const found = (data ?? []).filter((r) => !term || columns.some((c) => c.value(r).toLowerCase().includes(term)));
    return sortRows(config, found, sort).slice(0, listView.pageSize ?? found.length);
  }, [data, search, sort]);

  const sortLabel = fieldAt(config, sort.field).label;
  const deleteAction = config.actions.find((a) => a.id === "delete");
  const headerActions = config.listHeaderActions ?? [];
  const displayItems: MenuItem[] = [
    { type: "header", label: "Display as" },
    { type: "checkbox", value: "table", label: "Table", checked: true },
    { type: "checkbox", value: "intelligence", label: "Intelligence View", checked: false },
  ];

  return (
    <>
      <PageHeader
        variant="object-home"
        iconName={config.iconName}
        objectLabel={config.labelPlural}
        title={listView.label}
        listViews={[{ type: "header", label: "List Views" }, ...config.listViews.map((v) => ({ value: v.id, label: v.label }))]}
        onListViewSelect={(id) => con.navigate(listUrl(apiName, id))}
        pin={{ pinned, onToggle: () => setPinned((p) => !p) }}
        actions={[
          <ButtonGroup key="actions" kind="list" label="List view actions">
            {headerActions.map((id) => (
              <Button
                key={id}
                label={config.actions.find((a) => a.id === id)?.label ?? id}
                onClick={() => (id === "new" ? con.navigate(newUrl(apiName)) : undefined)}
              />
            ))}
            <ButtonMenu assistiveText="Show more actions" items={[{ value: "assignLabel", label: "Assign Label" }]} position="right" size="x-small" actions />
          </ButtonGroup>,
        ]}
        meta={`${listView.pageSize && (data?.length ?? 0) > listView.pageSize ? `${listView.pageSize}+` : rows.length} items • Sorted by ${sortLabel} • Updated ${updatedAgo(con.listUpdatedAt)}`}
        controls={
          <ListViewToolbar
            search={{ value: search, onChange: setSearch }}
            settingsItems={LIST_VIEW_CONTROLS}
            displayItems={displayItems}
            onMenuSelect={(menu, value) => (menu === "display" && value === "intelligence" ? con.navigate(intelligenceUrl(apiName)) : undefined)}
            onRefresh={con.refreshList}
            onSort={() => setSort((s) => ({ ...s, direction: s.direction === "ascending" ? "descending" : "ascending" }))}
            onEdit={() => undefined}
            charts={{ pressed: charts, onToggle: () => setCharts((c) => !c) }}
            filters={{ pressed: filters, onToggle: () => setFilters((f) => !f) }}
          />
        }
      />
      <DataTable
        label={listView.label}
        columns={columns}
        rows={rows}
        rowNumberColumn={listView.rowNumbers}
        selection={{ selectedIds: selected, onChange: setSelected }}
        sort={{ key: sort.field, direction: sort.direction }}
        onSort={(key) => setSort((s) => ({ field: key, direction: s.field === key && s.direction === "ascending" ? "descending" : "ascending" }))}
        columnMenus
        onLinkClick={(row, key) => (listView.columns.find((c) => c.field === key)?.link === "record" ? con.openRecord(apiName, row.id) : undefined)}
        rowActions={ROW_ACTIONS}
        onRowAction={(row, value) => (value === "delete" ? setDeleting(row) : con.openRecord(apiName, row.id))}
      />
      {deleting && deleteAction?.kind === "delete" ? (
        <ActionModal apiName={apiName} record={deleting} action={deleteAction} today={con.today} onClose={() => setDeleting(null)} onDeleted={() => setDeleting(null)} />
      ) : null}
    </>
  );
}
