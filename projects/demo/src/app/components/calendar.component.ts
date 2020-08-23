import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AngularExtendedModule } from '../../../../lib/src';

@Component({
  template: `

  <h2>ax-calendar</h2>
  <h3>with start-by attribute</h3>
  <pre>
  &lt;input id="my-date" [ngModel]="selected">
  &lt;ax-calendar
    start-by="my-date"
    date="2020-08-21"
    min-date='2020-08-01'
    max-date='2020-08-15'
    first-day-of-week="1"
    week-format="abbr"
    (date-selected)="dateSelected($event)">&lt;/ax-calendar>
  </pre>
  
  <input id="my-date" [ngModel]="selected">
  <ax-calendar
    start-by="my-date"
    date="2020-08-21"
    min-date='2020-08-01'
    max-date='2020-08-15'
    first-day-of-week="1"
    week-format="abbr"
    (date-selected)="dateSelected($event)"></ax-calendar>
  <br/>
  selected: {{selected | date}}
  
  <hr/>
  
  <h3>in-page calendar</h3>
  <pre>&lt;ax-calendar>&lt;/ax-calendar></pre>
  <ax-calendar></ax-calendar>
  <hr/>
  
  <h3>date/ min-date / max-date</h3>
  <pre>&lt;ax-calendar 
    date='2020-08-06' 
    min-date='2020-08-05' 
    max-date='2020-08-25'>&lt;/ax-calendar></pre>
  <ax-calendar 
    date='2020-08-06' 
    min-date='2020-08-05' 
    max-date='2020-08-25'></ax-calendar>
  <hr/>
  
  <h3>week-format</h3>
  <pre>&lt;ax-calendar week-format="min">&lt;/ax-calendar></pre>
  <ax-calendar week-format="min"></ax-calendar>
  <hr/>
  
  <h3>Multiple Language</h3>
  <pre>&lt;ax-calendar locale="ko-KR">&lt;/ax-calendar></pre>
  <ax-calendar locale="ko-KR"></ax-calendar>
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
  imports: [ AngularExtendedModule, FormsModule, CommonModule ]})
class DynModule {}

