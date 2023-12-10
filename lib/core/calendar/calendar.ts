import { addCss, localDate, removeCss } from '../../util';
import * as cssM from './calendar.css?inline';
import html from './calendar.html?raw';
import { rebuildCalendar } from './rebuild-calendar';

const css = cssM.default;

function yearChanged(this:any, event) { // Do not use arrow function here if 'this' is used
  const year = event.target.value;
  const [month, day] = [this.calendarDate.getMonth(), this.calendarDate.getDate()];
  this.calendarDate = new Date(year, month, day);
}

function today() {
  return new Intl.DateTimeFormat(
    'fr-CA',{ month:'2-digit',day:'2-digit', year:'numeric'}
  ).format(new Date());
}

function clickHandler(this: any, e: any) {
  const date = this.calendarDate;
  if (e.target.id === 'x-prev-month') { // ◀ button
    this.calendarDate = (date.setDate(0), date);
  } else if (e.target.id === 'x-next-month') { // ▶ button
    this.calendarDate = (date.setMonth(date.getMonth() + 1), date);
  } else if (e.target.id === 'x-today') { // ● button
    this.calendarDate = localDate(today(), navigator.language);
  } else if (e.target.id.match(/x-[0-9-]+$/)) { // date button
    const dateEl = e.target;
    const date = localDate(dateEl.id.slice(2), navigator.language);
    const selectedEl = this.querySelector('.x-date .x-select');
    if (selectedEl?.isEqualNode(dateEl)) {
      dateEl.classList.remove('x-select');
      this.dateSelected = undefined;
      this.required && this.classList.add('error', 'required');
      this.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: undefined}));
    } else {
      selectedEl?.classList.remove('x-select');
      dateEl.classList.add('x-select');
      this.dateSelected = date;
      this.classList.remove('error', 'required');
      this.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: localDate(date, this.locale)}));
    }
  }
}

export class Calendar extends HTMLElement {
  static GET_DAY_INFO = date => null;
  static IS_SELECTABLE = date => true;
  static get observedAttributes() {
    return ['date', 'month-format', 'week-format', 'locale', 'first-day-of-week', 'locale', 'required'];
  }

  get value() {
    return localDate(this.dateSelected, navigator.language);
  }

  dateSelected: Date | undefined;
  date: any = undefined; // start date of calendar
  weekFormat = 'long';  // long(Monday), short(Mon), narrow(M)
  monthFormat = 'long';  // long(June), short(Jun), narrow(J)
  locale = navigator.language; // en-US, ja, ko, zh-CN
  firstDayOfWeek = 0; // 0(Sunday), 1(Monday)
  required = false;

  _calendarDate = localDate(today(), navigator.language);
  set calendarDate(val) {
    this._calendarDate = val;
    this.#updateDOM();
  }
  get calendarDate() {
    return this._calendarDate;
  }


  disConnnectedCallback() {
    removeCss(this.tagName);
  }

  connectedCallback() { 
    addCss(this.tagName, css);
    this.innerHTML = html;
    this.dateSelected = this.date;
    rebuildCalendar(this);
    this.addEventListener('change', yearChanged);
    this.addEventListener('click', clickHandler);
    console.log('xxxxxxxxxxxx connectedCallback')
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (oldValue !== newValue) {
      if (name === 'date') {
        this.date = 
          newValue.match(/^[0-9]+$/) ? localDate(new Date(+newValue), navigator.language):
          typeof newValue === 'string' ? localDate(new Date(newValue), navigator.language): 
          localDate(newValue, navigator.language);
        this.calendarDate = this.date;
      } else if (name === 'required') {
        this.required = newValue !== null;
      } else {
        var propName = name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
        this[propName] = newValue;
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
