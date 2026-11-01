import { Icon, type ObjectIconName } from "../icons/Icon";
import { ICONS } from "../icons/registry";
import { cx } from "../utils/cx";

/** x-small 1.25rem · small 1.5rem · medium 2rem · large 3rem (SLDS has no smaller avatar). */
export type AvatarSize = "x-small" | "small" | "medium" | "large";
export type AvatarShape = "square" | "circle";

export type AvatarContent =
  | { kind: "image"; src: string; alt: string }
  /** Initials on the colour of an object icon (e.g. "standard:user"). */
  | { kind: "initials"; initials: string; title: string; iconName: ObjectIconName }
  | { kind: "icon"; iconName: ObjectIconName; assistiveText: string };

export type AvatarProps = {
  content: AvatarContent;
  size?: AvatarSize;
  shape?: AvatarShape;
  className?: string;
};

const SIZE_CLASS: Record<AvatarSize, string | undefined> = {
  "x-small": "slds-avatar_x-small",
  small: "slds-avatar_small",
  medium: "slds-avatar_medium",
  large: "slds-avatar_large",
};

/** SLDS Avatar blueprint (image, initials or object icon; square or circle). */
export function Avatar({ content, size = "medium", shape = "square", className }: AvatarProps) {
  return (
    <span className={cx("slds-avatar", SIZE_CLASS[size], shape === "circle" && "slds-avatar_circle", className)}>
      {content.kind === "image" ? <img alt={content.alt} src={content.src} title={content.alt} /> : null}
      {content.kind === "initials" ? (
        <abbr className={cx("slds-avatar__initials", ICONS[content.iconName].containerClass)} title={content.title}>
          {content.initials}
        </abbr>
      ) : null}
      {content.kind === "icon" ? <Icon name={content.iconName} assistiveText={content.assistiveText} /> : null}
    </span>
  );
}
