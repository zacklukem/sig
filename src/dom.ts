/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-var */
// Copied and adapted from Preact https://github.com/preactjs/preact

// LICENSE
/*
The MIT License (MIT)

Copyright (c) 2015-present Jason Miller

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Most of our DOM-ish types

import type { Ref, RefOrValue } from "./ref";
import type { ComponentChildren } from "./types";

export interface BaseAttributes {
  children?: ComponentChildren;
}

// Implementations of some DOM events that are not available in TS 5.1
interface ToggleEvent extends Event {
  readonly newState: string;
  readonly oldState: string;
}

declare var ToggleEvent: {
  prototype: ToggleEvent;
  new (type: string, eventInitDict?: ToggleEventInit): ToggleEvent;
};

interface ToggleEventInit extends EventInit {
  newState?: string;
  oldState?: string;
}

interface CommandEvent extends Event {
  readonly source: Element | null;
  readonly command: string;
}

declare var CommandEvent: {
  prototype: CommandEvent;
  new (type: string, eventInitDict?: CommandEventInit): CommandEvent;
};

interface CommandEventInit extends EventInit {
  source: Element | null;
  command: string;
}

/** [MDN Reference](https://developer.mozilla.org/en-US/docs/Web/API/SnapEvent) */
interface SnapEvent extends Event {
  readonly snapTargetBlock: Element | null;
  readonly snapTargetInline: Element | null;
}

declare var SnapEvent: {
  prototype: SnapEvent;
  new (type: string, eventInitDict?: SnapEventInit): SnapEvent;
};

interface SnapEventInit extends EventInit {
  snapTargetBlock?: Element | null;
  snapTargetInline?: Element | null;
}

type Booleanish = boolean | "true" | "false";

export type DOMCSSProperties = {
  [key in keyof Omit<
    CSSStyleDeclaration,
    "item" | "setProperty" | "removeProperty" | "getPropertyValue" | "getPropertyPriority"
  >]?: string | number | null | undefined;
};
export type AllCSSProperties = {
  [key: string]: string | number | null | undefined;
};
export interface CSSProperties extends AllCSSProperties, DOMCSSProperties {
  cssText?: string | null;
}

export interface SVGAttributes<Target extends EventTarget = SVGElement>
  extends HTMLAttributes<Target> {
  accentHeight?: RefOrValue<number | string | undefined>;
  accumulate?: RefOrValue<"none" | "sum" | undefined>;
  additive?: RefOrValue<"replace" | "sum" | undefined>;
  alignmentBaseline?: RefOrValue<
    | "auto"
    | "baseline"
    | "before-edge"
    | "text-before-edge"
    | "middle"
    | "central"
    | "after-edge"
    | "text-after-edge"
    | "ideographic"
    | "alphabetic"
    | "hanging"
    | "mathematical"
    | "inherit"
    | undefined
  >;
  "alignment-baseline"?: RefOrValue<
    | "auto"
    | "baseline"
    | "before-edge"
    | "text-before-edge"
    | "middle"
    | "central"
    | "after-edge"
    | "text-after-edge"
    | "ideographic"
    | "alphabetic"
    | "hanging"
    | "mathematical"
    | "inherit"
    | undefined
  >;
  allowReorder?: RefOrValue<"no" | "yes" | undefined>;
  "allow-reorder"?: RefOrValue<"no" | "yes" | undefined>;
  alphabetic?: RefOrValue<number | string | undefined>;
  amplitude?: RefOrValue<number | string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/arabic-form */
  arabicForm?: RefOrValue<"initial" | "medial" | "terminal" | "isolated" | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/arabic-form */
  "arabic-form"?: RefOrValue<"initial" | "medial" | "terminal" | "isolated" | undefined>;
  ascent?: RefOrValue<number | string | undefined>;
  attributeName?: RefOrValue<string | undefined>;
  attributeType?: RefOrValue<string | undefined>;
  azimuth?: RefOrValue<number | string | undefined>;
  baseFrequency?: RefOrValue<number | string | undefined>;
  baselineShift?: RefOrValue<number | string | undefined>;
  "baseline-shift"?: RefOrValue<number | string | undefined>;
  baseProfile?: RefOrValue<number | string | undefined>;
  bbox?: RefOrValue<number | string | undefined>;
  begin?: RefOrValue<number | string | undefined>;
  bias?: RefOrValue<number | string | undefined>;
  by?: RefOrValue<number | string | undefined>;
  calcMode?: RefOrValue<number | string | undefined>;
  capHeight?: RefOrValue<number | string | undefined>;
  "cap-height"?: RefOrValue<number | string | undefined>;
  clip?: RefOrValue<number | string | undefined>;
  clipPath?: RefOrValue<string | undefined>;
  "clip-path"?: RefOrValue<string | undefined>;
  clipPathUnits?: RefOrValue<number | string | undefined>;
  clipRule?: RefOrValue<number | string | undefined>;
  "clip-rule"?: RefOrValue<number | string | undefined>;
  colorInterpolation?: RefOrValue<number | string | undefined>;
  "color-interpolation"?: RefOrValue<number | string | undefined>;
  colorInterpolationFilters?: RefOrValue<"auto" | "sRGB" | "linearRGB" | "inherit" | undefined>;
  "color-interpolation-filters"?: RefOrValue<"auto" | "sRGB" | "linearRGB" | "inherit" | undefined>;
  colorProfile?: RefOrValue<number | string | undefined>;
  "color-profile"?: RefOrValue<number | string | undefined>;
  colorRendering?: RefOrValue<number | string | undefined>;
  "color-rendering"?: RefOrValue<number | string | undefined>;
  contentScriptType?: RefOrValue<number | string | undefined>;
  "content-script-type"?: RefOrValue<number | string | undefined>;
  contentStyleType?: RefOrValue<number | string | undefined>;
  "content-style-type"?: RefOrValue<number | string | undefined>;
  cursor?: RefOrValue<number | string | undefined>;
  cx?: RefOrValue<number | string | undefined>;
  cy?: RefOrValue<number | string | undefined>;
  d?: RefOrValue<string | undefined>;
  decelerate?: RefOrValue<number | string | undefined>;
  descent?: RefOrValue<number | string | undefined>;
  diffuseConstant?: RefOrValue<number | string | undefined>;
  direction?: RefOrValue<number | string | undefined>;
  display?: RefOrValue<number | string | undefined>;
  divisor?: RefOrValue<number | string | undefined>;
  dominantBaseline?: RefOrValue<number | string | undefined>;
  "dominant-baseline"?: RefOrValue<number | string | undefined>;
  dur?: RefOrValue<number | string | undefined>;
  dx?: RefOrValue<number | string | undefined>;
  dy?: RefOrValue<number | string | undefined>;
  edgeMode?: RefOrValue<number | string | undefined>;
  elevation?: RefOrValue<number | string | undefined>;
  enableBackground?: RefOrValue<number | string | undefined>;
  "enable-background"?: RefOrValue<number | string | undefined>;
  end?: RefOrValue<number | string | undefined>;
  exponent?: RefOrValue<number | string | undefined>;
  externalResourcesRequired?: RefOrValue<number | string | undefined>;
  fill?: RefOrValue<string | undefined>;
  fillOpacity?: RefOrValue<number | string | undefined>;
  "fill-opacity"?: RefOrValue<number | string | undefined>;
  fillRule?: RefOrValue<"nonzero" | "evenodd" | "inherit" | undefined>;
  "fill-rule"?: RefOrValue<"nonzero" | "evenodd" | "inherit" | undefined>;
  filter?: RefOrValue<string | undefined>;
  filterRes?: RefOrValue<number | string | undefined>;
  filterUnits?: RefOrValue<number | string | undefined>;
  floodColor?: RefOrValue<number | string | undefined>;
  "flood-color"?: RefOrValue<number | string | undefined>;
  floodOpacity?: RefOrValue<number | string | undefined>;
  "flood-opacity"?: RefOrValue<number | string | undefined>;
  focusable?: RefOrValue<number | string | undefined>;
  fontFamily?: RefOrValue<string | undefined>;
  "font-family"?: RefOrValue<string | undefined>;
  fontSize?: RefOrValue<number | string | undefined>;
  "font-size"?: RefOrValue<number | string | undefined>;
  fontSizeAdjust?: RefOrValue<number | string | undefined>;
  "font-size-adjust"?: RefOrValue<number | string | undefined>;
  fontStretch?: RefOrValue<number | string | undefined>;
  "font-stretch"?: RefOrValue<number | string | undefined>;
  fontStyle?: RefOrValue<number | string | undefined>;
  "font-style"?: RefOrValue<number | string | undefined>;
  fontVariant?: RefOrValue<number | string | undefined>;
  "font-variant"?: RefOrValue<number | string | undefined>;
  fontWeight?: RefOrValue<number | string | undefined>;
  "font-weight"?: RefOrValue<number | string | undefined>;
  format?: RefOrValue<number | string | undefined>;
  from?: RefOrValue<number | string | undefined>;
  fx?: RefOrValue<number | string | undefined>;
  fy?: RefOrValue<number | string | undefined>;
  g1?: RefOrValue<number | string | undefined>;
  g2?: RefOrValue<number | string | undefined>;
  glyphName?: RefOrValue<number | string | undefined>;
  "glyph-name"?: RefOrValue<number | string | undefined>;
  glyphOrientationHorizontal?: RefOrValue<number | string | undefined>;
  "glyph-orientation-horizontal"?: RefOrValue<number | string | undefined>;
  glyphOrientationVertical?: RefOrValue<number | string | undefined>;
  "glyph-orientation-vertical"?: RefOrValue<number | string | undefined>;
  glyphRef?: RefOrValue<number | string | undefined>;
  gradientTransform?: RefOrValue<string | undefined>;
  gradientUnits?: RefOrValue<string | undefined>;
  hanging?: RefOrValue<number | string | undefined>;
  height?: RefOrValue<number | string | undefined>;
  horizAdvX?: RefOrValue<number | string | undefined>;
  "horiz-adv-x"?: RefOrValue<number | string | undefined>;
  horizOriginX?: RefOrValue<number | string | undefined>;
  "horiz-origin-x"?: RefOrValue<number | string | undefined>;
  href?: RefOrValue<string | undefined>;
  hreflang?: RefOrValue<string | undefined>;
  hrefLang?: RefOrValue<string | undefined>;
  ideographic?: RefOrValue<number | string | undefined>;
  imageRendering?: RefOrValue<number | string | undefined>;
  "image-rendering"?: RefOrValue<number | string | undefined>;
  in2?: RefOrValue<number | string | undefined>;
  in?: RefOrValue<string | undefined>;
  intercept?: RefOrValue<number | string | undefined>;
  k1?: RefOrValue<number | string | undefined>;
  k2?: RefOrValue<number | string | undefined>;
  k3?: RefOrValue<number | string | undefined>;
  k4?: RefOrValue<number | string | undefined>;
  k?: RefOrValue<number | string | undefined>;
  kernelMatrix?: RefOrValue<number | string | undefined>;
  kernelUnitLength?: RefOrValue<number | string | undefined>;
  kerning?: RefOrValue<number | string | undefined>;
  keyPoints?: RefOrValue<number | string | undefined>;
  keySplines?: RefOrValue<number | string | undefined>;
  keyTimes?: RefOrValue<number | string | undefined>;
  lengthAdjust?: RefOrValue<number | string | undefined>;
  letterSpacing?: RefOrValue<number | string | undefined>;
  "letter-spacing"?: RefOrValue<number | string | undefined>;
  lightingColor?: RefOrValue<number | string | undefined>;
  "lighting-color"?: RefOrValue<number | string | undefined>;
  limitingConeAngle?: RefOrValue<number | string | undefined>;
  local?: RefOrValue<number | string | undefined>;
  markerEnd?: RefOrValue<string | undefined>;
  "marker-end"?: RefOrValue<string | undefined>;
  markerHeight?: RefOrValue<number | string | undefined>;
  markerMid?: RefOrValue<string | undefined>;
  "marker-mid"?: RefOrValue<string | undefined>;
  markerStart?: RefOrValue<string | undefined>;
  "marker-start"?: RefOrValue<string | undefined>;
  markerUnits?: RefOrValue<number | string | undefined>;
  markerWidth?: RefOrValue<number | string | undefined>;
  mask?: RefOrValue<string | undefined>;
  maskContentUnits?: RefOrValue<number | string | undefined>;
  maskUnits?: RefOrValue<number | string | undefined>;
  mathematical?: RefOrValue<number | string | undefined>;
  mode?: RefOrValue<number | string | undefined>;
  numOctaves?: RefOrValue<number | string | undefined>;
  offset?: RefOrValue<number | string | undefined>;
  opacity?: RefOrValue<number | string | undefined>;
  operator?: RefOrValue<number | string | undefined>;
  order?: RefOrValue<number | string | undefined>;
  orient?: RefOrValue<number | string | undefined>;
  orientation?: RefOrValue<number | string | undefined>;
  origin?: RefOrValue<number | string | undefined>;
  overflow?: RefOrValue<number | string | undefined>;
  overlinePosition?: RefOrValue<number | string | undefined>;
  "overline-position"?: RefOrValue<number | string | undefined>;
  overlineThickness?: RefOrValue<number | string | undefined>;
  "overline-thickness"?: RefOrValue<number | string | undefined>;
  paintOrder?: RefOrValue<number | string | undefined>;
  "paint-order"?: RefOrValue<number | string | undefined>;
  panose1?: RefOrValue<number | string | undefined>;
  "panose-1"?: RefOrValue<number | string | undefined>;
  pathLength?: RefOrValue<number | string | undefined>;
  patternContentUnits?: RefOrValue<string | undefined>;
  patternTransform?: RefOrValue<number | string | undefined>;
  patternUnits?: RefOrValue<string | undefined>;
  pointerEvents?: RefOrValue<number | string | undefined>;
  "pointer-events"?: RefOrValue<number | string | undefined>;
  points?: RefOrValue<string | undefined>;
  pointsAtX?: RefOrValue<number | string | undefined>;
  pointsAtY?: RefOrValue<number | string | undefined>;
  pointsAtZ?: RefOrValue<number | string | undefined>;
  preserveAlpha?: RefOrValue<number | string | undefined>;
  preserveAspectRatio?: RefOrValue<string | undefined>;
  primitiveUnits?: RefOrValue<number | string | undefined>;
  r?: RefOrValue<number | string | undefined>;
  radius?: RefOrValue<number | string | undefined>;
  refX?: RefOrValue<number | string | undefined>;
  refY?: RefOrValue<number | string | undefined>;
  renderingIntent?: RefOrValue<number | string | undefined>;
  "rendering-intent"?: RefOrValue<number | string | undefined>;
  repeatCount?: RefOrValue<number | string | undefined>;
  "repeat-count"?: RefOrValue<number | string | undefined>;
  repeatDur?: RefOrValue<number | string | undefined>;
  "repeat-dur"?: RefOrValue<number | string | undefined>;
  requiredExtensions?: RefOrValue<number | string | undefined>;
  requiredFeatures?: RefOrValue<number | string | undefined>;
  restart?: RefOrValue<number | string | undefined>;
  result?: RefOrValue<string | undefined>;
  rotate?: RefOrValue<number | string | undefined>;
  rx?: RefOrValue<number | string | undefined>;
  ry?: RefOrValue<number | string | undefined>;
  scale?: RefOrValue<number | string | undefined>;
  seed?: RefOrValue<number | string | undefined>;
  shapeRendering?: RefOrValue<number | string | undefined>;
  "shape-rendering"?: RefOrValue<number | string | undefined>;
  slope?: RefOrValue<number | string | undefined>;
  spacing?: RefOrValue<number | string | undefined>;
  specularConstant?: RefOrValue<number | string | undefined>;
  specularExponent?: RefOrValue<number | string | undefined>;
  speed?: RefOrValue<number | string | undefined>;
  spreadMethod?: RefOrValue<string | undefined>;
  startOffset?: RefOrValue<number | string | undefined>;
  stdDeviation?: RefOrValue<number | string | undefined>;
  stemh?: RefOrValue<number | string | undefined>;
  stemv?: RefOrValue<number | string | undefined>;
  stitchTiles?: RefOrValue<number | string | undefined>;
  stopColor?: RefOrValue<string | undefined>;
  "stop-color"?: RefOrValue<string | undefined>;
  stopOpacity?: RefOrValue<number | string | undefined>;
  "stop-opacity"?: RefOrValue<number | string | undefined>;
  strikethroughPosition?: RefOrValue<number | string | undefined>;
  "strikethrough-position"?: RefOrValue<number | string | undefined>;
  strikethroughThickness?: RefOrValue<number | string | undefined>;
  "strikethrough-thickness"?: RefOrValue<number | string | undefined>;
  string?: RefOrValue<number | string | undefined>;
  stroke?: RefOrValue<string | undefined>;
  strokeDasharray?: RefOrValue<string | number | undefined>;
  "stroke-dasharray"?: RefOrValue<string | number | undefined>;
  strokeDashoffset?: RefOrValue<string | number | undefined>;
  "stroke-dashoffset"?: RefOrValue<string | number | undefined>;
  strokeLinecap?: RefOrValue<"butt" | "round" | "square" | "inherit" | undefined>;
  "stroke-linecap"?: RefOrValue<"butt" | "round" | "square" | "inherit" | undefined>;
  strokeLinejoin?: RefOrValue<"miter" | "round" | "bevel" | "inherit" | undefined>;
  "stroke-linejoin"?: RefOrValue<"miter" | "round" | "bevel" | "inherit" | undefined>;
  strokeMiterlimit?: RefOrValue<string | number | undefined>;
  "stroke-miterlimit"?: RefOrValue<string | number | undefined>;
  strokeOpacity?: RefOrValue<number | string | undefined>;
  "stroke-opacity"?: RefOrValue<number | string | undefined>;
  strokeWidth?: RefOrValue<number | string | undefined>;
  "stroke-width"?: RefOrValue<number | string | undefined>;
  surfaceScale?: RefOrValue<number | string | undefined>;
  systemLanguage?: RefOrValue<number | string | undefined>;
  tableValues?: RefOrValue<number | string | undefined>;
  targetX?: RefOrValue<number | string | undefined>;
  targetY?: RefOrValue<number | string | undefined>;
  textAnchor?: RefOrValue<string | undefined>;
  "text-anchor"?: RefOrValue<string | undefined>;
  textDecoration?: RefOrValue<number | string | undefined>;
  "text-decoration"?: RefOrValue<number | string | undefined>;
  textLength?: RefOrValue<number | string | undefined>;
  textRendering?: RefOrValue<number | string | undefined>;
  "text-rendering"?: RefOrValue<number | string | undefined>;
  to?: RefOrValue<number | string | undefined>;
  transform?: RefOrValue<string | undefined>;
  transformOrigin?: RefOrValue<string | undefined>;
  "transform-origin"?: RefOrValue<string | undefined>;
  type?: RefOrValue<string | undefined>;
  u1?: RefOrValue<number | string | undefined>;
  u2?: RefOrValue<number | string | undefined>;
  underlinePosition?: RefOrValue<number | string | undefined>;
  "underline-position"?: RefOrValue<number | string | undefined>;
  underlineThickness?: RefOrValue<number | string | undefined>;
  "underline-thickness"?: RefOrValue<number | string | undefined>;
  unicode?: RefOrValue<number | string | undefined>;
  unicodeBidi?: RefOrValue<number | string | undefined>;
  "unicode-bidi"?: RefOrValue<number | string | undefined>;
  unicodeRange?: RefOrValue<number | string | undefined>;
  "unicode-range"?: RefOrValue<number | string | undefined>;
  unitsPerEm?: RefOrValue<number | string | undefined>;
  "units-per-em"?: RefOrValue<number | string | undefined>;
  vAlphabetic?: RefOrValue<number | string | undefined>;
  "v-alphabetic"?: RefOrValue<number | string | undefined>;
  values?: RefOrValue<string | undefined>;
  vectorEffect?: RefOrValue<number | string | undefined>;
  "vector-effect"?: RefOrValue<number | string | undefined>;
  version?: RefOrValue<string | undefined>;
  vertAdvY?: RefOrValue<number | string | undefined>;
  "vert-adv-y"?: RefOrValue<number | string | undefined>;
  vertOriginX?: RefOrValue<number | string | undefined>;
  "vert-origin-x"?: RefOrValue<number | string | undefined>;
  vertOriginY?: RefOrValue<number | string | undefined>;
  "vert-origin-y"?: RefOrValue<number | string | undefined>;
  vHanging?: RefOrValue<number | string | undefined>;
  "v-hanging"?: RefOrValue<number | string | undefined>;
  vIdeographic?: RefOrValue<number | string | undefined>;
  "v-ideographic"?: RefOrValue<number | string | undefined>;
  viewBox?: RefOrValue<string | undefined>;
  viewTarget?: RefOrValue<number | string | undefined>;
  visibility?: RefOrValue<number | string | undefined>;
  vMathematical?: RefOrValue<number | string | undefined>;
  "v-mathematical"?: RefOrValue<number | string | undefined>;
  width?: RefOrValue<number | string | undefined>;
  wordSpacing?: RefOrValue<number | string | undefined>;
  "word-spacing"?: RefOrValue<number | string | undefined>;
  writingMode?: RefOrValue<number | string | undefined>;
  "writing-mode"?: RefOrValue<number | string | undefined>;
  x1?: RefOrValue<number | string | undefined>;
  x2?: RefOrValue<number | string | undefined>;
  x?: RefOrValue<number | string | undefined>;
  xChannelSelector?: RefOrValue<string | undefined>;
  xHeight?: RefOrValue<number | string | undefined>;
  "x-height"?: RefOrValue<number | string | undefined>;
  xlinkActuate?: RefOrValue<string | undefined>;
  "xlink:actuate"?: RefOrValue<SVGAttributes["xlinkActuate"]>;
  xlinkArcrole?: RefOrValue<string | undefined>;
  "xlink:arcrole"?: RefOrValue<string | undefined>;
  xlinkHref?: RefOrValue<string | undefined>;
  "xlink:href"?: RefOrValue<string | undefined>;
  xlinkRole?: RefOrValue<string | undefined>;
  "xlink:role"?: RefOrValue<string | undefined>;
  xlinkShow?: RefOrValue<string | undefined>;
  "xlink:show"?: RefOrValue<string | undefined>;
  xlinkTitle?: RefOrValue<string | undefined>;
  "xlink:title"?: RefOrValue<string | undefined>;
  xlinkType?: RefOrValue<string | undefined>;
  "xlink:type"?: RefOrValue<string | undefined>;
  xmlBase?: RefOrValue<string | undefined>;
  "xml:base"?: RefOrValue<string | undefined>;
  xmlLang?: RefOrValue<string | undefined>;
  "xml:lang"?: RefOrValue<string | undefined>;
  xmlns?: RefOrValue<string | undefined>;
  xmlnsXlink?: RefOrValue<string | undefined>;
  xmlSpace?: RefOrValue<string | undefined>;
  "xml:space"?: RefOrValue<string | undefined>;
  y1?: RefOrValue<number | string | undefined>;
  y2?: RefOrValue<number | string | undefined>;
  y?: RefOrValue<number | string | undefined>;
  yChannelSelector?: RefOrValue<string | undefined>;
  z?: RefOrValue<number | string | undefined>;
  zoomAndPan?: RefOrValue<string | undefined>;
}

