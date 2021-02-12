import  {setCustomElementHTMLCss, fixIndent, addCss, removeCss}  from '../../lib/common/util';

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
    addCss(this, css);
    setCustomElementHTMLCss(this, null).then(_ => {
      const code = this.innerHTML.replace(/<br>/g, '\n').replace(/<[^>]+>/g, '');
      this.innerHTML = fixIndent(code);
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }
}

if (!customElements.get('app-pre')) {
  customElements.define('app-pre', AppPre);
}

