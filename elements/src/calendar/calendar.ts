import { addCss, localDate, removeCss } from '../../lib';
import css from './calendar.css';
import { rebuildCalendar } from './rebuild-calendar';

function changeHandler(this:any, event) { // Do not use arrow function here if 'this' is used
  const year = event.target.value;
  const [month, day] = [this.currentDate.getMonth(), this.currentDate.getDate()];
  this.currentDate = new Date(year, month, day);
  console.log('xxxxxxxxxxx')
}

function clickHandler(this: any, e: any) {
  const date = this.currentDate;
  const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
  if (e.target.id === 'x-prev-month') { // ◀ button
    this.currentDate = new Date(year, month-1, day);
  } else if (e.target.id === 'x-next-month') { // ▶ button
    this.currentDate = new Date(year, month+1, day);
  } else if (e.target.id === 'x-today') { // ● button
    this.currentDate = new Date();
  } else if (e.target.id.match(/x-[0-9-]+$/)) { // date button
    const dateEl = e.target;
    const date = new Date(dateEl.id.slice(2));
    const preSelected = dateEl.classList.contains('x-select');
    if (preSelected) {
      dateEl.classList.remove('x-select');
      this.datesSelected = this.datesSelected.filter(el => {
        return el.toISOString().substring(0,10) !== date.toISOString().substring(0,10);
      });
      dateEl.dispatchEvent(new CustomEvent('deselect', { bubbles: true, detail: localDate(date)}));
    } else {
      if (this._props.multiple) {
        this.datesSelected.push(date);
      } else {
        this.querySelector('.x-days-container .x-select')?.classList.remove('x-select');
        this.datesSelected = [date];
      }
      dateEl.classList.add('x-select');
      dateEl.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: localDate(date)}));
    }
  }
}

const html = `
  <div class="calendar">
    <div class="x-header">
      <div class="x-month-year">
        <span id="x-month" class="x-month"></span>
        <select id="x-years" class="x-years" read-only></select>
      </div>
      <button id="x-prev-month" class="x-prev" arial-label="previous month"></button>
      <button id="x-today" class="x-today" arial-label="today"></button>
      <button id="x-next-month" class="x-next" arial-label="next month"></button>
    </div>
    <div class="x-week-days-container"></div>
    <div class="x-days-container">
    </div>
  </div>`

export class Calendar extends HTMLElement {
  static HOLIDAYS = [ 
    {date: '2022-12-25', name: 'Christmas'}
  ];

  static IS_SELECTABLE = date => true;

  static get observedAttributes() {
    return ['multiple', 'date', 'month-format', 'week-format', 'locale', 'fist-day-of-week'];
  }

  _currentDate = new Date();
  set currentDate(val) {
    this._currentDate = val;
    this.#updateDOM();
  }
  get currentDate() {
    return this._currentDate;
  }

  _props = {
    multiple: false,
    date: new Date(),
    monthFormat: 'long',  // long(June), short(Jun), narrow(J)
    weekFormat: 'long',  // long(Monday), short(Mon), narrow(M)
    locale: 'en', // en-US, ja, ko, zh-CN
    firstDayOfWeek: 0,// 0(Sunday), 1(Monday)
  };

  disConnnectedCallback() {
    removeCss(this.tagName);
  }

  connectedCallback() { 
    addCss(this.tagName, css);
    this.innerHTML = html
    rebuildCalendar(this);
    this.addEventListener('change', changeHandler);
    this.addEventListener('click', clickHandler);
  }

  async attributeChangedCallback(name:string, oldValue:string, newValue:string) {
    if (this.isConnected && oldValue !== newValue) {
      (name === 'multiple') && (this._props.multiple = newValue !== 'false');
      (name === 'date') && (this._props.date = new Date(newValue), this.currentDate = this._props.date);
      (name === 'month-format') && (this._props.monthFormat = newValue);
      (name === 'week-format') && (this._props.weekFormat = newValue);
      (name === 'locale') && (this._props.locale = newValue);
      (name === 'first-day-of-week') && (this._props.firstDayOfWeek = +newValue);
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
