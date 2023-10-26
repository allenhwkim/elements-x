import { addCss, localDate, removeCss } from '../util';
import css from './calendar.css';
import { rebuildCalendar } from './rebuild-calendar';

function changeHandler(this:any, event) { // Do not use arrow function here if 'this' is used
  const year = event.target.value;
  const [month, day] = [this.currentDate.getMonth(), this.currentDate.getDate()];
  this.currentDate = new Date(year, month, day);
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
    this.querySelector('.x-date .x-select')?.classList.remove('x-select');
    dateEl.classList.add('x-select');
    this.dispatchEvent(new CustomEvent('select', { bubbles: true, detail: localDate(date)}));
  }
}

const html = `
  <div class="calendar">
    <div class="x-header">
      <div class="x-month-year">
        <span id="x-month" class="x-month"></span>
        <select id="x-years" class="x-years" aria-label="year" read-only></select>
      </div>
      <button id="x-prev-month" class="x-prev" title="previous month"></button>
      <button id="x-today" class="x-today" title="today"></button>
      <button id="x-next-month" class="x-next" title="next month"></button>
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
    return ['date', 'month-format', 'week-format', 'locale', 'first-day-of-week'];
  }

  _currentDate = new Date();
  set currentDate(val) {
    this._currentDate = val;
    this.#updateDOM();
  }
  get currentDate() {
    return this._currentDate;
  }

  props = {
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
      if (name === 'date') {
        console.log({name, newValue})
        this.props.date = 
          newValue.match(/^[0-9]+/) ? new Date(+newValue):
          typeof newValue === 'string' ? new Date(newValue): 
          newValue;
        this.currentDate = this.props.date;
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
