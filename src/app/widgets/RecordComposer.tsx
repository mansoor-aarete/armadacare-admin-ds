import { useState } from "react";
import type { ActionConfig, FieldValue } from "../../config/types";
import { getObjectConfig } from "../../objects";
import { Button } from "../components/buttons/Button";
import { Pill } from "../components/feedback/Pill";
import { Input } from "../components/forms/Input";
import { RichTextEditor } from "../components/forms/RichTextEditor";
import { Icon } from "../components/icons/Icon";
import { DockedComposer } from "../components/overlays/DockedComposer";

export type RecordComposerProps = {
  action: Extract<ActionConfig, { kind: "composer" }>;
  parentApiName: string;
  parentName: string;
  initialValues?: Record<string, FieldValue>;
  /** Done: save the draft. */
  onDone: (values: Record<string, FieldValue>) => void;
  onClose: () => void;
  onOpenParent?: () => void;
};

/** Docked composer for a related record (Figma C5 note): title, rich text, "Related to" pill, Delete · Share · Add to Records · Done. */
export function RecordComposer({ action, parentApiName, parentName, initialValues = {}, onDone, onClose, onOpenParent }: RecordComposerProps) {
  const child = getObjectConfig(action.objectApiName);
  const [title, setTitle] = useState(String(initialValues[action.titleField] ?? ""));
  const [body, setBody] = useState(String(initialValues[action.bodyField] ?? ""));
  const [minimized, setMinimized] = useState(false);
  const html = (text: string) => text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  return (
    <DockedComposer
      title={title || action.emptyTitle}
      iconName={child.iconName}
      minimized={minimized}
      onMinimize={() => setMinimized(true)}
      onExpand={() => setMinimized(false)}
      onClose={onClose}
      footer={
        <div className="slds-grid slds-grow">
          <Button label="Delete" onClick={onClose} />
          <div className="slds-col_bump-left">
            <Button label="Share" />
            <Button label="Add to Records" />
            <Button label="Done" onClick={() => onDone({ [action.titleField]: title || action.emptyTitle, [action.bodyField]: html(body) })} />
          </div>
        </div>
      }
    >
      <div className="slds-p-horizontal_small slds-p-top_small slds-p-bottom_xx-small slds-grid slds-grid_vertical slds-grow">
        <div className="slds-grid slds-grid_vertical-align-end slds-m-bottom_small">
          <div className="slds-col">
            <Input label={child.fields[action.titleField]?.label ?? "Title"} value={title} onChange={setTitle} />
          </div>
          <div className="slds-p-left_small slds-p-bottom_x-small slds-grid slds-grid_vertical-align-center">
            <Icon name="utility:lock" size="x-small" tone="default" className="slds-m-right_xx-small" />
            <span>Visibility Set by Record</span>
          </div>
        </div>
        <RichTextEditor label="Compose text" defaultValue={body} onChange={setBody} onInsertImage={() => undefined} fill autoFocus />
        <div className="slds-grid slds-grid_vertical-align-center slds-m-top_xx-small slds-p-left_medium">
          <span className="slds-text-body_small slds-text-color_weak slds-m-right_small">Related to</span>
          <Pill label={parentName} iconName={getObjectConfig(parentApiName).iconName} onClick={onOpenParent} />
        </div>
      </div>
    </DockedComposer>
  );
}
