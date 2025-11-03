import { isVNode } from "./brands";
import { deref, isRef } from "./ref";
import { diffArrays } from "diff";
import type { ComponentChild, ComponentChildren, NormalComponentChild, VNode } from "./types";
import { initSigDom, SigDom } from "./sig-dom";
import { Signal } from "signal-polyfill";
import { trackHooks, type Hook } from "./hooks/tracking";

const textNodeType = "text";

function isNormalChild(child: ComponentChild): child is NormalComponentChild {
  return child !== null && child !== undefined && typeof child !== "boolean";
}

function normalizeChildren(children: ComponentChildren): NormalComponentChild[] {
  if (Array.isArray(children)) {
    return children.flat().map(deref).filter(isNormalChild);
  } else if (isNormalChild(children)) {
    return [deref(children)];
  } else {
    return [];
  }
}

type SigNode = SigDom<ChildNode>;

type RenderSignal = Signal.Computed<NormalComponentChild[]>;

type RenderedNode = {
  type: string | object;
  renderSignal?: RenderSignal;
  dom: SigNode;
  props: object;
  children: RenderedNode[];
  key?: unknown;
  watcher?: Signal.subtle.Watcher;
  removed?: boolean;
  hooks?: Hook[];
};

function removeNode(node: RenderedNode) {
  if (node.watcher && node.renderSignal) {
    node.watcher.unwatch(node.renderSignal);
  }
  node.removed = true;
  node.hooks?.forEach((hook) => hook?.onUnmount?.());
  node.dom.remove();
}

function insertNode(parentDom: SigNode, node: SigNode, nextSibling: SigNode | undefined) {
  if (nextSibling) {
    parentDom.insertBefore(node, nextSibling);
  } else {
    parentDom.appendChild(node);
  }
}

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

function nodeKey(node: { type: string | object; key?: unknown }): string | symbol | object {
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

function updateAttributes(props: object, el: SigDom<Element>) {
  for (const [key, value] of Object.entries(props)) {
    if (key === "ref" && isRef(value)) {
      value.$ = el;
    } else if (key in el) {
      // @ts-expect-error anyish
      el[key] = value == null ? "" : value;
    }
    // TODO: inline styles
    else if (key.startsWith("on")) {
      const eventName = key.slice(2).toLowerCase();
      const oldValue = el[SigDom.listeners][eventName];

      if (oldValue !== value) {
        if (typeof oldValue === "function") {
          // @ts-expect-error its a function
          el.removeEventListener(eventName, oldValue);
        }
        if (typeof value === "function") {
          el.addEventListener(eventName, value);
        }
      }

      el[SigDom.listeners][eventName] = value;
    } else {
      if (typeof value === "function") {
        // never serialize functions as attribute values
      } else if (value != null && (value !== false || key[4] == "-")) {
        el.setAttribute(key, key == "popover" && value == true ? "" : value);
      } else {
        el.removeAttribute(key);
      }
    }
  }
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

function buildReactiveObject(): object {
  return new Proxy({} as Record<string | symbol, Signal.State<unknown>>, {
    set(target, p, v) {
      if (p in target) {
        target[p]!.set(v);
      } else {
        target[p] = new Signal.State(v);
      }
      return true;
    },
    get(target, p) {
      return target[p]?.get();
    },
  });
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

      // TODO: remove old prop keys
      Object.assign(props, newNode.props);

      hooks = oldNode.hooks!;
    } else {
      props = buildReactiveObject();

      // TODO: remove old prop keys
      Object.assign(props, newNode.props);

      // TODO: watch for hooks
      let renderFn: () => ComponentChildren;
      [renderFn, hooks] = trackHooks(() => component(props));

      renderSignal = new Signal.Computed(() => {
        return normalizeChildren(renderFn());
      });
    }

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
    const newChildren = normalizeChildren(rawChildren);

    let el: SigDom<Element>;

    {
      if (oldNode) {
        el = oldNode.dom as SigDom<Element>;
      } else {
        el = initSigDom(document.createElement(newNode.type));
      }

      updateAttributes(props, el);

      if (!oldNode) {
        insertNode(parentDom, el, nextSibling);
      }
    }

    return {
      type: newNode.type,
      dom: el,
      props: props,
      children: diffChildren(el, newChildren, oldNode?.children ?? [], undefined),
    };
  }
}
