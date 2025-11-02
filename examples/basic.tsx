import "global-jsdom/register";
import { signal, diff } from "sig";

function Counter(props: { a: number }) {
  const x = signal(props.a);

  return () => <button onClick={() => (x.$ += 1)}>Count: {x}</button>;
}

export const a = (
  <div class="test">
    <Counter a={2} />
  </div>
);

export const b = (
  <div class="test">
    <p>hi</p>
    <Counter a={2} />
  </div>
);

const prev = diff(document.body, a);
diff(document.body, b, prev);

console.log(document.body.outerHTML);
