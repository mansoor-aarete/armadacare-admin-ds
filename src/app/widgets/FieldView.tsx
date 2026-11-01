import profileAvatar from "@salesforce-ux/design-system/assets/images/profile_avatar_96.png";
import type { FieldActionKind, FieldDef, FieldValue, LookupValue } from "../../config/types";
import type { AvatarContent } from "../components/feedback/Avatar";
import type { UtilityIconName } from "../components/icons/Icon";
import { RecordField, type RecordFieldLayout, type RecordFieldValue } from "../components/record/RecordField";
import { formatDateTime, formatValue, isAudit, isLink, isLookup } from "./fieldValues";

export type FieldViewProps = {
  def: FieldDef;
  value: FieldValue | undefined;
  layout?: RecordFieldLayout;
  fullWidth?: boolean;
  /** Inline-edit pencil (omitted for read-only fields). */
  onEdit?: () => void;
  onAction?: (action: FieldActionKind) => void;
  onOpenLookup?: (lookup: LookupValue) => void;
  /** Caps label (summary cards). */
  caps?: boolean;
};

const ACTION_ICON: Record<FieldActionKind, { iconName: UtilityIconName; assistiveText: string }> = {
  changeOwner: { iconName: "utility:change_owner", assistiveText: "Change Owner" },
  changeRecordType: { iconName: "utility:change_record_type", assistiveText: "Change Record Type" },
};

/** Users show the default Salesforce profile picture (Figma lookups). */
function avatarOf(lookup: LookupValue): AvatarContent | undefined {
  return lookup.objectApiName === "User" ? { kind: "image", src: profileAvatar, alt: lookup.name } : undefined;
}

/** Field value → RecordField value, by field type. */
export function toRecordFieldValue(def: FieldDef, v: FieldValue | undefined, onOpenLookup?: (l: LookupValue) => void): RecordFieldValue | undefined {
  if (def.type === "checkbox") return { type: "checkbox", checked: v === true };
  if (v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0) || def.type === "image") return undefined;
  if (isAudit(v)) return { type: "lookup", text: v.by.name, avatar: avatarOf(v.by), timestamp: formatDateTime(v.at), onClick: () => onOpenLookup?.(v.by) };
  if (isLookup(v)) return { type: "lookup", text: v.name, avatar: avatarOf(v), onClick: () => onOpenLookup?.(v) };
  if (isLink(v)) return { type: "link", text: v.label, href: v.url };
  const text = formatValue(def, v);
  if (def.type === "url") return { type: "link", text, href: text };
  if (def.type === "phone") return { type: "link", text, href: `tel:${text}` };
  if (def.type === "email") return { type: "link", text, href: `mailto:${text}` };
  return { type: "text", text, multiline: def.type === "textarea" || def.type === "address" };
}

/** Read-only display of one field (record detail, read-only fields in forms). */
export function FieldView({ def, value, layout = "horizontal", fullWidth, onEdit, onAction, onOpenLookup, caps }: FieldViewProps) {
  const action = def.action && onAction ? { ...ACTION_ICON[def.action], onClick: () => onAction(def.action as FieldActionKind) } : undefined;
  return (
    <RecordField
      label={def.label}
      value={toRecordFieldValue(def, value, onOpenLookup)}
      layout={layout}
      helpText={def.helpText}
      fullWidth={fullWidth}
      capsLabel={caps}
      action={action}
      onEdit={!def.readOnly && !def.action ? onEdit : undefined}
    />
  );
}