export interface PathAttributes {
  d: string;
}

export type TargetedEvent<
  Target extends EventTarget = EventTarget,
  TypedEvent extends Event = Event
> = Omit<TypedEvent, "currentTarget"> & {
  readonly currentTarget: Target;
};

export type TargetedAnimationEvent<Target extends EventTarget> = TargetedEvent<
  Target,
  AnimationEvent
>;
export type TargetedClipboardEvent<Target extends EventTarget> = TargetedEvent<
  Target,
  ClipboardEvent
>;
export type TargetedCommandEvent<Target extends EventTarget> = TargetedEvent<Target, CommandEvent>;
export type TargetedCompositionEvent<Target extends EventTarget> = TargetedEvent<
  Target,
  CompositionEvent
>;
export type TargetedDragEvent<Target extends EventTarget> = TargetedEvent<Target, DragEvent>;
export type TargetedFocusEvent<Target extends EventTarget> = TargetedEvent<Target, FocusEvent>;
export type TargetedInputEvent<Target extends EventTarget> = TargetedEvent<Target, InputEvent>;
export type TargetedKeyboardEvent<Target extends EventTarget> = TargetedEvent<
  Target,
  KeyboardEvent
>;
export type TargetedMouseEvent<Target extends EventTarget> = TargetedEvent<Target, MouseEvent>;
export type TargetedPointerEvent<Target extends EventTarget> = TargetedEvent<Target, PointerEvent>;
export type TargetedSnapEvent<Target extends EventTarget> = TargetedEvent<Target, SnapEvent>;
export type TargetedSubmitEvent<Target extends EventTarget> = TargetedEvent<Target, SubmitEvent>;
export type TargetedTouchEvent<Target extends EventTarget> = TargetedEvent<Target, TouchEvent>;
export type TargetedToggleEvent<Target extends EventTarget> = TargetedEvent<Target, ToggleEvent>;
export type TargetedTransitionEvent<Target extends EventTarget> = TargetedEvent<
  Target,
  TransitionEvent
>;
export type TargetedUIEvent<Target extends EventTarget> = TargetedEvent<Target, UIEvent>;
export type TargetedWheelEvent<Target extends EventTarget> = TargetedEvent<Target, WheelEvent>;
export type TargetedPictureInPictureEvent<Target extends EventTarget> = TargetedEvent<
  Target,
  PictureInPictureEvent
>;

export type EventHandler<E extends TargetedEvent> = {
  bivarianceHack(event: E): void;
}["bivarianceHack"];

export type AnimationEventHandler<Target extends EventTarget> = EventHandler<
  TargetedAnimationEvent<Target>
>;
export type ClipboardEventHandler<Target extends EventTarget> = EventHandler<
  TargetedClipboardEvent<Target>
>;
export type CommandEventHandler<Target extends EventTarget> = EventHandler<
  TargetedCommandEvent<Target>
>;
export type CompositionEventHandler<Target extends EventTarget> = EventHandler<
  TargetedCompositionEvent<Target>
>;
export type DragEventHandler<Target extends EventTarget> = EventHandler<TargetedDragEvent<Target>>;
export type ToggleEventHandler<Target extends EventTarget> = EventHandler<
  TargetedToggleEvent<Target>
>;
export type FocusEventHandler<Target extends EventTarget> = EventHandler<
  TargetedFocusEvent<Target>
>;
export type GenericEventHandler<Target extends EventTarget> = EventHandler<TargetedEvent<Target>>;
export type InputEventHandler<Target extends EventTarget> = EventHandler<
  TargetedInputEvent<Target>
>;
export type KeyboardEventHandler<Target extends EventTarget> = EventHandler<
  TargetedKeyboardEvent<Target>
>;
export type MouseEventHandler<Target extends EventTarget> = EventHandler<
  TargetedMouseEvent<Target>
>;
export type PointerEventHandler<Target extends EventTarget> = EventHandler<
  TargetedPointerEvent<Target>
>;
export type SnapEventHandler<Target extends EventTarget> = EventHandler<TargetedSnapEvent<Target>>;
export type SubmitEventHandler<Target extends EventTarget> = EventHandler<
  TargetedSubmitEvent<Target>
>;
export type TouchEventHandler<Target extends EventTarget> = EventHandler<
  TargetedTouchEvent<Target>
>;
export type TransitionEventHandler<Target extends EventTarget> = EventHandler<
  TargetedTransitionEvent<Target>
>;
export type UIEventHandler<Target extends EventTarget> = EventHandler<TargetedUIEvent<Target>>;
export type WheelEventHandler<Target extends EventTarget> = EventHandler<
  TargetedWheelEvent<Target>
>;
export type PictureInPictureEventHandler<Target extends EventTarget> = EventHandler<
  TargetedPictureInPictureEvent<Target>
>;

export interface DOMAttributes<Target extends EventTarget> extends BaseAttributes {
  ref?: Ref<Target | undefined> | undefined;

  // Image Events
  onLoad?: GenericEventHandler<Target> | undefined;
  onLoadCapture?: GenericEventHandler<Target> | undefined;
  onError?: GenericEventHandler<Target> | undefined;
  onErrorCapture?: GenericEventHandler<Target> | undefined;

  // Clipboard Events
  onCopy?: ClipboardEventHandler<Target> | undefined;
  onCopyCapture?: ClipboardEventHandler<Target> | undefined;
  onCut?: ClipboardEventHandler<Target> | undefined;
  onCutCapture?: ClipboardEventHandler<Target> | undefined;
  onPaste?: ClipboardEventHandler<Target> | undefined;
  onPasteCapture?: ClipboardEventHandler<Target> | undefined;

