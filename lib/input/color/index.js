import {setHTML, addCss, syncAttr} from '../../common';
import css from './color.css';

export class ColorPicker {
  
  static init() {
    const isTextField = this.getAttribute('text-field') !== null;
    const inputHTML = isTextField ?  '<x-input type="text"></x-input>' : '<input />';
    
    const html = `${inputHTML}<x-overlay debug><x-color-picker></x-color-picker></x-overlay>`;
    const clockAttrs = 'type,hour,minute,run'.split(',');
    addCss(this, css);

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, clockAttrs); // copy attributes to <input> and set

      const colorEl = this.querySelector('x-color-picker');
      syncAttr(this, colorEl, [], clockAttrs); // copy attributes to <x-calendar> and set
      // return new Promise(resolve => setTimeout(_ => resolve()));
    });
  }

}
