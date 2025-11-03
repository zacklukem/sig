import { Signal } from "signal-polyfill";
import { mark } from "./tracking";

export function $unmount(fn: () => void) {
  mark({ onUnmount: fn });
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
