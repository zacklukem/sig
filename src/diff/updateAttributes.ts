import { isRef, deref } from "../ref";
import { SigDom } from "../sig-dom";

export function updateAttributes(props: object, el: SigDom<Element>) {
  for (const [key, $value] of Object.entries(props)) {
    if (key === "ref" && isRef($value)) {
      $value.$ = el;
      continue;
    }

    // Handle non-ref properties
    const value = deref($value);
    if (key in el) {
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
