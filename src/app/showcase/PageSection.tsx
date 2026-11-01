import { useState } from "react";
import { Button } from "../components/buttons/Button";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { ButtonMenu } from "../components/buttons/ButtonMenu";
import { HighlightsPanel } from "../components/layout/HighlightsPanel";
import { ListViewToolbar } from "../components/layout/ListViewToolbar";
import { PageHeader } from "../components/layout/PageHeader";
import { Tabs } from "../components/layout/Tabs";
import { ExpandableSection } from "../components/layout/ExpandableSection";
import { Breadcrumb } from "../components/navigation/Breadcrumb";
import { RecordField } from "../components/record/RecordField";
import { RecordFieldGrid } from "../components/record/RecordFieldGrid";
import { OVERFLOW_ITEMS } from "./ButtonsSection";
import { DISPLAY_AS, LIST_CONTROLS, LIST_VIEWS, USER_AVATAR } from "./patternData";
import { ShowcaseExample } from "./ShowcaseExample";

const LIST_BUTTONS = (
  <ButtonGroup kind="list" label="List view actions">
    <Button label="New" />
    <Button label="Discover Companies" />
    <Button label="Import" />
    <Button label="Printable View" />
    <Button label="Add to an Actionable List" />
    <ButtonMenu assistiveText="Show more actions" items={OVERFLOW_ITEMS} position="right" size="x-small" actions />
  </ButtonGroup>
);

export const PLAN_YEAR_ENROLLMENT_FIELDS = [
  <RecordField key="n" label="Plan Year Enrollment Number" value={{ type: "text", text: "PYE-0000001" }} />,
  <RecordField
    key="o"
    label="Owner"
    value={{ type: "lookup", text: "Feng Yue", avatar: USER_AVATAR }}
    action={{ iconName: "utility:change_owner", assistiveText: "Change Owner", onClick: () => undefined }}
  />,
  <RecordField key="e" label="Effective Date" value={{ type: "text", text: "1/1/2026" }} onEdit={() => undefined} />,
  null,
  <RecordField key="t" label="Plan Year Tier" value={{ type: "link", text: "a7LEc00000TIcXb" }} onEdit={() => undefined} />,
  null,
  <RecordField key="p" label="Plan Year" value={{ type: "link", text: "2026 Meridian" }} onEdit={() => undefined} />,
  null,
  <RecordField key="s" label="Status" value={{ type: "text", text: "Active" }} onEdit={() => undefined} />,
  null,
  <RecordField key="sb" label="Subscriber" value={{ type: "link", text: "Sofia Martinez" }} onEdit={() => undefined} />,
  null,
  <RecordField key="c" label="Created By" value={{ type: "lookup", text: "Feng Yue", avatar: USER_AVATAR, timestamp: "4/19/2026 9:50 AM" }} />,
  <RecordField key="m" label="Last Modified By" value={{ type: "lookup", text: "Feng Yue", avatar: USER_AVATAR, timestamp: "4/19/2026 9:50 AM" }} />,
];

