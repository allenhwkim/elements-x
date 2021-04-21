import {setHTML, syncAttr} from '../../common';

export class XTime {
  
  static init() {
    const html = '<input /><x-overlay><x-color-picker></x-color-picker></x-overlay>';
    const colorAttrs = 'type,width,height'.split(',');

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, colorAttrs); // copy attributes to <input> and set

      const colorEl = this.querySelector('x-color-picker');
      syncAttr(this, colorEl, [], colorAttrs); // copy attributes to <x-calendar> and set
    });
  }

}
