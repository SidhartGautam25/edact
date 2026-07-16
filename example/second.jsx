/** @jsx createElement */

import { createElement, render, useStore } from "../src/edact.js";

import { createStore } from "../src/edstore.js";

const userStore = createStore({
  user: {
    name: "Navneet",
    age: 22,
  },
});

function Profile() {
  const name = useStore(userStore, (state) => state.user.name);

  const age = useStore(userStore, (state) => state.user.age);

  return (
    <div>
      <h1>{name}</h1>

      <h2>{age}</h2>
    </div>
  );
}

render(<Profile />, document.getElementById("app"));
