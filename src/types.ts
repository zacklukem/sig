import type { vnodeBrand } from "./brands";
import type { Ref } from "./ref";

export interface VNode<Props = object> {
  [vnodeBrand]: true;
  type: string | FunctionComponent<Props>;
  props: Props;
  key?: unknown;
}

export type NormalComponentChild = VNode | string | number | bigint;

export type ComponentChild =
  | NormalComponentChild
  | Ref<ComponentChild>
  | ComponentChild[]
  | boolean
  | null
  | undefined;

export type ComponentChildren = ComponentChild[] | ComponentChild;

export type FunctionComponent<P> = (props: P) => () => ComponentChildren;
