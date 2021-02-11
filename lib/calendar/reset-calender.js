/*
 https://to-locale-date-string.stackblitz.io
 options
 - dateStyle: "full", "long", "medium", "short"
 - timeStyle: "full, "long", "medium", "short"
 - fractionalSecondDigits: 0, 1, 2, 3
 - calendar: buddhist, chinese, optic, ethiopia, ethiopic, gregory, hebrew, indian, islamic, iso8601, japanese, persian, roc.
 - numberingSystem: “arab", "arabext", " bali", "beng", "deva", "fullwide", " gujr", "guru", "hanidec", "khmr", " knda", "laoo", "latn", "limb", "mlym", " mong", "mymr", "orya", "tamldec", " telu", "thai", "tibt"
 - localeMatcher: “lookup" and "best fit"(default)
 - timeZone: 'UTC', default (run-time timezone)
 - hour12: true or false (default, true or false by locale)
 - hourCycle: “h11", "h12", "h23", or "h24".
 - formatMatcher: “basic" and "best fit"(default)
 - weekday: “long"(Monday), “short"(Mon), “narrow"(M)
 - era: “long"(Anno Domini), “short"(AD), “narrow"(A)
 - year: “numeric"(2020), “2-digit"(20)
 - month: “numeric"(1), “2-digit"(01), “long"(January), “short"(Jan), “narrow" (J)
 - day: “numeric"(2), “2-digit"(02)
 - hour: “numeric"(2), “2-digit"(02)
 - minute: “numeric"(2), “2-digit"(02)
 - second: “numeric"(2), “2-digit"(02)
 - timeZoneName: “long"(Pacific Standard Time), "short"(PST)
*/

import { setTargetValue } from '../common/util';

export function resetCalendar (el) {
  const [locale, selectedDate, dates] = [el._locale, el._selectedDate, el._dates];
  const [curDate, minDate, maxDate] = [el._curDate || new Date(), el._minDate, el._maxDate];
  const [template, weekFormat, id] = [el._template, el._weekFormat, el._id];

  const lastDayOfPrevMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 0);
  const firstDayOfNextMonth = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 1);
 
  function formatDate(date, options) {
    return date.toLocaleDateString(locale, options);
  }

  function range(start, end, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i);
  }

  function getAvailYears(minDate, maxDate) {
    const year = curDate.getFullYear();
    const minYear = Math.max(minDate.getFullYear(), year - 10);
    const maxYear = Math.min(maxDate.getFullYear(), year + 10);
    return range(minYear, maxYear);
  }

  function isSameMonth(date) {
    return date.getMonth() === curDate.getMonth();
  }

  function isSameDate(a, b) {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();
  }

  function fireEvent(event, reason, detail) {
    const custEvent = new CustomEvent('x-calendar-' + reason, {bubbles: true, detail});
    event.target.dispatchEvent(custEvent);
    event.stopPropagation(); // bcoz html changes, x-calendar-xxx -> reset-calendar()
  }

  function fireDateSelectedEvent(date) {
    const custEvent = new CustomEvent('x-calendar-selected', {bubbles: true, detail: date});
    el.dispatchEvent(custEvent);
    setTargetValue(el, date);
  }

  const $ = selector => el.querySelector(selector);
  el.innerHTML = template; // reset html

  if ($('.x-month-year')) {
    $('.x-month-year #x-month').innerText = formatDate(curDate,  {month: 'long'});
    getAvailYears(minDate, maxDate).forEach(year => {
      $('.x-month-year #x-years').insertAdjacentHTML(
        'beforeend', `<option value="${year}">${year}</option>`
      );
    });
    $(`.x-month-year #x-years [value="${curDate.getFullYear()}"]`).setAttribute('selected', ''); 
    $('.x-month-year #x-years').addEventListener('change', function(e) {
      fireEvent(e, 'year', this.value);
    });
  }
  
  if ($('.x-buttons')) {
    (lastDayOfPrevMonth === minDate) ? 
      $('.x-buttons .x-previous').setAttribute('disabled', '') :
      $('.x-buttons .x-previous').removeAttribute('disabled');
    (firstDayOfNextMonth > maxDate) ? 
      $('.x-buttons .x-next').setAttribute('disabled', '') :
      $('.x-buttons .x-next').removeAttribute('disabled');
    $('.x-buttons .x-previous').addEventListener('click', e => fireEvent(e, 'month', -1));
    $('.x-buttons .x-today').addEventListener('click', e => fireEvent(e, 'today', -1));
    $('.x-buttons .x-next').addEventListener('click', e => fireEvent(e, 'month', +1));

    dates.slice(0, 7).map(el => formatDate(el, {weekday: weekFormat})).forEach(el => {
      $('.x-week-days-container').insertAdjacentHTML('beforeend', `<div class="x-weekday">${el}`);
    });
  }

  if (dates) {
    dates.forEach(date => {
      const dateEl = document.createElement('button');
      const disabled = !isSameMonth(date) || (date < minDate || date > maxDate);
      disabled && dateEl.setAttribute('disabled', '');
      dateEl.classList.add('x-date');
      isSameMonth(date) && dateEl.classList.add('x-same-month');
      if (isSameDate(date, selectedDate)) {
        dateEl.classList.add('x-selected');
        selectedDate.toString = function() { return this.toLocaleDateString(); };
        fireDateSelectedEvent(selectedDate);
        // const custEvent = new CustomEvent('x-calendar-selected', {bubbles: true, detail: selectedDate});
        // el.dispatchEvent(custEvent);
      }

      dateEl.addEventListener('focus', event => {
        event.target.setAttribute('id', `${id}-selected`);
        event.target.setAttribute('aria-selected', 'true');
      });

      dateEl.addEventListener('blur', event => {
        event.target.removeAttribute('id');
        event.target.removeAttribute('aria-selected');
      });

      dateEl.addEventListener('click', event => {
        date.toString = function() { return this.toLocaleDateString(); };
        fireDateSelectedEvent(date);
        // const custEvent = new CustomEvent('x-calendar-selected', {bubbles: true, detail: date});
        // event.target.dispatchEvent(custEvent);
      });

      const dateStr = new Intl.NumberFormat(el._locale).format(date.getDate())
        .replace('〇', '十');
      dateEl.insertAdjacentHTML('beforeend', `<span>${dateStr}</span>`);
      $('.x-days-container').appendChild(dateEl);
    });
  }
}