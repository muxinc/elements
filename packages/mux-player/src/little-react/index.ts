import { h as createElement, Fragment, render } from "./vdom";

export { createElement, Fragment, render };
export * from "./hooks";

const React = {
  createElement,
  Fragment,
};
export default React;

export interface MutableRefObject<T> {
  current: T;
}
