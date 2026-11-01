import { useEffect, useState } from "react";
import type { ActionConfig, FieldValue, RegionConfig } from "../../config/types";
import { getObjectConfig, OBJECTS } from "../../objects";
import { getCurrentUser, getRecord, listRelated, recordName, updateRecord } from "../../services/records";
import { RelatedListQuickLinks } from "../components/cards/RelatedListQuickLinks";
import { EmptyState } from "../components/feedback/EmptyState";
import { FormFooter } from "../components/forms/FormFooter";
import { HighlightsPanel } from "../components/layout/HighlightsPanel";
import { Tabs } from "../components/layout/Tabs";
import { ErrorPopover } from "../components/overlays/ErrorPopover";
import { useConsole } from "../console/ConsoleContext";
import { hierarchyUrl, newUrl, recordUrl } from "../console/urls";
import { useServiceData } from "../console/useServiceData";
import { formatValue, hasValue, isLookup } from "../widgets/fieldValues";
import { Region } from "../widgets/Region";
import { SidebarRegion } from "../widgets/SidebarRegion";
import { ActionModal } from "./ActionModal";
import { Modal } from "../components/overlays/Modal";
import { WIDGETS, type ObjectWidgetProps } from "../../objects/widgets";

function WidgetView({ widget, ...props }: ObjectWidgetProps & { widget: string }) {
  const Widget = WIDGETS[widget];
  return <Widget {...props} />;
}

export type RecordPageProps = {
  apiName: string;
  id: string;
  tab?: string;
  /** Open quick action (ActionConfig id) — from the URL (?action=delete). */
  action?: string;
};

const hasRecordPage = (apiName: string) => Object.keys(OBJECTS[apiName]?.layouts ?? {}).length > 0;