  // Composition Events
  onCompositionEnd?: CompositionEventHandler<Target> | undefined;
  onCompositionEndCapture?: CompositionEventHandler<Target> | undefined;
  onCompositionStart?: CompositionEventHandler<Target> | undefined;
  onCompositionStartCapture?: CompositionEventHandler<Target> | undefined;
  onCompositionUpdate?: CompositionEventHandler<Target> | undefined;
  onCompositionUpdateCapture?: CompositionEventHandler<Target> | undefined;

  // Popover Events
  onBeforeToggle?: ToggleEventHandler<Target> | undefined;
  onToggle?: ToggleEventHandler<Target> | undefined;

  // Dialog Events
  onClose?: GenericEventHandler<Target> | undefined;
  onCancel?: GenericEventHandler<Target> | undefined;

  // Focus Events
  onFocus?: FocusEventHandler<Target> | undefined;
  onFocusCapture?: FocusEventHandler<Target> | undefined;
  onFocusIn?: FocusEventHandler<Target> | undefined;
  onFocusInCapture?: FocusEventHandler<Target> | undefined;
  onFocusOut?: FocusEventHandler<Target> | undefined;
  onFocusOutCapture?: FocusEventHandler<Target> | undefined;
  onBlur?: FocusEventHandler<Target> | undefined;
  onBlurCapture?: FocusEventHandler<Target> | undefined;

  // Form Events
  onChange?: GenericEventHandler<Target> | undefined;
  onChangeCapture?: GenericEventHandler<Target> | undefined;
  onInput?: InputEventHandler<Target> | undefined;
  onInputCapture?: InputEventHandler<Target> | undefined;
  onBeforeInput?: InputEventHandler<Target> | undefined;
  onBeforeInputCapture?: InputEventHandler<Target> | undefined;
  onSearch?: GenericEventHandler<Target> | undefined;
  onSearchCapture?: GenericEventHandler<Target> | undefined;
  onSubmit?: SubmitEventHandler<Target> | undefined;
  onSubmitCapture?: SubmitEventHandler<Target> | undefined;
  onInvalid?: GenericEventHandler<Target> | undefined;
  onInvalidCapture?: GenericEventHandler<Target> | undefined;
  onReset?: GenericEventHandler<Target> | undefined;
  onResetCapture?: GenericEventHandler<Target> | undefined;
  onFormData?: GenericEventHandler<Target> | undefined;
  onFormDataCapture?: GenericEventHandler<Target> | undefined;

  // Keyboard Events
  onKeyDown?: KeyboardEventHandler<Target> | undefined;
  onKeyDownCapture?: KeyboardEventHandler<Target> | undefined;
  onKeyPress?: KeyboardEventHandler<Target> | undefined;
  onKeyPressCapture?: KeyboardEventHandler<Target> | undefined;
  onKeyUp?: KeyboardEventHandler<Target> | undefined;
  onKeyUpCapture?: KeyboardEventHandler<Target> | undefined;

  // Media Events
  onAbort?: GenericEventHandler<Target> | undefined;
  onAbortCapture?: GenericEventHandler<Target> | undefined;
  onCanPlay?: GenericEventHandler<Target> | undefined;
  onCanPlayCapture?: GenericEventHandler<Target> | undefined;
  onCanPlayThrough?: GenericEventHandler<Target> | undefined;
  onCanPlayThroughCapture?: GenericEventHandler<Target> | undefined;
  onDurationChange?: GenericEventHandler<Target> | undefined;
  onDurationChangeCapture?: GenericEventHandler<Target> | undefined;
  onEmptied?: GenericEventHandler<Target> | undefined;
  onEmptiedCapture?: GenericEventHandler<Target> | undefined;
  onEncrypted?: GenericEventHandler<Target> | undefined;
  onEncryptedCapture?: GenericEventHandler<Target> | undefined;
  onEnded?: GenericEventHandler<Target> | undefined;
  onEndedCapture?: GenericEventHandler<Target> | undefined;
  onLoadedData?: GenericEventHandler<Target> | undefined;
  onLoadedDataCapture?: GenericEventHandler<Target> | undefined;
  onLoadedMetadata?: GenericEventHandler<Target> | undefined;
  onLoadedMetadataCapture?: GenericEventHandler<Target> | undefined;
  onLoadStart?: GenericEventHandler<Target> | undefined;
  onLoadStartCapture?: GenericEventHandler<Target> | undefined;
  onPause?: GenericEventHandler<Target> | undefined;
  onPauseCapture?: GenericEventHandler<Target> | undefined;
  onPlay?: GenericEventHandler<Target> | undefined;
  onPlayCapture?: GenericEventHandler<Target> | undefined;
  onPlaying?: GenericEventHandler<Target> | undefined;
  onPlayingCapture?: GenericEventHandler<Target> | undefined;
  onProgress?: GenericEventHandler<Target> | undefined;
  onProgressCapture?: GenericEventHandler<Target> | undefined;
  onRateChange?: GenericEventHandler<Target> | undefined;
  onRateChangeCapture?: GenericEventHandler<Target> | undefined;
  onSeeked?: GenericEventHandler<Target> | undefined;
  onSeekedCapture?: GenericEventHandler<Target> | undefined;
  onSeeking?: GenericEventHandler<Target> | undefined;
  onSeekingCapture?: GenericEventHandler<Target> | undefined;
  onStalled?: GenericEventHandler<Target> | undefined;
  onStalledCapture?: GenericEventHandler<Target> | undefined;
  onSuspend?: GenericEventHandler<Target> | undefined;
  onSuspendCapture?: GenericEventHandler<Target> | undefined;
  onTimeUpdate?: GenericEventHandler<Target> | undefined;
  onTimeUpdateCapture?: GenericEventHandler<Target> | undefined;
  onVolumeChange?: GenericEventHandler<Target> | undefined;
  onVolumeChangeCapture?: GenericEventHandler<Target> | undefined;
  onWaiting?: GenericEventHandler<Target> | undefined;
  onWaitingCapture?: GenericEventHandler<Target> | undefined;

  // MouseEvents
  onClick?: MouseEventHandler<Target> | undefined;
  onClickCapture?: MouseEventHandler<Target> | undefined;
  onContextMenu?: MouseEventHandler<Target> | undefined;
  onContextMenuCapture?: MouseEventHandler<Target> | undefined;
  onDblClick?: MouseEventHandler<Target> | undefined;
  onDblClickCapture?: MouseEventHandler<Target> | undefined;
  onDrag?: DragEventHandler<Target> | undefined;
  onDragCapture?: DragEventHandler<Target> | undefined;
  onDragEnd?: DragEventHandler<Target> | undefined;
  onDragEndCapture?: DragEventHandler<Target> | undefined;
  onDragEnter?: DragEventHandler<Target> | undefined;
  onDragEnterCapture?: DragEventHandler<Target> | undefined;
  onDragExit?: DragEventHandler<Target> | undefined;
  onDragExitCapture?: DragEventHandler<Target> | undefined;
  onDragLeave?: DragEventHandler<Target> | undefined;
  onDragLeaveCapture?: DragEventHandler<Target> | undefined;
  onDragOver?: DragEventHandler<Target> | undefined;
  onDragOverCapture?: DragEventHandler<Target> | undefined;
  onDragStart?: DragEventHandler<Target> | undefined;
  onDragStartCapture?: DragEventHandler<Target> | undefined;
  onDrop?: DragEventHandler<Target> | undefined;
  onDropCapture?: DragEventHandler<Target> | undefined;
  onMouseDown?: MouseEventHandler<Target> | undefined;
  onMouseDownCapture?: MouseEventHandler<Target> | undefined;
  onMouseEnter?: MouseEventHandler<Target> | undefined;
  onMouseEnterCapture?: MouseEventHandler<Target> | undefined;
  onMouseLeave?: MouseEventHandler<Target> | undefined;
  onMouseLeaveCapture?: MouseEventHandler<Target> | undefined;
  onMouseMove?: MouseEventHandler<Target> | undefined;
  onMouseMoveCapture?: MouseEventHandler<Target> | undefined;
  onMouseOut?: MouseEventHandler<Target> | undefined;
  onMouseOutCapture?: MouseEventHandler<Target> | undefined;
  onMouseOver?: MouseEventHandler<Target> | undefined;
  onMouseOverCapture?: MouseEventHandler<Target> | undefined;
  onMouseUp?: MouseEventHandler<Target> | undefined;
  onMouseUpCapture?: MouseEventHandler<Target> | undefined;
  // TODO: Spec for `auxclick` events was changed to make it a PointerEvent but only
  // Chrome has support for it yet. When more browsers align we should change this.
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event#browser_compatibility
  onAuxClick?: MouseEventHandler<Target> | undefined;
  onAuxClickCapture?: MouseEventHandler<Target> | undefined;

  // Selection Events
  onSelect?: GenericEventHandler<Target> | undefined;
  onSelectCapture?: GenericEventHandler<Target> | undefined;

  // Touch Events
  onTouchCancel?: TouchEventHandler<Target> | undefined;
  onTouchCancelCapture?: TouchEventHandler<Target> | undefined;
  onTouchEnd?: TouchEventHandler<Target> | undefined;
  onTouchEndCapture?: TouchEventHandler<Target> | undefined;
  onTouchMove?: TouchEventHandler<Target> | undefined;
  onTouchMoveCapture?: TouchEventHandler<Target> | undefined;
  onTouchStart?: TouchEventHandler<Target> | undefined;
  onTouchStartCapture?: TouchEventHandler<Target> | undefined;

  // Pointer Events
  onPointerOver?: PointerEventHandler<Target> | undefined;
  onPointerOverCapture?: PointerEventHandler<Target> | undefined;
  onPointerEnter?: PointerEventHandler<Target> | undefined;
  onPointerEnterCapture?: PointerEventHandler<Target> | undefined;
  onPointerDown?: PointerEventHandler<Target> | undefined;
  onPointerDownCapture?: PointerEventHandler<Target> | undefined;
  onPointerMove?: PointerEventHandler<Target> | undefined;
  onPointerMoveCapture?: PointerEventHandler<Target> | undefined;
  onPointerUp?: PointerEventHandler<Target> | undefined;
  onPointerUpCapture?: PointerEventHandler<Target> | undefined;
  onPointerCancel?: PointerEventHandler<Target> | undefined;
  onPointerCancelCapture?: PointerEventHandler<Target> | undefined;
  onPointerOut?: PointerEventHandler<Target> | undefined;
  onPointerOutCapture?: PointerEventHandler<Target> | undefined;
  onPointerLeave?: PointerEventHandler<Target> | undefined;
  onPointerLeaveCapture?: PointerEventHandler<Target> | undefined;
  onGotPointerCapture?: PointerEventHandler<Target> | undefined;
  onGotPointerCaptureCapture?: PointerEventHandler<Target> | undefined;
  onLostPointerCapture?: PointerEventHandler<Target> | undefined;
  onLostPointerCaptureCapture?: PointerEventHandler<Target> | undefined;

  // Scroll Events
  onScroll?: GenericEventHandler<Target> | undefined;
  onScrollCapture?: GenericEventHandler<Target> | undefined;
  onScrollEnd?: GenericEventHandler<Target> | undefined;
  onScrollEndCapture?: GenericEventHandler<Target> | undefined;
  onScrollSnapChange?: SnapEventHandler<Target> | undefined;
  onScrollSnapChangeCapture?: SnapEventHandler<Target> | undefined;
  onScrollSnapChanging?: SnapEventHandler<Target> | undefined;
  onScrollSnapChangingCapture?: SnapEventHandler<Target> | undefined;

  // Wheel Events
  onWheel?: WheelEventHandler<Target> | undefined;
  onWheelCapture?: WheelEventHandler<Target> | undefined;

  // Animation Events
  onAnimationStart?: AnimationEventHandler<Target> | undefined;
  onAnimationStartCapture?: AnimationEventHandler<Target> | undefined;
  onAnimationEnd?: AnimationEventHandler<Target> | undefined;
  onAnimationEndCapture?: AnimationEventHandler<Target> | undefined;
  onAnimationIteration?: AnimationEventHandler<Target> | undefined;
  onAnimationIterationCapture?: AnimationEventHandler<Target> | undefined;

  // Transition Events
  onTransitionCancel?: TransitionEventHandler<Target>;
  onTransitionCancelCapture?: TransitionEventHandler<Target>;
  onTransitionEnd?: TransitionEventHandler<Target>;
  onTransitionEndCapture?: TransitionEventHandler<Target>;
  onTransitionRun?: TransitionEventHandler<Target>;
  onTransitionRunCapture?: TransitionEventHandler<Target>;
  onTransitionStart?: TransitionEventHandler<Target>;
  onTransitionStartCapture?: TransitionEventHandler<Target>;

  // PictureInPicture Events
  onEnterPictureInPicture?: PictureInPictureEventHandler<Target>;
  onEnterPictureInPictureCapture?: PictureInPictureEventHandler<Target>;
  onLeavePictureInPicture?: PictureInPictureEventHandler<Target>;
  onLeavePictureInPictureCapture?: PictureInPictureEventHandler<Target>;
  onResize?: PictureInPictureEventHandler<Target>;
  onResizeCapture?: PictureInPictureEventHandler<Target>;

  onCommand?: CommandEventHandler<Target>;
}

