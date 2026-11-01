import { useId, useState, type KeyboardEvent, type MouseEvent } from "react";
import { IconSvg } from "../icons/IconSvg";
import { cx } from "../utils/cx";
import { describedBy, helpId } from "../utils/formIds";

export type DualListboxOption = {
  value: string;
  label: string;
  /** Locked options cannot be moved out of the selected list. */
  locked?: boolean;
};

export type DualListboxProps = {
  label: string;
  /** Column headings (Figma: "Available" / "Chosen"). */
  sourceLabel?: string;
  selectedLabel?: string;
  options: DualListboxOption[];
  /** Values in the selected (right) list — controlled. */
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  /** Keyboard instructions read to screen readers. */
  assistiveInstructions?: string;
  /** Start with these values highlighted (showcase / screenshots). */
  defaultHighlighted?: string[];
  /** Blueprint "responsive" columns: share the available width instead of the fixed 15rem (Figma record forms). */
  responsive?: boolean;
  /** Rows visible before the lists scroll (as lightning-dual-listbox `size`). Omit for the SLDS default height. */
  size?: number;
};

type Side = "source" | "selected";

/** Plain listbox row (0.5rem padding + 1.25rem line) and the list's vertical padding, for `size`. */
const OPTION_HEIGHT_REM = 2.25;
const LIST_PADDING_REM = 1;

/** SLDS Dueling Picklist blueprint (two listboxes with move buttons; reorder buttons not used in the inventory). */
export function DualListbox({
  label,
  sourceLabel = "Available",
  selectedLabel = "Chosen",
  options,
  value,
  onChange,
  required,
  disabled,
  error,
  assistiveInstructions = "Press space bar when on an item, to move it within the list. Cmd/Ctrl plus left and right arrow keys, to move items between lists.",
  defaultHighlighted = [],
  responsive,
  size,
}: DualListboxProps) {
  const uid = useId();
  const groupLabelId = `${uid}-group-label`;
  const dragLabelId = `${uid}-drag-label`;
  const [highlighted, setHighlighted] = useState<string[]>(defaultHighlighted);
  const [live, setLive] = useState("");

  const source = options.filter((o) => !value.includes(o.value));
  const selected = value.map((v) => options.find((o) => o.value === v)).filter((o): o is DualListboxOption => Boolean(o));

  const move = (to: Side) => {
    const from = to === "selected" ? source : selected;
    const moving = from.filter((o) => highlighted.includes(o.value) && !(to === "source" && o.locked)).map((o) => o.value);
    if (moving.length === 0) return;
    onChange(to === "selected" ? [...value, ...moving] : value.filter((v) => !moving.includes(v)));
    setLive(`${moving.length} item(s) moved to ${to === "selected" ? selectedLabel : sourceLabel}`);
  };

  const onOptionClick = (e: MouseEvent, v: string) => {
    if (disabled) return;
    setHighlighted((h) => (e.metaKey || e.ctrlKey ? (h.includes(v) ? h.filter((x) => x !== v) : [...h, v]) : [v]));
  };

  const onListKey = (e: KeyboardEvent<HTMLUListElement>, list: DualListboxOption[]) => {
    if (disabled || list.length === 0) return;
    const idx = Math.max(0, list.findIndex((o) => highlighted.includes(o.value)));
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = list[(idx + (e.key === "ArrowDown" ? 1 : -1) + list.length) % list.length];
      setHighlighted([next.value]);
    } else if ((e.metaKey || e.ctrlKey) && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      e.preventDefault();
      move(e.key === "ArrowRight" ? "selected" : "source");
    }
  };

  const column = (side: Side, heading: string, list: DualListboxOption[]) => {
    const headingId = `${uid}-${side}-label`;
    return (
      <div className={cx("slds-dueling-list__column", responsive && "slds-dueling-list__column_responsive")}>
        <span className="slds-form-element__label" id={headingId}>
          {heading}
        </span>
        <div
          className={cx("slds-dueling-list__options", disabled && "slds-is-disabled")}
          style={size ? { height: `${size * OPTION_HEIGHT_REM + LIST_PADDING_REM}rem` } : undefined}
        >
          <ul
            aria-describedby={dragLabelId}
            aria-disabled={disabled ? "true" : undefined}
            aria-labelledby={headingId}
            aria-multiselectable="true"
            className="slds-listbox slds-listbox_vertical"
            role="listbox"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => onListKey(e, list)}
          >
            {list.map((o) => {
              const isHighlighted = highlighted.includes(o.value);
              return (
                <li key={o.value} role="presentation" className="slds-listbox__item">
                  <div
                    className={cx(
                      "slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline",
                      isHighlighted && "slds-is-selected",
                    )}
                    aria-selected={isHighlighted ? "true" : "false"}
                    aria-disabled={o.locked && side === "selected" ? "true" : undefined}
                    role="option"
                    tabIndex={-1}
                    onClick={(e) => onOptionClick(e, o.value)}
                  >
                    <span className="slds-media__body">
                      <span className="slds-truncate" title={o.label}>
                        {o.label}
                      </span>
                    </span>
                    {o.locked && side === "selected" ? (
                      <span className="slds-media__figure slds-media__figure_reverse">
                        <span className="slds-icon_container slds-current-color" title="Locked item">
                          <IconSvg name="utility:lock" className="slds-icon slds-icon_x-small" />
                          <span className="slds-assistive-text"> : item cannot be removed from {heading}</span>
                        </span>
                      </span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const moveButton = (to: Side) => {
    const text = `Move Selection to ${to === "selected" ? selectedLabel : sourceLabel}`;
    // Nothing can move in this direction: the list it moves from is empty (or only holds locked items).
    const nothingToMove = to === "selected" ? source.length === 0 : selected.every((o) => o.locked);
    return (
      <button
        type="button"
        className="slds-button slds-button_icon slds-button_icon-container"
        title={text}
        disabled={disabled || nothingToMove}
        onClick={() => move(to)}
      >
        <IconSvg name={to === "selected" ? "utility:right" : "utility:left"} className="slds-button__icon" />
        <span className="slds-assistive-text">{text}</span>
      </button>
    );
  };

  return (
    <div className={cx("slds-form-element", error && "slds-has-error")} role="group" aria-labelledby={groupLabelId} aria-describedby={describedBy(uid, Boolean(error))}>
      <span id={groupLabelId} className="slds-form-element__label slds-form-element__legend">
        {required ? (
          <abbr className="slds-required" title="required">
            *{" "}
          </abbr>
        ) : null}
        {label}
      </span>
      <div className="slds-form-element__control">
        <div className="slds-dueling-list">
          <div className="slds-assistive-text" aria-live="assertive">
            {live}
          </div>
          <div className="slds-assistive-text" id={dragLabelId}>
            {assistiveInstructions}
          </div>
          {column("source", sourceLabel, source)}
          <div className="slds-dueling-list__column">
            {moveButton("selected")}
            {moveButton("source")}
          </div>
          {column("selected", selectedLabel, selected)}
        </div>
      </div>
      {error ? (
        <div className="slds-form-element__help" id={helpId(uid)}>
          {error}
        </div>
      ) : null}
    </div>
  );
}
