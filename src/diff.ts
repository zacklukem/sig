import { isVNode } from "./brands";
import { asRef, deref } from "./ref";
import { diffArrays } from "diff";
import type {
  ComponentChild,
  ComponentChildren,
  NormalComponentChild,
  VNode,
} from "./types";

const textNodeType = "text";

function isNormalChild(child: ComponentChild): child is NormalComponentChild {
  return child !== null && child !== undefined && typeof child !== "boolean";
}

function normalizeChildren(
  children: ComponentChildren
): NormalComponentChild[] {
  if (Array.isArray(children)) {
    return children.flat().map(deref).filter(isNormalChild);
  } else if (isNormalChild(children)) {
    return [deref(children)];
  } else {
    return [];
  }
}

type RenderedNode = {
  type: string | Function;
  dom: ChildNode;
  props: object;
  children: RenderedNode[];
  key?: unknown;
};

function insertNode(
  dom: ChildNode,
  node: ChildNode,
  nextSibling: ChildNode | undefined
) {
  if (nextSibling) {
    dom.insertBefore(node, nextSibling);
  } else {
    dom.appendChild(node);
  }
}

function diffChild(
  dom: ChildNode,
  child: NormalComponentChild,
  prev: RenderedNode | undefined,
  nextSibling: ChildNode | undefined
): RenderedNode {
  if (isVNode(child)) {
    return diff(dom, child, prev, nextSibling);
  } else {
    const value = child.toString();
    let textNode: Text;

    if (prev) {
      textNode = prev.dom as Text;
      textNode.nodeValue = value;
    } else {
      textNode = document.createTextNode(value);
      insertNode(dom, textNode, nextSibling);
    }

    return {
      type: textNodeType,
      dom: textNode,
      props: { value },
      children: [],
    };
  }
}

function nodeKey(child: {
  type: string | Function;
  key?: unknown;
}): string | symbol | Function {
  return child.key ? Symbol.for(child.key.toString()) : child.type;
}

function childKey(child: NormalComponentChild): string | symbol | Function {
  if (isVNode(child)) {
    return nodeKey(child);
  } else {
    return textNodeType;
  }
}

function diffChilds(
  dom: ChildNode,
  newChildren: NormalComponentChild[],
  oldChildren: RenderedNode[],
  nextSibling: ChildNode | undefined
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
      output.push(diffChild(dom, newChildren[iNew]!, undefined, ns));
      iNew++;
    } else if (change.removed) {
      oldChildren[iOld]?.dom.remove();
      iOld++;
    } else {
      const ns = oldChildren[iOld + 1]?.dom ?? nextSibling;
      output.push(diffChild(dom, newChildren[iNew]!, oldChildren[iOld]!, ns));
      iOld++;
      iNew++;
    }
  }

  return output;
}

export function diff(
  dom: ChildNode,
  node: VNode,
  prev?: RenderedNode,
  nextSibling?: ChildNode
): RenderedNode {
  if (typeof node.type === "function") {
    const component = node.type;

    const props = Object.assign({}, node.props);
    const renderFn = component(props);

    // todo: watch
    const newChildren = normalizeChildren(renderFn());
    // endwatch

    return {
      type: node.type,
      dom,
      props,
      children: diffChilds(dom, newChildren, prev?.children ?? [], nextSibling),
      key: node.key,
    };
  } else {
    // @ts-ignore
    const { children: rawChildren, ...props } = node.props;
    const newChildren = normalizeChildren(rawChildren);

    let el: ChildNode;

    {
      if (prev) {
        el = prev.dom;
      } else {
        el = document.createElement(node.type);
      }

      // TODO: diff attributes?
      for (const [key, value] of Object.entries(props)) {
        // @ts-ignore TODO: do better and handle event listeners
        el.setAttribute(key, value);
      }

      if (!prev) {
        insertNode(dom, el, nextSibling);
      }
    }

    return {
      type: node.type,
      dom: el,
      props: props,
      children: diffChilds(el, newChildren, prev?.children ?? [], undefined),
    };
  }
}
