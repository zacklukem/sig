import { vnodeBrand } from "./brands";
import * as JSX from "./jsx";
import type { ComponentChildren, FunctionComponent, VNode } from "./types";

export * as JSX from "./jsx";

export function jsx<T extends keyof JSX.IntrinsicElements>(
  type: T,
  props: JSX.IntrinsicElements[T],
  key?: unknown
): VNode<JSX.IntrinsicElements[T]>;
export function jsx<P extends object>(
  type: FunctionComponent<P>,
  props: P,
  key?: unknown
): VNode<P>;
export function jsx(
  type: string | FunctionComponent<unknown>,
  props: object,
  key?: unknown
): VNode {
  return {
    [vnodeBrand]: true,
    type,
    props,
    key,
  };
}

export const jsxs = jsx;
export const jsxDEV = jsx;

export function Fragment(props: { children?: ComponentChildren }) {
  return () => props.children;
}
