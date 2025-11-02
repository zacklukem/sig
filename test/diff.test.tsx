import { beforeAll, beforeEach, expect, test } from "bun:test";
import { diff, type VNode } from "sig";

function resetDom() {
  document.body.childNodes.forEach((item) => item.remove());
}

beforeEach(() => {
  resetDom();
});

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
])(
  "should render diff correctly for %initial and %updated",
  ({ initial, updated }) => {
    diff(document.body, updated);
    const expected = document.body.innerHTML;
    resetDom();

    const prev = diff(document.body, initial);
    diff(document.body, updated, prev);

    const actual = document.body.innerHTML;
    resetDom();

    expect(actual).toBe(expected);
  }
);
