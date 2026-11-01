import { useState } from "react";
import type { CardBodyConfig, FieldValue, LookupValue, ObjectConfig, RecordData, RegionConfig } from "../../config/types";
import { Card } from "../components/cards/Card";
import { EmptyState } from "../components/feedback/EmptyState";
import { Combobox } from "../components/forms/Combobox";
import { Input } from "../components/forms/Input";
import { Tabs } from "../components/layout/Tabs";
import { RecordFieldGrid } from "../components/record/RecordFieldGrid";
import { DataTable, type DataTableColumn } from "../components/data/DataTable";
import { getObjectConfig } from "../../objects";
import { listRelated } from "../../services/records";
import { useServiceData } from "../console/useServiceData";
import { fieldAt, formatValue, getValue, isLookup } from "./fieldValues";
import { FieldSection, type FieldSectionMode } from "./FieldSection";
import { FieldView } from "./FieldView";
import { RelatedList } from "./RelatedList";

export type RegionProps = {
  config: ObjectConfig;
  region: RegionConfig;
  record: RecordData;
  values: Record<string, FieldValue>;
  mode: FieldSectionMode;
  errors?: Record<string, string>;
  /** Captured back-end state (?state=error). */
  captured?: boolean;
  onChange?: (key: string, value: FieldValue) => void;
  onEdit?: (key: string) => void;
  onOpenLookup?: (lookup: LookupValue) => void;
  onAction?: (actionId: string) => void;
  onOpenRecord?: (apiName: string, id: string) => void;
};

type BodyProps = { body: CardBodyConfig; config: ObjectConfig; record: RecordData; values: Record<string, FieldValue>; onOpenLookup?: (l: LookupValue) => void };

/** Child records in a plain base table (Accumulator Balances). */
function ChildTable({ body, record }: { body: Extract<CardBodyConfig, { kind: "table" }>; record: RecordData }) {
  const child = getObjectConfig(body.objectApiName);
  const parent = body.parentValueField ? record.values[body.parentValueField] : null;
  const parentId = body.parentValueField ? (isLookup(parent) ? parent.id : "") : record.id;
  const { data } = useServiceData(() => listRelated(body.objectApiName, body.parentField, parentId), [body.objectApiName, body.parentField, parentId]);
  const columns: DataTableColumn<RecordData>[] = body.columns.map((c) => {
    const def = fieldAt(child, c.field);
    return { key: c.field, label: c.label ?? def.label, value: (r) => formatValue(def, getValue(r, c.field)), align: c.align };
  });
  return <DataTable variant="base" label={child.labelPlural} columns={columns} rows={data ?? []} firstColumnIsRowHeader={false} />;
}

function Body({ body, config, record, values, onOpenLookup }: BodyProps) {
  const [tab, setTab] = useState(body.kind === "tabs" ? body.tabs[0]?.id ?? "" : "");
  switch (body.kind) {
    case "message":
      return <p className={body.align === "center" ? "slds-text-align_center slds-p-vertical_medium" : "slds-p-vertical_x-small"}>{body.text}</p>;
    case "tabs":
      return (
        <Tabs
          activeId={tab}
          onSelect={setTab}
          items={body.tabs.map((t) => ({ id: t.id, label: t.label, content: <Body body={t.body} config={config} record={record} values={values} onOpenLookup={onOpenLookup} /> }))}
        />
      );
    case "filters":
      return (
        <>
          {body.filters.map((row, i) => (
            <div key={i} className="slds-grid slds-gutters_x-small slds-m-bottom_x-small">
              {row.map((f) =>
                f.kind === "search" ? (
                  <div key={f.placeholder} className="slds-col">
                    <Input label={f.placeholder} hideLabel iconLeft="utility:search" placeholder={f.placeholder} />
                  </div>
                ) : (
                  <div key={f.label} className={f.size === "1-of-3" ? "slds-col slds-size_1-of-3" : "slds-col slds-size_1-of-4"}>
                    <Combobox label={f.label} hideLabel options={f.options.map((o) => ({ value: o, label: o }))} defaultValue={f.value} />
                  </div>
                ),
              )}
            </div>
          ))}
          <p className="slds-text-align_center slds-p-vertical_large">{body.message}</p>
        </>
      );
    case "fields":
      return (
        <RecordFieldGrid
          columns={body.columns}
          fields={body.fields.map((f) => {
            const c = typeof f === "string" ? { field: f } : f;
            const base = config.fields[c.field];
            const def = { ...base, label: c.label ?? base.label, dateStyle: c.dateStyle ?? base.dateStyle };
            return <FieldView key={`${c.field}:${def.label}`} def={def} value={values[c.field]} layout="stacked" caps onOpenLookup={onOpenLookup} />;
          })}
        />
      );
    case "table":
      return <ChildTable body={body} record={record} />;
    case "empty":
      return null;
  }
}

/** One region of a record page column, from config: field section, content card or related list. */
export function Region({ config, region, record, values, mode, errors, captured, onChange, onEdit, onOpenLookup, onAction, onOpenRecord }: RegionProps) {
  if (region.kind === "relatedList") {
    return <RelatedList list={region.list} parent={record} captured={captured} onAction={onAction} onOpenRecord={onOpenRecord} />;
  }
  if (region.kind === "section") {
    const section = (
      <FieldSection
        config={config}
        section={region.section}
        values={values}
        mode={mode}
        errors={errors}
        onChange={onChange}
        onEdit={onEdit}
        onOpenLookup={onOpenLookup}
        blankHeight={region.blankHeight}
      />
    );
    return region.card ? (
      <div className="slds-m-bottom_small">
        <Card bodyPadding>{section}</Card>
      </div>
    ) : (
      section
    );
  }
  const subtitle = region.subtitle ? region.subtitle.values[String(values[region.subtitle.field] ?? "")] : undefined;
  const error = captured ? region.backend?.error : undefined;
  const loading = captured && region.backend?.loading;
  return (
    <div className="slds-m-bottom_small">
      <Card title={region.title} iconName={region.iconName} meta={subtitle} bodyPadding boundary={region.bordered}>
        {error ? (
          <p className={region.backend?.errorTone === "default" ? undefined : "slds-text-color_error"}>{error}</p>
        ) : loading ? (
          <EmptyState variant="region" regionSize="medium" regionLabel={`${region.title} (loading)`} />
        ) : (
          <Body body={region.body} config={config} record={record} values={values} onOpenLookup={onOpenLookup} />
        )}
      </Card>
    </div>
  );
}
