import  {setHTML, addCss, removeCss, define}  from '../../lib/common/util';
import css from './x-pre.css';

export class XPre extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    setHTML(this, null).then(_ => {
      const code = this.innerText; // .replace(/<br>/g, '\n');
      if (code) {
        this.innerText = this.fixIndent(code);
      } else {
        setTimeout(_ => {
          const html = this.previousElementSibling.outerHTML;
          const prepend = html.match(/(\s+).*$/)[1];
          this.innerText = this.fixIndent(prepend + html);
        });
      }
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
XPre.define = define('x-pre', XPre);
