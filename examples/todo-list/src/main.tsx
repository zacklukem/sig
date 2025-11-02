import { render, signal, type Ref } from "sig";

function append<T>(ref: Ref<T[]>, value: T) {
  ref.$ = [...ref.$, value];
}

function remove<T>(ref: Ref<T[]>, value: T) {
  ref.$ = ref.$.filter((o) => o !== value);
}

function TodoList() {
  const items = signal(["Eat", "Sleep", "Cook"]);
  const inputValue = signal("");

  return () => (
    <>
      <ul>
        {items.$.map((item) => (
          <li>
            <input type="checkbox" />
            {item}
            <button onClick={() => remove(items, item)}>Delete</button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          append(items, inputValue.$);
          inputValue.$ = "";
        }}
      >
        <input
          type="text"
          value={inputValue.$}
          onChange={(e) => (inputValue.$ = e.currentTarget.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

render(document.getElementById("app")!, <TodoList />);
