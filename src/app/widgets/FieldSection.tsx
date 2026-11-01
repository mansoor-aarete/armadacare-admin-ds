import { useState, type ReactNode } from "react";
import type { FieldActionKind, FieldValue, LookupValue, ObjectConfig, SectionConfig, SectionRow } from "../../config/types";
import { EmptyState } from "../components/feedback/EmptyState";
import { ExpandableSection } from "../components/layout/ExpandableSection";
import { RecordFieldGrid } from "../components/record/RecordFieldGrid";
import { FieldInput } from "./FieldInput";
import { FieldView } from "./FieldView";

/** "view" = record detail (pencils); "edit" = editable fields become inputs (inline edit, create forms). */
export type FieldSectionMode = "view" | "edit";

export type FieldSectionProps = {
  config: ObjectConfig;
  section: SectionConfig;
  values: Record<string, FieldValue>;
  mode: FieldSectionMode;
  errors?: Record<string, string>;
  onChange?: (key: string, value: FieldValue) => void;
  /** Pencil clicked on a field (view mode). */
  onEdit?: (key: string) => void;
  onFieldAction?: (key: string, action: FieldActionKind) => void;
  onOpenLookup?: (lookup: LookupValue) => void;
};

const isFull = (row: SectionRow): row is { full: string } => !Array.isArray(row);

/** One layout section from config: a two-column field grid (+ full-width rows, embedded region, custom links). */
export function FieldSection({ config, section, values, mode, errors = {}, onChange, onEdit, onFieldAction, onOpenLookup }: FieldSectionProps) {
  const [open, setOpen] = useState(true);

  const cell = (key: string | null, fullWidth = false): ReactNode => {
    if (!key) return null;
    const def = config.fields[key];
    if (!def) throw new Error(`${config.apiName}: unknown field ${key} in section ${section.id}`);
    if (mode === "edit" && !def.readOnly) {
      return <FieldInput key={key} fieldKey={key} def={def} value={values[key]} error={errors[key]} onChange={(v) => onChange?.(key, v)} />;
    }
    return (
      <FieldView
        key={key}
        def={def}
        value={values[key]}
        fullWidth={fullWidth}
        onEdit={mode === "view" && onEdit ? () => onEdit(key) : undefined}
        onAction={onFieldAction ? (a) => onFieldAction(key, a) : undefined}
        onOpenLookup={onOpenLookup}
      />
    );
  };

  // Consecutive two-column rows share one grid; full-width rows get a one-column grid.
  const grids: ReactNode[] = [];
  let pairs: Array<ReactNode | null> = [];
  const flush = () => {
    if (pairs.length) grids.push(<RecordFieldGrid key={grids.length} fields={pairs} />);
    pairs = [];
  };
  for (const row of section.rows ?? []) {
    if (isFull(row)) {
      flush();
      grids.push(<RecordFieldGrid key={grids.length} columns={1} fields={[cell(row.full, true)]} />);
    } else {
      pairs.push(cell(row[0]), cell(row[1]));
    }
  }
  flush();

  const body = (
    <>
      {section.embed ? (
        <div className="slds-p-horizontal_small slds-p-bottom_small">
          <EmptyState variant="region" regionLabel={section.embed.label} />
        </div>
      ) : null}
      {section.links ? (
        <RecordFieldGrid
          columns={3}
          fields={section.links.map((l) => (
            <div key={l.label} className="slds-p-horizontal_small slds-p-vertical_x-small">
              <a href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </div>
          ))}
        />
      ) : null}
      {grids}
    </>
  );

  return section.title ? (
    <ExpandableSection title={section.title} open={open} onToggle={setOpen}>
      {body}
    </ExpandableSection>
  ) : (
    <div className="slds-m-bottom_small">{body}</div>
  );
}
