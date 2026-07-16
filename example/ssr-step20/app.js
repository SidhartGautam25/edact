import { createElement } from "../../src/edact.js";

export default function App() {
  return createElement(
    "div",
    {
      style: "font-family: Arial; padding: 40px;",
    },
    createElement("h1", null, " Edact SSR"),
    createElement(
      "p",
      null,
      "This HTML was generated completely on the server.",
    ),
    createElement("button", null, "This button has no JavaScript yet"),
  );
}