export function PageSection() {
  const [search, setSearch] = useState("");
  const [pinned, setPinned] = useState(false);
  const [filters, setFilters] = useState(false);
  const [following, setFollowing] = useState(false);
  const [tab, setTab] = useState("details");
  const [tab2, setTab2] = useState("payments");
  const [sectionOpen, setSectionOpen] = useState(true);
  const [section2Open, setSection2Open] = useState(false);

  return (
    <section className="slds-m-bottom_x-large" data-visual-id="page">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Page headers · tabs · sections · record fields</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Page header — object home + list view toolbar" visualId="page-header-object-home" full>
          <PageHeader
            variant="object-home"
            iconName="standard:account"
            objectLabel="Accounts"
            title="Accounts New This Week"
            listViews={LIST_VIEWS}
            pin={{ pinned, onToggle: () => setPinned((p) => !p) }}
            actions={[LIST_BUTTONS]}
            meta="22 items • Sorted by Account Name • Updated 2 minutes ago"
            controls={
              <ListViewToolbar
                search={{ value: search, onChange: setSearch }}
                settingsItems={LIST_CONTROLS}
                displayItems={DISPLAY_AS}
                onRefresh={() => undefined}
                onSort={() => undefined}
                onEdit={() => undefined}
                charts={{ pressed: false, onToggle: () => undefined }}
                filters={{ pressed: filters, onToggle: () => setFilters((f) => !f) }}
              />
            }
          />
        </ShowcaseExample>
        <ShowcaseExample title="Page header — related list with breadcrumbs (Reports / Account Hierarchy)" visualId="page-header-related" full>
          <PageHeader
            variant="related-list"
            breadcrumbs={[{ label: "Account" }, { label: "Blalock Development Co" }]}
            title="Account Hierarchy"
          />
        </ShowcaseExample>
        <ShowcaseExample title="Page header — base (icon + title + meta)" visualId="page-header-base" wide>
          <PageHeader iconName="standard:report" objectLabel="Reports" title="Shared with Me" meta="105 items" />
        </ShowcaseExample>
        <ShowcaseExample title="Breadcrumb" visualId="breadcrumb">
          <Breadcrumb items={[{ label: "All Folders" }, { label: "AH Sales & Marketing" }]} />
        </ShowcaseExample>
        <ShowcaseExample title="Highlights panel — hierarchy, actions + overflow, detail row (contact)" visualId="highlights" full>
          <HighlightsPanel
            iconName="standard:contact"
            objectLabel="Contact"
            title="Adam Sahn"
            onHierarchy={() => undefined}
            actions={[
              { value: "docusign", label: "Send with Docusign" },
              { value: "owner", label: "Change Owner" },
              { value: "activity", label: "Log an Activity" },
            ]}
            overflowActions={OVERFLOW_ITEMS}
            details={[
              { label: "CDEX Id", value: "008554542" },
              { label: "Employment Start Date" },
              { label: "Employment Status" },
              { label: "Product", value: "Ultimate Health" },
              { label: "Account Name", value: <a href="#account">E&amp;J Gallo Winery Active</a>, title: "E&J Gallo Winery Active" },
              { label: "Portal", value: <a href="#portal">www.armadacare.com/myaccount</a>, title: "www.armadacare.com/myaccount" },
            ]}
          />
        </ShowcaseExample>
        <ShowcaseExample title="Highlights panel — Follow (account), labels only" visualId="highlights-follow" full>
          <HighlightsPanel
            iconName="standard:account"
            objectLabel="Account"
            title="AGent 1"
            onHierarchy={() => undefined}
            follow={{ following, onToggle: setFollowing }}
            actions={[
              { value: "docusign", label: "Send with Docusign" },
              { value: "sharing", label: "Sharing" },
              { value: "delete", label: "Delete" },
            ]}
            overflowActions={OVERFLOW_ITEMS}
            details={[{ label: "Active Groups" }, { label: "Inactive Groups" }, { label: "# of Downstream Brokers" }]}
          />
        </ShowcaseExample>
        <ShowcaseExample title="Highlights panel — overflow menu only, no details (Card Transaction)" visualId="highlights-min" full>
          <HighlightsPanel iconName="custom:custom16" objectLabel="Card Transaction" title="CTX-0000000" overflowActions={OVERFLOW_ITEMS} />
        </ShowcaseExample>
        <ShowcaseExample title="Tabs — medium (record) with record field grid" visualId="tabs-record" full>
          <Tabs
            size="medium"
            activeId={tab}
            onSelect={setTab}
            items={[
              { id: "related", label: "Related", content: <p className="slds-p-around_small">Related lists</p> },
              { id: "details", label: "Details", content: <RecordFieldGrid fields={PLAN_YEAR_ENROLLMENT_FIELDS} /> },
            ]}
          />
        </ShowcaseExample>
        <ShowcaseExample title="Tabs — default size (card tabs)" visualId="tabs-default" wide>
          <Tabs
            activeId={tab2}
            onSelect={setTab2}
            items={[
              { id: "payments", label: "Payments", content: <p className="slds-p-around_small">No payments found for this contact.</p> },
              { id: "repayments", label: "Repayments", content: <p className="slds-p-around_small">Repayments</p> },
              { id: "recovery", label: "Recovery", content: <p className="slds-p-around_small">Recovery</p> },
            ]}
          />
        </ShowcaseExample>
        <ShowcaseExample title="Expandable section — open / closed / non-collapsible" visualId="sections" full>
          <ExpandableSection title="Contact Information" open={sectionOpen} onToggle={setSectionOpen}>
            <RecordFieldGrid
              fields={[
                <RecordField key="n" label="Name" value={{ type: "text", text: "Adam Sahn" }} onEdit={() => undefined} />,
                <RecordField key="a" label="Account Name" value={{ type: "link", text: "E&J Gallo Winery Active" }} onEdit={() => undefined} />,
                <RecordField key="s" label="Social Security Number" helpText="Masked. Only the last four digits are shown." value={{ type: "text", text: "*******0591" }} />,
                <RecordField key="e" label="Email" onEdit={() => undefined} />,
              ]}
            />
          </ExpandableSection>
          <ExpandableSection title="System Information" open={section2Open} onToggle={setSection2Open}>
            <p>Hidden content</p>
          </ExpandableSection>
          <ExpandableSection title="Claim Information" collapsible={false}>
            <p className="slds-p-around_small">Non-collapsible shaded title (search panels).</p>
          </ExpandableSection>
          <ExpandableSection title="Search Criteria" collapsible={false} actions={<Button variant="base" label="Advanced Search" />}>
            <p className="slds-p-around_small">With title actions (ds-v1.9).</p>
          </ExpandableSection>
          <ExpandableSection title="Search Criteria" collapsible={false} tone="inverse" actions={<Button variant="base" label="Show Less" />}>
            <p className="slds-p-around_small">Dark search-panel bar, tone="inverse" (v1.0).</p>
          </ExpandableSection>
        </ShowcaseExample>
        <ShowcaseExample title="Record field — value types (horizontal)" visualId="record-fields" wide>
          <RecordFieldGrid
            columns={1}
            fields={[
              <RecordField key="t" label="Status" value={{ type: "text", text: "Active" }} onEdit={() => undefined} />,
              <RecordField key="l" label="Plan Year" value={{ type: "link", text: "2026 Meridian" }} onEdit={() => undefined} />,
              <RecordField key="m" label="Mailing Address" value={{ type: "text", text: "LIVERMORE, CA 94550", multiline: true }} />,
              <RecordField key="c1" label="Is Escalated" value={{ type: "checkbox", checked: true }} />,
              <RecordField key="c2" label="Is Active" value={{ type: "checkbox", checked: false }} />,
              <RecordField key="r" label="Required Field" required value={{ type: "text", text: "Value" }} />,
              <RecordField key="e" label="Empty Field" />,
            ]}
          />
        </ShowcaseExample>
        <ShowcaseExample title="Record field — stacked, caps label (claim summary cards)" visualId="record-fields-stacked">
          <RecordFieldGrid
            columns={2}
            fields={[
              <RecordField key="p" layout="stacked" capsLabel label="Participant" value={{ type: "link", text: "Mei Chen" }} />,
              <RecordField key="s" layout="stacked" capsLabel label="Service Date" value={{ type: "text", text: "Jan 6, 2026" }} />,
              <RecordField key="m" layout="stacked" capsLabel label="Method Filed" value={{ type: "text", text: "Member Portal" }} />,
              <RecordField key="a" layout="stacked" capsLabel label="Receipt Amount" />,
            ]}
          />
        </ShowcaseExample>
      </div>
    </section>
  );
}
