function renderToString(element) {
  if (element.type === "TEXT_ELEMENT") {
    return element.props.nodeValue;
  }

  if (typeof element.type === "function") {
    const child = element.type(element.props, element.children);

    return renderToString(child);
  }

  const children = element.children.map(renderToString).join("");

  return `<${element.type}>${children}</${element.type}>`;
}

export { renderToString };
