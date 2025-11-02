import { beforeEach, expect, test } from "bun:test";
import { diff } from "sig";

function resetDom() {
  document.body.childNodes.forEach((item) => item.remove());
}

beforeEach(() => {
  resetDom();
});

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
  diff(document.body, updated);
  const expected = document.body.innerHTML;
  resetDom();

  const prev = diff(document.body, initial);
  diff(document.body, updated, prev);

  const actual = document.body.innerHTML;
  resetDom();

  expect(actual).toBe(expected);
});