// All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
export interface AriaAttributes {
  /** Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application. */
  "aria-activedescendant"?: RefOrValue<string | undefined>;
  /** Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. */
  "aria-atomic"?: RefOrValue<Booleanish | undefined>;
  /**
   * Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be
   * presented if they are made.
   */
  "aria-autocomplete"?: RefOrValue<"none" | "inline" | "list" | "both" | undefined>;
  /**
   * Defines a string value that labels the current element, which is intended to be converted into Braille.
   * @see aria-label.
   */
  "aria-braillelabel"?: RefOrValue<string | undefined>;
  /**
   * Defines a human-readable, author-localized abbreviated description for the role of an element, which is intended to be converted into Braille.
   * @see aria-roledescription.
   */
  "aria-brailleroledescription"?: RefOrValue<string | undefined>;
  /** Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user. */
  "aria-busy"?: RefOrValue<Booleanish | undefined>;
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
   * @see aria-pressed
   * @see aria-selected.
   */
  "aria-checked"?: RefOrValue<Booleanish | "mixed" | undefined>;
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * @see aria-colindex.
   */
  "aria-colcount"?: RefOrValue<number | undefined>;
  /**
   * Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
   * @see aria-colcount
   * @see aria-colspan.
   */
  "aria-colindex"?: RefOrValue<number | undefined>;
  /**
   * Defines a human readable text alternative of aria-colindex.
   * @see aria-rowindextext.
   */
  "aria-colindextext"?: RefOrValue<string | undefined>;
  /**
   * Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-colindex
   * @see aria-rowspan.
   */
  "aria-colspan"?: RefOrValue<number | undefined>;
  /**
   * Identifies the element (or elements) whose contents or presence are controlled by the current element.
   * @see aria-owns.
   */
  "aria-controls"?: RefOrValue<string | undefined>;
  /** Indicates the element that represents the current item within a container or set of related elements. */
  "aria-current"?: RefOrValue<
    Booleanish | "page" | "step" | "location" | "date" | "time" | undefined
  >;
  /**
   * Identifies the element (or elements) that describes the object.
   * @see aria-labelledby
   */
  "aria-describedby"?: RefOrValue<string | undefined>;
  /**
   * Defines a string value that describes or annotates the current element.
   * @see related aria-describedby.
   */
  "aria-description"?: RefOrValue<string | undefined>;
  /**
   * Identifies the element that provides a detailed, extended description for the object.
   * @see aria-describedby.
   */
  "aria-details"?: RefOrValue<string | undefined>;
  /**
   * Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
   * @see aria-hidden
   * @see aria-readonly.
   */
  "aria-disabled"?: RefOrValue<Booleanish | undefined>;
  /**
   * Indicates what functions can be performed when a dragged object is released on the drop target.
   * @deprecated in ARIA 1.1
   */
  "aria-dropeffect"?: RefOrValue<
    "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined
  >;
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid
   * @see aria-describedby.
   */
  "aria-errormessage"?: RefOrValue<string | undefined>;
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  "aria-expanded"?: RefOrValue<Booleanish | undefined>;
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  "aria-flowto"?: RefOrValue<string | undefined>;
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  "aria-grabbed"?: RefOrValue<Booleanish | undefined>;
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  "aria-haspopup"?: RefOrValue<
    Booleanish | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined
  >;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * @see aria-disabled.
   */
  "aria-hidden"?: RefOrValue<Booleanish | undefined>;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * @see aria-errormessage.
   */
  "aria-invalid"?: RefOrValue<Booleanish | "grammar" | "spelling" | undefined>;
  /** Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. */
  "aria-keyshortcuts"?: RefOrValue<string | undefined>;
  /**
   * Defines a string value that labels the current element.
   * @see aria-labelledby.
   */
  "aria-label"?: RefOrValue<string | undefined>;
  /**
   * Identifies the element (or elements) that labels the current element.
   * @see aria-describedby.
   */
  "aria-labelledby"?: RefOrValue<string | undefined>;
  /** Defines the hierarchical level of an element within a structure. */
  "aria-level"?: RefOrValue<number | undefined>;
  /** Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. */
  "aria-live"?: RefOrValue<"off" | "assertive" | "polite" | undefined>;
  /** Indicates whether an element is modal when displayed. */
  "aria-modal"?: RefOrValue<Booleanish | undefined>;
  /** Indicates whether a text box accepts multiple lines of input or only a single line. */
  "aria-multiline"?: RefOrValue<Booleanish | undefined>;
  /** Indicates that the user may select more than one item from the current selectable descendants. */
  "aria-multiselectable"?: RefOrValue<Booleanish | undefined>;
  /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
  "aria-orientation"?: RefOrValue<"horizontal" | "vertical" | undefined>;
  /**
   * Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
   * between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
   * @see aria-controls.
   */
  "aria-owns"?: RefOrValue<string | undefined>;
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
   * A hint could be a sample value or a brief description of the expected format.
   */
  "aria-placeholder"?: RefOrValue<string | undefined>;
  /**
   * Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-setsize.
   */
  "aria-posinset"?: RefOrValue<number | undefined>;
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * @see aria-checked
   * @see aria-selected.
   */
  "aria-pressed"?: RefOrValue<Booleanish | "mixed" | undefined>;
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * @see aria-disabled.
   */
  "aria-readonly"?: RefOrValue<Booleanish | undefined>;
  /**
   * Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
   * @see aria-atomic.
   */
  "aria-relevant"?: RefOrValue<
    | "additions"
    | "additions removals"
    | "additions text"
    | "all"
    | "removals"
    | "removals additions"
    | "removals text"
    | "text"
    | "text additions"
    | "text removals"
    | undefined
  >;
  /** Indicates that user input is required on the element before a form may be submitted. */
  "aria-required"?: RefOrValue<Booleanish | undefined>;
  /** Defines a human-readable, author-localized description for the role of an element. */
  "aria-roledescription"?: RefOrValue<string | undefined>;
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * @see aria-rowindex.
   */
  "aria-rowcount"?: RefOrValue<number | undefined>;
  /**
   * Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
   * @see aria-rowcount
   * @see aria-rowspan.
   */
  "aria-rowindex"?: RefOrValue<number | undefined>;
  /**
   * Defines a human readable text alternative of aria-rowindex.
   * @see aria-colindextext.
   */
  "aria-rowindextext"?: RefOrValue<string | undefined>;
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
   * @see aria-rowindex
   * @see aria-colspan.
   */
  "aria-rowspan"?: RefOrValue<number | undefined>;
  /**
   * Indicates the current "selected" state of various widgets.
   * @see aria-checked
   * @see aria-pressed.
   */
  "aria-selected"?: RefOrValue<Booleanish | undefined>;
  /**
   * Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
   * @see aria-posinset.
   */
  "aria-setsize"?: RefOrValue<number | undefined>;
  /** Indicates if items in a table or grid are sorted in ascending or descending order. */
  "aria-sort"?: RefOrValue<"none" | "ascending" | "descending" | "other" | undefined>;
  /** Defines the maximum allowed value for a range widget. */
  "aria-valuemax"?: RefOrValue<number | undefined>;
  /** Defines the minimum allowed value for a range widget. */
  "aria-valuemin"?: RefOrValue<number | undefined>;
  /**
   * Defines the current value for a range widget.
   * @see aria-valuetext.
   */
  "aria-valuenow"?: RefOrValue<number | undefined>;
  /** Defines the human readable text alternative of aria-valuenow for a range widget. */
  "aria-valuetext"?: RefOrValue<string | undefined>;
}

// All the WAI-ARIA 1.2 role attribute values from https://www.w3.org/TR/wai-aria-1.2/#role_definitions
export type WAIAriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "blockquote"
  | "button"
  | "caption"
  | "cell"
  | "checkbox"
  | "code"
  | "columnheader"
  | "combobox"
  | "command"
  | "complementary"
  | "composite"
  | "contentinfo"
  | "definition"
  | "deletion"
  | "dialog"
  | "directory"
  | "document"
  | "emphasis"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "input"
  | "insertion"
  | "landmark"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "meter"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "paragraph"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "range"
  | "region"
  | "roletype"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "section"
  | "sectionhead"
  | "select"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "strong"
  | "structure"
  | "subscript"
  | "superscript"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "time"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem"
  | "widget"
  | "window"
  | "none presentation";

// All the Digital Publishing WAI-ARIA 1.0 role attribute values from https://www.w3.org/TR/dpub-aria-1.0/#role_definitions
export type DPubAriaRole =
  | "doc-abstract"
  | "doc-acknowledgments"
  | "doc-afterword"
  | "doc-appendix"
  | "doc-backlink"
  | "doc-biblioentry"
  | "doc-bibliography"
  | "doc-biblioref"
  | "doc-chapter"
  | "doc-colophon"
  | "doc-conclusion"
  | "doc-cover"
  | "doc-credit"
  | "doc-credits"
  | "doc-dedication"
  | "doc-endnote"
  | "doc-endnotes"
  | "doc-epigraph"
  | "doc-epilogue"
  | "doc-errata"
  | "doc-example"
  | "doc-footnote"
  | "doc-foreword"
  | "doc-glossary"
  | "doc-glossref"
  | "doc-index"
  | "doc-introduction"
  | "doc-noteref"
  | "doc-notice"
  | "doc-pagebreak"
  | "doc-pagelist"
  | "doc-part"
  | "doc-preface"
  | "doc-prologue"
  | "doc-pullquote"
  | "doc-qna"
  | "doc-subtitle"
  | "doc-tip"
  | "doc-toc";

export type AriaRole = WAIAriaRole | DPubAriaRole;

