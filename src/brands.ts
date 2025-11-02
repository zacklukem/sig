import type { VNode } from "./types";

export const vnodeBrand = Symbol("sig_vnode");

export function isVNode(value: unknown): value is VNode {
  return typeof value === "object" && value !== null && vnodeBrand in value;
}
