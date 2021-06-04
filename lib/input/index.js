import {removeCss } from '../common';
import {Checkbox} from './checkbox';
import {Radio} from './radio';
import {XDate} from './date';
import {XTime} from './time';
import {ColorPicker} from './color';
import {XFile} from './file';
import {Switch} from './switch';
import {Text} from './text';

const types = {
  checkbox : Checkbox,
  radio : Radio,
  date : XDate,
  time: XTime,
  color: ColorPicker,
  file: XFile,
  switch: Switch,
  text: Text,
};

class XInput extends HTMLElement {
  get checked() { return this.querySelector('input')?.checked; }
  get readOnly() { return this.querySelector('input')?.readOnly; }
  get value() { return this.querySelector('input')?.value; }
  get disabled() { return this.querySelector('input')?.disabled; }
  get validity() { return this.querySelector('input')?.validity; }
  get validationMessage() { return this.querySelector('input')?.validationMessage; }

  set value(val) { this._setProp('value', val); }
  set checked(val) { this._setProp('checked', val); }
  set readOnly(val) { this._setProp('readOnly', val); }
  set disabled(val) { this._setProp('disabled', val);}
  
  _setProp(prop, val) {
    if (this.querySelector('input')) {
      this.querySelector('input')[prop] = val;
    } else {
      setTimeout(_ => this.querySelector('input')[prop] = val, 500);
    }
  }

  connectedCallback() {
    !this.getAttribute('type') && this.setAttribute('type', 'text');
    const type = this.getAttribute('type');
    types[type].init.bind(this)().then(_ => {
      const isTextInput = ['color', 'date', 'time'].includes(type);
      const isTextField = this.getAttribute('text-field') !== null;
      if (isTextInput && isTextField ) {
        if (this.getAttribute('label')) {
          const xInputText = this.querySelector('x-input[type="text"]');
          xInputText.setAttribute('label', this.getAttribute('label'));
        }
      }
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }
}

if (!customElements.get('x-input')) {
  customElements.define('x-input', XInput);
}