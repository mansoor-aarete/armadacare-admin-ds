import { useState } from "react";
import type { LookupValue, RecordData, SearchBlockConfig, SearchCheckboxGroupConfig, SearchFieldConfig, SearchTabConfig } from "../../config/types";
import { PAGES } from "../../objects";
import { runSearch, type SearchCriteria } from "../../services/search";
import { Button } from "../components/buttons/Button";
import { Card } from "../components/cards/Card";
import { DataTable, type DataTableColumn } from "../components/data/DataTable";
import { Pagination } from "../components/data/Pagination";
import { CheckboxGroup } from "../components/forms/CheckboxGroup";
import { Combobox } from "../components/forms/Combobox";
import { Datepicker } from "../components/forms/Datepicker";
import { Input } from "../components/forms/Input";
import { ExpandableSection } from "../components/layout/ExpandableSection";
import { Tabs } from "../components/layout/Tabs";
import { useConsole } from "../console/ConsoleContext";
import { pageUrl } from "../console/urls";
import { useServiceData } from "../console/useServiceData";

/*
 * Search page of a navigation item (Figma P1–P7): one tab per search, criteria blocks (field grids, checkbox groups,
 * "Advanced Search" blocks), Search / Clear, results table with optional pager. State lives in the URL
 * (?tab=, criteria, &advanced=1, &search=1) so every captured screen has its own link.
 */

const COLUMN_SIZE: Record<SearchBlockConfig["columns"], string> = {
  2: "slds-size_1-of-2",
  3: "slds-size_1-of-3",
  4: "slds-size_1-of-4",
};
const CONTROL_SIZE = {
  full: "",
  "3-of-4": "slds-size_3-of-4",
  "1-of-2": "slds-size_1-of-2",
} as const;

const blocksOf = (tab: SearchTabConfig, advanced: boolean) => [...tab.blocks, ...(advanced ? (tab.advanced?.blocks ?? []) : [])];
const fieldsOf = (blocks: SearchBlockConfig[]) => blocks.flatMap((b) => [...(b.fields ?? []), ...(b.fieldsAfter ?? [])]);
const groupsOf = (blocks: SearchBlockConfig[]) => blocks.flatMap((b) => b.checkboxGroups ?? []);

function defaults(tab: SearchTabConfig): SearchCriteria {
  const all = blocksOf(tab, true);
  return Object.fromEntries([...fieldsOf(all).map((f) => [f.id, f.defaultValue ?? ""]), ...groupsOf(all).map((g) => [g.id, g.defaultValue])]);
}

function criteriaFromUrl(tab: SearchTabConfig, params: URLSearchParams): SearchCriteria {
  const all = blocksOf(tab, true);
  const base = defaults(tab);
  for (const f of fieldsOf(all)) if (params.has(f.id)) base[f.id] = params.get(f.id) ?? "";
  for (const g of groupsOf(all)) if (params.has(g.id)) base[g.id] = params.getAll(g.id);
  return base;
}

/** URL of a tab state; only values that differ from the defaults are written. */
function urlOf(name: string, tab: SearchTabConfig, criteria: SearchCriteria, advanced: boolean, search: boolean): string {
  const q = new URLSearchParams({ tab: tab.id });
  const base = defaults(tab);
  for (const [k, v] of Object.entries(criteria)) {
    if (JSON.stringify(v) === JSON.stringify(base[k])) continue;
    if (Array.isArray(v)) v.forEach((x) => q.append(k, x));
    else q.set(k, v);
  }
  if (advanced) q.set("advanced", "1");
  if (search) q.set("search", "1");
  return `${pageUrl(name)}?${q.toString()}`;
}

/** Next checked options after a click, applying the group's "All" rule. */
function nextGroupValue(group: SearchCheckboxGroupConfig, prev: string[], next: string[]): string[] {
  const added = next.filter((v) => !prev.includes(v));
  const rest = next.filter((v) => v !== "All");
  if (group.allBehavior === "exclusive") return added.includes("All") || !rest.length ? ["All"] : rest;
  if (added.includes("All")) return [...group.options];
  if (prev.includes("All") && !next.includes("All")) return [];
  return rest.length === group.options.length - 1 ? [...group.options] : rest;
}

