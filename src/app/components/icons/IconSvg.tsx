import { ICONS, type IconName } from "./registry";

export type IconSvgProps = {
  name: IconName;
  /** SLDS classes for the <svg> element, e.g. "slds-icon slds-icon_small" or "slds-button__icon". */
  className: string;
};

/**
 * Bare SLDS icon <svg>. Used inside blueprints that own the wrapper (Icon, buttons, inputs).
 * Replaces the blueprint's <use xlink:href> with the verbatim path markup from the SLDS package,
 * because sprite files cannot be served in Figma Make.
 */
export function IconSvg({ name, className }: IconSvgProps) {
  const icon = ICONS[name];
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox={icon.viewBox}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}
