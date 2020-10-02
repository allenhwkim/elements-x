import  {setCustomElementHTMLCss}  from '../lib/common/util';

const css = `
  app-pre { 
    display: block;
    font-family: monospace;
    white-space: pre-wrap;
    background: #eee;
    font-size: 14px;
    padding: 12px;
    margin: 8px 0;
    line-height: 18px;
  }`;

class AppPre extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, null, css);
    const newText = this._fixIndent(this.innerHTML)
    this.innerHTML = newText;
  }

  _fixIndent(code) {
    const removeThis = (code.match(/^([\n\t ]+)/) || [])[1].replace(/\n/,'');
    if (removeThis) {
      const re = new RegExp(`^${removeThis}`, 'gm')
      return code.replace(re, '');
    }
    return code;
  }
}

if (!customElements.get('app-pre')) {
  customElements.define('app-pre', AppPre);
}

