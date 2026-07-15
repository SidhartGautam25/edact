// building react

const hooks = [];
const hookIndex = 0;

function useState(initialValue) {
  const currentIndex = hookIndex;

  if (hooks[currentIndex] === undefined) {
    hooks[currentIndex] = initialValue;
  }

  function setState(newValue) {
    hooks[currentIndex] = newValue;
  }

  hookIndex++;

  return [hooks[currentIndex], setState];
}

function createElement(type, props, ...children) {
  return {
    type,
    props: props || {},
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
  if (typeof element.type === "function") {
    const childElement = element.type(element.props, element.children);
    render(childElement, container);
    return;
  }

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
  attachProps(dom, element.props);
  return dom;
}

function attachProps(dom, props) {
  Object.keys(props).forEach((key) => {
    if (key === "children") {
      return;
    }
    if (key.startsWith("on")) {
      const eventType = key.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[key]);
    } else {
      dom[key] = props[key];
    }
  });
}
