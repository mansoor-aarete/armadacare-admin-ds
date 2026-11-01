import { useId, useState, type DragEvent } from "react";
import { IconSvg } from "../icons/IconSvg";
import { cx } from "../utils/cx";
import { describedBy, helpId } from "../utils/formIds";

/**
 * "files" = compact inline drop zone (SLDS files); "area" = full-width drop area with the button above the hint
 * (Figma Files related list — SLDS images layout); "images" = image drop zone.
 */
export type FileSelectorVariant = "files" | "area" | "images";

export type FileSelectorProps = {
  /** Group label; omit inside a card that already names the files (Figma: "Files (0)"). */
  label?: string;
  variant?: FileSelectorVariant;
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
  /** Button text (default "Upload Files" / "Upload Image"). */
  buttonLabel?: string;
  /** Drop hint (default "or Drop Files" / "or Drop Image"). */
  dropLabel?: string;
};

/** SLDS File Selector blueprint (dropzone › hidden input + label body with button and drop text). */
export function FileSelector({
  label,
  variant = "files",
  onFiles,
  accept,
  multiple = true,
  disabled,
  error,
  buttonLabel,
  dropLabel,
}: FileSelectorProps) {
  const uid = useId();
  const inputId = `${uid}-input`;
  const labelId = `${uid}-label`;
  const [dragOver, setDragOver] = useState(false);
  const noun = variant === "images" ? "Image" : "Files";

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (!disabled) onFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <div className={cx("slds-form-element", error && "slds-has-error")} role="group" aria-labelledby={label ? labelId : undefined} aria-label={label ? undefined : `Upload ${noun}`}>
      {label ? (
        <span className="slds-form-element__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <div className="slds-form-element__control">
        <div className={cx("slds-file-selector", variant === "files" ? "slds-file-selector_files" : "slds-file-selector_images")}>
          <div
            className={cx("slds-file-selector__dropzone", dragOver && "slds-has-drag-over")}
            onDragOver={(e) => {
              e.preventDefault();
              if (!disabled) setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            <input
              className="slds-file-selector__input slds-assistive-text"
              type="file"
              id={inputId}
              accept={accept}
              multiple={multiple}
              disabled={disabled}
              aria-describedby={describedBy(uid, Boolean(error))}
              onChange={(e) => onFiles(Array.from(e.target.files ?? []))}
            />
            <label className="slds-file-selector__body" htmlFor={inputId}>
              <span className="slds-file-selector__button slds-button slds-button_neutral">
                <IconSvg name="utility:upload" className="slds-button__icon slds-button__icon_left" />
                {buttonLabel ?? `Upload ${noun}`}
              </span>
              <span className="slds-file-selector__text slds-medium-show">{dropLabel ?? `or Drop ${noun}`}</span>
            </label>
          </div>
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
