import { expect, test } from "bun:test";
import { render } from "./helpers/render";

test("runs event listeners", () => {
  let hit = false;
  render(<div id="clicker" onClick={() => (hit = true)}></div>);
  document.getElementById("clicker")!.click();
  expect(hit).toBeTrue();
});

test("binds with ref", () => {
  const ref = { $: undefined as HTMLDivElement | undefined };
  render(<div ref={ref} id="clicker"></div>);
  // @ts-expect-error its ok
  expect(ref.$).toBe(document.getElementById("clicker")!);
});
