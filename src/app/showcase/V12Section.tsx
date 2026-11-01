import { useState } from "react";
import { Button } from "../components/buttons/Button";
import { Card } from "../components/cards/Card";
import { EmptyState } from "../components/feedback/EmptyState";
import { CompoundField } from "../components/forms/CompoundField";
import { Datepicker } from "../components/forms/Datepicker";
import { FormFooter } from "../components/forms/FormFooter";
import { Input } from "../components/forms/Input";
import { Textarea } from "../components/forms/Textarea";
import { Timepicker } from "../components/forms/Timepicker";
import { ErrorPopover } from "../components/overlays/ErrorPopover";
import { Modal } from "../components/overlays/Modal";
import { ShowcaseExample } from "./ShowcaseExample";

/** ds-v1.2 additions: Card without a title, inline Modal, CompoundField, EmptyState region. */
export function V12Section() {
  const [popover, setPopover] = useState(true);
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="v12">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">ds-v1.2 — card without title · inline modal · compound field · placeholder region</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Card — no title (plain container)" visualId="card-untitled">
          <Card bodyPadding>
            <p>We found no potential duplicates of this Account.</p>
          </Card>
        </ShowcaseExample>
        <ShowcaseExample title="EmptyState region — small / medium with message" visualId="empty-region">
          <div className="slds-m-bottom_small">
            <EmptyState variant="region" regionLabel="Participant/Members" />
          </div>
          <EmptyState variant="region" regionSize="medium" message="Embedded content" regionLabel="Report" />
        </ShowcaseExample>
        <ShowcaseExample title="CompoundField — address (horizontal)" visualId="compound-address">
          <CompoundField
            label="Corporate Address"
            address
            layout="horizontal"
            rows={[
              [{ content: <Input label="Address Search" placeholder="Search Address" iconRight="utility:search" />, size: "1-of-1" }],
              [{ content: <Textarea label="Corporate Street" />, size: "1-of-1" }],
              [
                { content: <Input label="Corporate City" />, size: "4-of-6" },
                { content: <Input label="Corporate State/Province" />, size: "2-of-6" },
              ],
              [
                { content: <Input label="Corporate Zip/Postal Code" />, size: "4-of-6" },
                { content: <Input label="Corporate Country" />, size: "2-of-6" },
              ],
            ]}
          />
        </ShowcaseExample>
        <ShowcaseExample title="CompoundField — Latitude / Longitude · Date + Time" visualId="compound-pairs">
          <CompoundField
            label="GeoPointeGeolocation"
            rows={[[{ content: <Input label="Latitude" /> }, { content: <Input label="Longitude" /> }]]}
          />
          <div className="slds-m-top_small">
            <CompoundField
              label="Geocode Retrieval Time"
              required
              error="Complete this field."
              rows={[[{ content: <Datepicker label="Date" /> }, { content: <Timepicker label="Time" /> }]]}
            />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Modal — inline (in-page panel with docked form footer + error popover)" visualId="modal-inline" full>
          <div className="slds-theme_shade slds-p-bottom_xx-large">
            <Modal
              open
              inline
              heading="New Account: Group"
              onClose={() => undefined}
              footer={
                <FormFooter
                  position="inline"
                  hasErrors
                  onErrorClick={() => setPopover((v) => !v)}
                  errorPopover={popover ? <ErrorPopover fields={[{ label: "Account Name" }]} onClose={() => setPopover(false)} /> : null}
                  actions={[
                    { value: "cancel", label: "Cancel" },
                    { value: "save-new", label: "Save & New" },
                    { value: "save", label: "Save", variant: "brand" },
                  ]}
                  onAction={() => undefined}
                />
              }
            >
              <div className="slds-p-top_xx-large slds-p-bottom_xx-large">
                <Input label="Account Name" required layout="horizontal" error="Complete this field." />
              </div>
            </Modal>
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Modal — inline, medium, buttons in the body (record type picker)" visualId="modal-inline-picker" full>
          <Modal open inline size="medium" heading="New Account" onClose={() => undefined}>
            <p className="slds-m-bottom_medium">Select a record type.</p>
            <div className="slds-grid slds-grid_align-center">
              <Button label="Cancel" />
              <Button label="Next" variant="brand" className="slds-m-left_x-small" />
            </div>
          </Modal>
        </ShowcaseExample>
      </div>
    </section>
  );
}
