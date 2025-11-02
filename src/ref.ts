export interface Ref<T> {
  $: T;
}

export function isRef<T>(value: unknown): value is Ref<T> {
  return typeof value === "object" && value !== null && "$" in value;
}

export function asRef<T>(value: RefOrValue<T>): Ref<T> {
  if (isRef(value)) {
    return value;
  }

  return {
    get $(): T {
      return value;
    },
    set $(_: T) {},
  };
}

export function deref<T>(value: RefOrValue<T>): T {
  if (isRef(value)) {
    return value.$;
  }

  return value;
}

export type RefOrValue<T> = T | Ref<T>;
