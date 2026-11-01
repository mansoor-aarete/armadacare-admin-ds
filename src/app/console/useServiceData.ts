import { useCallback, useEffect, useState } from "react";
import { onDataChange } from "../../services/records";

/**
 * Loads data from an async service function and reloads it after any record change (save, delete …).
 * `data` is undefined while the first load runs.
 */
export function useServiceData<T>(load: () => Promise<T>, deps: ReadonlyArray<unknown>): { data: T | undefined; reload: () => void } {
  const [data, setData] = useState<T | undefined>(undefined);
  const [tick, setTick] = useState(0);
  const reload = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => onDataChange(reload), [reload]);

  useEffect(() => {
    let alive = true;
    load().then((d) => {
      if (alive) setData(d);
    });
    return () => {
      alive = false;
    };
    // `load` is recreated every render; `deps` lists what it depends on.
  }, [...deps, tick]);

  return { data, reload };
}
