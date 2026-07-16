import { createElement } from "../../../src/edact.js";

export default function Layout({ children }) {
  return createElement(
    "div",

    null,

    createElement("header", null, "Navigation"),

    createElement("main", null, children),

    createElement("footer", null, "Footer"),
  );
}
