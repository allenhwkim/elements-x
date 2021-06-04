import html from './button.html';
import css from './button.css';
import {setHTML, addCss, removeCss} from '../common/util';

class XButton extends HTMLElement {
  // adoptedCallback() {}
  get value() { return this.querySelector('button')?.value; }
  get disabled() { return this.querySelector('button')?.disabled; }
  get validity() { return this.querySelector('button')?.validity; }
  get validationMessage() { return this.querySelector('button')?.validationMessage; }

  set value(val) { this._setProp('value', val); }
  set disabled(val) { this._setProp('disabled', val); }

  _setProp(prop, val) {
    if (prop === 'disabled') {
      val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
    }
    if (this.querySelector('button')) {
      this.querySelector('button')[prop] = val;
    } else {
      setTimeout(_ => this.querySelector('button')[prop] = val, 500);
    }
  }

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    addCss(this, css);
    setHTML(this, html)
      .then(_ => this._init());
  }

  disconnectedCallback() {
    removeCss(this);
  }

  static get observedAttributes() { return ['disabled']; }

  attributeChangedCallback(name, oldValue, newValue) {
    (name === 'disabled') && this._setTabIndex();
  }

  _init() {
    this._setTabIndex();
    this.addEventListener('keydown', event =>  {
      (event.keyCode === 13) && this.click();
    });
  }
  
  _setTabIndex() {
    const disabled = this.getAttribute('disabled');
    this.setAttribute('tabindex', disabled === null ? 0 : -1);
  }

}

if (!customElements.get('x-button')) {
  customElements.define('x-button', XButton);
}
