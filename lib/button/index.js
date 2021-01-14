import html from './button.html';
import css from './button.css';
import {setCustomElementHTMLCss} from '../common/util';

class XButton extends HTMLElement {
  // adoptedCallback() {}

  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, html, css)
      .then(_ => this._init());
  }

  static get observedAttributes() { return ['disabled']; }

  attributeChangedCallback(name, oldValue, newValue) {
    (name === 'disabled') && this._setTabIndex();
  }

  _init() {
    this._setTabIndex();
    this.addEventListener('click', _ =>  {
      this.classList.add('clicked');
      setTimeout(_ => this.classList.remove('clicked'), 1000);
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
