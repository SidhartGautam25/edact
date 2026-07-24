import { createElement } from "./edactV2.js";

/**
 * A JSX-free helper function to construct virtual DOM trees.
 * Automatically handles shifting of arguments when props are omitted.
 *
 * @param {string|Function} type - The element type (HTML tag name or functional component)
 * @param {Object} [props] - The props for the element. If omitted (i.e. is a child, VNode, or array), it will be treated as the first child.
 * @param {...any} [children] - Children elements, text, or arrays of children.
 */
export function view(type, props, ...children) {
  if (props === undefined) {
    return createElement(type, {});
  }

  const isVNode = (obj) =>
    obj && typeof obj === "object" && "type" in obj && "props" in obj;

  let resolvedProps = props;
  let resolvedChildren = children;

  if (
    typeof props !== "object" ||
    props === null ||
    isVNode(props) ||
    Array.isArray(props)
  ) {
    // If the second argument is a child element, array, or primitive, shift it to children
    resolvedProps = {};
    resolvedChildren = [props, ...children];
  }

  // Flatten children and filter out falsy/conditional elements (null, undefined, false)
  const flatChildren = [];
  const flatten = (arr) => {
    for (const item of arr) {
      if (Array.isArray(item)) {
        flatten(item);
      } else if (item !== undefined && item !== null && item !== false) {
        flatChildren.push(item);
      }
    }
  };
  flatten(resolvedChildren);

  return createElement(type, resolvedProps, ...flatChildren);
}
