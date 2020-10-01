import { setElementHTML } from '../common/util';

class XInclude extends HTMLElement {
  // disconnectedCallback() {}
  // adoptedCallback() {}
  static get observedAttributes() { return ['src']; }

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    this._loadSrcHTML();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._loadSrcHTML();
  }

  _loadSrcHTML() {
    const src = this.getAttribute('src');
    if (src) {
      window.fetch(src).then(resp => resp.text())
        .then(html => {
          // this.innerHTML = html
          setElementHTML(this, html);
        });
    }
  }
}

if (!customElements.get('x-include')) {
  customElements.define('x-include', XInclude);
}

