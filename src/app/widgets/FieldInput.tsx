import { useEffect, useId, useState, type ReactNode } from "react";
import type { AddressValue, FieldDef, FieldValue, LocationValue, LookupValue } from "../../config/types";
import { OBJECTS } from "../../objects";
import { recordName, searchRecords } from "../../services/records";
import { Checkbox } from "../components/forms/Checkbox";
import { Combobox, type LookupOption } from "../components/forms/Combobox";
import { CompoundField } from "../components/forms/CompoundField";
import { Datepicker } from "../components/forms/Datepicker";
import { DualListbox } from "../components/forms/DualListbox";
import { FormElement, type FormElementLayout } from "../components/forms/FormElement";
import { Input } from "../components/forms/Input";
import { Textarea } from "../components/forms/Textarea";
import { Timepicker } from "../components/forms/Timepicker";
import { addressParts, asAddress, asLocation, isLookup } from "./fieldValues";

export type FieldInputProps = {
  /** Field key — also the DOM id, so error links can focus the control. */
  fieldKey: string;
  def: FieldDef;
  value: FieldValue | undefined;
  onChange: (value: FieldValue) => void;
  error?: string;
  layout?: FormElementLayout;
  /** Lookups: object switcher with these object api names (Figma Share: "User"). */
  objectSwitcher?: string[];
};

const DEPENDENCIES: ReactNode = (
  <a href="#" onClick={(e) => e.preventDefault()}>
    View all dependencies
  </a>
);

/** Lookup control: searches the target object through the records service. */
function LookupInput({ fieldKey, def, value, onChange, error, layout, objectSwitcher }: FieldInputProps) {
  const [target, setTarget] = useState(def.lookup?.objectApiName ?? "");
  const current = isLookup(value) ? value : null;
  const [results, setResults] = useState<LookupValue[]>([]);
  const [term, setTerm] = useState("");
  useEffect(() => {
    if (!OBJECTS[target]) return;
    let alive = true;
    searchRecords(target, term).then((rows) => {
      if (alive) setResults(rows.map((r) => ({ id: r.id, name: recordName(target, r), objectApiName: target })));
    });
    return () => {
      alive = false;
    };
  }, [target, term]);
  const iconName = OBJECTS[target]?.iconName ?? "standard:custom";
  const objectLabel = OBJECTS[target]?.label ?? target;
  const all = current && !results.some((r) => r.id === current.id) ? [current, ...results] : results;
  const options: LookupOption[] = all.map((r) => ({ value: r.id, label: r.name, iconName, objectLabel }));
  return (
    <Combobox
      variant="lookup"
      id={fieldKey}
      label={def.label}
      required={def.required}
      fieldLevelHelp={def.helpText}
      error={error}
      layout={layout}
      placeholder={def.lookup?.placeholder}
      options={options}
      value={current?.id ?? null}
      onSearchChange={setTerm}
      objectSwitcher={
        objectSwitcher
          ? {
              options: objectSwitcher.map((o) => ({ value: o, label: OBJECTS[o]?.label ?? o, iconName: OBJECTS[o]?.iconName ?? "standard:custom" })),
              value: target,
              onChange: setTarget,
            }
          : undefined
      }
      onChange={(id) => onChange(all.find((r) => r.id === id) ?? null)}
    />
  );
}

