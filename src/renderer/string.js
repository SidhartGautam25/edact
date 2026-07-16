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

    attributes.push(`${key}="${props[key]}"`);
  });

  return attributes.join(" ");
}

function renderToString(element) {
  if (element.type === "TEXT_ELEMENT") {
    return element.props.nodeValue;
  }

  if (typeof element.type === "function") {
    return renderToString(element.type(element.props, element.children));
  }

  const attrs = renderAttributes(element.props);

  const children = element.children.map(renderToString).join("");

  return `<${element.type}${
    attrs ? " " + attrs : ""
  }>${children}</${element.type}>`;
}

export { renderToString };
