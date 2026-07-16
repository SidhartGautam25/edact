/** @jsx createElement */

import { createElement, render, useStore } from "../src/edact.js";

import { createStore } from "../src/edstore.js";
import { Dispatcher } from "../src/eddispatcher.js";

const dispatcher = new Dispatcher();

const counterStore = createStore(
  {
    count: 0,
  },
  {
    increment(state) {
      return {
        count: state.count + 1,
      };
    },

    decrement(state) {
      return {
        count: state.count - 1,
      };
    },
  },
);

dispatcher.subscribe("increment", () => {
  counterStore.increment();
});

dispatcher.subscribe("decrement", () => {
  counterStore.decrement();
});

function Counter() {
  const count = useStore(counterStore, (state) => state.count);

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={() => dispatcher.dispatch("decrement")}>-</button>

      <button onClick={() => dispatcher.dispatch("increment")}>+</button>
    </div>
  );
}

render(<Counter />, document.getElementById("app"));
