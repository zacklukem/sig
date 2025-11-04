import { Signal } from "signal-polyfill";
import type { Ref } from "./ref";

export function signal<T>(): Ref<T | undefined>;
export function signal<T>(value: T): Ref<T>;
export function signal(value?: unknown): Ref<unknown> {
  const signal = new Signal.State(value);

  return {
    get $() {
      return signal.get();
    },
    set $(newValue) {
      signal.set(newValue);
    },
  };
}

export function computed<T>(computation: () => T): Ref<T> {
  const signal = new Signal.Computed(computation);

  return {
    get $() {
      return signal.get();
    },
    set $(newValue) {},
  };
}

export function effect(fn: () => (() => void) | void) {
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

  return () => {
    if (cleanup) cleanup();
    watcher.unwatch(signal);
  };
}
