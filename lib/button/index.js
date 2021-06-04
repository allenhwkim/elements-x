import html from './button.html';
import css from './button.css';
import {setHTML, addCss, removeCss} from '../common/util';

class XButton extends HTMLElement {
  // adoptedCallback() {}
  get value() { return this.querySelector('button').value; }
  set value(val) { this.querySelector('button').value = val; }
  get disabled() { return this.querySelector('button').disabled; }
  set disabled(val) { this.querySelector('button').disabled = val; }
  get validity() { return this.querySelector('button').validity; }
  get validationMessage() { return this.querySelector('button').validationMessage; }

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
