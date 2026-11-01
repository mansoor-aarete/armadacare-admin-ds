/** Salesforce-style console URLs and their parsed form. */

export type ConsoleRoute =
  | { kind: "list"; apiName: string; listViewId?: string }
  | { kind: "intelligence"; apiName: string }
  | { kind: "record"; apiName: string; id: string; tab?: string; action?: string }
  | { kind: "hierarchy"; apiName: string; id: string }
  | { kind: "new"; apiName: string; recordType?: string }
  | { kind: "unknown" };

export const listUrl = (apiName: string, listViewId?: string) => `/lightning/o/${apiName}/list${listViewId ? `?filterName=${encodeURIComponent(listViewId)}` : ""}`;
export const intelligenceUrl = (apiName: string) => `/lightning/o/${apiName}/intelligence`;
export const recordUrl = (apiName: string, id: string) => `/lightning/r/${apiName}/${id}/view`;
export const hierarchyUrl = (apiName: string, id: string) => `/lightning/r/${apiName}/${id}/hierarchy`;
export const newUrl = (apiName: string, recordType?: string) =>
  `/lightning/o/${apiName}/new${recordType ? `?recordType=${encodeURIComponent(recordType)}` : ""}`;

export function parseRoute(pathname: string, search: string): ConsoleRoute {
  const q = new URLSearchParams(search);
  const parts = pathname.split("/").filter(Boolean).map(decodeURIComponent);
  if (parts[0] !== "lightning") return { kind: "unknown" };
  const [, type, apiName, a, b] = parts;
  if (type === "o" && apiName) {
    if (a === "list" || a === "home" || a === undefined) return { kind: "list", apiName, listViewId: q.get("filterName") ?? undefined };
    if (a === "intelligence") return { kind: "intelligence", apiName };
    if (a === "new") return { kind: "new", apiName, recordType: q.get("recordType") ?? undefined };
  }
  if (type === "r" && apiName && a) {
    if (b === "hierarchy") return { kind: "hierarchy", apiName, id: a };
    return { kind: "record", apiName, id: a, tab: q.get("tab") ?? undefined, action: q.get("action") ?? undefined };
  }
  return { kind: "unknown" };
}

/** Parses a full console URL ("/lightning/…?a=b"). */
export function routeOf(url: string): ConsoleRoute {
  const [pathname, search = ""] = url.split("?");
  return parseRoute(pathname, search ? `?${search}` : "");
}

/** Workspace tab a route belongs to (null = object home / page, no tab). */
export function tabKeyOf(route: ConsoleRoute): string | null {
  if (route.kind === "record" || route.kind === "hierarchy") return `${route.apiName}:${route.id}`;
  if (route.kind === "new") return `new:${route.apiName}`;
  return null;
}

/** Sub-tab inside the workspace tab ("main" = the record itself). */
export function subTabKeyOf(route: ConsoleRoute): string {
  return route.kind === "hierarchy" ? "hierarchy" : "main";
}
