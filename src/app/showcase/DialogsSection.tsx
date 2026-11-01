import { useState, type ReactNode } from "react";
import { Button } from "../components/buttons/Button";
import { Combobox } from "../components/forms/Combobox";
import { FormFooter } from "../components/forms/FormFooter";
import { VerticalNav } from "../components/navigation/VerticalNav";
import { ErrorPopover } from "../components/overlays/ErrorPopover";
import { Modal } from "../components/overlays/Modal";
import { SWITCHER_OPTIONS, USER_OPTIONS } from "./FormsSection";
import { ShowcaseExample } from "./ShowcaseExample";

/** Contains the fixed-position modal inside a showcase tile (a transform makes it the containing block). */
function ModalStage({ children }: { children: ReactNode }) {
  return (
    <div className="slds-is-relative slds-theme_shade" style={{ height: "24rem", transform: "translateZ(0)", overflow: "hidden" }}>
      {children}
    </div>
  );
}

export const FOOTER_ACTIONS = [
  { value: "cancel", label: "Cancel" },
  { value: "save-new", label: "Save & New" },
  { value: "save", label: "Save", variant: "brand" as const },
];

export function DialogsSection() {
  const [modalOpen, setModalOpen] = useState(true);
  const [switcher, setSwitcher] = useState("user");
  const [popoverOpen, setPopoverOpen] = useState(true);
  const [nav, setNav] = useState("shared");

  return (
    <section className="slds-m-bottom_x-large" data-visual-id="dialogs">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Modal · form footer · error popover · vertical navigation</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Modal — default size, confirmation (Delete Claim)" visualId="modal-delete" wide>
          <ModalStage>
            <Modal
              open={modalOpen}
              heading="Delete Claim"
              onClose={() => setModalOpen(false)}
              footer={
                <>
                  <Button label="Cancel" onClick={() => setModalOpen(false)} />
                  <Button label="Delete" variant="brand" onClick={() => setModalOpen(false)} />
                </>
              }
            >
              <p className="slds-text-align_center">Are you sure you want to delete this Claim?</p>
            </Modal>
            {!modalOpen ? (
              <div className="slds-p-around_medium">
                <Button label="Open modal" onClick={() => setModalOpen(true)} />
              </div>
            ) : null}
          </ModalStage>
        </ShowcaseExample>
        <ShowcaseExample title="Modal — form body (Change Contact Owner)" visualId="modal-form">
          <ModalStage>
            <Modal
              open
              heading="Change Contact Owner"
              onClose={() => undefined}
              footer={
                <>
                  <Button label="Cancel" />
                  <Button label="Submit" variant="brand" />
                </>
              }
            >
              <Combobox
                variant="lookup"
                label="Select New Owner"
                placeholder="Search Users..."
                options={USER_OPTIONS}
                objectSwitcher={{ options: SWITCHER_OPTIONS, value: switcher, onChange: setSwitcher }}
              />
            </Modal>
          </ModalStage>
        </ShowcaseExample>
        <ShowcaseExample title="Modal — medium, info, no close (prompt style)" visualId="modal-info" full>
          <ModalStage>
            <Modal open heading="Repayment Recovery" size="medium" hideClose onClose={() => undefined} footer={<Button label="Close" variant="brand" />}>
              <p>Repayment Recovery is not available yet. It will be added in a later release.</p>
            </Modal>
          </ModalStage>
        </ShowcaseExample>
        <ShowcaseExample title="Form footer — default (inline)" visualId="form-footer" full>
          <FormFooter position="inline" actions={FOOTER_ACTIONS} onAction={() => undefined} />
        </ShowcaseExample>
        <ShowcaseExample title="Form footer — with errors + error popover" visualId="form-footer-error" full>
          <div className="slds-p-top_xx-large">
            <div className="slds-p-top_xx-large slds-p-bottom_x-large" />
            <FormFooter
              position="inline"
              actions={FOOTER_ACTIONS}
              onAction={() => undefined}
              hasErrors
              onErrorClick={() => setPopoverOpen((o) => !o)}
              errorPopover={popoverOpen ? <ErrorPopover fields={[{ label: "Account Name" }]} onClose={() => setPopoverOpen(false)} /> : null}
            />
          </div>
        </ShowcaseExample>
        <ShowcaseExample title="Error popover — fields and page errors" visualId="error-popover">
          <ErrorPopover
            messages={["Duplicate value found: Employer Code."]}
            fields={[{ label: "Account Name" }, { label: "Plan Year" }]}
            onClose={() => undefined}
            nubbin="bottom-left"
          />
        </ShowcaseExample>
        <ShowcaseExample title="Vertical navigation (Reports)" visualId="vertical-nav">
          <VerticalNav
            label="Reports"
            activeId={nav}
            onSelect={setNav}
            sections={[
              {
                id: "reports",
                title: "Reports",
                items: [
                  { id: "recent", label: "Recent" },
                  { id: "created", label: "Created by Me" },
                  { id: "private", label: "Private Reports" },
                  { id: "public", label: "Public Reports" },
                  { id: "all", label: "All Reports" },
                ],
              },
              {
                id: "folders",
                title: "Folders",
                items: [
                  { id: "all-folders", label: "All Folders" },
                  { id: "folders-me", label: "Created by Me" },
                  { id: "shared", label: "Shared with Me" },
                ],
              },
              { id: "favorites", title: "Favorites", items: [{ id: "all-favorites", label: "All Favorites" }] },
            ]}
          />
        </ShowcaseExample>
      </div>
    </section>
  );
}
