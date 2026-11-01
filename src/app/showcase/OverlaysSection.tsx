import { Button } from "../components/buttons/Button";
import { HelpText } from "../components/overlays/HelpText";
import { Popover } from "../components/overlays/Popover";
import { Tooltip, type TooltipNubbin } from "../components/overlays/Tooltip";
import { ShowcaseExample } from "./ShowcaseExample";
import { ShowcaseSpace } from "./ShowcaseSpace";

const NUBBINS: TooltipNubbin[] = ["bottom-left", "top-left", "left"];

export function OverlaysSection() {
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="overlays">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Help text · Tooltip · Popover</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Help text — closed / open" visualId="helptext">
          <ShowcaseSpace units={1}>
            <span className="slds-form-element__label">Social Security Number</span>
            <HelpText content="Masked. Only the last four digits are shown." />
          </ShowcaseSpace>
          <ShowcaseSpace units={1}>
            <span className="slds-form-element__label">Escalation Indicator</span>
            <HelpText content="Set when the claim exceeds an escalation threshold." defaultOpen />
          </ShowcaseSpace>
        </ShowcaseExample>
        <ShowcaseExample title="Tooltip — nubbins (static)" visualId="tooltips">
          {NUBBINS.map((n) => (
            <div key={n} className="slds-m-bottom_medium">
              <Tooltip id={`tooltip-${n}`} nubbin={n}>
                Nubbin {n}: Some helpful information.
              </Tooltip>
            </div>
          ))}
        </ShowcaseExample>
        <ShowcaseExample title="Popover — default with close and footer" visualId="popover-default">
          <Popover
            heading="Share"
            nubbin="top-left"
            onClose={() => undefined}
            footer={
              <div className="slds-grid slds-grid_align-end">
                <Button label="Cancel" className="slds-m-right_x-small" />
                <Button label="Save" variant="brand" />
              </div>
            }
          >
            <p>Shared with 5 groups of users.</p>
          </Popover>
        </ShowcaseExample>
        <ShowcaseExample title="Popover — error (We hit a snag.)" visualId="popover-error">
          <Popover heading="We hit a snag." variant="error" nubbin="bottom-left" onClose={() => undefined}>
            <p className="slds-text-title_bold">Review the following fields</p>
            <ul className="slds-list_dotted">
              <li>
                <a href="#account-name">Account Name</a>
              </li>
            </ul>
          </Popover>
        </ShowcaseExample>
      </div>
    </section>
  );
}
