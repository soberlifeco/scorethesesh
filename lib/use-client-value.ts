"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a value that only exists in the browser (the URL, the clock) without
 * a hydration mismatch: the server render uses `serverValue`, the browser
 * uses `getClientValue()`. `getClientValue` must return a stable primitive.
 */
export function useClientValue<T>(getClientValue: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, getClientValue, () => serverValue);
}
