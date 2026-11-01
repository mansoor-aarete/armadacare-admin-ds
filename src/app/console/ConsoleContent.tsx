import { Navigate } from "react-router";
import { NAV_OBJECTS, OBJECTS } from "../../objects";
import { HierarchyPage } from "../templates/HierarchyPage";
import { IntelligenceViewPage } from "../templates/IntelligenceViewPage";
import { ObjectListPage } from "../templates/ObjectListPage";
import { RecordFormPage } from "../templates/RecordFormPage";
import { RecordPage } from "../templates/RecordPage";
import { RecordTypePicker } from "../templates/RecordTypePicker";
import { ReportsHomePage } from "../templates/ReportsHomePage";
import { ReportViewerPage } from "../templates/ReportViewerPage";
import { listUrl, type ConsoleRoute } from "./urls";

/** Picks the template for a console route. */
export function ConsoleContent({ route, url }: { route: ConsoleRoute; url: string }) {
  if (route.kind === "unknown" || !OBJECTS[route.apiName]) return <Navigate to={listUrl(NAV_OBJECTS[0])} replace />;
  switch (route.kind) {
    case "list":
      if (OBJECTS[route.apiName].home === "split") return null;
      if (OBJECTS[route.apiName].home === "reports") return <ReportsHomePage key={url} apiName={route.apiName} listViewId={route.listViewId} />;
      return <ObjectListPage key={url} apiName={route.apiName} listViewId={route.listViewId} />;
    case "intelligence":
      return <IntelligenceViewPage apiName={route.apiName} />;
    case "record":
      if (OBJECTS[route.apiName].recordTemplate === "reportViewer") return <ReportViewerPage key={route.id} apiName={route.apiName} id={route.id} />;
      if (OBJECTS[route.apiName].recordTemplate === "reportsFolder") {
        const home = OBJECTS[route.apiName].navObject ?? route.apiName;
        return <ReportsHomePage key={route.id} apiName={home} folder={{ apiName: route.apiName, id: route.id }} />;
      }
      return <RecordPage key={`${route.apiName}:${route.id}`} apiName={route.apiName} id={route.id} tab={route.tab} action={route.action} />;
    case "hierarchy":
      return <HierarchyPage apiName={route.apiName} id={route.id} />;
    case "new":
      return route.recordType || !OBJECTS[route.apiName].recordTypes?.length ? (
        <RecordFormPage key={`${route.apiName}:${route.recordType ?? ""}`} apiName={route.apiName} recordType={route.recordType} />
      ) : (
        <RecordTypePicker apiName={route.apiName} />
      );
  }
}
