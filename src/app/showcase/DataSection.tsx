import { useState } from "react";
import { DataTable, type DataTableColumn, type SortDirection } from "../components/data/DataTable";
import { TreeGrid } from "../components/data/TreeGrid";
import { Badge } from "../components/feedback/Badge";
import { Icon } from "../components/icons/Icon";
import { ACCOUNT_ROWS, ROW_ACTIONS, type AccountRow } from "./patternData";
import { ShowcaseExample } from "./ShowcaseExample";

export const ACCOUNT_COLUMNS: DataTableColumn<AccountRow>[] = [
  { key: "name", label: "Account Name", value: (r) => r.name, link: () => true, sortable: true },
  { key: "site", label: "Account Site", value: (r) => r.site, sortable: true },
  { key: "created", label: "Created Date", value: (r) => r.created, sortable: true },
  { key: "type", label: "Type", value: (r) => r.type, sortable: true },
  { key: "open", label: "Open Activities", value: (r) => r.open, align: "right", sortable: true },
  { key: "owner", label: "Account Owner", value: (r) => r.owner, link: () => true, sortable: true },
  { key: "alias", label: "Owner Alias", value: (r) => r.alias, link: () => true },
];

type ReportRow = { id: string; name: string; description: string; folder: string; created: string };
const REPORT_ROWS: ReportRow[] = [
  { id: "r1", name: "AH Sales & Marketing", description: "Reports shared with the sales and marketing team.", folder: "Public Reports", created: "Feng Yue" },
  {
    id: "r2",
    name: "Claims by Status",
    description: "All claims grouped by status, with totals for approved, denied and pending claims across every plan year.",
    folder: "Claims",
    created: "Mansoor Ahmad",
  },
];
const REPORT_COLUMNS: DataTableColumn<ReportRow>[] = [
  {
    key: "name",
    label: "Name",
    value: (r) => r.name,
    render: (r) => (
      <span className="slds-grid slds-grid_vertical-align-center">
        <Icon name="standard:folder" size="x-small" className="slds-m-right_x-small" />
        <a href="#report">{r.name}</a>
      </span>
    ),
  },
  { key: "description", label: "Description", value: (r) => r.description, wrap: true },
  { key: "folder", label: "Folder", value: (r) => r.folder, link: () => true },
  { key: "created", label: "Created By", value: (r) => r.created },
];

type BalanceRow = { id: string; bucket: string; limit: string; used: string; remaining: string };
const BALANCE_ROWS: BalanceRow[] = [
  { id: "b1", bucket: "Covered Medical Expenses", limit: "$5,000.00", used: "$350.00", remaining: "$4,650.00" },
  { id: "b2", bucket: "Dental Treatments", limit: "$1,500.00", used: "$0.00", remaining: "$1,500.00" },
];
const BALANCE_COLUMNS: DataTableColumn<BalanceRow>[] = [
  { key: "bucket", label: "Benefit Category", value: (r) => r.bucket },
  { key: "limit", label: "Annual Limit", value: (r) => r.limit, align: "right" },
  { key: "used", label: "Used", value: (r) => r.used, align: "right" },
  { key: "remaining", label: "Remaining", value: (r) => r.remaining, align: "right" },
];

export function DataSection() {
  const [selected, setSelected] = useState<string[]>(["a3"]);
  const [sort, setSort] = useState<{ key: string; direction: SortDirection }>({ key: "name", direction: "ascending" });
  const [expanded, setExpanded] = useState<string[]>(["h1"]);

  const sortedRows = [...ACCOUNT_ROWS].sort((a, b) => {
    const col = ACCOUNT_COLUMNS.find((c) => c.key === sort.key);
    const cmp = col ? col.value(a).localeCompare(col.value(b)) : 0;
    return sort.direction === "ascending" ? cmp : -cmp;
  });

  return (
    <section className="slds-m-bottom_x-large" data-visual-id="data">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Data table · tree grid</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Data table — advanced: selection, sorting, header menus, row actions" visualId="datatable" full>
          <DataTable
            label="Accounts New This Week"
            columns={ACCOUNT_COLUMNS}
            rows={sortedRows}
            selection={{ selectedIds: selected, onChange: setSelected }}
            sort={sort}
            onSort={(key) => setSort((s) => ({ key, direction: s.key === key && s.direction === "ascending" ? "descending" : "ascending" }))}
            columnMenus
            rowActions={ROW_ACTIONS}
          />
        </ShowcaseExample>
        <ShowcaseExample title="Data table — advanced: icon + link cells, wrapped text, no selection" visualId="datatable-reports" full>
          <DataTable label="Reports" columns={REPORT_COLUMNS} rows={REPORT_ROWS} rowActions={ROW_ACTIONS} />
        </ShowcaseExample>
        <ShowcaseExample title="Data table — base (accumulator balances)" visualId="datatable-base" wide>
          <DataTable variant="base" label="Accumulator Balances" columns={BALANCE_COLUMNS} rows={BALANCE_ROWS} />
        </ShowcaseExample>
        <ShowcaseExample title="Data table — compact (search results: equal columns, single-line rows)" wide>
          <DataTable variant="compact" label="Search Results" columns={BALANCE_COLUMNS} rows={BALANCE_ROWS} />
        </ShowcaseExample>
        <ShowcaseExample title="Tree grid — caps header, badge, expanded parent" visualId="treegrid" full>
          <TreeGrid
            label="Account Hierarchy"
            capsHeader
            columns={[
              { key: "name", label: "Account Name", link: true },
              { key: "site", label: "Account Site" },
              { key: "state", label: "Mailing State/Province" },
              { key: "phone", label: "Phone" },
              { key: "type", label: "Type" },
              { key: "alias", label: "Account Owner Alias" },
            ]}
            rows={[
              {
                id: "h1",
                cells: { name: "Blalock Development Co", site: "", state: "TN", phone: "(865) 555-0100", type: "Group", alias: "eelle" },
                badge: <Badge variant="inverse">current</Badge>,
                children: [{ id: "h2", cells: { name: "Blalock Retirees", site: "", state: "TN", phone: "", type: "Group", alias: "eelle" } }],
              },
              { id: "h3", cells: { name: "Blalock Holdings", site: "", state: "GA", phone: "", type: "Group", alias: "fyue" } },
            ]}
            expandedIds={expanded}
            onToggle={(id, open) => setExpanded((e) => (open ? [...e, id] : e.filter((x) => x !== id)))}
          />
        </ShowcaseExample>
      </div>
    </section>
  );
}
