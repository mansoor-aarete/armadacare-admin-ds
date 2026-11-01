import { OBJECTS } from "../../objects";
import { recordUrl, routeOf, subTabKeyOf, tabKeyOf, type ConsoleRoute } from "./urls";

/** Workspace tab of a route: record / new / hierarchy routes, and list views marked `openInTab` (All Folders | Reports). */
export function tabKeyFor(route: ConsoleRoute): string | null {
  if (route.kind === "list" && route.listViewId && OBJECTS[route.apiName]?.listViews.some((v) => v.id === route.listViewId && v.openInTab)) {
    return `list:${route.apiName}:${route.listViewId}`;
  }
  return tabKeyOf(route);
}

/** One open workspace tab: the record (or new-record) tab and its sub-tabs ("main", "hierarchy"). */
export type WorkspaceTabState = {
  key: string;
  apiName: string;
  recordId?: string;
  /** List-view tabs (All Folders | Reports). */
  listViewId?: string;
  subTabs: Array<{ key: string; url: string }>;
  /** Sub-tab shown when the tab is selected. */
  activeSub: string;
};

/** Opens or updates the tab for `url` (no-op for URLs without a tab). */
export function upsertTab(tabs: WorkspaceTabState[], url: string): WorkspaceTabState[] {
  const route = routeOf(url);
  const key = tabKeyFor(route);
  if (!key || route.kind === "intelligence" || route.kind === "unknown") return tabs;
  const subKey = subTabKeyOf(route);
  const recordId = route.kind === "record" || route.kind === "hierarchy" ? route.id : undefined;
  const existing = tabs.find((t) => t.key === key);
  const base: WorkspaceTabState = existing ?? {
    key,
    apiName: route.apiName,
    recordId,
    listViewId: route.kind === "list" ? route.listViewId : undefined,
    subTabs: route.kind === "hierarchy" ? [{ key: "main", url: recordUrl(route.apiName, route.id) }] : [],
    activeSub: subKey,
  };
  const subTabs = base.subTabs.some((s) => s.key === subKey)
    ? base.subTabs.map((s) => (s.key === subKey ? { ...s, url } : s))
    : [...base.subTabs, { key: subKey, url }];
  const next = { ...base, subTabs, activeSub: subKey };
  return existing ? tabs.map((t) => (t.key === key ? next : t)) : [...tabs, next];
}

/** URL shown when a tab is selected. */
export function tabUrl(tab: WorkspaceTabState): string {
  return tab.subTabs.find((s) => s.key === tab.activeSub)?.url ?? tab.subTabs[0]?.url ?? "/";
}
