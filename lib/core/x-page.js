import { setElementHTML } from '../common/util';

class XPage extends HTMLElement {

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
  }
  disconnectedCallback() {
  }

  attributeChangedCallback(name, oldValue, newValue) {
  }
}

if (!customElements.get('x-page')) {
  customElements.define('x-page', XPage);
}

