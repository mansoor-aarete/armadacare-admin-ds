import { useState } from "react";
import { getObjectConfig } from "../../objects";
import { Button } from "../components/buttons/Button";
import { RadioGroup } from "../components/forms/RadioGroup";
import { Modal } from "../components/overlays/Modal";
import { useConsole } from "../console/ConsoleContext";
import { newUrl } from "../console/urls";

export type RecordTypePickerProps = { apiName: string };

/** "New <Object>" record-type choice (radio list with descriptions) in a console tab. */
export function RecordTypePicker({ apiName }: RecordTypePickerProps) {
  const config = getObjectConfig(apiName);
  const con = useConsole();
  const types = config.recordTypes ?? [];
  const [value, setValue] = useState<string | null>(config.defaultRecordType ?? types[0]?.value ?? null);

  return (
    <Modal open inline size="medium" heading={`New ${config.label}`} onClose={() => con.closeTab()}>
      <RadioGroup
        legend="Select a record type"
        hideLegend
        options={types.map((t) => ({ value: t.value, label: t.label, description: t.description }))}
        value={value}
        onChange={setValue}
      />
      <div className="slds-grid slds-grid_align-center slds-m-top_large">
        <Button label="Cancel" onClick={() => con.closeTab()} />
        <Button
          label="Next"
          variant="brand"
          className="slds-m-left_xx-small"
          disabled={!value}
          onClick={() => value && con.navigate(newUrl(apiName, value), { replace: true })}
        />
      </div>
    </Modal>
  );
}
