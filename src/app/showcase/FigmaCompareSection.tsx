import { useState, type ReactNode } from "react";
import { Button } from "../components/buttons/Button";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { ButtonIcon } from "../components/buttons/ButtonIcon";
import { ButtonMenu } from "../components/buttons/ButtonMenu";
import { ButtonStateful } from "../components/buttons/ButtonStateful";
import { MenuDropdown } from "../components/buttons/MenuDropdown";
import { Badge } from "../components/feedback/Badge";
import { Combobox } from "../components/forms/Combobox";
import { DualListbox } from "../components/forms/DualListbox";
import { Input } from "../components/forms/Input";
import { Popover } from "../components/overlays/Popover";
import { OVERFLOW_ITEMS } from "./ButtonsSection";
import { SWITCHER_OPTIONS, USER_OPTIONS } from "./FormsSection";

/**
 * Showcase harness only: each block rebuilds one Figma node with the same content, at the node's width
 * (converted to rem), so tools/visual can diff it against the Figma screenshot.
 */
function Frame({ id, figmaNode, rem, children }: { id: string; figmaNode: string; rem: number; children: ReactNode }) {
  return (
    <div className="slds-m-bottom_large">
      <p className="slds-text-body_small slds-text-color_weak">
        {id} · Figma node {figmaNode}
      </p>
      <div data-visual-id={id} style={{ width: `${rem}rem` }}>
        {children}
      </div>
    </div>
  );
}

export function FigmaCompareSection() {
  const [chosen, setChosen] = useState<string[]>([]);
  const [switcher, setSwitcher] = useState("user");

  return (
    <section className="slds-m-bottom_x-large" data-visual-id="figma-compare">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Figma comparison set</h2>
      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_medium">
        Rebuilt Figma elements for screenshot diffing (tools/visual). Sizes match the Figma nodes.
      </p>
      <div className="slds-grid slds-wrap slds-gutters">
        <div className="slds-col">
          <Frame id="fig-footer-actions" figmaNode="2:54006" rem={15.3125}>
            <Button label="Cancel" />
            <Button label="Save & New" className="slds-m-left_xx-small" />
            <Button label="Save" variant="brand" className="slds-m-left_xx-small" />
          </Frame>
          <Frame id="fig-listview-buttons" figmaNode="2:41074" rem={38.4375}>
            <ButtonGroup kind="list" label="List view actions">
              <Button label="New" />
              <Button label="Discover Companies" />
              <Button label="Import" />
              <Button label="Printable View" />
              <Button label="Add to an Actionable List" />
              <ButtonMenu assistiveText="Show more actions" items={OVERFLOW_ITEMS} position="right" actions />
            </ButtonGroup>
          </Frame>
          <Frame id="fig-listview-toolbar" figmaNode="2:41118" rem={17.1875}>
            <div className="slds-grid">
              <ButtonMenu assistiveText="List View Controls" iconName="utility:settings" items={OVERFLOW_ITEMS} className="slds-m-left_x-small" />
              <ButtonMenu assistiveText="Select list display" iconName="utility:table" items={OVERFLOW_ITEMS} className="slds-m-left_xx-small" />
              <ButtonIcon iconName="utility:refresh" assistiveText="Refresh" variant="border-filled" className="slds-m-left_xx-small" />
              <ButtonIcon iconName="utility:sort" assistiveText="Sort" variant="border-filled" className="slds-m-left_xx-small" />
              <ButtonIcon iconName="utility:edit" assistiveText="Edit List" variant="border-filled" className="slds-m-left_xx-small" />
              <ButtonGroup label="Charts and filters" className="slds-m-left_xx-small">
                <ButtonIcon iconName="utility:chart" assistiveText="Show charts" variant="border-filled" />
                <ButtonIcon iconName="utility:filterList" assistiveText="Show filters" variant="border-filled" pressed={false} />
              </ButtonGroup>
            </div>
          </Frame>
          <Frame id="fig-pin" figmaNode="2:41069" rem={1.5}>
            <ButtonIcon iconName="utility:pin" assistiveText="Pin this list view" variant="border-filled" size="small" />
          </Frame>
          <Frame id="fig-follow" figmaNode="2:55766" rem={5.875}>
            <ButtonStateful />
          </Frame>
          <Frame id="fig-related-actions" figmaNode="2:39903" rem={11.4375}>
            <ButtonGroup label="Related list actions">
              <Button label="Change Owner" />
              <Button label="New" />
            </ButtonGroup>
          </Frame>
          <Frame id="fig-badge-current" figmaNode="2:55132" rem={3.6875}>
            <Badge variant="inverse">current</Badge>
          </Frame>
        </div>
        <div className="slds-col">
          <Frame id="fig-input-error" figmaNode="2:51373" rem={21.375}>
            <Input label="Account Name" required layout="horizontal" error="Complete this field." />
          </Frame>
          <Frame id="fig-picklist" figmaNode="2:51465" rem={21.375}>
            <Combobox label="Type" layout="horizontal" options={[{ value: "prospect", label: "Prospect" }]} defaultValue="prospect" />
          </Frame>
          <Frame id="fig-lookup-switcher" figmaNode="2:44229" rem={38}>
            <Combobox
              variant="lookup"
              label="Search"
              placeholder="Search User..."
              options={USER_OPTIONS}
              objectSwitcher={{ options: SWITCHER_OPTIONS, value: switcher, onChange: setSwitcher }}
            />
          </Frame>
          <Frame id="fig-lookup-selected" figmaNode="2:11517" rem={26.6875}>
            <Combobox variant="lookup" label="Assigned To" required options={USER_OPTIONS} defaultValue="u1" />
          </Frame>
          <Frame id="fig-dual-listbox" figmaNode="2:49181" rem={21.375}>
            <DualListbox
              label="Participant Summary"
              options={[
                { value: "admin", label: "Admin" },
                { value: "participant", label: "Participant" },
              ]}
              value={chosen}
              onChange={setChosen}
              responsive
              size={4}
            />
          </Frame>
          <Frame id="fig-error-popover" figmaNode="2:51304" rem={20.375}>
            <Popover heading="We hit a snag." variant="error" nubbin="bottom" onClose={() => undefined}>
              <p className="slds-text-title_bold">Review the following fields</p>
              <ul className="slds-list_dotted">
                <li>
                  <a href="#account-name">Account Name</a>
                </li>
              </ul>
            </Popover>
          </Frame>
          <Frame id="fig-overflow-menu" figmaNode="2:55792" rem={11.9375}>
            <div className="slds-is-relative" style={{ height: "26.5rem" }}>
              <MenuDropdown items={OVERFLOW_ITEMS} onSelect={() => undefined} onClose={() => undefined} size="x-small" actions />
            </div>
          </Frame>
        </div>
      </div>
    </section>
  );
}
