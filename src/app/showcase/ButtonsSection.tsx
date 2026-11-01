import { Button } from "../components/buttons/Button";
import { ButtonGroup } from "../components/buttons/ButtonGroup";
import { ButtonIcon, type ButtonIconSize, type ButtonIconVariant } from "../components/buttons/ButtonIcon";
import { ButtonMenu } from "../components/buttons/ButtonMenu";
import { ButtonStateful } from "../components/buttons/ButtonStateful";
import type { MenuItem } from "../components/buttons/MenuDropdown";
import { ShowcaseExample } from "./ShowcaseExample";
import { ShowcaseSpace } from "./ShowcaseSpace";

const ICON_VARIANTS: ButtonIconVariant[] = ["bare", "container", "border", "border-filled", "brand"];
const ICON_SIZES: ButtonIconSize[] = ["xx-small", "x-small", "small", "medium"];

export const OVERFLOW_ITEMS: MenuItem[] = [
  { value: "sharing", label: "Sharing" },
  { value: "check", label: "Check for New Data" },
  { value: "record-type", label: "Change Record Type" },
  { value: "edit", label: "Edit" },
  { value: "approval", label: "Submit for Approval" },
  { value: "delete", label: "Delete" },
  { value: "hierarchy", label: "View Account Hierarchy" },
  { value: "sharing-hierarchy", label: "Sharing Hierarchy" },
  { value: "owner", label: "Change Owner" },
  { value: "census", label: "Census" },
  { value: "clone", label: "Clone" },
  { value: "plan", label: "New Armada Plan" },
];

const MIXED_ITEMS: MenuItem[] = [
  { type: "header", label: "List View Controls" },
  { value: "new", label: "New" },
  { value: "clone", label: "Clone" },
  { value: "rename", label: "Rename", disabled: true },
  { type: "divider" },
  { type: "checkbox", value: "pinned", label: "Pin this list view", checked: true },
  { type: "checkbox", value: "shared", label: "Share with others", checked: false },
];

