import { 
  Component, Input, ChangeDetectorRef,
  ElementRef, OnInit, Inject, LOCALE_ID, ChangeDetectionStrategy
} from '@angular/core';

import { localDate } from './local-date';
import { fireCustomEvent} from './fire-custom-event';
import { OverlayComponent } from './overlay.component';

@Component({
  selector: 'ee-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent extends OverlayComponent implements OnInit {
  @Input() locale: string;
  @Input('date') selectedDate: any;
  @Input('min-date') minDate: any = '1969-01-01';
  @Input('max-date') maxDate: any = '2100-12-31';
  @Input('first-day-of-week') firstDayOfWeek: any = '0';
  @Input('week-format') weekFormat = 'abbr';

  dates: Array<Date>; // 42 dates(7 days * 6 weeks) in calendar
  firstDayOfNextMonth: Date;
  lastDayOfPrevMonth: Date;

  get wkdayFmt() {
    console.log(3); 
    return {abbr: 'EEE', long: 'EEEE', min: 'EEEEE', short: 'EEEEEE'}[this.weekFormat];
  }

  constructor(
    @Inject(LOCALE_ID) public localeId: string,
    public el: ElementRef,
    public cd: ChangeDetectorRef
  ) {
    super(el, cd);
  }

  ngOnInit() {
    this.selectedDate = localDate(this.selectedDate);
    this.minDate = localDate(this.minDate);
    this.maxDate = localDate(this.maxDate);
    this.firstDayOfWeek = Number(this.firstDayOfWeek);
    this.lastDayOfPrevMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 0);
    this.firstDayOfNextMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 1);
    this.dates = this.getCalendarDays(this.selectedDate);
    // this.el.nativeElement.addEventListener('date-selected', event => {
    //   this.close('date-selected');
    // });
    this.cd.detectChanges();
  }

  setYear(event) {
    const year = event.target.value;
    const date = this.selectedDate;
    const [_, month, day] = [date.getFullYear(), date.getMonth(), date.getDay()];
    this.selectedDate = new Date(year, month, day);
    this.dates = this.getCalendarDays(this.selectedDate);
    this.cd.detectChanges();
  }

  setToday() {
    this.selectedDate = new Date();
    this.setMonth(0);
  }

  setMonth(inc) {
    const date = this.selectedDate;
    const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()];
    this.selectedDate = new Date(year, month + inc, day);
    this.lastDayOfPrevMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 0);
    this.firstDayOfNextMonth = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 1);
    this.dates = this.getCalendarDays(this.selectedDate);
    this.cd.detectChanges();
  }

  isSameMonth(date) {
    return date.getMonth() === this.selectedDate.getMonth();
  }

  isSameDate(a, b) {
    return Math.abs(a - b) < (1000*3600*24) && a.getDay() === b.getDay();
  }

  getAvailYears() {
    const year = this.selectedDate.getFullYear();
    const minYear = Math.max(this.minDate.getFullYear(), year - 10);
    const maxYear = Math.min(this.maxDate.getFullYear(), year + 10);
    return this.range(minYear, maxYear);
  }

  onDateBlur(event) {
    event.target.removeAttribute('id');
    event.target.removeAttribute('aria-selected');
  }

  onDateFocus(event) {
    event.target.setAttribute('id', `${this.id}-selected`);
    event.target.setAttribute('aria-selected', 'true');
  }

  onDateSelect(event, date) {
    this.selectedDate = date;
    date.toString = function() { return this.toLocaleDateString(); }
    fireCustomEvent(event.target, 'date-selected', date);
    this.cd.detectChanges();
  }

  formatDate(date: Date, options, locale?) {
    return date.toLocaleDateString(
      (locale || this.locale || this.localeId), options);
  }
  
  private getCalendarDays(date) {
    const fdow = this.firstDayOfWeek;
    const DAY_MS = 60 * 60 * 24 * 1000;
    const calendarStartTime =
      this.getCalendarStartDay(date, fdow).getTime();

    return this.range(0, 41)
      .map(num => new Date(calendarStartTime + DAY_MS * num));
  } 

  private getCalendarStartDay(date, firstDayOfWeek) {
    const DAY_MS = 60 * 60 * 24 * 1000;
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1,7)
      .map(num => new Date(firstDayOfMonth - DAY_MS * num))
      .find(dt => dt.getDay() === firstDayOfWeek)
  }

  private range(start, end, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i)
  }
}
