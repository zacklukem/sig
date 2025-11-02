import { expect, test } from "bun:test";
import { render } from "./helpers/render";
import { signal } from "sig";
import { waitFor } from "@testing-library/dom";

test("reacts to events", async () => {
  const value = signal(0);

  function Component() {
    // TODO: the deref shouldn't be required here for this to work
    return () => <div id="value">{value.$}</div>;
  }

  render(<Component />);
  const valueElement = document.getElementById("value");

  expect(valueElement?.textContent).toBe("0");
  value.$ = 1234;
  await waitFor(() => expect(valueElement?.textContent).toBe("1234"));
  value.$ = 4321;
  await waitFor(() => expect(valueElement?.textContent).toBe("4321"));
});
