import {setHTML, addCss, syncAttr} from '../../common';
import css from './time.css';

export class XTime {
  
  static init() {
    const html = '<input /><x-overlay><x-clock></x-clock></x-overlay>';
    const timeAttrs = 'type'.split(',');
    addCss(this, css);

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, timeAttrs); // copy attributes to <input> and set

      const clockEl = this.querySelector('x-clock');
      syncAttr(this, clockEl, [], timeAttrs); // copy attributes to <x-clock> and set
      setTimeout(_ =>  {
        if (inputEl.value.match(/[0-9]+:/)) {
          const [hour, minute, _]  = inputEl.value.split(':');
          clockEl._time.setHours(hour);
          clockEl._time.setMinutes(minute);
          clockEl._updateHourHand(clockEl._time, true, false);
        }
      });
    });
  }

}
