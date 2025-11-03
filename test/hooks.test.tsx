import { describe, expect, test, mock } from "bun:test";
import { render } from "./helpers/render";
import { $consume, $effect, $provide, $unmount, signal } from "sig";
import { waitFor } from "@testing-library/dom";

describe("unmount", () => {
  test("runs unmount hook", async () => {
    const hit = mock();
    const visible = signal(true);

    function Hooked() {
      $unmount(hit);
      return () => <></>;
    }

    function Component() {
      return () => visible.$ && <Hooked />;
    }

    render(<Component />);
    expect(hit).not.toHaveBeenCalled();

    visible.$ = false;

    await waitFor(() => expect(hit).toHaveBeenCalled());
  });
});

describe("effect", () => {
  test("runs effect hook", async () => {
    const hit = mock();
    const hitCleanup = mock();
    const value = signal("a");
    const mounted = signal(true);

    function Hooked() {
      $effect(() => {
        hit(value.$);
        const cleanupValue = value.$ + "-cleanup";
        return () => hitCleanup(cleanupValue);
      });
      return () => <></>;
    }

    function Component() {
      return () => mounted.$ && <Hooked />;
    }

    render(<Component />);
    expect(hit).toHaveBeenCalledWith("a");

    value.$ = "b";

    await waitFor(() => expect(hitCleanup).toHaveBeenCalledWith("a-cleanup"));
    expect(hit).toHaveBeenCalledWith("b");

    value.$ = "c";

    await waitFor(() => expect(hitCleanup).toHaveBeenCalledWith("b-cleanup"));
    expect(hit).toHaveBeenCalledWith("c");

    mounted.$ = false;

    await waitFor(() => expect(hitCleanup).toHaveBeenCalledWith("c-cleanup"));
  });
});

describe("provide, consume", () => {
  test("runs provide and consume hooks", () => {
    const key = Symbol();

    function Consumer() {
      const value = $consume<string>(key);
      return () => <div id="value">{value.$}</div>;
    }

    function Provider() {
      $provide<string>(key, () => "Hello, world!");
      return () => <Consumer />;
    }

    render(<Provider />);
    expect(document.getElementById("value")!.textContent).toBe("Hello, world!");
  });
});
