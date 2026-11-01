import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "../utils/cx";

export type TabsItem = {
  id: string;
  label: string;
  /** Panel content. */
  content: ReactNode;
};

/** "default" = 13 px (cards); "medium" = 16 px record tabs (Figma Related / Details); "large". */
export type TabsSize = "default" | "medium" | "large";

export type TabsProps = {
  items: TabsItem[];
  activeId: string;
  onSelect: (id: string) => void;
  size?: TabsSize;
  /** Tabs inside a card (.slds-tabs_card). */
  card?: boolean;
};

const SIZE_CLASS: Record<TabsSize, string | undefined> = {
  default: undefined,
  medium: "slds-tabs_medium",
  large: "slds-tabs_large",
};

/** SLDS Tabs (default) blueprint with roving focus (←/→, Home/End). */
export function Tabs({ items, activeId, onSelect, size = "default", card }: TabsProps) {
  const uid = useId();
  const listRef = useRef<HTMLUListElement>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const idx = items.findIndex((t) => t.id === activeId);
    let next = -1;
    if (e.key === "ArrowRight") next = (idx + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    if (next < 0) return;
    e.preventDefault();
    onSelect(items[next].id);
    listRef.current?.querySelectorAll<HTMLAnchorElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div className={cx("slds-tabs_default", SIZE_CLASS[size], card && "slds-tabs_card")}>
      <ul className="slds-tabs_default__nav" role="tablist" ref={listRef} onKeyDown={onKeyDown}>
        {items.map((t) => {
          const active = t.id === activeId;
          return (
            <li key={t.id} className={cx("slds-tabs_default__item", active && "slds-is-active")} title={t.label} role="presentation">
              <a
                className="slds-tabs_default__link"
                href="#"
                role="tab"
                tabIndex={active ? 0 : -1}
                aria-selected={active ? "true" : "false"}
                aria-controls={`${uid}-${t.id}`}
                id={`${uid}-${t.id}__item`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(t.id);
                }}
              >
                {t.label}
              </a>
            </li>
          );
        })}
      </ul>
      {items.map((t) => (
        <div
          key={t.id}
          id={`${uid}-${t.id}`}
          className={cx("slds-tabs_default__content", t.id === activeId ? "slds-show" : "slds-hide")}
          role="tabpanel"
          aria-labelledby={`${uid}-${t.id}__item`}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
