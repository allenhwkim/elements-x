import { setElementHTML } from '../common/util';

export class XInclude extends HTMLElement {
  // disconnectedCallback() {}
  // adoptedCallback() {}
  static get observedAttributes() { return ['src']; }

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    // console.log('include, src=', this.getAttribute('src'));
    // this._loadSrcHTML(); // attributeChangeCallback does this job
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._loadSrcHTML();
  }

  _loadSrcHTML() {
    let src = this.getAttribute('src');
    src = XInclude.beforeFetchCallback ? XInclude.beforeFetchCallback(src) || src : src;
    if (src) {
      window.fetch(src).then(resp => resp.text())
        .then(html => {
          html = XInclude.afterFetchCallback ? XInclude.afterFetchCallback(html) : html;
          // this.innerHTML = html
          setElementHTML(this, html);
        });
    }
  }
}

if (!customElements.get('x-include')) {
  customElements.define('x-include', XInclude);
}

