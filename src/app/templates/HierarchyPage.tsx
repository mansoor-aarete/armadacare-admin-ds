import { useState } from "react";
import type { RecordData } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { listRecords, recordName } from "../../services/records";
import { TreeGrid, type TreeGridRow } from "../components/data/TreeGrid";
import { Badge } from "../components/feedback/Badge";
import { PageHeader } from "../components/layout/PageHeader";
import { useConsole } from "../console/ConsoleContext";
import { listUrl, recordUrl } from "../console/urls";
import { useServiceData } from "../console/useServiceData";
import { fieldAt, formatValue, getValue, isLookup } from "../widgets/fieldValues";

export type HierarchyPageProps = { apiName: string; id: string };

/** "<Object> Hierarchy" sub-tab: tree grid from the record's top ancestor down, current record badged. */
export function HierarchyPage({ apiName, id }: HierarchyPageProps) {
  const config = getObjectConfig(apiName);
  const hierarchy = config.hierarchy;
  const con = useConsole();
  const { data } = useServiceData(() => listRecords(apiName), [apiName]);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  if (!data || !hierarchy) return null;

  const parentOf = (r: RecordData) => {
    const p = r.values[hierarchy.parentField];
    return isLookup(p) ? p.id : null;
  };
  const current = data.find((r) => r.id === id);
  if (!current) return null;
  let root = current;
  for (let guard = 0; guard < 50; guard++) {
    const parent = data.find((r) => r.id === parentOf(root));
    if (!parent) break;
    root = parent;
  }
  const toRow = (r: RecordData): TreeGridRow => ({
    id: r.id,
    cells: Object.fromEntries(hierarchy.columns.map((c) => [c.field, formatValue(fieldAt(config, c.field), getValue(r, c.field))])),
    badge: r.id === id ? <Badge variant="inverse">current</Badge> : undefined,
    children: data.filter((c) => parentOf(c) === r.id).map(toRow),
  });
  const allIds = data.map((r) => r.id);

  return (
    <>
      <PageHeader
        variant="related-list"
        title={`${config.label} Hierarchy`}
        breadcrumbs={[
          { label: config.label, onClick: () => con.navigate(listUrl(apiName)) },
          { label: recordName(apiName, current), onClick: () => con.navigate(recordUrl(apiName, id)) },
        ]}
      />
      <TreeGrid
        label={`${config.label} Hierarchy`}
        capsHeader
        columns={hierarchy.columns.map((c) => ({ key: c.field, label: c.label ?? fieldAt(config, c.field).label, link: c.link }))}
        rows={[toRow(root)]}
        expandedIds={allIds.filter((x) => !collapsed.includes(x))}
        onToggle={(rowId, expanded) => setCollapsed((s) => (expanded ? s.filter((x) => x !== rowId) : [...s, rowId]))}
        onLinkClick={(row, key) => (key === config.nameField ? con.openRecord(apiName, row.id) : undefined)}
      />
    </>
  );
}