export function SearchPage({ name, url }: { name: string; url: string }) {
  const config = PAGES[name];
  const con = useConsole();
  const params = new URLSearchParams(url.split("?")[1] ?? "");
  const tab = config.tabs.find((t) => t.id === params.get("tab")) ?? config.tabs.find((t) => t.id === config.defaultTab) ?? config.tabs[0];
  const advanced = params.get("advanced") === "1" && Boolean(tab.advanced);
  const searched = params.get("search") === "1";

  const [drafts, setDrafts] = useState<Record<string, SearchCriteria>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paging, setPaging] = useState({
    page: 1,
    size: tab.results.pageSize ?? 0,
  });
  const criteria = drafts[tab.id] ?? criteriaFromUrl(tab, params);
  const blocks = blocksOf(tab, advanced);

  const { data: rows } = useServiceData(
    () => (searched ? runSearch(name, tab.id, criteriaFromUrl(tab, params)) : Promise.resolve(null)),
    [name, url],
  );

  const set = (id: string, value: string | string[]) => {
    setDrafts((d) => ({ ...d, [tab.id]: { ...criteria, [id]: value } }));
    setErrors((e) => ({ ...e, [id]: "" }));
  };
  const search = () => {
    const missing = fieldsOf(blocks).filter((f) => f.required && !criteria[f.id]);
    setErrors(Object.fromEntries(missing.map((f) => [f.id, "Complete this field."])));
    if (missing.length) return;
    setPaging((p) => ({ ...p, page: 1 }));
    con.navigate(urlOf(name, tab, criteria, advanced, true));
  };
  const clear = () => {
    setDrafts((d) => ({ ...d, [tab.id]: defaults(tab) }));
    setErrors({});
    con.navigate(urlOf(name, tab, defaults(tab), advanced, false));
  };

  const control = (f: SearchFieldConfig) => {
    const value = String(criteria[f.id] ?? "");
    if (f.type === "picklist") {
      const options = (f.noneOption === false ? [] : [{ value: "", label: "--None--" }]).concat(
        (f.options ?? []).map((o) => ({ value: o, label: o })),
      );
      return <Combobox label={f.label} options={options} value={value} onChange={(v) => set(f.id, v ?? "")} />;
    }
    if (f.type === "date") return <Datepicker label={f.label} value={value || null} onChange={(v) => set(f.id, v ?? "")} today={con.today} />;
    return (
      <Input
        label={f.label}
        type={f.type === "number" ? "number" : "text"}
        required={f.required}
        placeholder={f.placeholder}
        value={value}
        error={errors[f.id] || undefined}
        onChange={(v) => set(f.id, v)}
      />
    );
  };
  const fieldGrid = (block: SearchBlockConfig, fields: SearchFieldConfig[]) => (
    <div className="slds-grid slds-wrap slds-gutters_small slds-grow">
      {fields.map((f) => (
        <div key={f.id} className={`slds-col ${COLUMN_SIZE[block.columns]} slds-m-bottom_xx-small`}>
          <div className={CONTROL_SIZE[block.controlSize ?? "full"]}>{control(f)}</div>
        </div>
      ))}
    </div>
  );
  const buttons = (
    <div className={tab.buttons === "right" ? "slds-no-flex slds-p-top_large" : "slds-m-top_small"}>
      <Button variant="brand" label="Search" onClick={search} />
      <Button label="Clear" onClick={clear} />
    </div>
  );
  const blockBody = (block: SearchBlockConfig, first: boolean) => (
    <>
      {block.fields?.length ? (
        <div className="slds-grid">
          {fieldGrid(block, block.fields)}
          {first && tab.buttons === "right" ? buttons : null}
        </div>
      ) : null}
      {(block.checkboxGroups ?? []).map((g) => (
        <div key={g.id} className="slds-m-bottom_x-small">
          <CheckboxGroup
            legend={g.legend}
            layout="inline"
            // The section title already names a group that has the same label (Figma P6 Bucket).
            hideLegend={g.legend === block.title}
            options={g.options.map((o) => ({ value: o, label: o }))}
            value={(criteria[g.id] as string[] | undefined) ?? g.defaultValue}
            onChange={(v) => set(g.id, nextGroupValue(g, (criteria[g.id] as string[] | undefined) ?? g.defaultValue, v))}
          />
        </div>
      ))}
      {block.fieldsAfter?.length ? fieldGrid(block, block.fieldsAfter) : null}
    </>
  );
  const renderBlock = (block: SearchBlockConfig, index: number) =>
    block.titleStyle === "shaded" && block.title ? (
      <ExpandableSection key={block.id} collapsible={false} title={block.title}>
        <div className="slds-p-horizontal_small">{blockBody(block, index === 0)}</div>
      </ExpandableSection>
    ) : (
      <div key={block.id}>
        {block.title ? <h3 className="slds-text-title_bold slds-m-bottom_xx-small">{block.title}</h3> : null}
        {blockBody(block, index === 0)}
      </div>
    );

  const results = tab.results;
  const all = rows ?? [];
  const size = results.pageSize ? paging.size || results.pageSize : all.length || 1;
  const pageCount = Math.max(1, Math.ceil(all.length / size));
  const page = Math.min(paging.page, pageCount);
  const shown = results.pageSize ? all.slice((page - 1) * size, page * size) : all;
  const count = results.count.text.replace("{count}", String(all.length));
  const columns: DataTableColumn<RecordData>[] = results.columns.map((c) => ({
    key: c.field,
    label: c.label,
    value: (row) => String(row.values[c.field] ?? ""),
    link: c.link ? (row) => Boolean(row.values.record) : undefined,
    wrap: c.wrap,
  }));

  const resultsArea =
    !searched || !rows ? null : !rows.length ? (
      <p className="slds-text-body_regular slds-text-color_weak slds-m-top_small">{results.emptyText}</p>
    ) : (
      <div className="slds-m-top_medium">
        {results.headingStyle === "title" ? (
          <div className="slds-grid slds-grid_vertical-align-center slds-m-bottom_small">
            <h2 className="slds-text-title_bold slds-grow">{results.heading}</h2>
            {results.count.position === "heading" ? <p className="slds-text-body_small">{count}</p> : null}
          </div>
        ) : results.heading ? (
          <h2 className="slds-text-title_bold slds-m-bottom_x-small">{results.heading}</h2>
        ) : null}
        <DataTable<RecordData>
          label={results.heading ?? tab.heading}
          variant="compact"
          columns={columns}
          rows={shown}
          onLinkClick={(row) => {
            const record = row.values.record as LookupValue;
            con.openRecord(record.objectApiName, record.id);
          }}
        />
        {results.count.position === "below" ? <p className="slds-text-body_small slds-text-color_weak slds-m-top_x-small">{count}</p> : null}
        {results.pageSize ? (
          <Pagination
            label={`${results.heading ?? tab.heading} pages`}
            page={page}
            pageCount={pageCount}
            onPageChange={(p) => setPaging((s) => ({ ...s, page: p }))}
            pageSize={size}
            pageSizeOptions={results.pageSizeOptions}
            onPageSizeChange={(s) => setPaging({ page: 1, size: s })}
          />
        ) : null}
      </div>
    );

  const panel = (
    <Card title={tab.heading}>
      <div className="slds-p-horizontal_small">
        <Card boundary>
          <ExpandableSection
            collapsible={false}
            title={tab.criteriaTitle}
            actions={
              tab.advanced ? (
                <Button
                  variant="base"
                  label={advanced ? tab.advanced.hideLabel : tab.advanced.showLabel}
                  aria-expanded={advanced}
                  onClick={() => con.navigate(urlOf(name, tab, criteriaFromUrl(tab, params), !advanced, searched))}
                />
              ) : undefined
            }
          >
            <div className="slds-p-horizontal_small">
              {tab.blocks.map(renderBlock)}
              {advanced && tab.advanced ? (
                <>
                  <hr className="slds-m-vertical_small" />
                  {tab.advanced.blocks.map((b, i) => renderBlock(b, i + tab.blocks.length))}
                </>
              ) : null}
              {tab.buttons === "below" ? buttons : null}
            </div>
          </ExpandableSection>
        </Card>
        {resultsArea}
      </div>
    </Card>
  );

  return (
    <div className="slds-p-horizontal_small slds-p-top_x-small">
      <Tabs
        items={config.tabs.map((t) => ({
          id: t.id,
          label: t.label,
          content: t.id === tab.id ? panel : null,
        }))}
        activeId={tab.id}
        onSelect={(id) => {
          setErrors({});
          con.navigate(`${pageUrl(name)}?tab=${id}`);
        }}
      />
    </div>
  );
}
