import "global-jsdom/register";
import { signal, render } from "sig";
const value = signal(0);

function Other() {
  return () => <p>{value.$}</p>;
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
