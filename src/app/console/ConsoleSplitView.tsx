import { useMemo, useState } from "react";
import { getObjectConfig } from "../../objects";
import { listRecords, recordName } from "../../services/records";
import { SplitView, type SplitViewItem } from "../components/shell/SplitView";
import { LIST_VIEW_CONTROLS, sortRows } from "../templates/listShared";
import { fieldAt, formatValue, getValue } from "../widgets/fieldValues";
import { updatedAgo, useConsole } from "./ConsoleContext";
import { useServiceData } from "./useServiceData";

export type ConsoleSplitViewProps = {
  apiName: string;
  listViewId: string;
  onListViewChange: (id: string) => void;
  currentId?: string;
  selection: string[];
  onSelectionChange: (ids: string[]) => void;
};

/** Split-view list beside workspace tabs: the object's list view, item lines from config. */
export function ConsoleSplitView({ apiName, listViewId, onListViewChange, currentId, selection, onSelectionChange }: ConsoleSplitViewProps) {
  const config = getObjectConfig(apiName);
  const con = useConsole();
  const listView = config.listViews.find((v) => v.id === listViewId) ?? config.listViews[0];
  const { data } = useServiceData(() => listRecords(apiName, listView.filter), [apiName, listView.id]);
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [pinned, setPinned] = useState(false);
  const direction = listView.sort.direction;

  const lines = config.splitView ?? {};
  const text = (path: string | undefined, r: Parameters<typeof getValue>[0]) => (path ? formatValue(fieldAt(config, path), getValue(r, path)) : "");
  const items: SplitViewItem[] = useMemo(() => {
    const term = search.trim().toLowerCase();
    const rows = sortRows(config, data ?? [], { field: listView.sort.field, direction }).filter((r) => !term || recordName(apiName, r).toLowerCase().includes(term));
    return rows.map((r) => {
      const left = text(lines.line2Left, r);
      const right = text(lines.line2Right, r);
      return { id: r.id, title: recordName(apiName, r), titleRight: text(lines.titleRight, r) || undefined, rows: left || right ? [{ left, right }] : undefined };
    });
  }, [data, search, direction, apiName]);

  const sortLabel = fieldAt(config, listView.sort.field).label;
  return (
    <SplitView
      open={open}
      onToggle={setOpen}
      iconName={config.iconName}
      objectLabel={config.labelPlural}
      listViewName={listView.label}
      listViews={[{ type: "header", label: "List Views" }, ...config.listViews.map((v) => ({ value: v.id, label: v.label }))]}
      onListViewSelect={onListViewChange}
      pinned={pinned}
      onPin={() => setPinned((p) => !p)}
      controls={LIST_VIEW_CONTROLS}
      meta={selection.length ? `${selection.length} items selected` : `${items.length} items • Updated ${updatedAgo(con.listUpdatedAt)}`}
      onRefresh={con.refreshList}
      search={{ value: search, onChange: setSearch }}
      sort={{ label: sortLabel, direction }}
      listInfo={`Sorted by ${sortLabel}.`}
      items={items}
      currentId={currentId}
      onOpen={(id) => con.openRecord(apiName, id)}
      selection={{ selectedIds: selection, onChange: onSelectionChange }}
    />
  );
}
