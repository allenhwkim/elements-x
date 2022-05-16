import {setHTML, addCss, syncAttr} from '../../common';
import css from './date.css';
import { showOverlay, hideOverlay} from '../../overlay'

export class XDate {
  
  static init() {
    const isTextField = this.getAttribute('text-field') !== null;
    const inputHTML = isTextField ?  '<x-input type="text"></x-input>' : '<input />';
    
    const html = `${inputHTML}<x-calendar class="x-overlay" week-format="narrow"></x-calendar>`;
    const calendarAttrs = 'type,locale,date,month-format,week-format,first-day-of-week,multiple'.split(',');
    addCss(this, css);

    this.addEventListener('x-input-init', e => {
      const inputEl = this.querySelector('input');
      const calendarEl = this.querySelector('x-calendar');

      syncAttr(this, inputEl, calendarAttrs); // copy attributes to <input> and set
      inputEl.addEventListener('focus', e => {
        showOverlay(calendarEl, this, {focusBack: false})
      });
      inputEl.value && calendarEl.setAttribute('date', inputEl.value);

      calendarEl.addEventListener('select', e => {
        inputEl.value = e.detail.toISOString().slice(0, 10)
        hideOverlay(calendarEl);
      });
      syncAttr(this, calendarEl, [], calendarAttrs); // copy attributes to <x-calendar> and set
    });

    // css && addCss(this, css);
    return setHTML(this, html, 100).then(_ => {
      if (!isTextField) {
        this.querySelector('input').dispatchEvent(new CustomEvent('x-input-init', { bubbles: true }));
      }
    });
  }

}
