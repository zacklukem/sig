import { expect, mock, test } from "bun:test";
import { render } from "./helpers/render";
import { batch, effect, signal } from "@zacklukem/sig";
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

test("reacts to prop updates", async () => {
  const value = signal(0);

  function ComponentWithProps(props: { value: number }) {
    return () => <div id="value">{props.value}</div>;
  }

  function Component() {
    return () => <ComponentWithProps value={value.$} />;
  }

  render(<Component />);
  const valueElement = document.getElementById("value");

  expect(valueElement?.textContent).toBe("0");
  value.$ = 1234;
  await waitFor(() => expect(valueElement?.textContent).toBe("1234"));
  value.$ = 4321;
  await waitFor(() => expect(valueElement?.textContent).toBe("4321"));
});

test("batched effects", () => {
  const hit = mock();

  const value = signal(0);

  effect(() => {
    hit(value.$);
  });

  expect(hit).toHaveBeenCalledTimes(1);
  expect(hit).toHaveBeenCalledWith(0);

  batch(() => {
    value.$ = 1234;
  });

  expect(hit).toHaveBeenCalledTimes(2);
  expect(hit).toHaveBeenCalledWith(1234);
});
