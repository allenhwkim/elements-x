import {removeCss } from '../common';
import {Checkbox} from './checkbox';
import {Radio} from './radio';
import {XDate} from './date';
import {XTime} from './time';

const types = {
  checkbox : Checkbox,
  radio : Radio,
  date : XDate,
  time: XTime
};

class XInput extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('type');
    if (!types[type]) {
      throw `invalid input type, ${type}, for ${this.outerHTML}`;
    }
    types[type].init.bind(this)();
  }

  disconnectedCallback() {
    removeCss(this);
  }
}

if (!customElements.get('x-input')) {
  customElements.define('x-input', XInput);
}