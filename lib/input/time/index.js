import {setHTML, syncAttr} from '../../common';

export class XTime {
  
  static init() {
    const html = '<input /><x-overlay><x-clock></x-clock></x-overlay>';
    const clockAttrs = 'type,hour,minute,run'.split(',');

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, clockAttrs); // copy attributes to <input> and set

      const clockEl = this.querySelector('x-clock');
      syncAttr(this, clockEl, [], clockAttrs); // copy attributes to <x-calendar> and set
    });
  }

}
