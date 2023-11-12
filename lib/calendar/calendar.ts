import { addCss, localDate, removeCss } from '../../lib/util';
import * as cssM from './calendar.css?inline';
import html from './calendar.html?raw';
import { rebuildCalendar } from './rebuild-calendar';

const css = cssM.default;

function yearChanged(this:any, event) { // Do not use arrow function here if 'this' is used
  const year = event.target.value;
  const [month, day] = [this.calendarDate.getMonth(), this.calendarDate.getDate()];
  this.calendarDate = new Date(year, month, day);
}

function clickHandler(this: any, e: any) {
  const date = this.calendarDate;
  if (e.target.id === 'x-prev-month') { // ◀ button
    this.calendarDate = (date.setDate(0), date);
  } else if (e.target.id === 'x-next-month') { // ▶ button
    this.calendarDate = (date.setMonth(date.getMonth() + 1), date);
  } else if (e.target.id === 'x-today') { // ● button
    this.calendarDate = new Date();
  } else if (e.target.id.match(/x-[0-9-]+$/)) { // date button
    const dateEl = e.target;
    const date = new Date(dateEl.id.slice(2));
    this.querySelector('.x-date .x-select')?.classList.remove('x-select');
    dateEl.classList.add('x-select');
    this.dateSelected = date;
    this.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: localDate(date, this.props.locale)}));
  }
}

export class Calendar extends HTMLElement {
  static GET_DAY_INFO = date => null;
  static IS_SELECTABLE = date => true;
  static get observedAttributes() {
    return ['date', 'month-format', 'week-format', 'locale', 'first-day-of-week', 'locale'];
  }

  dateSelected: Date | undefined;

  _calendarDate = new Date();
  set calendarDate(val) {
    this._calendarDate = val;
    this.#updateDOM();
  }
  get calendarDate() {
    return this._calendarDate;
  }

  props = {
    date: undefined as any, // start date of calendar
    monthFormat: 'long',  // long(June), short(Jun), narrow(J)
    weekFormat: 'long',  // long(Monday), short(Mon), narrow(M)
    locale: Intl.NumberFormat().resolvedOptions().locale, // en-US, ja, ko, zh-CN
    firstDayOfWeek: 0,// 0(Sunday), 1(Monday)
  };

  disConnnectedCallback() {
    removeCss(this.tagName);
  }

  connectedCallback() { 
    addCss(this.tagName, css);
    this.innerHTML = html;
    this.dateSelected = this.props.date;
    rebuildCalendar(this);
    this.addEventListener('change', yearChanged);
    this.addEventListener('click', clickHandler);
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (oldValue !== newValue) {
      if (name === 'date') {
        this.props.date = 
          newValue.match(/^[0-9]+$/) ? new Date(+newValue):
          typeof newValue === 'string' ? new Date(newValue): 
          newValue;
        this.calendarDate = this.props.date;
      } else {
        var propsKey = name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        this.props[propsKey] = newValue;
      }
      this.#updateDOM();
    }
  }

  #timer: any; // run as debounced 
  #updateDOM() { 
    clearTimeout(this.#timer);
    this.#timer = setTimeout(async () => { 
      rebuildCalendar(this);
    }, 50);
  }
}
