import { render as renderNode, type VNode } from "@zacklukem/sig";
import { initSigDom } from "../../src/sig-dom";

export function render(jsx: VNode) {
  document.body = document.createElement("body");

  const dom = initSigDom(document.body);
  renderNode(dom, jsx);
  return (jsx: VNode) => renderNode(dom, jsx);
}
