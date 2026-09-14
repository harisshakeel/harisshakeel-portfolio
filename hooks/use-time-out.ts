"use client";

import { useEffect, DependencyList } from "react";

export function useTimeOut({
  callback,
  duration = 100,
  deps = [],
}: {
  callback: () => void;
  duration?: number;
  deps?: DependencyList;
}) {
  useEffect(() => {
    const timeout = setTimeout(callback, duration);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
