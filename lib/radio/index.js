import css from './radio.css';
import {setCustomElementHTMLCss, addCss, removeCss} from '../common/util';

class XRadio extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    addCss(this, css);

    const inputEl = this.querySelector('input');
    if (this.getAttribute('fill')) {
      this.classList.add('filled');
      inputEl.style.setProperty('--x-radio-fill', this.getAttribute('fill'));
    }
    if (this.getAttribute('icon')) {
      const icon = this.getAttribute('icon').charCodeAt(0).toString(16);
      inputEl.style.setProperty('--x-radio-icon', `'\\${icon}'`);
    }
    if (this.getAttribute('size')) {
      inputEl.style.setProperty('--x-radio-size', this.getAttribute('size'));
    }
    if (this.getAttribute('border')) {
      inputEl.style.setProperty('--x-radio-border', this.getAttribute('border'));
    }
    if (this.getAttribute('color')) {
      inputEl.style.setProperty('--x-radio-color', this.getAttribute('color'));
    }
  }

  disconnectedCallback() {
    removeCss(this);
  }
}

if (!customElements.get('x-radio')) {
  customElements.define('x-radio', XRadio);
}