import { useState } from "react";
import { Input } from "../components/forms/Input";
import { AppNav } from "../components/shell/AppNav";
import { ConsoleShell } from "../components/shell/ConsoleShell";
import { GlobalHeader } from "../components/shell/GlobalHeader";
import { SplitView, type SplitViewItem } from "../components/shell/SplitView";
import { UtilityBar, type UtilityBarItem } from "../components/shell/UtilityBar";
import { WorkspaceSubTabs } from "../components/shell/WorkspaceSubTabs";
import { WorkspaceTabs, type WorkspaceTab } from "../components/shell/WorkspaceTabs";
import { HighlightsPanel } from "../components/layout/HighlightsPanel";
import { OVERFLOW_ITEMS } from "./ButtonsSection";
import { LIST_CONTROLS, LIST_VIEWS, USER_AVATAR } from "./patternData";
import { ShowcaseExample } from "./ShowcaseExample";

const SEARCH = <Input label="Search" hideLabel iconLeft="utility:search" placeholder="Search..." />;

export const PLAN_YEAR_TABS: WorkspaceTab[] = [
  { id: "t1", label: "2025 | Plan Year", iconName: "custom:custom66" },
  { id: "t2", label: "2026 Double Platinum | Plan Year", iconName: "custom:custom66" },
  { id: "t3", label: "2026 Meridian | Plan Year", iconName: "custom:custom66" },
  { id: "t4", label: "New Account: Group", iconName: "standard:account", menuItems: [], unsaved: true },
];

export const PLAN_YEAR_ITEMS: SplitViewItem[] = [
  { id: "p1", title: "2025" },
  { id: "p2", title: "2026 Double Platinum" },
  { id: "p3", title: "2026 Meridian" },
  { id: "p4", title: "2026 Ultimate Health Diamond Plus" },
  { id: "p5", title: "2027" },
];

const PORTAL_ITEMS: SplitViewItem[] = [
  { id: "i1", title: "Login Notice Test Name", titleRight: "Test Login Notice Title", rows: [{ left: "Test Login Notice Msg" }] },
  { id: "i2", title: "Portal Info Name 1", titleRight: "Portal Info Name 1", rows: [{ left: "Portal Info Message 1 Portal Info Message 1" }, { right: "Info" }] },
  { id: "i3", title: "Portal Info Name 1", rows: [{ left: "Portal Infor message", right: "Success" }], unread: true },
];

const UTILITY_ITEMS: UtilityBarItem[] = [{ id: "omni", label: "Omni-Channel", iconName: "utility:omni_channel" }];
const UTILITY_ITEMS_FULL: UtilityBarItem[] = [
  { id: "omni", label: "Omni-Channel", status: "Online", iconName: "utility:omni_channel", notification: true },
  { id: "notes", label: "Notes", iconName: "utility:edit" },
];

