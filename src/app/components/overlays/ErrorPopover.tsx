import { Popover } from "./Popover";
import type { TooltipNubbin } from "./Tooltip";

export type ErrorPopoverField = { label: string; onClick?: () => void; href?: string };

export type ErrorPopoverProps = {
  /** Fields that need attention (links jump to them). */
  fields: ErrorPopoverField[];
  heading?: string;
  /** Intro line above the list. */
  intro?: string;
  /** Page-level errors without a field. */
  messages?: string[];
  onClose: () => void;
  /** Figma: bottom (points at the footer's error button). */
  nubbin?: TooltipNubbin;
};

/**
 * Record-edit error popover (Figma "We hit a snag."): SLDS Popover error variant with the list of fields to review.
 * FormFooter positions it above its error button.
 */
export function ErrorPopover({
  fields,
  heading = "We hit a snag.",
  intro = "Review the following fields",
  messages = [],
  onClose,
  nubbin = "bottom",
}: ErrorPopoverProps) {
  return (
    <Popover heading={heading} variant="error" nubbin={nubbin} onClose={onClose}>
      {messages.map((m) => (
        <p key={m} className="slds-m-bottom_x-small">
          {m}
        </p>
      ))}
      {fields.length ? (
        <>
          <p className="slds-text-title_bold">{intro}</p>
          <ul className="slds-list_dotted">
            {fields.map((f) => (
              <li key={f.label}>
                <a
                  href={f.href ?? "#"}
                  onClick={(e) => {
                    if (!f.href) e.preventDefault();
                    f.onClick?.();
                  }}
                >
                  {f.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </Popover>
  );
}
