import { diff } from "./diff";
import { initSigDom } from "./sig-dom";
import type { VNode } from "./types";

export * from "./jsx-runtime";
export * from "./types";
export * from "./ref";
export * from "./signal";
export * from "./diff";

export function render(parentDom: ChildNode, newNode: VNode) {
  diff(initSigDom(parentDom), newNode);
}
