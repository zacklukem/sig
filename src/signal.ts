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
