import { useState } from "react";
import { Button } from "../components/buttons/Button";
import { EinsteinCard } from "../components/cards/EinsteinCard";
import { RelatedListCard } from "../components/cards/RelatedListCard";
import { Pagination } from "../components/data/Pagination";
import { Pill } from "../components/feedback/Pill";
import { PillContainer } from "../components/feedback/PillContainer";
import { FileSelector } from "../components/forms/FileSelector";
import { Input } from "../components/forms/Input";
import { RadioGroup, type RadioOption } from "../components/forms/RadioGroup";
import { RichTextEditor } from "../components/forms/RichTextEditor";
import { Toggle } from "../components/forms/Toggle";
import { Icon } from "../components/icons/Icon";
import { DockedComposer } from "../components/overlays/DockedComposer";
import { USER_AVATAR } from "./patternData";
import { ShowcaseExample } from "./ShowcaseExample";

export const RECORD_TYPES: RadioOption[] = [
  {
    value: "group",
    label: "Group",
    description: "Collection of employees that purchased Armada products (either directly from Armada or through an Armada partner) — “Member/Participants”",
  },
  { value: "ah-group", label: "AH Group" },
  { value: "ah-partner", label: "AH Partner" },
  { value: "broker", label: "Broker Agency", description: "Agencies that represent employer groups as Broker Of Record (BOR)" },
  { value: "ep", label: "EP Facility" },
  { value: "general", label: "General Agency", description: "Agency that works with Armada to market products to its broker network" },
];

/** Composer body used by the showcase and the Figma comparison (Figma C5). */
export function NoteComposerBody() {
  return (
    <div className="slds-p-around_small slds-grid slds-grid_vertical slds-grow">
      <div className="slds-grid slds-grid_vertical-align-end slds-m-bottom_small">
        <div className="slds-col">
          <Input label="Title" defaultValue="No new note" />
        </div>
        <div className="slds-p-left_small slds-p-bottom_x-small slds-grid slds-grid_vertical-align-center">
          <Icon name="utility:lock" size="x-small" tone="default" className="slds-m-right_xx-small" />
          <span>Visibility Set by Record</span>
        </div>
      </div>
      <RichTextEditor label="Compose text" defaultValue="Basic testing" onInsertImage={() => undefined} fill />
      <div className="slds-grid slds-grid_vertical-align-center slds-m-top_x-small">
        <span className="slds-form-element__label slds-m-right_x-small">Related to</span>
        <Pill label="Antoinette Mitcham" iconName="standard:contact" onClick={() => undefined} />
      </div>
    </div>
  );
}

export const COMPOSER_FOOTER = (
  <div className="slds-grid slds-grow">
    <Button label="Delete" />
    <div className="slds-col_bump-left">
      <Button label="Share" />
      <Button label="Add to Records" />
      <Button label="Done" />
    </div>
  </div>
);

