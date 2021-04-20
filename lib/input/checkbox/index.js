import {setHTML, addCss, syncAttr} from '../../common';
import css from './checkbox.css';

export class Checkbox {
  static init() {
    const chkboxAttrs = ['fill', 'icon', 'border', 'size', 'color', 'radius'];
    css && addCss(this, css);

    return setHTML(this, '<input />').then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, chkboxAttrs); // copy attributes to <input> and set

      if (this.getAttribute('fill')) {
        this.classList.add('filled');
        inputEl.style.setProperty('--x-checkbox-fill', this.getAttribute('fill'));
      }

      if (this.getAttribute('icon')) {
        const icon = this.getAttribute('icon').charCodeAt(0).toString(16);
        inputEl.style.setProperty('--x-checkbox-icon', `'\\${icon}'`);
      }

      if (this.getAttribute('size')) {
        inputEl.style.setProperty('--x-checkbox-size', this.getAttribute('size'));
      }

      if (this.getAttribute('border')) {
        inputEl.style.setProperty('--x-checkbox-border', this.getAttribute('border'));
      }

      if (this.getAttribute('color')) {
        inputEl.style.setProperty('--x-checkbox-color', this.getAttribute('color'));
      }

      if (this.getAttribute('radius')) {
        inputEl.style.setProperty('--x-checkbox-radius', this.getAttribute('radius'));
      }
    });
  }
}

