import "./style.css";
import { render, signal } from "sig";

function TodoList() {
  const items = signal(["Eat", "Sleep", "Cook"]);

  return () => (
    <>
      <ul>
        {items.$.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </>
  );
}

render(document.getElementById("app")!, <TodoList />);
