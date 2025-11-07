import { isVNode } from "../brands";
import { diffArrays } from "diff";
import type { ComponentChildren, NormalComponentChild, VNode } from "../types";
import { initSigDom, SigDom } from "../sig-dom";
import { Signal } from "signal-polyfill";
import { trackHooks, type Hook } from "../hooks/tracking";
import { assignDiff } from "../utils";
import { updateAttributes } from "./updateAttributes";
import {
  type SigNode,
  type RenderedNode,
  insertNode,
  textNodeType,
  removeNode,
  type RenderSignal,
  normalizeChildren,
} from "./utils";
import { reactive } from "../signal";

function diffChild(
  parentDom: SigNode,
  newChild: NormalComponentChild,
  oldChild: RenderedNode | undefined,
  nextSibling: SigNode | undefined
): RenderedNode {
  if (isVNode(newChild)) {
    return diff(parentDom, newChild, oldChild, nextSibling);
  } else {
    const value = newChild.toString();
    let textNode: SigDom<Text>;

    if (oldChild) {
      textNode = oldChild.dom as SigDom<Text>;
      textNode.nodeValue = value;
    } else {
      textNode = initSigDom(document.createTextNode(value));
      insertNode(parentDom, textNode, nextSibling);
    }

    return {
      type: textNodeType,
      dom: textNode,
      props: { value },
      children: [],
    };
  }
}

function nodeKey(node: {
  type: symbol | string | object;
  key?: unknown;
}): string | symbol | object {
  return node.key ? Symbol.for(node.key.toString()) : node.type;
}

function childKey(child: NormalComponentChild): string | symbol | object {
  if (isVNode(child)) {
    return nodeKey(child);
  } else {
    return textNodeType;
  }
}

function diffChildren(
  parentDom: SigNode,
  newChildren: NormalComponentChild[],
  oldChildren: RenderedNode[],
  nextSibling: SigNode | undefined
): RenderedNode[] {
  const output: RenderedNode[] = [];
  const oldKeys = oldChildren.map(nodeKey);
  const newKeys = newChildren.map(childKey);

  const changes = diffArrays(oldKeys, newKeys, { oneChangePerToken: true });

  let iOld = 0;
  let iNew = 0;
  for (const change of changes) {
    if (change.added) {
      const ns = oldChildren[iOld]?.dom ?? nextSibling;
      output.push(diffChild(parentDom, newChildren[iNew]!, undefined, ns));
      iNew++;
    } else if (change.removed) {
      removeNode(oldChildren[iOld]!);
      iOld++;
    } else {
      const ns = oldChildren[iOld + 1]?.dom ?? nextSibling;
      output.push(diffChild(parentDom, newChildren[iNew]!, oldChildren[iOld]!, ns));
      iOld++;
      iNew++;
    }
  }

  return output;
}

// TODO: move to shared state
const watchState = {
  updated: new Map<
    RenderedNode,
    {
      parentDom: SigNode;
      vnode: VNode;
      renderedNode: RenderedNode;
      nextSibling: SigNode | undefined;
    }
  >(),
};

function rerenderTask() {
  function filterNonRootNodes(node: RenderedNode) {
    // TODO: benchmark and think about algorithm performance
    node.children.forEach((child) => {
      watchState.updated.delete(child);
      filterNonRootNodes(child);
    });
  }

  Array.from(watchState.updated.keys()).forEach(filterNonRootNodes);

  watchState.updated.values().forEach(({ parentDom, vnode, renderedNode, nextSibling }) => {
    if (!renderedNode.removed) {
      diff(parentDom, vnode, renderedNode, nextSibling);
    }
  });

  watchState.updated = new Map();
}

export function diff(
  parentDom: SigNode,
  newNode: VNode,
  oldNode?: RenderedNode,
  nextSibling?: SigNode
): RenderedNode {
  if (typeof newNode.type === "function") {
    const component = newNode.type;

    let hooks: Hook[];
    let props: object;
    let renderSignal: RenderSignal;
    if (oldNode) {
      renderSignal = oldNode.renderSignal!;
      oldNode.watcher?.unwatch(renderSignal);

      props = oldNode.props;

      assignDiff(props, newNode.props);

      hooks = oldNode.hooks!;
    } else {
      props = reactive(newNode.props);

      let renderFn: () => ComponentChildren;
      [renderFn, hooks] = trackHooks(() => component(props));

      renderSignal = new Signal.Computed(() => {
        return normalizeChildren(renderFn());
      });
    }

    hooks?.forEach((hook) => hook.beforeRender?.());
    const newChildren = renderSignal.get();

    const renderedNode: RenderedNode = {
      type: newNode.type,
      dom: parentDom,
      props,
      children: diffChildren(parentDom, newChildren, oldNode?.children ?? [], nextSibling),
      renderSignal,
      key: newNode.key,
      hooks,
    };
    hooks?.forEach((hook) => hook.afterRender?.());

    renderedNode.watcher = new Signal.subtle.Watcher(() => {
      watchState.updated.set(renderedNode, {
        parentDom,
        vnode: newNode,
        renderedNode,
        nextSibling,
      });

      if (watchState.updated.size === 1) {
        queueMicrotask(rerenderTask);
      }
    });
    renderedNode.watcher.watch(renderSignal);

    return renderedNode;
  } else {
    // @ts-expect-error children may be undefined
    const { children: rawChildren, ...props } = newNode.props;

    let el: SigDom<Element>;

    if (oldNode) {
      el = oldNode.dom as SigDom<Element>;
      if (oldNode.domSignal) {
        oldNode.watcher?.unwatch(oldNode.domSignal);
      }
    } else {
      el = initSigDom(document.createElement(newNode.type));
    }

    const domSignal = new Signal.Computed(() => {
      updateAttributes(props, el);
      return normalizeChildren(rawChildren);
    });
    const newChildren = domSignal.get();

    if (!oldNode) {
      insertNode(parentDom, el, nextSibling);
    }

    const renderedNode: RenderedNode = {
      type: newNode.type,
      dom: el,
      props: props,
      children: diffChildren(el, newChildren, oldNode?.children ?? [], undefined),
      domSignal,
    };

    renderedNode.watcher = new Signal.subtle.Watcher(() => {
      watchState.updated.set(renderedNode, {
        parentDom,
        vnode: newNode,
        renderedNode,
        nextSibling,
      });

      if (watchState.updated.size === 1) {
        queueMicrotask(rerenderTask);
      }
    });
    renderedNode.watcher.watch(domSignal);

    return renderedNode;
  }
}
