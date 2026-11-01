import type { ComponentType } from "react";
import type { RecordData } from "../config/types";
import { SplitApprovalCalculator } from "./claim/widgets/SplitApprovalCalculator";

/** Props every object widget receives (rendered in a modal by the record page). */
export type ObjectWidgetProps = {
  apiName: string;
  record: RecordData;
  /** Captured back-end state (?state=error). */
  captured: boolean;
  onClose: () => void;
};

/**
 * Object-specific widgets referenced from config (`ActionConfig` kind "widget"). Composed only from design-system
 * components; used where a screen has no generic shape (Figma CL7 Split Approval calculator).
 */
export const WIDGETS: Record<string, ComponentType<ObjectWidgetProps>> = {
  splitApproval: SplitApprovalCalculator,
};
