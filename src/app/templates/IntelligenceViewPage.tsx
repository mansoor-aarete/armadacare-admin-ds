import { useMemo, useState } from "react";
import type { MetricCount, RecordData } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { listRecords } from "../../services/records";
import { Button } from "../components/buttons/Button";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { ButtonIcon } from "../components/buttons/ButtonIcon";
import { ButtonMenu } from "../components/buttons/ButtonMenu";
import { Card } from "../components/cards/Card";
import { MetricTile } from "../components/cards/MetricTile";
import { DataTable, type DataTableColumn } from "../components/data/DataTable";
import { EmptyState } from "../components/feedback/EmptyState";
import { PageHeader } from "../components/layout/PageHeader";
import { useConsole } from "../console/ConsoleContext";
import { listUrl, newUrl } from "../console/urls";
import { useServiceData } from "../console/useServiceData";
import { fieldAt, formatValue, getValue, hasValue } from "../widgets/fieldValues";
import { LIST_VIEW_CONTROLS } from "./listShared";

export type IntelligenceViewPageProps = { apiName: string };

function matches(count: MetricCount, r: RecordData): boolean {
  if (count.kind === "all") return true;
  const n = r.related?.[count.listId] ?? 0;
  const some = typeof n === "string" ? n !== "0" : n > 0;
  return count.kind === "relatedAtLeastOne" ? some : !some;
}

/** Object Intelligence View: filter bar, metric tiles, filtered list (or empty state) — from config. */
export function IntelligenceViewPage({ apiName }: IntelligenceViewPageProps) {
  const config = getObjectConfig(apiName);
  const view = config.intelligence;
  const con = useConsole();
  const listView = config.listViews.find((v) => v.id === view?.listViewId) ?? config.listViews[0];
  const { data } = useServiceData(() => listRecords(apiName, listView.filter), [apiName, listView.id]);
  const [metricId, setMetricId] = useState(view?.metrics[0]?.id ?? "");
  const [important, setImportant] = useState(false);
  const metric = view?.metrics.find((m) => m.id === metricId);
  const rows = useMemo(() => (data ?? []).filter((r) => (metric ? matches(metric.count, r) : true)), [data, metric]);
  if (!view) return null;

  const label = (id: string) => config.actions.find((a) => a.id === id)?.label ?? id;
  const columns: DataTableColumn<RecordData>[] = listView.columns.map((c) => {
    const def = fieldAt(config, c.field);
    return { key: c.field, label: c.label ?? def.label, value: (r) => formatValue(def, getValue(r, c.field)), link: c.link ? (r) => hasValue(getValue(r, c.field)) : undefined };
  });

  return (
    <>
      <PageHeader
        variant="object-home"
        iconName={config.iconName}
        objectLabel={config.labelPlural}
        title={listView.label}
        listViews={[{ type: "header", label: "List Views" }, ...config.listViews.map((v) => ({ value: v.id, label: v.label }))]}
        onListViewSelect={(id) => con.navigate(listUrl(apiName, id))}
        actions={[
          <ButtonGroup key="actions" kind="list" label="Intelligence view actions">
            <ButtonMenu assistiveText="List View Controls" iconName="utility:settings" items={LIST_VIEW_CONTROLS} position="right" />
            <ButtonIcon iconName="utility:refresh" assistiveText="Refresh" variant="border-filled" onClick={con.refreshList} />
            <ButtonIcon iconName="utility:edit" assistiveText="Edit List" variant="border-filled" />
            {view.headerButtons.map((id) => (
              <Button key={id} label={label(id)} onClick={() => (id === "new" ? con.navigate(newUrl(apiName)) : undefined)} />
            ))}
            <Button label="List View" onClick={() => con.navigate(listUrl(apiName))} />
            <ButtonMenu assistiveText="Show more actions" items={[{ value: "assignLabel", label: "Assign Label" }]} position="right" size="x-small" actions />
          </ButtonGroup>,
        ]}
      />
      <div className="slds-p-around_small">
        <Card bodyPadding>
          <div className="slds-grid slds-grid_align-end slds-grid_vertical-align-center slds-m-bottom_large">
            {view.filters.map((f) => (
              <div key={f.label} className="slds-grid slds-grid_vertical-align-center slds-m-right_medium">
                <span className="slds-m-right_x-small">{f.label}</span>
                <Button label={f.value} iconName={f.iconName} iconPosition="right" />
              </div>
            ))}
            <ButtonGroup label="Filters">
              <ButtonIcon iconName="utility:bookmark" assistiveText="Show important accounts" variant="border-filled" pressed={important} onClick={() => setImportant((i) => !i)} />
              <ButtonIcon iconName="utility:filterList" assistiveText="Show filters" variant="border-filled" />
            </ButtonGroup>
          </div>
          <div className="slds-grid slds-m-bottom_medium">
            {view.metrics.map((m) => (
              <div key={m.id} className="slds-m-right_large">
                <MetricTile label={m.label} value={(data ?? []).filter((r) => matches(m.count, r)).length} selected={m.id === metricId} onSelect={() => setMetricId(m.id)} />
              </div>
            ))}
          </div>
          <Card shaded>
            <div className="slds-grid slds-grid_vertical-align-center slds-p-around_small">
              <p className="slds-col slds-text-body_small">{view.meta.replace("{count}", String(rows.length)).replace("{metric}", metric?.label ?? "")}</p>
              <ButtonGroup label="List actions">
                {view.toolbarButtons.map((id) => (
                  <Button key={id} label={label(id)} />
                ))}
              </ButtonGroup>
            </div>
            {rows.length ? (
              <DataTable label={listView.label} columns={columns} rows={rows} onLinkClick={(r) => con.openRecord(apiName, r.id)} />
            ) : (
              <EmptyState heading={view.empty.heading} message={view.empty.message} size="large" shaded />
            )}
          </Card>
        </Card>
      </div>
    </>
  );
}
