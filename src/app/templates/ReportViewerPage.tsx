import { getRecord, recordName } from "../../services/records";
import { EmptyState } from "../components/feedback/EmptyState";
import { useServiceData } from "../console/useServiceData";

export type ReportViewerPageProps = { apiName: string; id: string };

/** Report tab (Figma R2, R5, R6, R8): the report runs in an iframe in Salesforce and was not captured — a grey region fills the tab. */
export function ReportViewerPage({ apiName, id }: ReportViewerPageProps) {
  const { data: record } = useServiceData(() => getRecord(apiName, id), [apiName, id]);
  if (record === undefined) return null;
  if (record === null) return <EmptyState variant="text" message="This report was deleted or you don't have access to it." />;
  return <EmptyState variant="region" regionSize="fill" regionLabel={recordName(apiName, record)} />;
}
