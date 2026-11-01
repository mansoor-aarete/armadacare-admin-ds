import { useCssVar } from "./useCssVar";

export type ColorSwatchProps = {
  /** CSS custom property, e.g. "--ac-color-brand". */
  token: string;
  role: string;
  source: string;
};

export function ColorSwatch({ token, role, source }: ColorSwatchProps) {
  const value = useCssVar(token);
  return (
    <li className="slds-grid slds-grid_vertical-align-center slds-m-bottom_small" data-visual-id={`swatch${token}`}>
      <div className="slds-box slds-m-right_medium" style={{ background: `var(${token})` }} aria-hidden="true" />
      <div>
        <div className="slds-text-title_bold">{token}</div>
        <div className="slds-text-body_small">{role}</div>
        <div className="slds-text-body_small slds-text-color_weak">
          {source} · computed: <span data-computed-value>{value}</span>
        </div>
      </div>
    </li>
  );
}
