import { useEffect, useState } from "react";
import type { ActionConfig, FieldValue } from "../../config/types";
import { getObjectConfig, OBJECTS } from "../../objects";
import { getRecord, recordName, updateRecord } from "../../services/records";
import { RelatedListQuickLinks } from "../components/cards/RelatedListQuickLinks";
import { EmptyState } from "../components/feedback/EmptyState";
import { FormFooter } from "../components/forms/FormFooter";
import { HighlightsPanel } from "../components/layout/HighlightsPanel";
import { Tabs } from "../components/layout/Tabs";
import { ErrorPopover } from "../components/overlays/ErrorPopover";
import { useConsole } from "../console/ConsoleContext";
import { hierarchyUrl, newUrl, recordUrl } from "../console/urls";
import { useServiceData } from "../console/useServiceData";
import { FieldSection } from "../widgets/FieldSection";
import { formatValue, hasValue } from "../widgets/fieldValues";
import { SidebarRegion } from "../widgets/SidebarRegion";
import { ActionModal } from "./ActionModal";

export type RecordPageProps = {
  apiName: string;
  id: string;
  tab?: string;
  /** Open quick action (ActionConfig id) — from the URL (?action=delete). */
  action?: string;
};

const hasRecordPage = (apiName: string) => Object.keys(OBJECTS[apiName]?.layouts ?? {}).length > 0;

/** Record home: highlights, quick links, tabbed field sections and sidebar — all from the object's layout config. */
export function RecordPage({ apiName, id, tab, action }: RecordPageProps) {
  const config = getObjectConfig(apiName);
  const con = useConsole();
  const { data: record } = useServiceData(() => getRecord(apiName, id), [apiName, id]);
  const [activeTab, setActiveTab] = useState<string | null>(tab ?? null);
  const [following, setFollowing] = useState(false);
  const [draft, setDraft] = useState<Record<string, FieldValue> | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [popover, setPopover] = useState(false);
  const [focusKey, setFocusKey] = useState<string | null>(null);

  useEffect(() => {
    if (focusKey) document.getElementById(focusKey)?.focus();
  }, [focusKey, draft]);

  if (record === undefined) return null;
  if (record === null) return <EmptyState variant="text" message="This record was deleted or you don't have access to it." />;

  const layoutId = config.recordTypes?.find((t) => t.value === record.recordType)?.layout ?? Object.keys(config.layouts)[0];
  const layout = config.layouts[layoutId];
  const actionOf = (actionId: string): ActionConfig | undefined => config.actions.find((a) => a.id === actionId);
  const values = draft ?? record.values;
  const url = recordUrl(apiName, id);

  const startEdit = (key?: string) => {
    setDraft({ ...record.values });
    setFocusKey(key ?? null);
  };
  const cancelEdit = () => {
    setDraft(null);
    setErrors({});
    setPopover(false);
  };
  const save = () => {
    if (!draft) return;
    const missing = Object.fromEntries(
      Object.entries(config.fields)
        .filter(([key, def]) => def.required && !def.readOnly && !hasValue(draft[key]))
        .map(([key]) => [key, "Complete this field."]),
    );
    setErrors(missing);
    setPopover(Object.keys(missing).length > 0);
    if (Object.keys(missing).length) return;
    updateRecord(apiName, id, draft).then(cancelEdit);
  };

  const runAction = (actionId: string) => {
    const a = actionOf(actionId);
    if (!a) return;
    if (a.kind === "delete" || a.kind === "form") con.navigate(`${url}?action=${a.id}`, { replace: true });
    else if (a.kind === "edit") startEdit();
    else if (a.kind === "hierarchy") con.navigate(hierarchyUrl(apiName, id));
    else if (a.kind === "new") con.navigate(newUrl(apiName));
  };
  const modalAction = action ? actionOf(action) : undefined;

  return (
    <>
      <div className="slds-m-bottom_small">
        <HighlightsPanel
          iconName={config.iconName}
          objectLabel={config.label}
          title={recordName(apiName, record)}
          follow={layout.highlights.follow ? { following, onToggle: setFollowing } : undefined}
          onHierarchy={layout.highlights.hierarchy ? () => runAction("hierarchy") : undefined}
          actions={layout.highlights.actions.map((a) => ({ value: a, label: actionOf(a)?.label ?? a }))}
          overflowActions={layout.highlights.overflow.map((a) => ({ value: a, label: actionOf(a)?.label ?? a }))}
          overflowLength={layout.highlights.overflowLength}
          onAction={runAction}
          details={layout.highlights.fields.map((key) => ({ label: config.fields[key].label, value: formatValue(config.fields[key], record.values[key]) }))}
        />
      </div>
      {layout.quickLinks ? (
        <div className="slds-m-bottom_small">
          <RelatedListQuickLinks
            links={layout.quickLinks.links.map((l) => ({ ...l, count: record.related?.[l.id] ?? 0 }))}
            totalCount={layout.quickLinks.totalCount}
            onSelect={() => setActiveTab("related")}
            onShowAll={() => setActiveTab("related")}
          />
        </div>
      ) : null}
      <div className="slds-grid">
        <div className="slds-col slds-size_2-of-3 slds-p-right_small">
          <Tabs
            card
            size="medium"
            activeId={activeTab ?? layout.defaultTab}
            onSelect={setActiveTab}
            items={layout.tabs.map((t) => ({
              id: t.id,
              label: t.label,
              content: t.sections.map((s) => (
                <FieldSection
                  key={s.id}
                  config={config}
                  section={s}
                  values={values}
                  mode={draft ? "edit" : "view"}
                  errors={errors}
                  onChange={(key, v) => setDraft((d) => ({ ...(d ?? record.values), [key]: v }))}
                  onEdit={startEdit}
                  onOpenLookup={(l) => (hasRecordPage(l.objectApiName) ? con.openRecord(l.objectApiName, l.id) : undefined)}
                />
              )),
            }))}
          />
        </div>
        <div className="slds-col slds-size_1-of-3">
          {layout.sidebar.map((r, i) => (
            <SidebarRegion key={i} region={r} record={record} />
          ))}
        </div>
      </div>
      {draft ? (
        <FormFooter
          hasErrors={Object.keys(errors).length > 0}
          onErrorClick={() => setPopover((p) => !p)}
          errorPopover={
            popover ? (
              <ErrorPopover
                fields={Object.keys(errors).map((key) => ({ label: config.fields[key].label, onClick: () => setFocusKey(key) }))}
                onClose={() => setPopover(false)}
              />
            ) : null
          }
          actions={[
            { value: "cancel", label: "Cancel" },
            { value: "save", label: "Save", variant: "brand" },
          ]}
          onAction={(v) => (v === "save" ? save() : cancelEdit())}
        />
      ) : null}
      {modalAction && (modalAction.kind === "delete" || modalAction.kind === "form") ? (
        <ActionModal
          apiName={apiName}
          record={record}
          action={modalAction}
          onClose={() => con.navigate(url, { replace: true })}
          onDeleted={() => con.closeTab()}
        />
      ) : null}
    </>
  );
}
