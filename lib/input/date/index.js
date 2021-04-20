import {setHTML, syncAttr} from '../../common';

export class XDate {
  
  static init() {
    const html = '<input /><x-overlay><x-calendar></x-calendar></x-overlay>';
    const calendarAttrs = 'type,lodate,date,week-format,min-date,max-date,first-day-of-week,target'.split(',');

    // css && addCss(this, css);
    return setHTML(this, html).then(_ => {
      const inputEl = this.querySelector('input');
      syncAttr(this, inputEl, calendarAttrs); // copy attributes to <input> and set

      const calendarEl = this.querySelector('x-calendar');
      syncAttr(this, calendarEl, [], calendarAttrs); // copy attributes to <x-calendar> and set
    });
  }

}
