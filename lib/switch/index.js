import css from './switch.css';
import {setCustomElementHTMLCss} from '../common/util';

class XSwitch extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    return self;
  }

  connectedCallback() {
    setCustomElementHTMLCss(this, null, css).then(_ => {
      if (this.getAttribute('size')) {
        this.style.setProperty('--x-switch-size', this.getAttribute('size'));
      }
      if (this.getAttribute('color')) {
        this.style.setProperty('--x-switch-color', this.getAttribute('color'));
      }
      this._addEventListener();
      this._setAttributes();
    });
  }

  _addEventListener() {
    this.addEventListener('click', _ => {
      const checked = this.getAttribute('aria-checked') === 'true';
      this.setAttribute('aria-checked', !checked);
    });
  }

  _setAttributes() {
    const disabled = ['true', ''].includes(this.getAttribute('disabled'));
    const checked = ['true', ''].includes(this.getAttribute('checked'));
    this.setAttribute('tabindex', disabled ? -1 : 0);
    this.setAttribute('role', 'switch');
    this.setAttribute('aria-checked', checked ? true : false);
  }
}

if (!customElements.get('x-switch')) {
  customElements.define('x-switch', XSwitch);
}