export interface AllHTMLAttributes<RefType extends EventTarget = EventTarget>
  extends DOMAttributes<RefType>,
    AriaAttributes {
  // Standard HTML Attributes
  accept?: RefOrValue<string | undefined>;
  acceptCharset?: RefOrValue<string | undefined>;
  "accept-charset"?: RefOrValue<AllHTMLAttributes["acceptCharset"]>;
  accessKey?: RefOrValue<string | undefined>;
  accesskey?: RefOrValue<AllHTMLAttributes["accessKey"]>;
  action?: RefOrValue<string | undefined>;
  allow?: RefOrValue<string | undefined>;
  allowFullScreen?: RefOrValue<boolean | undefined>;
  allowTransparency?: RefOrValue<boolean | undefined>;
  alt?: RefOrValue<string | undefined>;
  as?: RefOrValue<string | undefined>;
  async?: RefOrValue<boolean | undefined>;
  autocomplete?: RefOrValue<string | undefined>;
  autoComplete?: RefOrValue<string | undefined>;
  autocorrect?: RefOrValue<string | undefined>;
  autoCorrect?: RefOrValue<string | undefined>;
  autofocus?: RefOrValue<boolean | undefined>;
  autoFocus?: RefOrValue<boolean | undefined>;
  autoPlay?: RefOrValue<boolean | undefined>;
  autoplay?: RefOrValue<boolean | undefined>;
  capture?: RefOrValue<boolean | string | undefined>;
  cellPadding?: RefOrValue<number | string | undefined>;
  cellSpacing?: RefOrValue<number | string | undefined>;
  charSet?: RefOrValue<string | undefined>;
  charset?: RefOrValue<string | undefined>;
  challenge?: RefOrValue<string | undefined>;
  checked?: RefOrValue<boolean | undefined>;
  cite?: RefOrValue<string | undefined>;
  class?: RefOrValue<string | undefined>;
  className?: RefOrValue<string | undefined>;
  cols?: RefOrValue<number | undefined>;
  colSpan?: RefOrValue<number | undefined>;
  colspan?: RefOrValue<number | undefined>;
  content?: RefOrValue<string | undefined>;
  contentEditable?: RefOrValue<Booleanish | "" | "plaintext-only" | "inherit" | undefined>;
  contenteditable?: RefOrValue<AllHTMLAttributes["contentEditable"]>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contextmenu */
  contextMenu?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contextmenu */
  contextmenu?: RefOrValue<string | undefined>;
  controls?: RefOrValue<boolean | undefined>;
  controlslist?: RefOrValue<string | undefined>;
  controlsList?: RefOrValue<string | undefined>;
  coords?: RefOrValue<string | undefined>;
  crossOrigin?: RefOrValue<string | undefined>;
  crossorigin?: RefOrValue<string | undefined>;
  currentTime?: RefOrValue<number | undefined>;
  data?: RefOrValue<string | undefined>;
  dateTime?: RefOrValue<string | undefined>;
  datetime?: RefOrValue<string | undefined>;
  default?: RefOrValue<boolean | undefined>;
  defaultChecked?: RefOrValue<boolean | undefined>;
  defaultMuted?: RefOrValue<boolean | undefined>;
  defaultPlaybackRate?: RefOrValue<number | undefined>;
  defaultValue?: RefOrValue<string | undefined>;
  defer?: RefOrValue<boolean | undefined>;
  dir?: RefOrValue<"auto" | "rtl" | "ltr" | undefined>;
  disabled?: RefOrValue<boolean | undefined>;
  disableremoteplayback?: RefOrValue<boolean | undefined>;
  disableRemotePlayback?: RefOrValue<boolean | undefined>;
  download?: RefOrValue<any | undefined>;
  decoding?: RefOrValue<"sync" | "async" | "auto" | undefined>;
  draggable?: RefOrValue<boolean | undefined>;
  encType?: RefOrValue<string | undefined>;
  enctype?: RefOrValue<string | undefined>;
  enterkeyhint?: RefOrValue<
    "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined
  >;
  elementTiming?: RefOrValue<string | undefined>;
  elementtiming?: RefOrValue<AllHTMLAttributes["elementTiming"]>;
  exportparts?: RefOrValue<string | undefined>;
  for?: RefOrValue<string | undefined>;
  form?: RefOrValue<string | undefined>;
  formAction?: RefOrValue<string | undefined>;
  formaction?: RefOrValue<string | undefined>;
  formEncType?: RefOrValue<string | undefined>;
  formenctype?: RefOrValue<string | undefined>;
  formMethod?: RefOrValue<string | undefined>;
  formmethod?: RefOrValue<string | undefined>;
  formNoValidate?: RefOrValue<boolean | undefined>;
  formnovalidate?: RefOrValue<boolean | undefined>;
  formTarget?: RefOrValue<string | undefined>;
  formtarget?: RefOrValue<string | undefined>;
  frameBorder?: RefOrValue<number | string | undefined>;
  frameborder?: RefOrValue<number | string | undefined>;
  headers?: RefOrValue<string | undefined>;
  height?: RefOrValue<number | string | undefined>;
  hidden?: RefOrValue<boolean | "hidden" | "until-found" | undefined>;
  high?: RefOrValue<number | undefined>;
  href?: RefOrValue<string | undefined>;
  hrefLang?: RefOrValue<string | undefined>;
  hreflang?: RefOrValue<string | undefined>;
  htmlFor?: RefOrValue<string | undefined>;
  httpEquiv?: RefOrValue<string | undefined>;
  "http-equiv"?: RefOrValue<string | undefined>;
  icon?: RefOrValue<string | undefined>;
  id?: RefOrValue<string | undefined>;
  indeterminate?: RefOrValue<boolean | undefined>;
  inert?: RefOrValue<boolean | undefined>;
  inputMode?: RefOrValue<string | undefined>;
  inputmode?: RefOrValue<string | undefined>;
  integrity?: RefOrValue<string | undefined>;
  is?: RefOrValue<string | undefined>;
  keyParams?: RefOrValue<string | undefined>;
  keyType?: RefOrValue<string | undefined>;
  kind?: RefOrValue<string | undefined>;
  label?: RefOrValue<string | undefined>;
  lang?: RefOrValue<string | undefined>;
  list?: RefOrValue<string | undefined>;
  loading?: RefOrValue<"eager" | "lazy" | undefined>;
  loop?: RefOrValue<boolean | undefined>;
  low?: RefOrValue<number | undefined>;
  manifest?: RefOrValue<string | undefined>;
  marginHeight?: RefOrValue<number | undefined>;
  marginWidth?: RefOrValue<number | undefined>;
  max?: RefOrValue<number | string | undefined>;
  maxLength?: RefOrValue<number | undefined>;
  maxlength?: RefOrValue<number | undefined>;
  media?: RefOrValue<string | undefined>;
  mediaGroup?: RefOrValue<string | undefined>;
  method?: RefOrValue<string | undefined>;
  min?: RefOrValue<number | string | undefined>;
  minLength?: RefOrValue<number | undefined>;
  minlength?: RefOrValue<number | undefined>;
  multiple?: RefOrValue<boolean | undefined>;
  muted?: RefOrValue<boolean | undefined>;
  name?: RefOrValue<string | undefined>;
  nomodule?: RefOrValue<boolean | undefined>;
  nonce?: RefOrValue<string | undefined>;
  noValidate?: RefOrValue<boolean | undefined>;
  novalidate?: RefOrValue<boolean | undefined>;
  open?: RefOrValue<boolean | undefined>;
  optimum?: RefOrValue<number | undefined>;
  part?: RefOrValue<string | undefined>;
  pattern?: RefOrValue<string | undefined>;
  ping?: RefOrValue<string | undefined>;
  placeholder?: RefOrValue<string | undefined>;
  playsInline?: RefOrValue<boolean | undefined>;
  playsinline?: RefOrValue<boolean | undefined>;
  playbackRate?: RefOrValue<number | undefined>;
  popover?: RefOrValue<"auto" | "hint" | "manual" | boolean | undefined>;
  popovertarget?: RefOrValue<string | undefined>;
  popoverTarget?: RefOrValue<string | undefined>;
  popovertargetaction?: RefOrValue<"hide" | "show" | "toggle" | undefined>;
  popoverTargetAction?: RefOrValue<"hide" | "show" | "toggle" | undefined>;
  poster?: RefOrValue<string | undefined>;
  preload?: RefOrValue<"auto" | "metadata" | "none" | undefined>;
  preservesPitch?: RefOrValue<boolean | undefined>;
  radioGroup?: RefOrValue<string | undefined>;
  readonly?: RefOrValue<boolean | undefined>;
  readOnly?: RefOrValue<boolean | undefined>;
  referrerpolicy?: RefOrValue<
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url"
    | undefined
  >;
  rel?: RefOrValue<string | undefined>;
  required?: RefOrValue<boolean | undefined>;
  reversed?: RefOrValue<boolean | undefined>;
  role?: RefOrValue<AriaRole | undefined>;
  rows?: RefOrValue<number | undefined>;
  rowSpan?: RefOrValue<number | undefined>;
  rowspan?: RefOrValue<number | undefined>;
  sandbox?: RefOrValue<string | undefined>;
  scope?: RefOrValue<string | undefined>;
  scoped?: RefOrValue<boolean | undefined>;
  scrolling?: RefOrValue<string | undefined>;
  seamless?: RefOrValue<boolean | undefined>;
  selected?: RefOrValue<boolean | undefined>;
  shape?: RefOrValue<string | undefined>;
  size?: RefOrValue<number | undefined>;
  sizes?: RefOrValue<string | undefined>;
  slot?: RefOrValue<string | undefined>;
  span?: RefOrValue<number | undefined>;
  spellcheck?: RefOrValue<boolean | undefined>;
  src?: RefOrValue<string | undefined>;
  srcDoc?: RefOrValue<string | undefined>;
  srcdoc?: RefOrValue<string | undefined>;
  srcLang?: RefOrValue<string | undefined>;
  srclang?: RefOrValue<string | undefined>;
  srcSet?: RefOrValue<string | undefined>;
  srcset?: RefOrValue<string | undefined>;
  srcObject?: RefOrValue<MediaStream | MediaSource | Blob | File | null>;
  start?: RefOrValue<number | undefined>;
  step?: RefOrValue<number | string | undefined>;
  style?: RefOrValue<string | CSSProperties | undefined>;
  summary?: RefOrValue<string | undefined>;
  tabIndex?: RefOrValue<number | undefined>;
  tabindex?: RefOrValue<number | undefined>;
  target?: RefOrValue<string | undefined>;
  title?: RefOrValue<string | undefined>;
  type?: RefOrValue<string | undefined>;
  useMap?: RefOrValue<string | undefined>;
  usemap?: RefOrValue<string | undefined>;
  value?: RefOrValue<string | string[] | number | undefined>;
  volume?: RefOrValue<string | number | undefined>;
  width?: RefOrValue<number | string | undefined>;
  wmode?: RefOrValue<string | undefined>;
  wrap?: RefOrValue<string | undefined>;

  // Non-standard Attributes
  autocapitalize?: RefOrValue<
    "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined
  >;
  autoCapitalize?: RefOrValue<
    "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined
  >;
  disablePictureInPicture?: RefOrValue<boolean | undefined>;
  results?: RefOrValue<number | undefined>;
  translate?: RefOrValue<boolean | undefined>;

  // RDFa Attributes
  about?: RefOrValue<string | undefined>;
  datatype?: RefOrValue<string | undefined>;
  inlist?: RefOrValue<any>;
  prefix?: RefOrValue<string | undefined>;
  property?: RefOrValue<string | undefined>;
  resource?: RefOrValue<string | undefined>;
  typeof?: RefOrValue<string | undefined>;
  vocab?: RefOrValue<string | undefined>;

  // Microdata Attributes
  itemProp?: RefOrValue<string | undefined>;
  itemprop?: RefOrValue<string | undefined>;
  itemScope?: RefOrValue<boolean | undefined>;
  itemscope?: RefOrValue<boolean | undefined>;
  itemType?: RefOrValue<string | undefined>;
  itemtype?: RefOrValue<string | undefined>;
  itemID?: RefOrValue<string | undefined>;
  itemid?: RefOrValue<string | undefined>;
  itemRef?: RefOrValue<string | undefined>;
  itemref?: RefOrValue<string | undefined>;
}

export interface HTMLAttributes<RefType extends EventTarget = EventTarget>
  extends DOMAttributes<RefType>,
    AriaAttributes {
  // Standard HTML Attributes
  accesskey?: RefOrValue<string | undefined>;
  accessKey?: RefOrValue<string | undefined>;
  autocapitalize?: RefOrValue<
    "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined
  >;
  autoCapitalize?: RefOrValue<
    "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined
  >;
  autocorrect?: RefOrValue<string | undefined>;
  autoCorrect?: RefOrValue<string | undefined>;
  autofocus?: RefOrValue<boolean | undefined>;
  autoFocus?: RefOrValue<boolean | undefined>;
  class?: RefOrValue<string | undefined>;
  className?: RefOrValue<string | undefined>;
  contenteditable?: RefOrValue<Booleanish | "" | "plaintext-only" | "inherit" | undefined>;
  contentEditable?: RefOrValue<Booleanish | "" | "plaintext-only" | "inherit" | undefined>;
  dir?: RefOrValue<"auto" | "rtl" | "ltr" | undefined>;
  draggable?: RefOrValue<boolean | undefined>;
  enterkeyhint?: RefOrValue<
    "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined
  >;
  exportparts?: RefOrValue<string | undefined>;
  hidden?: RefOrValue<boolean | "hidden" | "until-found" | undefined>;
  id?: RefOrValue<string | undefined>;
  inert?: RefOrValue<boolean | undefined>;
  inputmode?: RefOrValue<string | undefined>;
  inputMode?: RefOrValue<string | undefined>;
  is?: RefOrValue<string | undefined>;
  lang?: RefOrValue<string | undefined>;
  nonce?: RefOrValue<string | undefined>;
  part?: RefOrValue<string | undefined>;
  popover?: RefOrValue<"auto" | "hint" | "manual" | boolean | undefined>;
  slot?: RefOrValue<string | undefined>;
  spellcheck?: RefOrValue<boolean | undefined>;
  style?: RefOrValue<string | CSSProperties | undefined>;
  tabindex?: RefOrValue<number | undefined>;
  tabIndex?: RefOrValue<number | undefined>;
  title?: RefOrValue<string | undefined>;
  translate?: RefOrValue<boolean | undefined>;

  // WAI-ARIA Attributes
  // Most elements only allow a subset of roles and so this
  // is overwritten in many of the per-element interfaces below
  role?: RefOrValue<AriaRole | undefined>;

  // Non-standard Attributes
  disablePictureInPicture?: RefOrValue<boolean | undefined>;
  elementtiming?: RefOrValue<string | undefined>;
  elementTiming?: RefOrValue<string | undefined>;
  results?: RefOrValue<number | undefined>;

  // RDFa Attributes
  about?: RefOrValue<string | undefined>;
  datatype?: RefOrValue<string | undefined>;
  inlist?: RefOrValue<any>;
  prefix?: RefOrValue<string | undefined>;
  property?: RefOrValue<string | undefined>;
  resource?: RefOrValue<string | undefined>;
  typeof?: RefOrValue<string | undefined>;
  vocab?: RefOrValue<string | undefined>;

  // Microdata Attributes
  itemid?: RefOrValue<string | undefined>;
  itemID?: RefOrValue<string | undefined>;
  itemprop?: RefOrValue<string | undefined>;
  itemProp?: RefOrValue<string | undefined>;
  itemref?: RefOrValue<string | undefined>;
  itemRef?: RefOrValue<string | undefined>;
  itemscope?: RefOrValue<boolean | undefined>;
  itemScope?: RefOrValue<boolean | undefined>;
  itemtype?: RefOrValue<string | undefined>;
  itemType?: RefOrValue<string | undefined>;
}

export type HTMLAttributeReferrerPolicy =
  | ""
  | "no-referrer"
  | "no-referrer-when-downgrade"
  | "origin"
  | "origin-when-cross-origin"
  | "same-origin"
  | "strict-origin"
  | "strict-origin-when-cross-origin"
  | "unsafe-url";

export type HTMLAttributeAnchorTarget = "_self" | "_blank" | "_parent" | "_top" | (string & {});

export interface PartialAnchorHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
  download?: RefOrValue<any>;
  hreflang?: RefOrValue<string | undefined>;
  hrefLang?: RefOrValue<string | undefined>;
  media?: RefOrValue<string | undefined>;
  ping?: RefOrValue<string | undefined>;
  rel?: RefOrValue<string | undefined>;
  target?: RefOrValue<HTMLAttributeAnchorTarget | undefined>;
  type?: RefOrValue<string | undefined>;
  referrerpolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  referrerPolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
}

export type AnchorAriaRoles =
  | {
      href: RefOrValue<string>;
      role?: RefOrValue<
        | "link"
        | "button"
        | "checkbox"
        | "menuitem"
        | "menuitemcheckbox"
        | "menuitemradio"
        | "option"
        | "radio"
        | "switch"
        | "tab"
        | "treeitem"
        | "doc-backlink"
        | "doc-biblioref"
        | "doc-glossref"
        | "doc-noteref"
        | undefined
      >;
    }
  | {
      href?: never;
      role?: RefOrValue<AriaRole | undefined>;
    };

export type AccessibleAnchorHTMLAttributes<T extends EventTarget = HTMLAnchorElement> = Omit<
  PartialAnchorHTMLAttributes<T>,
  "role"
> &
  AnchorAriaRoles;

export interface AnchorHTMLAttributes<T extends EventTarget = HTMLAnchorElement>
  extends PartialAnchorHTMLAttributes<T> {
  href?: RefOrValue<string | undefined>;
  role?: RefOrValue<AriaRole | undefined>;
}

export interface PartialAreaHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
  alt?: RefOrValue<string | undefined>;
  coords?: RefOrValue<string | undefined>;
  download?: RefOrValue<any>;
  hreflang?: RefOrValue<string | undefined>;
  hrefLang?: RefOrValue<string | undefined>;
  media?: RefOrValue<string | undefined>;
  referrerpolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  referrerPolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  rel?: RefOrValue<string | undefined>;
  shape?: RefOrValue<string | undefined>;
  target?: RefOrValue<HTMLAttributeAnchorTarget | undefined>;
}

export type AreaAriaRoles =
  | {
      href: RefOrValue<string>;
      role?: RefOrValue<"link" | undefined>;
    }
  | {
      href?: never;
      role?: RefOrValue<"button" | "link" | undefined>;
    };

export type AccessibleAreaHTMLAttributes<T extends EventTarget = HTMLAreaElement> = Omit<
  PartialAreaHTMLAttributes<T>,
  "role"
> &
  AreaAriaRoles;

export interface AreaHTMLAttributes<T extends EventTarget = HTMLAreaElement>
  extends PartialAreaHTMLAttributes<T> {
  href?: RefOrValue<string | undefined>;
  role?: RefOrValue<"button" | "link" | undefined>;
}

export interface ArticleHTMLAttributes<T extends EventTarget = HTMLElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<
    | "article"
    | "application"
    | "document"
    | "feed"
    | "main"
    | "none"
    | "presentation"
    | "region"
    | undefined
  >;
}

export interface AsideHTMLAttributes<T extends EventTarget = HTMLElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<
    | "complementary"
    | "feed"
    | "none"
    | "note"
    | "presentation"
    | "region"
    | "search"
    | "doc-dedication"
    | "doc-example"
    | "doc-footnote"
    | "doc-glossary"
    | "doc-pullquote"
    | "doc-tip"
    | undefined
  >;
}

export interface AudioHTMLAttributes<T extends EventTarget = HTMLAudioElement>
  extends MediaHTMLAttributes<T> {
  role?: RefOrValue<"application" | undefined>;
}

export interface BaseHTMLAttributes<T extends EventTarget = HTMLBaseElement>
  extends HTMLAttributes<T> {
  href?: RefOrValue<string | undefined>;
  role?: never;
  target?: RefOrValue<HTMLAttributeAnchorTarget | undefined>;
}

export interface BlockquoteHTMLAttributes<T extends EventTarget = HTMLQuoteElement>
  extends HTMLAttributes<T> {
  cite?: RefOrValue<string | undefined>;
}

export interface BrHTMLAttributes<T extends EventTarget = HTMLBRElement> extends HTMLAttributes<T> {
  role?: RefOrValue<"none" | "presentation" | undefined>;
}

