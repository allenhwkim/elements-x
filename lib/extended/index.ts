import { Clock } from './clock/clock';
import { Json } from './json/json';

if (window) {
  // let users override code by not defining custom elements
  const X = { Clock, Json };

  for (var key in X) {
    const elName = `x-${key.toLowerCase()}`;
    !customElements.get(elName) && customElements.define(elName, X[key]);
  }
}

export { Clock, Json };