export function Phase4Section() {
  const [hold, setHold] = useState(false);
  const [recordType, setRecordType] = useState<string | null>("group");
  const [files, setFiles] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pills, setPills] = useState(["Mansoor Ahmad", "Feng Yue", "Deepak Malviya"]);
  const [minimized, setMinimized] = useState(false);

  return (
    <section className="slds-m-bottom_x-large" data-visual-id="phase4">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Toggle · radio group · file selector · pills · composer · pagination · Einstein card</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Toggle — stacked caps (Figma) / inline / checked / disabled" visualId="toggles">
          <Toggle label="Place on Hold" capsLabel layout="stacked" onLabel="Yes" offLabel="No" checked={hold} onChange={setHold} />
          <div className="slds-m-top_small">
            <Toggle label="Notifications" defaultChecked />
          </div>
          <div className="slds-m-top_small">
            <Toggle label="Archived" disabled />
          </div>
          <div className="slds-m-top_small">
            <Toggle label="Locked on" disabled defaultChecked />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Radio group — descriptions (record type), required error, disabled" visualId="radio-groups" wide>
          <RadioGroup legend="Select a record type" hideLegend options={RECORD_TYPES} value={recordType} onChange={setRecordType} />
          <div className="slds-grid slds-m-top_medium">
            <div className="slds-col slds-p-right_medium">
              <RadioGroup
                legend="Relationship"
                required
                error="Complete this field."
                options={[
                  { value: "employee", label: "Employee" },
                  { value: "dependent", label: "Dependent" },
                ]}
                value={null}
                onChange={() => undefined}
              />
            </div>
            <div className="slds-col">
              <RadioGroup
                legend="Plan tier (locked)"
                disabled
                options={[
                  { value: "gold", label: "Gold" },
                  { value: "platinum", label: "Platinum" },
                ]}
                value="platinum"
                onChange={() => undefined}
              />
            </div>
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="File selector — area (Files related list) / image with label / inline files + error" visualId="file-selector" full>
          <RelatedListCard iconName="standard:file" title="Files" count={files.length} buttons={[{ value: "add", label: "Add Files" }]}>
            <div className="slds-p-around_x-small">
              <FileSelector variant="area" onFiles={(f) => setFiles(f.map((x) => x.name))} dropLabel="Or drop files" />
            </div>
          </RelatedListCard>
          <div className="slds-grid slds-m-top_medium">
            <div className="slds-col slds-p-right_medium">
              <FileSelector label="Receipt image" variant="images" accept="image/*" multiple={false} onFiles={() => undefined} />
            </div>
            <div className="slds-col">
              <FileSelector label="Attachment" onFiles={() => undefined} error="File type not supported" />
            </div>
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Pills — link + icon, plain + remove, avatar, error, container" visualId="pills">
          <div className="slds-grid slds-wrap slds-gutters_xx-small">
            <Pill label="Antoinette Mitcham" iconName="standard:contact" onClick={() => undefined} />
            <Pill label="Blalock Development Co" iconName="standard:account" onClick={() => undefined} onRemove={() => undefined} />
            <Pill label="Feng Yue" avatar={USER_AVATAR} onRemove={() => undefined} />
            <Pill label="Invalid recipient" error onRemove={() => undefined} />
          </div>
          <div className="slds-m-top_small">
            <PillContainer label="Selected users">
              {pills.map((p) => (
                <Pill key={p} label={p} iconName="standard:user" onRemove={() => setPills((ps) => ps.filter((x) => x !== p))} />
              ))}
            </PillContainer>
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Pagination — first page / middle page" visualId="pagination" full>
          <Pagination page={page} pageCount={2} onPageChange={setPage} pageSize={pageSize} onPageSizeChange={setPageSize} />
          <Pagination page={2} pageCount={5} onPageChange={() => undefined} />
        </ShowcaseExample>
        <ShowcaseExample title="Docked composer — note with rich-text editor (inline)" visualId="docked-composer" wide>
          <div style={{ height: "31rem" }} className="slds-grid slds-grid_align-end">
            <DockedComposer
              position="inline"
              title="No new note"
              iconName="standard:note"
              minimized={minimized}
              onMinimize={() => setMinimized((m) => !m)}
              footer={COMPOSER_FOOTER}
            >
              <NoteComposerBody />
            </DockedComposer>
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Docked composer — minimised" visualId="docked-composer-min">
          <DockedComposer position="inline" title="No new note" iconName="standard:note" minimized>
            <span />
          </DockedComposer>
        </ShowcaseExample>
        <ShowcaseExample title="Rich text editor — empty / error" visualId="rte">
          <RichTextEditor label="Comments" placeholder="Compose text" />
          <div className="slds-m-top_small">
            <RichTextEditor label="Description" error="Complete this field." />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Einstein card — Next Best Action (empty)" visualId="einstein-card">
          <EinsteinCard centered>Einstein doesn't have any recommendations for you right now.</EinsteinCard>
        </ShowcaseExample>
      </div>
    </section>
  );
}
