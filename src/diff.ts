import { isVNode } from "./brands";
import { deref } from "./ref";
import { diffArrays } from "diff";
import type { ComponentChild, ComponentChildren, NormalComponentChild, VNode } from "./types";
import { initSigDom, SigDom } from "./sig-dom";

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

type RenderedNode = {
  type: string | object;
  dom: SigNode;
  props: object;
  children: RenderedNode[];
  key?: unknown;
};

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
      oldChildren[iOld]?.dom.remove();
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
    // TODO: inline styles
    if (key.startsWith("on")) {
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

export function diff(
  parentDom: SigNode,
  newNode: VNode,
  oldNode?: RenderedNode,
  nextSibling?: SigNode
): RenderedNode {
  if (typeof newNode.type === "function") {
    const component = newNode.type;

    const props = Object.assign({}, newNode.props);
    const renderFn = component(props);

    // todo: watch
    const newChildren = normalizeChildren(renderFn());
    // endwatch

    return {
      type: newNode.type,
      dom: parentDom,
      props,
      children: diffChildren(parentDom, newChildren, oldNode?.children ?? [], nextSibling),
      key: newNode.key,
    };
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
