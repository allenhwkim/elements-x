import  {setCustomElementHTMLCss}  from '../../lib/common/util';

const css = `
  app-pre { 
    display: block;
    font-family: monospace;
    white-space: pre-wrap;
    background: #eee;
    padding: 12px;
    margin: 8px 0;
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
    setCustomElementHTMLCss(this, null, css).then(_ => {
      const newText = this._fixIndent(this.innerHTML)
      this.innerHTML = newText.replace(/^\n/, '').trim();;
    });
  }

  _fixIndent(code) {
    const firstIndent = code.match(/^([\n\t ]+)/);
    if (firstIndent) {
      const removeThis = firstIndent[1].replace(/\n/,'');
      const re = new RegExp(`^${removeThis}`, 'gm')
      return code.replace(re, '');
    }
   return code;
  }
}

if (!customElements.get('app-pre')) {
  customElements.define('app-pre', AppPre);
}

