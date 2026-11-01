import { useState } from "react";
import type { RecordData, RelatedListConfig } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { createRecord, listRelated, recordName } from "../../services/records";
import { RelatedListCard } from "../components/cards/RelatedListCard";
import { DataTable, type DataTableColumn } from "../components/data/DataTable";
import { FileSelector } from "../components/forms/FileSelector";
import { toIso } from "../components/utils/dates";
import { updatedAgo, useConsole } from "../console/ConsoleContext";
import { useServiceData } from "../console/useServiceData";
import { ActionModal } from "../templates/ActionModal";
import { LIST_VIEW_CONTROLS, ROW_ACTIONS, sortRows } from "../templates/listShared";
import { fieldAt, formatTemplate, formatValue, getValue, hasValue, isLookup } from "./fieldValues";

export type RelatedListProps = {
  list: RelatedListConfig;
  parent: RecordData;
  /** Captured back-end state (?state=error): show the loading body Figma captured. */
  captured?: boolean;
  onAction?: (actionId: string) => void;
  onOpenRecord?: (apiName: string, id: string) => void;
};

/** A related-list card from config: count, ▼ menu / buttons, meta, and a tile, table or files body from the child records. */
export function RelatedList({ list, parent, captured, onAction, onOpenRecord }: RelatedListProps) {
  const con = useConsole();
  const childApi = list.objectApiName;
  const parentValue = list.parentValueField ? parent.values[list.parentValueField] : null;
  const parentId = list.parentValueField ? (isLookup(parentValue) ? parentValue.id : "") : parent.id;
  const { data } = useServiceData(
    () => (childApi && list.parentField ? listRelated(childApi, list.parentField, parentId) : Promise.resolve([] as RecordData[])),
    [childApi, list.parentField, parentId],
  );
  const child = childApi ? getObjectConfig(childApi) : null;
  const records = child && list.sort ? sortRows(child, data ?? [], list.sort) : data ?? [];
  const shown = list.pageSize ? records.slice(0, list.pageSize) : records;
  const count = childApi ? (list.pageSize && records.length >= list.pageSize ? `${list.pageSize}+` : records.length) : parent.related?.[list.id] ?? 0;
  const [selected, setSelected] = useState<string[]>([]);
  const [deleting, setDeleting] = useState<RecordData | null>(null);
  const loading = Boolean(captured && list.backend?.loading);

  const menu = list.menu === false || list.buttons ? undefined : [{ value: "new", label: "New" }];
  const onNew = () => (list.newAction ? onAction?.(list.newAction) : undefined);
  const upload = (files: File[]) => {
    if (!childApi || !list.parentField) return;
    files.forEach((f) => {
      const dot = f.name.lastIndexOf(".");
      createRecord(childApi, undefined, {
        title: dot > 0 ? f.name.slice(0, dot) : f.name,
        fileType: dot > 0 ? f.name.slice(dot + 1).toLowerCase() : "",
        size: `${Math.max(1, Math.round(f.size / 1024))}KB`,
        uploadedDate: toIso(new Date()),
        [list.parentField ?? "parent"]: { id: parent.id, name: "", objectApiName: "" },
      });
    });
  };

  const items = `${records.length} ${records.length === 1 ? "item" : "items"}`;
  const meta =
    child && list.sort
      ? `${items} • Sorted by ${fieldAt(child, list.sort.field).label} • Updated ${updatedAgo(con.listUpdatedAt)}`
      : child && list.meta && records.length
        ? `${items} • Updated ${updatedAgo(con.listUpdatedAt)}`
        : undefined;

  let body = null;
  if (child && list.display === "table" && list.columns && records.length) {
    const columns: DataTableColumn<RecordData>[] = list.columns.map((c) => {
      const def = fieldAt(child, c.field);
      return { key: c.field, label: c.label ?? def.label, value: (r) => formatValue(def, getValue(r, c.field)), link: c.link ? (r) => hasValue(getValue(r, c.field)) : undefined, align: c.align };
    });
    body = (
      <DataTable
        label={list.label}
        columns={columns}
        rows={shown}
        rowActions={list.rowActions === false ? undefined : ROW_ACTIONS}
        selection={list.selectable ? { selectedIds: selected, onChange: setSelected } : undefined}
        onLinkClick={(r, key) => {
          const v = getValue(r, key);
          const c = list.columns?.find((x) => x.field === key);
          if (c?.link === "lookup" && isLookup(v)) onOpenRecord?.(v.objectApiName, v.id);
          else if (childApi) onOpenRecord?.(childApi, r.id);
        }}
        onRowAction={(r, action) => (action === "delete" ? setDeleting(r) : childApi && onOpenRecord?.(childApi, r.id))}
      />
    );
  } else if (child && list.display === "files" && !records.length) {
    body = (
      <div className="slds-p-around_small">
        <FileSelector variant="area" label={list.label} onFiles={upload} buttonLabel="Upload Files" dropLabel="Or drop files" />
      </div>
    );
  }
  const tiles = child && (list.display === "tiles" || list.display === "files") && records.length;

  return (
    <div className="slds-m-bottom_small">
      <RelatedListCard
        iconName={list.iconName}
        title={list.label}
        count={loading ? "" : count}
        meta={meta}
        menuItems={loading ? undefined : menu}
        onMenuSelect={(v) => (v === "new" ? onNew() : undefined)}
        buttons={list.buttons}
        onButton={(v) => (v === "new" ? onNew() : undefined)}
        settingsItems={list.settings ? LIST_VIEW_CONTROLS : undefined}
        onRefresh={list.settings ? con.refreshList : undefined}
        loading={loading}
        records={
          tiles
            ? records.map((r) => ({
                id: r.id,
                title: list.tileTitle ? formatValue(child.fields[list.tileTitle], r.values[list.tileTitle]) : recordName(childApi ?? "", r),
                details: (list.tileLines ?? []).map((t) => formatTemplate(child, r, t)),
              }))
            : undefined
        }
        onRecordClick={(id) => childApi && onOpenRecord?.(childApi, id)}
        onViewAll={child && records.length ? () => undefined : undefined}
      >
        {body ?? undefined}
      </RelatedListCard>
      {deleting && child ? (
        <ActionModal
          apiName={child.apiName}
          record={deleting}
          action={{ id: "delete", label: "Delete", kind: "delete", title: `Delete ${child.label}`, message: `Are you sure you want to delete this ${child.label.toLowerCase()}?`, confirmLabel: "Delete" }}
          today={con.today}
          onClose={() => setDeleting(null)}
          onDeleted={() => setDeleting(null)}
        />
      ) : null}
    </div>
  );
}
