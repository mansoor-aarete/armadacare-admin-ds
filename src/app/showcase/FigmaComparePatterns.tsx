import type { ReactNode } from "react";
import { Button } from "../components/buttons/Button";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { ButtonMenu } from "../components/buttons/ButtonMenu";
import { MetricTile } from "../components/cards/MetricTile";
import { RelatedListCard } from "../components/cards/RelatedListCard";
import { DataTable, type DataTableColumn } from "../components/data/DataTable";
import { TreeGrid } from "../components/data/TreeGrid";
import { Badge } from "../components/feedback/Badge";
import { Input } from "../components/forms/Input";
import { HighlightsPanel } from "../components/layout/HighlightsPanel";
import { ListViewToolbar } from "../components/layout/ListViewToolbar";
import { PageHeader } from "../components/layout/PageHeader";
import { Tabs } from "../components/layout/Tabs";
import { VerticalNav } from "../components/navigation/VerticalNav";
import { RecordField } from "../components/record/RecordField";
import { RecordFieldGrid } from "../components/record/RecordFieldGrid";
import { AppNav } from "../components/shell/AppNav";
import { GlobalHeader } from "../components/shell/GlobalHeader";
import { SplitView, type SplitViewItem } from "../components/shell/SplitView";
import { UtilityBar } from "../components/shell/UtilityBar";
import { EinsteinCard } from "../components/cards/EinsteinCard";
import { Pagination } from "../components/data/Pagination";
import { FileSelector } from "../components/forms/FileSelector";
import { RadioGroup } from "../components/forms/RadioGroup";
import { Toggle } from "../components/forms/Toggle";
import { DockedComposer } from "../components/overlays/DockedComposer";
import { COMPOSER_FOOTER, NoteComposerBody, RECORD_TYPES } from "./Phase4Section";
import { OVERFLOW_ITEMS } from "./ButtonsSection";
import { DISPLAY_AS, LIST_CONTROLS, LIST_VIEWS, ROW_ACTIONS, USER_AVATAR } from "./patternData";

/** Showcase harness: Phase 3 patterns rebuilt at the Figma node width (rem) for tools/visual diffs. */
function Frame({ id, figmaNode, rem, children }: { id: string; figmaNode: string; rem: number; children: ReactNode }) {
  return (
    <div className="slds-m-bottom_large">
      <p className="slds-text-body_small slds-text-color_weak">
        {id} · Figma node {figmaNode}
      </p>
      <div data-visual-id={id} style={{ width: `${rem}rem` }}>
        {children}
      </div>
    </div>
  );
}

type MemberRow = { id: string; number: string; member: string; subscriber: string; status: string };
const MEMBER_COLUMNS: DataTableColumn<MemberRow>[] = [
  { key: "number", label: "Plan Year Enrollment Member Name", value: (r) => r.number, link: () => true },
  { key: "member", label: "Member", value: (r) => r.member, link: () => true },
  { key: "subscriber", label: "Subscriber", value: (r) => r.subscriber, link: () => true },
  { key: "status", label: "Status", value: (r) => r.status },
];
const MEMBER_ROWS: MemberRow[] = [
  { id: "m4", number: "PYEM-0000004", member: "Sofia Martinez", subscriber: "Sofia Martinez", status: "Active" },
  { id: "m5", number: "PYEM-0000005", member: "Carlos Martinez", subscriber: "Sofia Martinez", status: "Active" },
];

const SPLIT_ITEMS: SplitViewItem[] = [
  "2025",
  "2026 Double Platinum",
  "2026 Meridian",
  "2026 Ultimate Health Diamond Plus",
  "2027",
  "a18Ec00000BbICX",
  "a18Ec00000BbICX ",
  "a18Ec00000BbICX  ",
  "a18Ec00000BbICX   ",
  "a18Ec00000BbICX test",
].map((t, i) => ({ id: `s${i}`, title: t.trim() }));

const VARSHA = { kind: "image" as const, src: USER_AVATAR.kind === "image" ? USER_AVATAR.src : "", alt: "Varsha Salunke" };

