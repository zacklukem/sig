import type { Signal } from "signal-polyfill";
import type { Hook } from "../hooks/tracking";
import { deref } from "../ref";
import type { SigDom } from "../sig-dom";
import type { ComponentChild, NormalComponentChild, ComponentChildren } from "../types";

export const textNodeType = Symbol("text");

function isNormalChild(child: ComponentChild): child is NormalComponentChild {
  return child !== null && child !== undefined && typeof child !== "boolean";
}

export function normalizeChildren(children: ComponentChildren): NormalComponentChild[] {
  if (Array.isArray(children)) {
    return children.flat().map(deref).filter(isNormalChild);
  } else if (isNormalChild(children)) {
    return [deref(children)];
  } else {
    return [];
  }
}

export type SigNode = SigDom<ChildNode>;
export type RenderSignal = Signal.Computed<NormalComponentChild[]>;

export type RenderedNode = {
  type: symbol | string | object;
  renderSignal?: RenderSignal;
  dom: SigNode;
  props: object;
  children: RenderedNode[];
  key?: unknown;
  watcher?: Signal.subtle.Watcher;
  domSignal?: Signal.Computed<unknown>;
  removed?: boolean;
  hooks?: Hook[];
};

export function removeNode(node: RenderedNode) {
  if (node.watcher && node.renderSignal) {
    node.watcher.unwatch(node.renderSignal);
  }
  node.removed = true;
  node.hooks?.forEach((hook) => hook?.onUnmount?.());
  node.dom.remove();
}

export function insertNode(parentDom: SigNode, node: SigNode, nextSibling: SigNode | undefined) {
  if (nextSibling) {
    parentDom.insertBefore(node, nextSibling);
  } else {
    parentDom.appendChild(node);
  }
}
