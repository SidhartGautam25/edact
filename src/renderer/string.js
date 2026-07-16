function renderToString(element) {
  if (element.type === "TEXT_ELEMENT") {
    return element.props.nodeValue;
  }

  return `<${element.type}></${element.type}>`;
}

export { renderToString };
