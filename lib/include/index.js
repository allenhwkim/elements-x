import { setElementHTML, addCss, removeCss } from '../common/util';
import css from './include.css';

export class XInclude extends HTMLElement {
  static get observedAttributes() { return ['src']; }

  connectedCallback() {
    addCss(this, css);
  }
  disconnectedCallback() {
    removeCss(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._loadSrcHTML();
  }

  _loadSrcHTML() {
    let src = this.getAttribute('src');
    src = XInclude.beforeFetchCallback ? XInclude.beforeFetchCallback(src) || src : src;
    if (src) {
      // show loading
      this.classList.add('x-loading');
      window.fetch(src)
        .then(resp => resp.text())
        .then(html => {
          if (html.match(/^<!DOCTYPE/)) { // 404 redirect applied, not a partial html
            html = '404 NOT FOUND';
          } else {
            html = XInclude.afterFetchCallback ? XInclude.afterFetchCallback(html) : html;
          }
          setElementHTML(this, html);
        })
        .finally(_ => {
          this.classList.remove('x-loading');
        });
    }
  }
}

if (!customElements.get('x-include')) {
  customElements.define('x-include', XInclude);
}

