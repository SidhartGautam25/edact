const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
]);

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderAttributes(props) {
  const attributes = [];

  Object.keys(props).forEach((key) => {
    if (key === "children") {
      return;
    }

    if (key.startsWith("on")) {
      return;
    }

    if (key === "className") {
      key = "class";
    }

    const value = props[key];

    if (value == null || value === false) {
      return;
    }

    if (value === true) {
      attributes.push(key);
      return;
    }

    attributes.push(`${key}="${escapeHTML(value)}"`);
  });

  return attributes.join(" ");
}

function renderToString(element) {
  if (element.type === "TEXT_ELEMENT") {
    return escapeHTML(element.props.nodeValue);
  }

  if (typeof element.type === "function") {
    return renderToString(element.type(element.props, element.children));
  }

  const attrs = renderAttributes(element.props);

  if (VOID_ELEMENTS.has(element.type)) {
    return `<${element.type}${attrs ? " " + attrs : ""}>`;
  }

  const children = element.children.map(renderToString).join("");

  return `<${element.type}${
    attrs ? " " + attrs : ""
  }>${children}</${element.type}>`;
}

export { renderToString };
