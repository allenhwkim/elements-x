import * as prettier from 'prettier';
import * as cssParser from 'prettier/parser-postcss';
import * as htmlParser from 'prettier/parser-html';
import * as jsParser from 'prettier/parser-babel';
import  {setCustomElementHTMLCss}  from '../lib/common/util';

const css = `
  app-prettier {
    font-family: monospace;
    opacity: .8;
    display: block;
    border: 1px solid #ccc;
    height: 320px;
    white-space: pre-wrap;
    font-size: 14px;
    overflow: auto;
  }
`;

class AppPrettier extends HTMLElement {
  // adoptedCallback() {}
  // static get observedAttributes() { return ['src']; }
  // attributeChangedCallback(name, oldValue, newValue) { }

  constructor(...args) {
    const self = super(...args);
    this.parser = 'html';
    return self;
  }

  connectedCallback() {
    this.parser = this.getAttribute('parser') || this.parser;
    setCustomElementHTMLCss(this, null, css).then(_ => {
      this.format();
    });
  }

  format(code) {
    code = code || this.innerText;
    if (code) {
      const options = {
        parser: this.parser,
        plugins: [cssParser, jsParser, htmlParser]
      }
      console.log({options});  
      this.innerText = prettier.format(code, options);
    }
  }

}

if (!customElements.get('app-prettier')) {
  customElements.define('app-prettier', AppPrettier);
}