/** Edit control for one field, chosen by field type (record edit mode and create forms). */
export function FieldInput(props: FieldInputProps) {
  const { fieldKey, def, value, onChange, error, layout = "horizontal" } = props;
  const uid = useId();
  const common = { label: def.label, required: def.required, error, layout, fieldLevelHelp: def.helpText };
  const text = typeof value === "string" ? value : typeof value === "number" ? String(value) : "";

  switch (def.type) {
    case "lookup":
      return <LookupInput {...props} layout={layout} />;
    case "picklist":
      return (
        <Combobox
          id={fieldKey}
          {...common}
          helpText={def.dependencies ? DEPENDENCIES : undefined}
          options={[{ value: "", label: "--None--" }, ...(def.options ?? []).map((o) => ({ value: o, label: o }))]}
          value={text}
          onChange={(v) => onChange(v ? v : null)}
        />
      );
    case "multipicklist":
      return (
        <DualListbox
          label={def.label}
          sourceLabel="Available"
          selectedLabel="Chosen"
          required={def.required}
          error={error}
          responsive
          options={(def.options ?? []).map((o) => ({ value: o, label: o }))}
          value={Array.isArray(value) ? value : []}
          onChange={(v) => onChange(v)}
        />
      );
    case "checkbox":
      return (
        <FormElement inputId={fieldKey} label={def.label} layout={layout} fieldLevelHelp={def.helpText} helpText={def.dependencies ? DEPENDENCIES : undefined}>
          <Checkbox wrapper="none" id={fieldKey} label={def.label} hideLabel checked={value === true} onChange={(c) => onChange(c)} />
        </FormElement>
      );
    case "date":
      return <Datepicker id={fieldKey} {...common} value={text || null} onChange={(v) => onChange(v)} />;
    case "datetime": {
      const [date = "", time = ""] = text.split("T");
      const join = (d: string | null, t: string | null) => onChange(d ? `${d}T${t ?? "00:00"}` : null);
      return (
        <CompoundField
          id={fieldKey}
          label={def.label}
          required={def.required}
          error={error}
          layout={layout}
          fieldLevelHelp={def.helpText}
          rows={[
            [
              { content: <Datepicker label="Date" value={date || null} onChange={(d) => join(d, time || null)} /> },
              { content: <Timepicker label="Time" value={time || null} onChange={(t) => join(date || null, t)} /> },
            ],
          ]}
        />
      );
    }
    case "address": {
      const a = asAddress(value);
      const parts = addressParts(def);
      const set = (part: keyof AddressValue, v: string) => onChange({ ...a, [part]: v });
      const input = (i: number, size: "4-of-6" | "2-of-6") => ({
        size,
        content: <Input label={parts[i].label} value={a[parts[i].part] ?? ""} onChange={(v) => set(parts[i].part, v)} />,
      });
      return (
        <CompoundField
          id={fieldKey}
          label={def.label}
          address
          layout={layout}
          error={error}
          rows={[
            [{ size: "1-of-1", content: <Input label="Address Search" placeholder="Search Address" iconRight="utility:search" /> }],
            [{ size: "1-of-1", content: <Textarea label={parts[0].label} value={a.street ?? ""} onChange={(v) => set("street", v)} /> }],
            [input(1, "4-of-6"), input(2, "2-of-6")],
            [input(3, "4-of-6"), input(4, "2-of-6")],
          ]}
        />
      );
    }
    case "location": {
      const loc = asLocation(value);
      const set = (k: keyof LocationValue, v: string) => onChange({ ...loc, [k]: v });
      return (
        <CompoundField
          id={fieldKey}
          label={def.label}
          layout={layout}
          error={error}
          rows={[
            [
              { content: <Input label="Latitude" value={loc.latitude ?? ""} onChange={(v) => set("latitude", v)} /> },
              { content: <Input label="Longitude" value={loc.longitude ?? ""} onChange={(v) => set("longitude", v)} /> },
            ],
          ]}
        />
      );
    }
    case "textarea":
      return <Textarea id={fieldKey} {...common} value={text} onChange={(v) => onChange(v)} />;
    case "number":
    case "currency":
    case "percent":
      return (
        <Input
          id={fieldKey}
          {...common}
          inputMode="decimal"
          value={text}
          onChange={(v) => {
            const n = Number(v.replace(/[$,%\s]/g, ""));
            onChange(v.trim() === "" ? null : Number.isNaN(n) ? v : n);
          }}
        />
      );
    case "phone":
      return <Input id={fieldKey} type="tel" {...common} value={text} onChange={(v) => onChange(v)} />;
    case "url":
      return <Input id={fieldKey} type="url" {...common} value={text} onChange={(v) => onChange(v)} />;
    case "email":
      return <Input id={fieldKey} type="email" {...common} value={text} onChange={(v) => onChange(v)} />;
    default:
      return <Input id={fieldKey || uid} {...common} value={text} onChange={(v) => onChange(v)} />;
  }
}

