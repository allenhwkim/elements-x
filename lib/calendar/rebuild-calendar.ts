
export function rebuildCalendar(el) {
  const GET_DAY_INFO = el.constructor.GET_DAY_INFO;
  const IS_SELECTABLE = el.constructor.IS_SELECTABLE;
  const $ = selector => el.querySelector(selector);

  if (el.classList.contains('small')) {
    el.props.monthFormat = 'short';
    el.props.weekFormat = 'short';
  }
  const {weekFormat, monthFormat, locale, firstDayOfWeek} =  el.props;
  const calendarDate = el.calendarDate;

  const dates = getCalendarDays(calendarDate, firstDayOfWeek);

  // set month string
  $('.x-month-year #x-month').innerText = calendarDate.toLocaleDateString(locale, {month: monthFormat});

  // set years selectable
  $('.x-month-year #x-years').innerHTML= '';
  getAvailYears(calendarDate).forEach(year => {
    $('.x-month-year #x-years').insertAdjacentHTML('beforeend', `<option value="${year}">${year}</option>`);
  });
  $('.x-month-year #x-years').value = calendarDate.getFullYear().toString();
  
  // use first seven days to set weekdays, sun...sat
  $('.x-week-days-container').innerHTML = '';
  dates.slice(0, 7)
    .map(el => el.toLocaleDateString(locale, {weekday: weekFormat}))
    .forEach(el => $('.x-week-days-container').insertAdjacentHTML('beforeend', `<div class="x-weekday">${el}`) );

  // set days
  $('.x-days-container').innerHTML = '';
  dates.forEach(date => {
    const dateEl = document.createElement('div');
    dateEl.classList.add('x-date');

    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('x', '');
    buttonEl.classList.add('icon');
    buttonEl.innerText = new Intl.NumberFormat(locale).format(date.getDate());
    buttonEl.setAttribute('id', 'x-' + date.toISOString().substr(0, 10));
    dateEl.appendChild(buttonEl);

    if (date.getMonth() !== calendarDate.getMonth()) {
      buttonEl.disabled = true;
    }

    if (!IS_SELECTABLE(date)) {
      buttonEl.disabled = true;
    }

    if (el.dateSelected?.toISOString().slice(0,10) === date.toISOString().slice(0,10)) {
      buttonEl.classList.add('x-select');
    }
    
    if (date.toISOString().slice(0,10) === new Date().toISOString().slice(0,10)) {
      buttonEl.classList.add('x-today');
    }

    const dayInfo = GET_DAY_INFO(date);
    if (dayInfo) {
      buttonEl.classList.add('x-holiday');
      dateEl.setAttribute('data-tooltip', dayInfo.name);
    }

    $('.x-days-container').appendChild(dateEl);
  });
}

// Returns the first day of calendar starting from the last month ending days
function getCalendarStartDay(date, firstDayOfWeek): Date {
  firstDayOfWeek = +firstDayOfWeek;
  const DAY_MS = 60 * 60 * 24 * 1000;
  const [year, month] = [date.getFullYear(), date.getMonth()];
  const firstDayOfMonth = new Date(year, month, 1).getTime();

  return range(1,7)
    .map(num => new Date(firstDayOfMonth - DAY_MS * num))
    .find(dt => dt.getDay() === firstDayOfWeek) as Date;
}

// Return 6 weeks of days,42 days from the given date starting first day of the week
function getCalendarDays(date, firstDayOfWeek) {
  const DAY_MS = 60 * 60 * 24 * 1000;
  const calendarStartTime = (getCalendarStartDay(date, firstDayOfWeek) as Date).getTime() 
    + 60 * 60 * 2 * 1000; /* add 2 hours for Daylight saving time, 2.a.m instead of 0 a.m.*/

  return Array.from(Array(42).keys()) // 0..41
    .map(num => new Date(calendarStartTime + DAY_MS * num));
} 
 
// Returns array of numbers from start to end
function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

// Returns years, last 10 years, this year, next 10 years
function getAvailYears(date, minDate = new Date(1969,1,1), maxDate = new Date(2099,12,31)) {
  const year = date.getFullYear();
  const minYear = Math.max(minDate.getFullYear(), year - 10);
  const maxYear = Math.min(maxDate.getFullYear(), year + 10);
  return range(minYear, maxYear);
}