export function FigmaComparePatterns() {
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="figma-compare-patterns">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Figma comparison set — patterns</h2>
      <Frame id="fig-p3-global-header" figmaNode="A1 row 2 (2:41037)" rem={120}>
        <GlobalHeader
          position="inline"
          search={<Input label="Search" hideLabel iconLeft="utility:search" placeholder="Search..." />}
          favorites={{}}
          onGlobalActions={() => undefined}
          onHelp={() => undefined}
          onSetup={() => undefined}
          avatar={USER_AVATAR}
          userName="Feng Yue"
        />
      </Frame>
      <Frame id="fig-p3-app-nav" figmaNode="A1 context bar (2:41037)" rem={28.75}>
        <AppNav appName="ArmadaCare Admin Portal" objectItem={{ id: "accounts", label: "Accounts", active: true, menuItems: LIST_VIEWS }} tabs={null} />
      </Frame>
      <Frame id="fig-p3-object-home" figmaNode="2:41046" rem={119.875}>
        <PageHeader
          variant="object-home"
          iconName="standard:account"
          objectLabel="Accounts"
          title="Accounts New This Week"
          listViews={LIST_VIEWS}
          pin={{ pinned: false, onToggle: () => undefined }}
          actions={[
            <ButtonGroup key="g" kind="list" label="List view actions">
              <Button label="New" />
              <Button label="Discover Companies" />
              <Button label="Import" />
              <Button label="Printable View" />
              <Button label="Add to an Actionable List" />
              <ButtonMenu assistiveText="Show more actions" items={OVERFLOW_ITEMS} position="right" size="x-small" actions />
            </ButtonGroup>,
          ]}
          meta="22 items • Sorted by Account Name • Updated 2 minutes ago"
          controls={
            <ListViewToolbar
              search={{ value: "", onChange: () => undefined }}
              settingsItems={LIST_CONTROLS}
              displayItems={DISPLAY_AS}
              onRefresh={() => undefined}
              onSort={() => undefined}
              onEdit={() => undefined}
              charts={{ pressed: false, onToggle: () => undefined }}
              filters={{ pressed: false, onToggle: () => undefined }}
            />
          }
        />
      </Frame>
      <Frame id="fig-p3-highlights" figmaNode="2:36552" rem={93.5}>
        <HighlightsPanel
          iconName="custom:custom66"
          objectLabel="Plan Year"
          title="2026 Meridian"
          actions={[
            { value: "edit", label: "Edit" },
            { value: "delete", label: "Delete" },
            { value: "clone", label: "Clone" },
          ]}
          overflowActions={OVERFLOW_ITEMS}
        />
      </Frame>
      <Frame id="fig-p3-split-view" figmaNode="PY1 split view (2:36529)" rem={23.625}>
        <div className="slds-grid" style={{ height: "32.5rem" }}>
          <SplitView
            open
            onToggle={() => undefined}
            iconName="custom:custom66"
            objectLabel="Plan Years"
            listViewName="All"
            listViews={LIST_VIEWS}
            onPin={() => undefined}
            controls={LIST_CONTROLS}
            meta="27 items • Updated a few seconds ago"
            onRefresh={() => undefined}
            search={{ value: "", onChange: () => undefined }}
            sort={{ label: "Plan Year Name", direction: "ascending" }}
            listInfo="Sorted by Plan Year Name."
            items={SPLIT_ITEMS}
            onOpen={() => undefined}
            selection={{ selectedIds: [], onChange: () => undefined }}
          />
        </div>
      </Frame>
      <Frame id="fig-p3-record-tabs" figmaNode="2:40479" rem={61}>
        <Tabs
          size="medium"
          activeId="details"
          onSelect={() => undefined}
          items={[
            { id: "related", label: "Related", content: null },
            {
              id: "details",
              label: "Details",
              content: (
                <>
                  <RecordFieldGrid
                    fields={[
                      <RecordField key="n" label="Plan Year Enrollment Number" value={{ type: "text", text: "PYE-0000114" }} />,
                      <RecordField
                        key="o"
                        label="Owner"
                        value={{ type: "lookup", text: "Varsha Salunke", avatar: VARSHA }}
                        action={{ iconName: "utility:change_owner", assistiveText: "Change Owner", onClick: () => undefined }}
                      />,
                      <RecordField key="e" label="Effective Date" value={{ type: "text", text: "1/1/2026" }} onEdit={() => undefined} />,
                      null,
                      <RecordField key="t" label="Plan Year Tier" value={{ type: "link", text: "a7LEc00000TIcXe" }} onEdit={() => undefined} />,
                      null,
                      <RecordField key="p" label="Plan Year" value={{ type: "link", text: "test vs" }} onEdit={() => undefined} />,
                      null,
                      <RecordField key="s" label="Status" value={{ type: "text", text: "Terminated" }} onEdit={() => undefined} />,
                      null,
                      <RecordField key="sb" label="Subscriber" value={{ type: "link", text: "vsfirst1 vslast1" }} onEdit={() => undefined} />,
                      null,
                      <RecordField key="c" label="Created By" value={{ type: "lookup", text: "Varsha Salunke", avatar: VARSHA, timestamp: "8/27/2026 3:51 AM" }} />,
                      <RecordField key="m" label="Last Modified By" value={{ type: "lookup", text: "Varsha Salunke", avatar: VARSHA, timestamp: "10/19/2026 4:54 AM" }} />,
                    ]}
                  />
                  <RelatedListCard
                    iconName="custom:custom66"
                    title="Plan Year Enrollment Members"
                    count={0}
                    buttons={[
                      { value: "owner", label: "Change Owner" },
                      { value: "new", label: "New" },
                    ]}
                  />
                </>
              ),
            },
          ]}
        />
      </Frame>
      <Frame id="fig-p3-related-empty" figmaNode="2:40643" rem={61}>
        <RelatedListCard
          iconName="custom:custom66"
          title="Plan Year Enrollment Members"
          count={0}
          buttons={[
            { value: "owner", label: "Change Owner" },
            { value: "new", label: "New" },
          ]}
        />
      </Frame>
      <Frame id="fig-p3-related-table" figmaNode="2:39869" rem={61}>
        <RelatedListCard
          iconName="custom:custom66"
          title="Plan Year Enrollment Members"
          count={2}
          meta="2 items • Updated a few seconds ago"
          settingsItems={LIST_CONTROLS}
          onRefresh={() => undefined}
          buttons={[
            { value: "owner", label: "Change Owner" },
            { value: "new", label: "New" },
          ]}
          onViewAll={() => undefined}
        >
          <DataTable label="Plan Year Enrollment Members" columns={MEMBER_COLUMNS} rows={MEMBER_ROWS} selection={{ selectedIds: [], onChange: () => undefined }} rowActions={ROW_ACTIONS} />
        </RelatedListCard>
      </Frame>
      <Frame id="fig-p3-treegrid" figmaNode="2:55108" rem={93.4375}>
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
          rows={[{ id: "h1", cells: { name: "Blalock Development Co", site: "", state: "", phone: "(8", type: "C", alias: "" }, badge: <Badge variant="inverse">current</Badge> }]}
          expandedIds={[]}
          onToggle={() => undefined}
        />
      </Frame>
      <Frame id="fig-p3-kpi" figmaNode="2:5555" rem={115.875}>
        <div className="slds-grid">
          {["Total Accounts", "With Opportunities", "No Recent Activity", "With Upcoming Activity"].map((m, i) => (
            <div key={m} className="slds-m-right_large">
              <MetricTile label={m} value={0} selected={i === 0} onSelect={() => undefined} />
            </div>
          ))}
        </div>
      </Frame>
      <Frame id="fig-p3-vertical-nav" figmaNode="2:31136" rem={9.125}>
        <VerticalNav
          label="Reports"
          activeId="none"
          onSelect={() => undefined}
          sections={[
            {
              id: "reports",
              title: "Reports",
              items: [
                { id: "recent", label: "Recent" },
                { id: "created", label: "Created by Me" },
                { id: "private", label: "Private Reports" },
                { id: "public", label: "Public Reports" },
                { id: "all", label: "All Reports" },
              ],
            },
          ]}
        />
      </Frame>
      <Frame id="fig-p4-toggle" figmaNode="CL3 Place on Hold (2:21621 + 2:21623)" rem={7.5}>
        <Toggle label="Place on Hold" capsLabel layout="stacked" onLabel="Yes" offLabel="No" checked={false} disabled onChange={() => undefined} />
      </Frame>
      <Frame id="fig-p4-radio" figmaNode="A7 record types (2:54505)" rem={39.375}>
        <RadioGroup legend="Select a record type" hideLegend options={RECORD_TYPES.slice(0, 4)} value="group" onChange={() => undefined} />
      </Frame>
      <Frame id="fig-p4-file-area" figmaNode="2:21650" rem={90.4375}>
        <FileSelector variant="area" onFiles={() => undefined} dropLabel="Or drop files" />
      </Frame>
      <Frame id="fig-p4-pagination" figmaNode="P5 pager (2:2423)" rem={120}>
        <Pagination page={1} pageCount={2} onPageChange={() => undefined} pageSize={10} onPageSizeChange={() => undefined} />
      </Frame>
      <Frame id="fig-p4-composer" figmaNode="2:13515" rem={35}>
        <DockedComposer position="inline" title="No new note" iconName="standard:note" footer={COMPOSER_FOOTER}>
          <NoteComposerBody />
        </DockedComposer>
      </Frame>
      <Frame id="fig-p4-einstein" figmaNode="2:47546" rem={30.125}>
        <EinsteinCard centered>Einstein doesn't have any recommendations for you right now.</EinsteinCard>
      </Frame>
      <Frame id="fig-p3-utility-bar" figmaNode="A1 utility bar (2:42133)" rem={18.75}>
        <UtilityBar position="inline" items={[{ id: "omni", label: "Omni-Channel", iconName: "utility:omni_channel" }]} onSelect={() => undefined} />
      </Frame>
    </section>
  );
}
