import { vnodeBrand } from "./brands";
import type { JSX } from "./jsx-runtime";
import type { FunctionComponent, VNode } from "./types";

export function h<T extends keyof JSX.IntrinsicElements>(
  type: T,
  props: JSX.IntrinsicElements[T],
  key?: unknown,
): VNode<JSX.IntrinsicElements[T]>;
export function h<P extends object>(type: FunctionComponent<P>, props: P, key?: unknown): VNode<P>;
export function h(type: string | FunctionComponent<unknown>, props: object, key?: unknown): VNode {
  return {
    [vnodeBrand]: true,
    type,
    props,
    key,
  };
}
