// building react

const hooks = [];
let hookIndex = 0;

const effects = [];
const pendingEffects = [];

let rootElement = null;
let rootContainer = null;
let oldTree = null;

const deletions = [];

function isEvent(key) {
  return key.startsWith("on");
}

function isChildren(key) {
  return key === "children";
}

function isRendererProp(key) {
  return isChildren(key);
}

function getAttributeName(key) {
  switch (key) {
    case "className":
      return "class";

    case "htmlFor":
      return "for";

    default:
      return key;
  }
}

function getEventName(key) {
  return key.slice(2).toLowerCase();
}

function hasKeys(children) {
  return children.some((child) => child.key != null);
}

function buildKeyMap(children) {
  const map = new Map();

  children.forEach((child, index) => {
    child.index = index;

    if (child.key != null) {
      map.set(child.key, child);
    }
  });

  return map;
}

function reconcileIndexedChildren(parentDom, oldChildren, newChildren) {
  const count = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < count; i++) {
    reconcile(parentDom, oldChildren[i] ?? null, newChildren[i] ?? null);
  }
}

function reconcileKeyedChildren(parentDom, oldChildren, newChildren) {
  const oldMap = buildKeyMap(oldChildren);

  newChildren.forEach((newChild, newIndex) => {
    const oldChild = oldMap.get(newChild.key);

    if (oldChild) {
      oldMap.delete(newChild.key);

      if (oldChild.index !== newIndex) {
        newChild.effect = "PLACEMENT";
      }
    }

    reconcile(parentDom, oldChild ?? null, newChild);
  });

  for (const oldChild of oldMap.values()) {
    oldChild.effect = "DELETION";
    deletions.push(oldChild);
  }
}

function reconcile(oldElement, newElement, container) {
  if (!oldElement) {
    mountElement(newElement, container);
  }
  if (!newElement) {
    container.removeChild(oldElement.dom);
    return;
  }
  if (oldElement.type !== newElement.type) {
    const dom = createDOM(newElement);
    newElement.children.forEach((child) => {
      mountElement(child, dom);
    });
    container.replaceChild(dom, oldElement.dom);
    return;
  }
  newElement.dom = oldElement.dom;
  updateDOM(newElement.dom, oldElement.props, newElement.props);
  if (hasKeys(newNode.children)) {
    reconcileKeyedChildren(
      newElement.dom,
      oldElement.children,
      newElement.children,
    );
  } else {
    reconcileIndexedChildren(
      newElement.dom,
      oldElement.children,
      newElement.children,
    );
  }
}

function resolveComponent(element) {
  if (element === null) {
    return null;
  }
  if (typeof element.type === "function") {
    return resolveComponent(element.type(element.props, element.children));
  }
  return {
    type: node.type,

    props: node.props,

    children: node.children.map(resolveTree),
  };
}
function updateDOM(dom, oldProps, newProps) {
  // remove dom properties
  for (const key in oldProps) {
    if (isRendererProp(key) || isEvent(key)) {
      continue;
    }

    if (!(key in newProps)) {
      dom.removeAttribute(getAttributeName(key));
    }
  }

  // Add / Update DOM properties
  for (const key in newProps) {
    if (isRendererProp(key) || isEvent(key)) {
      continue;
    }

    if (oldProps[key] !== newProps[key]) {
      dom[key] = newProps[key];
    }
  }

  // Remove old events
  for (const key in oldProps) {
    if (!isEvent(key)) {
      continue;
    }

    if (!(key in newProps)) {
      dom.removeEventListener(
        getEventName(key),

        oldProps[key],
      );
    }
  }

  // Add / Update events
  for (const key in newProps) {
    if (!isEvent(key)) {
      continue;
    }

    if (oldProps[key] !== newProps[key]) {
      if (oldProps[key]) {
        dom.removeEventListener(
          getEventName(key),

          oldProps[key],
        );
      }

      dom.addEventListener(
        getEventName(key),

        newProps[key],
      );
    }
  }
}
function mountElement(element, container) {
  if (!element) {
    return;
  }
  const dom = createDOM(element);
  element.dom = dom;
  for (const child of element.children) {
    mountElement(child, dom);
  }
  container.appendChild(dom);
}

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

  const resolvedElement = resolveComponent(element);
  if (oldTree == null) {
    mountElement(resolvedElement, rootContainer);
  } else {
    reconcile(oldTree, resolvedElement, rootContainer);
  }
  oldTree = resolvedElement;

  pendingEffects.forEach((effect) => {
    effect();
  });

  pendingEffects.length = 0;
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

function useStore(store, selector = (state) => state) {
  const selected = selector(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      hookIndex = 0;

      render(rootElement, rootContainer);
    });

    return unsubscribe;
  }, []);

  return selected;
}

export { createElement, render, useState, useEffect, useStore };