export interface ButtonHTMLAttributes<T extends EventTarget = HTMLButtonElement>
  extends HTMLAttributes<T> {
  command?: RefOrValue<string | undefined>;
  commandfor?: RefOrValue<string | undefined>;
  commandFor?: RefOrValue<string | undefined>;
  disabled?: RefOrValue<boolean | undefined>;
  form?: RefOrValue<string | undefined>;
  formaction?: RefOrValue<string | undefined>;
  formAction?: RefOrValue<string | undefined>;
  formenctype?: RefOrValue<string | undefined>;
  formEncType?: RefOrValue<string | undefined>;
  formmethod?: RefOrValue<string | undefined>;
  formMethod?: RefOrValue<string | undefined>;
  formnovalidate?: RefOrValue<boolean | undefined>;
  formNoValidate?: RefOrValue<boolean | undefined>;
  formtarget?: RefOrValue<string | undefined>;
  formTarget?: RefOrValue<string | undefined>;
  name?: RefOrValue<string | undefined>;
  popovertarget?: RefOrValue<string | undefined>;
  popoverTarget?: RefOrValue<string | undefined>;
  popovertargetaction?: RefOrValue<"hide" | "show" | "toggle" | undefined>;
  popoverTargetAction?: RefOrValue<"hide" | "show" | "toggle" | undefined>;
  role?: RefOrValue<
    | "button"
    | "checkbox"
    | "combobox"
    | "gridcell"
    | "link"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "option"
    | "radio"
    | "separator"
    | "slider"
    | "switch"
    | "tab"
    | "treeitem"
    | undefined
  >;
  type?: RefOrValue<"submit" | "reset" | "button" | undefined>;
  value?: RefOrValue<string | number | undefined>;
}

export interface CanvasHTMLAttributes<T extends EventTarget = HTMLCanvasElement>
  extends HTMLAttributes<T> {
  height?: RefOrValue<number | string | undefined>;
  width?: RefOrValue<number | string | undefined>;
}

export interface CaptionHTMLAttributes<T extends EventTarget = HTMLElement>
  extends HTMLAttributes<T> {
  role?: "caption";
}

export interface ColHTMLAttributes<T extends EventTarget = HTMLTableColElement>
  extends HTMLAttributes<T> {
  role?: never;
  span?: RefOrValue<number | undefined>;
  width?: RefOrValue<number | string | undefined>;
}

export interface ColgroupHTMLAttributes<T extends EventTarget = HTMLTableColElement>
  extends HTMLAttributes<T> {
  role?: never;
  span?: RefOrValue<number | undefined>;
}

export interface DataHTMLAttributes<T extends EventTarget = HTMLDataElement>
  extends HTMLAttributes<T> {
  value?: RefOrValue<string | number | undefined>;
}

export interface DataListHTMLAttributes<T extends EventTarget = HTMLDataListElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<"listbox" | undefined>;
}

export interface DdHTMLAttributes<T extends EventTarget = HTMLElement> extends HTMLAttributes<T> {
  role?: never;
}

export interface DelHTMLAttributes<T extends EventTarget = HTMLModElement>
  extends HTMLAttributes<T> {
  cite?: RefOrValue<string | undefined>;
  datetime?: RefOrValue<string | undefined>;
  dateTime?: RefOrValue<string | undefined>;
}

export interface DetailsHTMLAttributes<T extends EventTarget = HTMLDetailsElement>
  extends HTMLAttributes<T> {
  name?: RefOrValue<string | undefined>;
  open?: RefOrValue<boolean | undefined>;
  role?: RefOrValue<"group" | undefined>;
}

export interface DialogHTMLAttributes<T extends EventTarget = HTMLDialogElement>
  extends HTMLAttributes<T> {
  onCancel?: GenericEventHandler<T> | undefined;
  onClose?: GenericEventHandler<T> | undefined;
  open?: RefOrValue<boolean | undefined>;
  closedby?: RefOrValue<"none" | "closerequest" | "any" | undefined>;
  closedBy?: RefOrValue<"none" | "closerequest" | "any" | undefined>;
  role?: RefOrValue<"dialog" | "alertdialog" | undefined>;
}

export interface DlHTMLAttributes<T extends EventTarget = HTMLDListElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<"group" | "list" | "none" | "presentation" | undefined>;
}

export interface DtHTMLAttributes<T extends EventTarget = HTMLElement> extends HTMLAttributes<T> {
  role?: RefOrValue<"listitem" | undefined>;
}

export interface EmbedHTMLAttributes<T extends EventTarget = HTMLEmbedElement>
  extends HTMLAttributes<T> {
  height?: RefOrValue<number | string | undefined>;
  role?: RefOrValue<"application" | "document" | "img" | "none" | "presentation" | undefined>;
  src?: RefOrValue<string | undefined>;
  type?: RefOrValue<string | undefined>;
  width?: RefOrValue<number | string | undefined>;
}

export interface FieldsetHTMLAttributes<T extends EventTarget = HTMLFieldSetElement>
  extends HTMLAttributes<T> {
  disabled?: RefOrValue<boolean | undefined>;
  form?: RefOrValue<string | undefined>;
  name?: RefOrValue<string | undefined>;
  role?: RefOrValue<"group" | "none" | "presentation" | "radiogroup" | undefined>;
}

export interface FigcaptionHTMLAttributes<T extends EventTarget = HTMLElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<"group" | "none" | "presentation" | undefined>;
}

export interface FooterHTMLAttributes<T extends EventTarget = HTMLElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<"contentinfo" | "group" | "none" | "presentation" | "doc-footnote" | undefined>;
}

export interface FormHTMLAttributes<T extends EventTarget = HTMLFormElement>
  extends HTMLAttributes<T> {
  "accept-charset"?: RefOrValue<string | undefined>;
  acceptCharset?: RefOrValue<string | undefined>;
  action?: RefOrValue<string | undefined>;
  autocomplete?: RefOrValue<string | undefined>;
  autoComplete?: RefOrValue<string | undefined>;
  enctype?: RefOrValue<string | undefined>;
  encType?: RefOrValue<string | undefined>;
  method?: RefOrValue<string | undefined>;
  name?: RefOrValue<string | undefined>;
  novalidate?: RefOrValue<boolean | undefined>;
  noValidate?: RefOrValue<boolean | undefined>;
  rel?: RefOrValue<string | undefined>;
  role?: RefOrValue<"form" | "none" | "presentation" | "search" | undefined>;
  target?: RefOrValue<string | undefined>;
}

export interface HeadingHTMLAttributes<T extends EventTarget = HTMLHeadingElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<"heading" | "none" | "presentation" | "tab" | "doc-subtitle" | undefined>;
}

export interface HeadHTMLAttributes<T extends EventTarget = HTMLHeadElement>
  extends HTMLAttributes<T> {
  role?: never;
}

export interface HeaderHTMLAttributes<T extends EventTarget = HTMLElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<"banner" | "group" | "none" | "presentation" | undefined>;
}

export interface HrHTMLAttributes<T extends EventTarget = HTMLHRElement> extends HTMLAttributes<T> {
  role?: RefOrValue<"separator" | "none" | "presentation" | "doc-pagebreak" | undefined>;
}

export interface HtmlHTMLAttributes<T extends EventTarget = HTMLHtmlElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<"document" | undefined>;
}

export interface IframeHTMLAttributes<T extends EventTarget = HTMLIFrameElement>
  extends HTMLAttributes<T> {
  allow?: RefOrValue<string | undefined>;
  allowFullScreen?: RefOrValue<boolean | undefined>;
  allowTransparency?: RefOrValue<boolean | undefined>;
  /** @deprecated */
  frameborder?: RefOrValue<number | string | undefined>;
  /** @deprecated */
  frameBorder?: RefOrValue<number | string | undefined>;
  height?: RefOrValue<number | string | undefined>;
  loading?: RefOrValue<"eager" | "lazy" | undefined>;
  /** @deprecated */
  marginHeight?: RefOrValue<number | undefined>;
  /** @deprecated */
  marginWidth?: RefOrValue<number | undefined>;
  name?: RefOrValue<string | undefined>;
  referrerpolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  referrerPolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  role?: RefOrValue<"application" | "document" | "img" | "none" | "presentation" | undefined>;
  sandbox?: RefOrValue<string | undefined>;
  /** @deprecated */
  scrolling?: RefOrValue<string | undefined>;
  seamless?: RefOrValue<boolean | undefined>;
  src?: RefOrValue<string | undefined>;
  srcdoc?: RefOrValue<string | undefined>;
  srcDoc?: RefOrValue<string | undefined>;
  width?: RefOrValue<number | string | undefined>;
}

export type HTMLAttributeCrossOrigin = "anonymous" | "use-credentials";

export interface PartialImgHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
  crossorigin?: RefOrValue<HTMLAttributeCrossOrigin>;
  crossOrigin?: RefOrValue<HTMLAttributeCrossOrigin>;
  decoding?: RefOrValue<"async" | "auto" | "sync" | undefined>;
  fetchpriority?: RefOrValue<"high" | "auto" | "low" | undefined>;
  fetchPriority?: RefOrValue<"high" | "auto" | "low" | undefined>;
  height?: RefOrValue<number | string | undefined>;
  loading?: RefOrValue<"eager" | "lazy" | undefined>;
  referrerpolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  referrerPolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  sizes?: RefOrValue<string | undefined>;
  src?: RefOrValue<string | undefined>;
  srcset?: RefOrValue<string | undefined>;
  srcSet?: RefOrValue<string | undefined>;
  usemap?: RefOrValue<string | undefined>;
  useMap?: RefOrValue<string | undefined>;
  width?: RefOrValue<number | string | undefined>;
}

export type ImgAriaRolesAccessibleName = RefOrValue<
  | "img"
  | "button"
  | "checkbox"
  | "link"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "meter"
  | "option"
  | "progressbar"
  | "radio"
  | "scrollbar"
  | "separator"
  | "slider"
  | "switch"
  | "tab"
  | "treeitem"
  | "doc-cover"
  | undefined
>;

export type ImgAriaRoles =
  | {
      "aria-label": RefOrValue<string>;
      role?: ImgAriaRolesAccessibleName;
    }
  | {
      "aria-labelledby": RefOrValue<string>;
      role?: ImgAriaRolesAccessibleName;
    }
  | {
      alt: RefOrValue<string>;
      role?: ImgAriaRolesAccessibleName;
    }
  | {
      title: RefOrValue<string>;
      role?: ImgAriaRolesAccessibleName;
    }
  | {
      "aria-label"?: never;
      "aria-labelledby"?: never;
      alt?: never;
      title?: never;
      role?: RefOrValue<"img" | "none" | "presentation" | undefined>;
    };

export type AccessibleImgHTMLAttributes<T extends EventTarget = HTMLImageElement> = Omit<
  PartialImgHTMLAttributes<T>,
  "role" | "aria-label" | "aria-labelledby" | "title"
> &
  ImgAriaRoles;

export interface ImgHTMLAttributes<T extends EventTarget = HTMLImageElement>
  extends PartialImgHTMLAttributes<T> {
  alt?: RefOrValue<string | undefined>;
  "aria-label"?: RefOrValue<string | undefined>;
  "aria-labelledby"?: RefOrValue<string | undefined>;
  href?: RefOrValue<string | undefined>;
  role?: ImgAriaRolesAccessibleName | RefOrValue<"img" | "none" | "presentation" | undefined>;
  title?: RefOrValue<string | undefined>;
}

export type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

export interface PartialInputHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
  accept?: RefOrValue<string | undefined>;
  alt?: RefOrValue<string | undefined>;
  autocomplete?: RefOrValue<string | undefined>;
  autoComplete?: RefOrValue<string | undefined>;
  capture?: RefOrValue<"user" | "environment" | undefined>; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
  checked?: RefOrValue<boolean | undefined>;
  defaultChecked?: RefOrValue<boolean | undefined>;
  defaultValue?: RefOrValue<string | number | undefined>;
  disabled?: RefOrValue<boolean | undefined>;
  enterKeyHint?: RefOrValue<
    "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined
  >;
  form?: RefOrValue<string | undefined>;
  formaction?: RefOrValue<string | undefined>;
  formAction?: RefOrValue<string | undefined>;
  formenctype?: RefOrValue<string | undefined>;
  formEncType?: RefOrValue<string | undefined>;
  formmethod?: RefOrValue<string | undefined>;
  formMethod?: RefOrValue<string | undefined>;
  formnovalidate?: RefOrValue<boolean | undefined>;
  formNoValidate?: RefOrValue<boolean | undefined>;
  formtarget?: RefOrValue<string | undefined>;
  formTarget?: RefOrValue<string | undefined>;
  height?: RefOrValue<number | string | undefined>;
  indeterminate?: RefOrValue<boolean | undefined>;
  max?: RefOrValue<number | string | undefined>;
  maxlength?: RefOrValue<number | undefined>;
  maxLength?: RefOrValue<number | undefined>;
  min?: RefOrValue<number | string | undefined>;
  minlength?: RefOrValue<number | undefined>;
  minLength?: RefOrValue<number | undefined>;
  multiple?: RefOrValue<boolean | undefined>;
  name?: RefOrValue<string | undefined>;
  pattern?: RefOrValue<string | undefined>;
  placeholder?: RefOrValue<string | undefined>;
  readonly?: RefOrValue<boolean | undefined>;
  readOnly?: RefOrValue<boolean | undefined>;
  required?: RefOrValue<boolean | undefined>;
  size?: RefOrValue<number | undefined>;
  src?: RefOrValue<string | undefined>;
  step?: RefOrValue<number | string | undefined>;
  value?: RefOrValue<string | number | undefined>;
  width?: RefOrValue<number | string | undefined>;
  onChange?: GenericEventHandler<T> | undefined;
}

