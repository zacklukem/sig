import { diff } from "./diff";
import { initSigDom, SigDom } from "./sig-dom";
import type { VNode } from "./types";

export * from "./jsx-runtime";
export * from "./types";
export * from "./ref";
export * from "./signal";
export * from "./diff";
export * from "./hooks";

export function render(parentDom: ChildNode, newNode: VNode) {
  const dom = initSigDom(parentDom);

  dom[SigDom.renderedNode] = diff(dom, newNode, dom[SigDom.renderedNode]);
}
