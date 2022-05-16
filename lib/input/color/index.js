import {setHTML, addCss, syncAttr} from '../../common';
import css from './color.css';

export class ColorPicker {
  
  static init() {
    const isTextField = this.getAttribute('text-field') !== null;
    const inputHTML = isTextField ?  '<x-input type="text"></x-input>' : '<input />';
    
    const html = `${inputHTML}<x-color-picker></x-color-picker>`;
    const colorAttrs =  ['value'];
    addCss(this, css);

    this.addEventListener('x-input-init', e => {
      const inputEl = this.querySelector('input');
      const colorEl = this.querySelector('x-color-picker');
      syncAttr(this, colorEl, [], colorAttrs); // copy attributes to <x-calendar> and set

      this.addEventListener('select', e => {
        inputEl.value = e.detail.hex;
        inputEl.focus();
      })
    });

    // css && addCss(this, css);
    return setHTML(this, html, 100).then(_ => {
      if (!isTextField) {
        this.querySelector('input').dispatchEvent(new CustomEvent('x-input-init', { bubbles: true }));
      }
    });
  }
}
