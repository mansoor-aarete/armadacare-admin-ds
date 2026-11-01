import { useId, useRef, useState } from "react";
import { ButtonGroup } from "../buttons/ButtonGroup";
import { ButtonIcon } from "../buttons/ButtonIcon";
import type { UtilityIconName } from "../icons/Icon";
import { cx } from "../utils/cx";
import { describedBy, helpId } from "../utils/formIds";

type ToolbarCommand = { command: string; iconName: UtilityIconName; label: string };

const FORMAT_TEXT: ToolbarCommand[] = [
  { command: "bold", iconName: "utility:bold", label: "Bold" },
  { command: "italic", iconName: "utility:italic", label: "Italic" },
  { command: "underline", iconName: "utility:underline", label: "Underline" },
  { command: "strikeThrough", iconName: "utility:strikethrough", label: "Strike Through" },
];
const FORMAT_BODY: ToolbarCommand[] = [
  { command: "insertUnorderedList", iconName: "utility:richtextbulletedlist", label: "Bulleted List" },
  { command: "insertOrderedList", iconName: "utility:richtextnumberedlist", label: "Numbered List" },
  { command: "indent", iconName: "utility:richtextindent", label: "Indent" },
  { command: "outdent", iconName: "utility:richtextoutdent", label: "Outdent" },
];

export type RichTextEditorProps = {
  label: string;
  hideLabel?: boolean;
  /** Initial HTML (uncontrolled editor). */
  defaultValue?: string;
  /** Called with the editor's HTML after every edit. */
  onChange?: (html: string) => void;
  placeholder?: string;
  /** "Add Image" button (Figma composer). */
  onInsertImage?: () => void;
  disabled?: boolean;
  error?: string;
  /** Grow to fill a flex column (docked composer body). */
  fill?: boolean;
};

/**
 * SLDS Rich Text Editor blueprint (toolbar of button-group lists + contenteditable textarea).
 * Formatting uses the browser's editing commands (client-side only).
 */
export function RichTextEditor({ label, hideLabel, defaultValue = "", onChange, placeholder = "Compose text", onInsertImage, disabled, error, fill }: RichTextEditorProps) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const areaRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [empty, setEmpty] = useState(defaultValue.trim() === "");

  const run = (command: string) => {
    areaRef.current?.focus();
    document.execCommand(command);
    const html = areaRef.current?.innerHTML ?? "";
    setEmpty((areaRef.current?.textContent ?? "") === "");
    onChange?.(html);
  };

  const group = (commands: ToolbarCommand[], groupLabel: string) => (
    <ButtonGroup kind="list" label={groupLabel}>
      {commands.map((c, i) => (
        <ButtonIcon
          key={c.command}
          iconName={c.iconName}
          assistiveText={c.label}
          variant="border-filled"
          disabled={disabled}
          tabIndex={i === 0 ? 0 : -1}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => run(c.command)}
        />
      ))}
    </ButtonGroup>
  );

  return (
    <div className={cx("slds-form-element", error && "slds-has-error", fill && "slds-grid slds-grid_vertical slds-grow")}>
      <span id={labelId} className={cx("slds-form-element__label", hideLabel && "slds-assistive-text")}>
        {label}
      </span>
      <div className={cx("slds-form-element__control", fill && "slds-grid slds-grid_vertical slds-grow")}>
        <div className={cx("slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap", focused && "slds-has-focus", fill && "slds-grow")}>
          <div role="toolbar" aria-label={`${label} formatting`} className="slds-rich-text-editor__toolbar slds-shrink-none">
            {group(FORMAT_TEXT, "Format text")}
            {group(FORMAT_BODY, "Format body")}
            {onInsertImage ? (
              <ButtonGroup kind="list" label="Insert content">
                <ButtonIcon iconName="utility:image" assistiveText="Add Image" variant="border-filled" disabled={disabled} tabIndex={-1} onClick={onInsertImage} />
              </ButtonGroup>
            ) : null}
          </div>
          <div className={cx("slds-rich-text-editor__textarea slds-grid", fill && "slds-grow")}>
            <div
              ref={areaRef}
              aria-labelledby={labelId}
              aria-describedby={describedBy(uid, Boolean(error))}
              aria-multiline="true"
              role="textbox"
              aria-placeholder={placeholder}
              contentEditable={!disabled}
              suppressContentEditableWarning
              className={cx("slds-rich-text-area__content slds-grow", empty && "slds-text-color_weak")}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onInput={(e) => {
                setEmpty((e.currentTarget.textContent ?? "") === "");
                onChange?.(e.currentTarget.innerHTML);
              }}
              dangerouslySetInnerHTML={{ __html: defaultValue }}
            />
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