export type InputAriaRoles =
  | {
      type: RefOrValue<"button">;
      role?: RefOrValue<
        | "button"
        | "checkbox"
        | "combobox"
        | "gridcell"
        | "link"
        | "menuitem"
        | "menuitemcheckbox"
        | "menuitemradio"
        | "option"
        | "radio"
        | "separator"
        | "slider"
        | "switch"
        | "tab"
        | "treeitem"
        | undefined
      >;
    }
  | {
      type: RefOrValue<"checkbox">;
      role?: RefOrValue<
        "checkbox" | "button" | "menuitemcheckbox" | "option" | "switch" | undefined
      >;
    }
  | {
      type: RefOrValue<"email">;
      list?: never;
      role?: RefOrValue<"textbox" | undefined>;
    }
  | {
      type: RefOrValue<"image">;
      role?: RefOrValue<
        | "button"
        | "checkbox"
        | "gridcell"
        | "link"
        | "menuitem"
        | "menuitemcheckbox"
        | "menuitemradio"
        | "option"
        | "separator"
        | "slider"
        | "switch"
        | "tab"
        | "treeitem"
        | undefined
      >;
    }
  | {
      type: RefOrValue<"number">;
      role?: RefOrValue<"spinbutton" | undefined>;
    }
  | {
      type: RefOrValue<"radio">;
      role?: RefOrValue<"radio" | "menuitemradio" | undefined>;
    }
  | {
      type: RefOrValue<"range">;
      role?: RefOrValue<"slider" | undefined>;
    }
  | {
      type: RefOrValue<"reset">;
      role?: RefOrValue<
        | "button"
        | "checkbox"
        | "combobox"
        | "gridcell"
        | "link"
        | "menuitem"
        | "menuitemcheckbox"
        | "menuitemradio"
        | "option"
        | "radio"
        | "separator"
        | "slider"
        | "switch"
        | "tab"
        | "treeitem"
        | undefined
      >;
    }
  | {
      type: RefOrValue<"search">;
      list?: never;
      role?: RefOrValue<"searchbox" | undefined>;
    }
  | {
      type: RefOrValue<"submit">;
      role?: RefOrValue<
        | "button"
        | "checkbox"
        | "combobox"
        | "gridcell"
        | "link"
        | "menuitem"
        | "menuitemcheckbox"
        | "menuitemradio"
        | "option"
        | "radio"
        | "separator"
        | "slider"
        | "switch"
        | "tab"
        | "treeitem"
        | undefined
      >;
    }
  | {
      type: RefOrValue<"tel">;
      list?: never;
      role?: RefOrValue<"textbox" | undefined>;
    }
  | {
      type?: RefOrValue<"text">;
      list?: never;
      role?: RefOrValue<"textbox" | "combobox" | "searchbox" | "spinbutton" | undefined>;
    }
  | {
      type?: RefOrValue<"text" | "search" | "tel" | "url" | "email">;
      list: RefOrValue<string | undefined>;
      role?: RefOrValue<"combobox" | undefined>;
    }
  | {
      type: RefOrValue<"url">;
      list?: never;
      role?: RefOrValue<"textbox" | undefined>;
    }
  | {
      type: RefOrValue<
        | "color"
        | "date"
        | "datetime-local"
        | "file"
        | "hidden"
        | "month"
        | "password"
        | "time"
        | "week"
      >;
      role?: never;
    };

export type AccessibleInputHTMLAttributes<T extends EventTarget = HTMLInputElement> = Omit<
  PartialInputHTMLAttributes<T>,
  "role"
> &
  InputAriaRoles;

export interface InputHTMLAttributes<T extends EventTarget = HTMLInputElement>
  extends PartialInputHTMLAttributes<T> {
  type?: RefOrValue<HTMLInputTypeAttribute | undefined>;
  role?: RefOrValue<
    | "button"
    | "checkbox"
    | "combobox"
    | "gridcell"
    | "link"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "option"
    | "radio"
    | "searchbox"
    | "separator"
    | "slider"
    | "spinbutton"
    | "switch"
    | "tab"
    | "textbox"
    | "treeitem"
    | undefined
  >;
}

export interface InsHTMLAttributes<T extends EventTarget = HTMLModElement>
  extends HTMLAttributes<T> {
  cite?: RefOrValue<string | undefined>;
  datetime?: RefOrValue<string | undefined>;
  dateTime?: RefOrValue<string | undefined>;
}

export interface KeygenHTMLAttributes<T extends EventTarget = HTMLUnknownElement>
  extends HTMLAttributes<T> {
  challenge?: RefOrValue<string | undefined>;
  disabled?: RefOrValue<boolean | undefined>;
  form?: RefOrValue<string | undefined>;
  keyType?: RefOrValue<string | undefined>;
  keyParams?: RefOrValue<string | undefined>;
  name?: RefOrValue<string | undefined>;
}

export interface LabelHTMLAttributes<T extends EventTarget = HTMLLabelElement>
  extends HTMLAttributes<T> {
  for?: RefOrValue<string | undefined>;
  form?: RefOrValue<string | undefined>;
  htmlFor?: RefOrValue<string | undefined>;
  role?: never;
}

export interface LegendHTMLAttributes<T extends EventTarget = HTMLLegendElement>
  extends HTMLAttributes<T> {
  role?: never;
}

export interface LiHTMLAttributes<T extends EventTarget = HTMLLIElement> extends HTMLAttributes<T> {
  value?: RefOrValue<string | number | undefined>;
}

export interface LinkHTMLAttributes<T extends EventTarget = HTMLLinkElement>
  extends HTMLAttributes<T> {
  as?: RefOrValue<string | undefined>;
  crossorigin?: RefOrValue<HTMLAttributeCrossOrigin>;
  crossOrigin?: RefOrValue<HTMLAttributeCrossOrigin>;
  fetchpriority?: RefOrValue<"high" | "low" | "auto" | undefined>;
  fetchPriority?: RefOrValue<"high" | "low" | "auto" | undefined>;
  href?: RefOrValue<string | undefined>;
  hreflang?: RefOrValue<string | undefined>;
  hrefLang?: RefOrValue<string | undefined>;
  integrity?: RefOrValue<string | undefined>;
  media?: RefOrValue<string | undefined>;
  imageSrcSet?: RefOrValue<string | undefined>;
  referrerpolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  referrerPolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  rel?: RefOrValue<string | undefined>;
  role?: never;
  sizes?: RefOrValue<string | undefined>;
  type?: RefOrValue<string | undefined>;
  charset?: RefOrValue<string | undefined>;
  charSet?: RefOrValue<string | undefined>;
}

export interface MainHTMLAttributes<T extends EventTarget = HTMLElement> extends HTMLAttributes<T> {
  role?: RefOrValue<"main" | undefined>;
}

export interface MapHTMLAttributes<T extends EventTarget = HTMLMapElement>
  extends HTMLAttributes<T> {
  name?: RefOrValue<string | undefined>;
  role?: never;
}

export interface MarqueeHTMLAttributes<T extends EventTarget = HTMLMarqueeElement>
  extends HTMLAttributes<T> {
  behavior?: RefOrValue<"scroll" | "slide" | "alternate" | undefined>;
  bgColor?: RefOrValue<string | undefined>;
  direction?: RefOrValue<"left" | "right" | "up" | "down" | undefined>;
  height?: RefOrValue<number | string | undefined>;
  hspace?: RefOrValue<number | string | undefined>;
  loop?: RefOrValue<number | string | undefined>;
  scrollAmount?: RefOrValue<number | string | undefined>;
  scrollDelay?: RefOrValue<number | string | undefined>;
  trueSpeed?: RefOrValue<boolean | undefined>;
  vspace?: RefOrValue<number | string | undefined>;
  width?: RefOrValue<number | string | undefined>;
}

export interface MediaHTMLAttributes<T extends EventTarget = HTMLMediaElement>
  extends HTMLAttributes<T> {
  autoplay?: RefOrValue<boolean | undefined>;
  autoPlay?: RefOrValue<boolean | undefined>;
  controls?: RefOrValue<boolean | undefined>;
  controlslist?: RefOrValue<string | undefined>;
  controlsList?: RefOrValue<string | undefined>;
  crossorigin?: RefOrValue<HTMLAttributeCrossOrigin>;
  crossOrigin?: RefOrValue<HTMLAttributeCrossOrigin>;
  currentTime?: RefOrValue<number | undefined>;
  defaultMuted?: RefOrValue<boolean | undefined>;
  defaultPlaybackRate?: RefOrValue<number | undefined>;
  disableremoteplayback?: RefOrValue<boolean | undefined>;
  disableRemotePlayback?: RefOrValue<boolean | undefined>;
  loop?: RefOrValue<boolean | undefined>;
  mediaGroup?: RefOrValue<string | undefined>;
  muted?: RefOrValue<boolean | undefined>;
  playbackRate?: RefOrValue<number | undefined>;
  preload?: RefOrValue<"auto" | "metadata" | "none" | undefined>;
  preservesPitch?: RefOrValue<boolean | undefined>;
  src?: RefOrValue<string | undefined>;
  srcObject?: RefOrValue<MediaStream | MediaSource | Blob | File | null>;
  volume?: RefOrValue<string | number | undefined>;
}

export interface MenuHTMLAttributes<T extends EventTarget = HTMLMenuElement>
  extends HTMLAttributes<T> {
  role:
    | "list"
    | "group"
    | "listbox"
    | "menu"
    | "menubar"
    | "none"
    | "presentation"
    | "radiogroup"
    | "tablist"
    | "toolbar"
    | "tree";
  type?: RefOrValue<string | undefined>;
}

export interface MetaHTMLAttributes<T extends EventTarget = HTMLMetaElement>
  extends HTMLAttributes<T> {
  charset?: RefOrValue<string | undefined>;
  charSet?: RefOrValue<string | undefined>;
  content?: RefOrValue<string | undefined>;
  "http-equiv"?: RefOrValue<string | undefined>;
  httpEquiv?: RefOrValue<string | undefined>;
  name?: RefOrValue<string | undefined>;
  media?: RefOrValue<string | undefined>;
  role?: never;
}

export interface MeterHTMLAttributes<T extends EventTarget = HTMLMeterElement>
  extends HTMLAttributes<T> {
  form?: RefOrValue<string | undefined>;
  high?: RefOrValue<number | undefined>;
  low?: RefOrValue<number | undefined>;
  max?: RefOrValue<number | string | undefined>;
  min?: RefOrValue<number | string | undefined>;
  optimum?: RefOrValue<number | undefined>;
  role?: RefOrValue<"meter" | undefined>;
  value?: RefOrValue<string | number | undefined>;
}

export interface NavHTMLAttributes<T extends EventTarget = HTMLElement> extends HTMLAttributes<T> {
  role?: RefOrValue<
    "navigation" | "menu" | "menubar" | "none" | "presentation" | "tablist" | undefined
  >;
}

export interface NoScriptHTMLAttributes<T extends EventTarget = HTMLElement>
  extends HTMLAttributes<T> {
  role?: never;
}

export interface ObjectHTMLAttributes<T extends EventTarget = HTMLObjectElement>
  extends HTMLAttributes<T> {
  classID?: RefOrValue<string | undefined>;
  data?: RefOrValue<string | undefined>;
  form?: RefOrValue<string | undefined>;
  height?: RefOrValue<number | string | undefined>;
  name?: RefOrValue<string | undefined>;
  role?: RefOrValue<"application" | "document" | "img" | undefined>;
  type?: RefOrValue<string | undefined>;
  usemap?: RefOrValue<string | undefined>;
  useMap?: RefOrValue<string | undefined>;
  width?: RefOrValue<number | string | undefined>;
  wmode?: RefOrValue<string | undefined>;
}

export interface OlHTMLAttributes<T extends EventTarget = HTMLOListElement>
  extends HTMLAttributes<T> {
  reversed?: RefOrValue<boolean | undefined>;
  role?: RefOrValue<
    | "list"
    | "group"
    | "listbox"
    | "menu"
    | "menubar"
    | "none"
    | "presentation"
    | "radiogroup"
    | "tablist"
    | "toolbar"
    | "tree"
    | undefined
  >;
  start?: RefOrValue<number | undefined>;
  type?: RefOrValue<"1" | "a" | "A" | "i" | "I" | undefined>;
}

export interface OptgroupHTMLAttributes<T extends EventTarget = HTMLOptGroupElement>
  extends HTMLAttributes<T> {
  disabled?: RefOrValue<boolean | undefined>;
  label?: RefOrValue<string | undefined>;
  role?: RefOrValue<"group" | undefined>;
}

export interface OptionHTMLAttributes<T extends EventTarget = HTMLOptionElement>
  extends HTMLAttributes<T> {
  disabled?: RefOrValue<boolean | undefined>;
  label?: RefOrValue<string | undefined>;
  role?: RefOrValue<"option" | undefined>;
  selected?: RefOrValue<boolean | undefined>;
  value?: RefOrValue<string | number | undefined>;
}

export interface OutputHTMLAttributes<T extends EventTarget = HTMLOutputElement>
  extends HTMLAttributes<T> {
  for?: RefOrValue<string | undefined>;
  form?: RefOrValue<string | undefined>;
  htmlFor?: RefOrValue<string | undefined>;
  name?: RefOrValue<string | undefined>;
}

export interface ParamHTMLAttributes<T extends EventTarget = HTMLParamElement>
  extends HTMLAttributes<T> {
  name?: RefOrValue<string | undefined>;
  role?: never;
  value?: RefOrValue<string | number | undefined>;
}

export interface PictureHTMLAttributes<T extends EventTarget = HTMLPictureElement>
  extends HTMLAttributes<T> {
  role?: never;
}

export interface ProgressHTMLAttributes<T extends EventTarget = HTMLProgressElement>
  extends HTMLAttributes<T> {
  max?: RefOrValue<number | string | undefined>;
  role?: RefOrValue<"progressbar" | undefined>;
  value?: RefOrValue<string | number | undefined>;
}

export interface QuoteHTMLAttributes<T extends EventTarget = HTMLQuoteElement>
  extends HTMLAttributes<T> {
  cite?: RefOrValue<string | undefined>;
}

export interface ScriptHTMLAttributes<T extends EventTarget = HTMLScriptElement>
  extends HTMLAttributes<T> {
  async?: RefOrValue<boolean | undefined>;
  /** @deprecated */
  charset?: RefOrValue<string | undefined>;
  /** @deprecated */
  charSet?: RefOrValue<string | undefined>;
  crossorigin?: RefOrValue<HTMLAttributeCrossOrigin>;
  crossOrigin?: RefOrValue<HTMLAttributeCrossOrigin>;
  defer?: RefOrValue<boolean | undefined>;
  integrity?: RefOrValue<string | undefined>;
  nomodule?: RefOrValue<boolean | undefined>;
  noModule?: RefOrValue<boolean | undefined>;
  referrerpolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  referrerPolicy?: RefOrValue<HTMLAttributeReferrerPolicy | undefined>;
  role?: never;
  src?: RefOrValue<string | undefined>;
  type?: RefOrValue<string | undefined>;
}

