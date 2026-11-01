import { Icon, type IconSize, type IconTone, type ObjectIconName, type UtilityIconName } from "../components/icons/Icon";
import { ICON_NAMES, ICONS } from "../components/icons/registry";

const SIZES: IconSize[] = ["xx-small", "x-small", "small", "medium", "large"];
const TONES: IconTone[] = ["default", "light", "warning", "error", "success", "current"];

const UTILITY = ICON_NAMES.filter((n): n is UtilityIconName => ICONS[n].sprite === "utility");
const OBJECT = ICON_NAMES.filter((n): n is ObjectIconName => ICONS[n].sprite !== "utility");

/** Icons whose glyph was compared with the Figma vector export (tools/visual). */
export const FIGMA_COMPARED: UtilityIconName[] = [
  "utility:rows",
  "utility:dx_org_dev",
  "utility:down",
  "utility:search",
  "utility:favorite",
  "utility:add",
  "utility:question",
  "utility:setup",
  "utility:notification",
  "utility:chevrondown",
  "utility:close",
  "utility:pin",
  "utility:settings",
  "utility:table",
  "utility:side_list",
  "utility:refresh",
  "utility:sort",
  "utility:edit",
  "utility:chart",
  "utility:filterList",
  "utility:hierarchy",
  "utility:info",
  "utility:check",
  "utility:error",
];

export function IconsSection() {
  return (
    <section className="slds-m-bottom_x-large" data-visual-id="icons">
      <h2 className="slds-text-heading_medium slds-m-bottom_medium">Icon</h2>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Sizes</h3>
      <div className="slds-grid slds-grid_vertical-align-end slds-m-bottom_large" data-visual-id="icon-sizes">
        {SIZES.map((s) => (
          <div key={s} className="slds-m-right_large slds-text-align_center">
            <Icon name="standard:account" size={s} assistiveText="Account" />
            <div className="slds-m-top_xx-small">
              <Icon name="utility:edit" size={s} assistiveText="Edit" />
            </div>
            <div className="slds-text-body_small">{s}</div>
          </div>
        ))}
      </div>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Utility tones</h3>
      <div className="slds-grid slds-m-bottom_large" data-visual-id="icon-tones">
        {TONES.map((t) => (
          <div key={t} className="slds-m-right_large slds-text-align_center slds-text-color_error">
            <Icon name="utility:info" tone={t} size="small" assistiveText={`Info (${t})`} />
            <div className="slds-text-body_small slds-text-color_default">{t}</div>
          </div>
        ))}
      </div>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Object icons ({OBJECT.length})</h3>
      <ul className="slds-grid slds-wrap slds-m-bottom_large" data-visual-id="icon-objects">
        {OBJECT.map((n) => (
          <li key={n} className="slds-size_1-of-6 slds-m-bottom_small slds-grid slds-grid_vertical-align-center">
            <Icon name={n} size="small" assistiveText={n} className="slds-m-right_x-small" />
            <span className="slds-text-body_small">{n}</span>
          </li>
        ))}
      </ul>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Utility icons ({UTILITY.length})</h3>
      <ul className="slds-grid slds-wrap slds-m-bottom_large" data-visual-id="icon-utility">
        {UTILITY.map((n) => (
          <li key={n} className="slds-size_1-of-6 slds-m-bottom_small slds-grid slds-grid_vertical-align-center">
            <Icon name={n} size="x-small" assistiveText={n} className="slds-m-right_x-small" />
            <span className="slds-text-body_small">{n}</span>
          </li>
        ))}
      </ul>

      <h3 className="slds-text-heading_small slds-m-bottom_small">Figma comparison set (large)</h3>
      <ul className="slds-grid slds-wrap">
        {FIGMA_COMPARED.map((n) => (
          <li key={n} className="slds-p-around_small" data-visual-id={`compare-${n.replace("utility:", "")}`}>
            <Icon name={n} size="large" assistiveText={n} />
          </li>
        ))}
      </ul>
    </section>
  );
}
