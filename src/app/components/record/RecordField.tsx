import type { ReactNode } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { Avatar, type AvatarContent } from "../feedback/Avatar";
import { Checkbox } from "../forms/Checkbox";
import { Icon, type UtilityIconName } from "../icons/Icon";
import { HelpText } from "../overlays/HelpText";
import { cx } from "../utils/cx";

export type RecordFieldValue =
  | { type: "text"; text: string; multiline?: boolean }
  | { type: "link"; text: string; href?: string; onClick?: () => void }
  /** Lookup (owner / created by): avatar + link + optional ", timestamp". */
  | { type: "lookup"; text: string; avatar?: AvatarContent; timestamp?: string; href?: string; onClick?: () => void }
  /** Read-only checkbox: ✓ when checked (Figma), disabled empty checkbox when unchecked. */
  | { type: "checkbox"; checked: boolean }
  | { type: "custom"; content: ReactNode };

/** "horizontal" = label left (record detail, Figma); "stacked" = label above (caps summary grids, modals). */
export type RecordFieldLayout = "horizontal" | "stacked";

export type RecordFieldProps = {
  label: string;
  /** Omit for an empty value. */
  value?: RecordFieldValue;
  layout?: RecordFieldLayout;
  helpText?: string;
  required?: boolean;
  /** Inline-edit pencil (hint icon, visible on hover in SLDS). */
  onEdit?: () => void;
  /** Extra action icon (Figma: change owner). */
  action?: { iconName: UtilityIconName; assistiveText: string; onClick: () => void };
  /** Caps label (Figma claim summary cards). */
  capsLabel?: boolean;
  /** Spans both columns of a two-column RecordFieldGrid (address, description). */
  fullWidth?: boolean;
};

function Value({ value }: { value: RecordFieldValue }) {
  switch (value.type) {
    case "text":
      return value.multiline ? <span className="slds-text-longform">{value.text}</span> : <>{value.text}</>;
    case "link":
      return (
        <a
          href={value.href ?? "#"}
          onClick={(e) => {
            if (!value.href) e.preventDefault();
            value.onClick?.();
          }}
        >
          {value.text}
        </a>
      );
    case "lookup":
      return (
        <>
          {value.avatar ? <Avatar content={value.avatar} size="x-small" className="slds-m-right_xx-small" /> : null}
          <a
            href={value.href ?? "#"}
            onClick={(e) => {
              if (!value.href) e.preventDefault();
              value.onClick?.();
            }}
          >
            {value.text}
          </a>
          {value.timestamp ? <>, {value.timestamp}</> : null}
        </>
      );
    case "checkbox":
      return value.checked ? (
        <Icon name="utility:check" size="x-small" tone="default" assistiveText="True" />
      ) : (
        <Checkbox wrapper="none" label="False" hideLabel disabled checked={false} />
      );
    case "custom":
      return <>{value.content}</>;
  }
}

/**
 * SLDS Form Element — record detail (view mode) blueprint: readonly form element with static value,
 * optional help text and inline-edit pencil.
 */
export function RecordField({ label, value, layout = "horizontal", helpText, required, onEdit, action, capsLabel, fullWidth }: RecordFieldProps) {
  return (
    <div
      className={cx(
        "slds-form-element slds-form-element_readonly",
        (onEdit || action) && "slds-form-element_edit",
        layout === "horizontal" ? "slds-form-element_horizontal" : "slds-form-element_stacked",
        "slds-hint-parent",
        fullWidth && "slds-form-element_1-col",
      )}
    >
      <span className={cx("slds-form-element__label", capsLabel && "slds-text-title_caps")}>
        {required ? (
          <abbr className="slds-required" title="required" aria-hidden="true">
            *{" "}
          </abbr>
        ) : null}
        {label}
      </span>
      {helpText ? <HelpText content={helpText} /> : null}
      <div className="slds-form-element__control">
        <div className={cx("slds-form-element__static", value?.type === "text" && value.multiline && "slds-text-longform")}>
          {value ? <Value value={value} /> : null}
        </div>
        {action ? (
          <ButtonIcon iconName={action.iconName} assistiveText={action.assistiveText} iconClassName="slds-button__icon_hint" onClick={action.onClick} />
        ) : null}
        {onEdit ? <ButtonIcon iconName="utility:edit" assistiveText={`Edit: ${label}`} iconClassName="slds-button__icon_hint" onClick={onEdit} /> : null}
      </div>
    </div>
  );
}
