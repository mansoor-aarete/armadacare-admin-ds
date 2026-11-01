import { useMemo, useState } from "react";
import type { ListFilter, RecordData } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { getRecord, listRecords, recordName } from "../../services/records";
import { Button } from "../components/buttons/Button";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { ButtonMenu } from "../components/buttons/ButtonMenu";
import { DataTable, type DataTableColumn } from "../components/data/DataTable";
import { Input } from "../components/forms/Input";
import { Icon } from "../components/icons/Icon";
import { PageHeader } from "../components/layout/PageHeader";
import { VerticalNav } from "../components/navigation/VerticalNav";
import { useConsole } from "../console/ConsoleContext";
import { listUrl } from "../console/urls";
import { useServiceData } from "../console/useServiceData";
import { fieldAt, formatValue, getValue, hasValue, isLookup } from "../widgets/fieldValues";
import { ActionModal } from "./ActionModal";
import { LIST_VIEW_CONTROLS, ROW_ACTIONS, sortRows } from "./listShared";

export type ReportsHomePageProps = {
  /** Object whose home this is ("Report"). */
  apiName: string;
  listViewId?: string;
  /** Folder tab: list the reports of this folder (record id of the folder object). */
  folder?: { apiName: string; id: string };
};

/** Reports home (Figma R1, R3, R4, R7, R9): left navigation of scopes, header with search and New buttons, folder / report table. */
export function ReportsHomePage({ apiName, listViewId, folder }: ReportsHomePageProps) {
  const config = getObjectConfig(apiName);
  const con = useConsole();
  const view =
    (folder ? config.listViews.find((v) => !v.navSection) : config.listViews.find((v) => v.id === listViewId)) ??
    config.listViews.find((v) => v.id === config.defaultListView) ??
    config.listViews[0];
  const rowApi = view.objectApiName ?? apiName;
  const rowConfig = getObjectConfig(rowApi);
  const filter: ListFilter = view.filter.kind === "fieldEquals" && view.filter.value === "$folder" && folder ? { ...view.filter, value: folder.id } : view.filter;
  const { data } = useServiceData(() => listRecords(rowApi, filter), [rowApi, view.id, folder?.id]);
  const { data: folderRecord } = useServiceData(() => (folder ? getRecord(folder.apiName, folder.id) : Promise.resolve(null)), [folder?.id]);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<RecordData | null>(null);
  const [creating, setCreating] = useState(false);
  const [sortBy, setSortBy] = useState<{ field: string; direction: "ascending" | "descending" } | null>(null);

  const columns: DataTableColumn<RecordData>[] = view.columns.map((c) => {
    const def = fieldAt(rowConfig, c.field);
    const value = (r: RecordData) => formatValue(def, getValue(r, c.field));
    return {
      key: c.field,
      label: c.label ?? def.label,
      value,
      sortable: true,
      link: c.link ? (r) => hasValue(getValue(r, c.field)) : undefined,
      render: c.iconName
        ? (r) => (
            <span className="slds-grid slds-grid_vertical-align-center">
              <Icon name={c.iconName ?? "utility:open_folder"} size="x-small" tone="default" className="slds-m-right_x-small" />
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  con.openRecord(rowApi, r.id);
                }}
              >
                {value(r)}
              </a>
            </span>
          )
        : undefined,
      align: c.align,
    };
  });
  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    // Reports home keeps the server order (Figma: not alphabetical); sorting comes from the column headers.
    const found = (data ?? []).filter((r) => !term || recordName(rowApi, r).toLowerCase().includes(term));
    return sortBy ? sortRows(rowConfig, found, sortBy) : found;
  }, [data, search, rowApi, view.id, sortBy]);

  const sections = Array.from(new Set(config.listViews.map((v) => v.navSection).filter((s): s is string => Boolean(s)))).map((title) => ({
    id: title,
    title,
    items: config.listViews.filter((v) => v.navSection === title).map((v) => ({ id: v.id, label: v.label })),
  }));
  const tabbed = config.listViews.find((v) => v.openInTab);
  const title = folder ? `${tabbed?.label ?? ""} › ${folderRecord ? recordName(folder.apiName, folderRecord) : ""}` : view.label;
  const newFolder = config.actions.find((a) => a.id === "newFolder");
  const deleteAction = getObjectConfig(rowApi).actions.find((a) => a.kind === "delete");

  return (
    <>
      <PageHeader
        variant="object-home"
        objectLabel={config.labelPlural}
        title={title}
        meta={`${rows.length} items`}
        actions={[
          <Input key="search" label={view.searchPlaceholder ?? "Search"} hideLabel placeholder={view.searchPlaceholder} value={search} onChange={setSearch} />,
          <ButtonGroup key="new" label="Report actions">
            {(config.listHeaderActions ?? []).map((id) => (
              <Button key={id} label={config.actions.find((a) => a.id === id)?.label ?? id} onClick={() => (id === "newFolder" ? setCreating(true) : undefined)} />
            ))}
            {folder ? <ButtonMenu assistiveText="More folder actions" items={[{ value: "share", label: "Share" }]} position="right" size="x-small" actions /> : null}
          </ButtonGroup>,
          <ButtonMenu key="settings" assistiveText="List View Controls" iconName="utility:settings" items={LIST_VIEW_CONTROLS} position="right" />,
        ]}
      />
      <div className="slds-grid">
        <div className="slds-col slds-size_1-of-12 slds-shrink-none">
          <VerticalNav
            label={config.labelPlural}
            sections={sections}
            activeId={folder ? tabbed?.id ?? "" : view.id}
            onSelect={(id) => con.navigate(listUrl(apiName, id))}
            shaded
          />
        </div>
        <div className="slds-col">
          <DataTable
            label={title}
            columns={columns}
            rows={rows}
            firstColumnIsRowHeader
            resizable={false}
            sort={sortBy ? { key: sortBy.field, direction: sortBy.direction } : undefined}
            onSort={(key) => setSortBy((s) => ({ field: key, direction: s?.field === key && s.direction === "ascending" ? "descending" : "ascending" }))}
            onLinkClick={(r, key) => {
              const c = view.columns.find((x) => x.field === key);
              const v = getValue(r, key);
              if (c?.link === "record") con.openRecord(rowApi, r.id);
              else if (c?.link === "lookup" && isLookup(v)) con.openRecord(v.objectApiName, v.id);
            }}
            rowActions={ROW_ACTIONS}
            onRowAction={(r, action) => (action === "delete" ? setDeleting(r) : con.openRecord(rowApi, r.id))}
          />
        </div>
      </div>
      {deleting && deleteAction?.kind === "delete" ? (
        <ActionModal apiName={rowApi} record={deleting} action={deleteAction} today={con.today} onClose={() => setDeleting(null)} onDeleted={() => setDeleting(null)} />
      ) : null}
      {creating && newFolder?.kind === "form" ? (
        <ActionModal apiName={apiName} record={{ id: "", values: {} }} action={newFolder} today={con.today} onClose={() => setCreating(false)} onDeleted={() => setCreating(false)} />
      ) : null}
    </>
  );
}
