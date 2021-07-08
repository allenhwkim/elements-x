
import {addCss, removeCss} from 'elements-x';
import css from './clipboard.css';

export class XClipboard extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    this._init();
  }

  disonnectedCallback() {
    removeCss(this);
  }

  _init() {
    this.label = this.getAttribute('label') || 'Copy this';
    !this.getAttribute('label')
      && this.setAttribute('label', this.label);
    this.addEventListener('click', _ => {
      this._copyText(this.innerText);
      this.setAttribute('label', 'Copied');
    });
    this.addEventListener('mouseleave', _ => {
      setTimeout(_ => {
        this.setAttribute('label', this.label);
      }, 500);
    });
  }

  _copyText(text) {
    var TempText = document.createElement('input');
    TempText.value = text;
    document.body.appendChild(TempText);
    TempText.select();
    
    document.execCommand('copy');
    document.body.removeChild(TempText);
  }


}

if (!customElements.get('x-clipboard')) {
  customElements.define('x-clipboard', XClipboard);
}