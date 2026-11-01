import { useState } from "react";
import type { RecordData, SidebarRegionConfig, SidebarTabContent } from "../../config/types";
import { EinsteinCard } from "../components/cards/EinsteinCard";
import { RelatedListCard } from "../components/cards/RelatedListCard";
import { Card } from "../components/cards/Card";
import { Icon } from "../components/icons/Icon";
import { Tabs } from "../components/layout/Tabs";
import { RelatedList } from "./RelatedList";

export type SidebarRegionProps = {
  region: SidebarRegionConfig;
  record: RecordData;
  /** Captured back-end state (?state=error). */
  captured?: boolean;
  onAction?: (actionId: string) => void;
  onOpenRecord?: (apiName: string, id: string) => void;
};

function TabContent({ content, record }: { content: SidebarTabContent; record: RecordData }) {
  if (content.kind === "message") {
    return (
      <Card>
        <div className="slds-grid slds-grid_vertical-align-center slds-p-around_x-small">
          <Icon name={content.iconName} size="small" />
          <p className="slds-m-left_small">{content.text}</p>
        </div>
      </Card>
    );
  }
  if (content.kind === "relatedLists") {
    return (
      <>
        {content.lists.map((l) => (
          <RelatedListCard
            key={l.id}
            iconName={l.iconName}
            title={l.label}
            count={record.related?.[l.id] ?? 0}
            menuItems={[{ value: "new", label: "New" }]}
          />
        ))}
      </>
    );
  }
  return null;
}

/** One right-sidebar region of a record page: Einstein card, or a tab card (Duplicates, Activity …). */
export function SidebarRegion({ region, record, captured, onAction, onOpenRecord }: SidebarRegionProps) {
  const [active, setActive] = useState(region.kind === "tabs" ? region.tabs[0]?.id ?? "" : "");
  if (region.kind === "relatedList") {
    return <RelatedList list={region.list} parent={record} captured={captured} onAction={onAction} onOpenRecord={onOpenRecord} />;
  }
  if (region.kind === "einstein") {
    return (
      <div className="slds-m-bottom_small">
        <EinsteinCard title={region.title} centered>
          <p className="slds-text-body_small slds-text-color_weak">{region.message}</p>
        </EinsteinCard>
      </div>
    );
  }
  return (
    <div className="slds-m-bottom_small">
      <Tabs
        card
        activeId={active}
        onSelect={setActive}
        items={region.tabs.map((t) => ({ id: t.id, label: t.label, content: <TabContent content={t.content} record={record} /> }))}
      />
    </div>
  );
}
