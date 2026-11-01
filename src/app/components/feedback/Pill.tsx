import { ButtonIcon } from "../buttons/ButtonIcon";
import { Avatar, type AvatarContent } from "./Avatar";
import { Icon, type ObjectIconName } from "../icons/Icon";
import { cx } from "../utils/cx";

export type PillProps = {
  label: string;
  /** Link pill (Figma "Related to: Antoinette Mitcham"); omit both for a plain pill. */
  href?: string;
  onClick?: () => void;
  /** Object icon or avatar before the label. */
  iconName?: ObjectIconName;
  avatar?: AvatarContent;
  /** Shows the ✕ remove button. */
  onRemove?: () => void;
  error?: boolean;
};

/** SLDS Pills blueprint (span.slds-pill(.slds-pill_link) › icon container › label / action › remove). */
export function Pill({ label, href, onClick, iconName, avatar, onRemove, error }: PillProps) {
  const isLink = Boolean(href || onClick);
  return (
    <span className={cx("slds-pill", isLink && "slds-pill_link", error && "slds-has-error")}>
      {iconName ? (
        <span className="slds-pill__icon_container">
          <Icon name={iconName} />
        </span>
      ) : avatar ? (
        <span className="slds-pill__icon_container">
          <Avatar content={avatar} size="x-small" shape="circle" />
        </span>
      ) : null}
      {isLink ? (
        <a
          href={href ?? "#"}
          className="slds-pill__action"
          title={label}
          onClick={(e) => {
            if (!href) e.preventDefault();
            onClick?.();
          }}
        >
          <span className="slds-pill__label">{label}</span>
        </a>
      ) : (
        <span className="slds-pill__label" title={label}>
          {label}
        </span>
      )}
      {onRemove ? <ButtonIcon iconName="utility:close" assistiveText={`Remove ${label}`} title="Remove" className="slds-pill__remove" onClick={onRemove} /> : null}
    </span>
  );
}
