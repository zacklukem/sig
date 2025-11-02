// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SigDom {
  export const listeners = Symbol("listeners");
}

export type SigDom<E extends Node> = E & {
  [SigDom.listeners]: Record<string, object>;
};

export function initSigDom<E extends Node>(e: E): SigDom<E> {
  if (SigDom.listeners in e) {
    return e as SigDom<E>;
  }
  return Object.assign(e, {
    [SigDom.listeners]: {},
  });
}
