import type { DataTableColumn } from "../components/data/DataTable";
import type { RecordData, RelatedListConfig } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { listRelated, recordName } from "../../services/records";
import { RelatedListCard } from "../components/cards/RelatedListCard";
import { DataTable } from "../components/data/DataTable";
import { useServiceData } from "../console/useServiceData";
import { fieldAt, formatTemplate, formatValue, getValue, hasValue } from "./fieldValues";

export type RelatedListProps = {
  list: RelatedListConfig;
  parent: RecordData;
  /** Captured back-end state (?state=error): show the loading body Figma captured. */
  captured?: boolean;
  onAction?: (actionId: string) => void;
  onOpenRecord?: (apiName: string, id: string) => void;
};

/** A related-list card from config: count, ▼ menu / buttons, and a tile or table body from the child records. */
export function RelatedList({ list, parent, captured, onAction, onOpenRecord }: RelatedListProps) {
  const childApi = list.objectApiName;
  const { data } = useServiceData(
    () => (childApi && list.parentField ? listRelated(childApi, list.parentField, parent.id) : Promise.resolve([] as RecordData[])),
    [childApi, list.parentField, parent.id],
  );
  const records = data ?? [];
  const count = childApi ? records.length : parent.related?.[list.id] ?? 0;
  const loading = Boolean(captured && list.backend?.loading);
  const child = childApi ? getObjectConfig(childApi) : null;

  const menu = list.menu === false ? undefined : [{ value: "new", label: "New" }];
  const onNew = () => (list.newAction ? onAction?.(list.newAction) : undefined);

  let body = null;
  if (child && records.length && list.display === "tiles") {
    body = undefined;
  } else if (child && records.length && list.display === "table" && list.columns) {
    const columns: DataTableColumn<RecordData>[] = list.columns.map((c) => {
      const def = fieldAt(child, c.field);
      return { key: c.field, label: c.label ?? def.label, value: (r) => formatValue(def, getValue(r, c.field)), link: c.link ? (r) => hasValue(getValue(r, c.field)) : undefined };
    });
    body = (
      <DataTable
        label={list.label}
        columns={columns}
        rows={records}
        selection={{ selectedIds: [], onChange: () => undefined }}
        rowActions={[
          { value: "edit", label: "Edit" },
          { value: "delete", label: "Delete" },
        ]}
        onLinkClick={(r) => childApi && onOpenRecord?.(childApi, r.id)}
      />
    );
  }

  return (
    <div className="slds-m-bottom_small">
      <RelatedListCard
        iconName={list.iconName}
        title={list.label}
        count={loading ? "" : count}
        menuItems={loading ? undefined : menu}
        onMenuSelect={(v) => (v === "new" ? onNew() : undefined)}
        buttons={list.buttons}
        onButton={(v) => (v === "new" ? onNew() : undefined)}
        loading={loading}
        records={
          child && list.display === "tiles" && records.length
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
    </div>
  );
}
