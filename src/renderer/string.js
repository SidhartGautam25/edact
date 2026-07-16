function renderToString(element) {
  if (element.type === "TEXT_ELEMENT") {
    return element.props.nodeValue;
  }

  const children = element.children.map(renderToString).join("");

  return `<${element.type}>${children}</${element.type}>`;
}

export { renderToString };
