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
  connectedCallback() {
    const type = this.getAttribute('type');
    if (!types[type]) {
      throw `invalid input type, ${type}, for ${this.outerHTML}`;
    }
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