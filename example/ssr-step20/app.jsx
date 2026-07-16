/** @jsx createElement */

import { createElement } from "../../src/edact.js";

export default function App() {
  return (
    <div
      style="
        font-family: Arial;
        padding:40px;
      "
    >
      <h1>🚀 Edact SSR</h1>

      <p>This HTML was generated completely on the server.</p>

      <button>This button has no JavaScript yet</button>
    </div>
  );
}
