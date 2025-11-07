import { Signal } from "signal-polyfill";

const deletedSignal = Symbol();
const reactiveProxyHandlers: ProxyHandler<Record<PropertyKey, Signal.State<unknown>>> = {
  set(target, p, v) {
    target[p] ??= new Signal.State(v);
    target[p]!.set(v);
    return true;
  },
  get(target, p) {
    target[p] ??= new Signal.State(deletedSignal);
    return target[p].get();
  },
  deleteProperty(target, p) {
    target[p]?.set(deletedSignal);
    return true;
  },
  has(target, p) {
    target[p] ??= new Signal.State(deletedSignal);
    return target[p].get() !== deletedSignal;
  },
  ownKeys(target) {
    // TODO: track key add/remove
    return Signal.subtle.untrack(() =>
      Reflect.ownKeys(target).filter((key) => target[key]?.get() !== deletedSignal)
    );
  },
  getOwnPropertyDescriptor(target, p) {
    // TODO: track key add/remove
    return Signal.subtle.untrack(() => {
      if (target[p] && target[p].get() !== deletedSignal) {
        return {
          configurable: true,
          enumerable: true,
          writable: true,
        };
      }
    });
  },
};

export function buildReactiveObject(): object {
  return new Proxy({}, reactiveProxyHandlers);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function assignDiff(target: any, source: any) {
  for (const key of new Set(Object.keys(target)).difference(new Set(Object.keys(source)))) {
    delete target[key];
  }
  Object.assign(target, source);
}
