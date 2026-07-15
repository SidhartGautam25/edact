// building react

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
    },
    children: children.map((child) =>
      typeof child === "object" ? child : createTextElement(child),
    ),
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
    },
    children: [],
  };
}

function render(element, container) {
  const dom = createDOM(element);
  container.appendChild(dom);
  element.children.forEach((child) => {
    render(child, dom);
  });
}

function createDOM(element) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);
  //attaching properties to the dom
  return dom;
}
