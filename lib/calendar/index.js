import html from './calendar.html';
import css from './calendar.css';
import { addCss, removeCss, define } from '../common/util';
import { rebuildCalendar } from './rebuild-calender';

/**
 * attributers
 *  - date: selected date as string, default is today, e.g. '2020-09-14'
 *  - week-format: format of week, default is 'short'". “long"(Monday), “short"(Mon), “narrow"(M)
 *  - locale: locale of calendar, default is 'en', e.g., 'en-US', 'ja', 'ko', 'zh-CN'
 *  - first-day-of-week: first day of week, default is 0(Sunday), e.g., 1(Monday)
 */
export class XCalendar extends HTMLElement {
  static HOLIDAYS = [];
  static IS_SELECTABLE = function(date) { return true; }  

  set datesSelected(dates) {
    this._datesSelected = dates.map(el => this.localDate(el));
    rebuildCalendar(this);
  }

  get datesSelected() {
    return this._datesSelected;
  }
  
  connectedCallback() {
    this.currentDate = this.localDate(this.getAttribute('date'));
    this.multiple = this.getAttribute('multiple') !== null;;
    this._datesSelected = [];

    this.addEventListener('click', this.clickHandler);  // ◀ ● ▶ buttons, date
    this.addEventListener('change', e => this.setYear(e.target.value)); // year select

    addCss(this, css);
    this.innerHTML = html;
    rebuildCalendar(this);
    this.initDone = true;
  }

  disconnectedCallback() {
    removeCss(this);
  }

  clickHandler(e) {
    if (e.target.id === 'x-prev-month') { // ◀ button
      this.addMonth(-1); 
    } else if (e.target.id === 'x-next-month') { // ▶ button
      this.addMonth(+1);
    } else if (e.target.id === 'x-today') { // ● button
      this.currentDate = new Date();
      this.addMonth(0);
    } else if (e.target.id.match(/x-[0-9-]+$/)) { // date button
      const dateEl = e.target;
      const date = new Date(dateEl.id.slice(2));
      const preSelected = dateEl.classList.contains('x-select');
      if (preSelected) {
        dateEl.classList.remove('x-select');
        this._datesSelected = this._datesSelected.filter(el => {
          return el.toISOString().substring(0,10) !== date.toISOString().substring(0,10);
        });
        dateEl.dispatchEvent(new CustomEvent('deselect', { bubbles: true, detail: this.localDate(date)}));
      } else {
        if (this.multiple) {
          this._datesSelected.push(date);
        } else {
          this.querySelector('.x-days-container .x-select')?.classList.remove('x-select');
          this._datesSelected = [date];
        }
        dateEl.classList.add('x-select');
        dateEl.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: this.localDate(date)}));
      }
    }
  }

  static get observedAttributes() {
    return [ 'date', 'locale', 'week-format', 'first-day-of-week'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    this.currentDate = this.localDate(this.getAttribute('date'));
    this.initDone && rebuildCalendar(this);
  }

  /**
   * Return availaibility of a date to set availibility of a date
   *  e.g., min. date, max. date, weekdays, weekends, and holidays
   */
  isAvailable(date) {
    return true;
  }

  setYear(year) {
    const date = this.currentDate;
    const [month, day] = [date.getMonth(), date.getDate()];
    this.currentDate = new Date(year, month, day);
    rebuildCalendar(this);
  }

  addMonth(inc) {
    const date = this.currentDate;
    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
    this.currentDate = new Date(year, month + inc, day);
    rebuildCalendar(this);
  }

  localDate(date) {
    if (!date) {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      date = new Date(Date.now() - tzoffset);
    } else if (typeof date === 'string') {
      date = new Date(date);
    }
    const str = date.toISOString().slice(0, -1).replace(/[^0-9]/g, '');
    const [year, month, day] = [str.substr(0,4), str.substr(4,2), str.substr(6,2)];

    const localDate = new Date(+year, +month - 1, +day, 2, 0, 0);
    return localDate;
  }

}
XCalendar.define = define('x-calendar', XCalendar);
