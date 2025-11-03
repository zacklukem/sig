import { Signal } from "signal-polyfill";
import { mark } from "./tracking";
import { computed } from "../signal";
import type { Ref } from "../ref";

export function $unmount(fn: () => void) {
  mark({ onUnmount: fn });
}

const contextProviders = new Map<string | symbol, Ref<unknown>[]>();

export function $provide<T>(key: string | symbol, fn: () => T) {
  const signal = computed(fn);

  mark({
    beforeRender() {
      if (!contextProviders.has(key)) {
        contextProviders.set(key, []);
      }
      contextProviders.get(key)?.push(signal);
    },
    afterRender() {
      contextProviders.get(key)?.pop();
    },
  });

  return signal;
}

export function $consume<T>(key: string | symbol): Ref<T | undefined> {
  const stack = contextProviders.get(key) ?? [];

  if (stack.length === 0) {
    throw new Error(`Provider ${String(key)} is not available in this context`);
  }

  return stack[stack?.length - 1] as Ref<T | undefined>;
}

export function $effect(fn: () => (() => void) | void) {
  let cleanup: (() => void) | undefined | void;
  const signal = new Signal.Computed(() => {
    if (cleanup) Signal.subtle.untrack(cleanup);
    return fn();
  });
  let pending = false;

  const watcher = new Signal.subtle.Watcher(() => {
    if (!pending) {
      pending = true;
      queueMicrotask(() => {
        pending = false;
        cleanup = signal.get();
        watcher.watch();
      });
    }
  });
  watcher.watch(signal);
  cleanup = signal.get();

  mark({
    onUnmount() {
      if (cleanup) cleanup();
      watcher.unwatch(signal);
    },
  });
}
