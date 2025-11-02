import "global-jsdom/register";
import { signal, render, computed } from "sig";
const value = signal(0);

function Other() {
  const valuePlusOne = computed(() => value.$ + 1);

  return () => <p>{valuePlusOne.$}</p>;
}

function Counter() {
  // TODO: fix bug where it doesn't work to pass direct reference
  return () => (
    <div>
      {value.$}
      <Other />
    </div>
  );
}

render(document.body, <Counter />);

console.log(document.body.outerHTML);

value.$ += 1;
await new Promise((resolve) => setTimeout(resolve, 1));
console.log(document.body.outerHTML);

value.$ += 1;
await new Promise((resolve) => setTimeout(resolve, 1));
console.log(document.body.outerHTML);
