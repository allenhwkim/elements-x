import css from './menu.css';
import {XList} from '../list/index';

class XMenu extends XList {
  constructor(...args) {
    const self = super(...args);
    self._menuStyle = true;
    self._css = css;
    return self;
  }

  connectedCallback() {
    super.connectedCallback();
    this.firstElementChild.classList.add('dropdown-menu');
  }

}

if (!customElements.get('x-menu')) {
  customElements.define('x-menu', XMenu);
}