/** Record home: highlights, quick links, tabs or stacked regions, and sidebar — all from the object's layout config. */
export function RecordPage({ apiName, id, tab, action }: RecordPageProps) {
  const config = getObjectConfig(apiName);
  const con = useConsole();
  const { data: record } = useServiceData(() => getRecord(apiName, id), [apiName, id]);
  const { data: user } = useServiceData(() => getCurrentUser(), []);
  const [activeTab, setActiveTab] = useState<string | null>(tab ?? null);
  const [following, setFollowing] = useState(false);
  const [draft, setDraft] = useState<Record<string, FieldValue> | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [popover, setPopover] = useState(false);
  const [focusKey, setFocusKey] = useState<string | null>(null);

  const layoutId = config.recordTypes?.find((t) => t.value === record?.recordType)?.layout ?? Object.keys(config.layouts)[0];
  const layout = config.layouts[layoutId];
  // Live counts for quick links backed by a child object (Notes …).
  const liveLinks = (layout.quickLinks?.links ?? []).filter((l) => l.objectApiName && l.parentField);
  const { data: liveCounts } = useServiceData(
    () => Promise.all(liveLinks.map((l) => listRelated(l.objectApiName ?? "", l.parentField ?? "", id).then((rows) => [l.id, rows.length] as const))).then((e) => new Map(e)),
    [id, layoutId],
  );

  useEffect(() => {
    if (focusKey) document.getElementById(focusKey)?.focus();
  }, [focusKey, draft]);

  if (record === undefined) return null;
  if (record === null) return <EmptyState variant="text" message="This record was deleted or you don't have access to it." />;

  const actionOf = (actionId: string): ActionConfig | undefined => config.actions.find((a) => a.id === actionId);
  // Actions shown for the record's current values (claim actions by status).
  const visible = (actionId: string) => {
    const w = actionOf(actionId)?.visibleWhen;
    return !w || w.in.includes(String(record.values[w.field] ?? ""));
  };
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
    if (a.kind === "delete" || a.kind === "form" || a.kind === "message" || a.kind === "widget") con.navigate(`${url}?action=${a.id}`, { replace: true });
    else if (a.kind === "update") updateRecord(apiName, id, a.values);
    else if (a.kind === "edit") startEdit();
    else if (a.kind === "hierarchy") con.navigate(hierarchyUrl(apiName, id));
    else if (a.kind === "new") con.navigate(newUrl(apiName));
    else if (a.kind === "composer") con.openComposer({ apiName, actionId: a.id, parentId: id, values: {} });
  };
  const modalAction = action ? actionOf(action) : undefined;
  const openLookup = (l: { objectApiName: string; id: string }) => (hasRecordPage(l.objectApiName) ? con.openRecord(l.objectApiName, l.id) : undefined);

  const region = (r: RegionConfig, key: string | number) => (
    <Region
      key={key}
      config={config}
      region={r}
      record={record}
      values={values}
      mode={draft ? "edit" : "view"}
      errors={errors}
      captured={con.captured}
      onChange={(k, v) => setDraft((d) => ({ ...(d ?? record.values), [k]: v }))}
      onEdit={startEdit}
      onOpenLookup={openLookup}
      onAction={runAction}
      onOpenRecord={con.openRecord}
    />
  );

  const mainColumn = layout.tabs ? (
    <Tabs
      card
      size="medium"
      activeId={activeTab ?? layout.defaultTab ?? layout.tabs[0]?.id ?? ""}
      onSelect={setActiveTab}
      items={layout.tabs.map((t) => ({
        id: t.id,
        label: t.label,
        content: [...(t.sections ?? []).map((s): RegionConfig => ({ kind: "section", section: s })), ...(t.regions ?? [])].map(region),
      }))}
    />
  ) : (
    (layout.main ?? []).map(region)
  );

  return (
    <>
      <div className="slds-m-bottom_small">
        <HighlightsPanel
          iconName={config.iconName}
          objectLabel={config.label}
          title={recordName(apiName, record)}
          follow={layout.highlights.follow ? { following, onToggle: setFollowing } : undefined}
          onHierarchy={layout.highlights.hierarchy ? () => runAction("hierarchy") : undefined}
          actions={layout.highlights.actions.filter(visible).map((a) => ({ value: a, label: actionOf(a)?.label ?? a }))}
          overflowActions={layout.highlights.overflow.filter(visible).map((a) => ({ value: a, label: actionOf(a)?.label ?? a }))}
          overflowLength={layout.highlights.overflowLength}
          onAction={runAction}
          details={layout.highlights.fields.map((key) => {
            const def = config.fields[key];
            const v = record.values[key];
            const text = formatValue(def, v);
            const link = isLookup(v) ? () => openLookup(v) : def.type === "url" && text ? () => undefined : undefined;
            return {
              label: def.label,
              value: link ? (
                <a href="#" onClick={(e) => (e.preventDefault(), link())}>
                  {text}
                </a>
              ) : (
                text
              ),
            };
          })}
        />
      </div>
      {layout.quickLinks ? (
        <div className="slds-m-bottom_small">
          <RelatedListQuickLinks
            links={layout.quickLinks.links.map((l) => ({ id: l.id, label: l.label, iconName: l.iconName, count: liveCounts?.get(l.id) ?? record.related?.[l.id] ?? 0 }))}
            totalCount={layout.quickLinks.totalCount}
            onSelect={() => setActiveTab("related")}
            onShowAll={() => setActiveTab("related")}
          />
        </div>
      ) : null}
      {layout.sidebar.length ? (
        <div className="slds-grid">
          <div className="slds-col slds-size_2-of-3 slds-p-right_small">{mainColumn}</div>
          <div className="slds-col slds-size_1-of-3">
            {layout.sidebar.map((r, i) => (
              <SidebarRegion key={i} region={r} record={record} captured={con.captured} onAction={runAction} onOpenRecord={con.openRecord} />
            ))}
          </div>
        </div>
      ) : (
        mainColumn
      )}
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
      {modalAction?.kind === "widget" && WIDGETS[modalAction.widget] ? (
        <Modal open headless heading={modalAction.title} size={modalAction.size ?? "default"} onClose={() => con.navigate(url, { replace: true })}>
          <WidgetView
            widget={modalAction.widget}
            apiName={apiName}
            record={record}
            captured={con.captured}
            onClose={() => con.navigate(url, { replace: true })}
          />
        </Modal>
      ) : null}
      {modalAction && (modalAction.kind === "delete" || modalAction.kind === "form" || modalAction.kind === "message") ? (
        <ActionModal
          apiName={apiName}
          record={record}
          action={modalAction}
          currentUser={user}
          today={con.today}
          onClose={() => con.navigate(url, { replace: true })}
          onDeleted={() => con.closeTab()}
        />
      ) : null}
    </>
  );
}