export interface SearchHTMLAttributes<T extends EventTarget = HTMLElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<"search" | "form" | "group" | "none" | "presentation" | "region" | undefined>;
}

export interface PartialSelectHTMLAttributes<T extends EventTarget> extends HTMLAttributes<T> {
  autocomplete?: RefOrValue<string | undefined>;
  autoComplete?: RefOrValue<string | undefined>;
  defaultValue?: RefOrValue<string | number | undefined>;
  disabled?: RefOrValue<boolean | undefined>;
  form?: RefOrValue<string | undefined>;
  name?: RefOrValue<string | undefined>;
  required?: RefOrValue<boolean | undefined>;
  size?: RefOrValue<number | undefined>;
  value?: RefOrValue<string | number | undefined>;
  onChange?: GenericEventHandler<T> | undefined;
}

export type SelectAriaRoles =
  | {
      multiple?: never;
      // Spec states this branch is limited to "no `multiple` attribute AND no `size` attribute greater than 1".
      // `1` as a default, however, caused some web compat issues and forced Firefox to default to `0` instead.
      size?: 0 | 1 | never;
      role?: RefOrValue<"combobox" | "menu" | undefined>;
    }
  | {
      multiple?: RefOrValue<boolean | undefined>;
      size?: RefOrValue<number | undefined>;
      role?: RefOrValue<"listbox" | undefined>;
    };

export type AccessibleSelectHTMLAttributes<T extends EventTarget = HTMLSelectElement> = Omit<
  PartialSelectHTMLAttributes<T>,
  "role"
> &
  SelectAriaRoles;

export interface SelectHTMLAttributes<T extends EventTarget = HTMLSelectElement>
  extends PartialSelectHTMLAttributes<T> {
  multiple?: RefOrValue<boolean | undefined>;
  size?: RefOrValue<number | undefined>;
  type?: RefOrValue<HTMLInputTypeAttribute | undefined>;
  role?: RefOrValue<"combobox" | "listbox" | "menu" | undefined>;
}

export interface SlotHTMLAttributes<T extends EventTarget = HTMLSlotElement>
  extends HTMLAttributes<T> {
  name?: RefOrValue<string | undefined>;
  role?: never;
}

export interface SourceHTMLAttributes<T extends EventTarget = HTMLSourceElement>
  extends HTMLAttributes<T> {
  height?: RefOrValue<number | string | undefined>;
  media?: RefOrValue<string | undefined>;
  role?: never;
  sizes?: RefOrValue<string | undefined>;
  src?: RefOrValue<string | undefined>;
  srcset?: RefOrValue<string | undefined>;
  srcSet?: RefOrValue<string | undefined>;
  type?: RefOrValue<string | undefined>;
  width?: RefOrValue<number | string | undefined>;
}

export interface StyleHTMLAttributes<T extends EventTarget = HTMLStyleElement>
  extends HTMLAttributes<T> {
  media?: RefOrValue<string | undefined>;
  role?: never;
  scoped?: RefOrValue<boolean | undefined>;
  type?: RefOrValue<string | undefined>;
}

export interface TableHTMLAttributes<T extends EventTarget = HTMLTableElement>
  extends HTMLAttributes<T> {
  cellPadding?: RefOrValue<string | undefined>;
  cellSpacing?: RefOrValue<string | undefined>;
  summary?: RefOrValue<string | undefined>;
  width?: RefOrValue<number | string | undefined>;
}

export interface TdHTMLAttributes<T extends EventTarget = HTMLTableCellElement>
  extends HTMLAttributes<T> {
  align?: RefOrValue<"left" | "center" | "right" | "justify" | "char" | undefined>;
  colspan?: RefOrValue<number | undefined>;
  colSpan?: RefOrValue<number | undefined>;
  headers?: RefOrValue<string | undefined>;
  rowspan?: RefOrValue<number | undefined>;
  rowSpan?: RefOrValue<number | undefined>;
  scope?: RefOrValue<string | undefined>;
  abbr?: RefOrValue<string | undefined>;
  height?: RefOrValue<number | string | undefined>;
  width?: RefOrValue<number | string | undefined>;
  valign?: RefOrValue<"top" | "middle" | "bottom" | "baseline" | undefined>;
}

export interface TemplateHTMLAttributes<T extends EventTarget = HTMLTemplateElement>
  extends HTMLAttributes<T> {
  role?: never;
}

export interface TextareaHTMLAttributes<T extends EventTarget = HTMLTextAreaElement>
  extends HTMLAttributes<T> {
  autocomplete?: RefOrValue<string | undefined>;
  autoComplete?: RefOrValue<string | undefined>;
  cols?: RefOrValue<number | undefined>;
  defaultValue?: RefOrValue<string | number | undefined>;
  dirName?: RefOrValue<string | undefined>;
  disabled?: RefOrValue<boolean | undefined>;
  form?: RefOrValue<string | undefined>;
  maxlength?: RefOrValue<number | undefined>;
  maxLength?: RefOrValue<number | undefined>;
  minlength?: RefOrValue<number | undefined>;
  minLength?: RefOrValue<number | undefined>;
  name?: RefOrValue<string | undefined>;
  placeholder?: RefOrValue<string | undefined>;
  readOnly?: RefOrValue<boolean | undefined>;
  required?: RefOrValue<boolean | undefined>;
  role?: RefOrValue<"textbox" | undefined>;
  rows?: RefOrValue<number | undefined>;
  value?: RefOrValue<string | number | undefined>;
  wrap?: RefOrValue<string | undefined>;
  onChange?: GenericEventHandler<T> | undefined;
}

export interface ThHTMLAttributes<T extends EventTarget = HTMLTableCellElement>
  extends HTMLAttributes<T> {
  align?: RefOrValue<"left" | "center" | "right" | "justify" | "char" | undefined>;
  colspan?: RefOrValue<number | undefined>;
  colSpan?: RefOrValue<number | undefined>;
  headers?: RefOrValue<string | undefined>;
  rowspan?: RefOrValue<number | undefined>;
  rowSpan?: RefOrValue<number | undefined>;
  scope?: RefOrValue<string | undefined>;
  abbr?: RefOrValue<string | undefined>;
}

export interface TimeHTMLAttributes<T extends EventTarget = HTMLTimeElement>
  extends HTMLAttributes<T> {
  datetime?: RefOrValue<string | undefined>;
  dateTime?: RefOrValue<string | undefined>;
}

export interface TitleHTMLAttributes<T extends EventTarget = HTMLTitleElement>
  extends HTMLAttributes<T> {
  role?: never;
}

export interface TrackHTMLAttributes<T extends EventTarget = HTMLTrackElement>
  extends MediaHTMLAttributes<T> {
  default?: RefOrValue<boolean | undefined>;
  kind?: RefOrValue<string | undefined>;
  label?: RefOrValue<string | undefined>;
  role?: never;
  srclang?: RefOrValue<string | undefined>;
  srcLang?: RefOrValue<string | undefined>;
}

export interface UlHTMLAttributes<T extends EventTarget = HTMLUListElement>
  extends HTMLAttributes<T> {
  role?: RefOrValue<
    | "list"
    | "group"
    | "listbox"
    | "menu"
    | "menubar"
    | "none"
    | "presentation"
    | "radiogroup"
    | "tablist"
    | "toolbar"
    | "tree"
    | undefined
  >;
}

export interface VideoHTMLAttributes<T extends EventTarget = HTMLVideoElement>
  extends MediaHTMLAttributes<T> {
  disablePictureInPicture?: RefOrValue<boolean | undefined>;
  height?: RefOrValue<number | string | undefined>;
  playsinline?: RefOrValue<boolean | undefined>;
  playsInline?: RefOrValue<boolean | undefined>;
  poster?: RefOrValue<string | undefined>;
  width?: RefOrValue<number | string | undefined>;
  role?: RefOrValue<"application" | undefined>;
}

export interface WbrHTMLAttributes<T extends EventTarget = HTMLElement> extends HTMLAttributes<T> {
  role?: RefOrValue<"none" | "presentation" | undefined>;
}

export type DetailedHTMLProps<
  HA extends HTMLAttributes<RefType>,
  RefType extends EventTarget = EventTarget
> = HA;

export interface MathMLAttributes<Target extends EventTarget = MathMLElement>
  extends HTMLAttributes<Target> {
  dir?: RefOrValue<"ltr" | "rtl" | undefined>;
  displaystyle?: RefOrValue<boolean | undefined>;
  /** @deprecated This feature is non-standard. See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/href  */
  href?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathbackground */
  mathbackground?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathcolor */
  mathcolor?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Global_attributes/mathsize */
  mathsize?: RefOrValue<string | undefined>;
  nonce?: RefOrValue<string | undefined>;
  scriptlevel?: RefOrValue<string | undefined>;
}

export interface AnnotationMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  encoding?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics#src */
  src?: RefOrValue<string | undefined>;
}

export interface AnnotationXmlMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  encoding?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics#src */
  src?: RefOrValue<string | undefined>;
}

export interface MActionMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction#actiontype */
  actiontype?: RefOrValue<"statusline" | "toggle" | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction#selection */
  selection?: RefOrValue<string | undefined>;
}

export interface MathMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  display?: RefOrValue<"block" | "inline" | undefined>;
}

export interface MEncloseMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  notation?: RefOrValue<string | undefined>;
}

export interface MErrorMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}

export interface MFencedMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  close?: RefOrValue<string | undefined>;
  open?: RefOrValue<string | undefined>;
  separators?: RefOrValue<string | undefined>;
}

export interface MFracMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac#denomalign */
  denomalign?: RefOrValue<"center" | "left" | "right" | undefined>;
  linethickness?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac#numalign */
  numalign?: RefOrValue<"center" | "left" | "right" | undefined>;
}

export interface MiMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** The only value allowed in the current specification is normal (case insensitive)
   * See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mi#mathvariant */
  mathvariant?: RefOrValue<
    | "normal"
    | "bold"
    | "italic"
    | "bold-italic"
    | "double-struck"
    | "bold-fraktur"
    | "script"
    | "bold-script"
    | "fraktur"
    | "sans-serif"
    | "bold-sans-serif"
    | "sans-serif-italic"
    | "sans-serif-bold-italic"
    | "monospace"
    | "initial"
    | "tailed"
    | "looped"
    | "stretched"
    | undefined
  >;
}

export interface MmultiScriptsMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts#subscriptshift */
  subscriptshift?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts#superscriptshift */
  superscriptshift?: RefOrValue<string | undefined>;
}

export interface MNMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}

export interface MOMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo#accent */
  accent?: RefOrValue<boolean | undefined>;
  fence?: RefOrValue<boolean | undefined>;
  largeop?: RefOrValue<boolean | undefined>;
  lspace?: RefOrValue<string | undefined>;
  maxsize?: RefOrValue<string | undefined>;
  minsize?: RefOrValue<string | undefined>;
  movablelimits?: RefOrValue<boolean | undefined>;
  rspace?: RefOrValue<string | undefined>;
  separator?: RefOrValue<boolean | undefined>;
  stretchy?: RefOrValue<boolean | undefined>;
  symmetric?: RefOrValue<boolean | undefined>;
}

export interface MOverMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  accent?: RefOrValue<boolean | undefined>;
}

export interface MPaddedMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  depth?: RefOrValue<string | undefined>;
  height?: RefOrValue<string | undefined>;
  lspace?: RefOrValue<string | undefined>;
  voffset?: RefOrValue<string | undefined>;
  width?: RefOrValue<string | undefined>;
}

export interface MPhantomMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}

export interface MPrescriptsMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}

export interface MRootMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}

export interface MRowMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}

export interface MSMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms#browser_compatibility */
  lquote?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms#browser_compatibility */
  rquote?: RefOrValue<string | undefined>;
}

export interface MSpaceMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  depth?: RefOrValue<string | undefined>;
  height?: RefOrValue<string | undefined>;
  width?: RefOrValue<string | undefined>;
}

export interface MSqrtMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}

export interface MStyleMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#background */
  background?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#color */
  color?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontsize */
  fontsize?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontstyle */
  fontstyle?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#fontweight */
  fontweight?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#scriptminsize */
  scriptminsize?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle#scriptsizemultiplier */
  scriptsizemultiplier?: RefOrValue<string | undefined>;
}

export interface MSubMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msub#subscriptshift */
  subscriptshift?: RefOrValue<string | undefined>;
}

export interface MSubsupMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup#subscriptshift */
  subscriptshift?: RefOrValue<string | undefined>;
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup#superscriptshift */
  superscriptshift?: RefOrValue<string | undefined>;
}

export interface MSupMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** @deprecated See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msup#superscriptshift */
  superscriptshift?: RefOrValue<string | undefined>;
}

export interface MTableMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#align */
  align?: RefOrValue<"axis" | "baseline" | "bottom" | "center" | "top" | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnalign */
  columnalign?: RefOrValue<"center" | "left" | "right" | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnlines */
  columnlines?: RefOrValue<"dashed" | "none" | "solid" | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#columnspacing */
  columnspacing?: RefOrValue<string | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#frame */
  frame?: RefOrValue<"dashed" | "none" | "solid" | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#framespacing */
  framespacing?: RefOrValue<string | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowalign */
  rowalign?: RefOrValue<"axis" | "baseline" | "bottom" | "center" | "top" | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowlines */
  rowlines?: RefOrValue<"dashed" | "none" | "solid" | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#rowspacing */
  rowspacing?: RefOrValue<string | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable#width */
  width?: RefOrValue<string | undefined>;
}

export interface MTdMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  columnspan?: RefOrValue<number | undefined>;
  rowspan?: RefOrValue<number | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd#columnalign */
  columnalign?: RefOrValue<"center" | "left" | "right" | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd#rowalign */
  rowalign?: RefOrValue<"axis" | "baseline" | "bottom" | "center" | "top" | undefined>;
}

export interface MTextMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}

export interface MTrMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr#columnalign */
  columnalign?: RefOrValue<"center" | "left" | "right" | undefined>;
  /** Non-standard attribute See https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr#rowalign */
  rowalign?: RefOrValue<"axis" | "baseline" | "bottom" | "center" | "top" | undefined>;
}

export interface MUnderMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  accentunder?: RefOrValue<boolean | undefined>;
}

export interface MUnderoverMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {
  accent?: RefOrValue<boolean | undefined>;
  accentunder?: RefOrValue<boolean | undefined>;
}

export interface SemanticsMathMLAttributes<T extends EventTarget> extends MathMLAttributes<T> {}
