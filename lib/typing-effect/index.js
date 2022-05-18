import {addCss, removeCss, define} from '../common/util';
import css from './typing-effect.css';

export class XTypingEffect extends HTMLElement {
  connectedCallback() {
    addCss(this, css);
    this.orgText = this.innerText;

    this.innerHTML = '';
    const text = this.orgText.split('');
    this.recursivePromiseChain(text, this); // returns promise
  }

  recursivePromiseChain(text, el){
    const char = text.shift();
    if (char) {
      return new Promise(resolve => {
        el.innerText += char;
        setTimeout(_ => resolve(), char === '\n' ? 300 : 100 );
      }).then(_ => this.recursivePromiseChain(text, el));
    } else {
      return Promise.resolve();
    }
  }

  disconnectedCallback() {
    removeCss(this);
  }
}
XTypingEffect.define = define('x-typing-effect', XTypingEffect);