import { useState } from "react";
import { Button } from "../components/buttons/Button";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { Card } from "../components/cards/Card";
import { MetricTile } from "../components/cards/MetricTile";
import { RelatedListCard } from "../components/cards/RelatedListCard";
import { RelatedListQuickLinks, type QuickLink } from "../components/cards/RelatedListQuickLinks";
import { DataTable, type DataTableColumn } from "../components/data/DataTable";
import { EmptyState } from "../components/feedback/EmptyState";
import { LIST_CONTROLS, RELATED_MENU, ROW_ACTIONS } from "./patternData";
import { ShowcaseExample } from "./ShowcaseExample";

export const QUICK_LINKS: QuickLink[] = [
  { id: "notes", label: "Notes", count: 0, iconName: "standard:note" },
  { id: "attachments", label: "Notes & Attachments", count: 0, iconName: "standard:file" },
  { id: "bank", label: "Bank Accounts", count: 0, iconName: "standard:custom" },
  { id: "banking", label: "Banking Infos", count: 0, iconName: "custom:custom40" },
  { id: "card", label: "Card Transactions", count: 0, iconName: "custom:custom16" },
  { id: "claims", label: "Claims", count: 0, iconName: "custom:custom70" },
  { id: "plans", label: "Plans/Packages", count: 0, iconName: "custom:custom58" },
  { id: "files", label: "Files", count: 0, iconName: "standard:file" },
  { id: "cases", label: "Cases", count: 0, iconName: "standard:case" },
  { id: "affiliated", label: "Affiliated Plans", count: 3, iconName: "custom:custom18" },
  { id: "open", label: "Open Activities", count: 0, iconName: "standard:custom" },
  { id: "history", label: "Activity History", count: 0, iconName: "standard:custom" },
  { id: "contact-history", label: "Contact History", count: 1, iconName: "standard:event" },
  { id: "member-docs", label: "Member Documents", count: 0, iconName: "standard:custom" },
];

type MemberRow = { id: string; name: string; relationship: string; status: string };
const MEMBER_ROWS: MemberRow[] = [
  { id: "m1", name: "Sofia Martinez", relationship: "Subscriber", status: "Active" },
  { id: "m2", name: "Lucas Martinez", relationship: "Dependent", status: "Active" },
];
const MEMBER_COLUMNS: DataTableColumn<MemberRow>[] = [
  { key: "name", label: "Member Name", value: (r) => r.name, link: () => true, sortable: true },
  { key: "relationship", label: "Relationship", value: (r) => r.relationship, sortable: true },
  { key: "status", label: "Status", value: (r) => r.status, sortable: true },
];

const METRICS = ["Total Accounts", "With Opportunities", "No Recent Activity", "With Upcoming Activity"];

export function CardsSection() {
  const [metric, setMetric] = useState(METRICS[0]);
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="cards">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Cards · related lists · metrics · empty states</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Card — icon, actions, padded body, View All footer" visualId="card">
          <Card
            iconName="standard:contact"
            title="Contacts (3)"
            onTitleClick={() => undefined}
            actions={<Button label="New" />}
            bodyPadding
            footer={{ label: "View All", assistiveText: "Contacts", onClick: () => undefined }}
          >
            Card body
          </Card>
        </ShowcaseExample>
        <ShowcaseExample title="Card — plain title, no icon (Next Best Action)" visualId="card-plain">
          <Card title="Next Best Action" bodyPadding className="slds-card_boundary">
            <p className="slds-text-align_center">Einstein doesn't have any recommendations for you right now.</p>
          </Card>
        </ShowcaseExample>
        <ShowcaseExample title="Related list — empty / with ▼ / with buttons / loading" visualId="related-empty">
          <RelatedListCard iconName="standard:note" title="Notes" count={0} menuItems={RELATED_MENU} />
          <RelatedListCard iconName="standard:case" title="Cases" count={0} />
          <RelatedListCard
            iconName="custom:custom15"
            title="Plan Year Enrollment Members"
            count={0}
            buttons={[
              { value: "owner", label: "Change Owner" },
              { value: "new", label: "New" },
            ]}
          />
          <RelatedListCard iconName="custom:custom16" title="Card Transactions" count={0} loading />
        </ShowcaseExample>
        <ShowcaseExample title="Related list — records + View All (Notes (1))" visualId="related-records">
          <RelatedListCard
            iconName="standard:note"
            title="Notes"
            count={1}
            menuItems={RELATED_MENU}
            records={[{ id: "n1", title: "No new note", details: ["10/21/2026 10:11 AM by Mansoor Ahmad", "Basic testing"] }]}
            onViewAll={() => undefined}
          />
        </ShowcaseExample>
        <ShowcaseExample title="Related list — table, list controls, button group" visualId="related-table" full>
          <RelatedListCard
            iconName="custom:custom15"
            title="Plan Year Enrollment Members"
            count={2}
            settingsItems={LIST_CONTROLS}
            onRefresh={() => undefined}
            buttons={[
              { value: "owner", label: "Change Owner" },
              { value: "new", label: "New" },
            ]}
            onViewAll={() => undefined}
          >
            <DataTable
              label="Plan Year Enrollment Members"
              columns={MEMBER_COLUMNS}
              rows={MEMBER_ROWS}
              selection={{ selectedIds: selected, onChange: setSelected }}
              rowActions={ROW_ACTIONS}
            />
          </RelatedListCard>
        </ShowcaseExample>
        <ShowcaseExample title="Related list quick links" visualId="quick-links" full>
          <RelatedListQuickLinks links={QUICK_LINKS} onSelect={() => undefined} totalCount={17} onShowAll={() => undefined} />
        </ShowcaseExample>
        <ShowcaseExample title="Metric tiles — selected / not selected" visualId="metric-tiles" full>
          <div className="slds-grid slds-wrap">
            {METRICS.map((m) => (
              <div key={m} className="slds-m-right_large">
                <MetricTile label={m} value={0} selected={metric === m} onSelect={() => setMetric(m)} />
              </div>
            ))}
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Empty state — illustration (shaded list area)" visualId="empty-state" full>
          <div className="slds-grid slds-grid_vertical-align-center slds-p-around_small slds-theme_shade slds-border_bottom">
            <p className="slds-text-body_small">0 items • Filtered by Last Activity, Me, Total Accounts</p>
            <div className="slds-col_bump-left">
              <ButtonGroup kind="list" label="List actions">
                <Button label="Add to an Actionable List" />
                <Button label="Assign Label" />
              </ButtonGroup>
            </div>
          </div>
          <EmptyState shaded heading="Get your accounts engaged" message="When there are accounts that match your selections, you'll see them here." />
        </ShowcaseExample>
        <ShowcaseExample title="Empty state — text" visualId="empty-text">
          <EmptyState variant="text" message="No payments found for this contact." />
          <EmptyState variant="text" message="No records found matching your search criteria." />
        </ShowcaseExample>
      </div>
    </section>
  );
}
