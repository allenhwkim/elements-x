import {setHTML, addCss, syncAttr} from '../../common';
import css from './time.css';

export class XTime {
  
  static init() {
    const isTextField = this.getAttribute('text-field') !== null;
    const inputHTML = isTextField ?  '<x-input type="text"></x-input>' : '<input />';
    
    const html = `${inputHTML}<x-overlay><x-clock></x-clock></x-overlay>`;
    const timeAttrs = 'type'.split(',');
    addCss(this, css);

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, timeAttrs); // copy attributes to <input> and set

      const clockEl = this.querySelector('x-clock');
      syncAttr(this, clockEl, [], timeAttrs); // copy attributes to <x-clock> and set

      if (clockEl && inputEl?.value.match(/[0-9]+:/)) {
        const [hour, minute, _]  = inputEl.value.split(':');
        if (clockEl?._time) {
          clockEl._time.setHours(hour);
          clockEl._time.setMinutes(minute);
          clockEl._updateHourHand(clockEl._time, true, false);
        }
      }
    });
  }

}
