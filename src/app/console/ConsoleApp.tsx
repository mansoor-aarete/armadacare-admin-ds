import profileAvatar from "@salesforce-ux/design-system/assets/images/profile_avatar_96.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getObjectConfig, NAV_OBJECTS, OBJECTS } from "../../objects";
import { createRecord, getCurrentUser, getRecord, listRecords, recordName } from "../../services/records";
import { applyScenarioRecords, getScenario } from "../../services/session";
import { toIso } from "../components/utils/dates";
import { RecordComposer } from "../widgets/RecordComposer";
import { Input } from "../components/forms/Input";
import { AppNav } from "../components/shell/AppNav";
import { ConsoleShell } from "../components/shell/ConsoleShell";
import { GlobalHeader } from "../components/shell/GlobalHeader";
import { UtilityBar } from "../components/shell/UtilityBar";
import { WorkspaceSubTabs } from "../components/shell/WorkspaceSubTabs";
import { WorkspaceTabs, type WorkspaceTab } from "../components/shell/WorkspaceTabs";
import { ConsoleContent } from "./ConsoleContent";
import { ConsoleContext, type ComposerRequest, type ConsoleApi } from "./ConsoleContext";
import { ConsoleSplitView } from "./ConsoleSplitView";
import { listUrl, parseRoute, recordUrl, routeOf, subTabKeyOf } from "./urls";
import { useServiceData } from "./useServiceData";
import { tabKeyFor, tabUrl, upsertTab, type WorkspaceTabState } from "./workspaceTabs";

const DEFAULT_OBJECT = NAV_OBJECTS[0];

