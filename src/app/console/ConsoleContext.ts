import { createContext, useContext } from "react";
import type { FieldValue } from "../../config/types";

/** Composer request: the parent record and the composer action of its object. */
export type ComposerRequest = { apiName: string; actionId: string; parentId: string; values: Record<string, FieldValue> };

/** Console actions available to every template (workspace tabs, navigation, shared list state). */
export type ConsoleApi = {
  /** Go to a console URL; record / new / hierarchy URLs open or focus their workspace tab. */
  navigate: (url: string, options?: { replace?: boolean }) => void;
  openRecord: (apiName: string, id: string) => void;
  /** Close a workspace tab (default: the active one) and show the next tab or the object home. */
  closeTab: (tabKey?: string) => void;
  /** Close the active tab and open `url` in its place (new record saved → record tab). */
  replaceTab: (url: string) => void;
  /** Time the list views were last refreshed (ms) — "Updated 2 minutes ago". */
  listUpdatedAt: number;
  refreshList: () => void;
  /** Captured back-end state (`?state=error`): regions show the errors / loading the Figma capture shows. */
  captured: boolean;
  /** Today's ISO date ("$today" defaults; a scenario can pin it to the capture date). */
  today: string;
  openComposer: (request: ComposerRequest) => void;
};

export const ConsoleContext = createContext<ConsoleApi | null>(null);

export function useConsole(): ConsoleApi {
  const api = useContext(ConsoleContext);
  if (!api) throw new Error("useConsole must be used inside the console");
  return api;
}

/** "a few seconds ago" / "2 minutes ago" (Lightning list view meta). */
export function updatedAgo(since: number, now: number = Date.now()): string {
  const minutes = Math.floor((now - since) / 60000);
  if (minutes < 1) return "a few seconds ago";
  if (minutes === 1) return "a minute ago";
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  return hours === 1 ? "an hour ago" : `${hours} hours ago`;
}
