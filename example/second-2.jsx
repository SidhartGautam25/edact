/** @jsx createElement */

import { createElement, render, useStore } from "../src/edact.js";

import { createStore } from "../src/edstore.js";

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

    add(state, value) {
      return {
        count: state.count + value,
      };
    },
  },
);

function Counter() {
  const state = useStore(counterStore);

  return (
    <div>
      <h1>{state.count}</h1>

      <button onClick={() => counterStore.decrement()}>-</button>

      <button onClick={() => counterStore.increment()}>+</button>

      <button onClick={() => counterStore.add(10)}>+10</button>
    </div>
  );
}

render(<Counter />, document.getElementById("app"));
