import { diff, type VNode } from "sig";
import { initSigDom } from "../../src/sig-dom";

export function render(jsx: VNode) {
  document.body.childNodes.forEach((node) => node.remove());

  const dom = initSigDom(document.body);
  diff(dom, jsx);
}
