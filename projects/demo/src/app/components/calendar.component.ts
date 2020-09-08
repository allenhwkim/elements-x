import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementsXModule } from '../../../../lib/src';

export const usage = {
  template: `<ee-calendar></ee-calendar>`
};

@Component({
  template: `

  <h2>ee-calendar</h2>
  <h3>with start-by attribute</h3>
  <pre>
  &lt;input id="my-date" [ngModel]="selected">
  &lt;ee-calendar
    start-by="my-date"
    date="2020-08-21"
    min-date='2020-08-01'
    mee-date='2020-08-15'
    first-day-of-week="1"
    week-format="abbr"
    (date-selected)="dateSelected($event)">&lt;/ee-calendar>
  </pre>
  
  <input id="my-date" [ngModel]="selected">
  <ee-calendar
    start-by="my-date"
    date="2020-08-21"
    min-date='2020-08-01'
    mee-date='2020-08-15'
    first-day-of-week="1"
    week-format="abbr"
    (date-selected)="dateSelected($event)"></ee-calendar>
  <br/>
  selected: {{selected | date}}
  
  <hr/>
  
  <h3>in-page calendar</h3>
  <pre>&lt;ee-calendar>&lt;/ee-calendar></pre>
  <ee-calendar></ee-calendar>
  <hr/>
  
  <h3>date/ min-date / mee-date</h3>
  <pre>&lt;ee-calendar 
    date='2020-08-06' 
    min-date='2020-08-05' 
    mee-date='2020-08-25'>&lt;/ee-calendar></pre>
  <ee-calendar 
    date='2020-08-06' 
    min-date='2020-08-05' 
    mee-date='2020-08-25'></ee-calendar>
  <hr/>
  
  <h3>week-format</h3>
  <pre>&lt;ee-calendar week-format="min">&lt;/ee-calendar></pre>
  <ee-calendar week-format="min"></ee-calendar>
  <hr/>
  
  <h3>Multiple Language</h3>
  <pre>&lt;ee-calendar locale="ko-KR">&lt;/ee-calendar></pre>
  <ee-calendar locale="ko-KR"></ee-calendar>
  <hr/>
  `,
  styles: [`
  `]
})
export class CalendarComponent { 
  selected: Date;
  dateSelected($event) {
    this.selected = <any>$event.detail;
  }
}

@NgModule({
  declarations: [CalendarComponent],
  imports: [ ElementsXModule, FormsModule, CommonModule ]})
class DynModule {}

