import {setHTML, addCss, syncAttr} from '../../common';
import css from './color.css';

export class XDate {
  
  static init() {
    const html = '<input /><x-overlay><x-calendar></x-calendar></x-overlay>';
    const calendarAttrs = 'type,locale,date,week-format,min-date,max-date,first-day-of-week,target'.split(',');
    addCss(this, css);

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, calendarAttrs); // copy attributes to <input> and set

      const calendarEl = this.querySelector('x-calendar');
      syncAttr(this, calendarEl, [], calendarAttrs); // copy attributes to <x-calendar> and set
    });
  }

}
