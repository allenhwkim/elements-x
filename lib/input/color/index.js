import {setHTML, syncAttr} from '../../common';

export class ColorPicker {
  
  static init() {
    const html = '<input /><x-overlay><x-color-picker></x-color-picker></x-overlay>';
    const clockAttrs = 'type,hour,minute,run'.split(',');

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, clockAttrs); // copy attributes to <input> and set

      const clockEl = this.querySelector('x-color-picker');
      syncAttr(this, clockEl, [], clockAttrs); // copy attributes to <x-calendar> and set
    });
  }

}
