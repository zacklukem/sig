import { expect, test } from "bun:test";
import { diff } from "sig";

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
  const expectedNode = document.createElement("main");
  diff(expectedNode, updated);
  const expected = expectedNode.innerHTML;

  const actualNode = document.createElement("main");
  const prev = diff(actualNode, initial);
  diff(actualNode, updated, prev);
  const actual = actualNode.innerHTML;

  expect(actual).toBe(expected);
});
