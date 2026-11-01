import { useId, useState } from "react";
import { ButtonIcon } from "../buttons/ButtonIcon";
import { Tooltip } from "./Tooltip";

export type HelpTextProps = {
  /** Tooltip text. */
  content: string;
  /** Screen-reader label of the info button (default "Help"). */
  assistiveText?: string;
  /** Start with the tooltip visible (showcase / screenshots). */
  defaultOpen?: boolean;
};

/** SLDS Help Text (form-element icon + info button-icon + tooltip on hover / focus). */
export function HelpText({ content, assistiveText = "Help", defaultOpen = false }: HelpTextProps) {
  const id = useId();
  const tooltipId = `${id}-tooltip`;
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="slds-form-element__icon">
      <ButtonIcon
        iconName="utility:info"
        assistiveText={assistiveText}
        title=""
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(defaultOpen)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(defaultOpen)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      />
      {open ? (
        <Tooltip id={tooltipId} nubbin="bottom-left" placement="above">
          {content}
        </Tooltip>
      ) : null}
    </div>
  );
}
