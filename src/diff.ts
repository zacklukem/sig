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
  parentDom: ChildNode,
  node: ChildNode,
  nextSibling: ChildNode | undefined
) {
  if (nextSibling) {
    parentDom.insertBefore(node, nextSibling);
  } else {
    parentDom.appendChild(node);
  }
}

function diffChild(
  parentDom: ChildNode,
  newChild: NormalComponentChild,
  oldChild: RenderedNode | undefined,
  nextSibling: ChildNode | undefined
): RenderedNode {
  if (isVNode(newChild)) {
    return diff(parentDom, newChild, oldChild, nextSibling);
  } else {
    const value = newChild.toString();
    let textNode: Text;

    if (oldChild) {
      textNode = oldChild.dom as Text;
      textNode.nodeValue = value;
    } else {
      textNode = document.createTextNode(value);
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
  type: string | Function;
  key?: unknown;
}): string | symbol | Function {
  return node.key ? Symbol.for(node.key.toString()) : node.type;
}

function childKey(child: NormalComponentChild): string | symbol | Function {
  if (isVNode(child)) {
    return nodeKey(child);
  } else {
    return textNodeType;
  }
}

function diffChildren(
  parentDom: ChildNode,
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
      output.push(diffChild(parentDom, newChildren[iNew]!, undefined, ns));
      iNew++;
    } else if (change.removed) {
      oldChildren[iOld]?.dom.remove();
      iOld++;
    } else {
      const ns = oldChildren[iOld + 1]?.dom ?? nextSibling;
      output.push(
        diffChild(parentDom, newChildren[iNew]!, oldChildren[iOld]!, ns)
      );
      iOld++;
      iNew++;
    }
  }

  return output;
}

export function diff(
  parentDom: ChildNode,
  newNode: VNode,
  oldNode?: RenderedNode,
  nextSibling?: ChildNode
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
      children: diffChildren(
        parentDom,
        newChildren,
        oldNode?.children ?? [],
        nextSibling
      ),
      key: newNode.key,
    };
  } else {
    // @ts-ignore
    const { children: rawChildren, ...props } = newNode.props;
    const newChildren = normalizeChildren(rawChildren);

    let el: ChildNode;

    {
      if (oldNode) {
        el = oldNode.dom;
      } else {
        el = document.createElement(newNode.type);
      }

      // TODO: diff attributes?
      for (const [key, value] of Object.entries(props)) {
        // @ts-ignore TODO: do better and handle event listeners
        el.setAttribute(key, value);
      }

      if (!oldNode) {
        insertNode(parentDom, el, nextSibling);
      }
    }

    return {
      type: newNode.type,
      dom: el,
      props: props,
      children: diffChildren(
        el,
        newChildren,
        oldNode?.children ?? [],
        undefined
      ),
    };
  }
}