/** The Lightning console: shell, workspace tabs (open / focus / close), sub-tabs, split view and routed content. */
export function ConsoleApp() {
  const location = useLocation();
  const routerNavigate = useNavigate();
  const route = parseRoute(location.pathname, location.search);
  const scenarioId = new URLSearchParams(location.search).get("scenario");
  const stateParam = new URLSearchParams(location.search).get("state");

  const [ready, setReady] = useState(!scenarioId);
  const [tabs, setTabs] = useState<WorkspaceTabState[]>([]);
  const [homeObject, setHomeObject] = useState(route.kind !== "unknown" ? route.apiName : DEFAULT_OBJECT);
  const [listViewId, setListViewId] = useState<string | undefined>(route.kind === "list" ? route.listViewId : undefined);
  const [selection, setSelection] = useState<string[]>([]);
  const [listUpdatedAt, setListUpdatedAt] = useState(() => Date.now());
  // ?state=error switches back-end-dependent regions to the state the Figma capture shows (sticky for the session).
  const [captured, setCaptured] = useState(stateParam === "error");
  const [today, setToday] = useState(() => toIso(new Date()));
  const [composer, setComposer] = useState<ComposerRequest | null>(null);

  useEffect(() => {
    if (stateParam === "error") setCaptured(true);
  }, [stateParam]);

  // ?scenario=A4 — open the workspace tabs and selection of a Figma screen, then show its URL.
  useEffect(() => {
    if (!scenarioId) return;
    getScenario(scenarioId).then(async (s) => {
      if (s) {
        if (s.records) await applyScenarioRecords(s.records);
        if (s.today) setToday(s.today);
        setComposer(s.composer ?? null);
        setTabs(s.tabs.reduce(upsertTab, [] as WorkspaceTabState[]));
        setSelection(s.splitSelection ?? []);
        setListUpdatedAt(Date.now() - (s.listUpdatedMinutesAgo ?? 0) * 60000);
        routerNavigate(s.url, { replace: true });
      }
      setReady(true);
    });
  }, [scenarioId]);

  // Every URL with a workspace tab opens / focuses that tab.
  const url = location.pathname + location.search;
  useEffect(() => {
    if (!ready) return;
    setTabs((t) => upsertTab(t, url));
    if (route.kind !== "unknown") setHomeObject(OBJECTS[route.apiName]?.navObject ?? route.apiName);
    if (route.kind === "list" && route.listViewId) setListViewId(route.listViewId);
  }, [url, ready]);

  const activeKey = tabKeyFor(route);
  const navigate = useCallback((to: string, options?: { replace?: boolean }) => routerNavigate(to, options), [routerNavigate]);
  const homeUrl = listUrl(homeObject, listViewId);

  const closeTab = useCallback(
    (key?: string) => {
      const target = key ?? activeKey;
      const index = tabs.findIndex((t) => t.key === target);
      const rest = tabs.filter((t) => t.key !== target);
      setTabs(rest);
      if (target === activeKey) {
        const next = rest[Math.min(Math.max(index - 1, 0), rest.length - 1)];
        routerNavigate(next ? tabUrl(next) : homeUrl);
      }
    },
    [tabs, activeKey, homeUrl, routerNavigate],
  );

  const api: ConsoleApi = useMemo(
    () => ({
      navigate,
      openRecord: (apiName, id) => routerNavigate(recordUrl(apiName, id)),
      closeTab,
      replaceTab: (to) => {
        setTabs((t) => t.filter((x) => x.key !== activeKey));
        routerNavigate(to);
      },
      listUpdatedAt,
      refreshList: () => setListUpdatedAt(Date.now()),
      captured,
      today,
      openComposer: setComposer,
    }),
    [navigate, closeTab, activeKey, listUpdatedAt, routerNavigate, captured, today],
  );

  // Tab labels need record names.
  const apis = Array.from(new Set(tabs.map((t) => t.apiName)));
  const { data: names } = useServiceData(
    () => Promise.all(apis.map((a) => listRecords(a).then((rows) => rows.map((r) => [r.id, recordName(a, r)] as const)))).then((l) => new Map(l.flat())),
    [apis.join(",")],
  );
  const { data: user } = useServiceData(() => getCurrentUser(), []);
  const { data: composerParent } = useServiceData(
    () => (composer ? getRecord(composer.apiName, composer.parentId) : Promise.resolve(null)),
    [composer?.apiName, composer?.parentId],
  );
  const composerAction = composer ? getObjectConfig(composer.apiName).actions.find((a) => a.id === composer.actionId) : undefined;

  if (!ready) return null;

  const labelOf = (t: WorkspaceTabState) => {
    const config = getObjectConfig(t.apiName);
    if (t.listViewId) return `${config.listViews.find((v) => v.id === t.listViewId)?.label ?? ""} | ${config.labelPlural}`;
    if (t.recordId) return config.tabLabel === "name" ? names?.get(t.recordId) ?? "" : `${names?.get(t.recordId) ?? ""} | ${config.label}`;
    const r = routeOf(tabUrl(t));
    return `New ${config.label}${r.kind === "new" && r.recordType ? `: ${r.recordType}` : ""}`;
  };
  const workspaceTabs: WorkspaceTab[] = tabs.map((t) => ({
    id: t.key,
    label: labelOf(t),
    iconName: getObjectConfig(t.apiName).iconName,
    menuItems: t.recordId || t.listViewId ? undefined : [],
  }));
  const activeTab = tabs.find((t) => t.key === activeKey);
  const homeConfig = getObjectConfig(homeObject);
  // Objects whose home is the split view alone (Figma CL1: Claims list, empty workspace).
  const splitHome = route.kind === "list" && homeConfig.home === "split";
  const content = <ConsoleContent route={route} url={url} />;
  const composerPanel =
    composer && composerParent && composerAction?.kind === "composer" ? (
        <RecordComposer
          key={`${composer.parentId}:${composer.actionId}`}
          action={composerAction}
          parentApiName={composer.apiName}
          parentName={recordName(composer.apiName, composerParent)}
          initialValues={composer.values}
          onClose={() => setComposer(null)}
          onOpenParent={() => api.openRecord(composer.apiName, composer.parentId)}
          onDone={(values) =>
            createRecord(composerAction.objectApiName, undefined, {
              ...values,
              [composerAction.parentField]: { id: composer.parentId, name: recordName(composer.apiName, composerParent), objectApiName: composer.apiName },
            }).then(() => setComposer(null))
          }
        />
      ) : undefined;

  return (
    <ConsoleContext.Provider value={api}>

      <ConsoleShell
        fill="viewport"
        workspacePadding={route.kind === "record" || route.kind === "hierarchy" || route.kind === "new" || (route.kind === "list" && Boolean(activeTab))}
        globalHeader={
          <GlobalHeader
            position="inline"
            environment={{ label: "Sandbox (CXDev)", onOpenMenu: () => undefined }}
            search={<Input label="Search" hideLabel iconLeft="utility:search" placeholder="Search..." />}
            favorites={{}}
            onGlobalActions={() => undefined}
            onHelp={() => undefined}
            onSetup={() => undefined}
            avatar={{ kind: "image", src: profileAvatar, alt: user?.name ?? "" }}
            userName={user?.name ?? ""}
          />
        }
        appNav={
          <AppNav
            appName="ArmadaCare Admin Portal"
            objectItem={{
              id: homeObject,
              label: homeConfig.labelPlural,
              active: !activeTab,
              menuItems: NAV_OBJECTS.map((a) => ({ value: a, label: getObjectConfig(a).labelPlural })),
            }}
            onSelect={() => navigate(homeUrl)}
            onMenuSelect={(_, value) => navigate(listUrl(value))}
            tabs={
              tabs.length ? (
                <WorkspaceTabs
                  tabs={workspaceTabs}
                  activeId={activeTab?.key}
                  onSelect={(key) => {
                    const t = tabs.find((x) => x.key === key);
                    if (t) navigate(tabUrl(t));
                  }}
                  onClose={closeTab}
                  onMenuSelect={(key, value) => (value === "close" ? closeTab(key) : value === "refresh" ? api.refreshList() : undefined)}
                />
              ) : null
            }
          />
        }
        splitView={
          (activeTab && getObjectConfig(activeTab.apiName).splitView) || splitHome ? (
            <ConsoleSplitView
              apiName={activeTab && getObjectConfig(activeTab.apiName).splitView ? activeTab.apiName : homeObject}
              listViewId={listViewId ?? homeConfig.defaultListView}
              onListViewChange={setListViewId}
              currentId={activeTab?.recordId}
              selection={selection}
              onSelectionChange={setSelection}
            />
          ) : undefined
        }
        utilityBar={
          <UtilityBar position="inline" items={[{ id: "omni", label: "Omni-Channel", iconName: "utility:omni_channel" }]} onSelect={() => undefined} panel={composerPanel} />
        }
      >
        {activeTab && activeTab.subTabs.length > 1 ? (
          <WorkspaceSubTabs
            tabs={activeTab.subTabs.map((s) => ({
              id: s.key,
              label: s.key === "main" ? labelOf(activeTab) : `${getObjectConfig(activeTab.apiName).label} Hierarchy`,
              iconName: getObjectConfig(activeTab.apiName).iconName,
              hasMenu: s.key === subTabKeyOf(route),
            }))}
            activeId={subTabKeyOf(route)}
            onSelect={(key) => {
              const s = activeTab.subTabs.find((x) => x.key === key);
              if (s) navigate(s.url);
            }}
            onClose={(key) => {
              const main = activeTab.subTabs.find((x) => x.key === "main");
              setTabs((all) => all.map((t) => (t.key === activeTab.key ? { ...t, subTabs: t.subTabs.filter((s) => s.key !== key), activeSub: "main" } : t)));
              if (main) navigate(main.url);
            }}
          >
            {content}
          </WorkspaceSubTabs>
        ) : (
          content
        )}
      </ConsoleShell>
    </ConsoleContext.Provider>
  );
}
