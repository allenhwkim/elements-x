import html from './calendar.html';
import css from './calendar.css';
import { setHTML, addCss, removeCss } from '../common/util';
import { localDate } from './local-date';
import { resetCalendar } from './reset-calender';


class XCalendar extends HTMLElement {
  constructor(...args) {
    const self = super(...args);
    this.target;
    return self;
  }

  connectedCallback() {
    this.target = document.getElementById(this.getAttribute('target'));
    this._id = this.getAttribute('id') || `x-${parseInt('' + Math.random() * 10000)}`;
    this._weekFormat = this.getAttribute('week-format') || 'short';
    this._locale = this.getAttribute('locale') || 'en-US';
    this._selectedDate = localDate(this.getAttribute('date'));
    this._curDate = this._selectedDate;
    this._minDate = localDate(this.getAttribute('min-date') || '1969-01-01');
    this._maxDate = localDate(this.getAttribute('max-date') || '2100-12-31');
    this._firstDayOfWeek = Number(this.getAttribute('first-day-of-week') || 0);
    this._dates = this._getCalendarDays(this._selectedDate);
    this._dateFormat = this.getAttribute('date-format') || 'yyyy-MM-dd';
    
    this.addEventListener('x-calendar-month', this._handleEvent.bind(this));
    this.addEventListener('x-calendar-year', this._handleEvent.bind(this));
    this.addEventListener('x-calendar-today', this._handleEvent.bind(this));
    this.addEventListener('x-select', this._handleEvent.bind(this));

    addCss(this, css);
    setHTML(this, html).then(_ => {
      this._template = this.innerHTML; // save this to reset html by user clicks
      resetCalendar(this);
    });
  }

  disconnectedCallback() {
    removeCss(this);
  }

  static get observedAttributes() {
    return [ 'locale', 'min-date', 'week-format', 'max-date', 'first-day-of-week' ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._weekFormat = this.getAttribute('week-format') || 'short';
    this._locale = this.getAttribute('locale') || 'en-US';
    this._minDate = localDate(this.getAttribute('min-date') || '1969-01-01');
    this._maxDate = localDate(this.getAttribute('max-date') || '2100-12-31');
    this._firstDayOfWeek = Number(this.getAttribute('first-day-of-week') || 0);
    resetCalendar(this);
  }

  _handleEvent(event) {
    const val = event.detail;
    switch(event.type) {
      case 'x-calendar-month': this._setMonth(val); break;
      case 'x-calendar-year': this._setYear(val); break;
      case 'x-calendar-today': this._setToday(); break;
      case 'x-select': this._selectedDate = val; break;
    }
  }

  _setYear(year) {
    const date = this._curDate;
    const [month, day] = [date.getMonth(), date.getDate()];
    this._curDate = new Date(year, month, day);
    this._dates = this._getCalendarDays(this._curDate);
    resetCalendar(this);
  }

  _setToday() {
    this._curDate = new Date();
    this._setMonth(0);
  }

  _setMonth(inc) {
    const date = this._curDate;
    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
    this._curDate = new Date(year, month + inc, day);
    this._lastDayOfPrevMonth = 
      new Date(this._curDate.getFullYear(), this._curDate.getMonth(), 0);
    this._firstDayOfNextMonth = 
      new Date(this._curDate.getFullYear(), this._curDate.getMonth() + 1, 1);
    this._dates = this._getCalendarDays(this._curDate);
    resetCalendar(this);
  }

  _getCalendarDays(date) {
    const fdow = this._firstDayOfWeek;
    const DAY_MS = 60 * 60 * 24 * 1000;
    const calendarStartTime =
      this._getCalendarStartDay(date, fdow).getTime();

    return this._range(0, 41)
      .map(num => new Date(calendarStartTime + DAY_MS * num));
  } 

  _getCalendarStartDay(date, firstDayOfWeek) {
    const DAY_MS = 60 * 60 * 24 * 1000;
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this._range(1,7)
      .map(num => new Date(firstDayOfMonth - DAY_MS * num))
      .find(dt => dt.getDay() === firstDayOfWeek);
  }

  _range(start, end, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i);
  }
}

if (!customElements.get('x-calendar')) {
  customElements.define('x-calendar', XCalendar);
}
