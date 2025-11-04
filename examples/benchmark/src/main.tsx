// Adapted from https://github.com/krausest/js-framework-benchmark/tree/master/frameworks/keyed/solid
//          Apache License
//    Version 2.0, January 2004
// http://www.apache.org/licenses/

import { render, signal } from "@zacklukem/sig";

const adjectives = ["pretty", "large", "big", "small", "tall", "short", "long", "handsome", "plain", "quaint", "clean", "elegant", "easy", "angry", "crazy", "helpful", "mushy", "odd", "unsightly", "adorable", "important", "inexpensive", "cheap", "expensive", "fancy"]; // prettier-ignore
const colors = ["red", "yellow", "blue", "green", "pink", "brown", "purple", "brown", "white", "black", "orange"]; // prettier-ignore
const nouns = ["table", "chair", "house", "bbq", "desk", "car", "pony", "cookie", "sandwich", "burger", "pizza", "mouse", "keyboard"]; // prettier-ignore

const random = (max) => Math.round(Math.random() * 1000) % max;

let nextId = 1;

const buildData = (count) => {
  const data = new Array(count);
  for (let i = 0; i < count; i++) {
    const label = signal(
      `${adjectives[random(adjectives.length)]} ${colors[random(colors.length)]} ${
        nouns[random(nouns.length)]
      }`
    );
    data[i] = { id: nextId++, label };
  }
  return data;
};

function Button(props) {
  return () => (
    <div class="col-sm-6 smallpad">
      <button id={props.id} class="btn btn-primary btn-block" type="button" onClick={props.fn}>
        {props.text}
      </button>
    </div>
  );
}

function Main() {
  const data = signal([]);
  const selected = signal(null);
  const run = () => (data.$ = buildData(1000));
  const runLots = () => (data.$ = buildData(10000));
  const add = () => (data.$ = [...data.$, ...buildData(1000)]);
  const update = () => {
    for (let i = 0, d = data.$, len = d.length; i < len; i += 10) {
      d[i].label.$ = d[i].label.$ + " !!!";
    }
  };
  const clear = () => (data.$ = []);
  const swapRows = () => {
    const list = data.$.slice();
    if (list.length > 998) {
      const item = list[1];
      list[1] = list[998];
      list[998] = item;
      data.$ = list;
    }
  };

  return () => (
    <div class="container">
      <div class="jumbotron">
        <div class="row">
          <div class="col-md-6">
            <h1>Sig</h1>
          </div>
          <div class="col-md-6">
            <div class="row">
              <Button id="run" text="Create 1,000 rows" fn={run} />
              <Button id="runlots" text="Create 10,000 rows" fn={runLots} />
              <Button id="add" text="Append 1,000 rows" fn={add} />
              <Button id="update" text="Update every 10th row" fn={update} />
              <Button id="clear" text="Clear" fn={clear} />
              <Button id="swaprows" text="Swap Rows" fn={swapRows} />
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-striped test-data">
        <tbody>
          {data.$.map((row) => {
            const rowId = row.id;
            return (
              <tr  class={selected.$ === rowId ? "danger" : ""}>
                <td class="col-md-1" textContent={rowId} />
                <td class="col-md-4">
                  <a onClick={() => (selected.$ = rowId)}>{row.label.$}</a>
                </td>
                <td class="col-md-1">
                  <a onClick={() => setData((d) => d.toSpliced(d.findIndex((d) => d.id === rowId), 1))}>
                    <span class="glyphicon glyphicon-remove" aria-hidden="true" />
                  </a>
                </td>
                <td class="col-md-6" />
              </tr>
            ); // prettier-ignore
          })}
        </tbody>
      </table>
      <span class="preloadicon glyphicon glyphicon-remove" aria-hidden="true" />
    </div>
  );
}

render(document.getElementById("app"), <Main />);