export function ButtonsSection() {
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="buttons">
      <h2 className="slds-text-heading_medium slds-m-bottom_small">Buttons</h2>
      <div className="slds-grid slds-wrap">
        <ShowcaseExample title="Button — variants" visualId="button-variants">
          <Button label="Cancel" variant="neutral" className="slds-m-right_x-small" />
          <Button label="Save" variant="brand" className="slds-m-right_x-small" />
          <Button label="View All" variant="base" />
        </ShowcaseExample>
        <ShowcaseExample title="Button — disabled" visualId="button-disabled">
          <Button label="Previous" disabled className="slds-m-right_x-small" />
          <Button label="Save" variant="brand" disabled className="slds-m-right_x-small" />
          <Button label="Add Reason" variant="base" disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Button — with icon" visualId="button-icons">
          <Button label="Upload Files" iconName="utility:upload" className="slds-m-right_x-small" />
          <Button label="New Folder" iconName="utility:down" iconPosition="right" iconSize="x-small" />
        </ShowcaseExample>
        <ShowcaseExample title="Button — hover / focus / active" visualId="button-states">
          <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_x-small">
            Interactive: hover darkens to the derived brand shade; focus shows the SLDS blue ring.
          </p>
          <Button label="Neutral" className="slds-m-right_x-small" />
          <Button label="Brand" variant="brand" />
        </ShowcaseExample>
        <ShowcaseExample title="Stateful button (Follow)" visualId="button-stateful">
          <ButtonStateful className="slds-m-right_x-small" />
          <ButtonStateful defaultSelected className="slds-m-right_x-small" />
          <ButtonStateful disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Button group — base / disabled member" visualId="button-group">
          <div className="slds-m-bottom_small">
            <ButtonGroup label="Claim actions">
              <Button label="Approve" />
              <Button label="Deny" />
              <Button label="RMI" />
              <Button label="Split Approval" />
            </ButtonGroup>
          </div>
          <ButtonGroup label="Edit actions">
            <Button label="Refresh" />
            <Button label="Edit" disabled />
            <Button label="Save" />
          </ButtonGroup>
        </ShowcaseExample>
        <ShowcaseExample title="Button group — with overflow menu" visualId="button-group-overflow">
          <ButtonGroup label="Record actions">
            <Button label="Edit" />
            <Button label="Delete" />
            <Button label="Clone" />
            <ButtonMenu assistiveText="Show more actions" items={OVERFLOW_ITEMS} position="right" actions className="slds-button_last" />
          </ButtonGroup>
        </ShowcaseExample>
        <ShowcaseExample title="Button group — list (list view bar)" visualId="button-group-list">
          <ButtonGroup kind="list" label="List view actions">
            <Button label="New" />
            <Button label="Import" />
            <Button label="Printable View" />
            <ButtonMenu assistiveText="Show more actions" items={OVERFLOW_ITEMS} position="right" actions />
          </ButtonGroup>
        </ShowcaseExample>
        <ShowcaseExample title="Button icon — variants (medium)" visualId="buttonicon-variants">
          {ICON_VARIANTS.map((v) => (
            <ButtonIcon key={v} iconName="utility:settings" assistiveText={`Settings (${v})`} variant={v} className="slds-m-right_x-small" />
          ))}
        </ShowcaseExample>
        <ShowcaseExample title="Button icon — border-filled sizes" visualId="buttonicon-sizes">
          {ICON_SIZES.map((s) => (
            <ButtonIcon key={s} iconName="utility:down" assistiveText={`Show more (${s})`} variant="border-filled" size={s} className="slds-m-right_x-small" />
          ))}
        </ShowcaseExample>
        <ShowcaseExample title="Button icon — bare glyph sizes" visualId="buttonicon-glyphs">
          <ButtonIcon iconName="utility:edit" assistiveText="Edit (x-small)" iconSize="x-small" className="slds-m-right_x-small" />
          <ButtonIcon iconName="utility:edit" assistiveText="Edit (small)" iconSize="small" className="slds-m-right_x-small" />
          <ButtonIcon iconName="utility:edit" assistiveText="Edit (medium)" className="slds-m-right_x-small" />
          <ButtonIcon iconName="utility:edit" assistiveText="Edit (large)" iconSize="large" />
        </ShowcaseExample>
        <ShowcaseExample title="Button icon — states" visualId="buttonicon-states">
          <ButtonIcon iconName="utility:filterList" assistiveText="Filter (pressed)" variant="border-filled" pressed className="slds-m-right_x-small" />
          <ButtonIcon iconName="utility:filterList" assistiveText="Filter (not pressed)" variant="border-filled" pressed={false} className="slds-m-right_x-small" />
          <ButtonIcon iconName="utility:refresh" assistiveText="Refresh (disabled)" variant="border-filled" disabled className="slds-m-right_x-small" />
          <ButtonIcon iconName="utility:error" assistiveText="Review errors" feedback="error" iconSize="large" className="slds-m-right_x-small" />
          <ButtonIcon iconName="utility:settings" assistiveText="List view controls" variant="border-filled" menu={{ expanded: false }} />
        </ShowcaseExample>
        <ShowcaseExample title="Button menu — icon trigger (closed)" visualId="buttonmenu-closed">
          <ButtonMenu assistiveText="List view controls" iconName="utility:settings" items={MIXED_ITEMS} className="slds-m-right_x-small" />
          <ButtonMenu assistiveText="Show more" items={OVERFLOW_ITEMS} iconSize="x-small" className="slds-m-right_x-small" />
          <ButtonMenu label="New Folder" assistiveText="New Folder" items={MIXED_ITEMS} className="slds-m-right_x-small" />
          <ButtonMenu assistiveText="Disabled menu" items={MIXED_ITEMS} disabled />
        </ShowcaseExample>
        <ShowcaseExample title="Button menu — open (header, divider, checkbox, disabled)" visualId="buttonmenu-open">
          <ShowcaseSpace units={5}>
            <ButtonMenu assistiveText="List view controls" iconName="utility:settings" items={MIXED_ITEMS} defaultOpen />
          </ShowcaseSpace>
        </ShowcaseExample>
        <ShowcaseExample title="Button menu — action overflow (right, x-small width, length 10)" visualId="buttonmenu-actions">
          <ShowcaseSpace units={8}>
            <div className="slds-grid slds-grid_align-end">
              <ButtonMenu assistiveText="Show more actions" items={OVERFLOW_ITEMS} position="right" length={10} size="x-small" actions defaultOpen />
            </div>
          </ShowcaseSpace>
        </ShowcaseExample>
      </div>
    </section>
  );
}
