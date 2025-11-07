import { expect, test } from "bun:test";
import { diff } from "@zacklukem/sig";
import { initSigDom } from "../src/sig-dom";
import { render } from "./helpers/render";

function MyComponent() {
  return () => <span></span>;
}

test.each([
  {
    initial: <div></div>,
    updated: (
      <div>
        <p></p>
      </div>
    ),
  },

  {
    initial: (
      <div>
        <span></span>
      </div>
    ),
    updated: (
      <div>
        <p></p>
        <span></span>
      </div>
    ),
  },

  {
    initial: (
      <div>
        <span></span>
      </div>
    ),
    updated: (
      <div>
        <p></p>
        <MyComponent />
      </div>
    ),
  },
])("initial and updated diffs produce same result", ({ initial, updated }) => {
  const expectedNode = initSigDom(document.createElement("main"));
  diff(expectedNode, updated);
  const expected = expectedNode.innerHTML;

  const actualNode = initSigDom(document.createElement("main"));
  const prev = diff(actualNode, initial);
  diff(actualNode, updated, prev);
  const actual = actualNode.innerHTML;

  expect(actual).toBe(expected);
});

test("asdf", async () => {
  function Component(props: Record<string, undefined>) {
    return () => {
      return <div id="value">{"prop" in props ? "true" : "false"}</div>;
    };
  }

  const rerender = render(<Component prop={undefined} />);
  const node = document.getElementById("value")!;
  expect(node.textContent).toBe("true");
  rerender(<Component />);
  expect(node.textContent).toBe("false");
});
