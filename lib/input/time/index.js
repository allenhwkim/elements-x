import {setHTML, addCss, syncAttr} from '../../common';
import css from './time.css';

export class XTime {
  
  static init() {
    const html = '<input /><x-overlay><x-clock></x-clock></x-overlay>';
    const colorAttrs = 'type,width,height'.split(',');
    addCss(this, css);

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, colorAttrs); // copy attributes to <input> and set

      const colorEl = this.querySelector('x-color-picker');
      syncAttr(this, colorEl, [], colorAttrs); // copy attributes to <x-calendar> and set
    });
  }

}
