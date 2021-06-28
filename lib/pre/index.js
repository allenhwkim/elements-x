import  {setHTML, addCss, removeCss}  from '../../lib/common/util';

const css = `
  x-pre { 
    display: block;
    font-family: monospace;
    white-space: pre-wrap;
    background: #eee;
    padding: 12px;
    margin: 8px 0;
  }`;

export class XPre extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    setHTML(this, null).then(_ => {
      const code = this.innerHTML; // .replace(/<br>/g, '\n');
      this.innerHTML = this.fixIndent(code);
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  fixIndent(code) {
    code = code.replace(/^([ \t]*\n+){1,}|[\n\t ]+$/g, ''); // remove empty first/last line
    const firstIndent = (code.match(/^([ ]+)/) || [])[1];
    if (firstIndent) {
      const re = new RegExp(`^${firstIndent}`, 'gm');
      return code.replace(re, '');
    }
    return code;
  }

}

if (!customElements.get('x-pre')) {
  customElements.define('x-pre', XPre);
}

