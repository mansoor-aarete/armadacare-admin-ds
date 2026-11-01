import { useId } from "react";
import { cx } from "../utils/cx";

export type VerticalNavItem = { id: string; label: string; href?: string };
export type VerticalNavSection = { id: string; title: string; items: VerticalNavItem[] };

export type VerticalNavProps = {
  /** Accessible name of the navigation (e.g. "Reports"). */
  label: string;
  sections: VerticalNavSection[];
  activeId: string;
  onSelect: (id: string) => void;
  /** Grey background variant (.slds-nav-vertical_shade). */
  shaded?: boolean;
  compact?: boolean;
  /** Small caps section titles (Figma Reports; .slds-text-title_caps). Default true. */
  capsTitles?: boolean;
};

/** SLDS Vertical Navigation blueprint (nav.slds-nav-vertical › sections › titled lists of actions). */
export function VerticalNav({ label, sections, activeId, onSelect, shaded, compact, capsTitles = true }: VerticalNavProps) {
  const uid = useId();
  return (
    <nav className={cx("slds-nav-vertical", compact && "slds-nav-vertical_compact", shaded && "slds-nav-vertical_shade")} aria-label={label}>
      {sections.map((s) => {
        const headerId = `${uid}-${s.id}`;
        return (
          <div key={s.id} className="slds-nav-vertical__section">
            <h2 id={headerId} className={cx("slds-nav-vertical__title", capsTitles && "slds-text-title_caps")}>
              {s.title}
            </h2>
            <ul aria-describedby={headerId}>
              {s.items.map((item) => {
                const active = item.id === activeId;
                return (
                  <li key={item.id} className={cx("slds-nav-vertical__item", active && "slds-is-active")}>
                    <a
                      href={item.href ?? "#"}
                      className="slds-nav-vertical__action"
                      aria-current={active ? "page" : undefined}
                      onClick={(e) => {
                        if (!item.href) e.preventDefault();
                        onSelect(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
