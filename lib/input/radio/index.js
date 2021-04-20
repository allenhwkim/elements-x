import { setHTML, addCss, syncAttr} from '../../common';
import css from './radio.css';

export class Radio {
  static init() {
    const radioAttrs = ['fill', 'icon', 'border', 'size', 'color', 'radius'];
    css && addCss(this, css);

    return setHTML(this, '<input />').then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, radioAttrs); // copy attributes to <input> and set

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
    });
  }
}

