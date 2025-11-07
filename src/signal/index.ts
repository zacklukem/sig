import { Signal } from "signal-polyfill";
import type { Ref } from "../ref";
export * from "./reactive";

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

const signalCleanup = Symbol();
let pending = false;

const watcher = new Signal.subtle.Watcher(() => {
  if (!pending) {
    pending = true;
    queueMicrotask(() => {
      pending = false;

      updateWatched();
    });
  }
});

function updateWatched() {
  for (const signal of watcher.getPending()) {
    // @ts-expect-error using custom property
    signal[signalCleanup] = signal.get();
  }
  watcher.watch();
}

export function effect(fn: () => (() => void) | void) {
  const signal = new Signal.Computed(() => {
    // @ts-expect-error using custom property
    if (signal[signalCleanup]) Signal.subtle.untrack(signal[signalCleanup]);
    return fn();
  });
  watcher.watch(signal);
  // @ts-expect-error using custom property
  signal[signalCleanup] = signal.get();

  return () => {
    // @ts-expect-error using custom property
    if (signal[signalCleanup]) signal[signalCleanup]();
    watcher.unwatch(signal);
  };
}

export function batch<T>(fn: () => T): T {
  pending = true;
  const value = fn();
  pending = false;
  updateWatched();
  return value;
}
