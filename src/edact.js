// building react

const hooks = [];
let hookIndex = 0;

const effects = [];
const pendingEffects = [];

let rootElement = null;
let rootContainer = null;

function useState(initialValue) {
  const currentIndex = hookIndex;

  if (hooks[currentIndex] === undefined) {
    hooks[currentIndex] = initialValue;
  }

  function setState(newValue) {
    hooks[currentIndex] = newValue;
    hookIndex = 0;
    render(rootElement, rootContainer);
  }

  hookIndex++;

  return [hooks[currentIndex], setState];
}

function useEffect(effect, deps = []) {
  const currentIndex = hookIndex;

  const previous = effects[currentIndex];

  const changed =
    !previous ||
    previous.deps.some((value, index) => {
      return value !== deps[index];
    });

  if (changed) {
    pendingEffects.push(() => {
      if (previous?.cleanup) {
        previous.cleanup();
      }

      const cleanup = effect();

      effects[currentIndex] = {
        deps,
        cleanup,
      };
    });
  }

  hookIndex++;
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
  if (rootContainer === null) {
    rootElement = element;
    rootContainer = container;
  }

  if (container === rootContainer) {
    container.innerHTML = "";
  }

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

  if (container === rootContainer) {
    pendingEffects.forEach((effect) => {
      effect();
    });

    pendingEffects.length = 0;
  }
}

function createDOM(element) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode(element.props.nodeValue)
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

function useStore(store) {
  const state = store.getState();

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      hookIndex = 0;
      render(rootElement, rootContainer);
    });

    return unsubscribe;
  }, []);

  return state;
}

export { createElement, render, useState, useEffect, useStore };