export function ShellSection() {
  const [fav, setFav] = useState(false);
  const [activeTab, setActiveTab] = useState("t3");
  const [subTab, setSubTab] = useState("s2");
  const [splitOpen, setSplitOpen] = useState(true);
  const [current, setCurrent] = useState("p3");
  const [selected, setSelected] = useState<string[]>(["p1", "p2"]);
  const [search, setSearch] = useState("");
  const [utility, setUtility] = useState<string | undefined>(undefined);

  return (
    <section className="slds-m-bottom_x-large" data-visual-id="shell">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Console shell</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Global header — environment row, favourites, notifications (inline)" visualId="global-header" full>
          <GlobalHeader
            position="inline"
            environment={{ label: "Sandbox (CXDev)", onOpenMenu: () => undefined }}
            search={SEARCH}
            favorites={{ selected: fav, onToggle: () => setFav((f) => !f) }}
            onGlobalActions={() => undefined}
            onHelp={() => undefined}
            onSetup={() => undefined}
            notificationCount={0}
            avatar={USER_AVATAR}
            userName="Feng Yue"
          />
        </ShowcaseExample>
        <ShowcaseExample title="Global header — favourites disabled, 3 notifications" visualId="global-header-states" full>
          <GlobalHeader
            position="inline"
            search={SEARCH}
            favorites={{ disabled: true }}
            onGlobalActions={() => undefined}
            onHelp={() => undefined}
            onSetup={() => undefined}
            notificationCount={3}
            avatar={{ kind: "initials", initials: "FY", title: "Feng Yue", iconName: "standard:user" }}
            userName="Feng Yue"
          />
        </ShowcaseExample>
        <ShowcaseExample title="App nav — object item active (no workspace tabs)" visualId="app-nav" full>
          <AppNav
            appName="ArmadaCare Admin Portal"
            objectItem={{ id: "accounts", label: "Accounts", active: true, menuItems: LIST_VIEWS }}
            tabs={null}
          />
        </ShowcaseExample>
        <ShowcaseExample title="App nav + workspace tabs — active, unsaved, tab without ▼" visualId="workspace-tabs" full>
          <AppNav
            appName="ArmadaCare Admin Portal"
            objectItem={{ id: "plan-years", label: "Plan Years", menuItems: LIST_VIEWS }}
            tabs={<WorkspaceTabs tabs={PLAN_YEAR_TABS} activeId={activeTab} onSelect={setActiveTab} onClose={() => undefined} />}
          />
        </ShowcaseExample>
        <ShowcaseExample title="App nav — standard navigation items" visualId="app-nav-items" full>
          <AppNav
            appName="ArmadaCare Admin Portal"
            items={[
              { id: "home", label: "Home", active: true },
              { id: "accounts", label: "Accounts", menuItems: LIST_VIEWS },
              { id: "contacts", label: "Contacts" },
              { id: "reports", label: "Reports" },
            ]}
          />
        </ShowcaseExample>
        <ShowcaseExample title="Workspace sub-tabs" visualId="sub-tabs" full>
          <WorkspaceSubTabs
            tabs={[
              { id: "s1", label: "Blalock Development Co", iconName: "standard:account" },
              { id: "s2", label: "Account Hierarchy", iconName: "standard:account", hasMenu: true },
            ]}
            activeId={subTab}
            onSelect={setSubTab}
          >
            <p className="slds-p-around_small">Sub-tab content</p>
          </WorkspaceSubTabs>
        </ShowcaseExample>
        <ShowcaseExample title="Split view — selection, search, sort, current item" visualId="split-view">
          <div className="slds-grid" style={{ height: "32rem" }}>
            <SplitView
              open={splitOpen}
              onToggle={setSplitOpen}
              iconName="custom:custom66"
              objectLabel="Plan Years"
              listViewName="All"
              listViews={LIST_VIEWS}
              pinned={false}
              onPin={() => undefined}
              controls={LIST_CONTROLS}
              meta="27 items • Updated a few seconds ago"
              onRefresh={() => undefined}
              search={{ value: search, onChange: setSearch }}
              sort={{ label: "Plan Year Name", direction: "ascending" }}
              listInfo="Sorted by Plan Year Name."
              items={PLAN_YEAR_ITEMS}
              currentId={current}
              onOpen={setCurrent}
              selection={{ selectedIds: selected, onChange: setSelected }}
            />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Split view — 3-line items, unread, no selection" visualId="split-view-lines">
          <div className="slds-grid" style={{ height: "32rem" }}>
            <SplitView
              open
              onToggle={() => undefined}
              iconName="custom:custom68"
              objectLabel="Portal Informations"
              listViewName="All"
              meta="4 items • Updated a few seconds ago"
              onRefresh={() => undefined}
              sort={{ label: "Portal Information Name", direction: "descending" }}
              items={PORTAL_ITEMS}
              onOpen={() => undefined}
            />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Split view — collapsed" visualId="split-view-closed">
          <div className="slds-grid" style={{ height: "8rem" }}>
            <SplitView
              open={false}
              onToggle={() => undefined}
              iconName="custom:custom66"
              objectLabel="Plan Years"
              listViewName="All"
              meta=""
              items={[]}
              onOpen={() => undefined}
            />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Utility bar — idle / active + notification + status line" visualId="utility-bar" full>
          <UtilityBar position="inline" items={UTILITY_ITEMS} onSelect={() => undefined} />
          <div className="slds-m-top_small">
            <UtilityBar position="inline" items={UTILITY_ITEMS_FULL} activeId={utility ?? "notes"} onSelect={(id) => setUtility(id)} />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Console shell — everything together (40rem high box)" visualId="console-shell" full>
          <div style={{ height: "40rem" }} className="slds-border_top slds-border_bottom">
            <ConsoleShell
              globalHeader={
                <GlobalHeader
                  position="inline"
                  search={SEARCH}
                  favorites={{}}
                  onGlobalActions={() => undefined}
                  onHelp={() => undefined}
                  onSetup={() => undefined}
                  avatar={USER_AVATAR}
                  userName="Feng Yue"
                />
              }
              appNav={
                <AppNav
                  appName="ArmadaCare Admin Portal"
                  objectItem={{ id: "plan-years", label: "Plan Years", menuItems: LIST_VIEWS }}
                  tabs={<WorkspaceTabs tabs={PLAN_YEAR_TABS.slice(0, 3)} activeId={activeTab} onSelect={setActiveTab} onClose={() => undefined} />}
                />
              }
              splitView={
                <SplitView
                  open={splitOpen}
                  onToggle={setSplitOpen}
                  iconName="custom:custom66"
                  objectLabel="Plan Years"
                  listViewName="All"
                  listViews={LIST_VIEWS}
                  onPin={() => undefined}
                  controls={LIST_CONTROLS}
                  meta="27 items • Updated a few seconds ago"
                  onRefresh={() => undefined}
                  search={{ value: search, onChange: setSearch }}
                  sort={{ label: "Plan Year Name", direction: "ascending" }}
                  listInfo="Sorted by Plan Year Name."
                  items={PLAN_YEAR_ITEMS}
                  currentId={current}
                  onOpen={setCurrent}
                  selection={{ selectedIds: [], onChange: () => undefined }}
                />
              }
              utilityBar={<UtilityBar position="inline" items={UTILITY_ITEMS} onSelect={() => undefined} />}
            >
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
            </ConsoleShell>
          </div>
        </ShowcaseExample>
      </div>
    </section>
  );
}
